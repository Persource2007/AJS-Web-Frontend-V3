var asset_datatable = null;
var def_filters = null;
function load_asset_table() {
	let data_filters = {};
	asset_datatable = new DataTable("#assets-datatables", {
		responsive: false,
		searching: false,
		serverSide: true,
		processing: true,
		paging: true,
		bDestroy: true,
		pageLength: ajs.datatable_modal_limit,
		// search: {
		//     search: $('#history_search_term').val(),
		// },
		// dom: "Bfrtip",
		ajax: {
			url: site_url + "asset/all",
			method: "GET",
			async: false,
			dataSrc: "data",
			data: function (d) {
				d.search = {
					value: $("#asset_search_term").val(),
				};
				data_filters["property_id"] = $("#property_id").val();

				// merge default filters (if provided) into the request filters
				if (def_filters) {
					Object.assign(data_filters, def_filters);
				}

				return $.extend({}, d, {
					data_filters,
				});
			},
			beforeSend: function (xhr, settings) {
				ajs.set_auth_header(xhr, settings);
			},
            error: function (xhr) {
                ajs.datatable_error(xhr, "assets-datatables");
            },
		},
		language: {
			emptyTable: "No data found",
		},
		columns: [
            {
				name: "id",
				data: "id",
				visible: false,
				searchable: false,
			},
            {
                data: null,
                searchable: false,
                render: function (data, type, row) {
                    var str= `<a target="_blank" href="${cdn_url}properties/${ajs.hash_encode(row.property_id)}/assets/details/${ajs.hash_encode(row.id)}">${row.id}</a>`;
                    return str;
                },
            },
            {
                name: "asset_location",
                data: "asset_location",                
            },
            {
                name: "client_asset_number",
                data: "client_asset_number",
            },
            {data: "uprn_no", name: "uprn_no"},
            {data: "serial_number", name: "serial_number"},
            {data: "equipment_type", name: "equipment_type"},
            {data: "quantity", name: "quantity"},
            {data: "installation_date", name: "installation_date", render: function (data) {
                    return ajs.format_date(data);
                }},
            {data: "expiry_date", name: "expiry_date", render: function (data) {
                    return ajs.format_date(data);
                }},
            {data: "manufacturer_warranty_expiry", name: "manufacturer_warranty_expiry", render: function (data) {
                    return ajs.format_date(data);
                }},
            {data: "our_warranty_expiry", name: "our_warranty_expiry", render: function (data) {
                    return ajs.format_date(data);
                }},
        ],
        order: [["0", "desc"]],
	});
}

$(function () {
	// asset/all needs view_assets. This popup opens from the Jobs and Properties screens, where a
	// role may legitimately have no Assets rights at all - firing the request regardless is what
	// made the property popup answer "access denied" the moment it opened. The tab itself is
	// removed by apply_permissions() (see the check-permission marker in property/detail-section).
	if (!ajs.check_role('Assets', 'view')) {
		return;
	}

	// initialize the asset table when this modal is used
	load_asset_table();

	$(document).on("click", "#search-assets", function () {
		if (asset_datatable) asset_datatable.ajax.reload(null, false);
	});

	$(document).on("shown.bs.tab", ".assets-tab", function () {
		if (asset_datatable) asset_datatable.ajax.reload(null, false);
	});
});
