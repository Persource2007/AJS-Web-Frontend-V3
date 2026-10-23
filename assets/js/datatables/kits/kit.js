var master_data_type = "kit";
var deleted_kit_items = [];
dataTable = null;
var keys = ["title", "type_id"];

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

	dataTable = new DataTable("#kit-datatables", {
            scrollY: (screen.height - 480)+'px',
		searching: false,
		serverSide: true,
		processing: true,
		paging: true,
		bDestroy: true,
		pageLength: page_limit,
		search: {
			search: search,
		},
		//dom: "Bfrtip",
		// buttons: ["excel"],
		ajax: {
			url: site_url + "kit/get_all",
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
                ajs.datatable_error(xhr, "kit-datatables");
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
                        `<a data-after-load-func="edit_form" data-heading="Edit kit - ` +
                            row.id +
                            `" data-form-url="` +
                            cdn_url +
                            `kit/edit/` +
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
				name: "title",
				data: "title",
				// render: function (data, type, row) {
				// 	var str = "";
				// 	str +=
				// 		`<div class="d-flex">
                //                 <div class="avatar-group">
                //                     <a href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="#` +
				// 		data +
				// 		`">` +
				// 		data +
				// 		`</a>
                //                 </div>
                //                 </div>`;

				// 	return str;
				// },
			},
            {
				name: "type",
				data: "type",
			},
			{
				name: "price_type",
				data: "price_type",
				class: "text-capitalize",
				defaultContent: "-",
				render: function (data) {
					return data;
				},
			},			
			{ data: "sor_code", name: "sor_code" },
		],
		order: [["0", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Kits");
        }
	});
}

if ($("#kit-datatables").length) {
	select2_ajax(
		"#type_id_filter",
		site_url + "master-record/get_all",
		"master_value",
		{ master_code: "KIT_TYPES" }
	);
	fetch_default_filter(master_data_type);

    var breadcrumbs = [
        {label: 'Stock Management', url: 'javascript: void(0);'},
        {label: "Manage Kits", url: null},
    ];
    set_breadcrumb(breadcrumbs);
}

function create_form(type = "create") {
	console.log("create form called");
	if (type == "create") {
		select2_ajax(
			"#type_id",
			site_url + "master-record/get_all",
			"master_value",
			{ master_code: "KIT_TYPES" }
		);
        select2_ajax('#sor_id', site_url + 'sor/get_all', 'sor_code', null, 'offcanvasRight');
	}

	$("#kitForm").validate({
		onkeyup: false,
		rules: {
			type_id: {
				required: true,
			},
			title: {
				required: true,
			},
			price_type: {
				required: true,
			},
		},
		errorPlacement: function (error, element) {
			if (
				element.hasClass("select2") &&
				element.next(".select2-container").length
			) {
				error.insertAfter(element.next(".select2-container"));
			} else if (
				element.parent(".input-group").length ||
				element.parent(".error-div").length
			) {
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
			formData.push({name: 'deleted_kit_items', value:deleted_kit_items});

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
		var kit = result_json.data;

		for (const [key, value] of Object.entries(kit)) {
			if (keys.includes(key)) {
				$("#" + key).val(value);
			}
		}

		$("input[name=price_type][value='" + kit.price_type + "']").prop(
			"checked",
			true
		).trigger('change');

		select2_ajax(
			"#type_id",
			site_url + "master-record/get_all",
			"master_value",
			{ master_code: "KIT_TYPES" },
			"offcanvasRight",
			kit.type_id
		);
        select2_ajax('#sor_id', site_url + 'sor/get_all', 'sor_code', null, 'offcanvasRight',kit.sor_id);
		set_kit_items(kit.items);
	} else {
		ajs_form_handler.show_errors_offcanvas(result_json);
	}
}

// ser items on edit page
function set_kit_items(items) {
    var kitItems = "";
	$.each(items, function (index, item) {
        kitItems +=   `<tr>
            <td class="dtr-control hide">
                <input type="hidden" name="items[`+index+`][id]" value="`+item.id+`" class="row-id">
                <input type="hidden" name="items[`+index+`][stock_id]" value="`+item.stock_id+`" class="item-id">
            </td>
            <td>`+item.manuf_part_no+`</td>
            <td>`+item.name+`</td>
            <td class=" text-capitalize">`+item.type+`</td>
            <td class="pricing-col">`+item.price_per_unit+`</td>
            <td><input type="number" class="form-control w-50" name="items[`+index+`][quantity]" value="`+item.quantity+`"></td>
            <td class="text-end pe-0"><button type="button" class="btn btn-danger delete-kit-item popup-add-btn"><i class="ri-close-line"></i></button></td>
        </tr>`;
	});
    $("#table-items").html(kitItems);
}

// ser items on detail page
function set_kit_item_details(items) {
    var kitItems = "";
	$.each(items, function (index, item) {
        kitItems +=   `<tr>
            <td>`+item.manuf_part_no+`</td>
            <td>`+item.name+`</td>
            <td class=" text-capitalize">`+item.type+`</td>
            <td class="pricing-col">`+item.price_per_unit+`</td>
            <td>`+item.quantity+`</td>
        </tr>`;
	});
    $("#detail-kit-items").html(kitItems);
}

// set  data in detail page
function set_details(result_json) {
	if (ajs_form_handler.check_result(result_json)) {
		var kit = result_json.data;

        const columns = ['title','type','price_type','sor_code']
		for (const [key, value] of Object.entries(kit)) {
			if (columns.includes(key)) {
				$("#detail_" + key).html(value);
			}
		}

		set_kit_item_details(kit.items);
	} else {
		ajs_form_handler.show_errors_offcanvas(result_json);
	}
}

function edit_form() {
	create_form("edit");
	var id = $("#edit_id").val();
	ajs.apply_ind_roles("Kits");
	ajs.ajax_form(
		site_url + "kit/get/" + id + "?edit=true",
		null,
		"GET",
		null,
		"0",
		"0",
		load_data,
		load_data
	);
}

function get_details() {
	var id = $("#kit_id").val();
	ajs.ajax_form(
		site_url + "kit/get/" + id,
		null,
		"GET",
		null,
		"1",
		"1",
		set_details,
		set_details
	);
}

function get_custom_fields(index) {
    var fields =  `<td><input type="number" class="form-control w-50" name="items[` +index +`][quantity]" value="1"></td>`;
    return fields;
}


$(function () {
	if ($("#is_detail_page").val()) {
		get_details();
	}

	$(document).on("change", ".price-type", function () {
		if ($(this).val() == 'fix') {
			$("#sor-field").show();
		} else {
			$("#sor-field").hide();
		}
	});

    $(document).on("click", ".delete-kit-item", function () {        
        var parent = $(this).closest('tr');
        var id = parent.find('.row-id').val();
        if(id) {
            deleted_kit_items.push(id);
        }
        parent.remove();
	});

	 ajs.apply_ind_roles('Kits');
});
