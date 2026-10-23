

function load_data(result_json) {
    console.log('Loading letter print settings...');
    console.log(result_json);
    // result_json may either be an object with `data` or be the array directly
    var rows = (result_json && (result_json.data || result_json)) || [];
    if (!rows || !rows.length) {
        console.warn('No letter print settings returned');
        return;
    }

    // Map returned rows by var_name for easy lookup
    var map = {};
    for (var i = 0; i < rows.length; i++) {
        var r = rows[i];
        if (r && r.var_name) {
            map[r.var_name] = r.var_value;
        }
    }

    // Populate inputs (be tolerant if keys missing)
    if (map.email_address !== undefined) {
        $('#lp_email_address').val(map.email_address);
    }
    if (map.password !== undefined) {
        $('#lp_password').val(map.password);
    }
    if (map.account_login !== undefined) {
        $('#lp_account_login').val(map.account_login);
    }
    if (map.instance !== undefined) {
        $('#lp_instance').val(map.instance);
    }
    if (map.base_url !== undefined) {
        $('#lp_base_url').val(map.base_url);
    }
    if (map.paper !== undefined) {
        $('#lp_paper').val(map.paper);
    }
    if (map.envelope !== undefined) {
        $('#lp_envelope').val(map.envelope);
    }
    if (map.packmode !== undefined) {
        $('#lp_packmode').val(map.packmode);
    }
    if (map.document_format !== undefined) {
        $('#lp_document_format').val(map.document_format);
    }
}

function load_configuration(result_json) {
    // console.log('Loading letter print configuration...');
    console.log(result_json);
    // configuration may live in `configuration` or `data` or be returned directly
    var cfg = result_json.configuration || result_json.data || result_json;
    if (!cfg) {
        // console.warn('No configuration returned');
        return;
    }

    // Helper to populate a select with flexible item formats
    function populateSelect($sel, items, placeholder) {
        $sel.empty();
        $sel.append($('<option>').val('').text(placeholder || '-- Select --'));
        
        if (!items || !items.length) return;
        for (var i = 0; i < items.length; i++) {
            var it = items[i];
            // console.log(it);
            var val = '';
            var text = '';
             if (it.name !== undefined) {
                val = it.name; text = it.name;
            } else if (it.extension !== undefined) {
                val = it.extension; text = it.description;
            } else {
                // fallback: try first property as value and second as text
                var keys = Object.keys(it);
                if (keys.length === 1) { val = it[keys[0]]; text = it[keys[0]]; }
                else if (keys.length >= 2) { val = it[keys[0]]; text = it[keys[1]]; }
            }
            $sel.append($('<option>').val(val).text(text));
        }
    }

    // Populate known selects if present in configuration
    populateSelect($('#lp_paper'), cfg.papers, '-- Select Paper --');
    populateSelect($('#lp_envelope'), cfg.envelopes, '-- Select Envelope --');
    populateSelect($('#lp_packmode'), cfg.packmodes, '-- Select Pack Mode --');
    populateSelect($('#lp_document_format'), cfg.docFormats, '-- Select Document Format --');
}

function init_letter_print_settings() {

    // init validation
    $('#letter_print_setting_form').validate({
        onkeyup: false,
        rules: {
            email_address: { required: true, email: true },
            password: { required: true },
            account_login: { required: true },
            instance: { required: true },
            base_url: { required: true, url: true }
        },
        messages: {
            email_address: { required: 'Email is required', email: 'Enter a valid email' },
            password: { required: 'Password is required' },
            account_login: { required: 'Account login is required' },
            instance: { required: 'Instance is required' },
            base_url: { required: 'Base URL is required', url: 'Enter a valid URL' }
        },
        errorPlacement: function (error, element) {
            if (element.hasClass('select2') && element.next('.select2-container').length) {
                error.insertAfter(element.next('.select2-container'));
            } else if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            var action = $(form).attr('action') || (site_url + 'letter_print/save');
            var method = $(form).attr('method') || 'POST';
            var post_data = $(form).serialize();

            // If there is no backend save endpoint yet, this will likely 404 —
            // keep behavior consistent with other forms by using ajs.ajax_form.
            ajs.ajax_form(action, post_data, method, null, '1', '1', function (res) {
                if (res.status == true) {
                     Swal.fire({
                        title: `Success!!`,
                        icon: "success",
                        text: res.message
                    });
                    location.reload(); 
                } else {
                     Swal.fire({
                        title: `Error!!`,
                        icon: "error",
                        text: res.message
                    });
                    return false;
                }
            }, function (err) {
                ajs_form_handler.show_errors_offcanvas && ajs_form_handler.show_errors_offcanvas(err);
            });

            return false;
        }
    });

    // Save button triggers form submit (validate -> submitHandler)
    $('#lp_save_btn').on('click', function () {
        $('#letter_print_setting_form').submit();
    });

    // finally fetch current settings and configuration
    ajs.ajax_form(site_url + 'letter_print/configuration', null, 'GET', null, '1', '1', load_configuration, load_configuration);

    ajs.ajax_form(site_url + 'letter_print/get_all/', null, 'GET', null, '1', '1', load_data, load_data);
   
    ajs.apply_ind_roles('Settings');
}

$(function () {
    init_letter_print_settings();
});

