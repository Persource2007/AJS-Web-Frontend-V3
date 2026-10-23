var master_data_type = 'service';
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
        search: {
            search: search
        },
        // dom: 'Bfrtip',
        ajax: {
            url: site_url + "service/get_all",
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
                    //var delete_btn = delete_icon(row.id, master_data_type);
                    var delete_btn = '';
                    return (
                        `<a data-after-load-func="edit_form" data-heading="Edit Job Type - ` + row.title + `" data-form-url="` + cdn_url + `system/` + master_data_type + `/edit/` + row.id + `"  class="popup-form-button" >`+edit_icon()+`</a>${delete_btn}`
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
                name: "service_code",
                data: "service_code",
                render: function (data, type, row) {
                    return row.service_code;
                }
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
                name: "workstream_id",
                data: "workstream_id",
                render: function (data, type, row) {
                    return row.workstream_name;
                }
            },
            {
                name: "service_type",
                data: "service_type",
                render: function (data, type, row) {
                    if (row.service_type == 'R')
                    {
                        return 'Reactive';
                    } else if (row.service_type == 'P')
                    {
                        return 'Planned';
                    }
                }
            },
            {
                name: "service_skill_names",
                data: "service_skill_names",
                render: function (data, type, row) {
                    if (row.service_skill_count > 0)
                    {
                        return `<a href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="` + row.service_skill_names + `">` + row.service_skill_count + `</a>`;
                    } else
                    {
                        return '';
                    }
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
                name: "target_time_name",
                data: "target_time_name",
                render: function (data, type, row) {
                    return row.target_time_name;
                }
            },
            {
                name: "default_sor",
                data: "default_sor",
                render: function (data, type, row) {
                    return row.default_sor_name;
                }
            },
            {
                name: "certificates",
                data: "certificates",
                render: function (data, type, row) {
                    if (row.service_certificate_count > 0)
                    {
                        return `<a href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="` + row.service_certificate_names + `">` + row.service_certificate_count + `</a>`;
                    } else
                    {
                        return '';
                    }
                }
            },
            {
                name: "appointment_required",
                data: "appointment_required",
                render: function (data, type, row) {
                    if (row.appointment_required == '1')
                    {
                        return 'Yes';
                    }
                    return "No";
                }
            },
            
        ],
        order: [
            ['1', 'desc']
        ],
        drawCallback: function () {
            ajs.apply_ind_roles("Masters");
        }
    });

    $('body').tooltip({
        selector: '[data-bs-toggle="tooltip"]'
    });

    dataTable.buttons().container().appendTo($('#datatable_buttons'));
}


if ($('#ajax-datatables').length)
{
    select2_ajax('#workstream_id_filter', site_url + 'workstream/get_all', 'title', null);
    setTimeout(function () {
        fetch_default_filter(master_data_type);
    }, 500);
     var breadcrumbs = [
		{ label: "System Admin", url: "javascript: void(0);" },
		{ label: "Setup", url: "javascript: void(0);" },
		{ label: "Job Types", url: null },
	];
	set_breadcrumb(breadcrumbs);
}


function create_form(type)
{

    var filter = {master_code: "SERVICE_TIMES"};
    var filter2 = {master_code: "TARGET_TIMES"};
    var filter3 = {master_code: "TARGET_ATTEND_TIME"};
    if (typeof type !== 'undefined' && type == 'edit')
    {

    } else
    {

        select2_ajax('#workstream_id', site_url + 'workstream/get_all', 'title', null, 'offcanvasRight');
        select2_ajax('#service_time', site_url + 'master-record/get_all', 'master_value', filter, 'offcanvasRight');
        select2_ajax('#target_time', site_url + 'master-record/get_all', 'master_value', filter2, 'offcanvasRight');
        select2_ajax('#target_attend_time', site_url + 'master-record/get_all', 'master_value', filter3, 'offcanvasRight');
        select2_ajax('#skills', site_url + 'skill/get_all', 'title', null, 'offcanvasRight');
        // select2_ajax('#default_sor', site_url + 'sor/get_all', 'sor_code', null, 'offcanvasRight');

        add_autocomplete_custom_dropdown('#default_sor', site_url + 'sor/get_all_dropdown', ["sor_code"], null, 'offcanvasRight');

        select2_ajax('#certificate_id', site_url + 'certificate/get_all', 'title', null, 'offcanvasRight');
        select2_ajax('#allowed_tasks', site_url + 'task/get_all', 'title', null, 'offcanvasRight');
    }
    
    get_extra_fields();
    
    ajs.mask_inputs();

    $("#addServiceForm").validate({
        onkeyup: false,
        rules: {
            title: {
                required: true,
            },
            service_code: {
                required: true,
                noSpace: true,
                alphanumeric: true,
            },
            workstream_id: {
                required: true,
            },
            service_time: {
                required: true,
            },
            service_type: {
                required: true,
            },
            target_time: {
                required: true,
            },
            default_sor: {
                // required: true,
            },
            "skills[]": {
                required: true,
            },
            //"certificate_id[]": {
            //    required: true,
            //},
        },
        messages: {
            title: "Enter Job Type Name",
            service_code: "Enter Job Type Code",
            service_type: "Select an Option",
            workstream_id: "Select Workstream",
            service_time: "Select Fix Time",
            target_time: "Select Target Time",
            default_sor: "Select Default SOR",
            "skills[]": "Select atleast one skill",
            "certificate_id[]": "Select Certificate",
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

function load_view_data(result_json)
{
    if (ajs_form_handler.check_result(result_json))
    {
        var edit_data = result_json.message.data;
        $('#title').val(edit_data.title);
        $('#description').val(edit_data.description);
        $('#service_code').val(edit_data.service_code);
        $('#service_type').val(edit_data.service_type);
        $('#asset_type').val(edit_data.asset_type);
        $('#test_completion_percentage').val(edit_data.test_completion_percentage);
        $('input[name="appointment_required"][value="' + edit_data.appointment_required + '"]').prop('checked', true);
        $('input[name="geo_fencing"][value="' + edit_data.geo_fencing + '"]').prop('checked', true);
        $('input[name="send_survey"]').prop('checked', false);
        $('input[name="send_survey"][value="' + (edit_data.send_survey !== null && edit_data.send_survey !== undefined ? edit_data.send_survey : '1') + '"]').prop('checked', true);

        if (typeof edit_data.certificates !== 'undefined')
        {
            $.each(edit_data.certificates, function (index, element) {
                var parent_div = 'service_create_certificate_form';
                var input_div = 'certificate_input_field_div';
                var length = $('.' + input_div).length;
                var cert_template = $('#certificate_input_field_template');
                var data = cert_template.length ? cert_template.clone().removeAttr('id') : $("." + input_div + ":last").eq(0).clone();
                data.css('display', '');
                data.addClass(input_div + '_' + length);

                data.find("input[name='is_new_certificate[]']").val('0');
                data.find("input[name='service_certificate_id[]']").val(element.id);
                data.find("button.remove-parent-btn").attr('data-id', element.id);
                data.find("button.remove-parent-btn").attr('data-remove', 'service-certificate');
                data.find("button.remove-parent-btn").attr('data-remove-url', site_url + 'service/certificate/delete/' + element.id);

                $('#' + parent_div).append(data);
                $('.' + input_div + '_' + length).find('.certificate_id').addClass('certificate_id_' + length);
                $('.' + input_div + '_' + length).find('.certificate_required').addClass('certificate_required_' + length);
                //$('.' + input_div + '_' + length).find('.certificate-required-radio').attr('name', 'certificate_required[' + length + ']');
                $('.certificate_required_' + length).val(element.is_required);
                select2_ajax($('.certificate_id_' + length), site_url + 'certificate/get_all', 'title', null, 'offcanvasRight', element.certificate_id);
            });
        }

        select2_ajax('#workstream_id', site_url + 'workstream/get_all', 'title', null, 'offcanvasRight', edit_data.workstream_id);

        var filter = {master_code: "SERVICE_TIMES"};
        var filter2 = {master_code: "TARGET_TIMES"};
        var filter3 = {master_code: "TARGET_ATTEND_TIME"};
        select2_ajax('#service_time', site_url + 'master-record/get_all', 'master_value', filter, 'offcanvasRight', edit_data.service_time);
        select2_ajax('#target_time', site_url + 'master-record/get_all', 'master_value', filter2, 'offcanvasRight', edit_data.target_time);
        select2_ajax('#target_attend_time', site_url + 'master-record/get_all', 'master_value', filter3, 'offcanvasRight', edit_data.target_attend_time);
        if (typeof edit_data.service_skill_ids == 'undefined' || edit_data.service_skill_ids == null || edit_data.service_skill_ids == '')
        {
            select2_ajax('#skills', site_url + 'skill/get_all', 'title', null, 'offcanvasRight');
        } else
        {
            select2_ajax('#skills', site_url + 'skill/get_all', 'title', null, 'offcanvasRight', edit_data.service_skill_ids.split(','));
        }
        if (typeof edit_data.service_task_ids == 'undefined' || edit_data.service_task_ids == null || edit_data.service_task_ids == '')
        {
            select2_ajax('#allowed_tasks', site_url + 'task/get_all', 'title', null, 'offcanvasRight');
        } else
        {
            select2_ajax('#allowed_tasks', site_url + 'task/get_all', 'title', null, 'offcanvasRight', edit_data.service_task_ids.split(','));
        }
        // select2_ajax('#default_sor', site_url + 'sor/get_all', 'sor_code', null, 'offcanvasRight', edit_data.default_sor);
        add_autocomplete_custom_dropdown('#default_sor', site_url + 'sor/get_all_dropdown', ["sor_code"], null, 'offcanvasRight',edit_data.default_sor,null,site_url + 'sor/get/'+edit_data.default_sor);
        
        //$("#workstream_id").select2("disabled", true);
        if(edit_data.in_used) {
            $('#workstream_id').attr('readonly', 'readonly');
            $('#service_type').attr('disabled', 'disabled');
            $('#asset_type').attr('disabled', 'disabled');
        }
        
        get_extra_fields();

    } else
    {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function edit_form()
{
    create_form('edit');
    var id = $('#edit_id').val();

    ajs.ajax_form(site_url + 'service/get/' + id, null, 'GET', null, '1', '1', load_view_data, load_view_data);
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

$(document).on("change", "#service_type", function () {
    get_extra_fields();
});


function get_extra_fields()
{
    var service_type = $('#service_type').val();
    $('.service-type-extra').css('display', 'none');
    if (service_type == 'P')
    {
        $('.service-type-extra').css('display', '');
    } else if (service_type == 'R')
    {

    }
}




ajs.apply_ind_roles('Masters');