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
        ajax: {
            url: site_url + "log/system/ppm_log",
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
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
                render: function (data, type, row) {
                    return row.id;
                }
            },
            {
                name: "contract_number",
                data: "contract_number",
                render: function (data, type, row) {
                    return row.contract_number;
                }
            },
            {
                name: "batch_code",
                data: "batch_code",
                render: function (data, type, row) {
                    return row.batch_code;
                }
            },
            {
                name: "frequency_id",
                data: "frequency_id",
                render: function (data, type, row) {
                    return row.frequency_id;
                }
            },
            {
                name: "start_date",
                data: "start_date",
                render: function (data, type, row) {
                    return ajs.format_date(row.start_date);
                }
            },
            {
                name: "end_date",
                data: "end_date",
                render: function (data, type, row) {
                    return ajs.format_date(row.end_date);
                }
            },
            {
                name: "jobs_created",
                data: "jobs_created",
                render: function (data, type, row) {
                    return row.jobs_created;
                }
            },            
            {
                name: "add_date",
                data: "add_date",
                render: function (data, type, row) {
                    return ajs.format_datetime(row.add_date);
                }
            },
            
        ],
        order: [
            ['0', 'desc']
        ]
    });

    dataTable.buttons().container().appendTo($('.log-buttons'));
}

if ($('#ajax-datatables').length)
{
    select2_ajax_users('#user_filter');
    select2_ajax('#user_type_filter', site_url + "master-record/get_all", "master_value", {master_code: "USER_TYPES"});
    var breadcrumbs = [
        {label: 'System Admin', url: 'javascript: void(0);'},
        {label: 'Setup', url: 'javascript: void(0);'},
        {label: 'Logs', url: cdn_url+'system/logs'},
        {label: 'PPM Logs', url: null},
    ];
    set_breadcrumb(breadcrumbs);
}

function get_log_data()
{
    var month = $('#month').val();
    var year = $('#year').val();
   
    var new_filters = {};
    new_filters['filters'] = {};
    new_filters['filters']['month'] = month;
    new_filters['filters']['year'] = year;
    load_data_table(ajs.datatable_limit, '', new_filters);
}
get_log_data();
