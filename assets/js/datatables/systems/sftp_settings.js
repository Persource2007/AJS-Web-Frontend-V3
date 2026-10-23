

// Populate the form from the saved configuration.
function sftp_load(result_json) {
    var d = (result_json && result_json.data) ? result_json.data : {};

    $('#sftp_host').val(d.host || '');
    $('#sftp_port').val(d.port || 22);
    $('#sftp_username').val(d.username || '');
    $('#sftp_auth_type').val(d.auth_type || 'private_key');
    $('#sftp_root_path').val(d.root_path || '');
    $('#sftp_private_key_path').val(d.private_key_path || '');

    // Fresh (unconfigured) setup defaults to Active = on; an existing config
    // reflects its saved status exactly.
    var is_active = d.configured ? (d.status == 1) : true;
    $('#sftp_status').prop('checked', is_active);

    $('#sftp_key_current').text(d.private_key_path ? ('Current key: ' + d.private_key_path) : '');

    if (d.has_password) {
        $('#sftp_password').attr('placeholder', 'Password saved - leave blank to keep');
    }
    if (d.has_passphrase) {
        $('#sftp_passphrase').attr('placeholder', 'Passphrase saved - leave blank to keep');
    }

    sftp_toggle_auth();
}

// Show/hide password vs private-key fields based on the selected auth type.
function sftp_toggle_auth() {
    if ($('#sftp_auth_type').val() === 'private_key') {
        $('.sftp-auth-key').show();
        $('.sftp-auth-password').hide();
    } else {
        $('.sftp-auth-key').hide();
        $('.sftp-auth-password').show();
    }
}

// Upload the chosen private key file (if any) before save/test, then continue.
function sftp_upload_key_if_needed(cb) {
    var fileInput = document.getElementById('sftp_private_key_file');
    var hasFile = $('#sftp_auth_type').val() === 'private_key'
        && fileInput && fileInput.files && fileInput.files.length > 0;

    if (!hasFile) {
        cb($('#sftp_private_key_path').val());
        return;
    }

    var fd = new FormData();
    fd.append('file', fileInput.files[0]);

    $.ajax({
        url: site_url + 'sftp_setting/upload_key',
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        beforeSend: function (xhr) { ajs.set_auth_header(xhr); },
        success: function (res) {
            if (res && res.status === true) {
                $('#sftp_private_key_path').val(res.path);
                cb(res.path);
            } else {
                Swal.fire({ title: 'Error!!', icon: 'error', text: (res && res.message) ? res.message : 'Private key upload failed' });
            }
        },
        error: function () {
            Swal.fire({ title: 'Error!!', icon: 'error', text: 'Private key upload failed' });
        }
    });
}

function sftp_save() {
    var form = document.getElementById('sftp_setting_form');
    if (!$(form).valid()) { return; }

    sftp_upload_key_if_needed(function () {
        var action = $(form).attr('action') || (site_url + 'sftp_setting/save');
        var post_data = $(form).serialize();

        ajs.ajax_form(action, post_data, 'POST', null, '1', '1', function (res) {
            if (res.status == true) {
                Swal.fire({ title: 'Success!!', icon: 'success', text: res.message });
                location.reload();
            } else {
                Swal.fire({ title: 'Error!!', icon: 'error', text: res.message });
            }
        }, function (err) {
            ajs_form_handler.show_errors_offcanvas && ajs_form_handler.show_errors_offcanvas(err);
        });
    });
}

function sftp_test() {
    var form = document.getElementById('sftp_setting_form');

    if (!$('#sftp_host').val() || !$('#sftp_username').val()) {
        Swal.fire({ title: 'Missing info', icon: 'warning', text: 'Host and Username are required to test the connection.' });
        return;
    }

    sftp_upload_key_if_needed(function () {
        var post_data = $(form).serialize();

        ajs.ajax_form(site_url + 'sftp_setting/test_connection', post_data, 'POST', null, '1', '1', function (res) {
            if (res.status == true) {
                Swal.fire({ title: 'Success!!', icon: 'success', text: res.message || 'Connection Successful' });
            } else {
                Swal.fire({ title: 'Connection Failed', icon: 'error', text: res.message || 'Unable to connect' });
            }
        }, function () {
            Swal.fire({ title: 'Error!!', icon: 'error', text: 'Test connection request failed' });
        });
    });
}

function init_sftp_settings() {
    $('#sftp_setting_form').validate({
        onkeyup: false,
        ignore: ':hidden, #sftp_private_key_file',
        rules: {
            host: { required: true },
            username: { required: true },
            port: { required: true, digits: true }
        },
        messages: {
            host: { required: 'Host is required' },
            username: { required: 'Username is required' },
            port: { required: 'Port is required', digits: 'Port must be a number' }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        }
    });

    $('#sftp_auth_type').on('change', sftp_toggle_auth);
    $('#sftp_save_btn').on('click', sftp_save);
    $('#sftp_test_btn').on('click', sftp_test);

    // load current settings
    ajs.ajax_form(site_url + 'sftp_setting/get', null, 'GET', null, '1', '1', sftp_load, sftp_load);

    ajs.apply_ind_roles('Settings');
}

$(function () {
    init_sftp_settings();
});
