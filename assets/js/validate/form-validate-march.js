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
                    return 10;
                } else if (type == 'image')
                {
                    return 1;
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

        ajs.ajax_file_upload(cdn_url + 'upload_file', formData, '1', '1', ajs_form_handler.file_upload, ajs_form_handler.file_upload);

        $(form).trigger("reset");

        return false;
    }
});

$("#donate-us-form").validate({
    onkeyup: false,
    rules: {
        donatefreq: {
            required: function ()
            {
                if ($("#donateonetime").is(":checked"))
                {
                    return false;
                } else
                {
                    return true;
                }
            }
        },
        donatecountfreq: {
            number: true,
            required: function ()
            {
                if ($("#donateonetime").is(":checked"))
                {
                    return false;
                } else
                {
                    return true;
                }
            },
            min: 2,
            max: function ()
            {
                if ($("#donatefreq").val() == 'M')
                {
                    return 60;
                } else
                {
                    return 5;
                }
            }
        },
        number_of_schools: {
            required: function ()
            {
                if ($('#other_amount').val() == '')
                {
                    return true;
                }
                return false;
            }
        },
        other_amount: {
            required: function ()
            {
                if ($('#number_of_schools').val() == '')
                {
                    return true;
                }
                return false;
            }
        },
        email: {
            required: true,
            email: false
        },
        first_name: {
            required: true,
        },
        last_name: {
            required: true,
        },
        phone: {
            required: true,
            minlength: 14,
            maxlength: 14
        },
        address1: {
            required: true,
        },
        city: {
            required: true,
        },
        state: {
            required: function ()
            {
                if ($('#country').val() == 222 || $('#country').val() == 98)
                {
                    return true;
                }
                return false;
            }
        },
        state_input: {
            required: function ()
            {
                if ($('#country').val() != 222 && $('#country').val() != 98)
                {
                    return true;
                }
                return false;
            }
        },
        zipcode: {
            required: true,
        },
        country: {
            required: true,
        }
    },
    messages: {
        donatefreq: {
            required: "Please select a donation frequency."
        },
        donatecountfreq: {
            required: "Please enter number of donations."
        },
        number_of_schools: {
            required: "Select number of schools or enter other amount"
        },
        email: {
            required: "Enter a valid email address or Donor ID."
        },
        first_name: {
            required: "Enter first name."
        },
        last_name: {
            required: "Enter last name."
        },
        phone: {
            required: "Enter a valid 10 digit phone number.",
            minlength: "Enter a valid 10 digit phone number.",
            maxlength: "Enter a valid 10 digit phone number."
        },
        address1: {
            required: "Enter address."
        },
        city: {
            required: "Enter city name."
        },
        state: {
            required: "Select state."
        },
        state_input: {
            required: "Enter state."
        },
        country: {
            required: "Select country."
        },
        zipcode: {
            required: "Enter zipcode"
        },
    },
    submitHandler: function (form)
    {
        if ($('#donor_found').val() == '0')
        {
            var eml = $('#email').val();
            if (!ekal.validateEmail(eml))
            {
                alert('Please enter a valid email address');
                $('#email').focus();
                return false;
            }
        }
        form.submit();
    }
});


$("#quickdonate-us-form").validate({
    onkeyup: false,
    rules: {
        donatefreq: {
            required: function ()
            {
                if ($("#donateonetime").is(":checked"))
                {
                    return false;
                } else
                {
                    return true;
                }
            }
        },
        donatecountfreq: {
            number: true,
            required: function ()
            {
                if ($("#donateonetime").is(":checked"))
                {
                    return false;
                } else
                {
                    return true;
                }
            },
            min: 2,
            max: function ()
            {
                if ($("#donatefreq").val() == 'M')
                {
                    return 60;
                } else
                {
                    return 5;
                }
            }
        },
        /* donationamt: {
         required: true,
         }, */
        other_amount: {
            required: function ()
            {
                if ($('#donation-amt6').is(":checked"))
                {
                    return true;
                } else
                {
                    return false;
                }
            },
            min: 5,
            max: 999999
        },
        email: {
            required: true,
            email: true
        },
        first_name: {
            required: true,
        },
        last_name: {
            required: true,
        },
        phone: {
            required: true,
            minlength: 14,
            maxlength: 14
        },
        address1: {
            required: true,
        },
        city: {
            required: true,
        },
        state: {
            required: function ()
            {
                if ($('#country').val() == 222 || $('#country').val() == 98)
                {
                    return true;
                }
                return false;
            }
        },
        state_input: {
            required: function ()
            {
                if ($('#country').val() != 222 && $('#country').val() != 98)
                {
                    return true;
                }
                return false;
            }
        },
        zipcode: {
            required: true,
        },
        country: {
            required: true,
        }
    },
    messages: {
        donatefreq: {
            required: "Please select a donation frequency."
        },
        donatecountfreq: {
            required: "Please enter number of donations."
        },
        /* donationamt: {
         required: "Please select a donation amount."
         }, */
        other_amount: {
            required: "Enter a custom amount between 5 and 999999 or select an amount from above options."
        },
        email: {
            required: "Enter a valid email address."
        },
        first_name: {
            required: "Enter first name."
        },
        last_name: {
            required: "Enter last name."
        },
        phone: {
            required: "Enter a valid 10 digit phone number.",
            minlength: "Enter a valid 10 digit phone number.",
            maxlength: "Enter a valid 10 digit phone number."
        },
        address1: {
            required: "Enter address."
        },
        city: {
            required: "Enter city name."
        },
        state: {
            required: "Select state."
        },
        state_input: {
            required: "Enter state."
        },
        country: {
            required: "Select country."
        },
        zipcode: {
            required: "Enter zipcode"
        },
    },
    submitHandler: function (form)
    {
        form.submit();
    }
});

$("#project-us-form").validate({
    onkeyup: false,
    rules: {
        'project_check[]': {
            required: true
        },
        email: {
            required: true,
            //email: true
        },
        first_name: {
            required: true,
        },
        last_name: {
            required: true,
        },
        phone: {
            required: true,
        },
        address1: {
            required: true,
        },
        city: {
            required: true,
        },
        state: {
            required: true,
        },
        zipcode: {
            required: true,
        },
        country: {
            required: true,
        }
    },
    messages: {
        'project_check[]': {
            required: "Please select atleast one project you wish to support"
        },
        email: {
            required: "Enter a valid email address."
        },
        first_name: {
            required: "Enter first name."
        },
        last_name: {
            required: "Enter last name."
        },
        phone: {
            required: "Enter valid phone number."
        },
        address1: {
            required: "Enter address."
        },
        city: {
            required: "Enter city name."
        },
        state: {
            required: "Select state."
        },
        country: {
            required: "Select country."
        },
        zipcode: {
            required: "Enter zipcode"
        },
    },
    submitHandler: function (form)
    {
        if (validate_project())
        {
            form.submit();
        } else
        {
            alert('Please select atleast one project you wish to support');
            return false;
        }
    }
});


$("#buy-tickets-us-form").validate({
    onkeyup: false,
    rules: {
        email: {
            required: true,
            //email: true
        },
        first_name: {
            required: true,
        },
        last_name: {
            required: true,
        },
        phone: {
            required: true,
        },
        address1: {
            required: true,
        },
        city: {
            required: true,
        },
        state: {
            required: true,
        },
        zipcode: {
            required: true,
        },
        country: {
            required: true,
        }
    },
    messages: {
        email: {
            required: "Enter a valid email address."
        },
        first_name: {
            required: "Enter first name."
        },
        last_name: {
            required: "Enter last name."
        },
        phone: {
            required: "Enter valid phone number."
        },
        address1: {
            required: "Enter address."
        },
        city: {
            required: "Enter city name."
        },
        state: {
            required: "Select state."
        },
        country: {
            required: "Select country."
        },
        zipcode: {
            required: "Enter zipcode"
        },
    },
    submitHandler: function (form)
    {
        get_ticket_data();
        form.submit();
    }
});

$("#event-register-us-form").validate({
    onkeyup: false,
    rules: {
        number_of_tickets: {
            required: true,

        },
        email: {
            required: true,
            //email: true
        },
        first_name: {
            required: true,
        },
        last_name: {
            required: true,
        },
        phone: {
            required: true,
        },
        address1: {
            required: true,
        },
        city: {
            required: true,
        },
        state: {
            required: true,
        },
        zipcode: {
            required: true,
        },
        country: {
            required: true,
        }
    },
    messages: {
        number_of_tickets: {
            required: "Select number of tickets."
        },
        email: {
            required: "Enter a valid email address."
        },
        first_name: {
            required: "Enter first name."
        },
        last_name: {
            required: "Enter last name."
        },
        phone: {
            required: "Enter valid phone number."
        },
        address1: {
            required: "Enter address."
        },
        city: {
            required: "Enter city name."
        },
        state: {
            required: "Select state."
        },
        country: {
            required: "Select country."
        },
        zipcode: {
            required: "Enter zipcode"
        },
    },
    submitHandler: function (form)
    {
        get_ticket_data();
        form.submit();
    }
});


$("#payment-form").validate({
    onkeyup: false,
    rules: {
        name: {required: true, alphanumeric: true},
        //bill_to_surname: {required: true},
        //card_type: {required: true},
        cardnumber: {
            required: true,
            minlength: 16,
            maxlength: 19
        },
        securitycode: {required: true, minlength: 3, maxlength: 4},
        expirationdate: {required: true},
        //card_expirationYear: {required: true},
    },
    messages: {
        name: "Please enter name as per the card.",
        //bill_to_surname: "Please enter last name properly.",
        //card_type: "Please select card.",
        cardnumber: "Please enter card number.",
        securitycode: "Please enter cvv.",
        expirationdate: "Please enter expiry month and year.",
        //card_expirationYear: "Please select year.",
    },
    submitHandler: function (form)
    {
        var donor_name = $('#name').val();
        var first_name = donor_name.split(' ').slice(0, -1).join(' ');
        var last_name = donor_name.split(' ').slice(-1).join(' ');
        var security_code = $('#securitycode').val();
        var expirationdate = $('#expirationdate').val();
        var cardnumber = $('#cardnumber').val();
        var cardexp = expirationdate.replace("/", "-20");
        var card_number = cardnumber.replace(/\s/g, '');

        $("#bill_to_forename").val(first_name);
        $("#bill_to_surname").val(last_name);
        $("#card_expiry_date").val(cardexp);
        $("#card_number").val(card_number);
        $("#card_cvn").val(security_code);


        $('.donate-cc-button').attr('disabled', 'disabled');
        dt = $("#payment-form").serialize();

        ekal.ajaxCustom(ekal.ajax_url + 'start_transaction', {data: dt, transaction_id: transaction_id});

        form.submit();
    }
});

$('#c_account_number, #echeck_account_number').on("cut copy paste", function (e)
{
    e.preventDefault();
});


$("#payment-form-echeck").validate({
    onkeyup: false,
    rules: {
        bill_to_forename: {required: true},
        bill_to_surname: {required: true},
        echeck_account_number: {
            required: true,
            digits: true,
            minlength: 7,
            maxlength: 18,
            noSpace: true
        },
        c_account_number: {
            required: true,
            digits: true,
            minlength: 7,
            maxlength: 18,
            noSpace: true,
            equalTo: '#echeck_account_number'
        },
        echeck_routing_number: {
            required: true,
            digits: true,
            minlength: 7,
            maxlength: 9,
            noSpace: true
        },
        agree: {required: true}
    },
    messages: {
        bill_to_forename: "Please enter first name properly.",
        bill_to_surname: "Please enter last name properly.",
        echeck_account_number: "Please enter valid account number.",
        c_account_number: "Account number does not match.",
        echeck_routing_number: "Please enter valid routing number.",
        agree: "Please accept."
    },
    submitHandler: function (form)
    {
        $('.donate-cc-button').attr('disabled', 'disabled');
        ekal.ajaxCustom(ekal.ajax_url + 'start_transaction', {data: $("#payment-form-echeck").serialize(), transaction_id: transaction_id});
        form.submit();
    }

});

$("#donor-login-form").validate({
    onkeyup: false,
    rules: {
        email: {required: true},
        password: {required: true}
    },
    messages: {
        email: "Enter valid email ID or User ID.",
        password: "Enter your password.",
    },
    submitHandler: function (form)
    {
        form.submit();
    }

});



$("#donor-forgot-password-form").validate({
    onkeyup: false,
    rules: {
        forgot_email: {required: true},
    },
    messages: {
        forgot_email: "Enter valid email ID"
    },
    submitHandler: function (form)
    {
        form.submit();
    }
});

$("#donor-set-password-form").validate({
    onkeyup: false,
    rules: {
        new_password: {
            required: true,
            minlength: 8,
        },
        c_password: {
            required: true,
            minlength: 8,
            equalTo: '#new_password'
        },
    },
    messages: {
        new_password: "Enter new password.",
        c_password: "New and Confirm passwords do not match."
    },
    submitHandler: function (form)
    {
        form.submit();
    }
});

$("#new-donor-set-password-form").validate({
    onkeyup: false,
    rules: {
        set_password: {
            required: true,
            minlength: 8,
        },
        cs_password: {
            required: true,
            minlength: 8,
            equalTo: '#set_password'
        },
    },
    messages: {
        new_password: "Enter new password",
        c_password: "Password and confirm password does not match"
    },
    submitHandler: function (form)
    {
        form.submit();
    }
});

$("#pledge-us-form").validate({
    onkeyup: false,
    rules: {
        'project_check[]': {
            required: true
        },
        timeframe: {
            required: true
        },
        email: {
            required: true,
            //email: true
        },
        first_name: {
            required: true,
        },
        last_name: {
            required: true,
        },
        phone: {
            required: true,
        },
        address1: {
            required: true,
        },
        city: {
            required: true,
        },
        state: {
            required: true,
        },
        zipcode: {
            required: true,
        },
        country: {
            required: true,
        }
    },
    messages: {
        'project_check[]': {
            required: "Please select atleast one project you wish to support"
        },
        timeframe: {
            required: "Please select timeframe."
        },
        email: {
            required: "Enter valid email ID or Donor ID."
        },
        first_name: {
            required: "Enter first name."
        },
        last_name: {
            required: "Enter last name."
        },
        phone: {
            required: "Enter valid phone number."
        },
        address1: {
            required: "Enter address."
        },
        city: {
            required: "Enter city name."
        },
        state: {
            required: "Select state."
        },
        country: {
            required: "Select country."
        },
        zipcode: {
            required: "Enter zipcode"
        },
    },
    submitHandler: function (form)
    {
        if (validate_project())
        {
            form.submit();
        } else
        {
            alert('Please select atleast one project you wish to support');
            return false;
        }
    }
});

$("#pledge-donate-us-form").validate({
    onkeyup: false,
    rules: {
        first_name: {
            required: true,
        },
        last_name: {
            required: true,
        },
        phone: {
            required: true,
        },
        address1: {
            required: true,
        },
        city: {
            required: true,
        },
        state: {
            required: true,
        },
        zipcode: {
            required: true,
        },
        country: {
            required: true,
        }
    },
    messages: {
        first_name: {
            required: "Enter first name."
        },
        last_name: {
            required: "Enter last name."
        },
        phone: {
            required: "Enter valid phone number."
        },
        address1: {
            required: "Enter address."
        },
        city: {
            required: "Enter city name."
        },
        state: {
            required: "Select state."
        },
        country: {
            required: "Select country."
        },
        zipcode: {
            required: "Enter zipcode"
        },
    },
    submitHandler: function (form)
    {
        form.submit();

    }
});


$("#donor-profile-form").validate({
    onkeyup: false,
    rules: {
        email: {
            required: true,
            email: true
        },
        first_name: {
            required: true,
        },
        last_name: {
            required: true,
        },
        phone: {
            required: true,
            minlength: 10,
            maxlength: 14
        },
        address1: {
            required: true,
        },
        city: {
            required: true,
        },
        state: {
            required: function ()
            {
                if ($('#country').val() == 222 || $('#country').val() == 98)
                {
                    return true;
                }
                return false;
            }
        },
        state_input: {
            required: function ()
            {
                if ($('#country').val() != 222 && $('#country').val() != 98)
                {
                    return true;
                }
                return false;
            }
        },
        zipcode: {
            required: true,
        },
        country: {
            required: true,
        }
    },
    messages: {
        email: {
            required: "Enter a valid email address."
        },
        first_name: {
            required: "Enter first name."
        },
        last_name: {
            required: "Enter last name."
        },
        phone: {
            required: "Enter valid 10 digit phone number.",
            minlength: "Enter valid 10 digit phone number.",
            maxlength: "Enter valid 10 digit phone number."
        },
        address1: {
            required: "Enter address."
        },
        city: {
            required: "Enter city name."
        },
        state: {
            required: "Select state."
        },
        state_input: {
            required: "Enter state."
        },
        country: {
            required: "Select country."
        },
        zipcode: {
            required: "Enter zipcode"
        },
    },
    submitHandler: function (form)
    {
        form.submit();
    }
});


$("#create-new-donor-form").validate({
    onkeyup: false,
    rules: {
        email_new: {
            required: true,
            email: true
        },
        fname_new: {
            required: true,
        },
        lname_new: {
            required: true,
        },
        phone_new: {
            required: true,
            minlength: 10,
            maxlength: 14
        },
        address1_new: {
            required: true,
        },
        city_new: {
            required: true,
        },
        state_new: {
            required: function ()
            {
                if ($('#country_new').val() == 222 || $('#country_new').val() == 98)
                {
                    return true;
                }
                return false;
            }
        },
        state_input_new: {
            required: function ()
            {
                if ($('#country_new').val() != 222 && $('#country_new').val() != 98)
                {
                    return true;
                }
                return false;
            }
        },
        zipcode_new: {
            required: true,
        },
        country_new: {
            required: true,
        }
    },
    messages: {
        email_new: {
            required: "Enter a valid email address."
        },
        fname_new: {
            required: "Enter first name."
        },
        lname_new: {
            required: "Enter last name."
        },
        phone_new: {
            required: "Enter valid 10 digit phone number.",
            minlength: "Enter valid 10 digit phone number.",
            maxlength: "Enter valid 10 digit phone number."
        },
        address1_new: {
            required: "Enter address."
        },
        city_new: {
            required: "Enter city name."
        },
        state_new: {
            required: "Select state."
        },
        state_input_new: {
            required: "Enter state."
        },
        country_new: {
            required: "Select country."
        },
        zipcode_new: {
            required: "Enter zipcode"
        },
    },
    submitHandler: function (form)
    {
        form.submit();
    }
});


$("#reset-password-form").validate({
    onkeyup: false,
    rules: {
        new_password: {
            required: true
        },
        confirm_password: {
            required: true,
            equalTo: '#new_password'
        }
    },
    messages: {
        new_password: {
            required: "Enter new password."
        },
        first_name: {
            required: "Confirm password.",
            equalTo: "Password and confirm password doesnt match."
        },
    },
    submitHandler: function (form)
    {
        form.submit();
    }
});

$("#volunteer-for-ekal-form").validate({
    onkeyup: false,
    rules: {
        first_name: {required: true},
        last_name: {required: true},
        email: {
            required: true,
            email: true,
        },
        phone: {
            required: true,
            minlength: 8,
            maxlength: 16
        },
        city: {required: true},
        state: {required: true},
        zip: {
            required: true,
            minlength: 5,
            maxlength: 7
        }
    },
    messages: {

        first_name: "Please enter First name.",
        last_name: "Please enter Last name.",
        email: "Please enter a valid email address.",
        phone: "Please enter a valid phone number.",
        city: "Please enter city.",
        state: "Please enter State.",
        zip: "Please enter Zipcode."

    },
    submitHandler: function (form)
    {
        form.submit();
    }
});

$("#resource_form").validate({
    onkeyup: false,
    rules: {
        vremail: {
            required: true,
            email: true,
        }
    },
    messages: {
        vremail: "Please enter a valid email address."
    },
    submitHandler: function (form)
    {
        form.submit();
    }

});

$("#visit-school-form").validate({
    onkeyup: false,
    rules: {
        name: {required: true},
        age: {required: true},
        country: {required: true},
        email: {
            required: true,
            email: true,
        },
        phone: {
            required: true,
            minlength: 8,
            maxlength: 16
        },
        contact_mode: {required: true},
        address1: {required: true},
        city: {required: true},
        address_city: {required: true},
        phone_code: {required: true, minlength: 10, maxlength: 18},
        state_school: {required: true},
        vehicle_required: {required: true},
        zipcode: {
            required: true,
            minlength: 5,
            maxlength: 7
        }
    },
    messages: {
        country: "Please select country.",
        name: "Please enter name.",
        age: "Please enter age.",
        email: "Please enter a valid email address.",
        phone: "Please enter a valid phone number.",
        contact_mode: "Please select preferred mode of contact.",
        city: "Please enter city.",
        address_city: "Please enter address/city.",
        phone_code: "Please enter a valid phone number.",
        date: "Please select date.",
        vehicle_required: "Please select an option.",
        state_school: "Please select an option."
    },
    submitHandler: function (form)
    {
        form.submit();
    }


});


