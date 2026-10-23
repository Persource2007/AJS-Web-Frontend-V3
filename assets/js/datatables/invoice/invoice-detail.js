var master_data_type = "invoices_list";
dataTable = null;

function load_data_table(limit, search_term, filters) {
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

    var clientId = null;
    var contractId = null;
    $('#invoice-detail-list-datatables').on('xhr.dt', function (e, settings, json, xhr) {      
        if (typeof json.invoice_data !== 'undefined'){       
            $(".batch_number_label").text('Batch No: '+json.invoice_data.batch_no);
            $("#client_id_filter").val(json.invoice_data.client_id);
            $("#client_name").val(json.invoice_data.client_code);
            $("#contract_id_filter").val(json.invoice_data.contract_id);  
            $("#contract_name").val(json.invoice_data.contract_number);  
            if(json.invoice_data.status_code != 'INVOICED' && json.invoice_data.status_code != 'CANCELLED' && json.invoice_data.status_code != 'DELETED'){               
                $('.add_jobs_to_batch').removeClass('hide');
            }
        }
    });
    
//  console.log(invoiceId);
    dataTable = new DataTable("#invoice-detail-list-datatables", {
        scrollY: (screen.height - 450) + 'px',
        scrollX: true,
        autoWidth: false,
        serverSide: true,
        processing: true,
        paging: true,
        responsive: false,
        bDestroy: true,
        pageLength: page_limit,
//        dom: "<'row'<'col-sm-12'tr>>" +
//         "<'row'<'col-sm-4'l><'col-sm-4'i><'col-sm-4'p>>",
        search: {
            search: search
        },
        // dom: 'Bfrtip',
        buttons: [
            'excel'
        ],
        ajax: {
            url: site_url + "invoice/get_invoice_detail_list/",
            method: "GET",
            async: false,
            dataSrc: "data",
            data: function (d) {
                d.request_id = ajs.hash_decode(invoiceId);
                return $.extend({}, d, {
                    data_filters,
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr) {
                ajs.datatable_error(xhr, "invoice-detail-list-datatables");
            }
        },
        language: {
            emptyTable: "No data found",
        },
        columns: [
            {
                name: "invoice_job_id",
                data: "invoice_job_id",
                visible: false,
                searchable: false,
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
                                    <a  href="${cdn_url}job/details/${ajs.hash_encode(row.job_id)}" target="_blank" class="avatar-group-item pe-1" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="${data}">${data}</a>
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
            },
            { data: "total_material_price", name: "total_material_price", orderable: false, searchable: false, className: "text-end",
              render: function (d) { return (parseFloat(d) || 0).toFixed(2); } },
            { data: "total_labor_price", name: "total_labor_price", orderable: false, searchable: false, className: "text-end",
              render: function (d) { return (parseFloat(d) || 0).toFixed(2); } },
            { data: "total_sell_price", name: "total_sell_price", orderable: false, searchable: false, className: "text-end",
              render: function (d) { return (parseFloat(d) || 0).toFixed(2); } },
            { data: "total_quantity", name: "total_quantity", orderable: false, searchable: false, className: "text-end",
              render: function (d) { return (parseFloat(d) || 0).toFixed(2); } },
            { data: "amount", name: "amount", orderable: false, searchable: false, className: "text-end",
              render: function (d) { return (parseFloat(d) || 0).toFixed(2); } },
            { data: "vat_amount", name: "vat_amount", orderable: false, searchable: false, className: "text-end",
              render: function (d) { return (parseFloat(d) || 0).toFixed(2); } },
            { data: "total_amount", name: "total_amount", orderable: false, searchable: false, className: "text-end",
              render: function (d) { return (parseFloat(d) || 0).toFixed(2); } }
        ],
        order: [["0", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Invoices");
        }
    });

    $('body').tooltip({
        selector: '[data-bs-toggle="tooltip"]'
    });
}

function checkvalue(val){
    val = $.trim(val);
    if(val == '' || val == undefined || val == null || val.length < 1){
        return false;
    }
    return true;
}

$(document).on("click", "#build-invoice-btn", function () {
    var target = $("input.selected_jobs:checked");
    var status = $("select#invoice_status").val();
    var statusText = $("select#invoice_status option:selected").text();
    var error = 0;

    if(target.length < 1){
        errormsg = "Please select at least one job before proceeding.";
        error = 1;
    }
    else if(!checkvalue(status)){
        errormsg = "Select a valid status to update the selected jobs.";
        error = 1;
    }
    if(error == 1){
        Swal.fire({
            title: "Unable to Update",
            icon: "error",
            text: errormsg,
        });
        return false;
    }

    let requetUrl = `${site_url}invoice/schedule_invoice`;
    var selected_jobs = [];
    target.each(function(){
        selected_jobs.push(ajs.hash_decode($(this).val()));
    })
    $textMsg = `Are you sure you want to update the statuses of all ${selected_jobs.length} selected jobs to "${statusText}"?`;
    if(selected_jobs.length <= 1){
        textMsg = `Are you sure you want to update the status of the selected job to "${statusText}"?`;
    }

    Swal.fire({
        title: "Confirmation",
        icon: "warning",
        text: $textMsg,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        showLoaderOnConfirm: true,
        preConfirm: async (message) => {
            try {        
                let formData = $('form.invoice-jobs-form').serialize();
                let additionalData = {jobs: selected_jobs.join(",")};
                const fullData = formData + '&' + $.param(additionalData);

                const response = await ajaxWithRefresh({
                    type: 'POST',
                    url: requetUrl,
                    data: fullData,
                    dataType: 'json'
                });
                
                if (response.status == false) {
                    Swal.fire({
                        title: `Error!!`,
                        icon: "error",
                        text: response.message
                    });
                    return false;
                }
                return response;
            } catch (error) {
                // console.log(error);
                var errorMsg = "Something went wrong.please try again...";
                if('responseJSON' in error){
                    errorMsg = $(`<div>${error.responseJSON.message}</div>`).text();
                }
                // Swal.showValidationMessage(`<strong>Error: </strong> ${errorMsg}`);
                Swal.fire({
                        title: `Error!!`,
                        icon: "error",
                        text: errorMsg
                    });
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed && result.value.status) {
            Swal.fire({
                title: `Success!!`,
                icon: "success",
                text: result.value.message
            });
            ajs.refreshDataTable();//reload data
            $('button#close-modal').click();
            $("input.allselect").prop("checked",false);
        }
    });
});

if ($("#invoice-detail-list-datatables").length) {

    //  console.log(invoiceId);
    if(invoiceId){
        id = ajs.hash_decode(invoiceId);
        ajs.ajax_form(site_url + "invoice/get/"+id, null, "GET", null, "0", "1", function (data) {
            // console.log(data);
            if(data){
                $("#client_id_filter").val(data.client_code);
                $("#contract_id_filter").val(data.contract_number);          
            }
        });
        add_autocomplete_sel('#workstream_id_filter', "workstreams",["title"],null,null);
        $("#custom_filter").select2({allowClear: true, placeholder: 'Quick Filter'});
        fetch_default_filter(master_data_type);
    }
    
    var breadcrumbs = [
        {label: 'Invoices', url: null},
        {label: 'Invoice List', url:  `${cdn_url}invoices/list`},
        {label: 'Invoice Details', url: null}
    ];
    set_breadcrumb(breadcrumbs);
}

// Select/deselect All 
$(document).on("change","input.selected_jobs",function(){
    var total = $("input.selected_jobs").length;
    var selected = $("input.selected_jobs:checked").length;
    if(total == selected){
        $("input.allselect").prop("checked",true);
    }else{
        $("input.allselect").prop("checked",false);
    }
});

$(document).on("change","input.allselect",function(){
    if($(this).is(":checked")){
        $("input.selected_batch").prop("checked",true);
    }else{
        $("input.selected_batch").prop("checked",false);
    }
});

$(document).on('click', '.remove-invoice-item-btn', function (e) {
    var parent_div = $(this).data('parent-div');
    var remove_url = $(this).data('remove-url');
    var $tbody = $('#invoice-detail-list-datatables tbody');
    var rowCount = $tbody.find('tr').length;
    // console.log(remove_url);


    if (rowCount > 1) {
        if (typeof remove_url !== 'undefined')
        {
            $(this).closest("tr").remove();
            ajs.ajax_form(remove_url, null, 'POST', null, '0', '1', function (response) {

                if (response.status == false) {
                    Swal.showValidationMessage(`
                        title: "Validation Error",
                        icon: "error",
                        text: ${response.message},
                    `);
                }else if(response.status == true){
                    Swal.fire({
                        title: `Success!!`,
                        icon: "success",
                        text: response.message
                    });
                    ajs.refreshDataTable();
                }
            });
        }
        if (typeof parent_div !== 'undefied')
        {       
            $(this).closest('.' + parent_div).remove();
        }
    }else{
         Swal.fire({
            title: `Validation Error!!`,
            icon: "error",
            text: 'There is only one job in the invoice so you can not delete this job. Please add new job to remove this job.'
        });
    }
});