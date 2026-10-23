var service_ids = [];
var master_data_type = "job";
dataTable = null;
is_job_complete = false;
var data_keys = [
    "title",
    "priority",
    "description",
    "preferred_date",
    "preferred_time",
];

var resident_email = '';
var resident_mobile = '';
var engr_email = '';
var engr_mobile = '';
var job_task_details = [];
var job_property_id = null;
var job_contract_id = null;
var job_service_id = null;
var job_workstream_id = null;
var job_target_datetime = null;
var editorInstance = null;
// Client that owns the currently selected property; null when no property is chosen.
// Used to reject clients/contracts that do not belong to that property.
var job_property_client_id = null;
// Property currently rendered in the Job/Task Property Details panel; prefills the quick-edit popup.
var current_panel_property = null;
var is_setup_copy = false;
var asset_total_quantity = 0;

// Set on the task edit form when the parent job is invoiced: the chargeable total
// this task must still add up to when saved. null means the total is not locked.
// The server enforces the same rule — this only shows the user where they stand.
var task_invoiced_target = null;
var task_invoiced_poll = null;

var task_sor_index = 1;
var task_sor_row = null;

// Jobs ticked on the Job list for a bulk communication. The grid is server side
// paged, so rows are destroyed on every redraw - the selection has to live here
// rather than being read back off the checkboxes.
// Key: hashed job id (the checkbox value). Value: { client_id, code }.
var selectedJobs = new Map();

function load_data_table(limit, search_term, filters) {
    // Searching or refiltering builds a different result set, so any jobs ticked
    // for a bulk communication are now stale - drop the selection and hide the
    // button. Paging does not come through here, so cross-page ticks survive.
    clear_job_selection();

    data_filters = {};
    let params = new URLSearchParams(window.location.search);
    if (params.get('batch_code')) {
        data_filters.ppm_batch_code = params.get('batch_code') || '';
    }
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

    //var user_contracts = JSON.parse(ajs_form_handler.get_token('user_contracts'));

    // Save first, so clearing the filters also clears the stored ones, then stop -
    // the job list stays empty until something is actually filtered.
    save_jobs_session_filters();

    if (gate_empty_filters("#job-datatables", data_filters, search)) {
        dataTable = null;
        return;
    }

    dataTable = new DataTable("#job-datatables", {
        scrollY: (screen.height - 500) + 'px',
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
            url: site_url + "job/get_all",
            method: "GET",
            async: false,
            dataSrc: "data",
            data: function (d) {
                return $.extend({}, d, {
                    data_filters,
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr) {
                ajs.datatable_error(xhr, "job-datatables");
            }
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
                    // Copying creates a new job, so it belongs to the Jobs 'add' right - same gate
                    // as the Copy button on the job detail header (views/jobs/details.php).
                    var copyButton = `<a href="javascript:void(0);" class="cursor-pointer copy_job_btn check-permission" data-module="Jobs" data-action="add" data-job_id="${row.id}" data-job_code="${row.code}" title="Copy Job"><i class='ri-file-copy-fill align-bottom me-1 text-muted primary-btn fs-15'></i></a>`;
                    if (check_is_job_complete(row.status))
                    {
                        if (row.financial_status == '1') {
                            return `<a href="javascript:void(0);" class="cursor-pointer" id="generate_job_invoice" data-job_id="${row.id}" title="Generate Invoice" data-client_id="${row.client_id}" data-contract_id="${row.contract_id}"><i class='ri-file-list-3-line me-2 fs-15 text-muted'></i></a>${copyButton}`;
                        }
                        return '<span class="me-3">&nbsp;&nbsp;</span>'+copyButton;
                    } else {
                        return (`<a href="` + cdn_url + 'job/details/' + ajs.hash_encode(row.id) + `" >` + view_icon() + `</a>
                                <a id="job_edit_` + row.id + `"  data-after-load-func="edit_job_form" data-heading="Edit Job - #` + row.code + `" data-form-url="` + cdn_url + `job/edit/` + row.id + `" class="popup-form-button" >` + edit_icon() + `</a>` + copyButton);
                    }
                },
            },
            {
                name: "select",
                data: null,
                className: "noVis select-col",
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                    return `<input class="form-check-input job-select-cb" type="checkbox" id="job_cb_${row.id}" value="${ajs.hash_encode(row.id)}" data-client-id="${row.client_id}" data-job-code="${row.code}">`;
                },
            },
            {
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
            },
            {
                name: "jobs.code",
                data: "code",
                className: "task-id-box noVis",
                render: function (data, type, row) {
                    const status = ['open'];
                    var is_emergency = (row.emergency_job == 1) ? '<i class="mdi mdi-circle fs-11 align-middle me-1 emergency-task-icon blink-" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="Emergency Job"></i>' : '';
                    var is_overdue = (status.includes(row.status.toLowerCase()) && row.target_date && moment(row.target_date) < moment()) ? '<i class="mdi mdi-circle fs-11 align-middle me-1 overdue-task-icon blink-" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="Overdue Job"></i>' : '';
                    var str = "";
                    str +=
                        `<div class="d-inline-flex">
                                <div class="align-items-center">
                                  <a  href="` + cdn_url + 'job/details/' + ajs.hash_encode(row.id) + `" class="avatar-group-item pe-1" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="` +
                        data + `">` + data + `</a> ${is_emergency} ${is_overdue} </div> </div>`;

                    return str;
                },
            },
            {
                name: "service_name",
                data: "service_name",
                render: function (data) {
                    if (!data) return "-";
                    return `<span data-bs-toggle="tooltip" data-bs-trigger="hover" title="${data}">${truncate_string(data, 10)}</span>`;
                }
            },
            {
                name: "client_code",
                data: "client_code",
                render: function (data, type, row) {
                    return gen_client_detail_link(row.client_id, data);
                }
            },
            {
                name: "uprn_no",
                data: "uprn_no",
                render: function (data, type, row) {
                    return gen_property_detail_link(row.property_id, data);
                }
            },
            {
                name: "contract_number",
                data: "contract_number",
                render: function (data, type, row) {
                    return gen_contract_detail_link(row.contract_id, data);
                }
            },
            {
                data: "address1",
                name: "address1",
                render: function (data, type, row) {
                    return `<span data-bs-toggle="tooltip" data-bs-trigger="hover" title="${data}">${truncate_string(data, 20)}</span>`;
                }
            },
            {
                data: "postalcode",
                name: "postalcode"
            },
            {
                data: "status",
                name: "status",
                render: function (data) {
                    return status_label(data);
                },
            },
            {
                data: "financial_status",
                name: "financial_status",
                render: function (data, type, row) {
                    return status_label_fin(data, row?.is_available_cost);
                },
            },
            {
                data: "job_tasks",
                name: "job_tasks",
                orderable: false,
                searchable: false,
                render: function (data, type, row) {
                    var taskCount = 0;
                    var completedCount = 0;

                    if (Array.isArray(data) && data.length > 0) {
                        taskCount = data.filter(function (task) {
                            return task.task_type == 'E';
                        }).length;
                        completedCount = data.filter(function (task) {
                            return task.task_type == 'E' && is_task_completed_status(task);
                        }).length;
                    }

                    var progressPercentage = taskCount > 0 ? Math.round((completedCount / taskCount) * 100) : 0;

                    return `<div class="d-flex align-items-center" style="gap: 8px;">
                        <div style="width: 100px;">
                            <div class="progress" style="height: 20px;">
                                <div class="progress-bar" role="progressbar" style="width: ${progressPercentage}%;" aria-valuenow="${progressPercentage}" aria-valuemin="0" aria-valuemax="100">
                                    ${progressPercentage}%
                                </div>
                            </div>
                        </div>
                        <small class="text-muted">${completedCount}/${taskCount}</small>
                    </div>`;
                }
            },
            {
                data: "target_date",
                name: "target_date",
                render: function (data) {
                    return ajs.format_date(data);
                }
            },
            {
                data: "job_created_date",
                name: "job_created_date",
                render: function (data) {
                    return ajs.format_date(data);
                }
            }
        ],
        order: [[2, "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Jobs");
            // Row actions are rebuilt on every draw, so the check-permission gates on them
            // (Copy Job) have to be re-evaluated here too - apply_ind_roles only handles the
            // class-based ones like .edit-btn.
            ajs.apply_permissions();
            $('[data-bs-toggle="tooltip"]').each(function () {
                new bootstrap.Tooltip(this);
            });
            restore_job_selection();
        }
    });

    // dataTable.setDetailRow = function (rowData) {
    //     var taskHtml = "";
    //     $.each(rowData.job_tasks, function (index, task) {
    //         if (task.assigned_to == null || task.assigned_to == "") {
    //             task.assigned_to = "-";
    //         }
    //         if (task.summary == null || task.summary == "") {
    //             task.summary = "-";
    //         }
    //         taskHtml +=
    //                 `<tr>
    //                 <td>` + task.task_code + `</td>
    //                 <td>` + task.task_name + `</td>
    //                 <td>` + task.assigned_to + `</td>
    //                 <td>` + task.summary + `</td>
    //                 <td>` + task.task_status + `</td>
    //                 <td>` + task.total_certificates + `</td>
    //                 <td>` + task.total_sors + `</td>
    //             </tr>`;
    //     });

    //     if (taskHtml == "") {
    //         taskHtml = "<td colspan='7' align='center'> Data Not Available</td>";
    //     }
    //     return `
    //         <div class="details-row detail-row-main-tbl row job-details-row">
    //         <div class="col-md-2">
    //                 <p>Email: ${rowData.client_email ?? ''}</p>
    //                 <p>Phone No.: ${rowData.client_phone ?? ''}</p>
    //         </div>
    //         <div class="col-md-10">
    //             <table class="table mb-0">
    //                 <thead>
    //                     <tr>
    //                     <th>Task #</th>
    //                     <th>Action</th>
    //                     <th>Assigned To</th>
    //                     <th>Summary</th>
    //                     <th>Status</th>
    //                     <th>Certificates</th>
    //                     <th>SORs</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>${taskHtml}</tbody>
    //             </table>
    //         </div>
    //     </div>
    //     `;
    // }
}

if ($("#job-datatables").length) {
    var breadcrumbs = [
        { label: 'Jobs', url: null },
    ];
    set_breadcrumb(breadcrumbs);

    let params = new URLSearchParams(window.location.search);

    add_autocomplete_sel("#ppm_batch_code_filter", "contract_masterplan_logs", ["batch_code"], null, null, 'body', params.get('batch_code'));
    add_autocomplete_sel("#client_id_filter", "clients", ["client_code"], null, null);
    add_autocomplete_sel("#property_id_filter", "client_properties", ["uprn_no"], null, null);
    select2_ajax("#status_id_filter", site_url + "master-record/get_all", "master_value", { master_code: "JOB_STATUS" });
    select2_ajax(
        "#tag_id_filter",
        site_url + "tag/get_all",
        "title",
        { module: 'job' }
    );
    $("#custom_filter").select2({ allowClear: true, placeholder: 'Quick Filter' });
    $("#financial_status_filter").select2({ allowClear: true, placeholder: 'Financial Status' });
    if (params.get('custom_filter')) {
        load_data_table(ajs.datatable_limit, "", { filters: { custom: params.get('custom_filter') } });
    } else if (params.get('batch_code')) {
        load_data_table(ajs.datatable_limit, "");
    } else if (params.get('search')) {
        $('#search_term').val(params.get('search'));
        load_data_table(ajs.datatable_limit, params.get('search'), {});
    } else if (sessionStorage.getItem("job_list_session_filters")) {
        restore_jobs_session_filters().then(function() {
            get_search_filter_data("load");
            get_user_filters(master_data_type);
        });
    } else {
        fetch_default_filter(master_data_type, true, '#job-datatables');
    }
}

// ─── Job list multi-select for bulk communication ────────────────────────────

// Re-tick the boxes for jobs already in selectedJobs. Called from drawCallback,
// so paging back and forth keeps the selection intact.
function restore_job_selection() {
    if (!$("#job-datatables").length) return;

    $("input.job-select-cb").each(function () {
        $(this).prop("checked", selectedJobs.has($(this).val()));
    });
    sync_job_select_all();
    toggle_bulk_comm_button();
}

function sync_job_select_all() {
    var total = $("input.job-select-cb").length;
    var selected = $("input.job-select-cb:checked").length;
    $("#job-select-all").prop("checked", total > 0 && total == selected);
}

function toggle_bulk_comm_button() {
    $("#bulk_comm_count").text(selectedJobs.size);
    if (selectedJobs.size > 0) {
        $("#bulk_comm_btn_wrap").removeClass("hide");
    } else {
        $("#bulk_comm_btn_wrap").addClass("hide");
    }
}

function clear_job_selection() {
    selectedJobs.clear();
    $("input.job-select-cb").prop("checked", false);
    $("#job-select-all").prop("checked", false);
    toggle_bulk_comm_button();
}

// $.getScript defaults to cache:false, which appends _=<timestamp> and would
// re-download the 1.4 MB editor bundle on every call - go through $.ajax so the
// browser cache is actually used.
function cached_script(url) {
    return $.ajax({ url: url, dataType: 'script', cache: true });
}

// The Job list does not ship CKEditor or the datetimepicker - jobs/details.php
// does. Pull them in on first use rather than adding ~1.4 MB to every list load.
var bulkCommAssetsPromise = null;

function load_bulk_comm_assets() {
    if (bulkCommAssetsPromise) return bulkCommAssetsPromise;

    var pending = [];

    if (!$.fn.datetimepicker) {
        if (!$('link[href*="jquery.datetimepicker"]').length) {
            $('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.min.css">');
        }
        pending.push(cached_script('https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js'));
    }

    // app/ckeditor.js reads ClassicEditor and the plugin classes off the UMD
    // bundle, so it has to load second - same order as jobs/details.php.
    if (typeof init_ckeditor !== 'function') {
        pending.push(
            cached_script(cdn_url + 'assets/js/ckeditor5.umd.js').then(function () {
                return cached_script(cdn_url + 'assets/js/app/ckeditor.js');
            })
        );
    }

    bulkCommAssetsPromise = Promise.all(pending).catch(function (e) {
        bulkCommAssetsPromise = null;   // let the next click retry
        throw e;
    });

    return bulkCommAssetsPromise;
}

$(document).on("change", "input.job-select-cb", function () {
    var key = $(this).val();
    if ($(this).is(":checked")) {
        selectedJobs.set(key, {
            client_id: $(this).data("client-id"),
            code: $(this).data("job-code")
        });
    } else {
        selectedJobs.delete(key);
    }
    sync_job_select_all();
    toggle_bulk_comm_button();
});

// Header checkbox only covers the rows currently rendered - selections made on
// other pages are left alone.
$(document).on("change", "#job-select-all", function () {
    var checked = $(this).is(":checked");
    $("input.job-select-cb").prop("checked", checked).trigger("change");
    $(this).prop("checked", checked);
});

// Shift-click range select, same behaviour as the bulk assign grid.
$(document).on("click", "#job-datatables input.job-select-cb", function (e) {
    var checkboxes = $("#job-datatables input.job-select-cb").toArray();

    if (e.shiftKey && window.job_last_checked_cb && $.contains(document, window.job_last_checked_cb)) {
        var start = checkboxes.indexOf(this);
        var end = checkboxes.indexOf(window.job_last_checked_cb);
        if (start > -1 && end > -1) {
            var from = Math.min(start, end);
            var to = Math.max(start, end);
            for (var i = from; i <= to; i++) {
                if (checkboxes[i].checked !== this.checked) {
                    $(checkboxes[i]).prop("checked", this.checked).trigger("change");
                }
            }
        }
    }

    window.job_last_checked_cb = this;
});

// Suppress text selection while shift-clicking a range.
["keyup", "keydown"].forEach(function (event) {
    window.addEventListener(event, function (e) {
        if (!$("#job-datatables").length) return;
        document.onselectstart = function () {
            return !(e.key == "Shift" && e.shiftKey);
        };
    });
});

// Deliberately not a .popup-form-button: that is a document level delegated
// handler which would open the offcanvas before these checks could run.
$(document).on("click", "#bulk_comm_btn", function () {
    if (selectedJobs.size < 1) {
        Swal.fire({
            title: "Unable to Proceed",
            icon: "error",
            text: "Please select at least one job before proceeding."
        });
        return false;
    }

    var clientIds = new Set();
    selectedJobs.forEach(function (job) {
        clientIds.add(String(job.client_id));
    });

    if (clientIds.size > 1) {
        Swal.fire({
            title: "Unable to Proceed",
            icon: "error",
            text: "All selected jobs must belong to the same client to send a bulk communication."
        });
        return false;
    }

    ajs.show_loader();
    load_bulk_comm_assets().then(function () {
        ajs.showOffCanvasFormRight(cdn_url + "job/bulk-communication", "Bulk Communication", "bulk_send_email_sms");
    }).catch(function (e) {
        // showOffCanvasFormRight() runs the after-load function before it shows the
        // panel and swallows anything it throws, so surface it here instead.
        console.error('Bulk Communication failed to open', e);
        Swal.fire({
            icon: 'error',
            title: 'Could not open',
            text: 'The message editor could not be loaded. Please refresh the page and try again.'
        });
    }).then(function () {
        ajs.hide_loader();
    });
    return false;
});

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

function save_jobs_session_filters() {
    if (!$("#job-datatables").length || !$("#form_filters").length) return;

    var filters = {
        search_term: $("#search_term").val() || "",
        client_id_filter: get_select2_val_and_text("#client_id_filter"),
        ppm_batch_code_filter: get_select2_val_and_text("#ppm_batch_code_filter"),
        status_id_filter: get_select2_val_and_text("#status_id_filter"),
        financial_status_filter: get_select2_val_and_text("#financial_status_filter"),
        custom_filter: $("#custom_filter").val() || "",
        tag_id_filter: get_select2_val_and_text("#tag_id_filter")
    };

    // Storing an all-empty filter set would make the bootstrap take the
    // sessionStorage branch on every later visit, which skips the
    // "apply a filter first" gate and loads the whole job list. Clearing the key
    // instead also drops stale filters when the user empties them and searches.
    var has_any = filters.search_term || filters.custom_filter || filters.client_id_filter
        || filters.ppm_batch_code_filter || filters.status_id_filter
        || filters.financial_status_filter || filters.tag_id_filter;

    if (!has_any) {
        sessionStorage.removeItem("job_list_session_filters");
        return;
    }

    sessionStorage.setItem("job_list_session_filters", JSON.stringify(filters));
}

function restore_jobs_session_filters() {
    var sessionData = sessionStorage.getItem("job_list_session_filters");
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
    if (filters.custom_filter) {
        $("#custom_filter").val(filters.custom_filter).trigger("change");
        restoredAny = true;
    }
    if (filters.financial_status_filter && filters.financial_status_filter.id) {
        $("#financial_status_filter").val(filters.financial_status_filter.id).trigger("change");
        restoredAny = true;
    }
    if (filters.ppm_batch_code_filter && filters.ppm_batch_code_filter.id) {
        var pbid = filters.ppm_batch_code_filter.id;
        var pbtext = filters.ppm_batch_code_filter.text || pbid;
        if (!$("#ppm_batch_code_filter option[value='" + pbid + "']").length) {
            $("#ppm_batch_code_filter").append(new Option(pbtext, pbid, true, true));
        }
        $("#ppm_batch_code_filter").val(pbid).trigger("change");
        restoredAny = true;
    }
    if (filters.status_id_filter && filters.status_id_filter.id) {
        var stid = filters.status_id_filter.id;
        var sttext = filters.status_id_filter.text || stid;
        if (!$("#status_id_filter option[value='" + stid + "']").length) {
            $("#status_id_filter").append(new Option(sttext, stid, true, true));
        }
        $("#status_id_filter").val(stid).trigger("change");
        restoredAny = true;
    }
    if (filters.tag_id_filter && filters.tag_id_filter.id) {
        var tid = filters.tag_id_filter.id;
        var ttext = filters.tag_id_filter.text || tid;
        if (!$("#tag_id_filter option[value='" + tid + "']").length) {
            $("#tag_id_filter").append(new Option(ttext, tid, true, true));
        }
        $("#tag_id_filter").val(tid).trigger("change");
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
                    try { var s = JSON.parse(sessionStorage.getItem("job_list_session_filters") || '{}'); delete s.client_id_filter; sessionStorage.setItem("job_list_session_filters", JSON.stringify(s)); } catch(e2) {}
                }
                cd.resolve();
            },
            error: function() { cd.resolve(); }
        });
        deferreds.push(cd.promise());
    }

    if (filters.property_id_filter && filters.property_id_filter.id) {
        var pid = filters.property_id_filter.id;
        var ptext = filters.property_id_filter.text || pid;
        var pd = $.Deferred();
        $.ajax({
            url: site_url + 'api/autocomplete_single', method: 'GET',
            data: { table: 'client_properties', id: pid, fields: 'uprn_no', add_fields: '', check_active: 1, element: 'property_id_filter' },
            success: function(resp) {
                if (resp && resp.status === true) {
                    if (!$("#property_id_filter option[value='" + pid + "']").length) {
                        $("#property_id_filter").append(new Option(ptext, pid, true, true));
                    }
                    $("#property_id_filter").val(pid).trigger("change");
                    restoredAny = true;
                } else {
                    try { var s = JSON.parse(sessionStorage.getItem("job_list_session_filters") || '{}'); delete s.property_id_filter; sessionStorage.setItem("job_list_session_filters", JSON.stringify(s)); } catch(e2) {}
                }
                pd.resolve();
            },
            error: function() { pd.resolve(); }
        });
        deferreds.push(pd.promise());
    }

    if (deferreds.length === 0) return $.Deferred().resolve(restoredAny).promise();
    return $.when.apply($, deferreds).then(function() { return restoredAny; });
}

$(document).on("click", "#job-datatables a", function () {
    save_jobs_session_filters();
});

$(window).on("beforeunload", function () {
    if ($("#job-datatables").length) {
        save_jobs_session_filters();
    }
});

function status_label(value, is_cancelled = 0) {
    if (value == null) {
        return "-";
    }

    var icon = `<span class="badge border border-indigo text-indigo text-capitalize">${value}</span>`;
    if (is_cancelled == 1) {
        return `<span class="badge border text-capitalize border-danger text-danger">Cancelled</span>`;
    }
    if (value == '0' || value.toLowerCase() == 'open') {
        icon = `<span class="badge  border border-indigo text-indigo  text-capitalize">Open</span>`;
    } else if (value == '0' || value.toLowerCase() == 'pending') {
        icon = `<span class="badge  border border-warning text-warning text-capitalize">Pending</span>`;
    } else if (value == '1' || value.toLowerCase() == 'complete' || value.toLowerCase() == 'completed' || value.toLowerCase() == 'task complete') {
        icon = `<span  class="badge  border border-success text-success  text-capitalize">Complete</span>`;
    } else if (value == '2' || value.toLowerCase() == 'rejected' || value == '3') {
        icon = `<span class="badge  border border-danger text-danger  text-capitalize" >Rejected</span>`;
    } else if (value.toLowerCase() == 'cancelled') {
        icon = `<span class="badge  border border-danger text-danger  text-capitalize" >Cancelled</span>`;
    } else if (value.toLowerCase() == 'send cancel to havering') {
        icon = `<span class="badge  border border-warning text-warning  text-capitalize" >Cancellation requested</span>`;
    } else if (value.toLowerCase() == 'approved') {
        icon = `<span class="badge  border border-success text-success  text-capitalize">Approved</span>`;

    } else if (value.toLowerCase() == 'in progress') {
        icon = `<span class="badge border text-capitalize border-indigo text-indigo" >In Progress</span>`;
    } else if (value.toLowerCase() == 'abandoned' || value.toLowerCase() == 'task abandoned') {
        icon = `<span class="badge border text-capitalize border-danger text-danger" >Abandoned</span>`;
    } else if (value.toLowerCase() == 'h&s fail') {
        icon = `<span class="badge border text-capitalize border-danger text-danger" >H&S Failed</span>`;
    } else if (value.toLowerCase() == 'asbestos fail') {
        icon = `<span class="badge border text-capitalize border-danger text-danger">Asbestos Failed</span>`;
    } else if (value.toLowerCase() == 'no access') {
        icon = `<span class="badge border text-capitalize border-danger text-danger" >No Access</span>`;
    } else if (value.toLowerCase() == 'further works') {
        icon = `<span class="badge border text-capitalize border-indigo text-indigo">Further Works</span>`;
    } else if (value.toLowerCase() == 'materials required') {
        icon = `<span class="badge border border text-capitalize border-indigo text-indigo" >Materials Required</span>`;
    } else if (value.toLowerCase() == 'start task') {
        icon = `<span class="badge border text-capitalize border-purple text-purple">Start Task</span>`;
    }

    return icon;
}

function status_label_fin(value, is_available_cost = false) {
    let icon = "-";
    if (value == null) {
        return icon;
    }

    if (value == '0') {
        icon = (is_available_cost == true) ? '<span class="badge border bg-white text-capitalize border-danger text-danger">WIP</span>' : '-';
    } else if (value == '1') {
        icon = `<span class="badge border bg-white text-capitalize border-indigo text-indigo">Clear to Invoice</span>`;
    } else if (value == '2') {
        icon = `<span class="badge border bg-white text-capitalize border-success text-success" >Invoiced</span>`;
    } else if (value == '3') {
        icon = `<span class="badge border bg-white text-capitalize  border-success text-success" >APP Submitted</span>`;
    } else if (value == '4') {
        icon = `<span class="badge border bg-white text-capitalize border-indigo text-indigo" >APP Buildup</span>`;
    } else if (value == '5') {
        icon = `<span class="badge border bg-white text-capitalize border-danger text-danger" >APP Pending</span>`;
    }

    return icon;
}

function status_button_fin(id, job_status, value, invoice_detail, job = null) {
    if (value == null) {
        return "";
    }
    if (invoice_detail == null) {
        invoice_detail = "";
    }
    let btn = "";
    var job_done = !!job_status && (job_status.toLowerCase() == 'completed' || job_status.toLowerCase() == 'approved');
    // APP BUILDUP / APP Submitted stamp a batch and build its invoice, so they need
    // every task done and a batch this job doesn't share — a multi-job batch has to
    // go through the Bulk Process screen instead.
    var can_advance = job_done
        && !!job
        && are_all_tasks_fin_ready(job.job_tasks)
        && (Number(job.batch_job_count) || 0) <= 1;

    // console.log( job_status+'--value->>'+value+'--invoice_detail->>'+invoice_detail);
    if (value == '5' && can_advance) {
        btn = `<button class="btn btn-sm btn-success ms-1 job-app-buildup" data-id="${id}">App Buildup</button>`;
    }
    else if (value == '4' && can_advance) {
        btn = `<button class="btn btn-sm btn-success ms-1 job-app-submitted" data-id="${id}">App Submitted</button>`;
    }
    else if ((value == '0' || value == '5') && job_done) {
        // The contract may set a minimum margin. When it is enforced and this
        // job is under it the server refuses the change. The button stays
        // clickable so the reason can be shown on click — a dead disabled button
        // tells the user nothing. Unenforced, the job goes through and the
        // warning rides along on the confirm dialog.
        var mm = job && job.min_margin;
        if (mm && mm.below && mm.enforce) {
            btn = `<button class="btn btn-sm btn-success ms-1 min-margin-blocked" data-id="${id}" data-margin="${mm.margin}" data-min="${mm.min}">Clear to Invoice</button>`;
        } else {
            btn = `<button class="btn btn-sm btn-success ms-1 update-fin-status" data-id="${id}" data-status="1"${mm && mm.below ? ` data-margin-warning="Margin ${mm.margin}% is below the ${mm.min}% minimum set for this contract."` : ''}>Clear to Invoice</button>`;
        }
    }
    else if (value == '1' && job_done)
    {
        btn = `<button class="btn btn-sm btn-success ms-1 job-app-buildup" data-id="${id}">App Buildup</button>`;
    }
    else if (value == '3' && job_done) {
        if (invoice_detail != "") {
            btn = `<button class="btn btn-sm btn-success ms-1 update-fin-status" data-id="${id}" data-status="3">APP Submitted: ${invoice_detail.batch_no}</span>`;
        } else {
            btn = `<button class="btn btn-sm btn-success ms-1 update-fin-status" data-id="${id}" data-status="3">APP Submitted</span>`;
        }
    } else if (value == '4' && job_done) {
        if (invoice_detail != "") {
            btn = `<button class="btn btn-sm btn-success ms-1 update-fin-status" data-id="${id}" data-status="2">Invoiced: ${invoice_detail.invoice_no}</span>`;
        } else {
            btn = `<button class="btn btn-sm btn-success ms-1 update-fin-status" data-id="${id}" data-status="2">Invoiced</span>`;
        }
    }

    return btn;
}

function cert_status_label(value) {
    if (value == null) {
        return "-";
    }

    var icon = '';
    if (value == '0') {
        icon = `<span class="badge  border border-indigo text-indigo  text-capitalize">Pending</span>`;
    }
    if (value == '1') {
        icon = `<span class="badge  border border-success text-success  text-capitalize">Complete</span>`;
    }
    if (value == '2') {
        icon = `<span class="badge  border border-danger text-danger  text-capitalize">Rejected</span>`;
    }
    if (value == '3') {
        icon = `<span class="badge  border border-primary text-primary  text-capitalize">Update and approve</span>`;
    }
    if (value == '4') {
        icon = `<span class="badge  border border-primary text-primary  text-capitalize">Approved</span>`;
    }

    return icon;
}

function priority_label(value) {
    const labels = {
        high: `<span class="badge  border border-danger text-danger text-capitalize">` + value + `</span>`,
        medium: `<span class="badge  border border-indigo text-indigo  text-capitalize">` + value + `</span>`,
        low: `<span class="badge  border border-success text-success text-capitalize">` + value + `</span>`,
    };

    return labels[value] ?? "-";
}

function create_job_form(type = "create", is_copy = false) {
    if (type == "create") {
        var property_id = $('[id="property_id"]:hidden').val();
        var client_id = $('[id="client_id"]:hidden').val();
        var quote_approve_status_id = '';
        ajs.ajax_form(site_url + "master-record-by-code/" + 'APPROVE', null, "GET", null, "1", "1", function (response) {
            if (response.data) {
                if (response.data.id) {
                    quote_approve_status_id = response.data.id
                }
            }
        });

        if (property_id) {
            add_autocomplete_sel("#property_id", "client_properties", ["uprn_no", "postalcode"], null, null, "offcanvasRight", property_id).then(() => {
                $("#property_id").trigger('change');
            });
        } else if (client_id) {
            add_autocomplete_sel("#client_id", "clients", ["client_code"], null, null, "offcanvasRight", client_id).then(() => {
                $("#client_id").trigger('change');
            });
        } else {
            add_autocomplete_sel("#property_id", "client_properties", ["uprn_no", "postalcode"], null, null, "offcanvasRight");
            add_autocomplete_sel("#client_id", "clients", ["client_code"], null, null, "offcanvasRight");
        }
        var urlParams = new URLSearchParams(window.location.search);
        var quote_id = urlParams.get('quote_id');
        if (quote_id > 0) {
            add_autocomplete_sel("#quotation_id", "quotations", ["quotation_num"], null, { status_id: quote_approve_status_id }, "offcanvasRight", quote_id).then(() => {
                $("#quotation_id").trigger('change');
            });
        } else {
            add_autocomplete_sel("#quotation_id", "quotations", ["quotation_num"], null, { status_id: quote_approve_status_id }, "offcanvasRight");
        }
        // select2_ajax("#service_id", site_url + "service/get_all", "title", null, "offcanvasRight");
        select2_ajax('#tags', site_url + 'tag/get_all', 'title', { "module": "job" }, 'offcanvasRight');
        init_dropzone('#dropzone-jobs', '#dropzone-job-preview', '#dropzone-job-preview-list', 'jobs', 'image/*,.pdf,.doc,.docx', 'all');
        $('#job_created_date').val(moment().format('YYYY-MM-DDTHH:mm:ss'));

        // Opened from a contract screen (the Add Job action sets this), so the client and
        // contract are already decided and must not be swapped here.
        if ($('#hidden_contract_id').val() > 0) {
            lock_job_client_contract();
        }
    }

    $("#jobForm").validate({
        onkeyup: false,
        rules: {
            client_id: {
                required: true,
            },
            contract_id: {
                required: true,
            },
            property_id: {
                required: true,
            },
            property_id: {
                required: true,
            },
            service_id: {
                required: true,
            },
            client_email: {
                email: true,
            },
            status_id: {
                required: function () {
                    return $("#edit_id").val() > 0;
                }
            },
        },
        errorPlacement: function (error, element) {
            if (
                element.hasClass("select2") &&
                element.next(".select2-container").length
            ) {
                error.insertAfter(element.next(".select2-container"));
            } else if (element.parent(".input-group").length ||
                element.parent(".error-div").length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            var sub_button = $(form).find(":submit:first");
            ajs.submit_button_element = sub_button;
            var action = $(form).attr("action");
            var method = $(form).attr("method");
            // not needed
            // ajs.set_localtime_to_utc('target_date');
            // ajs.set_localtime_to_utc('job_created_date');
            var formData = $(form).serializeArray();
            // Modify checkbox value if checked
            const url = new URL(window.location.href);

            // Remove specific query parameters
            url.searchParams.delete('in_quote');
            url.searchParams.delete('quote_id');

            // Replace the current URL in the browser without reloading
            // console.log($('[id="property_id"]:hidden').val());
            // console.log($('[id="client_id"]:hidden').val());

            window.history.replaceState({}, '', url.toString());
            ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.offcanvas_form, ajs_form_handler.offcanvas_form);

            var result_json = ajs.current_form_response;
            if (typeof $is_calendar === 'undefined') { //call from scheduler
                if (ajs_form_handler.check_result(result_json)) {
                    if (typeof result_json.keep_open !== 'undefined' && result_json.keep_open == '1' && is_copy && $("#is_detail_page").val() == "1") {
                        setTimeout(function () {
                            var new_id = result_json.job_id;
                            window.location.href = cdn_url + "job/details/" + ajs.hash_encode(new_id)+"?add_task=1";
                         }, 500);
                        return false;
                    } else if (typeof result_json.keep_open !== 'undefined' && result_json.keep_open == '1') {
                        setTimeout(function () {
                            ajs.hide_button_loader();
                            var id = result_json.job_id;
                            ajs.showOffCanvasFormRight(cdn_url + "job/edit/" + id, "Edit Job #" + result_json.job_code, null, true);
                            create_job_form("edit");

                            ajs.ajax_form(site_url + "job/get/" + id + "?edit=true", null, "GET", null, "0", "0", load_data, load_data);
                        }, 100);
                    } else {
                        $('.offcanvas-backdrop').remove();
                    }
                }
            } else {
                reinitCalendar();
            }

            setTimeout(function () {
                if ($("#is_detail_page").val()) {
                    get_details();
                    const url = new URL(window.location.href);

                    // Remove specific query parameters
                    url.searchParams.delete('in_quote');
                    url.searchParams.delete('quote_id');

                    // Replace the current URL in the browser without reloading
                    window.history.replaceState({}, '', url.toString());
                }
            }, 100);

            return false;
        },
    });
}

function create_task_form(type = "create") {
    // Re-arm the NO_ACCESS warning each time the form is opened fresh.
    var createTaskFormEl = document.getElementById('createTaskForm');
    if (createTaskFormEl) {
        delete createTaskFormEl.dataset.noAccessConfirmed;
    }
    $('#is_send_now').prop('checked', false).trigger('change');

    // Clear any lock left over from a previously opened task; the edit branch of
    // set_job_details_for_task re-arms it when the job turns out to be invoiced.
    // Calling the refresh with a null target also stops the poll.
    task_invoiced_target = null;
    refresh_invoiced_total_banner();
    $("#createTaskForm").closest('.offcanvas').addClass('custom-offcanvas-right').removeClass('custom-offcanvas-right3');

    if (type == "create") {
        init_dropzone('#dropzone-docs', '#dropzone-doc-preview', '#dropzone-doc-preview-list', 'tasks', 'image/*,.pdf,.doc,.docx', 'all');
        select2_ajax('#task_tags', site_url + 'tag/get_all', 'title', { "module": "task" }, 'offcanvasRight3');
    }

    $("#createTaskForm").validate({
        onkeyup: false,
        rules: {
            job_id_hidden: {
                required: true,
            },
            task_id: {
                required: true,
            },
            task_code: {
                required: true,
            },
            status_id: {
                required: true,
            },
            queue_id: {
                required: '#is_assigned_0:checked'
            },
            engineer_id: {
                required: '#is_assigned_1:checked'
            },
            appointment_date: {
                required: '#is_assigned_1:checked'
            },
            appointment_time: {
                required: '#is_assigned_1:checked'
            },
            preferred_date: {
                required: '#is_assigned_1:checked'
            },
            preferred_time: {
                required: '#is_assigned_1:checked'
            },
        },
        messages: {
            appointment_date: {
                min: getMinDateMessage('#appointment_date')
            },
            preferred_date: {
                min: getMinDateMessage('#preferred_date')
            }
        },
        errorPlacement: function (error, element) {
            if (
                element.hasClass("select2") &&
                element.next(".select2-container").length
            ) {
                error.insertAfter(element.next(".select2-container"));
            } else if (element.parent(".input-group").length ||
                element.parent(".error-div").length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            // "Save and Duplicate" (edit mode only). Read the flag and the source task
            // here, before the AJAX call — a successful save replaces the offcanvas body,
            // so these fields are gone by the time the callback runs.
            var want_duplicate = $('#save_and_duplicate').val() === '1';
            var dup_source_id = $('#edit_task_id').val();
            var dup_task_code = $('#task_code').val();

            // A task moved to "Cancelled" must carry a cancellation reason
            // (all clients; the server enforces this too).
            if (selected_status_is_cancelled() && !$('#cancellation_reason_id').val()) {
                $('#cancel_reason_wrap').show();
                ajs_form_handler.show_blocking_error('Please select a cancellation reason.');
                return false;
            }

            var $dup_btn = $(form).find('#save-duplicate-btn');
            var sub_button = (want_duplicate && $dup_btn.length) ? $dup_btn : $(form).find(":submit:first");
            ajs.submit_button_element = sub_button;
            var action = $(form).attr("action");
            var method = $(form).attr("method");

            // On an invoiced job the billed total is frozen. Stop here with the
            // same message the server would return — the server re-checks either
            // way, this just saves the user a failed round trip.
            if (task_invoiced_target !== null) {
                var submitted_total = get_task_sors_total();
                if (Math.abs(submitted_total - task_invoiced_target) >= 0.005) {
                    refresh_invoiced_total_banner();
                    // Modal, not the page-top alert bar: this form is an offcanvas panel
                    // and the bar renders behind it, so the save looked like a no-op.
                    ajs_form_handler.show_blocking_error('This job is invoiced, so the total cannot change. It must stay at '
                        + task_invoiced_target.toFixed(2) + ' but your changes come to ' + submitted_total.toFixed(2)
                        + '. You can move amounts between SOR lines, but the total must match the invoice.');
                    return false;
                }
            }

            var pref_date = $("#preferred_date").val();
            var pref_time = $("#preferred_time").val();

            // for converting local time to UTC
            if (pref_time != '') {
                var localTime = pref_date + ' ' + pref_time;
                var utcTime = moment(localTime, "YYYY-MM-DD HH:mm").utc().format("YYYY-MM-DD HH:mm:ss");
                [pref_date, pref_time] = utcTime.split(' ');
                $("#preferred_date").val(pref_date);
                $("#preferred_time").val(pref_time);
            }

            var appoint_date = $("#appointment_date").val();
            var appoint_time = $("#appointment_time").val();
            // for converting local time to UTC
            if (appoint_time != '') {
                var localTime = appoint_date + ' ' + appoint_time;
                var utcTime = moment(localTime, "YYYY-MM-DD HH:mm").utc().format("YYYY-MM-DD HH:mm:ss");
                [appoint_date, appoint_time] = utcTime.split(' ');
                $("#appointment_date").val(appoint_date);
                $("#appointment_time").val(appoint_time);
            }

            // Warn when this job already has 3+ NO_ACCESS attempts before a manual create.
            if ((window.current_job_no_access_count || 0) >= 3 && !form.dataset.noAccessConfirmed) {
                Swal.fire({
                    title: 'No Access Warning',
                    text: 'There are already 3 NO ACCESS attempts for this property. Do you still want to create the task?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, create',
                    cancelButtonText: 'Cancel',
                    customClass: { confirmButton: 'btn btn-primary me-2', cancelButton: 'btn btn-light' },
                    buttonsStyling: false,
                }).then(function (r) {
                    if (r.isConfirmed) {
                        form.dataset.noAccessConfirmed = '1';
                        $(form).submit();
                    }
                });
                return false; // block this submit; resubmit only after confirm
            }

            var formData = $(form).serializeArray();

            var is_send_now = $('#is_send_now').is(':checked');
            var task_type = $('#task_type').val();
            var task_type_name = ($('#task_type_name').val() || '').toLowerCase();
            var task_code = ($('#createTaskForm').data('task_code') || $('#task_code').val() || '').toLowerCase();

            var is_internal = (task_type === 'I');
            var is_letter = (task_code === 'lettercomm' || task_type_name.includes('letter') || task_code.includes('letter'));

            ajs.ajax_form(action, formData, method, null, "1", "1", function (result_json) {
                ajs_form_handler.offcanvas_form3(result_json);

                setTimeout(function () {
                    refresh_job_tasks();
                }, 100);

                // Save and Duplicate: the edit is saved, now hand the user the prefilled
                // copy of it. Nothing below applies — the letter/print flow needs the
                // task_id of a newly created task, which job-task/edit does not return.
                if (want_duplicate && ajs_form_handler.check_result(result_json) && dup_source_id > 0) {
                    reopen_task_form_as_copy(dup_source_id, dup_task_code);
                    return;
                }

                if (ajs_form_handler.check_result(result_json) && is_internal && is_send_now && is_letter) {
                    var created_task_id = result_json.task_id;

                    Swal.fire({
                        title: 'Choose action',
                        text: '',
                        icon: 'question',
                        showCancelButton: true,
                        showDenyButton: true,
                        confirmButtonText: 'Download',
                        denyButtonText: 'Auto Print',
                        cancelButtonText: 'Cancel',
                        allowOutsideClick: false,
                        customClass: {
                            confirmButton: 'btn btn-primary me-2',
                            denyButton: 'btn btn-success me-2',
                            cancelButton: 'btn btn-secondary'
                        },
                        buttonsStyling: false,
                    }).then((choice) => {
                        if (choice.isDismissed) {
                            return;
                        }
                        var letter_action = choice.isConfirmed ? 'D' : 'A';
                        Swal.fire({
                            title: 'Processing...',
                            html: `<small>It might take some time to generate the PDF</small><br/><div class="progress" style="width:100%;margin-top:10px;background:#eee;border-radius:6px;height:10px;"><div id="progress-bar" style="width:0%;height:100%;border-radius:6px;"></div></div>`,
                            allowOutsideClick: false,
                            showConfirmButton: false,
                            showCancelButton: false,
                            didOpen: () => {
                                const progressBar = document.getElementById('progress-bar');
                                let progress = 0;

                                var printData = [...formData];
                                if (created_task_id) {
                                    printData.push({ name: 'job_task_id', value: created_task_id });
                                }
                                printData.push({ name: 'action', value: letter_action });
                                printData.push({ name: 'is_task_created', value: true });

                                ajaxWithRefresh({
                                    url: site_url + 'job-tasks/single_print',
                                    method: 'POST',
                                    data: $.param(printData),
                                    dataType: 'json',
                                    xhr: function () {
                                        var xhr = new XMLHttpRequest();
                                        xhr.upload.addEventListener('progress', function (e) {
                                            if (e.lengthComputable) {
                                                var percentComplete = (e.loaded / e.total) * 100;
                                                progress = percentComplete;
                                                if (progressBar) progressBar.style.width = progress + '%';
                                            }
                                        });
                                        return xhr;
                                    }
                                }).then(response => {
                                    Swal.close();
                                    if (letter_action === 'D') {
                                        const fileUrl = response.download_file_path;
                                        if (fileUrl) {
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Ready',
                                                text: response.message || 'Click download to get the file.',
                                                showCancelButton: true,
                                                confirmButtonText: 'Download',
                                                cancelButtonText: 'Close'
                                            }).then((res) => {
                                                if (res.isConfirmed) {
                                                    const a = document.createElement('a');
                                                    a.href = fileUrl;
                                                    a.download = '';
                                                    document.body.appendChild(a);
                                                    a.click();
                                                    document.body.removeChild(a);
                                                }
                                            });
                                        } else {
                                            Swal.fire('Error', 'File path not found in response.', 'error');
                                        }
                                    } else {
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Auto Print',
                                            text: response.message || 'Auto print request completed.',
                                            allowOutsideClick: true
                                        });
                                    }
                                    refresh_job_tasks();
                                }).catch(error => {
                                    Swal.close();
                                    let errMsg = "Something went wrong.";
                                    if (error && error.responseJSON && error.responseJSON.message) {
                                        errMsg = error.responseJSON.message;
                                    } else if (error && error.message) {
                                        errMsg = error.message;
                                    }
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Error',
                                        html: errMsg,
                                    });
                                });
                            }
                        });
                    });
                }
            }, ajs_form_handler.offcanvas_form3);

            return false;
        },
    });

    task_sor_index = 1;
    task_sor_row = $(".task-sor-row").first().clone();
}

// set  data in edit page
function load_data(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var job = result_json.data;
        // console.log(result_json);
        for (const [key, value] of Object.entries(job)) {
            if (data_keys.includes(key)) {
                $("#" + key).val(value);
            }
        }
        // $('#job_created_date').parent().parent().hide();
        $('#client_name').val(job.client_name);
        $('#client_phone').val(job.client_phone);
        $('#client_email').val(job.client_email);
        $('#client_work_order').val(job.client_work_order);
        $('#job_skills_hidden').val(job.service_skill_ids);
        $('#job_skills_names_hidden').val(job.service_skill_names);

        $("input[name=emergency_job][value=" + job.emergency_job + "]").attr('checked', 'checked');

        /* set_client_id(job.client_id);
        set_property_id(job.property_id, false);
        select2_ajax("#contract_id", site_url + "contract/get_all", "contract_number", {client_id: job.client_id}, "offcanvasRight", job.contract_id); 
        select2_ajax("#service_id", site_url + "service/get_all", "title", null, "offcanvasRight", job.service_id);*/
        set_select2_view("#client_id", job.client_id, job.client_code);
        set_select2_view("#property_id", job.property_id, job.uprn_no + ' | ' + job.postalcode);
        load_job_property_details(job.property_id);
        set_select2_view("#contract_id", job.contract_id, job.contract_number);
        set_select2_view("#service_id", job.service_id, job.service_name);
        show_dropdown_view_btn("#client_id");
        show_dropdown_view_btn("#property_id");
        select2_ajax("#job_status_id", site_url + "master-record/get_all", "master_value", { master_code: "JOB_STATUS" }, "offcanvasRight", job.status_id);
        set_quotation_id(job.quotation_id);
        $(".status-sec").show();

        var tags = pluck(job.tags, 'tag_id');
        select2_ajax('#tags', site_url + 'tag/get_all', 'title', { "module": "job" }, 'offcanvasRight', tags);

        set_sor_id(job.sor_id, job.contract_id);

        //$('#target_date').val(ajs.convert_utc_to_local(job.target_date));
        $('#target_date').val(job.target_date);
        $('#job_created_date').val(job.job_created_date);


        $('#property_id').attr('readonly', 'readonly');
        $('#contract_id').attr('readonly', 'readonly');
        $('#service_id').attr('readonly', 'readonly');
        $('#client_id').attr('readonly', 'readonly');
        $('#quotation_id').attr('readonly', 'readonly');
        $('#job_created_date').attr('readonly', 'readonly');
        $('#jobForm').find('.popup-form-search-button:not(.phrasebook-btn)').remove();


        // job.files is every document on the job - job level, task level and event level -
        // because the Media tab lists them all. The job's own dropzone must carry only the
        // job-level ones: saving re-posts whatever it holds as reference_type 'J', so seeding
        // it with the engineer's task photos silently created a second, job-level copy of each
        // one on every save. That is the duplicate rows in the Media tab.
        var job_level_files = (job.files || []).filter(function (file) {
            return file.reference_type == 'J';
        });
        init_dropzone('#dropzone-jobs', '#dropzone-job-preview', '#dropzone-job-preview-list', 'jobs', 'image/*,.pdf,.doc,.docx', 'all', job_level_files);
        get_task_table(job.job_tasks, job.financial_status);

    } else {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function set_data_for_copy(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {
        var job = result_json.data;
        is_setup_copy = true;
        
        $('#client_name').val(job.client_name);
        $('#client_phone').val(job.client_phone);
        $('#client_email').val(job.client_email);
        $('#client_work_order').val(job.client_work_order);
        $('#description').val(job.description);
        $('#job_skills_hidden').val(job.service_skill_ids);
        $('#job_skills_names_hidden').val(job.service_skill_names);        
        $('#job_created_date').val(moment().format('YYYY-MM-DDTHH:mm:ss'));
        $('#target_date').val(job.target_date);

        $("input[name=emergency_job][value=" + job.emergency_job + "]").attr('checked', 'checked');
        
        // The property is preloaded programmatically below, so seed the property/client link manually.
        job_property_client_id = job.client_id;

        set_client_id(job.client_id);
        add_autocomplete_sel("#property_id", "client_properties", ["uprn_no", "postalcode"], null, {client_id: job.client_id}, "offcanvasRight", job.property_id);
        load_job_property_details(job.property_id);
        select2_ajax("#contract_id", site_url + "contract/get_all", "contract_number", {client_id: job.client_id}, "offcanvasRight", job.contract_id);
        select2_ajax("#service_id", site_url + "service/contract_services_get_all/" + job.contract_id, "title", {'contract_services.status':1}, "offcanvasRight", job.service_id);

        select2_ajax("#job_status_id", site_url + "master-record/get_all", "master_value", {master_code: "JOB_STATUS"}, "offcanvasRight", job.status_id);
        set_quotation_id(job.quotation_id);

        var tags = pluck(job.tags, 'tag_id');
        select2_ajax('#tags', site_url + 'tag/get_all', 'title', {"module": "job"}, 'offcanvasRight', tags);
        
        $('#jobForm').find('.popup-form-search-button:not(.phrasebook-btn)').remove();


        init_dropzone('#dropzone-jobs', '#dropzone-job-preview', '#dropzone-job-preview-list', 'jobs', 'image/*,.pdf,.doc,.docx', 'all');

    } else {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function set_quotation_id(quotation_id) {
    var quote_approve_status_id = '';
    ajs.ajax_form(site_url + "master-record-by-code/" + 'APPROVE', null, "GET", null, "1", "1", function (response) {
        if (response.data) {
            if (response.data.id) {
                quote_approve_status_id = response.data.id
            }
        }
    });
    var quote_id = null
    if (quotation_id) {
        quote_id = quotation_id;
    }
    add_autocomplete_sel("#quotation_id", "quotations", ["quotation_num"], null, { status_id: quote_approve_status_id }, "offcanvasRight", quote_id);
}

// A property locks the job to its owning client; anything from another client is rejected.
function is_property_client_conflict(client_id) {
    return $('#property_id').val() > 0
        && job_property_client_id
        && client_id
        && client_id != job_property_client_id;
}

// Whether a task counts as "done" for the progress bar: complete/approved/rejected
// plus the terminal failure outcomes (NO_ACCESS / HS_FAILED / ASBESTOS_FAILED / FURTHER_WORKS).
function is_task_completed_status(task) {
    if (!task) {
        return false;
    }
    var codes = ['TASK_COMPLETE', 'COMPLETE', 'APPROVED', 'REJECTED',
        'NO_ACCESS', 'HS_FAILED', 'ASBESTOS_FAILED', 'FURTHER_WORKS'];
    if (task.task_status_code) {
        return codes.indexOf(task.task_status_code) !== -1;
    }
    // Fallback for payloads without status_code
    var t = (task.task_status || '').toLowerCase();
    return ['complete', 'completed', 'task complete', 'rejected', 'approved',
        'no access', 'h&s failed', 'asbestos failed', 'further works'].indexOf(t) !== -1;
}

// Whether every task on the job is done well enough to advance its financial status.
// Mirrors completed_task_status_ids() in job/Job.php: APPROVED plus the terminal
// failure outcomes. Deliberately stricter than is_task_completed_status(), which is
// the looser progress-bar rule and also counts TASK_COMPLETE / REJECTED — using that
// here would show a button the API then rejects.
function are_all_tasks_fin_ready(job_tasks) {
    if (!Array.isArray(job_tasks) || job_tasks.length === 0) {
        return false;
    }
    var codes = ['APPROVED', 'NO_ACCESS', 'HS_FAILED', 'ASBESTOS_FAILED', 'FURTHER_WORKS'];
    return job_tasks.every(function (task) {
        return task && codes.indexOf(task.task_status_code) !== -1;
    });
}

function show_property_conflict_alert(field) {
    Swal.fire({
        title: 'Not Allowed',
        text: 'This ' + field + ' does not belong to the selected property.',
        icon: 'warning',
        confirmButtonText: 'Ok',
        customClass: {
            confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false,
    });
}

function set_client_id(client_id) {
    if (is_property_client_conflict(client_id)) {
        show_property_conflict_alert('client');
        return;
    }
    add_autocomplete_sel("#client_id", "clients", ["client_code"], null, null, "offcanvasRight", client_id);
}

function set_property_id(property_id, is_need_trigger = true) {
    add_autocomplete_sel("#property_id", "client_properties", ["uprn_no", "postalcode"], null, null, "offcanvasRight", property_id).then(() => {
        if (is_need_trigger) {
            $("#property_id").trigger('change');
        }
    });
}

// Fill the read-only property panel on the job form. Pass a falsy property to hide it.
function render_job_property_details(property) {
    if (!property) {
        $('#property_details_section').addClass('hide');
        return;
    }

    var address = [property.address1, property.address2, property.area, property.town, property.postalcode].filter(Boolean).join(', ');
    $('#job_property_address').html(address || '-');
    $('#job_property_email').html(property.email ? '<a href="mailto:' + property.email + '">' + property.email + '</a>' : '-');
    $('#job_property_mobile').html(property.mobile ? '<a href="tel:' + property.mobile + '">' + property.mobile + '</a>' : '-');
    $('#job_property_telephone').html(property.telephone ? '<a href="tel:' + property.telephone + '">' + property.telephone + '</a>' : '-');
    $('#job_property_alerts').html(render_job_property_alerts(property.alerts));
    $('#job_property_access_note').html(property.access_note || '-');
    current_panel_property = property;

    $('#property_details_section').removeClass('hide');
}

function render_job_property_alerts(alerts) {
    if (!alerts || !alerts.length) {
        return '<span class="text-muted">No alerts</span>';
    }

    var alertHtml = '';
    $.each(alerts, function (index, alert) {
        var is_resident = (alert.warning_type == 1 || alert.warning_type == '1');
        var alertText = '';
        if (is_resident) {
            if (Array.isArray(alert.messages)) {
                alertText = alert.messages.join(', ');
            } else {
                alertText = alert.messages || alert.message || '';
            }
        } else {
            alertText = alert.message || '';
        }

        alertHtml += '<span class="text-danger fw-medium d-block">' + (is_resident ? 'Resident' : 'Property') + ': ' + alertText + '</span>';
    });

    return alertHtml;
}

// For the edit/copy paths, where the property is set without firing a change event.
function load_job_property_details(property_id) {
    if (!(property_id > 0)) {
        render_job_property_details(null);
        return;
    }
    ajs.ajax_form(site_url + "client/client_by_property/" + property_id, null, "GET", null, "0", "0", function (data) {
        render_job_property_details(data?.message?.property);
    });
}

function set_contract_id(contract_id) {
    // The contract search popup is unfiltered, so verify the contract's client against the property first.
    ajs.ajax_form(site_url + 'contract/get/' + contract_id, null, "GET", null, "0", "0", function (response) {
        if (is_property_client_conflict(response?.data?.client_id)) {
            show_property_conflict_alert('contract');
            return;
        }
        select2_ajax("#contract_id", site_url + "contract/get_all", "contract_number", null, "offcanvasRight", contract_id);
    });
}

function set_sor_id(sor_id, contract_id) {
    select2_ajax("#sor_id", site_url + "contract_sor/get/" + contract_id, "title", null, "offcanvasRight", sor_id);
}

function set_sor_id_task(sor_id, element) {
    // select2_ajax("#"+element, site_url + "contract_sor/get/" + job_contract_id, ["title", "sor_code"], null, "offcanvasRight3", sor_id);
    init_job_workstream_sors(element, sor_id);
}

function set_sor_asset(element, asset_id = null) {
    var filters = { property_id: job_property_id };
    if ($('#' + element).hasClass('select2-hidden-accessible')) {
        $("#" + element).select2("destroy");
        $("#" + element).empty();
    }
    add_autocomplete_custom('#' + element, site_url + 'api/asset_autocomplete', ['client_asset_number', 'serial_number', 'client_id'], filters, 'offcanvasRight3', asset_id);
}
// Called by the search modal when an asset is selected for a task's asset multi-select.
function set_asset_id_task(asset_ids, element) {

    if (!Array.isArray(asset_ids)) {
        asset_ids = [asset_ids];
    }
    // Keep the same behavior used elsewhere: preload the selected asset into the multi-select
    var property_id = job_property_id || '';
    // The project's asset autocomplete endpoint is used elsewhere: api/asset_autocomplete
    // Pass selected_value_url so the item is preloaded correctly
    if ($('#' + element).hasClass('select2-hidden-accessible')) {
        $("#" + element).select2("destroy");
        $("#" + element).empty();
    }
    var filters = { property_id: property_id };
    if ($('#asset_type_id').length && $('#asset_type_id').val()) {
        filters['equipment_type_id'] = $('#asset_type_id').val();
    }
    if (asset_ids.length) {
        add_autocomplete_custom('#' + element, site_url + 'api/asset_autocomplete', ['client_asset_number', 'serial_number', 'client_id'], filters, 'offcanvasRight3', asset_ids);
    } else {
        add_autocomplete_custom('#' + element, site_url + 'api/asset_autocomplete', ['client_asset_number', 'serial_number', 'client_id'], filters, 'offcanvasRight3');
    }
    $('#' + element).attr('data-filters', JSON.stringify(filters));

    // ensure the select2 dropdown closes after a selection — wait until the select actually has a value
    var waitForSelectAssetIds = setInterval(function () {
        var val = $('#' + element).val();
        if (val && val.length > 0) {
            clearInterval(waitForSelectAssetIds);
            // we have a value, close the dropdown
            $('#' + element).trigger('select2:close');
        }
    }, 50);
}

function init_job_workstream_sors(element, sor_id = null, with_deleted = false) {
    try {
        $("#" + element).attr("readonly", false);
        $("#" + element).parent().find('.popup-form-search-button').show();
        if ($('#' + element).hasClass('select2-hidden-accessible')) {
            $("#" + element).select2("destroy");
            $("#" + element).empty();
        }
        const url = site_url + "job-workstream-sors/get/" + $("#job_id").val() + "?with_deleted=" + with_deleted;
        if (sor_id > 0) {
            add_autocomplete_custom_dropdown("#" + element, url, ["sor_code"], null, "offcanvasRight3", sor_id, null, site_url + 'sor/get/' + sor_id);
        } else {
            add_autocomplete_custom_dropdown("#" + element, url, ["sor_code"], null, "offcanvasRight3");
        }

        $("#" + element).attr('data-filters', JSON.stringify({
            'sor_contracts.contract_id': job_contract_id,
            'sors.workstream_id': job_workstream_id
        }));

        if (with_deleted && element != 'sor_id_task') {
            $("#" + element).attr("readonly", true);
            $("#" + element).parent().find('.popup-form-search-button').hide();
        }
    } catch (err) {
        console.error("init_job_workstream_sors error:", err);
    }
}


function edit_job_form() {
    create_job_form("edit");
    var id = $("#edit_id").val();
    ajs.ajax_form(site_url + "job/get/" + id + "?edit=true", null, "GET", null, "0", "0", load_data, load_data);
}

// currently this function not in use.
async function copy_job_form(job_id) {
    if (!job_id) {
        return;
    }

    ajs.ajax_form(site_url + "job/copy/" + job_id, null, "POST", null, "1", "1",async function (result_json) {
        Swal.close();
        await new Promise(requestAnimationFrame);
        dataTable.ajax.reload(null, false);
        if (!ajs_form_handler.check_result(result_json)) {
            ajs_form_handler.show_errors(result_json);
            return;
        }

        var new_job_id = result_json.data?.job_id ||  '';
        var new_job_code = result_json.data?.job_code || '';
        var old_job_code = result_json.data?.old_job_code || '';
        if (!new_job_id) {
            ajs.showAlertBar('error', 'Copied job ID not returned from server.');
            return;
        }

        var header = `Copy Job - #${new_job_code} (Reference Job - #${old_job_code})`;

        ajs.showOffCanvasFormRight(cdn_url + "job/copy/" + new_job_id + "?in_popup=1", header, null, true);
        create_job_form("edit");        
        ajs.ajax_form(site_url + "job/get/" + new_job_id + "?edit=true", null, "GET", null, "0", "0", set_data_for_copy, set_data_for_copy);
    }, ajs_form_handler.show_errors);
}

function edit_task_form() {
    create_task_form("edit");
    var task_id = $("#edit_id").val();
    set_job_details_for_task("edit");
}

function copy_task_form() {
    create_task_form("copy");
    set_job_details_for_task("copy");
}

// Show a field but stop it being changed, without dropping it from the form.
//
// Locked, not disabled: serializeArray() drops disabled controls, so disabling would post an
// empty value and overwrite the real one on save. readonly covers the real inputs; a <select>
// or a radio has no readonly, so the wrapper stops the interaction - which also catches the
// select2 widget and any search button rendered alongside the control - while the control
// itself still submits exactly as before.
function lock_fields(selectors, wrapper) {
    $.each(selectors, function (index, selector) {
        $(selector).prop('readonly', true)
            .closest(wrapper)
            .css({ 'pointer-events': 'none', 'opacity': 0.6 });
    });
}

// Scheduling and assignment details stop being editable once the engineer has started the
// task - rescheduling or reassigning underneath someone already on site is meaningless, and
// the device has already synced the copy they are working from.
function lock_started_task_fields() {
    lock_fields([
        '#preferred_time_range',                  // Assignment Type
        'input[name="is_appointment_confirmed"]', // Is Appointment Confirmed?
        '#appointment_date',                      // Attend On Date
        '#appointment_time',                      // Attend On Time
        '#engineer_id'                            // Assign To
    ], '.appointment_div, .input-group, .col-xxl-6');
}

// A job opened from a contract screen already belongs to that client and contract, so those
// two are fixed while the rest of the form stays editable. Viewing the client is still
// allowed - only changing it is not.
function lock_job_client_contract() {
    lock_fields(['#client_id', '#contract_id'], '.d-flex');
    $('.popup-form-view-button').css({ 'pointer-events': 'auto', 'opacity': 1 });
}

// "Save and Duplicate" on the task edit form: once the save has closed the panel, re-open it
// as the Copy form for the task just saved. Deliberately goes through the same call the Copy
// icon uses (interface.js, .popup-form-button-task) so the prefill rules live in one place.
function reopen_task_form_as_copy(source_task_id, source_task_code) {
    var $panel = $('#offcanvasRight3');
    var done = false;

    var reopen = function () {
        if (done) {
            return;
        }
        done = true;
        // Bootstrap builds a fresh Offcanvas instance on each show; drop any backdrop the
        // hide left behind so they do not stack into an unclickable overlay.
        $('.offcanvas-backdrop').remove();
        $panel.addClass('custom-offcanvas-right').removeClass('custom-offcanvas-right3');
        ajs.showOffCanvasFormRightSmall(
            cdn_url + "job/copy-task/" + source_task_id,
            "Copy Task - #" + source_task_code,
            null,
            "copy_task_form",
            "offcanvasRight3",
            750,
            function () {
                init_dropzone('#dropzone-docs', '#dropzone-doc-preview', '#dropzone-doc-preview-list', 'assets', 'application/pdf', 'doc');
            }
        );
    };

    // offcanvas_form3 has already called hide(). Wait for the transition to finish so the old
    // panel is fully torn down first; the timeout covers the case where it was already hidden
    // and hidden.bs.offcanvas never fires.
    $panel.one('hidden.bs.offcanvas', reopen);
    setTimeout(reopen, 600);
}

// Which of the two submit buttons was pressed. Delegated: the task form is injected into the
// offcanvas after these run. Save clears the flag so that pressing Save and Duplicate, failing
// validation and then pressing Save does not still produce a duplicate.
$(document).on('click', '#createTaskForm #save-duplicate-btn', function () {
    $('#save_and_duplicate').val('1');
});
$(document).on('click', '#createTaskForm #add-btn', function () {
    $('#save_and_duplicate').val('0');
});

// LBH: show/hide the Havering cancellation reason as the task status changes.
$(document).on('change', '#createTaskForm #status_id', function () {
    toggle_cancel_reason_visibility();
});

// LBH "Cancel and Duplicate": cancel this task (which sends a Cancel Appointment
// to Open Housing) and create a queued duplicate carrying the same SORs but no
// appointment. The admin schedules a new appointment later, as usual.
$(document).on('click', '#createTaskForm #cancel-duplicate-btn', function () {
    var task_id = $('#edit_task_id').val();

    // The cancellation reason is chosen INSIDE this dialog, so it is always
    // available on click and does not depend on the Status field being set to
    // Cancelled (which was confusing). Options are cloned from the reason list
    // already loaded into #cancellation_reason_id for this client.
    var current = $('#cancellation_reason_id').val() || '';
    var optionsHtml = '';
    $('#cancellation_reason_id option').each(function () {
        var v = $(this).attr('value') || '';
        optionsHtml += '<option value="' + v + '"' + (v === current ? ' selected' : '') + '>' +
            $('<div>').text($(this).text()).html() + '</option>';
    });
    if (!optionsHtml) { optionsHtml = '<option value="">No reasons available</option>'; }

    Swal.fire({
        title: 'Cancel and Duplicate',
        html: '<p style="font-size:13px" class="mb-2 text-start">This cancels the current task and creates a new unassigned copy ' +
            '(same SORs, no appointment) for you to reschedule.</p>' +
            '<label class="form-label d-block text-start mb-1">Cancellation reason <span class="text-danger">*</span></label>' +
            '<select id="cd-reason" class="form-select">' + optionsHtml + '</select>',
        showCancelButton: true,
        confirmButtonText: 'Cancel and duplicate',
        cancelButtonText: 'Back',
        confirmButtonColor: '#dc3545',
        preConfirm: function () {
            var v = document.getElementById('cd-reason') ? document.getElementById('cd-reason').value : '';
            if (!v) { Swal.showValidationMessage('Please choose a cancellation reason.'); return false; }
            return v;
        }
    }).then(function (r) {
        if (!r.isConfirmed || !r.value) return;
        $('#cancellation_reason_id').val(r.value); // keep the form field in sync
        var formData = [{ name: 'cancellation_reason', value: r.value }];
        ajs.ajax_form(site_url + "job-task/cancel-duplicate/" + task_id, formData, "POST", null, "1", "1",
            function (result_json) {
                if (result_json && result_json.status) {
                    $('#createTaskForm #close-modal').trigger('click');
                    setTimeout(function () { refresh_job_tasks(); }, 100);
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({ icon: 'success', title: 'Done', text: result_json.message || 'Task cancelled and a new task created.' });
                    }
                } else if (typeof Swal !== 'undefined') {
                    Swal.fire({ icon: 'error', title: 'Could not complete', text: (result_json && result_json.message) || 'The action could not be completed.' });
                    setTimeout(function () { refresh_job_tasks(); }, 100);
                }
            },
            function (xhr) {
                var msg = (xhr && xhr.responseJSON && xhr.responseJSON.message)
                    || 'The task was cancelled, but the duplicate could not be created.';
                if (typeof Swal !== 'undefined') { Swal.fire({ icon: 'error', title: 'Error', text: msg }); }
                setTimeout(function () { refresh_job_tasks(); }, 100);
            });
    });
    return false;
});

// Resolves the id of the status a brand-new/copied task should start in: Open for
// external tasks, Pending for internal ones. task_statuses comes from task/get/{task_id}
// (Master_model::get_task_statuses selects *, so status_code is present); title is a
// fallback for rows where status_code is not set.
// ---------------------------------------------------------------------------
// LBH task cancellation UI helpers.
// The "Cancelled" status, the Havering reason dropdown and the "Cancel and
// Duplicate" button are only meaningful for LBH jobs. The reason dropdown shows
// the Havering reason DESCRIPTION but posts/stores the CODE.
// ---------------------------------------------------------------------------
// Loads the task cancellation reason list into #cancellation_reason_id AND makes
// the "Cancelled" status selectable in #status_id (the status dropdown is driven
// by the task's allowed_statuses, so Cancelled would not otherwise appear). This
// is now common to ALL clients: the endpoint returns the client's own reasons, or
// the default (Havering) list when the client has none. keep_status_id, when
// passed, is re-selected after injecting the Cancelled option.
function load_task_cancel_reasons(job_id, selected_code, keep_status_id) {
    var $sel = $('#cancellation_reason_id');
    if (!$sel.length) return;
    if (!job_id) { job_id = $('#job_id').val(); }
    ajs.ajax_form(site_url + "task-cancel-reasons/" + job_id, null, "GET", null, "0", "0", function (res) {
        var payload = (res && res.data) ? res.data : {};
        var rows = payload.reasons || [];
        $sel.empty().append($("<option></option>").attr("value", "").text("Select Reason"));
        $.each(rows, function (i, r) {
            $sel.append($("<option></option>").attr("value", r.hav_code).text(r.hav_description));
        });
        if (selected_code) { $sel.val(selected_code); }

        // Make sure "Cancelled" is offered in the status dropdown.
        var cid = payload.cancelled_status_id || 0;
        if (cid && !$("#status_id option[value='" + cid + "']").length) {
            $('#status_id').append($("<option></option>").attr("value", cid).text('Cancelled'));
        }
        if (keep_status_id) { $('#status_id').val(keep_status_id); }
        toggle_cancel_reason_visibility();
    });
}

// The status dropdown only carries id + title, so match the Cancelled status by
// its title text.
function selected_status_is_cancelled() {
    var txt = ($('#status_id option:selected').text() || '').trim().toLowerCase();
    return txt === 'cancelled';
}

function toggle_cancel_reason_visibility() {
    if (selected_status_is_cancelled()) {
        $('#cancel_reason_wrap').show();
    } else {
        $('#cancel_reason_wrap').hide();
    }
}

function get_default_task_status_id(task_statuses) {
    var match = (Array.isArray(task_statuses) ? task_statuses : []).find(function (s) {
        return s?.status_code == 'TASK_OPEN' || s?.status_code == 'PENDING'
            || s?.title?.toLowerCase() == 'open' || s?.title?.toLowerCase() == 'pending';
    });
    return match ? match.id : null;
}

function get_job_details_for_task() {
    create_task_form();
    set_job_details_for_task("create");
}

// Renders the read-only property address, contact details and alerts block on the
// Task Add/Edit form. Driven by the `property` and `property_alerts` keys now returned
// by job/get and job-task-details. Styled to match the Property Details panel on the
// job create/edit form (render_job_property_details / render_job_property_alerts).
function render_task_property_context(property, alerts) {
    property = property || {};

    // job/get supplies `town_name`; the post-save refresh comes from client_by_property, which uses `town`.
    var address = [property.address1, property.address2, property.area, property.town_name || property.town, property.postalcode].filter(Boolean).join(', ');
    $('#task_property_address').html(address || '-');
    $('#task_property_email').html(property.email ? '<a href="mailto:' + property.email + '">' + property.email + '</a>' : '-');
    $('#task_property_mobile').html(property.mobile ? '<a href="tel:' + property.mobile + '">' + property.mobile + '</a>' : '-');
    $('#task_property_telephone').html(property.telephone ? '<a href="tel:' + property.telephone + '">' + property.telephone + '</a>' : '-');
    $('#task_property_alerts').html(render_job_property_alerts(alerts));
    $('#task_property_access_note').html(property.access_note || '-');

    property.alerts = property.alerts || alerts;
    current_panel_property = property;
}

// Fills the quick-edit popup from the property currently shown in the panel and opens it.
function open_property_quick_edit() {
    var property = current_panel_property;
    if (!property || !(property.id > 0)) {
        ajs.showAlertBar('error', 'Select a property first.', true);
        return;
    }

    var $form = $('#propertyQuickEditForm');
    $form.find('.offcanvas-form-errors, .form-server-errors').remove();
    $form.find('[name="id"]').val(property.id);

    $.each(['address1', 'address2', 'area', 'county', 'postalcode', 'resident_name', 'email', 'mobile', 'telephone', 'access_note'], function (i, field) {
        $form.find('[name="' + field + '"]').val(property[field] || '');
    });
    $form.find('[name="town"]').val(property.town || property.town_name || '');

    populate_property_alert_rows(property.alerts, 'property_quick_alert_form', 'quick_alerts_input_field_div');

    $('#property_quick_edit_modal').modal('show');
}

// Re-reads the property after a quick-edit save and repaints whichever panel is on the page.
function reload_property_details_panel(property_id) {
    if (!(property_id > 0)) {
        return;
    }
    ajs.ajax_form(site_url + "client/client_by_property/" + property_id, null, "GET", null, "0", "0", function (data) {
        var property = data?.message?.property;
        if (!property) {
            return;
        }
        if ($('#property_details_section').length) {
            render_job_property_details(property);
        }
        if ($('#task_property_context').length) {
            render_task_property_context(property, property.alerts);
        }
    });
}

function set_job_details_for_task(type = "create") {
    var job_id = $("#job_id").val();
    ajs.ajax_form(site_url + "job/get/" + job_id + "?edit=true", null, "GET", null, "0", "0", function (return_data) {
        var job_details = return_data.data;
        job_property_id = job_details?.property_id;
        job_contract_id = job_details?.contract_id;
        job_service_id = job_details?.service_id;
        job_workstream_id = job_details?.workstream_id;

        // Show property address, contact details & alerts on the Task Add/Edit screen.
        render_task_property_context(job_details?.property, job_details?.property_alerts);

        var task_id = parseInt(job_details.total_tasks) + parseInt(1);
        $('#task_code').val(job_details.code + '/' + task_id);
        $('#job_id_hidden').val(job_details.id);
        $('#job_skills_hidden').val(job_details.service_skill_ids);
        $('#job_skills_names_hidden').val(job_details.service_skill_names);
        $('#task_description').val(job_details.description);

        init_job_workstream_sors("sor_id_task");
        if (type == "create") {
            select2_ajax("#task_id", site_url + "get_job_tasks/" + job_details.service_id, "title", null, "offcanvasRight3");
            init_job_workstream_sors("sor_id_0");
            set_sor_asset("asset_id_0");
        }


        select2_ajax("#queue_id", site_url + "queue/get_all", "title", null, "offcanvasRight3");
        select2_ajax("#preferred_time_range", site_url + "job/get-service-times/" + job_details.contract_id, "title_with_time", null, "offcanvasRight3");

        //job_target_datetime = ajs.convert_utc_to_local(job_details.target_date); // not needed to convert to local
        job_target_datetime = job_details.target_date;
        var job_target_date_parts = job_target_datetime.split(' ');
        var job_target_date = job_target_date_parts[0];
        var job_target_time = job_target_date_parts[1];

        //var converted_time = ajs.convert_time(job_target_time);
        //alert(job_target_date);
        $('#preferred_time').val(job_target_time);
        $('#preferred_date').val(job_target_date);
        if (job_details.asset_type == 'P') {
            $('.asset-search-btn, .asset-type-id').hide();
            $('.assets-label').text('Sub Properties');
        }
        if (type == 'edit' || type == 'copy') {
            $("#preferred_date").removeAttr('min');
            $("#appointment_date").removeAttr('min');
            var job_task_id = $("#edit_task_id").val();
            // Read-only detail panel below Docs/Media. No-ops in copy mode, where the
            // panel is not rendered (create-task.php gates it on $edit).
            if (typeof render_task_edit_details === 'function') {
                render_task_edit_details(job_task_id);
            }
            ajs.ajax_form(site_url + "job-task-details/" + job_task_id + "?edit=true", null, "GET", null, "0", "0", function (return_data) {
                var job_task_details = return_data.data;
                // calculate total asset quantity from possible keys
                asset_total_quantity = 0;
                if (Array.isArray(job_task_details?.assets) && job_task_details.assets.length) {
                    asset_total_quantity = job_task_details.assets.reduce((sum, asset) => {
                        const q = parseFloat(asset?.quantity) || 1;
                        return sum + q;
                    }, 0);
                }
                $('#work_asset_quantity').val(job_task_details.work_asset_quantity);
                // For edit: use source task_code; for copy: keep the auto-generated new code
                if (type == 'edit') {
                    $('#task_code').val(job_task_details.task_code);
                }
                $("input[name=geo_fencing][value=" + job_task_details.geo_fencing + "]").attr('checked', 'checked');
                $('#task_code').attr('readonly', 'readonly');
                $('#summary').val(job_task_details.summary);
                var pref_date = '';
                var pref_time = '';
                if (!isEmpty(job_task_details.preferred_time)) {
                    var pref_date_time = ajs.convert_utc_to_local(job_task_details.preferred_date + ' ' + job_task_details.preferred_time + ':00');
                    [pref_date, pref_time] = pref_date_time.split(' ');
                }

                $('#preferred_time').val(pref_time);
                $('#preferred_date').val(pref_date);
                //$("input[name=is_appointment][value=" + job_task_details.is_appointment + "]").attr('checked', 'checked');
                var is_appointment_confirm = job_task_details.is_appointment_confirm != 0 ? 1 : 0;
                $("input[name=is_appointment_confirmed][value=" + is_appointment_confirm + "]").attr('checked', 'checked').trigger('change');
                if (job_task_details.is_send_now == 1 || job_task_details.is_send_now == '1')
                {
                    $('#is_send_now').prop('checked', true).trigger('change');
                } else {
                    $('#is_send_now').prop('checked', false).trigger('change');
                }
                // if (job_task_details.is_appointment == '0')
                // {
                //     $('#is_appointment0').trigger('click');
                // }
                var appnt_date = '';
                var appnt_time = '';
                if (!isEmpty(job_task_details.appointment_time)) {
                    var appnt_date_time = ajs.convert_utc_to_local(job_task_details.appointment_date + ' ' + job_task_details.appointment_time + ':00');
                    [appnt_date, appnt_time] = appnt_date_time.split(' ');
                }
                if (type == 'copy') {
                    $('#appointment_time').val('');
                    $('#appointment_date').val('');
                } else {
                    $('#appointment_time').val(appnt_time);
                    $('#appointment_date').val(appnt_date);
                    select2_ajax("#preferred_time_range", site_url + "job/get-service-times/" + job_details.contract_id, "title_with_time", null, "offcanvasRight3", job_task_details.preferred_time_range);
                }
                //$('#preferred_time_range').val(job_task_details.preferred_time_range).trigger('change');
               
                //select2_ajax("#task_id", site_url + "task/get_all", "title", {'tasks.service_id': job_details.service_id}, "offcanvasRight3", job_task_details.task_id);
                select2_ajax("#task_id", site_url + "get_job_tasks/" + job_details.service_id, "title", null, "offcanvasRight3", job_task_details.task_id);
                init_job_workstream_sors("sor_id_task", job_task_details.sor_id);
                if (typeof job_task_details.task_sors !== 'undefined' && job_task_details.task_sors !== null && job_task_details.task_sors != '') {
                    set_task_sors(job_task_details.sors, type == 'copy');
                } else {
                    $(".task-sor-row").remove();
                }

                // On an invoiced job the billed total is frozen. Lock the target to
                // what this task adds up to right now, so the user can see whether a
                // rebalance still lands on the same number. Copies make a new task,
                // so they are never locked.
                if (type == 'edit' && job_task_details.financial_status == '2'
                    && job_task_details.invoiced_amount !== null && typeof job_task_details.invoiced_amount !== 'undefined') {
                    task_invoiced_target = get_task_sors_total();
                    refresh_invoiced_total_banner();
                }

                select2_ajax("#queue_id", site_url + "master-record/get_all", "master_value", { master_code: "JOB_QUEUE" }, "offcanvasRight3", job_task_details.queue_id);

                var tags = pluck(job_task_details.tags, 'tag_id');
                select2_ajax('#task_tags', site_url + 'tag/get_all', 'title', { "module": "task" }, 'offcanvasRight3', tags);

                var asset_filters = { property_id: job_details.property_id };
                if (job_task_details.asset_type_id > 0) {
                    asset_filters['equipment_type_id'] = job_task_details.asset_type_id;
                }
                if (typeof job_task_details.asset_ids !== 'undefined' && job_task_details.asset_ids !== null && job_task_details.asset_ids != '') {
                    if (job_details.asset_type == 'P') {
                        add_autocomplete_sel("#asset_ids", "client_properties", ["uprn_no"], null, { parent_id: job_details.property_id }, "offcanvasRight3", [job_task_details.asset_ids]);
                    } else {
                        add_autocomplete_custom("#asset_ids", site_url + "api/asset_autocomplete", ["client_asset_number", "serial_number", "client_id"], asset_filters, "offcanvasRight3", [job_task_details.asset_ids]);
                        $('#asset_ids').attr('data-filters', JSON.stringify(asset_filters));
                    }
                } else {
                    if (job_details.asset_type == 'P') {
                        add_autocomplete_sel("#asset_ids", "client_properties", ["uprn_no"], null, { parent_id: job_details.property_id }, "offcanvasRight3");
                    } else {
                        add_autocomplete_custom("#asset_ids", site_url + "api/asset_autocomplete", ["client_asset_number", "serial_number", "client_id"], asset_filters, "offcanvasRight3");
                        $('#asset_ids').attr('data-filters', JSON.stringify(asset_filters));
                    }
                }

                add_autocomplete_sel("#appointment_template_id", "client_appointments", ["title"], null, { client_id: job_details.client_id }, "offcanvasRight3", job_task_details.appointment_template_id);
                add_autocomplete_sel("#parent_job_task_id", "job_tasks", ["task_code"], null, { job_id: $("#job_id").val() }, "offcanvasRight3", job_task_details.parent_job_task_id);

                // Skip loading documents in copy mode
                if (type != 'copy') {
                    init_dropzone('#dropzone-docs', '#dropzone-doc-preview', '#dropzone-doc-preview-list', 'tasks', 'image/*,.pdf,.doc,.docx', 'all', job_task_details.files);
                } else {
                    init_dropzone('#dropzone-docs', '#dropzone-doc-preview', '#dropzone-doc-preview-list', 'tasks', 'image/*,.pdf,.doc,.docx', 'all');
                }

                // A copy is a fresh unit of work, so it always starts unassigned (in queue)
                // regardless of how the source task was assigned. The user can still switch
                // to "Assign now" before saving.
                if (type == 'copy') {
                    $('#is_assigned_0').trigger('click');
                } else {
                    if (job_task_details.is_assigned == '1') {
                        $('#is_assigned_1').prop('checked', true).trigger('change', [true]);
                    }
                    if (job_task_details.is_assigned == '0') {
                        $('#is_assigned_0').trigger('click');
                    }
                }

                ajs.ajax_form(site_url + "task/get/" + job_task_details.task_id, null, "GET", null, "1", "1", function (data) {

                    // $('#task_description').val(data.message.data.task_description);
                    /* $('#skill').val(data.message.data.skill_name);
                     $('#skill').attr('readonly', 'readonly');
                     $('#skill_id').val(data.message.data.skill_id); */
                    //$('#sor_id_task').val(data.message.data.sor_id).trigger('change');
                    var utype = 16;
                    if (data.message.data.user_type == 'R') {
                        utype = 12;
                    }

                    // Copies start unassigned, so don't pre-select the source engineer.
                    select2_ajax_users("#engineer_id", { user_type: utype }, "offcanvasRight3", type == 'copy' ? null : job_task_details.engineer_id);

                    if (typeof data.message.data.task_statuses !== 'undefined') {
                        $('#status_id').empty();
                        $.each(data.message.data.task_statuses, function (key, value) {
                            $('#status_id')
                                .append($("<option></option>")
                                    .attr("value", value.id)
                                    .text(value.title));
                        });
                        // A copy starts Open/Pending rather than inheriting the source task's
                        // status; fall back to the source status if this task type doesn't
                        // allow Open/Pending.
                        var status_id = job_task_details.status_id;
                        if (type == 'copy') {
                            status_id = get_default_task_status_id(data.message.data.task_statuses) || status_id;
                        }
                        $('#status_id').val(status_id);

                        // Task cancellation UI (all clients): reason dropdown (shown when
                        // Cancelled) and the "Cancel and Duplicate" button. Reasons come
                        // from the client's own list, or the default list if none set.
                        window.current_task_is_lbh = (job_task_details.client_code === 'LBH');
                        if (type == 'edit') {
                            // Pass the current status so it stays selected after the
                            // Cancelled option is injected into the dropdown.
                            load_task_cancel_reasons(job_task_details.job_id, job_task_details.cancellation_reason || '', status_id);
                            $('#cancel-duplicate-btn').show();
                        } else {
                            $('#cancel-duplicate-btn').hide();
                        }
                        toggle_cancel_reason_visibility();

                        // Keyed on the status the task was loaded with, not whatever the
                        // dropdown is showing: the fields are locked because this task has
                        // started, so picking a different status here must not unlock them.
                        var current_status = $.grep(data.message.data.task_statuses, function (status) {
                            return status.id == status_id;
                        })[0];
                        if (type == 'edit' && current_status && current_status.status_code == 'START_TASK') {
                            lock_started_task_fields();
                        }
                    }

                });

                $('#task_description').val(job_task_details.task_description);

                select2_ajax(
                    "#asset_type_id",
                    site_url + "master-record/get_all",
                    "master_value",
                    { master_code: "EQUIPMENT_TYPES" },
                    "offcanvasRight3",
                    job_task_details.asset_type_id
                );
            });
        } else {
            select2_ajax(
                "#asset_type_id",
                site_url + "master-record/get_all",
                "master_value",
                { master_code: "EQUIPMENT_TYPES" },
                "offcanvasRight3"
            );

            if (job_details.asset_type == 'P') {
                add_autocomplete_sel("#asset_ids", "client_properties", ["uprn_no"], null, { parent_id: job_details.property_id }, "offcanvasRight3");
            } else {
                add_autocomplete_custom("#asset_ids", site_url + "api/asset_autocomplete", ["client_asset_number", "serial_number", "client_id"], { property_id: job_details.property_id }, "offcanvasRight3");
                $('#asset_ids').attr('data-filters', JSON.stringify({ property_id: job_details.property_id }));
            }
        }
    });
}

function set_task_sors(task_sors, isCopy = false) {

    for (let index = 1; index < task_sors.length; index++) {
        $(".add-task-sor").trigger('click', true);
    }
    $.each(task_sors, function (index, task_sor) {
        let is_chargeable = task_sor.is_chargeable == 1 ? true : false;
        let is_payable = task_sor.is_payable == 1 ? true : false;

        // When copying, reset SOR id to 0 so store_task_sors creates new rows instead of updating source rows
        $("input[name='task_sors[" + index + "][id]']").val(isCopy ? 0 : task_sor.task_sor_id);
        $("select[name='task_sors[" + index + "][pricing_model]']").val(task_sor.pricing_model);
        $("input[name='task_sors[" + index + "][description]']").val(task_sor.approval_description);
        $("input[name='task_sors[" + index + "][quantity]']").val(task_sor.quantity);
        $("input[name='task_sors[" + index + "][material_price]']").val(task_sor.material_price);
        $("input[name='task_sors[" + index + "][labor_price]']").val(task_sor.labor_price);
        $("input[name='task_sors[" + index + "][sell_price]']").val(task_sor.sell_price);
        $("input[name='task_sors[" + index + "][is_chargeable]'][type='checkbox']").prop("checked", is_chargeable);
        $("input[name='task_sors[" + index + "][is_payable]'][type='checkbox']").prop("checked", is_payable);

        if (task_sor?.is_fixed_price == 1) {
            $("input[name='task_sors[" + index + "][quantity]']").attr("readonly", true).closest('.task-sor-row').find('.delete-task-sor').parent().remove();
            $("input[name='task_sors[" + index + "][description]']").attr("readonly", true);
            $("input[name='task_sors[" + index + "][id]']").data("fixed-price", true);
            $(`input[name='task_sors[${index}][is_chargeable]']`).prop("disabled", true);
            $(`input[name='task_sors[${index}][is_payable]']`).prop("disabled", true);
            $("select[name='task_sors[" + index + "][pricing_model]']").attr("disabled", true);
            $("#asset_id_" + index).attr("disabled", true);
        }
        set_sor_asset("asset_id_" + index, task_sor.asset_id);
        init_job_workstream_sors("sor_id_" + index, task_sor.id, true);
    });
}

// Net chargeable total of the SOR rows currently on the task form.
// Mirrors the server's expression: sell_price * quantity, chargeable rows only.
// The sell input is disabled for pricing models 1 and 2, but jQuery still reads
// its value and the server re-derives the rate anyway.
function get_task_sors_total() {
    var total = 0;
    $('#task-sor-section .task-sor-row').each(function () {
        var row = $(this);
        // No .sor-id check here: it is populated asynchronously by
        // init_job_workstream_sors, and a row without a rate contributes 0 anyway.
        if (!row.find("input[type='checkbox'][name*='[is_chargeable]']").is(':checked')) {
            return;
        }
        var qty = parseFloat(row.find('.sor-qty').val()) || 0;
        var sell = parseFloat(row.find('.sell-rate').val()) || 0;
        total += qty * sell;
    });
    return Math.round(total * 100) / 100;
}

// Keeps the invoiced-total banner in step with the SOR rows. No-op unless the
// job is invoiced.
//
// Also arms a light poll: the sell rate is written programmatically from several
// places (SOR selection, unit-price lookup, resetSorPricingAndDescription) with
// no event that reliably fires afterwards, so watching the DOM is more robust
// than hooking each writer. It only runs while a task is locked, and stops as
// soon as create_task_form() clears the lock.
function refresh_invoiced_total_banner() {
    var banner = $('#invoiced_total_banner');
    if (task_invoiced_target === null) {
        banner.addClass('d-none');
        if (task_invoiced_poll !== null) {
            clearInterval(task_invoiced_poll);
            task_invoiced_poll = null;
        }
        return;
    }

    if (task_invoiced_poll === null) {
        task_invoiced_poll = setInterval(refresh_invoiced_total_banner, 500);
    }

    var current = get_task_sors_total();
    var difference = Math.round((current - task_invoiced_target) * 100) / 100;
    var matches = Math.abs(difference) < 0.005;

    $('#invoiced_total_target').text(task_invoiced_target.toFixed(2));
    $('#invoiced_total_current').text(current.toFixed(2));
    $('#invoiced_total_hint').text(matches
        ? 'Totals match — this task can be saved.'
        : 'Out by ' + (difference > 0 ? '+' : '-') + Math.abs(difference).toFixed(2) + '. This job is invoiced, so the total must match before it can be saved.');

    banner.removeClass('d-none alert-success alert-danger')
          .addClass(matches ? 'alert-success' : 'alert-danger');
}

/**
 * Reset SOR based on pricing model.
 */
function reset_sor(sor_element, row, asset_quantity) {
    const filters = { contract_id: job_contract_id, service_id: job_service_id, qty: asset_quantity, with_sor_details: true };
    ajs.ajax_form(site_url + 'contract_masterplan/unit_price', filters, 'GET', null, '1', '1', function (resp) {
        var res = resp && resp.message ? resp.message.data : null;
        if (res && res.sor_id) {
            init_job_workstream_sors(sor_element, res.sor_id, true);
            row.find('.material-rate').val(res.material_price);
            row.find('.labour-rate').val(res.labor_price);
            row.find('.sell-rate').val(res.sell_price);
            row.find('.desc').val(res.short_description || '');
        } else {
            if ($('#' + sor_element).hasClass('select2-hidden-accessible')) {
                $("#" + sor_element).select2("destroy");
                $("#" + sor_element).empty();
                $("#" + sor_element).attr("readonly", true);
                $("#" + sor_element).parent().find('.popup-form-search-button').hide();
            }
            set_select2_view("#" + sor_element, '', '');
        }
    }, ajs_form_handler.show_errors);
}

function check_is_job_complete(status) {
    if (status.toLowerCase() == 'completed' || status.toLowerCase() == 'cancelled') {
        return true;
    }
    return false;
}

// for set data on detail page
function set_details(result_json) {
    //console.log(result_json); 
    if (ajs_form_handler.check_result(result_json)) {
        // console.log(result_json);
        var job = result_json.data;
        var breadcrumbs = [
            { label: 'Jobs', url: cdn_url + 'job/list' },
            { label: job.code, url: null }
        ];
        set_breadcrumb(breadcrumbs);


        is_job_complete = check_is_job_complete(job.status);

        $("#edit_job_detail").attr('data-form-url', cdn_url + 'job/edit/' + job.id);
        $("#edit_job_detail").attr('data-heading', 'Edit Job #' + job.code);
        $(".copy_job_btn").attr('data-job_code', job.code);
        $(".job-code").html(job.code);
        $(".ppm-batch-code").html(job.batch_code);
        $(".ppm-add-date").html(ajs.format_datetime(job.ppm_add_date));
        $(".job-description").html(job.description);
        $(".reference-job").html(job.reference_job);
        $("#type").html(job.service_type == 'P' ? 'PPM' : "REACTIVE");
        $("#contract_number").html(gen_contract_detail_link(job.contract_id, job.contract_number));
        $("#contract_id").val(job.contract_id);
        $("#service_id").val(job.service_id);
        $("#client_work_order").html(job.client_work_order);
        $("#property_addr").html(
            [
                job.address1,
                job.address2,
                job.postalcode
            ].filter(Boolean).join('<br/>')
        );
        $("#job_booking_details").html(
            [
                job.client_name,
                job.client_email,
                job.client_phone
            ].filter(Boolean).join('<br/>')
        );
        $("#resident_contact").html(
            [
                job.resident_name,
                job.resident_email,
                job.resident_mobile
            ].filter(Boolean).join('<br/>')
        );
        $("#job_type_name").html(job.service_name);
        $("#client_name").html(gen_client_detail_link(job.client_id, job.client_code));
        $("#property_name").html(gen_property_detail_link(job.property_id, job.uprn_no));
        $("#priority").html(priority_label(job.priority));
        $("#detail_status").html(status_label(job.status));
        $("#financial_status").html(status_label_fin(job.financial_status, job?.is_available_cost));
        $("#fin-action").html(status_button_fin(job.id, job.status, job.financial_status, job.invoice_detail, job));
        //$("#preferred_time").html(job.preferred_time);
        //$("#preferred_date").html(job.preferred_date);
        $("#created_date").html(ajs.format_datetime(job.add_date));
        $("#detail_target_date_time").html(ajs.format_datetime(job.target_date));
        $("#title").html(job.title);
        $("#total_materials").html(job.total_materials);
        $("#total_labors").html(job.total_labors);
        $("#total_sells").html(job.total_sells);
        $("#margins").html(job.margins);
        $("#framework_commission_pct").html(job.contractor_commission ?? '0');
        $("#framework_commission").html(job.contractor_commission_amount);
        $("#description").html(job.description);
        $('.update-job-notes').data('notes', job.notes)
        $("#client_id_hidden").val(job.client_id);
        // LBH jobs cancel via "Send cancel to Havering" (Stage 50), not direct Cancel.
        window.current_job_is_lbh = (String(job.client_code || '').toUpperCase() === 'LBH');


        resident_email = job.resident_email;
        resident_mobile = job.resident_mobile;
        job_task_details = job.job_tasks;
        job_target_datetime = job.target_date;
        window.current_job_no_access_count = Number(job.no_access_count) || 0;

        if (job.resident_mobile == null || job.resident_mobile == '') {
            job.resident_mobile = job.client_phone;
        }
        $("#callBtn").attr("data-mobile_num", job.resident_mobile);
        $("#callBtn").attr("data-telephone_num", job.resident_telephone);

        // Calculate and display task progress
        var taskCount = 0;
        var completedCount = 0;
        if (Array.isArray(job.job_tasks) && job.job_tasks.length > 0) {
            taskCount = job.job_tasks.filter(function (task) {
                return task.task_type == 'E';
            }).length;
            completedCount = job.job_tasks.filter(function (task) {
                return task.task_type == 'E' && is_task_completed_status(task);
            }).length;
        }

        var progressPercentage = taskCount > 0 ? Math.round((completedCount / taskCount) * 100) : 0;

        // Show/hide progress container
        if (taskCount > 0) {
            $("#job-progress-container").show();
            $("#job-progress-bar").css('width', progressPercentage + '%').attr('aria-valuenow', progressPercentage);
            $("#job-progress-text").html(progressPercentage + '%');
            $("#job-progress-count").html(completedCount + '/' + taskCount);
        } else {
            $("#job-progress-container").hide();
        }

        get_task_table(job.job_tasks, job.financial_status);
        get_sor_table(job.sors);
        get_certificate_table(job.certificates);
        get_media_table(job.files);
        get_event_table(job.events, job.financial_status);
        get_financial_table(job.financials);

        // if (is_job_complete) {
        //     $('.popup-form-button-task, #edit_job_detail, #callBtn').remove();
        // }

        if (job.financial_status == 2) {
            $('.update-job-notes, #send_email_sms').remove();
        }

        if (job.financial_status != 0) {
            $('#update_job_status').parent().remove();
        }

        if (job.tags.length) {
            var tags = pluck(job.tags, 'title').join(', ');
            $("#detail_tags").html(tags);
        }

        select2_ajax("#update_job_status", site_url + "master-record/get_all", "master_value", { master_code: "JOB_STATUS" }, "body", job.status_id);
        $(".create-task-btn").attr("data-actions", `handleJobAction(this, '${job.status}')`).addClass("check_actions");
        setup_lbh_review_button(job);
        setup_hav_claim_status(job);
        initValidations();
        ajs.apply_permissions();
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

// "Send cancel to Havering" (LBH job cancellation request). Collects the job
// cancellation reason (OH cancellation_reason code) + optional detail, then posts
// the status change to cancel_requested — the backend queues a Stage 50 abandonment
// request. The job is NOT cancelled yet; that happens when Havering return Stage 92
// (Stage 51 sends it back to Open).
function open_send_cancel_to_havering(jobId, statusId, $dd) {
    ajs.ajax_form(site_url + "havering-cancellation-reasons", null, "GET", null, "0", "0", function (res) {
        var rows = (res && res.data && res.data.reasons) ? res.data.reasons : [];
        var opts = '<option value="">Select reason</option>';
        rows.forEach(function (r) {
            opts += '<option value="' + r.hav_code + '">' + r.hav_description + '</option>';
        });
        Swal.fire({
            title: "Send cancel to Havering",
            html: '<div class="text-start">'
                + '<p class="mb-2" style="font-size:13px;">This sends a Stage 50 cancellation request to Havering. '
                + 'The job stays active until Havering respond.</p>'
                + '<label class="form-label">Cancellation reason <span class="text-danger">*</span></label>'
                + '<select id="job-cancel-reason" class="form-select mb-2">' + opts + '</select>'
                + '<label class="form-label">Detail <span class="text-muted">(optional)</span></label>'
                + '<textarea id="job-cancel-detail" class="form-control" placeholder="Any detail for Havering"></textarea>'
                + '</div>',
            showCancelButton: true,
            confirmButtonText: "Send request",
            confirmButtonColor: "#20388a",
            preConfirm: function () {
                var reason = document.getElementById("job-cancel-reason").value;
                if (!reason) { Swal.showValidationMessage("Please select a cancellation reason."); return false; }
                return { reason: reason, detail: (document.getElementById("job-cancel-detail").value || "").trim() };
            }
        }).then(function (result) {
            if (result.isConfirmed && result.value) {
                $dd.val(statusId).trigger("change");
                ajs.reload = true;
                ajs.ajax_form(site_url + "job/update-job-status/" + jobId,
                    { status_id: statusId, cancellation_reason: result.value.reason, cancellation_detail: result.value.detail },
                    "POST", null, "1", "1", ajs_form_handler.api_response, ajs_form_handler.api_response);
            }
        });
    });
}

// LBH job-completion review link button.
// Shown only for completed LBH jobs that already have a minted review link
// (i.e. the completion hook ran and the link is ready to send to Havering /
// is carried in the generated CSV notes column). Clicking it lets staff copy
// or open the unique per-job review URL.
function setup_lbh_review_button(job) {
    var $btn = $('#lbh_review_btn');
    if (!$btn.length) { return; }

    var isLBH       = String(job.client_code || '').toUpperCase() === 'LBH';
    var isCompleted = String(job.status || '').toLowerCase() === 'completed';
    var url         = job.lbh_review_url || '';

    if (!(isLBH && isCompleted && url)) {
        $btn.hide().attr('data-review-url', '');
        return;
    }

    // View-only link (Havering feed their decision back via a stage export code,
    // so there is no approve/reject state to reflect here).
    $btn.attr('data-review-url', url)
        .removeClass('btn-success btn-danger').addClass('btn-warning')
        .html('<i class="ri-checkbox-circle-line align-bottom me-1"></i>LBH Review Link')
        .show();
}

// Havering claim / post-inspection state (LBH). Separate from the job status
// (which stays Complete). Shows a badge for awaiting / approved / failed, and on
// a FAILED post-inspection offers a "Request Post-Inspection" button so an admin
// can resubmit after correcting the SOR codes / job value.
function setup_hav_claim_status(job) {
    var $row = $('#hav_claim_row');
    if (!$row.length) { return; }
    var $badge = $('#hav_claim_status_badge');
    var $btn = $('#request_post_inspection_btn');

    var isLBH = String(job.client_code || '').toUpperCase() === 'LBH';
    var st = String(job.hav_claim_status || '').toLowerCase();

    if (!isLBH || !st) {
        $row.hide();
        $badge.empty();
        $btn.hide().attr('data-job-id', '');
        return;
    }

    // Full claim lifecycle labels. Each state is a distinct milestone, so keep the
    // wording specific - 'approved' means the post-inspection PASSED and the job is
    // ready to claim (the claim itself is NOT approved yet); 'claimed' (Stage 93) is
    // the only state that means the claim was approved and the job is fully paid.
    var map = {
        awaiting:   ['Awaiting Post-Inspection', 'bg-info-subtle text-info border-info'],
        approved:   ['Post-Inspection Passed — Ready to Claim', 'bg-primary-subtle text-primary border-primary'],
        claim_sent: ['Claim Sent — Awaiting Approval', 'bg-warning-subtle text-warning border-warning'],
        claimed:    ['Claim Approved — Fully Completed', 'bg-success-subtle text-success border-success'],
        failed:     ['Post-Inspection Failed', 'bg-danger-subtle text-danger border-danger']
    };
    var m = map[st] || [st, 'bg-secondary-subtle text-secondary border-secondary'];
    var reason = job.hav_claim_detail ? $('<div>').text(job.hav_claim_detail).html() : '';

    var html = '<span class="badge border text-capitalize ' + m[1] + '">' + m[0] + '</span>';
    if (st === 'failed' && reason) {
        html += ' <small class="text-muted d-block mt-1">Reason: ' + reason + '</small>';
    }
    $badge.html(html);
    $row.show();

    if (st === 'failed') {
        $btn.attr('data-job-id', job.id).show();
    } else {
        $btn.hide().attr('data-job-id', '');
    }
}

// Delegated click: request a fresh post-inspection for a failed LBH job.
// Shows the job's current SOR lines + total for the admin to confirm (read-only),
// then requests a new post-inspection via the Post Inspection API. Open Housing
// (Maria) confirmed NO value/stage file is needed - the surveyor reads the
// corrected value from the job link. Correct the SORs on the job first.
$(document).on('click', '#request_post_inspection_btn', function () {
    var jobId = $(this).attr('data-job-id');
    if (!jobId) { return false; }

    ajs.ajax_form(site_url + 'job/post-inspection-data/' + jobId, null, 'GET', null, '1', '1', function (res) {
        if (!res || !res.status || !res.data) { return; }
        var d = res.data;
        var lines = d.lines || [];

        var rowsHtml = '';
        lines.forEach(function (ln) {
            var nonchg = ln.is_chargeable ? '' : ' <span class="badge bg-secondary-subtle text-secondary">non-chargeable</span>';
            rowsHtml += '<tr>'
                + '<td class="text-start" style="font-size:12px;">' + (ln.sor_code || '') + nonchg + '</td>'
                + '<td class="text-end" style="font-size:12px;">' + Number(ln.sell_price).toFixed(2) + '</td>'
                + '<td class="text-center" style="font-size:12px;">' + (ln.quantity || 1) + '</td>'
                + '<td class="text-end" style="font-size:12px;">' + Number(ln.line_total).toFixed(2) + '</td>'
                + '</tr>';
        });
        if (!rowsHtml) {
            rowsHtml = '<tr><td colspan="4" class="text-muted text-center">No SOR lines on this job.</td></tr>';
        }

        var html = '<div class="text-start">'
            + '<p style="font-size:13px;" class="mb-2">Check the SOR values below are correct — the surveyor reads this value from the job link. '
            + 'If anything is wrong, close this, fix the SORs on the job, then request again.</p>'
            + '<div style="max-height:240px;overflow:auto;"><table class="table table-sm mb-2"><thead><tr>'
            + '<th class="text-start">SOR</th><th class="text-end">Sell (£)</th><th class="text-center">Qty</th><th class="text-end">Line (£)</th>'
            + '</tr></thead><tbody>' + rowsHtml + '</tbody></table></div>'
            + '<div class="d-flex justify-content-between align-items-center border-top pt-2">'
            + '<span><b>Job total</b></span>'
            + '<span class="fw-bold">£' + Number(d.total).toFixed(2) + '</span>'
            + '</div>'
            + '</div>';

        Swal.fire({
            title: 'Request Post-Inspection' + (d.oh_no ? ' - ' + d.oh_no : ''),
            html: html,
            width: 560,
            showCancelButton: true,
            confirmButtonText: 'Request post-inspection',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#20388a',
        }).then(function (r) {
            if (!r.isConfirmed) { return; }
            ajs.reload = true;
            ajs.ajax_form(site_url + 'job/request-post-inspection/' + jobId,
                [], 'POST', null, '1', '1',
                ajs_form_handler.api_response, ajs_form_handler.api_response);
        });
    });
    return false;
});

// Delegated click: show the review link with copy / open actions.
$(document).on('click', '#lbh_review_btn', function () {
    var url = $(this).attr('data-review-url') || '';
    if (!url) { return; }

    Swal.fire({
        title: 'LBH Job Review Link',
        html: '<p style="font-size:13px;margin-bottom:8px;">Unique review link for this completed job. '
            + 'This link is also written into the job stage CSV notes and saved on the job\'s notes.</p>'
            + '<input id="lbh-review-url" class="form-control" readonly value="' + url + '" '
            + 'style="font-size:12px;" onclick="this.select();">',
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: '<i class="ri-file-copy-line"></i> Copy link',
        denyButtonText: '<i class="ri-external-link-line"></i> Open',
        cancelButtonText: 'Close',
        confirmButtonColor: '#20388a',
        denyButtonColor: '#0d9488'
    }).then(function (res) {
        if (res.isConfirmed) {
            var copied = false;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(function () {
                    if (typeof toastr !== 'undefined') { toastr.success('Review link copied.'); }
                }).catch(function () {});
                copied = true;
            }
            if (!copied) {
                var el = document.getElementById('lbh-review-url');
                if (el) { el.select(); document.execCommand('copy'); }
            }
        } else if (res.isDenied) {
            window.open(url, '_blank', 'noopener');
        }
    });
});

// not needed as financial status is now calculated on the server side and returned in job/get and job-tasks endpoints
/* function get_total_cost(job_tasks) {
    var totalCost = 0;
    $.each(job_tasks, function (_, task) {
        totalCost += (Number(task.total_materials) || 0) + (Number(task.total_labors) || 0);
    });

    return totalCost;
} */

function get_details() {
    var id = $("#job_id").val();
    if (id) {
        ajs.ajax_form(site_url + "job/detail/" + id, null, "GET", null, "1", "1", set_details, set_details);
    }
}

function refresh_job_tasks() {
    // .job-task-div is only on the job details page. The Tasks list pages load this file
    // too and reach here after a task save, where the request is wasted - the result has
    // nowhere to render and #job_id is often empty, so the URL carries no id at all.
    // Those pages refresh through ajs.refreshDataTable() instead.
    if (!$('.job-task-div').length) {
        return;
    }
    var id = $("#job_id").val();
    if (!id) {
        return;
    }
    ajs.ajax_form(site_url + "job-tasks/" + id, null, "GET", null, "1", "1", function (result_json) {
        if (ajs_form_handler.check_result(result_json)) {
            get_task_table(result_json.message);
        }
    });
}

// for send email or sms based on task
function send_email_sms(type = 'create') {
    var job_id = $("#job_id").val();
    $("#scheduled_time").datetimepicker({ format: 'd-m-Y H:i', step: 15 });
    if (type == 'create') {
        // console.log("create");
        init_ckeditor("#content", true).then((editor) => editorInstance = editor);
        add_autocomplete_sel("#job_task_id", "job_tasks", ["task_code"], null, { 'job_id': job_id }, "offcanvasRight");
    }

    $('#email_to').val(resident_email);
    $('#phone_to').val(resident_mobile);
    ajs.mask_inputs();

    $.validator.addMethod("ckeditorRequired", function (value, element) {

        if (typeof editorInstance === 'undefined' || !editorInstance) {
            console.log("Editor not ready yet");
            return false;
        }

        let data = editorInstance.getData() || '';
        // console.log("Raw editor data:", data);
        let plainText = data
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/gi, '')
            .trim();

        return plainText.length > 0;

    }, "Content is required.");

    $("#sendEmalSmsForm").validate({
        ignore: ":hidden:not(textarea)",
        onkeyup: false,
        rules: {
            content: {
                ckeditorRequired: true
            }
        },
        errorPlacement: function (error, element) {
            if (
                element.hasClass("select2") &&
                element.next(".select2-container").length
            ) {
                error.insertAfter(element.next(".select2-container"));
            } else if (element.parent(".input-group").length ||
                element.parent(".error-div").length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            if (editorInstance) {
                editorInstance.updateSourceElement();
            }
            var sub_button = $(form).find(":submit:first");
            ajs.submit_button_element = sub_button;
            var action = $(form).attr("action");
            var method = $(form).attr("method");
            ajs.set_localtime_to_utc('scheduled_time');
            var formData = $(form).serializeArray();
            formData.push({ name: 'job_id', value: $('#job_id').val() });
            formData.forEach(function (field, index) {
                if (field.name === 'content') {
                    field.value = btoa(unescape(encodeURIComponent(field.value)));
                }
            });
            ajs.detailDataFunction = get_details();

            var via_to = $("#via_to").val();
            console.log("via_to:", via_to);
            if (via_to == 'letter') {

                Swal.fire({
                    title: 'Choose action',
                    text: '',
                    icon: 'question',
                    showCancelButton: true,
                    showDenyButton: true,
                    confirmButtonText: 'Download',
                    denyButtonText: 'Auto Print',
                    cancelButtonText: 'Cancel',
                    allowOutsideClick: false,
                    customClass: {
                        confirmButton: 'btn btn-primary me-2',
                        denyButton: 'btn btn-success me-2',
                        cancelButton: 'btn btn-secondary'
                    },
                    buttonsStyling: false,
                }).then((choice) => {
                    // Determine action chosen download=D or autoprint=A
                    if (choice.isDismissed) {
                        return;
                    }
                    var action = choice.isConfirmed ? 'D' : 'A';
                    var selected_tasks = $("#job_task_id").val();
                    // Show processing modal with progress bar
                    Swal.fire({
                        title: 'Processing...',
                        html: `<small>It might take some time to generate the PDF</small><br/><div class="progress" style="width:100%;margin-top:10px;background:#eee;border-radius:6px;height:10px;"><div id="progress-bar" style="width:0%;height:100%;border-radius:6px;"></div></div>`,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        showCancelButton: false,
                        didOpen: () => {
                            const progressBar = document.getElementById('progress-bar');
                            let progress = 0;

                            // var data = {
                            //     id: selected_tasks,
                            //     formData: $(form).serialize(),                                
                            //     action: action // optional param in case backend wants to know which action
                            // };

                            // Start the AJAX request
                            ajaxWithRefresh({
                                url: site_url + 'job-tasks/single_print',
                                method: 'POST',
                                data: (function () {
                                    formData.push({ name: 'action', value: action });
                                    return $.param(formData);
                                })(), // send form data and action
                                dataType: 'json',
                                xhr: function () {
                                    var xhr = new XMLHttpRequest();
                                    xhr.upload.addEventListener('progress', function (e) {
                                        if (e.lengthComputable) {
                                            var percentComplete = (e.loaded / e.total) * 100;
                                            progress = percentComplete;
                                            if (progressBar) progressBar.style.width = progress + '%';
                                        }
                                    });
                                    return xhr;
                                }
                            }).then(response => {
                                // Close processing modal
                                Swal.close();
                                // console.log(response);
                                // return false;
                                // If user chose Download -> trigger download if file path present
                                if (action === 'D') {
                                    const fileUrl = response.download_file_path;
                                    if (fileUrl) {
                                        // Show success then start download
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Ready',
                                            text: response.message || 'Click download to get the file.',
                                            showCancelButton: true,
                                            confirmButtonText: 'Download',
                                            cancelButtonText: 'Close'
                                        }).then((res) => {
                                            if (res.isConfirmed) {
                                                const a = document.createElement('a');
                                                a.href = fileUrl;
                                                a.download = ''; // let browser pick filename
                                                document.body.appendChild(a);
                                                a.click();
                                                document.body.removeChild(a);
                                            }
                                        });
                                    } else {
                                        Swal.fire('Error', 'File path not found in response.', 'error');
                                    }
                                } else {
                                    // action === 'autoprint'
                                    // Show the response message to user
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Auto Print',
                                        text: response.message || 'Auto print request completed.',
                                        allowOutsideClick: true
                                    });
                                    ajs.refreshDataTable();
                                }
                            }).catch(error => {
                                // Close processing modal and show error
                                Swal.close();
                                let errMsg = "Something went wrong.";
                                if (error && error.responseJSON && error.responseJSON.message) {
                                    errMsg = error.responseJSON.message;
                                } else if (error && error.message) {
                                    errMsg = error.message;
                                }
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    html: errMsg,
                                });
                            });
                        }
                    });
                });

            } else {
                // Modify checkbox value if checked
                ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.offcanvas_form, ajs_form_handler.offcanvas_form);
            }
            return false;
        },
    });
}

// Shows/hides the recipient inputs for the bulk composer. Letter goes to the
// property's postal address, so it has no recipient block at all.
function bulk_via_to_changed() {
    var via_to = $("#via_to").val();
    var is_custom = $("input[name=recipient_mode]:checked").val() == 'custom';

    $("#custom-email-div").toggleClass("hide", !(is_custom && via_to == 'email'));
    $("#custom-mobile-div").toggleClass("hide", !(is_custom && via_to == 'sms'));
    $("#recipient-mode-div").toggleClass("hide", via_to == 'letter');
    $("#subject-div").toggleClass("hide", via_to != 'email');

    manage_editor_toolbar(via_to != 'sms');
}

// Bulk email / sms / letter for the jobs ticked on the Job list. Modelled on
// send_email_sms(), minus the job task and comment fields - merge fields are
// resolved per job on the server instead of per task.
function bulk_send_email_sms() {
    var job_ids = [];
    var client_id = null;

    selectedJobs.forEach(function (job, key) {
        job_ids.push(ajs.hash_decode(key));
        client_id = job.client_id;
    });

    // Both have to be set before the editor boots: get_client_template() reads
    // #client_id_hidden to load this client's appointment templates.
    $("#bulk_job_ids").val(job_ids.join(","));
    $("#client_id_hidden").val(client_id);
    $("#bulk_comm_job_count").text(job_ids.length);

    if ($.fn.datetimepicker) {
        $("#scheduled_time").datetimepicker({ format: 'd-m-Y H:i', step: 15 });
    }
    init_ckeditor("#content", true).then((editor) => editorInstance = editor);
    ajs.mask_inputs();
    bulk_via_to_changed();

    $.validator.addMethod("ckeditorRequired", function (value, element) {

        if (typeof editorInstance === 'undefined' || !editorInstance) {
            console.log("Editor not ready yet");
            return false;
        }

        let data = editorInstance.getData() || '';
        let plainText = data
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/gi, '')
            .trim();

        return plainText.length > 0;

    }, "Content is required.");

    $("#bulkCommForm").validate({
        ignore: ":hidden:not(textarea)",
        onkeyup: false,
        rules: {
            content: {
                ckeditorRequired: true
            },
            email_to: {
                required: function () {
                    return $("input[name=recipient_mode]:checked").val() == 'custom' && $("#via_to").val() == 'email';
                },
                email: true
            },
            phone_to: {
                required: function () {
                    return $("input[name=recipient_mode]:checked").val() == 'custom' && $("#via_to").val() == 'sms';
                }
            }
        },
        errorPlacement: function (error, element) {
            if (
                element.hasClass("select2") &&
                element.next(".select2-container").length
            ) {
                error.insertAfter(element.next(".select2-container"));
            } else if (element.parent(".input-group").length ||
                element.parent(".error-div").length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            if (editorInstance) {
                editorInstance.updateSourceElement();
            }
            var sub_button = $(form).find(":submit:first");
            ajs.submit_button_element = sub_button;
            var action = $(form).attr("action");
            var method = $(form).attr("method");
            ajs.set_localtime_to_utc('scheduled_time');
            var formData = $(form).serializeArray();
            formData.forEach(function (field, index) {
                if (field.name === 'content') {
                    field.value = btoa(unescape(encodeURIComponent(field.value)));
                }
            });

            var via_to = $("#via_to").val();
            if (via_to == 'letter') {
                Swal.fire({
                    title: 'Choose action',
                    text: '',
                    icon: 'question',
                    showCancelButton: true,
                    showDenyButton: true,
                    confirmButtonText: 'Download',
                    denyButtonText: 'Auto Print',
                    cancelButtonText: 'Cancel',
                    allowOutsideClick: false,
                    customClass: {
                        confirmButton: 'btn btn-primary me-2',
                        denyButton: 'btn btn-success me-2',
                        cancelButton: 'btn btn-secondary'
                    },
                    buttonsStyling: false,
                }).then((choice) => {
                    if (choice.isDismissed) {
                        return;
                    }
                    var print_action = choice.isConfirmed ? 'D' : 'A';
                    formData.push({ name: 'action', value: print_action });

                    Swal.fire({
                        title: 'Processing...',
                        html: `<small>It might take some time to generate the PDF</small><br/><div class="progress" style="width:100%;margin-top:10px;background:#eee;border-radius:6px;height:10px;"><div id="progress-bar" style="width:0%;height:100%;border-radius:6px;"></div></div>`,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        showCancelButton: false,
                        didOpen: () => {
                            const progressBar = document.getElementById('progress-bar');

                            ajaxWithRefresh({
                                url: action,
                                method: 'POST',
                                data: $.param(formData),
                                dataType: 'json',
                                xhr: function () {
                                    var xhr = new XMLHttpRequest();
                                    xhr.upload.addEventListener('progress', function (e) {
                                        if (e.lengthComputable) {
                                            var percentComplete = (e.loaded / e.total) * 100;
                                            if (progressBar) progressBar.style.width = percentComplete + '%';
                                        }
                                    });
                                    return xhr;
                                }
                            }).then(response => {
                                Swal.close();
                                finish_bulk_comm();

                                if (print_action === 'D' && response.download_file_path) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Ready',
                                        html: bulk_comm_summary_html(response),
                                        showCancelButton: true,
                                        confirmButtonText: 'Download',
                                        cancelButtonText: 'Close'
                                    }).then((res) => {
                                        if (res.isConfirmed) {
                                            const a = document.createElement('a');
                                            a.href = response.download_file_path;
                                            a.download = '';
                                            document.body.appendChild(a);
                                            a.click();
                                            document.body.removeChild(a);
                                        }
                                    });
                                } else {
                                    Swal.fire({
                                        icon: 'success',
                                        title: print_action === 'D' ? 'Done' : 'Auto Print',
                                        html: bulk_comm_summary_html(response),
                                        allowOutsideClick: true
                                    });
                                }
                            }).catch(error => {
                                Swal.close();
                                let errMsg = "Something went wrong.";
                                if (error && error.responseJSON && error.responseJSON.message) {
                                    errMsg = error.responseJSON.message;
                                } else if (error && error.message) {
                                    errMsg = error.message;
                                }
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    html: errMsg,
                                });
                            });
                        }
                    });
                });
            } else {
                ajs.ajax_form(action, formData, method, null, "1", "1", bulk_comm_response, ajs_form_handler.offcanvas_form);
            }
            return false;
        },
    });
}

function bulk_comm_response(result_json) {
    if (!ajs_form_handler.check_result(result_json)) {
        ajs_form_handler.show_errors_offcanvas(result_json);
        return;
    }

    finish_bulk_comm();

    if (result_json.skipped && result_json.skipped.length) {
        Swal.fire({
            icon: 'warning',
            title: 'Sent with skips',
            html: bulk_comm_summary_html(result_json)
        });
    } else {
        ajs.showAlertBar('success', result_json.message, true);
    }
}

// Names the jobs the server could not send to, so the user knows what to fix.
function bulk_comm_summary_html(result_json) {
    var html = `<p class="mb-0">${result_json.message || ''}</p>`;

    if (result_json.skipped && result_json.skipped.length) {
        var rows = result_json.skipped.map(function (item) {
            return `<li>${item.job_code} &mdash; ${item.reason}</li>`;
        }).join('');
        html += `<div class="text-start mt-2"><strong>Skipped ${result_json.skipped.length} job(s):</strong><ul class="mb-0 ps-3">${rows}</ul></div>`;
    }

    return html;
}

// The batch is away and the selection is spent - close up rather than leaving a
// form behind that would re-submit an empty selection.
function finish_bulk_comm() {
    $('#offcanvasRight').offcanvas('hide');
    clear_job_selection();
    ajs.refreshDataTable();
}

$(document).on("change", "#bulkCommForm #via_to, #bulkCommForm input[name=recipient_mode]", function () {
    if (editorInstance && $(this).attr('id') == 'via_to') {
        editorInstance.setData('');
    }
    bulk_via_to_changed();

    if ($(this).attr('id') == 'via_to') {
        try {
            if (window.templatePluginInstance && typeof window.templatePluginInstance.refreshTemplates === 'function') {
                window.templatePluginInstance.refreshTemplates();
            }
        } catch (error) {
            console.error('Error refreshing templates:', error);
        }
    }
});

function edit_email_sms() {
    send_email_sms('edit');
    var id = $("#event_id").val();

    ajs.ajax_form(site_url + "job-event-details/" + id, null, "GET", null, "1", "1", set_email_sms_data, set_email_sms_data);
}


function set_email_sms_data(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var event = result_json.data;
        if (event && event.post_data) {
            var data = JSON.parse(event.post_data);

            if (!isEmpty(data.scheduled_time)) {
                $('#send_now').trigger('click');
                $('#scheduled_time').val(ajs.convert_utc_to_local(data.scheduled_time, 'DD-MM-YYYY HH:mm'));
            }

            init_ckeditor("#content", true).then((editor) => {

                const el = document.querySelector("#content");   // ✅ FIXED
                el.ckeditorInstance = editor;

                editor.model.document.on("change:data", () => {
                    el.value = editor.getData();
                });

                editorInstance = editor;
                editor.setData(data.content);

                $("input[name=via_to][value='" + data.via_to + "']")
                    .prop("checked", true)
                    .trigger('change');

                $("input[name=send_to][value='" + data.send_to + "']")
                    .prop("checked", true)
                    .trigger('change');

                if (isEmpty(data.scheduled_time) ||
                    (!isEmpty(data.scheduled_time) &&
                        moment().isAfter(moment(data.scheduled_time, 'YYYY-MM-DD HH:mm')))) {

                    $('#add-btn').remove();
                    $("#sendEmalSmsForm :input").prop("disabled", true);
                    $("#close-modal").prop("disabled", false);
                    editor.enableReadOnlyMode('customLock');
                }

                for (const [key, value] of Object.entries(data)) {
                    if (['phone_to', 'email_to', 'subject', 'comment'].includes(key)) {
                        $("#" + key).val(value);
                    }
                }

            });
            add_autocomplete_sel("#job_task_id", "job_tasks", ["task_code"], null, { 'job_id': event.job_id }, "offcanvasRight", event.reference_id);
        }
    } else {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function get_client_template() {
    let client_id = $("#client_id_hidden").val();
    let url = site_url + "client/" + client_id + "/appointment";
    return ajaxWithRefresh({
        url: url,
        method: "GET",
        data: { type: $("#via_to").val() },
        dataType: "json"
    }).then((response) => {
        return response?.data.map((item) => ({
            label: item.title,
            value: item.draft,
        }));
    }).catch((error) => {
        console.error("Error fetching dynamic data:", error);
        return [];
    });
}

// for enable /disable editor toolbar
function manage_editor_toolbar(is_enable = true) {
    const tools = [
        "bold",
        "italic",
        "fontSize",
        "fontFamily",
        "fontColor",
        "fontBackgroundColor",
        "bulletedList",
        "numberedList",
    ]

    if (!editorInstance) {
        return;
    }
    tools.forEach(commandName => {

        const command = editorInstance.commands.get(commandName);
        if (command) {
            command.isEnabled = is_enable; // Disable initially

            if (is_enable) {
                delete command.refresh; // Restore default refresh behavior
            } else {
                command.refresh = () => {
                    command.isEnabled = false;
                }; // Override refresh to keep it disabled
            }
        }
    });
}

$(function () {
    if ($("#is_detail_page").val()) {
        get_details();

        let url = new URL(window.location.href);

        if (url.searchParams.get('add_task') == '1') {
            // Remove parameter
            url.searchParams.delete('add_task');
            // Update browser URL without reload
            window.history.replaceState({}, '', url);

            $('.popup-form-button-task').trigger('click');

        }
    }

    $.validator.addMethod("validateDuplicateSor", function (value, element) {
        var isValid = true;
        var selectedValues = [];

        // Loop through each dropdown
        $('#task-sor-section .sor-id').each(function () {
            var val = $(this).val();

            if (val !== "") {
                if (selectedValues.includes(val)) {
                    if (element === this) {
                        isValid = false;
                    }
                }
                selectedValues.push(val);
            }
        });

        return isValid;
    }, "Duplicate task SOR selected.");

    $(document).on("click", ".add-task-sor", function (e, is_edit = false) {

        var sor_id = 'sor_id_' + task_sor_index;
        var asset_id = 'asset_id_' + task_sor_index;
        task_sor_row.find('.sor-id').attr('id', sor_id);
        task_sor_row.find('.sor-asset').attr('id', asset_id);
        task_sor_row.find('.popup-form-search-button').attr('data-element', sor_id);
        var new_row = task_sor_row.clone();

        //new_row.find('.btn-danger').parent().removeClass('hide');

        new_row.html(function (i, oldHTML) {
            return oldHTML.replaceAll('task_sors[0]', 'task_sors[' + task_sor_index + ']');
        });

        $("#task-sor-section").append(new_row);
        if (job_contract_id && !is_edit) {
            init_job_workstream_sors(sor_id);
            set_sor_asset(asset_id);
        }
        task_sor_index++;
        refresh_invoiced_total_banner();
    });

    $(document).on("click", ".delete-task-sor", function () {
        var parent = $(this).closest('.task-sor-row');
        // var id = parent.find('.row-id').val();
        // if (id) {
        //     deleted_uplifts.push(id);
        // }
        parent.remove();
        refresh_invoiced_total_banner();
    });

    // Instant feedback for the fields the user types in or toggles directly.
    // Programmatic writes to .sell-rate (SOR selection, unit-price lookup,
    // resetSorPricingAndDescription) land asynchronously and fire no consistent
    // event, so the poll armed in refresh_invoiced_total_banner() catches those.
    $(document).on('change keyup input', '#task-sor-section .sor-qty, #task-sor-section .sell-rate, #task-sor-section .pricing-model, #task-sor-section input[type="checkbox"][name*="[is_chargeable]"]', function () {
        refresh_invoiced_total_banner();
    });

    $(document).on('change', '#createTaskForm .pricing-model', function () {

        const pricing_model = $(this).val();
        const row = $(this).closest('.task-sor-row');
        let sor_element = row.find('.sor-id').attr('id');
        let asset_quantity = row.find('.sor-qty').val() || 1;
        resetSorPricingAndDescription(row);
        if (!sor_element) {
            return false;
        }

        if (pricing_model == 3) {
            row.find('.sell-rate,.labour-rate').attr('disabled', false);
        } else {
            row.find('.sell-rate,.labour-rate').attr('disabled', true);
        }

        if (pricing_model == 2) {
            row.find('.sor-asset').attr('required', true);
            reset_sor(sor_element, row, asset_quantity);
        } else {
            row.find('.sor-asset').attr('required', false);
            init_job_workstream_sors(sor_element);
        }

    });

    $(document).on('select2:select', '#createTaskForm .sor-asset', function (e) {
        const asset = e.params.data?.item;
        const asset_quantity = asset?.quantity || 1;
        const row = $(this).closest('.task-sor-row');
        row.find('.sor-qty').val(asset_quantity);
        let sor_element = row.find('.sor-id').attr('id');
        let pricing_model = row.find('.pricing-model').val();
        resetSorPricingAndDescription(row);
        if (!sor_element) {
            return false;
        }
        if (pricing_model == 2) {
            reset_sor(sor_element, row, asset_quantity);
        } else {
            init_job_workstream_sors(sor_element);
        }
    });

    /* $(document).on('select2:select', '.sor-id', function (e) {
        const sor = e.params.data?.item;
        const row = $(this).closest('.task-sor-row');
        let material_price = sor?.material_price || 0;
        let labor_price = sor?.labor_price || 0;
        let sell_price = sor?.sell_price || 0;
        
        if(sor && sor?.unit_rates?.length) {
            let unit_key = 0;
            let unit_matched = false;
            
            $.each(sor.unit_rates, function(key, value) {
                if(value.unit_from <= asset_total_quantity && value.unit_to >= asset_total_quantity) {
                    unit_key = key;
                    unit_matched = true;
                    return false; // break loop
                }
            });
            if(unit_matched) {
                ({labor_price, sell_price} = sor.unit_rates[unit_key]);
            }
        }
        
        row.find('.desc').val(sor?.short_description || '');
        row.find('.material-rate').val(material_price);
        row.find('.labour-rate').val(labor_price);
        row.find('.sell-rate').val(sell_price);
    }); */

    $(document).on("select2:close", "#asset_ids", async function () {
        var asset_ids = $(this).val();
        asset_total_quantity = 0;

        if (asset_ids && asset_ids?.length) {
            await new Promise(r => setTimeout(r, 5));
            ajs.ajax_form(site_url + "asset/total_quantity", { asset_ids: asset_ids }, "GET", null, "1", "1", function (data) {
                asset_total_quantity = data?.total_quantity || 0;
                $('#work_asset_quantity').val(asset_total_quantity);
            });
        }
        // for set select2 value again to trigger select2:select event for SORs to recalculate prices
        /* $('.sor-id').each(function () {
            const data = $(this).select2('data')[0];
            let is_fixed_price = $(this).closest('.task-sor-row').find(".row-id").data("fixed-price") || 'false';

            if (data && is_fixed_price == 'false') {
                $(this).trigger({
                    type: 'select2:select',
                    params: {
                        data: data
                    }
                });
            }
        }); */
    });

    $(document).on("change", "#asset_type_id", function (e, source) {
        if (source !== 'select2') {
            set_asset_id_task([], 'asset_ids');
        }
    })

    $(document).on("change", "#property_id", function () {
        var property_id = $(this).val();
        job_property_client_id = null;
        if (typeof property_id !== 'undefined' && property_id > 0) {
            ajs.ajax_form(site_url + "client/client_by_property/" + property_id, null, "GET", null, "1", "1", function (data) {
                $('#client_name').val(data.message.property.resident_name);
                $('#client_email').val(data.message.property.email);
                $('#client_phone').val(data.message.property.mobile);
                render_job_property_details(data.message.property);
                job_property_client_id = data.message.client.id;

                if ($("#client_id").val() != data.message.client.id) {
                    add_autocomplete_sel("#client_id", "clients", ["client_code"], null, null, "offcanvasRight", data.message.client.id);
                    if ($('#contract_id').hasClass('select2-hidden-accessible')) {
                        $("#contract_id").select2("destroy");
                        $('#contract_id').find('option:not(:first)').remove();
                        //$("#contract_id").empty();
                    }
                    select2_ajax("#contract_id", site_url + "contract/get_all", "contract_number", { client_id: data.message.client.id, 'contracts.contract_active': '1' }, "offcanvasRight", null, true);
                    $('#contract_id').trigger('change');
                }
            });
        } else {
            render_job_property_details(null);
        }
    });

    $(document).on('click', '#job_property_edit_btn, #task_property_edit_btn', function () {
        open_property_quick_edit();
    });

    $(document).on('submit', '#propertyQuickEditForm', function (e) {
        e.preventDefault();

        var $form = $(this);
        var property_id = $form.find('[name="id"]').val();
        // The Save button lives in the modal footer, outside the form, so that
        // .modal-dialog-scrollable can keep the footer pinned and scroll the body.
        var $save_btn = $('#property_quick_edit_save');

        $save_btn.prop('disabled', true);
        ajs.ajax_form(site_url + "property/quick-update", $form.serialize(), "POST", null, "0", "1", function (result_json) {
            $save_btn.prop('disabled', false);
            if (ajs_form_handler.check_result(result_json)) {
                $('#property_quick_edit_modal').modal('hide');
                ajs.showAlertBar('success', result_json.message || 'Property details updated', true);
                reload_property_details_panel(property_id);
            } else {
                ajs_form_handler.show_blocking_error(result_json.message || 'Failed to update property details');
            }
        }, function () {
            $save_btn.prop('disabled', false);
        });
    });

    $(document).on("change", "#preferred_time_range", function (e, from = null) {

        var time_id = $(this).val();
        if (typeof time_id !== 'undefined' && time_id > 0 && !from) {
            ajs.ajax_form(site_url + "servicetime/get/" + time_id, null, "GET", null, "1", "1", function (data) {
                var start_time = data.message.data.start_time || '';
                if (!isEmpty(start_time)) {
                    $('#appointment_time').val(ajs.convert_time_utc_to_local(data.message.data.start_time));
                }
            });
        }
    });

    // Reject a client that does not own the already selected property, before the selection is applied.
    $(document).on("select2:selecting", "#client_id", function (e) {
        if (is_property_client_conflict(e.params.args.data.id)) {
            show_property_conflict_alert('client');
            e.preventDefault();
            $(this).select2('close');
        }
    });

    // Same guard for contracts - a contract belongs to the property only through its client.
    $(document).on("select2:selecting", "#contract_id", function (e) {
        var contract = e.params.args.data.item;
        if (contract && is_property_client_conflict(contract.client_id)) {
            show_property_conflict_alert('contract');
            e.preventDefault();
            $(this).select2('close');
        }
    });

    $(document).on("change", "#client_id", function () {
        var client_id = $(this).val();
        if ($('#property_id').hasClass('select2-hidden-accessible')) {
            $("#property_id").select2("destroy");
            $('#property_id').find('option:not(:first)').remove();
        }
        if (typeof client_id !== 'undefined' && client_id > 0) {
            ajs.ajax_form(site_url + "client/get/" + client_id, null, "GET", null, "1", "1", function (data) {

                add_autocomplete_sel("#property_id", "client_properties", ["uprn_no", "postalcode"], null, { "client_id": client_id }, "offcanvasRight");
                if ($('#contract_id').hasClass('select2-hidden-accessible')) {
                    $("#contract_id").select2("destroy");
                    $('#contract_id').find('option:not(:first)').remove();
                    //$("#contract_id").empty();
                }
                var contract_id = $('#hidden_contract_id').val() ?? null;
                select2_ajax("#contract_id", site_url + "contract/get_all", "contract_number", { client_id: data.message.data.id, 'contracts.contract_active': '1' }, "offcanvasRight", contract_id, true);
            });
        } else {
            add_autocomplete_sel("#property_id", "client_properties", ["uprn_no", "postalcode"], null, null, "offcanvasRight");
        }
    });

    $(document).on("change", "#contract_id", function (e, from = null) {        
        var contract_id = $(this).val();
        if (contract_id) {
            // select2_ajax() fires this change with 'select2' whenever it preselects a value,
            // which is also what happens when a job is opened from a contract screen with the
            // contract already chosen - and skipping the load there left Job Type empty. The
            // guard is really there to stop a service selection being wiped while the edit form
            // restores it, so key on that instead: only skip when a service is already set.
            if (from !== 'select2' || !$('#service_id').val()) {
                if ($('#service_id').hasClass('select2-hidden-accessible'))
                {
                    $("#service_id").select2("destroy");
                    $('#service_id').find('option:not(:first)').remove();
                    //$("#service_id").empty();
                }
                select2_ajax("#service_id", site_url + "service/contract_services_get_all/" + contract_id, "title", {'contract_services.status':1}, "offcanvasRight");
            }
            ajs.ajax_form(site_url + 'contract/get/' + contract_id, null, "GET", null, "0", "0", function (response) {
                let contract = response?.data;
                if (contract && contract?.type == 'reactive') {
                    $('.emergency-div').show();
                } else {
                    $("#emergency_job0").prop('checked', true)
                    $('.emergency-div').hide();
                }

            });
        }
    })

    $(document).on("change", "#service_id", function (e, from = null) {
        if (from == 'select2' && !is_setup_copy) {
            return false;
        }
        is_setup_copy = false;
        
        var service_id = $(this).val();
        var contract_id_sel = $('#contract_id').val();
        if (typeof service_id !== 'undefined' && service_id > 0 && typeof contract_id_sel !== 'undefined' && contract_id_sel > 0) {
            // console.log('sdsdfsd');
            var job_created_date = ajs.convert_datetime_local_to_utc($('#job_created_date').val());

            ajs.ajax_form(site_url + "contractservice/get/" + contract_id_sel + "/" + service_id, { add_date: job_created_date }, "GET", null, "0", "0", function (data) {
                var workstream_id = data.message.workstream_id;
                // if ($('#sor_id').hasClass('select2-hidden-accessible'))
                // {
                //     $("#sor_id").select2("destroy");
                //     $('#sor_id').find('option:not(:first)').remove();
                //     //$("#service_id").empty();
                // }

                $('#description').val(data.message.description);
                //$('#sor_id').val(data.message.sor_id).trigger('change');
                if (typeof data.target_time !== 'undefined' && data.target_time !== null) {
                    let target_datetime = ajs.convert_utc_to_local(data.target_time);
                    $('#target_date').val(target_datetime);
                }
            });
        }
    });


    $(document).on("change", "#job_created_date", function () {
        $("#service_id").trigger('change');
    });

    $(document).on("change", "#task_id", function (e, from = null) {
        // if (from == 'select2') {
        //     return false;
        // }
        var task_id = $(this).val();
        $('.external_task_fields').css('display', 'none');
        $('.internal_task_fields').css('display', 'none');
        $('#appointment_template_id').removeAttr('required', 'required');
        $('#parent_job_task_id').removeAttr('required', 'required');
        if (from != 'select2') {
            $('#is_send_now').prop('checked', false);
        }
        if (typeof task_id !== 'undefined' && task_id > 0) {
            ajs.ajax_form(site_url + "task/get/" + task_id, null, "GET", null, "1", "1", function (data) {

                //$('#task_description').val(data.message.data.description);
                $('#task_user_type_hidden').val(data.message.data.user_type);
                var task_code_internal = data.message.data.task_code;
                $('#createTaskForm').data('task_code', task_code_internal);
                $('#skill').val(data.message.data.skill_name);
                if (data.message.data.task_type == 'I' || data.message.data.user_type == 'R') {
                    $('#skill_id').val(data.message.data.skill_id);
                } else if (data.message.data.task_type == 'E') {
                    var service_skills = $('#job_skills_hidden').val();
                    var service_skill_names = $('#job_skills_names_hidden').val();
                    if (typeof service_skills !== 'undefined') {
                        $('#skill_id').val(service_skills.split(','));
                    }

                    $('#skill').val(service_skill_names);
                }
                $('#task_type').val(data.message.data.task_type);
                $('#task_type_name').val(data.message.data.task_type_name);
                $('#sor_id_task').val(data.message.data.sor_id).trigger('change');

                var utype = 16;
                if (data.message.data.user_type == 'R') {
                    utype = 12;
                }

                select2_ajax_users("#engineer_id", { user_type: utype }, "offcanvasRight3");
                if (data.message.data.task_type == 'E') {
                    $('.external_task_fields').css('display', '');
                }
                if (data.message.data.user_type == 'R') {
                    $('.is-an-appointment-div').attr('style', 'display:none !important');
                }
                var client_id = $('#client_id').val();
                if ($('#is_detail_page').length && $('#is_detail_page').val() == '1') {
                    client_id = $('#client_id_hidden').val();
                }
                if (data.message.data.task_type == 'I' && task_code_internal != 'CALLCOMM') {
                    $('.internal_task_fields').css('display', '');
                    $('#appointment_template_id').attr('required', 'required');
                    var type_filter = 'letter';
                    if (task_code_internal == 'SMSCOMM') {
                        type_filter = 'sms';
                    }
                    if (task_code_internal == 'EMAILCOMM') {
                        type_filter = 'email';
                    }
                    if (task_code_internal == 'LETTERCOMM') {
                        type_filter = 'letter';
                    }
                    add_autocomplete_sel("#appointment_template_id", "client_appointments", ["title"], null, { client_id: client_id, type: type_filter }, "offcanvasRight3");
                    add_autocomplete_sel("#parent_job_task_id", "job_tasks", ["task_code"], null, { job_id: $("#job_id").val() }, "offcanvasRight3");
                }
                if (data.message.data.require_external_task == '1') {
                    $('#parent_job_task_id').closest('.internal_task_fields').css('display', '');
                    add_autocomplete_sel("#parent_job_task_id", "job_tasks", ["task_code"], null, { job_id: $("#job_id").val() }, "offcanvasRight3");
                }
                /* var contract_id_sel = $('#contract_id').val();

                var service_id_sel = $('#service_id').val();
                ajs.ajax_form(site_url + "job/calculate-target-time/" + contract_id_sel + '/' + service_id_sel, null, "GET", null, "1", "1", function (data) {
                    //alert(JSON.stringify(data));
                    //$('#preferred_date').val(data.message);
                }); */

                if (typeof data.message.data.task_statuses !== 'undefined' && from != 'select2') {
                    $('#status_id').empty();
                    $('#status_id').append($("<option selected disabled></option>")
                        .attr("value", "")
                        .text("Select Status"));
                    let target_statuses = $('#is_send_now').is(':checked') ? ['completed', 'complete'] : ['open', 'pending'];
                    let selected_set = false;
                    $.each(data.message.data.task_statuses, function (key, value) {
                        let selected = '';
                        let title_lower = value?.title ? value.title.toLowerCase() : '';
                        if (!selected_set && target_statuses.includes(title_lower)) {
                            selected = 'selected';
                            selected_set = true;
                        }
                        $('#status_id')
                            .append($("<option></option>")
                                .attr("value", value.id)
                                .text(value.title)
                                .prop("selected", selected));
                    });
                }

            });
        }
    });

    $(document).on("change", "#is_send_now", function () {
        let is_checked = $(this).is(':checked');
        let target_statuses = is_checked ? ['completed', 'complete'] : ['open', 'pending'];
        let matched_option = null;
        $('#status_id option').each(function () {
            let text = $(this).text().trim().toLowerCase();
            if (target_statuses.includes(text)) {
                matched_option = $(this).val();
                return false;
            }
        });
        if (matched_option !== null) {
            $('#status_id').val(matched_option).trigger('change');
        }
        var is_edit = ($('#edit_task_id').length > 0 && $('#edit_task_id').attr('name') == 'edit_task_id');
        if (is_checked && !is_edit) {
            $("#createTaskForm #add-btn").text("Send");
        } else {
            $("#createTaskForm #add-btn").text("Save");
        }
    });

    $(document).on("change", ".task-assign", function (e, is_edit) {
        is_edit = is_edit || false;

        var assignment = $(this).val();
        $('.not_assign_div').css('display', 'none');
        $('.assign_div,.preferred_date_div').css('display', 'none');
        if (assignment == '1') {
            $('.assign_div,.preferred_date_div').css('display', '');
            if (!is_edit) {
                let [pref_date, pref_time] = job_target_datetime.split(' ') || ['', ''];
                $('#preferred_date').val(pref_date);
                $('#preferred_time').val(pref_time);
            }
        } else if (assignment == '0') {
            $('.not_assign_div').css('display', '');
        }
    });

    $(document).on("change", ".appointment-radio", function () {
        var appointment = $(this).val();
        $('.appointment_div').css('display', 'none');
        $('.preferred_date_div').css('display', 'none');
        if (appointment == '1') {
            $('.appointment_div').css('display', '');
            $('.preferred_date_div').css('display', 'none');
        } else if (appointment == '0') {
            $('.not_assign_div').css('display', 'none');
            $('.preferred_date_div').css('display', '');
        }
    });
    $(document).on("change", ".is_appointment_confirmed", function () {
        var is_confirmed = $(this).val();
        // if (is_confirmed == '1') {
        //     $("#appointment_time").prop('readonly', false);
        // } else {
        //     $("#appointment_time").prop('readonly', true);
        // }
    });

    $(document).on("change", "#quotation_id", function () {
        var quotation_id = $(this).val();
        ajs.ajax_form(site_url + "quotation/get/" + quotation_id, null, "GET", null, "1", "1", function (response) {
            // console.log(response);
            if (response.status) {
                let property_id = response.data.property_id;
                let client_id = response.data.client_id;
                let contract_id = response.data.contract_id;
                if (client_id) {
                    add_autocomplete_sel("#client_id", "clients", ["client_code"], null, null, "offcanvasRight", client_id)
                }
                if (property_id) {
                    add_autocomplete_sel("#property_id", "client_properties", ["uprn_no", "postalcode"], null, null, "offcanvasRight", property_id)
                }
                if (contract_id) {
                    select2_ajax("#contract_id", site_url + "contract/get_all", "contract_number", { client_id: client_id }, "offcanvasRight", contract_id);
                }
            }
        });

    });


    /*************** use for send email or sms **************/

    $(document).on("change", "#send_now", function () {
        if ($(this).is(':checked')) {
            $("#scheduled_time").val('');
            $("#scheduled_time").parent().parent().hide();
            $("#add-btn").html('Send');
        } else {
            $("#add-btn").html('Save & Schedule');
            $("#scheduled_time").parent().parent().show();
        }
    });

    $(document).on("change", "#job_task_id", function () {
        const task_id = $(this).val();
        if (!task_id) {
            return;
        }
        const task = job_task_details.find(({ id }) => id == task_id);
        if (task) {
            engr_email = task.engr_email;
            engr_mobile = task.engr_mobile;
        } else {
            engr_email = '';
            engr_mobile = '';
        }
    });

    $(document).on("change", ".send-to", function () {
        if ($(this).val() == 'tenant') {
            $("#email_to").val(resident_email);
            $("#phone_to").val(resident_mobile);
        } else {
            $("#email_to").val(engr_email);
            $("#phone_to").val(engr_mobile);
        }
    });

    $(document).on("change", "#via_to", function () {
        // The bulk composer has its own recipient rules - see bulk_via_to_changed().
        if ($("#bulkCommForm").length) {
            return;
        }
        var via_to = $(this).val();
        // console.log("Communication type changed to: ", via_to);
        if (editorInstance) {
            editorInstance.setData('');   // Clear editor content
        }
        // $('#content').val('');
        if ($(this).val() == 'email') {
            $(".email-div").show();
            $(".mobile-div").hide();
            $("#subject").parent().show();
            $("#send-to-div").hide();
            $("#comment").parent().show();
            manage_editor_toolbar(true);
        } else if ($(this).val() == 'letter') {
            $(".email-div").hide();
            $(".mobile-div").hide();
            $("#subject").parent().hide();
            $("#comment").parent().hide();
            $("#send-to-div").hide();
            manage_editor_toolbar(true);
        } else {
            $(".email-div").hide();
            $(".mobile-div").show();
            $("#send-to-div").show();
            $("#subject").parent().hide();
            $("#comment").parent().show();
            manage_editor_toolbar(false);
        }

        // Reload CKEditor templates when communication type changes
        try {
            // Check if global template plugin instance is available
            if (window.templatePluginInstance && typeof window.templatePluginInstance.refreshTemplates === 'function') {
                // console.log('Found global templatePluginInstance, calling refreshTemplates()');
                window.templatePluginInstance.refreshTemplates();
            } else {
                console.warn('templatePluginInstance not found globally');
            }
        } catch (error) {
            console.error('Error refreshing templates:', error);
        }
    });

    $(document).on("click", "#close-modal", function () {
        $('.offcanvas-backdrop').remove();
    });



    /* ******************************************************/

    // // approve job task
    // $(document).on("click", ".approve-job-task", function (e) {
    //     e.preventDefault();
    //     var task_id = $(this).data("task-id");
    //     Swal.fire({
    //         title: "Approve Job Task",
    //         text: "Please provide a comment for approve this job task.",
    //         icon: "warning",
    //         input: "textarea",
    //         inputAttributes: {
    //             autocapitalize: "off",
    //             placeholder: "Enter comments...",
    //         },
    //         showCancelButton: true,
    //         confirmButtonText: "Approve",
    //         showLoaderOnConfirm: true,
    //         preConfirm: async (comments) => {
    //             console.log($.trim(comments));
    //             if ($.trim(comments) == "") {
    //                 return Swal.showValidationMessage(`Please enter comments.`);
    //             }
    //             try {
    //                 const url = `${site_url}job/task_approve_reject`;
    //                 const status_code = 'APPROVED';
    //                 const response = await $.ajax({
    //                     type: "POST",
    //                     url: url,
    //                     data: {comments, task_id, status_code},
    //                     dataType: "json",
    //                     beforeSend: function (xhr, settings) {
    //                         ajs.set_auth_header(xhr, settings);
    //                     },
    //                 });
    //                 if (response.status == false) {
    //                     return Swal.showValidationMessage(`
    //                         <strong>Error: </strong>${response.message}
    //                     `);
    //                 }
    //                 return response;
    //             } catch (error) {
    //                 var errorMsg = "Something went wrong.please try again...";
    //                 if ("responseJSON" in error) {
    //                     errorMsg = $(`<div>${error.responseJSON.message}</div>`).text();
    //                 }
    //                 Swal.showValidationMessage(`<strong>Error: </strong> ${errorMsg}`);
    //             }
    //         },
    //         allowOutsideClick: () => !Swal.isLoading(),
    //     }).then((result) => {
    //         if (result.isConfirmed && result.value.status) {
    //             Swal.fire({
    //                 icon: "success",
    //                 text: result.value.message,
    //             });
    //             if ($("#is_detail_page").val()) {
    //                 location.reload();
    //             } else {
    //                 get_task_details();
    //             }
    //         }
    //     });
    // });

    // // reject job task
    // $(document).on("click", ".reject-job-task", function (e) {
    //     e.preventDefault();
    //     var task_id = $(this).data("task-id");
    //     Swal.fire({
    //         title: "Reject Job Task",
    //         text: "Please provide a reason for rejecting this job task.",
    //         icon: "warning",
    //         input: "textarea",
    //         inputAttributes: {
    //             autocapitalize: "off",
    //             placeholder: "Enter comments...",
    //         },
    //         showCancelButton: true,
    //         confirmButtonText: "Reject",
    //         showLoaderOnConfirm: true,
    //         preConfirm: async (comments) => {
    //             console.log($.trim(comments));
    //             if ($.trim(comments) == "") {
    //                 return Swal.showValidationMessage(`Please enter comments.`);
    //             }
    //             try {
    //                 const url = `${site_url}job/task_approve_reject`;
    //                 const status_code = 'REJECTED';
    //                 const response = await $.ajax({
    //                     type: "POST",
    //                     url: url,
    //                     data: {comments, task_id, status_code},
    //                     dataType: "json",
    //                     beforeSend: function (xhr, settings) {
    //                         ajs.set_auth_header(xhr, settings);
    //                     },
    //                 });
    //                 if (response.status == false) {
    //                     return Swal.showValidationMessage(`
    //                         <strong>Error: </strong>${response.message}
    //                     `);
    //                 }
    //                 return response;
    //             } catch (error) {
    //                 var errorMsg = "Something went wrong.please try again...";
    //                 if ("responseJSON" in error) {
    //                     errorMsg = $(`<div>${error.responseJSON.message}</div>`).text();
    //                 }
    //                 Swal.showValidationMessage(`<strong>Error: </strong> ${errorMsg}`);
    //             }
    //         },
    //         allowOutsideClick: () => !Swal.isLoading(),
    //     }).then((result) => {
    //         if (result.isConfirmed && result.value.status) {
    //             Swal.fire({
    //                 icon: "success",
    //                 text: result.value.message,
    //             });
    //             if ($("#is_detail_page").val()) {
    //                 location.reload();
    //             } else {
    //                 get_task_details();
    //             }
    //         }
    //     });
    // });

    // // comment job task
    // $(document).on("click", ".comment-job-task", function (e) {
    //     e.preventDefault();
    //     var task_id = $(this).data("task-id");
    //     var def_comment = $(this).data("comments") ?? ''
    //     Swal.fire({
    //         text: "Please provide a comment for this job task.",
    //         //  icon: "warning",
    //         input: "textarea",
    //         inputValue: def_comment,
    //         inputAttributes: {
    //             autocapitalize: "off",
    //             placeholder: "Enter comments...",
    //         },
    //         showCancelButton: true,
    //         confirmButtonText: "Save",
    //         showLoaderOnConfirm: true,
    //         preConfirm: async (comments) => {
    //             if ($.trim(comments) == "") {
    //                 return Swal.showValidationMessage(`Please enter comments.`);
    //             }
    //             try {
    //                 const url = `${site_url}mytasks/update_comment`;
    //                 const response = await $.ajax({
    //                     type: "POST",
    //                     url: url,
    //                     data: {comments, task_id, type: 'manager'},
    //                     dataType: "json",
    //                     beforeSend: function (xhr, settings) {
    //                         ajs.set_auth_header(xhr, settings);
    //                     },
    //                 });
    //                 if (response.status == false) {
    //                     return Swal.showValidationMessage(`
    //                         <strong>Error: </strong>${response.message}
    //                     `);
    //                 }
    //                 return response;
    //             } catch (error) {
    //                 var errorMsg = "Something went wrong.please try again...";
    //                 if ("responseJSON" in error) {
    //                     errorMsg = $(`<div>${error.responseJSON.message}</div>`).text();
    //                 }
    //                 Swal.showValidationMessage(`<strong>Error: </strong> ${errorMsg}`);
    //             }
    //         },
    //         allowOutsideClick: () => !Swal.isLoading(),
    //     }).then((result) => {
    //         if (result.isConfirmed && result.value.status) {
    //             Swal.fire({
    //                 icon: "success",
    //                 text: result.value.message,
    //             });
    //             if ($("#is_detail_page").val()) {
    //                 location.reload();
    //             } else {
    //                 get_task_details();
    //             }
    //         }
    //     });
    // });

    // create job notes
    $(document).on("click", ".update-job-notes", function (e) {
        e.preventDefault();
        var job_id = $('#job_id').val();
        var def_notes = $(this).data("notes")
        Swal.fire({
            text: "Please provide a notes for this job.",
            //  icon: "warning",
            input: "textarea",
            inputValue: def_notes,
            inputAttributes: {
                autocapitalize: "off",
                placeholder: "Enter notes...",
            },
            showCancelButton: true,
            confirmButtonText: "Save",
            showLoaderOnConfirm: true,
            preConfirm: async (notes) => {
                if ($.trim(notes) == "") {
                    return Swal.showValidationMessage(`Please enter notes.`);
                }
                try {
                    const url = `${site_url}job/update_notes`;
                    const response = await ajaxWithRefresh({
                        type: 'POST',
                        url: url,
                        data: { notes, job_id },
                        dataType: 'json'
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
                Swal.fire({
                    icon: "success",
                    text: result.value.message,
                });
                location.reload();
            }
        });
    });

    // Ready To Invoice blocked by the contract's enforced minimum margin. The
    // server refuses this transition anyway; this just explains why up front
    // instead of making the user submit and read a rejection.
    $(document).on("click", ".min-margin-blocked", function (e) {
        e.preventDefault();
        var margin = $(this).data("margin");
        var min = $(this).data("min");
        Swal.fire({
            title: "Can't move to Clear to Invoice",
            text: "This job's margin is " + margin + "%, below the " + min + "% minimum set for this contract. Raise the sell price or lower the cost, or ask an administrator to change the contract's minimum margin.",
            icon: "error",
            confirmButtonText: "OK"
        });
    });

    // create job notes
    $(document).on("click", ".update-fin-status", function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        var status = $(this).data("status");
        var margin_warning = $(this).data("margin-warning");
        Swal.fire({
            title: "Are you sure? This action can't be undone",
            text: margin_warning || "",
            icon: margin_warning ? "warning" : undefined,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes",
            denyButtonText: "Cancel"
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                ajs.reload = true;
                ajs.ajax_form(site_url + "job/update-fin-status/" + id, { financial_status: status }, "POST", null, "1", "1", ajs_form_handler.api_response, ajs_form_handler.api_response);
            }
        });
    });

    // APP PENDING -> APP BUILDUP -> APP Submitted for a single job. Unlike
    // .update-fin-status these also stamp the job's batch and build its invoice,
    // so they post to their own endpoints rather than sending a raw status number.
    $(document).on("click", ".job-app-buildup, .job-app-submitted", function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        var is_buildup = $(this).hasClass("job-app-buildup");
        var url = site_url + (is_buildup ? "job/app-buildup/" : "job/app-submitted/") + id;
        var text = is_buildup
            ? "This will create a batch for this job, move it to APP Buildup and build its invoice."
            : "This will move the job to APP Submitted and submit its invoice.";
        Swal.fire({
            title: "Are you sure? This action can't be undone",
            text: text,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes",
            denyButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                ajs.reload = true;
                ajs.ajax_form(url, { job_id: id }, "POST", null, "1", "1", ajs_form_handler.api_response, ajs_form_handler.api_response);
            }
        });
    });

    // Hide the cancel option that doesn't apply to this job's client:
    // LBH jobs cancel only via "Send cancel to Havering"; non-LBH use direct Cancelled.
    $(document).on("select2:opening", "#update_job_status", function () {
        var isLBH = !!window.current_job_is_lbh;
        $(this).find("option").each(function () {
            var t = ($(this).text() || "").trim().toLowerCase();
            if ((t === "cancelled" && isLBH) || (t === "send cancel to havering" && !isLBH)) {
                $(this).remove();
            }
        });
    });

    $(document).on("select2:selecting", "#update_job_status", function (e) {
        e.preventDefault(); // Prevent default selection
        var selectedOption = e.params.args.data; // Get selected option details
        var $dd   = $(this);
        var jobId = $("#job_id").val();
        var label = (selectedOption.text || "").trim().toLowerCase();
        var isLBH = !!window.current_job_is_lbh;

        // LBH jobs must not be hard-cancelled directly — they go via Havering.
        if (label === "cancelled" && isLBH) {
            Swal.fire("Not allowed", "For LBH jobs, use 'Send cancel to Havering' to request cancellation.", "info");
            return;
        }
        // The Havering cancel request only applies to LBH jobs.
        if (label === "send cancel to havering" && !isLBH) {
            Swal.fire("Not applicable", "This option is only for LBH jobs.", "info");
            return;
        }
        // "Send cancel to Havering": collect the job cancellation reason + detail,
        // then queue the Stage 50 request (job moves to cancel_requested).
        if (label === "send cancel to havering") {
            open_send_cancel_to_havering(jobId, selectedOption.id, $dd);
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to change the job status?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes",
            denyButtonText: "Cancel"
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed && selectedOption?.id > 0) {
                $dd.val(selectedOption.id).trigger("change");
                ajs.reload = true;
                ajs.ajax_form(site_url + "job/update-job-status/" + jobId, { status_id: selectedOption.id }, "POST", null, "1", "1", ajs_form_handler.api_response, ajs_form_handler.api_response);
            }
        });
    });

    /* // Reassign Job Task
    $(document).on("click", ".force-reassign-btn", function (e) {
        e.preventDefault();

        const task_id = $(this).data("task-id");
        const engr_id = $(this).data("engr-id");
        Swal.fire({
            title: "Reassign Job Task",
            text: "Please provide a reason for reassign this job task.",
            icon: "warning",
            html: `<form id="reassign-from" ><div class="text-start ms-1" >
                        <label class="form-label"><strong>Note:- If you reassign task then will be transferred all sors, asset and certificate to another engineer.</strong> </label>
                        <div class="input-light mt-2">
                            <label class="form-label">Assign To <span class="text-danger">*</span></label>
                            <div class="d-flex input-group">
                                <select class="form-control" id="engineer_id" name="engineer_id" required>
                                    <option value="">Select</option>
                                </select>
                            </div>
                        </div>
                        <div class="input-light mt-2">
                            <label class="form-label">Reason <span class="text-danger">*</span></label>
                            <div class="d-flex input-group">
                                <textarea name="cancellation_reason" autocapitalize="off" placeholder="Enter the reason for reassign" class="swal2-textarea m-0 w-100" spellcheck="false"  required></textarea>
                            </div>
                        </div>
                    </div></form>`,
            showCancelButton: true,
            confirmButtonText: "Reassign",
            showLoaderOnConfirm: true,
            focusConfirm: false,
            didOpen: () => {
                var container_id = 'reassign_task_div';
                document.querySelector('.swal2-popup').setAttribute('id', container_id);
                select2_ajax_users("#engineer_id", {user_type: 16, id: engr_id}, container_id);
                $("#reassign-from").validate({
                    onkeyup: false,
                    rules: {
                        engineer_id: {
                            required: true,
                        },
                        cancellation_reason: {
                            required: true,
                        },
                    },
                    errorPlacement: function (error, element) {
                        if (
                                element.hasClass("select2") &&
                                element.next(".select2-container").length
                                ) {
                            error.insertAfter(element.next(".select2-container"));
                        } else if (element.parent(".input-group").length ||
                                element.parent(".error-div").length) {
                            error.insertAfter(element.parent());
                        } else {
                            error.insertAfter(element);
                        }
                    }
                });
            },
            preConfirm: async () => {
                
                if(!$("#reassign-from").valid()) {
                    return false; // Prevent form submission if validation fails
                }
                var formData = $("#reassign-from").serializeArray();
                console.log(formData);
                
                
                try {
                    const url = `${site_url}job-task/force-reassign/${task_id}`;
                    return await ajs.ajax_form(url, formData, "POST", null, "1", "1", reassignTask, reassignTask);
                } catch (error) {
                    Swal.showValidationMessage(`<strong>Request Failed:</strong> ${error.message}`);
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
        })
    });  */

    ajs.apply_ind_roles('Jobs');
});

/* function reassignTask(result_json){
    if (ajs_form_handler.check_result(result_json)){
        Swal.fire({icon: "success",title: "Job Task Reassigned", text: result_json.message});
        location.reload();
    }else{
        const errorMessage = result_json.message || "Something went wrong. Please try again.";
        return Swal.showValidationMessage(`<strong>Error:&nbsp;</strong> ${errorMessage}`);
    }
} */

function reassign_task_form() {

    var engr_id = $('#hidden_engr_id').val();
    var element_id = $('#element_id').val();
    var pref_time_range = $('#' + element_id).data('pref-time-range');
    var appt_confirm = $('#' + element_id).data('appt-confirm');
    var appt_date = $('#' + element_id).data('appt-date');
    var appt_time = $('#' + element_id).data('appt-time');
    var pref_date = $('#' + element_id).data('pref-date');
    var pref_time = $('#' + element_id).data('pref-time');

    if (!isEmpty(pref_date) && !isEmpty(pref_time)) {
        var pref_date_time = ajs.convert_utc_to_local(pref_date + ' ' + pref_time);
        [pref_date, pref_time] = pref_date_time.split(' ') || ['', ''];
    }

    if (!isEmpty(appt_date) && !isEmpty(appt_time)) {
        var appt_date_time = ajs.convert_utc_to_local(appt_date + ' ' + appt_time);
        [appt_date, appt_time] = appt_date_time.split(' ') || ['', ''];
    }

    select2_ajax_users("#engineer_id", { user_type: 16, id: engr_id }, "offcanvasRight3");
    select2_ajax("#queue_id", site_url + "queue/get_all", "title", null, "offcanvasRight3");
    $('div.custom-offcanvas-right3').addClass("width-50").css('width', '');

    // Set appointment_time BEFORE setting preferred_time_range to prevent it from being overwritten
    $("#preferred_date").val(pref_date);
    $("#preferred_time").val(pref_time);
    $("#appointment_date").val(appt_date);
    $("#appointment_time").val(appt_time);
    

    // Now set preferred_time_range - this will trigger change event but appointment_time is already set
    var current_job_contract_id = $('#contract_id').val();
    select2_ajax("#preferred_time_range", site_url + "job/get-service-times/" + current_job_contract_id, "title_with_time", null, "offcanvasRight3", pref_time_range);

    $("input[name=is_appointment_confirmed][value=" + appt_confirm + "]").attr('checked', 'checked').trigger('change');

    $("#reassign-task-form").validate({
        onkeyup: false,
        rules: {
            queue_id: {
                required: '#is_assigned_0:checked'
            },
            engineer_id: {
                required: '#is_assigned_1:checked'
            },
            appointment_date: {
                required: '#is_assigned_1:checked'
            },
            appointment_time: {
                required: '#is_assigned_1:checked'
            },
            preferred_date: {
                required: '#is_assigned_1:checked'
            },
            preferred_time: {
                required: '#is_assigned_1:checked'
            },
        },
        errorPlacement: function (error, element) {
            if (
                element.hasClass("select2") &&
                element.next(".select2-container").length
            ) {
                error.insertAfter(element.next(".select2-container"));
            } else if (element.parent(".input-group").length ||
                element.parent(".error-div").length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            var sub_button = $(form).find(":submit:first");
            ajs.submit_button_element = sub_button;
            var action = $(form).attr("action");
            var method = $(form).attr("method");

            var pref_date = $("#preferred_date").val();
            var pref_time = $("#preferred_time").val();

            // for converting local time to UTC
            if (pref_time != '') {
                var localTime = pref_date + ' ' + pref_time;
                var utcTime = moment(localTime, "YYYY-MM-DD HH:mm").utc().format("YYYY-MM-DD HH:mm:ss");
                [pref_date, pref_time] = utcTime.split(' ');
                $("#preferred_date").val(pref_date);
                $("#preferred_time").val(pref_time);
            }

            var appoint_date = $("#appointment_date").val();
            var appoint_time = $("#appointment_time").val();
            // for converting local time to UTC
            if (appoint_time != '') {
                var localTime = appoint_date + ' ' + appoint_time;
                var utcTime = moment(localTime, "YYYY-MM-DD HH:mm").utc().format("YYYY-MM-DD HH:mm:ss");
                [appoint_date, appoint_time] = utcTime.split(' ');
                $("#appointment_date").val(appoint_date);
                $("#appointment_time").val(appoint_time);
            }

            var formData = $(form).serializeArray();
            // Modify checkbox value if checked
            ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.offcanvas_form3, ajs_form_handler.offcanvas_form3);

            setTimeout(function () {
                refresh_job_tasks();
            }, 100);

            return false;
        },
    });
}


function get_task_table(job_tasks, job_fin_status = 0) {
    // console.log(job_tasks);
    var task_table_html = '';
    if (typeof job_tasks !== 'undefined' && Array.isArray(job_tasks)) {
        task_table_html = `<table class="table align-middle mb-0 nowrap mdl-data-table job-details-tbl-main jobs-details-tbl-top" id="tasksTable">
                                                            <thead class="table-light text-muted">
                                                                <tr>
                                                                    <th>Edit</th>
                                                                    <th>Task #</th>
                                                                    <th>Action</th>
                                                                    <th>Assigned To</th>
                                                                    <th>Sent to PDA</th>
                                                                    <!--<th>Summary</th>-->
                                                                    <th>Status</th>
                                                                    <th class="text-center">Certificates</th>
                                                                    <th class="text-center">SORs</th>
                                                                    <th>Created On</th>

                                                                    <!--<th>Delete</th>-->
                                                                </tr>
                                                            </thead>
                                                            <tbody class="form-check-all">`;

        // LBH sub-tasks (is_sub_task = 1) are clones of a top-level task that
        // share its appointment - a 2nd engineer / different SOR under the same
        // slot. Render them nested directly beneath their parent instead of as
        // flat rows. parent_job_task_id points at the top-level task.
        var children_by_parent = {};
        var top_level_tasks = [];
        $.each(job_tasks, function (k, v) {
            if (v.is_sub_task == 1 && v.parent_job_task_id && v.parent_job_task_id > 0) {
                (children_by_parent[v.parent_job_task_id] = children_by_parent[v.parent_job_task_id] || []).push(v);
            } else {
                top_level_tasks.push(v);
            }
        });

        // Builds the two <tr>s (summary row + hidden details row) for one task.
        // is_sub indents the row and drops the "Add Sub-Task" action.
        // parent_code (sub rows only) labels which task the sub-task belongs to.
        function build_task_rows(value, is_sub, parent_code) {
            var rows_html = '';
            if (value.assigned_to == null) {
                value.assigned_to = '-';
            }
            if (value.summary == null) {
                value.summary = '-';
            }
            var sent_to_pda_label = (value.sent_to_pda == '1') ? 'Yes' : '-';

            // A task stays editable at every stage, including complete, approved,
            // rejected and invoiced. On an invoiced job the edit form itself keeps
            // the billed total fixed rather than the button being taken away.
            var task_edit_button = `<a href="javascript:;" data-heading="Edit Task" data-after-load-func="edit_task_form" data-form-url="` + cdn_url + `job/edit-task/` + value.id + `" data-heading="Edit Task ` + value.task_code + `" data-task-status-code="` + value.task_status_code + `"  class="popup-form-button-task edit-task edit-btn"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i></a><a id="job_copy_` + value.id + `" onclick="return set_job_id(` + value.job_id + `)" data-after-load-func="copy_task_form" data-heading="Copy Task - #` + value.task_code + `" data-form-url="` + cdn_url + `job/copy-task/` + value.id + `" class="popup-form-button-task copy-task check-permission" data-module="Jobs" data-action="add" title="Copy Task"><i class="ri-file-copy-line align-bottom me-2 primary-btn cursor-pointer fs-15"></i></a>`;

            // "Add Sub-Task" - LBH-only, on a top-level task that has an
            // appointment and is not cancelled. Clones the task (engineer,
            // appointment, SORs) for a 2nd engineer on the SAME slot; nothing is
            // sent to Havering. Hidden on sub-task rows (only one level deep).
            var appt_set = (value.is_appointment == '1' || value.is_appointment == 1)
                && value.appointment_date && value.appointment_date != '0000-00-00';
            var add_subtask_btn = '';
            if (!is_sub && value.client_code === 'LBH' && value.is_cancelled == 0 && appt_set) {
                add_subtask_btn = `<a href="javascript:;" onclick="return add_task_subtask(` + value.id + `, '` + value.task_code + `')" class="add-subtask-task check-permission" data-module="Jobs" data-action="add" title="Add Sub-Task (2nd engineer, same appointment)"><i class="ri-node-tree align-bottom me-2 text-success cursor-pointer fs-15"></i></a>`;
            }

            var row_class = is_sub ? ' class="sub-task-row"' : '';
            var task_code_cell = is_sub
                ? `<span class="text-muted me-1" title="Sub-task of #` + (parent_code || '') + `"><i class="ri-corner-down-right-line align-bottom"></i></span>` + value.task_code + ` <span class="badge bg-success-subtle text-success ms-1">Sub-task</span>`
                : value.task_code;

            rows_html += `<tr` + row_class + `><td` + (is_sub ? ' style="padding-left:2.2rem"' : '') + `><div class="action-col justify-content-end">` + task_edit_button + add_subtask_btn + `
                                <a onclick="toggleTaskDetails(this)" class="details-control" ><i class="ri-arrow-down-s-line align-bottom" ></i> </a> </div></td>
                                <td>` + task_code_cell + `</td>
                                <td>` + value.task_name + `</td>
                                <td>` + value.assigned_to + `</td>
                                <td>` + sent_to_pda_label + `</td>
                                <!--<td>` + value.summary + `</td>-->
<td>` + status_label(value.task_status, value.is_cancelled) + `</td>
<td class="text-center">` + value.total_certificates + `</td>
<td class="text-center">` + value.total_sors + `</td>
<td>` + ajs.format_datetime(value.add_date) + `</td>

<!--<td><a class="list_delete" data-callback="refresh_job_tasks" data-type="job-task" data-id="` + value.id + `" data-action="delete" class="remove-item-btn" data-bs-toggle="modal" href="#deleteModal">
<i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i></a></td>-->
</tr>`;
            var created_by_name = value.created_by_name;
            var task_type = 'External';
            var skill_name = setDefValue(value.skill_name);
            if (value.added_by == 0) {
                created_by_name = 'System';
            }

            if (value.task_type == 'I' || value.user_type == 'R') {
                task_type = 'Internal';
                skill_name = setDefValue(value.internal_skill_name);
            }

            var approve_btn = (value.is_cancelled == 0 && value.task_type == 'E') ? `<button data-actions="handleTaskAction(this, '${value.task_status}', 'approve')" class="check_actions btn btn-sm btn-small btn-success m-1 action-task-approve approve-job-task" data-task-id="${value.id}"><i class="ri-check-line align-bottom me-1"></i>Approve</button><br/>` : '';
            var reject_btn = (value.is_cancelled == 0 && value.task_type == 'E') ? `<button data-actions="handleTaskAction(this, '${value.task_status}', 'reject')" class="check_actions btn btn-sm btn-small btn-danger m-1 action-task-reject reject-job-task" data-task-id="${value.id}"><i class="ri-close-line align-bottom me-1"></i>Reject</button><br/>` : '';

            var pending_statuses = ['start task', 'pending', 'on route', 'arrived'];
            var json_task = JSON.stringify(value);
            var reassign_btn = (value.is_cancelled == 0 && value.task_type == 'E' && pending_statuses.includes(value.task_status.toLowerCase())) ? `<button data-heading="Reassign Task" data-after-load-func="reassign_task_form" data-form-url="${cdn_url}job/reassign-task/${value.id}/${value.engineer_id}"  class="popup-form-button-task btn btn-sm  btn-small btn-danger m-1 check-permission" id="re-assign-${value.id}" data-element="re-assign-${value.id}" data-task-id="${value.id}" data-engr-id="${value.engineer_id}" data-pref-time-range="${value.preferred_time_range}" data-pref-date="${value.preferred_date}" data-pref-time="${value.preferred_time}" data-appt-date="${value.appointment_date}" data-appt-time="${value.appointment_time}" data-appt-confirm="${value.is_appointment_confirm}"  data-module="Jobs" data-action="edit"><i class="ri-task-line align-bottom me-1"></i>Force Reassign</button>` : '';
            //var reassign_btn = (value.is_cancelled == 0 && value.task_type == 'E' && pending_statuses.includes(value.task_status.toLowerCase())) ? `<button  class="btn btn-sm btn-small btn-danger m-1 check-permission force-reassign-btn" data-task-id="${value.id}" data-engr-id="${value.engineer_id}" data-module="Jobs" data-action="edit"><i class="ri-task-line align-bottom me-1"></i>Force Reassign</button>` : '';

            var letter_btn = (value.task_name.toLowerCase().includes('letter')) ? `<a target="_BLANK" type="button" class="btn btn-sm btn-small btn-success m-1 pt-1" href="${s3_url + '/' + value.letter_pdf}" ><i class="ri-file-download-line align-bottom me-1"></i>Letter PDF</a><br/>` : '';

            var reviewed_comments = '';
            if (value.task_status.toLowerCase() == 'approved') {
                reviewed_comments = `<p class="mb-1">Approved Comments: ` + setDefValue(value.approval_comments) + `</p>`;
            } else if (value.task_status.toLowerCase() == 'rejected') {
                reviewed_comments = `<p class="mb-1">Rejected Comments: ` + setDefValue(value.rejection_comments) + `</p>`;
            }

            var thre_comments = '';
            if (value.thresold_comments != null) {
                thre_comments = `<p class="mb-1">Threshold Comments: ` + setDefValue(value.thresold_comments) + `</p>`;
            }
            var no_access_reason = '';
            if (value.reason != null) {
                let label = value?.user_type == 'E' ? 'Access' : 'Appointment';
                no_access_reason = `<p class="mb-1">No ${label} Reason: ` + setDefValue(value.reason) + `</p>`;
            }

            var cancellation_reason = '';
            if (value.is_cancelled == 1) {
                cancellation_reason += `<p class="mb-1">Cancelled On: ` + ajs.format_datetime(value.cancelled_date) + `</p>`;
                cancellation_reason += `<p class="mb-1">Cancelled By: ` + setDefValue(value.cancelled_by_name) + `</p>`;
                cancellation_reason += `<p class="mb-1">Cancellation Reason: ` + setDefValue(value.cancellation_reason) + `</p>`;
            }

            var action_btn = (job_fin_status != 2) ? `<div class="col-md-4 col-xxl-4 col-xl-4 text-end">
    <button data-actions="handleTaskAction(this, '${value.task_status}', 'comment')" class="check_actions btn btn-sm btn-small btn-primary m-1 comment-job-task action-task-comment" data-task-id="${value.id}" data-comments="${value.manager_comments}"><i class="ri-add-line align-bottom me-1"></i>Comment</button><br/>
    ${approve_btn}
    ${reject_btn}
    ${letter_btn}
    ${reassign_btn}
</div>` : '';

            rows_html += `<tr style="display:none; background-color:#f3f6f9" class="task-details-row">
    <td colspan="11">
        <div class="row p-1">
            <div class="col-md-12 col-xxl-12 col-xl-12">
                <p class="mb-1">Description:  ` + setDefValue(value.task_description) + `</p>
            </div>
            <div class="col-md-4 col-xxl-4 col-xl-4 mb-1">

                <p class="mb-1">Skill:  ` + skill_name + `</p>
                <p class="mb-1">Task Type:  ` + task_type + `</p>
                <p class="mb-1">Created By: ` + created_by_name + `</p>
                <p class="mb-1">Engineer Comments: ` + setDefValue(value.engineer_comments) + `</p>
                <p class="mb-1">Other Observations: ` + setDefValue(value.other_observations) + `</p>
                ${thre_comments}
                ${no_access_reason}
                ${cancellation_reason}
            </div>
            <div class="col-md-4 col-xxl-4 col-xl-4 mb-1">
                <p class="mb-1">Created On: ` + ajs.format_datetime(value.add_date) + `</p>
                <p class="mb-1">Assigned On: ` + ajs.format_datetime(value.assigned_date) + `</p>
                <p class="mb-1">Sent to PDA: ` + ajs.format_datetime(value.sent_to_pda_date) + `</p>
                <p class="mb-1">Comments: ` + setDefValue(value.manager_comments) + `</p>
                ${reviewed_comments}
            </div>
            <!--<div class="col-md-2 col-xxl-2 col-xl-2 text-end">
                <a class="btn btn-primary m-1">Send Letter</a><br/>
            </div>-->
            ${action_btn}
    </td>
</tr>`;
            return rows_html;
        }

        // Render each top-level task, immediately followed by its sub-tasks so
        // toggleTaskDetails() still finds each summary row's details row as its
        // next sibling.
        $.each(top_level_tasks, function (key, value) {
            task_table_html += build_task_rows(value, false);
            var kids = children_by_parent[value.id] || [];
            $.each(kids, function (ck, cv) {
                task_table_html += build_task_rows(cv, true, value.task_code);
            });
        });

        task_table_html += '</tbody></table>';

    }

    $('.job-task-div').html(task_table_html);
    // Applied here rather than at each of the three call sites: the task rows carry
    // check-permission gates (Copy Task) and are rebuilt from scratch on every render.
    ajs.apply_permissions();
    initValidations();

    // LBH: only ONE active top-level task per job. Gate the "Add Task" button
    // when such a task already exists (mirrors the backend rule; the backend
    // stays authoritative). A second parallel task must be a sub-task instead.
    // Terminal status codes free the slot: TASK_COMPLETE / CANCELLED / APPROVED
    // / REJECTED. Applied after apply_permissions() so it is not overridden.
    var $add_task_btn = $('.create-task-btn');
    if ($add_task_btn.length && Array.isArray(job_tasks)) {
        var terminal_codes = ['TASK_COMPLETE', 'CANCELLED', 'APPROVED', 'REJECTED'];
        var lbh_active = job_tasks.some(function (t) {
            return t.client_code === 'LBH'
                && t.is_sub_task != 1
                && (!t.parent_job_task_id || t.parent_job_task_id == 0)
                && t.is_cancelled == 0
                && terminal_codes.indexOf(String(t.task_status_code || '').toUpperCase()) === -1;
        });
        if (lbh_active) {
            $add_task_btn.prop('disabled', true).addClass('disabled')
                .attr('title', 'This LBH job already has an active task. Complete, approve, reject or cancel it - or use "Add Sub-Task" - before adding a new task.');
        } else {
            $add_task_btn.prop('disabled', false).removeClass('disabled').attr('title', '');
        }
    }
}

function toggleTaskDetails(button) {
    const detailsRow = button.parentElement.parentElement.parentElement.nextElementSibling;
    if (detailsRow.style.display === "table-row") {
        // button.classList.remove('btn-danger');
        // button.classList.add('btn-primary');
        detailsRow.style.display = "none"; // Hide details
        button.innerHTML = `<i class="ri-arrow-down-s-line align-bottom" aria-hidden="true"></i>`;
    } else {
        // button.classList.add('btn-danger');
        // button.classList.remove('btn-primary');
        detailsRow.style.display = "table-row"; // Show details
        button.innerHTML = `<i class="ri-arrow-up-s-line align-bottom" aria-hidden="true"></i>`;
    }
}

// LBH sub-task: clone the active, appointment-bearing task for a 2nd engineer /
// different SOR on the SAME appointment. AJS-internal only - nothing is sent to
// Havering (the appointment already exists there). The backend re-validates LBH
// + appointment set; this is the confirm + POST + refresh.
function add_task_subtask(task_id, task_code) {
    // A sub-task is a 2nd engineer doing a DIFFERENT SOR on the SAME appointment.
    // Collect the engineer + SOR in the pop-up; the parent's appointment is kept
    // and nothing is sent to Havering.
    Swal.fire({
        title: 'Add Sub-Task',
        html:
            '<p class="text-muted" style="font-size:13px;">Adds a second engineer on the same appointment as task #' + (task_code || task_id) + ', for a different SOR. No new appointment is scheduled and nothing is sent to Havering.</p>' +
            '<div class="text-start mb-2">' +
            '  <label class="form-label" style="font-weight:600;">Engineer <span class="text-danger">*</span></label>' +
            '  <select id="subtask_engineer_id" class="form-control" style="width:100%"><option value="">Select engineer</option></select>' +
            '</div>' +
            '<div class="text-start">' +
            '  <label class="form-label" style="font-weight:600;">SOR <span class="text-danger">*</span></label>' +
            '  <select id="subtask_sor_id" class="form-control" style="width:100%"><option value="">Select SOR</option></select>' +
            '</div>',
        showCancelButton: true,
        confirmButtonText: 'Add sub-task',
        cancelButtonText: 'Cancel',
        customClass: { confirmButton: 'btn btn-success me-2', cancelButton: 'btn btn-light' },
        buttonsStyling: false,
        didOpen: function () {
            // select2_ajax builds its dropdownParent as '#' + parent, so it needs a
            // string id. Give the Swal container (full-viewport, so the dropdown is
            // never clipped) an id and pass that.
            var container = Swal.getPopup().parentElement; // .swal2-container
            if (container && !container.id) { container.id = 'subtask_swal_container'; }
            var parentId = (container && container.id) ? container.id : 'body';
            // Engineers (user_type 16) and the job's contract SORs.
            select2_ajax_users('#subtask_engineer_id', { user_type: 16 }, parentId);
            select2_ajax('#subtask_sor_id', site_url + 'contract_sor/get/' + job_contract_id, 'title', null, parentId, null);
        },
        preConfirm: function () {
            var eng = $('#subtask_engineer_id').val();
            var sor = $('#subtask_sor_id').val();
            if (!eng) { Swal.showValidationMessage('Please choose an engineer.'); return false; }
            if (!sor) { Swal.showValidationMessage('Please choose a SOR.'); return false; }
            return { engineer_id: eng, sor_id: sor };
        },
    }).then(function (r) {
        if (!r.isConfirmed || !r.value) return;
        var payload = {
            engineer_id: r.value.engineer_id,
            task_sors: [
                { sor_id: r.value.sor_id, quantity: 1, pricing_model: 1, is_chargeable: 1 }
            ],
        };
        ajs.ajax_form(site_url + "job-task/add-subtask/" + task_id, payload, "POST", null, "1", "1", function (result_json) {
            if (result_json && result_json.status) {
                setTimeout(function () { refresh_job_tasks(); }, 100);
            }
        });
    });
    return false;
}


function get_sor_table(job_sors) {
    var sor_table_html = '';
    if (typeof job_sors !== 'undefined' && Array.isArray(job_sors)) {
        sor_table_html = `<table class="table align-middle table-nowrap mb-0" id="tasksTable">
                                                            <thead class="table-light text-muted">
                                                                <tr>
                                                                    <th>Task #</th>
                                                                    <th>SOR #</th>
                                                                    <th>Description</th>
                                                                    <th class="text-center">Material (£)</th>
                                                                    <th class="text-center">Labor (£)</th>
                                                                    <th class="text-center">Overhead (£)</th>
                                                                    <th class="text-center">Overhead (%)</th>
                                                                    <th class="text-center">Sell (£)</th>
                                                                    <th class="text-center">Qty.</th>
                                                                    <th class="text-center">Margin (%)</th>
                                                                    <th class="text-center">Certs.</th>
                                                                    <th class="text-center">Pics.</th>
                                                                    <th class="text-center">Chargeable</th>
                                                                    <th class="text-center">Payable</th>
                                                                    <th class="text-center">CTP</th>
                                                                    <th class="text-center">Ok</th>
                                                                    <th>Added By</th>
                                                                    <th>Created On</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody class="form-check-all">`;

        $.each(job_sors, function (key, value) {
            if (value.added_by_name == null) {
                value.added_by_name = 'N/A';
            }
            if (value.task_code == null) {
                value.task_code = '-';
            }

            // console.log(value);

            const is_chargeable = value.is_chargeable == 1 ? ['Yes', 'success'] : ['No', 'danger'];
            const is_payable = value.is_payable == 1 ? ['Yes', 'success'] : ['No', 'danger'];
            // const is_ctp = value.is_ctp == 1 ? ['Yes','success'] : ['No','danger'];
            var is_ctp = value.is_ctp == 1 ? 'checked' : '';

            const chargeable_comments = !isEmpty(value.chargeable_comments)
                ? `<span class="tooltip-container">
                    <i class="ri-message-2-line fs-16 ms-2 show-comment cursor-pointer" 
                       data-message="${value.chargeable_comments}"></i>
                   </span>`
                : '';

            const payable_comments = !isEmpty(value.payable_comments)
                ? `<span class="tooltip-container">
                    <i class="ri-message-2-line fs-16 ms-2 show-comment cursor-pointer" 
                       data-message="${value.payable_comments}"></i>
                   </span>`
                : '';
            // var sorStatus = handleSorAction(null, taskStatus, value.sor_completion_status);
            // var isDisabled = sorStatus && value.is_payable == 1 && ajs.check_role('SORs', 'edit') ? "" : "disabled";  
            const ctp_btn = (value.is_task_cancelled == 0) ? `<div class="form-check form-switch">
                                            <input class="form-check-input action-update-ctp" type="checkbox" data-task-sor="${value.task_sor_id}" role="switch" id="updateCTP" ${is_ctp} />
                                        </div>` : '-';
            sor_table_html += `<tr>
                                    <td>` + value.task_code + `</td>
                                    <td>` + value.sor_code + `</td>
                                    <td>` + setDefValue(value.approval_description) + `</td>
                                    <td class="text-end">` + value.material_price + `</td>
                                    <td class="text-end">` + value.labor_price + `</td>
                                    <td class="text-end">${value.overhead_price || '0'}</td>
                                    <td class="text-end">${value.overhead_percentage || '0'}</td>
                                     <td class="text-end">` + value.sell_price + `</td>
                                    <td class="text-center">${value.quantity || 0}</td>                                   
                                    <td class="text-end">${value.margin.toFixed(2) || '-'}</td>
                                    <td class="text-center">${value.total_certs || 0}</td>
                                    <td class="text-center">${value.total_pics || 0}</td> 
                                    <td class="text-center">
                                        <div class="form-check form-switch text-center">
                                            <span data-bs-toggle="tooltip" data-bs-placement="top" title="${chargeable_comments}" class="badge border border-${is_chargeable[1]} text-${is_chargeable[1]}">${is_chargeable[0]}</span>
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        <div class="form-check form-switch text-center">
                                            <span data-bs-toggle="tooltip" data-bs-placement="top" title="${payable_comments}" class="badge border border-${is_payable[1]} text-${is_payable[1]}">${is_payable[0]}</span>
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        ${ctp_btn}
                                    </td>
                                    <td class="text-center"><i class="mdi mdi-circle fs-11 align-middle me-1 blinkd" style="color:green"></i></td>
                                    <td>` + value.added_by_name + `</td>
                                    <td>` + ajs.format_datetime(value.add_date) + `</td>
                                </tr>`;
        });

        sor_table_html += '</tbody></table>';

    }
    //console.log(sor_table_html);
    $('.job-sors-div').html(sor_table_html);
}


function get_financial_table(job_financial) {
    var financial_table_html = '';
    var total_labor = 0;
    var total_material = 0;
    var total_sell = 0;
    var total_material_labor = 0;
    var total_sell_qty = 0;
    var total_overhead = 0;
    var overhead_count = 0;
    if (typeof job_financial !== 'undefined' && Array.isArray(job_financial)) {
        financial_table_html = `<table class="table align-middle table-nowrap mb-0" id="tasksTable">
                                                            <thead class="table-light text-muted">
                                                                <tr>
                                                                    <th>Task #</th>
                                                                    <th>SOR #</th>                                                                    
                                                                    <th class="text-center">Material (£)</th>
                                                                    <th class="text-center">Labor (£)</th>                                                                    
                                                                    <th class="text-center">Sell (£)</th>
                                                                    <th class="text-center">Qty.</th>
                                                                    <th class="text-center">Total Cost (£)</th>
                                                                    <th class="text-center">Total Sell (£)</th>
                                                                    <th class="text-center">Margin (%)</th>
                                                                    <th class="text-center">Certs.</th>
                                                                    <th class="text-center">Pics.</th>
                                                                    <th class="text-center">Chargeable</th>
                                                                    <th class="text-center">Payable</th>
                                                                    <th class="text-center">Ok</th>
                                                                    <th>Added By</th>
                                                                    <th>Created On</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody class="form-check-all">`;

        $.each(job_financial, function (key, value) {
            // console.log(value)

            if (value.added_by_name == null) {
                value.added_by_name = 'N/A';
            }
            if (value.task_code == null || value.task_code == '' || value.task_code == undefined) {
                value.task_code = '-';
            }
            if (value.sor_code == null || value.sor_code == '' || value.sor_code == undefined) {
                value.sor_code = '-';
            }
            if (value.material_price == null || value.material_price == '' || value.material_price == undefined) {
                value.material_price = 0;
            }
            if (value.quantity == null || value.quantity == '' || value.quantity == undefined) {
                value.quantity = 0;
            }
            if (value.labor_price == null || value.labor_price == '' || value.labor_price == undefined) {
                value.labor_price = 0;
                value.overhead_percentage = 0;
            } else if (value.labor_price > 0) {
                value.overhead_percentage = value.actual_labor_price * (value.overhead_percentage / 100);
            }

            if (value.sell_price == null || value.sell_price == '' || value.sell_price == undefined) {
                value.sell_price = 0;
            }
            if (value.margin == null || value.margin == '' || value.margin == undefined) {
                value.margin = 0;
            } else {
                value.margin = value.margin.toFixed(2);
            }
            value.total_material_labor = ((value.material_price + value.labor_price) * value.quantity).toFixed(2);
            value.total_sell_qty = (value.sell_price * value.quantity).toFixed(2);
            //console.log(value);
            var is_chargeable = '';
            var is_chargeable_html = '';
            if (value.is_chargeable == null || value.is_chargeable == '' || value.is_chargeable == undefined) {
                chargeable_html = '-';
            } else {
                is_chargeable = value.is_chargeable == 1 ? ['Yes', 'success'] : ['No', 'danger'];
                const chargeable_comments = !isEmpty(value.chargeable_comments)
                    ? `<span class="tooltip-container">
                    <i class="ri-message-2-line fs-16 ms-2 show-comment cursor-pointer" 
                       data-message="${value.chargeable_comments}"></i>
                   </span>`
                    : '';
                is_chargeable_html = `<div class="form-check form-switch text-center"> <span data-bs-toggle="tooltip" data-bs-placement="top" title="${chargeable_comments}" class="badge border border-${is_chargeable[1]} text-${is_chargeable[1]}">${is_chargeable[0]}</span></div>`;
            }

            var is_payable = '';
            var is_payable_html = '';
            if (value.is_payable == null || value.is_payable == '' || value.is_payable == undefined) {
                is_payable = '-';
                is_payable_html = '-';
            } else {
                is_payable = value.is_payable == 1 ? ['Yes', 'success'] : ['No', 'danger'];
                const payable_comments = !isEmpty(value.payable_comments)
                    ? `<span class="tooltip-container">
                    <i class="ri-message-2-line fs-16 ms-2 show-comment cursor-pointer" 
                       data-message="${value.payable_comments}"></i>
                   </span>`
                    : '';
                is_payable_html = `<div class="form-check form-switch text-center"><span data-bs-toggle="tooltip" data-bs-placement="top" title="${payable_comments}" class="badge border border-${is_payable[1]} text-${is_payable[1]}">${is_payable[0]}</span> </div>`;
            }




            // var sorStatus = handleSorAction(null, taskStatus, value.sor_completion_status);
            // var isDisabled = sorStatus && value.is_payable == 1 && ajs.check_role('SORs', 'edit') ? "" : "disabled";  

            financial_table_html += `<tr>
                                    <td>` + value.task_code + `</td>
                                    <td>` + value.sor_code + `</td>
                                    <td class="text-end">` + value.material_price.toFixed(2) + `</td>
                                    <td class="text-end">` + value.labor_price.toFixed(2) + `</td>
                                    <td class="text-end">` + value.sell_price.toFixed(2) + `</td>
                                    <td class="text-center">${value.quantity || 0}</td>
                                    <td class="text-end">` + value.total_material_labor + `</td>
                                    <td class="text-end">` + value.total_sell_qty + `</td>
                                    <td class="text-end">${value.margin}</td>
                                    <td class="text-center">${value.total_certs || 0}</td>
                                    <td class="text-center">${value.total_pics || 0}</td> 
                                    <td class="text-center">${is_chargeable_html}</td>
                                    <td class="text-center">${is_payable_html}</td>
                                    <td class="text-center"><i class="mdi mdi-circle fs-11 align-middle me-1 blinkd" style="color:green"></i></td>
                                    <td>` + (value.added_by_name || 'N/A') + `</td>
                                    <td>` + ajs.format_datetime(value.add_date) + `</td>
                                </tr>`;


            total_labor += parseFloat(value.labor_price) || 0;
            total_material += parseFloat(value.material_price) || 0;
            total_sell += parseFloat(value.sell_price) || 0;
            total_material_labor += parseFloat(value.total_material_labor) || 0;
            total_sell_qty += parseFloat(value.total_sell_qty) || 0;

            // if (!isNaN(parseFloat(value.overhead_percentage))) {
            //     total_overhead += parseFloat(value.overhead_percentage);
            //     overhead_count++;
            // }

        });
        //var avg_overhead = overhead_count > 0 ? (total_overhead / overhead_count).toFixed(2) : '-';
        financial_table_html += `<tr class="fw-bold bg-light">
                            <td> </td>
                            <td class="text-end">Total</td>
                            <td class="text-end">${total_material.toFixed(2)}</td>
                            <td class="text-end">${total_labor.toFixed(2)}</td>                                
                            <td class="text-end"> ${total_sell.toFixed(2)}</td>
                            <td class="text-end"></td>
                            <td class="text-end">${total_material_labor.toFixed(2)}</td>  
                            <td class="text-end">${total_sell_qty.toFixed(2)}</td>
                            <td colspan="8"></td>
                         </tr>`;
        financial_table_html += '</tbody></table>';

    }
    // console.log(financial_table_html);
    $('.financial-sors-div').html(financial_table_html);
}

function get_certificate_table(certificates) {
    var certificate_table_html = '';
    if (typeof certificates !== 'undefined' && Array.isArray(certificates)) {
        certificate_table_html = `<table class="table align-middle table-nowrap mb-0" id="tasksTable">
                                        <thead class="table-light text-muted">
                                            <tr>
                                                <th>Action</th>
                                                <th>Task#</th>
                                                <th>Code</th>
                                                <th>Title</th>
                                                <th>Required</th>
                                                <th>Assigned To</th>
                                                <th>Status</th>
                                                <th>Added By</th>                                                                    
                                                <th>Created On</th>
                                            </tr>
                                        </thead>
                                        <tbody class="form-check-all">`;

        $.each(certificates, function (key, value) {
            var required = 'No';
            var assigned_to_name = '-';
            var certificate_url = '-';
            var edit_url = '-';
            var status_label1 = cert_status_label(value.status);
            if (value.task_code == null) {
                value.task_code = '-';
            }
            if (value.is_required == '1') {
                required = 'Yes';
            }
            if (value.assigned_to_name != null) {
                assigned_to_name = value.assigned_to_name;
            }
            // if (value.status == '1')
            // {
            //     // status_label1 = cert_status_label(1);
            //     edit_url = `<a href="` + cdn_url + `job/edit-certificate/` + value.task_id + `/` + value.id + `" target="_BLANK">Edit</a>`;
            // }
            // var actionbtns = (value.status == "0" || value.status == '1') ? true : false;
            // if (value.pdf_url != '' && value.pdf_url != null) {
            //         certificate_url = `<a href="javascript:void(0)" onclick="actionCertificates(this,${value.task_id},${value.id}, ${actionbtns})" data-url=` + value.pdf_url + `>View</a>`;
            //     }
            if (value.status == '1' && value.is_task_cancelled == 0) {
                edit_url = `<a class="check_actions check-permission" href="${cdn_url}job/edit-certificate/${value.task_id}/${value.id}" target="_BLANK" data-module="Certificates" data-action="edit">${edit_icon()}</a>`;
            }
            var actionbtns = (value.status == 1) ? true : false;
            certificate_url = (value.pdf_url && value.pdf_url != null) ? `<a class="check_actions check-permission" href="javascript:void(0)" onclick="actionCertificates(this, ${value.task_id}, ${value.id}, ${actionbtns})" data-url="${value.pdf_url}" data-module="Certificates" data-action="view"><i title="View" class="fa fa-file-pdf-o align-bottom me-2 primary-btn fs-15"></i></a>` : '';
            certificate_table_html += `<tr>
                    <td>` + certificate_url + ` ${edit_url}</td>   
                    <td>` + value.task_code + `</td>
                    <td>` + value.certificate_code + `</td>
                    <td>` + value.title + `</td>
                    <td>` + required + `</td>
                    <td>` + assigned_to_name + `</td>
                    <td>` + status_label1 + `</td> 
                    <td>` + (value.added_by_name || 'N/A') + `</td>
                    <td>` + ajs.format_datetime(value.add_date) + `</td>
                </tr>`;
        });

        certificate_table_html += '</tbody></table>';

    }

    $('.job-certificate-div').html(certificate_table_html);
}


function get_media_table(medias) {
    var media_table_html = '';
    if (typeof medias !== 'undefined' && Array.isArray(medias)) {
        media_table_html = `<table class="table align-middle table-nowrap mb-0" id="tasksTable">
                                    <thead class="table-light text-muted">
                                        <tr>
                                            <th>Task #</th>
                                            <th>SOR #</th>
                                            <th>File</th>
                                            <th>Caption</th>
                                            <th>Added By</th>                                                                    
                                            <th>Uploaded On</th>
                                        </tr>
                                    </thead>
                                    <tbody class="form-check-all">`;



        // One physical file is legitimately recorded more than once - against the task, and
        // again against the job event it belongs to - so the tab listed every engineer photo
        // twice. Show each file once, keeping the row that names a task, since "which task was
        // this from" is the useful column and the event copy leaves it blank.
        var seen = {};
        var unique_medias = [];
        $.each(medias, function (key, value) {
            var file_key = (value.name || value.file_path || '').split('/').pop();
            if (!file_key) {
                unique_medias.push(value);
                return;
            }
            var at = seen[file_key];
            if (at === undefined) {
                seen[file_key] = unique_medias.length;
                unique_medias.push(value);
            } else if (isEmpty(unique_medias[at].task_code) && !isEmpty(value.task_code)) {
                unique_medias[at] = value;
            }
        });
        medias = unique_medias;

        $.each(medias, function (key, value) {
            var file_type = '-';
            var preview = 'View/Download';
            var preview_link = '';
            if (value.file_type != null) {
                file_type = value.file_type;
                preview_link = `<a href="` + value.file_path + `" target="_BLANK">` + preview + `</a>`;
            }
            if (file_type == 'image') {
                preview_link = `<img style="width:120px; cursor:pointer" data-bs-toggle="modal" data-bs-target="#imagePreviewModal" src="` + value.file_path + `">`;
            } else if (file_type == 'video') {
                preview_link = `<video width="180" controls preload="metadata">
                                <source src="${value.file_path}" type="video/mp4">
                            </video>`;
            }
            var caption = !isEmpty(value.caption) ? setDefValue(value.caption) : format_string(value.upload_type);
            media_table_html += `<tr>
                                        <td>` + setDefValue(value.task_code) + `</td>
                                        <td>` + setDefValue(value.sor_code) + `</td>
                                        <td>` + preview_link + `</td>
                                        <td>` + caption + `</td>
                                        <td>` + (value.added_by_name || 'N/A') + `</td>
                                        <td>` + ajs.format_datetime(value.add_date) + `</td>
                                    </tr>`;
        });

        media_table_html += '</tbody></table>';

    }

    $('.job-media-div').html(media_table_html);
}


function copy_task(task_id, task_code) {
     Swal.fire({
        title: "Copy Task",
        text: 'Are you sure you want to copy task #' + task_code + '? A new task will be created with the same details.',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        denyButtonText: "Cancel"    
    }).then((result) => {
        if (result.isConfirmed) {
            // Show loader so the user knows the copy is in progress
            ajs.show_loader();
            ajs.ajax_form(
                site_url + 'job-task/copy/' + task_id,
                null,
                'POST',
                null,
                '1',
                '0',
                function (response) {
                    ajs.hide_loader();
                    if (response.status) {
                        Swal.fire({
                            title: 'Task Copied!',
                            text: 'New task #' + response.task_code + ' has been created successfully.',
                            icon: 'success',
                            confirmButtonColor: '#405189',
                        }).then(() => {
                            ajs.refreshDataTable();
                        });
                    } else {
                        Swal.fire('Error', response.message || 'Failed to copy task', 'error');
                    }
                },
                function (response) {
                    ajs.hide_loader();
                    Swal.fire('Error', response.message || 'Failed to copy task', 'error');
                }
            );
        }
    });
}

function get_event_table(events, financial_status = 0) {
    var event_table_html = '';
    if (typeof events !== 'undefined' && Array.isArray(events)) {
        event_table_html = `<table class="table align-middle table-nowrap mb-0" id="tasksTable">
                                                            <thead class="table-light text-muted">
                                                                <tr>
                                                                    <th>Action</th>
                                                                    <th>#</th>
                                                                    <th>Task #</th>
                                                                    <th>Log Type</th>
                                                                    <th>Added By</th>                                                                    
                                                                    <th>Log Date</th>
                                                                    <th>Comments</th>                                                                   
                                                                                                                                       
                                                                </tr>
                                                            </thead>
                                                            <tbody class="form-check-all">`;

        var k = 1;

        $.each(events, function (key, value) {


            var event_comments = '';
            if (value.comments != null) {
                event_comments = value.comments;
            }

            var action = '-';
            if (value.event_reference != null && value.action_name == 'EMAIL_SCHEDULED' && financial_status != 2) {
                action = `<a  class="popup-form-button ms-1" data-after-load-func="edit_email_sms" data-form-url="` + cdn_url + `job/send-email-sms/${value.job_id}?event_id=${value.id}" data-heading="Send Email/SMS" >
                                                                    ` + edit_icon() + `
                                                                    </a>`;
            }
            var value_action_name = format_string(value.action_name);
            if(value.action_name == 'TASK_STATUS_UPDATED') {
                value_action_name = format_string(value.action_name) + ' (' + format_string(value.post_data) + ')';
            }
            event_table_html += `<tr><td>${action}</td>
                                    <td>` + k + `</td>
                                    <td>` + setDefValue(value.task_code) + `</td>
                                    <td>` + value_action_name + `</td>
                                    <td>` + setDefValue(value.added_by_name) + `</td>
                                    <td>` + ajs.format_datetime(value.add_date) + `</td>
                                    <td>` + event_comments + `</td>
                                    
                                </tr>`;
            k++;
        });

        event_table_html += '</tbody></table>';

    }

    $('.job-event-div').html(event_table_html);
}

function create_job_quote_form(quote_id) {
    $(document).ready(function () {
        if ($('.new-job-btn').length) {
            $('.new-job-btn').trigger('click');
        }
    });
}

var urlParam = new URLSearchParams(window.location.search);
if (urlParam.get('in_quote') == 1) {
    var quote_id = urlParam.get('quote_id');
    create_job_quote_form(quote_id);
}

if (typeof initValidations !== "function") {
    function initValidations() {
        $(".check_actions").each(function () {
            var action = $(this).data("actions");
            eval(action);
        });
    }
}
$(document).on("click", "#generate_job_invoice", function (e) {
    var id = $(this).data('job_id');

    ajs.ajax_form(site_url + "job/get_job_task_sors/" + id, null, "GET", null, "1", "1", function (data) {

        // console.log(data);
        if (data.status == false) {
            Swal.fire({
                title: `Error!!`,
                icon: "error",
                text: data.message
            });
            return false;
        } else {
            window.location.href = cdn_url + "invoices/list?job_id=" + id;
        }
    });
});

$(document).on("click", ".copy_job_btn",async function (e) {
    e.preventDefault();
    var id = $(this).data('job_id');
    var old_job_code = $(this).data('job_code');
    ajs.show_loader();
    await new Promise(r => setTimeout(r, 100));

    var header = `Copy of Job #${old_job_code}`;

    ajs.showOffCanvasFormRight(cdn_url + "job/copy/" + id + "?in_popup=1", header, null, true);
    create_job_form("edit", true);        
    ajs.ajax_form(site_url + "job/get/" + id + "?edit=true", null, "GET", null, "0", "0", set_data_for_copy, set_data_for_copy);
    ajs.hide_loader();
});

$('#callBtn').on('click', function() {
    
    let mobile = $(this).data('mobile_num');
    let telephone = $(this).data('telephone_num');
    let job_id = $(this).data('job_id');

    if (mobile && telephone) {
        // Ask user to choose
        Swal.fire({
            title: 'Choose number to call',
            text: 'Select which number you want to dial',
            showDenyButton: true,
            confirmButtonText: `📱 Mobile (${mobile})`,
            denyButtonText: `☎️ Telephone (${telephone})`,
            buttonsStyling: false, // Disable default SweetAlert styling
            customClass: {
                confirmButton: 'btn btn-success mx-2',  // green button
                denyButton: 'btn btn-primary mx-2',     // blue button
            }
        }).then((result) => {
            if (result.isConfirmed) {
                makeDialpadCall(mobile, job_id);
            } else if (result.isDenied) {
                makeDialpadCall(telephone, job_id);
            }
        });
    } else {
        // If only one number available, just dial it
        let number = mobile || telephone;
        if (number) {
            makeDialpadCall(number, job_id);
        } else {
            Swal.fire('No number available', '', 'error');
        }
    }
});

function makeDialpadCall(number, job_id) {
    console.log(" job_id:", job_id);
    var user_data = localStorage.getItem('user_profile');
    user_data = JSON.parse(user_data);
    var user_id = user_data['id'];
    var dialpad_user_id = user_data['dialpad_user_id'];

    function postCall(dialpadUserId) {
        ajs.show_loader();
        $.post({
            url: site_url + "calls/make_call",
            data: { to: number, dialpad_user_id: dialpadUserId, job_id: job_id },
            dataType: "json",
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            success: function (res) {
                if (res.status == true) {
                    Swal.fire({
                        title: `Success!!`,
                        icon: "success",
                        text: res.message
                    }).then(function () {
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        title: `Call failed`,
                        icon: "error",
                        text: res.message || 'The call could not be started. Please try again.'
                    });
                }
            },
            error: function (xhr) {
                console.error("AJAX error:", xhr.status, xhr.responseText);
                var msg = 'The call could not be started. Please try again.';
                if (xhr.status === 401) {
                    msg = 'Your session has expired. Please sign in again.';
                } else if (xhr.responseJSON && xhr.responseJSON.message) {
                    msg = xhr.responseJSON.message;
                } else if (xhr.status === 404) {
                    msg = 'The calling service is unavailable. Please contact your administrator.';
                } else if (xhr.status >= 500) {
                    msg = 'Something went wrong on the server. Please try again in a moment.';
                }
                Swal.fire({ title: 'Call failed', icon: 'error', text: msg });
            },
            complete: function () {
                ajs.hide_loader();
            }
        });
    }

    if (dialpad_user_id == null || dialpad_user_id == '') {
        ajs.ajax_form(site_url + "users/sync_dialpad_user/" + user_id, null, "GET", null, "1", "1", function (response) {
            if (response.status == true && response.data.dialpad_user_id != null && response.data.dialpad_user_id != '') {
                postCall(response.data.dialpad_user_id);
            } else {
                Swal.fire('You can not make a call because you do not have a dialpad user id.', '', 'error');
                return false;
            }
        });
    } else {
        postCall(dialpad_user_id);
    }
}

$("#importForm button[type=submit]").on("click", function (e) {
    clickedButton = $(this);
});

$('#importForm').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var redirect_url = '';
    if (clickedButton.hasClass("import_jobs")) {
        redirect_url = site_url + "job/job_import";
    } else if (clickedButton.hasClass("import_jobtasks")) {
        redirect_url = site_url + "job/jobtask_import";
    }
    // console.log(clickedButton);
    $.ajax({
        url: redirect_url,   // CI3 Controller route
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: function (xhr, settings) {
            ajs.set_auth_header(xhr, settings);
            $('#response').html('<p>Uploading & Importing... Please wait</p>');
        },
        success: function (res) {
            $('#response').html(res);
        },
        error: function () {
            $('#response').html('<p style="color:red;">Error importing file.</p>');
        }
    });
});

$(document).on("click", "#job-back-btn", function (e) {
    e.preventDefault();
    if (window.history.length > 1 && document.referrer) {
        window.history.back();
    } else {
        window.location.href = (typeof site_url !== 'undefined' ? site_url : '/') + 'job/list';
    }
});