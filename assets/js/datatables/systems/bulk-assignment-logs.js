var master_data_type = 'master';
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
        responsive:false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: search
        },
        // dom: 'Bfrtip',
        // buttons: [
        //     'excel'
        // ],
        ajax: {
            url: site_url + "user/bulk_assign_log",
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
                ajs.datatable_error(xhr, "ajax-datatables");
            }
        },
        language: {
            emptyTable: "No data found",
            processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>',
        },
        columns: [
            {
                name: null,
                data: null,
                searchable: false,
                orderable:false,
                render: function (data, type, row) {
                    return `<a href="javascript:;" data-id="` + row.id + `" data-month="` + row.month_name + `" data-year="` + row.year_name + `" data-heading="Log Details" data-after-load-func="get_log_details" data-form-url="` + cdn_url + `system/logs/bulk-assignment-logs/view/` + row.id + `/` + row.month_name + `/` + row.year_name + `" class='popup-form-button'><i class="ri-eye-line align-bottom me-2 primary-btn fs-15 "></i></a>`;
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
                name: "username",
                data: "username",
                render: function (data, type, row) {
                    return row.username;
                }
            },
            {
                name: "user_type_name",
                data: "user_type_name",
                render: function (data, type, row) {
                    return row.user_type_name;
                }
            },
            {
                name: "log_type",
                data: "log_type",
                render: function (data, type, row) {
                    return row.log_type;
                }
            },
            {
                name: "add_date",
                data: "add_date",
                render: function (data, type, row) {
                    return ajs.format_datetime(row.add_date);
                }
            },            
            {
                name: "log_data",
                data: "log_data",
                visible: false,
                searchable: false,
                render: function (data, type, row) {
                    return row.log_data;
                }
            },
            {
                name: "return_data",
                data: "return_data",
                visible: false,
                searchable: false,
                render: function (data, type, row) {
                    return row.return_data;
                }
            },
            {
                name: "headers",
                data: "headers",
                visible: false,
                searchable: false,
                render: function (data, type, row) {
                    return row.headers;
                }
            }
        ],
        order: [
            ['1', 'desc']
        ]
    });
}

if ($('#ajax-datatables').length)
{
    select2_ajax_users('#user_filter');
    select2_ajax('#user_type_filter', site_url + "master-record/get_all", "master_value", {master_code: "USER_TYPES"});
    ajs.apply_ind_roles('System Logs');
    var breadcrumbs = [
        {label: 'System Admin', url: 'javascript: void(0);'},
        {label: 'Setup', url: 'javascript: void(0);'},
        {label: 'Logs', url: cdn_url+'system/logs'},
        {label: 'Bulk Assignment Logs', url: null},
    ];
    set_breadcrumb(breadcrumbs);
}

function get_log_data()
{
    var month = $('#month').val();
    var year = $('#year').val();
    var user_id = $('#user_filter').val();
    var user_type = $('#user_type_filter').val();

    var new_filters = {};
    new_filters['filters'] = {};
    new_filters['filters']['month'] = month;
    new_filters['filters']['year'] = year;
    new_filters['filters']['user_id'] = user_id;
    new_filters['filters']['user_type'] = user_type;
    load_data_table(ajs.datatable_limit, '', new_filters);
}

function set_log_details(json_data)
{
        console.log(json_data.data)
    if (ajs_form_handler.check_result(json_data))
    {
        console.log(json_data.data.log_data)
        $('.log-detail-request').html(json_data.data.log_data);
        $('.log-detail-response').html(json_data.data.return_data);
        $('.log-detail-headers').html(json_data.data.headers);
    } else
    {
        ajs_form_handler.show_errors_offcanvas(json_data);
    }
}

get_log_data();

function get_log_details()
{
    var id = $('#log_id').val();
    var month = $('#log_month').val();
    var year = $('#log_year').val();
    ajs.ajax_form(site_url + 'user/bulk_assign_log/' + month + '/' + year + '/' + id, null, 'GET', null, '1', '1', set_log_details, set_log_details);
}

