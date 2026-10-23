var master_data_type = "invoices_list";
dataTable = null;
function load_data_table(limit, search_term, filters) {
    data_filters = '';
    page_limit = ajs.datatable_limit;
    search = '';
    if (typeof filters != 'undefined' && (typeof filters['filters'] !== 'undefined' || filters['filters'] != null)) {
        data_filters = filters['filters'];
    }
    if (typeof limit !== 'undefined' || limit != null) {
        page_limit = limit;
    }
    if (typeof search_term !== 'undefined' || search_term != null) {
        search = search_term;
    }

    dataTable = new DataTable("#invoices-list-datatables", {
        scrollY: (screen.height - 450) + 'px',
        scrollX: true,
        autoWidth: false,
        serverSide: true,
        processing: true,
        paging: true,
        responsive: false,
        bDestroy: true,
        pageLength: page_limit,
        //        dom: "<'row'<'col-sm-12'tr>>" +
        //         "<'row'<'col-sm-4'l><'col-sm-4'i><'col-sm-4'p>>",
        search: {
            search: search
        },
        // dom: 'Bfrtip',
        buttons: [
            'excel'
        ],
        ajax: {
            url: site_url + "invoice/get_all",
            method: "GET",
            async: false,
            dataSrc: "data",
            data: function (d) {
                return $.extend({}, d, {
                    data_filters
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr) {
                ajs.datatable_error(xhr, "invoices-list-datatables");
            }
        },
        language: {
            emptyTable: "No data found",
        },
        columns: [
            {
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
            },
            {
                name: "batch_no",
                data: "batch_no",
                render: function (data, type, row) {
                    if (String(row.financial_status) === '6') {
                        return `#${data}`;
                    }
                    return `<a href="${cdn_url}invoice/detail-list/${ajs.hash_encode(row.id)}" >#${data}</a>`;
                },
            },
            {
                name: "invoice_no",
                data: "invoice_no",
            },
            {
                name: "client_code",
                data: "client_code",
            },
            {
                name: "contract_number",
                data: "contract_number",
            },
            {
                name: "total_jobs",
                data: "total_jobs",
            },
            {
                name: "ref_no",
                data: "ref_no",
                defaultContent: '-'
            },
            {
                data: "invoice_date",
                name: "invoice_date",
                render: function (data) {
                    return ajs.format_date(data);
                }
            },
            {
                data: "add_date",
                name: "add_date",
                render: function (data) {
                    return ajs.format_date(data);
                }
            },
            {
                data: "financial_status",
                name: "financial_status",
                render: function (data, type, row) {
                    return status_label_invoice(data, row.deleted_at);
                },
            },
            {
                data: "action",
                name: "action",
                render: function (data, type, row, json) {
                    const encodedId = ajs.hash_encode(row.id);
                    
                    let html = `<div class="dropdown d-inline-block">
                                <button class="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                    <i class="ri-more-fill align-middle"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end">`;
                                    const fin = String(row.financial_status ?? '');

                                    // Generate Excel: APP Buildup (4) and APP Submitted (3)
                                    if (['4', '3'].includes(fin)) {
                                        html += `
                                            <li>
                                                <a href="javascript:void(0);" data-heading="Generate Excel" data-after-load-func="get_excel_details"
                                                data-form-url="${cdn_url}invoice/generate-excel/${encodedId}"
                                                class="dropdown-item popup-form-button" id="generate_excel"
                                                data-invoice_id="${row.id}" data-client_id="${row.client_id}" data-contract_id="${row.contract_id}">
                                                    <i class="ri-checkbox-circle-line me-2 text-muted"></i>Generate Excel
                                                </a>
                                            </li>`;
                                    }

                                    // Generate Invoice: APP Submitted (3)
                                    if (fin === '3') {
                                        html += `
                                            <li>
                                                <a href="javascript:void(0);" data-heading="Generate Invoice" data-after-load-func="get_invoice_details"
                                                data-form-url="${cdn_url}invoice/generate-invoice/${encodedId}"
                                                class="dropdown-item popup-form-button" id="generate_invoice"
                                                data-invoice_id="${row.id}" data-client_id="${row.client_id}" data-contract_id="${row.contract_id}">
                                                    <i class="ri-checkbox-circle-line me-2 text-muted"></i>Generate Invoice
                                                </a>
                                            </li>`;
                                    }

                                    // Delete Batch: APP Buildup (4) and APP Submitted (3)
                                    if (['4', '3'].includes(fin)) {
                                        html += `
                                            <li>
                                                <a href="javascript:void(0);" data-heading="Delete Batch - #${row.batch_no}" data-label="Delete" data-after-load-func="set_delete_invoice_details"
                                                data-form-url="${cdn_url}invoice/delete_invoice"
                                                class="dropdown-item change_invoice_status_popup delete_invoice" id="delete_invoice"
                                                data-id="${row.id}" data-client_id="${row.client_id}" data-contract_id="${row.contract_id}">
                                                    <i class="ri-delete-bin-line me-2 text-muted"></i>Delete Batch
                                                </a>
                                            </li>`;
                                    }

                                    // Invoiced (2): Download PDF + optional Cancel
                                    if (fin === '2') {
                                        html += `
                                            <li>
                                                <a href="${s3_url}/${row.pdf_path}" target="_blank" class="dropdown-item export-btn" style="cursor:pointer">
                                                    <i class="ri-file-download-fill align-bottom me-2 text-muted"></i>Download Invoice
                                                </a>
                                            </li>`;
                                            const invoiceDate = new Date(row.invoice_date);
                                            const deleteValidityDays = parseInt(json.settings.json.invoice_delete_validity) || 0;
                                            const deleteCutoffDate = new Date(invoiceDate);
                                            deleteCutoffDate.setDate(deleteCutoffDate.getDate() + deleteValidityDays);
                                            if (new Date() <= deleteCutoffDate) {
                                                html += `
                                                    <li>
                                                        <a href="javascript:void(0);" data-heading="Cancel Invoice - #${row.invoice_no}" data-label="Cancel"
                                                        data-after-load-func="set_delete_invoice_details"
                                                        data-form-url="${cdn_url}invoice/delete_invoice"
                                                        class="dropdown-item change_invoice_status_popup delete_invoice" id="delete_invoice"
                                                        data-id="${row.id}" data-client_id="${row.client_id}" data-contract_id="${row.contract_id}">
                                                            <i class="ri-close-circle-fill me-2 text-muted"></i>Cancel Invoice
                                                        </a>
                                                    </li>`;
                                            }
                                    }

                                    // Deleted: View Reason
                                    if (row.deleted_at && fin !== '6') {
                                        html += `
                                            <li>
                                                <a href="javascript:void(0);" data-heading="Delete Reason - #${row.batch_no}" data-label="Delete"
                                                data-after-load-func="set_delete_reason_details"
                                                data-form-url="${cdn_url}invoice/delete_reason"
                                                class="dropdown-item change_invoice_status_popup view-btn" id="delete_reason"
                                                data-id="${row.id}" data-client_id="${row.client_id}" data-contract_id="${row.contract_id}">
                                                    <i class="ri-eye-line me-2 text-muted"></i>View Reason
                                                </a>
                                            </li>`;
                                    }

                                    // Cancelled (6): Download Cancelled Invoice + View Reason
                                    if (fin === '6') {
                                        html += `
                                            <li>
                                                <a href="${s3_url}/${row.pdf_path}" target="_blank" class="dropdown-item export-btn" style="cursor:pointer">
                                                    <i class="ri-file-download-fill align-bottom me-2 text-muted"></i>Download Cancelled Invoice
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" data-heading="Cancel Reason - #${row.invoice_no}" data-label="Cancel"
                                                data-after-load-func="set_delete_reason_details"
                                                data-form-url="${cdn_url}invoice/delete_reason"
                                                class="dropdown-item change_invoice_status_popup view-btn" id="delete_reason"
                                                data-id="${row.id}" data-client_id="${row.client_id}" data-contract_id="${row.contract_id}">
                                                    <i class="ri-eye-line me-2 text-muted"></i>View Reason
                                                </a>
                                            </li>`;
                                    }

                    html += `</ul></div>`;
                    return html; 
                }
            }
        ],
        order: [["0", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Invoices");
        }
    });

    $('body').tooltip({
        selector: '[data-bs-toggle="tooltip"]'
    });
}

$(document).on("click", ".generate_excel", function (e) {
    var id = $(this).data('id');
    var form_data = new FormData();
    form_data.append('invoice_id', id);
    $.ajax({
        type: "POST",
        url: site_url + 'invoice/generate_invoice_excel',
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function (xhr, settings) {
            ajs.set_auth_header(xhr, settings);
        },
        success: function (response) {

            if (response.status == false) {
                Swal.fire({
                    title: `Error!!`,
                    icon: "error",
                    text: response.message
                });
                return false;
            } else {
                Swal.fire({
                    title: `Success!!`,
                    icon: "success",
                    text: response.message
                });
                var url = response.url;
                var a = document.createElement('a');
                a.href = url;
                a.setAttribute('download', response.filename);
                document.body.appendChild(a);
                a.click();
                a.remove();
                ajs.refreshDataTable();//reload data
            }
        },
        error: function (xhr) {
            var status_code = xhr.status;
            if (status_code == 401) {
                refreshToken().then(function () {
                    $(".generate_excel").trigger("click");
                }).catch(function () {
                    // Refresh token failed — redirect to login
                    window.location.href = cdn_url + 'auth/login';
                });

                return; // Stop further execution
            }
        }
    });
});

// $(document).on("click", ".generate_invoice", function (e) {
//     var id = $(this).data('id');
//     var form_data = new FormData();
//     form_data.append('invoice_id', id);
//     $.ajax({
//         type: "POST",
//         url: site_url + 'invoice/generate_invoice_pdf',
//         data: form_data,
//         cache: false,
//         contentType: false,
//         processData: false,
//         beforeSend: function (xhr, settings) {  
//                 ajs.set_auth_header(xhr, settings);
//             },
//         success: function (response) {
//             if (response.status == false) {
//                 Swal.fire({
//                     title: `Error!!`,
//                     icon: "error",
//                     text: response.message
//                 });
//                 return false;
//             }else{
//                 Swal.fire({
//                     title: `Success!!`,
//                     icon: "success",
//                     text: response.message
//                 });
//                 var url = response.url;
//                 window.open(url, '_blank');
//                 ajs.refreshDataTable();//reload data
//             }
//         }
//     });
// });

function status_label_invoice(financial_status, deleted_at) {
    if (deleted_at && financial_status == null) {
        return `<span class="badge border text-capitalize border-danger text-danger">Deleted</span>`;
    }
    var map = {
        '1': `<span class="badge border text-capitalize border-warning text-warning">Ready To Go</span>`,
        '2': `<span class="badge border border-success text-success text-capitalize">Invoiced</span>`,
        '3': `<span class="badge border text-capitalize border-success text-success">App Submitted</span>`,
        '4': `<span class="badge border border-success text-success text-capitalize">Build Up</span>`,
        '6': `<span class="badge border border-danger text-danger text-capitalize">Cancelled</span>`,
    };
    return map[String(financial_status)] || `<span class="badge border border-secondary text-secondary text-capitalize">-</span>`;
}

if ($("#invoices-list-datatables").length) {
    select2_ajax_users("#engineer_filter", {user_type: 16});
    // status filter is now a static <select> — no select2 needed
    add_autocomplete_sel("#client_id_filter", "clients", ["client_code"], null, null);
    add_autocomplete_sel("#contract_id_filter", "contracts", ["contract_number"], null, { 'contracts.contract_active': '1' });
    fetch_default_filter(master_data_type);

    var breadcrumbs = [
        { label: 'Invoices', url: 'javascript: void(0);' }
    ];
    set_breadcrumb(breadcrumbs);
}

// Select/deselect All 
$(document).on("change", "input.selected_batch", function () {
    var total = $("input.selected_batch").length;
    var selected = $("input.selected_batch:checked").length;
    if (total == selected) {
        $("input.allselect").prop("checked", true);
    } else {
        $("input.allselect").prop("checked", false);
    }
});

$(document).on("change", "input.allselect", function () {
    if ($(this).is(":checked")) {
        $("input.selected_batch").prop("checked", true);
    } else {
        $("input.selected_batch").prop("checked", false);
    }
});
// Select/deselect All 
$(document).on("click", "button.action-paid", function (e) {
    e.preventDefault();
    var req_data = {};
    var selected_batch = [];
    var requetUrl = `${site_url}batch/paid`;
    selected_batch.push(ajs.hash_decode($(this).data("value")));
    if (selected_batch.length < 1) {
        Swal.fire({
            title: "Validation Error",
            icon: "error",
            text: "Please select at least one batch.",
        });
        return false;
    }
    var $textMsg = `Are you sure you want to mark this batch as paid?`;

    // if(selected_batch.length <= 1){
    //     $textMsg = `Are you sure you want to paid ${selected_batch.length} selected batch?`;
    // }
    req_data.batch = selected_batch.join(",");
    Swal.fire({
        title: "Confirmation Required",
        icon: "success",
        text: $textMsg,
        showCancelButton: true,
        confirmButtonText: "Paid",
        showLoaderOnConfirm: true,
        confirmButtonColor: "#157347",
        html: `
            ${$textMsg}
            <div class="form-group">
                <input id="swal-reference" placeholder="Enter reference number..." class="swal2-input ms-0" type="text" style="width: 100%;"/>
            </div>
            <div class="form-group">
                <input id="swal-pdate" placeholder="Paid date..." class="swal2-input ms-0" type="text" style="width: 100%;"/>
            </div>
            <div class="form-group">
                <input id="swal-comment" autocapitalize="off" placeholder="Enter message..." class="swal2-input ms-0" type="text" style="width: 100%;"/>
            </div>
          `,
        didOpen: () => {
            flatpickr("#swal-pdate", {
                dateFormat: "d M, Y",
                defaultDate: "today"
            });
        },
        preConfirm: async () => {
            try {
                req_data.reference = document.getElementById("swal-reference").value;
                if ($.trim(req_data.reference) == "") {
                    return Swal.showValidationMessage(`
                    <strong>Error: </strong>Please enter valid reference number.
                `);
                }
                req_data.paid_date = document.getElementById("swal-pdate").value;
                if ($.trim(req_data.paid_date) == "") {
                    return Swal.showValidationMessage(`
                    <strong>Error: </strong>Please select valid paid date.
                `);
                }
                req_data.message = document.getElementById("swal-comment").value;
                if ($.trim(req_data.message) == "") {
                    return Swal.showValidationMessage(`
                    <strong>Error: </strong>Please enter message.
                `);
                }
                const response = await ajaxWithRefresh({
                    type: 'POST',
                    url: requetUrl,
                    data: req_data,
                });
                if (response.status == false) {
                    return Swal.showValidationMessage(`
                    <strong>Error: </strong>${response.message}
                `);
                }
                return response;
            } catch (error) {
                var errorMsg = "Something went wrong.please try again...";
                if ('responseJSON' in error) {
                    errorMsg = $(`<div>${error.responseJSON.message}</div>`).text();
                }
                Swal.showValidationMessage(`<strong>Error: </strong> ${errorMsg}`);
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed && result.value.status) {
            Swal.fire({
                // title: `Success!!`,
                icon: "success",
                text: result.value.message
            });
            ajs.refreshDataTable();//reload data
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const tableContainer = document.querySelector("#invoices-list-datatables"); // Replace with the actual parent container ID or class
    let lastChecked = null;

    tableContainer.addEventListener("click", function (e) {
        // Check if the clicked element is a checkbox with the class "selected_batch"
        if (e.target && e.target.classList.contains("selected_batch")) {
            const checkboxes = Array.from(
                tableContainer.querySelectorAll(".selected_batch")
            );

            // Check if Shift key is pressed and there is a last checked checkbox
            if (e.shiftKey && lastChecked) {
                const start = Math.min(
                    checkboxes.indexOf(e.target),
                    checkboxes.indexOf(lastChecked)
                );
                const end = Math.max(
                    checkboxes.indexOf(e.target),
                    checkboxes.indexOf(lastChecked)
                );

                // Select all checkboxes between the start and end indices
                for (let i = start; i <= end; i++) {
                    checkboxes[i].checked = lastChecked.checked;
                }
            }

            // Update the last checked checkbox
            lastChecked = e.target;
        }
    });
});


["keyup", "keydown"].forEach((event) => {
    window.addEventListener(event, (e) => {
        document.onselectstart = function () {
            return !(e.key == "Shift" && e.shiftKey);
        }
    });
});

$(document).on("click", ".change_invoice_status_popup", function () {
    var modal_url = $(this).data('form-url');
    var element = $(this).data('element');
    var invoice_id = $(this).data('id');
    var heading = $(this).data('heading');
    var label = $(this).data('label');
    // console.log(invoice_id);
    var after_load_func = $(this).data('after-load-func');
    if (invoice_id) {
        $.ajax({
            url: modal_url,
            type: 'GET',
            async: false,
            success: function (data) {

                $("#invoice_change_status_modal").find('.modal-dialog').html(data);
                $("#invoice_change_status_modal").modal('show');

                $("#invoice_id").val(invoice_id);
                $(".modal-title").text(heading);
                $(".delete-cancel-label").text(label);
                console.log(after_load_func);
                if (after_load_func) {
                    window[after_load_func]();
                }
            },
            error: function (xhr, status, error) {
                ajs.showAlertBar('error', error);
            }
        });
    } else {
        Swal.fire({
            title: `Error!!`,
            icon: "error",
            text: 'Somethig went wrong.please try again...'
        });
        return false;
    }
});


$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var job_id = urlParams.get('job_id');
    if (job_id > 0) {
        ajs.ajax_form(site_url + "invoice/add_batch_for_individualjob/" + job_id, null, "get", null, "1", "1", function (data) {
            // console.log(data);
            if (data.status == true) {
                var invoice_id = data.data.invoice_id;
                var contract_id = data.data.contract_id;
                var form_link = `${cdn_url}invoice/generate-invoice/${ajs.hash_encode(invoice_id)}`;
                var heading = "Generate Invoice";
                ajs.showOffCanvasFormRight(form_link, heading, '');

                get_invoice_details_job_wise(invoice_id, contract_id);

                const url = new URL(window.location.href);
                url.searchParams.delete('job_id');
                window.history.replaceState({}, '', url.toString());
            } else {
                Swal.fire({
                    title: `Error!!`,
                    icon: "error",
                    text: "Something went wrong.please try again..."
                });
            }
        });
    }
});

function get_invoice_details_job_wise(invoice_id, contract_id) {

    $('div.custom-offcanvas-right').addClass("width-25");
    $("#invoice_id").val(invoice_id);

    ajs.ajax_form(site_url + "invoice/get/" + invoice_id, null, "GET", null, "1", "1", function (data) {
        // console.log(data);
        if (data.status) {
            $("#batchno").val(data.data.batch_no);
            $("#client_id").val(data.data.client_id);
            last_Invoice_no = data.last_Invoice_no;
            invoice_prefix = data.invoice_prefix;
            $('#invoice_no').val(invoice_prefix + (parseInt(last_Invoice_no) + 1));
            $('#invoice_no_int').val(parseInt(last_Invoice_no) + 1);
            const now = new Date();
            const pad = n => n < 10 ? '0' + n : n;
            const formatted = now.getFullYear() + '-' +
                pad(now.getMonth() + 1) + '-' +
                pad(now.getDate()) + 'T' +
                pad(now.getHours()) + ':' +
                pad(now.getMinutes());

            $('#invoice_date').val(formatted);
        }
    });

}
function get_invoice_details() {
    var invoice_id = parseInt($("#generate_invoice").data('invoice_id'));
    var last_id = 0;
    $('div.custom-offcanvas-right').addClass("width-25");
    $("#invoice_id").val(invoice_id);

    ajs.ajax_form(site_url + "invoice/get/" + invoice_id, null, "GET", null, "1", "1", function (data) {
        // console.log(data);
        if (data.status) {
            $("#batchno").val(data.data.batch_no);
            $("#client_id").val(data.data.client_id);
            last_Invoice_no = data.last_Invoice_no;
            invoice_prefix = data.invoice_prefix;
            $('#invoice_no').val(invoice_prefix + (parseInt(last_Invoice_no) + 1));
            $('#invoice_no_int').val(parseInt(last_Invoice_no) + 1);
            const now = new Date();
            const pad = n => n < 10 ? '0' + n : n;
            const formatted = now.getFullYear() + '-' +
                pad(now.getMonth() + 1) + '-' +
                pad(now.getDate()) + 'T' +
                pad(now.getHours()) + ':' +
                pad(now.getMinutes());

            $('#invoice_date').val(formatted);
        }
    });

    $('input[name="attachment_option"]').on('change', function () {
        // console.log($(this).val());
        if ($(this).val() === 'excel') {
            $('#excel-options').slideDown();
        } else {
            $('#excel-options').slideUp();
            // Also hide all inner dropdowns when PDF selected
            $('#general-template-dropdown').hide();
            $('input[name="excel_report_type"]').prop('checked', false);
        }
    });

    // When excel report type changes
    $('input[name="excel_report_type"]').on('change', function () {
        const type = $(this).val();
        loadTemplateDropdown(type);
    });

}

function loadTemplateDropdown(reportType) {
    $('#general-template-dropdown').slideDown();
    var client_id = $("#client_id").val();
    // console.log(client_id);
    $('#template_id')
        .html('<option>Select Template</option>') // <-- sets a blank first option
        .val(null)
        .trigger('change');

    if (reportType === 'general') {
        select2_ajax(
            "#template_id",
            site_url + "reports/get_all",
            "title",
            {
                "is_null_filters": true
            }
        );
    } else if (reportType === 'client') {
        select2_ajax(
            "#template_id",
            site_url + "reports/get_all",
            "title",
            {
                "filters": JSON.stringify({
                    "client_properties.client_id": client_id
                })
            }
        );
    }
}


function get_excel_details() {
    var invoice_id = parseInt($("#generate_excel").data('invoice_id'));
    var last_id = 0;
    $('div.custom-offcanvas-right').addClass("width-25");
    $("#invoice_id").val(invoice_id);

    //add_autocomplete_sel("#template_id", "reports", ["title"], null, null);

    ajs.ajax_form(site_url + "invoice/get/" + invoice_id, null, "GET", null, "1", "1", function (data) {
        if (data.status) {
            $("#batchno").val(data.data.batch_no);
            $("#client_id").val(data.data.client_id);
        }
    });

    // When excel report type changes
    $('input[name="excel_report_type"]').on('change', function () {
        const type = $(this).val();
        // console.log(type);
        loadTemplateDropdown(type);
    });

}
function checkvalue(val) {
    val = $.trim(val);
    if (val == '' || val == undefined || val == null || val.length < 1) {
        return false;
    }
    return true;
}

$(document).on("click", "#generate-invoice-btn", function () {
    // console.log('generate-invoice-btn');

    // var invoice_notes = $("#invoice_notes").val();
    var invoice_no = $("#invoice_no").val();
    var invoice_date = $("#invoice_date").val();
    var invoice_id = $("#invoice_id").val();

    var error = 0;

    if (!checkvalue(invoice_no)) {
        errormsg = "Please enter invoice no.";
        error = 1;
    }
    else if (!checkvalue(invoice_date)) {
        errormsg = "Please enter invoice date.";
        error = 1;
    }

    const attachmentOption = $('input[name="attachment_option"]:checked').val();
    if (attachmentOption === 'excel') {
        const reportType = $('input[name="excel_report_type"]:checked').val();
        const templateValue = $('#template_id').val();

        // Check if template type is selected
        if (!reportType) {
            error = 1;
            errormsg = "Please select a template type (Global or Client Wise).";
        }

        // Check if template is selected
        else if (!templateValue) {
            error = 1;
            errormsg = "Please select a report template.";
        }
    }

    if (invoice_no) {
        ajs.ajax_form(site_url + "invoice/check_invoice_no/" + invoice_no, null, "GET", null, "1", "1", function (data) {
            // console.log(data);
            if (data.numrows > 0) {
                errormsg = "Invoice No is already exist Please enter another invoice no.";
                error = 1;
            }
        });
    }
    // return false;
    if (error == 1) {
        Swal.fire({
            title: "Unable to Update",
            icon: "error",
            text: errormsg,
        });
        return false;
    }

    let requetUrl = `${site_url}invoice/generate_invoice`;

    $textMsg = `Are you sure you want to generate invoice ?`;

    Swal.fire({
        title: "Confirmation",
        icon: "warning",
        text: $textMsg,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        showLoaderOnConfirm: true,
        preConfirm: async (message) => {
            try {
                let formData = $('form.invoice-generate-form').serialize();
                const response = await ajaxWithRefresh({
                    type: 'POST',
                    url: requetUrl,
                    data: formData,
                });
                if (response.status == false) {
                    Swal.fire({
                        title: `Error!!`,
                        icon: "error",
                        text: response.message
                    });
                    return false;
                } else {
                    Swal.fire({
                        title: `Success!!`,
                        icon: "success",
                        text: response.message
                    });
                    var url = response.url;
                    // window.open(url, '_blank');
                    var a = document.createElement('a');
                    a.href = url;
                    a.setAttribute('download', response.filename);
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    ajs.refreshDataTable();//reload data
                }
                return response;
            } catch (error) {
                // console.log(error);
                var errorMsg = "Something went wrong.please try again...";
                if ('responseJSON' in error) {
                    errorMsg = $(`<div>${error.responseJSON.message}</div>`).text();
                }
                Swal.fire({
                    title: `Error!!`,
                    icon: "error",
                    text: errorMsg
                });
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed && result.value.status) {
            Swal.fire({
                title: `Success!!`,
                icon: "success",
                text: result.value.message
            });
            ajs.refreshDataTable();//reload data
            $('button#close-modal').click();
        }
    });
});

$(document).on("click", "#generate-excel-btn", function () {
    // console.log('generate-excel-btn');

    // var invoice_notes = $("#invoice_notes").val();

    var template_id = $("#template_id").val();
    var invoice_id = $("#invoice_id").val();

    var error = 0;

    if (!checkvalue(template_id)) {
        errormsg = "Please select template.";
        error = 1;
    }

    // return false;
    if (error == 1) {
        Swal.fire({
            title: "Unable to Update",
            icon: "error",
            text: errormsg,
        });
        return false;
    }

    let requetUrl = `${site_url}report/generate`;

    $textMsg = `Are you sure you want to generate excel ?`;

    Swal.fire({
        title: "Confirmation",
        icon: "warning",
        text: $textMsg,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        showLoaderOnConfirm: true,
        preConfirm: async (message) => {
            try {
                let formData = $('form.excel-generate-form').serialize();
                const response = await ajaxWithRefresh({
                    type: 'POST',
                    url: requetUrl,
                    data: formData,
                });
                if (response.status == false) {
                    Swal.fire({
                        title: `Error!!`,
                        icon: "error",
                        text: response.message
                    });
                    return false;
                } else {
                    download_report(response)
                    ajs.refreshDataTable();//reload data
                }
                return response;
            } catch (error) {
                // console.log(error);
                var errorMsg = "Something went wrong.please try again...";
                if ('responseJSON' in error) {
                    errorMsg = $(`<div>${error.responseJSON.message}</div>`).text();
                }
                Swal.fire({
                    title: `Error!!`,
                    icon: "error",
                    text: errorMsg
                });
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed && result.value.status) {
            ajs.refreshDataTable();//reload data
            $('button#close-modal').click();
        }
    });
});

function download_report(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var path = result_json.path;
        $('#offcanvasRight').offcanvas('hide');
        window.location.href = site_url + path;
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}


function set_delete_invoice_details() {
    var user = localStorage.getItem('user_profile');
    user = JSON.parse(user);
    var first_name = user.first_name;
    var last_name = user.last_name;
    // console.log(first_name + ' ' + last_name);
    $(".delete_by").text(first_name + ' ' + last_name);
    
}
function set_delete_reason_details() {
    var id = $("#invoice_id").val();
    if(id){       
        ajs.ajax_form(site_url + "invoice/get/" + id, null, "get", null, "1", "1", function (data) {
            // console.log(data);
            $(".delete_reason").text(data.data.delete_reason);
            var deleted_by = data.data.deleted_by;
            if(deleted_by){
                ajs.ajax_form(site_url + "user/get/" + deleted_by, null, "GET", null, "1", "1", function (data) {
                    // console.log(data);
                    var first_name = data.data.first_name;
                    var last_name = data.data.last_name;
                    $(".delete_by").text(first_name + ' ' + last_name);
                });
            }
        });
    }
    
    
}
$(document).on("click", ".list_invoice_delete", function (e) {
    var id = $("#invoice_id").val();
    var delete_reason = $("#delete_reason").val();

    // This modal serves both "Delete Batch" and "Cancel Invoice"; the menu item
    // put the right word in .delete-cancel-label, so reuse it rather than asking
    // about cancelling an invoice when the user is deleting a batch.
    var action_label = ($(".delete-cancel-label").first().text() || "Delete").trim();
    var is_cancel = action_label.toLowerCase() === "cancel";
    var subject = is_cancel ? "invoice" : "batch";

    var error = 0;

    if (!checkvalue(delete_reason)) {
        errormsg = "Please enter " + action_label.toLowerCase() + " reason.";
        error = 1;
    }

    // return false;
    if (error == 1) {
        Swal.fire({
            title: "Unable to " + action_label,
            icon: "error",
            text: errormsg,
        });
        return false;
    }
    if (id) {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to " + action_label.toLowerCase() + " this " + subject + "?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes",
            denyButtonText: "Cancel",
            showLoaderOnConfirm: true,
        }).then(async (result) => {
            $('#invoice_change_status_modal').modal('hide');
            let formData = $('#delete-invoice-form').serialize();
            let requetUrl = `${site_url}invoice/delete/`+id;
            const response = await ajaxWithRefresh({
                type: 'POST',
                url: requetUrl,
                data: formData,
            });
            if (response.status == false) {
                Swal.fire({
                    title: `Error!!`,
                    icon: "error",
                    text: response.message
                });
                return false;
            } else {
                Swal.fire({
                    title: `Success!!`,
                    icon: "success",
                    text: response.message
                });
                ajs.refreshDataTable();//reload data
            }
            return response;
        });
    } else {
        Swal.fire({
            title: `Error!!`,
            icon: "error",
            text: 'Something went wrong please try again !'
        });
        return false;
    }

});
ajs.apply_ind_roles('Invoices');