ajs_form_handler = {
    login_form: function (result_json)
    {
        ajs_form_handler.hide_errors();
        if (ajs_form_handler.check_result(result_json))
        {
            if (result_json.is_2fa_enabled == true) {
                console.log(result_json.is_2fa_enabled);
                window.location.href = cdn_url + 'auth/verify-2fa-otp/' + ajs.hash_encode(result_json.user_id);
            } else if (result_json.is_mfa_enabled == true) {
                $('.mfa-div').css('display', '');
                $('#mfa_code').attr('required', 'required');
                $('#re_auth_mfa').val('0');
                if (result_json.mfa_qr == false)
                {
                    // $('.mfa-qr').html('<a href="javascript:;" class="re-auth-mfa" alt="Scan with Microsoft Authenticator">Regenerate QR</a><br/><small>Regenerate QR ONLY if you have removed the AJS app from the Microsoft Authenticator app.</small>');

                } else
                {
                    $('.qr-label').html('To setup your authenticator app, use the app to scan the QR code. Alternatively <a data-copy="' + result_json.mfa_key + '" id="copyButton" style="font-weight: bold;background-color: #DDD;" class="btn btn-default btn-small">tap here</a> to copy the secret key and paste into the auth app.<span id="copyMessage" style="display: none; color: green; float:right">Copied!</span>');
                    $('.mfa-qr').html('<img width="120px" src="' + site_url + result_json.mfa_qr + '" alt="Scan with authenticator app">');
                }
                $('#mfa_code').val('');
            } else {
                ajs_form_handler.store_user_data(result_json);
            }

        } else
        {
            ajs_form_handler.show_errors(result_json);
        }
    },
    set_password_form: function (result_json)
    {
        ajs_form_handler.hide_errors();
        if (ajs_form_handler.check_result(result_json))
        {
            $('#set_password_form').fadeOut('slow');
            ajs.showAlertBar('success', 'Password set successfully, you will be redirected to the login page in 3 seconds');
            setTimeout(function ()
            {
                window.location = cdn_url + 'auth/login';
            }, 3000);

        } else
        {
            ajs_form_handler.show_errors(result_json);
            if (result_json?.is_mfa_enabled == true && result_json?.mfa_qr) {
                $('.mfa-qr').html('<img width="120px" src="' + site_url + result_json.mfa_qr + '" alt="Scan with Authenticator">');
                $('#mfa_code').val('');
            }
        }
    },
    forgot_password_form: function (result_json)
    {
        ajs_form_handler.hide_errors();
        if (ajs_form_handler.check_result(result_json))
        {
            $('#set_password_form').fadeOut('slow');
            ajs.showAlertBar('success', 'Password recovery email has been sent to your email Id, you will be redirected to the login page in 3 seconds');
            setTimeout(function ()
            {
                window.location = cdn_url + 'auth/login';
            }, 3000);

        } else
        {
            ajs_form_handler.show_errors(result_json);
        }
    },
    validate_user_key: function (key, new_user)
    {
        ajs.ajax_form(site_url + 'auth/validate_user_key', {key: key, new_user: new_user}, 'POST', null, '1', '1', function (result_json) {
            if (ajs_form_handler.check_result(result_json))
            {
                $('#username').val(result_json.user.username);
                $('#user_id').val(result_json.user.id);
                $('#user_email').val(result_json.user.email);
                if (result_json.user.is_mfa_enabled == true && result_json.user.mfa_qr) {
                    $('.mfa-qr').html('<img width="120px" src="' + site_url + result_json.user.mfa_qr + '" alt="Scan with Authenticator">');
                    $('.mfa-div').css('display', '');
                    $('#mfa_code').attr('required','required');
                }
            } else
            {
                ajs_form_handler.show_errors(result_json);
                ajs.showAlertBar('error', result_json.message + ', you will be redirected to the login page in 3 seconds');
                setTimeout(function ()
                {
                    window.location = cdn_url + 'auth/login';
                }, 3000);
            }
        });
    },
    validate_forgot_key: function (key)
    {
        ajs.ajax_form(site_url + 'auth/validate_forgot_key', {key: key}, 'POST', null, '1', '1', function (result_json) {
            if (ajs_form_handler.check_result(result_json))
            {

            } else
            {
                ajs_form_handler.show_errors(result_json);
                ajs.showAlertBar('error', result_json.message + ', you will be redirected to the login page in 3 seconds');
                setTimeout(function ()
                {
                    window.location = cdn_url + 'auth/login';
                }, 3000);
            }
        });
    },
    file_upload: function (response)
    {
        if (ajs_form_handler.check_result(response))
        {
            if (response.file_name != '')
            {
                ajs.loader_text = 'Parsing the file on server...';
                var file_path = response.upload_path + '' + response.file_name;
                var data = {file_path: file_path};
                var url = site_url + response.upload_type +'/upload';
                if (response.upload_type == 'clients')
                {
                    var url = site_url + 'client/upload';
                } else if (response.upload_type == 'sors')
                {
                    var client_id = $('input#client_id').val();
                    data = {file_path: file_path, client_id: client_id};
                    var url = site_url + 'sor/upload';
                } else if (response.upload_type == 'properties')
                {
                    var client_id = $('input#client_id').val();
                    data = {file_path: file_path, client_id: client_id};
                    var url = site_url + 'property/upload';
                } else if (response.upload_type == 'contract_masterplan')
                {
                    var contract_id = $('input#contract_id').val() || 0;
                    data = {file_path: file_path, contract_id: contract_id};
                    var url = site_url + 'contract/' + contract_id + '/upload_masterplan';
                } else if (response.upload_type == 'contract_sor_variation')
                {
                    var contract_id = $('input#contract_id').val() || 0;
                    data = {file_path: file_path, contract_id: contract_id};
                } else if (response.upload_type == 'assets')
                {
                    var client_id = $('input#client_id').val();
                    data = {file_path: file_path, client_id: client_id};
                    var url = site_url + 'asset/upload';
                } else if (response.upload_type == 'stocks')
                {
                    var url = site_url + 'stock/upload';
                } else if (response.upload_type == 'part-and-equipments')
                {
                    var url = site_url + 'part-and-equipment/upload';
                } else if (response.upload_type == 'jobs')
                {
                    var client_id = $('input#client_id').val();
                    data = {file_path: file_path};
                    var url = site_url + 'job/upload';
                } else if (response.upload_type == 'job_tasks')
                {
                    // Use API endpoint for job tasks upload (task-import)
                    data = {file_path: file_path};
                    var url = site_url + 'job/upload_job_task';
                } else if (response.upload_type == 'task_sors')
                {
                    // Use API endpoint for job tasks upload (task-sor-import)
                    data = {file_path: file_path};
                    var url = site_url + 'job/upload_task_sor';
                }
                ajs.ajax_form(url, data, 'POST', null, '1', '0', ajs_form_handler.file_parse_api, ajs_form_handler.file_parse_api);
            } else
            {
                ajs.showAlertBar('error', 'Problem with fileupload, please try again!', '1');
            }
        } else if (response.status == '0')
        {
            // Friendly guidance when backend complains about template mismatch
            if (typeof response.message !== 'undefined' && (response.message.indexOf('Input file does not match') !== -1 || response.message.indexOf('missing fields') !== -1 || response.message.indexOf('refer ajs-jobs.xlsx') !== -1)) {
                var templateLink = site_url + 'resources/templates/ajs-job-tasks.xlsx';
                var friendlyMsg = `Upload expected template: <a href="${templateLink}" target="_blank">ajs-job-tasks.xlsx</a>. Please use that template or map columns.`;
                ajs.showAlertBar('error', friendlyMsg, '1');
            } else {
                ajs.showAlertBar('error', response.message, '1');
            }
        }
    },
    file_parse_api: function (result_json)
    {
        if (typeof result_json.parsed_data !== 'undefined')
        {
            ajs.loader_text = 'Loading Preview...';
            var data = result_json;
            var url = cdn_url + 'bulk-preview';

            ajs.ajaxCustomLarge(url, data, '1', ajs.previewBulkUpload);
        } else
        {
            ajs.showAlertBar('error', result_json.message, true, false);
        }

    },
    image_upload: function (result_json, name_el)
    {
        ajs.hide_button_loader();

        if (ajs_form_handler.check_result(result_json))
        {

            if (result_json.file_name != '')
            {
                $('#' + name_el).val(result_json.upload_path + result_json.file_name);
            } else
            {
                ajs.showAlertBar('error', 'Problem with fileupload, please try again!', '1');
                return false;
            }
        } else if (result_json.status == '0')
        {
            ajs.showAlertBar('error', result_json.message, '1');
            return false;
        }
    },
    refresh_token_set: function (result_json)
    {
        ajs_form_handler.hide_errors();
        if (ajs_form_handler.check_result(result_json))
        {
            ajs_form_handler.store_token("access_token", result_json.token);
            ajs.refresh_try = 3;
            if (typeof result_json.new_refresh_token !== 'undefined')
            {                
                ajs_form_handler.store_token("refresh_token", result_json.new_refresh_token);
            }
            // ajs_form_handler.get_user_data();

        } else
        {
            ajs_form_handler.show_errors(result_json);
        }
    },
    store_token: function (token_type, token_value)
    {
        localStorage.setItem(token_type, token_value);
    },
    check_token: function (token_type)
    {
        if (localStorage.getItem(token_type) === null) {
            return false;
        }
        return true;
    },
    get_token: function (token_type)
    {
        return localStorage.getItem(token_type);
    },
    remove_token: function (token_type)
    {
        localStorage.removeItem(token_type);
    },
    get_user_data: function ()
    {
        ajs.ajax_form(site_url + 'api/user_info', null, 'GET', null, '1', '1', ajs_form_handler.store_user_data);
    },
    store_user_data: function (resultJson)
    {
        delete resultJson.user['password'];
        ajs_form_handler.store_token("access_token", resultJson.token);
        ajs_form_handler.store_token("refresh_token", resultJson.refresh_token);
        localStorage.setItem('user_profile', JSON.stringify(resultJson.user));
        localStorage.setItem('user_settings', JSON.stringify(resultJson.settings));
        localStorage.setItem('user_roles', JSON.stringify(resultJson.access));
        localStorage.setItem('login_timestamp', resultJson.timestamp);
        localStorage.setItem('notification_timestamp', resultJson.timestamp);
        localStorage.setItem('s3_url', resultJson.s3_url);
        ajs.push_notifications(resultJson.notifications, true);
        ajs.ajaxCustom(cdn_url + 'set_user_session', resultJson, '0', ajs_form_handler.redirect_after_login);

    },
    redirect_after_login: function () {
        ajs.sync_api();
        redirect_url = ajs_form_handler.get_token("last_visited_url");
        if (redirect_url !== 'undefined' && redirect_url !== '' && redirect_url !== null)
        {
            window.location = redirect_url;
        } else
        {
            window.location = cdn_url + 'dashboard';
        }
    },
    show_errors: function (errors)
    {
        if (!($('.form-server-errors').length))
        {
            if ($('.card-body').length)
            {
                $('.card-body:first').prepend("<div class='p-4 form-server-errors'></div>");
            } else
            {
                $('.page-content:first').prepend("<div class='p-4 form-server-errors'></div>");
            }
        }
        $('.form-server-errors').fadeIn(250);
        if (typeof errors.error !== 'undefined')
        {
            $('.form-server-errors').html(errors.error);
        }
        if (typeof errors.message !== 'undefined')
        {
            $('.form-server-errors').html(errors.message);
        }

        $('html, body').animate({
            scrollTop: $(".form-server-errors").offset().top - 200
        }, 200);
    },
    show_errors_offcanvas: function (errors)
    {
        $('.offcanvas-body').find('.offcanvas-form-errors').remove();
        $('.offcanvas-body').prepend("<div class='p-4 offcanvas-form-errors'></div>");
        if (typeof errors.error !== 'undefined')
        {
            $('.offcanvas-body').find('.offcanvas-form-errors').prepend(errors.error);
        }
        if (typeof errors.message !== 'undefined')
        {
            $('.offcanvas-body').find('.offcanvas-form-errors').prepend(errors.message);
        }
    },
    // Blocking error the user must acknowledge. Used where an inline message would
    // be missed — an offcanvas panel covers the page-top alert bar, so a rejected
    // save there can look like nothing happened at all.
    show_blocking_error: function (message, title)
    {
        Swal.fire({
            title: title || 'Error',
            text: message,
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: { confirmButton: 'btn btn-primary' },
            buttonsStyling: false,
        });
    },
    hide_errors: function (errors)
    {
        $('.form-server-errors').fadeOut(0);
    },
    check_result: function (result_json)
    {
        // Check if result_json is undefined or null
        if (!result_json || typeof result_json !== 'object') {
            ajs.showAlertBar('error', 'Server error (404 or other issue), please try again', 1);
            return false;
        }
        
        if (typeof result_json.status !== 'undefined')
        {
            if (result_json.status.toString().toLowerCase() == 'true')
            {
                return true;
            } else {
                return false;
            }
        } else
        {
            ajs.showAlertBar('error', 'Error on server side, please try again', 1);
            return false;
        }
    },
    bulk_upload_response: function (result_json)
    {
        if (ajs_form_handler.check_result(result_json)) {
            ajs_form_handler.api_response(result_json);
            var added_in_queue = result_json?.added_in_queue || false;
            if (added_in_queue == true && result_json.batch_id) {
                startBulkImportProgress(result_json.batch_id);
            } else {
                ajs.refreshDataTable();
            }
        } else {
            ajs_form_handler.api_response(result_json);
        }
    },
    api_response: function (result_json, show_bar)
    {
        if (ajs_form_handler.check_result(result_json))
        {
            Swal.fire(result_json.message, "", "success").then((result) => {if (ajs.reload) {location.reload();}});;
            if (typeof show_bar !== 'undefined')
            {
                ajs.showAlertBar('success', result_json.message, 1);
            }
        } else
        {
            if (typeof result_json.message !== 'undefined')
            {
                Swal.fire(result_json.message, "", "error").then((result) => {if (ajs.reload) {location.reload();}});;
                if (typeof show_bar !== 'undefined')
                {
                    ajs.showAlertBar('error', result_json.message, 1);
                }
            }
            if (typeof result_json.error !== 'undefined')
            {
                Swal.fire(result_json.error, "", "error").then((result) => {if (ajs.reload) {location.reload();}});;
                if (typeof show_bar !== 'undefined')
                {
                    ajs.showAlertBar('error', result_json.error, 1);
                }
            }
        }
        // if (ajs.reload) {
        //     setTimeout(function () {
        //         location.reload();
        //     }, 800);
        // }
    },
    process_bulk_upload: function (batch_id, selected_rows, selected_rows_update, data_type)
    {
        if (typeof batch_id !== 'undefined')
        {
            var data = {selected_rows: selected_rows, selected_rows_update: selected_rows_update};
            if (data_type == 'assets') {
                ajs.ajax_form(site_url + 'asset/process_upload/' + batch_id, data, 'POST', null, '1', '0', ajs_form_handler.api_response, ajs_form_handler.api_response);
            } else if (data_type == 'sors') {
                ajs.ajax_form(site_url + 'sor/process_upload/' + batch_id, data, 'POST', null, '1', '0', ajs_form_handler.bulk_upload_response, ajs_form_handler.api_response);
            } else if (data_type == 'update-property-uprn') {
                ajs.ajax_form(site_url + 'property-uprn/process_upload/' + batch_id, data, 'POST', null, '1', '0', ajs_form_handler.api_response, ajs_form_handler.api_response);
            } else if (data_type == 'stocks') {
                ajs.ajax_form(site_url + 'stock/process_upload/' + batch_id, data, 'POST', null, '1', '0', ajs_form_handler.api_response, ajs_form_handler.api_response);
            } else if (data_type == 'part-and-equipments') {
                ajs.ajax_form(site_url + 'part-and-equipment/process_upload/' + batch_id, data, 'POST', null, '1', '0', ajs_form_handler.api_response, ajs_form_handler.api_response);
            } else if (data_type == 'contract_masterplan') {
                var contract_id = $('input#contract_id').val() || 0;
                if(contract_id > 0) {
                    ajs.refreshDataTable = load_data_table;
                }
                ajs.ajax_form(site_url + 'contract/process_upload/' + batch_id + '/' + contract_id, data, 'POST', null, '1', '0', ajs_form_handler.bulk_upload_response, ajs_form_handler.api_response);
                //load_data_table();
            } else if (data_type == 'contract_sor_variation') {
                ajs.ajax_form(site_url + 'contract_sor_variation/process_upload/' + batch_id , data, 'POST', null, '1', '0', ajs_form_handler.api_response, ajs_form_handler.api_response);
            } else if (data_type == 'survey_external') {
                ajs.ajax_form(site_url + 'survey/process_external_upload/' + batch_id, data, 'POST', null, '1', '0', ajs_form_handler.api_response, ajs_form_handler.api_response);
            } else if (data_type == 'jobs') {
                ajs.ajax_form(site_url + 'job/process_upload_jobs/' + batch_id, data, 'POST', null, '1', '0', ajs_form_handler.api_response, ajs_form_handler.api_response);
            } else if (data_type == 'job_tasks') {
                ajs.ajax_form(site_url + 'job/process_upload_tasks/' + batch_id, data, 'POST', null, '1', '0', ajs_form_handler.api_response, ajs_form_handler.api_response);    
            } else if (data_type == 'task_sors') {
                ajs.ajax_form(site_url + 'job/process_upload_task_sors/' + batch_id, data, 'POST', null, '1', '0', ajs_form_handler.api_response, ajs_form_handler.api_response);
            } else if (data_type == 'job_bulk_update') {
                ajs.ajax_form(site_url + 'job/bulk/process_update/' + batch_id, data, 'POST', null, '1', '0', ajs_form_handler.api_response, ajs_form_handler.api_response);
            } else {
                ajs.ajax_form(site_url + 'api/process_upload/' + batch_id + '/' + data_type, data, 'POST', null, '1', '0', ajs_form_handler.bulk_upload_response, ajs_form_handler.api_response);
            }
            var used_queue = ['sors', 'properties', 'contract_masterplan', 'survey_external'];
            if (!used_queue.includes(data_type)) {
                ajs.refreshDataTable();
            }

        } else {
            ajs.showAlertBar('Error', 'Missing batch Id', true);
        }
    },
    process_bulk_print: function (ids)
    {
        if (typeof ids !== 'undefined')
        {
            var data = {ids: ids};
            ajs.ajax_form(site_url + 'job-tasks/batch_print', data, 'POST', null, '1', '0', ajs_form_handler.api_response, ajs_form_handler.api_response);

        } else {
            ajs.showAlertBar('Error', 'No tasks selected', true);
        }
    },
    form_submit_response: function (result_json)
    {
        ajs_form_handler.hide_errors();
        if (ajs_form_handler.check_result(result_json))
        {
            ajs.showAlertBar('success', result_json.message, true);
            if (ajs.reload) {
                setTimeout(function () {
                    location.reload();
                }, 500);
            }
        } else
        {
            ajs_form_handler.show_errors(result_json);
        }
    },
    offcanvas_form: function (result_json)
    {
        ajs_form_handler.hide_errors();
        if (ajs_form_handler.check_result(result_json))
        {
            $('.offcanvas-body').find('.offcanvas-form-errors').remove();
            if (typeof result_json.keep_open !== 'undefined' && result_json.keep_open == '1')
            {

            } else
            {
                $('#offcanvasRight').offcanvas('hide');
            }
            ajs.refreshDataTable();
            ajs.refreshDetailData();
            ajs.showAlertBar('success', result_json.message, true);
        } else
        {
            ajs_form_handler.show_errors_offcanvas(result_json);
        }
    },
    smalloffcanvas_form: function (result_json)
    {
        ajs_form_handler.hide_errors();
        if (ajs_form_handler.check_result(result_json))
        {
            var master_type = result_json.master_type;
            var element_id = result_json.element_id;
            ajs.refresh_local_master_cache(master_type, element_id);
            $('#offcanvasRight2.offcanvas-body').find('.offcanvas-form-errors').remove();
            $('#offcanvasRight2').offcanvas('hide');
            ajs.showAlertBar('success', result_json.message, true);
        }
    },
    offcanvas_form3: function (result_json)
    {
        ajs_form_handler.hide_errors();
        if (ajs_form_handler.check_result(result_json))
        {
            var master_type = result_json.master_type;
            var element_id = result_json.element_id;
            ajs.refresh_local_master_cache(master_type, element_id);
            $('#offcanvasRight3.offcanvas-body').find('.offcanvas-form-errors').remove();
            $('#offcanvasRight3').offcanvas('hide');
            $('#offcanvasRight2').offcanvas('hide');
            // The task form, Reassign Task and Modify SORs all close through here, and each
            // one used to leave a stale row behind on the Tasks list. Same pair offcanvas_form
            // has always run; both no-op on a page with no grid and no detail card, so the job
            // details page - which refreshes through refresh_job_tasks() - is unaffected.
            ajs.refreshDataTable();
            ajs.refreshDetailData();
            ajs.showAlertBar('success', result_json.message, true);
        } else if (result_json && typeof result_json.message === 'string'
                   && result_json.message.indexOf('This job is invoiced') !== -1)
        {
            // The invoiced-total lock rejects the save from the task form and the SOR
            // grid, both of which are offcanvas panels — an inline error there is easy
            // to miss. Show it as a modal instead, and leave the panel open so the
            // amounts can be corrected.
            ajs_form_handler.show_blocking_error(result_json.message);
        } else
        {
            ajs_form_handler.show_errors_offcanvas(result_json);
        }
    },
}

ajs_form_handler.hide_errors();

$(document).on('click', '#copyButton', function () {
    var textToCopy = $(this).data("copy");

    var tempInput = $("<input>");
    $("body").append(tempInput);
    tempInput.val(textToCopy).select();
    document.execCommand("copy");
    tempInput.remove();

    $("#copyMessage").fadeIn().delay(1000).fadeOut();
});


