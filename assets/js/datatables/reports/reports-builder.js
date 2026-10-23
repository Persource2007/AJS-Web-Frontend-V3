var service_ids = [];
var master_data_type = "reports";

var breadcrumbs = [
    {label: 'Reports', url: cdn_url + 'reports/list'},
    {label: 'Create Report', url: null},
];
set_breadcrumb(breadcrumbs);


add_autocomplete_sel("#contract_id_filter", "contracts", ["contract_number"], null, null);
add_autocomplete_sel("#client_id_filter", "clients", ["client_code"], null, null);
add_autocomplete_sel("#property_id_filter", "client_properties", ["uprn_no"], null, null);
select2_ajax("#status_id_filter", site_url + "master-record/get_all", "master_value", {master_code: "JOB_STATUS"});
select2_ajax("#tag_id_filter", site_url + "tag/get_all", "title", {module: 'job'});
select2_ajax("#service_id_filter", site_url + "service/get_all", "title");
select2_ajax("#workstream_id_filter", site_url + "workstream/get_all", "title");

function load_data(result_json)
{
    if (ajs_form_handler.check_result(result_json))
    {
        var data = result_json.data;
        $('#title').val(data.title);
        $('#report_type').val(data.report_type).trigger('change');
        $('#report_type').attr('readonly', 'readonly');
        $('#code').val(data.code);
        $('#selectedColumns').val(data.columns);
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
                add_autocomplete_sel("#client_id_filter", "clients", ["client_code"], null, null, 'body', client_id_filter);
            }
            if (contract_id_filter && contract_id_filter > 0)
            {
                add_autocomplete_sel("#contract_id_filter", "contracts", ["contract_number"], null, null, 'body', contract_id_filter);
            }
            if (property_id_filter && property_id_filter > 0)
            {
                add_autocomplete_sel("#property_id_filter", "client_properties", ["uprn_no"], null, null, 'body', property_id_filter);
            }
            if (status_id_filter && status_id_filter > 0)
            {
                select2_ajax("#status_id_filter", site_url + "master-record/get_all", "master_value", {master_code: "JOB_STATUS"}, 'body', status_id_filter);
            }
            if (tag_id_filter && tag_id_filter > 0)
            {
                select2_ajax("#tag_id_filter", site_url + "tag/get_all", "title", {module: 'job'}, 'body', tag_id_filter);
            }
            if (workstream_id_filter && workstream_id_filter > 0)
            {
                select2_ajax("#workstream_id_filter", site_url + "workstream/get_all", "title", null, 'body', workstream_id_filter);
            }
            if (service_id_filter && service_id_filter > 0)
            {
                select2_ajax("#service_id_filter", site_url + "service/get_all", "title", null, 'body', service_id_filter);
            }
        }

        var selectedColumns = []; // Store selected columns
        // Load prefilled selected columns
        var prefilledColumns = $("#selectedColumns").val();
        if (prefilledColumns) {
            selectedColumns = JSON.parse(prefilledColumns);
            selectedColumns.forEach(col => {
                $(`.item-checkbox[data-id='${col.id}']`).prop("checked", true);
                if (col.label_name == null)
                {
                    addToDraggableList(col.id, col.title, col.sample_value, col.alignment);
                } else
                {
                    addToDraggableList(col.id, col.label_name, col.sample_value, col.alignment);
                }
            });
        }
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

$(document).ready(function () {

    var id = $('#report_id').val();
    if (id !== false && parseInt(id) > 0)
    {
        ajs.ajax_form(site_url + "report_builder/" + id, null, "GET", null, "0", "0", load_data, load_data);
    }


    $("#reportForm").validate({
        onkeyup: false,
        rules: {
            title: {
                required: true,
            },
            code: {
                required: true,
            },
            selectedColumns: {
                required: true,
            },
            report_type: {
                required: true,
            },
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
        submitHandler: function (form) {
            var sub_button = $(form).find(":submit");
            ajs.submit_button_element = sub_button;
            var action = $(form).attr("action");
            var method = $(form).attr("method");

            var formData = $(form).serializeArray();
            ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.form_submit_response, ajs_form_handler.form_submit_response);
            setTimeout(function () {
                window.location.href = cdn_url + 'reports/list';
            }, 500);

            return false;
        },
    });
});


function load_fields(report_type, selecte_all_columns = false) {
    ajs.ajax_form(site_url + "report_fields/get_all/" + report_type, null, "GET", null, "0", "0", generate_fields, generate_fields, selecte_all_columns);
}

function reset_fields()
{
    $(".report-main").empty();
    $(".template-list").empty();
    $("#sort_order").empty();
    $("#group_by").empty();
}

function generate_fields(result_json, selecte_all_columns = false)
{
    if (ajs_form_handler.check_result(result_json)) {
        var fields = result_json.data;

        var ul = $(".report-main"); // Create UL element
        var select_drop = $("#sort_order"); // Create UL element
        var select_group_by = $("#group_by"); // Create UL element

        var selectedColumns = [];

        var selectAll = `
        <li>
            <div class="form-check form-check-outline form-check-primary mb-0">
                <input class="form-check-input" type="checkbox" id="selectAll">
                <label class="form-check-label mb-0" for="selectAll">
                    Select All
                </label>
            </div>
        </li>`;
        ul.append(selectAll);

        $.each(fields, function (index, item) {
            var li = `<li>
                <div class="form-check form-check-outline form-check-primary mb-0">
                    <input class="form-check-input item-checkbox" type="checkbox" id="formCheck${item.id}" data-id="${item.id}" data-title="${item.title}" data-sample-value="${item.sample_value}">
                    <label class="form-check-label mb-0" for="formCheck${item.id}">
                        ${item.title}
                    </label>
                </div>
            </li>`;
            var option = `<option value="${item.id}">${item.title}</option>`;

            ul.append(li); // Append LI to UL
            select_drop.append(option); // Append LI to UL
            select_group_by.append(option); // Append LI to UL

            const report_type = $('#report_type').val();
            if (report_type == 2) {
                select_drop.prop("disabled", true);
                select_group_by.prop("disabled", true);
                $("#sort_type").prop("disabled", true);
            } else {
                select_drop.prop("disabled", false);
                select_group_by.prop("disabled", false);
                $("#sort_type").prop("disabled", false);
            }
        });

    } else {
        ajs_form_handler.show_errors(result_json);
    }

    $("#selectAll").on("change", function () {
        $(".item-checkbox").prop("checked", this.checked).trigger("change");
    });

    if (selecte_all_columns) {
        $("#selectAll").prop("checked", true).trigger("change");
    }
}


$(document).on("change", ".item-checkbox", function () {
    var id = $(this).data("id");
    var title = $(this).data("title");
    var sample_value = $(this).data("sample-value");

    if ($(this).is(":checked")) {
        addToDraggableList(id, title, sample_value);
    } else {
        removeFromDraggableList(id);
    }

    // Check if "Select All" should be checked/unchecked
    if ($(".item-checkbox:checked").length === $(".item-checkbox").length) {
        $("#selectAll").prop("checked", true);
    } else {
        $("#selectAll").prop("checked", false);
    }
});

function addToDraggableList(id, title, sample_value, alignment = "Left") {
    if ($(`#draggableList .draggable-item[data-id="${id}"]`).length === 0) {
        var draggableItem = `
                <div class="list-group-item draggable-item" data-id="${id}" data-title="${title}" data-alignment="${alignment}" data-sample-value="${sample_value}">
                    <div class="row align-items-center">
                        <div class="col-lg-4 col-md-4 col-12 handle" style="cursor: move;">
                            <p class="mb-0"><i class="ri-drag-move-fill align-bottom"></i> ${title}</p>
                        </div>
                        <div class="col-lg-4 col-md-4 col-12 d-flex justify-content-end">
                            <div class="input-light">
                                <input type="text" value="${title}" class="form-control column-label" data-id="${id}" />
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-12 d-flex justify-content-end">
                            <div class="input-light">
                                <select class="form-control column-alignment" data-id="${id}">
                                    <option value="Left" ${alignment === "Left" ? "selected" : ""}>Left</option>
                                    <option value="Center" ${alignment === "Center" ? "selected" : ""}>Center</option>
                                    <option value="Right" ${alignment === "Right" ? "selected" : ""}>Right</option>
                                </select>
                            </div>
                            <i style="font-size: 24px; cursor: pointer; color: red;" class="las la-trash-alt delete-template ms-2" data-id="${id}"></i>
                        </div>
                    </div>
                </div>
            `;
        $("#draggableList").append(draggableItem);
        updateSelectedColumns();
}
}

// Function to remove item from draggable list
function removeFromDraggableList(id) {
    $(`#draggableList .draggable-item[data-id='${id}']`).remove();
    updateSelectedColumns();
}

// Delete button inside draggable list
$(document).on("click", ".delete-template", function () {
    var id = $(this).data("id");
    $(`.item-checkbox[data-id='${id}']`).prop("checked", false).trigger("change");
});

// Update stored selected columns
function updateSelectedColumns() {
    selectedColumns = [];
    $("#draggableList .draggable-item").each(function () {
        var id = $(this).data("id");
        var title = $(this).data("title");
        var sample_value = $(this).data("sample-value");
        var alignment = $(this).find(".column-alignment").val();
        var column_name = $(this).find(".column-label").val();
        selectedColumns.push({id, title, alignment, sample_value, column_name});
    });
    $("#selectedColumns").val(JSON.stringify(selectedColumns));
    generate_preview(selectedColumns);
}

function generate_preview(selectedColumns) {
    var headers = "";
    var body = "";
    $.each(selectedColumns, function (index, item) {
        let style = `style="text-align: ${item.alignment}"`;
        headers += `<th ${style}> ${item.column_name}</th>`;
        body += `<td ${style}> ${item.sample_value}</td>`;
    });
    $('#preview-table thead tr').html(headers);
    $('#preview-table tbody tr').html(body);
}


// Detect alignment changes
$(document).on("change", ".column-alignment", function () {
    updateSelectedColumns();
});

$(document).on("change", ".column-label", function () {
    updateSelectedColumns();
});

// Make list sortable (draggable)
$("#draggableList").sortable({
    handle: ".handle",
    update: function () {
        updateSelectedColumns();
    }
}).disableSelection();

$(document).on('change', '#report_type', function (e) {
    var report_type = $(this).val();
    var selecte_all_columns = false;
    reset_fields();

    if (report_type == 2) {
        selecte_all_columns = true;
        $('.columns-section').hide();
    } else {
        $('.columns-section').show();
    }

    if (report_type > 0 )
    {
        load_fields(report_type, selecte_all_columns);
    }
    // reset preview
    $('#preview-table tr').html("");
});


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

            add_autocomplete_sel("#property_id_filter", "client_properties", ["uprn_no"], null, {"client_properties.client_id": client_id});
            if ($('#contract_id_filter').hasClass('select2-hidden-accessible'))
            {
                $("#contract_id_filter").select2("destroy");
                $('#contract_id_filter').find('option:not(:first)').remove();
            }
            select2_ajax("#contract_id_filter", site_url + "contract/get_all", "contract_number", {client_id: data.message.data.id, 'contracts.contract_active': '1'});
        });
    }
});

