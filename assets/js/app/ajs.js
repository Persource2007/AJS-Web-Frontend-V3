ajs = {
    web_app_version: '1.0',
    app_platform: 'web',
    submit_button_element: '',
    current_form_response: '',
    loader_text: '',
    refresh_try: 5,
    datatable_limit: 50,
    datatable_modal_limit: 50,
    submit_previous_val: '',
    ajax_url: site_url + 'ajax/',
    isOffcanvasOpen: false,
    isOffcanvasSmallOpen: false,
    refreshTokenPromise: null,
    mapId: "eff4872b5ffd6ef42cd0d825",
    mapKey: "AIzaSyDExGvqZSUHpVcjGUfKIded5Dgu-UMhyuA",
    mapRadius: 200,
    detailDataFunction: '',
    reload: false,
    callback_after_delete: null,
    curr_url: window.location.pathname.split('/').pop(),
    sidebar_links: document.querySelectorAll('nav ul li a'),
    preload_settings: function ()
    {
        var app_version = localStorage.getItem('app_version');
        if (app_version == null)
        {
            localStorage.setItem('app_version', ajs.web_app_version);
            localStorage.setItem('app_platform', ajs.app_platform);
        }

        ajs.sidebar_links.forEach(link => {
            linkPath = link.getAttribute('href');
            if (linkPath === ajs.curr_url) {
                link.classList.add('active');
            }
        });
    },
    datatable_error: function (xhr, table_id) {
        if (xhr.status === 401) {
            refreshToken().then(function () {
                $('#'+table_id).DataTable().ajax.reload(null, false);
            }).catch(function () {
                window.location.href = cdn_url + 'auth/login';
            });
        }
    },
    apply_roles: function ()
    {
        var user_roles = localStorage.getItem('user_roles');
        user_roles = JSON.parse(user_roles);

        $('.sidebar-navigation').find('a.nav-link').each(function (i, obj) {
            var module = $(this).data('module');
            var action = $(this).data('action');
            if (typeof module !== 'undefined' && typeof action !== 'undefined')
            {
                if (!ajs.check_role(module, action))
                {
                    $(this).parent().remove();
                }
            }
        });

        $('.sidebar-navigation').find('a.menu-link').each(function () {
            var menu_link = $(this).parent().find('.menu-dropdown .nav-item');
            if (menu_link.length == 0) {
                $(this).hide();
            }
        });
    },
    // Roles allowed to edit a task the engineer has already started. Mirrors
    // started_task_edit_role_codes() in users/user_helper.php.
    started_task_edit_role_codes: ['SA', 'SADM', 'MAN'],
    can_edit_started_task: function ()
    {
        // Guarded, unlike check_role(): this runs on a click, and a missing or
        // malformed user_roles key would otherwise throw.
        try
        {
            var user_roles = JSON.parse(localStorage.getItem('user_roles'));
            return ajs.started_task_edit_role_codes.indexOf(user_roles.role_code) !== -1;
        } catch (e)
        {
            return false;
        }
    },
    check_role: function (module, action)
    {
        var user_roles = localStorage.getItem('user_roles');
        user_roles = JSON.parse(user_roles);
        if (typeof user_roles.roles[module] !== 'undefined' && typeof user_roles.roles[module][action] !== 'undefined' && user_roles.roles[module][action] == '1')
        {
            return true;

        } else
        {
            return false;
        }
    },
    apply_ind_roles: function (module)
    {
        // console.log(module);
        if (!ajs.check_role(module, 'add') && module != 'Jobs')
        {
            $('.add-btn').remove();
        } else if (!ajs.check_role(module, 'add') && module == 'Jobs')
        {
            $('.new-job-btn').remove();
            $('.add-job-btn').parent().html('-');
        }
        if (!ajs.check_role(module, 'export'))
        {
            $('#export_button, .export-btn').remove();
        }
        if (!ajs.check_role(module, 'import'))
        {
            $('.bulk-upload-form, .import-btn').remove();
        }
        if (!ajs.check_role(module, 'view'))
        {            
            $('a.popup-form-button').remove();
            $('.view-btn').remove();
        }
        if (!ajs.check_role(module, 'edit'))
        {            
            $('a.popup-form-button:not(.download-btn)').remove();
            $('.edit-btn').remove();
        }
        if (!ajs.check_role(module, 'delete'))
        {
            $('a.list_delete').remove();
            $('a.delete_invoice').remove();
            $('a.remove-invoice-item-btn').remove();
        }
        if (!ajs.check_role(module, 'approve'))
        {
            $('.approve-btn,.reject-btn').remove();
        }
        ajs.reveal_permissioned_ui();
    },
    apply_permissions: function () {
        $('.check-permission').each(function () {
            var module = $(this).data('module');
            var action = $(this).data('action');
            if (typeof module !== 'undefined' && typeof action !== 'undefined')
            {
                if (!ajs.check_role(module, action))
                {
                    $(this).remove();
                }
            }
        });
        ajs.reveal_permissioned_ui();
    },
    /**
     * Hides sidebar entries the role cannot view. The links have carried data-module/data-action
     * since the menu was written, but nothing ever read them, so every role saw the whole menu.
     *
     * A group (System Admin, Reports, Bulk Processing...) is a nav-item wrapping a .menu-dropdown.
     * Once its children are gone the header would open an empty drawer, so an emptied group is
     * removed too - that is the "no module assigned, hide it from the menu" case.
     *
     * Links with no data-module (Dashboard, Logout) are left alone deliberately.
     */
    apply_sidebar_permissions: function () {
        var $menu = $('.app-menu');

        if (!$menu.length) {
            return;
        }

        $menu.find('a.nav-link[data-module][data-action]').each(function () {
            if (!ajs.check_role($(this).data('module'), $(this).data('action'))) {
                $(this).closest('li.nav-item').remove();
            }
        });

        // One link, several modules: kept if ANY of them is allowed. For a page that
        // hosts independently-gated sections (the interface dashboard's Havering and
        // Other Interface tabs), a single data-module would hide the link from someone
        // who legitimately holds the other grant. Read with attr() because jQuery's
        // data() camel-cases the name.
        $menu.find('a.nav-link[data-module-any][data-action]').each(function () {
            var action  = $(this).data('action');
            var allowed = String($(this).attr('data-module-any')).split('|').some(function (m) {
                return ajs.check_role(m.trim(), action);
            });
            if (!allowed) {
                $(this).closest('li.nav-item').remove();
            }
        });

        // Innermost groups first, so a group emptied by removing a nested group also goes.
        $($menu.find('li.nav-item').has('.menu-dropdown').get().reverse()).each(function () {
            if (!$(this).find('.menu-dropdown').find('li.nav-item').length) {
                $(this).remove();
            }
        });
    },
    /**
     * Drops the pre-paint gate set in commons/header.php, so the buttons this role is allowed to
     * keep become visible. Called at the end of the two permission passes; the fallbacks below
     * cover pages that gate nothing, which would otherwise never reveal at all.
     */
    reveal_permissioned_ui: function () {
        document.documentElement.classList.remove('perm-pending');
    },
    check_result(result_json)
    {
        if (typeof result_json.status !== 'undefined')
        {
            if (result_json.status.toString().toLowerCase() == 'true')
            {
                return true;
            }

        } else
        {
            ajs.showAlertBar('error', 'Error on server side, please try again', 1);
        }
    },
    refresh_token_set: function (result_json)
    {
        if (ajs.check_result(result_json))
        {            
            localStorage.setItem('access_token', result_json.token);
            ajs.refresh_try = 5;
            if (typeof result_json.new_refresh_token !== 'undefined')
            {                
                localStorage.setItem('refresh_token', result_json.new_refresh_token);
            }

        } else
        {
            ajs_form_handler.show_errors(result_json);
        }
    },
    is_logged_in: function (is_login_page)
    {
        var access_token = localStorage.getItem('access_token');
        var refresh_token = localStorage.getItem('refresh_token');
        if (typeof is_login_page !== 'undefined' && is_login_page == true)
        {
            if (access_token !== null)
            {
                ajs.redirect_last_page();
            } else if (refresh_token !== null)
            {
                ajs.refresh_token();
                ajs.redirect_last_page();
            }
        } else
        {
            if (access_token == null)
            {
                if (refresh_token !== null)
                {
                    ajs.refresh_token();
                } else
                {
                    ajs.do_logout();
                }
            }
        }
    },
    ajax_form: function (url, data, method, headers, show_loader, show_button_loader, callback, error_callback, callback_custom_variable_1)
    {

        ajax_method = 'POST';
        async_method = false;

        if (typeof method !== 'undefined')
        {
            ajax_method = method;
        } if (method == 'POST')
        {
            async_method = false;
        }
        $.ajax({
            url: url,
            data: data,
            method: ajax_method,
            dataType: "json",
            async: async_method,
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
                if (typeof show_button_loader !== "undefined" && show_button_loader == '1')
                {
                    ajs.show_button_loader();
                }
                if (typeof show_loader !== "undefined" && show_loader == '1')
                {
                    ajs.show_loader();
                }
            },
            complete: function () {
                setTimeout(function () {
                    $('.waves-ripple').remove();   // remove ripple
                }, 100);

                if (typeof show_button_loader !== "undefined" && show_button_loader == '1')
                {
                    ajs.hide_button_loader();
                }
                if (typeof show_loader !== "undefined" && show_loader == '1')
                {
                    ajs.hide_loader();
                }
            },
            success: function (ret) {
                ajs.current_form_response = ret;
                if (typeof callback === "function") {
                    if (typeof callback_custom_variable_1 !== "undefined")
                    {
                        callback(ret, callback_custom_variable_1);
                    } else
                    {
                        callback(ret);
                    }
                }
            },
            error: function (err) {

                var status_code = err.status;
                if (status_code == 401 && !url.includes('auth/login') && !url.includes('auth/verify_2fa_otp')) {
                    refreshToken().then(function () {
                        // Retry original request after token is refreshed
                        ajs.ajax_form(
                            url,
                            data,
                            method,
                            headers,
                            show_loader,
                            show_button_loader,
                            callback, // 🎯 Success callback reused
                            error_callback,
                            callback_custom_variable_1
                        );
                    }).catch(function () {
                        // Refresh token failed — redirect to login
                        window.location.href = cdn_url + 'auth/login';
                    });
            
                    return; // Stop further execution
                }
                if (status_code == 404) {
                    // window.location = cdn_url + '404';
                }
                if (status_code !== 401 && status_code !== 403 && status_code !== 404) {
                    var errMsg = '';
                    if (typeof err.responseJSON !== 'undefined') {
                        errMsg = err.responseJSON.message || err.responseJSON.error || '';
                    }
                    ajs.error_logger.send({
                        message:         'API Error ' + status_code + (errMsg ? ': ' + errMsg : ''),
                        stack_trace:     JSON.stringify(err.responseJSON || {}),
                        file_module:     'api',
                        api_url:         url,
                        request_payload: JSON.stringify(data),
                        severity:        status_code >= 500 ? 'critical' : 'error'
                    });
                }
                if (typeof err.responseJSON !== "undefined")
                {
                    var origdata = err.responseJSON;

                    var isEnabledEnc = err.getResponseHeader('x-encrypted') == 'true' ? true : false;  // if enable encryption server side

                    if (isEnabledEnc) {
                        err.responseJSON = ajs.decrypt(origdata);
                    }

                    ajs.current_form_response = err.responseJSON;
                    var message = '';
                    if (typeof err.responseJSON.message !== 'undefined')
                    {
                        message = err.responseJSON.message;
                    } else if (typeof err.responseJSON.error !== 'undefined')
                    {
                        message = err.responseJSON.error;
                    }
                    if (message.indexOf('token') != -1 || message.indexOf('Token') != -1)
                    {
                        ajs.refresh_token();
                    }
                }
                //console.log(err.responseJSON);
                if (typeof error_callback === "function") {
                    if (typeof err.responseJSON !== "undefined")
                    {
                        callback(err.responseJSON);
                    } else
                    {
                        error_callback();
                    }
                } else
                {
                    if (typeof callback === "function") {
                        if (typeof callback_custom_variable_1 !== "undefined")
                        {
                            callback(err.responseJSON, callback_custom_variable_1);
                        } else
                        {
                            callback(err.responseJSON);
                        }
                    }
                }
            }
        });
    },
    ajax_form_cache: function (url, data, method, headers, show_loader, show_button_loader, callback, error_callback, callback_custom_variable_1)
    {
        var query_str = $.param(data);
        var local_cache_index = 'local_cache_' + url + '_' + query_str;
        var data_present = localStorage.getItem(local_cache_index);
        //data_present = null;
        if (typeof data_present !== 'undefined' && data_present !== null)
        {
            var return_data = JSON.parse(data_present);
            if (typeof callback === "function") {
                if (typeof callback_custom_variable_1 !== "undefined")
                {

                    callback(return_data, callback_custom_variable_1);
                } else
                {
                    callback(return_data);
                }
            }

        } else
        {
            ajax_method = 'POST';
            if (typeof method !== 'undefined')
            {
                ajax_method = method;
            }
            $.ajax({
                url: url,
                data: data,
                method: ajax_method,
                dataType: 'json',
                async: false,
                beforeSend: function (xhr, settings) {
                    ajs.set_auth_header(xhr, settings);

                    if (typeof show_button_loader !== "undefined" && show_button_loader == '1')
                    {
                        ajs.show_button_loader();
                    }
                    if (typeof show_loader !== "undefined" && show_loader == '1')
                    {
                        ajs.show_loader();
                    }
                },
                complete: function () {
                    $('.waves-ripple').remove();

                    if (typeof show_button_loader !== "undefined" && show_button_loader == '1')
                    {
                        ajs.hide_button_loader();
                    }
                    if (typeof show_loader !== "undefined" && show_loader == '1')
                    {
                        ajs.hide_loader();
                    }
                },
                success: function (ret) {

                    localStorage.setItem(local_cache_index, JSON.stringify(ret));
                    if (typeof callback === "function") {
                        if (typeof callback_custom_variable_1 !== "undefined")
                        {

                            callback(ret, callback_custom_variable_1);
                        } else
                        {
                            callback(ret);
                        }
                    }
                },
                error: function (err) {
                    var status_code = err.status;
                    if (status_code == 401) {
                        refreshToken().then(function () {
                            // Retry original request after token is refreshed
                            ajs.ajax_form_cache(
                                url,
                                data,
                                method,
                                headers,
                                show_loader,
                                show_button_loader,
                                callback, // 🎯 Success callback reused
                                error_callback,
                                callback_custom_variable_1
                            );
                        }).catch(function () {
                            // Refresh token failed — redirect to login
                            window.location.href = cdn_url + 'auth/login';
                        });
                
                        return; // Stop further execution
                    }
                    if (typeof err.responseJSON !== "undefined")
                    {
                        var origdata = err.responseJSON;
                        var isEnabledEnc = err.getResponseHeader('x-encrypted') == 'true' ? true : false;  // if enable encryption server side

                        if (isEnabledEnc) {
                            err.responseJSON = ajs.decrypt(origdata);
                        }

                        var message = '';
                        if (typeof err.responseJSON.message !== 'undefined')
                        {
                            message = err.responseJSON.message;
                        } else if (typeof err.responseJSON.error !== 'undefined')
                        {
                            message = err.responseJSON.error;
                        }
                        if (message.indexOf('token') != -1 || message.indexOf('Token') != -1)
                        {
                            ajs.refresh_token();
                        }
                    }
                    //console.log(err.responseJSON);
                    if (typeof error_callback === "function") {
                        if (typeof err.responseJSON !== "undefined")
                        {
                            callback(err.responseJSON);
                        } else
                        {
                            error_callback();
                        }
                    }
                }
            });
        }
    },
    ajaxCustom: function (url, data, show_loader, callback, callback_custom_variable_1)
    {
        $.ajax({
            url: url,
            data: data,
            method: 'POST',
            async: false,
            beforeSend: function () {
                if (typeof show_loader !== "undefined" && show_loader == '1')
                {
                    //ajs.show_button_loader();
                    ajs.show_loader();
                }
            },
            complete: function () {

                if (typeof show_button_loader !== "undefined" && show_button_loader == '1')
                {
                    // ajs.hide_button_loader();
                }
                if (typeof show_loader !== "undefined" && show_loader == '1')
                {
                    ajs.hide_loader();
                }
            },
            success: function (ret) {
                if (typeof callback === "function") {
                    if (typeof callback_custom_variable_1 !== "undefined")
                    {
                        callback(ret, callback_custom_variable_1);
                    } else
                    {
                        callback(ret);
                    }
                }
            },
            error: function (err) {
                var status_code = err.status;
                if (status_code == 401) {
                    refreshToken().then(function () {
                        // Retry original request after token is refreshed
                        ajs.ajaxCustom(
                            url,
                            data,
                            show_loader,
                            callback, // 🎯 Success callback reused
                            callback_custom_variable_1
                        );
                    }).catch(function () {
                        // Refresh token failed — redirect to login
                        window.location.href = cdn_url + 'auth/login';
                    });
            
                    return; // Stop further execution
                }
            }
        });
    },
    ajaxCustomLarge: function (url, data, show_loader, callback, callback_custom_variable_1)
    {
        $.ajax({
            url: url,
            data: JSON.stringify(data),
            method: 'POST',
            async: false,
            processData: false,
            beforeSend: function () {
                if (typeof show_loader !== "undefined" && show_loader == '1')
                {
                    //ajs.show_button_loader();
                    ajs.show_loader();
                }
            },
            complete: function () {
                $('.waves-ripple').remove();

                if (typeof show_button_loader !== "undefined" && show_button_loader == '1')
                {
                    // ajs.hide_button_loader();
                }
                if (typeof show_loader !== "undefined" && show_loader == '1')
                {
                    ajs.hide_loader();
                }
            },
            success: function (ret) {
                if (typeof callback === "function") {
                    if (typeof callback_custom_variable_1 !== "undefined")
                    {
                        callback(ret, callback_custom_variable_1);
                    } else
                    {
                        callback(ret);
                    }
                }
            },
            error: function (err) {
                var status_code = err.status;
                if (status_code == 401) {
                    refreshToken().then(function () {
                        // Retry original request after token is refreshed
                        ajs.ajaxCustomLarge(
                            url,
                            data,
                            show_loader,
                            callback, // 🎯 Success callback reused
                            callback_custom_variable_1
                        );
                    }).catch(function () {
                        // Refresh token failed — redirect to login
                        window.location.href = cdn_url + 'auth/login';
                    });
            
                    return; // Stop further execution
                }
                //console.log(err);
                if (typeof err.responseText !== "undefined") {
                    if (typeof callback_custom_variable_1 !== "undefined")
                    {
                        callback(err.responseText, callback_custom_variable_1);
                    } else
                    {
                        callback(err.responseText);
                    }
                }

            }
        });
    },
    ajax_file_upload: function (url, formData, show_loader, show_button_loader, callback, error_callback, callback_custom_variable_1)
    {
        var original_formData = formData; // Store original formData for retry
        formData = ajs.encrypt_form_data(formData);
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            async: true,
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr);
                if (typeof show_button_loader !== "undefined" && show_button_loader == '1')
                {
                    ajs.show_button_loader();
                }
                if (typeof show_loader !== "undefined" && show_loader == '1')
                {
                    ajs.show_loader();
                }
            },
            complete: function () {
                $('.waves-ripple').remove();

                if (typeof show_button_loader !== "undefined" && show_button_loader == '1')
                {
                    ajs.hide_button_loader();
                }
                if (typeof show_loader !== "undefined" && show_loader == '1')
                {
                    ajs.hide_loader();
                }

            },
            success: function (ret) {
                if (typeof callback === "function") {
                    if (typeof callback_custom_variable_1 !== "undefined")
                    {
                        callback(ret, callback_custom_variable_1);
                    } else
                    {

                        callback(ret);
                    }
                }
            },
            error: function (err) {
                status_code = err.status;
                if (status_code == 401) {
                    refreshToken().then(function () {
                        // Retry original request after token is refreshed
                        ajs.ajax_file_upload(
                            url,
                            original_formData,
                            show_loader,
                            show_button_loader,
                            callback, // 🎯 Success callback reused
                            error_callback,
                            callback_custom_variable_1
                        );
                    }).catch(function () {
                        // Refresh token failed — redirect to login
                        window.location.href = cdn_url + 'auth/login';
                    });
            
                    return; // Stop further execution
                }
                if (typeof error_callback === "function") {
                    if (typeof err.responseJSON !== "undefined")
                    {
                        callback(err.responseJSON);
                    } else
                    {
                        error_callback();
                    }
                }
            },
            cache: false,
            contentType: false,
            processData: false
        });
    },
    set_current_url()
    {
        localStorage.setItem('user_current_page', window.location.href);
    },
    do_logout: function (force)
    {
        ajs.ajax_form(cdn_url + 'auth/logout', null, 'GET', null, '0', '0', function () {
            ajs.ajax_form(site_url + 'auth/logout', null, 'post', null, '0', '0');
        });
        localStorage.clear();
        ajs.set_current_url();
        ajs.preload_settings();
        if (typeof force !== 'undefined')
        {
            window.location = cdn_url + 'auth/login?loggedout=1';
        } else
        {
            window.location = cdn_url + 'auth/login?loggedout';
        }
    },
    redirect_last_page: function ()
    {
        var user_current_page = localStorage.getItem('user_current_page');
        if (user_current_page !== null)
        {
            window.location = user_current_page;

        } else
        {
            window.location = cdn_url + 'dashboard';
        }
    },
    refresh_token: function ()
    {

        if (ajs.refresh_try > 0)
        {
            ajs.refresh_try--;
            var refresh_token = localStorage.getItem('refresh_token');
            post_data = null;
            if (refresh_token !== null)
            {
                post_data = {'refresh_token': refresh_token};
            }

            ajs.ajax_form(site_url + 'auth/refresh_token', post_data, 'POST', null, '0', '0', ajs.refresh_token_set, ajs.refresh_token_set);
        } else
        {
            ajs.showAlertBar('error', 'Login session expired, you will be redirected to the login page in 3 seconds');
            setTimeout(function ()
            {
                ajs.do_logout(true);
            }, 3000);
        }
    },
    get_user_notifications: function (force) // currently not in use, use get_notifications instead, this is for getting notifications on page load with timestamp
    {        
        timestamp = ajs_form_handler.get_token("notification_timestamp");
        login_timestamp = ajs_form_handler.get_token("login_timestamp");
        var dt = {filters: {start_date: login_timestamp}, length: 10};
        var do_push = true;
        if (typeof force == 'undefined')
        {
            if (typeof timestamp !== 'undefined' && timestamp != '')
            {
                dt = {filters: {start_date: timestamp}, length: 10};
            }
        } else
        {
            ajs_form_handler.remove_token('user_notifications');
            dt = {length: 15};
            do_push = false;
        }

        ajs.ajax_form(site_url + 'api/notifications/get_all', dt, 'GET', null, '0', '0', ajs.show_notifications, ajs.show_notifications, do_push);
    },
    get_notifications: function ()
    {
        setTimeout(function () {
            ajs.ajax_form(site_url + 'api/notifications', null, 'GET', null, '0', '0', ajs.set_notifications, ajs.set_notifications);
        }, 20);
    },
    auto_notifications: function ()
    {
        user_notifications = ajs_form_handler.get_token('user_notifications');
        if (typeof user_notifications !== 'undefined' && user_notifications != null)
        {
            ajs.push_notifications(JSON.parse(user_notifications));
        }
    },
    read_all_notifications: function ()
    {
        ajs.get_notifications();
    },
    read_notification: function (id)
    {
        ajs.ajax_form(site_url + 'api/notifications/read/' + id, null, 'GET', null, '0', '0', ajs.get_notifications(), ajs.get_notifications());
    },
    count_unread_notification: function ()
    {
        ajs.ajax_form(site_url + 'api/notifications/unread_count', null, 'GET', null, '0', '0', ajs.set_unread_count, ajs.set_unread_count);
    },
    set_unread_count: function (result_json)
    {
        if (ajs_form_handler.check_result(result_json))
        {
            const count = result_json.count ?? result_json.unread_count ?? 0;
            if( count > 0) {
                $('.unread-noti-count').html(count);
            } else {
                $('.unread-noti-count').html('');
            }
            ajs_form_handler.store_token('unread_notifications', count);
        }
    },
    set_notifications: function (result_json)
    {
        if (ajs_form_handler.check_result(result_json))
        {
            ajs.set_unread_count(result_json);
            var notifications = result_json.data;
            $('#notification-container').html('');
            $.each(notifications, function (_, notification) {
                ajs.add_notification(notification);
            });
        }
    },
    set_auth_header: function (xhr, settings = null)
    {
        //  console.log(settings);
        //  console.log(settings?.type);

        let isEnabledEnc = localStorage.getItem('isEnabledEnc');
        if (isEnabledEnc == true && settings && settings?.type?.toLowerCase() == 'post') {
            settings.data = ajs.encrypt(settings.data);
        }

        var app_version = localStorage.getItem('app_version');
        var app_platform = localStorage.getItem('app_platform');
        xhr.setRequestHeader('App-Version', app_version);
        xhr.setRequestHeader('App-Platform', app_platform);
        var access_token = localStorage.getItem('access_token');
        if (access_token !== null)
        {
            xhr.setRequestHeader('Authorization', access_token);
            return xhr;
        } else
        {
            //ajs.showModalAlert('warning', 'Login access token expired, click button below to refresh the token', 'regenerate');
    }

    },
    push_notifications: function (notifications, do_push)
    {
        unread_notifications = 0;
        total_notifications = 0;
        unread = ajs_form_handler.get_token('unread_notifications');
        total = ajs_form_handler.get_token('total_notifications');
        user_notifications = ajs_form_handler.get_token('user_notifications');
        user_notifications = JSON.parse(user_notifications);
        if (typeof user_notifications == 'undefined' || user_notifications == null)
        {
            user_notifications = [];
        }
        if (typeof notifications !== 'undefined')
        {
            $.each(notifications, function (key, value) {
                total_notifications++;
                ajs.add_notification(value);
                if (typeof do_push !== 'undefined')
                {

                    //user_notifications.push(value);
                    user_notifications.unshift(value);
                }
            });
        }

        $.each(user_notifications, function (key, value) {
            if (value.viewed == '0')
            {
                ajs.add_toast_notification('success', value.message, value.link_action, value.id);
                unread_notifications++;
            }
        });
        localStorage.setItem('user_notifications', JSON.stringify(user_notifications));
        $('.all-noti-count').html('All');
        if(unread_notifications > 0) {
            $('.unread-noti-count').html(unread_notifications + '<span class="visually-hidden">unread messages</span>');
            $('.new-noti-count').html(unread_notifications + ' New');
        }
        ajs_form_handler.store_token('unread_notifications', unread_notifications);
        ajs_form_handler.store_token('total_notifications', total_notifications);
    },
    show_notifications: function (result_json, do_push)
    {
        if (ajs_form_handler.check_result(result_json))
        {
            ajs_form_handler.store_token("notification_timestamp", result_json.timestamp);
            ajs.push_notifications(result_json.message.data, true);
        }
    },
    add_toast_notification: function (type, message, link_action, id)
    {
        shown_notifications = ajs_form_handler.get_token('shown_notifications');
        shown_notifications = JSON.parse(shown_notifications);
        if (typeof shown_notifications == 'undefined' || shown_notifications === null)
        {
            shown_notifications = [];
        }
        if (shown_notifications instanceof Array) {

        } else {
            shown_notifications = [];
        }

        if (!shown_notifications.includes(id))
        {
            shown_notifications.push(id);
            var destination = '';
            if (typeof link_action !== 'undefined' || typeof link_action !== '')
            {
                destination = link_action;
            }
            Toastify({
                text: message,
                duration: 12000,
                destination: destination,
                gravity: "bottom", // `top` or `bottom`
                position: "right",
                close: true,
                onClick: function () {
                    ajs.read_nofification(id);
                }
            }).showToast();
        }

        ajs_form_handler.store_token('shown_notifications', JSON.stringify(shown_notifications));

    },
    add_notification: function (notification)
    {
        if ($('.empty-notification-elem').length)
        {
            $('.empty-notification-elem').remove();
        }
        let is_unread = notification.viewed == '0' ? 'active' : '';
        $('#notification-container').append(`<div class="text-reset notification-item d-block dropdown-item position-relative ${is_unread}">
                        <div class="d-flex">
                            <div class="avatar-xs me-3 flex-shrink-0">
                                <span class="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                                    <i class="bx bx-badge-check"></i>
                                </span>
                            </div>
                            <div class="flex-grow-1">
                                <a onclick="ajs.read_notification(` + notification.id + `)" target="` + (notification.link_action != null ? '_BLANK' : '') + `" href="` + (notification.link_action != null ? notification.link_action : 'javascript:;') + `" class="stretched-link">
                                    <h6 class="mt-0 mb-2 lh-base">` + notification.message + `</h6>
                                </a>
                                <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                    <span><i class="mdi mdi-clock-outline"></i> ` + ajs.getTimeDifference(notification.add_date, true) + `</span>
                                </p>
                            </div>
                        </div>
                    </div>`);

    },
    show_page_history: function ()
    {
        let histories = JSON.parse(localStorage.getItem('page_history')) || [];
        $('#history-list').html('');
        histories.forEach(history => {
            $('#history-list').append(`<div class="text-reset notification-item d-block dropdown-item position-relative">
                <div class="d-flex">
                    <div class="avatar-xs me-3 flex-shrink-0">
                        <span class="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                            <i class="bx bx-history"></i>
                        </span>
                    </div>
                    <div class="flex-grow-1">
                        <a href="${history.url}" class="stretched-link">
                            <h6 class="mt-0 mb-2 lh-base">${history.title}</h6>
                        </a>
                        <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> ` + ajs.getTimeDifference(history.timestamp) + `</span>
                        </p>
                    </div>
                </div>
            </div>`);
        });
    },
    show_loader: function (loader_id, timeout) {
        // if (typeof timeout == 'undefined') {
        //     timeout = 250;
        // }

        // ajs.loader_count = (ajs.loader_count || 0) + 1;
        // if (ajs.loader_timeout_id) {
        //     clearTimeout(ajs.loader_timeout_id);
        // }

        // if ($('#custom-full-page-loader').length === 0) {
        //     $('body').append('<div id="custom-full-page-loader" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 99999; background: rgba(0, 0, 0, 0.5); display: none; backdrop-filter: blur(2px);"><div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;"><div class="spinner-border text-light" style="width: 3rem; height: 3rem;" role="status"><span class="visually-hidden">Loading...</span></div><div id="custom-loader-text" class="text-light mt-2" style="font-size: 16px; font-weight: 500; display: none;"></div></div></div>');
        // }
        
        // if (ajs.loader_text !== '') {
        //     $('#custom-loader-text').html(ajs.loader_text).show();
        // } else {
        //     $('#custom-loader-text').hide();
        // }

        // if (ajs.loader_count === 1) {
        //     $('#custom-full-page-loader').fadeIn(timeout);
        // }
    },
    hide_loader: function (loader_id, timeout)
    {
        // if (typeof timeout == 'undefined') {
        //     timeout = 250;
        // }

        // ajs.loader_count = (ajs.loader_count || 0) - 1;

        // if (ajs.loader_count <= 0) {
        //     ajs.loader_count = 0; // prevent negative value
            
        //     if (ajs.loader_timeout_id) {
        //         clearTimeout(ajs.loader_timeout_id);
        //     }
            
        //     // Add a grace period delay so sequential requests don't cause flickering
        //     ajs.loader_timeout_id = setTimeout(function() {
        //         if (ajs.loader_count === 0) {
        //             $('#custom-full-page-loader').fadeOut(timeout);
        //         }
        //     }, 400); // 400ms grace period for consecutive ajax requests
        // }
    },
    generate_username: function (fname, lname, element)
    {
        post_data = {first_name: fname, last_name: lname};
        ajs.ajax_form(site_url + 'api/generate_username', post_data, 'POST', null, '0', '0', ajs.put_username, ajs.put_username, element);
    },
    put_username: function (result_json, element)
    {
        if (ajs_form_handler.check_result(result_json))
        {
            $('#' + element).val(result_json.username);
        }
    },
    get_device_id: function () {
        let machineId = localStorage.getItem('MachineId');
        if (!machineId) {
            machineId = new DeviceUUID().get();
            localStorage.setItem('MachineId', machineId);
        }
        return machineId;
    },
    trim_custom: function (str) {
        str = str.replace(/^\s+/, '');
        for (var i = str.length - 1; i >= 0; i--) {
            if (/\S/.test(str.charAt(i))) {
                str = str.substring(0, i + 1);
                break;
            }
        }
        return str;
    },
    show_button_loader: function () {
        if (typeof ajs.submit_button_element !== "undefined" && ajs.submit_button_element != '')
        {
            ajs.submit_previous_val = $(ajs.submit_button_element).html();
            $(ajs.submit_button_element).prop("disabled", true);
            $(ajs.submit_button_element).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...');
        }
    },
    hide_button_loader: function () {
        if (ajs.submit_button_element != '')
        {
            $(ajs.submit_button_element).html(ajs.submit_previous_val);
            $(ajs.submit_button_element).prop("disabled", false);
            ajs.submit_button_element = '';
        }
    },
    show_button_loader_media: function () {
        if (typeof ajs.submit_button_element !== "undefined" && ajs.submit_button_element != '')
        {
            ajs.submit_previous_val = $(ajs.submit_button_element).html();
            $(ajs.submit_button_element).prop("disabled", true);
            $(ajs.submit_button_element).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Media Uploading...');
        }
    },
    us_format: function (number, currency) {
        if (typeof currency !== 'undefined')
        {
            return new Intl.NumberFormat('en-US', {style: 'currency', currency: currency, maximumFractionDigits: 0, minimumFractionDigits: 0}).format(number);
        } else
        {
            return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0}).format(number);
        }
    },
    showNotification: function (message, type) {
        $('.notify-message-container').html(message);
        $('.notify-message-container').addClass('text-' + type);
        $('#notify-modal').modal('show');
    },
    formatCurrency: function (amount, currency)
    {
        var crn = 'USD';
        if (typeof currency !== 'undefined')
        {
            crn = currency;
        }
        return Intl.NumberFormat('en-US', {style: "currency", currency: crn, minimumFractionDigits: 0, maximumFractionDigits: 0, }).format(amount);
    },
    getCSRF: function ()
    {
        var intervalId = window.setInterval(function () {
            ekal.ajaxCustom(ekal.ajax_url + 'get_csrf', {}, ekal.putCSRF);
        }, 60000);
    },
    putCSRF: function (result)
    {
        // var result = JSON.stringify(result);
        csrf = result.csrfTokenHash;
        $(document).each(function () {
            $(this).find(':input[name="ekal_csrf"]').each(function () {
                $(this).val(csrf);
            });
        });
    },
    convert_time_local_to_utc: function (timeStr, format = "HH:mm:ss")
    {
        if(isEmpty(timeStr)) {
            return '';
        }
        var time = moment("1970-01-01 " + timeStr, "YYYY-MM-DD HH:mm:ss").utc().format(format);
        return time;
    },
    convert_datetime_local_to_utc: function (dateTime, format = "DD-MM-YYYY HH:mm")
    {
        if(isEmpty(dateTime)) {
            return '';
        }
        var utcTime = moment(dateTime).utc().format("YYYY-MM-DD HH:mm:ss");
        return utcTime;
    },
    convert_time_utc_to_local: function (utcTimeStr, format = "HH:mm:ss")
    {
        if(isEmpty(utcTimeStr)) {
            return '';
        }
        var localDateStr = moment.utc("1970-01-01 " + utcTimeStr, ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm"]).local().format(format);
        return localDateStr;
    },
    convert_utc_to_local: function (utcDateStr, format = "YYYY-MM-DD HH:mm:ss")
    {
        if(isEmpty(utcDateStr)) {
            return '';
        }
        var localDateStr = moment.utc(utcDateStr, "YYYY-MM-DD HH:mm:ss").local().format(format);
        return localDateStr;
    },
    set_localtime_to_utc: function (element, format = "DD-MM-YYYY HH:mm")
    {
        var localTime = $("#"+element).val(); // e.g., "12-06-2025 14:30"
        if(isEmpty(localTime)) {
            $("#"+element).val('');
            return;
        }
        var utcTime = moment(localTime, format).utc().format("YYYY-MM-DD HH:mm:ss");

        // Store this UTC time in  input
        $("#"+element).val(utcTime);
    },
    format_time: function (time)
    {
        if (!time || time == null || time == '00:00') {
            return '-';
        }

        return moment.utc(time, "HH:mm:ss").utc().format("HH:mm");
    },
    format_date: function (date)
    {
        if (!date || date == null || date == '0000-00-00' || date == '00/00/0000' || date == '0000-00-00 00:00:00' || date == '1970-01-01') {
            return '-';
        }
        date = date.substring(0, 19);
        var dateStr = date.toString();
        // If date contains time (has space), convert to ISO format and treat as UTC
        if (dateStr.indexOf(' ') !== -1) {
            var isoDate = dateStr.replace(' ', 'T') + 'Z';
            date = new Date(isoDate);
        } else {
            // Date only - parse as UTC date (midnight UTC)
            date = new Date(dateStr + 'T00:00:00Z');
        }
        let year = date.getUTCFullYear();
        let month = (1 + date.getUTCMonth()).toString().padStart(2, '0');
        let day = date.getUTCDate().toString().padStart(2, '0');
        return day + '/' + month + '/' + year;
    },
    format_datetime: function (date)
    {
        if (!date || date == null || date == '0000-00-00' || date == '0000-00-00 00:00:00' || date == '1970-01-01 00:00:00') {
            return '-';
        }
        // Everything is stored UTC (the API forces date_default_timezone_set("UTC")),
        // so render in the viewer's timezone rather than echoing the UTC clock back.
        return ajs.convert_utc_to_local(date.toString().substring(0, 19), 'DD/MM/YYYY hh:mm A');
    },
    validateEmail: function (email)
    {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test(email);
    },
    showModalAlert(type, message, action)
    {
        var modal_id = 'alert_modal';
        var modal_message = 'alert_modal_message';
        if (typeof type !== 'undefined')
        {
            if (type == 'warning')
            {
                modal_id = 'alert_modal';
                modal_message = 'alert_modal_message';
            }
        }
        if (typeof action !== 'undefined')
        {
            if (action == 'regenerate')
            {
                $('.continue-button').css('display', 'none');
                $('.regenerate-button-div').css('display', '');
            }
        }

        $('.' + modal_message).html(message);
        $('#' + modal_id).modal('show');
    },
    showAlertBar(type, message, dismissable = true, autoHide = true)
    {
        console.log(type, message);
        var alert_parent = $('.page-content').find('.container-fluid').first();

        if ($('#ajs-alert-container').length === 0) {
            alert_parent.prepend('<div id="ajs-alert-container" style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px;"></div>');
        }

        var alert_div = $("<div>").addClass("alert alert-label-icon label-arrow fade show").css({'position':'relative','margin-bottom':'0'});
        if (type == 'success')
        {
            alert_div.addClass('alert-success').append('<i class="ri-notification-off-line label-icon"></i><strong>Success</strong>');
        } else if (type == 'warning')
        {
            alert_div.addClass('alert-warning').append('<i class="ri-alert-line label-icon"></i><strong>Warning</strong>');
        } else if (type == 'error' || type == 'danger')
        {
            alert_div.addClass('alert-danger').append('<i class="ri-error-warning-line label-icon"></i><strong>Error</strong>');
        } else if (type == 'info' || type == 'message')
        {
            alert_div.addClass('alert-info').append('<i class="ri-airplay-line label-icon"></i><strong>Message</strong>');
        }

        alert_div.append(' - ' + message);
        alert_div.addClass('alert-dismissible');
        alert_div.append('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>');

        $('#ajs-alert-container').append(alert_div);

        if(type == 'success' || type == 'info' || type == 'message') {
            if (autoHide) {
                setTimeout(function () {
                    alert_div.fadeOut('slow', function () { $(this).remove(); });
                }, 7000);
            }
        }
    },
    error_logger: {
        _sent: {},

        _hash: function (str) {
            var h = 0, i, c;
            for (i = 0; i < str.length; i++) {
                c = str.charCodeAt(i);
                h = ((h << 5) - h) + c;
                h |= 0;
            }
            return h.toString();
        },

        send: function (payload) {
            var key = ajs.error_logger._hash((payload.message || '') + (payload.file_module || ''));
            if (ajs.error_logger._sent[key]) return;
            ajs.error_logger._sent[key] = true;

            payload.browser_info = navigator.userAgent.substring(0, 500);

            try {
                $.ajax({
                    url: site_url + 'log/frontend_error',
                    method: 'POST',
                    data: payload,
                    async: true,
                    global: false,
                    beforeSend: function (xhr) { ajs.set_auth_header(xhr); },
                    error: function () {}
                });
            } catch (e) {}
        },

        init: function () {
            window.onerror = function (message, source, lineno, colno, error) {
                ajs.error_logger.send({
                    message:     message,
                    stack_trace: error ? error.stack : '',
                    file_module: (source || '') + ':' + lineno + ':' + colno,
                    api_url:     window.location.href,
                    severity:    'error'
                });
                return false;
            };

            window.addEventListener('unhandledrejection', function (event) {
                var r = event.reason;
                ajs.error_logger.send({
                    message:     r instanceof Error ? r.message : String(r),
                    stack_trace: r instanceof Error ? r.stack : '',
                    file_module: 'unhandledrejection',
                    api_url:     window.location.href,
                    severity:    'error'
                });
            });
        }
    },
    formatModalFormHTML(data, modal_id, modal_message, heading)
    {
        $('.' + modal_message).html(data);
        var header = $('#' + modal_id).find('h5.modal-title');
        $('#' + modal_id).find('.page-title-box').attr('style', 'display:none !important');
        $('#' + modal_id).find('.app-menu').attr('style', 'display:none !important');
        $('#' + modal_id).find('#page-topbar').attr('style', 'display:none !important');
        $('#' + modal_id).find('.card-header:first').attr('style', 'display:none !important');
        $('#' + modal_id).find('div').removeClass('page-content');
        $('#' + modal_id).find('div').removeClass('main-content');
        if (typeof heading !== 'undefined')
        {
            $(header).html(heading);
        } else
        {
            $(header).closest('.modal-header').css('display', 'none');
        }
        $('#' + modal_id).modal('show');
    },
    showModalForm(modal_url, heading, after_load_func)
    {
        var modal_id = 'large_modal';
        var modal_message = 'large_modal_message';
        $.ajax({
            url: modal_url,
            type: 'GET',
            cache: true,
            success: function (data) {
                ajs.formatModalFormHTML(data, modal_id, modal_message, heading);
                if (typeof after_load_func !== 'undefined')
                {
                    if (typeof window[after_load_func] == "function")
                    {
                        window[after_load_func].call();
                    }
                }
            },
            error: function () {
                alert('Failed to fetch content.');
            }
        });
    },
    showModalSearch(modal_url, heading, after_load_func, element)
    {
        var modal_id = '';
        if(element == 'add_jobto_batch'){
            modal_id = '#invoice_jobs_large_modal';
        }else{
            modal_id = '#large_modal';
        }

        $.ajax({
            url: modal_url,
            type: 'GET',
            async: false,
            success: function (data) {
                if (typeof heading !== 'undefined') {
                    $(modal_id).find('.modal-title').html(heading);
                }
                $(modal_id).find('.modal-body').html(data);
                $(modal_id).modal('show');
                $("#select-btn").data('callback-fn', after_load_func);
                $("#select-btn").data('element', element);
                $("#search-element").val($('#' + element).val());
                $("#search-element").attr('is-multiple', $('#' + element).prop('multiple'));
                var def_filter = $('#' + element).attr('data-filters');
                if (def_filter) {
                    def_filter = JSON.parse(def_filter);
                    initialize_search_table(def_filter);
                } else {
                    initialize_search_table();
                }
            },
            error: function (xhr, status, error) {
                ajs.showAlertBar('error', error);
            }
        });
    },
    showModalView(modal_url, heading, element, value = null)
    {
        var modal_id = '#view_modal';
        $(modal_id).find('.modal-body').empty();
        var id = value ? value : $('#' + element).val();
        if (id) {
            $.ajax({
                url: modal_url + '/' + id + '?modal=true',
                type: 'GET',
                async: false,
                success: function (data) {
                    if (typeof heading !== 'undefined') {
                        $(modal_id).find('.modal-title').html(heading);
                    }
                    $(modal_id).find('.modal-body').html(data);
                    $(modal_id).modal('show');
                },
                error: function (xhr, status, error) {
                    ajs.showAlertBar('error', error);
                }
            });

        } else {
            var data = `<div class="row mt-3">
                        <div class="col-xxl-12">
                            <table class="table mb-0">
                                <tbody>
                                    <tr>
                                        <td><b>Please select an option</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>`;
            if (typeof heading !== 'undefined') {
                $(modal_id).find('.modal-title').html(heading);
            }
            $(modal_id).find('.modal-body').html(data);
            $(modal_id).modal('show');
    }
    },
    previewBulkUpload(data)
    {
        var modal_id = 'bulk_preview_modal';
        var iframe_id = 'bulk_preview_data';
        //$('#' + iframe_id).html(data);
        //$('#' + modal_id).modal('show');

        $('.bulk-preview-accordion').remove();
        $div = $('.main-content div.container-fluid:first').find('div.row:first');
        $("#accordionWithplusicon").clone().removeAttr('style').attr('id', 'bulk-preview-accordion').addClass('bulk-preview-accordion').insertAfter($div);
        $("#bulk-preview-accordion").find('button.accordion-button').html('<i class="ri-arrow-down-circle-line fs-16"></i>&nbsp;Preview Uploaded Data');
        $("#bulk-preview-accordion").find('div.accordion-body').html(data);
        if ($('#bulk-preview-accordion').find('.accordion-collapse').hasClass('show'))
        {

        } else
        {
            setTimeout(function () {
                $("#bulk-preview-accordion").find('button.accordion-button').click();
            }, 500);
        }

    },
    closeBulkUpload(data)
    {
        $("#bulk-preview-accordion").find('button.accordion-button').click();
        $('.bulk-preview-accordion').fadeOut(500, function () {
            $(this).remove();
        });
    },
    refreshDataTable()
    {
        if (dataTable) {
            dataTable.ajax.reload(null, false);
        }
    },
    showModalFormDialog(modal_url, heading, after_load_func)
    {
        var modal_id = 'form_pop_modal';
        var iframe_id = 'form_iframe';
        if (typeof heading !== 'undefined')
        {
            $('#' + modal_id).find('h5.modal-title').html(heading);
        }
        $('#' + iframe_id).attr('src', modal_url);
        if (typeof after_load_func !== 'undefined')
        {
            if (typeof window[after_load_func] == "function")
            {
                window[after_load_func].call();
            }
        }

        $('#' + modal_id).modal('show');
    },
    showOffCanvasFormRight(modal_url, heading, after_load_func, force_load)
    {
        var force_loading = false;
        if (typeof force_load !== 'undefined' && force_load == true)
        {
            force_loading = true;
        }
        if (!ajs.isOffcanvasOpen || force_loading)
        {
            var off_canvas = 'offcanvasRight';
            var iframe_id = 'form_iframe1';
            if (typeof heading !== 'undefined')
            {
                $('#' + off_canvas).find('h5.offcanvas-title').html(heading);
            }

            $.ajax({
                url: modal_url,
                type: 'GET',
                async: false,
                success: function (data) {
                    var content = $(data).find('.main-content').find('div.container-fluid:first').find('div.row').eq(1).html();
                    $(content).append('<script src="' + cdn_url + 'assets/js/app/ajs.js" rel="stylesheet" type="text/javascript" ></script>');
                    $('#' + off_canvas + ' .offcanvas-body').html(content);
                },
                error: function (xhr, status, error) {
                    ajs.showAlertBar('error', error);
                }
            });
            if (typeof after_load_func !== 'undefined')
            {
                if (typeof window[after_load_func] == "function")
                {
                    window[after_load_func].call();
                }
            }
            var myOffcanvas = document.getElementById(off_canvas)
            var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
            bsOffcanvas.show();
        } else
        {
            ajs.showModalFormDialog(modal_url, heading, after_load_func);
        }
    },
    showOffCanvasFormRightSmall(modal_url, heading, element, after_load_func, off_canvas_id, width, on_loaded)
    {
        if (!ajs.isOffcanvasSmallOpen)
        {
            var off_canvas = 'offcanvasRight2';

            if (typeof off_canvas_id !== 'undefined')
            {
                off_canvas = off_canvas_id;
            }

            if (typeof width !== 'undefined')
            {
                $('#' + off_canvas).css('width', width + 'px');
            }

            if (typeof heading !== 'undefined')
            {
                $('#' + off_canvas).find('h5.offcanvas-title').html(heading);
            }

            // Show the panel with a spinner straight away, then load the form in the
            // background. Keeps the click responsive on slow forms and clears any
            // content left over from the previously opened record.
            $('#' + off_canvas + ' .offcanvas-body').html('<h5 class="d-flex justify-content-center align-items-center h-75"><span class="spinner-grow flex-shrink-0" role="status"></span></h5>');

            var myOffcanvas = document.getElementById(off_canvas)
            var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
            bsOffcanvas.show();

            return $.ajax({
                url: modal_url,
                type: 'GET',
                success: function (data) {
                    var content = $(data).find('.main-content').find('div.container-fluid:first').find('div.row').eq(1).html();
                    $(content).append('<script src="' + cdn_url + 'assets/js/app/ajs.js" rel="stylesheet" type="text/javascript" ></script>');
                    // $(content).append('<script src="' + cdn_url + 'assets/js/datatables/systems/master-records.js" rel="stylesheet" type="text/javascript" ></script>');
                    $('#' + off_canvas + ' .offcanvas-body').html(content);
                    $('#' + off_canvas + ' .offcanvas-body').find('#element_id').val(element);

                    if (typeof after_load_func !== 'undefined' && after_load_func)
                    {
                        if (typeof after_load_func === "function")
                        {
                            after_load_func.call();
                        }
                        else if (typeof after_load_func === "string" && typeof window[after_load_func] == "function")
                        {
                            window[after_load_func].call();
                        }
                    }
                    if (typeof on_loaded === 'function')
                    {
                        on_loaded();
                    }
                },
                error: function (xhr, status, error) {
                    $('#' + off_canvas + ' .offcanvas-body').html('<div class="d-flex justify-content-center align-items-center h-75 text-muted">Unable to load the form. Please try again.</div>');
                    ajs.showAlertBar('error', error);
                }
            });
        } else
        {
            $('#offcanvasRight2').offcanvas('hide');
        }

    },
    setTheme: function (theme)
    {
        $('html').attr('data-bs-theme', theme);
    },
    setSidebar: function (theme)
    {
        $('html').attr('data-sidebar-size', theme);
    },
    ucWords: function (str)
    {
        return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
            return $1.toUpperCase();
        });
    },
    setSettingLocal: function (setting_type, setting_value)
    {
        var user_settings = localStorage.getItem('user_settings');
        if (user_settings !== null)
        {
            user_settings = JSON.parse(user_settings);
            user_settings[setting_type] = setting_value;
        } else
        {
            user_settings = {};
            user_settings[setting_type] = setting_value;
        }

        localStorage.setItem('user_settings', JSON.stringify(user_settings));
    },
    sync_api: function ()
    {
        ajs.ajax_form(site_url + 'api/sync', null, 'GET', null, '0', '0', ajs.store_sync_data, ajs.store_sync_data);
    },
    store_sync_data: function (result_json)
    {
        if (ajs_form_handler.check_result(result_json))
        {
            $.each(result_json.message, function (key, value) {
                ajs_form_handler.store_token(key, JSON.stringify(value));
            });

            ajs.apply_roles();
        }
    },
    checkLogin: function ()
    {
        var access_token = localStorage.getItem('access_token');
        if (access_token == null)
        {
            ajs.ajax_form(site_url + 'auth/logout', null, 'post', null, '0', '0');
        }
    },
    applyUserSettings: function ()
    {
        var user_settings = localStorage.getItem('user_settings');
        var user_profile = localStorage.getItem('user_profile');
//        if (user_settings !== null)
//        {
//            user_settings = JSON.parse(user_settings);
//            if (typeof user_settings['WEB_THEME'] !== 'undefined')
//            {
//                ajs.setTheme(user_settings['WEB_THEME'].toLowerCase());
//            }
//            if (typeof user_settings['SIDEBAR_FIX'] !== 'undefined')
//            {
//                ajs.setSidebar(user_settings['SIDEBAR_FIX'].toLowerCase());
//            }
//            if (typeof user_settings['FULLSCREEN'] !== 'undefined')
//            {
//                if (user_settings['FULLSCREEN'] == '1')
//                {
//                    $('body').addClass('fullscreen-enable');
//                }
//            }
//        }

        if (user_profile !== null)
        {
            user_profile = JSON.parse(user_profile);
            var nm = ajs.ucWords(user_profile['first_name'] + ' ' + user_profile['last_name']);
            var welcome_text = ajs.ucWords(user_profile['first_name']);
            var user_type = user_profile['user_type'];
            $('.user-name-text').html(nm);
            $('.welcome_text').html(welcome_text);
            $('.user-name-sub-text').html(user_type);
            if (typeof user_profile.profile_pic !== 'undefined' && user_profile.profile_pic !== null && user_profile.profile_pic !== '')
            {
                var image_path = ajs_form_handler.get_token('s3_url');
                $('.header-profile-user').attr('src', JSON.parse(image_path) + '/' + user_profile.profile_pic);
            }
        }
    },
    refresh_local_master_cache: function (master_type, element)
    {
        var filters = {master_code: master_type};

        var field = 'master_value';
        var url = site_url + 'master-record/get_all';
        var query_str = $.param(filters);
        var local_data_key = 'local_cache_' + url + '_' + query_str + '_select_data';

        if ($('#' + element).data('parent-element')) {
            var parent_element = $('#' + element).data('parent-element');
            var parent_id = $('#' + parent_element).val();
            filters = {...filters, ...{'master_values.parent_id': parent_id}};
        }

        $.ajax({
            url: url,
            dataType: 'json',
            cache: true,
            async: true,
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            data: {
                filters: filters, field: field
            },
            success: function (data) {
                new_data = refine_autocomplete_data_custom(data, field);
                localStorage.setItem(local_data_key, JSON.stringify(new_data));

                const parent = $('#' + element).closest('#offcanvasRight').length ? '#offcanvasRight' : 'body';

                $('#' + element).select2({
                    placeholder: 'Select',
                    dropdownParent: $(parent),
                    allowClear: true,
                    data: new_data
                });


            },
            error: function (xhr) {
                var status_code = xhr.status;
                if (status_code == 401) {
                    refreshToken().then(function () {
                        // Retry original request after token is refreshed
                        ajs.refresh_local_master_cache(
                            master_type,
                            element
                        );
                    }).catch(function () {
                        // Refresh token failed — redirect to login
                        window.location.href = cdn_url + 'auth/login';
                    });
            
                    return; // Stop further execution
                }
            }
        });
    },
    telephone_mask: function (input)
    {
//        var mask = '(9999) 999 9999';
//        var placeholder = mask.replace(/\d/g, '9');
//        input.inputmask(mask, {
//            placeholder: placeholder,
//            clearMaskOnLostFocus: false
//        });
    },
    getFilenameFromUrl: function (url) {
        // Use URL object to parse the URL
        var urlObj = new URL(url);
        // Get the pathname and split it by '/'
        var pathSegments = urlObj.pathname.split('/');
        // The last segment is the filename
        return pathSegments.pop() || pathSegments.pop(); // handle potential trailing slash
    },
    getThumbURL: function (url) {
        var filename = ajs.getFilenameFromUrl(url);
        return newUrl = url.replace(filename, 'small_' + filename);
    },
    mobile_mask: function (input)
    {
//        var mask = '07999 999 999';
//        var placeholder = mask.replace(/[07-9]/g, function (match) {
//            return match === '0' ? '0' : '9';
//        });
//        // Initialize Inputmask for UK mobile number
//        input.inputmask(mask, {
//            placeholder: placeholder,
//            clearMaskOnLostFocus: false
//        });
    },
    postal_mask: function (input)
    {
//        var mask = 'AA99 9AA';
//        var placeholder = mask.replace(/[A9]/g, function (match) {
//            return match === 'A' ? 'W' : '0';
//        });

//        input.inputmask('Regex', {
//            regex: "^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$",
//            placeholder: placeholder,
//            clearMaskOnLostFocus: false
//        });

//        Inputmask({
//            regex: "^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$",
//            placeholder: 'A00 0AA',
//            casing: "upper",
//            clearMaskOnLostFocus: true
//        }).mask(input);
    },
    mask_inputs: function ()
    {
//        if ($('.telephone-mask').length)
//        {
//            ajs.telephone_mask($('.telephone-mask'));
//        }
//        if ($('.mobile-mask').length)
//        {
//            ajs.mobile_mask($('.mobile-mask'));
//        }
//        if ($('.postalcode-mask').length)
//        {
//            ajs.postal_mask($('.postalcode-mask'));
//        }
    },
    refreshDetailData: function ()
    {
        if (typeof ajs.detailDataFunction == 'function')
        {
            ajs.detailDataFunction();
            ajs.detailDataFunction = '';
        }
    },
    getTimeDifference: function (notificationTime, isUtc = false)
    {
        if (!notificationTime) return '';

        // Handle UTC
        if (isUtc) {
            notificationTime += 'Z';
        }

        const notificationDate = new Date(notificationTime);
        const currentTime = new Date();

        // Invalid date check
        if (isNaN(notificationDate.getTime())) {
            return '';
        }

        let diff = Math.floor((currentTime - notificationDate) / 1000);

        // Future time
        if (diff < 0) {
            return 'just now';
        }

        const YEAR = 365 * 24 * 60 * 60;
        const MONTH = 30 * 24 * 60 * 60;
        const DAY = 24 * 60 * 60;
        const HOUR = 60 * 60;
        const MINUTE = 60;

        let value, unit;

        if (diff >= YEAR) {
            value = Math.floor(diff / YEAR);
            unit = 'year';
        } else if (diff >= MONTH) {
            value = Math.floor(diff / MONTH);
            unit = 'month';
        } else if (diff >= DAY) {
            value = Math.floor(diff / DAY);
            unit = 'day';
        } else if (diff >= HOUR) {
            value = Math.floor(diff / HOUR);
            unit = 'hour';
        } else if (diff >= MINUTE) {
            value = Math.floor(diff / MINUTE);
            unit = 'minute';
        } else {
            value = diff;
            unit = 'second';
        }

        return value + ' ' + unit + (value > 1 ? 's' : '') + ' ago';
    },
    hash_encode: function (id)
    {
        return hashids.encode(id);
    },
    hash_decode: function (encoded_id)
    {
        var decoded = hashids.decode(encoded_id)[0];
        if (typeof decoded !== 'undefined')
        {
            return decoded;
        }
        return false;
    },
    encrypt: function (data, onlyToken = false)
    {
        if (!data?.length) {
            return data;
        }

        try {
            var encrypted_data = null;
            $.ajax({
                url: cdn_url + 'data/encrypt',
                type: 'post',
                dataType: "json",
                data: data,
                async: false,
                global: false,
                success: function (response) {
                    if (onlyToken) {
                        encrypted_data = response;
                    } else {
                        encrypted_data = $.param({encrypted_data: response});
                    }
                }
            });

            return encrypted_data;
        } catch (error) {
            console.log(error);
            return data;
    }
    },
    decrypt: function (encrypted_data)
    {
        if (!encrypted_data?.length) {
            return encrypted_data;
        }

        try {
            var decrypted_data = null;
            $.ajax({
                url: cdn_url + 'data/decrypt',
                type: 'post',
                dataType: "json",
                data: {encrypted_data},
                async: false,
                global: false,
                success: function (data) {
                    decrypted_data = data;
                }
            });

            return decrypted_data;
        } catch (error) {
            return encrypted_data;
        }
    },
    encrypt_form_data: function (formData) {
        let isEnabledEnc = localStorage.getItem('isEnabledEnc');
        if (isEnabledEnc == true && typeof formData == 'object') {
            let data = {};
            let keysToDelete = [];

            // Encrypt each form field value
            formData.forEach((value, key) => {
                if (key != 'upload') {
                    data[key] = value;
                    keysToDelete.push(key);
                }
            });
            keysToDelete.forEach(key => {
                formData.delete(key); // Delete each key from FormData
            });
            data = $.param(data);
            var enc_data = ajs.encrypt(data, true);
            formData.append("encrypted_data", enc_data);
        }
        return formData;
    },
    convert_time: function (timestr)
    {
        if(isEmpty(timestr)) {
            return '';
        }
        var parts = timestr.split(':');
        var hour = parseInt(parts[0]);
        var minute = parts[1];

//        var period = hour >= 12 ? 'pm' : 'am';
//        hour = hour % 12;
//        hour = hour ? hour : 12;
//        hour = hour < 10 ? '0' + hour : hour;

        var formattedTime = hour + ':' + minute;
        return formattedTime;
    },
    is_base64: function (str)
    {
        if (str === '') {
            return false;
        }
        // Base64 validation regex
        const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

        return base64Regex.test(str);
    }

    ,

}

$(function () {
    ajs.error_logger.init();


    // Safety net for the pre-paint permission gate in commons/header.php. Pages that gate nothing
    // never call a permission pass, so nothing would otherwise reveal their buttons. The timer only
    // fires once the whole ready queue has drained, so a page that does call apply_ind_roles() has
    // already revealed by then and this is a no-op. header.php carries a window.load backstop too.
    setTimeout(ajs.reveal_permissioned_ui, 0);

    // The sidebar is on every page, so this runs globally rather than per-screen. Registered in
    // ajs.js (loaded in the head) it runs before any page script's own ready handler. Deliberately
    // after the reveal timer is scheduled: check_role() throws if user_roles is missing from
    // localStorage, and that must not take the reveal down with it.
    ajs.apply_sidebar_permissions();
});
