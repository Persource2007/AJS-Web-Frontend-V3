var phrasebook_user_ids = [];
var master_data_type = "phrasebook";
dataTable = null;
const keys = ["add_date", "added_by", "id", "status"];

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

	dataTable = new DataTable("#phrasebook-datatables", {
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
			url: site_url + "phrasebook/list",
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
                ajs.datatable_error(xhr, "phrasebook-datatables");
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
                        `<a data-after-load-func="edit_form" data-heading="Edit Phrasebook - ` +  row.id + `" data-form-url="` + cdn_url + `system/phrasebook/edit/` + ajs.hash_encode(row.id) +  `"  class="popup-form-button" >`+edit_icon()+`</a>`
                            
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
				name: "title",
				data: "title"
			},
			{
				name: "description",
				data: "description",
				render: function (data) {
					return truncate_string(data, 120);
				},
			},
			{
				data: "types",
				name: "types",
                className:"text-capitalize"
			},			
		],
		order: [["1", "desc"]],
		drawCallback: function () {
			ajs.apply_ind_roles("Phrasebooks");
		},
	});
}

if ($("#phrasebook-datatables").length) {
	select2_ajax('#type_id_filter',site_url + "master-record/get_all","master_value",{master_code: "PHRASEBOOK_TYPE"});
	fetch_default_filter(master_data_type);
	var breadcrumbs = [
		{ label: "System Admin", url: "javascript: void(0);" },
		{ label: "Setup", url: "javascript: void(0);" },
		{ label: "Phrasebooks", url: null },
	];
	set_breadcrumb(breadcrumbs);
}

function create_form(type = "create") {
    $("#phrasebookForm").closest('.offcanvas').addClass('custom-offcanvas-right2').removeClass('custom-offcanvas-right');
	if (type == "create") {
		select2_ajax('#types',site_url + "master-record/get_all","master_value",{master_code: "PHRASEBOOK_TYPE"},"offcanvasRight");
	}

	$("#phrasebookForm").validate({
		onkeyup: false,
		rules: {
			title: {
				required: true,
			},
			description: {
				required: true,
			},
			"types[]": {
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

    $("#modules").select2();
}

// set  data in edit page
function load_data(result_json) {
	if (ajs_form_handler.check_result(result_json)) {
		var phrasebook = result_json.data;

		for (const [key, value] of Object.entries(phrasebook)) {
			if (!keys.includes(key)) {
				$("#" + key).val(value);
			}
		}

        var types = pluck(phrasebook.types, 'type_id');
        select2_ajax('#types',site_url + "master-record/get_all","master_value",{master_code: "PHRASEBOOK_TYPE"},"offcanvasRight", types);
		
	} else {
		ajs_form_handler.show_errors_offcanvas(result_json);
	}
}

function edit_form() {
	create_form("edit");
	var id = $("#edit_id").val();
	ajs.apply_ind_roles('Phrasebooks');
	ajs.ajax_form(
		site_url + "phrasebook/get/" + id + "?edit=true",
		null,
		"GET",
		null,
		"0",
		"0",
		load_data,
		load_data
	);
}

// for set data on detail page
function set_details(result_json) {
	if (ajs_form_handler.check_result(result_json)) {
		var phrasebook = result_json.data;

		var breadcrumbs = [
			{ label: "Phrasebooks", url: cdn_url + "phrasebook/list" },
			{ label: phrasebook.title, url: null },
		];
		set_breadcrumb(breadcrumbs);

		for (const [key, value] of Object.entries(phrasebook)) {
			if (!keys.includes(key)) {
				$("#detail_" + key).html(value);
			}
		}
	} else {
		ajs_form_handler.show_errors(result_json);
	}
}

function get_details() {
	var id = $("#phrasebook_id").val();
	ajs.ajax_form(
		site_url + "phrasebook/get/" + id,
		null,
		"GET",
		null,
		"1",
		"1",
		set_details,
		set_details
	);
}

$(function () {
	if ($("#is_detail_page").val()) {
		get_details();
	}	

	ajs.apply_ind_roles('Phrasebooks');
});
