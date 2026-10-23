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
            url: site_url + "log/system/record_update_log",
            method: "GET",
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
        },
        columns: [
            {
                name: "id",
                data: "id",
                render: function (data, type, row) {
                    return `<a href="javascript:;" data-id="` + row.id + `" data-month="` + row.month_name + `" data-year="` + row.year_name + `" data-heading="Record Update Details" data-after-load-func="get_log_details" data-form-url="` + cdn_url + `system/logs/db-update-logs/view/` + row.id + `/` + row.month_name + `/` + row.year_name + `" class='popup-form-button'><i class="ri-eye-line align-bottom me-2 primary-btn fs-15 "></i></a>`;
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
                name: "first_name",
                data: "full_name",                
            },
            {
                name: "type",
                data: "type",
                render: function (data, type, row) {
                    return row.type;
                }
            },
            {
                name: "record_id",
                data: "record_id",
                render: function (data, type, row) {
                    return row.record_id;
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
            ['1', 'desc']
        ]
    });
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
    if (ajs_form_handler.check_result(json_data))
    {
        $('.log-detail-original').text(json_data.data.original_record);
        $('.log-detail-updated').text(json_data.data.updated_record);

        try {
            let originalData = $('.log-detail-original').text();
            $('.log-detail-original').beautifyJSON({
                collapsible: true,
                color: true,
                hoverable: true
            });
        } catch (e) {
            console.warn('Invalid original record JSON:', e);
        }

        try {
            let updatedData = $('.log-detail-updated').text();
            $('.log-detail-updated').beautifyJSON({
                collapsible: true,
                color: true,
                hoverable: true
            });
        } catch (e) {
            console.warn('Invalid updated record JSON:', e);
        }
    } else
    {
        ajs_form_handler.show_errors_offcanvas(json_data);
    }
}

function get_log_details()
{
    var id = $('#log_id').val();
    var month = $('#log_month').val();
    var year = $('#log_year').val();
    ajs.ajax_form(site_url + 'log/system/record_update_log/' + month + '/' + year + '/' + id, null, 'GET', null, '1', '1', set_log_details, set_log_details);
}

$(document).on('click', '.view-log-details', function (e) {
    var id = $(this).data('id');
    var month = $(this).data('month');
    var year = $(this).data('year');
    ajs.ajax_form(site_url + 'log/system/record_update_log/' + month + '/' + year + '/' + id, null, 'GET', null, '1', '1', set_log_details, set_log_details);
});

if ($('#ajax-datatables').length)
{
    select2_ajax_users('#user_filter');
    select2_ajax('#user_type_filter', site_url + "master-record/get_all", "master_value", {master_code: "USER_TYPES"});
    var breadcrumbs = [
        {label: 'System Admin', url: 'javascript: void(0);'},
        {label: 'Setup', url: 'javascript: void(0);'},
        {label: 'Logs', url: cdn_url+'system/logs'},
        {label: 'Record Update Log', url: null},
    ];
    set_breadcrumb(breadcrumbs);
    get_log_data();
}