var def_filters = null;
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
            url: site_url + "property/get_all",
            method: "GET",
            async: false,
            dataSrc: "data",
            data: function (d) {
                let filters = table_filter;
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
                name: "uprn_no",
                data: "uprn_no",
            },
            {data: "client_code", name: "client_code"},
            {
                name: "address1",
                data: "address1",
                className: 'text-truncate',
                render: function (data, type, row) {
                    var addr = row.address1;
                    if (row.address2) {
                        addr += ", " + row.address2;
                    }
                    return truncate_string(addr, 25);
                },
            },
            {data: "postalcode", name: "postalcode"},
            {data: "resident_name", name: "resident_name"},
            {data: "telephone", name: "telephone"},
            {
                name: "email",
                data: "email",
            },
            {data: "property_type_name", name: "property_type_name"},
        ],
        order: [["0", "desc"]],
    });
}

function initialize_search_table(filters = null) {
    
    def_filters = filters;
    table_filter = {};
    add_autocomplete_sel(
            "#client_id_filter",
            "clients",
            ["client_code"],
            null,
            null,
            "large_modal"
            );
    load_search_table();
}
