var master_data_type = "job";
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

    dataTable = new DataTable("#job-datatables", {
        scrollY: (screen.height - 535) + 'px',
        scrollCollapse: !0,
        searching: false,
        serverSide: true,
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
            url: site_url + "job/get_all",
            method: "GET",
            async: false,
            dataSrc: "data",
            data: function (d) {
                data_filters['property_id'] = $("#property_id").val();
                console.log(data_filters['mv.master_value']);
                if($('#is_job_history').val() == true) {
                    data_filters['mv.master_value'] = 'completed';
                } else if(data_filters['mv.master_value']) {
                    if(data_filters['mv.master_value'] == 'all') {
                        delete data_filters['mv.master_value'];
                    }
                    console.log(data_filters['mv.master_value']);
                } else {
                    data_filters['mv.master_value'] = 'open';
                }
                return $.extend({}, d, {
                    data_filters,
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr) {
                ajs.datatable_error(xhr, "job-datatables");
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
                name: "code",
                data: "code",
                render: function (data, type, row) {
                    var str = `<div class="d-flex">
                            <div class="avatar-group ps-0 align-items-center">
                            <a href="` + cdn_url + 'job/details/' + ajs.hash_encode(row.id) + `"  class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="#` +
                    data +
                    `">#` +
                    data +
                    `</a></div></div>`;

                    return str;
                },
            },
            {
                name: "client_work_order",
                data: "client_work_order",
                defaultContent: '-'
            },
            {
                name: "service_type",
                data: "service_type",
                class: "text-capitalize",
                defaultContent: '-',
                render: function (data) {
                    if (data == 'P')
                    {
                        return "PPM";
                    } else
                    {
                        return "Reactive";
                    }
                }
            },
            {
                name: "service_name",
                data: "service_name",
            },            
            {
                data: "target_date",
                name: "target_date",
                render: function (data) {
                    return ajs.format_date(data);
                }
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
            }
        ],
        order: [["0", "desc"]],
    });
}

if ($("#job-datatables").length) {
	select2_ajax(
		"#status_filter",
		site_url + "master-record/get_all",
		"master_value",
		{ master_code: "JOB_STATUS" }
	);
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
    if (value == null) {
        return "-";
    }

    var icon = `<span class="badge  border border-success text-success  text-capitalize">` + value + `</span>`;
    return icon;
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
                {label : ($('#is_job_history').val() == true ? 'Job History' : 'Open Jobs'), url : null}
            ];
        } else {
            var breadcrumbs = [
                {label : 'Properties', url: cdn_url + 'properties/list'},
                {label : property.uprn_no, url: cdn_url + 'properties/details/'+ajs.hash_encode(property.id)},
                {label : ($('#is_job_history').val() == true ? 'Job History' : 'Open Jobs'), url : null}
            ];
        }

        if($('#is_job_history').val() == true) {
            data_filters['mv.master_value'] = 'completed';
        }

        set_breadcrumb(breadcrumbs);
        
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

$(function () {
});
