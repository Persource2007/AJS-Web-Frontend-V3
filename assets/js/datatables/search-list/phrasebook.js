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
			url: site_url + "phrasebook/get_all",
			method: "GET",
			async: false,
			dataSrc: "data",
			data: function (d) {
				let filters = table_filter;
				return $.extend({}, d, {
					filters,
				});
			},
			beforeSend: function (xhr, settings) {
				ajs.set_auth_header(xhr, settings);
			},
            error: function (xhr) {
                ajs.datatable_error(xhr, "search-datatables");
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
				data: "description",
				searchable: false,
				orderable: false,
				render: function (data) {
					return (
						`<td scope="row">
                        <div class="form-check">
                            <input class="form-check-input selected-rows" type="checkbox" value="` +
						data +
						`"  name="selected_row">
                        </div>
                    </td>`
					);
				},
			},
			{
				name: "description",
				data: "description",
			},
			{ data: "types", name: "types" },
		],
		order: [["0", "desc"]],
	});
}

function initialize_search_table() {
	table_filter = {};
	select2_ajax(
		"#type_id_filter",
		site_url + "master-record/get_all",
		"master_value",
		{ master_code: "PHRASEBOOK_TYPE" },
        'large_modal'
	);
	load_search_table();
}
