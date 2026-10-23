
const billing_keys = [
    'company_name',
    'vat_number',
    'email',
    'address',
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

            ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.api_response, ajs_form_handler.api_response);

            return false;
        },
    });

    ajs.mask_inputs();

}

// set role data in edit page
function set_data(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var billing = result_json.data;
        var city_id = billing ? billing.city_id : null;
        select2_ajax('#city_id', site_url + 'cities/get_all', 'title', null, undefined, city_id);

        if (billing == null) {
            return;
        }

        for (const [key, value] of Object.entries(billing)) {
            if (billing_keys.includes(key)) {
                $("#" + key).val(value);
            }
        }

        if (billing.is_proforma_invoice == 1) {
            $("#is_proforma_invoice").prop("checked", true);
        } else {
            $("#is_proforma_invoice").prop("checked", false);
        }

        const send_via = billing.send_via ? billing.send_via.split(',') : []

        $('.send-via').each(function () {
            if (send_via.includes($(this).val())) {
                $(this).prop('checked', true);
            } else {
                $(this).prop('checked', false);
            }
        });

        $("input[name=billing_type][value='" + billing.billing_type + "']").prop("checked", true);
        $("input[name=invoice_type][value='" + billing.invoice_type + "']").prop("checked", true);
        $("input[name=send_billing_to][value='" + billing.send_billing_to + "']").prop("checked", true);
        $("input[name=billing_frequency][value='" + billing.billing_frequency + "']").prop("checked", true);

    } else {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function edit_form() {
    create_form();
    var id = $("#client_id").val();
    ajs.ajax_form(site_url + "client/" + id + "/selling_and_billing", null, "GET", null, "1", "0", set_data, set_data);
    ajs.ajax_form(site_url + 'client/get/' + id, null, 'GET', null, '0', '0', create_breadcrumb, create_breadcrumb);
}

function create_breadcrumb(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {
        var client = result_json.message.data;

        var detail_url = 'clients/details/' + ajs.hash_encode(client.id);
        var breadcrumbs = [
            {label : 'Clients', url: cdn_url + 'clients/list'},
            {label : client.client_code, url: cdn_url + detail_url},
            {label : 'Finance', url: null}
        ];

        set_breadcrumb(breadcrumbs);
        
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

$(function () {
    edit_form();
    ajs.apply_ind_roles('Clients');
});
