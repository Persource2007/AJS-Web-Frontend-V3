var master_data_type = "list_import";
dataTable = null;

var breadcrumbs = [
    { label: 'Bulk Import', url: cdn_url+"bulk-import/jobs"},
    { label: 'Job Tasks', url: 'javascript: void(0);' }
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
                name: "job_code",
                data: "job_code",
                title: "Job Code",
                className: "ps-4",
                render: function (data, type, row) {
                    return `<a  href="` + cdn_url + 'job/details/' + ajs.hash_encode(row.id) + `" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="` +
                        data + `">` + data + `</a>`;
                }
            },
            {
                name: "job_task_code",
                data: "job_task_code",
                title: "Task Code"
            },
            {
                name: "action",
                data: "action",
                title: "Action"
            },
            {
                name: "skill",
                data: "skill",
                title: "SKILL"
            },
            {
                name: "task_type",
                data: "task_type",
                title: "Task Type"
            },
            {
                name: "overhead_sor_code",
                data: "overhead_sor_code",
                title: "Overhead SOR Code"
            },
            {
                name: "task_description",
                data: "task_description",
                title: "Task Description"
            },
            {
                name: "notes",
                data: "notes",
                title: "Notes"
            },
            {
                name: "task_sor",
                data: "task_sor",
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
                name: "assign_now_add_to_queue",
                data: "assign_now_add_to_queue",
                title: "Assign Now/Add To Queue"
            },
            {
                name: "queue_assigned_to",
                data: "queue_assigned_to",
                title: "Queue/Assigned To"
            },
            {
                name: "assigned_type",
                data: "assigned_type",
                title: "Assigned Type"
            },
            {
                name: "task_created_date",
                data: "task_created_date",
                title: "Created Date",
                render: function (data) {
                    return ajs.format_date(data);
                }
            },
            {
                name: "task_created_time",
                data: "task_created_time",
                title: "Created Time",
                render: function (data) {
                    return ajs.format_time(data);
                }
            },
            {
                name: "attend_date",
                data: "attend_date",
                title: "Attend Date",
                render: function (data) {
                    return ajs.format_date(data);
                }
            },
            {
                name: "attend_time",
                data: "attend_time",
                title: "Attend Time",
                render: function (data) {
                    return ajs.format_time(data);
                }
            },
            {
                name: "task_target_date",
                data: "task_target_date",
                title: "Task Target Date",
                render: function (data) {
                    return ajs.format_date(data);
                }
            },
            {
                name: "task_target_time",
                data: "task_target_time",
                title: "Task Target Time",
                render: function (data) {
                    return ajs.format_time(data);
                }
            },
            {
                name: "arrived_date",
                data: "arrived_date",
                title: "Arrived Date",
                render: function (data) {
                    return ajs.format_date(data);
                }
            },
            {
                name: "arrived_time",
                data: "arrived_time",
                title: "Arrived Time",
                render: function (data) {
                    return ajs.format_time(data);
                }
            },
            {
                name: "completed_date",
                data: "completed_date",
                title: "Completed Date",
                render: function (data) {
                    return ajs.format_date(data);
                }
            },
            {
                name: "completed_time",
                data: "completed_time",
                title: "Completed Time",
                render: function (data) {
                    return ajs.format_time(data);
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