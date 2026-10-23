dataTable = null;
var master_data_type = 'client';
var breadcrumbs = [
    {label: 'Clients', url: null}
];
function load_data_table(limit, search_term, filters)
{
    data_filters = {};
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
        scrollY: (screen.height - 450) + 'px',
        scrollX: true,  
        autoWidth: false,
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
        // buttons: [
        //     'excel',
        //     {
        //         extend: 'colvis',
        //         text: '<i class="fa fa-cog"></i>', // FontAwesome settings icon
        //         className: 'custom-colvis-btn', // Custom CSS class
        //         titleAttr: 'Show/Hide Columns',
        //         position: 'last'
        //     }
        // ],
        
        ajax: {
            url: site_url + "client/get_all",
            method: "get",
            async: false,
            dataSrc: 'message.data',
            "data": function (d) {
                return $.extend({}, d, {
                    data_filters
                });
            },
            "error": function (xhr, error, thrown) {
                ajs.datatable_error(xhr, "ajax-datatables");
                if (xhr.status !== 200) {
                    $('#ajax-datatables').html('<p>No data found.</p>'); // Display "No data found" message if 404 error
                }
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            }
        },
        language: {
            emptyTable: "No data found",
        },
        columns: [

            {
                data: null,
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                    return (
                            `<a href="` + cdn_url + `clients/details/` + ajs.hash_encode(row.id) + `" >` + view_icon() + `</a>
                        <a data-after-load-func="client_edit_form" data-heading="Edit Client - ` + row.company_name + `" data-form-url="` + cdn_url + `clients/edit/` + row.id + `" class="popup-form-button" >` + edit_icon() + `</a>`                        
                        + detail_icon()
                    );
                }
            },
            // {
            //     data: null,
            //     className: "details-control",
            //     orderable: false,
            //     searchable: false,
            //     defaultContent: '<i class="ri-arrow-down-s-line align-bottom"></i>',
            // },
            {
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
                render: function (data, type, row) {
                    return row.id;
                }
            }
            ,
            {
                name: "company_name",
                data: "company_name",
                render: function (data, type, row) {
                    var str = '';
                    var img_src = cdn_url + `assets/images/users/avatar-3.jpg`;
                    if (row.profile_pic) {
                        img_src = s3_url + '/' + row.profile_pic;
                    }
                    str += `<a href="` + cdn_url + `clients/details/` + ajs.hash_encode(row.id) + `" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="` + row.company_name + `">${data}</a>`;
                    return str;
                }
            },
            {data: 'client_code', name: "client_code"},
            // {data: 'registration_no', name: "registration_no"},
            // {data: 'vat_no', name: "vat_no"},
            {data: 'tag_name', name: "tag_name"},
            {data: 'client_type_name', name: "client_type_name"},
            {
                name: "address1",
                data: "address1",
                render: function (data, type, row) {
                    var addr = row.address1;
                    if (row.address2) {
                        addr += ", " + row.address2;
                    }
                    return truncate_string(addr, 25);
                }
            },
            //{data: 'city_name', name: "city_name"},
            {data: 'postalcode', name: "postalcode"},
            // {
            //     name: "email",
            //     data: "email",
            //     render: function (data, type, row) {
            //         return "<a href='mailto:" + row.email + "'>" + row.email + "</a>";
            //     }
            // },
            // {data: 'phone_number', name: "phone_number"},
            {
                name: "added_by",
                data: "added_by",
                render: function (data, type, row) {
                    return row.added_by_name;
                }
            },
            {
                name: "add_date",
                data: "add_date",
                render: function (data, type, row) {
                    return ajs.format_date(row.add_date);
                }
            },
            {
                name: "status",
                data: "status",
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                    return (data == 1)
                        ? '<span class="badge border border-success text-success">Active</span>'
                        : '<span class="badge border border-danger text-danger">Inactive</span>';
                }
            }
        ],
        order: [
            ['1', 'desc']
        ],
        drawCallback: function () {
            ajs.apply_ind_roles("Clients");
        }
    });    
    dataTable.setDetailRow = function (rowData) {

        var contactHtml = "";
        $.each(rowData.client_contacts, function (index, contact) {
            contactHtml += `<tr>
                            <td>` + contact.contact_type_name + `</td>
                            <td>` + contact.first_name + ' ' + contact.last_name + `</td>
                            <td>` + contact.email + `</td>
                            <td>` + contact.mobile + `</td>
                            <td>` + contact.telephone + `</td>
                        </tr>`;
        });

        if (contactHtml == "") {
            contactHtml = "<td colspan='5' align='center'> Data Not Available</td>";
        }
        return `
            <div class="details-row row client-details-row">
                <div class="col-md-2">
                    <p>Telephone: ${rowData.telephone_number ?? ''}</p>
                    <p>Fax: ${rowData.fax_number ?? ''}</p>
                    <p>Website: ${rowData.website ?? ''}</p>
                </div>
                <div class="col-md-10">
                    <table class="table mb-0">
                        <thead>
                            <tr>
                            <th>Client Contact</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Telephone</th>
                            </tr>
                        </thead>
                        <tbody>${contactHtml}</tbody>
                    </table>
                </div>
            </div>
        `;
    }
}


if ($('#ajax-datatables').length)
{
    //select2_ajax('#city_filter', site_url + 'cities/get_all', 'title', null);
    select2_ajax('#client_type_filter', site_url + 'master-record/get_all', 'master_value', {"masters.master_code": "CLIENT_TYPE", 'master_values.status': '1'});
    fetch_default_filter(master_data_type);
    set_breadcrumb(breadcrumbs);
}

function client_create_form(type)
{

    var filter = {"masters.master_code": "CLIENT_TYPE", 'master_values.status': '1'};
    var filter2 = {"masters.master_code": "CONTACT_TYPE", 'master_values.status': '1'};
    var filter3 = {"masters.master_code": "PREFERRED_CONTACT_MODE", 'master_values.status': '1'};
    var filter4 = {"masters.master_code": "USER_TYPES", 'master_values.status': '1'};
    var filter5 = {"module": "client"};
    if (typeof type !== 'undefined' && type == 'edit')
    {

    } else
    {
        // add_autocomplete_sel('#account_manager', 'users', ['first_name', 'last_name'], null, null, 'offcanvasRight');
        select2_ajax('#client_type', site_url + 'master-record/get_all', 'master_value', filter, 'offcanvasRight');
        //select2_ajax('#city', site_url + 'cities/get_all', 'title', null, 'offcanvasRight');
        select2_ajax('#client_role', site_url + 'role/get_all', 'title', null, 'offcanvasRight');
        select2_ajax('#contact_type', site_url + 'master-record/get_all', 'master_value', filter2, 'offcanvasRight');
        //    select2_ajax('#preferred_mode_of_contact', site_url + 'master-record/get_all', 'master_value', filter3, 'offcanvasRight');
        select2_ajax('#ajs_contact_type', site_url + 'master-record/get_all', 'master_value', filter4, 'offcanvasRight');
        select2_ajax('#tags', site_url + 'tag/get_all', 'title', filter5, 'offcanvasRight');

        $('#ajs_contact_type').on('change', function () {
            var contact_type = $(this).val();
            if ($('#account_manager').data('select2')) {
                $('#account_manager').val('').trigger('change'); // Destroy Select2 instance
                $('#account_manager').select2('destroy'); // Destroy Select2 instance

            }
            //add_autocomplete_sel($('#account_manager'), 'users', ['first_name', 'last_name'], null, {user_type: contact_type}, 'offcanvasRight');
            select2_ajax_users('#account_manager', {user_type: contact_type}, "offcanvasRight");
        });
    }

    ajs.mask_inputs();
    ajs.apply_ind_roles("Clients");
    $("#addClientForm").validate({
        onkeyup: false,
        rules: {
            // registration_no: {
            //     required: true,
            // },
            // vat_no: {
            //     required: true,
            // },
            client_code: {
                required: true,
            },
//            client_uprn: {
//                required: true,
//            },
//            client_type: {
//                required: true,
//            },
            company_name: {
                required: true,
            },
            address1: {
                required: true,
            },
            // city: {
            //     required: true,
            // },
            postalcode: {
                required: true,
            },
            // email: {
            //     required: true,
            //     email: true,
            // },
            // mobile_number: {
            //     required: true,
            // },
            // telephone_number: {
            //     required: true,
            // },
            create_login: {
                required: true,
            },
            client_role: {
                required: function () {
                    // return true or false depending on whether it's required or not
                    return $('input[name="create_login"]:checked').val() == 1;
                }
            },
            client_username: {
                required: function () {
                    // return true or false depending on whether it's required or not
                    return $('input[name="create_login"]:checked').val() == 1;
                }
            },
        },
        messages: {
            registration_no: "Enter Company registration number",
            vat_no: "Enter VAT number",
            client_code: "Enter client code",
            client_uprn: "Enter client UPRN no.",
            client_type: "Select client type",
            company_name: "Enter company name",
            address1: "Address1 is required",
            city: "Enter Town",
            postalcode: "Enter postal code",
            email: "Enter valid Email Id",
            mobile_number: "Enter mobile number",
            telephone_number: "Enter telephone number",
            create_login: "This field is required",
            client_role: "Select a role",
            client_username: "Username is required in order to create a login account",
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
            // Validate: at least one client contact must have both First Name and Email
            var hasValidContact = false;
            var fnames = $(form).find('[name="contact_fname[]"]');
            fnames.each(function (i) {
                var fname = $.trim($(this).val());
                var email = $.trim($(form).find('[name="contact_email[]"]').eq(i).val());
                if (fname !== '' && email !== '') {
                    hasValidContact = true;
                    return false; // break each
                }
            });

            if (!hasValidContact) {
                // Show inline errors on the first contact row's empty fields,
                // styled identically to jQuery Validate's own error labels
                $(form).find('label.contact-field-error').remove();
                var firstFname = $(form).find('[name="contact_fname[]"]').first();
                var firstEmail = $(form).find('[name="contact_email[]"]').first();
                if ($.trim(firstFname.val()) === '') {
                    $('<label class="error contact-field-error">First Name is required.</label>').insertAfter(firstFname);
                }
                if ($.trim(firstEmail.val()) === '') {
                    $('<label class="error contact-field-error">Email is required.</label>').insertAfter(firstEmail);
                }
                return false;
            }

            // Clear any previous contact errors on successful validation
            $(form).find('label.contact-field-error').remove();

            var sub_button = $(form).find(':submit');
            ajs.submit_button_element = sub_button;
            var action = $(form).attr('action');
            var method = $(form).attr('method');
            var post_data = $(form).serialize();

            ajs.ajax_form(action, post_data, method, null, '1', '1', ajs_form_handler.offcanvas_form, ajs_form_handler.offcanvas_form);

            if ($('#is_detail_page').val())
            {
                $.getScript(cdn_url + "assets/js/datatables/clients/client-details.js", function () {
                    ajs.refreshDetailData = get_client_details;
                });
            }
            return false;

        }
    });

    // Clear the inline contact error label when the user starts filling in the field
    $(document).on('input', '[name="contact_fname[]"], [name="contact_email[]"]', function () {
        $(this).next('label.contact-field-error').remove();
    });

    $(document).on('change', '.login-check-radio', function (e) {
        var sel = $(this).val();
        $('.role-div').css('display', 'none');
        if (sel == '1')
        {
            var fname = $('#first_name').val();
            var lname = $('#last_name').val();
            if (fname != '' && lname != '')
            {
                ajs.generate_username(fname, lname, 'client_username');
            }
            $('.role-div').css('display', '');
        }
    });

}

function load_client_data(result_json)
{
    if (ajs_form_handler.check_result(result_json))
    {
        var client = result_json.message.data;
        $('#client_status').prop('checked', client.status == 1);
        // Status changes on edit fire the change-status endpoint (cascade-safe); the select has no name so it's not submitted with the form.
        $(document).off('change.client_status').on('change.client_status', '#client_status', function () {
            var id = $('#edit_id').val();
            if (!id) return;
            ajs.ajax_form(site_url + 'client/change-status/' + id, null, 'GET', null, '1', '1',
                function (r) { ajs.refreshDataTable(); },
                function (r) { ajs_form_handler.show_errors_offcanvas(r); }
            );
        });
        $('#registration_no').val(client.registration_no);
        $('#vat_no').val(client.vat_no);
        $('#first_name').val(client.first_name);
        $('#last_name').val(client.last_name);
        $('#client_code').val(client.client_code);
        $('#client_uprn').val(client.client_uprn);
        $('#client_type').val(client.client_type);
        $('#company_name').val(client.company_name);
        $('#address1').val(client.address1);
        $('#address2').val(client.address2);
        $('#area').val(client.area);
        $('#city').val(client.city);
        $('#postalcode').val(client.postalcode);
        $('#telephone').val(client.telephone_number);
        $('#fax').val(client.fax_number);
        $('#website').val(client.website);
        // $('#email').val(client.email);
        // $('#mobile_number').val(client.phone_number);
        // $('#telephone_number').val(client.telephone_number);
        $('#client_username').val(client.login_username);
        $('#client_username').attr('readonly', 'readonly');

        if (client.profile_pic) {
            $("#profile-preview").attr('src', s3_url + '/' + client.profile_pic);
        }

        if (typeof client.role_id !== 'undefined' && client.role_id > 0)
        {
            $('.role-div').css('display', '');
            $('input[name="create_login"][value="1"]').prop('checked', true);
        }

        if (client.client_ajs_contacts == false) {
            $('.add-ajs-contacts').trigger('click');
        }

        if (typeof client.client_ajs_contacts !== 'undefined')
        {
            $.each(client.client_ajs_contacts, function (index, element) {
                var parent_div = 'client_create_ajs_contact_form';
                var input_div = 'contact_ajs_input_field_div';
                var length = $('.' + input_div).length;
                var data = $("." + input_div + ":last").eq(0).clone();
                data.css('display', '');
                data.addClass(input_div + '_' + length);

                data.find("input[name='is_new[]']").val('0');
                data.find("input[name='ajs_contact_id[]']").val(element.id);
                data.find("button.remove-parent-btn").attr('data-id', element.id);
                data.find("button.remove-parent-btn").attr('data-remove', 'client-ajs-contacts');
                data.find("button.remove-parent-btn").attr('data-remove-url', site_url + 'client/ajscontacts/delete/' + element.id);

                $('#' + parent_div).append(data);
                $('.' + input_div + '_' + length).find('.account_manager').addClass('account_manager_' + length);
                $('.' + input_div + '_' + length).find('.ajs_contact_type').addClass('ajs_contact_type_' + length).attr('id', 'ajs_contact_type_' + length);
                $('.' + input_div + '_' + length).find('.popup-add-btn').attr('data-element', 'ajs_contact_type_' + length);

                var filter4 = {"masters.master_code": "USER_TYPES", 'master_values.status': '1'};
                
                select2_ajax($('.ajs_contact_type_' + length), site_url + 'master-record/get_all', 'master_value', filter4, 'offcanvasRight', element.contact_type);
                
                select2_ajax_users('.account_manager_' + length, {user_type: element.contact_type}, "offcanvasRight", element.user_id);

                $('.ajs_contact_type_' + length).on('change', function (e, from) {                    
                    if (from === 'select2') {
                        return;
                    }
                    var contact_type = $(this).val();

                    if ($('.account_manager_' + length).hasClass('select2-hidden-accessible'))
                    {
                        $('.account_manager_' + length).select2("destroy");
                        $('.account_manager_' + length).find('option').remove();
                    }
                    select2_ajax_users('.account_manager_' + length, {user_type: contact_type}, "offcanvasRight");
                });
            });
        }

        if (client.client_contacts == false) {
            $('.add-client-contacts').trigger('click');
        }
        if (typeof client.client_contacts !== 'undefined')
        {
            $.each(client.client_contacts, function (index, element) {
                var parent_div = 'client_create_contact_form';
                var input_div = 'contact_input_field_div';
                var length = $('.' + input_div).length;
                var data = $("." + input_div + ":last").eq(0).clone();
                data.css('display', '');
                data.addClass(input_div + '_' + length);
                data.find("input[name='contact_fname[]']").val(element.first_name);
                data.find("input[name='contact_lname[]']").val(element.last_name);
                data.find("input[name='contact_email[]']").val(element.email);
                data.find("input[name='contact_mobile[]']").val(element.mobile);
                data.find("input[name='contact_telephone[]']").val(element.telephone);
                data.find("input[name='is_new[]']").val('0');
                data.find("input[name='contact_id[]']").val(element.id);
                data.find("button.remove-parent-btn").attr('data-id', element.id);
                data.find("button.remove-parent-btn").attr('data-remove', 'client-contacts');
                data.find("button.remove-parent-btn").attr('data-remove-url', site_url + 'client/contacts/delete/' + element.id);
                $('#' + parent_div).append(data);
                $('.' + input_div + '_' + length).find('.contact_type').addClass('contact_type_' + length).attr('id', 'contact_type_' + length);
                $('.' + input_div + '_' + length).find('.popup-add-btn').attr('data-element', 'contact_type_' + length);
                var filter2 = {"masters.master_code": "CONTACT_TYPE"};
                select2_ajax($('.contact_type_' + length), site_url + 'master-record/get_all', 'master_value', filter2, 'offcanvasRight', element.contact_type);

                ajs.mask_inputs();
            });
        }

        var filter = {"masters.master_code": "CLIENT_TYPE", 'master_values.status': '1'};
        var filter2 = {"masters.master_code": "CONTACT_TYPE"};
        var filter3 = {"masters.master_code": "PREFERRED_CONTACT_MODE"};
        select2_ajax('#client_type', site_url + 'master-record/get_all', 'master_value', filter, 'offcanvasRight', client.client_type_id);
        //select2_ajax('#city', site_url + 'cities/get_all', 'title', null, 'offcanvasRight', client.city);
        select2_ajax('#client_role', site_url + 'role/get_all', 'title', null, 'offcanvasRight', client.role_id);
        var tags = pluck(client.tags, 'tag_id');
        select2_ajax('#tags', site_url + 'tag/get_all', 'title', {"module": "client"}, 'offcanvasRight', tags);
        //select2_ajax('#contact_type', site_url + 'master-record/get_all', 'master_value', filter2, 'offcanvasRight');
        //select2_ajax('#preferred_mode_of_contact', site_url + 'master-record/get_all', 'master_value', filter3, 'offcanvasRight');
        //add_autocomplete_sel('#account_manager', 'users', ['first_name', 'last_name'], null, null, 'offcanvasRight', client.ajs_account_manager, client.account_manager_name);

    } else
    {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function client_edit_form()
{
    client_create_form('edit');
    var id = $('#edit_id').val();
    ajs.ajax_form(site_url + 'client/get/' + id, null, 'GET', null, '1', '1', load_client_data, load_client_data);
}


// // for set data on client detail page
// function set_client_data(result_json)
// {
//     if (ajs_form_handler.check_result(result_json))
//     {
//         var client = result_json.message.data;
//         var breadcrumbs = [
//             {label: 'Clients', url: cdn_url + 'clients/list'},
//             {label: client.client_code, url: null}
//         ];
//         set_breadcrumb(breadcrumbs);
//         $('#detail_registration_no').text(client.registration_no);
//         $('#detail_company_name').html(client.company_name);
//         $('#company_name_header').html(client.company_name);

//         var img_src = cdn_url + `assets/images/users/avatar-3.jpg`;
//         if (client.profile_pic) {
//             img_src = s3_url + '/' + client.profile_pic;
//         }

//         $('#company_name_header').append(`&nbsp;&nbsp;&nbsp;&nbsp;<img src="`+img_src+`" style="width:25px" />`);

//         $('#detail_vat_no').html(client.vat_no);
//         $('#detail_client_code').html(client.client_code);
//         $('#detail_client_type').html(client.client_type_name);
//         $('#detail_client_role').html(client.client_role);
//         // $('#detail_address1').html(client.address1);
//         // $('#detail_address2').html(client.address2);
//         // $('#detail_area').html(client.area);
//         // $('#detail_city').html(client.city);
//         // $('#detail_postalcode').html(client.postalcode);
//         $('#detail_email').html(client.email);
//         $('#detail_email').attr('href', 'mailto:' + client.email);
//         $('#detail_mobile_number').html(client.phone_number);
//         $('#detail_mobile_number').attr('href', 'tel:' + client.phone_number);
//         $('#detail_telephone_number').html(client.telephone_number);
//         $('#detail_telephone_number').attr('href', 'tel:' + client.telephone_number);

//         var address = client.address1;
//         if (client.address2) {
//             address += '</br>' + client.address2;
//         }
//         if (client.area) {
//             address += ', ' + client.area;
//         }
//         if (client.city_name) {
//             address += '</br>' + client.city_name;
//         }
//         if (client.postalcode) {
//             address += ' - ' + client.postalcode;
//         }

//         $("#detail_address").html(address);

//         if (typeof client.client_contacts !== 'undefined') {
//             var contactHtml = format_contacts(client.client_contacts);
//             $("#contacts").html(contactHtml);
//         }

//         if (client.client_ajs_contacts) {
//             var contactHtml = format_contacts(client.client_ajs_contacts);
//             $("#ajs_contacts").html(contactHtml);
//         }
//     } else
//     {
//         ajs_form_handler.show_errors_offcanvas(result_json);
//     }
// }

// function format_contacts(contacts)
// {
//     var contactHtml = "";
//     $.each(contacts, function (index, contact) {
//         // if (index) {
//         //     contactHtml += "<tr style='border-bottom: 1px solid gray;'></tr>";
//         // }
//         contactHtml += '<tr><td class="fw-medium ">' + contact.contact_type_name + '</td><td class="detail-data"><span>' + contact.first_name + ' ' + contact.last_name;

//         if (contact.email) {
//             contactHtml += '</br>E: <a href="mailto:' + contact.email + '">' + contact.email + '</a>';
//         }
//         if (contact.mobile || contact.telephone) {
//             contactHtml += '</br>M: <a href="tel:' + contact.mobile + '">' + contact.mobile + '</a> | T: <a href="tel:' + contact.telephone + '">' + contact.telephone + '</a>';
//         }
//         contactHtml += '</span></td></tr>';

//     });

//     return contactHtml;
// }

// function get_client_details()
// {
//     var id = $("#client_id").val();
//     ajs.ajax_form(site_url + 'client/get/' + id, null, 'GET', null, '1', '1', set_client_data, set_client_data);

// }



// $(function () {
//     if ($('#is_detail_page').val()) {
//         get_client_details();
//     }
// });

ajs.apply_ind_roles('Clients');
