var def_filters = null;
function load_search_table(search_text = '') {

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
            url: site_url + "sor/get_all",
            method: "GET",
            async: false,
            dataSrc: "message.data",
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
                    var isChecked = selected_value == data ? 'checked' : '';
                    return `<td scope="row">
                        <div class="form-check">
                            <input class="form-check-input selected-row" type="radio" value="` + data + `" ` + isChecked + ` name="selected_row">
                        </div>
                    </td>`;
                }
            },
            {
                name: "sor_code",
                data: "sor_code",
            },
            {
                name: "short_description",
                data: "short_description",
                className: "short-desc",
                // render: function (data) {
                //     return truncate_string(data,40);
                // },
            },
            {
                name: "material_price",
                data: "material_price",
                className: "pricing-col",
                render: function (data) {
                    return data.toFixed(2);
                }
            },
            {
                name: "labor_price",
                data: "labor_price",
                className: "pricing-col",
                render: function (data) {
                    return data.toFixed(2);
                }
            },
            {
                name: "sell_price",
                data: "sell_price",
                className: "pricing-col",
                render: function (data) {
                    return data.toFixed(2);
                }

            },
            {
                name: "sor_type_name",
                data: "sor_type_name",
            },
            {
                name: "service_name",
                data: "service_name",
            },
            {
                name: "workstream_name",
                data: "workstream_name",
            },
            {
                name: "client_code",
                data: "client_code",
            },
            {
                name: "contract_id",
                data: "contract_id",
                render: function (data, type, row) {
                    return row.contract_number;
                },
            }
            
        ],
        order: [["0", "desc"]],
    });
}

function initialize_search_table(filters = null) {
    def_filters = filters;
    table_filter = {};
    select2_ajax('#sor_type_filter', site_url + 'master-record/get_all', 'master_value', {master_code: "SOR_TYPES"}, 'large_modal');
    select2_ajax('#workstream_id_filter', site_url + 'workstream/get_all', 'title', null, 'large_modal');
    //select2_ajax('#client_id_filter', site_url + 'client/get_all', 'client_code', null,'large_modal');
    load_search_table();
}
