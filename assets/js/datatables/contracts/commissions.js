var master_data_type = 'contract_commission';
dataTable = null;
function load_data_table(limit, search_term, filters, column_visibility)
{

    data_filters = {};
    page_limit = ajs.datatable_limit;
    search = '';
    if (typeof filters !== 'undefined' && (typeof filters['filters'] !== 'undefined' || filters['filters'] != null))
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


        $('#ajax-commission-datatables').DataTable({
        serverSide: true,
        processing: true,
        paging: true,
        responsive:false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: search
        },
        dom: '<"d-flex justify-content-end mb-2"B>rtip', // Add this to show buttons
        buttons: [
            {
                extend: 'excelHtml5',
                text: '<i class="bi bi-file-earmark-excel"></i> Export to Excel',
                className: 'btn btn-success btn-sm',
                title: 'Framework Commission Report',
                exportOptions: {
                    columns: ':visible' // export only visible columns
                },
                attr: {
                    style: 'background-color:#198754; color:white; border:none; padding:6px 12px; border-radius:4px;'
                }
            }
        ],
        ajax: {
            url: site_url + "contract/commission/get/" + $("#edit_id").val(),
            method: "GET",
            async: false,
            dataSrc: 'data',
            "data": function (d) {  
                if ($("#edit_id").val() > 0) {
                    d.contract = true;
                    d.contract_id = $("#edit_id").val();
                }              
                return $.extend({}, d, {
                    data_filters
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr) {
                ajs.datatable_error(xhr, "ajax-commission-datatables");
                if (xhr.status !== 200) {
                    $('#ajax-commission-datatables').html('<p>No data found.</p>'); // Display "No data found" message if 404 error
                }
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
            },
            {
                name: "invoice_no",
                data: "invoice_no",
            },
            {
                name: "invoice_date",
                data: "invoice_date",
                render: function (data) {
                    return ajs.format_date(data);
                }
            },
            {
                name: "invoice_amount",
                data: "invoice_amount",
                render: function (data) {
                    return data.toFixed(2);
                }
            },
            {
                name: "contactor_name",
                data: "contactor_name",
                defaultContent: '-'                
            },
            {
                name: "contractor_commission",
                data: "contractor_commission",
                defaultContent: '-'                
            },
            {
                name: "commission_amount",
                data: "commission_amount",
                render: function (data) {
                    return data.toFixed(2);
                }
            }
        ],
        order: [
            ['0', 'desc']
        ]
    });
}


if ($('#ajax-commission-datatables').length)
{
   
    fetch_default_filter(master_data_type);
   
}
