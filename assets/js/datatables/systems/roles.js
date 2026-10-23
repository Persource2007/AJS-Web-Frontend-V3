var master_data_type = "role";
dataTable = null;

const rights = ['view_right', 'add_right', 'edit_right', 'delete_right', 'approve_right','import','export'];

const mobile_roles = {
    engineer: 'Engineer',
    surveyor: 'Surveyor',
    rlo: 'RLO',
}

function load_data_table(limit, search_term, filters) {
    data_filters = {};
    page_limit = ajs.datatable_limit;
    search = "";
    if (typeof filters != "undefined" &&
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

    dataTable = new DataTable("#roles-datatables", {
        scrollY: (screen.height - 535)+'px',
        searching: false,
        serverSide: true,
        processing: true,
        paging: true,
        responsive:false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: search,
        },
        // buttons: ["excel"],
        ajax: {
            url: site_url + "role/get_all",
            method: "GET",
            async: false,
            dataSrc: "data",
            data: function (d) {
                return $.extend({}, d, {
                    data_filters,
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr, error, code) {
                ajs.datatable_error(xhr, "roles-datatables");
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
                        `<a href="` + cdn_url + `system/role/edit/` + ajs.hash_encode(row.id) + `" class="edit-btn" >`+edit_icon()+`</a>`                            
                    );
                },
            },
            {
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
            },
            {
                name: "role_code",
                data: "role_code",
                // render: function (data, type, row) {
                //     var str = "";
                //     str += `<div class="d-flex">
                //                 <div class="avatar-group">
                //                     <a href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="#` + data + `">#` + data + `</a>
                //                 </div></div>`;

                //     return str;
                // },
            },
            {data: "title", name: "title"},
            {data: "desktop_access", name: "desktop_access", render: function (data) {
                    return data == 1 ? 'Yes' : 'No'
                }},
            {data: "mobile_access", name: "mobile_access",
                render: function (data, type, row) {
                    let mobile_role =  row.mobile_role ? '(' + mobile_roles[row.mobile_role] + ')' : '';
                    return data == 1 ? 'Yes ' + mobile_role : 'No'
                }
            },            
        ],
        order: [["1", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Roles");
        }
    });
}

if ($("#roles-datatables").length) {
    fetch_default_filter(master_data_type);
    var breadcrumbs = [
		{ label: "System Admin", url: "javascript: void(0);" },
		{ label: "Setup", url: "javascript: void(0);" },
		{ label: "Roles", url: null },
	];
	set_breadcrumb(breadcrumbs);
}

function role_create_form() {

    $("#roleForm").validate({
        onkeyup: false,
        rules: {
            title: {
                required: true,
            },
            role_code: {
                required: true,
            }
        },
        messages: {
            title: {
                required: "Enter role name",
            },
            role_code: {
                required: "Enter role code",
            }
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
            //var post_data = $(form).serialize();

            var formData = $(form).serializeArray();
            // Modify checkbox value if checked

            $("#roleForm input:checkbox:not(.all-module)").each(function () {
                var checkbox_value = $(this).is(':checked') ? 1 : 0;
                formData.push({name: $(this).data('name'), value: checkbox_value});
            });

            ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.form_submit_response, ajs_form_handler.show_errors);

            return false;
        },
    });

}

// set role data in edit page
function load_role_data(result_json) {

    if (ajs_form_handler.check_result(result_json)) {
        var role = result_json.data;

        var breadcrumbs = [
            {label : 'System Admin', url: 'javascript: void(0);'},
            {label : 'Setup', url: 'javascript: void(0);'},
            {label : 'Role Management', url: cdn_url +'system/role/list'},
            {label : role.title, url: null}
        ];
        set_breadcrumb(breadcrumbs);

        $("#title").val(role.title);
        $("#role_code").val(role.role_code);

        if (role.desktop_access == 1) {
            $("#desktop-switch").prop('checked', true);
        } else {
            $("#desktop-switch").prop('checked', false);
            $("#desktop-module").hide();
        }

        if (role.mobile_access == 1) {
            $("#mobile-switch").prop('checked', true);
            $("#mobile-role").show();
        } else {
            $("#mobile-switch").prop('checked', false);
            $("#mobile-role").hide();
        }
        $("#mobile-role input[value=" + role.mobile_role + "]").prop('checked', true);
        $.each(role.modules, function (_, module) {
            set_right_fields(module);
        });

        $('.all-module').each(function () {
            const allCheckbox = $(this).closest('tr').find('input:checkbox:not(.all-module)').length;
            const checkedCheckbox = $(this).closest('tr').find('input:checkbox:checked:not(.all-module)').length;

            if(allCheckbox == checkedCheckbox ) {
                $(this).prop('checked', true);
            }
        });

    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

function role_edit_form() {
    var id = $("#edit_id").val();
    ajs.ajax_form(site_url + "role/get/" + id, null, "GET", null, "0", "0", load_role_data, load_role_data);
}

function set_right_fields(module) {

    $.each(rights, function (_, right) {
        if (module[right] == 1) {
            $("#modules-" + module.module_id + '-' + right).prop('checked', true);
        } else {
            $("#modules-" + module.module_id + '-' + right).prop('checked', false);
        }
    });

    if (module.clients == 1) {
        $("#modules-" + module.module_id + '-clients-assigned').prop('checked', true);
    } else {
        $("#modules-" + module.module_id + '-clients-all').prop('checked', true);
    }
}

function create_module_listing(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var modules = result_json.data;
        var moduleHtml = "";
        $.each(modules, function (_, module) {
            moduleHtml += create_right_fields(module);
        });

        $("#desktop-module tbody").html(moduleHtml);

    } else {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}


function create_right_fields(module) {
    var html = '<tr><td><div>' + module.title + '</div></td><td><div class="form-check"><input class="form-check-input all-module" type="checkbox"></div></td>';

    $.each(rights, function (_, right) {
        if (module[right] == 1) {
            html += `<td>
                        <div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="1" id="modules-` + module.id + `-` + right + `" data-name="modules[` + module.id + `][` + right + `]">
                            </div>
                        </div>
                    </td>`;
        } else {
            html += "<td>-</td>";
        }

    });

    if (module.clients == 1) {
        html += `<td>
                    <div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="modules-` + module.id + `-clients-all" name="modules[` + module.id + `][clients]"  value="0">
                            <label class="form-check-label" for="modules-` + module.id + `-clients-all">All</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="modules-` + module.id + `-clients-assigned" name="modules[` + module.id + `][clients]" value="1" checked>
                            <label class="form-check-label" for="modules-` + module.id + `-clients-assigned">Assigned</label>
                        </div>
                    </div>
                </td>`;
    } else {
        html += "<td>-</td>";
    }

    return html + "</tr>";
}

function get_system_modules() {
    ajs.ajax_form(site_url + "role/get-system-modules", null, "GET", null, "1", "1", create_module_listing, create_module_listing);
}


$(function () {
    if ($("#is_create_page").val()) {
        get_system_modules();
        role_create_form();

        var breadcrumbs = [
            {label : 'System Admin', url: 'javascript: void(0);'},
            {label : 'Setup', url: 'javascript: void(0);'},
            {label : 'Role Management', url: cdn_url +'system/role/list'},
            {label : 'Create Role', url: null}
        ];
        set_breadcrumb(breadcrumbs);
    }

    if ($("#edit_id").val() > 0) {
        role_edit_form();
    }

    $(document).on("click", "#mobile-switch", function () {
        if ($(this).is(":checked")) {
            $("#mobile-role").show();
        } else {
            $("#mobile-role").hide();
        }
    });
    $(document).on("click", "#desktop-switch", function () {
        if ($(this).is(":checked")) {
            $("#desktop-module").show();
        } else {
            $("#desktop-module").hide();
        }
    });
    $(document).on("click", ".all-module", function () {
        if ($(this).is(":checked")) {
            $(this).closest('tr').find('input:checkbox').prop('checked',true);
        } else {
            $(this).closest('tr').find('input:checkbox').prop('checked',false);
        }
    });
});

ajs.apply_ind_roles('Roles');