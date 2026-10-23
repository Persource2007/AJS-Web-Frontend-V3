var master_data_type = "supplier";
dataTable = null;

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
            scrollY: (screen.height-470)+'px',
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
			url: site_url + "stock/suppliers",
			method: "GET",
			async: false,
			//dataSrc: "data",
            dataSrc: function (res) {
                if(res.avg_price) {
                    $("#supplier-ave-price").html(res.avg_price);
                }
                return res.data;
            },
			data: function (d) {
                data_filters['p.stock_id'] = $('#stock_id').val();
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
                visible: false,
				render: function (data, type, row) {
					return (
						`<a  href="` +cdn_url +`supplier/part-and-equipments/` + ajs.hash_encode(row.id) + `"  >
                            <i class="ri-eye-fill align-bottom me-1 text-muted"></i> Manage Part & Equip.
                        </a>`
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
                //                     <a href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="Edit supplier -` +
				// 		row.id +
				// 		`">` +
				// 		data +
				// 		`</a>
                //                 </div>
                //                 </div>`;

				// 	return str;
				// },
			},
			{
				name: "code",
				data: "code",
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
				data: "supplier_part_no",
				name: "supplier_part_no",
			},
			{
				data: "price",
				name: "price",
			},			
		],
		order: [["1", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Suppliers");
        }
	});

	dataTable.buttons().container().appendTo($("#datatable_buttons"));
}

if ($("#supplier-datatables").length) {
	fetch_default_filter(master_data_type);
}


function create_breadcrumb(result_json) {
	if (ajs_form_handler.check_result(result_json)) {
		var stock = result_json.data;

        var breadcrumbs = [
            {label : 'Stock Management', url: 'javascript: void(0);'},
            {label : 'Stocks', url: cdn_url + 'stock/list'},
            {label : stock.stock_code, url: cdn_url + 'stock/details/'+ ajs.hash_encode(stock.id)},
            {label : 'Suppliers', url: null},
        ];
        set_breadcrumb(breadcrumbs);
	} else {
		ajs_form_handler.show_errors(result_json);
	}
}

$(function () {
    $('button.add-btn').remove();
    var id = $("#stock_id").val();
	ajs.ajax_form(
		site_url + "stock/get/" + id,
		null,
		"GET",
		null,
		"0",
		"0",
		create_breadcrumb,
		create_breadcrumb
	);
	ajs.apply_ind_roles('Suppliers');
});
