var tag_user_ids = [];
var master_data_type = "tag";
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

	dataTable = new DataTable("#tag-datatables", {
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
			url: site_url + "tag/get_all",
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
                ajs.datatable_error(xhr, "tag-datatables");
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
                        `<a data-after-load-func="edit_form" data-heading="Edit tag - ` +  row.id + `" data-form-url="` + cdn_url + `system/tag/edit/` + ajs.hash_encode(row.id) +  `"  class="popup-form-button" >`+edit_icon()+`</a>`
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
				data: "title",
			},
			{
				name: "description",
				data: "description",
				render: function (data) {
					return truncate_string(data, 40);
				},
			},
			{
				data: "modules",
				name: "modules",
                className:"text-capitalize"
			},
			
		],
		order: [["1", "desc"]],
		drawCallback: function () {
			ajs.apply_ind_roles("Tags");
		},
	});
}

if ($("#tag-datatables").length) {
	$("#module_filter").select2();
	fetch_default_filter(master_data_type);
	var breadcrumbs = [
		{ label: "System Admin", url: "javascript: void(0);" },
		{ label: "Setup", url: "javascript: void(0);" },
		{ label: "Tags", url: null },
	];
	set_breadcrumb(breadcrumbs);
}

// set  data in edit page
function load_data(result_json) {
	if (ajs_form_handler.check_result(result_json)) {
		var tag = result_json.data;

		for (const [key, value] of Object.entries(tag)) {
			if (!keys.includes(key)) {
				$("#" + key).val(value);
			}
		}

        var modules = pluck(tag.modules, 'module');
        $("#modules").val(modules).trigger('change.select2');
		
	} else {
		ajs_form_handler.show_errors_offcanvas(result_json);
	}
}

function edit_form() {
	create_tag_form("edit");
	var id = $("#edit_id").val();
	ajs.apply_ind_roles("Tags");
	ajs.ajax_form(
		site_url + "tag/get/" + id + "?edit=true",
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
		var tag = result_json.data;

		var breadcrumbs = [
			{ label: "tags", url: cdn_url + "tag/list" },
			{ label: tag.title, url: null },
		];
		set_breadcrumb(breadcrumbs);

		for (const [key, value] of Object.entries(tag)) {
			if (!keys.includes(key)) {
				$("#detail_" + key).html(value);
			}
		}
	} else {
		ajs_form_handler.show_errors(result_json);
	}
}

function get_details() {
	var id = $("#tag_id").val();
	ajs.ajax_form(
		site_url + "tag/get/" + id,
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
    
	ajs.apply_ind_roles('Tags');
});
