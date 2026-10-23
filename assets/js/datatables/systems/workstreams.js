var master_data_type = 'workstream';
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
        scrollY: (screen.height - 525)+'px',
        serverSide: true,
        processing: true,
        paging: true,
        responsive:false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: search
        },
        ajax: {
            url: site_url + "workstream/get_all",
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
                render: function (data, type, row) {
                    //var delete_btn = delete_icon(row.id, master_data_type);
                    var delete_btn = '';
                    return (
                        `<a data-after-load-func="workstream_edit_form" data-heading="Edit Workstream - ` + row.title + `" data-form-url="` + cdn_url + `system/` + master_data_type + `/edit/` + row.id + `" class="popup-form-button" >`+edit_icon()+`</a>${delete_btn}`
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
                name: "workstream_code",
                data: "workstream_code",
                render: function (data, type, row) {
                    return row.workstream_code;
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
                name: "description",
                data: "description",
                render: function (data, type, row) {
                    return "<span class='text-wrap'>" + row.description + "</span>";
                }
            },
            {
                name: "manager_name",
                data: "manager_name",
                render: function (data, type, row) {
                    return row.manager_name;
                }
            },
            {
                name: "position",
                data: "position"
            },
            {
                name: "color_code",
                data: "color_code",
                render: function (data, type, row) {
                    return "<span style='height:30px;width:30px;display:inline-block;background-color:" + row.color_code + "'>&nbsp;</span>";
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
}

if ($('#ajax-datatables').length)
{
    fetch_default_filter(master_data_type);
    
     var breadcrumbs = [
		{ label: "System Admin", url: "javascript: void(0);" },
		{ label: "Setup", url: "javascript: void(0);" },
		{ label: "Workstreams", url: null },
	];
	set_breadcrumb(breadcrumbs);
}

function workstream_create_form(type)
{

    if (typeof type !== 'undefined' && type == 'edit')
    {

    } else
    {
        select2_ajax('#department_id', site_url + 'department/get_all', 'title', null, 'offcanvasRight');
        select2_ajax_users('#manager_id', null, 'offcanvasRight');
    }

    ajs.mask_inputs();

    $("#addWorkstreamForm").validate({
        onkeyup: false,
        rules: {
            title: {
                required: true,
            },
            workstream_code: {
                required: true,
                noSpace: true,
                alphanumeric: true,
            },
            department_id: {
                required: true,
            },
            position: {
                required: true,
                noSpace: true,
                number: true,
            },
            manager_id: {
                required: true,
            },
        },
        messages: {
            title: "Enter Workstream Name",
            workstream_code: "Enter Code",
            department_id: "Select Department",
            position: "Enter position/Sort Order",
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

function load_workstream_data(result_json)
{
    if (ajs_form_handler.check_result(result_json))
    {
        var edit_data = result_json.message.data;
        $('#title').val(edit_data.title);
        $('#description').val(edit_data.description);
        $('#workstream_code').val(edit_data.workstream_code);
        $('#analysis_code').val(edit_data.analysis_code);
        $('#color_code').val(edit_data.color_code);
        $('#position').val(edit_data.position);

        select2_ajax('#department_id', site_url + 'department/get_all', 'title', null, 'offcanvasRight', edit_data.department_id);
        select2_ajax_users('#manager_id', null, 'offcanvasRight', edit_data.manager_id);

    } else
    {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function workstream_edit_form()
{
    workstream_create_form('edit');
    var id = $('#edit_id').val();

    ajs.ajax_form(site_url + 'workstream/get/' + id, null, 'GET', null, '1', '1', load_workstream_data, load_workstream_data);
}

// for set data on client detail page
function set_workstream_data(result_json)
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


function get_workstream_details()
{
    ajs.ajax_form(site_url + 'workstream/get/' + id, null, 'GET', null, '1', '1', set_workstream_data, set_workstream_data);

}

$(function () {
    if ($('#is_detail_page').val()) {
        get_workstream_details();
    }
});

ajs.apply_ind_roles('Masters');
