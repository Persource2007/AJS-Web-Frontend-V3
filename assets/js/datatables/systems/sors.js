var master_data_type = "sor";
var sor_for = {A: "AJS", N: "National SOR", C: "Client"};
dataTable = null;
function load_data_table(limit, search_term, filters, column_visibility) {
    data_filters = {};
    page_limit = ajs.datatable_limit;
    search = "";
    if (
            typeof filters !== "undefined" &&
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

    dataTable = new DataTable("#ajax-datatables", {
        scrollY: (screen.height - 530) + 'px',
        serverSide: true,
        processing: true,
        paging: true,
        responsive: false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: search,
        },
        // dom: 'Bfrtip',
        // buttons: [
        //     {
        //         extend: "colvis",
        //         text: "Toggle Columns",
        //         collectionLayout: "two-column",
        //         className: "btn btn-outline-dark dropdown-toggle waves-effect waves-light",
        //         init: function (api, node, config) {
        //             $(node).removeClass("dt-button");
        //             $(node).find(".dt-down-arrow").remove();
        //         },
        //     },
        // ],
        ajax: {
            url: site_url + "sor/get_all",
            method: "GET",
            dataSrc: "message.data",
            data: function (d) {
                if ($("#client_id_hidden").val() > 0) {
                    data_filters["sors.client_id"] = $("#client_id_hidden").val();
                    d.with_system_sors = 1;
                }
                return $.extend({}, d, {
                    data_filters,
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr, error, code) {
                ajs.datatable_error(xhr, "ajax-datatables");
            },
        },
        language: {
            emptyTable: "No data found",
        },
        columns: [
            {
                data: null,
                render: function (data, type, row) {
                    return (
                            `<a data-after-load-func="edit_form" data-heading="Edit SOR - ` +
                            row.sor_code +
                            `" data-form-url="` +
                            cdn_url +
                            `system/sor/edit/` +
                            row.id +
                            `"   class="popup-form-button" >` + edit_icon() + `</a>`
                            );
                },
            },
            {
                name: "null",
                data: "null",
                searchable: false,
                orderable: false,
                render: function(data,type,row){
                    if ($("#client_id_hidden").val() > 0) {
                        return (`<input class="form-check-input assign-btn selected_sors" type="checkbox" id="sor${row.id}" value="${ajs.hash_encode(row.id)}" />`);
                    }else{
                        return '';
                    }
                }
            },
            {
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
                render: function (data, type, row) {
                    return row.id;
                },
            }, 
            {
                name: "id",
                data: "id",
            },
            {
                name: "sor_type_name",
                data: "sor_type_name",
                render: function (data, type, row) {
                    return row.sor_type_name;
                },
            },
            {
                name: "sor_code",
                data: "sor_code",
//                render: function (data, type, row) {
//                    var str = "";
//                    str +=
//                            `<div class="d-flex">
//                                    <div class="avatar-group">
//                                        <a  class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="` +
//                            row.sor_code +
//                            `">
//                                            ` +
//                            row.sor_code +
//                            `
//                                        </a>
//                                    </div>
//                                </div>`;
//                    return str;
//                },
            },
            {
                name: "client_sor_code",
                data: "client_sor_code",
                render: function (data, type, row) {
                    return row.client_sor_code;
                },
            },
            {
                name: "company_name",
                data: "company_name",
                render: function (data, type, row) {
                    return row.company_name;
                },
            },
            {
                name: "contract_ids",
                data: "contract_ids",
                render: function (data, type, row) {
                    return row.contract_name;
                },
            },
            {
                name: "workstream_name",
                data: "workstream_name",
                render: function (data, type, row) {
                    return row.workstream_name;
                },
            },
            {
                name: "short_description",
                data: "short_description",
                className: "short-desc",
                // render: function (data) {
                //     return truncate_string(data,40);
                // },
            },
            {
                name: "material_price",
                data: "material_price",
                className: "pricing-col",
                render: function (data) {
                    return data.toFixed(2);
                }
            },
            {
                name: "labor_price",
                data: "labor_price",
                className: "pricing-col",
                render: function (data) {
                    return data.toFixed(2);
                }
            },
            {
                name: "sell_price",
                data: "sell_price",
                className: "pricing-col",
                render: function (data) {
                    return data.toFixed(2);
                }
            },
            {
                name: "certificate_count",
                data: "certificate_count",
                visible: false,
                render: function (data, type, row) {
                    if (row.certificate_count > 0) {
                        return (
                                `<a href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="` +
                                row.certificate_names +
                                `">` +
                                row.certificate_count +
                                `</a>`
                                );
                    } else {
                        return "";
                    }
                },
            },
            {
                name: "added_by",
                data: "added_by",
                render: function (data, type, row) {
                    return row.added_by_name;
                },
            },
            {
                name: "add_date",
                data: "add_date",
                render: function (data, type, row) {
                    return ajs.format_date(row.add_date);
                },
            },
            
        ],
        order: [["2", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("SORs");
        }
    });
    // $("#datatable_buttons").html("");
    // dataTable.buttons().container().appendTo($("#datatable_buttons"));
}

if ($("#ajax-datatables").length) {
    add_autocomplete_sel("#client_id_filter", "clients", ["client_code"], null, null);
    select2_ajax(
            "#sor_type_filter",
            site_url + "master-record/get_all",
            "master_value",
            {master_code: "SOR_TYPES"}
    );
    
    select2_ajax(
            "#workstream_id_filter",
            site_url + "workstream/get_all",
            "title",
            null
            );
    
    fetch_default_filter(master_data_type);



    var client_id = $("#client_id_hidden").val();
    if (client_id > 0) {
        $("#map_sors_hidden").removeClass('hide');
        ajs.ajax_form(site_url + 'client/get/' + client_id, null, 'GET', null, '0', '1', create_breadcrumb, create_breadcrumb);
    } else {
        var breadcrumbs = [
            {label: "System Admin", url: "javascript: void(0);"},
            {label: "Setup", url: "javascript: void(0);"},
            {label: "SORs", url: null},
        ];
        set_breadcrumb(breadcrumbs);
    }


}

$(document).on("change","input.selected_sors",function(){
    var total = $("input.selected_sors").length;
    var selected = $("input.selected_sors:checked").length;
    if(total == selected){
        $("input.allselect").prop("checked",true);
    }else{
        $("input.allselect").prop("checked",false);
    }
});

$(document).on("change","input.allselect",function(){
    if($(this).is(":checked")){
        $("input.selected_sors").prop("checked",true);
    }else{
        $("input.selected_sors").prop("checked",false);
    }
});

function create_form(type) {

    var client_id = $("#client_id_hidden").val();

    $(".client_detail_div").css("display", "none");

    var filter = {master_code: "SOR_TYPES"};
    if (typeof type !== "undefined" && type == "edit") {
    } else {
        select2_ajax(
                "#sor_type",
                site_url + "master-record/get_all",
                "master_value",
                filter,
                "offcanvasRight",
                );
        select2_ajax(
                "#workstream_id",
                site_url + "workstream/get_all",
                "title",
                null,
                "offcanvasRight"
                );
        select2_ajax(
                "#group_sor_id",
                site_url + "sor/get_all",
                "title",
                null,
                "offcanvasRight"
                );
        select2_ajax(
                "#stock_id",
                site_url + "stock/get_all",
                ["name", "manufacturer", "stock_code", "ajs_part_no"],
                null,
                "offcanvasRight"
                );

        //$('.sor_type').val(49).trigger('change');
        $('#stock_id').val('').trigger('change');

        if (client_id > 0) {
            $('#sor_for').val('C');
            $(".client_detail_div").css("display", "");

            select2_ajax("#contract_id", site_url + "contract/get_all", "contract_number", {client_id: client_id}, "offcanvasRight", null, true);

            var company_name = $('#client_company_name').val();
            add_autocomplete_sel(
                    "#client_id",
                    "clients",
                    ["client_code"],
                    null,
                    null,
                    "offcanvasRight",
                    client_id,
                    company_name
                    );



            $('#sor_for').attr('readonly', 'readonly');
            $('#client_id').attr('readonly', 'readonly');
        } else
        {
            add_autocomplete_sel(
                    "#client_id",
                    "clients",
                    ["client_code"],
                    null,
                    null,
                    "offcanvasRight"
                    );


//            select2_ajax("#contract_id", site_url + "contract/get_all", "contract_number", null, "offcanvasRight", null, true);
        }

        select2_ajax(
                $("#certificate_id"),
                site_url + "certificate/get_all",
                "title",
                null,
                "offcanvasRight");

    }

    ajs.mask_inputs();
    $("#addForm").validate({
        onkeyup: false,
        rules: {
            title: {
                required: true,
            },
            sor_code: {
                required: true,
                //alphanumeric: true,
                noSpace: true,
            },
            sor_for: {
                required: true,
                alphanumeric: true,
                noSpace: true,
            },
            sor_type: {
                required: true,
            },
            sell_price: {
                required: true,
                number: true,
            },
            stock_id: {
                required: function () {
                    var sor_type = $("#sor_type").val();
                    if (sor_type == 50) {
                        return false;
                    }
                    return false;
                },
            },
            client_id: {
                required: function () {
                    var sor_for = $("#sor_for").val();
                    if (sor_for == "C") {
                        return true;
                    }
                    return false;
                },
                noSpace: true,
            },
            client_sor_code: {
                required: false,
                noSpace: true,
            },
        },
        messages: {
            title: "Enter SOR Title",
            sor_code: "Enter SOR Code",
            sor_type: "Select SOR Type",
            sor_for: "Select an option",
            //stock_code: "Select Stock Code",
            client_id: "Select Client",
            // client_sor_code: "Enter Client SOR Code",
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
        submitHandler: function (form) {
            var sub_button = $(form).find(":submit");
            ajs.submit_button_element = sub_button;
            var action = $(form).attr("action");
            var method = $(form).attr("method");
            var post_data = $(form).serialize();

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

    $(document).on("change", ".sor_for", function (e) {
        var sel = $(this).val();
        $(".client_detail_div").css("display", "none");
        if (sel == "C") {
            $(".client_detail_div").css("display", "");
        }
    });
    $(document).on("change", ".sor_type", function (e) {
        var sel = $(this).val();
        var selectedText = $('.sor_type').select2('data')[0].text;
        selectedText = selectedText.toString().toLowerCase();
        $(".stock_detail_div").css("display", "none");
        $(".group_sor_div").css("display", "none");
        if (selectedText == 'schedule of rate') {
            $(".stock_detail_div").css("display", "");
        }
        if (selectedText == 'group sor') {
            $(".group_sor_div").css("display", "");
        }
    });

    $(document).on("change", "#client_id", function () {
        var client_id = $(this).val();

        if ($('#contract_id').hasClass('select2-hidden-accessible'))
        {
            $("#contract_id").select2("destroy");
            $('#contract_id').find('option:not(:first)').remove();
            //$("#service_id").empty();
        }
        select2_ajax("#contract_id", site_url + "contract/get_all", "contract_number", {client_id: client_id}, "offcanvasRight", null, true);
    });
}

function load_sor_data(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var sor = result_json.message.data;
        $("#title").val(sor.title);
        $("#sor_code").val(sor.sor_code);
        $("#client_sor_code").val(sor.client_sor_code);
        $("#client_analysis_code").val(sor.client_analysis_code);
        $("#client_budget_code").val(sor.client_budget_code);
        $("#sor_for").val(sor.sor_for).trigger("change");
        $("#material_price").val(sor.material_price);
        $("#labor_price").val(sor.labor_price);
        $("#sell_price").val(sor.sell_price);
        $("#short_description").val(sor.short_description);
        $("#description").val(sor.description);
        $("#engg_accreditation").val(sor.engg_accreditation);

        if (typeof sor.certificates !== "undefined") {
            $.each(sor.certificates, function (index, element) {
                var parent_div = "service_create_certificate_form";
                var input_div = "certificate_input_field_div";
                var length = $("." + input_div).length;
                var cert_template = $("#certificate_input_field_template");
                var data = cert_template.length ? cert_template.clone().removeAttr("id") : $("." + input_div + ":last")
                        .eq(0)
                        .clone();
                data.css("display", "");
                data.addClass(input_div + "_" + length);

                data.find("input[name='is_new_certificate[]']").val("0");
                data.find("input[name='sor_certificate_id[]']").val(element.id);
                data.find("button.remove-parent-btn").attr("data-id", element.id);
                data
                        .find("button.remove-parent-btn")
                        .attr("data-remove", "sor-certificate");
                data
                        .find("button.remove-parent-btn")
                        .attr(
                                "data-remove-url",
                                site_url + "sor/certificate/delete/" + element.id
                                );

                $("#" + parent_div).append(data);
                $("." + input_div + "_" + length)
                        .find(".certificate_id")
                        .addClass("certificate_id_" + length);
                $("." + input_div + "_" + length)
                        .find(".certificate_required")
                        .addClass("certificate_required_" + length);
                //$('.' + input_div + '_' + length).find('.certificate-required-radio').attr('name', 'certificate_required[' + length + ']');
                $(".certificate_required_" + length).val(element.is_required);
                select2_ajax(
                        $(".certificate_id_" + length),
                        site_url + "certificate/get_all",
                        "title",
                        null,
                        "offcanvasRight",
                        element.certificate_id
                        );
            });
        }


        if (typeof sor.child_sors !== "undefined") {
            $.each(sor.child_sors, function (index, element) {
                var parent_div = "group_sor_form";
                var input_div = "group_sor_input_field_div";
                var length = $("." + input_div).length;
                var data = $("." + input_div + ":last").eq(0).clone();
                data.css("display", "");
                data.addClass(input_div + "_" + length);

                data.find("input[name='is_new_group_sor[]']").val("0");
                data.find("button.remove-parent-btn").attr("data-id", element.id);
                data.find("button.remove-parent-btn").attr("data-remove", "sor-certificate");
                data.find("button.remove-parent-btn").attr("data-remove-url", site_url + "sor/child-sor/delete/" + element.id);

                $("#" + parent_div).append(data);
                $("." + input_div + "_" + length).find(".group_sor_id").addClass("group_sor_id_" + length);
                $("." + input_div + "_" + length).find(".group_sor_qty").addClass("group_sor_qty_" + length);
                //$('.' + input_div + '_' + length).find('.certificate-required-radio').attr('name', 'certificate_required[' + length + ']');
                $(".group_sor_qty_" + length).val(element.quantity);
                select2_ajax($(".group_sor_id_" + length), site_url + "sor/get_all", "title", null, "offcanvasRight", element.child_sor_id);
            });
        }

        $(".client_detail_div").css("display", "none");
        $(".stock_detail_div").css("display", "none");
        var sor_for = sor.sor_for;
        var sor_type = sor.sor_type;

        if (sor_for == "C") {
            $(".client_detail_div").css("display", "");
            select2_ajax("#contract_id", site_url + "contract/get_all", "contract_number", {client_id: sor.client_id}, "offcanvasRight", null, true);
            
        }

        if (sor_type == 50) {
            $(".stock_detail_div").css("display", "");
        }

        var filter = {master_code: "SOR_TYPES"};
        select2_ajax(
                "#sor_type",
                site_url + "master-record/get_all",
                "master_value",
                filter,
                "offcanvasRight",
                sor.sor_type
                );

        if (sor.workstream_id !== null && sor.workstream_id !== 'undefined') {
            select2_ajax(
                    "#workstream_id",
                    site_url + "workstream/get_all",
                    "title",
                    null,
                    "offcanvasRight",
                    sor.workstream_id.split(',')
                    );
        } else
        {
            select2_ajax(
                    "#workstream_id",
                    site_url + "workstream/get_all",
                    "title",
                    null,
                    "offcanvasRight");
        }

        if (sor.stock_ids != null && typeof sor.stock_ids !== 'undefined')
        {
            select2_ajax(
                    "#stock_id",
                    site_url + "stock/get_all",
                    ["name", "manufacturer", "stock_code", "ajs_part_no"],
                    null,
                    "offcanvasRight",
                    sor.stock_ids.split(',')
                    );
        } else
        {
            select2_ajax(
                    "#stock_id",
                    site_url + "stock/get_all",
                    ["name", "manufacturer", "stock_code", "ajs_part_no"],
                    null,
                    "offcanvasRight"
                    );
        }

        var client_id = $("#client_id_hidden").val();
        let sor_cont_ids = sor.contract_ids != null ? sor.contract_ids?.split(',') : null;
        if (client_id > 0) {
            //$('#sor_for').val('C');
            //$(".client_detail_div").css("display", "");

            var company_name = $('#client_company_name').val();
            add_autocomplete_sel("#client_id", "clients", ["client_code"], null, null, "offcanvasRight", client_id, company_name);

            //$('#sor_for').attr('readonly', 'readonly');
            $('#client_id').attr('readonly', 'readonly');            
            select2_ajax("#contract_id", site_url + "contract/get_all", "contract_number", {client_id: client_id}, "offcanvasRight", sor_cont_ids, true);
        } else
        {
            if (sor.client_id != null && sor.client_id > 0)
            {
                add_autocomplete_sel(
                        "#client_id",
                        "clients",
                        ["client_code"],
                        null,
                        null,
                        "offcanvasRight",
                        sor.client_id,
                        sor.company_name
                        );

                select2_ajax("#contract_id", site_url + "contract/get_all", "contract_number", {client_id: sor.client_id}, "offcanvasRight", sor_cont_ids, true);
            } else
            {
                add_autocomplete_sel(
                        "#client_id",
                        "clients",
                        ["client_code"],
                        null,
                        null,
                        "offcanvasRight");

            }
        }


        //select2_ajax('#contact_type', site_url + 'master-record/get_all', 'master_value', filter2, 'offcanvasRight');
        //select2_ajax('#preferred_mode_of_contact', site_url + 'master-record/get_all', 'master_value', filter3, 'offcanvasRight');
        //add_autocomplete_sel('#account_manager', 'users', ['first_name', 'last_name'], null, null, 'offcanvasRight', client.ajs_account_manager, client.account_manager_name);
    } else {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function edit_form() {
    create_form("edit");
    var id = $("#edit_id").val();
    ajs.apply_ind_roles("SORs");
    ajs.ajax_form(
            site_url + "sor/get/" + id,
            null,
            "GET",
            null,
            "1",
            "1",
            load_sor_data,
            load_sor_data
            );
}

// for set data on client detail page
function set_sor_data(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var sor = result_json.message.data;
        $("#detail_title").html(sor.title);
        $("#detail_sor_code").html(sor.sor_code);
        $("#detail_sor_type_name").html(sor.sor_type_name);
        $("#detail_service_name").html(sor.service_name);
        var sor_to = sor_for[sor.sor_for] ?? "";
        $("#detail_sor_for").html(sor_to);
        $("#detail_material_price").html(sor.material_price);
        $("#detail_labor_price").html(sor.labor_price);
        $("#detail_sell_price").html(sor.sell_price);
        $("#detail_short_description").html(sor.short_description);
        $("#detail_description").html(sor.description);
        $("#detail_engg_accreditation").html(sor.engg_accreditation);

        if (sor.certificates.length) {
            var certificate_html = '';
            $.each(sor.certificates, function (_, certificate) {
                certificate_html += '<tr><td>' + certificate.title + '</td><td>' + (certificate.is_required == 1 ? 'Yes' : 'No') + '</td></tr>';
            });
            $("#certificate_details").html(certificate_html);
        }

        if (sor.child_sors.length) {
            var sor_html = '';
            $.each(sor.child_sors, function (_, child_sors) {
                sor_html += '<tr><td>' + child_sors.sor_code + '</td><td>' + (child_sors.quantity) + '</td></tr>';
            });
            //$("#child_sor_details").html(sor_html);
        }
    } else {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function get_details() {
    var id = $("#sor_id").val();
    ajs.ajax_form(
            site_url + "sor/get/" + id,
            null,
            "GET",
            null,
            "1",
            "1",
            set_sor_data,
            set_sor_data
            );
}

function create_breadcrumb(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {
        var client = result_json.message.data;

        var detail_url = 'clients/details/' + ajs.hash_encode(client.id);
        var breadcrumbs = [
            {label: 'Clients', url: cdn_url + 'clients/list'},
            {label: client.client_code, url: cdn_url + detail_url},
            {label: 'SORs', url: null}
        ];

        $('#client_company_name').val(client.company_name);

        set_breadcrumb(breadcrumbs);

    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

$(function () {
    if ($("#is_detail_page").val()) {
        get_details();
    }

    ajs.ajax_form_cache(
            site_url + "api/global_var/",
            {var_type: "upload_template", var_name: "sor"},
            "POST",
            null,
            "1",
            "1",
            function (data) {
                if (ajs.check_result(data)) {
                    var temp_path = localStorage.getItem("template_path");
                    $(".bulk-upload-template-button").attr(
                            "href",
                            site_url + JSON.parse(temp_path) + data.message
                            );
                    $(".bulk-upload-template-button").attr("target", "_BLANk");
                }
            }
    );

    ajs.apply_ind_roles('SORs');
});

function map_sors_to_contracts(){

    console.log('here in');

    var client_id = $("#client_id_hidden").val();
    $('div.custom-offcanvas-right').addClass("width-25");
    
    console.log(client_id);

    if (client_id > 0) {
        $('#sor_for').val('C');
        $(".client_detail_div").css("display", "");

        select2_ajax("#contract_id", site_url + "contract/get_all", "contract_number", {client_id: client_id}, "offcanvasRight", null, true);

        $("#hidden_client_id").val(client_id);
    }
    
    var target = $("input.selected_sors:checked");
    var message = '';
    if (target.length >= 1) {
        type = 'primary';
        message = `You have selected ${target.length} sor(s).`;        
    } else {
        message = "No sor selected. Please select at least one sor to continue.";
        type = 'danger';
    }
    $(".bulk-alert-message h6").text(message).addClass(`p-2 text-${type} border border-2 border-${type} fw-bold mb-3`);

        var target = $("input.selected_sors:checked");
    var selected_sors = [];
    target.each(function(){
        selected_sors.push(ajs.hash_decode($(this).val()));
    });
}

$(document).on("click", "#map-sors-btn", function () {
    var target = $("input.selected_sors:checked");
    var contract = $("select#contract_id").val();

    var client_id = $("#hidden_client_id").val();

    var error = 0;

    if(target.length < 1){
        errormsg = "Please select at least one sor before proceeding.";
        error = 1;
    }
    else if(contract.length < 1){
        errormsg = "Please select at least one contract before proceeding.";
        error = 1;
    }
    else if(!client_id){
        errormsg = "Something went wrong , Please try after some time.";
        error = 1;
    }

    if(error == 1){
        Swal.fire({
            title: "Unable to Update",
            icon: "error",
            text: errormsg,
        });
        return false;
    }

    let requetUrl = `${site_url}sor/map_sors`;
    var selected_sors = [];
    target.each(function(){
        selected_sors.push(ajs.hash_decode($(this).val()));
    })
    $textMsg = `Are you sure you want to map the contracts to ${selected_sors.length} selected sors?`;
    if(selected_sors.length <= 1){
        textMsg = `Are you sure you want to map the selected contracts with the selected sors?`;
    }

    Swal.fire({
        title: "Confirmation",
        icon: "warning",
        text: $textMsg,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        showLoaderOnConfirm: true,
        preConfirm: async (message) => {
            try {        
                let formData = $('form.map-sors-form').serialize();
                let additionalData = {sors: selected_sors.join(",")};                
                const fullData = formData + '&' + $.param(additionalData);

                const response = await ajaxWithRefresh({
                    type: 'POST',
                    url: requetUrl,
                    data: fullData,
                });
                if (response.status == false) {
                    Swal.fire({
                        title: `Error!!`,
                        icon: "error",
                        text: response.message
                    });
                    $('div.custom-offcanvas-right').removeClass("width-25");
                    return false;
                }
                $('div.custom-offcanvas-right').removeClass("width-25");
                return response;
            } catch (error) {
                console.log(error);
                var errorMsg = "Something went wrong.please try again...";
                if('responseJSON' in error){
                    errorMsg = $(`<div>${error.responseJSON.message}</div>`).text();
                }
                // Swal.showValidationMessage(`<strong>Error: </strong> ${errorMsg}`);
                Swal.fire({
                        title: `Error!!`,
                        icon: "error",
                        text: errorMsg
                    });
            }
            $('div.custom-offcanvas-right').removeClass("width-25");
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed && result.value.status) {
            Swal.fire({
                title: `Success!!`,
                icon: "success",
                text: result.value.message
            });
            ajs.refreshDataTable();//reload data
            $('button#close-modal').click();
            $("input.allselect").prop("checked",false);
        }
    });
});