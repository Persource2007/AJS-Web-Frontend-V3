$(function () {
   
    $('.client-sub-nav').find('a[data-tab="details"]').addClass('active');

    function format_contacts(contacts) {
        var contactHtml = "";
        $.each(contacts, function (index, contact) {
            // if (index) {
            //     contactHtml += "<tr style='border-bottom: 1px solid gray;'></tr>";
            // }
            contactHtml += '<tr><td class="fw-medium ">' + contact.contact_type_name + '</td><td class="detail-data"><span>' + contact.first_name + ' ' + contact.last_name;

            if (contact.email) {
                contactHtml += '</br>E: <a href="mailto:' + contact.email + '">' + contact.email + '</a>';
            }
            if (contact.mobile || contact.telephone) {
                contactHtml += '</br>M: <a href="tel:' + contact.mobile + '">' + (contact.mobile || '') + '</a> | T: <a href="tel:' + contact.telephone + '">' + (contact.telephone || '') + '</a>';
            }
            contactHtml += '</span></td></tr>';

        });

        return contactHtml;
    }

    // for set data on client detail page
    function set_client_data(result_json) {
        if (ajs_form_handler.check_result(result_json)) {
            var client = result_json.message.data;
            if (is_modal != 'true') {
                var breadcrumbs = [{
                        label: 'Clients',
                        url: cdn_url + 'clients/list'
                    },
                    {
                        label: client.client_code,
                        url: null
                    }
                ];
                set_breadcrumb(breadcrumbs);
            }

            $('#detail_registration_no').text(client.registration_no);
            $('#detail_company_name').html(client.company_name);
            $('#company_name_header').html(client.company_name);

            // var img_src = cdn_url + `assets/images/users/avatar-3.jpg`;
            // if (client.profile_pic) {
            //     img_src = s3_url + '/' + client.profile_pic;
            // }

            //$('#company_name_header').append(`&nbsp;&nbsp;&nbsp;&nbsp;<img src="` + img_src + `" class="rounded-circle" style="width:32px" />`);

            $('#detail_vat_no').html(client.vat_no);
            $('#detail_client_code').html(client.client_code);
            $('#detail_client_type').html(client.client_type_name);
            $('#detail_client_role').html(client.client_role);
            // $('#detail_address1').html(client.address1);
            // $('#detail_address2').html(client.address2);
            // $('#detail_area').html(client.area);
            // $('#detail_city').html(client.city);
            // $('#detail_postalcode').html(client.postalcode);
            $('#detail_email').html(client.email);
            $('#detail_email').attr('href', 'mailto:' + client.email);
            $('#detail_mobile_number').html(client.phone_number);
            $('#detail_mobile_number').attr('href', 'tel:' + client.phone_number);
            $('#detail_telephone_number').html(client.telephone_number);
            $('#detail_telephone_number').attr('href', 'tel:' + client.telephone_number);

            var address = client.address1;
            if (client.address2) {
                address += '</br>' + client.address2;
            }
            if (client.area) {
                address += ', ' + client.area;
            }
            if (client.city) {
                address += ',</br>' + client.city;
            }
            if (client.postalcode) {
                address += ',</br>' + client.postalcode;
            }

            $("#detail_address").html(address);

            if (typeof client.client_contacts !== 'undefined') {
                var contactHtml = format_contacts(client.client_contacts);
                $("#contacts").html(contactHtml);
            }

            if (client.client_ajs_contacts) {
                var contactHtml = format_contacts(client.client_ajs_contacts);
                $("#ajs_contacts").html(contactHtml);
            }
        } else {
            ajs_form_handler.show_errors_offcanvas(result_json);
        }
    }

    function get_client_details() 
    {
        var id = $("#client_id").val();
        ajs.ajax_form(site_url + 'client/detail/' + id, null, 'GET', null, '1', '1', set_client_data, set_client_data);
    }
    
    if ($('#is_detail_page').val()) {
        get_client_details();
    }

    ajs.apply_ind_roles('Clients');
});