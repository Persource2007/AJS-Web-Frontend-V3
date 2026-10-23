var service_ids = [];
var master_data_type = "contractor";
dataTable = null;
const keys = [
	"add_date",
	"added_by",
	"id",
	"status",
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

	dataTable = new DataTable("#contractor-datatables", {
            scrollY: (screen.height - 450)+'px',
        responsive: true,
		searching: false,
		serverSide: true,
		processing: true,
		paging: true,
		bDestroy: true,
		pageLength: page_limit,
		search: {
			search: search,
		},
		// buttons: ["excel"],
		ajax: {
			url: site_url + "contractor/get_all",
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
                ajs.datatable_error(xhr, "contractor-datatables");
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
                        `<a data-after-load-func="edit_form" data-heading="Edit Contractor" data-form-url="` +
						cdn_url +
						`contractor/edit/` +
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
				name: "first_name",
				data: "first_name",
				render: function (data, type, row) {
					var str = row.first_name+' '+ row.last_name;

					return str;
				},
			},
			{
				name: "job_type",
				data: "job_type",
				class: "text-capitalize",
				defaultContent: "-",
				render: function (data) {
					return data == "ppm" ? "PPM" : data;
				},
			},
			{
				name: "email",
				data: "email",
			},
			{
				name: "mobile",
				data: "mobile",
			},
			{ data: "address", name: "address" },
			{
				data: "city_name",
				name: "city_name",
			},			
		],
		order: [["1", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Contractors");
        }
	});
}

if ($("#contractor-datatables").length) {
	fetch_default_filter(master_data_type);
    var breadcrumbs = [
        { label: "System Admin", url: "javascript: void(0);" },
		{ label: "Setup", url: "javascript: void(0);" },
        {label : 'Sub Contractors', url: null},
    ];
    set_breadcrumb(breadcrumbs);
}

function create_form(type = "create") {
	if (type == "create") {
		select2_ajax(
			"#city_id",
			site_url + "cities/get_all",
			"title",
			null,
			"offcanvasRight"
		);
	}

	$("#contractorForm").validate({
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
			mobile: {
				required: true,
			},
			job_type: {
				required: true,
			},
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

	ajs.mask_inputs();
}

// set  data in edit page
function load_data(result_json) {
	if (ajs_form_handler.check_result(result_json)) {
		var contractor = result_json.data;

		for (const [key, value] of Object.entries(contractor)) {
			if (!keys.includes(key)) {
				$("#" + key).val(value);
			}
		}

		$("input[name=job_type][value='" + contractor.job_type + "']").prop("checked",true);
		$("input[name=contractor_type][value='" + contractor.type + "']").prop("checked",true);
        if(contractor.logo) {
            $("#profile-preview").attr('src', s3_url +'/'+ contractor.logo);
        }

		select2_ajax(
			"#city_id",
			site_url + "cities/get_all",
			"title",
			null,
			"offcanvasRight",
            contractor.city_id
		);
	} else {
		ajs_form_handler.show_errors_offcanvas(result_json);
	}
}

function edit_form() {
	create_form("edit");
	var id = $("#edit_id").val();
	ajs.apply_ind_roles('Contractors');
	ajs.ajax_form(
		site_url + "contractor/get/" + id + "?edit=true",
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
	
	ajs.apply_ind_roles('Contractors');
});
