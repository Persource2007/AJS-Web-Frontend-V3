var master_data_type = 'template';
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
        buttons: [
//            {
//                extend: 'colvis', // Column visibility button
//                text: 'Toggle Columns', // Button text
//                className: 'btn btn-dark'
//            },
            'excel'
        ],
        ajax: {
            url: site_url + "template/headers",
            method: "GET",
            async: false,
            dataSrc: 'message.data',
            "data": function (d) {
                return $.extend({}, d, {
                    data_filters
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr) {
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
                visible: false,
                searchable: false,
                render: function (data, type, row) {
                    return row.id;
                }
            },
            {
                name: "title",
                data: "title",
                render: function (data, type, row) {
                    return row.title;
                }
            },            
            
            {
                name: "add_date",
                data: "add_date",
                render: function (data, type, row) {
                    return ajs.format_date(row.add_date);
                }
            },
            {
                name: "added_by",
                data: "added_by",
                render: function (data, type, row) {
                    return "<span class='text-wrap'>" + row.added_by_name + "</span>";
                }
            }
        ],
        order: [
            ['0', 'desc']
        ]
    });

    dataTable.buttons().container().appendTo($('#datatable_buttons'));
}

if ($('#ajax-datatables').length)
{
    fetch_default_filter(master_data_type);
    var breadcrumbs = [
        {label : 'System Admin', url: 'javascript: void(0);'},
        {label : 'Certificate Template', url: 'javascript: void(0);'},
        {label : 'Template Headers', url: null}
    ];
    set_breadcrumb(breadcrumbs);
}

ajs.apply_ind_roles('Masters');
