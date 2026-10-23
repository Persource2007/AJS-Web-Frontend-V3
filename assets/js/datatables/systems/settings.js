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

    dataTable = new DataTable("#settings-datatables", {
        scrollY: (screen.height - 530)+'px',
        serverSide: true,
        processing: true,
        paging: true,
        responsive:false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: search
        },
        ajax: {
            url: site_url + "setting/get_all",
            method: "GET",
            async: false,
            dataSrc: 'data',
            "data": function (d) {
                return $.extend({}, d, {
                    data_filters
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr, error, code) {
                ajs.datatable_error(xhr, "settings-datatables");
            }
        },
        language: {
            emptyTable: "No data found",
        },
        columns: [
            {
                data: null,
                sortable: false,
                searchable: false,
                render: function (data, type, row) {
                    return row.is_editable == 1 ? `<a data-after-load-func="edit_form" data-heading="Edit Setting - ` + row.id + `" data-form-url="` + cdn_url + `system/setting/edit/` + row.id + `?is_boolean_value=${row.is_boolean_value}&var_datatype=${row.var_datatype}" class="popup-form-button" >`+edit_icon()+`</a>` : '-';
                }
            },
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
                name: "var_name",
                data: "var_name",
            },
            {
                name: "var_value",
                data: "var_value",
                render: function (data) {
                    return truncate_string(data, 40);
                }
            },
            {
                name: "var_type",
                data: "var_type",
                render: function (data) {
                    return data.replace('_',' ').toUpperCase();
                }
            },
            {
                name: "comments",
                data: "comments",
                width: '20%'
            },            
        ],
        order: [
            ['4', 'asc']
        ],
        drawCallback: function () {
            ajs.apply_ind_roles("Settings");
        }
    });

    $('body').tooltip({
        selector: '[data-bs-toggle="tooltip"]'
    });

    dataTable.buttons().container().appendTo($('#datatable_buttons'));
}


if ($('#settings-datatables').length)
{
    fetch_default_filter('settings');

    var breadcrumbs = [
        {label : 'System Admin', url: 'javascript: void(0);'},
        {label : 'Setup', url: 'javascript: void(0);'},
        {label : 'Settings', url: null},
    ];
    set_breadcrumb(breadcrumbs);
}


function create_form(type)
{

    $("#settingForm").validate({
        onkeyup: false,
        rules: {
            var_value: {
                required: function(element) {
                    return $(element).attr('type') != 'checkbox';
                }
            }
        },
        errorPlacement: function (error, element) {
            if (element.hasClass("select2") && element.next(".select2-container").length)
            {
                error.insertAfter(element.next(".select2-container"));
            } else if (element.parent(".input-group").length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form)
        {
            var sub_button = $(form).find(':submit');
            ajs.submit_button_element = sub_button;
            var action = $(form).attr('action');
            var method = $(form).attr('method');
            var post_data = $(form).serialize();
            ajs.ajax_form(action, post_data, method, null, '1', '1', ajs_form_handler.offcanvas_form, ajs_form_handler.offcanvas_form);
            return false;
        }
    });

}

function load_setting_data(result_json)
{
    if (ajs_form_handler.check_result(result_json))
    {
        var setting = result_json.data;
        if (!isEmpty(setting.comments)) {
            $('#setting-comment').html('('+setting.comments+')');
        }
        if(setting.is_boolean_value == 1) {
            if(setting.var_value == 1) {
                $('#var_value').prop('checked',true);
            }
        } else {
            if(setting.var_datatype == 'time') {
                flatpickr("#var_value", {
                    enableTime: true,
                    noCalendar: true,
                    time_24hr: true
                });
            }
            $('#var_value').val(setting.var_value);
        }

    } else
    {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function edit_form()
{
    create_form('edit');
    var id = $('#edit_id').val();

    ajs.ajax_form(site_url + 'setting/get/' + id, null, 'GET', null, '1', '1', load_setting_data, load_setting_data);
}


$(function () {
    ajs.apply_ind_roles('Settings');
});

