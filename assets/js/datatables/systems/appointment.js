dataTable = null;
master_data_type = 'appointment-template';

function load_data_table(limit, search_term, filters) {
    data_filters = "";
    page_limit = ajs.datatable_limit;
    search = "";
    if (
            typeof filters != "undefined" &&
            (typeof filters["filters"] !== "undefined" || filters["filters"] != null)
            ) {
        data_filters = filters["filters"];
    }
    if (typeof limit !== "undefined" || limit != null) {
        page_limit = limit;
    }
    if (typeof search_term !== "undefined" || search_term != null) {
        search = search_term;
    }

    dataTable = new DataTable("#appointment-datatables", {
        scrollY: screen.height - 530 + "px",
        serverSide: true,
        processing: true,
        paging: true,
        responsive: false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: search,
        },
        // dom: 'Bfrtip',
        // buttons: ["excel"],
        ajax: {
            url: site_url + "appointment-template/get_all",
            method: "GET",
            async: false,
            dataSrc: "data",
            data: function (d) {
                return $.extend({}, d, {
                    data_filters,
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr, error, code) {
                ajs.datatable_error(xhr, "appointment-datatables");
            }
        },
        language: {
            emptyTable: "No data found",
        },
        columns: [
            {
                data: "id",
                sortable: false,
                searchable: false,
                render: function (data, type, row) {
                    return (
                            `<a data-after-load-func="edit_form" data-heading="Edit AJS/Generic Template - ` +
                            row.id +
                            `" data-form-url="` +
                            cdn_url +
                            `system/appointment-temp/edit/` +
                            row.id +
                            `" class="popup-form-button" >` + edit_icon() + `</a>`

                            );
                },
            },
            {
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
                render: function (data, type, row) {
                    return row.id;
                },
            },
            {
                name: "title",
                data: "title",
            },
            {
                name: "draft",
                data: "draft",
                render: function (data) {
                    return truncate_string(data, 80);
                },
            },
            
        ],
        order: [["1", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Masters");
        },
        initComplete: function (settings, json) {
            setTimeout(function () {
                loadColumnVisibility(dataTable);
                //moveActionColumn(dataTable);
            });
            if (json.header_footers) {
                set_header_footers(json.header_footers);
            }
            var scrollBodyHeight = $('.dataTables_scrollBody').css('max-height');
            $('.dataTables_scrollBody').css('min-height', scrollBodyHeight);

            if($('#datatable_buttons').length == 0) {
                $('.dataTables_wrapper').prepend('<div class="colvis-fixed-container" id="datatable_buttons"></div>');
            }
        }
    });

    $("body").tooltip({
        selector: '[data-bs-toggle="tooltip"]',
    });

}

function set_header_footers(response)
{
    $('#mail_header_name').val(response.mail_header.var_value);
    $('#mail_footer_name').val(response.mail_footer.var_value);
    $('#letter_header_name').val(response.letter_header.var_value);
    $('#letter_footer_name').val(response.letter_footer.var_value);

    $('.mail-header-preview').attr('src', s3_url + '/' + response.mail_header.var_value);
    $('.mail-footer-preview').attr('src', s3_url + '/' + response.mail_footer.var_value);
    $('.letter-header-preview').attr('src', s3_url + '/' + response.letter_header.var_value);
    $('.letter-footer-preview').attr('src', s3_url + '/' + response.letter_footer.var_value);

}

if ($("#appointment-datatables").length) {
    fetch_default_filter("appointment");
    var breadcrumbs = [
        {label: "System Admin", url: "javascript: void(0);"},
        {label: "Setup", url: "javascript: void(0);"},
        {label: "AJS/Generic Templates", url: null},
    ];
    set_breadcrumb(breadcrumbs);
}

function create_form(type = 'create') {
    if (type == 'create') {
        init_ckeditor("#draft");
    }

    $("#appointmentForm").validate({
        onkeyup: false,
        rules: {
            title: {
                required: true,
            },
            draft: {
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
            // var post_data = $(form).serialize();
            var post_data = $(form).serializeArray();
            post_data.forEach(function(field, index) {
                if (field.name === 'draft') {
                    field.value = btoa(unescape(encodeURIComponent(field.value)));
                }
            });
            ajs.ajax_form(
                    action,
                    post_data,
                    method,
                    null,
                    "1",
                    "1",
                    ajs_form_handler.offcanvas_form,
                    ajs_form_handler.offcanvas_form
                    );
            return false;
        },
    });
}

function load_appointment_data(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var appointment = result_json.data;

        $("#title").val(appointment.title);
        $("#draft").val(appointment.draft);

        init_ckeditor("#draft");
    } else {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function edit_form() {
    create_form("edit");
    var id = $("#edit_id").val();
    ajs.apply_ind_roles("Masters");
    ajs.ajax_form(
            site_url + "appointment-template/get/" + id,
            null,
            "GET",
            null,
            "1",
            "1",
            load_appointment_data,
            load_appointment_data
            );
}

$(function () {
    ajs.apply_ind_roles("Masters");
    $.validator.setDefaults({
        // This will ignore all hidden elements alongside `contenteditable` elements
        // that have no `name` attribute
        ignore: ":hidden, [contenteditable='true']:not([name])",
    });
});

$(function () {
    $("#appointmentHeaderForm").validate({
        onkeyup: false,
        errorPlacement: function (error, element) {
            if (element.parent(".input-group").length) {
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
            ajs.reload = true;

            ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.form_submit_response, ajs_form_handler.form_submit_response);

            return false;
        },
    });
});
