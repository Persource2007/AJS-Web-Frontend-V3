var def_filters = null;
function load_search_quote_table(search_text = '') {

    var client_id = $("#client_id").val();    
    //console.log(client_id);
    if(client_id){
        def_filters = {client_id:client_id}
    }
   
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
                render: function (data,type, row, meta) {
                    //console.log(data);
                    var selected_value = $("#search-element").val();
                    var isChecked = selected_value == data ? 'checked' : '';
                    return `<td scope="row">
                        <div class="form-check">
                            <input class="form-check-input selectedsors" type="checkbox" value="`+data +`" ` + isChecked + ` name="selected_row" data-desc="${row.short_description || ''}" data-price="${row.sell_price || 0}" data-id="${row.id}" data-sor_code="${row.sor_code || ''}">
                        </div>
                    </td>`;
                }
            },
            {
                name: "sor_type_name",
                data: "sor_type_name",
            },
            {
                name: "sor_code",
                data: "sor_code",
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
            }, 
            {
                name: "short_description",
                data: "short_description",
            },          
            {
                name: "material_price",
                data: "material_price",

            },
            {
                name: "labor_price",
                data: "labor_price",

            },
            {
                name: "sell_price",
                data: "sell_price",

            },
        ],
        order: [["0", "desc"]],
    });
}

function initialize_search_table(filters = null) {
    def_filters = filters;
    table_filter = {};
    select2_ajax('#sor_type_filter', site_url + 'master-record/get_all', 'master_value', {master_code: "SOR_TYPES"}, 'large_modal');
    load_search_quote_table();
}