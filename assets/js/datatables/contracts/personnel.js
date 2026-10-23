var deleted_client_contacts = [];
var deleted_ajs_contacts = [];

function create_form() {

    $("#personnelForm").validate({
        rules: {
            // "client_contacts[0][type_id]": {
            //     required: true,
            // },
            // "client_contacts[0][name]": {
            //     required: true,
            // },
            "ajs_contacts[0][type_id]": {
                required: true,
            },
            "ajs_contacts[0][user_id]": {
                required: true,
            },
        },
        errorPlacement: function (error, element) {
            if (
                    element.hasClass("select2") &&
                    element.next(".select2-container").length
                    ) {
                error.insertAfter(element.next(".select2-container"));
            } else if (
                    element.parent(".input-group").length ||
                    element.parent(".error-div").length
                    ) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            // var post_data = $(form).serialize();
            var action = $(form).attr("action");
            var method = $(form).attr("method");
            var sub_button = $(form).find(":submit");
            ajs.submit_button_element = sub_button;

            var formData = $(form).serializeArray();

            formData.push({name: 'deleted_client_contacts', value: deleted_client_contacts});
            formData.push({name: 'deleted_ajs_contacts', value: deleted_ajs_contacts});
            ajs.reload = true;
            ajs.ajax_form(
                    action,
                    formData,
                    method,
                    null,
                    "1",
                    "1",
                    ajs_form_handler.form_submit_response,
                    ajs_form_handler.form_submit_response
                    );

            return false;
        },
    });
}

// set data in edit page
function load_data(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var personnel = result_json.data;
        var first_ajs_contact_id = personnel.ajs_contacts[0]?.user_id ?? null;
        var first_ajs_type_id = personnel.ajs_contacts[0]?.type_id ?? null;
        var first_client_type_id = personnel.client_contacts[0]?.type_id ?? null;

        for (let index = 1; index < personnel.client_contacts.length; index++) {
            $(".add-client-contact").trigger('click', personnel.client_contacts[index]);
        }

        for (let index = 1; index < personnel.ajs_contacts.length; index++) {
            $(".add-ajs-contact").trigger('click', personnel.ajs_contacts[index]);
        }

        select2_ajax(
                "#client_contact_type_0",
                site_url + "master-record/get_all",
                "master_value",
                {master_code: "CONTACT_TYPE"},
                undefined,
                first_client_type_id
                );

        select2_ajax(
                "#ajs_contact_type_0",
                site_url + "master-record/get_all",
                "master_value",
                {master_code: "USER_TYPES"},
                undefined,
                first_ajs_type_id
                );

        ajs.ajax_form(site_url + "role/get_all", null, "GET", null, "0", "0", function (response) {            
            if (response.data) {
                var scId = response.data.find(x => x.role_code === "SC").id;    
                user_ids = personnel.staffs.map(function (staff) { return staff.user_id; });
                select2_ajax_users("#staffs", {role_id: scId, status: 1}, undefined, user_ids);
            }
        });
        
        setTimeout(function () {
            select2_ajax_users("#ajs_user_0", {user_type: first_ajs_type_id}, 'body', first_ajs_contact_id);
        }, 500); // How long you want the delay to be, measured in milliseconds.



        $('#ajs_contact_type_0').on('change', function () {
            var contact_type = $(this).val();

            if ($('#ajs_user_0').hasClass('select2-hidden-accessible')) {
                $("#ajs_user_0").select2("destroy");
                $("#ajs_user_0").find('option:not(:first)').remove();
            }
            select2_ajax_users("#ajs_user_0", {user_type: contact_type}, 'body', null, true);
        });
        set_client_contacts(personnel.client_contacts);
        set_ajs_contacts(personnel.ajs_contacts);
        ajs.mask_inputs();
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

function set_client_contacts(contacts) {
    $.each(contacts, function (index, contact) {
        $("input[name='client_contacts[" + index + "][id]']").val(contact.id);
        $("input[name='client_contacts[" + index + "][name]']").val(contact.name);
        $("input[name='client_contacts[" + index + "][email]']").val(contact.email);
        $("input[name='client_contacts[" + index + "][phone]']").val(contact.phone);
        //$("#client_contact_type_"+index).val(contact.type_id).trigger('change');
    });
}

function set_ajs_contacts(contacts) {
    $.each(contacts, function (index, contact) {
        $("input[name='ajs_contacts[" + index + "][id]']").val(contact.id);
        $("input[name='ajs_contacts[" + index + "][email]']").val(contact.email);
        $("input[name='ajs_contacts[" + index + "][phone]']").val(contact.phone);
    });
}

// set email and phone input based on user change
function set_email_phone(result_json, event) {
    if (ajs_form_handler.check_result(result_json)) {
        var {email, telephone} = result_json.data;
        $(event).closest('.ajs-row').find('.email-field').val(email);
        $(event).closest('.ajs-row').find('.phone-field').val(telephone);
    }
}

function edit_form() {
    create_form("edit");
    var id = $("#edit_id").val();

    ajs.ajax_form(
            site_url + "contract/" + id + "/personnel",
            null,
            "GET",
            null,
            "1",
            "1",
            load_data,
            load_data
            );
    ajs.ajax_form(site_url + 'contract/get/' + id, null, 'GET', null, '0', '1', create_breadcrumb, create_breadcrumb, 'Personnel');
}

$(function () {
    var ajs_index = 1;
    var client_index = 1;
    var ajs_row = $(".ajs-row").first().clone();
    var client_row = $(".client-row").first().clone();

    $(document).on("click", ".add-client-contact", function (e, contact) {

        client_row.find('.btn-danger').parent().removeClass('hide');
        var client_type_id = 'client_contact_type_' + client_index;
        client_row.find('.client-type').attr('id', client_type_id);
        client_row.find('.popup-form-button-master').attr('data-element', client_type_id);

        var new_row = client_row.clone();
        new_row.html(function (i, oldHTML) {
            return oldHTML.replaceAll('client_contacts[0]', 'client_contacts[' + client_index + ']');
        });
        $("#client-section").append(new_row);

        select2_ajax(
                "#" + client_type_id,
                site_url + "master-record/get_all",
                "master_value",
                {master_code: "CONTACT_TYPE"},
                undefined,
                contact?.type_id
                );
        ajs.mask_inputs();
        client_index++;
    });

    $(document).on("click", ".delete-client-contact", function () {
        var parent = $(this).closest('.client-row');
        var id = parent.find('.contact-id').val();
        if (id) {
            deleted_client_contacts.push(id);
        }
        parent.remove();
    });

    $(document).on("click", ".add-ajs-contact", function (e, contact) {
        var ajs_type_id = 'ajs_contact_type_' + ajs_index;
        ajs_row.find('.ajs-type').attr('id', ajs_type_id);
        ajs_row.find('.ajs-type').attr('data-id', ajs_index);
        ajs_row.find('.ajs-user').attr('id', 'ajs_user_' + ajs_index);
        ajs_row.find('.ajs-user').attr('data-id', ajs_index);
        ajs_row.find('.popup-form-button-master').attr('data-element', ajs_type_id);
        ajs_row.find('.btn-danger').parent().removeClass('hide');

        var new_row = ajs_row.clone();
        new_row.html(function (i, oldHTML) {
            return oldHTML.replaceAll('ajs_contacts[0]', 'ajs_contacts[' + ajs_index + ']');
        });

        $("#ajs-section").append(new_row);

        select2_ajax(
                "#" + ajs_type_id,
                site_url + "master-record/get_all",
                "master_value",
                {master_code: "USER_TYPES"},
                undefined,
                contact?.type_id
                );

        if (typeof contact !== 'undefined' && typeof contact.type_id !== 'undefined' && typeof contact.user_id !== 'undefined')
        {
            select2_ajax_users($("#ajs_user_" + ajs_index), {user_type: contact.type_id}, 'body', contact?.user_id);
            
        }

        $('#ajs_contact_type_' + ajs_index).on('change', function () {
            var contact_type = $(this).val();
            var new_ajs_index = $(this).attr('data-id');
            if ($('#ajs_user_' + new_ajs_index).hasClass('select2-hidden-accessible'))
            {
                $("#ajs_user_" + new_ajs_index).select2("destroy");
                $("#ajs_user_" + new_ajs_index).find('option:not(:first)').remove();
            }
            select2_ajax_users("#ajs_user_" + new_ajs_index, {user_type: contact_type}, 'body', null, true);

        });
        ajs.mask_inputs();
        ajs_index++;
    });
    $(document).on("click", ".delete-ajs-contact", function () {
        var parent = $(this).closest('.ajs-row');
        var id = parent.find('.contact-id').val();
        if (id) {
            deleted_ajs_contacts.push(id);
        }
        parent.remove();
    });

    $(document).on("change", ".ajs-user", function () {
        var id = $(this).val();
        if (id > 0) {
            ajs.ajax_form(site_url + "user/get/" + id, null, "GET", null, "0", "0", set_email_phone, set_email_phone, this);
        }
    });

    if ($("#edit_id").val()) {
        edit_form();
    } else {
        create_form();
    }

    //ajs.apply_ind_roles("Contract_personnel");
});