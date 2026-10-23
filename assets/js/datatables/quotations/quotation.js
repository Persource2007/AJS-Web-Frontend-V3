var master_data_type = "quotation";
dataTable = null;

function load_data_table(limit, search_term, filters) {

    data_filters = {};
    page_limit = ajs.datatable_limit;
    search = "";
    if (
            typeof filters != "undefined" &&
            (typeof filters["filters"] !== "undefined" || filters["filters"] != null)
            ) {
        data_filters = filters["filters"];
    }
    if (typeof limit !== "undefined" || limit != null) {
        page_limit = limit;
    }
    if (typeof search_term !== "undefined" || search_term != null) {
        search = search_term;
    }

var lastQuotationId = null;
$('#quotation-datatables').on('xhr.dt', function (e, settings, json, xhr) {
    //console.log(json.last_id)
    if (typeof json.last_id !== 'undefined' && json.last_id) {
        lastQuotationId = json.last_id;
        //console.log(lastQuotationId)
        $("#last_id").val(lastQuotationId);
    }
});

dataTable = new DataTable("#quotation-datatables", {
    scrollY: (screen.height - 500) + 'px',
    scrollCollapse: !0,
    scrollX: true,
    autoWidth: false,
    searching: false,
    serverSide: true,
    processing: true,
    paging: true,
    responsive: false,
    bDestroy: true,
    //responsive: false,
    pageLength: page_limit,
    search: {
        search: search,
    },
    ajax: {
        url: site_url + "quotation/get_all",
        method: "GET",
        async: false,
        dataSrc: "data",
        data: function (d) {
            return $.extend({}, d, {
                data_filters,
            });
        },
        beforeSend: function (xhr, settings) {
            ajs.set_auth_header(xhr, settings);
        },
        error: function (xhr) {
            ajs.datatable_error(xhr, "quotation-datatables");
        }
    },
    language: {
        emptyTable: "No data found",
    },
    columns: [
        {
            data: null,
            searchable: false,
            orderable: false,
            render: function (data, type, row) {
                    if (check_is_complete(row.status_code)){
                        return (
                            '<a data-after-load-func="view_quotation_form" data-heading="View Quotation - #' + row.id + '" data-form-url="' + cdn_url + 'quotation/edit/' + row.id + '" class="popup-form-button"><i title="View" class="ri-eye-line align-bottom me-2 primary-btn fs-15"></i></a>'
                        ); 
                    }else{
                        return (
                            '<a id="quotation_edit_' + row.id + '" data-after-load-func="edit_quotation_form" data-heading="Edit Quotation - #' + row.id + '" data-form-url="' + cdn_url + 'quotation/edit/' + row.id + '" class="popup-form-button" >'+edit_icon()+'</a>'
                            + detail_icon()
                        );    
                 }               
            },
        },
        {
            name: "id",
            data: "id",
            visible: false,
            searchable: false,
        },
        {
            name: "quotation_num",
            data: "quotation_num",
        },
        {
            name: "client_code",
            data: "client_code",
        },
        {
            name: "uprn_no",
            data: "uprn_no",
        },
        {
            name: "job_code",
            data: "job_code",
        },
        {
            data: "add_date",
            name: "add_date",
            render: function (data) {
                return ajs.format_date(data);
            }
        },
        {
            data: "expiry_date",
            name: "expiry_date",
            render: function (data) {
                return ajs.format_date(data);
            }
        },
        {
            name: "quote_version",
            data: "quote_version",
            render: function (data) {
                if(data > 0){
                    return 'V'+data;
                }else{
                    return '-';
                }
            }
        },
        {
            data: "status",
            name: "status",
            render: function (data) {
                return status_label(data);
            },
        },
        {
            data: "action",
            name: "action",
            render: function (data,type,row) {
                if (row.status_code.toLowerCase() == 'approve'){
                    return '<div class="dropdown d-inline-block"><button class="btn btn-soft-secondary btn-sm dropdown " type="button" data-bs-toggle="dropdown" aria-expanded="true"><i class="ri-more-fill align-middle"></i></button><ul class="dropdown-menu dropdown-menu-end"><li><a data-after-load-func="view_quotation_form" data-heading="View Quotation - #' + row.id + '" data-form-url="' + cdn_url + 'quotation/edit/' + row.id + '" class="dropdown-item popup-form-button" style="cursor:pointer"><i title="View" class="ri-eye-line align-bottom me-2 text-muted"></i>View</a></li><li><a class="dropdown-item download_pdf" href="'+s3_url+'/'+row.pdf_path + '" target="_blank" style="cursor:pointer"><i class="ri-file-download-fill align-bottom me-2 text-muted"></i>Download PDF</a></li><li><a id="quote_id' + row.id + '"  data-after-load-func="create_job_quote_form" href="' + cdn_url + 'job/list?in_quote=1&quote_id=' + row.id + '" class="dropdown-item" ><i class="ri-add-line align-bottom me-2 text-muted"></i> Convert to Job</a></li></ul></div>';
                }else if (row.status_code.toLowerCase() == 'reject'){
                    return '<div class="dropdown d-inline-block"><button class="btn btn-soft-secondary btn-sm dropdown " type="button" data-bs-toggle="dropdown" aria-expanded="true"><i class="ri-more-fill align-middle"></i></button><ul class="dropdown-menu dropdown-menu-end"><li><a data-after-load-func="view_quotation_form" data-heading="View Quotation - #' + row.id + '" data-form-url="' + cdn_url + 'quotation/edit/' + row.id + '" class="dropdown-item popup-form-button" style="cursor:pointer"><i title="View" class="ri-eye-line align-bottom me-2 text-muted"></i>View</a></li><li><a class="dropdown-item download_pdf" href="'+s3_url+'/'+row.pdf_path + '" target="_blank" style="cursor:pointer"><i class="ri-file-download-fill align-bottom me-2 text-muted"></i>Download PDF</a></li></ul></div>';
                }else if (row.status_code.toLowerCase() == 'sent'){
                    return '<div class="dropdown d-inline-block"><button class="btn btn-soft-secondary btn-sm dropdown " type="button" data-bs-toggle="dropdown" aria-expanded="true"><i class="ri-more-fill align-middle"></i></button><ul class="dropdown-menu dropdown-menu-end"><li><a style="cursor:pointer" class="dropdown-item popup-form-button"  data-after-load-func="edit_quotation_form" data-heading="Edit Quotation - #' + row.id + '" data-form-url="' + cdn_url + 'quotation/edit/' + row.id + '" ><i class="ri-pencil-fill align-bottom me-2 text-muted"></i>Edit </a></li><li><a class="dropdown-item send_quote_email" data-id="'+row.id + '" style="cursor:pointer"><i class="ri-mail-fill align-bottom me-2 text-muted"></i>Send Email</a></li><li><a class="dropdown-item apply-action confirm" data-action="approve" data-id="'+row.id + '" style="cursor:pointer" data-url="'+site_url+'quotation/approve-quote/'+row.id+'"><i class="ri-check-line align-bottom me-1"></i> Approve</a></li><li><a class="dropdown-item apply-action confirm" data-action="reject" data-id="'+row.id + '" style="cursor:pointer" data-url="'+site_url+'quotation/reject-quote/'+row.id+'"><i class="ri-close-line align-bottom me-1"></i> Reject</a></li><li><a class="dropdown-item download_pdf" style="cursor:pointer" href="'+s3_url+'/'+row.pdf_path + '" target="_blank"><i class="ri-file-download-fill align-bottom me-2 text-muted"></i>Download PDF</a></li></ul></div>';
                }else{
                    return '<div class="dropdown d-inline-block"><button class="btn btn-soft-secondary btn-sm dropdown " type="button" data-bs-toggle="dropdown" aria-expanded="true"><i class="ri-more-fill align-middle"></i></button><ul class="dropdown-menu dropdown-menu-end"><li><a style="cursor:pointer" class="dropdown-item popup-form-button"  data-after-load-func="edit_quotation_form" data-heading="Edit Quotation - #' + row.id + '" data-form-url="' + cdn_url + 'quotation/edit/' + row.id + '" ><i class="ri-pencil-fill align-bottom me-2 text-muted"></i>Edit </a></li><li><a class="dropdown-item list_delete" style="cursor:pointer" data-id="'+row.id + '"><i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>Delete</a></li><li><a class="dropdown-item send_quote_email" data-id="'+row.id + '" style="cursor:pointer"><i class="ri-mail-fill align-bottom me-2 text-muted"></i>Send Email</a></li></ul></div>';
                }
            },
        }
    ],
    order: [["1", "desc"]],
    drawCallback: function () {
        ajs.apply_ind_roles("Quotations");
    }
});

$(document).on("click", "a.apply-action.confirm", async function (e) {
    let actionType = $(this).data("action");
    var confirm_message ='';
    var confirm_url ='';
    if(actionType == 'approve'){
        confirm_url = $(this).data("url");
        method_type = 'GET';
        confirm_message = 'Are you sure you want to approve this quote?';
    }else{
        confirm_url = $(this).data("url");
        method_type = 'POST';
        confirm_message = 'Are you sure you want to reject this quote?';
    }

    e.preventDefault();
    Swal.fire({
        icon: 'question',
        title: 'Confirm Quote',
        text: confirm_message,
        confirmButtonText: 'Confirm Quote',
        showLoaderOnConfirm: true,
        confirmButtonColor: "#157347",
        showCancelButton: true,
        cancelButtonText: 'Cancel',

        preConfirm: async () => {
            try {
                const response = await $.ajax({
                    type: method_type,
                    url: confirm_url,
                });
                const res = response.data;
                console.log(res);
                if (response.status) {
                    Swal.fire({
                        title: `Success!!`,
                        icon: "success",
                        text: response.message
                    });
                } else {
                    Swal.fire({
                        title: `Error!!`,
                        icon: "error",
                        text: response.message
                    });
                }
                ajs.refreshDataTable();//reload data
            } catch (error) {
                const msg = error.responseJSON?.message || 'An unexpected error occurred.';
                Swal.fire({
                        title: `Error!!`,
                        icon: "error",
                        text: msg
                });
            }
        }
    });
})

function check_is_complete(status)
{
    if (status.toLowerCase() == 'approve' || status.toLowerCase() == 'reject')
    {
        return true;
    }
    return false;
}

$(document).on("click", ".list_delete", function () {
    Swal.fire({
        title: "Confirmation Required",
        icon: "success",
        text: 'Are you sure want to delete this Quotation?',
        showCancelButton: true,
        confirmButtonText: "Approve",
        showLoaderOnConfirm: true,
        confirmButtonColor: "#157347",
    }).then(async(result) => {
        if (result.isConfirmed ) {
            try {      
               // console.log('delete');
                var id = $(this).data("id");                  
                const response = await ajaxWithRefresh({
                    type: 'POST',
                    url: site_url + "quotation/delete/" + id,
                    data:''
                });
                //console.log(response);
                if (response.status == false) {
                    return Swal.showValidationMessage(`
                        <strong>Error: </strong>${response.message}
                    `);
                }else if(response.status == true){
                    return Swal.fire({
                        // title: `Success!!`,
                        icon: "success",
                        text: response.message
                    });
                }
            } catch (error) {
                var errorMsg = "Something went wrong.please try again...";
                if('responseJSON' in error){
                    errorMsg = $(`<div>${error.responseJSON.message}</div>`).text();
                }
                Swal.showValidationMessage(`<strong>Error: </strong> ${errorMsg}`);
            }
            ajs.refreshDataTable();//reload data
        }
    });

});

dataTable.setDetailRow = function (rowData) {
    var sorHtml = "";
    //console.log(rowData);
    $.each(rowData.quotation_sor, function (index, sor) {
        if (sor.assigned_to == null) {
            sor.assigned_to = "-";
        }
        if (sor.summary == null) {
            sor.summary = "-";
        }
        sorHtml +=
                `<tr>
                <td>` + sor.id + `</td>
                <td>${sor.sor_code ?? ''}</td>
                <td>${sor.short_description ?? '-'}</td>
                <td>${sor.quantity ?? ''}</td>
                <td class="pricing-col">${sor.price ?? ''}</td>
                <td class="pricing-col">${sor.total ?? ''}</td>
                <td>${sor.add_date ?? ''}</td>
            </tr>`;
    });

    if (sorHtml == "") {
        sorHtml = "<td colspan='7' align='center'> Data Not Available</td>";
    }
    return `
        <div class="details-row detail-row-main-tbl row job-details-row">
        <div class="col-md-2">
                <p>Quote Number: ${rowData.quotation_num ?? ''}</p>
                <p>Quote Title.: ${rowData.quotation_title ?? ''}</p>
        </div>
        <div class="col-md-10">
            <table class="table mb-0">
                <thead>
                    <tr>
                    <th>ID#</th>
                    <th>Sor</th>
                    <th>Desc</th>
                    <th>Qty</th>
                    <th class="pricing-col">Price</th>
                    <th class="pricing-col">Total</th>
                    <th>Date</th>
                    </tr>
                </thead>
                <tbody>${sorHtml}</tbody>
            </table>
        </div>
    </div>
    `;
}

}

if ($("#quotation-datatables").length) {

    select2_ajax("#status_id_filter", site_url + "master-record/get_all", "master_value", {master_code: "QUOTATION_STATUS"});
    select2_ajax(
            "#tag_id_filter",
            site_url + "tag/get_all",
            "title",
            {module: 'quotation'}
    );
    fetch_default_filter(master_data_type);
    
    var breadcrumbs = [
        {label: 'Quotes', url: null}
    ];
    set_breadcrumb(breadcrumbs);
}

function status_label(value) {    
    if (value == null) {
        return "-";
    }

    var icon = `<span class="badge border border-primary text-primary text-capitalize">${value}</span>`;
    if (value.toLowerCase() == 'new')
    {
        icon = `<span class="badge  border border-indigo text-indigo  text-capitalize">New</span>`;
    }  
    if (value.toLowerCase() == 'sent')
    {
        icon = `<span class="badge  border text-capitalize"  style="border-color:#D56800 !important;color:#D56800">Sent</span>`;
    }  
    if (value.toLowerCase() == 'reject')
    {
        icon = `<span class="badge  border border-danger text-danger  text-capitalize" >Rejected</span>`;
    }  
    if (value.toLowerCase() == 'approve')
    {
        icon = `<span class="badge  border border-success text-success  text-capitalize">Approved</span>`;
    }

    return icon;
}

function create_quotation_form(type = "create")
{
    var last_id = parseInt($('#last_id').val());
    console.log(last_id);      
    $("#last_inserted_id").val(last_id);

    if (type == "create") {
        var property_id = $('[id="property_id"]:hidden').val();
        var client_id = $('[id="client_id"]:hidden').val();
        var job_id = $('[id="job_id"]:hidden').val();
        var filter = {};
        var propfilter = {};
        
        var filter = '';
        if(property_id && client_id){
            filter = {'client_id':client_id, 'property_id':property_id};
        } else if(property_id){
            filter = {'property_id':property_id};
        } else if(client_id){
            filter = {'client_id':client_id};
        }   
        if (job_id) {
            add_autocomplete_sel("#job_id", "jobs", ["code"], null, filter, "offcanvasRight", job_id).then(() => {
                $("#job_id").trigger('change');
            });
        } else {                        
            add_autocomplete_sel("#job_id", "jobs", ["code"], null, filter, "offcanvasRight");
        }
        if (client_id) {
            add_autocomplete_sel("#client_id", "clients", ["client_code"], null, null, "offcanvasRight", client_id).then(() => {
                $("#client_id").trigger('change');
            });
        }else{            
            add_autocomplete_sel("#client_id", "clients", ["client_code"], null, null, "offcanvasRight");
        }
        if (property_id) {
            if(client_id){
                propfilter = {'client_id':client_id};
            }
            add_autocomplete_sel("#property_id", "client_properties", ["uprn_no", "postalcode"], null, propfilter, "offcanvasRight", property_id).then(() => {
                $("#property_id").trigger('change');
            });
        } else{
            add_autocomplete_sel("#property_id", "client_properties", ["uprn_no", "postalcode"], null, null, "offcanvasRight");
        }

        ajs.ajax_form(site_url + "master-record-by-code/NEW", null, "GET", null, "0", "1", function (data) {
            //console.log(data);
            if(data){
                $("#status_id").val(data.data.id);
                $("#status_name").val(data.data.master_value);
                $("#status_code").val(data.data.master_value_code);                
            }
        });

        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        $('#version_updated_at').val(formattedDate);

        var expirydate = getExpiryDate();
        $('#expiry_date').val(expirydate);

        //select2_ajax('#ajs_contact_type', site_url + 'master-record/get_all', 'master_value', {"masters.master_code": "USER_TYPES", 'master_values.status': '1'}, 'offcanvasRight');
        select2_ajax('#tags', site_url + 'tag/get_all', 'title', {"module": "quotation"}, 'offcanvasRight');

        // $('#ajs_contact_type').on('change', function () {
        //     var contact_type = $(this).val();
        //     if ($('#account_manager').data('select2')) {
        //         $('#account_manager').val('').trigger('change'); // Destroy Select2 instance
        //         $('#account_manager').select2('destroy'); // Destroy Select2 instance

        //     }
        //     add_autocomplete_sel($('#account_manager'), 'users', ['first_name', 'last_name'], null, {user_type: contact_type}, 'offcanvasRight');
        // });

    }

    $("#quotationForm").validate({
        onkeyup: false,
        rules: {

            client_id: {
                required: true,
            },
            quotation_num: {
                required: true,
            },
            email: {
                required: true,
                email: true,
            },
            client_mobile: {
                required: true,
            },
            property_id: {
                required: true,
            },
            contract_id: {
                required: true,
            },
            status_id: {
                required: true,
            },
        },
        errorPlacement: function (error, element) {
            if (
                element.hasClass("select2") &&
                element.next(".select2-container").length
            ) {
                error.insertAfter(element.next(".select2-container"));
            } else if (element.parent(".input-group").length ||
                    element.parent(".error-div").length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {

            var sor_ids = $(".sor_id").length; 
            console.log($("#is_send").val());
            if(sor_ids == '' || sor_ids == undefined ||  sor_ids == null || sor_ids.length < 1){
                Swal.fire({
                    title: "Validation Error",
                    icon: "error",
                    text: "Please select at least one sor.",
                });
                return false;
            }
            var id_send =  $("#is_send").val();
            
            if(id_send == '1'){
                var quote_version = $('#quote_version').val();
                $('#quote_version').val(parseInt(quote_version)+1);
                
                const formattedDate = geCurrentDateTime();
                $('#version_updated_at').val(formattedDate);

                ajs.ajax_form(site_url + "master-record-by-code/SENT", null, "GET", null, "0", "1", function (data) {
                    //console.log(data);
                    if(data){
                        $("#status_id").val(data.data.id);
                        $("#status_name").val(data.data.master_value);
                        $("#status_code").val(data.data.master_value_code);  
                    }
                });
            }
            var sub_button = $(form).find(":submit:first");
            ajs.submit_button_element = sub_button;
            var action = $(form).attr("action");
            var method = $(form).attr("method");
            setTimeout(function() {
                var formData = $(form).serializeArray();
                 // Modify checkbox value if checked
                ajs.ajax_form(action, formData, method, null, "0", "1", ajs_form_handler.offcanvas_form, ajs_form_handler.offcanvas_form);
            }, 100);
            setTimeout(function () {
                if ($("#is_detail_page").val()) {
                    $("#is_send").val(0);
                    get_details();
                }
            }, 300);

            return false;
        },
    });
}

function getExpiryDate(days=30){
    var currentDate = new Date();

    // Add 30 days
   
    currentDate.setDate(currentDate.getDate() + parseInt(days));

    // Format the date (optional, e.g., YYYY-MM-DD)
    var formattedDate = currentDate.toISOString().split('T')[0];

    return formattedDate
}

function geCurrentDateTime(){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');

    // Combine
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedDateTime;
}

$(document).on("click", "#send-btn", function () {
    $("#is_send").val(1);
    create_quotation_form("send")
});

$(document).on("change", "#expire_after", function () {
    var days = $(this).val();
    var expiry_date = getExpiryDate(days);
    $('#expiry_date').val(expiry_date);
});

$(document).on("change", "#client_id", function (e) {
    e.preventDefault();
    var client_id = $(this).val();
    var edit_id = $("#edit_id").val();
    // console.log('client_id');
    var last_inserted_id = $('#last_inserted_id').val();

    if ($('#job_id').hasClass('select2-hidden-accessible'))
    {
        // $("#job_id").select2("destroy");
        $('#job_id').find('option:not(:first)').remove();
    } 
    if ($('#property_id').hasClass('select2-hidden-accessible'))
    {
        $("#property_id").select2("destroy");
        $('#property_id').find('option:not(:first)').remove();
    }
    if (typeof client_id !== 'undefined' && client_id > 0)
    {
        ajs.ajax_form(site_url + "client/get/" + client_id, null, "GET", null, "0", "1", function (data) {
            //console.log(data);
            add_autocomplete_sel("#property_id", "client_properties", ["uprn_no", "postalcode"], null, {"client_id": client_id}, "offcanvasRight");
            if ($('#contract_id').hasClass('select2-hidden-accessible'))
            {
                $("#contract_id").select2("destroy");
                $('#contract_id').find('option:not(:first)').remove();
            }
            
            add_autocomplete_sel("#job_id", "jobs", ["code"], null, {"client_id": client_id}, "offcanvasRight");
            
            add_autocomplete_sel("#contract_id", "contracts", ["contract_number"], null, {"client_id": client_id}, "offcanvasRight");

        }); 
         
        if(edit_id != '' && edit_id > 0){
            
        }else{
            setTimeout(function () {
                    $('#quotation_num').val('Q-'+$('#client_id').val()+'-'+('00000'+(parseInt(last_inserted_id)+1)).slice(-5));
            }, 200);
        }
    }
});

$(document).on("change", "#property_id", function (e) {
    e.preventDefault();
    var property_id = $(this).val();
    // console.log('property_id');
    if ($('#job_id').hasClass('select2-hidden-accessible'))
    {
        // $("#job_id").select2("destroy");
        $('#job_id').find('option:not(:first)').remove();
    } 

    if (typeof property_id !== 'undefined' && property_id > 0)
    {
        ajs.ajax_form(site_url + "client/client_by_property/" + property_id, null, "GET", null, "0", "1", function (data) {
            
            if ($("#client_id").val() != data.message.client.id) {
                add_autocomplete_sel("#client_id", "clients", ["client_code"], null, null, "offcanvasRight", data.message.client.id);
                if ($('#contract_id').hasClass('select2-hidden-accessible'))
                {
                    $("#contract_id").select2("destroy");
                    $('#contract_id').find('option:not(:first)').remove();
                }
                
                add_autocomplete_sel("#contract_id", "contracts", ["contract_number"], null, {"client_id": client_id,contract_active: 1}, "offcanvasRight");
            }
        });
         add_autocomplete_sel("#job_id", "jobs", ["code"], null, {"property_id": property_id}, "offcanvasRight");
    }
});

$(document).on("change", "#job_id", function (e) {
    // console.log('job_id');
   e.preventDefault();
    var job_id = $(this).val();
   var last_inserted_id = $('#last_inserted_id').val();
    if (typeof job_id !== 'undefined' && job_id > 0)
    {
        ajs.ajax_form(site_url + "job/get/" + job_id, null, "GET", null, "0", "1", function (data) {
           //console.log(data);
           if(data){
               // console.log(data.data)
                if (data.data.client_id) {
                    add_autocomplete_sel("#client_id", "clients", ["client_code"], null, null, "offcanvasRight", data.data.client_id);
                    setTimeout(function () {
                            $('#quotation_num').val('Q-'+$('#client_id').val()+'-'+('00000'+(parseInt(last_inserted_id)+1)).slice(-5));
                    }, 200);
                }
                if (data.data.property_id) { 
                    var filter = {};
                    if(data.data.client_id){
                        filter = {'client_id':data.data.client_id};
                    }
                    add_autocomplete_sel("#property_id", "client_properties", ["uprn_no", "postalcode"], null, filter, "offcanvasRight", data.data.property_id);
                }
                if(data.data.contract_id){
                    add_autocomplete_sel("#contract_id", "contracts", ["contract_number"], null, {"client_id": data.data.client_id,contract_active: 1}, "offcanvasRight",data.data.contract_id).then(() => {
                        $("#contract_id").trigger('change');
                    });
                }
            }
        });
    }

});

$(document).on("change", "#contract_id", function (e) {
    e.preventDefault();
    var contract_id = $(this).val();
    // console.log('contract_id');
   $('#ajs_email').val('');
    if (contract_id) {       
        // console.log(contract_id); 
        ajs.ajax_form(site_url + "contract/ajsemail/" + contract_id, null, "GET", null, "0", "0", function (response) {
            //console.log(response);
            if(response.data.emails){
                $('#ajs_email').val(response.data.emails);
            }
        });
    }
});


function edit_quotation_form() {
    create_quotation_form("edit");
    var id = $("#edit_id").val();
    ajs.ajax_form(site_url + "quotation/get/" + id + "?edit=true", null, "GET", null, "0", "0", load_data, load_data);
}

function view_quotation_form() {
    create_quotation_form("view");
    var id = $("#edit_id").val();
    $('#quotationForm').find('input, select, textarea, button').prop('disabled', true);
    $('#add-btn').addClass('hide');
    $('#send-btn').addClass('hide');
    $('#close-modal').addClass('hide');
    
    setTimeout(function() {
        $('#quotationForm').find('input, select, textarea, button').prop('disabled', true);
        $('#quotationForm').find('select.select2').each(function () {
            $(this).select2('disable'); // disables Select2
        });
    }, 500);

    ajs.ajax_form(site_url + "quotation/detail/" + id + "?view=true", null, "GET", null, "0", "0", load_data, load_data);
}

var data_keys = [
    "quotation_title",
    "service_id",
    "service_name",
    "quotation_num",
    "description",
    "email",
    "client_mobile",
    "ajs_email",
    "ajs_mobile",
    "status_id",
    "status_code",
    "quote_version",
    "version_updated_at",
];

function load_data(result_json)
{
    // console.log(result_json);
    if (ajs_form_handler.check_result(result_json)) {
        var quotation = result_json.data;
        //console.log(quotation);
        for (const [key, value] of Object.entries(quotation)) {
            if (data_keys.includes(key)) {
                $("#" + key).val(value);
            }
        }

        set_client_id(quotation.client_id);
        set_property_id(quotation.property_id);
        set_job_id(quotation.job_id);
        set_contract_id(quotation.contract_id, quotation.client_id);
        
        ajs.ajax_form(site_url + "master-record-by-code/"+quotation.status_code, null, "GET", null, "0", "1", function (data) {
            console.log(data);
            if(data){
                
                if(data.data.master_value.toLowerCase() == 'approve'){
                    $("#status_name").val('Approved'); 
                }else if(data.data.master_value.toLowerCase() == 'reject'){
                    $("#status_name").val('Rejected');
                }else{
                     $("#status_name").val(data.data.master_value); 
                }
            }
        });


        var tags = pluck(quotation.tags, 'tag_id');
        select2_ajax('#tags', site_url + 'tag/get_all', 'title', {"module": "quotation"}, 'offcanvasRight', tags);

       //set_sor_id(quotation.client_id);

        $('#expiry_date').val(quotation.expiry_date);
        $('#expire_after').val(quotation.expire_after).trigger('change');
        $('#email').val(quotation.quote_email);
      
        $('#quotationForm').find('.popup-form-search-button:not(.phrasebook-btn,.add-sor-btn)').remove();

        populateQuotationTable(quotation.quotation_sors)

    } else {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}


function populateQuotationTable(data) {
    let rowsHtml = '';
    let footerHtml = '';
    let total = 0;
    var Vat = 20;
    const datatopass = {'var_type': 'system', 'var_name': 'vat'};
    ajs.ajax_form(site_url + "api/global_var/", datatopass, "POST", null, "0", "1", function (data) {
        // console.log(data);
        Vat = parseInt(data.message);
    });

    //console.log(data.length);
        if(data.length > 0){
            data.forEach(item => {
                const id = item.id;
                const sorId = item.sor_id;
                const quantity = parseFloat(item.quantity);
                const price = parseFloat(item.price);
                const rowTotal = quantity * price;
                total += rowTotal;

                // Optional: lookup sor_code and desc from preloaded `sorDetailsMap` if needed
                const sor_code = item.sor_code || '-';
                const desc = item.sor_description || '-';

                rowsHtml += `
                    <tr id="${id}">
                        <input type="hidden" class="sor_id" name="sor_ids[]" value="${sorId}">
                        <input type="hidden" name="quote_sor_id[]" value="${id}">
                        <input type="hidden" name="is_new_sor_added[]" value="0">
                        <td>${sor_code}</td>
                        <td>${desc}</td>
                        <td><input type="number" min="1" name="quantity[]" class="form-control w-50 quote_qty" style="text-align: right;" value="${quantity}"></td>
                        <td><input type="number" name="price[]" class="form-control w-50 quote_price" style="text-align: right;" value="${price}"></td>
                        <td class="row-total">£${rowTotal.toFixed(2)} <input type="hidden" name="total[]" value="${rowTotal.toFixed(2)}"></td>
                        <td><button type="button" class="remove-quote-item-btn btn btn-danger popup-add-btn" data-id="${id}" data-remove="quotation-sors" data-remove-url="${site_url}quotation/sors/delete/${id}"><i class="ri-close-line"></i></button></td>
                    </tr>
                `;
            });

            const vat = total * (Vat / 100);
            const grandTotal = total + vat;

            footerHtml += `
                <tr><th colspan="3"></th><th>Net Price</th><th style="text-align: right;">£${total.toFixed(2)}</th><th></th><input type="hidden" name="net_total" value="${total.toFixed(2)}"></tr>
                <tr><th colspan="3"></th><th>VAT(${Vat}%)</th><th style="text-align: right;">£${vat.toFixed(2)}</th><th></th><input type="hidden" name="vat" value="${vat.toFixed(2)}"></tr>
                <tr><th colspan="3"></th><th>Total</th><th style="text-align: right;">£${grandTotal.toFixed(2)}</th><th></th><input type="hidden" name="grand_total" value="${grandTotal.toFixed(2)}"></tr>
            `;
        }
    $('#quotation_sor_datatables tbody').html(rowsHtml);
    $('#quotation_sor_datatables tfoot').html(footerHtml);
}

function set_client_id(client_id) {
    add_autocomplete_sel("#client_id", "clients", ["client_code"], null, null, "offcanvasRight", client_id)
}

function set_property_id(property_id) {    
    add_autocomplete_sel("#property_id", "client_properties", ["uprn_no"], null, null, "offcanvasRight", property_id)
}

function set_job_id(job_id) {    
    add_autocomplete_sel("#job_id", "jobs", ["code"], null, null, "offcanvasRight", job_id)
}

function set_contract_id(contract_id,client_id) {
    add_autocomplete_sel("#contract_id", "contracts", ["contract_number"], null, {"client_id": client_id}, "offcanvasRight",contract_id);
}

$(document).on('click', '.remove-quote-item-btn', function (e) {
    var parent_div = $(this).data('parent-div');
    var remove_url = $(this).data('remove-url');
    var id = $(this).data('id');
    var remove_data_type = $(this).data('remove');
    if (typeof remove_url !== 'undefined' && typeof id !== 'undefined')
    {
        $(this).closest("tr").remove();
        ajs.ajax_form(remove_url, null, 'POST', null, '0', '1');
    }else{
        $(this).closest("tr").remove();
    }
    if (typeof parent_div !== 'undefied')
    {       
        $(this).closest('.' + parent_div).remove();
    }
    if(remove_data_type == 'quotation-sors'){
        recalculateTotals();
    }
});

$(document).on('click', '.send_quote_email', function (e) {
    var id = $(this).data('id');
    
   ajs.ajax_form(site_url + "quotation/send-quote-email/" + id, null, "POST", null, "0", "1", function (response) {

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
});