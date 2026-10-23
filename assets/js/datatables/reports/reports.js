var service_ids = [];
var master_data_type = "reports";
dataTable = null;
const keys = [
    "add_date",
    "added_by",
    "id",
    "status",
];

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

    dataTable = new DataTable("#ajax-datatables", {
        scrollY: (screen.height - 450) + 'px',
        searching: false,
        serverSide: true,
        processing: true,
        paging: true,
        bDestroy: true,
        responsive: false,
        pageLength: page_limit,
        search: {
            search: search,
        },
        //dom: "Bfrtip",
        // buttons: ["excel"],
        ajax: {
            url: site_url + "reports/get_all",
            method: "GET",
            async: false,
            dataSrc: "data",
            data: function (d) {
                return $.extend({}, d, {
                    data_filters,
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr) {
                ajs.datatable_error(xhr, "ajax-datatables");
            }
        },
        language: {
            emptyTable: "No data found",
        },
        columns: [
            {
                data: null,
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                    return (
                            `<a data-after-load-func="edit_form" data-heading="Edit Report - ` + row.code + `" data-module="Reports" data-action="edit" class="check-permission" href="` + cdn_url + `reports/edit/` + ajs.hash_encode(row.id) + `" >` + edit_icon() + `</a>` +
                            `<a data-after-load-func="report_filters" data-heading="Generate Report - ` + row.code + `"  data-form-url="` + cdn_url + `reports/add_filters/` + row.id + `" class="popup-form-button download-btn"  data-report-id="` + row.id + `" title="Generate Report" ><i class="ri-download-fill align-bottom me-2 primary-btn cursor-pointer fs-15"></i></a>`
                            );
                },
            },
            {
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
            },
            {
                name: "title",
                data: "title",
            },
            {
                name: "code",
                data: "code",
            },
            {
                name: "add_date",
                data: "add_date",
                render: function (data, type, row) {
                    return ajs.format_datetime(row.add_date);
                },
            },
            {
                name: "username",
                data: "username",
            },
        ],
        order: [["1", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Reports");
            ajs.apply_permissions();
        }
    });
}

if ($("#ajax-datatables").length) {
    fetch_default_filter(master_data_type);
    var breadcrumbs = [
        {label: 'Reports', url: null},
    ];
    set_breadcrumb(breadcrumbs);
}


$(document).on('click', '.download-report', function (e) {
    e.preventDefault();
    var report_id = $(this).data('report-id');

    ajs.ajax_form(
            site_url + 'report/generate/' + report_id,
            null,
            'GET',
            null,
            "1",
            "1",
            ajs_form_handler.offcanvas_form,
            ajs_form_handler.offcanvas_form
            );
})


$(function () {
    ajs.apply_ind_roles('Reports');
});



//Report Filters

function load_fields(report_type) {

    ajs.ajax_form(site_url + "report_fields/get_all/" + report_type, null, "GET", null, "0", "0", generate_fields, generate_fields);
}


function generate_fields(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {
        var fields = result_json.data;

        var select_drop = $("#sort_order"); // Create UL element
        var group_by_drop = $("#group_by"); // Create UL element

        var selectedColumns = [];

        $.each(fields, function (index, item) {

            var option = `<option value="${item.id}">${item.title}</option>`;

            select_drop.append(option); // Append LI to UL
            group_by_drop.append(option); // Append LI to UL
        });

        const report_type = fields.length > 0 ? fields[0]?.report_type : 1;
        if (report_type == 2) {
            select_drop.prop("disabled", true);
            group_by_drop.prop("disabled", true);
            $("#sort_type").prop("disabled", true);
        } else {
            select_drop.prop("disabled", false);
            group_by_drop.prop("disabled", false);
            $("#sort_type").prop("disabled", false);
        }

    } else {
        ajs_form_handler.show_errors(result_json);
    }


}

function load_data(result_json)
{
    if (ajs_form_handler.check_result(result_json))
    {
        var data = result_json.data;
        $('#title').val(data.title);




        load_fields(data.report_type);

        $('#sort_type').val(data.order_type);
        $('#sort_order').val(data.order_by);
        $('#group_by').val(data.group_by);

        var filters = data.filters;
        if (filters) {

            filters_data = JSON.parse(filters);
            var client_id_filter = filters_data['client_properties.client_id'];
            var contract_id_filter = filters_data['contract_id'];
            var property_id_filter = filters_data['property_id'];
            var status_id_filter = filters_data['jobs.status_id'];
            var workstream_id_filter = filters_data['services.workstream_id'];
            var service_id_filter = filters_data['jobs.service_id'];
            var tag_id_filter = filters_data['module_tags.tag_id'];

            if (client_id_filter && client_id_filter > 0)
            {
                add_autocomplete_sel("#client_id_filter", "clients", ["client_code"], null, null, 'offcanvasRight', client_id_filter);
            }
            if (contract_id_filter && contract_id_filter > 0)
            {
                add_autocomplete_sel("#contract_id_filter", "contracts", ["contract_number"], null, null, 'offcanvasRight', contract_id_filter);
            }
            if (property_id_filter && property_id_filter > 0)
            {
                add_autocomplete_sel("#property_id_filter", "client_properties", ["uprn_no"], null, null, 'offcanvasRight', property_id_filter);
            }
            if (status_id_filter && status_id_filter > 0)
            {
                select2_ajax("#status_id_filter", site_url + "master-record/get_all", "master_value", {master_code: "JOB_STATUS"}, 'offcanvasRight', status_id_filter);
            }
            if (tag_id_filter && tag_id_filter > 0)
            {
                select2_ajax("#tag_id_filter", site_url + "tag/get_all", "title", {module: 'job'}, 'offcanvasRight', tag_id_filter);
            }
            if (workstream_id_filter && workstream_id_filter > 0)
            {
                select2_ajax("#workstream_id_filter", site_url + "workstream/get_all", "title", null, 'offcanvasRight', workstream_id_filter);
            }
            if (service_id_filter && service_id_filter > 0)
            {
                select2_ajax("#service_id_filter", site_url + "service/get_all", "title", null, 'offcanvasRight', service_id_filter);
            }
        }

    } else {
        ajs_form_handler.show_errors(result_json);
    }
}



function report_filters()
{

    var id = $('#template_id').val();

    add_autocomplete_sel("#contract_id_filter", "contracts", ["contract_number"], null, 'offcanvasRight');
    add_autocomplete_sel("#client_id_filter", "clients", ["client_code"], null, 'offcanvasRight');
    add_autocomplete_sel("#property_id_filter", "client_properties", ["uprn_no"], null, 'offcanvasRight');
    select2_ajax("#status_id_filter", site_url + "master-record/get_all", "master_value", {master_code: "JOB_STATUS"}, 'offcanvasRight');
    select2_ajax("#tag_id_filter", site_url + "tag/get_all", "title", {module: 'job'}, 'offcanvasRight');
    select2_ajax("#service_id_filter", site_url + "service/get_all", "title", null, 'offcanvasRight');
    select2_ajax("#workstream_id_filter", site_url + "workstream/get_all", "title", null, 'offcanvasRight');
    select2_ajax("#batch_id_filter", site_url + "invoice/get_all", "batch_no", null, 'offcanvasRight');

    if (id !== false && parseInt(id) > 0)
    {
        ajs.ajax_form(site_url + "report_builder/" + id, null, "GET", null, "0", "0", load_data, load_data);
    }

    $("#addForm").validate({
        onkeyup: false,
        rules: {
        },
        messages: {
           
        },
        errorPlacement: function (error, element) {
            if (
                    element.hasClass("select2") &&
                    element.next(".select2-container").length
                    ) {
                error.insertAfter(element.next(".select2-container"));
            } else if (element.parent(".input-group").length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: async function (form, event)
        {
            event.preventDefault(); 
            Swal.fire({
                title: 'Processing...',
                text: 'Please wait while exporting report.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            await new Promise(r => setTimeout(r, 50));

            var sub_button = $(form).find(':submit');
            ajs.submit_button_element = sub_button;
            var action = $(form).attr('action');
            var method = $(form).attr('method');
            var post_data = $(form).serialize();
            ajs.ajax_form(action, post_data, method, null, '1', '1', download_report, ajs_form_handler.offcanvas_form);
            return false;
        }
    });
}

function download_report(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {
        var path = result_json.path;
        $('#offcanvasRight').offcanvas('hide');
        window.location.href = site_url + path;
        ajs_form_handler.api_response(result_json);
    } else {
        ajs_form_handler.api_response(result_json);
    }
}


$(document).on("change", "#client_id_filter", function () {
    var client_id = $(this).val();
    if (typeof client_id !== 'undefined' && client_id > 0)
    {
        ajs.ajax_form(site_url + "client/get/" + client_id, null, "GET", null, "1", "1", function (data) {

            if ($('#property_id_filter').hasClass('select2-hidden-accessible'))
            {
                $("#property_id_filter").select2("destroy");
                $('#property_id_filter').find('option:not(:first)').remove();
                //$("#contract_id").empty();
            }
            if ($('#batch_id_filter').hasClass('select2-hidden-accessible'))
            {
                $("#batch_id_filter").select2("destroy");
                $('#batch_id_filter').find('option:not(:first)').remove();
                //$("#contract_id").empty();
            }

            add_autocomplete_sel("#property_id_filter", "client_properties", ["uprn_no"], null, {"client_properties.client_id": client_id}, 'offcanvasRight');
            select2_ajax("#batch_id_filter", site_url + "invoice/get_all", "batch_no", {"invoices.client_id": client_id}, 'offcanvasRight');
            if ($('#contract_id_filter').hasClass('select2-hidden-accessible'))
            {
                $("#contract_id_filter").select2("destroy");
                $('#contract_id_filter').find('option:not(:first)').remove();
            }
            select2_ajax("#contract_id_filter", site_url + "contract/get_all", "contract_number", {client_id: data.message.data.id, 'contracts.contract_active': '1'}, 'offcanvasRight');
        });
    }
});


$(document).on("click", "#export-valuation-report", function (e) {
    e.preventDefault();
    Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "Do you want to export report?",
        confirmButtonText: "Yes",
        denyButtonText: "Cancel",
        showDenyButton: true,
        showCancelButton: false,
    }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Processing...',
                text: 'Please wait while exporting report.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            await new Promise(r => setTimeout(r, 50));
            //ajs.reload = true;
            ajs.ajax_form(site_url + "valuation-report/generate", null, "POST", null, "1", "1", function (res) {
                var path = res.path;
                window.location.href = site_url + path; 
                ajs_form_handler.api_response(res);
            }, 
            ajs_form_handler.api_response);
        }
    });
});
