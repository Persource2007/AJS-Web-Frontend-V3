var master_data_type = 'master';
dataTable = null;
function load_data_table(data)
{
    $('#master-div').html('');
    if (ajs_form_handler.check_result(data))
    {

        $.each(data.message.data, function (index, element) {
            $('#master-div').append(`<div class="col-lg-3 col-md-6 mb-3">
                                                <a href="` + cdn_url + `system/master/` + ajs.hash_encode(element.id) + `/list">
                                                    <div class="card master-card">
                                                        <div class="card-body card-inner">
                                                            <div class="d-flex align-items-center">
                                                                <div class="flex-grow-1 ms-3">
                                                                    <p class="text-uppercase fw-semibold fs-13 mb-1">` + element.title + `</p>
                                                                    <h4 class=" mb-0"><span class="counter-value" data-target="` + element.master_childs + `">0</span></h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>`);
        });
    }

}

function load_masters()
{
    ajs.ajax_form(site_url + master_data_type + '/get_all/?order_by=title&order_type=ASC', null, 'GET', null, '1', '1', load_data_table, load_data_table);
    
     var breadcrumbs = [
		{ label: "System Admin", url: "javascript: void(0);" },
		{ label: "Setup", url: "javascript: void(0);" },
		{ label: "Masters", url: null },
	];
	set_breadcrumb(breadcrumbs);
}


function create_form(type)
{
    $("#addForm").closest('.offcanvas').addClass('custom-offcanvas-right2').removeClass('custom-offcanvas-right');
    ajs.mask_inputs();
    
    select2_ajax('#parent_id', site_url + 'master/get_all', 'title', null, 'offcanvasRight');

    $("#addForm").validate({
        onkeyup: false,
        rules: {
            title: {
                required: true,
            },
            master_code: {
                required: true,
                noSpace: true,
            },
        },
        messages: {
            title: "Enter Name",
            master_code: {required: "Enter Code", noSpace: "Spaces are not allowed", alphanumeric: "Alphanumeric only"},
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
            load_masters();
            return false;
        }
    });

}

load_masters();

function load_view_data(result_json)
{
    if (ajs_form_handler.check_result(result_json))
    {
        var edit_data = result_json.message.data;
        $('#title').val(edit_data.title);
        $('#description').val(edit_data.description);
        $('#service_code').val(edit_data.service_code);
        $('input[name="appointment_required"][value="' + edit_data.appointment_required + '"]').prop('checked', true);

    } else
    {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function edit_form()
{
    create_form('edit');
    var id = $('#edit_id').val();

    ajs.ajax_form(site_url + 'master/get/' + id, null, 'GET', null, '1', '1', load_view_data, load_view_data);
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
    ajs.ajax_form(site_url + 'master/get/' + id, null, 'GET', null, '1', '1', set_view_data, set_view_data);

}

$(function () {
    if ($('#is_detail_page').val()) {
        get_details();
    }
    ajs.apply_ind_roles('Masters');
});
