var master_data_type = "contract";
dataTable = null;
var keys = [
    "reference_number",
    "contract_number",
    "description",
    "start_date",
    "end_date",
    // "service_start_time",
    // "service_end_time",
    "job_prefix",
    "ppm_preplan"
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

    dataTable = new DataTable("#contract-datatables", {
        scrollY: (screen.height - 470) + 'px',
        searching: false,
        serverSide: true,
        processing: true,
        paging: true,
        responsive: false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: search,
        },
        ajax: {
            url: site_url + "contract/get_all",
            method: "GET",
            async: false,
            dataSrc: "data",
            data: function (d) {
                if ($("input[type=hidden][name='client_id']").val() > 0 && window.location.href.indexOf("clients") !== -1) {
                    data_filters['client_id'] = $("input[type=hidden][name='client_id']").val();
                }
                return $.extend({}, d, {
                    data_filters,
                });
            },
            error: function (xhr, error, thrown) {
                ajs.datatable_error(xhr, "contract-datatables");
                if (xhr.status !== 200) {
                    $("#contract-datatables").html("<p>No data found.</p>"); // Display "No data found" message if 404 error
                }
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
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
                    var deactivate_btn = (row.contract_active != 2) ? `<a class="deactivate-contract cursor-pointer"  data-id="` + row.id + `"  >
                                <i class="ri-indeterminate-circle-line primary-btn fs-15 align-bottom me-2 text-muted"></i>
                            </a>` : '';
                    deactivate_btn = '';
                    return (
                        `<a data-heading="Edit Contract - ` +
                            row.id +
                            `" href="` +
                            generate_edit_url(row) +
                            `" class="edit-btn" >`+edit_icon()+`</a>
                            ${deactivate_btn}`
                            + detail_icon()
                            
                    );
                    /* return (
                            `<div class="dropdown d-inline-block">
                                <button class="btn btn-soft-secondary btn-sm dropdown " type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                    <i class="ri-more-fill align-middle"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end " style="dropdown-menu dropdown-menu-end">
                                    <!--<li>
                                        <a href="` +
                            cdn_url +
                            "/contract/details/" +
                            row.id +
                            `" class="dropdown-item"><i class="ri-eye-fill align-bottom me-2 text-muted"></i> View</a>
                                    </li> -->
                                    <li>
                                        <a style="cursor:pointer"  data-heading="Edit Contract - ` +
                            row.id +
                            `" href="` +
                            generate_edit_url(row) +
                            `" class="dropdown-item edit-btn" >
                                            <i class="ri-pencil-fill align-bottom me-2 text-muted"></i>Edit
                                        </a>
                                        </li>
                                        <!--   <li>
                                        <a class="dropdown-item list_delete" data-type="` +
                            master_data_type +
                            `" data-id="` +
                            row.id +
                            `" data-action="delete" class="remove-item-btn" data-bs-toggle="modal" href="#deleteModal">
                                            <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>Delete
                                        </a>
                                    </li>
                                    -->
                                    ${deactivate_btn}
                                </ul>
                            </div>`
                            ); */
                },
            },
            // {
            //     data: null,
            //     className: "details-control",
            //     orderable: false,
            //     searchable: false,
            //     defaultContent: '<i class="ri-arrow-down-s-line align-bottom"></i>',
            // },
            {
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
            },
            {
                name: "contract_number",
                data: "contract_number",
                render: function (data, type, row) {
                    var str = "";
                    str +=
                            `<div class="d-flex">
                                    <div class="avatar-group">
                                        <a href="` + generate_view_url(row) + `" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="` +
                            data +
                            `">` +
                            data +
                            `</a></div></div>`;
                    return str;
                },
            },
            {
                data: "client_code",
                name: "client_code",
                render: function (data, type, row) {
                    return gen_client_detail_link(row.client_id, data);
                }
            },
            {data: "type", name: "type", class: "text-capitalize", defaultContent: '-', render: function (data) {
                    return data == 'ppm' ? 'PPM' : data;
                }},
            {data: "reference_number", name: "reference_number"},
            {data: "start_date", name: "start_date", render: function (data) {
                    return ajs.format_date(data);
                }},
            {data: "end_date", name: "end_date", render: function (data) {
                    return ajs.format_date(data);
                }},
//            {
//                data: "service_start_time",
//                name: "service_start_time",
//                render: function (data) {
//                    return data ? moment(data, "HH:mm:ss").format("HH:mm") : "-";
//                },
//            },
//            {
//                data: "service_end_time",
//                name: "service_end_time",
//                render: function (data) {
//                    return data ? moment(data, "HH:mm:ss").format("HH:mm") : "-";
//                },
//            },
            {
                name: "status",
                data: "status",
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                    return (data == 1)
                        ? '<span class="badge border border-success text-success">Active</span>'
                        : '<span class="badge border border-danger text-danger">Inactive</span>';
                }
            },
            {
                data: "service_end_time",
                name: "service_end_time",
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                    if (row.contract_active == 1 && row.status == 1) {
                        return `<button type="button" data-contract-id="${row.id}" data-client-id="${row.client_id}" data-heading="Add New Job" data-after-load-func="create_job_form" data-form-url="` + cdn_url + `job/create?in_popup=1" class="add-job-btn  btn btn-sm btn-success waves-effect waves-light add-job-btn-main">
                        <i class="ri-add-line align-bottom"></i> Add Job
                    </button>`;
                    } else {
                        return '-';
                    }
                }
            },
        ],
        order: [["2", "desc"]],
        drawCallback: function () {
            ajs.apply_ind_roles("Contracts");
        }
    });

    dataTable.setDetailRow = function (rowData) {
        var service_coverage = "";
        if (rowData.service_start_time) {
            service_coverage = ajs.format_time(rowData.service_start_time);
        }
        if (rowData.service_end_time) {
            service_coverage += ' - ' + ajs.format_time(rowData.service_end_time);
        }

        var workstreamHtml = "";
        $.each(rowData.workstreams, function (index, workstream) {
            workstreamHtml += `<tr><td>` + workstream.workstream + `</td>
                            <td>` + workstream.service + `</td>
                            <td>` + (workstream.sor_code ? workstream.sor_code : '-') + `</td>
                            <td>` + workstream.priority + `</td>
                            <td>` + (workstream.appt_required == 1 ? 'Yes' : 'No') + `</td></tr>`;
        });

        if (workstreamHtml == "") {
            workstreamHtml = "<td colspan='5' align='center'> Data Not Available</td>";
        }
        return `
            <div class="details-row row contract-details-row">
            <div class="col-md-2">
                    <p>Client Code: ${rowData.client_code}</p>
                    <p>Service Coverage: ${service_coverage}</p>
            </div>
            <div class="col-md-10">
                <table class="table mb-0">
                    <thead>
                        <tr><th>Workstream</th>
                        <th>Job Type</th>
                        <th>Default SOR</th>
                        <th>Priority</th>
                        <th>Appt. Req.</th>
                        </tr>
                    </thead>
                    <tbody>${workstreamHtml}</tbody>
                </table>
            </div>
        </div>
        `;
    }
}

if ($("#contract-datatables").length) {
    add_autocomplete_sel("#client_id_filter", "clients", ["client_code"], null, null);
    select2_ajax(
            "#tag_id_filter",
            site_url + "tag/get_all",
            "title",
            {module: 'contract'}
    );
    $("#type_filter").select2({allowClear: true, placeholder: 'Type', minimumResultsForSearch: Infinity});
    $("#status_filter").select2({allowClear: true, placeholder: 'Status', minimumResultsForSearch: Infinity});
    fetch_default_filter(master_data_type);

    var client_id = $("#client_id").val();
    if (client_id > 0) {
        ajs.ajax_form(site_url + 'client/get/' + client_id, null, 'GET', null, '0', '1', create_contr_breadcrumb, create_contr_breadcrumb);
    } else {
        var breadcrumbs = [
            {label: 'Contracts', url: null},
        ];
        set_breadcrumb(breadcrumbs);
    }
}

function create_contr_breadcrumb(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {
        var client = result_json.message.data;

        var detail_url = 'clients/details/' + ajs.hash_encode(client.id);
        var breadcrumbs = [
            {label: 'Clients', url: cdn_url + 'clients/list'},
            {label: client.client_code, url: cdn_url + detail_url},
            {label: 'Contracts', url: null}
        ];

        set_breadcrumb(breadcrumbs);

    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

function create_contr_breadcrumb2(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {
        var client = result_json.message.data;

        var detail_url = 'clients/details/' + ajs.hash_encode(client.id);
        var breadcrumbs = [
            {label: 'Clients', url: cdn_url + 'clients/list'},
            {label: client.client_code, url: cdn_url + detail_url},
            {label: 'Contracts', url: cdn_url + 'clients/' + ajs.hash_encode(client.id) + '/contract'},
            {label: 'New Contract', url: null}
        ];
        set_breadcrumb(breadcrumbs);

    } else {
        ajs_form_handler.show_errors(result_json);
    }
}


function generate_edit_url(contract)
{
    var client_id = $("#client_id").val();
    if (client_id > 0) {
        return cdn_url + `clients/` + ajs.hash_encode(contract.client_id) + `/contract/edit/` + ajs.hash_encode(contract.id);
    }
    return cdn_url + `contract/edit/` + ajs.hash_encode(contract.id);
}

function generate_view_url(contract)
{
    var client_id = $("#client_id").val();
    if (client_id > 0) {
        return cdn_url + `clients/` + ajs.hash_encode(contract.client_id) + `/contract/details/` + ajs.hash_encode(contract.id);
    }
    return cdn_url + `contract/details/` + ajs.hash_encode(contract.id);
}

function create_form(type = "create") {
    if (type == "create") {
        add_autocomplete_sel("#client_id", "clients", ["client_code"], null, null, undefined, $("#client_id_hidden").val());
        select2_ajax('#tags', site_url + 'tag/get_all', 'title', {module: 'contract'}, undefined);
    }

    $("#contractForm").validate({
        rules: {
            type: {
                required: true,
            },
            client_id: {
                required: true,
            },
            reference_number: {
                required: true,
            },
            contract_number: {
                required: true,
            },
            category_id: {
                required: true,
            },
            start_date: {
                required: true,
            }
        },
        errorPlacement: function (error, element) {
            if (element.hasClass("select2") && element.next(".select2-container").length)
            {
                error.insertAfter(element.next(".select2-container"));
            } else if (element.parent(".input-group").length || element.parent(".error-div").length) {
                error.insertAfter(element.parent());
            } else if (element.is(":radio")) {
                error.appendTo(element.closest('.mb-0'));
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            ajs.reload = true;
            // var post_data = $(form).serialize();
            var action = $(form).attr("action");
            var method = $(form).attr("method");
            var sub_button = $(form).find(":submit");
            ajs.submit_button_element = sub_button;
            $('#service_start_time').val(ajs.convert_time_local_to_utc($('#service_start_time').val()));
            $('#service_end_time').val(ajs.convert_time_local_to_utc($('#service_end_time').val()));
            $(".start-time").each(function () {
                $(this).val(ajs.convert_time_local_to_utc($(this).val()));  
            });
            $(".end-time").each(function () {
                $(this).val(ajs.convert_time_local_to_utc($(this).val()));
            });
            var formData = $(form).serializeArray();
            
            // Modify checkbox value if checked

            $("#contractForm input:checkbox:not(.all-module)").each(function () {
                var checkbox_value = $(this).is(":checked") ? 1 : 0;
                formData.push({name: $(this).data("name"), value: checkbox_value});
            });
            ajs.ajax_form(
                    action,
                    formData,
                    method,
                    null,
                    "1",
                    "1",
                    submit_handler,
                    submit_handler
                    );

            return false;
        },
    });
}

function submit_handler(result) {
    ajs_form_handler.hide_errors();
    if (ajs_form_handler.check_result(result)) {
        ajs.showAlertBar("success", result.message, true);
        if (result.contract_id) {
            var client_id = $("#client_id_hidden").val();
            if (client_id > 0) {
                window.location = cdn_url + 'clients/' + ajs.hash_encode(client_id) + "/contract/edit/" + ajs.hash_encode(result.contract_id);
            } else {
                window.location = cdn_url + "contract/edit/" + ajs.hash_encode(result.contract_id);
            }
        }
    } else {
        ajs_form_handler.show_errors_offcanvas(result);
    }
}

// set data in edit page
function load_contract_data(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {
        var contract = result_json.data;

        const client_id = $("#client_id_hidden").val();
        if (client_id > 0) {
            var detail_url = 'clients/details/' + ajs.hash_encode(contract.client_id);
            var breadcrumbs = [
                {label: 'Clients', url: cdn_url + 'clients/list'},
                {label: contract.client_code, url: cdn_url + detail_url},
                {label: 'Contracts', url: cdn_url + 'clients/' + ajs.hash_encode(contract.client_id) + '/contract'},
                {label: contract.contract_number, url: null}
            ];
        } else {
            var breadcrumbs = [
                {label: 'Contracts', url: cdn_url + 'contract/list'},
                {label: contract.contract_number, url: null}
            ];
        }
        set_breadcrumb(breadcrumbs);

        for (const [key, value] of Object.entries(contract)) {
            if (keys.includes(key)) {
                $("#" + key).val(value);
            }
        }
        $("input[name=type][value='" + contract.type + "']").prop("checked", true);
        $('#status').prop('checked', contract.status == 1);
        // Status changes on edit fire the change-status endpoint (cascade-safe); the checkbox has no name so it's not submitted with the form.
        $(document).off('change.contract_status').on('change.contract_status', '#status', function () {
            var id = $("#edit_id").val();
            if (!id) return;
            ajs.ajax_form(site_url + 'contract/change-status/' + id, null, 'GET', null, '1', '1',
                function (r) { ajs.refreshDataTable(); },
                function (r) { /* revert handled by user if needed */ }
            );
        });
        $("#service_start_time").val(ajs.convert_time_utc_to_local(contract.service_start_time));
        $("#service_end_time").val(ajs.convert_time_utc_to_local(contract.service_end_time));

        if(contract.end_date == '0000-00-00' || contract.end_date == null) {            
            $('#end_date').attr('readonly', false);
        }
        add_autocomplete_sel(
                "#client_id",
                "clients",
                ["client_code"],
                null,
                null,
                undefined,
                contract.client_id,
                contract.client_code
                );
        // select2_ajax(
        //         "#category_id",
        //         site_url + "master-record/get_all",
        //         "master_value",
        //         {master_code: "CONTRACT_CATEGORY"},
        //         undefined,
        //         contract.category_id
        //         );
        var tags = pluck(contract.tags, 'tag_id');
        
        select2_ajax('#tags', site_url + 'tag/get_all', 'title', {module: 'contract'}, undefined, tags);
        set_coverages(contract.coverage_periods);
    } else {
        ajs_form_handler.show_errors_offcanvas(result_json);
    }
}

function set_coverages(coverages) {
    $.each(coverages, function (index, coverage) {
        $("#coverage_id_" + index).val(coverage.id);
        $("#coverage_start_time_" + index).val(ajs.convert_time_utc_to_local(coverage.start_time));
        $("#coverage_end_time_" + index).val(ajs.convert_time_utc_to_local(coverage.end_time));
        $("#coverage_close_" + index + "[value='" + coverage.close + "']").prop(
                "checked",
                true
                );
        $("#coverage_open_" + index + "[value='" + coverage.open + "']").prop(
                "checked",
                true
                );
    });
}

// set data in detail page
function set_datail(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var contract = result_json.data;

        const client_id = $("#client_id_hidden").val();
        if(is_modal != 'true') {
            if (client_id > 0) {
                var detail_url = 'clients/details/' + ajs.hash_encode(contract.client_id);
                var breadcrumbs = [
                    {label: 'Clients', url: cdn_url + 'clients/list'},
                    {label: contract.client_code, url: cdn_url + detail_url},
                    {label: 'Contracts', url: cdn_url + 'clients/' + ajs.hash_encode(contract.client_id) + '/contract'},
                    {label: contract.contract_number, url: null}
                ];
            } else {
                var breadcrumbs = [
                    {label: 'Contracts', url: cdn_url + 'contract/list'},
                    {label: contract.contract_number, url: null}
                ];
            }
            set_breadcrumb(breadcrumbs);
        }

        if (contract.contract_active == 0) {
            $("#add-job").remove();
        }

        for (const [key, value] of Object.entries(contract)) {
            if (keys.includes(key)) {
                $("#detail_" + key).html(value);
            }
        }
        $("#contract_no_header").html(contract.contract_number);
        $("#detail_client_code").html(contract.client_code);
        $("#detail_start_date").html(ajs.format_date(contract.start_date));
        $("#detail_end_date").html(ajs.format_date(contract.end_date));
        if (contract.service_start_time) {
            $("#detail_service_start_time").html(ajs.format_time(contract.service_start_time));
        }
        if (contract.service_end_time) {
            $("#detail_service_end_time").html(ajs.format_time(contract.service_end_time));
        }

        if (contract.tags.length) {
            var tags = pluck(contract.tags, 'title').join(', ');
            $("#detail_tags").html(tags);
        }

        $('[id="client_id"]:hidden').val(contract.client_id);
        set_coverage_in_details(contract.coverage_periods);
        set_workstream_in_details(contract.workstreams);
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

function set_coverage_in_details(coverages) {
    var coverageHtml = '';
    $.each(coverages, function (index, coverage) {
        coverageHtml += `<tr><td>` + coverage.day + `</td>
                        <td>` + ajs.format_time(coverage.start_time) + `</td>
                        <td>` + ajs.format_time(coverage.end_time) + `</td>
                        <td>` + (coverage.close == 1 ? 'Yes' : 'No') + `</td>
                        <td>` + (coverage.open == 1 ? 'Yes' : 'No') + `</td></tr>`;
    });
    $("#detail_coverage_period").html(coverageHtml);
}

function set_contact_detail(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var personnel = result_json.data;

        format_contacts(personnel.ajs_contacts);
        format_contacts(personnel.client_contacts, 'client');
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

function set_workstream_in_details(workstreams) {
    var workstreamHtml = '';
    $.each(workstreams, function (index, workstream) {
        workstreamHtml += `<tr><td>` + workstream.workstream + `</td>
                        <td>` + workstream.service + `</td>
                        <td>` + (workstream.sor_code ? workstream.sor_code : '-') + `</td>
                        <td>` + workstream.priority + `</td>
                        <td>` + (workstream.appt_required == 1 ? 'Yes' : 'No') + `</td>
                        <td>` + (workstream.status == 1 ? 'Active' : 'Inactive') + `</td></tr>`;
    });
    $("#detail_workstreams").html(workstreamHtml);
}

function format_contacts(contacts, type = 'ajs')
{
    var contactHtml = "";
    $.each(contacts, function (index, contact) {
        var name = type == 'client' ? contact.name : contact.first_name + ' ' + contact.last_name;
        contactHtml += '<tr><td class="fw-medium">' + contact.type + '</td><td class="detail-data"><span id="detail_is_asbestos">' + name;

        if (contact.email) {
            contactHtml += '</br>E: <a href="mailto:' + contact.email + '">' + contact.email + '</a>';
        }
        if (contact.phone) {
            contactHtml += '</br>T: <a href="tel:' + contact.phone + '">' + contact.phone + '</a>';
        }
        contactHtml += '</span></td></tr>';

    });
    $("#" + type + "_contacts").html(contactHtml);
}

function edit_form() {
    create_form("edit");
    var id = $("#edit_id").val();

    if (is_contract_active)
    {
        $('#client_id').attr('readonly', 'readonly');
        $('#reference_number').attr('readonly', 'readonly');
        $('#contract_number').attr('readonly', 'readonly');
        $('#start_date').attr('readonly', 'readonly');
        $('#end_date').attr('readonly', 'readonly');

        $('input[name="type"]').each(function () {
            $(this).prop('disabled', true);
        });
    }
    ajs.apply_ind_roles("Contracts");
    ajs.ajax_form(
            site_url + "contract/get/" + id,
            null,
            "GET",
            null,
            "1",
            "1",
            load_contract_data,
            load_contract_data
            );
}

function get_details() {
    var id = $("#contract_id").val();
    ajs.ajax_form(site_url + 'contract/detail/' + id + '?detail=true', null, 'GET', null, '1', '1', set_datail, set_datail);
    ajs.ajax_form(
            site_url + "contract/" + id + "/personnel", null, "GET", null, "0", "0", set_contact_detail, set_contact_detail);
    load_contract_documents(id);
}

// ── Contract documents ────────────────────────────────────────────────────────
function load_contract_documents(id) {
    if (!id) {
        id = $("#contract_id").val();
    }
    ajs.ajax_form(site_url + "contract/" + id + "/documents", null, "GET", null, "0", "0", render_contract_documents, render_contract_documents);
}

function render_contract_documents(result_json) {
    var rows = '<tr><td colspan="6" class="text-center">No documents uploaded yet.</td></tr>';
    var documents = (result_json && result_json.status && Array.isArray(result_json.data)) ? result_json.data : [];

    if (documents.length) {
        rows = "";
        $.each(documents, function (i, doc) {
            var caption = isEmpty(doc.caption) ? doc.name : doc.caption;
            rows +=
                "<tr>" +
                "<td>" + (i + 1) + "</td>" +
                '<td><a href="' + doc.file_path + '" target="_blank" rel="noopener">' + caption + "</a></td>" +
                "<td>" + (isEmpty(doc.file_type) ? "-" : doc.file_type) + "</td>" +
                "<td>" + (isEmpty(doc.added_by_name) ? "-" : doc.added_by_name) + "</td>" +
                "<td>" + (isEmpty(doc.add_date) ? "-" : ajs.format_datetime(doc.add_date)) + "</td>" +
                '<td class="text-end"><a href="javascript:void(0);" class="text-danger delete-contract-document" data-id="' + doc.id + '" title="Delete"><i class="ri-delete-bin-line fs-16"></i></a></td>' +
                "</tr>";
        });
    }
    $("#contract_documents_list").html(rows);
}

$(document).on("click", "#upload_contract_document", function () {
    var id = $("#contract_id").val();
    var file_input = $("#contract_document_file")[0];

    if (!file_input || !file_input.files.length) {
        ajs.toast_error ? ajs.toast_error("Please choose a file to upload.") : alert("Please choose a file to upload.");
        return;
    }

    var formData = new FormData();
    formData.append("upload", file_input.files[0]);

    var $btn = $(this);
    $btn.prop("disabled", true);
    ajs.show_loader();

    $.ajax({
        url: site_url + "contract/" + id + "/documents",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: function (xhr, settings) {
            ajs.set_auth_header(xhr, settings);
        },
        success: function (res) {
            ajs_form_handler.api_response(res);
            $("#contract_document_file").val("");
            load_contract_documents(id);
        },
        error: function (xhr) {
            ajs_form_handler.show_errors(xhr && xhr.responseJSON ? xhr.responseJSON : {message: "Upload failed."});
        },
        complete: function () {
            $btn.prop("disabled", false);
            ajs.hide_loader();
        }
    });
});

$(document).on("click", ".delete-contract-document", function () {
    var doc_id = $(this).data("id");
    var id = $("#contract_id").val();

    Swal.fire({
        title: "Are you sure?",
        text: "This document will be permanently deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f06548",
        confirmButtonText: "Yes, delete it",
    }).then(function (result) {
        if (result.isConfirmed) {
            ajs.ajax_form(site_url + "contract/document/delete/" + doc_id, null, "DELETE", null, "1", "1", function (res) {
                ajs_form_handler.api_response(res);
                load_contract_documents(id);
            }, ajs_form_handler.show_errors);
        }
    });
});

function deactivate_contract(id, is_cancel_job = false) {
    ajs.ajax_form(site_url + 'contract/deactivate/' + id + '/' + is_cancel_job, null, 'GET', null, '1', '1', ajs_form_handler.api_response, ajs_form_handler.show_errors);
}

$(function () {
    if ($("#is_detail_page").val()) {
        get_details();
    } else if ($("#edit_id").val()) {
        edit_form();
    } else if ($("#contract-datatables").length == 0) {
        const client_id = $("#client_id_hidden").val();
        if (client_id > 0) {
            ajs.ajax_form(site_url + 'client/get/' + client_id, null, 'GET', null, '0', '1', create_contr_breadcrumb2, create_contr_breadcrumb2);
        } else {
            var breadcrumbs = [
                {label: 'Contracts', url: cdn_url + 'contract/list'},
                {label: 'New Contract', url: null}
            ];
            set_breadcrumb(breadcrumbs);
        }
        create_form();
    }

    $(document).on("change", "#start_date", function () {
        const value = $(this).val();
        $("#end_date").attr("min", value);
    });
    $(document).on("change", "#end_date", function () {
        const value = $(this).val();
        $("#start_date").attr("max", value);
    });

    $(document).on("change", "#service_start_time", function () {
        const start_time = $(this).val();
        $("#service_end_time").attr("min", start_time);

        if (!$("#edit_id").val()) {
            $(".start-time").each(function () {
                $(this).val(start_time);
            });
        }
    });
    $(document).on("change", "#service_end_time", function () {
        const end_time = $(this).val();
        $("#service_start_time").attr("max", end_time);

        if (!$("#edit_id").val()) {
            $(".end-time").each(function () {
                $(this).val(end_time);
            });
        }
    });

    $(document).on("change", ".start-time", function () {
        $(this).closest("tr").find(".end-time").attr("min", $(this).val());
    });
    $(document).on("change", ".end-time", function () {
        $(this).closest("tr").find(".start-time").attr("max", $(this).val());
    });

    $(document).on("click", ".add-job-btn", function () {
        ajs.show_loader();
        var client_id = $(this).data('client-id');
        var contract_id = $(this).data('contract-id');
        $('[id="client_id"]:hidden').val(client_id);
        $('#hidden_contract_id').val(contract_id);

        var form_link = $(this).data('form-url');
        var heading = $(this).data('heading');
        var after_load_func = $(this).data('after-load-func');
        ajs.showOffCanvasFormRight(form_link, heading, after_load_func);
        ajs.hide_loader();
    });

    $(document).on("click", ".deactivate-contract", function () {
        var contract_id = $(this).data('id');

        if (contract_id) {
            ajs.ajax_form(site_url + "contract/job-count/" + contract_id, null, "GET", null, "1", "1", function (response) {
                if (ajs_form_handler.check_result(response)) {
                    if (response.data.job_count) {
                        var msg = `This contract has ${response.data.job_count} open jobs, what do you want to do?`;
                        Swal.fire({
                            title: "Are you sure?",
                            text: msg,
                            icon: "warning",
                            showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonColor: "#198754",
                            confirmButtonText: "Yes, Deactivate Contract & Cancel Jobs",
                            denyButtonText: "Deactivate Contract & Keep Jobs",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                deactivate_contract(contract_id, true);
                            } else if (result.isDenied) {
                                deactivate_contract(contract_id);
                            }
                        });
                    } else {
                        var msg = `Are you want deactivate this contract?`;
                        Swal.fire({
                            title: "Are you sure?",
                            text: msg,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#198754",
                            confirmButtonText: "Yes",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                deactivate_contract(contract_id);
                            }
                        });
                    }
                }
            }, ajs_form_handler.show_errors);
        }

    });

    ajs.apply_ind_roles("Contracts");
});
