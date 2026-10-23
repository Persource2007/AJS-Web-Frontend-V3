var service_ids = [];
var master_data_type = "stock";
dataTable = null;
const keys = ["add_date", "added_by", "id"];

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

	dataTable = new DataTable("#stock-datatables", {
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
			url: site_url + "stock/get_all",
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
                ajs.datatable_error(xhr, "stock-datatables");
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
                        `<a href="` + cdn_url + "stock/details/" +ajs.hash_encode(row.id) +`" >`+view_icon()+`</a>
                        <a data-after-load-func="edit_form" data-heading="Edit Stock - ` + row.stock_code + `" data-form-url="` +cdn_url + `stock/edit/` + ajs.hash_encode(row.id) + `" class="popup-form-button" >`+edit_icon()+`</a>`
                            
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
				name: "stock_code",
				data: "stock_code",
				render: function (data, type, row) {
					var str = "";
					str +=
						`<div class="d-flex">
                                <div class="avatar-group">
                                    <a href="` + cdn_url + `stock/details/` + ajs.hash_encode(row.id) + `" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="View stock -` +
						row.stock_code +
						`">` +
						data +
						`</a></div></div>`;

					return str;
				},
			},
            {
				name: "name",
				data: "name",
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
				data: "price_per_unit",
				name: "price_per_unit",
                className:"pricing-col",
                render: function (data) {
                    return data.toFixed(2);
                }
			},
			{
				data: "sell_per_unit",
				name: "sell_per_unit",
                className:"pricing-col",
                render: function (data) {
                    return data.toFixed(2);
                }
			},
			{
				data: "unit",
				name: "unit",
                render: function (data, type, row) {
                    if(row.unit_of_measure_name) {
                        return data + ` (${row.unit_of_measure_name})`;
                    }
                    return data;
                }
			},
			
		],
		order: [["1", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Stocks");
        }
	});
}

if ($("#stock-datatables").length) {
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

    var breadcrumbs = [
        {label: 'Stock Management', url: 'javascript: void(0);'},
        {label : 'Stocks', url: null},
    ];
    set_breadcrumb(breadcrumbs);
}

function create_form(type = "create") {
	if (type == "create") {
        select2_ajax(
			"#category_id",
			site_url + "master-record/get_all",
			"master_value",
			{ master_code: "STOCK_CATEGORY" },
		);
		select2_ajax(
			"#manufacturer_id",
			site_url + "master-record/get_all",
			"master_value",
			{ master_code: "ASSET_MAKE" },
		);
		select2_ajax(
			"#model_id",
			site_url + "master-record/get_all",
			"master_value",
			{ master_code: "ASSET_MODELS" },
		);
		select2_ajax(
			"#unit_of_measure",
			site_url + "master-record/get_all",
			"master_value",
			{ master_code: "UNIT_OF_MEASURE" },
		);
        select2_ajax(
			"#warranty_period_id",
			site_url + "master-record/get_all",
			"master_value",
			{ master_code: "WARRANTY_PERIODS" },
		);
        select2_ajax(
			"#shelf_life_id",
			site_url + "master-record/get_all",
			"master_value",
			{ master_code: "SHELF_LIFES" },
		);
        select2_ajax('#sor_id', site_url + 'sor/get_all', 'sor_code', null);
	}

	$("#stockForm").validate({
		onkeyup: false,
		rules: {
			type: {
				required: true,
			},
			name: {
				required: true,
			},
			stock_code: {
				required: true,
			},
			category_id: {
				required: true,
			},
			manufacturer_id: {
				required: true,
			},
			model_id: {
				required: true,
			},
            ajs_part_no: {
				required: true,
			},
            manuf_part_no: {
				required: true,
			},
            unit: {
				required: true,
                number: true,
			},
            unit_of_measure: {
				required: true,
			},
			minimum_threshold_van: {
				number: true,
			},
			minimum_threshold_warehouse: {
				number: true,
			},
		},
		errorPlacement: function (error, element) {
			if (
				element.hasClass("select2") &&
				element.next(".select2-container").length
			) {
				error.insertAfter(element.next(".select2-container"));
			} else if (element.parent(".input-group").length  ||
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

            if ($("#is_detail_page").val()) {
                ajs.refreshDetailData = get_details;
            }

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
		var stock = result_json.data;

		for (const [key, value] of Object.entries(stock)) {
			if (!keys.includes(key)) {
				$("#" + key).val(value);
			}
		}

        $("input[name=type][value='"+stock.type+"']").prop("checked",true);

		select2_ajax(
			"#category_id",
			site_url + "master-record/get_all",
			"master_value",
			{ master_code: "STOCK_CATEGORY" },
            undefined,
            stock.category_id
		);
		select2_ajax(
			"#manufacturer_id",
			site_url + "master-record/get_all",
			"master_value",
			{ master_code: "ASSET_MAKE" },
            undefined,
            stock.manufacturer_id
		);
		select2_ajax(
			"#model_id",
			site_url + "master-record/get_all",
			"master_value",
			{ master_code: "ASSET_MODELS" },
            undefined,
            stock.model_id
		);
        select2_ajax(
			"#unit_of_measure",
			site_url + "master-record/get_all",
			"master_value",
			{ master_code: "UNIT_OF_MEASURE" },
            undefined,
            stock.unit_of_measure
		);
        select2_ajax(
			"#warranty_period_id",
			site_url + "master-record/get_all",
			"master_value",
			{ master_code: "WARRANTY_PERIODS" },
            undefined,
            stock.warranty_period_id
		);
        select2_ajax(
			"#shelf_life_id",
			site_url + "master-record/get_all",
			"master_value",
			{ master_code: "SHELF_LIFES" },
            undefined,
            stock.shelf_life_id
		);
        select2_ajax('#sor_id', site_url + 'sor/get_all', 'sor_code', null,undefined,stock.sor_id);
	} else {
		ajs_form_handler.show_errors_offcanvas(result_json);
	}
}

// set  data in detail page
function set_details(result_json) {
	if (ajs_form_handler.check_result(result_json)) {
		var stock = result_json.data;

        var breadcrumbs = [
            {label: 'Stock Management', url: 'javascript: void(0);'},
            {label : 'Stocks', url: cdn_url + 'stock/list'},
            {label : stock.stock_code, url: null},
        ];
        set_breadcrumb(breadcrumbs);

		for (const [key, value] of Object.entries(stock)) {
			if (!keys.includes(key)) {
				$("#detail_" + key).html(value);
			}
		}

        $("#detail_unit").html(stock.unit + ` (${stock.unit_of_measure_name})`);

        $("#detail-edit-btn").data('heading','Edit Stock - '+stock.stock_code);

	} else {
		ajs_form_handler.show_errors(result_json);
	}
}

function edit_form() {
	create_form("edit");
	var id = $("#edit_id").val();
	ajs.apply_ind_roles("Stocks");
	ajs.ajax_form(
		site_url + "stock/get/" + id + "?edit=true",
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
	var id = $("#stock_id").val();
	ajs.ajax_form(
		site_url + "stock/get/" + id,
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

    $(document).on("change", "#manufacturer_id", function () {
        var id = $(this).val();
        if (id > 0) {
            if($("#model_id").hasClass('select2-hidden-accessible')) {
                $("#model_id").select2().empty()
            }
            select2_ajax("#model_id", site_url + "master-record/get_all", "master_value", {'masters.master_code': "ASSET_MODELS",'master_values.parent_id': id}, "offcanvasRight");
        }
    });

	ajs.apply_ind_roles('Stocks');
});
