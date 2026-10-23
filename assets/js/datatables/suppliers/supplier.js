var service_ids = [];
var master_data_type = "supplier";
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

	dataTable = new DataTable("#supplier-datatables", {
            scrollY: (screen.height - 450)+'px',
		searching: false,
		serverSide: true,
		processing: true,
		paging: true,
		bDestroy: true,
        responsive:false,
		pageLength: page_limit,
		search: {
			search: search,
		},
		//dom: "Bfrtip",
		// buttons: ["excel"],
		ajax: {
			url: site_url + "supplier/get_all",
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
                ajs.datatable_error(xhr, "supplier-datatables");
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
                        `<a href="` + cdn_url + "supplier/details/" +ajs.hash_encode(row.id) +`" >`+view_icon()+`</a>
                        <a data-after-load-func="edit_form" data-heading="Edit Supplier - ` +row.code +`" data-form-url="` +cdn_url +`supplier/edit/` + ajs.hash_encode(row.id) +  `" class="popup-form-button" >`+edit_icon()+`</a>`
                            
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
				name: "name",
				data: "name",				
			},
			{
				name: "code",
				data: "code",
                render: function (data, type, row) {
					var str = "";
					str +=
						`<div class="d-flex">
                                <div class="avatar-group">
                                    <a href="` +cdn_url +
                                    `supplier/details/` +
                                    ajs.hash_encode(row.id) +
                                    `" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="View Supplier">` +
						data +`</a></div></div>`;

					return str;
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
			{
                data: "city_name",
				name: "city_name",
			},
            { data: "postcode", name: "postcode" },
			{
				data: "account_number",
				name: "account_number",
			},
			{
				data: "vat_code",
				name: "vat_code",
			},
			
		],
		order: [["1", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Suppliers");
        }
	});
}

if ($("#supplier-datatables").length) {
	fetch_default_filter(master_data_type);
    var breadcrumbs = [
        {label: 'Stock Management', url: 'javascript: void(0);'},
        {label : 'Suppliers', url: null},
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
		);
	}

	$("#supplierForm").validate({
		onkeyup: false,
		rules: {
			name: {
				required: true,
			},
			email: {
				required: true,
				email: true,
			},
			telephone: {
				required: true,
			},
            code: {
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

            if ($("#is_detail_page").val()) {
                ajs.refreshDetailData = get_details;
            }

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
		var supplier = result_json.data;

        var breadcrumbs = [
            {label: 'Stock Management', url: 'javascript: void(0);'},
            {label : 'Suppliers', url: cdn_url + 'supplier/list'},
            {label : supplier.name, url: null}
        ];
        set_breadcrumb(breadcrumbs);

		for (const [key, value] of Object.entries(supplier)) {
			if (!keys.includes(key)) {
				$("#" + key).val(value);
			}
		}

		select2_ajax(
			"#city_id",
			site_url + "cities/get_all",
			"title",
			null,
			undefined,
            supplier.city_id
		);
	} else {
		ajs_form_handler.show_errors_offcanvas(result_json);
	}
}

function edit_form() {
	create_form("edit");
	var id = $("#edit_id").val();
	ajs.apply_ind_roles("Suppliers");
	ajs.ajax_form(
		site_url + "supplier/get/" + id + "?edit=true",
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
		var supplier = result_json.data;

        var breadcrumbs = [
            {label: 'Stock Management', url: 'javascript: void(0);'},
            {label : 'Suppliers', url: cdn_url + 'supplier/list'},
            {label : supplier.name, url: null}
        ];
        set_breadcrumb(breadcrumbs);

		for (const [key, value] of Object.entries(supplier)) {
			if (!keys.includes(key)) {
				$("#detail_" + key).html(value);
			}
		}
        var address = supplier.address1;
        if(supplier.address2) {
            address += '</br>' + supplier.address2;
        }
        if(supplier.county) {
            address += ', ' + supplier.county;
        }
        if(supplier.city_name) {
            address += '</br>' + supplier.city_name;
        }
        if(supplier.postcode) {
            address += ' - ' + supplier.postcode;
        }

        $("#detail_address").html(address);

        $("#detail-edit-btn").data('heading','Edit Supplier - '+supplier.code);
	} else {
		ajs_form_handler.show_errors(result_json);
	}
}

function get_details() {
	var id = $("#supplier_id").val();
	ajs.ajax_form(
		site_url + "supplier/get/" + id,
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

	ajs.apply_ind_roles('Suppliers');
});
