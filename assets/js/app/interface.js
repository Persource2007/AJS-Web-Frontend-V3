// Identical in-flight select2_ajax fetches, keyed by url+filters. Screens that
// build many rows at once ask for the same list from every row before the first
// response lands, so without this they each fire their own request.
var select2_inflight = {};

function refine_autocomplete_data(responseJson, response)
{
    return response(responseJson.message);
}

function refine_autocomplete_data_select(responseJson)
{
    if (!responseJson.message[0].id)
    {
        return [];
    }
    return $.map(responseJson.message, function (item) {

        return {
            item: item,
            text: item.label,
            source: item.label,
            id: item.id
        }
    })
}

function refine_autocomplete_data_custom(responseJson, field, seprator = '|')
{
    // console.log(responseJson);
    // console.log(field);
    var data = responseJson?.message?.data ?? responseJson.data;
    if (data.length == 0)
    {
        return [];
    }
    var result = $.map(data, function (item) {
        var field_type = typeof field;
        if (field_type == 'string')
        {
            if (field === 'title_with_time') {
                if (item.start_time && item.end_time) {
                    var start_local = ajs.convert_time_utc_to_local(item.start_time, "HH:mm");
                    var end_local = ajs.convert_time_utc_to_local(item.end_time, "HH:mm");
                    var source = item.title ? `${item.title} (${start_local} - ${end_local})` : `(${start_local} - ${end_local})`;
                } else {
                    var source = item[field] || item.title || '';
                }
            } else {
                var source = item[field];
            }
        } else if (field_type == 'array' || field_type == 'object')
        {
            var source = '';
            var field_len = field.length;
            $.each(field, function (key, value) {
                if (key == (field_len - 1))
                {
                    source += item[value];
                } else if(seprator == "") {
                    source += item[value] + ` `;
                } else {
                    source += item[value] + ` ${seprator} `;
                }
            });
        }
        return {
            item: item,
            text: source,
            source: source,
            id: item.id
        }
    })

    result.sort(function (a, b) {
        return a.text.localeCompare(b.text);
    });

    return result;
}

// function add_autocomplete_sel(element, table, fields, add_fields, filters, parent, selected_value, selected_text)
// {
//     var placeholder = 'Select';
//     var new_placeholder = $(element).find("option:first").html();
//     if (typeof fields === 'undefined')
//     {
//         fields = ['title'];
//     }
//     if (typeof add_fields === 'undefined')
//     {
//         add_fields = '';
//     }
//     if (typeof filters === 'undefined' || filters == null)
//     {
//         filters = '';
//     }
//     if (typeof parent === 'undefined' || parent == 'body')
//     {
//         parent = 'body';
//     } else
//     {
//         parent = '#' + parent;
//     }

//     if (typeof new_placeholder !== 'undefined')
//     {
//         placeholder = new_placeholder;
//     }

//     $(element).attr('data-fields', fields);
//     $(element).attr('data-add-fields', add_fields);
//     $(element).attr('data-filters', filters);
//     $(element).attr('data-table', table);
//     var select_el = $(element).select2({
//         placeholder: placeholder,
//         minimumInputLength: 0,
//         allowClear: true,
//         dropdownParent: $(parent),
//         ajax: {
//             url: site_url + "api/autocomplete",
//             type: "GET",
//             dataType: 'json',
//             cache: true,
//             async: true,
//             delay: 250,
//             beforeSend: function (xhr, settings) {
//                 ajs.set_auth_header(xhr, settings);
//             },
//             data: function (params) {
//                 return {
//                     q: params.term, // search term
//                     table: table,
//                     fields: fields,
//                     add_fields: add_fields,
//                     filters: filters
//                 };
//             },
//             processResults: function (data) {
//                 return {results: refine_autocomplete_data_select(data)};
//             }
//         },
//     });
//     if (typeof selected_value !== 'undefined' && selected_value > 0)
//     {

//         $.ajax({
//             url: site_url + "api/autocomplete_single",
//             dataType: 'json',
//             cache: true,
//             async: true,
//             beforeSend: function (xhr, settings) {
//                 ajs.set_auth_header(xhr, settings);
//             },
//             data: {
//                 id: selected_value, // search term
//                 table: table,
//                 fields: fields.join(","),
//                 element: '',
//                 add_fields: add_fields,
//                 filters: filters
//             },
//             success: function (data) {
//                 if (typeof data.multiple !== 'undefined' && data.multiple == '1')
//                 {
//                     for (i = 0; i < data.message.length; ++i)
//                     {
//                         var $newOption = $("<option selected='selected'></option>").val(data.message[i].id).text(data.message[i].label);
//                         $(element).append($newOption).trigger('change');
//                     }

//                 } else
//                 {
//                     var $newOption = $("<option selected='selected'></option>").val(selected_value).text(data.message.label);
//                     $(element).append($newOption).trigger('change.select2');
//                 }
//             }
//         });
//     }
// }

async function add_autocomplete_sel(element, table, fields = ['title'], add_fields = '', filters = '', parent = 'body', selected_value, selected_text) {
    return new Promise((resolve, reject) => {
        var placeholder = 'Select';
        var new_placeholder = $(element).find("option:first").html();

        if (typeof new_placeholder !== 'undefined') {
            placeholder = new_placeholder;
        }
        let data_filters = '';
        if (typeof filters == 'object') {
            data_filters = JSON.stringify(filters);
        }

        // Set data attributes for the element
        $(element).attr('data-fields', fields);
        $(element).attr('data-add-fields', add_fields);
        $(element).attr('data-filters', data_filters);
        $(element).attr('data-table', table);

        var id_field = "id";
        if ($(element).data('id-field')) {
            id_field = $(element).data('id-field');
        }

        // Initialize select2 with AJAX options
        var select_el = $(element).select2({
            placeholder: placeholder,
            minimumInputLength: 0,
            allowClear: true,
            closeOnSelect: true,
            dropdownParent: $(parent === 'body' ? parent : `#${parent}`),
            ajax: {
                transport: function (params, success, failure) {
                    ajaxWithRefresh({
                        url: site_url + "api/autocomplete",
                        type: "GET",
                        dataType: 'json',
                        cache: false,
                        async: true,
                        delay: 250,
                        data: {
                            q: params.data.term,
                            table: table,
                            fields: fields,
                            add_fields: add_fields,
                            filters: filters,
                            id_field: id_field
                        }
                    }).then(success).catch(failure);
                },
                /* url: site_url + "api/autocomplete",
                type: "GET",
                dataType: 'json',
                cache: true,
                async: true,
                delay: 250,
                beforeSend: function (xhr, settings) {
                    ajs.set_auth_header(xhr, settings);
                },
                data: function (params) {
                    return {
                        q: params.term, // search term
                        table: table,
                        fields: fields,
                        add_fields: add_fields,
                        filters: filters,
                        id_field: id_field
                    };
                }, */
                processResults: function (data) {
                    return {results: refine_autocomplete_data_select(data)};
                }
            }
        });

        // If a selected value is provided, load it via AJAX
        if (typeof selected_value !== 'undefined' && (selected_value > 0 || selected_value?.length)) {
            ajaxWithRefresh({
                url: site_url + "api/autocomplete_single",
                dataType: 'json',
                cache: true,
                async: true,
                data: {
                    id: selected_value,
                    table: table,
                    fields: fields.join(","),
                    element: '',
                    add_fields: add_fields,
                    filters: filters,
                    id_field: id_field
                }
            }).then((data) => {
                if (typeof data.multiple !== 'undefined' && data.multiple == '1') {
                    for (let i = 0; i < data.message.length; i++) {
                        var $newOption = $("<option selected='selected'></option>").val(data.message[i].id).text(data.message[i].label);
                        $(element).append($newOption).trigger('change');
                    }
                } else {
                    var $newOption = $("<option selected='selected'></option>").val(selected_value).text(data.message.label);
                    $(element).append($newOption).trigger('change.select2');
                }
                resolve(data);
            }).catch((err) => {
                reject(err);
            });
        } else {
            resolve();
        }
    });
}


function add_autocomplete_custom(element, url, fields, filters, parent, selected_value, selected_text)
{
    var original_parent = parent;
    if (typeof filters === 'undefined' || filters == null)
    {
        filters = '';
    }
    if (typeof field === 'undefined' || field == null)
    {
        field = 'title';
    }

    if (typeof parent === 'undefined' || parent == 'body')
    {
        parent = 'body';
    } else
    {
        parent = '#' + parent;
    }

    $(element).select2({
        placeholder: 'Select',
        dropdownParent: $(parent),
        allowClear: true,
        closeOnSelect: true,
        ajax: {
            transport: function (params, success, failure) {
                ajaxWithRefresh({
                    url: url,
                    type: "GET",
                    dataType: 'json',
                    cache: false,
                    async: true,
                    data: {
                        q: params.data.term,
                        filters: filters,
                        fields: fields
                    }
                }).then(success).catch(failure);
            },
    
            /* url: url,
            type: "GET",
            dataType: 'json',
            cache: false,
            async: true,
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            data: function (params) {
                return {
                    q: params.term, // search term
                    filters: filters,
                    fields: fields
                };
            }, */
            processResults: function (data) {
                return {results: refine_autocomplete_data_select(data)};
            }
        },
    });
    if (typeof selected_value !== 'undefined')
    {

        $.ajax({
            url: url + "_single",
            dataType: 'json',
            cache: false,
            async: true,
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            data: {
                id: selected_value, // search term
                fields: fields.join(","),
                element: '',
                filters: filters
            },
            success: function (data) {
                if (typeof data.multiple !== 'undefined' && data.multiple == '1')
                {
                    for (i = 0; i < data.message.length; ++i)
                    {
                        var $newOption = $("<option selected='selected'></option>").val(data.message[i].id).text(data.message[i].label);
                        $(element).append($newOption);
                    }
                    $(element).trigger('change');
                    
                } else
                {
                    var $newOption = $("<option selected='selected'></option>").val(selected_value).text(data.message.label);
                    $(element).append($newOption).trigger('change.select2');
                }
            },
            error: function (xhr) {
                var status_code = xhr.status;
                if (status_code == 401) {
                    refreshToken().then(function () {
                        // Retry original request after token is refreshed
                        add_autocomplete_custom(element, url, fields, filters, original_parent, selected_value);
                    }).catch(function () {
                        // Refresh token failed — redirect to login
                        window.location.href = cdn_url + 'auth/login';
                    });
            
                    return; // Stop further execution
                }
            }
        });
    }

}

function add_autocomplete_custom_dropdown(element, url, fields, filters, parent, selected_value, selected_text,selected_value_url=null, is_need_trigger_change)
{
    // console.log(filters);
    var original_parent = parent;
    if (typeof filters === 'undefined' || filters == null)
    {
        filters = '';
    }
    if (typeof field === 'undefined' || field == null)
    {
        field = 'title';
    }

    if (typeof parent === 'undefined' || parent == 'body' || parent == null)
    {
        parent = 'body';
    } else
    {
        parent = '#' + parent;
    }
    // console.log("Adding autocomplete to:", element);
    var placeholder = 'Select';
    var new_placeholder = $(element).find("option:first").html();

    if (typeof new_placeholder !== 'undefined') {
        placeholder = new_placeholder;
    }
    $(element).select2({
        placeholder: placeholder,
        dropdownParent: $(parent),
        allowClear: true,
        ajax: {
            transport: function (params, success, failure) {
                var requestData = {
                    'search[value]': params.data.term,   // <-- quoted key
                    'order_by': fields[0],   // <-- quoted key
                    'order_type': 'ASC',   // <-- quoted key
                    'filters': filters,
                    'fields': Array.isArray(fields) ? fields.join(',') : fields
                };
                ajaxWithRefresh({
                    url: url,
                    type: "GET",
                    dataType: 'json',
                    cache: false,
                    async: true,
                    data: requestData
                }).then(success).catch(failure);
            },    
            processResults: function (data) {
                return {results: refine_autocomplete_data_custom(data,fields)};
            }
        },
    });
    // console.log(fields + " " + selected_value);
    if (typeof selected_value !== 'undefined' && selected_value > 0)
    {    
        // console.log("Loading selected value:", selected_value);    
        if (typeof selected_value_url === 'undefined' || selected_value_url == null)
        {
            selected_value_url = url;
        }else{
            selected_value_url = selected_value_url;
        }

        // When the caller already knows the label there is nothing to look up —
        // render the option directly and skip the request. Callers that omit
        // selected_text keep the fetch below unchanged.
        if (typeof selected_text !== 'undefined' && selected_text !== null && selected_text !== '')
        {
            var $preselected = $("<option selected='selected'></option>").val(selected_value).text(selected_text);
            if (is_need_trigger_change) {
                $(element).append($preselected).trigger('change');
            } else {
                $(element).append($preselected).trigger('change.select2');
            }
            return;
        }

        // console.log("Selected Value:", selected_value);
        $.ajax({
            url: selected_value_url ,
            dataType: 'json',
            cache: false,
            async: true,
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            data: { // search term
                fields: Array.isArray(fields) ? fields.join(',') : fields,
                element: '',
                filters: filters
            },
            success: function (data) {
                if (typeof data.multiple !== 'undefined' && data.multiple == '1')
                {
                    for (i = 0; i < data.message.length; ++i)
                    {
                        var $newOption = $("<option selected='selected'></option>").val(data.message[i].id).text(data.message[i].label);
                        $(element).append($newOption).trigger('change');
                    }

                } else
                {
                    var field_name = fields[0];
                    var $newOption = $("<option selected='selected'></option>").val(selected_value).text(data.message.data[field_name]);
                    if(is_need_trigger_change){
                        $(element).append($newOption).trigger('change');
                    }else{
                        $(element).append($newOption).trigger('change.select2'); // no event fired, just update the select2 text
                    }
                }
            },
            error: function (xhr) {
                var status_code = xhr.status;
                if (status_code == 401) {
                    refreshToken().then(function () {
                        // Retry original request after token is refreshed
                        add_autocomplete_custom_dropdown(element, url, fields, filters, original_parent, selected_value, selected_text,selected_value_url, is_need_trigger_change);
                    }).catch(function () {
                        // Refresh token failed — redirect to login
                        window.location.href = cdn_url + 'auth/login';
                    });
            
                    return; // Stop further execution
                }
            }
        });
    }

}

function add_select2(element, local_data, url, field, filters, parent, selected_value)
{
    if (ajs_form_handler.check_token(local_data))
    {

    } else
    {
        select2_ajax(element, url, field, null, parent, selected_value);
    }
}

function show_dropdown_view_btn(selector, parent_class = '.error-div') {
    $(selector).closest(parent_class).find('.popup-form-view-button').show();    
}

function set_select2_view(selector, id, text) {
    let select = $(selector);

    if (select.find("option[value='" + id + "']").length === 0) {
        let option = new Option(text, id, true, true);
        select.append(option);
    }
    $(selector).select2({ readonly: true });
    select.val(id).trigger('change.select2');
}

$.fn.select2.amd.define('select2/selectAllAdapter', [
    'select2/utils',
    'select2/dropdown',
    'select2/dropdown/attachBody'
], function (Utils, Dropdown, AttachBody) {

    function SelectAll() { }
    SelectAll.prototype.render = function (decorated) {
        var self = this,
                $rendered = decorated.call(this),
                $selectAll = $(
                        '<button class="btn btn-xs btn-default" type="button" style="margin-left:6px;"><i class="fa fa-check-square-o"></i> Select All</button>'
                        ),
                $unselectAll = $(
                        '<button class="btn btn-xs btn-default" type="button" style="margin-left:6px;"><i class="fa fa-square-o"></i> Unselect All</button>'
                        ),
                $btnContainer = $('<div style="margin-top:3px;">').append($selectAll).append($unselectAll);
        if (!this.$element.prop("multiple")) {
            // this isn't a multi-select -> don't add the buttons!
            return $rendered;
        }
        $rendered.find('.select2-dropdown').prepend($btnContainer);
        $selectAll.on('click', function (e) {
            var $results = $rendered.find('.select2-results__option[aria-selected=false]');
            $results.each(function () {
                self.trigger('select', {
                    data: $(this).data('data')
                });
            });
            self.trigger('close');
        });
        $unselectAll.on('click', function (e) {
            var $results = $rendered.find('.select2-results__option[aria-selected=true]');
            $results.each(function () {
                self.trigger('unselect', {
                    data: $(this).data('data')
                });
            });
            self.trigger('close');
        });
        return $rendered;
    };

    return Utils.Decorate(Utils.Decorate(Dropdown, AttachBody), SelectAll);

});

function select2_ajax(element, url, field, filters, parent, selected_value = null, force_load=false, seprator = '|')
{
    var original_parent = parent;
    var placeholder = 'Select';
    var force_loading = false;
    if (typeof force_load !== 'undefined' && force_load == true)
    {
        force_loading = true;
    }

    var new_placeholder = $(element).find("option:first").html();
    var query_str = $.param(filters);
    var local_data_key = 'local_cache_' + url + '_' + query_str + '_select_data';
    if (typeof new_placeholder !== 'undefined')
    {
        placeholder = new_placeholder;
    }
    if (typeof filters === 'undefined' || filters == null)
    {
        filters = '';
    }
    if (typeof field === 'undefined' || field == null)
    {
        field = 'title';
    }

    if (typeof parent === 'undefined' || parent == 'body')
    {
        parent = 'body';
    } else
    {
        parent = '#' + parent;
    }

    select2adapter = null;
    if ($(element).prop('multiple'))
    {
        select2adapter = $.fn.select2.amd.require('select2/selectAllAdapter');
    }

    if ($(element).data('hide-select-all') && $(element).data('hide-select-all') == true)
    {
        select2adapter = null;
    }


    if (ajs_form_handler.check_token(local_data_key) && !force_loading)
    {
        var new_data = ajs_form_handler.get_token(local_data_key);
        new_data = JSON.parse(new_data);
        $(element).select2({
            placeholder: placeholder,
            dropdownParent: $(parent),
            allowClear: true,
            data: new_data,
            dropdownAdapter: select2adapter
        });
        if (typeof selected_value !== 'undefined' && selected_value)
        {
            selected_value = String(selected_value);
            var preselectedValues;
            if (selected_value.includes(',')) {
                preselectedValues = selected_value.split(',');
            } else {
                preselectedValues = [selected_value];
            }

            $(element).val(preselectedValues).trigger('change', 'select2');
        }

    } else
    {

        $(element).select2({
            placeholder: 'Loading...',
            allowClear: true,
            minimumResultsForSearch: -1,
            dropdownParent: $(parent),
            dropdownAdapter: select2adapter
        });

        // Populates this particular element once the list is available.
        var apply_select2_data = function (new_data) {
            $(element).select2({
                placeholder: placeholder,
                dropdownParent: $(parent),
                dropdownAdapter: select2adapter,
                allowClear: true,
                data: new_data,
            });
            if (typeof selected_value !== 'undefined' && selected_value)
            {
                selected_value = String(selected_value);
                var preselectedValues;
                if (selected_value.includes(',')) {
                    preselectedValues = selected_value.split(',');
                } else {
                    preselectedValues = [selected_value];
                }

                $(element).val(preselectedValues).trigger('change','select2');
            }
        };

        // Same list already being fetched — join that request instead of adding
        // another. Every waiter is still populated from the single response.
        if (typeof select2_inflight[local_data_key] !== 'undefined')
        {
            select2_inflight[local_data_key].push(apply_select2_data);
            return;
        }
        select2_inflight[local_data_key] = [apply_select2_data];

        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            async: true,
            beforeSend: function (xhr, settings) {
                xhr.setRequestHeader('X-From', 'select2');
                ajs.set_auth_header(xhr, settings);
            },
            data: {
                filters: filters, field: field, length: 1000
            },
            success: function (data) {
                new_data = refine_autocomplete_data_custom(data, field, seprator);
                localStorage.setItem(local_data_key, JSON.stringify(new_data));

                var waiting = select2_inflight[local_data_key] || [apply_select2_data];
                delete select2_inflight[local_data_key];
                for (var w = 0; w < waiting.length; w++)
                {
                    waiting[w](new_data);
                }
            },
            error: function (xhr) {
                // Clear first so the retry below (and any later caller) can refetch.
                delete select2_inflight[local_data_key];
                var status_code = xhr.status;
                if (status_code == 401) {
                    refreshToken().then(function () {
                        // Retry original request after token is refreshed
                        select2_ajax(element, url, field, filters, original_parent, selected_value, true);
                    }).catch(function () {
                        // Refresh token failed — redirect to login
                        window.location.href = cdn_url + 'auth/login';
                    });
            
                    return; // Stop further execution
                }
            }
        });
}

}

function select2_tag(element, url, field, filters, parent, selected_value = null, force_load)
{
    var placeholder = 'Select';
    var original_parent = parent;
    var force_loading = false;
    if (typeof force_load !== 'undefined' && force_load == true)
    {
        force_loading = true;
    }

    var new_placeholder = $(element).find("option:first").html();
    var query_str = $.param(filters);
    var local_data_key = 'local_cache_' + url + '_' + query_str + '_select_data';
    if (typeof new_placeholder !== 'undefined')
    {
        placeholder = new_placeholder;
    }
    if (typeof filters === 'undefined' || filters == null)
    {
        filters = '';
    }
    if (typeof field === 'undefined' || field == null)
    {
        field = 'title';
    }

    if (typeof parent === 'undefined' || parent == 'body')
    {
        parent = 'body';
    } else
    {
        parent = '#' + parent;
    }


    $(element).select2({
        tags: true, // Allows adding new options
        createTag: function (params) {
            return {
                id: params.term,
                text: params.term,
                newOption: true // Mark this as a new option
            };
        },
        placeholder: 'Loading...',
        allowClear: true,
        minimumResultsForSearch: -1,
        dropdownParent: $(parent),
        dropdownAdapter: select2adapter
    });
    $.ajax({
        url: url,
        dataType: 'json',
        cache: false,
        async: true,
        beforeSend: function (xhr, settings) {
            ajs.set_auth_header(xhr, settings);
        },
        data: {
            filters: filters, field: field, length: 1000
        },
        success: function (data) {
            new_data = refine_autocomplete_data_custom(data, field);
            localStorage.setItem(local_data_key, JSON.stringify(new_data));
            $(element).select2({
                tags: true, // Allows adding new options
                createTag: function (params) {
                    return {
                        id: params.term,
                        text: params.term,
                        newOption: true // Mark this as a new option
                    };
                },
                templateResult: function (data) {
                    // Highlight new options in the dropdown list
                    return data.newOption ? $('<span style="font-weight: bold;">' + data.text + '</span>') : data.text;
                },
                templateSelection: function (data) {
                    // Customize how selected options are displayed
                    return data.text;
                },
                placeholder: placeholder,
                dropdownParent: $(parent),
                dropdownAdapter: select2adapter,
                allowClear: true,
                data: new_data,
//                    templateSelection: function (data, container) {
//                        $(data.element).attr('data-title', data.title);
//                    }
            });
            if (typeof selected_value !== 'undefined' && selected_value)
            {
                selected_value = String(selected_value);
                var preselectedValues;
                if (selected_value.includes(',')) {
                    preselectedValues = selected_value.split(',');
                } else {
                    preselectedValues = [selected_value];
                }

                $(element).val(preselectedValues).trigger('change');
            }
        },
        error: function (xhr) {
            var status_code = xhr.status;
            if (status_code == 401) {
                refreshToken().then(function () {
                    // Retry original request after token is refreshed
                    select2_tag(element, url, field, filters, original_parent, selected_value, true)
                }).catch(function () {
                    // Refresh token failed — redirect to login
                    window.location.href = cdn_url + 'auth/login';
                });
        
                return; // Stop further execution
            }
        }
    });

    $(element).on('select2:select', function (e) {
        if (e.params.data.newOption) {
            $(element).closest('tr').find('.sell-value').removeAttr('readonly');
            $(element).closest('tr').find('.sell-value').prop('required', true);
            $(element).closest('tr').find('.labor-value').removeAttr('readonly');
            $(element).closest('tr').find('.labor-value').prop('required', true);
        } else {
            $(element).closest('tr').find('.sell-value').attr('readonly', 'readonly');
            $(element).closest('tr').find('.sell-value').val(0).removeAttr('required');
            $(element).closest('tr').find('.labor-value').attr('readonly', 'readonly');
            $(element).closest('tr').find('.labor-value').val(0).removeAttr('required');
        }
    });

    $(element).on('select2:unselect', function (e) {
        if (e.params.data.newOption) {
            const hasNewTags = $('#mySelect').find("option[data-select2-tag=true]").length > 0;
            $(element).closest('tr').find('.sell-value').attr('readonly', 'readonly');
            $(element).closest('tr').find('.sell-value').removeAttr('required');
            $(element).closest('tr').find('.labor-value').attr('readonly', 'readonly');
            $(element).closest('tr').find('.labor-value').removeAttr('required');
        }
    });

}

/**
 * Helper to initialize a Select2 for users (first_name + last_name) via select2_ajax.
 * element: selector, filters: object, parent: container id or 'body', selected_value: preselected id(s)
 */
function select2_ajax_users(element, filters = null, parent = 'body', selected_value = null, force_load = false) {
    return select2_ajax(element, site_url + 'api/user_autocomplete', ['first_name', 'last_name'], filters, parent, selected_value, force_load, '');
}


function add_autocomplete(element, table, fields, add_fields)
{
    if (typeof fields === 'undefined')
    {
        fields = ['title'];
    }
    if (typeof add_fields === 'undefined')
    {
        add_fields = '';
    }

    var el_name = $(element).attr('name');
    $("<input>").attr("type", "hidden").attr('name', el_name + '_val').attr('id', el_name + '_val').insertAfter($(element));
    $(element).autocomplete({
        source: function (request, response) {
            var data = {q: request.term, table: table, fields: fields, add_fields: add_fields};
            ajs.ajax_form(site_url + "api/autocomplete", data, 'GET', null, '1', '1', refine_autocomplete_data, refine_autocomplete_data, response);
        },
        minLength: 3,
        select: function (event, ui) {
            $(element).val(ui.item.label);
            $('#' + el_name + '_val').val(ui.item.id);
        },
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });
}

function shorten_file_name(name, maxLength = 20) {
    const ext = name.split('.').pop();
    const base = name.substring(0, name.lastIndexOf('.'));

    if (base.length <= maxLength) return name;

    return base.substring(0, maxLength) + '...' + ext;
}

function init_dropzone(element, previewsContainer, previewList, uploadType, acceptedFiles = 'image/*', fileType = 'image', existingFiles = [])
{
    var dropzonePreviewNode = document.querySelector(previewList);
    if (dropzonePreviewNode) {
        dropzonePreviewNode.id = "";
        var previewTemplate = dropzonePreviewNode.outerHTML;
        dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode);
        var dropzone = new Dropzone(element, {
            url: site_url + 'api/file/upload_s3',
            method: "post",
            paramName: "upload",
            maxFiles: 6,
            maxFilesize: 10,
            acceptedFiles: acceptedFiles,
            previewTemplate: previewTemplate,
            previewsContainer: previewsContainer,
            dictRemoveFileConfirmation: 'Are you sure?',
            init: function () {

                this.on("sending", function (_, xhr, formData) {
                    let settings = this.options; // Access Dropzone settings

                    ajs.submit_button_element = $(element).closest('form').find('#add-btn');
                    // Set your authorization token here
                    ajs.set_auth_header(xhr, settings);
                    ajs.show_button_loader_media();
                    let isEnabledEnc = localStorage.getItem('isEnabledEnc');
                    if (isEnabledEnc == true) {
                        var data = $.param({upload_type: uploadType, file_type: fileType});
                        var enc_data = ajs.encrypt(data, true);
                        formData.append("encrypted_data", enc_data);
                    } else {
                        formData.append("upload_type", uploadType);
                        formData.append("file_type", fileType);
                    }
                });
                this.on("error", function (file, errorMessage, xhr) {
                    const dz = this;
                    if (xhr && xhr.status === 401) {
                        refreshToken().then(() => {
                            // Retry upload manually
                            dz.removeFile(file); // remove previous failed one
                            dz.addFile(file);
                        });
                    } else {
                        Swal.fire("Upload Failed", "Something went wrong uploading this file.", "error");
                    }
                });
                this.on("addedfile", function (file) {

                    // Set hidden input value  for existing file
                    if (file.status == 'existing') {
                        var caption = file.previewElement.querySelector('.caption-input');
                        if (caption) {
                            caption.value = file.caption;
                        }

                        var idInput = file.previewElement.querySelector('.id-input');
                        if (idInput) {
                            idInput.value = file.id;
                        }

                        var name = file.previewElement.querySelector('.name-input');
                        if (name) {
                            // upload_path is the stored S3 key, kept whole for files that were
                            // already saved; file.name is only the basename shown on the tile.
                            // Posting the basename saved a second, path-less row whose URL
                            // resolved to nothing - a duplicate that rendered as a broken image.
                            name.value = file.upload_path || file.name;
                        }

                    }
                });
                this.on("removedfile", function (file) {
                    // for remove file from server
                    var idInput = file.previewElement.querySelector('.id-input');
                    var deleteBtn = file.previewElement.querySelector('.btn-danger');
                    if (idInput && idInput.value > 0 && deleteBtn) {
                        var deleteUrl = deleteBtn.dataset.deleteUrl + idInput.value;
                        ajs.ajax_form(site_url + deleteUrl, null, 'DELETE', null, '1', '1');
                    }
                });
                this.on("success", function (file, response) {
                    // Handle successful upload
                    var hiddenInput = file.previewElement.querySelector('.name-input');
                    if (hiddenInput && response.status) {
                        hiddenInput.value = response.upload_path + response.file_name;
                    }
                });
                this.on("complete", function () {
                    ajs.hide_button_loader();
                });
            }
        });
        if (existingFiles.length) {
            existingFiles.forEach(function (file) {
                const path = file.name;
                // Keep the full key for the value that gets posted back; only the visible
                // tile label is shortened to the basename.
                file.upload_path = path;
                file.name = path.split('/').pop();
                //file.name = shorten_file_name(file.name, 12);
                file.status = 'existing';
                var fileUrl = cdn_url + 'assets/images/new-document.png';
                if (fileType == 'image' || (file?.file_type && file.file_type == 'image')) {
                    var fileUrl = get_url_uploaded_file(path);
                }
                dropzone.displayExistingFile(file, fileUrl, null, 'anonymous');
            });
        }
    }
}

function set_page_history() {
    const history = JSON.parse(localStorage.getItem('page_history')) || [];  
    const newEntry = {
        title: document.title,
        url: window.location.href,
        timestamp: new Date().toISOString()
    };  
    // Push new page to history
    history.unshift(newEntry);
  
    // limit to last 20 pages
    if (history.length > 20) history.pop();
  
    localStorage.setItem('page_history', JSON.stringify(history));
}

function set_breadcrumb(breadcrumbs) {
    var breadcrumb_html = "";
    var page_title = "";
    $.each(breadcrumbs, function (index, breadcrumb) {
        var label = truncate_string(breadcrumb.label);
        if (index == 0) {
            page_title += label; 
            label = '<h4>' + label + '</h4>';
        } else {
            page_title += " | "+label;
        }
        if (breadcrumb.url != null) {
            var style = breadcrumb.url == 'javascript: void(0);' ? 'cursor: default;' : '';
            breadcrumb_html += '<li class="breadcrumb-item"><a href="' + breadcrumb.url + '" style="' + style + '">' + label + '</a></li>';
        } else {
            breadcrumb_html += '<li class="breadcrumb-item active">' + label + '</li>';
        }
    });
    $("#breadcrumbs").html(breadcrumb_html);
    $("title").html(page_title);
    set_page_history();
}

// for get url of uploaded file
function get_url_uploaded_file(file_name) {
    return encodeURI(s3_url + '/' + file_name);
}

// Mirrors ppm_frequencies() on the API side: how many "Freq. Except" options each PPM
// frequency offers, 0 meaning the field is disabled. The six master-plan screens each carried
// their own copy of this rule, so a new frequency had to be remembered in six places.
// Accepts the stored name or the single letter, because the screens pass both.
const PPM_FREQUENCY_EXCEPT_COUNTS = {
    'Weekly': 5, 'W': 5,
    'Monthly': 12, 'M': 12,
    'Quarterly': 4, 'Q': 4,
    'Half Yearly': 2, 'H': 2,
    'Yearly': 0, 'A': 0
};

function ppm_except_count(frequency) {
    return PPM_FREQUENCY_EXCEPT_COUNTS[frequency] || 0;
}

// Mirrors the same ppm_frequencies() spec, name -> display letter, for the masterplan list
// grids (contract and property). Previously duplicated as a local frequencyMap in each list
// file, so a new frequency showed its full name there until someone remembered to add it.
const PPM_FREQUENCY_LETTERS = {
    'Weekly': 'W', 'Monthly': 'M', 'Quarterly': 'Q', 'Half Yearly': 'H', 'Yearly': 'A'
};

const isEmpty = (str) => !str || !str.trim().length;

// set default value for empty string
const setDefValue = (str) => !isEmpty(str) ? str : 'N/A';

const pluck = (arr, key) => arr.map(i => i[key]);
// for truncate string
const truncate_string = (string, maxLength = 25) => string && string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

// for remove underscore and format string
const format_string = (string) =>
    isEmpty(string) ? '' : string.toLowerCase()
            .replace(/_/g, ' ')
            .replace(/"/g, '')
            .replace(/^./, char => char.toUpperCase());

function gen_client_detail_link(id, title) {
    const link = `<button type="button"  value="${id}" class="btn btn-link ms-1  popup-form-view-button popup-add-btn" data-heading="View Client"  data-form-url="${cdn_url}clients/details" style="display:block !important">${title}</button>`;
    return link;
}

function task_detail_url(taskId){
    return `task/${taskId}/detail`;
}

function gen_property_detail_link(id, title) {
    const link = `<button type="button"  value="${id}" class="btn btn-link ms-1  popup-form-view-button popup-add-btn" data-heading="View Property"  data-form-url="${cdn_url}properties/details" style="display:block !important">${title}</button>`;
    return link;
}

function gen_contract_detail_link(id, title) {
    const link = `<button type="button"  value="${id}" class="btn btn-link ms-1  popup-form-view-button popup-add-btn" data-heading="View Contract"  data-form-url="${cdn_url}contract/details" style="display:block !important">${title}</button>`;
    return link;
}

function detail_icon() {
    return '<div class="details-control cursor-pointer"><i class="ri-arrow-down-s-line align-bottom"></i></div>';
}

function view_icon(force = false) {
    if (force) {
        return '<i title="View" class="ri-eye-line align-bottom me-2 primary-btn fs-15"></i>';
    }
    return '<i title="View" class="ri-eye-line align-bottom me-2 primary-btn fs-15 hide"></i>';
}

function edit_icon() {
    return '<i title="Edit" class="ri-pencil-line align-bottom me-2 primary-btn cursor-pointer fs-15"></i>';
}

function delete_icon(id, master_data_type) {
    return `<a class="btn btn-danger waves-effect waves-light list_delete" data-type="${master_data_type}" data-id="${id}" data-action="delete"  data-bs-toggle="modal" href="#deleteModal"><i class="ri-delete-bin-line align-bottom me-2 fs-15"></i>Delete</a>`;
}

function logout_icon(id, master_data_type) {
    return `<a class="list_logout" data-type="${master_data_type}" data-id="${id}" data-action="force_logout"  data-bs-toggle="modal" href="#logoutModal"><i class="ri-logout-box-line   align-bottom me-2 primary-btn fs-15"></i></a>`;
}

function status_icon(id, master_data_type, status) {
    const icon = status == 1 ? 'ri-checkbox-circle-line' : 'ri-indeterminate-circle-line';
    return `<a class="list_status edit-btn" data-type="${master_data_type}" data-id="${id}" data-action="change-status" data-bs-toggle="modal" href="#changeStatusModal"><i class="${icon} align-bottom me-2 primary-btn fs-15"></i></a>`;
}

function getMinDateMessage(element) {
    var minDate = $(element).attr("min");
    return `Please enter greater than or equal to ${moment(minDate).format('DD-MMM-YYYY')}`;
}

function showCounter() {
    var e = document.querySelectorAll(".counter-value");

    function s(e) {
        return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    e && Array.from(e).forEach(function (o) {
        !function e() {
            var t = +o.getAttribute("data-target"),
                    a = +o.innerText,
                    n = t / 250;
            n < 1 && (n = 1), a < t ? (o.innerText = (a + n).toFixed(0), setTimeout(e, 1)) : o.innerText = s(t), s(o.innerText)
        }()
    })
}

$(document).on('click', '.popup-form-button', function (e) {
    e.stopPropagation();
    ajs.show_loader();
    var form_link = $(this).data('form-url');
    var heading = $(this).data('heading');
    var after_load_func = $(this).data('after-load-func');
    //ajs.showModalFormDialog(form_link, heading, after_load_func);
    ajs.showOffCanvasFormRight(form_link, heading, after_load_func);
    ajs.hide_loader();
    return false;
});
$(document).on('click', '.popup-form-button-master', function (e) {
    e.stopPropagation();
    ajs.show_loader();
    var form_link = $(this).data('form-url');
    var heading = $(this).data('heading');
    var element = $(this).data('element');
    var width = $(this).data('width');
    var after_load_func = $(this).data('after-load-func');
    var off_canvas_id = $(this).data('canvas-element');
    //ajs.showModalFormDialog(form_link, heading, after_load_func);
    ajs.showOffCanvasFormRightSmall(form_link, heading, element, after_load_func, off_canvas_id, width);
    ajs.hide_loader();
    return false;
});
$(document).on('click', '.popup-form-search-button', function (e) {
    e.stopPropagation();
    ajs.show_loader();
    var form_link = $(this).data('form-url');
    var heading = $(this).data('heading');
    var element = $(this).data('element');
    var after_load_func = $(this).data('after-load-func');
    ajs.showModalSearch(form_link, heading, after_load_func, element);
    ajs.hide_loader();
    return false;
});
$(document).on('click', '.popup-form-view-button', function (e) {
    e.stopPropagation();
    ajs.show_loader();
    var form_link = $(this).data('form-url');
    var heading = $(this).data('heading');
    var element = $(this).data('element');
    var value = $(this).val();
    ajs.showModalView(form_link, heading, element, value);
    ajs.hide_loader();
    return false;
});
// Statuses where the engineer has already begun. Mirrors
// started_task_status_codes() in job/job_helper.php.
var STARTED_TASK_STATUS_CODES = ['ON_ROUTE', 'ARRIVED', 'START_TASK'];

function open_task_popup_form(el) {
    ajs.show_loader();
    var form_link = $(el).data('form-url');
    var heading = $(el).data('heading');
    var element = $(el).data('element');
    var job_id = $(el).data('job-id');
    var after_load_func = $(el).data('after-load-func');
    //ajs.showModalFormDialog(form_link, heading, after_load_func);
    // create_task_form() always widens this panel to .custom-offcanvas-right (56%) once the
    // form loads - apply that class up front so the panel opens at its final size instead of
    // growing after the AJAX call completes.
    $('#offcanvasRight3').addClass('custom-offcanvas-right').removeClass('custom-offcanvas-right3');
    ajs.showOffCanvasFormRightSmall(form_link, heading, element, after_load_func, "offcanvasRight3", 750, function () {
        init_dropzone('#dropzone-docs', '#dropzone-doc-preview', '#dropzone-doc-preview-list', 'assets', 'application/pdf', 'doc');
    });
    ajs.hide_loader();
}

$(document).on('click', '.popup-form-button-task', function (e) {
    e.stopPropagation();
    var self = this;
    var status_code = $(this).data('task-status-code');

    // Gated on .edit-task only: Copy Task and Force Reassign share this handler,
    // and Force Reassign is precisely the tool for a started task.
    if ($(this).hasClass('edit-task') && STARTED_TASK_STATUS_CODES.indexOf(status_code) !== -1) {
        if (!ajs.can_edit_started_task()) {
            Swal.fire({
                title: 'Not Allowed',
                text: 'This task has already started, so only an admin can edit it.',
                icon: 'warning',
                confirmButtonText: 'Ok',
                customClass: { confirmButton: 'btn btn-primary' },
                buttonsStyling: false,
            });
            return false;
        }

        Swal.fire({
            title: 'Task already started',
            text: 'This task has already started. Editing it now may conflict with the work the engineer is doing. Continue?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, edit',
            cancelButtonText: 'Cancel',
            customClass: { confirmButton: 'btn btn-primary me-2', cancelButton: 'btn btn-light' },
            buttonsStyling: false,
        }).then(function (r) {
            if (r.isConfirmed) {
                open_task_popup_form(self);
            }
        });
        return false; // block this open; reopen only after confirm
    }

    open_task_popup_form(this);
    return false;
});
$(document).on('click', '.popup-form-button-sors', function (e) {
    e.stopPropagation();
    ajs.show_loader();
    var form_link = $(this).data('form-url');
    var heading = $(this).data('heading');
    var element = $(this).data('element');
    var after_load_func = $(this).data('after-load-func');
    ajs.showOffCanvasFormRightSmall(form_link, heading, element, after_load_func, "offcanvasRight3", 850);
    ajs.hide_loader();
    return false;
});
$(document).on('click', '.list_status, .list_delete', function (e) {

    e.stopPropagation();
    var data_type = $(this).data('type');
    var data_id = $(this).data('id');
    var data_action = $(this).data('action');
    var data_callback = $(this).data('callback');
    $('#data_type_id').val(data_type);
    $('#data_type').val(data_id);
    $('#data_type_action').val(data_action);
    if (data_callback !== '')
    {
        ajs.callback_after_delete = data_callback;
    }
    return false;
});
$(document).on('click', '.list_logout', function (e) {

    e.stopPropagation();
    var data_type = $(this).data('type');
    var data_id = $(this).data('id');
    var data_action = $(this).data('action');
    var data_callback = $(this).data('callback');
    $('#data_type_id').val(data_type);
    $('#data_type').val(data_id);
    $('#data_type_action').val(data_action);
    if (data_callback !== '')
    {
        ajs.callback_after_delete = data_callback;
    }
    return false;
});
$(document).on('click', '#delete-record-button, #change-record-status-button', function (e) {

    var data_type = $('#data_type_id').val();
    var data_id = $('#data_type').val();
    var data_action = $('#data_type_action').val();
    var method = 'GET';
    if (typeof data_type !== 'undefined' && typeof data_id !== 'undefined' && typeof data_action !== 'undefined')
    {
        if (data_action == 'delete')
        {
            method = 'DELETE';
        }
        ajs.ajax_form(site_url + data_type + "/" + data_action + "/" + data_id, null, method, null, '1', '1', ajs_form_handler.api_response, ajs_form_handler.api_response);
        $('#deleteModal').modal('hide');
        $('#changeStatusModal').modal('hide');
        $('#offcanvasRight').offcanvas('hide');
        ajs.refreshDataTable();
        if (ajs.callback_after_delete !== '' && typeof window[ajs.callback_after_delete] == 'function')
        {
            window[ajs.callback_after_delete].call();
        }
    }

});

$(document).on('click', '#force-logout-button', function (e) {

    var data_type = $('#data_type_id').val();
    var data_id = $('#data_type').val();
    var data_action = $('#data_type_action').val();
    if (typeof data_type !== 'undefined' && typeof data_id !== 'undefined' && typeof data_action !== 'undefined')
    {
        if (data_action == 'delete')
        {
            method = 'DELETE';
        }
        var data = {user_id: data_id}
        ajs.ajax_form(site_url + 'auth/force_logout', data, 'POST', null, '1', '1', ajs_form_handler.api_response, ajs_form_handler.api_response);
        $('#logoutModal').modal('hide');
        ajs.refreshDataTable();
        if (ajs.callback_after_delete !== '' && typeof window[ajs.callback_after_delete] == 'function')
        {
            window[ajs.callback_after_delete].call();
        }
    }

});
$(document).ready(function () {
    $("#deleteModal, #changeStatusModal").on("hide.bs.modal", function () {
        $('#data_type_id').val('');
        $('#data_type').val('');
        $('#data_type_action').val('');
    });
    //ajs.checkLogin();

    // override the dropzone confirm box for removed file
    if (typeof Dropzone != 'undefined') {
        Dropzone.confirm = function (question, accepted, rejected) {

            Swal.fire({
                title: question,
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#fa896b",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    return accepted();
                } else if (rejected != null) {
                    return rejected();
                }
            });
        };
    }

    $('.date-range-picker').daterangepicker({
        "autoUpdateInput": false,
        "showDropdowns": true,
        "showWeekNumbers": true,
        "locale": {
            format: 'DD/MM/YYYY',
            cancelLabel: 'Clear'
        },
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        "alwaysShowCalendars": true
    }, function (start, end, label) {
        console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
    });
    $('.date-range-picker').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
        //picker.setStartDate({});
        //picker.setEndDate({});
    });

    jQuery.extend(jQuery.validator.messages, {
        required: "Required field.",
    });
});
$(document).on('click', '.process-bulk-upload', function (e) {

    upload_batch_id = $(this).data('batch-id');
    selected_rows = $('#selected_rows').val();
    selected_rows_update = $('#selected_rows_update').val();
    data_type = $('#data_type_bulk_upload').val();
    if($(this).data('action') == 'import_new_records'){
        selected_rows_update = '';
    }
    Swal.fire({
        title: "Are you sure want to import the data? This action can't be undone",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Import",
        denyButtonText: "Cancel"
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            // Show loader modal
            Swal.fire({
                title: 'Importing...',
                //html: 'Please wait while the data is being imported.',
                html: '<div class="small text-muted mb-2" id="bulk-import-status-text">Please wait while the data is being imported.</div>'
                    + '<div id="bulk-import-progress-container" style="display:none;">'
                    + '  <div class="progress">'
                    + '    <div class="progress-bar progress-bar-striped progress-bar-animated" id="bulk-import-progress-bar" style="width:0%;">0%</div>'
                    + '  </div>'
                    + '  <div class="small mt-2" id="bulk-import-count-text"></div>'
                    + '</div>',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                showCancelButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            setTimeout(() => {
                ajs_form_handler.process_bulk_upload(upload_batch_id, selected_rows, selected_rows_update, data_type);
                ajs.closeBulkUpload();
            }, 200);
        } else if (result.isDenied) {
            Swal.fire("Data import cancelled", "", "info");
        }
    });
});

// Toast-like progress notification HTML template
function getBulkImportToastHTML() {
    return `
        <div id="bulk-import-toast" class="position-fixed bottom-0 end-0 p-3" style="z-index: 9999; width: 100%; max-width: 400px;">
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-light">
                    <i class="ri-download-cloud-line me-2"></i>
                    <strong class="me-auto">Bulk Import Progress</strong>
                    <button type="button" class="btn-close btn-close-bulk-import" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    <div id="bulk-import-status-text-toast" class="small text-muted mb-2">Please wait while the data is being imported.</div>
                    <div id="bulk-import-progress-container-toast" style="display:none;">
                        <div class="progress mb-2" style="height: 24px;">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" id="bulk-import-progress-bar-toast" style="width:0%; font-weight: bold; line-height: 24px;">0%</div>
                        </div>
                        <div class="small text-muted" id="bulk-import-count-text-toast"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Initialize bulk import toast on page load
function initBulkImportProgressIfNeeded() {
    var activeBatch = sessionStorage.getItem('bulk_import_batch_id');
    if (activeBatch) {
        startBulkImportProgress(activeBatch, true);
    }
}

// Store batch info in session storage
function saveBulkImportSession(batch_id) {
    sessionStorage.setItem('bulk_import_batch_id', batch_id);
    sessionStorage.setItem('bulk_import_start_time', new Date().getTime());
}

// Clear bulk import session
function clearBulkImportSession() {
    sessionStorage.removeItem('bulk_import_batch_id');
    sessionStorage.removeItem('bulk_import_start_time');
}

function startBulkImportProgress(batch_id, isResuming = false) {
    if (!batch_id) {
        return;
    }

    // Save to session storage so it persists across page refresh
    if (!isResuming) {
        saveBulkImportSession(batch_id);
    }

    var intervalId = null;
    var toastContainer = document.getElementById('bulk-import-toast');

    // Create toast if it doesn't exist
    if (!toastContainer) {
        document.body.insertAdjacentHTML('beforeend', getBulkImportToastHTML());
        toastContainer = document.getElementById('bulk-import-toast');
    }

    // Show toast
    var toastElement = toastContainer.querySelector('.toast');
    if (toastElement && !toastElement.classList.contains('show')) {
        toastElement.classList.add('show');
    }

    function updateProgressView(resp) {
        var data = resp.data || null;
        if (!data) {
            return;
        }
        var status = data.status || '';
        var total_rows = data.total_rows || 0;
        var processed_rows = data.processed_rows || 0;
        var remaining_rows = data.remaining_rows || 0;
        var percentage = data.progress_percentage || 0;

        var statusText = document.getElementById('bulk-import-status-text-toast');
        var progressContainer = document.getElementById('bulk-import-progress-container-toast');
        var progressBar = document.getElementById('bulk-import-progress-bar-toast');
        var countText = document.getElementById('bulk-import-count-text-toast');

        if (statusText) {
            statusText.textContent = 'Import in progress...';
        }
        if (progressContainer) {
            progressContainer.style.display = '';
        }

        var pct = Math.max(0, Math.min(100, parseFloat(percentage) || 0));
        var pctText = (Math.round(pct * 100) / 100).toString().replace(/\.0+$/, '').replace(/(\.\d*[1-9])0+$/, '$1');

        if (progressBar) {
            progressBar.style.width = pct + '%';
            progressBar.textContent = pctText + '%';
        }
        if (countText) {
            countText.textContent = 'Processed ' + processed_rows + ' of ' + total_rows + ' (remaining: ' + remaining_rows + ')';
        }

        if (status === 'completed' || status === 'failed') {
            if (intervalId) {
                clearInterval(intervalId);
            }

            // Update toast content to show completion
            var toastBody = toastContainer.querySelector('.toast-body');
            var title = 'Import ' + (status === 'completed' ? 'Completed' : 'Failed');
            var iconClass = status === 'completed' ? 'ri-check-double-line text-success' : 'ri-close-circle-line text-danger';

            toastBody.innerHTML = `
                <div class="d-flex align-items-center">
                    <i class="${iconClass} me-2" style="font-size: 20px;"></i>
                    <div>
                        <strong>${title}</strong><br>
                        <small class="text-muted">Processed ${processed_rows} of ${total_rows} row(s).</small>
                    </div>
                </div>
            `;

            // Update header color based on status
            var toastHeader = toastContainer.querySelector('.toast-header');
            if (status === 'completed') {
                toastHeader.classList.remove('bg-light');
                toastHeader.classList.add('bg-success');
                toastHeader.style.color = 'white';
                toastHeader.querySelector('strong').style.color = 'white';
            } else {
                toastHeader.classList.remove('bg-light');
                toastHeader.classList.add('bg-danger');
                toastHeader.style.color = 'white';
                toastHeader.querySelector('strong').style.color = 'white';
            }

            if (typeof ajs.refreshDataTable === 'function') {
                ajs.refreshDataTable();
            }

            // Auto-hide toast after 5 seconds
            setTimeout(function () {
                if (toastElement) {
                    toastElement.classList.remove('show');
                    setTimeout(function () {
                        if (toastContainer && toastContainer.parentNode) {
                            toastContainer.parentNode.removeChild(toastContainer);
                        }
                    }, 300);
                }
                clearBulkImportSession();                
            }, 5000);
        }
    }

    function poll() {
        ajaxWithRefresh({
            url: site_url + 'api/bulk_import/queue_progress/' + batch_id,
            method: 'GET'
        }).then(function (resp) {
            updateProgressView(resp);
        }).catch(function (err) {
            console.error('Bulk import progress polling error', err);
        });
    }

    // Initial call and then poll every 5 seconds
    poll();
    intervalId = setInterval(poll, 5000);

    // Handle toast close button
    var closeButton = toastContainer.querySelector('.btn-close-bulk-import');
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            if (intervalId) {
                clearInterval(intervalId);
            }
            clearBulkImportSession();
            setTimeout(function () {
                if (toastContainer && toastContainer.parentNode) {
                    toastContainer.parentNode.removeChild(toastContainer);
                }
            }, 300);
        });
    }
}

// Resume bulk import progress on page load if there's an active import
document.addEventListener('DOMContentLoaded', function () {
    initBulkImportProgressIfNeeded();
});

$(document).on('click', '.add-ajs-contacts', function (e) {
    var parent_div = 'client_create_ajs_contact_form';
    var input_div = 'contact_ajs_input_field_div';
    var length = $('.' + input_div).length;
    var data = $("." + input_div + ":last").eq(0).clone();
    data.css('display', '');
    data.addClass(input_div + '_' + length);
    $('#' + parent_div).append(data);
    $('.' + input_div + '_' + length).find('.account_manager').addClass('account_manager_' + length);
    $('.' + input_div + '_' + length).find('.account_manager').attr('data-id', length);
    $('.' + input_div + '_' + length).find('.ajs_contact_type').addClass('ajs_contact_type_' + length).attr('id', 'ajs_contact_type_' + length);
    $('.' + input_div + '_' + length).find('.ajs_contact_type').attr('data-id', length);
    $('.' + input_div + '_' + length).find('.popup-add-btn').attr('data-element', 'ajs_contact_type_' + length);
    data.find("input[name='is_new_ajs_contact[]']").val('1');
    var filter4 = {master_code: "USER_TYPES"};

    select2_ajax($('.ajs_contact_type_' + length), site_url + 'master-record/get_all', 'master_value', filter4, 'offcanvasRight');

    $('.ajs_contact_type_' + length).on('change', function () {
        var contact_type = $(this).val();
        if ($('.account_manager_' + length).data('select2')) {
            $('.account_manager_' + length).val('').trigger('change'); // Destroy Select2 instance
            $('.account_manager_' + length).select2('destroy'); // Destroy Select2 instance

        }
        select2_ajax_users($('.account_manager_' + length), {user_type: contact_type}, 'offcanvasRight');
    });
});


$(document).on('click', '.add-client-contacts', function (e) {
    var parent_div = 'client_create_contact_form';
    var input_div = 'contact_input_field_div';
    var length = $('.' + input_div).length;
    var data = $("." + input_div + ":last").eq(0).clone();
    data.css('display', '');
    data.addClass(input_div + '_' + length);
    data.find("input[name='is_new_contact[]']").val('1');
    $('#' + parent_div).append(data);
    $('.' + input_div + '_' + length).find('.contact_type').addClass('contact_type_' + length).attr('id', 'contact_type_' + length);
    $('.' + input_div + '_' + length).find('.popup-add-btn').attr('data-element', 'contact_type_' + length);
    var filter2 = {master_code: "CONTACT_TYPE"};
    select2_ajax($('.contact_type_' + length), site_url + 'master-record/get_all', 'master_value', filter2, 'offcanvasRight');
    ajs.mask_inputs();
});
$(document).on('click', '.add-property-alerts', function (e) {
    // The quick-edit popup uses its own container/template ids so it can coexist with
    // the property form's alert editor on the same document.
    var parent_div = $(this).data('parent-div') || 'property_alert_form';
    var input_div = $(this).data('input-parent') || 'alerts_input_field_div';
    var length = $('.' + input_div).length;
    var data = $("." + input_div + ":last").eq(0).clone();
    data.css('display', '');
    data.addClass(input_div + '_' + length);
    data.find('.warning_message_select').each(function () {
        if ($(this).hasClass('select2-hidden-accessible')) {
            $(this).select2('destroy');
        }
    });
    data.find('.warning_message_text').val('').show().prop('disabled', false).attr('name', 'messages[]');
    data.find('.resident_alert_ids_hidden').val('').prop('disabled', true).removeAttr('name');
    data.find('.warning_message_select').val(null).hide().prop('disabled', true);
    data.find('.warning_type').val('');
    $('#' + parent_div).append(data);
    if (typeof initPropertyAlertRow === 'function') {
        initPropertyAlertRow(data);
    }
});
$(document).on('click', '.remove-parent-btn', function (e) {
    var parent_div = $(this).data('parent-div');
    var remove_url = $(this).data('remove-url');
    var id = $(this).data('id');
    var remove_data_type = $(this).data('remove');
    if (typeof remove_url !== 'undefined' && typeof id !== 'undefined')
    {
        ajs.ajax_form(remove_url, null, 'DELETE', null, '1', '1');
    }
    if (typeof parent_div !== 'undefied')
    {
        $(this).closest('.' + parent_div).remove();
    }
});
$(document).on('click', '.add-service-certificates', function (e) {
    var parent_div = 'service_create_certificate_form';
    var input_div = 'certificate_input_field_div';
    var length = $('.' + input_div).length;
    // Prefer the pristine hidden template when the page provides one (job types, sors), so a new
    // row never inherits the previous row's mapping PK, remove-button data-id or select2 markup.
    // Screens without that template id (tasks, jobs) keep the original clone-the-last-row behaviour.
    var cert_template = $('#certificate_input_field_template');
    var data = cert_template.length ? cert_template.clone().removeAttr('id') : $("." + input_div + ":last").eq(0).clone();
    data.css('display', '');
    data.addClass(input_div + '_' + length);
    $('#' + parent_div).append(data);
    $('.' + input_div + '_' + length).find('.certificate_id').addClass('certificate_id_' + length);
    //$('.' + input_div + '_' + length).find('.certificate-required-radio').attr('name','certificate_required[' + length + ']');
    data.find("input[name='is_new_certificate[]']").val('1');
    data.find("input[name='service_certificate_id[]']").val('0');
    data.find("input[name='sor_certificate_id[]']").val('0');
    select2_ajax($('.certificate_id_' + length), site_url + 'certificate/get_all', 'title', null, 'offcanvasRight');
});
$(document).on('click', '.add-group-sor', function (e) {
    var parent_div = 'group_sor_form';
    var input_div = 'group_sor_input_field_div';
    var length = $('.' + input_div).length;
    var data = $("." + input_div + ":last").eq(0).clone();
    data.css('display', '');
    data.addClass(input_div + '_' + length);
    $('#' + parent_div).append(data);
    $('.' + input_div + '_' + length).find('.group_sor_id').addClass('group_sor_id_' + length);
    //$('.' + input_div + '_' + length).find('.certificate-required-radio').attr('name','certificate_required[' + length + ']');
    data.find("input[name='is_new_group_sor[]']").val('1');
    select2_ajax($('.group_sor_id_' + length), site_url + 'sor/get_all', 'title', null, 'offcanvasRight');
});
$(document).on('change', '.select2-hidden-accessible', function () {
    $(this).parent().next('.error').empty();
    $(this).next().next('.error').empty();
});
$(document).on('click', '.page-history-btn', function () {
    ajs.show_page_history();
});
$(document).on('hidden.bs.modal', '#large_modal,#view_modal', function () {
    var $modal = $(this);

    setTimeout(function () {
        $modal.find('.modal-body').empty();
    }, 100);
});
$(function () {
    $('#notificationDropdown').on('shown.bs.dropdown', function () {
        setTimeout(function () {
            ajs.ajax_form(site_url + 'api/notifications', null, 'GET', null, '0', '0', ajs.set_notifications, ajs.set_notifications);
        }, 20);
    });

    $('.system-nav,.client-sub-nav').find('a.nav-link').each(function (i, obj) {
        var module = $(this).data('module');
        var action = $(this).data('action');
        if (typeof module !== 'undefined' && typeof action !== 'undefined')
        {
            if (!ajs.check_role(module, action))
            {
                $(this).parent().remove();
            }
        }
    });
    //$(document).on('hide.bs.offcanvas', '#offcanvasRight', function (e, is_submit=false) {
//    $(document).on('click', '.close-offcanvas', function (e) {
//        e.preventDefault();
//        Swal.fire({
//            title: "Are you sure? changes will not be saved.",
//            icon: "warning",
//            showCancelButton: true,
//            confirmButtonColor: "#198754",
//            confirmButtonText: "Ok",
//            stopKeydownPropagation: false,
//        }).then((result) => {
//            if (!result.isConfirmed) {
//            } else {
//                $('#offcanvasRight').offcanvas('hide');
//
//                $('.tooltip-container').each(function () {
//                    var tooltipInstance = bootstrap.Tooltip.getInstance(this);
//                    if (tooltipInstance) {
//                        tooltipInstance.hide();  // Manually hide the tooltip
//                    }
//                });
//            }
//        });
//    });

    // $(document).on("click", ".tooltip", function (event) {

    //     var tooltipContent = $(this).parent().children(".tooltip-content");

    //     if (tooltipContent.css("display") === "block") {
    //         tooltipContent.hide();
    //         $(this).addClass('bx-info-circle');
    //         $(this).removeClass('bx-x-circle');
    //     } else if(tooltipContent.text()) {
    //         tooltipContent.show();
    //         $(this).removeClass('bx-info-circle');
    //         $(this).addClass('bx-x-circle');
    //         // var pos = $(this).position();
    //         // var left = pos.left;
    //         // var top = pos.top;
    //         // tooltipContent.css({
    //         //     "top": top,
    //         //     "left": left
    //         // });
    //     } else {
    //         let master_code = $(this).parent().data('master-code');
    //         let element = this;
    //         if(master_code) {
    //             ajs.ajax_form(
    //                 site_url + "master-record-by-code/"+master_code,
    //                 null,
    //                 "GET",
    //                 null,
    //                 "1",
    //                 "1",
    //                 function (response) {
    //                     if (ajs_form_handler.check_result(response)) {
    //                         if(response.data) {
    //                             $(element).parent().html(`<i class="bx bx-x-circle tooltip"></i> <span class="tooltip-content" style="display:inline-block">${response.data.description}</span>`);
    //                         }
    //                     }
    //                 },
    //                 ajs_form_handler.show_errors
    //             );
    //         }
    //     }
    //     event.preventDefault();
    // });

    $(document).on("click", ".tooltip", function (event) {
        var element = this;
        var tooltipInstance = bootstrap.Tooltip.getInstance($(element).parent());
        if (tooltipInstance) {
            if (tooltipInstance._isShown()) {
                tooltipInstance.hide();
                $(element).removeClass("bx-x-circle");
                $(element).addClass("bx-info-circle");
            } else {
                tooltipInstance.show();
                $(element).removeClass("bx-info-circle");
                $(element).addClass("bx-x-circle");
            }
        } else {
            let master_code = $(this).parent().data("master-code");

            if (master_code) {
                ajs.ajax_form(site_url + "master-record-by-code/" + master_code, null, "GET", null, "1", "1", function (response) {
                    if (ajs_form_handler.check_result(response)) {
                        if (response.data) {
                            show_tooltip(element, response.data.description);
                        }
                    }
                }, ajs_form_handler.show_errors);
            }
        }
    });

    $(document).on("click", ".tooltip-dynamic", function (event) {
        var element = this;
        var tooltipInstance = bootstrap.Tooltip.getInstance($(element).parent());
        if (tooltipInstance) {
            if (tooltipInstance._isShown()) {
                tooltipInstance.hide();
                $(element).removeClass("bx-x-circle");
                $(element).addClass("bx-info-circle");
            } else {
                tooltipInstance.show();
                $(element).removeClass("bx-info-circle");
                $(element).addClass("bx-x-circle");
            }
        } else {
            let master_code = $(this).parent().data("master-code");
            let extra_vars = $(this).parent().data("vars");
            var post_data = {};
            if (extra_vars)
            {
                post_data = extra_vars;
            }

            if (master_code) {
                ajs.ajax_form(site_url + "tooltip/" + master_code, post_data, "POST", null, "1", "1", function (response) {
                    if (ajs_form_handler.check_result(response)) {
                        if (response.description) {
                            show_tooltip(element, response.description);
                        }
                    }
                }, ajs_form_handler.show_errors);
            }
        }
    });

    // Global header search: on Enter or magnifier-icon click, redirect (same tab)
    // to the relevant list screen with the term applied via ?search=.
    function global_search_redirect(input_selector, list_route) {
        var term = $.trim($(input_selector).val());
        if (term === '') {
            return;
        }
        window.location.href = cdn_url + list_route + '?search=' + encodeURIComponent(term);
    }

    $("#global-job-search").on('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            global_search_redirect("#global-job-search", 'job/list');
        }
    });
    $("#global-job-search").siblings('.search-widget-icon').on('click', function () {
        global_search_redirect("#global-job-search", 'job/list');
    });

    $("#global-property-search").on('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            global_search_redirect("#global-property-search", 'properties/list');
        }
    });
    $("#global-property-search, #global-job-search").on('focus keydown input', function () {
        if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
            var tooltipInstance = bootstrap.Tooltip.getInstance(this);
            if (tooltipInstance) {
                tooltipInstance.hide();
            }
        }
    });
    $("#global-property-search").siblings('.search-widget-icon').on('click', function () {
        global_search_redirect("#global-property-search", 'properties/list');
    });

    $('#view_modal .modal-dialog').draggable({
        handle: ".modal-header, .modal-footer",
    });

});

function show_tooltip(element, message)
{
    var tooltip = new bootstrap.Tooltip($(element).parent(), {
        animation: true,
        title: `${message}`,
        trigger: "manual",
        html: true
    });

    tooltip.show();
    $(element).removeClass("bx-info-circle");
    $(element).addClass("bx-x-circle");
}


isAnyFormModified = false;
document.addEventListener("DOMContentLoaded", () => {


    const offcanvas = document.getElementById("offcanvasRight");
    if (offcanvas) {
        const closeButtonSelector = '.close-offcanvas';
        let isCloseButtonEventBound = false; // Flag to prevent multiple bindings

        offcanvas.addEventListener("shown.bs.offcanvas", () => {
            const forms = offcanvas.querySelectorAll("form"); // Find all forms inside the offcanvas

            // Initialize form tracking
            const trackFormChanges = (form) => {
                form.addEventListener("input", () => {
                    isAnyFormModified = true;
                });

            };

            // Attach event listeners for every form in the offcanvas
            forms.forEach((form) => trackFormChanges(form));

            // Ensure the close button event listener is added only once
            if (!isCloseButtonEventBound) {
                isCloseButtonEventBound = true;

                $(document).on('click', closeButtonSelector, function (event) {
                    event.preventDefault(); // Prevent the default close action

                    if (isAnyFormModified) {
                        Swal.fire({
                            title: "Are you sure? Changes will not be saved.",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#198754",
                            confirmButtonText: "Ok",
                            stopKeydownPropagation: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $('#offcanvasRight').offcanvas('hide');
                                isAnyFormModified = false;
                            }
                        });
                    } else {
                        $('#offcanvasRight').offcanvas('hide');
                    }

                    // Hide tooltips manually
                    $('.tooltip-container').each(function () {
                        var tooltipInstance = bootstrap.Tooltip.getInstance(this);
                        if (tooltipInstance) {
                            tooltipInstance.hide(); // Manually hide the tooltip
                        }
                    });

                    //$(closeButtonSelector).remove();
                });
            }

            // Reset the modification status when the form is submitted
            offcanvas.addEventListener("submit", (event) => {
                isAnyFormModified = false;
            });
        });

        // Reset the flag when the offcanvas is hidden
        offcanvas.addEventListener("hidden.bs.offcanvas", () => {
            isCloseButtonEventBound = false; // Allow reattaching the event listener if necessary
            isAnyFormModified = false; // Allow reattaching the event listener if necessary
            // Clean up stale backdrops left behind when showOffCanvasFormRight is force-called
            // multiple times (e.g. copy job → Save & Continue Creating Task flow)
            if ($('.offcanvas.show').length === 0) {
                $('.offcanvas-backdrop').remove();
                $('body').removeClass('modal-open');
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function (e) {
    e.preventDefault();
    var imagePreviewModal = document.getElementById("imagePreviewModal");
    imagePreviewModal.addEventListener("show.bs.modal", function (event) {
        var triggerImage = event.relatedTarget;
        var modalImage = document.getElementById("modalImage");
        modalImage.src = triggerImage.src; // Set modal image source
    });
});

function actionCertificates(obj, taskId, certificate, abtns){
    url = $(obj).data("url");
    let action = $("#actions-certificate");
    action.find(".update-approve-certificate").attr("data-task-id", taskId).attr("data-certificate", certificate);
    action.find(".update-reject-certificate").attr("data-task-id", taskId).attr("data-certificate", certificate);
    action.find("#certificate_preview").attr("src", url);
    if(abtns){
        action.find(".update-approve-certificate,.update-reject-certificate").show();
    }else{
        action.find(".update-approve-certificate,.update-reject-certificate").hide();
    }
    if(!ajs.check_role('Certificates', 'approve')) {
        action.find(".update-approve-certificate,.update-reject-certificate").remove();
    }
    action.modal("show")
}

$(document).on('keypress', '.integer_only', function (e) {
    var regex = new RegExp("^[0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
});

    $(document).on('keypress', '.price-validation', function (event) {
        element = $(this);


        element.data("oldValue", '').bind("paste", function (e) {
            // var validNumber = /^[-]?\d+(\.\d{1,2})?$/;
            element.data('oldValue', element.val())
            setTimeout(function () {
                if (element.val() < 1)
                    element.val("");
            }, 0);
        });

        element.data("oldValue", '').bind("paste", function (e) {
            var validNumber = /^[-]?\d+(\.\d{1,2})?$/;
            element.data('oldValue', element.val())
            setTimeout(function () {
                if (!validNumber.test(element.val()))
                    element.val(element.data('oldValue'));
            }, 0);
        });


        var text = $(this).val();

        if (event.which == 45) {
            event.preventDefault(); //cancel the keypress
        }
        if ((event.which != 46 || text.indexOf('.') != -1) && //if the keypress is not a . or there is already a decimal point
                ((event.which < 48 || event.which > 57) && //and you try to enter something that isn't a number
                        (event.which != 45 || (element[0].selectionStart != 0 || text.indexOf('-') != -1)) && //and the keypress is not a -, or the cursor is not at the beginning, or there is already a -
                        (event.which != 0 && event.which != 8))) { //and the keypress is not a backspace or arrow key (in FF)
            event.preventDefault(); //cancel the keypress
        }

        if ((text.indexOf('.') != -1) && (text.substring(text.indexOf('.')).length > 2) && //if there is a decimal point, and there are more than two digits after the decimal point
                ((element[0].selectionStart - element[0].selectionEnd) == 0) && //and no part of the input is selected
                (element[0].selectionStart >= element.val().length - 2) && //and the cursor is to the right of the decimal point
                (event.which != 45 || (element[0].selectionStart != 0 || text.indexOf('-') != -1)) && //and the keypress is not a -, or the cursor is not at the beginning, or there is already a -
                (event.which != 0 && event.which != 8)) { //and the keypress is not a backspace or arrow key (in FF)
            event.preventDefault(); //cancel the keypress
        }
});
// A signed media URL carries an expiry (see s3_url() on the API side), so an image still on
// screen when that window lapses fails to load and the user is left with a broken thumbnail.
// Mint one fresh prefix for the burst and retry each failed image once. Capture phase, because
// an 'error' event from an <img> does not bubble.
(function () {
    var fresh_prefix = null;

    document.addEventListener('error', function (event) {
        var img = event.target;
        if (!img || img.tagName !== 'IMG' || img.dataset.mediaRetried) {
            return;
        }

        var src    = img.getAttribute('src') || '';
        var marker = '/static_media/';
        var at     = src.indexOf(marker);
        if (at === -1) {
            return;
        }

        // The signed prefix is <data>/<signature>; everything past it is the stored object
        // path, which is what gets re-attached to the new prefix.
        var object_path = src.substring(at + marker.length).split('/').slice(2).join('/');
        if (!object_path) {
            return;
        }
        img.dataset.mediaRetried = '1';

        if (!fresh_prefix) {
            fresh_prefix = ajaxWithRefresh({
                url: site_url + 'get_media_url/refresh',
                type: 'GET',
                dataType: 'json'
            });
            // The replacement prefix expires too, so let a later burst mint a new one.
            fresh_prefix.then(function () {
                setTimeout(function () { fresh_prefix = null; }, 60000);
            });
        }

        fresh_prefix.then(function (response) {
            if (response && response.url) {
                img.src = response.url.replace(/\/+$/, '') + '/' + object_path;
            }
        }).catch(function () { /* leave the broken icon rather than loop */ });
    }, true);
})();
