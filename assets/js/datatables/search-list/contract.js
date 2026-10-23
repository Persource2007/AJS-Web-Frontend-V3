function load_search_table(search_text = "") {
	new DataTable("#search-datatables", {
        scrollY: (window.innerHeight - 400) + 'px',
		responsive: false,
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
			url: site_url + "contract/get_all",
			method: "GET",
			async: false,
			dataSrc: "data",
			data: function (d) {
				let filters = table_filter;
                filters.contract_active = 1;
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
				render: function (data) {
					var selected_value = $("#search-element").val();
					var isChecked = selected_value == data ? "checked" : "";
					return (
						`<td scope="row">
                        <div class="form-check">
                            <input class="form-check-input selected-row" type="radio" value="` +
						data +
						`" ` +
						isChecked +
						` name="selected_row">
                        </div>
                    </td>`
					);
				},
			},
			{
				name: "contract_number",
				data: "contract_number",
			},
			{ data: "client_code", name: "client_code" },
			{
				data: "type",
				name: "type",
				class: "text-capitalize",
				defaultContent: "-",
				render: function (data) {
					return data == "ppm" ? "PPM" : data;
				},
			},
			{ data: "category_name", name: "category_name" },
			{ data: "reference_number", name: "reference_number" },
			{
				data: "start_date",
				name: "start_date",
				render: function (data) {
					return ajs.format_date(data);
				},
			},
			{
				data: "end_date",
				name: "end_date",
				render: function (data) {
					return ajs.format_date(data);
				},
			},
			{
				data: "service_start_time",
				name: "service_start_time",
				render: function (data) {
					return data ? moment(data, "HH:mm:ss").format("HH:mm") : "-";
				},
			},
			{
				data: "service_end_time",
				name: "service_end_time",
				render: function (data) {
					return data ? moment(data, "HH:mm:ss").format("HH:mm") : "-";
				},
			},
		],
		order: [["0", "desc"]],
	});
}

function initialize_search_table() {
    	table_filter = {};
	select2_ajax(
		"#category_id_filter",
		site_url + "master-record/get_all",
		"master_value",
		{ master_code: "CONTRACT_CATEGORY" },
		"large_modal"
	);
	load_search_table();
}
