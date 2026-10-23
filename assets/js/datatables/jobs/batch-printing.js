var master_data_type = "batch-printing";
dataTable = null;
var ignore_keys = [];
// The list starts empty: the first draw is flagged so the API returns no rows.
// Records only appear once the user applies a filter and searches.
let is_default_load = 1;
// Tracks whether the grid has actually fetched records yet, so Export knows
// there is something to export.
let has_searched = false;
function load_data_table(limit, search_term, filters) {
    $("input.allselect").prop("checked", false);

    data_filters = {};
    if (is_default_load) {
        data_filters.is_default_load = is_default_load;
    }
    has_searched = !is_default_load;

    // No forced defaults — a blank Communication Type means all of
    // Letter / Email / SMS / Call, and a blank Processed means all.
    var task_code = $('#task_code_filter').val();
    if (task_code) {
        data_filters.task_code = task_code;
    }
    var processed = $('#processed_filters').val();
    if (processed !== '' && processed != null) {
        data_filters.processed = processed;
    }
    var task_status = $('#task_status_filter').val();
    if (task_status) {
        data_filters.status = task_status;
    }

    is_default_load = 0;
    page_limit = ajs.datatable_limit;
    
    search = "";
    if (typeof filters != "undefined" && (typeof filters["filters"] !== "undefined" || filters["filters"] != null))
    {
        data_filters = filters["filters"];
    }
    if (typeof limit !== "undefined" || limit != null) {
        page_limit = limit;
    }
    if (typeof search_term !== "undefined" || search_term != null) {
        search = search_term;
    }
   
    
   
    dataTable = new DataTable("#bulk-task-datatables", {
        scrollY: (screen.height - 495) + 'px',
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
            url: site_url + "job-tasks/bulkprint/list",
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
                ajs.datatable_error(xhr, "bulk-task-datatables");
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
                title: "Id"
            },
            // The `select` column (select-all header checkbox + per-row checkbox) is
            // removed while Perform Batch is hidden. Restore it together with the
            // Perform Batch button in views/tasks/inc/filter-tasks.php.
            {
                name: "letter_pdf",
                data: "letter_pdf",
                searchable: false,
                orderable: false,
                title: "",
                // Reserves width for the absolutely-positioned Show/Hide-columns gear
                // (see the style block in views/tasks/batch-print.php).
                className: "comm-action-col",
                render: function (data, type, row) {
                    if (!row.letter_pdf) {
                        return '';
                    }
                    return `<a href="${s3_url + '/' + row.letter_pdf}" data-heading="Preview" target="_BLANK" class="view-btn"><i title="View" class="ri-eye-line align-bottom me-2 primary-btn cursor-pointer fs-15"></i></a>`;
                }
            },
            {
                name: "task_code",
                data: "task_code",
                title: "Task Id",
                render: function (data, type, row) {
                    var str = "";
                    str +=
                            `<div class="d-flex">
                                <div class="avatar-group ps-0 align-items-center">
                                  <a  href="` + cdn_url + 'job/details/' + ajs.hash_encode(row.job_id) + `" target="_BLANK" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="#` +
                            data +
                            `">` +
                            data +
                            `</a>
                                </div>
                                </div>`;

                    return str;
                },
            },
            {
                name: "task_name",
                data: "task_name",
                title: "Task"
            },
            {
                name: "service_name",
                data: "service_name",
                title: "Job Type"
            },
            {
                name: "client_code",
                data: "client_code",
                title: "Client"
            },
            {
                name: "uprn_no",
                data: "uprn_no",
                title: "Property"
            },
            {
                data: "address1",
                name: "address1",
                title: "Address",
                render: function (data, type, row) {
                    return truncate_string(row.address1, 25);
                }
            },
            {
                data: "postalcode",
                name: "postalcode",
                title: "Postcode"
            },
            {
                data: "total_commu",
                name: "total_commu",
                title: "Total Comm."
            },
            {
                data: "last_commun_date",
                name: "last_commun_date",
                title: "Last Comm. Date"
            },
            // {
            //     data: "tag_name",
            //     name: "tag_name",
            //     render: function (data, type, row) {
            //         return truncate_string(data, 25);
            //     }
            // },
            // {
            //     data: "queue_name",
            //     name: "queue_name",
            //     // render: function (data){
            //     //     return `<b>${data}</b>`;
            //     // }
            // },
            {
                data: "task_status",
                name: "task_status",
                orderable: false,
                title: "Task Status",
                render: function (data) {
                    return data ? data : '-';
                }
            },
            {
                data: "add_date",
                name: "add_date",
                title: "Created",
                render: function (data) {
                    return ajs.format_date(data);
                }
            },
            {
                data: "created_by_name",
                name: "created_by_name",
                orderable: false,
                title: "Created By",
                render: function (data) {
                    // Workflow letters and webhook-logged calls are raised without a
                    // user (added_by 0/NULL), so those read as System rather than "-".
                    return data ? data : '<span class="text-muted">System</span>';
                }
            }
        ],
        order: [["0", "desc"]],
        drawCallback: function () {
            // Export PDF is gated on Communication/export; re-applied per draw because the pass
            // also lifts the pre-paint gate and rows are rebuilt each time.
            ajs.apply_permissions();
        }
    });
    // Reload when the Processed filter changes
    $("#processed_filters").off('change').on("change", function () {
        ajs.refreshDataTable();
    });

    dataTable.buttons().container().appendTo($("#datatable_buttons"));
}

// function set_job_id(job_id)
// {
//     $('#job_id').val(job_id);
// }

if ($("#bulk-task-datatables").length) {
    load_postalcodes();
    add_autocomplete_sel("#client_id_filter", "clients", ["client_code"], null, null);
    add_autocomplete_sel("#property_filter", "client_properties", ["uprn_no"], null, null);
    select2_ajax_users("#engineers_filter", {user_type: 16});
    // No status_for filter: communication tasks are logged with statuses from both
    // sides (e.g. Calls/Email/SMS land on COMPLETE), so the full list must be offered.
    select2_ajax("#task_status_filter", site_url + "task-status/get_all", "title", null);
    $('#job_status_filter').select2({placeholder: 'All Tasks', allowClear: true});
    fetch_default_filter(master_data_type);
    select2_ajax("#queue_filter", site_url + "queue/get_all", "title", null);
    select2_ajax('#tags_filter', site_url + 'tag/get_all', 'title', {module: 'task'});
    var breadcrumbs = [
        {label: 'Communications', url: 'javascript: void(0);'},
        {label: 'List', url: null}
    ];
    set_breadcrumb(breadcrumbs);
}

$('#btn_clear_filters').on('click', function() {
        $('#processed_filters').val('');
        $('#search_term').val('');
        $('#client_id_filter').val('');
        $('#property_filter').val('');
        $('#task_code_filter').val('');
        $('#task_status_filter').val('').trigger('change');

    });

async function load_postalcodes() {

    const response = await ajaxWithRefresh({
        type: 'GET',
        url: site_url + 'api/filter/postals',
    });
    const postaldata = response.data;
    $('#job_postcode_filter').select2({placeholder: 'All Postalcodes', allowClear: true, data: postaldata});
}

$(document).on("change", "#client_id_filter", function () {
    var val = $.trim($(this).val());
    var client_id = null;
    $('#property_filter').select2('destroy').select2({placeholder: 'All Properties'});
    if (val != '' && val != undefined && val != null) {
        client_id = {client_id: val};
    }
    add_autocomplete_sel("#property_filter", "client_properties", ["uprn_no"], null, client_id);
})

function status_label(value) {
    if (value == null) {
        return "-";
    }

    var icon = '';
    if (value == '0') {
        icon = `<span class="badge  border border-indigo text-indigo  text-capitalize">Not-assigned</span>`;
    } else if (value == '1') {
        icon = `<span class="badge  border border-success text-success  text-capitalize">Assigned</span>`;
    }

    return icon;
}


// Select/deselect All 
$(document).on("change", "input.selected_tasks", function () {
    var total = $("input.selected_tasks").length;
    var selected = $("input.selected_tasks:checked").length;
    if (total == selected) {
        $("input.allselect").prop("checked", true);
    } else {
        $("input.allselect").prop("checked", false);
    }
});

$(document).on("change", "input.allselect", function () {
    if ($(this).is(":checked")) {
        $("input.selected_tasks").prop("checked", true);
    } else {
        $("input.selected_tasks").prop("checked", false);
    }
});

// Print Letters

$(document).on("click", ".btn-print-letters", function () {
    var target = $("input.selected_tasks:checked");
    var message = '';
    var type = 'primary';

    if (target.length >= 1) {
        if (target.length > 200) {
            type = 'danger';
            message = `You can't print more than 200 letters together`;
        } else {
            type = 'primary';
            message = `You have selected ${target.length} task(s).`;
        }
    } else {
        message = "No tasks selected. Please select at least one task to continue.";
        type = 'danger';
    }

    if (type === 'danger') {
        Swal.fire({
            title: "Error",
            icon: "error",
            text: message,
        });
        return false;
    }

    // Gather selected task ids (decoded)
    var selected_tasks = [];
    target.each(function () {
        selected_tasks.push(ajs.hash_decode($(this).val()));
    });

    // Ask user: Download or Auto Print
    Swal.fire({
        title: 'Choose action',
        text: message,
        icon: 'question',
        showCancelButton: true,
        showDenyButton: false,
        confirmButtonText: 'Download',
        cancelButtonText: 'Auto Print',
        allowOutsideClick: false
    }).then((choice) => {
        // Determine action chosen download=D or autoprint=A
        var action = choice.isConfirmed ? 'D' : 'A';

        // Show processing modal with progress bar
        Swal.fire({
            title: 'Processing...',
            html: `${message}<br/><small>It might take some time to generate the PDF</small><br/><div class="progress" style="width:100%;margin-top:10px;background:#eee;border-radius:6px;height:10px;"><div id="progress-bar" style="width:0%;height:100%;border-radius:6px;"></div></div>`,
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false,
            didOpen: () => {
                const progressBar = document.getElementById('progress-bar');
                let progress = 0;

                var data = {
                    ids: selected_tasks,
                    action: action // optional param in case backend wants to know which action
                };

                // Start the AJAX request
                ajaxWithRefresh({
                    url: site_url + 'job-tasks/batch_print',
                    method: 'POST',
                    data: data,
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
});


// ─── Export Communications PDF ───────────────────────────────────────────────
// Builds a job sheet per job across every row matching the filters currently
// applied to the grid, not just the visible page.
$(document).on('click', '#communications-export-btn', function () {
    if (!has_searched) {
        Swal.fire({
            title: 'No filter applied',
            text: 'Apply a filter and search before exporting.',
            icon: 'warning'
        });
        return;
    }

    var params = $.extend({}, data_filters);
    delete params.is_default_load;
    var search_term = $.trim($('#search_term').val());

    Swal.fire({
        title: 'Generating PDF...',
        html: 'This might take a moment for large result sets.',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: function () {
            Swal.showLoading();
        }
    });

    ajaxWithRefresh({
        url: site_url + 'job-tasks/communications/export-pdf',
        method: 'GET',
        data: {data_filters: params, search: {value: search_term}}
    }).then(function (res) {
        Swal.close();
        if (res && res.status && res.url) {
            window.open(res.url, '_blank');
        } else {
            Swal.fire({
                title: 'Export Failed',
                text: (res && res.message) || 'Unknown error',
                icon: 'error'
            });
        }
    }).catch(function (err) {
        Swal.close();
        var msg = (err && err.responseJSON && err.responseJSON.message) || 'Export failed. Please try again.';
        Swal.fire({title: 'Error', text: msg, icon: 'error'});
    });
});

// approve job tasks
function checkvalue(val) {
    val = $.trim(val);
    if (val == '' || val == undefined || val == null || val.length < 1) {
        return false;
    }
    return true;
}

document.addEventListener("DOMContentLoaded", function () {
    const tableContainer = document.querySelector("#bulk-task-datatables"); // Replace with the actual parent container ID or class
    let lastChecked = null;

    tableContainer.addEventListener("click", function (e) {
        // Check if the clicked element is a checkbox with the class "selected_tasks"
        if (e.target && e.target.classList.contains("selected_tasks")) {
            const checkboxes = Array.from(
                    tableContainer.querySelectorAll(".selected_tasks")
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




