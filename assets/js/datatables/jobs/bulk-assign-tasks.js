var master_data_type = "bulk-assign-tasks";
dataTable = null;
var ignore_keys = [];
let is_default_load = 0;

let is_all_selected = false;
let selected_task_ids = new Set();
let unselected_task_ids = new Set();

// cached per opening of the assign offcanvas
let bulk_selected_ids = [];
let bulk_appt_check = null;
let prev_task_assign = '0';         // "Add to queue" is the default checked option
let suppress_appt_confirm = false;  // set while reverting a radio, so the revert doesn't re-prompt

function reset_selection_state() {
    is_all_selected = false;
    selected_task_ids.clear();
    unselected_task_ids.clear();
    $("input.allselect").prop("checked", false);
}

function update_checkboxes_on_draw() {
    if (is_all_selected) {
        $("input.selected_tasks").each(function () {
            var raw_id = ajs.hash_decode($(this).val());
            if (unselected_task_ids.has(raw_id)) {
                $(this).prop("checked", false);
            } else {
                $(this).prop("checked", true);
            }
        });
        $("input.allselect").prop("checked", unselected_task_ids.size === 0);
    } else {
        var visible = $("input.selected_tasks");
        var checked_count = 0;
        visible.each(function () {
            var raw_id = ajs.hash_decode($(this).val());
            if (selected_task_ids.has(raw_id)) {
                $(this).prop("checked", true);
                checked_count++;
            } else {
                $(this).prop("checked", false);
            }
        });
        if (visible.length > 0 && checked_count === visible.length) {
            $("input.allselect").prop("checked", true);
        } else {
            $("input.allselect").prop("checked", false);
        }
    }
}

async function fetch_all_task_ids() {
    try {
        var params = $.extend({}, { data_filters: data_filters }, { start: 0, length: -1 });
        const response = await ajaxWithRefresh({
            type: 'GET',
            url: site_url + "job-tasks/bulk/list",
            data: params
        });
        if (response && response.data && Array.isArray(response.data)) {
            return response.data.map(item => item.id);
        }
    } catch (error) {
        console.error("Error fetching all task ids:", error);
    }
    return [];
}

async function get_selected_task_ids() {
    if (is_all_selected) {
        var all_ids = await fetch_all_task_ids();
        if (all_ids && all_ids.length > 0) {
            return all_ids.filter(id => !unselected_task_ids.has(id));
        } else {
            var dom_ids = [];
            $("input.selected_tasks:checked").each(function () {
                dom_ids.push(ajs.hash_decode($(this).val()));
            });
            return dom_ids;
        }
    } else {
        return Array.from(selected_task_ids);
    }
}

function load_data_table(limit, search_term, filters) {
    reset_selection_state();
    $("input.allselect").prop("checked",false);
    data_filters = {};
    data_filters.is_default_load = is_default_load;
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
            url: site_url + "job-tasks/bulk/list",
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
            },
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
                    return (`<input class="form-check-input assign-btn selected_tasks" type="checkbox" id="job${row.id}" value="${ajs.hash_encode(row.id)}" />`);
                }
            }, 
            {
                name: "jt.task_code",
                data: "task_code",
            },
            {
                name: "task_name",
                data: "task_name"
            },
            {
                name: "service_name",
                data: "service_name",
            },
            {
                name: "client_code",
                data: "client_code",
            },
            {
                name: "uprn_no",
                data: "uprn_no",
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
            },
            {
                data: "tag_name",
                name: "tag_name",
                render: function (data, type, row) {
                    return `<div data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="${$.trim(data)}">${truncate_string(data, 25) ?? "-"}</div>`;
                }
            },
            {
                data: "queue_name",
                name: "queue_name",
                // render: function (data){
                //     return `<b>${data}</b>`;
                // }
            },
            {
                data: "is_assigned",
                name: "is_assigned",
                render: function (data,type,row) {
                    var status = `<span class="badge  border border-indigo text-indigo text-capitalize">Unassigned</span>`;                        
                    if(row.is_assigned == '1'){
                        status = `<span class="badge  border border-success text-success text-capitalize">Assigned</span>`;
                    }else if(row.queue_id > 0){
                        status = `<span class="badge  border border-warning text-warning text-capitalize">In-Queue</span>`;                        
                    }
                    return status;
                },
            },
            {
                data: "engg_name",
                name: "engg_name",
                render: function (data,type,row) {
                    var str = '-';
                    if($.trim(data) != ''){
                        str = $.trim(data);
                    }
                    return str;
                }
            },
            {
                data: "assigned_date",
                name: "assigned_date",
                render: function (data) {
                    return ajs.format_datetime(data);
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
            update_checkboxes_on_draw();
        }
    });
}

// function set_job_id(job_id)
// {
//     $('#job_id').val(job_id);
// }

if ($("#bulk-task-datatables").length) {
    load_postalcodes();
    add_autocomplete_sel("#job_type_filters", "services", ["title"], null, null);
    add_autocomplete_sel("#client_id_filter", "clients", ["client_code"], null, null);
    add_autocomplete_sel("#contracts_filter", "contracts", ["contract_number"], null, null);
    add_autocomplete_sel("#property_filter", "client_properties", ["uprn_no"], null, null);
    select2_ajax_users("#engineers_filter", {user_type: 16});
    $('#job_status_filter').select2({placeholder: 'All Tasks', allowClear: true});
    fetch_default_filter(master_data_type);
    select2_ajax("#queue_filter", site_url + "queue/get_all", "title", null);
    select2_ajax('#tags_filter', site_url + 'tag/get_all', 'title', {module:'task'});
    var breadcrumbs = [
        {label: 'Bulk Processing', url: 'javascript: void(0);'},
        {label: 'Task Processing', url: null}
    ];
    set_breadcrumb(breadcrumbs);    
}

async function load_postalcodes(){
    const response = await ajaxWithRefresh({
        type: 'GET',
        url: site_url+'api/filter/postals',
    });
    const postaldata = response.data;
    $('#job_postcode_filter').select2({placeholder: 'All Postalcodes', allowClear: true,data:postaldata});  
}

$(document).on("change", "#client_id_filter", function(){
    var val = $.trim($(this).val());
    var client_id = null;
    $('#contracts_filter').select2('destroy').empty().select2({placeholder: 'All Contracts'});
    $('#property_filter').select2('destroy').empty().select2({placeholder: 'All Properties'});
    if(val != '' && val != undefined && val != null){
        client_id = {client_id:val};
    }
    add_autocomplete_sel("#contracts_filter", "contracts", ["contract_number"], null, client_id);
    add_autocomplete_sel("#property_filter", "client_properties", ["uprn_no"], null, client_id);
})

function status_label(value) {
    if (value == null) {
        return "-";
    }

    var icon = '';
    if (value == '0'){
        icon = `<span class="badge  border border-warning text-warning  text-capitalize">Not-assigned</span>`;        
    }
    else if (value == '1'){
        icon = `<span class="badge  border border-success text-success  text-capitalize">Assigned</span>`;        
    }

    return icon;
}

// Select/deselect All 
$(document).on("change", "input.selected_tasks", function () {
    var raw_id = ajs.hash_decode($(this).val());
    var is_checked = $(this).is(":checked");

    if (is_all_selected) {
        if (!is_checked) {
            unselected_task_ids.add(raw_id);
        } else {
            unselected_task_ids.delete(raw_id);
        }
        $("input.allselect").prop("checked", unselected_task_ids.size === 0);
    } else {
        if (is_checked) {
            selected_task_ids.add(raw_id);
        } else {
            selected_task_ids.delete(raw_id);
        }
        var total = $("input.selected_tasks").length;
        var selected = $("input.selected_tasks:checked").length;
        if (total > 0 && total == selected) {
            $("input.allselect").prop("checked", true);
        } else {
            $("input.allselect").prop("checked", false);
        }
    }
});

$(document).on("change", ".all-select-row, input.allselect", function () {
    if ($(this).is(":checked")) {
        is_all_selected = true;
        selected_task_ids.clear();
        unselected_task_ids.clear();
        $("input.selected_tasks").prop("checked", true);
        $("input.allselect").prop("checked", true);
    } else {
        is_all_selected = false;
        selected_task_ids.clear();
        unselected_task_ids.clear();
        $("input.selected_tasks").prop("checked", false);
        $("input.allselect").prop("checked", false);
    }
});
// Select/deselect All 

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

$(document).on("change", ".task-assign", async function () {
    var assignment = $(this).val();
    $('.not_assign_div').css('display', 'none');
    $('.assign_div').css('display', 'none');
    $('#queue_id').val(null);
    if (assignment == '1')
    {
        $('.assign_div').css('display', '');
        $('form.bulk-tasks-form input[name="appt_confirm"]').remove(); // choice changed, needs re-approval
        if (!await confirm_appt_mismatch())
        {
            // revert to whichever assignment type was selected before
            $(`input.task-assign[value="${prev_task_assign}"]`).prop('checked', true).trigger('change');
            return;
        }
    } else if (assignment == '0')
    {
        $('.not_assign_div').css('display', '');
    }
    prev_task_assign = assignment;
});

// Warn when the chosen appointment answer contradicts the contract service's appt_required flag.
// Returns true to continue with the current answer, false when the user backs out.
async function confirm_appt_mismatch() {
    if ($("input.task-assign:checked").val() != '1' || !bulk_selected_ids || bulk_selected_ids.length < 1) {
        return true;
    }
    try {
        if (bulk_appt_check === null) {
            bulk_appt_check = await ajaxWithRefresh({
                type: 'POST',
                url: site_url + "tasks/bulk/appointment-check",
                data: { tasks: bulk_selected_ids.join(",") }
            });
        }
    } catch (error) {
        console.error("Error checking appointment required tasks:", error);
        return true; // never block on a failed pre-check, the server still gates this at submit
    }
    var appt_data = bulk_appt_check && bulk_appt_check.data ? bulk_appt_check.data : null;
    if (!appt_data) {
        return true;
    }
    // "Yes" warns about tasks needing no appointment, "No" about tasks that do require one
    var is_confirmed = $("input.is_appointment_confirmed:checked").val();
    var warning = is_confirmed == '1' ? appt_data.appt_not_required : appt_data.appt_required;
    if (!warning || warning.count < 1) {
        return true;
    }

    const result = await Swal.fire({
        title: is_confirmed == '1' ? "Appointment Not Required" : "Appointment Required",
        icon: "warning",
        text: warning.message,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        denyButtonText: "No"
    });
    if (result.isConfirmed) {
        set_bulk_confirm_flag('appt_confirm'); // approved here, so submit won't ask the same thing again
        return true;
    }
    return false;
}

function set_bulk_confirm_flag(field) {
    if ($(`form.bulk-tasks-form input[name="${field}"]`).length == 0) {
        $("form.bulk-tasks-form").append(`<input type="hidden" name="${field}" value="1">`);
    }
}

async function assign_bulk_tasks(){
    select2_ajax_users("#engineer_id", {user_type: 16});
    select2_ajax("#queue_id", site_url + "queue/get_all", "title", null);
    $('div.custom-offcanvas-right').addClass("width-25");
    select2_ajax("#preferred_time_range", site_url + "servicetime/get_all", "title_with_time", null, "offcanvasRight", null, true);
    select2_ajax('#tags', site_url + 'tag/get_all', 'title', {module:'task'}, 'offcanvasRight');
    select2_ajax('#rtags', site_url + 'tag/get_all', 'title', {module:'task'}, 'offcanvasRight');
    $('.create-tags-box').hide();
    $('.remove-tags-box').hide();
    // drop confirmations carried over from a previous assignment so every gate is re-evaluated
    $('form.bulk-tasks-form input[name="confirm"], form.bulk-tasks-form input[name="appt_confirm"]').remove();
    bulk_appt_check = null;
    prev_task_assign = '0';
    suppress_appt_confirm = false;
    var selected_ids = await get_selected_task_ids();
    bulk_selected_ids = selected_ids;
    var message = '';
    var type = 'primary';
    if (selected_ids.length >= 1) {
        type = 'primary';
        message = `You have selected ${selected_ids.length} task(s).`;        
    } else {
        message = "No tasks selected. Please select at least one task to continue.";
        type = 'danger';
    }
    $(".bulk-alert-message h6").text(message).removeClass('p-2 text-danger text-primary border-danger border-primary').addClass(`p-2 text-${type} border border-2 border-${type} fw-bold mb-3`);

    $("#bulk-tasks-form").validate({
        onkeyup: false,
        rules: {
            queue_id: {
                required: '#is_assigned_0:checked'
            },
            engineer_id: {
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
    });
}

// approve job tasks
function checkvalue(val){
    val = $.trim(val);
    if(val == '' || val == undefined || val == null || val.length < 1){
        return false;
    }
    return true;
}

$(document).on("change", "#preferred_time_range", function (e, from = null) {
        
    var time_id = $(this).val();
    if (typeof time_id !== 'undefined' && time_id > 0 && !from)
    {
        ajs.ajax_form(site_url + "servicetime/get/" + time_id, null, "GET", null, "1", "1", function (data) {
            var start_apt_time = data.message.data.start_time || '';
            if (!isEmpty(start_apt_time)) {
                $('#appointment_time').val(ajs.convert_time_utc_to_local(start_apt_time));
            }
        });
    }
});

$(document).on("change", ".is_appointment_confirmed", async function () {
    var is_confirmed = $(this).val();
    if (is_confirmed == '1')
    {
        $("#appointment_time").prop('readonly',false);
    } else
    {
        $("#appointment_time").prop('readonly', true);
    }
    // read-and-clear at the top: this handler is async, so clearing after trigger() would race
    if (suppress_appt_confirm)
    {
        suppress_appt_confirm = false;
        return;
    }
    $('form.bulk-tasks-form input[name="appt_confirm"]').remove(); // answer changed, needs re-approval
    if (!await confirm_appt_mismatch())
    {
        suppress_appt_confirm = true;
        $(`input.is_appointment_confirmed[value="${is_confirmed == '1' ? '0' : '1'}"]`).prop('checked', true).trigger('change');
    }
});

$(document).on("click", "#assign-tasks-btn", async function () {
    if(!$("#bulk-tasks-form").valid()){
        return false;
    }   
    var type = $("input.task-assign:checked").val();
    var queue_id = $("select#queue_id").val();
    var engineer_id = $("select#engineer_id").val();
    var error = 0;

    var selected_tasks = await get_selected_task_ids();

    if(selected_tasks.length < 1){
        errormsg = "No tasks selected. Please select at least one task to proceed.";
        error = 1;
    }
    else if(type == '0' && !checkvalue(queue_id)){
        errormsg = "Queue not selected. Please select a queue for the tasks.";
        error = 1;
    }
    else if(type == '1' && !checkvalue(engineer_id)){
        errormsg = "Engineer not selected. Please assign an engineer to the tasks.";
        error = 1;
    }
    if(error == 1){
        Swal.fire({
            title: "Assignment Error",
            icon: "error",
            text: errormsg,
        });
        return false;
    }

    let requetUrl = `${site_url}tasks/bulk/assign`;
    var title = type == 2 ? 'unassign' : 'assign';
    $textMsg = `Are you sure you want to ${title} all ${selected_tasks.length} selected job tasks?`;
    if(selected_tasks.length <= 1){
        $textMsg = `Are you sure you want to ${title} ${selected_tasks.length} selected job task?`;
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
            
            var appoint_date = $("#appointment_date").val(); 
            var appoint_time = $("#appointment_time").val();
            // for converting local time to UTC
            if (appoint_date != '' && appoint_time != '') {
                var localTime = appoint_date + ' ' + appoint_time; 
                var utcTime = moment(localTime, "YYYY-MM-DD HH:mm").utc().format("YYYY-MM-DD HH:mm:ss");
                [appoint_date, appoint_time] = utcTime.split(' ');
                $("#appointment_date").val(appoint_date);
                $("#appointment_time").val(appoint_time);
            } else if (appoint_time != '') {
                appoint_time = ajs.convert_time_local_to_utc(appoint_time); 
                $("#appointment_time").val(appoint_time);
            }        
            let formData = $('form.bulk-tasks-form').serialize();
            let additionalData = {tasks: selected_tasks.join(",")};
            const fullData = formData + '&' + $.param(additionalData);

            const response = await ajaxWithRefresh({
                type: 'POST',
                url: requetUrl,
                data: fullData,
            });
            if (response.status == false) {
                if(response?.confirm){
                    // each gate names its own flag so multiple warnings chain instead of overriding each other
                    set_bulk_confirm_flag(response.confirm_field || 'confirm');
                    Swal.getConfirmButton().textContent = "Yes, Confirm";
                    return Swal.showValidationMessage(`
                        <strong>${response.message}</strong>
                    `);
                }else{
                    return Swal.showValidationMessage(`
                        <strong>Error: </strong> ${response.message}
                    `);
                }
            }
            return response;
        } catch (error) {
            console.log(error);
            var errorMsg = "Something went wrong.please try again...";
            if('responseJSON' in error){
                errorMsg = $(`<div>${error.responseJSON.message}</div>`).text();
            }
            Swal.showValidationMessage(`<strong>Error: </strong> ${errorMsg}`);
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
            reset_selection_state();
            ajs.refreshDataTable();//reload data
            $('button#close-modal').click();
        }
    });
});
// approve job tasks


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
                    $(checkboxes[i]).trigger("change");
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
