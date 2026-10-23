var def_filters = null;

function load_search_table(search_text = '') {    

	new DataTable("#search-datatables", {
        scrollY: (window.innerHeight - 400) + 'px',
        responsive:false,
		searching: false,
		serverSide: true,
		processing: true,
		paging: true,
		bDestroy: true,
		pageLength: ajs.datatable_modal_limit,
		search: {
			search: search_text,
		},
		//dom: "Bfrtip",
		// buttons: ["excel"],
		ajax: {
			url: site_url + "asset/all",
			method: "GET",
			async: false,
			dataSrc: "data",
			data: function (d) {
				let filters = table_filter || {};
				if (def_filters) {
                    Object.assign(filters, def_filters);
				}
				return $.extend({}, d, {
					filters,
				});
			},
			beforeSend: function (xhr, settings) {
				ajs.set_auth_header(xhr, settings);
			},
            error: function (xhr) {
                ajs.datatable_error(xhr, "search-datatables");
            }
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
				data: "id",
				searchable: false,
				orderable: false,
                render: function(data) {
                    var type = 'radio';
                    var selected_value = $("#search-element").val();
                    let isMultiple = $("#search-element").attr('is-multiple');
                    if (isMultiple) {
                        type = 'checkbox';
                        let vals = selected_value ? selected_value.toString().split(',').map(Number) : [];
                        selected_value = vals.includes(+data) ? data : '';
                    }
                    var isChecked =  selected_value == data ? 'checked' : '';
                    return `<td scope="row">
                        <div class="form-check">
                            <input class="form-check-input selected-row" type="`+type+`" value="`+data+`" `+isChecked+` name="selected_row">
                        </div>
                    </td>`;
                }
			},
			{
                name: "client_asset_number",
                data: "client_asset_number"
            },
            {data: "uprn_no", name: "uprn_no"},
            {data: "serial_number", name: "serial_number"},
            {data: "equipment_type", name: "equipment_type"},
            {data: "asset_location", name: "asset_location"},
            {data: "quantity", name: "quantity"},
            {data: "installation_date", name: "installation_date", render: function (data) { return ajs.format_date(data); }},
            {data: "expiry_date", name: "expiry_date", render: function (data) { return ajs.format_date(data); }},
            {data: "manufacturer_warranty_expiry", name: "manufacturer_warranty_expiry", render: function (data) { return ajs.format_date(data); }},
            {data: "our_warranty_expiry", name: "our_warranty_expiry", render: function (data) { return ajs.format_date(data); }},
		],
		order: [["0", "desc"]],
	});
}

function initialize_search_table(filters = null) {
	def_filters = filters;    
	table_filter = {};
	select2_ajax('#equipment_type_id_filter', site_url + 'master-record/get_all', 'master_value', {"masters.master_code": "EQUIPMENT_TYPES"}, 'large_modal');
	load_search_table();
}
