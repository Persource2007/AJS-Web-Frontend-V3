$(document).on('change', '.profile-img-file-input', function () {

    ajs.submit_button_element = $(this).closest('form').find('#add-btn');
    ajs.show_button_loader_media();

    var preview_el = $(this).data('preview-class');
    var upload_type = $(this).data('upload-type');
    var name_el = $(this).data('filename-input');
    var file = $(this)[0].files[0];
    var reader = new FileReader;

    var height_check = false;
    var max_height = false;
    var acl = 'private';

    if ($(this).attr('data-max-height') !== undefined) {
        max_height = parseInt($(this).attr('data-max-height'), 10);
        height_check = true;
    }
    if ($(this).attr('data-acl') !== undefined) {
        acl = $(this).attr('data-acl');
    }

    reader.addEventListener("load", function (event) {

        var image_name = file.name;
        var image_extension = image_name.split('.').pop().toLowerCase();
        var url = './services/userProfile.php';
        if (jQuery.inArray(image_extension, ['jpg', 'jpeg', 'png']) == -1) {
            $('#msg').html('Invalid image file');
            ajs.hide_button_loader();
            return false;
        }

        var img = new window.Image();
        img.src = event.target.result;

        img.onload = function () {
            var image_height = Math.round(img.height);

            if (height_check && image_height > max_height) {
                ajs.showAlertBar('error', 'Image height exceeds the maximum limit of ' + max_height + 'px.', 1);
                ajs.hide_button_loader();
                return false;
            }

            var form_data = new FormData();
            form_data.append("upload", file);
            form_data.append("upload_type", upload_type);
            form_data.append("acl", acl);
            form_data.append('file_type', "image");

            ajs.ajax_file_upload(site_url + 'api/file/upload_s3', form_data, '0', '0', ajs_form_handler.image_upload, ajs_form_handler.image_upload, name_el);
            $('.' + preview_el).attr('src', reader.result);
        };

    }, !1), file && reader.readAsDataURL(file);
});

jQuery.validator.setDefaults({
    highlight: function (element, error, valid) {
        var submit = $('button[type="submit"]');
        $(element).css('border-color', 'red');
        $(element).animate({marginLeft: '5px'}, 100)
                .animate({marginLeft: '0px'}, 100)
                .animate({marginLeft: '5px'}, 100)
                .animate({marginLeft: '0px'}, 100);
        $(submit).css('border-color', 'red');
        $(submit).animate({marginLeft: '5px'}, 100)
                .animate({marginLeft: '0px'}, 100)
                .animate({marginLeft: '5px'}, 100)
                .animate({marginLeft: '0px'}, 100);
    }
});
jQuery.validator.setDefaults({
    unhighlight: function (element, error, valid) {
        var submit = $('button[type="submit"]');
        $(element).stop(true, true).css('margin-left', '');
        $(element).css('border-color', '#ced4da');
        $(submit).stop(true, true).css('margin-left', '');
        $(submit).css('border-color', '#ced4da');
    }
});
var myOffcanvas = document.getElementById('offcanvasRight')
var myOffcanvas2 = document.getElementById('offcanvasRight2')
myOffcanvas.addEventListener('hidden.bs.offcanvas', function () {
    $('#offcanvasRight').find('.offcanvas-body').html('');
    ajs.isOffcanvasOpen = false;
});
myOffcanvas2.addEventListener('hidden.bs.offcanvas', function () {
    $('#offcanvasRight2').find('.offcanvas-body').html('');
    ajs.isOffcanvasSmallOpen = false;
});
myOffcanvas.addEventListener('show.bs.offcanvas', function () {
    ajs.isOffcanvasOpen = true;
});
myOffcanvas2.addEventListener('show.bs.offcanvas', function () {
    ajs.isOffcanvasSmallOpen = true;
});
// Bootstrap's offcanvas/modal focus trap listens for focusin on document and pulls focus
// back inside itself. SweetAlert2 renders its dialog at body level, so anything opened
// from inside an offcanvas (e.g. Add Comments / Approve / Reject on the Task Edit panel)
// had its inputs stolen back and could not be typed into or submitted. Stop those focusin
// events before they reach the trap; this capture-phase listener runs ahead of Bootstrap's
// bubble-phase one on the same node, and only fires for targets inside a Swal container.
document.addEventListener('focusin', function (e) {
    if (e.target && e.target.closest && e.target.closest('.swal2-container')) {
        e.stopPropagation();
    }
}, true);

$('.dropdown-menu input, .dropdown-menu label, .dropdown-menu button').click(function (e) {
    e.stopPropagation();
});



$(document).ready(function () {
    ajs.mask_inputs();
    ajs.set_current_url();
    delete_local_cache();

    let isTabActive = !document.hidden;
    let isOnline = navigator.onLine;

    // ---- VISIBILITY CHANGE ----
    document.addEventListener("visibilitychange", function () {
        isTabActive = !document.hidden;

        if (isTabActive && isOnline) {
            runNotificationCount();
            runSyncApi();
        }
    });

    // ---- NETWORK EVENTS ----
    window.addEventListener("offline", function () {
        console.log("Offline → stopping API calls");
        isOnline = false;
    });

    window.addEventListener("online", function () {
        console.log("Online → resuming API calls");
        isOnline = true;

        if (isTabActive) {
            runNotificationCount();
            runSyncApi();
        }
    });

    // --- Fast notifications every minute ---
    async function runNotificationCount() {
        if (!isTabActive || !isOnline) return;

        try {
            await ajs.count_unread_notification();
        } catch (e) {
            console.error('Unread count error:', e);
        } finally {
            setTimeout(runNotificationCount, 60000);
        }
    }

    // --- Heavy sync every 5 minutes ---
    async function runSyncApi() {
        if (!isTabActive || !isOnline) return;

        try {
            await ajs.sync_api();
        } catch (e) {
            console.error('Sync API error:', e);
        } finally {
            setTimeout(runSyncApi, 5 * 60 * 1000);
        }
    }

    // ---- INITIAL START ----
    if (isTabActive && isOnline) {
        runNotificationCount();
        runSyncApi();
    }
});

function set_master_data_pop_master(data)
{
    if (ajs_form_handler.check_result(data))
    {
        $('.popup-form-button').attr('data-heading', 'Add New - ' + data.message.title);
        $('#has_parent').val(data.message.parent_id);
        $('.master-title').html('Masters - ' + data.message.title);
    }
}


function create_master_form()
{
    var master_type = $('#master_type').val();

    ajs.ajax_form(site_url + 'master/get_parent_by_type/' + master_type, null, 'GET', null, '1', '1', set_master_data_pop_master, set_master_data_pop_master);

    var has_parent = $('#has_parent').val();
    ajs.mask_inputs();

    if (typeof has_parent !== 'undefined' && has_parent > 0)
    {
        $('.parent-val').css('display', '');
        select2_ajax('#parent_id', site_url + 'master-record/get_all', 'master_value', {"master_values.master_id": has_parent}, 'offcanvasRight2');
    }

    $("#addMasterRecordForm").validate({
        onkeyup: false,
        rules: {
            title: {
                required: true,
            },
            master_value_code: {
                required: true,
                noSpace: true,
                alphanumeric: true,
            },
        },
        messages: {
            title: "Enter Title",
            master_value_code: "Enter Code",
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
        submitHandler: function (form)
        {
            var sub_button = $(form).find(':submit');
            ajs.submit_button_element = sub_button;
            var action = $(form).attr('action');
            var method = $(form).attr('method');
            var post_data = $(form).serialize();
            ajs.ajax_form(action, post_data, method, null, '1', '1', ajs_form_handler.smalloffcanvas_form, ajs_form_handler.smalloffcanvas_form);
            return false;
        }
    });

}

function create_tag_form(type = "create") {
    $("#tagForm").closest('.offcanvas').addClass('custom-offcanvas-right2').removeClass('custom-offcanvas-right');
    if (type == "create") {

    }

    $("#tagForm").validate({
        onkeyup: false,
        rules: {
            title: {
                required: true,
            },
            "modules[]": {
                required: true,
            },
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
            // Modify checkbox value if checked

            $("#tagForm input:checkbox:not(.all-module)").each(function () {
                var checkbox_value = $(this).is(':checked') ? 1 : 0;
                formData.push({name: $(this).data('name'), value: checkbox_value});
            });

            var offcanvas = $(form).closest('.offcanvas').attr('id');

            ajs.ajax_form(
                    action,
                    formData,
                    method,
                    null,
                    "1",
                    "1",
                    handle_tag_form,
                    handle_tag_form,
                    offcanvas
                    );

            return false;
        },
    });

    var element_id = $('#element_id').val();
    var module = (element_id != '') ? $('#' + element_id).data('module') : null;
    if (module) {
        $("#tagForm #modules").val(module);
        $("#tagForm #modules").parents('.input-light').hide();
        $("#tagForm #title").parents('.col-md-12').removeClass('col-xxl-4');
    }
    $("#modules").select2();
}

function handle_tag_form(result_json, offcanvas) {
    ajs_form_handler.hide_errors();
    if (ajs_form_handler.check_result(result_json))
    {


        $(`#${offcanvas}.offcanvas-body`).find('.offcanvas-form-errors').remove();
        $(`#${offcanvas}`).offcanvas('hide');

        if ($("#tag-datatables").length) {
            ajs.refreshDataTable();
        } else {
            var element_id = $('#element_id').val();

            var module = $('#' + element_id).data('module') ?? 'task';
            const parent = $('#' + element_id).closest('#offcanvasRight').length ? 'offcanvasRight' : 'body';
            select2_ajax('#' + element_id, site_url + 'tag/get_all', 'title', {module}, parent, null, true);
        }
        ajs.showAlertBar('success', result_json.message, true);
    } else
    {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}
