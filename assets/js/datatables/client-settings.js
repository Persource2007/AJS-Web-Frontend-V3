
function create_form() {

    $("#settingsForm").validate({
        onkeyup: false,
        rules: {
            sor_prefix: {
                required: true,
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

            ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.api_response, ajs_form_handler.api_response);

            return false;
        },
    });
}

// set role data in edit page
function set_data(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var settings = result_json.message.data;

        var detail_url = 'clients/details/' + ajs.hash_encode(settings.id);
        var breadcrumbs = [
            {label : 'Clients', url: cdn_url + 'clients/list'},
            {label : settings.client_code, url: cdn_url + detail_url},
            {label : 'Settings', url: null}
        ];
        set_breadcrumb(breadcrumbs);

        if(settings == null) {
            return;
        }

        $("#sor_prefix").val(settings.sor_prefix);
        $("#job_prefix").val(settings.job_prefix);
        
    } else {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function edit_form() {
    create_form();
    var id = $("#client_id").val();
    ajs.ajax_form(site_url + "client/get/" + id, null, "GET", null, "0", "0", set_data, set_data);
}

$(function () {
    edit_form();
    ajs.apply_ind_roles('Clients');
});
