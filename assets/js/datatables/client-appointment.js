// Create a map to track CKEditor instances by element ID
const ck_editors = new Map();
var deleted_appointments = [];
function create_form() {

    $("#appointmentForm").validate({
        onkeyup: false,
        rules: {
            // 'types[]': {
            //     required: true,
            // }
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
            // Base64 encode all appointments[n][draft] fields dynamically
            formData.forEach(function(field, index) {
                if (field.name.match(/^appointments\[\d+\]\[draft\]$/)) {
                    field.value = btoa(unescape(encodeURIComponent(field.value)));
                }
            });
            formData.push({name: 'deleted_appointments', value: deleted_appointments});
            ajs.reload = true;

            ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.form_submit_response, ajs_form_handler.form_submit_response);

            return false;
        },
    });

    ajs.mask_inputs();

}

// set role data in edit page
function set_data(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var appointments = result_json.data;

        for (let index = 1; index < appointments.length; index++)
        {
            $(".add-appointment").trigger('click', appointments[index]);
        }

        if (appointments.length == 0) {
            init_ckeditor(`#draft_id_0`, true).then(editor => {
                ck_editors.set(`draft_id_0`, editor);
                return editor;
            });
        }

        set_appointments(appointments);

    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

function set_appointments(appointments) {
    $.each(appointments, function (index, appointment) {
        $("input[name='appointments[" + index + "][id]']").val(appointment.id);
        $("input[name='appointments[" + index + "][title]']").val(appointment.title);
        $("input[name='appointments[" + index + "][subject]']").val(appointment.subject);
        $("select[name='appointments[" + index + "][type]']").val(appointment.type).trigger('change');

        if (index == 0) {
            init_ckeditor(`#draft_id_${index}`, true).then(editor => {
                ck_editors.set(`draft_id_${index}`, editor);
                if (appointment) {
                    editor.setData(appointment.draft);
                }
                return editor;
            });
            $('#appointment-section .accordion-button:first').html(appointment.title);
        }
    });
}

function edit_form() {
    create_form();
    var id = $("#client_id").val();
    ajs.ajax_form(site_url + "client/" + id + "/appointment", null, "GET", null, "1", "1", set_data, set_data);
    ajs.ajax_form(site_url + 'client/get/' + id, null, 'GET', null, '0', '0', create_breadcrumb, create_breadcrumb);
}

function create_breadcrumb(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {
        var client = result_json.message.data;

        $('#mail_header_name').val(client.mail_header);
        $('#mail_footer_name').val(client.mail_footer);
        $('#letter_header_name').val(client.letter_header);
        $('#letter_footer_name').val(client.letter_footer);

        if(!isEmpty(client.mail_header)){
            $('#mail_header_image').closest('.file-img-input-full').find('.delete-logo').show();
            $('#mail_header_image').closest('.file-img-input-full').find('.file-img-input-img').show();
        }
        if(!isEmpty(client.mail_footer)){
            $('#mail_footer_image').closest('.file-img-input-full').find('.delete-logo').show();
            $('#mail_footer_image').closest('.file-img-input-full').find('.file-img-input-img').show();
        }
        if(!isEmpty(client.letter_header)){
            $('#letter_header_image').closest('.file-img-input-full').find('.delete-logo').show();
            $('#letter_header_image').closest('.file-img-input-full').find('.file-img-input-img').show();
        }
        if(!isEmpty(client.letter_footer)){
            $('#letter_footer_image').closest('.file-img-input-full').find('.delete-logo').show();
            $('#letter_footer_image').closest('.file-img-input-full').find('.file-img-input-img').show();
        }

        $('.mail-header-preview').attr('src', s3_url + '/' + client.mail_header);
        $('.mail-footer-preview').attr('src', s3_url + '/' + client.mail_footer);
        $('.letter-header-preview').attr('src', s3_url + '/' + client.letter_header);
        $('.letter-footer-preview').attr('src', s3_url + '/' + client.letter_footer);

        var detail_url = 'clients/details/' + ajs.hash_encode(client.id);
        var breadcrumbs = [
            {label: 'Clients', url: cdn_url + 'clients/list'},
            {label: client.client_code, url: cdn_url + detail_url},
            {label: 'Comm. Templates', url: null}
        ];

        set_breadcrumb(breadcrumbs);

    } else {
        ajs_form_handler.show_errors(result_json);
    }
}


$(function () {

    var appointment_index = 1;
    var appointment_row = $("#appointment-section .accordion-item").first().clone();

    $(document).on("click", ".add-appointment", function (e, appointment) {
        const current_index = appointment_index;
        const draft_id = 'draft_id_' + current_index;
        var accordion_title = appointment ? appointment.title : 'Template #' + (appointment_index + 1);
        appointment_row.find('.draft-field').attr('id', draft_id);
        appointment_row.find('.accordion-button').html(accordion_title);

        var new_row = appointment_row.clone();

        new_row.html(function (i, oldHTML) {
            return oldHTML.replaceAll('appointments[0]', 'appointments[' + appointment_index + ']');
        });
        new_row.html(function (i, oldHTML) {
            return oldHTML.replaceAll('collapse_0', 'collapse_' + appointment_index);
        });

        $("#appointment-section").append(new_row);
        init_ckeditor(`#draft_id_${appointment_index}`, true).then(editor => {
            ck_editors.set(draft_id, editor);
            if (appointment) {
                editor.setData(appointment.draft);
            }
            return editor;
        });
        appointment_index++;
    });

    $(document).on("click", ".preview-appointment", function () {

        var parent = $(this).closest('.accordion-item');
        var id = parent.find('.row-id').val();
        if (id) {
            Swal.fire({
                title: 'Loading...',
                text: 'Please wait while generating preview.',
                allowOutsideClick: false,
                didOpen: () => {
                  Swal.showLoading();
                }
            });
            setTimeout(() => {
                var draft_id = parent.find('.draft-field').attr('id');
                var editor = ck_editors.get(draft_id);
                
                var draft_data = editor ? btoa(unescape(encodeURIComponent(editor.getData()))) : '';
                
                var client_id = $("#client_id").val();
                ajs.ajax_form(site_url + "client/" + client_id + "/preview-appointment", {content: draft_data}, "POST", null, "1", "1", function(result_json) {
                    Swal.close();
                    if (ajs_form_handler.check_result(result_json)) {
                        setTimeout(() => {
                            window.open(result_json.preview_link, '_blank');
                        }, 50);
                    } else {
                        ajs_form_handler.show_errors(result_json);
                    }
                }, function(result_json) {
                    Swal.close();
                    ajs_form_handler.show_errors(result_json);
                });
            }, 100);
        }

    });

    $(document).on("click", ".delete-appointment", function () {

        var parent = $(this).closest('.accordion-item');
        var id = parent.find('.row-id').val();
        if (id) {
            Swal.fire({
                title: "Are you sure want to delete? This action can't be undone",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Yes, Delete",
                denyButtonText: "Cancel"
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    deleted_appointments.push(id);
                    parent.remove();
                } else if (result.isDenied) {
                    Swal.fire("Deletion Cancelled", "", "info");
                }
            });

        }

    });

    $(document).on("click", ".delete-template-logo", function () {
        const imageType = $(this).data('image');
        Swal.fire({
            title: "Are you sure want to delete this image?",
            icon: "warning",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes, Delete",
            denyButtonText: "Cancel"
        }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleting...',
                    text: 'Please wait while deleting image.',
                    allowOutsideClick: false,
                    didOpen: () => {
                      Swal.showLoading();
                    }
                });
    
                await new Promise(r => setTimeout(r, 50));
                var id = $("#client_id").val();
                ajs.reload = true;
                ajs.ajax_form(site_url + "client/" + id + "/delete-appointment-logo", {type: imageType}, 'delete', null, "1", "1", ajs_form_handler.api_response, ajs_form_handler.api_response);
            }
        });
    });

    $(document).on("change", ".appointment-type", function () {

        if (['email','letter','survey_email','eicr_email','invoice_submitted'].includes($(this).val())) {
            $(this).closest('.appointment-row').find('.subject-div,.preview-appointment').show();
        } else {
            $(this).closest('.appointment-row').find('.subject-div,.preview-appointment').hide();
        }

    });

    $(document).on("input", ".appt-title", function () {
        
        var parent = $(this).closest('.accordion-item');
        parent.find('.accordion-button').html($(this).val());        

    });

    edit_form();
    ajs.apply_ind_roles('Clients');
});


