var master_data_type = 'contract_masterplan';
var selected_contract = null;
var schedule_start_date = new Date().toISOString().slice(0, 10);
var schedule_end_date = null;
// PPM_FREQUENCY_LETTERS is the shared name -> letter map, defined once in interface.js.
dataTable = null;
schedule_master = [];
schedule_master1 = [];


function create_breadcrumb_list(result_json, nav= '')
{
    if (ajs_form_handler.check_result(result_json)) {
        var contract = selected_contract = result_json.data?.contract;

        const client_id = $("#client_id_hidden").val();

        var contract_url = 'contract/edit/'+ajs.hash_encode(contract.id);
        if($('#is_detail_page').val() > 0) {
            contract_url = 'contract/details/'+ajs.hash_encode(contract.id);
        }

        if(client_id > 0) {
            var detail_url = 'clients/details/' + ajs.hash_encode(contract.client_id);
            var breadcrumbs = [
                {label : 'Clients', url: cdn_url + 'clients/list'},
                {label : contract.client_code, url: cdn_url + detail_url},
                {label : 'Contracts', url: cdn_url + 'clients/'+ajs.hash_encode(contract.client_id)+'/contract'},
                {label : contract.contract_number, url: cdn_url + 'clients/'+ajs.hash_encode(contract.client_id)+'/'+contract_url},
                {label : 'PPM Master Plan List', url: null}
            ];
        } else {
            var breadcrumbs = [
                {label : 'Contracts', url: cdn_url + 'contract/list'},
                {label : contract.contract_number, url: cdn_url + contract_url},
                {label : 'PPM Master Plan List', url: null}
            ];
        }

        contract_client_id = contract.client_id;
        contract_start_date = contract.start_date;
        set_breadcrumb(breadcrumbs);

        // set ppm log and schedule headers

        $('#ppm-data1').html('');
        $("#ajax-datatables1 tbody").html('');
        $("#ajax-datatables2 tbody").html('');
        $("#ppm-data1-head").html('');
        $("#ppm-data2-head").html('');
        let endDate = new Date(contract.end_date);

        if (isNaN(endDate.getTime())) {
            endDate = new Date(); // Use today's date
        }
        schedule_end_date = new Date(endDate).toISOString().slice(0, 10);

        set_schedule_info(result_json.data.ppm_log);
        set_list_headers(result_json.data);
        
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

function load_data_table(limit, search_term, filters) {
    // datatables implementation for contract masterplan rows
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
            url: site_url + "contract/" + contract_id + "/masterplans",
            method: "GET",
            async: false,
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
                    var edit_btn = `<a href="javascript:void(0);" class="edit-ppm-field edit-btn" data-row-class="ppm-field-row-${row.id}">${edit_icn}</a>`;
                    if (row.schedule_status == '1') {
                        stop_btn = `<div class="form-check form-switch form-check-auto edit-btn"><input class="change-schedule-status form-check-input code-switcher me-1" type="checkbox" title="Active" data-schedule-id="` + row.id + `" data-name="status" value="1" checked></div>`;
                        
                    } else {
                        stop_btn = `<div class="form-check form-switch form-check-auto edit-btn"><input class="change-schedule-status form-check-input code-switcher me-1" type="checkbox" title="Inactive" data-name="status" data-schedule-id="` + row.id + `" value="2"></div>`;
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
                    if (data == '2') {
                        label = 'Band Price';
                    } else if (data == '3') {
                        label = 'Fixed Price';
                    }
                    return label;
                }
            },
            { title: "Asset", data: "asset_type", name: "asset_type" },
            { title: "Qty", data: "qty", name: "qty" },
            { title: "SOR", data: "sor_code", name: "sor_code" },
            { title: "Labor", data: "labor_price", name: "labor_price",
                render: function (data) {  
                    var labor = `<div class="text-end">`+data+`</div>`;                                      
                    return labor;
                }
             },
            { title: "Sell", data: "sell_price", name: "sell_price",
                render: function (data) {  
                    var labor = `<div class="text-end">`+data+`</div>`;                                      
                    return labor;
                } 
            },
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
            ajs.apply_ind_roles("Contracts");
        }
    });
}


if ($('#ajax-datatables1').length)
{
    // make sure the table is initially rendered when no filters exist yet
    ajs.ajax_form(site_url + "contract/" + contract_id + "/masterplan-summary", null, 'GET', null, '0', '1', create_breadcrumb_list, create_breadcrumb_list, 'PPM Master Plan List');
    load_data_table();
}

function set_list_headers(schedule) {
    schedule_master = [];
    const startYear = parseInt(schedule.start_year, 10);
    const endYear = parseInt(schedule.end_year, 10);
    const startMonth = schedule.start_month;
    const endMonth = schedule.end_month;
    // List of full month names and abbreviations
    const fullMonthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthAbbr = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    // Calculate start and end indices
    let startMonthIndex = fullMonthNames.indexOf(startMonth);
    let endMonthIndex = fullMonthNames.indexOf(endMonth);
    // Calculate total months from start to end
    let totalMonths = (endYear - startYear) * 12 + (endMonthIndex - startMonthIndex + 1);
    // Create a jQuery object to store the generated cells
    var $cells = $("<tr><th>id</th><th></th><th>Contract</th><th>UPRN</th><th>Postcode</th><th>Job Type</th><th>Freq.</th><th>Freq. Except</th><th>Pricing Model</th><th>Asset</th><th>Qty</th><th>SOR</th><th>Labor</th><th>Sell</th><th>Add to Queue</th><th>Start Date</th></tr>");
    // Loop through the total months to generate cells
    for (let i = 0; i < totalMonths; i++) {
        let year = startYear + Math.floor((startMonthIndex + i) / 12);
        let month = (startMonthIndex + i) % 12;
        var cellContent = `${monthAbbr[month]}/${year.toString().slice(-2)}`;
        schedule_master.push({month: fullMonthNames[month], year: year});
        var $cell = $("<th class='text-center'></th>").text(cellContent);
        $cells.append($cell);
    }
    $cells.append($("<th class='text-center'></th>").text('Total'));
// Append the generated cells to the table body
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
        if (item.name == 'table_length')
        {
            new_limit = item.value;
            new_filters['pagLimit'] = item.value;
        } else if (item.name == 'search_term')
        {
            new_filters['searchTerm'] = item.value;
        } else
        {
            if (item.value != '' && item.value != null)
            {
                name = item.name.replace("_filter", "");
                if ($('#' + item.name).length)
                {
                    var table_name = $('#' + item.name).data('table-name');
                    if (typeof table_name !== 'undefined')
                    {
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
        showLoaderOnConfirm: true,
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Processing...',
                text: 'Please wait while exporting masterplan.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            await new Promise(r => setTimeout(r, 50));
            export_masterplan('contract', new_limit, new_filters['searchTerm'], new_filters.filters, column_visibility);
        }
    });
});


$('#queue_masterplan').on('click', function (e) {
    $.ajaxSettings.async = true;
    ajs.ajax_form(site_url + 'contract_masterplan/generate_queue/' + contract_id, null, 'GET', null, '1', '1', ajs_form_handler.api_response, ajs_form_handler.api_response);
    $.ajaxSettings.async = false;
});
function export_masterplan(data_type, limit, search_term, filters, column_visibility)
{
    var post_data = {type: data_type, filters: filters, search: {value: search_term}, column_visibility: column_visibility};
    ajs.ajax_form(site_url + data_type + '/export/' + contract_id, post_data, 'GET', null, '1', '1', ajs_form_handler.api_response, ajs_form_handler.api_response);
}



ajs.apply_ind_roles('Contracts');

function set_sor_from_search(id, element) {
    var service_id = $('#' + element).closest('tr').find('select[id^="service_"]').val() || null;
    set_sor(id, element, service_id, true);
}

function set_sor(id, element, service_id = null, is_need_trigger_change = false) {

    var filters = {'sors.client_id': selected_contract.client_id, 'contract_id': selected_contract.id};
    var sor_filters = {
        'sor_contracts.contract_id': selected_contract.id,
    };
    if (service_id) {
        filters['job_type_id'] = service_id;
        sor_filters['job_type_id'] = service_id;
    }

    add_autocomplete_custom_dropdown('#' + element, site_url + 'sor/get_all_dropdown', ["sor_code"], filters, 'body', id, null, site_url + 'sor/get/'+id, is_need_trigger_change);

    $("#" + element).attr('data-filters', JSON.stringify(sor_filters));
}

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

// When any service selector changes, update its corresponding SOR dropdown to include job_type_id filter
$(document).on('change', 'select[id^="service_"]', function (e) {
    var id = $(this).attr('id');
    var parts = id.split('_');
    var row_num = parts[1];
    var service_id = $(this).val();

    console.log('Service changed for row:', row_num, 'New service_id:', service_id);
    if(service_id){
        var selData = null;
        try { selData = $('#service_' + row_num).select2('data')[0]; } catch (err) { selData = null; }
        // console.log('Selected service data:', selData);   
    
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

        var filters = {'sors.client_id': selected_contract.client_id, 'contract_id': selected_contract.id};
        var sor_filters = {'sor_contracts.contract_id': selected_contract.id};
        if (service_id) {
            filters['job_type_id'] = service_id;
            sor_filters['job_type_id'] = service_id;
        }

        add_autocomplete_custom_dropdown('#sor_' + row_num, site_url + 'sor/get_all_dropdown', ["sor_code"], filters, 'body', null, true);
        $('#sor_' + row_num).attr('data-filters', JSON.stringify(sor_filters));
    }
});

// Helper to toggle Assets column (<th> and <td>) visibility — always visible per user request
function updateAssetsColumnVisibility() {
    // Assets column should always be visible
    $('.property_assets').show();
}

function hideSelectWithSelect2($el) {
    $el.hide();
    if ($el.hasClass('select2-hidden-accessible')) {
        $el.next('.select2-container').hide();
    }
}

// When SOR Type changes per row, show assets and adjust field states
$(document).on('change', '.sor_type_mp', function (e) {
    var row_num = $(this).data('row-num');
    var val = $(this).val();

    // Reset fields on sor_type change
    $('#asset_' + row_num).val('').trigger('change');
    $('#sor_' + row_num).val('').trigger('change');
    $('#labor_' + row_num).val(0);
    $('#sell_' + row_num).val(0);
    $('#sell_value_original_' + row_num).val(0);
    $('#qty_' + row_num).val('');

    // Always show asset select (user requested assets visible for all SOR types)
    // showSelectWithSelect2($('#asset_' + row_num));

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
        // showSelectWithSelect2($('#edit_asset_' + row_num));
        // SOR will be populated from asset/contract pricing via hidden field; disable for display only
        $('#edit_sor_' + row_num).prop('disabled', true);
        $('#edit_labor_price_' + row_num).prop('readonly', true);
        $('#edit_sell_price_' + row_num).prop('readonly', true);
        // populate assets for the property if data-property-id available (use aggregated equipment-type endpoint)
        var property_id = $('#edit_asset_' + row_num).data('property-id');
        if (property_id) {
            add_autocomplete_custom_dropdown('#edit_asset_'+row_num, site_url + 'asset/property-assets-type/'+property_id, ["equipment_type","total_quantity"], null, 'body', null, false);
            // var $assetSelect = $('#edit_asset_' + row_num);
            // $assetSelect.prop('disabled', false);
        } else {
            // No property info — show but keep disabled
            $('#edit_asset_' + row_num).prop('disabled', true);
        }
    } else if (val == '3' || val == 'fix') {
        var $editAsset = $('#edit_asset_' + row_num);
        // showSelectWithSelect2($editAsset);
        // var propId = $editAsset.data('property-id');
        // $editAsset.prop('disabled', !propId);
        $('#edit_sor_' + row_num).prop('disabled', false);
        $('#edit_labor_price_' + row_num).prop('readonly', false);
        $('#edit_sell_price_' + row_num).prop('readonly', false);
    } else {
        var $editAsset = $('#edit_asset_' + row_num);
        // showSelectWithSelect2($editAsset);
        // var propId = $editAsset.data('property-id');
        // $editAsset.prop('disabled', !propId);
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
            if (selected_contract && selected_contract.id && edit_service_id) {
                ajs.ajax_form(site_url + 'contract_masterplan/unit_price', {contract_id: selected_contract.id, service_id: edit_service_id, qty: total_q}, 'GET', null, '1', '1', function (resp) {
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
        if ((editSorType == '2' || editSorType == 'unit') && selected_contract && selected_contract.id) {
            var edit_service_id = $('#edit_service_' + row_num).val();
            var edit_qty_val = parseInt($('#edit_qty_' + row_num).val()) || 1;
            if (edit_service_id) {
                ajs.ajax_form(site_url + 'contract_masterplan/unit_price', {contract_id: selected_contract.id, service_id: edit_service_id, qty: edit_qty_val}, 'GET', null, '1', '1', function (resp) {
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

$(document).on('change', 'select[id^="edit_frequency_"]', function () {
    var id = $(this).attr('id');
    var parts = id.split('_');
    var row_num = parts[2];
    var frequency = $(this).val();

    edit_updateFrequencyExceptionOptions(row_num, frequency);
});

/**
 * Build the HTML for the editable row used by DataTables child rows.
 * Uses the schedule id as the unique row identifier (for input IDs).
 */
function buildDatatableEditRow(data) {
    var scheduleId = data.schedule_id || data.id;
    var serviceId = data.service_id || '';
    var frequency = data.frequency_id || '';
    var frequencyExcept = data.frequency_except || '';
    var sorType = data.sor_type || '';
    var assetTypeId = data.client_property_asset_type_id || '';
    var propertyId = data.property_id || '';
    var qty = (data.qty !== undefined && data.qty !== null) ? data.qty : 1;
    var sorId = data.sor_id || '';
    var laborPrice = data.labor_price || 0;
    var sellPrice = data.sell_price || 0;
    var startDate = data.start_date || '';
    var queueId = data.queue_id || '';

    // Use the same markup structure as the legacy list edit row (common file)
    return `
        <div class="ppm-edit-row p-3">
            <form id="ppm-form-${scheduleId}" action="${site_url}contract_masterplan/update/${scheduleId}" method="post">
                <div class="row align-items-end ms-5 mb-1 mt-1 gx-3">
                    <div class="col-md-1">
                        <label class="fw-bold">Job Type</label>
                        <select class="form-control select2" required name="service_id" id="edit_service_${scheduleId}" data-value="${serviceId}">
                            <option value=''></option>
                        </select>
                    </div>
                    <div class="col-md-1">
                        <label class="fw-bold">Freq.</label>
                        <select class="form-control" required name="frequency_id" id="edit_frequency_${scheduleId}" data-value="${frequency}">
                            <option value=''></option>
                            <option value="Weekly" ${frequency === 'Weekly' ? 'selected' : ''}>W</option>
                            <option value="Monthly" ${frequency === 'Monthly' ? 'selected' : ''}>M</option>
                            <option value="Quarterly" ${frequency === 'Quarterly' ? 'selected' : ''}>Q</option>
                            <option value="Half Yearly" ${frequency === 'Half Yearly' ? 'selected' : ''}>H</option>
                            <option value="Yearly" ${frequency === 'Yearly' ? 'selected' : ''}>A</option>
                        </select>
                    </div>
                    <div class="col-md-1">
                        <label class="fw-bold">Freq. Except</label>
                        <select class="form-control" name="frequency_except[]" id="edit_frequency_except_${scheduleId}" data-value="${frequencyExcept}">
                            <option value=''></option>
                        </select>
                    </div>
                    <div class="col-md-1">
                        <label class="fw-bold">Pricing Model</label>
                        <select class="form-control sor_type_mp_edit" data-row-num="${scheduleId}" name="sor_type" id="edit_sor_type_${scheduleId}">
                            <option value="1" ${sorType === '1' ? 'selected' : ''}>SOR</option>
                            <option value="2" ${sorType === '2' ? 'selected' : ''}>Band Price</option>
                            <option value="3" ${sorType === '3' ? 'selected' : ''}>Fixed Price</option>
                        </select>
                    </div>
                    <div class="col-md-1">
                        <label class="fw-bold">Asset</label>
                        <select class="form-control asset_selector_edit" data-property-id="${propertyId}" data-value="${assetTypeId}" id="edit_asset_${scheduleId}" name="asset_type">
                            <option value=''></option>
                        </select>
                        <input type="hidden" name="asset_ids" id="edit_asset_ids_${scheduleId}" value="${data.client_property_asset_id || ''}"/>
                    </div>
                    <div class="col-md-1">
                        <label class="fw-bold">Qty</label>
                        <input type="number" class="form-control" name="qty" id="edit_qty_${scheduleId}" value="${qty}" ${sorType == '2' ? 'readonly' : ''}/>
                    </div>
                    <div class="col-md-1">
                        <label class="fw-bold">SOR</label>
                        <div class="d-flex error-div">
                            <select class="form-control sor_property_plan_edit" data-row-num="${scheduleId}" required name="sor_id" id="edit_sor_${scheduleId}" data-value="${sorId}" data-filters='${JSON.stringify({ 'sors.client_id': (selected_contract ? selected_contract.client_id : ''), contract_id: contract_id })}' ${sorType == '2' ? 'disabled' : ''}>
                                <option value=''></option>
                            </select>
                            <input type="hidden" name="sor_id_hidden" id="edit_sor_id_hidden_${scheduleId}" value="${sorId}"/>
                            <button type="button" class="btn btn-primary ms-1 popup-form-search-button popup-add-btn" data-heading="Search SORs" data-element="edit_sor_${scheduleId}" data-after-load-func="set_sor_from_search" data-form-url="${cdn_url}system/sor/search-list">
                                <i class="mdi mdi-magnify search-widget-icon"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-1">
                        <label class="fw-bold">Labor</label>
                        <input type="number" class="form-control labor-value" data-row-num="${scheduleId}" ${sorType === '3' ? '' : 'readonly'} name="labor_price" id="edit_labor_price_${scheduleId}" value="${laborPrice}" />
                    </div>
                    <div class="col-md-1">
                        <label class="fw-bold">Sell</label>
                        <input type="number" class="form-control sell-value" data-row-num="${scheduleId}" ${sorType === '3' ? '' : 'readonly'} name="sell_price" id="edit_sell_price_${scheduleId}" value="${sellPrice}" />
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
        </div>
    `;
}

// Toggle the DataTable child row when the edit button is clicked.
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

    var scheduleId = rowData.id;

    // Initialize the edit row's select controls and other helpers.
    select2_ajax('#edit_service_' + scheduleId, site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null, 'body', rowData.service_id);
    select2_ajax('#edit_add_to_queue_' + scheduleId, site_url + 'queue/get_all', 'title', null, 'body', rowData.queue_id);
    add_autocomplete_custom_dropdown('#edit_sor_' + scheduleId, site_url + 'sor/get_all_dropdown', ['sor_code'], {'sors.client_id': selected_contract.client_id, 'contract_id': selected_contract.id, 'job_type_id': rowData.service_id}, 'body', rowData.sor_id, null, site_url + 'sor/get/' + rowData.sor_id);
    add_autocomplete_custom_dropdown('#edit_asset_' + scheduleId, site_url + 'asset/property-assets-type/' + (rowData.property_id || ''), ['equipment_type', 'total_quantity'], null, 'body', rowData.client_property_asset_type_id, null, site_url + 'asset/property-assets-type/' + (rowData.property_id || '') + '/' + (rowData.client_property_asset_type_id || ''));
    edit_updateFrequencyExceptionOptions(scheduleId, rowData.frequency_id, rowData.frequency_except);

    // Ensure start date respects contract start date.
    ajs.ajax_form(site_url + 'contract/get/' + contract_id, null, 'GET', null, '1', '1', function (resp) {
        var res = resp && resp.data ? resp.data : null;
        if (res) {
            $('#edit_start_date_' + scheduleId).attr('min', res.start_date);
        }
    }, function (xhr) { console.error('Failed to fetch contract details'); });
});
