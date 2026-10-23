var deleted_uplifts = [];
var deleted_uplift_reminders = [];
const ck_editors = new Map();

function create_form() {

    $("#upliftsForm").validate({
        onkeyup: false,
        rules: {
            "uplifts[0][percentage]": {
                required: true,
            },
            "uplifts[0][uplift_date]": {
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

            // Base64 encode all uplift_reminders[n][content] fields dynamically
            formData.forEach(function(field, index) {
                if (field.name.match(/^uplift_reminders\[\d+\]\[content\]$/)) {
                    field.value = btoa(unescape(encodeURIComponent(field.value)));
                }
            });

            formData.push({name: 'deleted_uplifts', value: deleted_uplifts});
            ajs.reload = true;
            ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.form_submit_response, ajs_form_handler.form_submit_response);

            return false;
        },
    });
    $("#upliftReminderForm").validate({
        onkeyup: false,
        rules: {
            "uplift_reminders[0][day]": {
                required: true,
            },
            "uplift_reminders[0][emails]": {
                required: true,
                multiemail:true
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

            formData.push({name: 'deleted_uplift_reminders', value: deleted_uplift_reminders});
            ajs.reload = true;
            ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.form_submit_response, ajs_form_handler.form_submit_response);

            return false;
        },
    });
    ajs.mask_inputs();
}

// set data in edit page
function set_data(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var uplifts = result_json.data;
        var uplift_reminders = result_json.uplift_reminders;
       // var first_service_id = uplifts[0]?.service_id ?? null;
        if(uplifts.length) {
            set_action_icon($(".uplift-row").first(), uplifts[0]);
        }

        for (let index = 1; index < uplifts.length; index++)
        {
            $(".add-uplift").trigger('click', uplifts[index]);
        }

        for (let index = 1; index < uplift_reminders.length; index++)
        {
            $(".add-uplift-reminder").trigger('click', uplift_reminders[index]);
        }
        if (uplift_reminders.length == 0) {
            init_ckeditor(`#reminder_content_0`, false).then(editor => {
                ck_editors.set(`reminder_content_0`, editor);
                return editor;
            });
        }
        set_uplifts(uplifts);
        set_uplift_reminders(uplift_reminders);
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

function callback_change_status(result_json, element) {
    if (ajs_form_handler.check_result(result_json)) {
        ajs.showAlertBar('success', result_json.message, 1);
        if(result_json.is_activated == 1) {
            $(element).html(`<input class="form-check-input" type="checkbox" role="switch" checked> <label class="form-label"> Activate /De-activate </label>`);
        } else {
            $(element).html(`<input class="form-check-input" type="checkbox" role="switch" ><label class="form-label"> Activate /De-activate</label>`);
        }
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

function set_action_icon(element, uplift) {
    if(uplift) {
        var status_icon = uplift.status == 1 ? '<input class="form-check-input" type="checkbox" role="switch" checked><label class="form-label"> Activate /De-activate</label>' : '<input class="form-check-input" type="checkbox" role="switch" ><label class="form-label"> Activate /De-activate</label>';
        element.find('.change-status-btn').attr('data-id',uplift.id).html(status_icon).parent().removeClass('hide');
    } else {
        element.find('.btn-danger').parent().removeClass('hide');
    }
}

function set_uplifts(uplifts) {
    $.each(uplifts, function (index, uplift) {
        $("input[name='uplifts[" + index + "][id]']").val(uplift.id);
        $("input[name='uplifts[" + index + "][uplift_date]']").val(uplift.uplift_date);
        $("input[name='uplifts[" + index + "][percentage]']").val(uplift.percentage);
        $("input[name='uplifts[" + index + "][rate]'][value='" + uplift.rate + "']").prop("checked", true);
    });
}

function set_uplift_reminders(reminders) {
    $.each(reminders, function (index, reminder) {
        $("input[name='uplift_reminders[" + index + "][id]']").val(reminder.id);
        $("input[name='uplift_reminders[" + index + "][day]']").val(reminder.day);
        $("input[name='uplift_reminders[" + index + "][emails]']").val(reminder.emails);
        $("input[name='uplift_reminders[" + index + "][subject]']").val(reminder.subject);

        if (index == 0) {
            init_ckeditor(`#reminder_content_${index}`).then(editor => {
                ck_editors.set(`reminder_content_${index}`, editor);
                if (reminder) {
                    editor.setData(reminder.content);
                }
                return editor;
            });
        }
    });
}

function edit_form() {
    create_form();
    var id = $("#client_id").val();
    ajs.ajax_form(site_url + "client/" + id + "/uplift", null, "GET", null, "0", "0", set_data, set_data);
    ajs.ajax_form(site_url + 'client/get/' + id, null, 'GET', null, '0', '1', create_breadcrumb, create_breadcrumb, 'Uplifts');
}

function get_details() {
    var id = $("#client_id").val();
    ajs.ajax_form(site_url + "client/" + id+"/uplift", null, "GET", null, "0", "0", set_detail, set_detail);
    ajs.ajax_form(site_url + 'client/get/' + id, null, 'GET', null, '0', '1', create_breadcrumb, create_breadcrumb, 'Uplifts');
}


function set_detail(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var uplifts = result_json.data;
        var uplift_reminders = result_json.uplift_reminders;
        var upliftHtml = "";
        $.each(uplifts, function (index, uplift) {
            upliftHtml += `<tr><td>${ajs.format_date(uplift.uplift_date)}</td>
                <td>${uplift.percentage}%</td>
                <td>On ${uplift.rate} rate</td>
            </tr>`;
        });
        
        if(upliftHtml != "") {
            $("#detail_uplifts").html(upliftHtml);
        }

        var reminderHtml = "";
        $.each(uplift_reminders, function (index, reminder) {
            reminderHtml += `<tr><td>${reminder.day}</td>
                <td>${reminder.emails}</td>
            </tr>`;
        });
        
        if(reminderHtml != "") {
            $("#detail_uplift_reminders").html(reminderHtml);
        }
        
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

function create_breadcrumb(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {
        var client = result_json.message.data;

        var detail_url = 'clients/details/' + ajs.hash_encode(client.id);
        var breadcrumbs = [
            {label : 'Clients', url: cdn_url + 'clients/list'},
            {label : client.client_code, url: cdn_url + detail_url},
            {label : 'Uplifts', url: null}
        ];

        set_breadcrumb(breadcrumbs);
        
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

$(function () {
    // Custom method for multiple email validation
    $.validator.addMethod("multiemail", function(value, element) {
        
        if (this.optional(element)) {
            return true;
        }
        var emails = value.split(','); // split by comma, semicolon or whitespace
        var valid = true;
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        $.each(emails, function(_, email) {
            email = email.trim();
            if (email.length && !emailRegex.test(email)) {
                valid = false;
                return false; // break loop
            }
        });
        return valid;
    }, "Please enter valid email addresses separated by commas.");


    var uplift_index = 1;
    var uplift_row = $(".uplift-row").first().clone();
    var uplift_reminder_index = 1;
    var uplift_reminder_row = $(".uplift-reminder-row").first().clone();

    $(document).on("click", ".add-uplift", function (e, uplift) {
        var service_id = 'service_id_' + uplift_index;
        uplift_row.find('.service-id').attr('id', service_id);
        
        var new_row = uplift_row.clone();

        set_action_icon(new_row, uplift);

        new_row.html(function (i, oldHTML) {
            return oldHTML.replaceAll('uplifts[0]', 'uplifts[' + uplift_index + ']');
        });

        $("#uplift-section").append(new_row);
        uplift_index++;
    });

    $(document).on("click", ".delete-uplift", function () {
        var parent = $(this).closest('.uplift-row');
        var id = parent.find('.row-id').val();
        if (id) {
            deleted_uplifts.push(id);
        }
        parent.remove();
    });

    $(document).on("click", ".add-uplift-reminder", function (e, uplift_reminder) {
        
        var new_row = uplift_reminder_row.clone();

        new_row.find('.btn-danger').parent().removeClass('hide');
        var content_id = 'reminder_content_' + uplift_reminder_index;
        new_row.find('.reminder-content').attr('id', content_id);

        new_row.html(function (i, oldHTML) {
            return oldHTML.replaceAll('uplift_reminders[0]', 'uplift_reminders[' + uplift_reminder_index + ']');
        });

        $("#uplift-reminder-section").append(new_row);
        init_ckeditor(`#reminder_content_${uplift_reminder_index}`, false).then(editor => {
            ck_editors.set(`reminder_content_${uplift_reminder_index}`, editor);
            if (uplift_reminder) {
                editor.setData(uplift_reminder.content);
            }
            return editor;
        });
        uplift_reminder_index++;

        if($('.uplift-reminder-row').length >= 3) {
            $(this).hide();
        }
    });

    $(document).on("click", ".delete-uplift-reminder", function () {
        var parent = $(this).closest('.uplift-reminder-row');
        var id = parent.find('.row-id').val();
        if (id) {
            deleted_uplift_reminders.push(id);
        }
        parent.remove();
        if($('.uplift-reminder-row').length < 3) {
            $(".add-uplift-reminder").show();
        }
    });

    $(document).on('change', '.change-status-btn', function () {
        var id = $(this).data('id');
        ajs.ajax_form(site_url + "uplift/change-status/" + id , null, "POST", null, "1", "1", callback_change_status, callback_change_status, this);

    });

    if($('#is_detail_page').val() > 0) {
        get_details();
    } else {
        edit_form();
    }    
    ajs.apply_ind_roles('Clients');
});
