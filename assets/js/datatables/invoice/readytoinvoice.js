var master_data_type = "invoices_list";
dataTable = null;

$(document).ready(function () {
    add_autocomplete_sel("#client_id_filter", "clients", ["client_code"], null, null);
    select2_ajax("#tag_id_filter", site_url + "tag/get_all", "title", {module: 'job'});

    add_autocomplete_sel('#workstream_id_filter', "workstreams",["title"],null,null);
});

$(document).on("change", "#client_id_filter", function () {
    var client_id = $(this).val();
    if ($('#property_id_filter').hasClass('select2-hidden-accessible'))
    {
        $("#property_id_filter").select2("destroy");
        $('#property_id_filter').find('option:not(:first)').remove();
    }        
    if (typeof client_id !== 'undefined' && client_id > 0)
    {
        ajs.ajax_form(site_url + "client/get/" + client_id, null, "GET", null, "1", "1", function (data) {

//            add_autocomplete_sel("#property_id_filter", "client_properties", ["uprn_no", "postalcode"], null, {"client_id": client_id});
            if ($('#contract_id_filter').hasClass('select2-hidden-accessible'))
            {
                $("#contract_id_filter").select2("destroy");
                $('#contract_id_filter').find('option:not(:first)').remove();
            }
            select2_ajax("#contract_id_filter", site_url + "contract/get_all", "contract_number", {client_id: data.message.data.id, 'contracts.contract_active': '1'});
        });
    }

});

function load_data_table(limit, search_term, filters) {
    data_filters = '';
    page_limit = ajs.datatable_limit;
    search = '';
    client_id = $('#client_id_filter').val();
    contract_id = $('#contract_id_filter').val();
    
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
    //console.log(search);
    var lastInvoiceId = null;
    $('#readyto-invoice-list-datatables').on('xhr.dt', function (e, settings, json, xhr) {  
        //console.log(json.last_id);      
        if (typeof json.last_id !== 'undefined') {
            lastInvoiceId = json.last_id;
            $("#buildup_invoice").data('last_id', lastInvoiceId);
        }
    });
    if(client_id){
        $("#buildup_invoice").data('client_id', client_id);
    }
    if(contract_id){
        $("#buildup_invoice").data('contract_id', contract_id);
    }
        dataTable = new DataTable("#readyto-invoice-list-datatables", {
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
                url: site_url + "invoice/get_readyto_invoices",
                method: "get",
                async: false,
                dataSrc: "data",
                data: function (d) {
                    return $.extend({}, d, {
                        data_filters
                    });
                },
                beforeSend: function (xhr, settings) {
                    ajs.set_auth_header(xhr, settings);
                },
                error: function (xhr) {
                    ajs.datatable_error(xhr, "readyto-invoice-list-datatables");
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
                    name: "null",
                    data: "null",
                    searchable: false,
                    orderable: false,
                    render: function(data,type,row){
                        return (`<input class="form-check-input assign-btn selected_jobs" type="checkbox" id="job${row.id}" value="${ajs.hash_encode(row.id)}" />`);
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
            drawCallback: function () {
                ajs.apply_ind_roles("Invoices");
            }
        });
    // }
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

$(document).on("change", "#invoice_status", function () {
    var status = $(this).val();
    
    
});

$(document).on("click", "#update-batch-btn", function () {
    console.log('update-batch-btn');
    var target = $("input.selected_jobs:checked");
    // var status = $("select#invoice_status").val();
    // var statusText = $("select#invoice_status option:selected").text();

    var batch_no = $("#batch_no").val();
    // var invoice_no = $("#invoice_no").val();

    var error = 0;

    if(target.length < 1){
        errormsg = "Please select at least one job before proceeding.";
        error = 1;
    }else if(!checkvalue(batch_no)){
        errormsg = "Please select batch no.";
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

    let requetUrl = `${site_url}invoice/update`;
    var selected_jobs = [];
    target.each(function(){
        selected_jobs.push(ajs.hash_decode($(this).val()));
    })
    $textMsg = `Are you sure you want to update the batch of all ${selected_jobs.length} selected jobs"?`;
    if(selected_jobs.length <= 1){
        textMsg = `Are you sure you want to update the batch no "${batch_no}" the selected job ?`;
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
                let additionalData = {job_id: selected_jobs};
                const fullData = formData + '&' + $.param(additionalData);

                const response = await ajaxWithRefresh({
                    type: 'POST',
                    url: requetUrl,
                    data: fullData
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
                console.log(error);
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

$(document).on("click", "#build-invoice-btn", function () {
    var target = $("input.selected_jobs:checked");
    var status = $("select#invoice_status").val();
    var statusText = $("select#invoice_status option:selected").text();

    var batch_no = $("#batch_no").val();
    var invoice_no = $("#invoice_no").val();

    var error = 0;

    if(target.length < 1){
        errormsg = "Please select at least one job before proceeding.";
        error = 1;
    }
    else if(!checkvalue(status)){
        errormsg = "Select a valid status to update the selected jobs.";
        error = 1;
    }
    else if(!checkvalue(batch_no)){
        errormsg = "Please enter batch no.";
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
                    data: fullData
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
                console.log(error);
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

if ($("#readyto-invoice-list-datatables").length) {
    add_autocomplete_sel("#client_id_filter", "clients", ["client_code"], null, null);
    add_autocomplete_sel("#contract_id_filter","contracts", ["contract_number"], null, {'contracts.contract_active': '1'});
    add_autocomplete_sel('#workstream_id_filter', "workstreams",["title"],null,null);
    select2_ajax("#tag_id_filter", site_url + "tag/get_all", "title", {module: 'job'});

    $("#custom_filter").select2({allowClear: true, placeholder: 'Quick Filter'});
    fetch_default_filter(master_data_type);

    var breadcrumbs = [
        {label: 'Invoices', url: null},
        {label: 'Invoice List', url:  `${cdn_url}invoices/list`},
        {label: 'Create Invoice Batch', url: null}
    ];
    set_breadcrumb(breadcrumbs);
}

// Select/deselect All 
$(document).on("change","#batch_no",function(){
    var id = $(this).val();
    if(id){
        ajs.ajax_form(site_url + "invoice/get_all/", {'batch_no': id}, "GET", null, "0", "1", function (data) {
            if(data.data[0]){
                $("#existing_invoice_id").val(data.data[0].id);
            }
        });
    }
});

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
        $("input.selected_jobs").prop("checked",true);
    }else{
        $("input.selected_jobs").prop("checked",false);
    }
});

function addto_existing_batch_jobs(){
    var last_id = parseInt($("#buildup_invoice").data('last_id'));
    var client_id = parseInt($("#buildup_invoice").data('client_id'));
    var contract_id = parseInt($("#buildup_invoice").data('contract_id'));
    $("#existing_client_id").val(client_id);
    $("#existing_contract_id").val(contract_id);
    // console.log(client_id);
    // console.log(contract_id);
    $('div.custom-offcanvas-right').addClass("width-25");
    select2_ajax("#batch_no", site_url + "invoice/get_all", "batch_no", {'invoices.client_id': client_id,'invoices.contract_id': contract_id,'invoices_status_code': 'INVOICED'}, "offcanvasRight");
    var target = $("input.selected_jobs:checked");
    var selected_jobs = [];
    target.each(function(){
        selected_jobs.push(ajs.hash_decode($(this).val()));
    });
    
    // console.log(selected_jobs);
    // if(selected_jobs.length > 0){
    //     ajs.ajax_form(site_url + "/invoice/get_jobtask_total_sell/", {'job_id': selected_jobs.join(",")}, "post", null, "0", "1", function (data) {            
    //         console.log(data);
    //         console.log(data.data.details.total_sells);
    //         var sellprice =  parseFloat(data.data.details.total_sells);
    //         var vat = '';
    //         var vat_value = '';
    //         var total = '';
    //         if(sellprice){
    //             vat =data.data.vat;
    //             vat_value = sellprice * (vat / 100);
    //             total = sellprice + vat_value;
    //         }
    //          $(".sellprice_value h6").text('Value: '+sellprice.toFixed(2)).addClass(`p-2 fw-bold mb-3 text-end`);                  
    //          $(".vat_value h6").text('Vat('+vat+'%): '+vat_value.toFixed(2)).addClass(`p-2 fw-bold mb-3 text-end`);                  
    //          $(".total_value h6").text('Total: '+total.toFixed(2)).addClass(`p-2 fw-bold mb-3 text-end`);                
    //     });
    // } 

    var message = '';
    if (target.length >= 1) {
        type = 'primary';
        message = `You have selected ${target.length} job(s).`;        
    } else {
        message = "No job selected. Please select at least one job to continue.";
        type = 'danger';
    }
    $(".bulk-alert-message h6").text(message).addClass(`p-2 text-${type} border border-2 border-${type} fw-bold mb-3`);
}
function buildup_invoice_jobs(){
    var last_id = parseInt($("#buildup_invoice").data('last_id'));
    var client_id = parseInt($("#buildup_invoice").data('client_id'));
    var contract_id = parseInt($("#buildup_invoice").data('contract_id'));
    $('div.custom-offcanvas-right').addClass("width-25");
    $("#invoice_status").select2({placeholder:"Select Status"});
    select2_ajax("#invoice_status", site_url + "master-record/get_all", "master_value", {master_code: "INVOICE_STATUS",'master_values.status': '1'}, "offcanvasRight");
    
    setTimeout(function() {
        $('#invoice_status option').filter(function() {
            return $(this).text().trim() === 'Build up';
        }).prop('selected', true);
        $("#status_code").val('BUILDUP');
        $('#invoice_status').trigger('change');
    }, 300); 
    select2_ajax('#tags', site_url + 'tag/get_all', 'title', {"module": "invoice"}, 'offcanvasRight');
    $('#batch_no').val('BAT-'+('00000'+(parseInt(last_id)+1)).slice(-5));
    $("#hidden_client_id").val(client_id);
    $("#hidden_contract_id").val(contract_id);

    var target = $("input.selected_jobs:checked");
    var message = '';
    if (target.length >= 1) {
        type = 'primary';
        message = `You have selected ${target.length} job(s).`;        
    } else {
        message = "No job selected. Please select at least one job to continue.";
        type = 'danger';
    }
    $(".bulk-alert-message h6").text(message).addClass(`p-2 text-${type} border border-2 border-${type} fw-bold mb-3`);

        var target = $("input.selected_jobs:checked");
    var selected_jobs = [];
    target.each(function(){
        selected_jobs.push(ajs.hash_decode($(this).val()));
    });
    
    //console.log(selected_jobs);
    if(selected_jobs.length > 0){
        ajs.ajax_form(site_url + "/invoice/get_jobtask_total_sell/", {'job_id': selected_jobs.join(",")}, "post", null, "0", "1", function (data) {            
            console.log(data);
            console.log(data.data.details.total_sells);
            var sellprice =  parseFloat(data.data.details.total_sells);
            var vat = '';
            var vat_value = '';
            var total = '';
            if(sellprice){
                vat =data.data.vat;
                vat_value = sellprice * (vat / 100);
                total = sellprice + vat_value;
            }
             $(".sellprice_value h6").text('Total Value  '+sellprice.toFixed(2)).addClass(`p-2 fw-bold mb-3 text-end`);                  
             $(".vat_value h6").text('Vat @ '+vat+'%  '+vat_value.toFixed(2)).addClass(`p-2 fw-bold mb-3 text-end`);                  
             $(".total_value h6").text('Invoice Total  '+total.toFixed(2)).addClass(`p-2 fw-bold mb-3 text-end`);                  
        });
    } 


}

document.addEventListener("DOMContentLoaded", function () {
    const tableContainer = document.querySelector("#readyto-invoice-list-datatables"); // Replace with the actual parent container ID or class
    let lastChecked = null;

    tableContainer.addEventListener("click", function (e) {
        // Check if the clicked element is a checkbox with the class "selected_jobs"
        if (e.target && e.target.classList.contains("selected_jobs")) {
            const checkboxes = Array.from(
                tableContainer.querySelectorAll(".selected_jobs")
            );

            // Check if Shift key is pressed and there is a last checked checkbox
            if (e.shiftKey && lastChecked) {
                const start = Math.min(
                    checkboxes.indexOf(e.target),
                    checkboxes.indexOf(lastChecked)
                );
                const end = Math.max(
                    checkboxes.indexOf(e.target),
                    checkboxes.indexOf(lastChecked)
                );

                // Select all checkboxes between the start and end indices
                for (let i = start; i <= end; i++) {
                    checkboxes[i].checked = lastChecked.checked;
                }
            }

            // Update the last checked checkbox
            lastChecked = e.target;
        }
    });
});


["keyup","keydown"].forEach((event) => {
    window.addEventListener(event, (e) => {
        document.onselectstart = function() {
            return !(e.key == "Shift" && e.shiftKey);
        }
    });
});

