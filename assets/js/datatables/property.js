var master_data_type = "property";
dataTable = null;
var ignore_keys = ['is_block', 'is_hrb', 'is_communal', 'is_asbestos', 'alerts', 'add_date', 'added_by', 'updated_by', 'updated_date', 'client_id'];
var checkbox_keys = ['is_block', 'is_hrb', 'is_asbestos'];

// The alert-row helpers (residentAlertFilter, initPropertyAlertRow, toggleAlertMessageField,
// syncResidentAlertFields and friends) live in assets/js/app/property-alert-row.js so the
// Job / Task quick-edit popup can reuse them.

function load_data_table(limit, search_term, filters) {
    data_filters = {};
    page_limit = ajs.datatable_limit;
    search = "";
    if (typeof filters != "undefined" && (typeof filters["filters"] !== "undefined" || filters["filters"] != null)) {
        data_filters = filters["filters"];
    }
    if (typeof limit !== "undefined" || limit != null) {
        page_limit = limit;
    }
    if (typeof search_term !== "undefined" || search_term != null) {
        search = search_term;
    }

    // Save first, so clearing the filters also clears the stored ones, then stop -
    // the global property list stays empty until something is actually filtered.
    // A client's own property tab is exempt: its client_id is injected into
    // data_filters further down, in the ajax data callback.
    save_properties_session_filters();

    if (!($("#client_id").val() > 0) && gate_empty_filters("#property-datatables", data_filters, search)) {
        dataTable = null;
        return;
    }

    dataTable = new DataTable("#property-datatables", {
        scrollY: (screen.height - 475) + 'px',
        searching: false,
        serverSide: true,
        processing: true,
        paging: true,
        responsive: false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: search,
        },
        ajax: {
            url: site_url + "property/get_all",
            method: "GET",
            dataSrc: "data",
            data: function (d) {
                if ($("#client_id").val() > 0) {
                    data_filters['client_id'] = $("#client_id").val();
                }
                return $.extend({}, d, {
                    data_filters
                });
            },
            "error": function (xhr, error, thrown) {
                ajs.datatable_error(xhr, "property-datatables");
                if (xhr.status !== 200) {
                    $('#ajax-datatables').html('<p>No data found.</p>'); // Display "No data found" message if 404 error
                }
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
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
                            `<a href="` + cdn_url + 'clients/' + ajs.hash_encode(row.client_id) + '/properties/details/' + ajs.hash_encode(row.id) + `" >` + view_icon() + `</a>
                        <a data-after-load-func="property_edit_form" data-heading="Edit Property - ` +
                            row.uprn_no +
                            `" data-form-url="` +
                            cdn_url +
                            `properties/edit/` +
                            row.id +
                            `" class="popup-form-button" >` + edit_icon() + `</a>`
                            + detail_icon()
                            );
                    /*
                     return (
                     `<div class="dropdown d-inline-block">
                     <button class="btn btn-soft-secondary btn-sm dropdown " type="button" data-bs-toggle="dropdown" aria-expanded="true">
                     <i class="ri-more-fill align-middle"></i>
                     </button>
                     <ul class="dropdown-menu dropdown-menu-end ">
                     <li>
                     <a href="` + cdn_url + 'clients/' + ajs.hash_encode(row.client_id) + '/properties/details/' + ajs.hash_encode(row.id) +
                     `" class="dropdown-item"><i class="ri-eye-fill align-bottom me-2 text-muted"></i> View</a>
                     </li>
                     <li>
                     <a style="cursor:pointer" data-after-load-func="property_edit_form" data-heading="Edit Property - ` +
                     row.uprn_no +
                     `" data-form-url="` +
                     cdn_url +
                     `properties/edit/` +
                     row.id +
                     `" class="dropdown-item popup-form-button" >
                     <i class="ri-pencil-fill align-bottom me-2 text-muted"></i>Edit
                     </a>
                     </li>
                     <li>
                     <a class="dropdown-item list_delete" data-type="` +
                     master_data_type +
                     `" data-id="` +
                     row.id +
                     `" data-action="delete" class="remove-item-btn" data-bs-toggle="modal" href="#deleteModal">
                     <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>Delete
                     </a>
                     </li>
                     </ul>
                     </div>`
                     );*/
                },
            },
            // {
            //     data: null,
            //     className: "details-control",
            //     orderable: false,
            //     searchable: false,
            //     defaultContent: '<i class="ri-arrow-down-s-line align-bottom " ></i>',
            // },
            {
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
            },
            {
                name: "uprn_no",
                data: "uprn_no",
                render: function (data, type, row) {
                    var str = "";
                    str +=
                            `<div class="d-flex">
                                    <div class="avatar-group">
                                        <a href="` + generate_view_url(row.id) +
                            `" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="#` +
                            row.uprn_no +
                            `">` +
                            row.uprn_no +
                            `
                                        </a>
                                    </div>
                                </div>`;
                    return str;
                },
            },
            {data: "open_job_count", name: "open_job_count", className: "pricing-col",orderable: false, searchable: false},
            {data: 'client_code', name: "client_code",
                render: function (data, type, row) {
                    return gen_client_detail_link(row.client_id, data);
                }
            },
            {
                name: "address1",
                data: "address1",
                className: 'text-truncate',
                render: function (data, type, row) {
                    var addr = row.address1;
                    if (row.address2) {
                        addr += ", " + row.address2;
                    }
                    return truncate_string(addr, 25);
                },
            },
            // {data: "area", name: "area"},
            // {data: "city_name", name: "city_name"},
            {data: "postalcode", name: "postalcode"},
            {data: "resident_name", name: "resident_name"},
            {data: "telephone", name: "telephone"},
            {
                name: "email",
                data: "email",
                render: function (data) {
                    return data ? "<a href='mailto:" + data + "'>" + data + "</a>" : "";
                },
            },
            {data: "property_type_name", name: "property_type_name"},
            {
                data: null,
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                    return "<a target='_blank' href='" + cdn_url + 'clients/' + ajs.hash_encode(row.client_id) + '/properties/' + ajs.hash_encode(row.id) + '/assets' + "'>Assets</a>";
                },
            },
        ],
        order: [["1", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Properties");
        }
    });

    dataTable.setDetailRow = function (rowData) {

        var alertHtml = "";
        $.each(rowData.alerts, function (index, alert) {
            alertHtml += `<tr>
                            <td>` + ((alert.warning_type == 1) ? "Resident Alert" : "Property Alert") + `</td>
                            <td>` + alert.message + `</td>
                        </tr>`;
        });

        if (alertHtml == "") {
            alertHtml = "<td colspan='2' align='center'> Data Not Available</td>";
        }
        return `
            <div class="details-row row property-details-row">
            <div class="col-md-2">
                <p>Size: ${rowData.size ?? ''}</p>
                <p>Year Built: ${rowData.year_built ?? ''}</p>
                <p>Account Code: ${rowData.account_code ?? ''}</p>
            </div>
            <div class="col-md-10">
                <table class="table mb-0">
                    <thead>
                        <tr>
                        <th>Warning Type</th>
                        <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>${alertHtml}</tbody>
                </table>
            </div>
        </div>
        `;
    }
}

if ($("#property-datatables").length) {

    add_autocomplete_sel(
            "#client_id_filter",
            "clients",
            ["client_code"],
            null,
            null,
            );

    //$('#select2-client_id_filter-container').find('.select2-selection__placeholder').text('Client Code');
    //select2_ajax("#town_filter", site_url + "cities/get_all", "title", null);
    select2_ajax(
            "#property_type_filter",
            site_url + "master-record/get_all",
            "master_value",
            {master_code: "PROPERTY_TYPES"}
    );
    select2_ajax(
            "#tag_id_filter",
            site_url + "tag/get_all",
            "title",
            {module: 'property'}
    );
    let params = new URLSearchParams(window.location.search);
    var client_id = $("#client_id").val();
    var sessionKey = get_properties_session_key();

    if (params.get('search')) {
        $('#search_term').val(params.get('search'));
        load_data_table(ajs.datatable_limit, params.get('search'), {});
    } else if (sessionStorage.getItem(sessionKey)) {
        restore_properties_session_filters().then(function() {
            get_search_filter_data("load");
            get_user_filters(master_data_type);
        });
    } else if (client_id > 0) {
        fetch_default_filter(master_data_type);            // client context: load that client's properties (client_id injected into data_filters)
    } else {
        fetch_default_filter(master_data_type, true, '#property-datatables');  // global list: gated until a filter is applied
    }

    if (client_id > 0) {
        ajs.ajax_form(site_url + 'client/get/' + client_id, null, 'GET', null, '1', '1', create_breadcrumb, create_breadcrumb);
    } else {
        var breadcrumbs = [
            {label: 'Properties', url: null}
        ];
        set_breadcrumb(breadcrumbs);
    }

}

function get_properties_session_key() {
    var client_id = $("#client_id").val();
    return "properties_list_session_filters" + (client_id > 0 ? "_" + client_id : "");
}

function get_select2_val_and_text(selector) {
    var $el = $(selector);
    if (!$el.length) return null;
    var val = $el.val();
    if (val === null || val === undefined || val === "") return null;
    var $opt = $el.find('option:selected');
    var text = $opt.length ? $opt.text() : val;
    return {
        id: val,
        text: $.trim(text) || val
    };
}

function save_properties_session_filters() {
    if (!$("#property-datatables").length || !$("#form_filters").length) return;

    var filters = {
        search_term: $("#search_term").val() || "",
        client_id_filter: get_select2_val_and_text("#client_id_filter"),
        status_filter: $("#status_filter").val() || "",
        tag_id_filter: get_select2_val_and_text("#tag_id_filter")
    };

    var sessionKey = get_properties_session_key();

    // Storing an all-empty filter set would make the bootstrap take the
    // sessionStorage branch on every later visit, which skips the
    // "apply a filter first" gate and loads every property. Clearing the key
    // instead also drops stale filters when the user empties them and searches.
    // In client context this simply falls through to the ungated client load.
    var has_any = filters.search_term || filters.status_filter
        || filters.client_id_filter || filters.tag_id_filter;

    if (!has_any) {
        sessionStorage.removeItem(sessionKey);
        return;
    }

    sessionStorage.setItem(sessionKey, JSON.stringify(filters));
}

function restore_properties_session_filters() {
    var sessionKey = get_properties_session_key();
    var sessionData = sessionStorage.getItem(sessionKey);
    if (!sessionData) return $.Deferred().resolve(false).promise();
    var filters;
    try {
        filters = JSON.parse(sessionData);
        if (!filters || typeof filters !== "object") return $.Deferred().resolve(false).promise();
    } catch (e) {
        console.error("Error restoring session filters:", e);
        return $.Deferred().resolve(false).promise();
    }

    var restoredAny = false;
    var deferreds = [];

    // Non-entity filters restored synchronously
    if (typeof filters.search_term !== "undefined") {
        $("#search_term").val(filters.search_term);
        if (filters.search_term) restoredAny = true;
    }
    if (typeof filters.status_filter !== "undefined" && filters.status_filter !== "") {
        $("#status_filter").val(filters.status_filter).trigger("change");
        restoredAny = true;
    }
    if (filters.tag_id_filter && filters.tag_id_filter.id && $("#tag_id_filter").length) {
        var tid = filters.tag_id_filter.id;
        var ttext = filters.tag_id_filter.text || tid;
        if (!$("#tag_id_filter option[value='" + tid + "']").length) {
            $("#tag_id_filter").append(new Option(ttext, tid, true, true));
        }
        $("#tag_id_filter").val(tid).trigger("change");
        restoredAny = true;
    }

    // Entity filter: validate client still active before restoring
    if (filters.client_id_filter && filters.client_id_filter.id && $("#client_id_filter").length) {
        var cid = filters.client_id_filter.id;
        var ctext = filters.client_id_filter.text || cid;
        var cd = $.Deferred();
        $.ajax({
            url: site_url + 'api/autocomplete_single', method: 'GET',
            data: { table: 'clients', id: cid, fields: 'client_code', add_fields: '', check_active: 1, element: 'client_id_filter' },
            success: function(resp) {
                if (resp && resp.status === true) {
                    if (!$("#client_id_filter option[value='" + cid + "']").length) {
                        $("#client_id_filter").append(new Option(ctext, cid, true, true));
                    }
                    $("#client_id_filter").val(cid).trigger("change");
                    restoredAny = true;
                } else {
                    try { var s = JSON.parse(sessionStorage.getItem(sessionKey) || '{}'); delete s.client_id_filter; sessionStorage.setItem(sessionKey, JSON.stringify(s)); } catch(e2) {}
                }
                cd.resolve();
            },
            error: function() { cd.resolve(); }
        });
        deferreds.push(cd.promise());
    }

    if (deferreds.length === 0) return $.Deferred().resolve(restoredAny).promise();
    return $.when.apply($, deferreds).then(function() { return restoredAny; });
}

$(document).on("click", "#property-datatables a", function () {
    save_properties_session_filters();
});

$(window).on("beforeunload", function () {
    if ($("#property-datatables").length) {
        save_properties_session_filters();
    }
});

function create_breadcrumb(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {
        var client = result_json.message.data;

        var detail_url = 'clients/details/' + ajs.hash_encode(client.id);
        var breadcrumbs = [
            {label: 'Clients', url: cdn_url + 'clients/list'},
            {label: client.client_code, url: cdn_url + detail_url},
            {label: 'Properties', url: null}
        ];

        set_breadcrumb(breadcrumbs);

    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

function property_create_form(type) {
    var filter = {master_code: "PROPERTY_TYPES"};
    var filter3 = {master_code: "PREFERRED_CONTACT_MODE"};
    if (typeof type !== "undefined" && type == "edit") {
    } else {
        let selected_client = $("#client_id").val() > 0 ? $("#client_id").val() : undefined;

        add_autocomplete_sel(
                "#client_code",
                "clients",
                ["client_code"],
                null,
                null,
                "offcanvasRight",
                selected_client
                );
        if (selected_client) {
            add_autocomplete_sel(
                    "#parent_id",
                    "client_properties",
                    ["uprn_no"],
                    null,
                    {client_id: selected_client},
                    "offcanvasRight",
                    );
        }
        select2_ajax(
                "#property_type",
                site_url + "master-record/get_all",
                "master_value",
                filter,
                "offcanvasRight"
                );
        // select2_ajax(
        //         "#town",
        //         site_url + "cities/get_all",
        //         "title",
        //         null,
        //         "offcanvasRight"
        //         );
        select2_ajax(
                "#preferred_contact_method,#resident_contact_methods,#leaseholder_preferred_contact_method,#leaseholder_contact_methods",
                site_url + "master-record/get_all",
                "master_value",
                filter3,
                "offcanvasRight"
                );
        select2_ajax('#tags', site_url + 'tag/get_all', 'title', {module: 'property'}, 'offcanvasRight');
        $('#property_alert_form .property-alert-row').each(function () {
            initPropertyAlertRow($(this));
        });
    }

    ajs.mask_inputs();

    $("#propertyForm").validate({
        onkeyup: false,
        rules: {
            uprn_no: {
                required: true,
            },
            client_id: {
                required: true,
            },
            // property_type: {
            //     required: true,
            // },
            // size: {
            //     required: true,
            // },
            units: {
                //  required: true,
                number: true,
            },
            no_of_floors: {
                // required: true,
                number: true,
            },
            address1: {
                required: true,
            },
            // area: {
            //     required: true,
            // },
            // city: {
            //     required: true,
            // },
            // county: {
            //     required: true,
            // },
            postalcode: {
                required: true,
            },
            // resident_name: {
            //     required: true,
            // },
            // email: {
            //     required: true,
            //     email: true,
            // },
            // mobile: {
            //     required: true,
            // },
            // telephone: {
            //     required: true,
            // },
            asbestos_register_link: {
                url: true,
            },
        },
        messages: {
            uprn_no: "Enter UPRN no.",
            client_id: "Select client code",
            property_type: "Select property type",
            size: "Enter size",
            units: {required: "Enter no. of units"},
            no_of_floors: {required: "Enter no. of floors"},
            address1: "Address1 is required",
            city: "Select town",
            postalcode: "Enter postal code",
            email: "Enter valid email Id",
            mobile: "Enter mobile number",
            telephone: "Enter telephone number",
        },
        errorPlacement: function (error, element) {
            if (
                    element.hasClass("select2") &&
                    element.next(".select2-container").length
                    ) {
                error.insertAfter(element.next(".select2-container"));
            } else if (element.parent(".input-group").length ||
                    element.parent(".error-div").length) {
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
            $('#property_alert_form .property-alert-row').each(function () {
                if ($(this).find('.warning_type').val() === '1') {
                    syncResidentAlertFields($(this));
                }
            });

            var seenSignatures = [];
            var hasDuplicate = false;
            $('#property_alert_form .property-alert-row').each(function () {
                if ($(this).find('.warning_type').val() === '1') {
                    var ids = $(this).find('.resident_alert_ids_hidden').val() || '';
                    var sortedIds = ids.split(',').map(function (v) { return v.trim(); }).filter(Boolean).sort().join(',');
                    if (!sortedIds) return;
                    var status = $(this).find('.warning_status').val() || '';
                    var signature = sortedIds + '|' + status;
                    if (seenSignatures.indexOf(signature) !== -1) {
                        hasDuplicate = true;
                        return false;
                    }
                    seenSignatures.push(signature);
                }
            });
            if (hasDuplicate) {
                var error = { message: "Duplicate resident alert detected. Each combination of selected alerts and status must be unique." };
                ajs_form_handler.show_errors_offcanvas(error);
                return false;
            }

            var post_data = $(form).serialize();

            if ($('#is_detail_page').val())
            {
                $.getScript(cdn_url + "assets/js/datatables/clients/property-details.js", function () {
                    ajs.refreshDetailData = get_property_details;
                });
            }

            ajs.ajax_form(action, post_data, method, null, "1", "1", ajs_form_handler.offcanvas_form, ajs_form_handler.offcanvas_form);

            return false;

        },
    });

    $(".basic-select2").select2({
        placeholder: "Select",
        allowClear: true,
        search: false,
        dropdownParent: $("#offcanvasRight"),
    });
}

function load_property_data(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {
        var property = result_json.data;

        for (const [key, value] of Object.entries(property)) {
            if (!ignore_keys.includes(key)) {
                $("#" + key).val(value);
            } else if (checkbox_keys.includes(key) && value == 1) {
                $("#" + key).trigger('click');
            }
        }

        $("#client_code").attr('readonly', true);
        $("#client_code").parent().find('.popup-form-search-button').hide();
        $("#year_built,#status").trigger('change');

        populate_property_alert_rows(property.alerts);

        var filter = {master_code: "PROPERTY_TYPES"};
        var filter3 = {master_code: "PREFERRED_CONTACT_MODE"};

        set_client_code(property.client_id);
        add_autocomplete_sel(
                "#parent_id",
                "client_properties",
                ["uprn_no"],
                null,
                {client_id: property.client_id, id: property.id},
                "offcanvasRight",
                property.parent_id,
                property.parent_uprn_no,
                );
        select2_ajax(
                "#property_type",
                site_url + "master-record/get_all",
                "master_value",
                filter,
                "offcanvasRight",
                property.property_type
                );
        // select2_ajax(
        //         "#town",
        //         site_url + "cities/get_all",
        //         "title",
        //         null,
        //         "offcanvasRight",
        //         property.town
        //         );
        select2_ajax("#preferred_contact_method", site_url + 'master-record/get_all', 'master_value', filter3, 'offcanvasRight', property.preferred_contact_method);
        select2_ajax("#resident_contact_methods", site_url + 'master-record/get_all', 'master_value', filter3, 'offcanvasRight', property.resident_contact_methods);
        select2_ajax("#leaseholder_preferred_contact_method", site_url + 'master-record/get_all', 'master_value', filter3, 'offcanvasRight', property.leaseholder_preferred_contact_method);
        select2_ajax("#leaseholder_contact_methods", site_url + 'master-record/get_all', 'master_value', filter3, 'offcanvasRight', property.leaseholder_contact_methods);

        var tags = pluck(property.tags, 'tag_id');
        select2_ajax('#tags', site_url + 'tag/get_all', 'title', {"module": "property"}, 'offcanvasRight', tags);
    } else {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function set_client_code(client_id) {
    add_autocomplete_sel(
            "#client_code",
            "clients",
            ["client_code"],
            null,
            null,
            "offcanvasRight",
            client_id,
            );
}

function property_edit_form() {
    property_create_form("edit");
    var id = $("#edit_id").val();
    ajs.apply_ind_roles("Properties");
    ajs.ajax_form(
            site_url + "property/get/" + id,
            null,
            "GET",
            null,
            "1",
            "1",
            load_property_data,
            load_property_data
            );
}

/* // for set data on property detail page
 function set_property_data(result_json)
 {
 if (ajs_form_handler.check_result(result_json)) {
 var property = result_json.data;
 
 var client_id = $("#client_id").val();
 if (client_id > 0) {
 var detail_url = 'clients/details/' + ajs.hash_encode(client_id);
 var breadcrumbs = [
 {label : 'Clients', url: cdn_url + 'clients/list'},
 {label : property.client_code, url: cdn_url + detail_url},
 {label : 'Properties', url: cdn_url + 'clients/'+ ajs.hash_encode(client_id)+'/properties'},
 {label : property.uprn_no, url: null}
 ];
 } else {
 var breadcrumbs = [
 {label : 'Properties', url: cdn_url + 'properties/list'},
 {label : property.uprn_no, url: null}
 ];
 }
 
 set_breadcrumb(breadcrumbs);
 
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
 
 var contact = property.resident_name;
 if(property.email) {
 contact += '</br>E: <a href="mailto:' + property.email + '">' + property.email + '</a>';
 }
 if(property.mobile || property.telephone) {
 contact += '</br>M: <a href="tel:' + property.mobile + '">' + property.mobile + '</a> | T: <a href="tel:' + property.telephone + '">' + property.telephone + '</a>';
 }
 
 $("#detail_resident_name").html(contact);
 $("#detail_client_code").html(gen_client_detail_link(property.client_id, property.client_code));
 
 $("#detail-edit-btn").data('heading','Edit Property - '+property.uprn_no);
 
 if (property.asbestos_register_link) {
 $('#detail_asbestos_register_link').attr('href', property.asbestos_register_link);
 }
 
 if (property.status == 1) {
 $('#detail_status').html('Active');
 } else {
 $('#detail_status').html('Inactive');
 }
 
 var address = property.address1;
 if(property.address2) {
 address += '</br>' + property.address2;
 }
 if(property.area) {
 address += ', ' + property.area;
 }
 if(property.city_name) {
 address += '</br>' + property.city_name;
 }
 if(property.postalcode) {
 address += ' - ' + property.postalcode;
 }
 
 $("#detail_address").html(address);
 
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
 
 function set_alerts(alerts)
 {
 var alertHtml = "";
 $.each(alerts, function (index, alert) {
 // if (index) {
 //     alertHtml += "<tr style='border-bottom: 1px solid gray;'></tr>";
 // }
 alertHtml += '<tr><td class="fw-medium">' + ((alert.warning_type == 1) ? "Resident Alert" : "Property Alert") + '</td><td class="detail-data"><span>' + alert.message + '</span></td></tr>';
 
 });
 
 return alertHtml;
 }
 
 function get_property_details()
 {
 var id = $("#property_id").val();
 ajs.ajax_form(
 site_url + "property/get/" + id,
 null,
 "GET",
 null,
 "1",
 "1",
 set_property_data,
 set_property_data
 );
 } */

function generate_view_url(property_id) {
    var client_id = $("#client_id").val();
    var url = '';
    if (client_id > 0) {
        url = 'clients/' + ajs.hash_encode(client_id) + '/';
    }

    return cdn_url + url + 'properties/details/' + ajs.hash_encode(property_id);
}

$(function () {
    // if ($("#is_detail_page").val()) {
    //     get_property_details();
    // }

    $(document).on("click", "#is_asbestos", function () {
        if ($(this).is(":checked")) {
            $("#asbestos_register_link").parent().show();
        } else {
            $("#asbestos_register_link").parent().hide();
            $("#asbestos_register_link").val("");
        }
    });

    $(document).on("click", "#is_block", function () {
        if ($(this).is(":checked")) {
            $("#parent_id").parent().hide();
            $("#parent_id").val("").trigger('change.select2');
        } else {
            $("#parent_id").parent().show();
        }
    });

    $(document).on("change", "#client_code", function () {
        var selected_client = $(this).val();
        if (selected_client > 0) {
            if ($("#parent_id").hasClass('select2-hidden-accessible')) {
                $("#parent_id").select2().empty()
            }

            add_autocomplete_sel(
                    "#parent_id",
                    "client_properties",
                    ["uprn_no"],
                    null,
                    {client_id: selected_client},
                    "offcanvasRight",
                    );
        }
    });

    $(document).on("change", "#propertyForm .warning_type", function () {
        toggleAlertMessageField($(this).closest('.property-alert-row'));
    });
});

ajs.apply_ind_roles('Properties');
