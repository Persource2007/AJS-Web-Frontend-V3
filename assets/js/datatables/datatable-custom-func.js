//Set default DOM

var modalDataTable = null;
var table_filter = {};




// Function to get column visibility state
function getColumnVisibilityState(table)
{
    var columnStates = [];
    // table.columns().every(function () {
    //     var columnIndex = this.index();
    //     var columnVisible = this.visible();
    //     columnStates[columnIndex] = columnVisible;
    // });
    return columnStates;
}

function setColumnVisibility(column_visibility)
{
    if (typeof column_visibility !== 'undefined')
    {
        dataTable.columns().every(function () {
            var columnIndex = this.index();
            var columnVisible = column_visibility[columnIndex];
            this.visible(columnVisible);
        });

    }
}

function get_search_filter_data(type)
{

    var column_visibility = getColumnVisibilityState(dataTable);
    var filters = $('#form_filters').serializeArray();
    // console.log(filters);
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
        }
        else if (item.name == 'search_preset_label' || item.name == 'search_set_default')
        {
            
        }
        else if (item.name == 'search_term')
        {
            new_filters['searchTerm'] = item.value;
        }
        else
        {
            if (item.value != '' && item.value != null)
            {
                var name = item.name.replace("_filter", "");
                if ($('#' + item.name).length)
                {
                    var table_name = $('#' + item.name).data('table-name');
                    if (typeof table_name !== 'undefined')
                    {
                        name = table_name + '.' + name;
                    }
                }
                if(new_filters['filters'][name] != undefined)
                {
                    if(typeof new_filters['filters'][name] == "string"){
                        new_filters['filters'][name] = [new_filters['filters'][name]];
                    }
                    new_filters['filters'][name].push(item.value);
                }
                else
                {
                    new_filters['filters'][name] = item.value;                    
                }
                i++;
            }
        }
    });
    if (type == 'load')
    {
        load_data_table(new_limit, new_filters['searchTerm'], new_filters, column_visibility);
    } else if (type == 'store')
    {
        var sub_filter = $('.sub-filters:checked').val();
        if(sub_filter) {
            new_filters['filters']['sub_filters'] = sub_filter;
        }
        store_data_filter(master_data_type, new_limit, new_filters['searchTerm'], new_filters.filters, column_visibility);
    } else if (type == 'export')
    {
        if ($("#client_id_hidden").val() > 0) {
            var paraname = $("#client_id_hidden").data('paraname');
            new_filters['filters'][paraname] = $("#client_id_hidden").val();
        }
        export_table_data(master_data_type, new_limit, new_filters['searchTerm'], new_filters.filters, column_visibility);
    }
}

function export_table_data(data_type, limit, search_term, filters, column_visibility)
{
    var post_data = {type: data_type, filters: filters, search: {value: search_term}, column_visibility: column_visibility};
    ajs.ajax_form(site_url + data_type + '/export', post_data, 'GET', null, '1', '1', ajs_form_handler.api_response, ajs_form_handler.api_response);
}


function store_data_filter(data_type, limit, search_term, filters, column_visibility)
{
    var search_label = $('#search_preset_label').val();
    var set_default = '0';
    if ($('#search_set_default').is(":checked"))
    {
        set_default = '1';
    }
    var post_data = {'type': data_type, value: {set_default: set_default, search_label: search_label, data_type: data_type, limit: limit, search_term: search_term, filters: filters, column_visibility: column_visibility}};
    ajs.ajax_form(site_url + 'api/set_user_filter', post_data, 'POST', null, '1', '1', ajs_form_handler.api_response, ajs_form_handler.api_response);
    get_user_filters(master_data_type, true);
}

function fetch_default_filter(data_type, gate_when_no_preset = false, empty_state_selector = null)
{
    var post_data = {'type': data_type};
    var cb = function (res) { apply_default_filter(res, gate_when_no_preset, empty_state_selector); };
    ajs.ajax_form(site_url + 'api/user_default_filter', post_data, 'POST', null, '1', '1', cb, cb);
}

function show_filter_prompt(selector, message)
{
    var $t = $(selector);
    if (!$t.length) return;
    var cols = $t.find('thead th').length || 1;
    $t.find('tbody').remove();
    $t.append('<tbody><tr><td colspan="' + cols + '" class="text-center text-muted py-4">' +
        (message || 'Use the filters above and click Search to view results.') + '</td></tr></tbody>');
}



// Grids that stay empty until a filter is applied (job list, global property list)
// call this from load_data_table() before building the table. Returns true when
// nothing is filtered, meaning the caller should stop and leave the prompt up.
function gate_empty_filters(table_selector, data_filters, search)
{
    var has_any = (typeof search !== 'undefined' && search !== null && String(search).trim() !== '');

    if (!has_any && data_filters && typeof data_filters === 'object')
    {
        has_any = Object.keys(data_filters).some(function (key) {
            var value = data_filters[key];
            if (value === null || typeof value === 'undefined') return false;
            if (Array.isArray(value)) return value.length > 0;
            return String(value).trim() !== '';
        });
    }

    if (has_any) return false;

    // Tear any live grid down first - show_filter_prompt() rewrites the tbody, and
    // a DataTable with its own scroll wrappers would fight that.
    if ($.fn.dataTable.isDataTable(table_selector))
    {
        $(table_selector).DataTable().clear().destroy();
    }

    show_filter_prompt(table_selector);

    return true;
}

function apply_default_filter(result_json, gate_when_no_preset = false, empty_state_selector = null)
{
    var search_term = '';
    var column_visibility = '';
    var filters = {};
    var limit = ajs.datatable_limit;
    var has_preset = ajs_form_handler.check_result(result_json)
        && result_json.message == 'success'
        && typeof result_json.filter !== 'undefined';
    if (ajs_form_handler.check_result(result_json))
    {
        if (result_json.message == 'success')
        {
            if (typeof result_json.filter !== 'undefined')
            {
                var filter_value = JSON.parse(result_json.filter.filter_value);
                if (typeof filter_value.filters !== 'undefined')
                {
                    filters['filters'] = filter_value.filters;
                    set_search_inputs(filters['filters']);
                }
                if (typeof filter_value.limit !== 'undefined')
                {
                    limit = filter_value.limit;
                    $('#table_length').val(limit);
                }
                if (typeof filter_value.search_term !== 'undefined')
                {
                    search_term = filter_value.search_term;
                    $('#search_term').val(search_term);
                }
                if (typeof filter_value.column_visibility !== 'undefined')
                {
                    column_visibility = filter_value.column_visibility;
                }
            }
        }
    }
    if (has_preset || !gate_when_no_preset)
    {
        load_data_table(limit, search_term, filters, column_visibility);
    }
    else
    {
        show_filter_prompt(empty_state_selector);
    }

    if ($('#search_preset_list_div').length)
    {
        get_user_filters(master_data_type);
    }
}

function preselect_select2(result_json)
{
    var element = result_json.element;
    if (typeof element !== 'undefined')
    {
        var option = new Option(result_json.message.label, result_json.message.id, true, true);
        $('#' + element).append(option).trigger('change');
    }
}

function set_search_inputs(filters)
{
    if ($('#form_filters').length)
    {
        $('#form_filters')[0].reset();
    }
    $.each(filters, function (index, data) {
        var [_,field_key] = index.split('.');
        var key = field_key ? field_key : index;

        if ($('#form_filters').find('#' + key + '_filter').length)
        {
            var is_autocomplete = $('#form_filters').find('#' + key + '_filter').data('is-autocomplete');
            if (typeof is_autocomplete !== 'undefined')
            {
                var el = $('#' + key + '_filter');
                var table = el.data('table');
                var filters = el.data('filters');
                var fields = el.data('fields');
                var add_fields = el.data('add-fields');
                var element = key + '_filter';
                var data1 = '1=1';
                data1 = data1 + "&table=" + table + "&filters=" + filters + "&fields=" + fields + "&id=" + data + "&add_fields=" + add_fields + "&element=" + element + "&check_active=1";
                ajs.ajax_form(site_url + "api/autocomplete_single", data1, 'GET', null, '1', '1', preselect_select2, preselect_select2);

            } else
            {
                apply_select2_value('#' + key + '_filter', data);
            }

        }
        if ($('#form_filters').find('#' + key).length)
        {
            apply_select2_value('#' + key, data);
        }
        if(key == 'sub_filters') {
            $('input[name="sub_filters"][value="' + data + '"]').prop('checked', true);
        }
    })
}

/**
 * Attempts to set a select2 value. If the select2 options are not yet loaded
 * (e.g. still waiting for an async AJAX fetch), it retries every 300ms for
 * up to 3 seconds before giving up.
 *
 * @param {string} selector  - CSS selector for the <select> element
 * @param {*}      value     - The value to select
 * @param {number} [maxWait] - Max time to wait in ms (default 3000)
 */
function apply_select2_value(selector, value, maxWait)
{
    var el = $('#form_filters').find(selector);
    if (!el.length) return;

    if (typeof maxWait === 'undefined') {
        maxWait = 3000;
    }
    var interval = 300;
    var elapsed  = 0;

    function trySet() {
        // Select2 is still "Loading..." when it has 0 real options
        var optionCount = el.find('option[value!=""]').length;
        var isLoaded = optionCount > 0 || elapsed >= maxWait;

        if (isLoaded) {
            el.val(value).trigger('change');
        } else {
            elapsed += interval;
            setTimeout(trySet, interval);
        }
    }

    trySet();
}


function get_user_filters(type, force_load)
{
    if (typeof type !== 'undefined')
    {
        type = master_data_type;
    }
    var post_data = {'type': type};
    var url = site_url + 'api/get_user_filters';

    var query_str = $.param(post_data);
    var force_loading = false;
    if (typeof force_load !== 'undefined')
    {
        force_loading = true;
    }
    if (ajs_form_handler.check_token('local_cache_' + url + '_' + query_str) && !force_loading)
    {
        var return_data = ajs_form_handler.get_token('local_cache_' + url + '_' + query_str);
        return_data = JSON.parse(return_data);
        show_filter_presets(return_data);
    } else {
        ajs_form_handler.remove_token('local_cache_' + url + '_' + query_str)
        ajs.ajax_form_cache(url, post_data, 'POST', null, '1', '1', show_filter_presets, show_filter_presets);
    }
}

function fetch_filter(id)
{
    ajs.ajax_form(site_url + 'api/get_user_filter/' + id, null, 'GET', null, '1', '1', apply_default_filter, apply_default_filter);
}

function delete_filter(id)
{
    ajs.ajax_form(site_url + 'api/user_filter_delete/' + id, null, 'DELETE', null, '1', '1', get_user_filters, get_user_filters, master_data_type);
}

function filter_set_default(id, type)
{
    if (typeof type !== 'undefined')
    {
        type = master_data_type;
    }
    var post_data = {'id': id, type: type};
    ajs.ajax_form(site_url + 'api/set_default_filter', post_data, 'POST', null, '1', '1', get_user_filters, get_user_filters, master_data_type);
}


function show_filter_presets(result_json)
{
    if (ajs_form_handler.check_result(result_json))
    {
        if (result_json.message == 'success')
        {
            if (typeof result_json.filters !== 'undefined')
            {
                var filters = result_json.filters;
                $('#search_preset_list_div').find('ul.list-group').html('');
                $.each(filters, function (key, data) {
                    btn_css = 'border: none;';
                    if (data.is_default == '1')
                    {
                        btn_css = 'display:none;border: none;';
                    }
                    div_str = `<li class="list-group-item">
                                                                <div class="d-flex align-items-center">
                                                                    <div class="flex-grow-1">
                                                                        <h6 class="fs-14 mb-0">` + data.title + `</h6>
                                                                    </div>
                                                                    <div class="flex-shrink-0">
                                                                        <button onclick="filter_set_default('` + data.id + `','` + master_data_type + `')" style="` + btn_css + `" class="badge border border-warning text-warning" style="border: none;">Set Default</button>
                                                                        <button onclick="fetch_filter('` + data.id + `')" class="badge border border-success text-success" style="border: none;">Apply</button>
                                                                        <button onclick="delete_filter('` + data.id + `')" class="badge border border-danger text-danger" style="border: none;"><i class="ri-delete-bin-line align-bottom"></i></button>
                                                                    </div>
                                                                </div>
                                                            </li>`;
                    $('#search_preset_list_div').find('ul.list-group').append(div_str);
                });
            }
        }
    }
}


