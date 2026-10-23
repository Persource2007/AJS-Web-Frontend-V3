
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
			url: site_url + "client/get_all",
			method: "GET",
			async: false,
			dataSrc: "message.data",
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
                    var selected_value = $("#search-element").val();
                    var isChecked =  selected_value == data ? 'checked' : '';
                    return `<td scope="row">
                        <div class="form-check">
                            <input class="form-check-input selected-row" type="radio" value="`+data+`" `+isChecked+` name="selected_row">
                        </div>
                    </td>`;
                }
			},
			{
                name: "company_name",
                data: "company_name"
            },
            {data: 'registration_no', name: "registration_no"},
            {data: 'client_code', name: "client_code"},
            {data: 'client_uprn', name: "client_uprn"},
            {data: 'client_type_name', name: "client_type_name"},
            // {
            //     name: "email",
            //     data: "email",
            // },
            //{data: 'phone_number', name: "phone_number"},
		],
		order: [["0", "desc"]],
	});
}

function initialize_search_table() {
    table_filter = {};
    select2_ajax('#client_type_filter', site_url + 'master-record/get_all', 'master_value', {"masters.master_code": "CLIENT_TYPE"}, 'large_modal');
    load_search_table();
}
