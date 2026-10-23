modalDataTable = null;

function load_item_table() {
    var selected_rows = $("#table-items .item-id")
        .map((i, e) => e.value)
        .get();
    if($("#supplier_def_filter").val()) {
        table_filter['supplier_id'] = $("#supplier_def_filter").val();
    }

    modalDataTable = new DataTable("#kit-item-datatables", {
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
            url: site_url + "part-and-equipment/get_all",
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
                ajs.datatable_error(xhr, "kit-item-datatables");
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
                data: "stock_id",
                searchable: false,
                orderable: false,
                render: function (data,type,row) {
                    var isChecked = selected_rows.includes(data.toString()) ? 'checked disabled' : '';
                    return `<td scope="row">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="1" ` + isChecked + `>
                            <input type="hidden" name="items[{{key}}][stock_id]" value="` + data + `" class="item-id">
                            <input type="hidden" name="items[{{key}}][supplier_price]" value="` + row.price + `">
                            <input type="hidden" name="items[{{key}}][id]" value="0">
                        </div>
                    </td>`;
                }
            },
            {
                name: "manuf_part_no",
                data: "manuf_part_no",
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
                name: "price",
                data: "price",
            }
        ],
        order: [["0", "desc"]],
    });
}

function initialize_item_table() {
    table_filter = {};
    load_item_table();
}
