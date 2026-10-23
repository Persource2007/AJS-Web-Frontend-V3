var master_data_type = "van";
dataTable = null;

function load_data_table(limit, search_term, filters) {
    data_filters = "";
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

    dataTable = new DataTable("#ajax-datatables", {
        scrollY: (screen.height - 450) + 'px',
        searching: false,
        serverSide: true,
        processing: true,
        paging: true,
        bDestroy: true,
        autoWidth: false,
        pageLength: page_limit,
        search: {
            search: search,
        },
        //dom: "Bfrtip",
        // buttons: ["excel"],
        ajax: {
            url: site_url + "van/get_all",
            method: "GET",
            async: false,
            dataSrc: "message.data",
            data: function (d) {
                return $.extend({}, d, {
                    data_filters,
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr) {
                ajs.datatable_error(xhr, "ajax-datatables");
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
                        `<a data-after-load-func="edit_form" data-heading="Edit Van - ` +
                            row.van_code +
                            `" data-form-url="` +
                            cdn_url +
                            `van/edit/` +
                            row.id +
                            `" class="popup-form-button" >`+edit_icon()+`</a>`
                            
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
                name: "make_id",
                data: "make_name",
            },
            {
                name: "model_id",
                data: "model_name",
            },
            {
                name: "van_code",
                data: "van_code",
                // render: function (data, type, row) {
                // 	var str = "";
                // 	str +=
                // 		`<div class="d-flex">
                //                 <div class="avatar-group">
                //                     <a href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="#` +
                // 		data +
                // 		`">` +
                // 		data +
                // 		`</a></div></div>`;

                // 	return str;
                // },
            },
            {
                name: "van_number",
                data: "van_number",
            },
            {
                name: "insurance_due_date",
                data: "insurance_due_date",
                render: function (data) {
                    return ajs.format_date(data);
                },
            },
            {
                name: "service_due_date",
                data: "service_due_date",
                render: function (data) {
                    return ajs.format_date(data);
                },
            },
            {
                name: "driver_name",
                data: "driver_name",
            },
            {
                name: "assigned_engr",
                data: "assigned_engr",
            },
            {
                name: "id",
                data: "id",
                render: function (data, type, row) {
                    var str = '';
                    if (isEmpty(row.assigned_engr))
                    {
                        str += `<a href="javascript:;" class="btn btn-sm btn-outline-dark waves-effect waves-light assign-engr-btn edit-btn" data-id="` + row.id + `" >Assign</a>`;
                    } else
                    {
                        str +=  `<a href="javascript:;" type="button" class="btn btn-sm btn-danger unassign-engr-btn edit-btn" data-id="` + row.id + `">Unassign</a>`;
                    }
                    return str;
                }
            },
            {
                name: "stock_view",
                orderable: false,
                render: function (data, type, row)
                {
                    return `<a style="cursor:pointer" href="` + cdn_url + `van/view-stock/` + ajs.hash_encode(row.id) + `" >View</a>`;
                }
            },
        ],
        order: [["1", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Vans");
        }
    });

    dataTable.buttons().container().appendTo($("#datatable_buttons"));
}

function assign_engi_btn(van_id) {
    return `<button type="button" class="btn btn-sm btn-outline-dark waves-effect waves-light assign-engr-btn edit-btn" data-id="` + van_id + `" >Assign</button>`;
}

if ($("#ajax-datatables").length) {
    select2_ajax(
            "#make_id_filter",
            site_url + "master-record/get_all",
            "master_value",
            {"masters.master_code": "VEHICLE_MAKES"}
    );
    select2_ajax(
            "#model_id_filter",
            site_url + "master-record/get_all",
            "master_value",
            {"masters.master_code": "VEHICLE_MODELS"}
    );

    fetch_default_filter(master_data_type);

    var breadcrumbs = [
        {label: 'System Admin', url: 'javascript: void(0);'},
        {label: 'Locations', url: 'javascript: void(0);'},
        {label: 'Vans', url: null}
    ];
    set_breadcrumb(breadcrumbs);
}

function create_form(type = "create") {
    if (type == "create") {
        select2_ajax(
                "#make_id",
                site_url + "master-record/get_all",
                "master_value",
                {"masters.master_code": "VEHICLE_MAKES"}
        );
        select2_ajax(
                "#model_id",
                site_url + "master-record/get_all",
                "master_value",
                {"masters.master_code": "VEHICLE_MODELS"}
        );
        select2_ajax("#color", site_url + "master-record/get_all", "master_value", {
            "masters.master_code": "COLORS",
        });
        select2_ajax(
                "#insurance_company",
                site_url + "master-record/get_all",
                "master_value",
                {"masters.master_code": "VEHICLE_INSURANCE_COMPANIES"}
        );
    }

    $("#createForm").validate({
        onkeyup: false,
        rules: {
            make_id: {
                required: true,
            },
            model_id: {
                required: true,
            },
            van_code: {
                required: true,
            },
            van_number: {
                required: true,
            },
            vin: {
                required: true,
            },
        },
        messages: {
            make_id: "Select make",
            model_id: "Select Model",
            van_code: "Enter van code",
            van_number: "Enter van number",
            vin: "Enter VIN",
            fleet_number: "Enter fleet number",
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

            var formData = $(form).serializeArray();
            // Modify checkbox value if checked

            ajs.ajax_form(
                    action,
                    formData,
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

// set  data in edit page
function load_data(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var van = result_json.message.data;

        $("#van_code").val(van.van_code);
        $("#van_number").val(van.van_number);
        $("#vin").val(van.vin);
        $("#fleet_number").val(van.fleet_number);
        $("#mileage").val(van.mileage);
        $("#insurance_number").val(van.insurance_number);
        $("#last_insurance_date").val(van.last_insurance_date);
        $("#insurance_due_date").val(van.insurance_due_date);
        $("#last_service_date").val(van.last_service_date);
        $("#service_due_date").val(van.service_due_date);
        $("#last_roadtax_date").val(van.last_roadtax_date);
        $("#roadtax_due_date").val(van.roadtax_due_date);
        $("#last_mot_date").val(van.last_mot_date);
        $("#mot_due_date").val(van.mot_due_date);

        var filter = {"masters.master_code": "VEHICLE_MAKES"};
        var filter2 = {"masters.master_code": "VEHICLE_MODELS"};
        var filter3 = {"masters.master_code": "VEHICLE_INSURANCE_COMPANIES"};
        var filter4 = {"masters.master_code": "COLORS"};
        select2_ajax(
                "#make_id",
                site_url + "master-record/get_all",
                "master_value",
                filter,
                "offcanvasRight",
                van.make_id
                );
        select2_ajax(
                "#model_id",
                site_url + "master-record/get_all",
                "master_value",
                filter2,
                "offcanvasRight",
                van.model_id
                );
        select2_ajax(
                "#insurance_company",
                site_url + "master-record/get_all",
                "master_value",
                filter3,
                "offcanvasRight",
                van.insurance_company
                );
        select2_ajax(
                "#color",
                site_url + "master-record/get_all",
                "master_value",
                filter4,
                "offcanvasRight",
                van.color
                );
    } else {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function edit_form() {
    create_form("edit");
    var id = $("#edit_id").val();
    ajs.apply_ind_roles("Vans");
    ajs.ajax_form(
            site_url + "van/get/" + id + "?edit=true",
            null,
            "GET",
            null,
            "0",
            "0",
            load_data,
            load_data
            );
}

$(function () {
    function assign_form_handler(result_json) {
        ajs_form_handler.hide_errors();
        if (ajs_form_handler.check_result(result_json))
        {
            $('.offcanvas-body').find('.offcanvas-form-errors').remove();
            if (typeof result_json.keep_open !== 'undefined' && result_json.keep_open == '1')
            {

            } else
            {
                $("#assign_modal").modal('hide');
            }
            ajs.refreshDataTable();
            ajs.showAlertBar('success', result_json.message, true);
        } else
        {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error!!!',
                text: result_json.message
            });
            ajs_form_handler.show_errors(result_json);
        }
    }

    const assign_model = $("#assign_modal").html();

    $(document).on("click", ".assign-engr-btn", function () {
        $("#assign_modal").html(assign_model);
        $("#assigned_from").datetimepicker({format: 'd-m-Y H:i', step: 15});

        var van_id = $(this).data('id');
        $('#assign-form').attr('action', site_url + `van/assign/` + van_id);
        add_autocomplete_sel(
                "#assign_engr",
                "users",
                ["first_name", "last_name"],
                null,
                {user_type: 16},
                'assign_modal'
                );

        var validator = $('#assign-form').validate({
            onkeyup: false,
            rules: {
                user_id: {
                    required: true,
                },
                assigned_from: {
                    required: true,
                },
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
                var method = $(form).attr("method");
                var action = $(form).attr("action");
                ajs.set_localtime_to_utc('assigned_from');

                var formData = $(form).serializeArray();
                // Modify checkbox value if checked

                ajs.ajax_form(
                        action,
                        formData,
                        method,
                        null,
                        "1",
                        "1",
                        assign_form_handler,
                        assign_form_handler
                        );

                return false;
            },
        });

        $("#assign_modal").modal('show');
    });

    $(document).on("click", ".unassign-engr-btn", function () {
        var van_id = $(this).data('id');
        Swal.fire({
            title: "Are you sure!",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#fa896b",
            confirmButtonText: "Yes, unassign it!",
        }).then((result) => {
            if (result.isConfirmed) {
                ajs.ajax_form(
                        site_url + `van/unassign/` + van_id,
                        null,
                        'post',
                        null,
                        "1",
                        "1",
                        ajs_form_handler.offcanvas_form,
                        ajs_form_handler.offcanvas_form
                        );
            }
        });

    });

    $(document).on("click", ".sync-ford-btn", function (e) {
        e.preventDefault();
        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "This will sync all vans from Ford server.",
            confirmButtonText: "Yes",
            denyButtonText: "Cancel",
            showDenyButton: true,
            showCancelButton: false,
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Processing...',
                    text: 'Please wait while syncing van.',
                    allowOutsideClick: false,
                    didOpen: () => {
                      Swal.showLoading();
                    }
                });
    
                await new Promise(r => setTimeout(r, 50));
                //ajs.reload = true;
                ajs.ajax_form(site_url + "vans/sync-from-ford", null, "POST", null, "1", "1", function (res) { 
                    ajs_form_handler.api_response(res);
                    ajs.refreshDataTable();
                }, 
                ajs_form_handler.api_response);
            }
        });
    });

    ajs.apply_ind_roles("Vans");
});