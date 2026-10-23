var master_data_type = "asset";
dataTable = null;
var custom_data = [];
var ignore_keys = [
    "asset_id",
    "add_date",
    "added_by",
    "updated_by",
    "updated_date",
    "status",
];

var dates = [
    'installation_date',
    'expiry_date',
    'manufacturer_warranty_expiry',
    'our_warranty_expiry'
];

function load_data_table(limit, search_term, filters) {
    data_filters = {};
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

    dataTable = new DataTable("#assets-datatables", {
        scrollY: (screen.height - 555) + 'px',
        scrollCollapse: !0,
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
        // buttons: ["excel"],
        ajax: {
            url: site_url + "asset/all",
            method: "GET",
            async: false,
            dataSrc: "data",
            data: function (d) {
                if ($("#property_id").val() > 0) {
                    data_filters["property_id"] = $("#property_id").val();
                    $("#property_id_filter").val($("#property_id").val());
                }
                if ($("#client_id").val() > 0) {
                    data_filters["client_property_assets.client_id"] = $("#client_id").val();
                }
                return $.extend({}, d, {
                    data_filters,
                });
            },
            error: function (xhr, error, thrown) {
                ajs.datatable_error(xhr, "assets-datatables");
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
                            `<a href="` + cdn_url + 'clients/' + ajs.hash_encode(row.client_id) + '/properties/' + ajs.hash_encode(row.property_id) + '/assets/details/' + ajs.hash_encode(row.id) +
                            `" >` + view_icon() + `</a>
                        <a data-after-load-func="asset_edit_form" data-heading="Edit Assets - ` +
                            row.id +
                            `" data-form-url="` +
                            cdn_url +
                            `assets/edit/` +
                            row.id +
                            `" class="popup-form-button" >` + edit_icon() + `</a>`
                            );
                    /* return (
                     `<div class="dropdown d-inline-block">
                     <button class="btn btn-soft-secondary btn-sm dropdown " type="button" data-bs-toggle="dropdown" aria-expanded="true">
                     <i class="ri-more-fill align-middle"></i>
                     </button>
                     <ul class="dropdown-menu dropdown-menu-end " style="dropdown-menu dropdown-menu-end">
                     <li>
                     <a href="` + cdn_url + 'clients/' + ajs.hash_encode(row.client_id) + '/properties/' + ajs.hash_encode(row.property_id) + '/assets/details/' + ajs.hash_encode(row.id) +
                     `" class="dropdown-item"><i class="ri-eye-fill align-bottom me-2 text-muted"></i> View</a>
                     </li>
                     <li>
                     <a style="cursor:pointer" data-after-load-func="asset_edit_form" data-heading="Edit Assets - ` +
                     row.client_asset_number +
                     `" data-form-url="` +
                     cdn_url +
                     `assets/edit/` +
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
                     ); */
                },
            },
            {
                name: "id",
                data: "id",
                visible: true,
                searchable: false,
                render: function (data, type, row) {
                    var str = "";
                    str +=
                            `<div class="d-flex">
                                    <div class="avatar-group">
                                        <a href="` + generate_asset_view_url(row.property_id, row.id) +
                                        `" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="#` +
                            data +
                            `">` +
                            data +
                            `
                                        </a>
                                    </div>
                                </div>`;
                    return str;
                },
            },
            {
                name: "asset_location",
                data: "asset_location",
            },
            {
                name: "client_asset_number",
                data: "client_asset_number",
            },
            {data: "uprn_no", name: "uprn_no"},
            {data: "serial_number", name: "serial_number"},
            {data: "equipment_type", name: "equipment_type"},
            {data: "quantity", name: "quantity"},
            //{data: "stock_name", name: "stock_name"},
            //{data: "sor_code", name: "sor_code"},
            {data: "installation_date", name: "installation_date", render: function (data) {
                    return ajs.format_date(data);
                }},
            {data: "expiry_date", name: "expiry_date", render: function (data) {
                    return ajs.format_date(data);
                }},
            {data: "manufacturer_warranty_expiry", name: "manufacturer_warranty_expiry", render: function (data) {
                    return ajs.format_date(data);
                }},
            {data: "our_warranty_expiry", name: "our_warranty_expiry", render: function (data) {
                    return ajs.format_date(data);
                }},
        ],
        order: [["1", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Assets");
        }
    });
}

if ($("#assets-datatables").length) {
    select2_ajax(
            "#equipment_type_id_filter",
            site_url + "master-record/get_all",
            "master_value",
            {master_code: "EQUIPMENT_TYPES"}
    );
    // select2_ajax(
    //         "#make_id_filter",
    //         site_url + "master-record/get_all",
    //         "master_value",
    //         {master_code: "ASSET_MAKE"}
    // );
    fetch_default_filter(master_data_type);

    var property_id = $("#property_id").val();
    ajs.ajax_form(
            site_url + "property/get/" + property_id,
            null,
            "GET",
            null,
            "0",
            "1",
            create_breadcrumb,
            create_breadcrumb
            );
}

function asset_create_form(type = 'create') {
    custom_data = [];
    if (type == 'create') {
        select2_ajax(
                "#equipment_type_id",
                site_url + "master-record/get_all",
                "master_value",
                {master_code: "EQUIPMENT_TYPES"},
                "offcanvasRight"
                );
        select2_ajax(
                "#make_id",
                site_url + "master-record/get_all",
                "master_value",
                {master_code: "ASSET_MAKE"},
                "offcanvasRight"
                );
        select2_ajax(
                "#model_id",
                site_url + "master-record/get_all",
                "master_value",
                {master_code: "ASSET_MODELS"},
                "offcanvasRight"
                );
        select2_ajax(
                "#visual_condition_id",
                site_url + "master-record/get_all",
                "master_value",
                {master_code: "VISUAL_CONDITIONS"},
                "offcanvasRight"
                );

        ajs.ajax_form(site_url + 'asset/get_asset_next_id', null, 'GET', null, '0', '0', function (resp) {
            $("#asset_id").val(resp.message.data);
        });        
        // add_autocomplete_sel(
        //     "#stock_id",
        //     "stocks",
        //     ["name"],
        //     null,
        //     null,
        //     "offcanvasRight"
        // );
        // add_autocomplete_sel(
        //         "#sor_code,#fixed_price_sor",
        //         "sors",
        //         ["sor_code"],
        //         null,
        //         null,
        //         "offcanvasRight"
        //     );
        // add_autocomplete_sel(
        //         "#pricing_model",
        //         "pricing_models",
        //         ["code"],
        //         null,
        //         null,
        //         "offcanvasRight"
        //     );
        init_dropzone('#dropzone-images', '#dropzone-preview', '#dropzone-preview-list', 'assets');
        init_dropzone('#dropzone-docs', '#dropzone-doc-preview', '#dropzone-doc-preview-list', 'assets', 'application/pdf', 'doc');
    }
    ajs.apply_ind_roles("Assets");

    $("#assetForm").validate({
        onkeyup: false,
        rules: {
            equipment_type_id: {
                required: true,
            },
            // make_id: {
            //     required: true,
            // },
            // model_id: {
            //     required: true,
            // },
            asset_location: {
                required: true,
            },
            // visual_condition_id: {
            //     required: true,
            // },
            // serial_number: {
            //     required: true,
            // },
            // client_asset_number: {
            //     required: true,
            // },
            // installation_date: {
            // 	required: true,
            // },
            // expiry_date: {
            // 	required: true,
            // },
            // manufacturer_warranty_expiry: {
            // 	required: true,
            // },
            // our_warranty_expiry: {
            // 	required: true,
            // }
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
            var customData = {
                client_id: $("#client_id").val(),
                property_id: $("#property_id").val()
            };

            var sub_button = $(form).find(":submit");
            ajs.submit_button_element = sub_button;
            var action = $(form).attr("action");
            var method = $(form).attr("method");
            var post_data = $(form).serialize() + "&" + $.param(customData);

            if ($("#is_detail_page").val()) {
                ajs.refreshDetailData = get_asset_details;
            }

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

// set asset data in edit page
function load_asset_data(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var asset = result_json.data;

        for (const [key, value] of Object.entries(asset)) {
            if (!ignore_keys.includes(key) && !$("#" + key).hasClass('form-check-input')) {
                $("#" + key).val(value);
            }
        }
        custom_data = asset.custom_data;
        $("input[name=asset_pricing][value='" + asset.asset_pricing + "']").prop("checked", true);

        select2_ajax(
                "#equipment_type_id",
                site_url + "master-record/get_all",
                "master_value",
                {master_code: "EQUIPMENT_TYPES"},
                "offcanvasRight",
                asset.equipment_type_id
                );
        select2_ajax(
                "#make_id",
                site_url + "master-record/get_all",
                "master_value",
                {master_code: "ASSET_MAKE"},
                "offcanvasRight",
                asset.make_id
                );
        select2_ajax(
                "#model_id",
                site_url + "master-record/get_all",
                "master_value",
                {'masters.master_code': "ASSET_MODELS", 'master_values.parent_id': asset.make_id},
                "offcanvasRight",
                asset.model_id
                );
        select2_ajax(
                "#visual_condition_id",
                site_url + "master-record/get_all",
                "master_value",
                {master_code: "VISUAL_CONDITIONS"},
                "offcanvasRight",
                asset.visual_condition_id
                );
        // add_autocomplete_sel(
        //     "#stock_id",
        //     "stocks",
        //     ["name"],
        //     null,
        //     null,
        //     "offcanvasRight",
        //     asset.stock_id
        // );        
        //set_sor_code(asset.sor_code_id);
        //(asset.fixed_price_sor);

        // add_autocomplete_sel(
        //     "#pricing_model",
        //     "pricing_models",
        //     ["code"],
        //     null,
        //     null,
        //     "offcanvasRight",
        //     asset.pricing_model,
        //     asset.pricing_model_code,
        // );
        const files = Object.groupBy(asset.files, ({ type }) => type);
        let images = files['image'] ?? [];
        let documents = files['document'] ?? [];
        init_dropzone('#dropzone-images', '#dropzone-preview', '#dropzone-preview-list', 'assets', 'image/*', 'image', images);
        init_dropzone('#dropzone-docs', '#dropzone-doc-preview', '#dropzone-doc-preview-list', 'assets', 'application/pdf', 'doc', documents);
    } else {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function generate_asset_view_url(property_id, asset_id) {
    var client_id = $("#client_id").val();
    var url = '';
    if (client_id > 0) {
        url = 'clients/' + ajs.hash_encode(client_id) + '/';
    }

    return cdn_url + url + 'properties/' + ajs.hash_encode(property_id) + '/assets/details/' + ajs.hash_encode(asset_id);
}

function set_sor_code(sor_code_id) {
    add_autocomplete_sel(
            "#sor_code",
            "sors",
            ["sor_code"],
            null,
            null,
            "offcanvasRight",
            sor_code_id,
            );
}

function set_fixed_price_sor(sor_code_id) {
    add_autocomplete_sel(
            "#fixed_price_sor",
            "sors",
            ["sor_code"],
            null,
            null,
            "offcanvasRight",
            sor_code_id,
            );
}

function asset_edit_form() {
    asset_create_form('edit');
    var id = $("#edit_id").val();
    $("#asset_id").val(id);
    ajs.ajax_form(
            site_url + "asset/get/" + id,
            null,
            "GET",
            null,
            "1",
            "1",
            load_asset_data,
            load_asset_data
            );
}

// for set data on client detail page
function set_asset_data(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var asset = result_json.data;
        for (const [key, value] of Object.entries(asset)) {
            if (!ignore_keys.includes(key)) {
                if (dates.includes(key)) {
                    $("#detail_" + key).html(ajs.format_date(value));
                } else {
                    $("#detail_" + key).html(value);
                }
            }
        }

        if (asset.status == 1) {
            $("#detail_status").html("Active");
        } else {
            $("#detail_status").html("Inactive");
        }

        if (asset.barcode_path != '' && asset.barcode_path != null)
        {
            $('#detail_barcode').html('<img style="width:100px" src="' + s3_url + asset.barcode_path + '" />');
        }
        if (asset.qr_path != '' && asset.qr_path != null)
        {
            $('#detail_qr').html('<img style="width:100px" src="' + s3_url + asset.qr_path + '" />');
        }

        $("#detail-edit-btn").data('heading', 'Edit Assets - ' + asset.client_asset_number);

        if (asset.custom_data) {
            var detailsHtml = set_custom_details(asset.custom_data);
            $("#custom_details").html(detailsHtml);
        }

        const files = Object.groupBy(asset.files, ({ type }) => type);
        let images = files['image'] ?? [];
        let documents = files['document'] ?? [];

        if (images) {
            var imageHtml = set_images(images);
            $("#detail_images").html(imageHtml);
        }
        if (documents) {
            var documentHtml = set_documents(documents);
            $("#detail_documents").html(documentHtml);
        }

        var property_id = $("#property_id").val();
        ajs.ajax_form(
                site_url + "property/get/" + property_id,
                null,
                "GET",
                null,
                "0",
                "1",
                create_breadcrumb_detail,
                create_breadcrumb_detail,
                asset.client_asset_number
                );
    } else {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

// set images on details page
function set_images(images) {
    var html = '<h4 class="mb-3">Images</h4>';
    $.each(images, function (_, image) {
        // The tile is narrow so its label stays short, but the modal opened from it showed
        // that same shortened text as the description. Give the modal the whole caption;
        // quotes are escaped because this is concatenated into an HTML attribute.
        var full_caption = (image.caption || '').replace(/"/g, '&quot;');
        html += `<div class="col-lg-2 image-upload-thumb">
                    <a target="_blank" class="d-flex align-items-center position-relative view-asset-img" href="" data-bs-toggle="modal" data-bs-target=".image-view-modal" data-img-url="` + get_url_uploaded_file(image.name) + `" data-caption="` + full_caption + `">
                        <i class="ri-download-2-line"></i>
                        <img src="` + get_url_uploaded_file(image.name) + `" alt="" style="width: 80px;">
                        <p class="ms-2 mb-lg-0">` + truncate_string(image.caption, 10) + `</p>
                    </a>
                </div>`;

    });

    return html;
}

// set custom data on details page
function set_custom_details(details) {
    var html = '';
    $.each(details, function (_, data) {
        var value = data.value;
        if (data.type == 'checkbox') {
            value = value == 1 ? 'Yes' : 'No';
        }

        if (data.type == 'date') {
            value = value ? ajs.format_date(value) : '-';
        }

        html += `<tr>
                    <td><b>` + data.label + `</b></td>
                    <td>` + value + `</td>
                </tr>`;

    });

    return html;
}

// set documents on details page
function set_documents(documents) {
    var html = '<h4 class="mb-3">Documents</h4>';
    $.each(documents, function (_, document) {
        const extension = document.name.split('.').pop();
        var logo = extension == 'pdf' ? 'pdf-icon.png' : 'sheets.png';
        html += `<div class="col-lg-2 image-upload-thumb">
                    <a target="_blank" class="d-flex align-items-center position-relative" href="` + get_url_uploaded_file(document.name) + `">
                        <i class="ri-download-2-line"></i>
                        <img src="` + cdn_url + 'assets/images/' + logo + `" alt="" style="width: 25px;">
                        <p class="ms-2 mb-lg-0">` + truncate_string(document.caption, 10) + `</p>
                    </a>
                </div>`;

    });

    return html;
}

function get_asset_details() {
    var id = $("#asset_id").val();
    ajs.ajax_form(
            site_url + "asset/get/" + id,
            null,
            "GET",
            null,
            "1",
            "1",
            set_asset_data,
            set_asset_data
            );
}

function create_custom_fields(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var fields = result_json.data;
        var htmlFields = "";

        $.each(fields, function (_, {type, ...field}) {
            // for get existing value
            var {value} = custom_data.find(data => data.asset_type_field_id == field.id) ?? {value: ''};
            const required = field.is_required == 1 ? 'required' : '';
            const required_label = field.is_required == 1 ? '<span class="text-danger"> *</span>' : '';

            if (type == 'date' && value != '') {
                value = moment(value).format('YYYY-MM-DD');
            }

            if (type == 'checkbox') {
                let checked = value == 1 ? 'checked' : '';

                htmlFields += `<div class="col-xxl-4 col-md-6">
                    <div class="form-check form-check-inline mt-4">
                        <input type="` + type + `" class="form-check-input" id="` + field.name + `" name="custom_fields[` + field.id + `]" value="1" ` + checked + `>
                        <label class="form-check-label">` + field.label + `</label>
                    </div>
                </div>`;
            } else if (type == 'textarea') {
                htmlFields += `<div class="col-xxl-4 col-md-6">
                    <div>
                        <label class="form-label">` + field.label + required_label + `</label>
                        <textarea type="text" class="form-control"  name="custom_fields[` + field.id + `]" ` + required + `>` + value + `</textarea>
                    </div>
                </div>`;
            } else {
                htmlFields += `<div class="col-xxl-4 col-md-6">
                    <div>
                        <label class="form-label">` + field.label + required_label + `</label>
                        <input type="` + type + `" class="form-control" id="` + field.name + `" name="custom_fields[` + field.id + `]" value="` + value + `" ` + required + `>
                    </div>
                </div>`;
        }

        });
        $("#custom-fields-sec").html(htmlFields);
    } else {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function create_breadcrumb(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {
        var property = result_json.data;
        if($('#client_id').val() > 0) {
            var detail_url = 'clients/details/' + ajs.hash_encode(property.client_id);
            var breadcrumbs = [
                {label : 'Clients', url: cdn_url + 'clients/list'},
                {label : property.client_code, url: cdn_url + detail_url},
                {label : 'Properties', url: cdn_url + 'clients/'+ ajs.hash_encode(property.client_id)+'/properties'},
                {label : property.uprn_no, url: cdn_url + 'clients/'+ ajs.hash_encode(property.client_id)+'/properties/details/'+ajs.hash_encode(property.id)},
                {label : 'Assets', url : null}
            ];
        } else {
            var breadcrumbs = [
                {label : 'Properties', url: cdn_url + 'properties/list'},
                {label : property.uprn_no, url: cdn_url + 'properties/details/'+ajs.hash_encode(property.id)},
                {label : 'Assets', url : null}
            ];
        }

        set_breadcrumb(breadcrumbs);

    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

function create_breadcrumb_detail(result_json, asset_number = 'asset')
{
    if (ajs_form_handler.check_result(result_json)) {
        var property = result_json.data;
        if($('#client_id').val() > 0) {
            var detail_url = 'clients/details/' + ajs.hash_encode(property.client_id);
            var breadcrumbs = [
                {label : 'Clients', url: cdn_url + 'clients/list'},
                {label : property.client_code, url: cdn_url + detail_url},
                {label : 'Properties', url: cdn_url + 'clients/'+ ajs.hash_encode(property.client_id)+'/properties'},
                {label : property.uprn_no, url: cdn_url + 'clients/'+ ajs.hash_encode(property.client_id)+'/properties/details/'+ajs.hash_encode(property.id)},
                {label : 'Assets', url: cdn_url + 'clients/'+ ajs.hash_encode(property.client_id)+'/properties/'+ajs.hash_encode(property.id)+'/assets'},
                {label : asset_number, url : null}
            ];
        } else {
            var breadcrumbs = [
                {label : 'Properties', url: cdn_url + 'properties/list'},
                {label : property.uprn_no, url: cdn_url + 'properties/details/'+ajs.hash_encode(property.id)},
                {label : 'Assets', url : '/properties/'+ajs.hash_encode(property.id)+'/assets'},
                {label : asset_number, url : null}
            ];
        }

        set_breadcrumb(breadcrumbs);

    } else {
        ajs_form_handler.show_errors(result_json);
}
}

$(function () {
    if ($("#is_detail_page").val()) {
        get_asset_details();
    }
    $(document).on("change", "#equipment_type_id", function () {
        var id = $(this).val();
        if (id > 0) {
            ajs.ajax_form(site_url + "asset/get-asset-type-fields/" + id, null, "GET", null, "1", "1", create_custom_fields, create_custom_fields);
        }
    });
    $(document).on("change", "#make_id", function () {
        var id = $(this).val();
        if (id > 0) {
            if ($("#model_id").hasClass('select2-hidden-accessible')) {
                $("#model_id").select2().empty()
            }
            select2_ajax("#model_id", site_url + "master-record/get_all", "master_value", {'masters.master_code': "ASSET_MODELS", 'master_values.parent_id': id}, "offcanvasRight");
        }
    });
    $(document).on("click", ".view-asset-img", function () {
        const img_url = $(this).data('img-url');
        const caption = $(this).data('caption');
        $('.image-view-modal').find('figcaption').html(caption);
        $('.image-view-modal').find('img').attr('src', img_url);
        $('.image-view-modal').find('.download-link').attr('href', img_url);
    });
    ajs.apply_ind_roles('Assets');
});
