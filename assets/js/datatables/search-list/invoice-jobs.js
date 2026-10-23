var def_filters = null;
dataTable = null;
function load_search_table(search_text = '') {  
    var invoice_id = ajs.hash_decode(invoiceId);
    console.log(invoice_id);    

    $('#search-datatables').on('xhr.dt', function (e, settings, json, xhr) { 
        console.log(json);    
        if (typeof json.message.invoice_data !== 'undefined'){       
            $("#client_id_filter").val(json.message.invoice_data.client_id);
            $("#client_name").val(json.message.invoice_data.client_code);
            $("#contract_id_filter").val(json.message.invoice_data.contract_id);  
            $("#contract_name").val(json.message.invoice_data.contract_number);  
        }
    });

    new DataTable("#search-datatables", {
        scrollY: (window.innerHeight - 400) + 'px',
        responsive: false,
        searching: false,
        serverSide: true,
        processing: true,
        paging: true,
        bDestroy: true,
        pageLength: ajs.datatable_modal_limit,
        search: {
            search: search_text,
        },
        //dom: "Bfrtip",
        // buttons: ["excel"],
        ajax: {
            url: site_url + "invoice/search_invoice_job",
            method: "GET",
            async: false,
            dataSrc: "message.data",
            data: function (d) {
                let filters = table_filter;
                d.invoice_id = ajs.hash_decode(invoiceId);
                if (def_filters) {
                    Object.assign(filters, def_filters);
                }
                return $.extend({}, d, {
                    filters,
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr) {
                ajs.datatable_error(xhr, "search-datatables");
            }
        },
        language: {
            emptyTable: "No data found",
        },
        columns:[
            {
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
            },
            {
                name: "null",
                data: "null",
                searchable: false,
                orderable: false,

                render: function(data,type,row){
                    return (`<input class="form-check-input assign-btn selectedjobs" type="checkbox" id="job${row.id}" data-invoice_id="${invoice_id}" value="${row.id}" />`);
                }
            }, 
            {
                name: "jobs.code",
                data: "code",
                className: "task-id-box",
                render: function (data, type, row) {
                    const status = ['open'];
                    var is_emergency = (row.emergency_job == 1) ? '<i class="mdi mdi-circle fs-11 align-middle me-1 emergency-task-icon blink-" ></i>' : '';
                    var is_overdue = (status.includes(row.status.toLowerCase()) && row.target_date && moment(row.target_date) < moment()) ? '<i class="mdi mdi-circle fs-11 align-middle me-1 overdue-task-icon blink-" ></i>' : '';
                    var str = "";
                    str +=  `<div class="d-flex">
                                <div class="avatar-group align-items-center">
                                    <a  href="${cdn_url}job/details/${ajs.hash_encode(row.id)}" target="_blank" class="avatar-group-item pe-1" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="${data}">${data}</a>
                                    ${is_emergency} ${is_overdue}
                                </div>
                            </div>`;
                    return str;
                },
            },
            {
                name: "service_name",
                data: "service_name",
            },
            {
                name: "client_code",
                data: "client_code",
                render: function (data, type, row) {
                    return gen_client_detail_link(row.client_id, data);
                }
            },
            {
                name: "uprn_no",
                data: "uprn_no",
                render: function (data, type, row) {
                    return gen_property_detail_link(row.property_id, data);
                }
            },
            {
                name: "contract_number",
                data: "contract_number",
                render: function (data, type, row) {
                    return gen_contract_detail_link(row.contract_id, data);
                }
            },
            {
                name: "workstream_name",
                data: "workstream_name",
            },
            {
                data: "address1",
                name: "address1",
                render: function (data, type, row) {
                    return truncate_string(row.address1, 25);
                }
            },
            {
                data: "postalcode",
                name: "postalcode"
            },
            {
                data: "target_date",
                name: "target_date",
                render: function (data) {
                    return ajs.format_date(data);
                }
            },
            {
                data: "completed_date",
                name: "completed_date",
                render: function (data) {
                    return ajs.format_date(data);
                }
            }
        ],
        order: [["0", "desc"]],
    });
}

if ($("#invoice-detail-list-datatables").length) {

     console.log(invoiceId);
    if(invoiceId){
        id = ajs.hash_decode(invoiceId);
        ajs.ajax_form(site_url + "invoice/get/"+id, null, "GET", null, "0", "1", function (data) {
            console.log(data);
            if(data){
                $("#client_id_filter").val(data.client_code);
                $("#contract_id_filter").val(data.contract_number);          
            }
        });
        select2_ajax('#job_workstream_id', site_url + 'workstream/get_all', 'title', null, 'invoice_jobs_large_modal');
        $("#custom_filter").select2({allowClear: true, placeholder: 'Quick Filter'});
        fetch_default_filter(master_data_type);
    }
    
    var breadcrumbs = [
        {label: 'Invoices', url: `${cdn_url}invoices/list`},
        {label: 'Invoice Details', url: null}
    ];
    set_breadcrumb(breadcrumbs);
}

function initialize_search_table(filters = null) {
    def_filters = filters;
    table_filter = {};
    // add_autocomplete_sel('#job_workstream_id', "workstreams",["title"],null,null);
    select2_ajax('#job_workstream_id', site_url + 'workstream/get_all', 'title', null, 'invoice_jobs_large_modal');
    load_search_table();
}