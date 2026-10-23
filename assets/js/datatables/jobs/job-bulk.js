// var service_ids = [];
var master_data_type = "bulk-assign-jobs";
dataTable = null;
// let is_default_load = 1;

function load_data_table(limit, search_term, filters) {
    $("input.allselect").prop("checked",false);
    data_filters = {};
    // data_filters.is_default_load = is_default_load;
    // is_default_load = 0;
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
    
    dataTable = new DataTable("#bulk-job-datatables", {
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
            url: site_url + "job/bulk/list",
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
                ajs.datatable_error(xhr, "bulk-job-datatables");
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
                name: "null",
                data: "null",
                searchable: false,
                orderable: false,
                render: function(data,type,row){
                    return (`<input class="form-check-input assign-btn selected_jobs" type="checkbox" id="job${row.id}" value="${ajs.hash_encode(row.id)}" data-client-id="${row.client_id}" />`);
                }
            }, 
            {
                name: "jobs.code",
                data: "code",
                className: "task-id-box",
                render: function (data, type, row) {
                    const status = ['open'];
                    var is_emergency = (row.emergency_job == 1) ? '<i class="mdi mdi-circle fs-11 align-middle me-1 emergency-task-icon blink-" ></i>' : '';
                    var is_overdue = (status.includes(row.status.toLowerCase()) && row.target_date && moment(row.target_date) < moment()) ? '<i class="mdi mdi-circle fs-11 align-middle me-1 overdue-task-icon blink-" ></i>' : '';
                    var str = "";
                    str +=  `<div class="d-flex">
                                <div class="avatar-group align-items-center">
                                    <a  href="${cdn_url}job/details/${ajs.hash_encode(row.id)}" target="_blank" class="avatar-group-item pe-1" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="${data}">${data}</a>
                                    ${is_emergency} ${is_overdue}
                                </div>
                            </div>`;
                    return str;
                },
            },
            {
                name: "client_work_order",
                data: "client_work_order",
                defaultContent: '-'
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
                    return truncate_string(row.address1, 25);
                }
            },
            {
                data: "postalcode",
                name: "postalcode"
            },{
                data: "total_sells",
                name: "total_sells",
                className: "pricing-col",
            },{
                data: "total_costs",
                name: "total_costs",
                className: "pricing-col",
            },

            {
                data: "tag_name",
                name: "tag_name",
                render: function (data, type, row) {
                    return `<div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="${$.trim(data)}">${truncate_string(data, 25) ?? "-"}</div>`;
                }
            },
            {
                data: "status",
                name: "status",
                render: function (data) {
                    return status_label(data);
                },
            },
            // {
            //     data: "last_task_status",
            //     name: "last_task_status",
            //     render: function (data) {
            //         return status_label(data);
            //     },
            // },
            {
                data: "financial_status",
                name: "financial_status",
                render: function (data) {
                    return status_label_fin(data);
                },
            },
            {
                data: "target_date",
                name: "target_date",
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
            }
        ],
        order: [["0", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Bulk Process Tasks");
        }
    });
}

function status_label_fin(value) {
    let icon = "-";
    if (value == null) {
        return icon;
    }

    if (value == '0')
    {
        icon = `<span class="badge border bg-white text-capitalize border-danger text-danger">WIP</span>`;
    } else if (value == '1')
    {
        icon = `<span class="badge border bg-white text-capitalize border-indigo text-indigo">Clear to Invoice</span>`;
    } else if (value == '2')
    {
        icon = `<span class="badge border bg-white text-capitalize border-success text-success" >Invoiced</span>`;
    } else if (value == '3')
    {
        icon = `<span class="badge border bg-white text-capitalize  border-success text-success" >APP Submitted</span>`;
    } else if (value == '4')
    {
        icon = `<span class="badge border bg-white text-capitalize border-indigo text-indigo" >APP Buildup</span>`;
    } else if (value == '5')
    {
        icon = `<span class="badge border bg-white text-capitalize border-danger text-danger" >APP Pending</span>`;
    } else if (value == '6')
    {
        icon = `<span class="badge border bg-white text-capitalize border-danger text-danger" >Cancelled</span>`;
    }

    return icon;
}

if ($("#bulk-job-datatables").length) {
    add_autocomplete_sel("#ppm_batch_code_filter", "contract_masterplan_logs", ["batch_code"], null, null);
    add_autocomplete_sel("#client_id_filter", "clients", ["client_code"], null, null);
    add_autocomplete_sel("#property_id_filter", "client_properties", ["uprn_no"], null, null);
    // select2_ajax("#status_id_filter", site_url + "master-record/get_all", "master_value", {master_code: "JOB_STATUS"});
    select2_ajax("#tag_id_filter", site_url + "tag/get_all", "title", {module: 'job'});
    $("#custom_filter").select2({allowClear: true, placeholder: 'Quick Filter'});
    fetch_default_filter(master_data_type);

    var breadcrumbs = [
        {label: 'Bulk Processing', url: 'javascript: void(0);'},
        {label: 'Job Processing', url: null}
    ];
    set_breadcrumb(breadcrumbs);
}

function assign_bulk_jobs(){
    // add_autocomplete_sel("#engineer_id", "users", ["first_name", "last_name"], null, {user_type: 16});
    // select2_ajax("#queue_id", site_url + "queue/get_all", "title", null);
    $('div.custom-offcanvas-right').addClass("width-25");
    $("#job_status").select2({placeholder:"Select Status"});
    select2_ajax('#tags', site_url + 'tag/get_all', 'title', {module:'job'}, 'offcanvasRight');
    select2_ajax('#rtags', site_url + 'tag/get_all', 'title', {module:'job'}, 'offcanvasRight');

    _batch_id_valid = true;
    $('#batch_id_error').hide();
    $('#job_process_batch_id').val('').attr('placeholder', 'Generating...');
    ajaxWithRefresh({ url: site_url + 'job/next_batch_id', method: 'GET' })
        .then(function (res) {
            if (res && res.status) {
                $('#job_process_batch_id').val(res.batch_id).attr('placeholder', '');
            }
        });

    $('.create-tags-box').hide();
    $('.remove-tags-box').hide();
    var target = $("input.selected_jobs:checked");
    var message = '';
    if (target.length >= 1) {
        type = 'primary';
        message = `You have selected ${target.length} job(s).`;        
    } else {
        message = "No job selected. Please select at least one job to continue.";
        type = 'danger';
    }
    $(".bulk-alert-message h6").text(message).addClass(`p-2 text-${type} border border-2 border-${type} fw-bold mb-3`);
}

$(document).on("change", "#add-tags", function () {
    if($(this).is(":checked")){
        $('.create-tags-box').show();
    }else{
        $('.create-tags-box').hide();
    }
});

$(document).on("change", "#remove-tags", function () {
    if($(this).is(":checked")){
        $('.remove-tags-box').show();
    }else{
        $('.remove-tags-box').hide();
    }
});

function status_label(value) {
    if (value == null) {
        return "-";
    }

    var icon = `<span class="badge border border-primary text-primary text-capitalize">${value}</span>`;
    if (value == '0' || value.toLowerCase() == 'open')
    {
        icon = `<span class="badge  border border-indigo text-indigo  text-capitalize">Open</span>`;
    } else if (value == '0' || value.toLowerCase() == 'pending')
    {
        icon = `<span class="badge  border text-capitalize"  style="border-color:#D56800 !important;color:#D56800">Pending</span>`;
    } else if (value == '1' || value.toLowerCase() == 'complete' || value.toLowerCase() == 'completed' || value.toLowerCase() == 'task complete')
    {
        icon = `<span  class="badge  border border-success text-success  text-capitalize">Complete</span>`;
    } else if (value == '2' || value.toLowerCase() == 'rejected' || value == '3')
    {
        icon = `<span class="badge  border border-danger text-danger  text-capitalize" >Rejected</span>`;
    } else if (value.toLowerCase() == 'cancelled')
    {
        icon = `<span class="badge  border border-danger text-danger  text-capitalize" >Cancelled</span>`;
    } else if (value.toLowerCase() == 'approved')
    {
        icon = `<span class="badge  border border-success text-success  text-capitalize">Approved</span>`;

    } else if (value.toLowerCase() == 'in progress')
    {
        icon = `<span class="badge border text-capitalize" style="border-color:#20388A !important;color:#20388A">In Progress</span>`;
    } else if (value.toLowerCase() == 'abandoned' || value.toLowerCase() == 'task abandoned')
    {
        icon = `<span class="badge border text-capitalize" style="border-color:#980100 !important;color:#980100">Abandoned</span>`;
    } else if (value.toLowerCase() == 'h&s fail')
    {
        icon = `<span class="badge border text-capitalize" style="border-color:#db4437 !important;color:#db4437">H&S Failed</span>`;
    } else if (value.toLowerCase() == 'asbestos fail')
    {
        icon = `<span class="badge border text-capitalize" style="border-color:#9a65ca !important;color:#9a65ca">Asbestos Failed</span>`;
    } else if (value.toLowerCase() == 'no access')
    {
        icon = `<span class="badge border text-capitalize" style="border-color:#d56a00 !important;color:#d56a00">No Access</span>`;
    } else if (value.toLowerCase() == 'further works')
    {
        icon = `<span class="badge border text-capitalize" style="border-color:#46b2ff !important;color:#46b2ff">Further Works</span>`;
    } else if (value.toLowerCase() == 'materials required')
    {
        icon = `<span class="badge border text-capitalize" style="border-color:#3e5de8 !important;color:#3e5de8">Materials Required</span>`;
    } else if (value.toLowerCase() == 'start task')
    {
        icon = `<span class="badge border text-capitalize border-secondary text-secondary">Start Task</span>`;
    }

    return icon;
}

// approve job tasks
function checkvalue(val){
    val = $.trim(val);
    if(val == '' || val == undefined || val == null || val.length < 1){
        return false;
    }
    return true;
}
$(document).on("click", "#assign-tasks-btn", function () {
    var target = $("input.selected_jobs:checked");
    var status = $("select#job_status").val();
    var statusText = $("select#job_status option:selected").text();
    var error = 0;

    if (target.length < 1) {
        errormsg = "Please select at least one job before proceeding.";
        error = 1;
    } else {
        var clientIds = new Set();
        target.each(function () { clientIds.add($(this).data('client-id')); });
        if (clientIds.size > 1) {
            errormsg = 'All selected jobs must belong to the same client to create a batch.';
            error = 1;
        } else if (!checkvalue($('#job_process_batch_id').val())) {
            errormsg = "Batch number is required.";
            error = 1;
        } else if (!_batch_id_valid) {
            errormsg = "The batch number already exists. Please change it before proceeding.";
            error = 1;
        }
    }
    if(error == 1){
        Swal.fire({
            title: "Unable to Update",
            icon: "error",
            text: errormsg,
        });
        return false;
    }

    let requetUrl = `${site_url}jobs/bulk/assign`;
    var selected_jobs = [];
    target.each(function(){
        selected_jobs.push(ajs.hash_decode($(this).val()));
    })
    if (checkvalue(status)) {
        $textMsg = `Are you sure you want to update the statuses of all ${selected_jobs.length} selected jobs to "${statusText}"?`;
        if (selected_jobs.length <= 1) {
            $textMsg = `Are you sure you want to update the status of the selected job to "${statusText}"?`;
        }
    } else {
        $textMsg = `Are you sure you want to update the batch number / tags for ${selected_jobs.length} selected job(s)?`;
    }

    Swal.fire({
        title: "Confirmation",
        icon: "warning",
        text: $textMsg,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        showLoaderOnConfirm: true,
        preConfirm: async (message) => {
            try {        
                let formData = $('form.bulk-jobs-form').serialize();
                let additionalData = {jobs: selected_jobs.join(",")};
                const fullData = formData + '&' + $.param(additionalData);

                const response = await ajaxWithRefresh({
                    type: 'POST',
                    url: requetUrl,
                    data: fullData,
                });
                if (response.status == false) {
                    // return Swal.showValidationMessage(`
                    //         <strong>Error: </strong> ${response.message}
                    //     `);
                    Swal.fire({
                        title: `Error!!`,
                        icon: "error",
                        text: response.message
                    });
                    return false;
                }
                return response;
            } catch (error) {
                console.log(error);
                var errorMsg = "Something went wrong.please try again...";
                if('responseJSON' in error){
                    errorMsg = $(`<div>${error.responseJSON.message}</div>`).text();
                }
                // Swal.showValidationMessage(`<strong>Error: </strong> ${errorMsg}`);
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
            $("input.allselect").prop("checked",false);
        }
    });
});

// Select/deselect All 
$(document).on("change","input.selected_jobs",function(){
    var total = $("input.selected_jobs").length;
    var selected = $("input.selected_jobs:checked").length;
    if(total == selected){
        $("input.allselect").prop("checked",true);
    }else{
        $("input.allselect").prop("checked",false);
    }
});

$(document).on("change","input.allselect",function(){
    if($(this).is(":checked")){
        $("input.selected_jobs").prop("checked",true);
    }else{
        $("input.selected_jobs").prop("checked",false);
    }
});
// Select/deselect All 

document.addEventListener("DOMContentLoaded", function () {
    const tableContainer = document.querySelector("#bulk-job-datatables"); // Replace with the actual parent container ID or class
    let lastChecked = null;

    tableContainer.addEventListener("click", function (e) {
        // Check if the clicked element is a checkbox with the class "selected_jobs"
        if (e.target && e.target.classList.contains("selected_jobs")) {
            const checkboxes = Array.from(
                tableContainer.querySelectorAll(".selected_jobs")
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


["keyup","keydown"].forEach((event) => {
    window.addEventListener(event, (e) => {
        document.onselectstart = function() {
            return !(e.key == "Shift" && e.shiftKey);
        }
    });
});

// ─── Processed Batches DataTable ─────────────────────────────────────────────
var batchesTable = null;
var _batchFilters = {};

$(document).on('shown.bs.tab', '#tab-batches', function () {
    if (batchesTable) { batchesTable.ajax.reload(); return; }
    batchesTable = new DataTable('#processed-batches-datatables', {
        scrollX: true,
        autoWidth: false,
        serverSide: true,
        processing: true,
        paging: true,
        bDestroy: true,
        pageLength: ajs.datatable_limit,
        ajax: {
            url: site_url + 'job/bulk/batches',
            method: 'GET',
            dataSrc: 'data',
            data: function (d) { return $.extend({}, d, _batchFilters); },
            beforeSend: function (xhr, settings) { ajs.set_auth_header(xhr, settings); },
            error: function (xhr) { ajs.datatable_error(xhr, 'processed-batches-datatables'); }
        },
        language: { emptyTable: 'No processed batches found.' },
        columns: [
            { data: null, orderable: false, searchable: false, width: '32px',
              render: function (d, t, row) {
                  if (row.financial_status === '2') return '';
                  return '<input class="form-check-input batch-select-cb" type="checkbox" value="' + row.batch_code + '" data-client="' + (row.client_code || '') + '">';
              }
            },
            { data: 'batch_code',  name: 'batch_code' },
            { data: 'client_code', name: 'client_code', defaultContent: '-' },
            { data: 'job_count',   name: 'job_count' },
            { data: 'financial_status', name: 'financial_status', orderable: false,
              render: function (d) { return status_label_fin(d); }
            },
            { data: 'batch_amount', name: 'batch_amount', orderable: false,
              className: 'text-end', render: _fmtMoney
            },
            { data: 'batch_vat', name: 'batch_vat', orderable: false,
              className: 'text-end', render: _fmtMoney
            },
            { data: 'batch_total', name: 'batch_total', orderable: false,
              className: 'text-end', render: _fmtMoney
            },
            { data: 'last_updated', name: 'last_updated',
              render: function (d) { return ajs.format_date(d); }
            },
            { data: null, orderable: false,
              render: function (d, t, row) {
                  var btns = '<button class="btn btn-sm btn-primary ms-2 view-batch-jobs-btn" data-batch="' + row.batch_code + '" data-fin="' + (row.financial_status || '') + '" title="View"><i class="ri-eye-line"></i></button>';
                  // APP Submitted ('3') is editable as well — the application has gone
                  // out but is not invoiced yet, so jobs can still be added.
                  if (['1','3','4','5'].includes(String(row.financial_status))) {
                      btns += ' <button class="btn btn-sm btn-success batch-add-more-btn" data-batch="' + row.batch_code + '" title="Add More"><i class="ri-add-line"></i></button>';
                  }
                  return btns;
              }
            }
        ],
        order: [[5, 'desc']],
        drawCallback: function () {
            $('#batches-select-all').prop('checked', false).prop('indeterminate', false);
        }
    });
});

// Search
$(document).on('click', '#batches-search-btn', function () {
    _batchFilters = {
        batch_search: $('#batches-search').val().trim(),
        date_from:    $('#batches-date-from').val().trim(),
        date_to:      $('#batches-date-to').val().trim(),
        fin_status:   $('#batches-fin-status').val(),
    };
    if (batchesTable) { batchesTable.ajax.reload(); }
});

$(document).on('keypress', '#batches-search, #batches-date-from, #batches-date-to', function (e) {
    if (e.which === 13) { $('#batches-search-btn').trigger('click'); }
});

// Select-all checkbox
$(document).on('change', '#batches-select-all', function () {
    $('.batch-select-cb').prop('checked', $(this).is(':checked'));
});

$(document).on('change', '.batch-select-cb', function () {
    var total   = $('.batch-select-cb').length;
    var checked = $('.batch-select-cb:checked').length;
    $('#batches-select-all').prop('indeterminate', checked > 0 && checked < total);
    $('#batches-select-all').prop('checked', checked === total && total > 0);
});


// ─── Batch Export ─────────────────────────────────────────────────────────────
$(document).on('click', '#batches-export-btn', function () {
    var codes   = [];
    var clients = new Set();

    $('.batch-select-cb:checked').each(function () {
        codes.push($(this).val());
        clients.add($(this).data('client') || '');
    });

    if (!codes.length) {
        Swal.fire({ title: 'No Batch Selected', text: 'Please select at least one batch to export.', icon: 'warning' });
        return;
    }
    if (clients.size > 1) {
        Swal.fire({ title: 'Multiple Clients', text: 'Please select batches from the same client only.', icon: 'warning' });
        return;
    }

    ajaxWithRefresh({
        url: site_url + 'job/bulk/export_batch',
        method: 'GET',
        data: { batch_codes: codes.join(',') },
    }).then(function (res) {
        if (res && res.status) {
            if (res.url) {
                window.open(res.url, '_blank');
            } else {
                Swal.fire({ title: 'Export Queued', text: res.message, icon: 'success' });
            }
        } else {
            Swal.fire({ title: 'Export Failed', text: (res && res.message) || 'Unknown error', icon: 'error' });
        }
    }).catch(function (err) {
        var msg = (err.responseJSON && err.responseJSON.message) || 'Export failed. Please try again.';
        Swal.fire({ title: 'Error', text: msg, icon: 'error' });
    });
});

// ─── Change Batch Status (Ready to Invoice / APP BUILDUP) ────────────────────
$(document).on('click', '#batches-change-status-btn', function () {
    var codes = [];
    $('.batch-select-cb:checked').each(function () { codes.push($(this).val()); });

    if (!codes.length) {
        Swal.fire({ title: 'No Batch Selected', text: 'Please select at least one batch.', icon: 'warning' });
        return;
    }

    $('#batch-change-status-select').val('');
    $('#batchChangeStatusModal').data('batch-codes', codes).modal('show');
});

$(document).on('click', '#batch-change-status-save-btn', function () {
    var codes  = $('#batchChangeStatusModal').data('batch-codes') || [];
    var target = $('#batch-change-status-select').val();

    if (!target) {
        Swal.fire({ title: 'Validation', text: 'Please select a status.', icon: 'warning' });
        return;
    }

    Swal.fire({
        title: 'Are you sure?',
        text: 'Change status for ' + codes.length + ' selected batch(es)?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'Cancel',
    }).then(function (result) {
        if (!result.isConfirmed) { return; }
        $('#batchChangeStatusModal').modal('hide');
        ajaxWithRefresh({
            url: site_url + 'job/bulk/batch_change_status',
            method: 'POST',
            data: { batch_codes: codes.join(','), target: target },
        }).then(function (res) {
            if (res && res.status) {
                if (batchesTable) { batchesTable.ajax.reload(); }
                $('#batches-select-all').prop('checked', false).prop('indeterminate', false);
                Swal.fire({ title: 'Done', text: res.message, icon: 'success' });
            } else {
                Swal.fire({ title: 'Failed', text: (res && res.message) || 'Unknown error', icon: 'error' });
            }
        }).catch(function (err) {
            var msg = (err.responseJSON && err.responseJSON.message) || 'Could not change status.';
            Swal.fire({ title: 'Error', text: msg, icon: 'error' });
        });
    });
});

// ─── Batch Import (dropdown at top) ──────────────────────────────────────────
function handleBatchImportUpload() {
    var fileInput = document.getElementById('batch_import_file');
    var file      = fileInput && fileInput.files && fileInput.files[0];

    $('#batch-import-error').addClass('d-none').text('');

    if (!file) {
        $('#batch-import-error').text('Please select an Excel file.').removeClass('d-none');
        return;
    }

    var $btn     = $('#batch-import-upload-btn');
    var $spinner = $('#batch-import-spinner');
    $btn.prop('disabled', true);
    $spinner.removeClass('d-none');

    var formData = new FormData();
    formData.append('upload', file);
    formData.append('file_type', 'excel');
    formData.append('upload_type', 'job_batch_update');

    ajs.ajax_file_upload(
        site_url + 'api/file/upload_s3',
        formData, '0', '0',
        function (s3res) {
            if (!s3res || !s3res.status) {
                $btn.prop('disabled', false);
                $spinner.addClass('d-none');
                $('#batch-import-error').text((s3res && s3res.message) || 'Upload failed.').removeClass('d-none');
                return;
            }
            var file_path = (s3res.upload_path || '') + (s3res.file_name || '');

            ajaxWithRefresh({
                url: site_url + 'job/bulk/upload_batch_update',
                method: 'POST',
                data: { file_path: file_path },
            }).then(function (res) {
                $btn.prop('disabled', false);
                $spinner.addClass('d-none');
                // Close dropdown
                $('#batch_import_file').val('');
                $('.dropdown-menu').removeClass('show');
                ajs.loader_text = 'Loading Preview...';
                ajs.ajaxCustomLarge(cdn_url + 'bulk-preview', res, '1', ajs.previewBulkUpload);
            }).catch(function (err) {
                $btn.prop('disabled', false);
                $spinner.addClass('d-none');
                var msg = (err.responseJSON && err.responseJSON.message) || 'Validation failed.';
                $('#batch-import-error').text(msg).removeClass('d-none');
            });
        },
        function () {
            $btn.prop('disabled', false);
            $spinner.addClass('d-none');
            $('#batch-import-error').text('File upload failed. Please try again.').removeClass('d-none');
        }
    );
}

// ─── View Jobs in Batch ───────────────────────────────────────────────────────
var _finLabels = { '0': 'WIP', '1': 'Clear to Invoice', '2': 'Invoiced', '3': 'APP Submitted', '4': 'APP Buildup', '5': 'APP Pending' };

function _fmtNum(d)   { return d == null ? '0' : (parseFloat(d) || 0).toString(); }
function _fmtMoney(d) { return (parseFloat(d) || 0).toFixed(2); }
var _viewBatchCode = null;
var _viewBatchEditable = false;
var batchJobsDT = null;

function loadBatchJobs(batchCode) {
    $('#batch-jobs-code').text(batchCode);
    $('#batch-jobs-loading').show();
    $('#batch-jobs-content, #batch-jobs-empty').hide();
    if (batchJobsDT) { batchJobsDT.destroy(); batchJobsDT = null; }
    $('#batch-jobs-body').empty();
    $('#batch-jobs-search').val('');

    return ajaxWithRefresh({ url: site_url + 'job/bulk/batch_jobs', method: 'GET', data: { batch_code: batchCode } })
        .then(function (res) {
            $('#batch-jobs-loading').hide();
            if (res && res.status && res.data && res.data.length > 0) {
                var single = res.data.length === 1;
                $('#batch-jobs-content').show();
                batchJobsDT = $('#batch-jobs-table').DataTable({
                    data: res.data,
                    destroy: true,
                    paging: true,
                    pageLength: 50,
                    lengthChange: false,
                    autoWidth: false,
                    dom: 'rtip',
                    order: [],
                    columns: [
                        { data: null, orderable: false, render: function (d, t, row) {
                            return '<a href="' + cdn_url + 'job/details/' + ajs.hash_encode(row.id) + '" target="_blank">' + (row.code || row.id) + '</a>';
                        } },
                        { data: 'client_work_order', defaultContent: '-' },
                        { data: 'client_code', defaultContent: '-' },
                        { data: 'status_label', defaultContent: '-' },
                        { data: 'financial_status', render: function (d) { return _finLabels[String(d)] || '-'; } },
                        { data: 'target_date', render: function (d) { return ajs.format_date(d) || '-'; } },
                        { data: 'total_material_price', className: 'text-end', render: _fmtMoney },
                        { data: 'total_labor_price', className: 'text-end', render: _fmtMoney },
                        { data: 'total_sell_price', className: 'text-end', render: _fmtMoney },
                        { data: 'total_quantity', className: 'text-end', render: _fmtNum },
                        { data: 'amount', className: 'text-end', render: _fmtMoney },
                        { data: 'vat_amount', className: 'text-end', render: _fmtMoney },
                        { data: 'total_amount', className: 'text-end', render: _fmtMoney },
                        { data: null, orderable: false, className: 'text-end', render: function (d, t, row) {
                            if (!_viewBatchEditable) { return ''; }
                            return '<button class="btn btn-danger batch-remove-job-btn" data-job="' + row.id + '"' +
                                   (single ? ' disabled title="At least one job must remain"' : '') + '>&times;</button>';
                        } }
                    ]
                });
            } else {
                $('#batch-jobs-empty').show();
            }
        })
        .catch(function () {
            $('#batch-jobs-loading').hide();
            $('#batch-jobs-empty').text('Failed to load jobs. Please try again.').show();
        });
}

$(document).on('click', '.view-batch-jobs-btn', function () {
    _viewBatchCode = $(this).data('batch');
    // Must match _batch_is_editable() in job/Job.php — APP Submitted ('3') included.
    _viewBatchEditable = ['1','3','4','5'].includes(String($(this).data('fin')));

    var modal = new bootstrap.Modal(document.getElementById('batchJobsModal'));
    modal.show();
    loadBatchJobs(_viewBatchCode);
});

// Search within the View Jobs modal (matches job code / work order, etc.)
$(document).on('keyup search', '#batch-jobs-search', function () {
    if (batchJobsDT) { batchJobsDT.search($(this).val()).draw(); }
});

// ─── Remove job from batch ──────────────────────────────────────────────────
$(document).on('click', '.batch-remove-job-btn', function () {
    var jobId = $(this).data('job');
    if (!_viewBatchCode || !jobId) { return; }

    Swal.fire({
        title: 'Remove job from batch?',
        text: 'The job will be reset to APP Pending and removed from this batch.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove',
    }).then(function (result) {
        if (!result.isConfirmed) { return; }
        ajaxWithRefresh({
            url: site_url + 'job/bulk/batch_remove_job',
            method: 'POST',
            data: { batch_code: _viewBatchCode, job_id: jobId },
        }).then(function (res) {
            if (res && res.status) {
                loadBatchJobs(_viewBatchCode);
                if (batchesTable) { batchesTable.ajax.reload(null, false); }
            } else {
                Swal.fire({ title: 'Error', text: (res && res.message) || 'Could not remove job.', icon: 'error' });
            }
        }).catch(function (err) {
            var msg = (err.responseJSON && err.responseJSON.message) || 'Could not remove job.';
            Swal.fire({ title: 'Error', text: msg, icon: 'error' });
        });
    });
});

// ─── Add jobs to batch (server-side paginated) ───────────────────────────────
var _addBatchCode = null;
var batchAddDT = null;
var _addSelectedIds = {}; // persists selection across pages

$(document).on('click', '.batch-add-more-btn', function () {
    _addBatchCode = $(this).data('batch');
    _addSelectedIds = {};
    $('#batch-add-code').text(_addBatchCode);
    $('#batch-add-loading, #batch-add-empty').hide();
    $('#batch-add-content').show();
    $('#batch-add-error').addClass('d-none').text('');
    $('#batch-add-select-all').prop('checked', false).prop('indeterminate', false);
    $('#batch-add-search').val('');

    var modal = new bootstrap.Modal(document.getElementById('batchAddJobsModal'));
    modal.show();

    if (batchAddDT) { batchAddDT.destroy(); batchAddDT = null; $('#batch-add-body').empty(); }

    batchAddDT = new DataTable('#batch-add-table', {
        serverSide: true,
        processing: true,
        paging: true,
        pageLength: 50,
        lengthChange: false,
        autoWidth: false,
        dom: 'rtip',
        searching: true,
        order: [],
        ajax: {
            url: site_url + 'job/bulk/batch_candidates',
            method: 'GET',
            dataSrc: 'data',
            data: function (d) { d.batch_code = _addBatchCode; return d; },
            beforeSend: function (xhr, settings) { ajs.set_auth_header(xhr, settings); },
            error: function (xhr) { ajs.datatable_error(xhr, 'batch-add-table'); }
        },
        language: { emptyTable: 'No eligible jobs found for this client.' },
        columns: [
            { data: null, orderable: false, render: function (d, t, row) {
                var checked = _addSelectedIds[row.id] ? 'checked' : '';
                return '<input class="form-check-input batch-add-cb" type="checkbox" value="' + row.id + '" ' + checked + '>';
            } },
            { data: null, render: function (d, t, row) { return (row.code || row.id); } },
            { data: 'client_work_order', defaultContent: '-' },
            { data: 'status_label', defaultContent: '-' },
            { data: 'financial_status', render: function (d) { return _finLabels[String(d)] || '-'; } },
            { data: 'target_date', render: function (d) { return ajs.format_date(d) || '-'; } },
            { data: 'total_material_price', className: 'text-end', render: _fmtMoney },
            { data: 'total_labor_price', className: 'text-end', render: _fmtMoney },
            { data: 'total_sell_price', className: 'text-end', render: _fmtMoney },
            { data: 'total_quantity', className: 'text-end', render: _fmtNum },
            { data: 'amount', className: 'text-end', render: _fmtMoney },
            { data: 'vat_amount', className: 'text-end', render: _fmtMoney },
            { data: 'total_amount', className: 'text-end', render: _fmtMoney }
        ],
        drawCallback: function () { _syncAddSelectAll(); }
    });
});

// Server-side search (matches job code / work order).
$(document).on('keyup search', '#batch-add-search', function () {
    if (batchAddDT) { batchAddDT.search($(this).val()).draw(); }
});

// Track individual checkbox selection across pages.
$(document).on('change', '.batch-add-cb', function () {
    var id = $(this).val();
    if (this.checked) { _addSelectedIds[id] = true; } else { delete _addSelectedIds[id]; }
    _syncAddSelectAll();
});

// Select-all toggles only the current page rows, updating the persistent set.
$(document).on('change', '#batch-add-select-all', function () {
    var checked = $(this).is(':checked');
    $('#batch-add-table tbody .batch-add-cb').each(function () {
        this.checked = checked;
        var id = $(this).val();
        if (checked) { _addSelectedIds[id] = true; } else { delete _addSelectedIds[id]; }
    });
});

function _syncAddSelectAll() {
    var $cb = $('#batch-add-table tbody .batch-add-cb');
    var total = $cb.length;
    var checked = $cb.filter(':checked').length;
    $('#batch-add-select-all').prop('checked', total > 0 && checked === total)
                              .prop('indeterminate', checked > 0 && checked < total);
}

$(document).on('click', '#batch-add-submit-btn', function () {
    var ids = Object.keys(_addSelectedIds);

    $('#batch-add-error').addClass('d-none').text('');
    if (!ids.length) {
        $('#batch-add-error').text('Please select at least one job to add.').removeClass('d-none');
        return;
    }

    var $btn = $('#batch-add-submit-btn');
    var $spinner = $('#batch-add-spinner');
    $btn.prop('disabled', true);
    $spinner.removeClass('d-none');

    ajaxWithRefresh({
        url: site_url + 'job/bulk/batch_add_jobs',
        method: 'POST',
        data: { batch_code: _addBatchCode, job_ids: ids.join(',') },
    }).then(function (res) {
        $btn.prop('disabled', false);
        $spinner.addClass('d-none');
        if (res && res.status) {
            var modalEl = document.getElementById('batchAddJobsModal');
            if (modalEl) { bootstrap.Modal.getInstance(modalEl).hide(); }
            if (batchesTable) { batchesTable.ajax.reload(null, false); }
            Swal.fire({ title: 'Added', text: res.message, icon: 'success' });
        } else {
            $('#batch-add-error').text((res && res.message) || 'Could not add jobs.').removeClass('d-none');
        }
    }).catch(function (err) {
        $btn.prop('disabled', false);
        $spinner.addClass('d-none');
        var msg = (err.responseJSON && err.responseJSON.message) || 'Could not add jobs.';
        $('#batch-add-error').text(msg).removeClass('d-none');
    });
});

// ─── Batch ID duplicate check ─────────────────────────────────────────────────
var _batch_id_valid = true;

$(document).on('blur', '#job_process_batch_id', function () {
    var val = $.trim($(this).val());
    $('#batch_id_error').hide();
    if (!val) { _batch_id_valid = true; return; }

    ajaxWithRefresh({ url: site_url + 'job/check_batch_id', method: 'GET', data: { batch_id: val } })
        .then(function (res) {
            if (res && res.exists) {
                _batch_id_valid = false;
                $('#batch_id_error').text('This batch number already exists. Please use a different one.').show();
            } else {
                _batch_id_valid = true;
                $('#batch_id_error').hide();
            }
        });
});

// ─── Bulk Export ──────────────────────────────────────────────────────────────
$(document).on('click', '#bulk-export-btn', function () {
    var ids = [];
    $('input.selected_jobs:checked').each(function () {
        ids.push(ajs.hash_decode($(this).val()));
    });
    if (ids.length === 0) {
        Swal.fire({ title: 'No jobs selected', text: 'Please select at least one job to export.', icon: 'warning' });
        return;
    }
    ajaxWithRefresh({
        url: site_url + 'job/bulk/export',
        method: 'GET',
        data: { job_ids: ids.join(',') },
    }).then(function (res) {
        if (res && res.status) {
            if (res.url) {
                window.open(res.url, '_blank');
            } else {
                Swal.fire({ title: 'Export Queued', text: res.message, icon: 'success' });
            }
        } else {
            Swal.fire({ title: 'Export Failed', text: (res && res.message) || 'Unknown error', icon: 'error' });
        }
    }).catch(function (err) {
        var msg = (err.responseJSON && err.responseJSON.message) || 'Export failed. Please try again.';
        Swal.fire({ title: 'Error', text: msg, icon: 'error' });
    });
});

// ─── Bulk Import ─────────────────────────────────────────────────────────────

// Upload button → S3 upload → parse → shared bulk-preview accordion
function handleJobBulkImportUpload() {
    var fileInput = document.getElementById('job_bulk_import_file');
    var file = fileInput && fileInput.files && fileInput.files[0];
    if (!file) {
        $('#job-bulk-import-upload-error').text('Please select an Excel file.').show();
        return;
    }
    var $spinner = $('#job-bulk-import-spinner');
    var $btn     = $('#job-bulk-import-upload-btn');
    $btn.prop('disabled', true);
    $spinner.removeClass('d-none');
    $('#job-bulk-import-upload-error').hide();

    var formData = new FormData();
    formData.append('upload', file);
    formData.append('file_type', 'excel');
    formData.append('upload_type', 'job_bulk_update');

    ajs.ajax_file_upload(
        site_url + 'api/file/upload_s3',
        formData,
        '0', '0',
        function (s3res) {
            if (!s3res || !s3res.status) {
                $btn.prop('disabled', false);
                $spinner.addClass('d-none');
                $('#job-bulk-import-upload-error').text((s3res && s3res.message) || 'File upload failed.').show();
                return;
            }
            var file_path = (s3res.upload_path || '') + (s3res.file_name || '');
            ajaxWithRefresh({
                url: site_url + 'job/bulk/upload_update',
                method: 'POST',
                data: { file_path: file_path },
            }).then(function (res) {
                $btn.prop('disabled', false);
                $spinner.addClass('d-none');
                $('.dropdown-menu').removeClass('show');
                $('#job_bulk_import_file').val('');
                ajs.loader_text = 'Loading Preview...';
                ajs.ajaxCustomLarge(cdn_url + 'bulk-preview', res, '1', ajs.previewBulkUpload);
            }).catch(function (err) {
                $btn.prop('disabled', false);
                $spinner.addClass('d-none');
                var msg = (err.responseJSON && err.responseJSON.message) || 'Parse failed.';
                $('#job-bulk-import-upload-error').text(msg).show();
            });
        },
        function () {
            $btn.prop('disabled', false);
            $spinner.addClass('d-none');
            $('#job-bulk-import-upload-error').text('File upload failed. Please try again.').show();
        }
    );
}