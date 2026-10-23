var master_data_type = "assets-type-field";
dataTable = null;
const keys = ["name", "label", "priority"];

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

	dataTable = new DataTable("#field-datatables", {
		scrollY: screen.height - 530 + "px",
		searching: false,
		serverSide: true,
		processing: true,
		paging: true,
		bDestroy: true,
		responsive: false,
		pageLength: page_limit,
		search: {
			search: search,
		},
		//dom: "Bfrtip",
		// buttons: ["excel"],
		ajax: {
			url: site_url + "assets-type-field/get_all",
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
            error: function (xhr) {
                ajs.datatable_error(xhr, "field-datatables");
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
                        `<a data-after-load-func="edit_form" data-heading="Edit Assets Type Field - ` +  row.id + `" data-form-url="` + cdn_url + `system/assets-type-field/edit/` + ajs.hash_encode(row.id) +  `"  class="popup-form-button" >`+edit_icon()+`</a>`
                            
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
				name: "label",
				data: "label",
				render: function (data) {
					return truncate_string(data, 40);
				},
			},
			{
				name: "name",
				data: "name",
				render: function (data) {
					return truncate_string(data, 40);
				},
			},
            {
				name: "asset_type",
				data: "asset_type",
			},
            {
				name: "field_type",
				data: "field_type",
			},
            {
				name: "priority",
				data: "priority",
			},
			{
				data: "is_required",
				name: "is_required",
                render: function (data) {
					return data == 1 ? 'Yes' : 'No';
				},
			},			
		],
		order: [["1", "desc"]],
		drawCallback: function () {
			ajs.apply_ind_roles("Masters");
		},
	});
}

if ($("#field-datatables").length) {
	select2_ajax('#asset_type_id_filter',site_url + "master-record/get_all","master_value",{master_code: "EQUIPMENT_TYPES"});
	fetch_default_filter(master_data_type);
	var breadcrumbs = [
		{ label: "System Admin", url: "javascript: void(0);" },
		{ label: "Setup", url: "javascript: void(0);" },
		{ label: "Assets Type Fields", url: null },
	];
	set_breadcrumb(breadcrumbs);
}

function create_form(type = "create") {
    $("#fieldForm").closest('.offcanvas').addClass('custom-offcanvas-right2').removeClass('custom-offcanvas-right');
	if (type == "create") {
		select2_ajax('#asset_type_id',site_url + "master-record/get_all","master_value",{master_code: "EQUIPMENT_TYPES"},"offcanvasRight");
        add_autocomplete_sel(
            "#field_id",
            "fields",
            ["label"],
            null,
            null,
            "offcanvasRight"
        );        
	}

	$("#fieldForm").validate({
		onkeyup: false,
		rules: {
			name: {
				required: true,
			},
			label: {
				required: true,
			},
			asset_type_id: {
				required: true,
			},
			field_id: {
				required: true,
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
		var field = result_json.data;

		for (const [key, value] of Object.entries(field)) {
			if (keys.includes(key)) {
				$("#" + key).val(value);
			}
		}

        if (field.is_required == 1) {
            $("#is_required").prop("checked", true);
        }

        select2_ajax('#asset_type_id',site_url + "master-record/get_all","master_value",{master_code: "EQUIPMENT_TYPES"},"offcanvasRight", field.asset_type_id);
        add_autocomplete_sel(
            "#field_id",
            "fields",
            ["label"],
            null,
            null,
            "offcanvasRight",
            field.field_id
        );  
		
	} else {
		ajs_form_handler.show_errors_offcanvas(result_json);
	}
}

function edit_form() {
	create_form("edit");
	var id = $("#edit_id").val();
	ajs.apply_ind_roles("Masters");
	ajs.ajax_form(
		site_url + "assets-type-field/get/" + id + "?edit=true",
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

	ajs.apply_ind_roles('Masters');
});
