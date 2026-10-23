var master_data_type = 'contract_masterplan';
var selected_contract = null;
dataTable = null;
function load_data_table(limit, search_term, filters)
{
    data_filters = '';
    page_limit = ajs.datatable_limit;
    search = '';
    if (typeof filters != 'undefined' && (typeof filters['filters'] !== 'undefined' || filters['filters'] != null))
    {
        data_filters = filters['filters'];
    }
    if (typeof limit !== 'undefined' || limit != null)
    {
        page_limit = limit;
    }
    if (typeof search_term !== 'undefined' || search_term != null)
    {
        search = search_term;
    }

    dataTable = new DataTable("#ajax-datatables", {
        serverSide: true,
        processing: true,
        paging: true,
        responsive: false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: search
        },
        // dom: 'Bfrtip',
        buttons: [
//            {
//                extend: 'colvis', // Column visibility button
//                text: 'Toggle Columns', // Button text
//                className: 'btn btn-dark'
//            },
            'excel'
        ],
        ajax: {
            url: site_url + "contract/" + contract_id + "/masterplan",
            method: "GET",
            async: false,
            //dataSrc: 'message.services',
            dataSrc: function (res) {
                selected_contract = res.message.contract;
                start_year = res.message.start_year;
                end_year = res.message.end_year;
                return res.message.services;
            },
            "data": function (d) {
                return $.extend({}, d, {
                    data_filters
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
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
                render: function (data, type, row) {
                    return row.id;
                }
            },
            {
                name: "uprn_no",
                data: "uprn_no",
                render: function (data, type, row) {
                    return row.uprn_no;
                }
            },
            {
                name: "year",
                data: "year",
                render: function (data, type, row) {
                    return row.year;
                }
            },
            {
                name: "address1",
                data: "address1",
                render: function (data, type, row) {
                    return row.address1 + '<br/>' + row.postalcode;
                }
            },
            {
                name: "jan",
                data: "jan",
                render: function (data, type, row) {
                    return set_month_ppm(data, row, 'jan');
                }
            },
            {
                name: "feb",
                data: "feb",
                render: function (data, type, row) {
                    return set_month_ppm(data, row, 'feb');
                }
            },
            {
                name: "mar",
                data: "mar",
                render: function (data, type, row) {
                    return set_month_ppm(data, row, 'mar');
                }
            },
            {
                name: "apr",
                data: "apr",
                render: function (data, type, row) {
                    return set_month_ppm(data, row, 'apr');
                }
            },
            {
                name: "may",
                data: "may",
                render: function (data, type, row) {
                    return set_month_ppm(data, row, 'may');
                }
            },
            {
                name: "jun",
                data: "jun",
                render: function (data, type, row) {
                    return set_month_ppm(data, row, 'jun');
                }
            },
            {
                name: "jul",
                data: "jul",
                render: function (data, type, row) {
                    return set_month_ppm(data, row, 'jul');
                }
            },
            {
                name: "aug",
                data: "aug",
                render: function (data, type, row) {
                    return set_month_ppm(data, row, 'aug');
                }
            },
            {
                name: "sep",
                data: "sep",
                render: function (data, type, row) {
                    return set_month_ppm(data, row, 'sep');
                }
            },
            {
                name: "oct",
                data: "oct",
                render: function (data, type, row) {
                    return set_month_ppm(data, row, 'oct');
                }
            },
            {
                name: "nov",
                data: "nov",
                render: function (data, type, row) {
                    return set_month_ppm(data, row, 'nov');
                }
            },
            {
                name: "decm",
                data: "decm",
                render: function (data, type, row) {
                    return set_month_ppm(data, row, 'decm');
                }
            },
            {
                data: null,
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                    return (
                            `<div class="dropdown">
                                <button class="btn btn-soft-secondary btn-sm dropdown " type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                    <i class="ri-more-fill align-middle"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end " style="dropdown-menu dropdown-menu-end">                                    
                                    <li>
                                        <a style="cursor:pointer"  data-heading="Edit Contract PPM - ` +
                            row.id +
                            `" href="#" class="dropdown-item edit-btn edit-ppm-row" >
                                            <i class="ri-pencil-fill align-bottom me-2 text-muted"></i>Edit
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item list_delete" data-type="` +
                            master_data_type +
                            `" data-id="` +
                            row.id +
                            `" data-action="delete" class="remove-item-btn" data-bs-toggle="modal" href="#deleteModal">
                                            <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>Delete
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="edit-ppm-action gap-2 hide">
                                <input type="hidden" name="contract_id" value="` + row.contract_id + `">
                                <input type="hidden" name="property_id" value="` + row.property_id + `">
                                <input type="hidden" name="total_mp" value="1">
                                <button type="button" class="btn btn-sm btn-success save-ppm-row">Save</button>
                                <button type="button" class="btn btn-sm btn-danger cancel-ppm-row" >Cancel</button>
                        </div>`
                            );
                },
            },
        ],
        order: [
            ['0', 'desc']
        ]
    });

    const dropdown = document.getElementById("year_1");

    for (let year = start_year; year <= end_year; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.text = year;
        dropdown.appendChild(option);
    }

    dataTable.buttons().container().appendTo($('#datatable_buttons'));
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

    export_masterplan('contract', new_limit, new_filters['searchTerm'], new_filters.filters, column_visibility);
});

$('#queue_masterplan').on('click', function (e) {
    ajs.ajax_form(site_url + 'contract_masterplan/generate_queue/' + contract_id, null, 'GET', null, '1', '1', ajs_form_handler.api_response, ajs_form_handler.api_response);
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

function show_masterplan_div(selection)
{
    $('.mp-manual-div').css('display', 'none');
    $('.mp-upload-div').css('display', 'none');

    if (selection == 'M')
    {
        $('#total_mp').val(1);
        $('.mp-manual-div').css('display', '');
        $('.dynamic_mp_row').remove();
        select2_ajax('#property_1', site_url + 'property/get_all', 'uprn_no', {client_id: selected_contract.client_id});

        select2_ajax('#jan_1', site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
        select2_ajax('#feb_1', site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
        select2_ajax('#mar_1', site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
        select2_ajax('#apr_1', site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
        select2_ajax('#may_1', site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
        select2_ajax('#jun_1', site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
        select2_ajax('#jul_1', site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
        select2_ajax('#aug_1', site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
        select2_ajax('#sep_1', site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
        select2_ajax('#oct_1', site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
        select2_ajax('#nov_1', site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
        select2_ajax('#decm_1', site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);

        $('#property_1').val('').trigger('change');
        $('#jan_1').val('').trigger('change');
        $('#feb_1').val('').trigger('change');
        $('#mar_1').val('').trigger('change');
        $('#apr_1').val('').trigger('change');
        $('#may_1').val('').trigger('change');
        $('#jun_1').val('').trigger('change');
        $('#jul_1').val('').trigger('change');
        $('#aug_1').val('').trigger('change');
        $('#sep_1').val('').trigger('change');
        $('#oct_1').val('').trigger('change');
        $('#nov_1').val('').trigger('change');
        $('#decm_1').val('').trigger('change');

    }
    if (selection == 'T')
    {
        $('.mp-upload-div').css('display', '');
    }
}

$(document).on('click', '.schedule_setup', function (e) {
    var selection = $(this).val();
    show_masterplan_div(selection);
});


$(document).on('click', '.add-masterplan-row-btn', function (e) {
    var total_rows = $('#total_mp').val();
    var new_row = parseInt(total_rows) + parseInt(1);
    add_masterplan_row(new_row);
});

$(document).on('click', '.save-masterplan-btn', function (e) {
    var post_data = $('#manual_mp_form').serialize();
    ajs.ajax_form(site_url + 'contract_masterplan/create', post_data, 'POST', null, '1', '1', ajs_form_handler.api_response, ajs_form_handler.api_response);
    $('#schedule_setupM').trigger("click");
    ajs.refreshDataTable();
});


function add_masterplan_row(row_num)
{
    $('#total_mp').val(row_num);
    var row_html = `<tr class="mp_row_` + `_` + row_num + ` dynamic_mp_row">
            <td width="10%">
                <select class="form-control" required name="property_` + row_num + `" id="property_` + row_num + `">
                </select>
            </td>
            <td width="8%">
                <select class="form-control" required name="year_` + row_num + `" id="year_` + row_num + `">
                </select>
            </td>
            <td width="6%">
                <select data-month="jan" class="form-control mp-service-picker" data-row-num="` + row_num + `" multiple name="jan_` + row_num + `[]" id="jan_` + row_num + `">
                </select>
                <input type="hidden" name="jan_val_` + row_num + `" id="jan_val_` + row_num + `" value="" />
            </td>
            <td width="6%">
                <select data-month="feb" class="form-control mp-service-picker" data-row-num="` + row_num + `" multiple name="feb_` + row_num + `[]" id="feb_` + row_num + `">
                </select>
                    <input type="hidden" name="feb_val_` + row_num + `" id="feb_val_` + row_num + `" value="" />
            </td>
            <td width="6%">
                <select data-month="mar" class="form-control mp-service-picker" data-row-num="` + row_num + `" multiple name="mar_` + row_num + `[]" id="mar_` + row_num + `">
                </select>
                    <input type="hidden" name="mar_val_` + row_num + `" id="mar_val_` + row_num + `" value="" />
            </td>
            <td width="6%">
                <select data-month="apr" class="form-control mp-service-picker" data-row-num="` + row_num + `" multiple name="apr_` + row_num + `[]" id="apr_` + row_num + `">
                </select>
                    <input type="hidden" name="apr_val_` + row_num + `" id="apr_val_` + row_num + `" value="" />
            </td>
            <td width="6%">
                <select data-month="may" class="form-control mp-service-picker" data-row-num="` + row_num + `" multiple name="may_` + row_num + `[]" id="may_` + row_num + `">
                </select>
                    <input type="hidden" name="may_val_` + row_num + `" id="may_val_` + row_num + `" value="" />
            </td>
            <td width="6%">
                <select data-month="jun" class="form-control mp-service-picker" data-row-num="` + row_num + `" multiple name="jun_` + row_num + `[]" id="jun_` + row_num + `">
                </select>
                    <input type="hidden" name="jun_val_` + row_num + `" id="jun_val_` + row_num + `" value="" />
            </td>
            <td width="6%">
                <select data-month="jul" class="form-control mp-service-picker" data-row-num="` + row_num + `" multiple name="jul_` + row_num + `[]" id="jul_` + row_num + `">
                </select>
                    <input type="hidden" name="jul_val_` + row_num + `" id="jul_val_` + row_num + `" value="" />
            </td>
            <td width="6%">
                <select data-month="aug" class="form-control mp-service-picker" data-row-num="` + row_num + `" multiple name="aug_` + row_num + `[]" id="aug_` + row_num + `">
                </select>
                <input type="hidden" name="aug_val_` + row_num + `" id="aug_val_` + row_num + `" value="" />
            </td>
            <td width="6%">
                <select data-month="sep" class="form-control mp-service-picker" data-row-num="` + row_num + `" multiple name="sep_` + row_num + `[]" id="sep_` + row_num + `">
                </select>
                <input type="hidden" name="sep_val_` + row_num + `" id="sep_val_` + row_num + `" value="" />
            </td>
            <td width="6%">
                <select data-month="oct" class="form-control mp-service-picker" data-row-num="` + row_num + `" multiple name="oct_` + row_num + `[]" id="oct_` + row_num + `">
                </select>
                <input type="hidden" name="oct_val_` + row_num + `" id="oct_val_` + row_num + `" value="" />
            </td>
            <td width="6%">
                <select data-month="nov" class="form-control mp-service-picker" data-row-num="` + row_num + `" multiple name="nov_` + row_num + `[]" id="nov_` + row_num + `">
                </select>
                <input type="hidden" name="nov_val_` + row_num + `" id="nov_val_` + row_num + `" value="" />
            </td>
            <td width="6%">
                <select data-month="decm" class="form-control mp-service-picker" data-row-num="` + row_num + `" multiple name="decm_` + row_num + `[]" id="decm_` + row_num + `">
                </select>
                <input type="hidden" name="decm_val_` + row_num + `" id="decm_val_` + row_num + `" value="" />
            </td>
            <td width="10%">
                <button type="button" class="btn btn-danger delete-ppm-row">
                    <i class=" bx bx bx-window-close "></i>
                </button>
            </td>
        </tr>`;
    $('.mp_row_parent').append(row_html);

    select2_ajax('#property_' + row_num, site_url + 'property/get_all', 'uprn_no', {client_id: selected_contract.client_id});
    select2_ajax('#jan_' + row_num, site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
    select2_ajax('#feb_' + row_num, site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
    select2_ajax('#mar_' + row_num, site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
    select2_ajax('#apr_' + row_num, site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
    select2_ajax('#may_' + row_num, site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
    select2_ajax('#jun_' + row_num, site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
    select2_ajax('#jul_' + row_num, site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
    select2_ajax('#aug_' + row_num, site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
    select2_ajax('#sep_' + row_num, site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
    select2_ajax('#oct_' + row_num, site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
    select2_ajax('#nov_' + row_num, site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);
    select2_ajax('#decm_' + row_num, site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null);


    var year_dropdown = document.getElementById("year_" + row_num);

    for (let year = start_year; year <= end_year; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.text = year;
        year_dropdown.appendChild(option);
    }

    $('#property_' + row_num).val('').trigger('change');
}

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

$(document).on('click', '.delete-ppm-row', function (e) {
    $(this).closest('tr').remove();
});

$(document).on('click', '.cancel-ppm-row', function (e) {
    ajs.refreshDataTable();
});

