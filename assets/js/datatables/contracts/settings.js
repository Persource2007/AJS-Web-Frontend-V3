
function create_form() {
    $("#settingsForm").validate({
        onkeyup: false,
        rules: {
            sor_prefix: {
                required: false,
            },
            job_prefix: {
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

            ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.form_submit_response, ajs_form_handler.form_submit_response);

            return false;
        },
    });
}

// set role data in edit page
function set_data(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var settings = result_json.data;

        create_breadcrumb(result_json, 'Contract Settings');

        if(settings == null) {
            return;
        }

        $("#sor_prefix").val(settings.sor_prefix);
        $("#job_prefix").val(settings.job_prefix);
        $("#ppm_preplan").val(settings.ppm_preplan);
        $("#contractor_commission").val(settings.contractor_commission);

        add_autocomplete_sel("#contractor_id","contractors",["first_name", "last_name"], null, {type:'agent'},"body", settings.contractor_id);
        if (settings.is_contract_agent == 1) {
            $("#is_contract_agent").prop("checked", true).trigger("change");
        } else {
            $("#is_contract_agent").prop("checked", false).trigger("change");
        }

        var client_id = settings.client_id;
        
        var tooltip_data = {};
        tooltip_data['client_id'] = client_id;
        
        $('#client_tooltip').attr('data-vars',JSON.stringify(tooltip_data));
        
    } else {
        ajs_form_handler.show_errors(result_json);
        
    }
}

function edit_form() {
    create_form();
    var id = $("#contract_id").val();
    ajs.ajax_form(site_url + "contract/get/" + id, null, "GET", null, "0", "0", set_data, set_data);
}

$(document).on("change", "#is_contract_agent", function () {

    if ($(this).is(':checked')) {
        $(".agent-div").show();
    } else {
        $(".agent-div").hide();
        $("#contractor_id,#contractor_commission").val('').trigger('change');
    }
});

$(function () {
    edit_form();
    ajs.apply_ind_roles('Contracts');
});
