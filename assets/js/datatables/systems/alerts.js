var master_data_type = "alerts";
dataTable = null;
const keys = ["type", "description", "code", "position", "attribute"];

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

	dataTable = new DataTable("#alert-datatables", {
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
			url: site_url + "master-alert/get_all",
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
                ajs.datatable_error(xhr, "alert-datatables");
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
                        `<a data-after-load-func="edit_form" data-heading="Edit Alert - ` +  row.id + `" data-form-url="` + cdn_url + `system/alert/edit/` + ajs.hash_encode(row.id) +  `"  class="popup-form-button" >`+edit_icon()+`</a>`
                            
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
				name: "code",
				data: "code",
			},
			{
				name: "description",
				data: "description",
				render: function (data) {
					return truncate_string(data, 40);
				},
			},
            {
				name: "type",
				data: "type",
                render: function (data) {
                    if(data == 'PROPERTY_ALERT') {
                        return 'Property Alert';
                    }else if(data == 'RESIDENT_ALERT'){
                        return 'Resident Alert';
                    }else{
                        return data;
                    }
                }
			},
            {
				name: "position",
				data: "position",
			},
            {
				name: "attribute",
				data: "attribute",
			},	
		],
		order: [["1", "desc"]],
		drawCallback: function () {
			ajs.apply_ind_roles("Masters");
		},
	});
}

if ($("#alert-datatables").length) {
	fetch_default_filter(master_data_type);
	var breadcrumbs = [
		{ label: "System Admin", url: "javascript: void(0);" },
		{ label: "Setup", url: "javascript: void(0);" },
		{ label: "Alerts", url: null },
	];
	set_breadcrumb(breadcrumbs);
}

function create_form(type = "create") {
    $("#alertForm").closest('.offcanvas').addClass('custom-offcanvas-right2').removeClass('custom-offcanvas-right');
	if (type == "create") {      
	}

	$("#alertForm").validate({
		onkeyup: false,
		rules: {
			code: {
				required: true,
			},
			description: {
				required: true,
			},
			type: {
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
		var alert = result_json.data;

		for (const [key, value] of Object.entries(alert)) {
			if (keys.includes(key)) {
				$("#" + key).val(value);
			}
		}
		
	} else {
		ajs_form_handler.show_errors_offcanvas(result_json);
	}
}

function edit_form() {
	create_form("edit");
	var id = $("#edit_id").val();
	ajs.apply_ind_roles("Masters");
	ajs.ajax_form(
		site_url + "master-alert/get/" + id + "?edit=true",
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
