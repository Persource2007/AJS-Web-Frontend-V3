var master_data_type = 'contract_masterplan';
var selected_contract = null;
var schedule_start_date = new Date().toISOString().slice(0, 10);
var schedule_end_date = null;
dataTable = null;
schedule_master = [];
schedule_master1 = [];
function load_data_table(limit, search_term, filters)
{
    console.log('Loading Masterplan Data Table...');
    $('#ppm-data1').html('');
    $("#ajax-datatables1 tbody").html('');
    $("#ajax-datatables2 tbody").html('');
    $("#ppm-data1-head").html('');
    $("#ppm-data2-head").html('');

    $.ajax({
        url: site_url + "contract/" + contract_id + "/masterplan",
        method: 'GET',
        async: false,
        beforeSend: function (xhr, settings) {
            ajs.set_auth_header(xhr, settings);
        },
        complete: function () {
        },
        success: function (ret) {
            // console.log('Masterplan Data:', ret);
            selected_contract = ret.message.contract;
            // console.log(selected_contract);
            let endDate = new Date(selected_contract.end_date);

            if (isNaN(endDate.getTime())) {
                endDate = new Date(); // Use today's date
            }

            //schedule_end_date = new Date(selected_contract.end_date).toISOString().slice(0, 10);
            schedule_end_date = new Date(endDate).toISOString().slice(0, 10);
            set_mp_data(ret);
        },
        error: function (xhr) {
            var status_code = xhr.status;
            if (status_code == 401) {
                refreshToken().then(function () {
                    // Retry original request after token is refreshed
                    load_data_table(limit, search_term, filters)
                }).catch(function () {
                    // Refresh token failed — redirect to login
                    window.location.href = cdn_url + 'auth/login';
                });
        
                return; // Stop further execution
            }
        }
    });
}


if ($('#ajax-datatables').length)
{
    fetch_default_filter(master_data_type);
    ajs.ajax_form(site_url + 'contract/get/' + contract_id, null, 'GET', null, '0', '1', create_breadcrumb, create_breadcrumb, 'PPM Master Plan');
}


function set_month_ppm(data, row, month) {
    if (data !== '')
    {
        var jsn = JSON.parse(data);
        return `<a href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="` + jsn.values + `">` + jsn.count + `</a>
        <select data-month="` + month + `" data-row-num="` + row.id + `" data-value="` + jsn.ids + `" class="form-control mp-service-picker hide" multiple name="` + month + `_[]" id="` + month + `_` + row.id + `">
        </select>
        <input type="hidden" name="` + month + `_val" id="` + month + `_val_` + row.id + `" value='` + data + `' />`;
    } else
    {
        return '';
    }
}

function load_workstream_data(result_json)
{
    if (ajs_form_handler.check_result(result_json))
    {
        var edit_data = result_json.message.data;
        $('#title').val(edit_data.title);
        $('#description').val(edit_data.description);
        $('#workstream_code').val(edit_data.workstream_code);
        $('#analysis_code').val(edit_data.analysis_code);
        select2_ajax('#department_id', site_url + 'department/get_all', 'title', null, 'offcanvasRight', edit_data.department_id);
        add_autocomplete_sel('#manager_id', 'users', ['first_name', 'last_name'], null, null, 'offcanvasRight', edit_data.manager_id);
    } else
    {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
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
    load_data_table();
    $.ajaxSettings.async = false;
});
function export_masterplan(data_type, limit, search_term, filters, column_visibility)
{
    var post_data = {type: data_type, filters: filters, search: {value: search_term}, column_visibility: column_visibility};
    ajs.ajax_form(site_url + data_type + '/export/' + contract_id, post_data, 'GET', null, '1', '1', ajs_form_handler.api_response, ajs_form_handler.api_response);
}



function get_workstream_details()
{
    ajs.ajax_form(site_url + 'workstream/get/' + id, null, 'GET', null, '1', '1', set_workstream_data, set_workstream_data);
}

ajs.apply_ind_roles('Contracts');

$(document).on('click', '.add-masterplan-row-btn', function (e) {
    var total_rows = $('#total_mp').val();
    var new_row = parseInt(total_rows) + parseInt(1);
    add_masterplan_row(new_row);
    updateAssetsColumnVisibility();
});
$(document).on('click', '.save-masterplan-btn', function (e) {
    // console.log('Saving Masterplan...');
    if ($("#manual_mp_form").valid()) {
        // Validate that all SOR, Frequency, and (if Unit Price) sor_id_hidden fields are not empty
        var total_rows = $('#total_mp').val();
        var sorValidationFailed = false;
        var frequencyValidationFailed = false;
        var frequencyValidationFailed = false;
        var startDateValidationFailed = false;
        var emptyStartDateRows = [];
        var sorIdHiddenValidationFailed = false;
        var emptySorRows = [];
        var emptyFrequencyRows = [];
        var emptySorIdHiddenRows = [];

        for (var i = 1; i <= total_rows; i++) {
            var sorValue = $('#sor_' + i).val();
            var startDateValue = $('#start_date_' + i).val();
            var frequencyValue = $('#frequency_' + i).val();
            var sorTypeValue = $('#sor_type_' + i).val();
            var sorIdHiddenValue = $('#sor_id_hidden_' + i).val();            
            
            if (!frequencyValue || frequencyValue.trim() === '') {
                frequencyValidationFailed = true;
                emptyFrequencyRows.push(i);
            }

            if (!startDateValue || startDateValue.trim() === '') {
                startDateValidationFailed = true;
                emptyStartDateRows.push(i);
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
            if (startDateValidationFailed) {
                errorMsg += 'Start Date is required for row(s): ' + emptyStartDateRows.join(', ') + '\n';
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
        ajs.ajax_form(site_url + 'contract_masterplan/create', post_data, 'POST', null, '1', '1', ajs_form_handler.api_response, ajs_form_handler.api_response);
        $('#schedule_setupM').trigger("click");
        //ajs.refreshDataTable();
        load_data_table();
    } else {

    }

});
function add_masterplan_row(row_num)
{
    $('#total_mp').val(row_num);
    var row_html = `<tr class="mp_row_` + `_` + row_num + ` dynamic_mp_row">
            <td class="searchBtn-selectOption-box-fixed">
    <div class="d-flex error-div">
                <select class="form-control" required name="property_` + row_num + `" id="property_` + row_num + `">
                        <option value=''></option>
                </select>
                <button type="button" class="btn btn-primary ms-1 popup-form-search-button popup-add-btn" data-heading="Search Property" data-element="property_` + row_num + `" data-after-load-func="set_property_id" data-form-url="${cdn_url}properties/search-list">
                        <i class="mdi mdi-magnify search-widget-icon"></i>
                </button>
    </div>
            </td>
            <td>
                <select class="form-control" data-row-num="` + row_num + `" name="service_` + row_num + `" id="service_` + row_num + `">
                        <option value=''></option>
                </select>                    
            </td>
            <td>
                <select class="form-control" data-row-num="` + row_num + `" name="frequency_` + row_num + `" id="frequency_` + row_num + `">
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
            <td class="searchBtn-selectOption-box-fixed">
                <div class="d-flex error-div">
                <select class="form-control sor_property_plan" data-row-num="` + row_num + `" name="sor_` + row_num + `" id="sor_` + row_num + `" data-filters='` + JSON.stringify({'sors.client_id': selected_contract.client_id, contract_id: selected_contract.id}) + `'>
                    <option value=''></option>
                </select>
                <input type="hidden" name="sor_id_hidden_` + row_num + `" id="sor_id_hidden_` + row_num + `" />
                <button type="button" class="btn btn-primary ms-1 popup-form-search-button popup-add-btn" data-heading="Search SORs" data-element="sor_` + row_num + `" data-after-load-func="set_sor_from_search" data-form-url="${cdn_url}system/sor/search-list"><i class="mdi mdi-magnify search-widget-icon"></i></button>
                </div>
            </td>
            <td class="align-top">
                <input type="number" data-row-num="` + row_num + `" class="form-control labor-value text-end" readonly value='0' name="labor_` + row_num + `" id="labor_` + row_num + `" />
            </td>
            <td class="align-top">
                <input type="number" data-row-num="` + row_num + `" class="form-control sell-value text-end" readonly value='0' name="sell_` + row_num + `" id="sell_` + row_num + `" />
                <input type="hidden" class="form-control sell-value-original"  value='0' name="sell_value_original_` + row_num + `" id="sell_value_original_` + row_num + `" />
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
    set_property_id(null, 'property_' + row_num);
    //select2_ajax('#property_' + row_num, site_url + 'property/get_all', 'uprn_no', {client_id: selected_contract.client_id});
    select2_ajax('#service_' + row_num, site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);    
    select2_ajax("#add_to_queue_" + row_num, site_url + "queue/get_all", "title", null);

    $('#sor_type_' + row_num).val('1').trigger('change');
    
    // Initialize frequency exception select as multiple select2
    $('#frequency_except_' + row_num).select2({
        placeholder: 'Select exceptions',
        allowClear: true,
        multiple: true
    });
    // $('#asset_' + row_num).hide();
    // $("#start_date_" + row_num).val(schedule_start_date);
    ajs.ajax_form(site_url + 'contract/get/' + contract_id, null, 'GET', null, '1', '1', function (resp) {
        var res = resp && resp.data ? resp.data : null;
        console.log('Contract details:', res);
        if (res) {
            var schedule_start_date = res.start_date;
            $('.schedule-start-date').attr('min', schedule_start_date); // Set min as contract start date for all start date inputs
        }
    }, function (xhr) { console.error('Failed to fetch contract details'); });
    // $("#end_date_" + row_num).val(schedule_end_date);

    // $("#start_date_" + row_num).attr('min', schedule_start_date);
    // $("#start_date_" + row_num).attr('max', schedule_end_date);
    // $("#end_date_" + row_num).attr('min', schedule_start_date);
    // $("#end_date_" + row_num).attr('max', schedule_end_date);    
}

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

function set_property_id(id, element) {
    //select2_tag('#' + element, site_url + 'property/get_all', 'uprn_no', {client_id: selected_contract.client_id}, 'body', id, true);
    add_autocomplete_sel('#' + element, "client_properties", ["uprn_no"], null, {client_id: selected_contract.client_id}, "body", id).then(() => {
        $('#' + element).trigger('change');
    });
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

// When property selection changes, fetch assets for that property and populate asset dropdown
$(document).on('change', 'select[id^=property_]', function (e) {
    var id = $(this).attr('id');
    var parts = id.split('_');
    var row_num = parts[1];
    var property_id = $(this).val();
    var $assetSelect = $('#asset_' + row_num);

    if (!$assetSelect.length) return;

    if (!property_id) {
        $assetSelect.empty();
        $assetSelect.append('<option value=""></option>');
        // Show the select but keep it disabled until a property is chosen
        // showSelectWithSelect2($assetSelect);
        // $assetSelect.prop('disabled', true);
        // updateAssetsColumnVisibility();
        return;
    }

    var df = {'client_property_assets.property_id': property_id};
    
    add_autocomplete_custom_dropdown('#asset_'+row_num, site_url + 'asset/property-assets-type/'+property_id, ["equipment_type", "total_quantity"], null, 'body', null, false);

    // Show the select and enable since a property is selected
    // showSelectWithSelect2($assetSelect);
    // $assetSelect.prop('disabled', false);
    // updateAssetsColumnVisibility();
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
        $('#qty_' + row_num).val(1);

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

// When any service selector changes, update its corresponding SOR dropdown to include job_type_id filter
// $(document).on('change', 'select[id^="edit_service_"]', function (e) {
//     var id = $(this).attr('id');
//     var parts = id.split('_');
//     var row_num = parts[2];
//     console.log(row_num)
//     var service_id = $(this).val();

//     // console.log('Service changed for row:', row_num, 'New service_id:', service_id);

//     // Reset fields on service/jobtype change
//     $('#edit_frequency_' + row_num).val('').trigger('change');
//     $('#edit_sor_type_' + row_num).val('1').trigger('change');
//     $('#edit_sor_' + row_num).val('').trigger('change');
//     $('#edit_asset_' + row_num).val('').trigger('change');
//     $('#edit_labor_' + row_num).val(0);
//     $('#edit_sell_' + row_num).val(0);
//     $('#edit_qty_' + row_num).val('');

//     var $sor = $('#sor_' + row_num);
//     if (!$sor.length) return;

//     // clear existing SOR selection
//     $sor.val('').trigger('change');

//     var filters = {'sors.client_id': selected_contract.client_id, 'contract_id': selected_contract.id};
//     if (service_id) {
//         filters['job_type_id'] = service_id;
//     }

//     add_autocomplete_custom_dropdown('#sor_' + row_num, site_url + 'sor/get_all_dropdown', ["sor_code"], filters, 'body', null, true);
// });

// When asset selected (Unit Price), auto-populate qty and asset_ids (for equipment-type selection) or fall back to single asset behavior
$(document).on('change', 'select[id^=asset_]', function (e) {
    var id = $(this).attr('id');
    var parts = id.split('_');
    var row_num = parts[1];
    var $select = $(this);
    var asset_id = $('#asset_' + row_num).val();
    var property_id = $('#property_' + row_num).val();
    var client_id = selected_contract.client_id;
    if(asset_id){
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

        ajs.ajax_form(site_url + 'asset/get_asset_type_details/'+asset_id+'/'+property_id, null,'GET', null, '1', '1', function (data) {
            // console.log('Fetched asset data:', data);
            var asset = (data && data.status == true) ? data.data : (data && data.data ? data.data : null);
            // console.log('Fetched asset data:', asset);
            if (!asset) return;

            $('#qty_' + row_num).val(asset.asset_qty || 1).prop('readonly', true);
            $('#asset_ids_' + row_num).val(JSON.stringify([parseInt(asset.asset_ids)]));

            var sor_id = '';

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
    }
});

// Helper to toggle Assets column (<th> and <td>) visibility — always visible per user request
function updateAssetsColumnVisibility() {
    // Assets column should always be visible
    $('.property_assets').show();
}

// // Helper to show/hide a select and its select2 container when present
// function showSelectWithSelect2($el) {
//     $el.show();
//     // Initialize select2 if element has select2 class but not yet initialized
//     if ($el.hasClass('select2') && $el.next('.select2-container').length === 0) {
//         try { $el.select2({width: 'resolve'}); } catch (e) { /* ignore if select2 not available */ }
//     }
//     if ($el.hasClass('select2-hidden-accessible')) {
//         $el.next('.select2-container').show();
//     }
// }
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
    $('#qty_' + row_num).val(1);

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
    $('#edit_qty_' + row_num).val(1);


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


// Toggle editable state when fix-price checkbox is clicked




$(document).on('change', '.mp-service-picker', function (e) {
    var month = $(this).data('month');
    var row_num = $(this).data('row-num');
    var elm = month + '_val_' + row_num;
    var selected_ids = $(this).val();
    var select_text = $(this).find('option:selected').toArray().map(item => item.text);
    var total_selected = select_text.length;
    var data = {ids: selected_ids.join(", "), values: select_text.join(", "), count: total_selected, queued: 0};
    $('#' + elm).val(JSON.stringify(data));
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

    // Preselect existing exceptions (supports comma string or array)
    if (exceptions) {
        var selectedValues = [];
        if (Array.isArray(exceptions)) {
            selectedValues = exceptions.map(String);
        } else if (typeof exceptions === 'string') {
            selectedValues = exceptions.split(',').map(function (v) { return v.trim(); }).filter(Boolean);
        } else if (typeof exceptions === 'number') {
            selectedValues = [String(exceptions)];
        }
        if (selectedValues.length > 0) {
            $exc.val(selectedValues).trigger('change');
        }
    }
    // Ensure no validation rule is attached (field is optional)
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
$(document).on('click', '.edit-ppm-row', function (e) {
    $(this).closest('.dropdown').hide();
    $(this).closest('td').find('.edit-ppm-action').show();
    $(this).closest('tr').find('a:not(.dropdown-item)').hide();
    $(this).closest('tr').find('select').each(function (index, element) {
        const id = $(this).attr('id');
        const def_values = $(this).data('value') ? $(this).data('value').toString().split(', ') : null;
        select2_ajax('#' + id, site_url + 'service/get_all', 'service_code', null, undefined, def_values);
        $(this).show();
    });
});
$(document).on('click', '.save-ppm-row', function () {

    var post_data = $(this).closest('tr').find('input').serializeArray();
    ajs.ajax_form(site_url + 'contract_masterplan/edit', post_data, 'POST', null, '1', '1', ajs_form_handler.api_response, ajs_form_handler.api_response);
    ajs.refreshDataTable();
});

$(document).on('click', '.cancel-ppm-row', function (e) {
    ajs.refreshDataTable();
});



function show_masterplan_div(selection)
{
    console.log("show_master_div")
    $('.mp-manual-div').css('display', 'none');
    $('.mp-upload-div').css('display', 'none');
    $('.save-masterplan-btn').css('display', 'none');
    if (selection == 'M')
    {
        // console.log("manual selected")
        $('#total_mp').val(1);
        $('.mp-manual-div').css('display', '');
        $('.save-masterplan-btn').css('display', '');
        $('.dynamic_mp_row').remove();
        
        ajs.ajax_form(site_url + 'contract/get/' + contract_id, null, 'GET', null, '1', '1', function (resp) {
            var res = resp && resp.data ? resp.data : null;
            console.log('Contract details:', res);
            if (res) {
                var schedule_start_date = res.start_date;
                $('.schedule-start-date').attr('min', schedule_start_date);
                //console.log('Schedule start date:', schedule_start_date);
            }
        }, function (xhr) { console.error('Failed to fetch contract details'); });

        select2_ajax("#add_to_queue_1", site_url + "queue/get_all", "title", null);

        add_autocomplete_sel('#property_1', 'client_properties', ['uprn_no'], null, {client_id: selected_contract.client_id});
        select2_ajax('#service_1', site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);        
        
        $('#property_1').val('').trigger('change');
        $('#service_1').val('').trigger('change');
        // $('#sor_1').val('').trigger('change');
        $('#sor_1').attr('data-filters', JSON.stringify({'sors.client_id': selected_contract.client_id, contract_id: selected_contract.id}));
        // $('.schedule-start-date').attr('min', schedule_start_date);
        // $('.schedule-start-date').attr('max', schedule_end_date);
        // $('.schedule-end-date').attr('min', schedule_start_date);
        // $('.schedule-end-date').attr('max', schedule_end_date);

        // $('.schedule-start-date').val(schedule_start_date);
        // $('.schedule-end-date').val(schedule_end_date);

        $('#sor_type_1').val('1').trigger('change');
        
        // Initialize frequency exception select as multiple select2 for first row
        $('#frequency_except_1').select2({
            placeholder: 'Select exceptions',
            allowClear: true,
            multiple: true
        });
        
        // Ensure column visibility is correct on initial load
        updateAssetsColumnVisibility();
        // Ensure asset selects are visible on load and set disabled state based on property/options
        $('select[id^="asset_"]').each(function () {
            var id = $(this).attr('id');
            var parts = id.split('_');
            var row = parts[1];
            // showSelectWithSelect2($(this));
            // var propertyVal = $('#property_' + row).val();
            // if (!propertyVal || $(this).find('option').length <= 1) {
            //     $(this).prop('disabled', true);
            // } else {
            //     $(this).prop('disabled', false);
            // }
        });
        $('#qty_1').val('1');
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

