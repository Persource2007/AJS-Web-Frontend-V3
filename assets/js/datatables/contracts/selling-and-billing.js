
const billing_keys = [
    'company_name',
    'vat_number',
    'email',
    'address',
    'address2',
    'area',
    'postcode',
    'invoice_date',
];


function create_form() {

    $("#sellingAndBillingForm").validate({
        onkeyup: false,
        rules: {
            billing_type: {
                required: true,
            },
            invoice_type: {
                required: true,
            },
            email: {
                email: true,
            },
            send_billing_to: {
                required: true,
            },
            company_name: {
                required: true,
            },
            address: {
                required: true,
            },
            postcode: {
                required: true,
            },
            city_id: {
                required: true,
            }
        },
        errorPlacement: function (error, element) {
            if (
                    element.hasClass("select2") &&
                    element.next(".select2-container").length
                    ) {
                error.insertAfter(element.next(".select2-container"));
            } else if (element.parent(".input-group").length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {

            var sub_button = $(form).find(":submit");
            ajs.submit_button_element = sub_button;
            var action = $(form).attr("action");
            var method = $(form).attr("method");

            var formData = $(form).serializeArray();
            // Modify checkbox value if checked

            var checkbox_value = $('#is_proforma_invoice').is(':checked') ? 1 : 0;
            formData.push({name: 'is_proforma_invoice', value: checkbox_value});
            var checkbox_value = $('#use_client_billing').is(':checked') ? 1 : 0;
            formData.push({name: 'use_client_billing', value: checkbox_value});

            ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.form_submit_response, ajs_form_handler.form_submit_response);

            return false;
        },
    });

    ajs.mask_inputs();

}

// set role data in edit page
function set_data(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var billing = result_json.data;
        var city_id =  billing ? billing.city_id : null;
        select2_ajax('#city_id', site_url + 'cities/get_all', 'title', null, undefined, city_id);

        if(billing == null) {
            return;
        }

        for (const [key, value] of Object.entries(billing)) {
            if (billing_keys.includes(key)) {
                $("#" + key).val(value);
            }
        }

        if(billing.is_proforma_invoice == 1) {
            $("#is_proforma_invoice").prop("checked",true);
        } else {
            $("#is_proforma_invoice").prop("checked",false);
        }

        if(billing.use_client_billing == 1) {
            $("#use_client_billing").prop("checked",true);
            $(".addr-section").find('input,select').attr('readonly',true);
        } else {
            $("#use_client_billing").prop("checked",false);
        }

        const send_via = billing.send_via ? billing.send_via.split(',') : []

        $('.send-via').each(function () {
            if(send_via.includes($(this).val())) {
                $(this).prop('checked', true);
            } else {
                $(this).prop('checked', false);
            }
        });

        $("input[name=billing_type][value='"+billing.billing_type+"']").prop("checked",true);
        $("input[name=invoice_type][value='"+billing.invoice_type+"']").prop("checked",true);
        $("input[name=send_billing_to][value='"+billing.send_billing_to+"']").prop("checked",true);
        $("input[name=billing_frequency][value='"+billing.billing_frequency+"']").prop("checked",true);
        
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

// set client billing address in edit page
function set_client_billing_address(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var billing = result_json.data;
        var city_id =  billing ? billing.city_id : null;
        select2_ajax('#city_id', site_url + 'cities/get_all', 'title', null, undefined, city_id);

        if(billing == null) {
            var client_link = '<a href="'+ cdn_url + `clients/` + ajs.hash_encode(contract_client_id)+'/selling-and-billing" target="_blank">click here</a>';
            var billing_error = 'Client billing information not available, please '+client_link+' to update client billing information.';
            $('#client-billing-error').html(billing_error);
            return;
        }

        for (const [key, value] of Object.entries(billing)) {
            if (billing_keys.includes(key) && key != 'invoice_date') {
                $("#" + key).val(value);
            }
        }
        
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

function set_detail(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var billing = result_json.data;

        if(billing == null) {
            return;
        }

        for (const [key, value] of Object.entries(billing)) {
            if (billing_keys.includes(key)) {
                $("#detail_" + key).html(value);
            }
        }

        $("#detail_billing_type").html(billing.billing_type.replace('_',' '));
        $("#detail_invoice_type").html(billing.invoice_type.replace('_',' '));
        $("#detail_send_billing_to").html(billing.send_billing_to.replace('_',' '));
        $("#detail_billing_frequency").html(billing.billing_frequency.replace('_',' '));
        $("#detail_send_via").html(billing.send_via);

        if(billing.is_proforma_invoice == 1) {
            $("#detail_proforma_invoice").html('Yes');
        } else {
            $("#detail_proforma_invoice").html('No');
        }
        
        if(billing.invoice_date) {
            $("#detail_invoice_date").html(ajs.format_date(billing.invoice_date));
        }
        
        var address = billing.address;
        if (billing.address2) {
            address += '</br>' + billing.address2;
        }
        if (billing.area) {
            address += ', ' + billing.area;
        }
        if (billing.city_name) {
            address += '</br>' + billing.city_name;
        }
        if (billing.postcode) {
            address += ' - ' + billing.postcode;
        }

        $("#detail_invoice_address").html(address);
        
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

function edit_form() {
    create_form();
    var id = $("#edit_id").val();
    ajs.ajax_form(site_url + "contract/" + id+"/selling_and_billing", null, "GET", null, "0", "0", set_data, set_data);
    ajs.ajax_form(site_url + 'contract/get/' + id, null, 'GET', null, '0', '1', create_breadcrumb, create_breadcrumb, 'Contract Finance'); 
    
    if(contract_start_date)
    {
        $('#invoice_date').attr('min',contract_start_date);
    }
   
}

function get_details() {
    var id = $("#contract_id").val();
    ajs.ajax_form(site_url + "contract/" + id+"/selling_and_billing", null, "GET", null, "0", "0", set_detail, set_detail);
    ajs.ajax_form(site_url + 'contract/get/' + id, null, 'GET', null, '0', '1', create_breadcrumb, create_breadcrumb, 'Contract Finance');
   
}

$(function () {
    if($('#is_detail_page').val() > 0) {
        get_details();
    } else {
        edit_form();
    }
    $(document).on("click", "#use_client_billing", function () {
        $('#client-billing-error').html('');
        if ($(this).is(":checked")) {
            ajs.ajax_form(site_url + "client/" + contract_client_id + "/selling_and_billing", null, "GET", null, "1", "0", set_client_billing_address, set_client_billing_address);
            $(".addr-section").find('input,select').attr('readonly',true);
        } else {
            $(".addr-section").find('input,select').attr('readonly',false);
        }
    });
    //ajs.apply_ind_roles('SellingAndBilling');
});
