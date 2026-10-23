var master_data_type = "property-certificate";
dataTable = null;

function load_data_table(limit, search_term, filters) {
    data_filters = {};
    page_limit = ajs.datatable_limit;
    search = "";
    if (
            typeof filters != "undefined" &&
            (typeof filters["filters"] !== "undefined" || filters["filters"] != null)
            ) {
        data_filters = filters["filters"];
    }
    if (typeof limit !== "undefined" || limit != null) {
        page_limit = limit;
    }
    if (typeof search_term !== "undefined" || search_term != null) {
        search = search_term;
    }

    dataTable = new DataTable("#certificate-datatables", {
        scrollY: (screen.height - 535) + 'px',
        scrollCollapse: !0,
        searching: false,
        serverSide: false,
        processing: true,
        paging: true,
        responsive:false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: search,
        },
       // dom: "Bfrtip",
        // buttons: ["excel"],
        ajax: {
            url: site_url + "property/certificates/"+$("#property_id").val(),
            method: "GET",
            async: false,
            dataSrc: "data",
            data: function (d) {
                d.search = search;
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr) {
                ajs.datatable_error(xhr, "certificate-datatables");
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
                data: "pdf_url",
                name: "pdf_url",
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                    return (
                        `<a href="` + data + `"  target="_blank">`+view_icon(true)+`</a>`
                    );
                },
            },            
            {
                name: "certificate_code",
                data: "certificate_code",
            },
            {
                name: "title",
                data: "title",
                defaultContent: '-'
            },
            {
                name: "added_by_name",
                data: "added_by_name",
                class: "text-capitalize",
            },
            {
                data: "add_date",
                name: "add_date",
                render: function (data) {
                    return ajs.format_date(data);
                }
            },
            {
                data: "status",
                name: "status",
                render: function (data) {
                    return status_label(data);
                },
            },            
        ],
        order: [["0", "desc"]],
    });
}

if ($("#certificate-datatables").length) {
	
	fetch_default_filter(master_data_type);

    var property_id = $("#property_id").val();
    if(property_id > 0) {
        ajs.ajax_form(
            site_url + "property/get/" + property_id,
            null,
            "GET",
            null,
            "0",
            "1",
            create_breadcrumb,
            create_breadcrumb
        );
    }
}

function status_label(value) {
    const labels = {
        3: `<span class="badge  border border-indigo text-indigo">Update & Approved</span>`,
        4: `<span class="badge  border border-success text-success">Approved</span>`,
    };

    return labels[value] ?? "-";
}

function create_breadcrumb(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {
        var property = result_json.data;
        if($('#client_id').val() > 0) {
            var detail_url = 'clients/details/' + ajs.hash_encode(property.client_id);
            var breadcrumbs = [
                {label : 'Clients', url: cdn_url + 'clients/list'},
                {label : property.client_code, url: cdn_url + detail_url},
                {label : 'Properties', url: cdn_url + 'clients/'+ ajs.hash_encode(property.client_id)+'/properties'},
                {label : property.uprn_no, url: cdn_url + 'clients/'+ ajs.hash_encode(property.client_id)+'/properties/details/'+ajs.hash_encode(property.id)},
                {label : 'Certificates', url : null}
            ];

        } else {
            var breadcrumbs = [
                {label : 'Properties', url: cdn_url + 'properties/list'},
                {label : property.uprn_no, url: cdn_url + 'properties/details/'+ajs.hash_encode(property.id)},
                {label : 'Certificates', url : null}
            ];
        }

        set_breadcrumb(breadcrumbs);
        
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

$(function () {
});
