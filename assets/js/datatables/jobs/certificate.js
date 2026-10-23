var master_data_type = "certificates";
dataTable = null;
const keys = ["add_date", "added_by", "id", "status"];

function load_data_table(limit, search_term, filters) {
    data_filters = {};
    page_limit = ajs.datatable_limit;
    search = "";
    if (
            typeof filters != "undefined" &&
            (typeof filters["filters"] !== "undefined" || filters["filters"] != null)
            ) {
        data_filters = filters["filters"];
    }
    if (typeof limit !== "undefined" || limit != null) {
        page_limit = limit;
    }
    if (typeof search_term !== "undefined" || search_term != null) {
        search = search_term;
    }

    dataTable = new DataTable("#certificates-datatables", {
        scrollY: screen.height - 495 + "px",
        scrollCollapse: !0,
        scrollX: true,
        autoWidth: false,
        searching: false,
        serverSide: true,
        processing: true,
        paging: true,
        bDestroy: true,
        responsive: false,
        pageLength: page_limit,
        search: {
            search: search,
        },
        //dom: "Bfrtip",
        // buttons: ["excel"],
        ajax: {
            url: site_url + "certificates/get_all",
            method: "GET",
            async: false,
            dataSrc: "data",
            data: function (d) {
                data_filters['certificate_master.is_required_review'] = $("#is_required_review_filter").val();
                return $.extend({}, d, {
                    data_filters,
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr) {
                ajs.datatable_error(xhr, "certificates-datatables");
            },
        },
        language: {
            emptyTable: "No data found",
        },
        columns: [
            {
                data: null,
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                    var btn =
                            row.pdf_url != null
                            ? `<a title="View PDF" target="_blank" href="` +
                            row.pdf_url +
                            `"  class="view-btn"><i class="fa fa-file-pdf-o align-bottom text-muted primary-btn fs-14"></i></a>`
                            : "";
                    return btn;
                },
            },
            {
                data: null,
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                    var btn = "";
                    if (row.status == "1") {
                        btn += `<a class="edit-btn" href="${cdn_url}job/edit-certificate/${row.task_id}/${row.certificate_id}" target="_BLANK">` + edit_icon() + `</a>`;
                    }
                    if (row.status == "7") {
                        btn += `<a class="resend-upload-btn" data-id="${row.certificate_id}" data-task="${row.task_id}" data-href="${site_url}job/certificate/upload-to-client"><i title="Upload to Client" class="ri-restart-fill align-bottom me-2 primary-btn cursor-pointer fs-15"></i></a>`;
                        btn += `<a href="javascript:void(0);" data-heading="Reason for Failed- #${row.job_number}" data-after-load-func="set_reason_for_failed_details" class="small_view_modal_popup view-btn" data-id="${row.id}" data-task="${row.task_id}" data-form-url="${cdn_url}job/certificates/reason_for_failed"><i title="View Reason to Failed" class="ri-eye-line align-bottom me-2 primary-btn cursor-pointer fs-15"></i></a>`;
                    }
                    return btn;
                },
            },
            {
                data: null,
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                    var btn = "";
                    if (row.status == "1") {
                        btn += `<a href="javascript: void(0);" data-action="approve" data-task="${row.task_id}" data-certificate="${row.certificate_id}" class="approve-btn update-certificate badge  border border-success text-success text-capitalize me-1">
                                <i class="ri-checkbox-circle-line align-bottom me-1"></i>Approve  
                            </a>` +
                                `<a href="javascript: void(0);" data-action="reject"  data-task="${row.task_id}" data-certificate="${row.certificate_id}" class="reject-btn reject-certificate badge  border  border-danger text-danger text-capitalize">
                                <i class="ri-close-circle-line me-1"></i>Reject
                            </a>`;
                    }
                    return btn;
                },
            },
            {
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
            },
            {
                data: "job_number",
                name: "job_number",
            },
            {
                data: "task_code",
                name: "task_code",
            },
            {
                data: "engg_name",
                name: "engg_name",
            },
            {
                data: "uprn",
                name: "uprn",
            },
            {
                data: "address",
                name: "address",
                render: function (data) {
                    if (!data) return "-";
                    return `<span data-bs-toggle="tooltip" data-bs-trigger="hover" title="${data}">${truncate_string(data, 25)}</span>`;
                },
            },
            {
                name: "title",
                data: "title",
                render: function (data) {
                    if (!data) return "-";
                    return `<span data-bs-toggle="tooltip" data-bs-trigger="hover" title="${data}">${truncate_string(data, 25)}</span>`;
                },
            },
            {
                data: "department_name",
                name: "department_name",
                className: "text-capitalize",
            },
            {
                name: "status",
                data: "status",
                render: function (data) {
                    return cert_status_label(data);
                },
            },
            {
                data: "completed_date",
                name: "completed_date",
                render: function (data) {
                    return ajs.format_date(data);
                }
            }
        ],
        order: [["3", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Certificates");
            $('[data-bs-toggle="tooltip"]').each(function () {
                new bootstrap.Tooltip(this);
            });
        },
    });
}

if ($("#certificates-datatables").length) {
    fetch_default_filter(master_data_type);
    add_autocomplete_sel(
            "#client_id_filter",
            "clients",
            ["client_code"],
            null,
            null
            );
    add_autocomplete_sel(
            "#property_id_filter",
            "client_properties",
            ["uprn_no"],
            null,
            null
            );
    select2_ajax(
            "#department_id_filter",
            site_url + "department/get_all",
            "title"
            );
    select2_ajax_users("#engineers_filter", {user_type: 16});
    var breadcrumbs = [
        {label: "Certificate Review", url: null},
    ];
    set_breadcrumb(breadcrumbs);
}

function cert_status_label(value) {
    if (value == null) {
        return "-";
    }

    var icon = "";
    if (value == "0") {
        icon = `<span class="badge  border border-warning text-warning  text-capitalize">Pending</span>`;
    }
    if (value == "1") {
        icon = `<span class="badge  border border-success text-success  text-capitalize" >Complete</span>`;
    }
    if (value == "2") {
        icon = `<span class="badge  border border-danger text-danger  text-capitalize" >Rejected</span>`;
    }
    if (value == "3") {
        icon = `<span class="badge  border border-success text-success  text-capitalize">Update and approve</span>`;
    }
    if (value == "4") {
        icon = `<span class="badge  border border-success text-success  text-capitalize">Approved</span>`;
    }
    if (value == "5") {
        icon = `<span class="badge  border border-success text-success  text-capitalize">Previous Data</span>`;
    }
    if (value == "6") {
        icon = `<span class="badge  border border-success text-success  text-capitalize">Uploaded</span>`;
    }
    if (value == "7") {
        icon = `<span class="badge  border border-success text-success  text-capitalize">Upload Failed</span>`;
    }

    return icon;
}

$(function () {
    ajs.apply_ind_roles("Certificates");

    $(document).on("click", ".update-certificate", function () {

        $type = "update_approve";
        if ($(this).attr("data-action") == "approve") {
            $type = "approve";
        }
        var task = $(this).data('task');
        var certificate = $(this).data('certificate');

        Swal.fire({
            title: "Approve Certificate",
            text: "Are you sure you want to approve this certificate?",
            icon: "warning",
            html: signature_box(),
            showCancelButton: true,
            confirmButtonText: "Yes, approve it!",
            cancelButtonText: "No, cancel",
            showLoaderOnConfirm: true,
            preConfirm: async (message) => {
                try {
                    // signature
                    let signature = validateSign();
                    if (!signature) return false;
                    // signature
                    
                    const requetUrl = `${site_url}job/certificate/${$type}`;
                    const response = await ajaxWithRefresh({
                        type: 'POST',
                        url: requetUrl,
                        data: {
                            message: message,
                            task: task,
                            certificate: certificate,
                            signature: signature,
                        },
                    });
                    if (response.status == false) {
                        return Swal.showValidationMessage(`
                              <strong>Error: </strong>${response.message}
                            `);
                    }
                    return response;
                } catch (error) {
                    var errorMsg = "Something went wrong.please try again...";
                    if ("responseJSON" in error) {
                        errorMsg = $(`<div>${error.responseJSON.message}</div>`).text();
                    }
                    Swal.showValidationMessage(`<strong>Error: </strong> ${errorMsg}`);
                }
            },
            allowOutsideClick: () => Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `Success!!`,
                    icon: "success",
                    text: result.value.message,
                }).then((result) => {
                    ajs.refreshDataTable();
                });
            }
        });
    });
    $(document).on("click", ".reject-certificate", function () {
        var task = $(this).data('task');
        var certificate = $(this).data('certificate');

        Swal.fire({
            title: "Reject Certificate",
            text: "Please provide a reason for rejecting this certificate.",
            icon: "warning",
            input: "text",
            inputAttributes: {
                autocapitalize: "off",
                placeholder: "Enter reason...",
            },
            showCancelButton: true,
            confirmButtonText: "Yes, reject it!",
            cancelButtonText: "No, cancel",
            showLoaderOnConfirm: true,
            customClass: {
                confirmButton: "swal2-deny",
            },
            preConfirm: async (message) => {
                try {
                    if ($.trim(message) == "") {
                        return Swal.showValidationMessage(
                                `<strong>Error: </strong> Please enter reason.`
                                );
                    }
                    // alert();
                    const requetUrl = `${site_url}job/certificate/reject`;
                    const response = await ajaxWithRefresh({
                        type: 'POST',
                        url: requetUrl,
                        data: {
                            listing_page: true,
                            message: message,
                            task: task,
                            certificate: certificate,
                        },
                    });
                    if (response.status == false) {
                        return Swal.showValidationMessage(`
                              <strong>Error: </strong>${response.message}
                            `);
                    }
                    return response;
                } catch (error) {
                    var errorMsg = "Something went wrong.please try again...";
                    if ("responseJSON" in error) {
                        errorMsg = $(`<div>${error.responseJSON.message}</div>`).text();
                    }
                    Swal.showValidationMessage(`<strong>Error: </strong> ${errorMsg}`);
                }
            },
            allowOutsideClick: () => Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `Success!!`,
                    icon: "success",
                    text: result.value.message,
                }).then((result) => {
                    //location.href = cdn_url + "job/list";
                    ajs.refreshDataTable();
                });
            }
        });
    });
});

$(document).on("click", ".resend-upload-btn", function () {
    // console.log('generate-excel-btn');

    // var invoice_notes = $("#invoice_notes").val();

    var certificate_id = $(this).data('id');
    var task_id = $(this).data('task');
    var url = $(this).data('href');

    let requetUrl = url;

    $textMsg = `Are you sure you want to upload the certificate ?`;

    Swal.fire({
        title: "Confirmation",
        icon: "warning",
        text: $textMsg,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        showLoaderOnConfirm: true,
        preConfirm: async (message) => {
            try {
                const response = await ajaxWithRefresh({
                    type: 'POST',
                    url: requetUrl,
                    data: {'task_id': task_id, 'certificate_id': certificate_id},
                });
                if (response.status == false) {
                    Swal.fire({
                        title: `Error!!`,
                        icon: "error",
                        text: response.message
                    });
                    return false;
                } else {
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
        }
    });
});

function set_reason_for_failed_details() {
    var id = $("#certficate_id").val();
    var task_id = $("#task_id").val();
    if(id){       
        ajs.ajax_form(site_url + "job/certificate/get_file_upload_logs/" + id, null, "get", null, "1", "1", function (data) {
            //console.log(data.data);
           var vdata = data.data;
           //console.log(vdata);
            if(vdata){
                var tbody = $('#errorTable tbody');
                tbody.empty(); // Clear any existing rows

                $.each(vdata, function(index, item) {
                    var reason = '';
                    try {
                        var responseObj = JSON.parse(item.response);
                        reason = responseObj.Message;
                    } catch (e) {
                        reason = 'Invalid JSON';
                    }

                    var row = `<tr>
                        <td>${reason}</td>
                        <td>${item.add_date}</td>
                    </tr>`;
                    tbody.append(row);
                });
            }
        });
    }
}

$(document).on("click", ".small_view_modal_popup", function () {
    var modal_url = $(this).data('form-url');
    var element = $(this).data('element');
    var status_id = $(this).data('status_id');
    var data_id = $(this).data('id');
    var task_id = $(this).data('task');
    var heading = $(this).data('heading');
    // console.log(data_id);
    var after_load_func = $(this).data('after-load-func');
    if (data_id) {
        $.ajax({
            url: modal_url,
            type: 'GET',
            async: false,
            success: function (data) {

                $("#invoice_change_status_modal").find('.modal-dialog').html(data);
                $("#invoice_change_status_modal").modal('show');

                $("#certficate_id").val(data_id);
                $("#task_id").val(task_id);
                $(".modal-title").text(heading);
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