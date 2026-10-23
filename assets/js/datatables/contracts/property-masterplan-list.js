var master_data_type = 'contract_masterplan';
var selected_client = null;
var selected_property = null;
var schedule_start_date = new Date().toISOString().slice(0, 10);
var schedule_end_date = null;
// PPM_FREQUENCY_LETTERS is the shared name -> letter map, defined once in interface.js.
dataTable = null;
schedule_master = [];
schedule_master1 = [];

function create_breadcrumb_list(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {
        var client = selected_client = result_json.data?.client;
        var property = selected_property = result_json.data?.property;

        if(client_id > 0 && client) {
            var detail_url = 'clients/details/' + ajs.hash_encode(client.id);
            var breadcrumbs = [
                {label : 'Clients', url: cdn_url + 'clients/list'},
                {label : client.client_code, url: cdn_url + detail_url},
                {label : 'Properties', url: cdn_url + 'clients/'+ajs.hash_encode(client.id)+'/properties'},
                {label : property.uprn_no, url: cdn_url + 'clients/'+ajs.hash_encode(client.id)+'/properties/details/'+ajs.hash_encode(property.id)},
                {label : 'PPM Plans', url: null}
            ];
        } else {
            var breadcrumbs = [
                {label : 'Properties', url: cdn_url + 'properties/list'},
                {label : property.uprn_no, url: cdn_url + 'properties/details/' + ajs.hash_encode(property.id)},
                {label : 'PPM Plans', url: null}
            ];
        }

        set_breadcrumb(breadcrumbs);

        // set ppm log and schedule headers
        $('#ppm-data1').html('');
        $("#ajax-datatables1 tbody").html('');
        $("#ajax-datatables2 tbody").html('');
        $("#ppm-data1-head").html('');
        $("#ppm-data2-head").html('');
        
        // Use property-level dates from summary
        let endDate = new Date(result_json.data.end_year, 11, 31);
        if (isNaN(endDate.getTime())) {
            endDate = new Date();
        }
        schedule_end_date = new Date(endDate).toISOString().slice(0, 10);
        set_list_headers(result_json.data);
        
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

function load_data_table(limit, search_term, filters) {
    data_filters = {};
    page_limit = ajs.datatable_limit;
    search = "";    

    if (typeof filters !== "undefined" && (typeof filters["filters"] !== "undefined" || filters["filters"] != null)) {
        data_filters = filters["filters"];
    }
    if (typeof limit !== "undefined" || limit != null) {
        page_limit = limit;
    }
    if (typeof search_term !== "undefined" || search_term != null) {
        search = search_term;
    }

    dataTable = new DataTable("#ajax-datatables1", {
        serverSide: true,
        processing: true,
        paging: true,
        responsive: false,
        bDestroy: true,
        pageLength: ajs.datatable_limit,
        search: {
            search: search,
        },
        ajax: {
            url: site_url + "contract/masterplan/property_masterplans/" + property_id,
            method: "GET",
            dataSrc: "data",
            data: function (d) {
                return $.extend({}, d, { data_filters });
            },
            error: function (xhr) {
                ajs.datatable_error(xhr, "ajax-datatables1");
                if (xhr.status !== 200) {
                    $("#ajax-datatables1").html("<p>No data found.</p>");
                }
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
        },
        language: { emptyTable: "No data found" },
        order: [["0", "desc"]],
        columns: [
            { title: "id", data: "id", name: "id", visible: false },
            { title: "", data: null, searchable: false, orderable: false,
                render: function (_, __, row) {
                    var edit_icn = edit_icon();
                    var edit_btn = `<a href="javascript:void(0);" class="edit-ppm-field edit-btn" data-row-class="ppm-field-row-${row.schedule_id}">${edit_icn}</a>`;
                    if (row.schedule_status == '1') {
                        stop_btn = `<div class="form-check form-switch form-check-auto edit-btn"><input class="change-schedule-status form-check-input code-switcher me-1" type="checkbox" title="Active" data-schedule-id="` + row.schedule_id + `" data-name="status" value="1" checked></div>`;
                    } else {
                        stop_btn = `<div class="form-check form-switch form-check-auto edit-btn"><input class="change-schedule-status form-check-input code-switcher me-1" type="checkbox" title="Inactive" data-name="status" data-schedule-id="` + row.schedule_id + `" value="2"></div>`;
                    }
                    return edit_btn + stop_btn;
                }
            },
            { title: "Contract", data: "contract_number", name: "contract_number" },
            { title: "UPRN", data: "uprn_no", name: "uprn_no" },
            { title: "Postcode", data: "postalcode", name: "postalcode" },
            { title: "Job Type", data: "service_code", name: "service_code" },
            { title: "Freq.", data: "frequency_id", name: "frequency_id",
                render: function (data) {                    
                    return PPM_FREQUENCY_LETTERS[data] || data;
                }
            },
            { title: "Freq. Except", data: "frequency_except", name: "frequency_except" },
            { title: "Pricing Model", data: "sor_type", name: "sor_type",
                render: function (data) {
                    var label = 'SOR';
                    if (data == '2') label = 'Band Price';
                    else if (data == '3') label = 'Fixed Price';
                    return label;
                }
            },
            { title: "Asset", data: "asset_type", name: "asset_type" },
            { title: "Qty", data: "qty", name: "qty" },
            { title: "SOR", data: "sor_code", name: "sor_code", 
               render: function (data, type, row) {
                   return data || '';
               } 
            },
            { title: "Labor", data: "labor_price", name: "labor_price" },
            { title: "Sell", data: "sell_price", name: "sell_price" },
            { title: "Add to Queue", data: "add_to_queue_title", name: "add_to_queue_title" },
            { title: "Start Date", data: "start_date", name: "start_date", 
                render: function(data){ return ajs.format_date(data);} 
            },
            { data: "month_1", name: "month_1", searchable: false, orderable: false},
            { data: "month_2", name: "month_2", searchable: false, orderable: false},
            { data: "month_3", name: "month_3", searchable: false, orderable: false},
            { data: "month_4", name: "month_4", searchable: false, orderable: false},
            { data: "month_5", name: "month_5", searchable: false, orderable: false},
            { data: "month_6", name: "month_6", searchable: false, orderable: false},
            { data: "month_7", name: "month_7", searchable: false, orderable: false},
            { data: "month_8", name: "month_8", searchable: false, orderable: false},
            { data: "month_9", name: "month_9", searchable: false, orderable: false},
            { data: "month_10", name: "month_10", searchable: false, orderable: false},
            { data: "month_11", name: "month_11", searchable: false, orderable: false},
            { data: "month_12", name: "month_12", searchable: false, orderable: false},
            { data: "total_count", name: "total_count", searchable: false, orderable: false},
        ],
        rowCallback: function(row, data) {            
            if (data.schedule_status == 2) {
                $(row).addClass('table-danger');
            }
        },
        drawCallback: function () {
            ajs.apply_ind_roles("Properties");
        }
    });
}

if ($('#ajax-datatables1').length)
{
    ajs.ajax_form(site_url + "contract/masterplan/property_masterplan_summary/" + property_id, null, 'GET', null, '0', '1', create_breadcrumb_list, create_breadcrumb_list, 'PPM Plans List');
    load_data_table();
}

$(document).on('click', '.add-masterplan-row-btn', function (e) {
    var total_rows = $('#total_mp').val();
    var new_row = parseInt(total_rows) + parseInt(1);
    add_masterplan_row(new_row);
});
$(document).on('click', '.save-masterplan-btn', function (e) {
    // console.log('Saving Masterplan...');
    if ($("#manual_mp_form").valid()) {
        // Validate that all SOR, Frequency, and (if Unit Price) sor_id_hidden fields are not empty
        var total_rows = $('#total_mp').val();
        var sorValidationFailed = false;
        var frequencyValidationFailed = false;
        var sorIdHiddenValidationFailed = false;
        var emptySorRows = [];
        var emptyFrequencyRows = [];
        var emptySorIdHiddenRows = [];

        for (var i = 1; i <= total_rows; i++) {
            var sorValue = $('#sor_' + i).val();
            var frequencyValue = $('#frequency_' + i).val();
            var sorTypeValue = $('#sor_type_' + i).val();
            var sorIdHiddenValue = $('#sor_id_hidden_' + i).val();            
            
            if (!frequencyValue || frequencyValue.trim() === '') {
                frequencyValidationFailed = true;
                emptyFrequencyRows.push(i);
            }

            // If sor_type is 2 (Unit Price), check sor_id_hidden is not empty
            if (sorTypeValue == '2' || sorTypeValue == 'Band Price') {
                if (!sorIdHiddenValue || sorIdHiddenValue.trim() === '') {
                    sorIdHiddenValidationFailed = true;
                    emptySorIdHiddenRows.push(i);
                }
            }else{
                if (!sorValue || sorValue.trim() === '') {
                    sorValidationFailed = true;
                    emptySorRows.push(i);
                }
            }
        }

        if (sorValidationFailed || frequencyValidationFailed || sorIdHiddenValidationFailed) {
            var errorMsg = '';
            if (sorValidationFailed) {
                errorMsg += 'SOR is required for row(s): ' + emptySorRows.join(', ') + '\n';
            }
            if (frequencyValidationFailed) {
                errorMsg += 'Frequency is required for row(s): ' + emptyFrequencyRows.join(', ') + '\n';
            }
            if (sorIdHiddenValidationFailed) {
                errorMsg += 'SOR ID is required for Band Price row(s): ' + emptySorIdHiddenRows.join(', ');
            }
            Swal.fire({
                title: `Error!!`,
                icon: "error",
                text: errorMsg
            });
            return false;
            // alert(errorMsg.trim());
            return;
        }
        var post_data = $('#manual_mp_form').serialize();
        ajs.ajax_form(site_url + 'property_masterplan/create', post_data, 'POST', null, '1', '1', ajs_form_handler.api_response, ajs_form_handler.api_response);
        $('#schedule_setupM').trigger("click");
        //ajs.refreshDataTable();
        load_data_table();
    } else {

    }

});

function set_list_headers(schedule) {
    schedule_master = [];
    const startYear = parseInt(schedule.start_year, 10);
    const endYear = parseInt(schedule.end_year, 10);
    const startMonth = schedule.start_month;
    const endMonth = schedule.end_month;
    const fullMonthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthAbbr = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let startMonthIndex = fullMonthNames.indexOf(startMonth);
    let endMonthIndex = fullMonthNames.indexOf(endMonth);
    let totalMonths = (endYear - startYear) * 12 + (endMonthIndex - startMonthIndex + 1);
    var $cells = $("<tr><th>id</th><th></th><th>Contract</th><th>UPRN</th><th>Postcode</th><th>Job Type</th><th>Freq.</th><th>Freq. Except</th><th>Pricing Model</th><th>Asset</th><th>Qty</th><th>SOR</th><th>Labor</th><th>Sell</th><th>Add to Queue</th><th>Start Date</th></tr>");
    for (let i = 0; i < totalMonths; i++) {
        let year = startYear + Math.floor((startMonthIndex + i) / 12);
        let month = (startMonthIndex + i) % 12;
        var cellContent = `${monthAbbr[month]}/${year.toString().slice(-2)}`;
        schedule_master.push({month: fullMonthNames[month], year: year});
        var $cell = $("<th class='text-center'></th>").text(cellContent);
        $cells.append($cell);
    }
    $cells.append($("<th class='text-center'></th>").text('Total'));
    $("#ppm-data1-head").append($cells);
}

$('#export_contract_masterplan').on('click', function (e) {
    var column_visibility = getColumnVisibilityState(dataTable);
    var filters = $('#form_filters').serializeArray();
    var new_filters = {};
    new_filters['filters'] = {};
    new_filters['searchTerm'] = '';
    new_filters['pagLimit'] = ajs.datatable_limit;
    var new_limit = ajs.datatable_limit;
    var i = 0;
    filters.forEach(function (item) {
        if (item.name == 'table_length') {
            new_limit = item.value;
            new_filters['pagLimit'] = item.value;
        } else if (item.name == 'search_term') {
            new_filters['searchTerm'] = item.value;
        } else {
            if (item.value != '' && item.value != null) {
                name = item.name.replace("_filter", "");
                if ($('#' + item.name).length) {
                    var table_name = $('#' + item.name).data('table-name');
                    if (typeof table_name !== 'undefined') {
                        name = table_name + '.' + name;
                    }
                }
                new_filters['filters'][name] = item.value;
                i++;
            }
        }
    });

    Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to export?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        denyButtonText: "Cancel",
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Processing...',
                text: 'Please wait while exporting masterplan.',
                allowOutsideClick: false,
                didOpen: () => { Swal.showLoading(); }
            });
            await new Promise(r => setTimeout(r, 50));
            export_masterplan('contract', new_limit, new_filters['searchTerm'], new_filters.filters, column_visibility);
        }
    });
});

function export_masterplan(data_type, limit, search_term, filters, column_visibility)
{
    filters = filters || {};
    var post_data = {type: data_type, filters: filters, search: {value: search_term}, column_visibility: column_visibility};
    ajs.ajax_form(site_url + data_type + '/export/property_masterplans/' + property_id, post_data, 'GET', null, '1', '1', ajs_form_handler.api_response, ajs_form_handler.api_response);
}

ajs.apply_ind_roles('Properties');

function buildDatatableEditRow(rowData) {
    var scheduleId = rowData.schedule_id;
    var url = site_url + 'contract_masterplan/update/' + scheduleId;
    var startDate = rowData.start_date || '';
    var queueId = rowData.queue_id || '';
    return `
    <form id="ppm-form-${scheduleId}" action="${url}" method="post">
    <div class="row align-items-end ms-5 mb-1 mt-1 gx-3">
    <input type="hidden" name="contract_id" id="contract_id_${scheduleId}" value="${rowData.contract_id}" />
    <div class="col-md-1">
        <label class="fw-bold">Job Type</label>
        <select class="form-control select2" required name="service_id" id="edit_service_${scheduleId}" data-value="${rowData.service_id}">
            <option value=''></option>
        </select>
    </div>
    <div class="col-md-1">
        <label class="fw-bold">Freq.</label>
        <select class="form-control" required name="frequency_id" id="edit_frequency_${scheduleId}" data-value="${rowData.frequency_id}">
            <option value=''></option>
            <option value="Weekly" ${rowData.frequency_id == 'Weekly' ? 'selected' : ''}>W</option>
            <option value="Monthly" ${rowData.frequency_id == 'Monthly' ? 'selected' : ''}>M</option>
            <option value="Quarterly" ${rowData.frequency_id == 'Quarterly' ? 'selected' : ''}>Q</option>
            <option value="Half Yearly" ${rowData.frequency_id == 'Half Yearly' ? 'selected' : ''}>H</option>
            <option value="Yearly" ${rowData.frequency_id == 'Yearly' ? 'selected' : ''}>A</option>
        </select>
    </div>
    <div class="col-md-1">
        <label class="fw-bold">Freq. Except</label>
        <select class="form-control" name="frequency_except[]" id="edit_frequency_except_${scheduleId}" data-value="${rowData.frequency_except}">
            <option value=''></option>
        </select>
    </div>
    <div class="col-md-1">
        <label class="fw-bold">Pricing Model</label>
        <select class="form-control sor_type_mp_edit" data-row-num="${scheduleId}" name="sor_type" id="edit_sor_type_${scheduleId}">
            <option value="1" ${rowData.sor_type == '1' ? 'selected' : ''}>SOR</option>
            <option value="2" ${rowData.sor_type == '2' ? 'selected' : ''}>Band Price</option>
            <option value="3" ${rowData.sor_type == '3' ? 'selected' : ''}>Fixed Price</option>
        </select>
    </div>
    <div class="col-md-1">
        <label class="fw-bold">Asset</label>
        <select class="form-control asset_selector_edit" data-property-id="${rowData.property_id}" data-value="${rowData.client_property_asset_type_id}" id="edit_asset_${scheduleId}" name="asset_type">
            <option value=''></option>
        </select>
        <input type="hidden" name="asset_ids" id="edit_asset_ids_${scheduleId}" value="${rowData.client_property_asset_id}"/> 
    </div>
    <div class="col-md-1">
        <label class="fw-bold">Qty</label>
        <input type="number" class="form-control"  name="qty" id="edit_qty_${scheduleId}" value="${rowData.qty || 1}" ${rowData.sor_type == '2' ? 'readonly' : ''}/>
    </div>
    <div class="col-md-1">
        <label class="fw-bold">SOR</label>
        <div class="d-flex error-div">
            <select class="form-control sor_property_plan_edit" data-row-num="${scheduleId}" required name="sor_id" id="edit_sor_${scheduleId}" data-value="${rowData.sor_id}" data-filters='${JSON.stringify({'sors.client_id': selected_client.id})}'>
                <option value=''></option>
            </select>
            <input type="hidden" name="sor_id_hidden" id="edit_sor_id_hidden_${scheduleId}" value="${rowData.sor_id}"/>
            <button type="button" class="btn btn-primary ms-1 popup-form-search-button popup-add-btn" data-heading="Search SORs" data-element="edit_sor_${scheduleId}" data-after-load-func="set_sor_from_search" data-form-url="${cdn_url}system/sor/search-list">
                <i class="mdi mdi-magnify search-widget-icon"></i>
            </button>
        </div>
    </div>                    
    <div class="col-md-1">
        <label class="fw-bold">Labor</label>
        <input type="number" class="form-control labor-value text-end" data-row-num="${scheduleId}"  name="labor_price" id="edit_labor_price_${scheduleId}" ${rowData.sor_type == '3' ? '' : 'readonly'} value="${rowData.labor_price}" />
    </div>
    <div class="col-md-1">
        <label class="fw-bold">Sell</label>
        <input type="number" class="form-control sell-value text-end" data-row-num="${scheduleId}"  name="sell_price" id="edit_sell_price_${scheduleId}" ${rowData.sor_type == '3' ? '' : 'readonly'} value="${rowData.sell_price}" />
    </div>
    <div class="col-md-1">
        <label class="fw-bold">Start Date</label>
        <input type="date" class="form-control schedule-start-date" required name="start_date" id="edit_start_date_${scheduleId}" value="${startDate}" />
    </div>
    <div class="col-md-1">
        <label class="fw-bold">Add to Queue</label>
        <select class="form-control add_to_queue_selector select2" name="add_to_queue" id="edit_add_to_queue_${scheduleId}" data-value="${queueId}" data-value_id="${queueId}">
            <option value=''>Select Queue</option>
        </select>
    </div>
    <div class="col-md-1">
        <button type="button" title="Update" class="update-ppm-row btn btn-sm btn-success" data-row-num="${scheduleId}">Update</button>
        <button type="button" title="Cancel" class="cancel-ppm-row btn btn-sm btn-light">Cancel</button>
    </div>
    </div>
    </form>
    `;
}

$(document).on('click', '#ajax-datatables1 .edit-ppm-field', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (typeof dataTable === 'undefined' || !dataTable) return;
    var $btn = $(this);
    var $tr = $btn.closest('tr');
    var dtRow = dataTable.row($tr);
    if (!dtRow || !dtRow.node()) return;
    if (dtRow.child.isShown()) {
        dtRow.child.hide();
        return;
    }
    var rowData = dtRow.data();
    if (!rowData) return;
    dtRow.child(buildDatatableEditRow(rowData)).show();
    var scheduleId = rowData.schedule_id;
    select2_ajax('#edit_service_' + scheduleId, site_url + 'service/contract_services_get_all/' + rowData.contract_id, 'service_code', null, 'body', rowData.service_id);
    select2_ajax('#edit_add_to_queue_' + scheduleId, site_url + 'queue/get_all', 'title', null, 'body', rowData.queue_id);
    
    set_sor(rowData.sor_id, 'edit_sor_' + scheduleId, rowData.service_id);
    add_autocomplete_custom_dropdown('#edit_asset_' + scheduleId, site_url + 'asset/property-assets-type/' + (rowData.property_id || ''), ['equipment_type', 'total_quantity'], null, 'body', rowData.client_property_asset_type_id, null, site_url + 'asset/property-assets-type/' + (rowData.property_id || '') + '/' + (rowData.client_property_asset_type_id || ''));
    edit_updateFrequencyExceptionOptions(scheduleId, rowData.frequency_id, rowData.frequency_except);
    ajs.ajax_form(site_url + 'contract/get/' + rowData.contract_id, null, 'GET', null, '1', '1', function (resp) {
        var res = resp && resp.data ? resp.data : null;
        if (res) {
            $('#edit_start_date_' + scheduleId).attr('min', res.start_date);
        }
    }, function (xhr) { console.error('Failed to fetch contract details'); });
});

$(document).on('change', '.sor_property_plan', function (e) {
    var row_num = $(this).data('row-num');
    var sor_id = $(this).val();
    
    if (sor_id && sor_id.length > 0) {
        $.ajax({
            url: site_url + "sor/get/"+sor_id,
            type: "GET",
            dataType: "json",
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            
            success: function (data) {
                var res_data = data.message.data;     
                $('#labor_' + row_num).val(res_data.labor_price);
                $('#sell_' + row_num).val(res_data.sell_price);
                $('#sell_value_original_' + row_num).val(res_data.sell_price);
                $('#sor_id_hidden_' + row_num).val(sor_id);
                // Determine readonly state based on SOR Type (1: SOR, 2: Unit Price, 3: Fix Price)
                var sorType = $('#sor_type_' + row_num).val();
                if (sorType == '3') {
                    // Fix Price: allow editing
                    $('#labor_' + row_num).prop('readonly', false);
                    $('#sell_' + row_num).prop('readonly', false);
                    $('#qty_' + row_num).prop('readonly', false);
                } else if (sorType == '2') {
                    // Unit Price: derived from asset; all non-editable
                    $('#labor_' + row_num).prop('readonly', true);
                    $('#sell_' + row_num).prop('readonly', true);
                    $('#qty_' + row_num).prop('readonly', true);
                } else {
                    // SOR default: readonly prices, qty editable
                    $('#labor_' + row_num).prop('readonly', true);
                    $('#sell_' + row_num).prop('readonly', true);
                    $('#qty_' + row_num).prop('readonly', false);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching SOR values:", error);
            }
        });
    } else {
        $('#labor_' + row_num).val(0);
        $('#sell_' + row_num).val(0);
    }
});
$(document).on('change', '.sor_property_plan_edit', function (e) {
    var row_num = $(this).data('row-num');
    var sor_id = $(this).val();
    
    if (sor_id && sor_id.length > 0) {
        $.ajax({
            url: site_url + "sor/get/"+sor_id,
            type: "GET",
            dataType: "json",
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            
            success: function (data) {
                var res_data = data.message.data;             
                $('#edit_labor_price_' + row_num).val(res_data.labor_price);
                $('#edit_sell_price_' + row_num).val(res_data.sell_price);

                // For edit modal/row - determine editability from edit SOR Type
                var editSorType = $('#edit_sor_type_' + row_num).val();
                if (editSorType == '3' || editSorType == 'fix') {
                    $('#edit_labor_price_' + row_num).prop('readonly', false);
                    $('#edit_sell_price_' + row_num).prop('readonly', false);
                } else {
                    $('#edit_labor_price_' + row_num).prop('readonly', true);
                    $('#edit_sell_price_' + row_num).prop('readonly', true);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching SOR values:", error);
            }
        });
    } else {
        $('#edit_labor_price_' + row_num).val(0);
        $('#edit_sell_price_' + row_num).val(0);
    }
});



function add_masterplan_row(row_num)
{
    $('#total_mp').val(row_num);
    var row_html = `<tr class="mp_row_` + `_` + row_num + ` dynamic_mp_row">
            <td width="15%">
                <select class="form-control select2"  name="contract_` + row_num + `" id="contract_` + row_num + `">
                        <option value=''></option>
                </select>
            </td>
            <td width="10%">
                <select class="form-control" data-row-num="` + row_num + `" name="service_` + row_num + `" id="service_` + row_num + `">
                        <option value=''></option>
                </select>                    
            </td>
            <td width="8%">
                <select class="form-control" data-row-num="` + row_num + `" name="frequency_` + row_num + `" id="jan_` + row_num + `">
                        <option value=''></option>
                        <option value="Weekly">W</option>
                        <option value="Quarterly">Q</option>
                        <option value="Monthly">M</option>
                        <option value="Half Yearly">H</option>
                        <option value="Yearly">A</option>
                </select>                
            </td>
            <td class="align-top">
                <select class="form-control" name="frequency_except_` + row_num + `[]" id="frequency_except_` + row_num + `" multiple>
                </select>
            </td>
            <td class="align-top">
                <select class="form-control sor_type_mp" data-row-num="` + row_num + `" name="sor_type_` + row_num + `" id="sor_type_` + row_num + `">
                    <option value="1">SOR</option>
                    <option value="2">Band Price</option>
                    <option value="3">Fixed Price</option>
                </select>                                
            </td>
            <td class="align-top property_assets">
                <select class="form-control asset_selector" id="asset_` + row_num + `" name="asset_` + row_num + `">
                    <option value=''></option>
                </select>
                <input type="hidden" name="asset_ids_` + row_num + `" id="asset_ids_` + row_num + `" />
            </td>
            <td class="align-top">
                <input type="number" data-row-num="` + row_num + `" class="form-control qty-value" value='1' name="qty_` + row_num + `" id="qty_` + row_num + `" />
            </td>
            <td width="20%" class="align-top searchBtn-selectOption-box-fixed">
            <div class="d-flex error-div">
                <select class="form-control" data-row-num="` + row_num + `" name="sor_` + row_num + `" id="sor_` + row_num + `" data-filters='` + JSON.stringify({'sors.client_id': client_id, property_id: property_id}) + `'>
                    <option value=''></option>
                </select>
                <button type="button" class="btn btn-primary ms-1 popup-form-search-button popup-add-btn" data-heading="Search SORs" data-element="sor_` + row_num + `" data-after-load-func="set_sor" data-form-url="${cdn_url}system/sor/search-list"><i class="mdi mdi-magnify search-widget-icon"></i></button> 
                </div>                   
            </td>
            <td class="align-top">
                <input type="number" class="form-control labor-value text-end" value='0' name="labor_` + row_num + `" id="labor_` + row_num + `" />
            </td>
            <td class="align-top">
                <input type="number" class="form-control sell-value text-end" value='0' name="sell_` + row_num + `" id="sell_` + row_num + `" />
            </td>
            <td class="align-top">
                <input type="date" class="form-control schedule-start-date" required name="start_date_` + row_num + `" id="start_date_` + row_num + `" />
            </td>
            <td class="align-top">
                <select class="form-control add_to_queue_selector select2" name="add_to_queue_` + row_num + `" id="add_to_queue_` + row_num + `" data-row-num="` + row_num + `">
                    <option value=''>Select Queue</option>
                </select>
            </td>
            <td class="align-top">
                <input type="radio"  checked="checked" id="create_job_` + row_num + `_y" name="create_job_` + row_num + `" value="1" /><label for="create_job_` + row_num + `_y">Yes</label>
                <input type="radio" id="create_job_` + row_num + `_n" name="create_job_` + row_num + `" value="0" /><label for="create_job_` + row_num + `_n">No</label>
            </td>
            <td >
                <button type="button" class="btn btn-danger delete-ppm-row">
                    <i class="ri-close-line"></i>
                </button>
            </td>
        </tr>`;
    $('.mp_row_parent').append(row_html);
    select2_ajax('#contract_' + row_num, site_url + 'contract/get_all', 'uprn_no', {client_id: client_id,type:'ppm'});

    select2_ajax("#add_to_queue_" + row_num, site_url + "queue/get_all", "title", null);

    add_autocomplete_custom_dropdown('#asset_'+row_num, site_url + 'asset/property-assets-type/'+property_id, ["equipment_type", "total_quantity"], null, 'body', null, false);
    $('#frequency_except_' + row_num).select2({
        placeholder: 'Select exceptions',
        allowClear: true,
        multiple: true
    });
    $('#sor_type_' + row_num).val('1').trigger('change');
    $('#sor_' + row_num).attr('data-filters', JSON.stringify({'sors.client_id': client_id}));
    $('#contract_' + row_num).on('change', function (e) {

        var contract_id = $(this).val();
        if (typeof contract_id !== 'undefined' && contract_id > 0)
        {
            ajs.ajax_form(site_url + "contract/get/" + contract_id, null, "GET", null, "1", "1", function (data) {
                selected_contract = data.data;
                console.log(selected_contract);
                // schedule_end_date = new Date(selected_contract.end_date).toISOString().slice(0, 10);

                select2_ajax('#service_' + row_num, site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
                select2_tag('#sor_' + row_num, site_url + 'sor/get_all', 'sor_code', {'sors.client_id': client_id, contract_id: contract_id}, 'body', null, true);

                // var filters = {'sors.client_id': client_id, 'contract_id': contract_id};
                // if (service_id) {
                //     filters['job_type_id'] = service_id;
                // }

                // add_autocomplete_custom_dropdown('#sor_' + row_num, site_url + 'sor/get_all_dropdown', ["sor_code"], filters, 'body', null, true);

                $('#sor_' + row_num).attr('data-filters', JSON.stringify({'sors.client_id': client_id, contract_id: contract_id}));
                $('#property_' + row_num).val('').trigger('change');
                $("#start_date_" + row_num).val(schedule_start_date);
                $("#end_date_" + row_num).val(schedule_end_date);

                $("#start_date_" + row_num).attr('min', schedule_start_date);
                $("#start_date_" + row_num).attr('max', schedule_end_date);
                $("#end_date_" + row_num).attr('min', schedule_start_date);
                $("#end_date_" + row_num).attr('max', schedule_end_date);

            });
        }
    });


}
// When any service selector changes, update its corresponding SOR dropdown to include job_type_id filter
$(document).on('change', 'select[id^="service_"]', function (e) {
    var id = $(this).attr('id');
    var parts = id.split('_');
    var row_num = parts[1];
    var service_id = $(this).val();

    // console.log('Service changed for row:', row_num, 'New service_id:', service_id);

    // Reset fields on service/jobtype change
    $('#frequency_' + row_num).val('').trigger('change');
    $('#sor_type_' + row_num).val('1').trigger('change');
    $('#sor_' + row_num).val('').trigger('change');
    $('#asset_' + row_num).val('').trigger('change');
    $('#labor_' + row_num).val(0);
    $('#sell_' + row_num).val(0);
    $('#qty_' + row_num).val('');

    var $sor = $('#sor_' + row_num);
    if (!$sor.length) return;

    // clear existing SOR selection
    $sor.val('').trigger('change');

    // var filters = {'sors.client_id': selected_contract.client_id, 'contract_id': selected_contract.id};
    // if (service_id) {
    //     filters['job_type_id'] = service_id;
    // }

    //add_autocomplete_custom_dropdown('#sor_' + row_num, site_url + 'sor/get_all_dropdown', ["sor_code"], filters, 'body', null, true);
    set_sor(null, 'sor_' + row_num, service_id); // Clear SOR selection and update options based on new service
});

// When asset selected (Unit Price), auto-populate qty and asset_ids (for equipment-type selection) or fall back to single asset behavior
$(document).on('change', 'select[id^=asset_]', function (e) {
    var id = $(this).attr('id');
    var parts = id.split('_');
    var row_num = parts[1];
    var $select = $(this);

    // Attempt to get full select2 selected data (if select2/autocomplete used)
    var selData = null;
    try { selData = $select.select2('data')[0]; } catch (err) { selData = null; }
    // console.log('Selected asset data:', selData);   
    // If the select2 item contains aggregated asset info (asset_ids + total_quantity), use that
    if (selData && selData.item && (selData.item.asset_ids !== undefined || selData.item.total_quantity !== undefined)) {
        var item = selData.item;
        var total_q = (item.total_quantity !== undefined && item.total_quantity !== null) ? parseInt(item.total_quantity) : 1;
        $('#qty_' + row_num).val(total_q).prop('readonly', true);
        $('#labor_' + row_num).val(0).prop('readonly', true);
        $('#sell_' + row_num).val(0).prop('readonly', true);

        // Store asset_ids array (as JSON string) in hidden field for server-side use if needed
        var assetIdsValue = [];
        if (Array.isArray(item.asset_ids)) {
            assetIdsValue = item.asset_ids.map(function(v){ return parseInt(v); });
        } else if (typeof item.asset_ids === 'string' && item.asset_ids.length > 0) {
            assetIdsValue = item.asset_ids.split(',').map(function(v){ return parseInt(v); });
        }
        $('#asset_ids_' + row_num).val(JSON.stringify(assetIdsValue));

        // If this row is Unit Price (sor_type == 2), attempt to fetch unit pricing for the selected service and qty
        var sorType = $('#sor_type_' + row_num).val();
        if (sorType == '2' || sorType == 'unit') {
            var service_id = $('#service_' + row_num).val();
            if (selected_contract && selected_contract.id && service_id) {
                ajs.ajax_form(site_url + 'contract_masterplan/unit_price', {contract_id: selected_contract.id, service_id: service_id, qty: total_q}, 'GET', null, '1', '1', function (resp) {
                    var res = resp && resp.message ? resp.message.data : null;
                    if (res) {
                        if (res.sor_id) {
                            $('#sor_id_hidden_' + row_num).val(res.sor_id);
                            set_sor(res.sor_id, 'sor_' + row_num, service_id);
                        }
                        $('#labor_' + row_num).val(res.labor_price || 0).prop('readonly', true);
                        $('#sell_' + row_num).val(res.sell_price || 0).prop('readonly', true);
                        $('#sell_value_original_' + row_num).val(res.sell_price || 0);
                    }
                }, function (xhr) { console.error('Failed to fetch band pricing'); });
            }
        }

        return;
    }

    // Fallback: selection might be an individual asset id — keep previous behavior
    var asset_id = $select.val();
    if (!asset_id) {
        $('#qty_' + row_num).val(1).prop('readonly', false);
        $('#labor_' + row_num).val(0).prop('readonly', true);
        $('#sell_' + row_num).val(0).prop('readonly', true);
        $('#asset_ids_' + row_num).val('');
        // If unit price mode, clear any unit pricing that might have been applied
        var sorType = $('#sor_type_' + row_num).val();
        if (sorType == '2' || sorType == 'unit') {
            // leave labor/sell readonly but zeroed
            $('#labor_' + row_num).prop('readonly', true);
            $('#sell_' + row_num).prop('readonly', true);
        }
        return;
    }

    ajs.ajax_form(site_url + 'asset/get/' + asset_id, null, 'GET', null, '1', '1', function (data) {
        var asset = (data && data.message && data.message.data) ? data.message.data : (data && data.data ? data.data : null);
        if (!asset) return;

        $('#qty_' + row_num).val(asset.quantity || 1).prop('readonly', true);
        $('#asset_ids_' + row_num).val(JSON.stringify([parseInt(asset.id)]));

        var sor_id = asset.sor_code_id || asset.sor_code;

        // If this row is Unit Price (sor_type == 2) we prefer contract unit pricing over asset SOR        

        var sorType = $('#sor_type_' + row_num).val();
        if ((sorType == '2' || sorType == 'unit') && selected_contract && selected_contract.id) {
            var service_id = $('#service_' + row_num).val();
            var qty_val = parseInt($('#qty_' + row_num).val()) || 1;
            if (service_id) {
                ajs.ajax_form(site_url + 'contract_masterplan/unit_price', {contract_id: selected_contract.id, service_id: service_id, qty: qty_val}, 'GET', null, '1', '1', function (resp) {
                    var res = resp && resp.message ? resp.message.data : null;
                    if (res) {
                        if (res.sor_id) {
                            $('#sor_id_hidden_' + row_num).val(res.sor_id);
                            set_sor(res.sor_id, 'sor_' + row_num, service_id);
                        } else if (sor_id) {
                            set_sor(sor_id, 'sor_' + row_num, service_id);
                        }
                        $('#labor_' + row_num).val(res.labor_price || 0).prop('readonly', true);
                        $('#sell_' + row_num).val(res.sell_price || 0).prop('readonly', true);
                        $('#sell_value_original_' + row_num).val(res.sell_price || 0);
                    } else if (sor_id) {
                        // Fallback to asset SOR prices
                        set_sor(sor_id, 'sor_' + row_num, service_id);
                        $.ajax({
                           url: site_url + "sor/get/" + sor_id,
                           type: "GET",
                           dataType: "json",
                           beforeSend: function (xhr, settings) { ajs.set_auth_header(xhr, settings); },
                           success: function (d) {
                               var resd = d.message.data;
                               $('#labor_' + row_num).val(resd.labor_price).prop('readonly', true);
                               $('#sell_' + row_num).val(resd.sell_price).prop('readonly', true);
                               $('#sell_value_original_' + row_num).val(resd.sell_price);
                           }
                        });
                    }
                }, function (xhr) { console.error('Failed to fetch band pricing'); });
            } else if (sor_id) {
                // No service selected - fallback to asset SOR
                set_sor(sor_id, 'sor_' + row_num, service_id);
            }
        } else {
            var service_id = $('#service_' + row_num).val();
            if (sor_id) {
                // Set SOR value and fetch its prices
                set_sor(sor_id, 'sor_' + row_num, service_id);
                $.ajax({
                   url: site_url + "sor/get/" + sor_id,
                   type: "GET",
                   dataType: "json",
                   beforeSend: function (xhr, settings) { ajs.set_auth_header(xhr, settings); },
                   success: function (d) {
                       var res = d.message.data;
                       $('#labor_' + row_num).val(res.labor_price);
                       $('#sell_' + row_num).val(res.sell_price);
                       $('#sell_value_original_' + row_num).val(res.sell_price);
                       // In Unit Price mode these should be readonly
                       $('#labor_' + row_num).prop('readonly', true);
                       $('#sell_' + row_num).prop('readonly', true);
                   }
                });
            }
        }
    }, function (xhr) { console.error('Failed to fetch asset'); });
});

// Helper to toggle Assets column (<th> and <td>) visibility — always visible per user request
function updateAssetsColumnVisibility() {
    // Assets column should always be visible
    $('.property_assets').show();
}

// Helper to show/hide a select and its select2 container when present
function showSelectWithSelect2($el) {
    $el.show();
    // Initialize select2 if element has select2 class but not yet initialized
    if ($el.hasClass('select2') && $el.next('.select2-container').length === 0) {
        try { $el.select2({width: 'resolve'}); } catch (e) { /* ignore if select2 not available */ }
    }
    if ($el.hasClass('select2-hidden-accessible')) {
        $el.next('.select2-container').show();
    }
}
function hideSelectWithSelect2($el) {
    $el.hide();
    if ($el.hasClass('select2-hidden-accessible')) {
        $el.next('.select2-container').hide();
    }
}

function set_sor_from_search(sor_id, element_id) {
    var service_id = $('#' + element_id).closest('tr').find('select[id^="service_"]').val() || null;
    set_sor(sor_id, element_id, service_id, true);
}
function set_sor(id, element, service_id = null, is_need_trigger_change = false) {
    var contract_id = $('#' + element).closest('tr').find('[id^="contract_"]').val() || null;
    
    var filters = {'sors.client_id': selected_client?.id};

    var sor_filters = {
        'sors.client_id': selected_client?.id,
    };
    if (contract_id) {
        filters['contract_id'] = contract_id;
        sor_filters['sor_contracts.contract_id'] = contract_id;
    }
    if (service_id) {
        filters['job_type_id'] = service_id;
        sor_filters['job_type_id'] = service_id;
    }

    add_autocomplete_custom_dropdown('#' + element, site_url + 'sor/get_all_dropdown', ["sor_code"], filters, 'body', id, null, site_url + 'sor/get/'+id, is_need_trigger_change);
    $("#" + element).attr('data-filters', JSON.stringify(sor_filters));
}

// When SOR Type changes per row, show assets and adjust field states
$(document).on('change', '.sor_type_mp', function (e) {
    var row_num = $(this).data('row-num');
    var val = $(this).val();

    // Reset SOR, labor, sell, and sell_value_original on sor_type change
    $('#asset_' + row_num).val('').trigger('change');
    $('#sor_' + row_num).val('').trigger('change');
    $('#labor_' + row_num).val(0);
    $('#sell_' + row_num).val(0);
    $('#sell_value_original_' + row_num).val(0);
    $('#qty_' + row_num).val('');

    // Always show asset select (user requested assets visible for all SOR types)
    showSelectWithSelect2($('#asset_' + row_num));

    if (val == '2' || val == 'unit') {
        // Unit Price: SOR will be populated from asset/contract pricing via hidden field
        // Disable visible SOR select for display only
        $('#sor_' + row_num).prop('disabled', true);
        $('#sor_id_hidden_' + row_num).val('');
        $('#labor_' + row_num).prop('readonly', true);
        $('#sell_' + row_num).prop('readonly', true);
        $('#qty_' + row_num).prop('readonly', true);
        // Trigger property change to populate assets if property already selected
        $('#property_' + row_num).trigger('change');
    } else if (val == '3' || val == 'fix') {
        // Fix Price: SOR selectable and prices editable
        $('#sor_' + row_num).prop('disabled', false);
        $('#sor_id_hidden_' + row_num).val('');
        $('#labor_' + row_num).prop('readonly', false);
        $('#sell_' + row_num).prop('readonly', false);
        $('#qty_' + row_num).prop('readonly', false);
    } else {
        // SOR default: SOR selectable and prices readonly
        $('#sor_' + row_num).prop('disabled', false);
        $('#sor_id_hidden_' + row_num).val('');
        $('#labor_' + row_num).prop('readonly', true);
        $('#sell_' + row_num).prop('readonly', true);
        $('#qty_' + row_num).prop('readonly', false);
    }

    // Ensure header is visible (idempotent)
    updateAssetsColumnVisibility();
});

// Edit modal SOR Type handler
$(document).on('change', '.sor_type_mp_edit', function (e) {
    var row_num = $(this).data('row-num');
    var val = $(this).val();

    // Reset SOR, labor, sell on sor_type change
    $('#edit_asset_' + row_num).val('').trigger('change');
    $('#edit_sor_' + row_num).val('').trigger('change');
    $('#edit_sor_id_hidden_' + row_num).val('');
    $('#edit_labor_price_' + row_num).val(0);
    $('#edit_sell_price_' + row_num).val(0);
    $('#edit_qty_' + row_num).val('');

    if (val == '2' || val == 'unit') {
        
        // SOR will be populated from asset/contract pricing via hidden field; disable for display only
        $('#edit_sor_' + row_num).prop('disabled', true);
        $('#edit_labor_price_' + row_num).prop('readonly', true);
        $('#edit_sell_price_' + row_num).prop('readonly', true);
        // populate assets for the property if data-property-id available (use aggregated equipment-type endpoint)
        var property_id = $('#edit_asset_' + row_num).data('property-id');
        if (property_id) {
            add_autocomplete_custom_dropdown('#edit_asset_'+row_num, site_url + 'asset/property-assets-type/'+property_id, ["equipment_type","total_quantity"], null, 'body', null, false);
            
        } 
    } else if (val == '3' || val == 'fix') {
        
        $('#edit_sor_' + row_num).prop('disabled', false);
        $('#edit_labor_price_' + row_num).prop('readonly', false);
        $('#edit_sell_price_' + row_num).prop('readonly', false);
    } else {
        
        $('#edit_sor_' + row_num).prop('disabled', false);
        $('#edit_labor_price_' + row_num).prop('readonly', true);
        $('#edit_sell_price_' + row_num).prop('readonly', true);
    }

    // Update the header/column visibility for all rows (edit changes may also affect display)
    updateAssetsColumnVisibility();
});

// When asset selected in edit modal
$(document).on('change', 'select[id^=edit_asset_]', function (e) {
    var id = $(this).attr('id');
    var parts = id.split('_');
    var row_num = parts[2];
    var $select = $(this);
    var contract_id = $('#contract_id_' + row_num).val();

    var selData = null;
    try { selData = $select.select2('data')[0]; } catch (err) { selData = null; }
    // console.log('Selected edit asset data:', selData);   
    // If the select2 item contains aggregated asset info (asset_ids + total_quantity), use that
    if (selData && selData.item && (selData.item.asset_ids !== undefined || selData.item.total_quantity !== undefined)) {
        var item = selData.item;
        var total_q = (item.total_quantity !== undefined && item.total_quantity !== null) ? parseInt(item.total_quantity) : 1;
        $('#edit_qty_' + row_num).val(total_q).prop('readonly', true);
        $('#edit_labor_price_' + row_num).val(0).prop('readonly', true);
        $('#edit_sell_price_' + row_num).val(0).prop('readonly', true);
        var assetIdsValue = [];
        if (Array.isArray(item.asset_ids)) {
            assetIdsValue = item.asset_ids.map(function(v){ return parseInt(v); });
        } else if (typeof item.asset_ids === 'string' && item.asset_ids.length > 0) {
            assetIdsValue = item.asset_ids.split(',').map(function(v){ return parseInt(v); });
        }
        $('#edit_asset_ids_' + row_num).val(JSON.stringify(assetIdsValue));

        // If edit row is Unit Price, try to fetch unit pricing for this service and qty
        var editSorType = $('#edit_sor_type_' + row_num).val();
        if (editSorType == '2' || editSorType == 'unit') {
            var edit_service_id = $('#edit_service_' + row_num).val();            
            if (contract_id && edit_service_id) {
                ajs.ajax_form(site_url + 'contract_masterplan/unit_price', {contract_id: contract_id, service_id: edit_service_id, qty: total_q}, 'GET', null, '1', '1', function (resp) {
                    var res = resp && resp.message ? resp.message.data : null;
                    if (res) {
                        if (res.sor_id) {
                            $('#edit_sor_id_hidden_' + row_num).val(res.sor_id);
                            set_sor(res.sor_id, 'edit_sor_' + row_num, edit_service_id);
                        }
                        $('#edit_labor_price_' + row_num).val(res.labor_price || 0).prop('readonly', true);
                        $('#edit_sell_price_' + row_num).val(res.sell_price || 0).prop('readonly', true);
                    }
                }, function (xhr) { console.error('Failed to fetch unit pricing'); });
            }
        }
        return;
    }

    var asset_id = $select.val();
    var property_id = $('#edit_asset_' + row_num).data('property-id');
    if (!asset_id) {
        $('#edit_labor_price_' + row_num).val(0).prop('readonly', true);
        $('#edit_sell_price_' + row_num).val(0).prop('readonly', true);
        $('#edit_asset_ids_' + row_num).val('');
        return;
    }

    ajs.ajax_form(site_url + 'asset/property-assets-type/' + property_id + '/' + asset_id, null, 'GET', null, '1', '1', function (data) {
        var asset = data && data.message ? data.message.data : null;

        console.log('Fetched edit asset data:', asset);

        if (!asset) return;
        $('#edit_qty_' + row_num).val(asset.total_quantity || 1).prop('readonly', true);
        $('#edit_asset_ids_' + row_num).val(JSON.stringify([parseInt(asset.id)]));
        var sor_id = asset.sor_code_id || asset.sor_code;

        var editSorType = $('#edit_sor_type_' + row_num).val();
        if ((editSorType == '2' || editSorType == 'unit') && contract_id) {
            var edit_service_id = $('#edit_service_' + row_num).val();
            var edit_qty_val = parseInt($('#edit_qty_' + row_num).val()) || 1;
            if (edit_service_id) {
                ajs.ajax_form(site_url + 'contract_masterplan/unit_price', {contract_id: contract_id, service_id: edit_service_id, qty: edit_qty_val}, 'GET', null, '1', '1', function (resp) {
                    var res = resp && resp.message ? resp.message.data : null;
                    if (res) {
                        if (res.sor_id) {
                            $('#edit_sor_id_hidden_' + row_num).val(res.sor_id);
                            set_sor(res.sor_id, 'edit_sor_' + row_num, edit_service_id);
                        } else if (sor_id) {
                            $('#edit_sor_id_hidden_' + row_num).val(sor_id);
                            set_sor(sor_id, 'edit_sor_' + row_num, edit_service_id);
                        }
                        $('#edit_labor_price_' + row_num).val(res.labor_price || 0).prop('readonly', true);
                        $('#edit_sell_price_' + row_num).val(res.sell_price || 0).prop('readonly', true);
                    } 
                }, function (xhr) { console.error('Failed to fetch unit pricing'); });
            } else if (sor_id) {
                set_sor(sor_id, 'edit_sor_' + row_num, edit_service_id);
            }
        } else {
            var edit_service_id = $('#edit_service_' + row_num).val();
            if (sor_id) {
                console.log('Setting SOR in edit modal:', sor_id, 'for row:', row_num);
                $('#edit_sor_id_hidden_' + row_num).val(sor_id);
                set_sor(sor_id, 'edit_sor_' + row_num, edit_service_id);
                $.ajax({
                    url: site_url + "sor/get/" + sor_id,
                    type: "GET",
                    dataType: "json",
                    beforeSend: function (xhr, settings) { ajs.set_auth_header(xhr, settings); },
                    success: function (d) {
                        var res = d.message.data;
                        $('#edit_labor_price_' + row_num).val(res.labor_price).prop('readonly', true);
                        $('#edit_sell_price_' + row_num).val(res.sell_price).prop('readonly', true);
                    }
                });
            }
        }
    }, function (xhr) { console.error('Failed to fetch asset'); });
});

function updateFrequencyExceptionOptions(row_num, frequency) {
    var $exc = $('#frequency_except_' + row_num);
    if (!$exc.length) return;

    // Destroy existing select2 if initialized
    if ($exc.hasClass('select2-hidden-accessible')) {
        $exc.select2('destroy');
    }

    $exc.empty();
    var count = ppm_except_count(frequency);

    if (count === 0) {
        // Yearly or empty - disable and clear, and ensure not required
        $exc.prop('disabled', true);
        $exc.prop('multiple', false);
        try { $exc.rules('remove'); } catch (e) {}
        // Reinitialize select2 (will be disabled)
        $exc.select2({
            placeholder: 'No exceptions available',
            allowClear: true,
            multiple: true
        });
        return;
    }

    // Add options for multiple selection
    for (var i = 1; i <= count; i++) {
        $exc.append('<option value="' + i + '">' + i + '</option>');
    }
    $exc.prop('disabled', false);
    $exc.prop('multiple', true);

    // Initialize or reinitialize select2 with multiple mode
    $exc.select2({
        placeholder: 'Select exceptions',
        allowClear: true,
        multiple: true
    });

    // Explicitly ensure no validation rule is attached (field is optional)
    try { $exc.rules('remove'); } catch (e) {}
}
function edit_updateFrequencyExceptionOptions(row_num, frequency, exceptions) {

    var $exc = $('#edit_frequency_except_' + row_num);
    if (!$exc.length) return;

    // Destroy select2 if already initialized
    if ($exc.hasClass('select2-hidden-accessible')) {
        $exc.select2('destroy');
    }
    var count = ppm_except_count(frequency);

    $exc.empty();

    // If no exceptions allowed (Yearly / empty)
    if (!count) {
        $exc.prop('disabled', true);
        try { $exc.rules('remove'); } catch (e) {}

        $exc.select2({
            placeholder: 'No exceptions available',
            allowClear: true
        });

        return;
    }

    // Enable multi select
    $exc.prop({
        disabled: false,
        multiple: true
    });

    // Generate options
    for (var i = 1; i <= count; i++) {
        $exc.append(new Option(i, i));
    }

    // Initialize select2
    $exc.select2({
        placeholder: 'Select exceptions',
        allowClear: true
    });

    // Normalize exceptions
    var selectedValues = [];

    if (Array.isArray(exceptions)) {
        selectedValues = exceptions.map(String);
    } else if (typeof exceptions === 'string') {
        selectedValues = exceptions.split(',').map(v => v.trim()).filter(Boolean);
    } else if (typeof exceptions === 'number') {
        selectedValues = [String(exceptions)];
    }

    // Apply selections
    if (selectedValues.length) {
        $exc.val(selectedValues).trigger('change');
    } else {
        $exc.val(null).trigger('change');
    }

    // Ensure optional validation
    try { $exc.rules('remove'); } catch (e) {}
}

$(document).on('change', 'select[id^="frequency_"]', function () {
    var id = $(this).attr('id');
    var parts = id.split('_');
    var row_num = parts[1];
    var frequency = $(this).val();

    updateFrequencyExceptionOptions(row_num, frequency);
});
$(document).on('change', 'select[id^="edit_frequency_"]', function () {
    var id = $(this).attr('id');
    var parts = id.split('_');
    var row_num = parts[2];
    var frequency = $(this).val();

    edit_updateFrequencyExceptionOptions(row_num, frequency);
});

function show_masterplan_div(selection)
{
    $('.mp-manual-div').css('display', 'none');
    $('.mp-upload-div').css('display', 'none');
    $('.save-masterplan-btn').css('display', 'none');

    if (selection == 'M')
    {
        $('#total_mp').val(1);
        $('.mp-manual-div').css('display', '');
        $('.save-masterplan-btn').css('display', '');
        $('.dynamic_mp_row').remove();
        

        $('.schedule-start-date').attr('min', schedule_start_date);
        $('.schedule-start-date').attr('max', schedule_end_date);
        $('.schedule-end-date').attr('min', schedule_start_date);
        $('.schedule-end-date').attr('max', schedule_end_date);

        $('.schedule-start-date').val(schedule_start_date);
        $('.schedule-end-date').val(schedule_end_date);
        
        if(client_id == '' || client_id == null || client_id == '0' || client_id == undefined) {
            ajs.ajax_form(site_url + "property/get/" + property_id, null, "GET", null, "0", "0", function (data) {
                selected_property = data.data;
                client_id = selected_property.client_id;
                console.log('client_id', client_id);
            });
        }

        add_autocomplete_custom_dropdown('#asset_1', site_url + 'asset/property-assets-type/'+property_id, ["equipment_type", "total_quantity"], null, 'body', null, false);

        select2_ajax('#contract_1', site_url + 'contract/get_all', 'contract_number', {client_id: client_id,type:'ppm'});
        $('#sor_1').attr('data-filters', JSON.stringify({'sors.client_id': client_id}));
        $('#contract_1').val('').trigger('change');
        $('#contract_1').on('change', function (e) {
        
        select2_ajax("#add_to_queue_1", site_url + "queue/get_all", "title", null);
        
        $('#frequency_except_1').select2({
            placeholder: 'Select exceptions',
            allowClear: true,
            multiple: true
        });
            var contract_id = $(this).val();
            // console.log('Selected contract_id:', contract_id);
            if (typeof contract_id !== 'undefined' && contract_id > 0)
            {
                ajs.ajax_form(site_url + "contract/get/" + contract_id, null, "GET", null, "1", "1", function (data) {
                    selected_contract = data.data;
                    // console.log(selected_contract);
                    // schedule_end_date = new Date(selected_contract.end_date).toISOString().slice(0, 10);

                    select2_ajax('#service_1', site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
                    select2_tag('#sor_1', site_url + 'sor/get_all', 'sor_code', {'sors.client_id': client_id, contract_id: contract_id}, 'body', null, true);
                    $('#sor_1').attr('data-filters', JSON.stringify({'sors.client_id': client_id, contract_id: contract_id}));

                     if (data) {
                        var schedule_start_date = data.start_date;
                        $('.schedule-start-date').attr('min', schedule_start_date);
                    }

                    // $("#start_date_1").val(schedule_start_date);
                    // $("#end_date_1").val(schedule_end_date);

                    // $("#start_date_1").attr('min', schedule_start_date);
                    // $("#start_date_1").attr('max', schedule_end_date);
                    // $("#end_date_1").attr('min', schedule_start_date);
                    // $("#end_date_1").attr('max', schedule_end_date);

                    $('#sor_type_1').val('1').trigger('change');
                    
                    $('#qty_1').val('1');
                });
            }
        });
        $("#first_load").val('1');
    }
    if (selection == 'T')
    {
        $('.mp-upload-div').css('display', '');
    }

    $("#manual_mp_form").validate({errorPlacement: function (error, element) {
        if (element.hasClass("select2") && element.next(".select2-container").length)
        {
            error.insertAfter(element.next(".select2-container"));
        } else if (element.parent(".input-group").length || element.parent(".error-div").length) {
            error.insertAfter(element.parent());
        } else if (element.is(":radio")) {
            error.appendTo(element.closest('.mb-0'));
        } else {
            error.insertAfter(element);
        }
    }});
}