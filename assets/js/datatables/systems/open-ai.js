

// Populate the form from the saved configuration.
function set_form_data(result_json) {
    var d = (result_json && result_json.data) ? result_json.data : {};

    // Never put the masked key into the field – only show it was saved.
    // The save endpoint skips API_KEY when the field is blank, preserving the stored key.
    $('#api_key').val(d.api_key || '');
    $('#alert_email').val(d.alert_email || '');
    $('#validation_prompt').val(d.validation_prompt || '');
    $('#ai_model').val(d.ai_model || 'gpt-5.5-mini');
    $('#confidence_threshold').val(d.confidence_threshold || '');
}

function save_form_data() {
    var form = document.getElementById('open_ai_setting_form');
    if (!$(form).valid()) { return; }

    var action = $(form).attr('action') || (site_url + 'open_ai_setting/save');
    var post_data = $(form).serialize();

    ajs.ajax_form(action, post_data, 'POST', null, '1', '1', function (res) {
        if (res.status == true) {
            Swal.fire({ title: 'Success!!', icon: 'success', text: res.message });
        } else {
            Swal.fire({ title: 'Error!!', icon: 'error', text: res.message });
        }
    }, function (err) {
        ajs_form_handler.show_errors_offcanvas && ajs_form_handler.show_errors_offcanvas(err);
    });
}

// Toggle the test prompt section visibility.
function toggle_test_prompt_section() {
    if ($('#enable_test_prompt').is(':checked')) {
        $('#test_prompt_section').slideDown(250);
    } else {
        $('#test_prompt_section').slideUp(250);
        // Clear response when hidden
        $('#ai_response_wrap').hide();
        $('#ai_response_content').text('');
    }
}

// Show image preview when a file is selected.
function handle_test_image_change() {
    var file = document.getElementById('test_image_file').files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#test_image_preview').attr('src', e.target.result);
            $('#test_image_preview_wrap').show();
        };
        reader.readAsDataURL(file);
    } else {
        $('#test_image_preview_wrap').hide();
        $('#test_image_preview').attr('src', '');
    }
}

// Validate required fields and send the image + prompt to OpenAI.
function test_prompt() {
    // --- Validate required settings fields ---
    var api_key = $.trim($('#api_key').val());
    var ai_model = $.trim($('#ai_model').val());
    var confidence = $.trim($('#confidence_threshold').val());
    var prompt = $.trim($('#validation_prompt').val());
    var fileInput = document.getElementById('test_image_file');
    var has_image = fileInput && fileInput.files && fileInput.files.length > 0;

    if (!api_key) {
        Swal.fire({ title: 'Missing Field', icon: 'warning', text: 'Please enter your OpenAI API Key.' });
        return;
    }
    if (!ai_model) {
        Swal.fire({ title: 'Missing Field', icon: 'warning', text: 'Please select an AI Model.' });
        return;
    }
    if (!confidence || isNaN(confidence) || confidence < 1 || confidence > 100) {
        Swal.fire({ title: 'Missing Field', icon: 'warning', text: 'Please enter a valid Confidence Percentage (1–100).' });
        return;
    }
    if (!prompt) {
        Swal.fire({ title: 'Missing Field', icon: 'warning', text: 'Please enter the Validation Prompt.' });
        return;
    }
    if (!has_image) {
        Swal.fire({ title: 'Missing Image', icon: 'warning', text: 'Please upload a test image.' });
        return;
    }

    // --- Show loading state ---
    var $btn = $('#test_prompt_btn');
    $btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-1"></span> Testing...');
    $('#ai_response_wrap').hide();
    $('#ai_response_content').text('');

    // --- Build FormData ---
    var fd = new FormData();
    fd.append('api_key', api_key);
    fd.append('ai_model', ai_model);
    fd.append('confidence_threshold', confidence);
    fd.append('validation_prompt', prompt);
    fd.append('test_image', fileInput.files[0]);

    $.ajax({
        url: site_url + 'open_ai_setting/test_prompt',
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        beforeSend: function (xhr) { ajs.set_auth_header && ajs.set_auth_header(xhr); },
        success: function (res) {
            $btn.prop('disabled', false).html('<i class="bi bi-cpu me-1"></i> Test Prompt');

            var response_text = '';
            if (res && res.status == true) {
                let responseData = res.response || res.message || {};
                try {
                    // If response is a JSON string
                    if (typeof responseData === 'string') {
                        responseData = JSON.parse(responseData);
                    }

                    response_text = JSON.stringify(responseData, null, 4);
                } catch (e) {
                    // Fallback to plain text
                    response_text = responseData;
                }
            } else {
                response_text = (res && res.message) ? JSON.stringify(res.message, null, 4) : 'An unknown error occurred.';
            }

            $('#ai_response_content').html('<pre class="mb-0">' + response_text + '</pre>');
            $('#ai_response_wrap').slideDown(200);
        },
        error: function (xhr) {
            $btn.prop('disabled', false).html('<i class="bi bi-cpu me-1"></i> Test Prompt');

            var msg = 'Test request failed.';
            try {
                var r = JSON.parse(xhr.responseText);
                if (r && r.message) { msg = r.message; }
            } catch (e) { }

            $('#ai_response_content').text(msg);
            $('#ai_response_wrap').slideDown(200);
        }
    });
}

function load_data() {
    $('#open_ai_setting_form').validate({
        onkeyup: false,
        rules: {
            api_key: { required: true },
            alert_email: { required: true, email: true },
            validation_prompt: { required: true },
            ai_model: { required: true },
            confidence_threshold: { required: true, digits: true, min: 1, max: 100 }
        },
        messages: {
            api_key: { required: 'Please enter your OpenAI API key.' },
            alert_email: { required: 'Please enter an alert email address.', email: 'Please enter a valid email address.' },
            validation_prompt: { required: 'Please enter the door photo validation prompt.' },
            ai_model: { required: 'Please select an AI model.' },
            confidence_threshold: {
                required: 'Please enter a confidence threshold.',
                digits: 'Confidence threshold must be a whole number.',
                min: 'Confidence threshold must be at least 1%.',
                max: 'Confidence threshold cannot exceed 100%.'
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        }
    });

    $('#save_setting_btn').on('click', save_form_data);
    $('#enable_test_prompt').on('change', toggle_test_prompt_section);
    $('#test_image_file').on('change', handle_test_image_change);
    $('#test_prompt_btn').on('click', test_prompt);

    // Load current settings
    ajs.ajax_form(site_url + 'open_ai_setting/get', null, 'GET', null, '1', '1', set_form_data, set_form_data);

    ajs.apply_ind_roles('Settings');
}

$(function () {
    load_data();
});
