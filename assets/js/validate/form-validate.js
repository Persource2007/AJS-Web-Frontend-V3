$("#register_form").validate({
    onkeyup: false,
    rules: {
        fname: {
            required: true,
            lettersonly: true
        },
        lname: {
            required: true,
            lettersonly: true
        },
        company: {
            required: true
        },
        email: {
            required: true,
            email: true,
            duplicateEmail: true
        },
        cemail: {
            required: true,
            email: true,
            equalTo: '#email'
        },
        phone: {
            digits: true,
            required: true,
            minlength: 7,
            maxlength: 11
        },
        country_code: {
            required: true,
            minlength: 2,
            maxlength: 5
        },
        country: {
            required: true
        },
        user_type: {
            required: function ()
            {
                if ($('#registering_for').val() == 'P')
                {
                    return true;
                }
                return false;
            }
        },
        user_category: {
            required: function ()
            {
                if ($('#registering_for').val() == 'P')
                {
                    return true;
                }
                return false;
            }
        },
        product: {
            required: function ()
            {
                //if ($('#registering_for').val() == 'P')
                //{
                return true;
                //}
                //return false;
            }
        },
        agree: {
            required: true
        }
    },
    messages: {
        email: {required: "Enter valid email address."},
        cemail: {required: "Please confirm your email address.", equalTo: "Email and confirm email does not match"},
        registering_for: "Please select relevant option",
        fname: "Please enter your first name",
        lname: "Please enter your last name",
        company: "Please select your company",
        phone: "Only numbers (7 to 11 digits).",
        country: "Please select country",
        user_type: "Please select user type",
        user_category: "Please select your profession",
        agree: "Please agree to the terms and conditions",
    },
    errorPlacement: function (error, element)
    {
        if ($(element).attr('type') == 'checkbox')
        {
            error.insertAfter($(element).closest('.small-txt'));
        } else
        {
            error.insertAfter($(element).closest('.md-form'));
        }
    },
    submitHandler: function (form)
    {
        form.submit();
    }
});

$("#login_form").validate({
    onkeyup: false,
    rules: {
        username: {
            required: true,
        },
        password: {
            required: true,
        }
    },
    messages: {
        username: "Please enter username",
        password: "Please enter password",
    },
    submitHandler: function (form)
    {
        var sub_button = $(form).find(':submit');
        ajs.submit_button_element = sub_button;
        var action = $(form).attr('action');
        var post_data = $(form).serialize();
        ajs.ajax_form(action, post_data, 'POST', null, '1', '1', ajs_form_handler.login_form, ajs_form_handler.login_form);
        return false;
    }
});

$("#set_password_form").validate({
    onkeyup: false,
    rules: {
        password: {
            required: true,
        },
        cpassword: {
            required: true,
            equalTo: "#password"
        }
    },
    messages: {
        password: "Please enter password",
        cpassword: {required: "Please enter password", equalTo: "Confirm password does not match"},
    },
    submitHandler: function (form)
    {
        var sub_button = $(form).find(':submit');
        ajs.submit_button_element = sub_button;
        var action = $(form).attr('action');
        var post_data = $(form).serialize();
        ajs.ajax_form(action, post_data, 'POST', null, '1', '1', ajs_form_handler.set_password_form, ajs_form_handler.set_password_form);
        return false;
    }
});

$("#forgot_password_form").validate({
    onkeyup: false,
    rules: {
        username: {
            required: true,
        },
    },
    messages: {
        username: "Please username",
    },
    submitHandler: function (form)
    {
        var sub_button = $(form).find(':submit');
        ajs.submit_button_element = sub_button;
        var action = $(form).attr('action');
        var post_data = $(form).serialize();
        ajs.ajax_form(action, post_data, 'POST', null, '1', '1', ajs_form_handler.forgot_password_form, ajs_form_handler.forgot_password_form);
        return false;
    }
});

$(".bulk-upload-form").validate({
    onkeyup: false,
    rules: {
        upload: {
            required: true,
            extension: function () {
                var type = $('.bulk-upload-form').data('file-type');
                if (type == 'excel')
                {
                    return 'xls|xlsx';
                } else if (type == 'image')
                {
                    return 'jpg|jpeg|png|gif';
                }
            },
            filesize: function () {
                var type = $('.bulk-upload-form').data('file-type');
                if (type == 'excel')
                {
                    return 10000000;
                } else if (type == 'image')
                {
                    return 100000;
                }
            },
        }
    },
    errorPlacement: function (error, element) {
        if (element.attr("type") == "file") {
            error.insertAfter($(element).parents('div.custom-file-button'));
        } else {
            // something else if it's not a checkbox
        }
    },
    messages: {
        upload: {required: "File is required", extension: "File type is not supported", maxFileSize: "Size exceeded the allowed filesize"}
    },
    submitHandler: function (form)
    {
        var formData = new FormData(form);

        var sub_button = $(form).find(':submit');
        ajs.loader_text = 'File upload in progress, please wait';
        ajs.submit_button_element = sub_button;
        var upload_type = $(form).data('upload-type');
        var file_type = $(form).data('file-type');

        formData.append('file_type', file_type);
        formData.append('upload_type', upload_type);

        // // Client-side pre-upload header check for job-tasks
        // if (upload_type === 'job-tasks') {
        //     var fileInput = $(form).find('input[type=file]')[0];
        //     var file = fileInput && fileInput.files && fileInput.files[0];
        //     if (!file) {
        //         ajs.showAlertBar('error', 'Please select a file to upload', 1);
        //         return false;
        //     }

        //     // Helper: read headers from a file (File object)
        //     function readHeadersFromFile(fileObj) {
        //         return new Promise(function (resolve, reject) {
        //             var reader = new FileReader();
        //             reader.onload = function (e) {
        //                 try {
        //                     var data = new Uint8Array(e.target.result);
        //                     var wb = XLSX.read(data, { type: 'array' });
        //                     var ws = wb.Sheets[wb.SheetNames[0]];
        //                     var range = XLSX.utils.decode_range(ws['!ref']);
        //                     var headers = [];
        //                     for (var C = range.s.c; C <= range.e.c; ++C) {
        //                         var cell = ws[XLSX.utils.encode_cell({ r: range.s.r, c: C })];
        //                         headers.push(cell ? String(cell.v).trim() : '');
        //                     }
        //                     resolve(headers);
        //                 } catch (err) {
        //                     reject(err);
        //                 }
        //             };
        //             reader.onerror = reject;
        //             reader.readAsArrayBuffer(fileObj);
        //         });
        //     }

        //     // Fetch authoritative template headers from backend
        //     function fetchTemplateHeaders() {
        //         return new Promise(function (resolve, reject) {
        //             var url = site_url + 'api/job/upload_template_headers?type=job_tasks';
        //             ajs.ajax_form(url, null, 'GET', null, '0', '0', function (result) {
        //                 if (result && result.status && Array.isArray(result.headers)) {
        //                     resolve({ template: result.template || 'ajs-job-tasks.xlsx', headers: result.headers });
        //                 } else {
        //                     reject(result || { message: 'Invalid template response' });
        //                 }
        //             }, function (err) {
        //                 reject(err || { message: 'Failed to fetch template headers' });
        //             });
        //         });
        //     }

        //     // Perform header comparison (case-insensitive) using authoritative headers
        //     Promise.all([readHeadersFromFile(file), fetchTemplateHeaders()]).then(function (results) {
        //         var uploadedHeaders = results[0].map(h => String(h || '').trim().toLowerCase());
        //         var templateInfo = results[1];
        //         var templateHeaders = templateInfo.headers.map(h => String(h || '').trim().toLowerCase());
        //         var templateName = templateInfo.template || 'ajs-job-tasks.xlsx';
        //         var missing = templateHeaders.filter(function (th) {
        //             return !uploadedHeaders.some(function (uh) { return uh === th; });
        //         });

        //         if (missing.length > 0) {
        //             var missingList = missing.map(function (m) { return "'" + m + "'"; }).join(', ');
        //             var templateLink = site_url + 'resources/templates/' + templateName;
        //             var msg = `Template mismatch — missing: ${missingList}. Download expected template: <a href="${templateLink}" target="_blank">${templateName}</a>`;
        //             ajs.showAlertBar('error', msg, 1);
        //             return false;
        //         }

        //         // Headers OK — proceed with upload
        //         console.debug('Header validation passed for job-tasks upload, proceeding to upload.');
        //         ajs.ajax_file_upload(site_url + 'api/file/upload_s3', formData, '1', '1', ajs_form_handler.file_upload, ajs_form_handler.file_upload);
        //     }).catch(function (err) {
        //         console.error('Header validation failed', err);
        //         var templateName = (err && err.template) ? err.template : 'ajs-job-tasks.xlsx';
        //         var templateLink = site_url + 'resources/templates/' + templateName;
        //         var msg = `Failed to validate file headers. Expected template: <a href="${templateLink}" target="_blank">${templateName}</a>`;
        //         ajs.showAlertBar('error', msg, 1);
        //     });

        //     // Do not auto-reset the form here; reset happens in callback on success
        //     return false;
        // }

        // Default upload flow for other types
        ajs.ajax_file_upload(site_url + 'api/file/upload_s3', formData, '1', '1', ajs_form_handler.file_upload, ajs_form_handler.file_upload);

        $(form).trigger("reset");

        return false;
    }
});

$('#c_account_number, #echeck_account_number').on("cut copy paste", function (e)
{
    e.preventDefault();
});

$(document).on('click', '.re-auth-mfa', function (e) {
    $('#re_auth_mfa').val('1');
    $('#mfa_code').removeAttr('required');
    $('#login_form').submit();
});