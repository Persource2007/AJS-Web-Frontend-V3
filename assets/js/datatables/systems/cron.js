dataTable = null;
function load_data_table(limit, search_term, filters)
{
    data_filters = '';
    page_limit = ajs.datatable_limit;
    search = '';
    if (typeof filters != 'undefined' && (typeof filters['filters'] !== 'undefined' || filters['filters'] != null))
    {
        data_filters = filters['filters'];
    }
    if (typeof limit !== 'undefined' || limit != null)
    {
        page_limit = limit;
    }
    if (typeof search_term !== 'undefined' || search_term != null)
    {
        search = search_term;
    }

    dataTable = new DataTable("#settings-datatables", {
        scrollY: (screen.height - 530) + 'px',
        serverSide: true,
        processing: true,
        paging: true,
        responsive: false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: search
        },
        ajax: {
            url: site_url + "cron/get_all",
            method: "GET",
            async: false,
            dataSrc: 'data',
            "data": function (d) {
                return $.extend({}, d, {
                    data_filters
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr, error, code) {
                ajs.datatable_error(xhr, "settings-datatables");
            }
        },
        language: {
            emptyTable: "No data found",
        },
        columns: [
            {
                data: null,
                sortable: false,
                searchable: false,
                render: function (data, type, row) {
                    return `<a data-after-load-func="edit_form" data-heading="Edit Scheduled Job - ` + row.command + `" data-form-url="` + cdn_url + `system/scheduled-jobs/edit/` + row.id + `" class="popup-form-button">` + edit_icon() + `</a>`;
                }
            },
            {
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
                render: function (data, type, row) {
                    return row.id;
                }
            },
            {
                name: "command",
                data: "command",
            },
            {
                name: "parameters",
                data: "parameters",
            },
            {
                name: "schedule",
                data: "schedule",
            },
            {
                name: "specific_time",
                data: "specific_time",
                render: function (data) {
                    return ajs.convert_time_utc_to_local(data);
                }
            },
            {
                name: "last_run",
                data: "last_run",
                render: function (data, type, row) {
                    return ajs.format_datetime(row.last_run);
                }
            }
        ],
        order: [
            ['1', 'asc']
        ],
        drawCallback: function () {
            ajs.apply_ind_roles("Settings");
        }
    });

    $('body').tooltip({
        selector: '[data-bs-toggle="tooltip"]'
    });
}


if ($('#settings-datatables').length)
{
    fetch_default_filter('settings');

    var breadcrumbs = [
        {label: 'System Admin', url: 'javascript: void(0);'},
        {label: 'Setup', url: 'javascript: void(0);'},
        {label: 'Scheduled Jobs', url: null},
    ];
    set_breadcrumb(breadcrumbs);
}


function create_form(type)
{

    $("#settingForm").validate({
        onkeyup: false,
        rules: {
            schedule: {
                required: true
            }
        },
        errorPlacement: function (error, element) {
            if (element.hasClass("select2") && element.next(".select2-container").length)
            {
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

            // Convert the entered local time back to UTC before saving
            // (the listing renders specific_time as UTC -> local).
            var local_time = $('#specific_time').val();
            var utc_time = local_time ? ajs.convert_time_local_to_utc(local_time) : '';

            var post_data = $(form).serializeArray();
            post_data = post_data.filter(function (f) { return f.name !== 'specific_time'; });
            post_data.push({ name: 'specific_time', value: utc_time });
            post_data = $.param(post_data);

            ajs.ajax_form(action, post_data, method, null, '1', '1', ajs_form_handler.offcanvas_form, ajs_form_handler.offcanvas_form);
            return false;
        }
    });

}

function load_cron_data(result_json)
{
    if (ajs_form_handler.check_result(result_json))
    {
        var cron = result_json.data;
        $('#command').val(cron.command);
        $('#schedule').val(cron.schedule);
        // Stored specific_time is UTC -> show in local time (HH:mm for <input type=time>)
        $('#specific_time').val(cron.specific_time ? ajs.convert_time_utc_to_local(cron.specific_time, 'HH:mm') : '');
    } else
    {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function edit_form()
{
    create_form('edit');
    var id = $('#edit_id').val();

    ajs.ajax_form(site_url + 'cron/get/' + id, null, 'GET', null, '1', '1', load_cron_data, load_cron_data);
}


$(function () {
    ajs.apply_ind_roles('Settings');
});

