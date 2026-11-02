function is_enable_encryption(origdata) {
    try {
        return ajs.is_base64(JSON.parse(origdata)) ? true : false;
    } catch (error) {
        return false;
    }
}
function refreshToken() {
    if (ajs.refreshTokenPromise) return ajs.refreshTokenPromise;

    ajs.refreshTokenPromise = $.ajax({
        url: site_url + 'auth/refresh_token',
        method: "POST",
        data: { refresh_token: localStorage.getItem('refresh_token') },
        beforeSend: (xhr, settings) => ajs.set_auth_header(xhr, settings)
    }).then((res) => {
        ajs.refresh_token_set(res);
    }).fail(() => {
        localStorage.clear();
        window.location.href = cdn_url + 'auth/login';
    }).always(() => {
        ajs.refreshTokenPromise = null;
    });

    return ajs.refreshTokenPromise;
}

function ajaxWithRefresh(options) {
    return new Promise((resolve, reject) => {
        $.ajax({
            ...options,
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
                if (typeof options.beforeSend === "function") {
                    options.beforeSend(xhr, settings);
                }
            },
            success: resolve,
            error: function (xhr) {
                if (xhr.status === 401) {
                    // Try refreshing token
                    refreshToken().then(() => {
                        // Retry original request
                        $.ajax({
                            ...options,
                            beforeSend: function (xhr, settings) {
                                ajs.set_auth_header(xhr, settings);
                                if (typeof options.beforeSend === "function") {
                                    options.beforeSend(xhr, settings);
                                }
                            },
                            success: resolve,
                            error: reject
                        });
                    }).catch(() => {
                        reject(xhr);
                    });
                } else {
                    reject(xhr);
                }
            }
        });
    });
}

$(document).on('click', '.logout-link', function (e) {
    e.preventDefault();
    ajs.do_logout();
});
$(document).on('click', '.regenerate-button', function (e) {
    e.preventDefault();
    var refresh_token = localStorage.getItem('refresh_token');
    post_data = null;
    if (refresh_token !== null)
    {
        post_data = {'refresh_token': refresh_token};
    }

    ajs.ajax_form(site_url + 'auth/refresh_token', post_data, 'POST', null, '0', '0', ajs_form_handler.refresh_token_set, ajs_form_handler.refresh_token_set);
    return false;
});

$.ajaxSetup({
    statusCode: {
        403: function () {
            if($('#view_modal').hasClass('show')) {
                $('#view_modal').modal('hide');
                Swal.fire("Access Denied!", "You do not have permission to perform this action.", "warning");
            } else {
                // Redirect to error page
                window.location.href = cdn_url + 'error/403';
            }
        },
        500: function (xhr) {
            var message = 'Something went wrong. Please try again later.';
            if (xhr && xhr.responseJSON) {
                if (typeof xhr.responseJSON.message !== 'undefined' && xhr.responseJSON.message) {
                    message = xhr.responseJSON.message;
                } else if (typeof xhr.responseJSON.error !== 'undefined' && xhr.responseJSON.error) {
                    message = xhr.responseJSON.error;
                }
            }
            ajs.showAlertBar('error', message, 1);
        }
    },
    dataFilter: function (origdata, type) {
        // console.log(type == 'json');
        // console.log(this.url);
        //  console.log(type);
        
       // var isEnabledEnc = true;  // if enable encryption server side
        var isEnabledEnc = is_enable_encryption(origdata);  // if enable encryption server side
        let {hostname} = new URL(this.url, location.origin); // Handle relative URLs

        var allowedDomain = window.location.hostname == hostname ? false : true;
        localStorage.setItem('isEnabledEnc', isEnabledEnc);
        if(hostname == 'localhost') {
            if(!isEnabledEnc || this.url.indexOf('localhost:8080/AJS') != -1) {
                return origdata;
            }
        } else if (!isEnabledEnc || (!allowedDomain)) {
            return origdata;
        }
        return  JSON.stringify(ajs.decrypt(origdata));
    }
});

$(window).on('load', function () {
    $('.light-dark-mode').click(function (e) {
        var curr_theme = $('html').attr('data-bs-theme');
        var post_data = {'type': 'web_theme', value: curr_theme};
        ajs.ajax_form(site_url + 'api/set_setting', post_data, 'POST', null, '1', '1', ajs.setSettingLocal('WEB_THEME', curr_theme));
        sessionStorage.setItem("data-bs-theme", curr_theme);        
        return false;
    });

    $('.sidebar-fix-button').click(function (e) {
        var curr_selection = $('html').attr('data-sidebar-size');
        
       // var curr_selection = 'sm-hover';
       // alert(curr_selection);
        if (curr_selection == 'sm')
        {
            curr_selection = 'sm-active';
        } else if (curr_selection == 'sm-active')
        {
            curr_selection = 'sm';
        } else {
            curr_selection = 'sm';
        }
        // if (curr_selection == 'sm-hover')
        // {
        //     curr_selection = 'sm-hover-active';
        // } else if (curr_selection == 'sm-hover-active')
        // {
        //     curr_selection = 'sm-hover';
        // }
      //  alert(curr_selection);
        sessionStorage.setItem("data-sidebar-size", curr_selection);
        ajs.setSidebar(curr_selection);

        if(typeof dataTable !== 'undefined' && dataTable) {
            setTimeout(function () {
                dataTable.columns.adjust();
            }, 100);
            setTimeout(function () {
                dataTable.columns.adjust();
            }, 200);
        }
        if(typeof table !== 'undefined' && table) {
            setTimeout(function () {
                table.columns.adjust();
            }, 100);
        }
        var post_data = {'type': 'sidebar_fix', value: curr_selection};

        ajaxWithRefresh({
            url: site_url + 'api/set_setting',
            method: 'POST',
            data: post_data
        }).then(function (response) {
            ajs.setSettingLocal('SIDEBAR_FIX', curr_selection);
        }).catch(function (error) {
            console.warn('Error setting sidebar fix:', error);
        });
        
    });

    $('.bx-fullscreen').click(function (e) {
        var full_screen = '0';
        if ($('body').hasClass('fullscreen-enable'))
        {
            full_screen = '1';
        }

        var post_data = {'type': 'fullscreen', value: full_screen};
        ajs.ajax_form(site_url + 'api/set_setting', post_data, 'POST', null, '1', '1', ajs.setSettingLocal('FULLSCREEN', full_screen));
    });

    $('.read-all-notifications').click(function (e) {
        ajs.ajax_form(site_url + 'api/notifications/read_all', null, 'GET', null, '1', '1', ajs.read_all_notifications, ajs.read_all_notifications);
    });
});


$(document).on('click', '.export_bulk_errors', function (e) {
    var batch_id = $(this).data('batch-id');
    ajs.ajax_form(site_url + 'api/export_bulk_errors/' + batch_id, null, 'GET', null, '1', '1', ajs_form_handler.api_response, ajs_form_handler.api_response);
});
$(document).on('click', '.do-sync', function (e) {
    ajs.sync_api();
    delete_local_cache();
});

$(document).on('keydown', '.number-only', function (e) {
    if((!e.key.match(/^[0-9]+$/) || this.value.length==6) && e.keyCode!=8 && e.keyCode!=46) {
        return false;
    }
});

// for delete local cache data
function delete_local_cache() {
    const allKeys = Object.keys(localStorage);
    allKeys.map(value => {
        if(value.includes('local_cache_')) {
            localStorage.removeItem(value);
        }
    });
}

function convertLocalToUTC(dateStr, timeStr, options = { separate: true }, format = "YYYY-MM-DD HH:mm:ss") {
    const localDateTime = `${$.trim(dateStr)} ${$.trim(timeStr)}`;

    const utc = moment(localDateTime, "YYYY-MM-DD HH:mm").utc().format(format);

    if (options.separate) {
        const [utcDate, utcTime] = utc.split(' ');
        return { date: utcDate, time: utcTime };
    } else {
        return utc;
    }
}

function convertUTCToLocal(utcDateStr, utcTimeStr, options = { separate: true }, format = "YYYY-MM-DD HH:mm:ss") {
    const utcDateTime = `${$.trim(utcDateStr)} ${$.trim(utcTimeStr)}`;
    const local = moment.utc(utcDateTime, "YYYY-MM-DD HH:mm").local().format(format);

    if (options.separate) {
        const [localDate, localTime] = local.split(' ');
        return { date: localDate, time: localTime };
    } else {
        return local;
    }
}

function showSecToHours(seconds) {
    if (seconds < 60) {
        return `00:00`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `00:${minutes.toString().padStart(2, '0')}`;
    } else {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
}


function signature_box(){
    setTimeout(initTouchPad, 100);
    return `<div class="text-end" style="width:360px;"><a href="javascript:void(0)" id="clear-signature" style="color:var(--vz-heading-color);" class="fw-bold p-2 pe-0">Clear</a><div class="p-2 bg-light" style="border: 1px dashed var(--vz-heading-color);"><canvas id="signature" width="350" height="150"></canvas></div></div>`;
}

let signaturePad = false;
function initTouchPad(){
    $("#swal2-html-container").addClass("d-flex")  
    var canvas = document.getElementById("signature");
    signaturePad = new SignaturePad(canvas);
    
    $('#clear-signature').on('click', function(){
        signaturePad.clear();
    });
    
}

function validateSign(){
    if(signaturePad && signaturePad.isEmpty()) {
        return Swal.showValidationMessage(`<strong>Error:</strong>&nbsp;Kindly add your signature to proceed with certificate approval.`);
    }else{
        let dataURL = signaturePad.toDataURL("image/png");
        
        // let fixedCanvas = document.createElement("canvas");
        // fixedCanvas.width = 200;   // fixed width
        // fixedCanvas.height = 100;  // fixed height
        // let ctx = fixedCanvas.getContext("2d");
        // let img = new Image();
        // img.src = dataURL;

        // return new Promise(resolve => {
        //     img.onload = () => {
        //         ctx.drawImage(img, 0, 0, fixedCanvas.width, fixedCanvas.height);
        //         resolve(fixedCanvas.toDataURL("image/png"));
        //     };
        // });
        
        return dataURL;
    }
    return true;
}