$(document).on("change", "#update_password", function(){
	if($(this).is(':checked')){
		$(".pwd-sec").removeClass('hide');return
	}
	$(".pwd-sec").addClass('hide');
})

function load_view_data(result_json){
	if (ajs_form_handler.check_result(result_json)) {
        var profile = result_json.data;
        if(profile.profile_pic) {
            $("#profile-preview").attr('src', profile.profile_pic);
        }
        var breadcrumbs = [
            {label: "Profile", url: "javascript: void(0);"},
            {label: "View", url: null},
        ];
        set_breadcrumb(breadcrumbs);
        for (const [key, value] of Object.entries(profile)) {
            if(key == 'contracts'){
                var view = `<div class="row"><div class="col-xxl-4 col-md-4"><div class="mb-3"><label>Client</label><span class="client">{{CLIENT}}</span></div></div><div class="col-xxl-4 col-md-2"><div class="mb-3"><label>Contracts</label><span class="contracts">{{CONTRACTS}}</span></div></div></div>`;
                if(value.length>0){
                    $.each(value,function(i,d){
                        $("#assigned-client-contracts").append(view.replace("{{CLIENT}}",d.client).replace("{{CONTRACTS}}",d.contracts));
                    })
                }else{
                    $("#assigned-client-contracts").append("No client and contracts assigned.")
                }
            }
            else if (!$("#" + key).hasClass('form-check-input')) {
                $("#" + key).text(value);
            }
        }
    }
}

function load_edit_data(result_json){
	if (ajs_form_handler.check_result(result_json)) {
        var profile = result_json.data;
        if(profile.profile_pic) {
            $("#profile-preview").attr('src', profile.profile_pic);
        }
        var breadcrumbs = [
            {label: "Profile", url: "javascript: void(0);"},
            {label: "Edit", url: null},
        ];
        set_breadcrumb(breadcrumbs);
        select2_ajax('#city_id', site_url + 'cities/get_all', 'title', null);
        for (const [key, value] of Object.entries(profile)) {
            if (!$("#" + key).hasClass('form-check-input')) {
                $("#" + key).val(value);
            }
            else if($("#" + key).hasClass('select2')){
            	$("#city_id").val(value).trigger('change');
            }
        }
    }
}

$(document).ready(function(){
	if($('#profile-page-section').data('edit')){
		profile_validation('edit');
		ajs.ajax_form(site_url + "get/profile", null, "GET", null, "1", "0", load_edit_data, load_edit_data);
	}else{
		ajs.ajax_form(site_url + "get/profile", null, "GET", null, "1", "0", load_view_data, load_view_data);
	}
})

function profile_validation(type = 'create') {
   $("#update-profile-form").validate({
        onkeyup: false,
        rules: {
            first_name: {
                required: true,
            },
            last_name: {
                required: true,
            },
            email: {
                required: true,
                email: true,
            }
        },
        messages: {
            confirm_password: {equalTo: "Confirm password does not match."},
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
            //var post_data = $(form).serialize();

            var formData = $(form).serializeArray();

            ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.form_submit_response, ajs_form_handler.form_submit_response);

            return false;
        },
    });
    ajs.mask_inputs();
}

$('#update_password').change(function() {
    if ($(this).is(':checked')) {
        $('#current_password').rules('add', {
            required: true,
            minlength: 6,
            messages: {
                required: "Your current password is required to proceed.",
                minlength: "The current password must be at least 6 characters long."
            }
        });
        $('#password').rules('add', {
            required: true,
            minlength: 6,
            messages: {
                required: "Please create a new password.",
                minlength: "The new password must be at least 6 characters long."
            }
        });
        $('#confirm_password').rules('add', {
            required: true,
            equalTo: "#password",
            messages: {
                required: "Please confirm your new password.",
                equalTo: "The passwords do not match. Please try again."
            }
        });
    } else {
        $('#password').rules('remove');
        $('#confirm_password').rules('remove');
        $('#current_password').rules('remove');
    }
});