
var master_data_type = "part-and-equipment";
dataTable = null;
var keys = ['supplier_id','price','supplier_part_no']

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

	dataTable = new DataTable("#part-datatables", {
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
			url: site_url + "part-and-equipment/get_all",
			method: "GET",
			async: false,
			dataSrc: "data",
			data: function (d) {
                data_filters['supplier_id'] = $('#supplier_id').val();
				return $.extend({}, d, {
					data_filters,
				});
			},
			beforeSend: function (xhr, settings) {
				ajs.set_auth_header(xhr, settings);
			},
            error: function (xhr) {
                ajs.datatable_error(xhr, "part-datatables");
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
                        `<a data-after-load-func="edit_form" data-heading="Edit Part & Equip. - #` +
                        row.supplier_part_no +
                        `" data-form-url="` +
                        cdn_url +
                        `part-and-equipments/edit/` +
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
				name: "name",
				data: "name",
				// render: function (data, type, row) {
				// 	var str = "";
				// 	str +=
				// 		`<div class="d-flex">
                //                 <div class="avatar-group">
                //                     <a href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="Edit part & equipment -` +
				// 		row.id +
				// 		`">` +
				// 		data +
				// 		`</a>
                //                 </div>
                //                 <div class="flex-shrink-0 ms-4">
                //                     <ul class="list-inline tasks-list-menu mb-0">
                //                     <li class="list-inline-item">
                //                     <a style="cursor:pointer" data-after-load-func="edit_form" data-heading="Edit Part & Equipment - #` +
                //     row.supplier_part_no +
                //     `" data-form-url="` +
                //     cdn_url +
                //     `part-and-equipments/edit/` +
                //     row.id +
                //     `" class="popup-form-button" >
                //                         <i class="ri-pencil-fill align-bottom me-2 text-muted"></i>
                //                     </a>
                //                 </li>`;

				// 	str +=
				// 		`</a></li><li class="list-inline-item">
                //         <a class="list_delete" data-type="` +
                //         master_data_type +
                //             `" data-id="` +
                //             row.id +
                //             `" data-action="delete"  data-bs-toggle="modal" href="#deleteModal">
                //                 <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                //             </a>
                //         </li></ul></div></div>`;

				// 	return str;
				// },
			},
			{
				name: "type",
				data: "type",
                class: "text-capitalize"
			},
			{
				name: "category",
				data: "category",
			},
			{ data: "manufacturer", name: "manufacturer" },
			{
				data: "model",
				name: "model",
			},
			{
				data: "supplier_part_no",
				name: "supplier_part_no",
			},
			{
				data: "manuf_part_no",
				name: "manuf_part_no",
			},
			{
				data: "price",
				name: "price",
			},
			
		],
		order: [["1", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Part & Equipments");
        }
	});
}

function create_form(type = "create") {
	if (type == "create") {
		
	}

	$("#supplierPartForm").validate({
		onkeyup: false,
		rules: {
			supplier_id: {
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

	ajs.mask_inputs();
}

// set  data in edit page
function load_data(result_json) {
	if (ajs_form_handler.check_result(result_json)) {
		var part = result_json.data;

		for (const [key, value] of Object.entries(part)) {
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
	ajs.apply_ind_roles("Part & Equipments");
	ajs.ajax_form(
		site_url + "part-and-equipment/get/" + id + "?edit=true",
		null,
		"GET",
		null,
		"0",
		"0",
		load_data,
		load_data
	);
}

if ($("#part-datatables").length) {
	fetch_default_filter(master_data_type);
    select2_ajax(
        "#category_id_filter",
        site_url + "master-record/get_all",
        "master_value",
        { master_code: "STOCK_CATEGORY" },
    );
    select2_ajax(
        "#manufacturer_id_filter",
        site_url + "master-record/get_all",
        "master_value",
        { master_code: "ASSET_MAKE" },
    );
   
    var supplier_id = $("#supplier_id").val();
    ajs.ajax_form(
            site_url + "supplier/get/" + supplier_id,
            null,
            "GET",
            null,
            "0",
            "1",
            create_breadcrumb,
            create_breadcrumb
        );
}

function create_breadcrumb(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {
        var supplier = result_json.data;

        var detail_url = cdn_url +'supplier/details/' + ajs.hash_encode(supplier.id);
        var breadcrumbs = [
            {label: 'Stock Management', url: 'javascript: void(0);'},
            {label : 'Suppliers', url: cdn_url + 'supplier/list'},
            {label : supplier.name, url: detail_url},
            {label : 'Part & Equipments', url : null}
        ];

        set_breadcrumb(breadcrumbs);
        
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

function get_custom_fields(index) {
    var fields =  `<td><input type="number" class="form-control" name="items[` +index +`][price]" value="" required></td>
        <td><input type="text" class="form-control" name="items[` +index +`][supplier_part_no]" value="" required></td>`;
    return fields;
}


$(function () {

	ajs.apply_ind_roles('Part & Equipments');
});
