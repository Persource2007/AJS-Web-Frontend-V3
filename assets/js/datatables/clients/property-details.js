$('.client-sub-nav').find('a[data-tab="client-properties"]').addClass('active');
$('.property-sub-nav').find('a[data-tab="property-details"]').addClass('active');

$(function () {
    var ignore_keys = ['is_block', 'is_hrb', 'is_communal', 'is_asbestos', 'alerts', 'add_date', 'added_by', 'updated_by', 'updated_date', 'client_id'];
    var checkbox_keys = ['is_block', 'is_hrb', 'is_asbestos'];
    var current_property = null;

    // for set data on property detail page
    function set_property_data(result_json) {
        if (ajs_form_handler.check_result(result_json)) {
            var property = result_json.data;
            current_property = property;

            if (is_modal != 'true') {
                var client_id = $("#client_id").val();
                if (client_id > 0) {
                    var detail_url = 'clients/details/' + ajs.hash_encode(client_id);
                    var breadcrumbs = [{
                            label: 'Clients',
                            url: cdn_url + 'clients/list'
                        },
                        {
                            label: property.client_code,
                            url: cdn_url + detail_url
                        },
                        {
                            label: 'Properties',
                            url: cdn_url + 'clients/' + ajs.hash_encode(client_id) + '/properties'
                        },
                        {
                            label: property.uprn_no,
                            url: null
                        }
                    ];
                } else {
                    var breadcrumbs = [
                        {
                            label: 'Properties',
                            url: cdn_url + 'properties/list'
                        },
                        {
                            label: property.uprn_no,
                            url: null
                        }
                    ];
                }

                set_breadcrumb(breadcrumbs);
            }

            for (const [key, value] of Object.entries(property)) {
                if (!ignore_keys.includes(key)) {
                    $("#detail_" + key).html(value);
                } else if (checkbox_keys.includes(key)) {
                    if (value == 1) {
                        $("#detail_" + key).html("Yes");
                    } else {
                        $("#detail_" + key).html('No');
                    }
                }
            }

            var contact = property.resident_name || '';
            if (property.email) {
                contact += '</br>E: <a href="mailto:' + property.email + '">' + property.email + '</a>';
            }
            if (property.mobile || property.telephone) {
                contact += '</br>M: <a href="tel:' + property.mobile + '">' + (property.mobile || '') + '</a> | T: <a href="tel:' + property.telephone + '">' + (property.telephone || '') + '</a>';
            }

            $("#detail_resident_name").html(contact);
            $("#detail_client_code").html(gen_client_detail_link(property.client_id, property.client_code));

            $("#detail-edit-btn").data('heading', 'Edit Property - ' + property.uprn_no);

            if (property.asbestos_register_link) {
                $('#detail_asbestos_register_link').attr('href', property.asbestos_register_link);
            }

            if (property.status == 1) {
                $('#detail_status').html('Active');
            } else {
                $('#detail_status').html('Inactive');
            }

            var address = property.address1 || '';
            if (property.address2) {
                address += ',</br>' + property.address2;
            }
            if (property.area) {
                address += ', ' + property.area;
            }
            if (property.town) {
                address += ',</br>' + property.town;
            }
            if (property.postalcode) {
                address += ',<br/>' + property.postalcode;
            }

            $("#detail_address").html(address);

            var leaseholder = property.leaseholder_name || '';
            if (property.leaseholder_mobile || property.leaseholder_telephone) {
                leaseholder += '</br>M: <a href="tel:' + property.leaseholder_mobile + '">' + (property.leaseholder_mobile || '') + '</a> | T: <a href="tel:' + property.leaseholder_telephone + '">' + (property.leaseholder_telephone || '') + '</a>';
            }

            $("#detail_leaseholder_name").html(leaseholder);

            var leaseholder_address = property.leaseholder_address1 || '';
            if (property.leaseholder_address2) {
                leaseholder_address += ',</br>' + property.leaseholder_address2;
            }
            if (property.leaseholder_area) {
                leaseholder_address += ', ' + property.leaseholder_area;
            }
            if (property.leaseholder_town) {
                leaseholder_address += ',</br>' + property.leaseholder_town;
            }
            if (property.leaseholder_county) {
                leaseholder_address += ', ' + property.leaseholder_county;
            }
            if (property.leaseholder_postalcode) {
                leaseholder_address += ',<br/>' + property.leaseholder_postalcode;
            }

            $("#detail_leaseholder_address").html(leaseholder_address);

            if (property.alerts) {
                var alertHtml = set_alerts(property.alerts);
                $("#details_alerts").html(alertHtml);
            }

            if (property.tags.length) {
                var tags = pluck(property.tags, 'title').join(', ');
                $("#detail_tags").html(tags);
            }

        } else {
            ajs_form_handler.show_errors_offcanvas(result_json);
        }
    }

    function set_alerts(alerts) {
        var alertHtml = "";
        $.each(alerts, function (index, alert) {
            var alertText = '';
            if (alert.warning_type == 1 || alert.warning_type == '1') {
                if (Array.isArray(alert.messages)) {
                    alertText = alert.messages.join(', ');
                } else {
                    alertText = alert.messages || alert.message || '';
                }
            } else {
                alertText = alert.message || '';
            }

            alertHtml += '<tr><td class="fw-medium">' + ((alert.warning_type == 1 || alert.warning_type == '1') ? "Resident Alert" : "Property Alert") + '</td><td><span class="text-danger fw-medium">' + alertText + '</span></td></tr>';
        });

        return alertHtml;
    }

    function get_property_details() {
        var id = $("#property_id").val();
        ajs.ajax_form(
                site_url + "property/detail/" + id,
                null,
                "GET",
                null,
                "1",
                "1",
                set_property_data,
                set_property_data
                );
    }

    function resident_contact_save_response(result_json) {
        ajs_form_handler.hide_errors();
        if (ajs_form_handler.check_result(result_json)) {
            $('#offcanvasRight2 .offcanvas-body').find('.offcanvas-form-errors').remove();
            $('#offcanvasRight2').offcanvas('hide');
            get_property_details();
            // show success toast using SweetAlert2
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'success',
                    title: result_json.message || 'Saved',
                });
            }
        } else {
            ajs_form_handler.show_errors_offcanvas(result_json);
        }
    }

    function init_resident_contact_form() {
        ajs.mask_inputs();

        if ($('#residentContactForm').data('validator')) {
            $('#residentContactForm').validate().destroy();
        }

        $('#residentContactForm').validate({
            onkeyup: false,
            rules: {
                address1: {
                    required: true
                },
                postalcode: {
                    required: true
                },
                email: {
                    email: true
                }
            },
            errorPlacement: function (error, element) {
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            },
            submitHandler: function (form) {
                var sub_button = $(form).find(':submit');
                ajs.submit_button_element = sub_button;
                ajs.refreshDetailData = get_property_details;

                ajs.ajax_form(
                        $(form).attr('action'),
                        $(form).serialize(),
                        $(form).attr('method'),
                        null,
                        '1',
                        '1',
                        resident_contact_save_response,
                        resident_contact_save_response
                        );
                return false;
            }
        });

        set_contact_details(current_property);
    }

    // populate contact form inputs when available
    function set_contact_details(prop) {
        if (!prop) return;
        $("#edit_property_id").val(prop.id);
        $('#residentContactForm [name="address1"]').val(prop.address1 || '');
        $('#residentContactForm [name="address2"]').val(prop.address2 || '');
        $('#residentContactForm [name="area"]').val(prop.area || '');
        $('#residentContactForm [name="town"]').val(prop.town || '');
        $('#residentContactForm [name="county"]').val(prop.county || '');
        $('#residentContactForm [name="postalcode"]').val(prop.postalcode || '');
        $('#residentContactForm [name="resident_name"]').val(prop.resident_name || '');
        $('#residentContactForm [name="email"]').val(prop.email || '');
        $('#residentContactForm [name="mobile"]').val(prop.mobile || '');
        $('#residentContactForm [name="telephone"]').val(prop.telephone || '');
    }

    function open_resident_contact_offcanvas() {
        if (!current_property) {
            ajs.showAlertBar('error', 'Property details are still loading. Please try again.', true);
            return;
        }

        var heading = 'Edit Resident & Contact' + (current_property.uprn_no ? ' - ' + current_property.uprn_no : '');
        ajs.showOffCanvasFormRightSmall(cdn_url + "properties/edit-contact?in_popup=1", heading, null, init_resident_contact_form);
    }

    $(document)
    .off('click', '.edit-resident-detail')
    .on('click', '.edit-resident-detail', function (e) {
        e.preventDefault();
        ajs.isOffcanvasSmallOpen = false;
        open_resident_contact_offcanvas();
    });

    if ($("#is_detail_page").val()) {
        get_property_details();
    }

    ajs.apply_ind_roles('Properties');
    ajs.apply_permissions();
});