var master_data_type = "purchase-order";
var deleted_purchase_order_items = [];
dataTable = null;
const keys = [
	"est_delivery_date",
	"delivery_date",
	"discount",
	"address1",
	"address2",
	"area",
	"postcode",
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

    var visible_action = $('#supplier_id_hidden').val() > 0 ? false : true;

	dataTable = new DataTable("#purchase-order-datatables", {
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
			url: site_url + "purchase-order/get_all",
			method: "GET",
			async: false,
			dataSrc: "data",
			data: function (d) {
                if($('#supplier_id_hidden').val() > 0) {
                    data_filters['supplier_id'] = $('#supplier_id_hidden').val();
                }
				return $.extend({}, d, {
					data_filters,
				});
			},
			beforeSend: function (xhr, settings) {
				ajs.set_auth_header(xhr, settings);
			},
            error: function (xhr) {
                ajs.datatable_error(xhr, "purchase-order-datatables");
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
				visible: visible_action,
				render: function (data, type, row) {
                    var action = `<a href="` +cdn_url +"purchase-order/details/" +ajs.hash_encode(row.id) +`" >`+view_icon()+`</a>
                    <a href="` +cdn_url + "purchase-order/stock-inward/" + ajs.hash_encode(row.id) + `" class="edit-btn fs-15"><i class="ri-shopping-cart-line align-bottom me-2 primary-btn "></i></a>
                    <a style="cursor:pointer" data-id="`+row.id+`" class=" print-po fs-15" ><i class="ri-printer-line align-bottom me-2 primary-btn"></i> </a>
                    <a style="cursor:pointer" data-id="`+row.id+`" class="export-po export-btn" ><i class="fa fa-file-excel-o align-bottom me-2 text-muted primary-btn fs-14"></i></a>
                    `;
                    if (row.delivery_status == "pending") {
                        action += `<a data-after-load-func="edit_form" data-heading="Edit purchase order - ` +
                            row.po_number +
                            `" data-form-url="` +
                            cdn_url +
                            `purchase-order/edit/` +
                            row.id +
                            `" class="popup-form-button fs-15" >`+edit_icon()+`</a>`;
                    }
					/* var action =
						`<div class="dropdown d-inline-block">
                        <button class="btn btn-soft-secondary btn-sm dropdown " type="button" data-bs-toggle="dropdown" aria-expanded="true">
                            <i class="ri-more-fill align-middle"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end " style="dropdown-menu dropdown-menu-end">
                            <li>
                                <a href="` +
						cdn_url +
						"purchase-order/details/" +
						ajs.hash_encode(row.id) +
						`" class="dropdown-item"><i class="ri-eye-fill align-bottom me-2 text-muted"></i> View</a>
                            </li><li>
                            <a href="` +
                    cdn_url +
                    "purchase-order/stock-inward/" +
                    ajs.hash_encode(row.id) +
                    `" class="dropdown-item edit-btn"><i class="ri-shopping-cart-fill align-bottom me-2 text-muted"></i>Manage Stock Inward</a>
                        </li><li>
                            <a style="cursor:pointer" data-id="`+row.id+`" class="dropdown-item print-po" ><i class="ri-printer-fill align-bottom me-2 text-muted"></i> Print</a>
                        </li><li>
                        <a style="cursor:pointer" data-id="`+row.id+`" class="dropdown-item export-po export-btn" ><i class="las la-file-export align-bottom me-2 text-muted"></i> Export In Excel</a>
                    </li>`;
					if (row.delivery_status == "pending") {
						action +=
							`<li>
                                <a style="cursor:pointer" data-after-load-func="edit_form" data-heading="Edit purchase order - ` +
							row.po_number +
							`" data-form-url="` +
							cdn_url +
							`purchase-order/edit/` +
							row.id +
							`" class="dropdown-item popup-form-button" >
                                    <i class="ri-pencil-fill align-bottom me-2 text-muted"></i>Edit
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item list_delete" data-type="` +
							master_data_type +
							`" data-id="` +
							row.id +
							`" data-action="delete" class="remove-item-btn" data-bs-toggle="modal" href="#deleteModal">
                                    <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>Delete
                                </a>
                            </li>`;
					}
					action += `</ul></div>`; */
					return action;
				},
			},
			{
				name: "id",
				data: "id",
				visible: false,
				searchable: false,
			},
			{
				name: "po_number",
				data: "po_number",
				render: function (data, type, row) {
                    var attr = '';
                    if($('#supplier_id_hidden').val() > 0) {
                        attr += 'target="_blank"';
                    }
					var str = `<div class="d-flex">
                                <div class="avatar-group">
                                    <a href="` +
                                    cdn_url +
                                    "purchase-order/details/" +
                                    ajs.hash_encode(row.id) +`" 
                                    `+attr+` 
                                    class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="#` +
							data +
							`">` +
							data +
							`</a>
                                </div></div>`;

					return str;
				},
			},
			{
				name: "job_number",
				data: "job_number",
			},
			{
				name: "supplier_name",
				data: "supplier_name",
				class: "text-capitalize",
				defaultContent: "-",
				render: function (data) {
					return data;
				},
			},
			{
				data: "add_date",
				name: "add_date",
				render: function (data) {
					return ajs.format_date(data);
				},
			},
			{
				data: "delivery_date",
				name: "delivery_date",
				render: function (data) {
					return ajs.format_date(data);
				},
			},
			{
				data: "est_delivery_date",
				name: "est_delivery_date",
				render: function (data) {
					return ajs.format_date(data);
				},
			},
			{
				data: "delivery_status",
				name: "delivery_status",
				class: "text-capitalize",
				render: function (data) {
					return data == "short_shipment" ? "Short shipment" : data;
				},
			},
			{
				data: "invoice_status",
				name: "invoice_status",
				render: function (data) {
					return invoice_label(data);
				},
			},
			
		],
		order: [["1", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("POs");
        }
	});

	dataTable.buttons().container().appendTo($("#datatable_buttons"));
}

function invoice_label(value) {
	const labels = {
		unpaid: "border-danger text-danger",
		partial: "border-indigo text-indigo",
		paid: "border-success text-success",
	};

	const labelClass = labels[value] ?? "";

	return (
		`<span class="text-capitalize badge border ` +
		labelClass +
		`">` +
		value +
		`</span>`
	);
}

if ($("#purchase-order-datatables").length) {
	select2_ajax(
		"#supplier_id_filter",
		site_url + "supplier/get_all",
		"name",
		null
	);
	fetch_default_filter(master_data_type);
    if($('#supplier_id_hidden').val() > 0) {
        var id = $("#supplier_id_hidden").val();
        ajs.ajax_form(
            site_url + "supplier/get/" + id,
            null,
            "GET",
            null,
            "0",
            "0",
            create_breadcrumb,
            create_breadcrumb
        );
    } else {
        var breadcrumbs = [
            {label: 'Stock Management', url: 'javascript: void(0);'},
            {label : 'Purchase Orders', url: null},
        ];
        set_breadcrumb(breadcrumbs);
    }
}

function create_breadcrumb(result_json) {
	if (ajs_form_handler.check_result(result_json)) {
		var supplier = result_json.data;

        var breadcrumbs = [
            {label: 'Stock Management', url: 'javascript: void(0);'},
            {label : 'Suppliers', url: cdn_url + 'supplier/list'},
            {label : supplier.name, url: cdn_url + 'supplier/details/'+ajs.hash_encode(supplier.id)},
            {label : 'Purchase Orders', url: null}
        ];
        set_breadcrumb(breadcrumbs);
	} else {
		ajs_form_handler.show_errors(result_json);
	}
}

function create_form(type = "create") {
	deleted_purchase_order_items = [];
	if (type == "create") {
		select2_ajax(
			"#supplier_id",
			site_url + "supplier/get_all",
			"name",
			null,
			"offcanvasRight"
		);
		select2_ajax(
			"#job_id",
			site_url + "job/get_all",
			"code",
			null,
			"offcanvasRight"
		);
		select2_ajax(
			"#warehouse_id",
			site_url + "warehouse/get_all",
			"title",
			null,
			"offcanvasRight"
		);
		select2_ajax(
			"#city_id",
			site_url + "cities/get_all",
			"title",
			null,
			"offcanvasRight"
		);
		add_autocomplete_sel(
			"#engineer_id",
			"users",
			["first_name", "last_name"],
			null,
			{ user_type: 16 },
			"offcanvasRight"
		);
	}

	$("#purchase-orderForm").validate({
		onkeyup: false,
		rules: {
			supplier_id: {
				required: true,
			},
			job_id: {
				required: true,
			},
			delivery_type: {
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
			formData.push({
				name: "deleted_purchase_order_items",
				value: deleted_purchase_order_items,
			});

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
		var purchase_order = result_json.data;

		for (const [key, value] of Object.entries(purchase_order)) {
			if (keys.includes(key)) {
				$("#" + key).val(value);
			}
		}
        $("#supplier_id").attr("readonly", true);

		$("input[name=delivery_type][value='" + purchase_order.delivery_type + "']")
			.prop("checked", true)
			.trigger("change");

		select2_ajax(
			"#supplier_id",
			site_url + "supplier/get_all",
			"name",
			null,
			"offcanvasRight",
			purchase_order.supplier_id
		);
		select2_ajax(
			"#job_id",
			site_url + "job/get_all",
			"code",
			null,
			"offcanvasRight",
			purchase_order.job_id
		);
		select2_ajax(
			"#warehouse_id",
			site_url + "warehouse/get_all",
			"title",
			null,
			"offcanvasRight",
			purchase_order.warehouse_id
		);
		select2_ajax(
			"#city_id",
			site_url + "cities/get_all",
			"title",
			null,
			"offcanvasRight",
			purchase_order.city_id
		);
		add_autocomplete_sel(
			"#engineer_id",
			"users",
			["first_name", "last_name"],
			null,
			{ user_type: 16 },
			"offcanvasRight",
			purchase_order.engineer_id
		);
		set_purchase_order_items(purchase_order.items);
	} else {
		ajs_form_handler.show_errors_offcanvas(result_json);
	}
}

// ser items on edit page
function set_purchase_order_items(items) {
	var purchase_orderItems = "";
	$.each(items, function (index, item) {
		purchase_orderItems +=
			`<tr>
            <td class="dtr-control hide">
                <input type="hidden" name="items[` +
			index +
			`][id]" value="` +
			item.id +
			`" class="row-id">
                <input type="hidden" name="items[` +
			index +
			`][stock_id]" value="` +
			item.stock_id +
			`" class="item-id">
            </td>
            <td>` +
			item.ajs_part_no +
			`</td>
            <td>` +
			item.name +
			`</td>
            <td class=" text-capitalize">` +
			item.type +
			`</td>
            <td>` +
			item.supplier_price +
			`</td>
            <td><input type="number" class="form-control w-50" name="items[` +
			index +
			`][quantity]" value="` +
			item.quantity +
			`"></td>
            <td class="text-end pe-0"><button type="button" class="btn btn-danger popup-add-btn delete-purchase_order-item"><i class="ri-close-line"></i></button></td>
        </tr>`;
	});
	$("#table-items").html(purchase_orderItems);
}

// set  data in details page
function set_details(result_json) {
	if (ajs_form_handler.check_result(result_json)) {
		var order = result_json.data;
        var ignore_keys = ['delivery_status','delivery_date','est_delivery_date'];

        var breadcrumbs = [
            {label : 'Stock Management', url: 'javascript: void(0);'},
            {label : 'Purchase Orders', url: cdn_url + 'purchase-order/list'},
            {label : order.po_number, url: null}
        ];
        set_breadcrumb(breadcrumbs);

		for (const [key, value] of Object.entries(order)) {
            if (!ignore_keys.includes(key)) {
                $("#detail_" + key).html(value);
            }
		}
        const status = order.delivery_status == "short_shipment" ? "Short shipment" : order.delivery_status;
        $("#detail_delivery_status").html(status);
        $("#detail_delivery_date").html(ajs.format_date(order.delivery_date));
        $("#detail_est_delivery_date").html(ajs.format_date(order.est_delivery_date));

        if(order.delivery_slip) {
            $("#detail_delivery_slip_url").html('<a target="_blank" href="'+s3_url+'/'+order.delivery_slip+'">Download</a>');
        }

        if (order.delivery_type == 'warehouse') {
            var address = order?.warehouse.address1 + ', ';
            address += order?.warehouse.address2 + ', ';
            address += order?.warehouse.city_name + ' - ' + order?.warehouse.postalcode + '.';

            $("#detail_delivery_address").html(address);
        } else if (order.delivery_type == 'custom_address') {
            var address = order?.address1 + ', ';
            address += order?.address2 + ', ';
            address += order?.area + ', ';
            address += order?.city_name + ' - ' + order?.postcode + '.';

            $("#detail_delivery_address").html(address);
        } else {
            address = 'Collect By Engineer: '+ order.engineer_name;
            $("#detail_delivery_address").html(address);
        }
		//set_purchase_order_items(purchase_order.items);

        var purchase_orderItems = "";
        $.each(order.items, function (index, item) {
            let description = item.description && item.description != 'null' ? item.description : '';
            let image = item.image && item.image != 'null' ? `<img class="image avatar-sm " src="`+s3_url+'/'+item.image+`">` : '';
            purchase_orderItems +=
                `<tr>
                    <td>`+(index+1)+`</td>
                    <td>` +item.manuf_part_no +`</td>
                    <td>` +item.name +`</td>
                    <td class=" text-capitalize">` +item.type +`</td>
                    <td class="text-end">` +item.supplier_price +`</td>
                    <td class="text-center">` +item.quantity +`</td>
                    <td class="text-center">` +item.short_quantity +`</td>
                    <td class="text-center">` +item.damage_quantity +`</td>
                    <td class="text-center">` +item.inward_quantity +`</td>
                    <td>` +description +`</td>
                    <td>`+image+`</td>
                </tr>`;
        });
        $("#item-details").html(purchase_orderItems);
	} else {
		ajs_form_handler.show_errors(result_json);
	}
}

function edit_form() {
	create_form("edit");
	var id = $("#edit_id").val();
    ajs.apply_ind_roles("POs");
	ajs.ajax_form(
		site_url + "purchase-order/get/" + id + "?edit=true",
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
	var id = $("#purchase_order_id").val();
	ajs.ajax_form(
		site_url + "purchase-order/get/" + id,
		null,
		"GET",
		null,
		"1",
		"1",
		set_details,
		set_details
	);
}

function get_custom_fields(index, qty=1) {
	var fields =
		`<td><input type="number" class="form-control w-50" name="items[` +
		index +
		`][quantity]" value="`+qty+`"></td>`;
	return fields;
}

function open_pdf(result_json) {    
    if (ajs_form_handler.check_result(result_json)) {
		window.open(result_json.url);
	} else {
		ajs_form_handler.show_errors(result_json);
	}
}

$(function () {
	if ($("#is_detail_page").val()) {
		get_details();
	}

    $(document).on("change", ".select-from", function () {
		if ($(this).val() == 'kit') {
			$("#kit-sec").show();
			$("#stock-sec").hide();
            initialize_kit_table();
		} else {
            $("#kit-sec").hide();
			$("#stock-sec").show();
		}
	});

    $(document).on("change", "#supplier_id", function () {
        $("#supplier_def_filter").val($(this).val());
		if ($(this).val()) {
			$(".stock-section").show();
		} else {
			$(".stock-section").hide();
            $("#table-items").html("");
		}
	});

	$(document).on("change", ".delivery-type", function () {
		$("#warehouse-field,#engineer-field,#custom-addr-field").hide();
		if ($(this).val() == "engineer") {
			$("#engineer-field").show();
		} else if ($(this).val() == "custom_address") {
			$("#custom-addr-field").show();
		} else {
			$("#warehouse-field").show();
		}
	});

	$(document).on("click", ".delete-purchase_order-item", function () {
		var parent = $(this).closest("tr");
		var id = parent.find(".row-id").val();
		if (id) {
			deleted_purchase_order_items.push(id);
		}
		parent.remove();
	});

    $(document).on("click", ".print-po", function (e) {
        e.preventDefault();
        ajs.ajax_form(
            site_url + "purchase-order/export_pdf/"+$(this).data('id'),
            null,
            "GET",
            null,
            "0",
            "0",
            open_pdf,
            open_pdf
        );
	});

    $(document).on("click", ".export-po", function (e) {
        e.preventDefault();
        ajs.ajax_form(
            site_url + "purchase-order/export_excel/"+$(this).data('id'),
            null,
            "GET",
            null,
            "0",
            "0",
            open_pdf,
            open_pdf
        );
	});

	ajs.apply_ind_roles('POs');
});
