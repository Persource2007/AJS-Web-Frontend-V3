$(document).ready(function ()
{
    function trim11(str) {
        str = str.replace(/^\s+/, '');
        for (var i = str.length - 1; i >= 0; i--) {
            if (/\S/.test(str.charAt(i))) {
                str = str.substring(0, i + 1);
                break;
            }
        }
        return str;
    }

    function getWordCount(wordString) {
        var words = wordString.split(" ");
        words = words.filter(function (words) {
            return words.length > 0
        }).length;
        return words;
    }

    $.validator.addMethod("pwcheck", function (value, element) {

        return /[A-Z]+/.test(value) && /[a-z]+/.test(value) &&
                /[\d\W]+/.test(value) && /\S{6,}/.test(value);

    }, "Password should contain atleast 1 uppercase, 1 lowecase and 1 number");

//add the custom validation method

    jQuery.validator.addMethod("wordCount", function (value, element, params) {
        var count = getWordCount(value);
        if (count <= params[0]) {
            return true;
        }
    }, jQuery.validator.format("Maximum {0} words are allowed."));


    jQuery.validator.addMethod("minWordCount", function (value, element, params) {
        var count = getWordCount(value);
        if (count >= params[0]) {
            return true;
        }
    }, jQuery.validator.format("Minimum {0} words are are required."));


    $.validator.addMethod('filesize', function (value, element, param) {
        return this.optional(element) || (element.files[0].size <= param)
    }, 'File size must be less than {0}bytes');


    function countChar(val, allowed, message_div) {
        var len = val.value.length;
        $('#' + message_div).html(' : ' + parseInt((parseInt(allowed) - parseInt(len))) + ' Characters remaining');
    }

    $.validator.addMethod("gst", function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    }, "Please enter valid GST number.");

    $.validator.addMethod("lettersonly", function (value, element) {
        return this.optional(element) || /^[a-z ]+$/i.test(value);
    }, "Only letters allowed");

    $.validator.addMethod("duplicateEmail", function (value, element)
    {

        var valid = true;
        $.ajax({url: js_base + 'ajax/check_duplicate',
            data: {field: 'user_email', value: value},
            async: false,
            method: 'post',
            beforeSend: function () {
                $(element).after('<div style="margin-top: -40px; float: right;" id="loader_' + $(element).attr('name') + '"><img style="height:25px;" src="' + js_base + '/resources/img/loader.gif"></div>');
            },
            complete: function () {
                setTimeout(function () {
                    $('#loader_' + $(element).attr('name')).remove();
                }, 500);
            },
            success: function (msg) {
                msg = trim11(msg);
                valid = msg === "true" ? true : false
            }
        });
        return valid;
    }, 'Email ID already registered');


    $.validator.addMethod("othercompanyrequired", $.validator.methods.required, "Please enter your company name");

    $.validator.addMethod('filesizelogo', function (value, element, param) {
        return this.optional(element) || (element.files[0].size <= param)
    }, 'Logo image size must be less than 200KB');

    $.validator.addMethod('filesizepdf', function (value, element, param) {
        return this.optional(element) || (element.files[0].size <= param)
    }, 'PDF size must be less than 2MB');

    jQuery.validator.addMethod("alphanumeric", function (value, element) {
        return this.optional(element) || /^[a-z0-9\s]+$/i.test(value);
    });

    jQuery.validator.addMethod("noSpace", function (value, element) {
        return value.indexOf(" ") < 0;
    }, "Spaces are not allowed");
});
