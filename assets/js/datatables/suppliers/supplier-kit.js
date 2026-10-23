
function load_kit_table() {
    // if($("#supplier_def_filter").val()) {
    //     table_filter['supplier_id'] = $("#supplier_def_filter").val();
    // }

    new DataTable("#kit-datatables", {
        searching: false,
        serverSide: true,
        processing: true,
        paging: true,
        responsive:false,
        bDestroy: true,
        pageLength: ajs.datatable_limit,
        search: {
            search: $("#search").val(),
        },
        //dom: "Bfrtip",
        // buttons: ["excel"],
        ajax: {
            url: site_url + "kit/get_all",
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
                ajs.datatable_error(xhr, "kit-datatables");
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
                data: "id",
                searchable: false,
                orderable: false,
                render: function (data,type,row) {
                    return `<td scope="row">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="`+data+`" >
                        </div>
                    </td>`;
                }
            },
            {
                name: "title",
                data: "title",
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
        ],
        order: [["0", "desc"]],
    });
}

function initialize_kit_table() {
    table_filter = {};
    load_kit_table();
}
