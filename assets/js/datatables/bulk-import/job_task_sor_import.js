var master_data_type = "list_import";
dataTable = null;

var breadcrumbs = [
    { label: 'Bulk Import', url: cdn_url+"bulk-import/jobs"},
    { label: 'Task Sors', url: 'javascript: void(0);' }
];

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
    dataTable = new DataTable("#import-list-datatables", {
        scrollY: (screen.height - 450) + 'px',
        scrollX: true,  
        autoWidth: false,
        serverSide: true,
        processing: true,
        paging: true,
        responsive: false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: search
        },        
        
        ajax: {
            url: site_url + "job/list_imports",
            method: "post",
            async: false,
            dataSrc: 'data',
            "data": function (d) {
                d.batch_id = batch_id;
                d.module = module;
                return $.extend({}, d, {
                    data_filters
                });
            },
            "error": function (xhr, error, thrown) {
                ajs.datatable_error(xhr, "import-list-datatables");
                if (xhr.status !== 200) {
                    $('#import-list-datatables').html('<p>No data found.</p>'); // Display "No data found" message if 404 error
                }
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
                data: 'id',
                title: 'ID',
                searchable: false,
                orderable: false,
                visible: false
               
            },
            {
                name: "job_task_code",
                data: "job_task_code",
                title: "Task Code",
                className: "ps-4",
            },
            {
                name: "sor_code",
                data: "sor_code",
                title: "Task SOR"
            },
            {
                name: "pricing_model",
                data: "pricing_model",
                title: "Pricing Model",
                render: function(data) {
                    switch (String(data)) {
                        case '1':
                            return 'SOR';
                        case '2':
                            return 'Unit Price';
                        case '3':
                            return 'Fix price';
                        default:
                            return data;
                    }
                }
            },
            {
                name: "asset_id",
                data: "asset_id",
                title: "Asset ID"
            },
            {
                name: "quantity",
                data: "quantity",
                title: "Quantity",
                className: "pricing-col"
            },
            {
                name: "labor_price",
                data: "labor_price",
                title: "Labor Price",
                className: "pricing-col"
            },
            {
                name: "sell_price",
                data: "sell_price",
                title: "Sell Price",
                className: "pricing-col"
            },
            {
                name: "sor_description",
                data: "sor_description",
                title: "Description"
            },
            {
                name: "is_chargeable",
                data: "is_chargeable",
                title: "Chargeable",
                render: function(data) {
                    return data == 1 ? 'Y' : 'N';
                }
            },
            {
                name: "is_payable",
                data: "is_payable",
                title: "Payable",
                render: function(data) {
                    return data == 1 ? 'Y' : 'N';
                }
            },
        ],
        order: [
            ['0', 'desc']
        ],
        drawCallback: function () {
            //ajs.apply_ind_roles("Bulk Import");
        }
    });    
}


$(function () {
    set_breadcrumb(breadcrumbs);
    if ($('#import-list-datatables').length) {
        fetch_default_filter(master_data_type);        
    }
});