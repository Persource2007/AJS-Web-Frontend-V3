var master_data_type = "tasks_list";
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
    // For engineers diary to view tasks
    if (document.referrer == cdn_url + "job/engineers-diary" && ajs_form_handler.check_token("view-task-detail")) {
        data_filters['diary_data'] = ajs_form_handler.get_token("view-task-detail");
        new_limit = (ajs_form_handler.get_token("view-task-detail") || "").split(",").length;
        if (page_limit < new_limit) {
            page_limit = new_limit;
        }
    }
    // For engineers diary to view tasks

    save_tasks_session_filters();

    dataTable = new DataTable("#task-datatables", {
        // scrollY: screen.height - 480 + "px",
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
            url: site_url + "job-task/get_all",
            method: "GET",
            //async: false,
            dataSrc: "data",
            data: function (d) {
                data_filters['job_tasks.task_type'] = "E";
                return $.extend({}, d, {
                    data_filters
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
                ajs.show_loader();
            },
            error: function (xhr) {
                ajs.datatable_error(xhr, "task-datatables");
            },
            complete: function () {
                ajs.hide_loader();
            }
        },
        language: {
            emptyTable: "No data found",
        },
        columns: [
            {
                title: " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
                width: "100px",
                name: "id",
                data: "id",
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
                        `</a>` +
                        `<a href="javascript: void(0);" id="task_view_` +
                        row.id +
                        `" data-heading="` +
                        row.task_code +
                        `" data-after-load-func="view_task_details" data-form-url="` +
                        task_detail_url(row.id) +
                        `" class="task-detail-window-button view-btn" title="View Task">` +
                        view_icon(true) +
                        `</a>` +
                        `<a id="job_copy_` +
                        row.id +
                        `" onclick="return set_job_id(` +
                        row.job_id +
                        `)" data-after-load-func="copy_task_form" data-heading="Copy Task - #` +
                        row.task_code +
                        `" data-form-url="` +
                        cdn_url +
                        `job/copy-task/` +
                        row.id +
                        `" class="popup-form-button-task copy-task check-permission" data-module="Jobs" data-action="add" title="Copy Task"><i class="ri-file-copy-line align-bottom me-2 primary-btn cursor-pointer fs-15"></i></a>`
                    );
                },
            },          
            {
                title: "Task Id",
                name: "task_code",
                data: "task_code",
                width: "150px",
                render: function (data, type, row) {
                    var is_emergency =
                        row.emergency_job == 1
                            ? '<i class="mdi mdi-circle fs-11 align-middle me-1 emergency-task-icon " data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="Emergency Task"></i>'
                            : "";
                    var is_overdue =
                        row.status != 1 &&
                            row.preferred_date &&
                            moment(row.preferred_date) < moment()
                            ? '<i class="mdi mdi-circle fs-11 align-middle me-1 overdue-task-icon " data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="Overdue Task"></i>'
                            : "";
                    var task_link = "";
                    if (ajs.check_role("Jobs", "edit")) {
                        task_link =
                            `<a href="javascript: void(0);" onclick="return set_job_id(` + row.job_id +
                            `)" data-after-load-func="edit_task_form" data-heading="Edit Task - #` + data +
                            `" data-form-url="` + cdn_url + `job/edit-task/` + row.id +
                            `" data-task-status-code="` + row.task_status_code +
                            `" class="popup-form-button-task edit-task pe-1" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="Edit Task - #` +
                            data + `"> ` + data + `</a>`;
                    } else {
                        task_link =
                            `<a href="javascript: void(0);" data-heading="${data}" data-after-load-func="view_task_details" data-form-url="` + task_detail_url(row.id) + `" class="task-detail-window-button pe-1" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="#` +
                            data + `"> ` + data + `</a>`;
                    }
                    var str = "";
                    str +=
                        `<div class="d-inline-flex">
                                <div class="ps-1 align-items-center">
                                ` + task_link + `
                            ${is_emergency} ${is_overdue}
                                </div>
                                </div>`;

                    return str;
                },
            },
            {
                title: "Job No.",
                name: "job_code",
                data: "job_code",
                width: "80px",
                render: function (data, type, row) {
                    if (!data) return "-";
                    return `<a href="` + cdn_url + 'job/details/' + ajs.hash_encode(row.job_id) + `" data-bs-toggle="tooltip" data-bs-trigger="hover" title="${data}">${data}</a>`;
                },
            },
            {
                title: "Created",
                data: "add_date",
                name: "add_date",
                width: "80px",
                render: function (data) {
                    return ajs.format_date(data);
                },
            },
            {
                title: "Type",
                name: "task_type",
                data: "task_type",
                width: "40px",
                className: "text-capitalize",
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
                title: "Task",
                name: "task_name",
                data: "task_name",
                width: "80px",
                render: function (data) {
                    if (!data) return "-";
                    return `<span data-bs-toggle="tooltip" data-bs-trigger="hover" title="${data}">${truncate_string(data, 12)}</span>`;
                },
            },
            {
                title: "Contract",
                name: "contract",
                data: "contract",
                width: "100px",
                render: function (data, type, row) {
                    var contract = truncate_string(data, 12);
                    return gen_contract_detail_link(row.contract_id, contract);
                },
            },
            {
                title: "Job",
                name: "service_name",
                data: "service_name",
                width: "100px",
                render: function (data) {
                    if (!data) return "-";
                    return `<span data-bs-toggle="tooltip" data-bs-trigger="hover" title="${data}">${truncate_string(data, 10)}</span>`;
                },
            },
            {
                title: "Job Status",
                name: "job_status",
                data: "job_status",
                width: "100px",
                render: function (data) {
                    if (!data) return "-";
                    return status_label(data);
                },
            },
            {
                title: "Property",
                name: "uprn_no",
                data: "uprn_no",
                width: "100px",
                render: function (data, type, row) {
                    return gen_property_detail_link(row.property_id, data);
                },
            },
            {
                title: "Address",
                data: "address1",
                name: "address1",
                width: "200px",
                render: function (data, type, row) {
                    if (!row.address1) return "-";
                    return `<span data-bs-toggle="tooltip" data-bs-trigger="hover" title="${row.address1}">${truncate_string(row.address1, 20)}</span>`;
                },
            },
            {
                title: "Postcode",
                data: "postalcode",
                name: "postalcode",
                width: "60px",
            },
            {
                title: "Queue",
                data: "queue_name",
                name: "queue_name",
                width: "100px",
                render: function (data) {
                    if (!data) return "-";
                    return `<span data-bs-toggle="tooltip" data-bs-trigger="hover" title="${data}">${truncate_string(data, 15)}</span>`;
                },
            },
            {
                title: "Assigned To",
                data: "engg_name",
                name: "engg_name",
                width: "100px",
                render: function (data, type, row) {
                    var str = "N/A";
                    if ($.trim(data) != "") {
                        str = $.trim(data);
                    }
                    return str;
                },
            },
            {
                title: "Task Status",
                data: "task_status",
                name: "task_status",
                width: "80px",
                className: "task_latest_status",
                render: function (data) {
                    return status_label(data);
                },                
            },
            {
                title: "Status Change Dt",
                data: "status_date",
                name: "status_date",
                width: "140px",
                render: function (data) {
                    return ajs.format_datetime(data);
                },
            },
            {
                title: "Attended",
                data: "started_date",
                name: "started_date",
                width: "140px",
                render: function (data) {
                    return ajs.format_datetime(data);
                },
            },
            {
                title: "Target",
                data: "preferred_date",
                name: "preferred_date",
                width: "80px",
                render: function (data) {
                    return ajs.format_date(data);
                },
            },
            {
                title: "Tags",
                data: "tag_name",
                name: "tag_name",
                width: "120px",
                render: function (data, type, row) {
                    if (!data) return "-";
                    return `<span data-bs-toggle="tooltip" data-bs-trigger="hover" title="${data}">${truncate_string(data, 25)}</span>`;
                },
            },
            {
                title: "SORs",
                data: "total_sors",
                name: "total_sors",
                width: "50px",
                className: "pricing-col",
            },
            {
                title: "Pics",
                data: "total_pics",
                name: "total_pics",
                width: "50px",
                className: "pricing-col",
            },
            {
                title: "Certs.",
                data: "total_certificates",
                name: "total_certificates",
                width: "50px",
                className: "pricing-col",
            },
            {
                title: "Client",
                name: "client_code",
                data: "client_code",
                visible: false,
                render: function (data, type, row) {
                    return gen_client_detail_link(row.client_id, data);
                },
            },
            {
                title: "Assigned / Unassigned",
                data: "is_assigned",
                name: "is_assigned",
                width: "120px",
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
        ],
        order: [["3", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Jobs");
            // Rows are rebuilt on every draw, so the check-permission gate on Copy Task has to be
            // re-evaluated here - apply_ind_roles only handles the class-based ones like .edit-btn.
            ajs.apply_permissions();
            $('[data-bs-toggle="tooltip"]').each(function () {
                new bootstrap.Tooltip(this);
            });
        },
    });

}

function get_select2_val_and_text(selector) {
    var $el = $(selector);
    if (!$el.length) return null;
    var val = $el.val();
    if (val === null || val === undefined || val === "") return null;
    var $opt = $el.find('option:selected');
    var text = $opt.length ? $opt.text() : val;
    return {
        id: val,
        text: $.trim(text) || val
    };
}

function get_select2_multi_val_and_text(selector) {
    var $el = $(selector);
    if (!$el.length) return [];
    var vals = $el.val();
    if (!vals || !vals.length) return [];
    var items = [];
    $el.find('option:selected').each(function() {
        var v = $(this).val();
        if (v !== null && v !== undefined && v !== "") {
            items.push({
                id: v,
                text: $.trim($(this).text()) || v
            });
        }
    });
    return items;
}

function save_tasks_session_filters() {
    if (!$("#form_filters").length) return;

    var filters = {
        search_term: $("#search_term").val() || "",
        engineer_id_filter: get_select2_val_and_text("#engineer_id_filter"),
        client_id_filter: get_select2_val_and_text("#client_id_filter"),
        contract_id_filter: get_select2_val_and_text("#contract_id_filter"),
        custom_filter: $("#custom_filter").val() || "",
        queue_filter: get_select2_val_and_text("#queue_filter"),
        from_to_dates: $("#from_to_dates").val() || "",
        status_id_filter: get_select2_multi_val_and_text("#status_id_filter")
    };

    sessionStorage.setItem("tasks_list_session_filters", JSON.stringify(filters));
}

function restore_tasks_session_filters() {
    var sessionData = sessionStorage.getItem("tasks_list_session_filters");
    if (!sessionData) return $.Deferred().resolve(false).promise();
    var filters;
    try {
        filters = JSON.parse(sessionData);
        if (!filters || typeof filters !== "object") return $.Deferred().resolve(false).promise();
    } catch (e) {
        console.error("Error restoring session filters:", e);
        return $.Deferred().resolve(false).promise();
    }

    var restoredAny = false;
    var deferreds = [];

    // Non-entity filters restored synchronously
    if (typeof filters.search_term !== "undefined") {
        $("#search_term").val(filters.search_term);
        if (filters.search_term) restoredAny = true;
    }
    if (typeof filters.from_to_dates !== "undefined") {
        $("#from_to_dates").val(filters.from_to_dates);
        if (filters.from_to_dates) restoredAny = true;
    }
    if (filters.custom_filter) {
        $("#custom_filter").val(filters.custom_filter).trigger("change");
        restoredAny = true;
    }
    if (filters.engineer_id_filter && filters.engineer_id_filter.id) {
        var engid = filters.engineer_id_filter.id;
        var engtext = filters.engineer_id_filter.text || engid;
        if (!$("#engineer_id_filter option[value='" + engid + "']").length) {
            $("#engineer_id_filter").append(new Option(engtext, engid, true, true));
        }
        $("#engineer_id_filter").val(engid).trigger("change");
        restoredAny = true;
    }
    if (filters.queue_filter && filters.queue_filter.id) {
        var qid = filters.queue_filter.id;
        var qtext = filters.queue_filter.text || qid;
        if (!$("#queue_filter option[value='" + qid + "']").length) {
            $("#queue_filter").append(new Option(qtext, qid, true, true));
        }
        $("#queue_filter").val(qid).trigger("change");
        restoredAny = true;
    }
    if (filters.status_id_filter && filters.status_id_filter.length) {
        var selectedVals = [];
        $.each(filters.status_id_filter, function(i, item) {
            var stid = item.id || item;
            var sttext = item.text || stid;
            selectedVals.push(stid);
            if (!$("#status_id_filter option[value='" + stid + "']").length) {
                $("#status_id_filter").append(new Option(sttext, stid, true, true));
            }
        });
        $("#status_id_filter").val(selectedVals).trigger("change");
        restoredAny = true;
    }

    // Entity filters: validate still active before restoring
    if (filters.client_id_filter && filters.client_id_filter.id) {
        var cid = filters.client_id_filter.id;
        var ctext = filters.client_id_filter.text || cid;
        var cd = $.Deferred();
        $.ajax({
            url: site_url + 'api/autocomplete_single', method: 'GET',
            data: { table: 'clients', id: cid, fields: 'client_code', add_fields: '', check_active: 1, element: 'client_id_filter' },
            success: function(resp) {
                if (resp && resp.status === true) {
                    if (!$("#client_id_filter option[value='" + cid + "']").length) {
                        $("#client_id_filter").append(new Option(ctext, cid, true, true));
                    }
                    $("#client_id_filter").val(cid).trigger("change");
                    restoredAny = true;
                } else {
                    try { var s = JSON.parse(sessionStorage.getItem("tasks_list_session_filters") || '{}'); delete s.client_id_filter; sessionStorage.setItem("tasks_list_session_filters", JSON.stringify(s)); } catch(e2) {}
                }
                cd.resolve();
            },
            error: function() { cd.resolve(); }
        });
        deferreds.push(cd.promise());
    }

    if (filters.contract_id_filter && filters.contract_id_filter.id) {
        var cntid = filters.contract_id_filter.id;
        var cnttext = filters.contract_id_filter.text || cntid;
        var cntd = $.Deferred();
        $.ajax({
            url: site_url + 'api/autocomplete_single', method: 'GET',
            data: { table: 'contracts', id: cntid, fields: 'contract_number', add_fields: '', check_active: 1, element: 'contract_id_filter' },
            success: function(resp) {
                if (resp && resp.status === true) {
                    if (!$("#contract_id_filter option[value='" + cntid + "']").length) {
                        $("#contract_id_filter").append(new Option(cnttext, cntid, true, true));
                    }
                    $("#contract_id_filter").val(cntid).trigger("change");
                    restoredAny = true;
                } else {
                    try { var s = JSON.parse(sessionStorage.getItem("tasks_list_session_filters") || '{}'); delete s.contract_id_filter; sessionStorage.setItem("tasks_list_session_filters", JSON.stringify(s)); } catch(e2) {}
                }
                cntd.resolve();
            },
            error: function() { cntd.resolve(); }
        });
        deferreds.push(cntd.promise());
    }

    if (deferreds.length === 0) return $.Deferred().resolve(restoredAny).promise();
    return $.when.apply($, deferreds).then(function() { return restoredAny; });
}

if ($("#task-datatables").length) {
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
        site_url + "task-status/get_all_dropdown",
        "title"
    );
    select2_ajax("#queue_filter", site_url + "queue/get_all", "title", null);
    add_autocomplete_sel("#contract_id_filter", "contracts", ["contract_number"], null, null);
    select2_ajax_users("#engineer_id_filter", { user_type: 16 });
    $("#custom_filter").select2({ allowClear: true, placeholder: 'Quick Filter' });

    if (sessionStorage.getItem("tasks_list_session_filters")) {
        restore_tasks_session_filters().then(function() {
            get_search_filter_data("load");
            get_user_filters(master_data_type);
        });
    } else {
        fetch_default_filter(master_data_type);
    }

    var breadcrumbs = [
        { label: "Task List", url: "javascript: void(0);" }
    ];
    set_breadcrumb(breadcrumbs);
}

$(document).on("click", "#task-datatables a", function () {
    save_tasks_session_filters();
});

$(window).on("beforeunload", function () {
    save_tasks_session_filters();
});

$(document).on("change", "#client_id_filter", function () {
    var val = $.trim($(this).val());
    var client_id = null;
    $('#contract_id_filter').select2('destroy').empty().select2({ placeholder: 'All Contracts' });
    $('#property_id_filter').select2('destroy').empty().select2({ placeholder: 'All Properties' });
    if (val != '' && val != undefined && val != null) {
        client_id = { client_id: val };
    }
    add_autocomplete_sel("#contract_id_filter", "contracts", ["contract_number"], null, client_id);
    add_autocomplete_sel("#property_id_filter", "client_properties", ["uprn_no"], null, client_id);
})

function status_label(value) {
    if (value == null) {
        return "-";
    }

    var icon = `<span class="badge border border-indigo text-indigo text-capitalize">${value}</span>`;
    if (value == '0' || value.toLowerCase() == 'open') {
        icon = `<span class="badge  border border-indigo text-indigo  text-capitalize">Open</span>`;
    }
    else if (value == '0' || value.toLowerCase() == 'pending') {
        icon = `<span class="badge  border text-capitalize border-warning text-warning">Pending</span>`;
    }
    else if (value == '1' || value.toLowerCase() == 'complete' || value.toLowerCase() == 'completed' || value.toLowerCase() == 'task complete') {
        icon = `<span  class="badge  border border-success text-success  text-capitalize">Complete</span>`;
    }
    else if (value == '2' || value.toLowerCase() == 'rejected' || value == '3') {
        icon = `<span class="badge  border border-danger text-danger  text-capitalize" >Rejected</span>`;
    }
    else if (value.toLowerCase() == 'cancelled') {
        icon = `<span class="badge  border border-danger text-danger  text-capitalize" >Cancelled</span>`;
    }
    else if (value.toLowerCase() == 'approved') {
        icon = `<span class="badge  border border-success text-success  text-capitalize">Approved</span>`;

    }
    else if (value.toLowerCase() == 'in progress') {
        icon = `<span class="badge border text-capitalize border-indigo text-indigo" >In Progress</span>`;
    }
    else if (value.toLowerCase() == 'abandoned' || value.toLowerCase() == 'task abandoned') {
        icon = `<span class="badge border text-capitalize border-danger text-danger" >Abandoned</span>`;
    }
    else if (value.toLowerCase() == 'h&s fail') {
        icon = `<span class="badge border text-capitalize border-danger text-danger" >H&S Failed</span>`;
    }
    else if (value.toLowerCase() == 'asbestos fail') {
        icon = `<span class="badge border text-capitalize border-danger text-danger" >Asbestos Failed</span>`;
    }
    else if (value.toLowerCase() == 'no access') {
        icon = `<span class="badge border text-capitalize border-danger text-danger" >No Access</span>`;
    }
    else if (value.toLowerCase() == 'further works') {
        icon = `<span class="badge border text-capitalize border-indigo text-indigo">Further Works</span>`;
    }
    else if (value.toLowerCase() == 'materials required') {
        icon = `<span class="badge border text-capitalize border-warning text-warning" >Materials Required</span>`;
    }
    else if (value.toLowerCase() == 'start task') {
        icon = `<span class="badge border text-capitalize border-purple text-purple">Start Task</span>`;
    }

    return icon;
}

function cert_status_label(value) {
    if (value === null) return "-";
    value = String(value);
    switch (value) {
        case '0':
            return `<span class="badge border border-warning text-warning text-capitalize">Pending</span>`;
        case '1':
            return `<span class="badge border border-success text-success text-capitalize" >Complete</span>`;
        case '2':
            return `<span class="badge border border-danger text-danger text-capitalize">Rejected</span>`;
        case '3':
            return `<span class="badge border border-success text-success text-capitalize">Update and approve</span>`;
        case '4':
            return `<span class="badge border border-success text-success text-capitalize">Approved</span>`;
        default:
            return "-";
    }
}

function set_job_id(job_id) {
    $("#job_id").val(job_id);
}

