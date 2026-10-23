var service_ids = [];
var test_instrument_ids = [];
// {<test_instrument_id>: {make, model, serial_number}} - survives re-renders of the rows.
var instrument_values = {};
var master_data_type = "user";
dataTable = null;
const ignore_keys = [
    "add_date",
    "added_by",
    "updated_by",
    "updated_date",
    "user_type",
    "role_id",
    "role_code",
    "city_id",
    "password",
];

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

    dataTable = new DataTable("#users-datatables", {
        scrollY: (screen.height - 530) + 'px',
        searching: true,
        serverSide: false,
        processing: false,
        paging: true,
        responsive: false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: search,
        },
        // buttons: ["excel"],
        ajax: {
            url: site_url + "user/get_all",
            method: "GET",
            dataSrc: "data",
            data: function (d) {
                d.length = 2000; // to fetch all records for client side processing
                return $.extend({}, d, {
                    data_filters,
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr, error, code) {
                ajs.datatable_error(xhr, "users-datatables");
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
                    const logout_btn = logout_icon(row.id, master_data_type);
                    const mfa_btn = row.is_mfa_enabled == 1 ? `<a href="javascript:;" data-id="` + row.id + `"  class="send-mfa-qrcode" >Send MFA QR code</a>` : '';
                    return (
                            `<a data-after-load-func="user_edit_form" data-heading="Edit User - ` + row.username + `" data-form-url="` + cdn_url + `system/user/edit/` + row.id + `" class="popup-form-button" >` + edit_icon() + `</a>
                        ${logout_btn}
                        ${mfa_btn}`
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
                name: "first_name",
                data: "first_name",
                render: function (data, type, row) {
                    var str = row.first_name + ' ' + row.last_name;
                    // str += `<div class="d-flex">
                    //             <div class="avatar-group">
                    //                 <a href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="#` + data + `">` + row.first_name + ' '+row.last_name + `</a>
                    //             </div></div>`;

                    return str;
                },
            },
            {data: "email", name: "email"},
            //   {data: "email", name: "email", render: (data) => ajs.decrypt(data)},
            {data: "role_name", name: "role_name"},
            {data: "mobile", name: "mobile"},
            {data: "address", name: "address"},
            {data: "town", name: "town"},
            {data: "postcode", name: "postcode"},
            {data: "dialpad_user_id", name: "dialpad_user_id",
                render: function (data, type, row) {
                    if(data != null && data != ''){
                        return "<span style='color:green'>Yes</span>";
                    }else{
                        return "<span style='color:red'>No</span>";
                    }
                }
            },
            {
                name: "color_code",
                data: "color_code",
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                    return "<span style='height:30px;width:30px;display:inline-block;background-color:" + row.color_code + "'>&nbsp;</span>";
                }
            },
            {data: "status", name: "status",
                render: function (data) {
                    return status_label(data)
                }
            },
            { data: "role_id", name: "role_id", visible: false }
        ],
        order: [["1", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Users");
        }
    });
}

if ($("#users-datatables").length) {
    select2_ajax('#role_id_filter', site_url + 'role/get_all', 'title', null);
    load_data_table();
    var breadcrumbs = [
        {label: "System Admin", url: "javascript: void(0);"},
        {label: "Setup", url: "javascript: void(0);"},
        {label: "Users", url: null},
    ];
    set_breadcrumb(breadcrumbs);
}

function status_label(value) {
    if (value == 1) {
        var icon = `<span class="badge  border border-success text-success">Active</span>`;
    } else {
        var icon = `<span class="badge  border border-danger text-danger">Inactive</span>`;
    }
    return icon;
}
let inc_no = 1;
$(document).on("click", "button.remove-connection", function () {
    $(this).prop("disabled", true);
    $(this).closest('.row').remove();
    $(this).prop("disabled", false);
});

$(document).on("click", "button.add-connections", function () {
    $(this).prop("disabled", true);
    var row = $('.ajs_contracts_row').html();
    row = row.replaceAll('"ajs_clients"', `"ajs_clients${inc_no}"`)
    row = row.replaceAll('"ajs_contracts"', `"ajs_contracts${inc_no}"`)
    $("#client_ajs_contact_form").append(row);
    add_autocomplete_sel(`#client_ajs_contact_form #ajs_clients${inc_no}`, "clients", ["client_code"], null, null);
    inc_no++;
    $(this).prop("disabled", false);
})

// Bound to select2:select rather than change: add_autocomplete_sel() fires a plain 'change' when it
// appends a preselected option, so 'change' would also run while an existing user's saved rows are
// being built for edit - and would then re-tick every contract over their saved selection.
$(document).on('select2:select', 'select[id^="ajs_clients"]', function () {
    load_client_contracts($(this), true);
});

$(document).on('select2:clear', 'select[id^="ajs_clients"]', function () {
    load_client_contracts($(this), false);
});

$(document).on('select2:select', 'select[id^="ajs_contracts"]', function () {
    clear_contract_error($(this));
});

// Rebuilds the contracts select paired with this client select. Picking a client ticks all of that
// client's active contracts by default; inactive ones stay searchable in the list but are not
// ticked, so an already-saved inactive assignment is never auto-added or silently dropped.
function load_client_contracts($client, select_all) {
    var client = $client.val();
    var selector = '#client_ajs_contact_form #' + $client.attr("id").replace('_clients', '_contracts');
    var $contracts = $(selector);

    clear_contract_error($contracts);

    if ($contracts.data('select2')) {
        $contracts.val('').trigger('change'); // Destroy Select2 instance
        $contracts.select2('destroy'); // Destroy Select2 instance
    }
    $contracts.empty();

    // The list itself is never filtered on contract_active, so inactive contracts stay selectable.
    var init_contracts = function () {
        return add_autocomplete_sel(selector, 'contracts', ['contract_number'], null, {client_id: client}, 'offcanvasRight');
    };

    if (!client || !select_all) {
        init_contracts();
        return;
    }

    ajaxWithRefresh({
        url: site_url + "api/autocomplete",
        type: "GET",
        dataType: 'json',
        data: {
            table: 'contracts',
            fields: ['contract_number'],
            add_fields: '',
            filters: {client_id: client, contract_active: 1},
            id_field: 'id',
            limit: 1000
        }
    }).then(function (data) {
        // 'No results found' comes back as a string rather than a list.
        var active_contracts = Array.isArray(data?.message) ? data.message : [];
        init_contracts().then(function () {
            $.each(active_contracts, function (_, contract) {
                $contracts.append(new Option(contract.label, contract.id, true, true));
            });
            $contracts.trigger('change');
        });
    }).catch(function () {
        // Auto-ticking is a convenience - never leave the row without a usable dropdown.
        init_contracts();
    });
}

function contract_error_target($contracts) {
    var $container = $contracts.next('.select2-container');
    return $container.length ? $container : $contracts;
}

function clear_contract_error($contracts) {
    $contracts.closest('.input-light').find('label.ajs-contract-error').remove();
}

// A client row carrying no contract grants the user nothing, and on edit store_contracts() deletes
// whatever they had - so a row with a client must keep at least one contract. jQuery Validate cannot
// express this: it de-duplicates elements by name, so only the first ajs_contracts[] would be checked.
function validate_client_contracts() {
    var $first_invalid = null;

    $('#client_ajs_contact_form').find('select[id^="ajs_clients"]').each(function () {
        var $client = $(this);
        var $contracts = $('#client_ajs_contact_form #' + $client.attr("id").replace('_clients', '_contracts'));
        var contracts = $contracts.val();

        clear_contract_error($contracts);

        if ($client.val() && (!contracts || contracts.length === 0)) {
            contract_error_target($contracts).after('<label class="error ajs-contract-error">Please select at least one contract for this client.</label>');

            if (!$first_invalid) {
                $first_invalid = $contracts;
            }
        }
    });

    if ($first_invalid) {
        var $row = $first_invalid.closest('.row');
        if ($row.length) {
            $row[0].scrollIntoView({behavior: 'smooth', block: 'center'});
        }
        return false;
    }

    return true;
}

function user_create_form(type = 'create') {
    service_ids = [];
    test_instrument_ids = [];
    instrument_values = {};

    if (type == 'create') {
        select2_ajax('#user_type', site_url + "master-record/get_all", "master_value", {master_code: "USER_TYPES"}, "offcanvasRight");
        select2_ajax('#role_id', site_url + 'role/get_all', 'title', null, 'offcanvasRight');
        //select2_ajax('#city_id', site_url + 'cities/get_all', 'title', null, 'offcanvasRight');
        select2_ajax('#department_id', site_url + 'department/get_all', 'title', null, 'offcanvasRight');
        select2_ajax('#skill_ids', site_url + 'skill/get_all', 'title', null, 'offcanvasRight');
        select2_ajax('#workstream_id', site_url + 'workstream/get_all', 'title', null, 'offcanvasRight');
        select2_ajax('#test_instrument_ids', site_url + "master-record/get_all", "master_value", {master_code: "TEST_INSTRUMENTS"}, "offcanvasRight");
        add_autocomplete_sel("#client_ajs_contact_form #ajs_clients0", "clients", ["client_code"], null, null);
        add_autocomplete_sel(
                "#contractor_id",
                "contractors",
                ["first_name", "last_name"],
                null,
                {type:'ajs'},
                "offcanvasRight"
                );
    }

    $("#userForm").validate({
        onkeyup: false,
        rules: {
            first_name: {
                required: true,
            },
            last_name: {
                required: true,
            },
            email: {
                required: true,
                email: true,
            },
            username: {
                required: true,
            },
            user_type: {
                required: true,
            },
            role_id: {
                required: true,
            },
            password: {
                minlength: 6,
            },
            confirm_password: {
                minlength: 6,
                equalTo: "#password"
            }
        },
        messages: {
            confirm_password: {equalTo: "Confirm password does not match."},
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

            if (!validate_client_contracts()) {
                return false;
            }

            var sub_button = $(form).find(":submit");
            ajs.submit_button_element = sub_button;
            var action = $(form).attr("action");
            var method = $(form).attr("method");
            //var post_data = $(form).serialize();

            var formData = $(form).serializeArray();
            // Modify checkbox value if checked

            $("#userForm input:checkbox:not(.all-module)").each(function () {
                var checkbox_value = $(this).is(':checked') ? 1 : 0;
                formData.push({name: $(this).data('name'), value: checkbox_value});
            });

            ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.offcanvas_form, ajs_form_handler.offcanvas_form);

            return false;
        },
    });
    $('#working_hour').daterangepicker({
        timePicker: true,
        timePickerIncrement: 5,
        autoApply: true,
        autoUpdateInput: true,
        startDate: moment('10:00', 'HH:mm'),
        endDate: moment('10:00', 'HH:mm').add(9, 'hour'),
        locale: {
            format: 'hh:mm A'
        }

    }).on('show.daterangepicker', function (ev, picker) {
        picker.container.addClass('custom-timerange-picker');
    });

    ajs.mask_inputs();

}

// set role data in edit page
function load_user_data(result_json) {

    if (ajs_form_handler.check_result(result_json)) {
        var user = result_json.data;

        for (const [key, value] of Object.entries(user)) {
            if (!ignore_keys.includes(key) && !$("#" + key).hasClass('form-check-input')) {
                $("#" + key).val(value);
            }
        }

        if (user.poie == 1) {
            $("#poie").prop("checked", true);
        }
        if (user.is_dialpad_user == 1) {
            $("#is_dialpad_user").prop("checked", true);
        }
        if (user.is_contract_engineer == 1) {
            $("#is_contract_engineer").prop("checked", true);
        }

        if (user.status == 1) {
            $("#user-status").prop("checked", true);
        } else {
            $("#user-status").prop("checked", false);
        }

        if (user.enable_geo_location == 1) {
            $("#geo_location_tracking").prop("checked", true);
        } else {
            $("#geo_location_tracking").prop("checked", false);
        }
        
        if (user.allow_worksheet_submission == 1) {
            $("#enable_worksheet_submission").prop("checked", true);
        } else {
            $("#enable_worksheet_submission").prop("checked", false);
        }

        if (user.profile_pic) {
            $("#profile-preview").attr('src', s3_url + '/' + user.profile_pic);
        }

        service_id = user.service_id;
        var skills = [];

        $.each(user.skills, function (_, {skill_id}) {
            skills.push(skill_id);
        });

        $.each(user.services, function (_, {service_id}) {
            service_ids.push(service_id);
        });

        test_instrument_ids = [];
        instrument_values = {};
        $.each(user.test_instruments, function (_, row) {
            test_instrument_ids.push(row.test_instrument_id);
            instrument_values[row.test_instrument_id] = {
                make: row.make,
                model: row.model,
                calibration_date: row.calibration_date,
                serial_number: row.serial_number
            };
        });

        select2_ajax('#user_type', site_url + "master-record/get_all", "master_value", {master_code: "USER_TYPES"}, "offcanvasRight", user.user_type);
        select2_ajax('#role_id', site_url + 'role/get_all', 'title', null, 'offcanvasRight', user.role_id);
        //select2_ajax('#city_id', site_url + 'cities/get_all', 'title', null, 'offcanvasRight', user.city_id);
        select2_ajax('#department_id', site_url + 'department/get_all', 'title', null, 'offcanvasRight', user.department_id);
        select2_ajax('#skill_ids', site_url + 'skill/get_all', 'title', null, 'offcanvasRight', skills);
        select2_ajax('#workstream_id', site_url + 'workstream/get_all', 'title', null, 'offcanvasRight', user.workstream_id);
        select2_ajax('#test_instrument_ids', site_url + "master-record/get_all", "master_value", {master_code: "TEST_INSTRUMENTS"}, "offcanvasRight", test_instrument_ids);
        add_autocomplete_sel(
                "#contractor_id",
                "contractors",
                ["first_name", "last_name"],
                null,
                {type:'ajs'},
                "offcanvasRight",
                user.contractor_id
                );

        if (user.contracts) {
            var row = $('.ajs_contracts_row').html();
            $.each(user.contracts, function (i, data) {
                row1 = row;
                row1 = row1.replaceAll('"ajs_clients"', `"ajs_clients${inc_no}"`)
                row1 = row1.replaceAll('"ajs_contracts"', `"ajs_contracts${inc_no}"`)
                $("#client_ajs_contact_form").append(row1);
                add_autocomplete_sel(`#client_ajs_contact_form #ajs_clients${inc_no}`, "clients", ["client_code"], null, null, "offcanvasRight", data.client_id);
                var contracts = data.contracts.split(",");
                add_autocomplete_sel(`#client_ajs_contact_form #ajs_contracts${inc_no}`, 'contracts', ['contract_number'], null, {client_id: data.client_id}, 'offcanvasRight', contracts);
                inc_no++;
            });
        }

        if (user.is_contract_engineer == 1) {
            $("#contractor-sec").show();
        }

        // Drive the engineer block off the fetched record rather than the #role_id change
        // that select2_ajax fires, whose timing differs between its cached and ajax branches.
        toggle_engineer_details(user.role_code);
        render_instrument_rows();

        $("#send_verification_link").parent().parent().parent().hide();
        $(".pwd-sec").show();

    } else {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function user_edit_form() {
    user_create_form('edit');
    var id = $("#edit_id").val();
    ajs.apply_ind_roles('Users');
    ajs.ajax_form(site_url + "user/get/" + id, null, "GET", null, "0", "0", load_user_data, load_user_data);
}

function set_username(response) {
    if (ajs_form_handler.check_result(response)) {
        $("#username").val(response.data);
    }
}

// Engineer Id + Test Instruments belong to the Engineer role only (roles.role_code = 'ENG').
function toggle_engineer_details(role_code) {
    if (role_code === 'ENG') {
        $("#engineer-details").show();
    } else {
        $("#engineer-details").hide();
    }
}

// Keep whatever is currently typed, so re-rendering after a selection change does not
// wipe rows the user has already filled in.
function harvest_instrument_values() {
    $("#instrument-rows .instrument-row").each(function () {
        var $row = $(this);
        instrument_values[$row.data('instrument-id')] = {
            make: $row.find(".instrument-make").val(),
            model: $row.find(".instrument-model").val(),
            calibration_date: $row.find(".instrument-calibration").val(),
            serial_number: $row.find(".instrument-serial").val()
        };
    });
}

// Make / Model / Calibration date / Serial Number are per instrument, so each selected
// instrument gets its own row. Inputs are keyed by instrument id - instrument_make[7]
// etc. - so the values stay matched to their instrument whatever order the selection
// ends up in.
function render_instrument_rows() {
    harvest_instrument_values();

    var $rows = $("#instrument-rows").empty();
    var count = 0;

    // Read the options rather than select2's data so this works whether or not select2
    // has finished initialising.
    $("#test_instrument_ids option:selected").each(function () {
        var id = this.value;
        if (!id) {
            return;
        }

        var values = instrument_values[id] || {};
        var $row = $(
                '<div class="row gy-2 instrument-row align-items-end mb-2">' +
                '<div class="col-xxl-2 col-md-4"><label class="form-label mb-1 fw-semibold instrument-name"></label></div>' +
                '<div class="col-xxl-2 col-md-4"><label class="form-label">Make</label><input type="text" class="form-control instrument-make" maxlength="150"></div>' +
                '<div class="col-xxl-2 col-md-4"><label class="form-label">Model</label><input type="text" class="form-control instrument-model" maxlength="150"></div>' +
                '<div class="col-xxl-3 col-md-6"><label class="form-label">Calibration Date</label><input type="date" class="form-control instrument-calibration"></div>' +
                '<div class="col-xxl-3 col-md-6"><label class="form-label">Serial Number</label><input type="text" class="form-control instrument-serial" maxlength="150"></div>' +
                '</div>');

        $row.attr("data-instrument-id", id);
        $row.find(".instrument-name").text(this.text);
        $row.find(".instrument-make").attr("name", "instrument_make[" + id + "]").val(values.make || '');
        $row.find(".instrument-model").attr("name", "instrument_model[" + id + "]").val(values.model || '');
        $row.find(".instrument-calibration").attr("name", "instrument_calibration_date[" + id + "]").val(values.calibration_date || '');
        $row.find(".instrument-serial").attr("name", "instrument_serial_number[" + id + "]").val(values.serial_number || '');

        $rows.append($row);
        count++;
    });

    if (count) {
        $("#instrument-detail-sec").show();
    } else {
        $("#instrument-detail-sec").hide();
    }
}

function clear_engineer_details() {
    test_instrument_ids = [];
    instrument_values = {};
    $("#engineer_code").val('');
    $("#test_instrument_ids").val(null).trigger('change');
}

$(function () {
    $('#search_term').on('keyup', function () {
        dataTable.search(this.value).draw();
    });

    $('#role_id_filter').on('change', function () {
        let val = $(this).val();
        
        if (val) {
            dataTable.column(12).search('^' + val + '$', true, false).draw(); // 12 = role column index
        } else {
            dataTable.column(12).search('').draw();
        }
    });

    $(document).on("click", "#password-addon", function (e) {
        var ele = $(this).parent().find(".password-input");
        "password" === ele.attr('type') ? ele.attr('type', 'text') : ele.attr('type', 'password');
    });

    $(document).on("change", "#user_type", function () {
        var {text: user_type} = $(this).select2('data')[0] ?? {text: 'select'};
        if (user_type.toLowerCase() == 'engineer') {
            $("#work-details").show();
            $(".engr-section").removeClass('hide');
            $("#worksheet-sec").show();
        } else if (user_type.toLowerCase() == 'rlo') {
            $("#work-details").show();
            $("#worksheet-sec").show();
            $(".engr-section").addClass('hide');
        } else {
            $("#work-details").hide();
            $("#worksheet-sec").hide();
            $(".engr-section").addClass('hide');
        }

        // if (user_type.toLowerCase() == 'contractor') {
        //     $("#contractor-sec").show();
        // } else {
        //     $("#contractor-sec").hide();
        // }
    });

    $(document).on("change", "#role_id", function () {
        // select2_ajax keeps the whole API row on each option as `item`, so role_code
        // is available without any extra lookup.
        var selected = $(this).select2('data')[0];
        var role_code = (selected && selected.item) ? selected.item.role_code : '';

        toggle_engineer_details(role_code);

        // Picked Engineer, then changed their mind - drop the details so a non-engineer
        // is not saved holding an engineer id. Add screen only; on edit the stored values
        // are deliberately left intact.
        if (role_code !== 'ENG' && !$("#edit_id").val()) {
            clear_engineer_details();
        }
    });

    $(document).on("change", "#test_instrument_ids", function () {
        render_instrument_rows();
    });

    $(document).on("change", "#is_contract_engineer", function () {

        if ($(this).is(':checked')) {
            $("#contractor-sec").show();
        } else {
            $("#contractor-sec").hide();
            $("#contractor_id").val(null).trigger('change');
        }
    });
    $(document).on("change", "#send_verification_link", function () {

        if ($(this).is(':checked')) {
            $(".pwd-sec").hide();
        } else {
            $(".pwd-sec").show();
        }
    });

    $(document).on("change", "#first_name,#last_name", function () {
        const first_name = $('#first_name').val();
        const last_name = $('#last_name').val();
        if (first_name && last_name) {
            ajs.ajax_form(site_url + "user/generate_username", {first_name, last_name}, "POST", null, "0", "0", set_username, set_username);
        }
    });

    $(document).on('input', '#username', function () {
        this.value = this.value.replace(/\s/g, '');
    });

    $(document).on("click", ".send-mfa-qrcode", function () {
        const user_id = $(this).data('id');
        if (user_id) {
            ajs.ajax_form(site_url + "user/send_qrcode_email", {user_id}, "POST", null, "1", "1", ajs_form_handler.api_response, ajs_form_handler.api_response);
        }
    });

    $(document).on("change", "#workstream_id", function () {
        var id = $(this).val();
        if (id > 0) {
            if ($("#service_ids").hasClass('select2-hidden-accessible')) {
                $("#service_ids").select2().empty()
            }
            select2_ajax("#service_ids", site_url + "service/workstream/" + id, "title", null, "offcanvasRight", service_ids);
        }
    });

    $('.sync-dialpad-user').on('click', function() {        

        ajs.ajax_form(site_url + "users/sync_dialpad_user", null, "GET", null, "0", "0", null, null, function (response) {
            if (response) {
                console.log(response);
            }
        }); 
    });

    ajs.apply_ind_roles('Users');
});
