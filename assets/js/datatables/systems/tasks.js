var master_data_type = 'task_master';
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

    dataTable = new DataTable("#ajax-datatables", {
        scrollY: (screen.height - 530) + 'px',
        serverSide: true,
        processing: true,
        paging: true,
        responsive: false,
        bDestroy: true,
        pageLength: page_limit,
//        dom: "<'row'<'col-sm-12'tr>>" +
//         "<'row'<'col-sm-4'l><'col-sm-4'i><'col-sm-4'p>>",
        search: {
            search: search
        },
        ajax: {
            url: site_url + "task/get_all",
            method: "GET",
            async: false,
            dataSrc: 'message.data',
            "data": function (d) {
                return $.extend({}, d, {
                    data_filters
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr, error, code) {
                ajs.datatable_error(xhr, "ajax-datatables");
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
                    return (
                            `<a data-after-load-func="edit_form" data-heading="Edit Task - ` + row.title + `" data-form-url="` + cdn_url + `system/task/edit/` + row.id + `" class="popup-form-button" >` + edit_icon() + `</a>`
                            );
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
                name: "task_code",
                data: "task_code",
            },
            {
                name: "title",
                data: "title",
                render: function (data, type, row) {
                    var str = '';
                    str += `<div class="d-flex">
                                    <div class="avatar-group">
                                        ` + row.title + `
                                    </div>
                                </div>`;
                    return str;
                }
            },
            {
                name: "task_type",
                data: "task_type",
                render: function (data, type, row) {
                    if (row.task_type == 'I')
                    {
                        return 'Internal';
                    } else if (row.task_type == 'E')
                    {
                        return 'External';
                    }
                }
            },
            {
                name: "user_type",
                data: "user_type",
                render: function (data, type, row) {
                    if (row.user_type == 'A')
                    {
                        return 'Admin';
                    } else if (row.user_type == 'E')
                    {
                        return 'Engineer';
                    } else if (row.user_type == 'R')
                    {
                        return 'RLO';
                    }
                }
            },
            {
                name: "description",
                data: "description",
                render: function (data, type, row) {
                    return row.description;
                }
            },
            {
                name: "skill_id",
                data: "skill_id",
                render: function (data, type, row) {
                    return row.skill_name;
                }
            },
            {
                name: "service_time_name",
                data: "service_time_name",
                render: function (data, type, row) {
                    return row.service_time_name;
                }
            },
            {
                name: "sor_id",
                data: "sor_id",
                render: function (data, type, row) {
                    return row.default_sor_name;
                }
            },
        ],
        order: [
            ['1', 'desc']
        ]
    });

    $('body').tooltip({
        selector: '[data-bs-toggle="tooltip"]'
    });
}


if ($('#ajax-datatables').length)
{
    //select2_ajax('#service_id_filter', site_url + 'service/get_all', 'title', null);
    fetch_default_filter('task_master');
    var breadcrumbs = [
        {label: "System Admin", url: "javascript: void(0);"},
        {label: "Setup", url: "javascript: void(0);"},
        {label: "Tasks", url: null},
    ];
    set_breadcrumb(breadcrumbs);
}


function create_form(type)
{

    var filter = {master_code: "SERVICE_TIMES"};
    var filter2 = {master_code: "TASK_STATUSES"};
    if (typeof type !== 'undefined' && type == 'edit')
    {

    } else
    {

        //select2_ajax('#service_id', site_url + 'service/get_all', 'title', null, 'offcanvasRight');
        select2_ajax('#service_time', site_url + 'master-record/get_all', 'master_value', filter, 'offcanvasRight');
        select2_ajax('#skill_id', site_url + 'skill/get_all', 'title', null, 'offcanvasRight');
        // select2_ajax('#sor_id', site_url + 'sor/get_all', 'sor_code', {sor_type: 51}, 'offcanvasRight');
        // select2_ajax('#allowed_statuses', site_url + 'task-status/get_all', 'title', null, 'offcanvasRight');
        add_autocomplete_custom_dropdown('#sor_id', site_url + 'sor/get_all_dropdown', ["sor_code"], {sor_type: 51}, 'offcanvasRight');
    }

    ajs.mask_inputs();

    $("#addServiceForm").validate({
        onkeyup: false,
        ignore: [],
        rules: {
            title: {
                required: true,
            },
            task_code: {
                required: true,
                noSpace: true,
                //alphanumeric: true,
            },
            service_time: {
                required: true,
            },
            task_type: {
                required: true,
            },
            user_type: {
                required: true,
            },
            "allowed_statuses[]": {
                required: true,
            },
        },
        messages: {
            "allowed_statuses[]": "Select atleast one status",
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
            ajs.ajax_form(action, post_data, method, null, '1', '1', ajs_form_handler.offcanvas_form, ajs_form_handler.offcanvas_form);
            return false;
        }
    });

}


$('#allowed_statuses').on('change', function () {
    $(this).valid();
});


function load_view_data(result_json)
{
    if (ajs_form_handler.check_result(result_json))
    {
        var edit_data = result_json.message.data;
        $('#title').val(edit_data.title);
        $('#description').val(edit_data.description);
        $('#task_code').val(edit_data.task_code);
        $('#task_type').val(edit_data.task_type);


        $('#task_type').trigger("change");

        //select2_ajax('#service_id', site_url + 'service/get_all', 'title', null, 'offcanvasRight', edit_data.service_id);
        select2_ajax('#skill_id', site_url + 'skill/get_all', 'title', null, 'offcanvasRight', edit_data.skill_id);

        $('#user_type').val(edit_data.user_type).trigger("change");

        if (edit_data.require_external_task == '1')
        {
            $('#require_external_task').prop('checked', true);
        }


        var filter = {master_code: "SERVICE_TIMES"};
        var filter2 = null;
        if (edit_data.task_type == 'I')
        {
            filter2 = {status_for: "W"};
        }
        if (edit_data.task_type == 'E')
        {
            filter2 = {status_for: "M"};
        }
        select2_ajax('#service_time', site_url + 'master-record/get_all', 'master_value', filter, 'offcanvasRight', edit_data.service_time);
        if (typeof edit_data.allowed_statuses == 'undefined' || edit_data.allowed_statuses == null || edit_data.allowed_statuses == '')
        {
            select2_ajax('#allowed_statuses', site_url + 'task-status/get_all', 'title', filter2, 'offcanvasRight');
        } else
        {
            select2_ajax('#allowed_statuses', site_url + 'task-status/get_all', 'title', filter2, 'offcanvasRight', edit_data.allowed_statuses.split(','));
        }
        // select2_ajax('#sor_id', site_url + 'sor/get_all', 'sor_code', null, 'offcanvasRight', edit_data.sor_id);
        add_autocomplete_custom_dropdown('#sor_id', site_url + 'sor/get_all_dropdown', ["sor_code"], null, 'offcanvasRight',edit_data.sor_id,null,site_url + 'sor/get/'+edit_data.sor_id);
    } else
    {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function edit_form()
{
    create_form('edit');
    var id = $('#edit_id').val();
    ajs.apply_ind_roles('Masters');
    ajs.ajax_form(site_url + 'task/get/' + id, null, 'GET', null, '1', '1', load_view_data, load_view_data);
}

// for set data on client detail page
function set_view_data(result_json)
{
    if (ajs_form_handler.check_result(result_json))
    {
        var client = result_json.message.data;
        $('#detail_registration_no').text(client.registration_no);
        $('#detail_company_name').html(client.company_name);
        $('#company_name_header').html(client.company_name);
        $('#detail_vat_no').html(client.vat_no);
        $('#detail_client_code').html(client.client_code);
        $('#detail_client_type').html(client.client_type_name);
        $('#detail_client_role').html(client.client_role);
        $('#detail_address1').html(client.address1);
        $('#detail_address2').html(client.address2);
        $('#detail_area').html(client.area);
        $('#detail_city').html(client.city);
        $('#detail_postalcode').html(client.postalcode);
        $('#detail_email').html(client.email);
        $('#detail_email').attr('href', 'mailto:' + client.email);
        $('#detail_mobile_number').html(client.phone_number);
        $('#detail_mobile_number').attr('href', 'tel:' + client.phone_number);
        $('#detail_telephone_number').html(client.telephone_number);
        $('#detail_telephone_number').attr('href', 'tel:' + client.telephone_number);

        if (typeof client.client_contacts !== 'undefined') {
            var contactHtml = format_contacts(client.client_contacts);
            $("#contacts").html(contactHtml);
        }

        if (client.client_ajs_contacts) {
            var contactHtml = format_contacts(client.client_ajs_contacts);
            $("#ajs_contacts").html(contactHtml);
        }
    } else
    {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}


function get_details()
{
    ajs.ajax_form(site_url + 'service/get/' + id, null, 'GET', null, '1', '1', set_view_data, set_view_data);

}

$(function () {
    if ($('#is_detail_page').val()) {
        get_details();
    }
});

$(document).on("change", "#task_type", function () {
    var val = $(this).val();
    setSelectedByText('#skill_id', '');
    $('.skill-div').css('display', '');
    $('#require_external_task').prop('checked', false);
    $('#require_external_task').attr('disabled', false);
    if ($('#allowed_statuses').hasClass('select2-hidden-accessible'))
    {
        $("#allowed_statuses").select2("destroy");
        $('#allowed_statuses').find('option:not(:first)').remove();
    }
    if (val == 'I')
    {
        $('#user_type').val('A');
        select2_ajax('#allowed_statuses', site_url + 'task-status/get_all', 'title', {status_for: "W"}, 'offcanvasRight');
        setSelectedByText('#skill_id', 'Admin');
        $('#require_external_task').prop('checked', true);
        $('#require_external_task').attr('disabled', true);
    }
    if (val == 'E')
    {
        $('#user_type').val('E');
        $('.skill-div').css('display', 'none');
        select2_ajax('#allowed_statuses', site_url + 'task-status/get_all', 'title', {status_for: "M"}, 'offcanvasRight');
    }

    selectAllOptions('#allowed_statuses');
});

$(document).on("change", "#user_type", function () {
    setSelectedByText('#skill_id', 'RLO');
    $('.skill-div').css('display', '');
});

function setSelectedByText(element, text) {
    let value = null;

    $(element).find('option').each(function () {
        if ($(this).text() === text) {
            value = $(this).val();
        }
    });

    if (value) {
        $(element).val(value).trigger('change');
    } else
    {
        $(element).val('').trigger('change');
    }
}

function selectAllOptions(selectElement) {
    let allValues = [];
    $(selectElement).find('option').each(function () {
        allValues.push($(this).val());
    });

    $(selectElement).val(allValues).trigger('change');
    $(selectElement).prop('readonly', true);

    $(selectElement).next('.select2-container').addClass('select2-readonly');
}

ajs.apply_ind_roles('Masters');