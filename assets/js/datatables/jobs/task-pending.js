var master_data_type = "task";
dataTable = null;
var ignore_keys = ["add_date", "assigned_date"];

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

    dataTable = new DataTable("#task-datatables", {
        scrollY: screen.height - 480 + "px",
        scrollCollapse: !0,
        scrollX: true,
        autoWidth: false,
        searching: false,
        serverSide: true,
        processing: true,
        paging: true,
        responsive: false,
        bDestroy: true,
        //responsive: false,
        pageLength: page_limit,
        search: {
            search: search,
        },
        // dom: "Bfrt<'row ps-3 pe-3 pb-3'<'col-sm-12 col-md-5' i><'col-sm-12 col-md-7' p>>",
        // buttons: ["excel"],
        ajax: {
            url: site_url + "pending_appointments",
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
                ajs.datatable_error(xhr, "task-datatables");
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
                    return (
                            `<a id="job_edit_` +
                            row.id +
                            `" onclick="return set_job_id(` +
                            row.job_id +
                            `)"  data-after-load-func="edit_task_form" data-heading="Edit Task - #` +
                            row.task_code +
                            `" data-form-url="` +
                            cdn_url +
                            `job/edit-task/` +
                            row.id +
                            `" data-task-status-code="` +
                            row.task_status_code +
                            `" class="popup-form-button-task edit-task edit-btn" >` +
                            edit_icon() +
                            `</a>`
                            + detail_icon()
                            );
                },
            },
            {
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
            },
            {
                name: "task_code",
                data: "task_code",
                className: "task-id-box",
                render: function (data, type, row) {
                    var is_emergency =
                            row.emergency_job == 1
                            ? '<i class="mdi mdi-circle fs-11 align-middle me-1 emergency-task-icon blink" ></i>'
                            : "";
                    var is_overdue =
                            row.status != 1 &&
                            row.preferred_date &&
                            moment(row.preferred_date) < moment()
                            ? '<i class="mdi mdi-circle fs-11 align-middle me-1 overdue-task-icon blink" ></i>'
                            : "";
                    var str = "";
                    str +=
                            `<div class="d-flex">
                                <div class="avatar-group ps-1 align-items-center">
                                <a href="javacript: void(0);" data-heading="${data}" data-after-load-func="get_task_details" data-form-url="` +
                            cdn_url +
                            "task/details/" +
                            row.id +
                            `" class="popup-form-button pe-1" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="#` +
                            data +
                            `"> ` +
                            data +
                            `</a>
                            ${is_emergency} ${is_overdue}
                                </div>
                                </div>`;

                    return str;
                },
            },
            {
                name: "task_name",
                data: "task_name",
            },
            {
                name: "task_type",
                data: "task_type",
                class: "text-capitalize",
                defaultContent: "-",
                render: function (data) {
                    if (data == "E") {
                        return "External";
                    } else {
                        return "Internal";
                    }
                },
            },
            {
                name: "service_name",
                data: "service_name",
            },
            {
                name: "client_code",
                data: "client_code",
                render: function (data, type, row) {
                    return gen_client_detail_link(row.client_id, data);
                },
            },
            {
                name: "uprn_no",
                data: "uprn_no",
                render: function (data, type, row) {
                    return gen_property_detail_link(row.property_id, data);
                },
            },
            {
                data: "address1",
                name: "address1",
                render: function (data, type, row) {
                    return truncate_string(row.address1, 25);
                },
            },
            {
                data: "postalcode",
                name: "postalcode",
            },
            {
                data: "task_status",
                name: "task_status",
                render: function (data) {
                    return status_label(data);
                },
            },
            {
                data: "preferred_date",
                name: "preferred_date",
                render: function (data) {
                    return ajs.format_date(data);
                },
            },
            {
                data: "is_assigned",
                name: "is_assigned",
                render: function (data, type, row) {
                    var status = `<span class="badge  border border-indigo text-indigo text-capitalize">Unallocated</span>`;
                    if (row.is_assigned == "1") {
                        status = `<span class="badge  border border-success text-success text-capitalize">Assigned</span>`;
                    } else if (row.queue_id > 0) {
                        status = `<span class="badge  border border-warning text-warning text-capitalize">In-Queue</span>`;
                    }
                    return status;
                },
            },
            {
                data: "engg_name",
                name: "engg_name",
                render: function (data, type, row) {
                    var str = "N/A";
                    if ($.trim(data) != "") {
                        str = $.trim(data);
                    }
                    return str;
                },
            },
            {
                data: "last_task",
                name: "last_task",
                render: function (data, type, row) {
                    return row.last_task.task_name + `<br/>` + ajs.format_date(row.last_task.add_date);
                },
            },
            {
                data: "next_task",
                name: "next_task",
                render: function (data, type, row) {
                    if (row.next_task)
                    {
                        const inputDate = new Date(row.next_task.next_date); // your date value
                        const today = new Date();

                        today.setHours(0, 0, 0, 0);
                        inputDate.setHours(0, 0, 0, 0);
                        var class_name = '';
                        if (inputDate <= today) {
                            class_name = 'text-danger';
                        }

                        return `<div class='` + class_name + `'>` + row.next_task.type + `<br/>` + row.next_task.title + `<br/>` + ajs.format_date(row.next_task.next_date) + `</div>`;
                    }
                },
            },
        ],
        order: [["1", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Jobs");
        },
    });

    dataTable.setDetailRow = function (rowData) {
        var sorHtml = "";
        $.each(rowData.sors, function (index, sor) {
            sorHtml +=
                    `<tr>
                            <td>` +
                    sor.sor_code +
                    `</td>
                            <td>` +
                    sor.title +
                    `</td>
                            <td>` +
                    sor.quantity +
                    `</td>
                            <td>` +
                    sor.material_price +
                    `</td>
                            <td>` +
                    sor.labor_price +
                    `</td>
                            <td>` +
                    sor.sell_price +
                    `</td>
                        </tr>`;
        });

        if (sorHtml == "") {
            sorHtml = "<td colspan='5' align='center'> Data Not Available</td>";
        }
        return `
            <div class="details-row row tasks-details-row">
            <div class="col-md-2">
                    <p><strong>Assigned To:</strong> ${
                rowData.assigned_to ?? ""
                }</p>
                    <p><strong>Total Certificates:</strong> ${
                rowData.total_certificates ?? ""
                }</p>
                    <p><strong>Total SORs:</strong> ${
                rowData.total_sors ?? ""
                }</p>
            </div>
            <div class="col-md-10">
                <table class="table mb-0">
                    <thead>
                        <tr>
                        <th>SOR Code #</th>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Material Price</th>
                        <th>Labour Price</th>
                        <th>Sell Price</th>
                        </tr>
                    </thead>
                    <tbody>${sorHtml}</tbody>
                </table>
            </div>
        </div>
        `;
    };
}

function set_job_id(job_id) {
    $("#job_id").val(job_id);
}

if ($("#task-datatables").length) {
    add_autocomplete_sel(
            "#ppm_batch_code_filter",
            "contract_masterplan_logs",
            ["batch_code"],
            null,
            null
            );
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
            "#status_id_filter",
            site_url + "master-record/get_all",
            "master_value",
            {master_code: "JOB_STATUS"}
    );
    $("#custom_filter").select2({allowClear: true, placeholder: 'Quick Filter'});
    fetch_default_filter(master_data_type);

    var breadcrumbs = [
        {label: "Pending Appointments", url: null},
    ];
    set_breadcrumb(breadcrumbs);
}

function status_label(value) {
    if (value == null) {
        return "-";
    }

    var icon = `<span class="badge border border-indigo text-indigo text-capitalize" >In Progress</span>`;
    if (
            value == "0" ||
            value.toString().toLowerCase() == "pending" ||
            value.toString().toLowerCase() == "open"
            ) {
        icon = `<span class="badge  border border-indigo text-indigo  text-capitalize">Open</span>`;
    }
    if (value == "1" || value.toString().toLowerCase() == "complete" || value.toString().toLowerCase() == "task complete") {
        icon = `<span class="badge  border border-success text-success  text-capitalize">Complete</span>`;
    }
    if (value == "2" || value.toString().toLowerCase() == "rejected") {
        icon = `<span class="badge  border border-danger text-danger  text-capitalize">Rejected</span>`;
    }

    return icon;
}

function cert_status_label(value) {
    if (value == null) {
        return "-";
    }

    var icon = '';
    if (value == '0')
    {
        icon = `<span class="badge  border border-indigo text-indigo  text-capitalize">Pending</span>`;
    }
    if (value == '1')
    {
        icon = `<span class="badge  border border-success text-success  text-capitalize">Complete</span>`;
    }
    if (value == '2')
    {
        icon = `<span class="badge  border border-danger text-danger  text-capitalize" >Rejected</span>`;
    }
    if (value == '3')
    {
        icon = `<span class="badge  border border-success text-success  text-capitalize">Update and approved</span>`;
    }
    if (value == '4')
    {
        icon = `<span class="badge  border border-success text-success  text-capitalize">Approved</span>`;
    }

    return icon;
}

// for set data on task detail page
function set_task_data(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var task = result_json.data;

        for (const [key, value] of Object.entries(task)) {
            if (!ignore_keys.includes(key)) {
                $("#detail_" + key).html(setDefValue(value));
            }

            if (ignore_keys.includes(key)) {
                $("#detail_" + key).html(ajs.format_datetime(value));
            }
        }
        if (task.task_type == "E") {
            $("#detail_task_type").html("External");
        } else {
            $("#detail_task_type").html("Internal");
        }
        if (task.sent_to_pda == 1) {
            $("#detail_sent_to_pda").html("Yes");
        } else {
            $("#detail_sent_to_pda").html("No");
        }

        get_event_table(task.events);
        get_sor_table(task.sors);
        get_asset_table(task.assets);
        get_media_table(task.files);
        get_certificate_table(task.certificates);

        var comment_btn = `<button class="btn btn-primary me-2 waves-effect waves-light comment-job-task" data-task-id="${task.id}" data-comments="${task.manager_comments}">Add Comments</button>`;
        var approve_btn = (task.task_type == 'E' && (task.task_status.toLowerCase() == 'task complete' || task.task_status.toLowerCase() != 'approved')) ? `<button class="btn btn-success me-2 approve-job-task" data-task-id="${task.id}">Approve Task</button>` : '';
        var reject_btn = (task.task_type == 'E' && (task.task_status.toLowerCase() == 'task complete' || task.task_status.toLowerCase() != 'rejected')) ? `<button class="btn btn-danger me-2 reject-job-task" data-task-id="${task.id}">Reject Task</button>` : '';
        var letter_btn = (task.task_name.toLowerCase().includes('letter') && !isEmpty(task.letter_pdf)) ? `<a target="_BLANK" class="btn btn-success me-2" href="${s3_url + '/' + task.letter_pdf}">Letter PDF</a>` : '';

        if (task.financial_status != 2) {
            $("#task-btns").html(comment_btn + approve_btn + reject_btn + letter_btn);
        }

    } else {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function get_task_details() {
    var id = $("#hidden_task_id").val();

    if (id) {
        ajs.ajax_form(
                site_url + "job-task-details/" + id,
                null,
                "GET",
                null,
                "1",
                "1",
                set_task_data,
                set_task_data
                );
    }
}

function get_sor_table(job_sors) {
    var sor_table_html = '<tr><td colspan="9" class="text-center"> Data not available!</td></tr>';
    if (typeof job_sors !== "undefined" && Array.isArray(job_sors) && job_sors.length) {
        sor_table_html = "";
        $.each(job_sors, function (key, value) {
            var is_chargeable = value.is_chargeable == 1 ? 'checked' : '';
            var is_payable = value.is_payable == 1 ? 'checked' : '';
            let chargeable_comments = isEmpty(value.chargeable_comments) ? '' : `<span class="tooltip-container"><i class="ri-message-2-line fs-16 ms-2 show-comment cursor-pointer" data-message="${value.chargeable_comments}"></i></span>`;
            let payable_comments = isEmpty(value.payable_comments) ? '' : `<span class="tooltip-container"><i class="ri-message-2-line fs-16 ms-2 show-comment cursor-pointer" data-message="${value.payable_comments}"></i></span>`;

            sor_table_html +=
                    `<tr><td>${(key + 1)}</td><td>` +
                    value.sor_code +
                    `</td><td>` +
                    value.material_price +
                    `</td><td>` +
                    value.labor_price +
                    `</td><td>` +
                    value.sell_price +
                    `</td><td>` +
                    value.quantity +
                    `</td><td>` +
                    value.added_by_name +
                    `</td><td><div class="form-check form-switch">
                    <input class="form-check-input chargeable-task-sor" type="checkbox" role="switch"   data-task-sor-id="${value.task_sor_id}" ${is_chargeable}> ${chargeable_comments}</div></td>` +
                    `<td><div class="form-check form-switch">
                    <input class="form-check-input payable-task-sor" type="checkbox" role="switch"   data-task-sor-id="${value.task_sor_id}" ${is_payable}> ${payable_comments}</div> </td><td>` +
                    ajs.format_datetime(value.add_date) +
                    `</td></>`;
        });
    }

    $(".job-sors-div").html(sor_table_html);
}

function get_certificate_table(certificates) {
    var certificate_table_html = '<tr><td colspan="9" class="text-center"> Data not available!</td></tr>';
    if (typeof certificates !== "undefined" && Array.isArray(certificates) && certificates.length) {
        certificate_table_html = "";
        $.each(certificates, function (key, value) {
            var required = "No";
            var assigned_to_name = "-";
            var certificate_url = "";
            var edit_url = "";
            var status_label1 = cert_status_label(value.status);
            if (value.task_code == null) {
                value.task_code = "-";
            }
            if (value.is_required == "1") {
                required = "Yes";
            }
            if (value.assigned_to_name != null) {
                assigned_to_name = value.assigned_to_name;
            }
            if (value.status == "1") {
                // status_label1 = cert_status_label(1);
                edit_url =
                        `<a href="` +
                        cdn_url +
                        `job/edit-certificate/` +
                        value.task_id +
                        `/` +
                        value.id +
                        `" target="_BLANK">` + edit_icon() + `</a>`;
            }
            if (value.pdf_url != "" && value.pdf_url != null) {
                certificate_url =
                        `<a href=` + value.pdf_url + ` target="_BLANK">View</a>`;
            }
            certificate_table_html +=
                    `<tr><td>${certificate_url}${edit_url}</td><td>${(key + 1)}</td><td>` +
                    value.certificate_code +
                    `</td><td>` +
                    truncate_string(value.title) +
                    `</td><td>` +
                    required +
                    `</td><td>` +
                    assigned_to_name +
                    `</td><td>` +
                    status_label1 +
                    `</td><td>` +
                    setDefValue(value.added_by_name) +
                    `</td><td>` +
                    ajs.format_datetime(value.add_date) +
                    `</td></tr>`;
        });
    }

    $(".job-certificate-div").html(certificate_table_html);
}

function get_media_table(medias) {
    var media_table_html = '<tr><td colspan="6" class="text-center"> Data not available!</td></tr>';
    if (typeof medias !== "undefined" && Array.isArray(medias) && medias.length) {
        media_table_html = "";
        var k = 1;

        $.each(medias, function (key, value) {
            var file_type = "-";
            var preview = 'View/Download';
            var preview_link = '';
            if (value.file_type != null)
            {
                file_type = value.file_type;
                preview_link = `<a href="` + value.file_path + `" target="_BLANK">` + preview + `</a>`;
            }
            if (file_type == 'image')
            {
                preview_link = `<img style="width:120px" data-bs-toggle="modal" data-bs-target="#imagePreviewModal" src="` + value.file_path + `">`;
            }
            media_table_html +=
                    `<tr><td>` + k +
                    `</td><td>` + file_type +
                    `</td><td>` + preview_link + `</a></td><td>` + value.caption +
                    `</td> <td>` + value.added_by_name +
                    `</td><td>` + ajs.format_datetime(value.add_date) +
                    `</td></tr>`;
            k++;
        });
    }

    $(".job-media-div").html(media_table_html);
}

function get_event_table(events) {
    var event_table_html = '<tr><td colspan="5" class="text-center"> Data not available!</td></tr>';
    if (typeof events !== "undefined" && Array.isArray(events) && events.length) {
        var k = 1;
        event_table_html = "";
        $.each(events, function (key, value) {
            var event_comments = "-";
            if (value.comments != null) {
                event_comments = value.comments;
            }

            event_table_html +=
                    `<tr><td>` +
                    k +
                    `</td><td>` +
                    format_string(value.action_name) +
                    `</td><td>` +
                    setDefValue(value.added_by_name) +
                    `</td><td>` +
                    ajs.format_datetime(value.add_date) +
                    `</td><td>` +
                    setDefValue(value.comments) +
                    `</td></tr>`;
            k++;
        });
    }

    $(".job-event-div").html(event_table_html);
}

function get_asset_table(assets) {
    var asset_table_html = '<tr><td colspan="7" class="text-center"> Data not available!</td></tr>';
    if (typeof assets !== "undefined" && Array.isArray(assets) && assets.length) {
        var k = 1;
        asset_table_html = "";
        $.each(assets, function (key, value) {

            asset_table_html +=
                    `<tr><td>` +
                    k +
                    `</td><td>` +
                    value.client_asset_number
                    +
                    `</td><td>` +
                    value.serial_number +
                    `</td><td>` +
                    value.equipment_type +
                    `</td><td>` +
                    value.make +
                    `</td><td>` +
                    value.model +
                    `</td><td>` +
                    ajs.format_date(value.installation_date) +
                    `</td></tr>`;
            k++;
        });
    }

    $(".job-asset-div").html(asset_table_html);
}

$(function () {
    if ($("#is_detail_page").val()) {
        get_task_details();
    }

    $.fn.offcanvas.Constructor.prototype._initializeFocusTrap = () => ({activate: () => {
            }, deactivate: () => {
            }});
    // manage chargeable sor
    $(document).on("change", ".chargeable-task-sor", function (e) {
        e.preventDefault();
        var sor_id = $(this).data("task-sor-id");
        var preValue = !$(this).is(':checked');
        Swal.fire({
            title: "Are you sure?",
            text: "Please provide a comment.",
            icon: "warning",
            input: "textarea",
            inputAttributes: {
                autocapitalize: "off",
                placeholder: "Enter comments...",
            },
            showCancelButton: true,
            confirmButtonText: "Yes",
            showLoaderOnConfirm: true,
            preConfirm: async (comments) => {
                if ($.trim(comments) == "") {
                    return Swal.showValidationMessage(`Please enter comments.`);
                }
                try {
                    const url = `${site_url}job-task-sor/chargeable/` + sor_id;
                    const response = await ajaxWithRefresh({
                        type: "POST",
                        url: url,
                        data: {comments},
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
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed && result.value.status) {
                get_task_details();
                Swal.fire({
                    icon: "success",
                    text: result.value.message,
                });
            }
            if (result.isDismissed) {
                $(this).prop('checked', preValue);
            }
        });
    });

    $(document).on("change", ".payable-task-sor", function (e) {
        e.preventDefault();
        var sor_id = $(this).data("task-sor-id");
        var preValue = !$(this).is(':checked');
        Swal.fire({
            title: "Are you sure?",
            text: "Please provide a comment.",
            icon: "warning",
            input: "textarea",
            inputAttributes: {
                autocapitalize: "off",
                placeholder: "Enter comments...",
            },
            showCancelButton: true,
            confirmButtonText: "Yes",
            showLoaderOnConfirm: true,
            preConfirm: async (comments) => {
                if ($.trim(comments) == "") {
                    return Swal.showValidationMessage(`Please enter comments.`);
                }
                try {
                    const url = `${site_url}job-task-sor/payable/` + sor_id;
                    const response = await ajaxWithRefresh({
                        type: "POST",
                        url: url,
                        data: {comments},
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
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed && result.value.status) {
                get_task_details();
                Swal.fire({
                    icon: "success",
                    text: result.value.message,
                });
            }
            if (result.isDismissed) {
                $(this).prop('checked', preValue);
            }
        });
    });

    $(document).on("click", ".show-comment", function (e) {
        var message = $(this).data('message');
        $('.tooltip').remove();
        var tooltip = new bootstrap.Tooltip($(this).parent(), {
            animation: true,
            title: `${message}`,
            trigger: "click",
            html: true
        });
        tooltip.show();

        $(document).on('click', function (event) {
            if (!$(event.target).closest('.show-comment').length) {
                tooltip.hide();
            }
        });

        e.stopPropagation();
    });


});
