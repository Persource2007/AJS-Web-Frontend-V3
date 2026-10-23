var selected_workstreams = {};
// Titles from the workstream/get_all call below, so get_workstream_div() does not
// have to refetch each workstream one at a time.
var workstream_titles = {};
select2_ajax('#service_preference_am', site_url + 'servicetime/get_all', 'title', null);
client_id = null;
function load_contract_data()
{
    console.log('load_contract_data');
    ajs.ajax_form_cache(site_url + 'workstream/get_all', {filters: {'workstreams.status': '1'}}, 'GET', null, null, null, function (return_data) {
        if (ajs.check_result(return_data))
        {
            var other = null;
            $.each(return_data.message.data, function (key, value) {
                workstream_titles[value.id] = value.title;
                var ws_html = `<div class="col-xxl-2"><div class="form-check form-switch form-switch-right form-switch-md">
                                    <label for="workstreams_` + value.id + `" class="form-label">` + value.title + `</label>
                                    <input data-ws-title="` + value.title + `" class="form-check-input workstream-switch " value="` + value.id + `" type="checkbox" name="workstreams[]" id="workstreams_` + value.id + `">
                                </div></div>`;
                if (value.workstream_code != 'OT') {
                    $('.workstreams_div').append(ws_html);
                } else {
                    other = ws_html;
                }

            });
            if (other) {
                $('.workstreams_div').append(other);
            }
        }
    });

    ajs.ajax_form(site_url + 'contract/' + contract_id + '/services', null, 'GET', null, null, null, add_services_auto, add_services_auto);
}


function get_selected_workstreams() {
    var values = [];
    $('.workstream-switch:checked').each(function () {
        values.push($(this).val());
    });
    $('#selected_ws').val(values);
    selected_workstreams = JSON.stringify(values);
    return values;
}

load_contract_data();

$('.workstream-switch').on('change', function (e)
{
    var ws_id = $(this).val();
    var ws_title = $(this).data('ws-title');
    var elm = $(this);
    if ($(this).is(':checked')) {

        get_selected_workstreams();
        get_workstream_div(ws_id);

    } else {
        var job_check = $('#job_type_' + ws_id + '_1').val();

        if (is_contract_active && job_check != '' && job_check > 0)
        {
            Swal.fire({
                title: "Workstream removal is not allowed, one or more job types are already setup under this workstream.",
                showDenyButton: true,
                showCancelButton: false,
                showDenyButton: false,
                confirmButtonText: "Ok",
                denyButtonText: "No"
            }).then((result) => {
                elm.prop('checked', true);
            });
        } else
        {
            Swal.fire({
                title: "Are you sure want to remove " + ws_title + "?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Yes",
                denyButtonText: "No"
            }).then((result) => {

                if (result.isConfirmed)
                {
                    elm.prop('checked', false);
                    get_workstream_div(ws_id);
                } else if (result.isDenied) {
                    elm.prop('checked', true);
                }
                get_selected_workstreams();

            });
        }
    }

});


function get_workstream_div(ws_id, edit)
{
    if ($('.ws-div-' + ws_id).length)
    {
        $('.ws-div-' + ws_id).remove();
        $('.nav-tabs-custom li.nav-item:last').children('a').addClass('active');
        $('.worklist-tab-content').find('.tab-pane:last').addClass('active');
    } else
    {
        var render_workstream = function (return_data) {
            if (ajs.check_result(return_data))
            {
                var workstream_details = return_data.message.data;

                $('.worklist-ul').append(`<li data-ws-id="` + workstream_details.id + `" class="nav-item ws-div-` + workstream_details.id + `"><a class="nav-link fs-14 " data-bs-toggle="tab" href="#ws-` + workstream_details.id + `" role="tab">` + workstream_details.title + `</a></li>`);
                var ws_html = `<div data-ws-id="` + workstream_details.id + `" class="tab-pane ws-div-` + workstream_details.id + `" id="ws-` + workstream_details.id + `" role="tabpanel"><div class="services-list ">
                                                    <div class="row align-items-end mt-0 mb-0">
                                                        <div class="col-xxl-6">
                                                            <h5 class="mb-0">` + workstream_details.title + `</h5>
                                                        </div>
                                                        <input type="hidden" name="total_services_` + ws_id + `" id="total_services_` + ws_id + `" value="1" />
                                                        <div class="col-xxl-6 text-end">
                                                            <a class="btn btn-success add-btn add-new-service-btn" data-ws-id="` + ws_id + `" ><i class="ri-add-line align-bottom me-1"></i> Add Service/Job Type</a>
                                                        </div>
                                                    </div>
                                                    <hr class="mt-1 mb-0">
                                                    <div class="mb-0 mt-3 table-responsive">
                                                        <table class="table align-middle  mb-3" id="tasksTable" style="width:100%;">
                                                            <thead class="table-light text-muted">
                                                                <tr>
                                                                    <th width="22%">Job Type <span class="text-danger">*</span></th>
                                                                    <th width="4%">Short Code</th>
                                                                    <th width="5%">Default SOR </th>
                                                                    <th width="2%">Priority <span class="text-danger">*</span></th>
                                                                    <th width="4%">Appt. Req.</th>
                                                                    <th width="5%">Appt. Workflow.</th>
                                                                    <th width="5%">Threshold</th>
                                                                    <th width="8%">Threshold Value</th>
                                                                    <th width="4%">Incl. Init SORs</th>
                                                                    <th width="4%">Enforce Threshold</th>
                                                                    <th width="7%">Min Margin</th>
                                                                    <th width="18%">Min Margin %</th>
                                                                    <th width="7%" title="Block Clear to Invoice when the job is below the minimum margin">Block CTI</th>
                                                                    <th width="5%">Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody class="form-check-all service_row_parent_` + ws_id + `">
                                                                
                                                            </tbody>
                                                        </table>
                                                        <!--end table-->

                                                        <div class="row pt-3 pb-3 pe-1 ps-1">
                                                            <!--<div class="col-lg-12 mb-3">
                                                                <label for="basiInput" class="form-label select-billing">Priority</label>
                                                                <div class="mt-4 mt-lg-0">
                                                                    <div class="form-check form-check-inline">
                                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox6" value="option1">
                                                                        <label class="form-check-label" for="inlineCheckbox6">7 Working Days (level 1)</label>
                                                                    </div>
                                                                    <div class="form-check form-check-inline">
                                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox7" value="option2">
                                                                        <label class="form-check-label" for="inlineCheckbox7">20 Working Days (level 2)</label>
                                                                    </div>
                                                                    <div class="form-check form-check-inline">
                                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox8" value="option3">
                                                                        <label class="form-check-label" for="inlineCheckbox8">60 Working Days (level 3)</label>
                                                                    </div>
                                                                </div>
                                                            </div>-->

                                                            <div class="col-xxl-6" data-select2-id="select2-data-33-8ce4">
                                                                <label for="set-role" class="form-label select-billing">Preferred Engineers</label>
                                                                <select class="form-control" name="preffered_engineers_` + ws_id + `[]" id="preffered_engineers_` + ws_id + `" multiple>
                                                                    
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div></div>`;
                //$('.workstream_parent_div').append(ws_html);
                $('.worklist-tab-content').append(ws_html);

                $('.nav-tabs-custom li.nav-item').children('a').removeClass('active');
                $('.worklist-tab-content').children('.tab-pane').removeClass('active');

                $('.nav-tabs-custom li.nav-item:last').children('a').addClass('active');
                $('.worklist-tab-content').find('.tab-pane:last').addClass('active');

                if (typeof edit !== 'undefined' && edit == '1')
                {

                } else
                {
                    add_autocomplete_sel('#preffered_engineers_' + ws_id, 'users', ['first_name', 'last_name'], null, {user_type: 16});
                    add_service_row(ws_id, 1);
                }
            }
        };

        if (typeof workstream_titles[ws_id] !== 'undefined')
        {
            // Title already came back with workstream/get_all — render straight
            // away instead of a blocking round trip per workstream.
            render_workstream({status: true, message: {data: {id: ws_id, title: workstream_titles[ws_id]}}});
        } else
        {
            ajs.ajax_form_cache(site_url + 'workstream/get/' + ws_id, null, 'GET', null, null, null, render_workstream);
        }
    }
}


function add_service_row(ws_id, row_num, edit, service_detail)
{

    var action_html = `<div class="form-check form-switch form-switch-md mb-0 ps-0 pe-0 d-flex align-items-center justify-content-center">
                                                                            <span data-ws-id="` + ws_id + `" data-row-num="` + row_num + `" class="remove-service-btn">
                                                                                <i style="font-size: 24px;cursor: pointer;" class="las la-trash-alt"></i>
                                                                            </span>
                                                                        </div>`;

    if (is_contract_active && typeof edit !== 'undefined' && edit == '1')
    {
        var is_active = service_detail.status == 1 ? 'checked' : '';
        action_html = `<div class="form-check form-switch form-switch-md mb-0 ps-0 pe-0 d-flex align-items-center justify-content-center">
                    <input class="form-check-input change-service-status-btn m-0" style="right:0;" aria-label="Service status" type="checkbox" role="switch"   data-service-id="${service_detail.service_id}" data-ws-id="${ws_id}" data-row-num="${row_num}" ${is_active}> </div>`;
    }

    var row_html = `<tr class="service_row_` + ws_id + `_` + row_num + `">
                                                                    <th scope="row">
                                                                        <div class="d-flex error-div">
                                                                            <!--<input class="form-check-input fs-15" type="checkbox" name="checkAll" value="option1">
                                                                            <label class="mb-0">PAT Testing</label>-->
                                                                            <select class="form-control job-type-drop" required data-row-num="` + row_num + `" data-ws-id="` + ws_id + `" name="job_type_` + ws_id + `_` + row_num + `" id="job_type_` + ws_id + `_` + row_num + `">
                                                                                <option selected value="">Select Job Type</option>
                                                                            </select>
                                                                        </div>
                                                                    </th>
                                                                    <td class="key_value_` + ws_id + `_` + row_num + `"></td>
                                                                    <td>
                                                                        <select class="form-control sor-col" name="sor_` + ws_id + `_` + row_num + `" id="sor_` + ws_id + `_` + row_num + `">
                                                                               <option value="" selected>SOR</option>
                                                                        </select>
                                                                    </td>
                                                                    <!--<td>
                                                                        <select class="form-control" name="pricing_model_` + ws_id + `_` + row_num + `" id="pricing_model_` + ws_id + `_` + row_num + `">
                                                                            <option value="" selected>Pricing Model</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <input type="text" name="target_days_` + ws_id + `_` + row_num + `" id="target_days_` + ws_id + `_` + row_num + `" required class="form-control" id="basiInput" placeholder="Target Days (i.e. 340)">
                                                                    </td>-->
                                                                    <td>
                                                                        <select class="form-control priority-col" required name="priority_` + ws_id + `_` + row_num + `" id="priority_` + ws_id + `_` + row_num + `">
                                                                            <option value="" selected>Select</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <div class="form-check form-switch form-switch-md mb-0 ps-0 pe-0 d-flex align-items-center justify-content-center">
                                                                            <input value="1" aria-label="Appointment required" class="form-check-input m-0" style="right:0;" type="checkbox" name="appt_required_` + ws_id + `_` + row_num + `" id="appt_required_` + ws_id + `_` + row_num + `" >
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <select class="form-control workflow-col" disabled name="workflow_` + ws_id + `_` + row_num + `" id="workflow_` + ws_id + `_` + row_num + `">
                                                                            <option value="" selected>Select</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <div class="form-check form-switch form-switch-md mb-0 ps-0 pe-0 d-flex align-items-center justify-content-center">
                                                                            <input value="1" aria-label="Enable threshold" class="form-check-input m-0" style="right:0;" type="checkbox" name="enable_threshold_` + ws_id + `_` + row_num + `" id="enable_threshold_` + ws_id + `_` + row_num + `" >
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <input disabled type="text" name="threshold_value_` + ws_id + `_` + row_num + `" id="threshold_value_` + ws_id + `_` + row_num + `" class="form-control number-only threshold-col" placeholder="e.g. 100">
                                                                    </td>
                                                                    <td>
                                                                        <div class="form-check form-switch form-switch-md mb-0 ps-0 pe-0 d-flex align-items-center justify-content-center">
                                                                            <input disabled value="1" aria-label="Include initial SORs" class="form-check-input code-switcher m-0" style="right:0;" type="checkbox" name="cacl_init_sor_` + ws_id + `_` + row_num + `" id="cacl_init_sor_` + ws_id + `_` + row_num + `" >
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="form-check form-switch form-switch-md mb-0 ps-0 pe-0 d-flex align-items-center justify-content-center">
                                                                            <input disabled value="1" aria-label="Enforce threshold" class="form-check-input m-0" style="right:0;" type="checkbox" name="enforce_th_` + ws_id + `_` + row_num + `" id="enforce_th_` + ws_id + `_` + row_num + `" >
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="form-check form-switch form-switch-md mb-0 ps-0 pe-0 d-flex align-items-center justify-content-center">
                                                                            <input value="1" aria-label="Enable minimum margin" class="form-check-input m-0" style="right:0;" type="checkbox" name="enable_min_margin_` + ws_id + `_` + row_num + `" id="enable_min_margin_` + ws_id + `_` + row_num + `" >
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <input disabled type="number" min="0" max="100" step="0.01" name="min_margin_value_` + ws_id + `_` + row_num + `" id="min_margin_value_` + ws_id + `_` + row_num + `" class="form-control min-margin-col" placeholder="e.g. 20">
                                                                    </td>
                                                                    <td>
                                                                        <div class="form-check form-switch form-switch-md mb-0 ps-0 pe-0 d-flex align-items-center justify-content-center">
                                                                            <input disabled value="1" aria-label="Block Clear to Invoice below minimum margin" class="form-check-input m-0" style="right:0;" type="checkbox" name="enforce_mm_` + ws_id + `_` + row_num + `" id="enforce_mm_` + ws_id + `_` + row_num + `" >
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        ` + action_html + `
                                                                    </td>
                                                                </tr>`;
    $('.service_row_parent_' + ws_id).append(row_html);

    if (is_contract_active && typeof edit !== 'undefined' && edit == '1')
    {
        $(`#priority_` + ws_id + `_` + row_num).attr('readonly', 'readonly');
        $(`#job_type_` + ws_id + `_` + row_num).attr('readonly', 'readonly');
    }

    if (typeof edit !== 'undefined' && edit == '1')
    {
        $('span.remove-service-btn[data-row-num="' + row_num + '"]').addClass('remove-from-db');
        $('span.remove-service-btn[data-row-num="' + row_num + '"]').attr('data-service-id', service_detail.service_id);
        add_autocomplete_inputs_prefilled(ws_id, row_num, service_detail);
    } else
    {
        add_autocomplete_inputs(ws_id, row_num);
    }
}

function add_autocomplete_inputs(ws_id, row_num)
{
    // console.log('1111');
    var client_id = $("#client_id_ajs").val();
    $filters = get_service_filters(ws_id);
    add_autocomplete_custom_dropdown('#job_type_' + ws_id + '_' + row_num, site_url + 'service/get_all_dropdown', ["title"], $filters);
    // select2_ajax('#job_type_' + ws_id + '_' + row_num, site_url + 'service/get_all', 'title', $filters);
    select2_ajax('#priority_' + ws_id + '_' + row_num, site_url + 'master-record/get_all', 'master_value', {master_code: "TARGET_TIMES"});
    select2_ajax('#workflow_' + ws_id + '_' + row_num, site_url + 'client/' + client_id + '/schedule/get_all', 'title', null);

    $('#total_services_' + ws_id).val(row_num);

    $('#appt_required_' + ws_id + '_' + row_num).on('change', function (e) {
        if ($(this).is(":checked")) {
            $('#workflow_' + ws_id + '_' + row_num).attr('required', 'required');
            $('#workflow_' + ws_id + '_' + row_num).removeAttr('disabled');
        } else
        {
            $('#workflow_' + ws_id + '_' + row_num).removeAttr('required');
            $('#workflow_' + ws_id + '_' + row_num).attr('disabled', 'disabled');
            $('#workflow_' + ws_id + '_' + row_num).val(null).trigger('change');
        }
    });

    $('#enable_threshold_' + ws_id + '_' + row_num).on('change', function (e) {
        if ($(this).is(":checked")) {
            $('#threshold_value_' + ws_id + '_' + row_num).attr('required', 'required').removeAttr('disabled');
            $('#cacl_init_sor_' + ws_id + '_' + row_num).removeAttr('disabled');
            $('#enforce_th_' + ws_id + '_' + row_num).removeAttr('disabled');
        } else
        {
            $('#threshold_value_' + ws_id + '_' + row_num).attr('disabled', 'disabled').removeAttr('required').val(null);
            $('#cacl_init_sor_' + ws_id + '_' + row_num).attr('disabled', 'disabled').prop('checked', false).trigger('change');
            $('#enforce_th_' + ws_id + '_' + row_num).attr('disabled', 'disabled').prop('checked', false).trigger('change');
        }
    });

    $('#enable_min_margin_' + ws_id + '_' + row_num).on('change', function (e) {
        if ($(this).is(":checked")) {
            $('#min_margin_value_' + ws_id + '_' + row_num).attr('required', 'required').removeAttr('disabled');
            $('#enforce_mm_' + ws_id + '_' + row_num).removeAttr('disabled');
        } else
        {
            $('#min_margin_value_' + ws_id + '_' + row_num).attr('disabled', 'disabled').removeAttr('required').val(null);
            $('#enforce_mm_' + ws_id + '_' + row_num).attr('disabled', 'disabled').prop('checked', false).trigger('change');
        }
    });

    $('#job_type_' + ws_id + '_' + row_num).on('change', function (e) {
        // console.log('change');
        var service_id = $(this).val();
        var el_id = $(this).attr('id');
        var workstream_id = $(this).data('ws-id');
        var row_num = $(this).data('row-num');
        var client_id = $("#client_id_ajs").val();
        if (parseInt(service_id) > 0)
        {

            var chk = check_service_already_selected(service_id, el_id, workstream_id);
            if (!chk)
            {                
                ajs.ajax_form(site_url + 'service/get/' + service_id, null, 'GET', null, '1', null, function (return_data) {
                    if (ajs.check_result(return_data))
                    {
                        $('.key_value_' + workstream_id + '_' + row_num).html(return_data.message.data.service_code);
                        if (typeof return_data.message.data.default_sor_name !== 'undefined' && return_data.message.data.default_sor_name != '' && return_data.message.data.default_sor_name != null)
                        {
                            // $('#sor_' + workstream_id + '_' + row_num).append('<option selected value="' + return_data.message.data.default_sor + '">' + return_data.message.data.default_sor_name + '</option>');
                        }
                        add_autocomplete_custom_dropdown('#sor_' + workstream_id + '_' + row_num, site_url + 'sor/get_all_dropdown', ["sor_code"], {'sors.workstream_id': workstream_id, 'sors.client_id': client_id, 'contract_id': contract_id});
                        // select2_ajax('#sor_' + workstream_id + '_' + row_num, site_url + 'sor/get_all', 'sor_code', {'sors.workstream_id': workstream_id, 'sors.client_id': client_id, contract_id: contract_id}, 'body', null, true);
                        $('#priority_' + workstream_id + '_' + row_num).val(return_data.message.data.target_time).trigger('change');
                        //$("#contract_services_form").valid();
                    }
                });
            } else
            {
                $(this).val('').trigger('change');
                Swal.fire('Service Already Selected', "", "error");
            }
        } else
        {
            $('.key_value_' + workstream_id + '_' + row_num).html('');
            $('#sor_' + workstream_id + '_' + row_num).val('').trigger('change');
        }
    });
}

function check_service_already_selected(service_id, el_id, workstream_id)
{
    var present = false;
    $(".job-type-drop").each(function () {
        var selected = $(this).val();
        var curr_id = $(this).attr('id');
        if (selected == service_id && curr_id != el_id)
        {
            present = true;
        }
    });
    return present;
}

function add_autocomplete_inputs_prefilled(ws_id, row_num, service_detail)
{
    //console.log('222');
    var client_id = $("#client_id_ajs").val();
    $filters = get_service_filters(ws_id);
    // select2_ajax('#job_type_' + ws_id + '_' + row_num, site_url + 'service/get_all', 'title', $filters, 'body', service_detail.service_id);
    // service_title / sor_code arrive with contract/{id}/services, so the label is
    // passed straight in rather than fetched again per row.
    add_autocomplete_custom_dropdown('#job_type_' + ws_id + '_' + row_num, site_url + 'service/get/'+service_detail.service_id, ["title"], $filters, null, service_detail.service_id, service_detail.service_title);
    select2_ajax('#priority_' + ws_id + '_' + row_num, site_url + 'master-record/get_all', 'master_value', {master_code: "TARGET_TIMES"}, 'body', service_detail.priority_id);
    select2_ajax('#workflow_' + ws_id + '_' + row_num, site_url + 'client/' + client_id + '/schedule/get_all', 'title', null, 'body', service_detail.workflow_id);

    add_autocomplete_custom_dropdown('#sor_' + service_detail.workstream_id + '_' + row_num, site_url + 'sor/get_all_dropdown', ["sor_code"], {'sors.workstream_id': ws_id, 'sors.client_id': client_id, 'contract_id': contract_id},'body', service_detail.sor_id, service_detail.sor_code, site_url + 'sor/get/'+service_detail.sor_id);
    
    // select2_ajax('#sor_' + service_detail.workstream_id + '_' + row_num, site_url + 'sor/get_all', 'sor_code', {'sors.workstream_id': ws_id, 'sors.client_id': client_id, contract_id: contract_id}, 'body', service_detail.sor_id, true);

    $('#target_days_' + ws_id + '_' + row_num).val(service_detail.target_days);
    if (service_detail.appt_required == '1')
    {
        $('#appt_required_' + ws_id + '_' + row_num).prop('checked', true);
        $('#workflow_' + ws_id + '_' + row_num).attr('required', 'required');
        $('#workflow_' + ws_id + '_' + row_num).removeAttr('disabled');
    } else {
        $('#workflow_' + ws_id + '_' + row_num).removeAttr('required');
        $('#workflow_' + ws_id + '_' + row_num).attr('disabled', 'disabled');
        $('#workflow_' + ws_id + '_' + row_num).val(null).trigger('change');
    }

    $('#appt_required_' + ws_id + '_' + row_num).on('change', function (e) {
        if ($(this).is(":checked")) {
            $('#workflow_' + ws_id + '_' + row_num).attr('required', 'required');
            $('#workflow_' + ws_id + '_' + row_num).removeAttr('disabled');
        } else
        {
            $('#workflow_' + ws_id + '_' + row_num).removeAttr('required');
            $('#workflow_' + ws_id + '_' + row_num).attr('disabled', 'disabled');
            $('#workflow_' + ws_id + '_' + row_num).val(null).trigger('change');
        }
    });


    $('#enable_threshold_' + ws_id + '_' + row_num).on('change', function (e) {
        if ($(this).is(":checked")) {
            $('#threshold_value_' + ws_id + '_' + row_num).attr('required', 'required').removeAttr('disabled');
            $('#cacl_init_sor_' + ws_id + '_' + row_num).removeAttr('disabled');
            $('#enforce_th_' + ws_id + '_' + row_num).removeAttr('disabled');
        } else
        {
            $('#threshold_value_' + ws_id + '_' + row_num).attr('disabled', 'disabled').removeAttr('required').val(null);
            $('#cacl_init_sor_' + ws_id + '_' + row_num).attr('disabled', 'disabled').prop('checked', false).trigger('change');
            $('#enforce_th_' + ws_id + '_' + row_num).attr('disabled', 'disabled').prop('checked', false).trigger('change');
        }
    });
    if (service_detail.enable_threshold == '1') {
        $('#enable_threshold_' + ws_id + '_' + row_num).prop("checked", true);
        $('#threshold_value_' + ws_id + '_' + row_num).attr('required', 'required').removeAttr('disabled').val(service_detail.threshold_value);
        $('#cacl_init_sor_' + ws_id + '_' + row_num).removeAttr('disabled');
        $('#enforce_th_' + ws_id + '_' + row_num).removeAttr('disabled');
        if (service_detail.calculate_initial_sor == '1') {
            $('#cacl_init_sor_' + ws_id + '_' + row_num).prop("checked", true);
        }
        if (service_detail.enforce_threshold == '1') {
            $('#enforce_th_' + ws_id + '_' + row_num).prop("checked", true);
        }
    } else {
        $('#enable_threshold_' + ws_id + '_' + row_num).prop("checked", false).trigger("change");
    }

    $('#enable_min_margin_' + ws_id + '_' + row_num).on('change', function (e) {
        if ($(this).is(":checked")) {
            $('#min_margin_value_' + ws_id + '_' + row_num).attr('required', 'required').removeAttr('disabled');
            $('#enforce_mm_' + ws_id + '_' + row_num).removeAttr('disabled');
        } else
        {
            $('#min_margin_value_' + ws_id + '_' + row_num).attr('disabled', 'disabled').removeAttr('required').val(null);
            $('#enforce_mm_' + ws_id + '_' + row_num).attr('disabled', 'disabled').prop('checked', false).trigger('change');
        }
    });
    if (service_detail.enable_min_margin == '1') {
        $('#enable_min_margin_' + ws_id + '_' + row_num).prop("checked", true);
        $('#min_margin_value_' + ws_id + '_' + row_num).attr('required', 'required').removeAttr('disabled').val(service_detail.min_margin_value);
        $('#enforce_mm_' + ws_id + '_' + row_num).removeAttr('disabled');
        if (service_detail.enforce_min_margin == '1') {
            $('#enforce_mm_' + ws_id + '_' + row_num).prop("checked", true);
        }
    } else {
        $('#enable_min_margin_' + ws_id + '_' + row_num).prop("checked", false).trigger("change");
    }

    $('#total_services_' + ws_id).val(row_num);

    // service_code now comes with the contract/{id}/services payload; this used to
    // be a blocking service/get call per row purely to fill this one cell.
    $('.key_value_' + service_detail.workstream_id + '_' + row_num).html(service_detail.service_code || '');
}

function get_service_filters(service_ws_id) {
    const typeMap = { reactive: 'R', ppm: 'P' };
    const serviceType = ($('#service_type').val() || '').toLowerCase();

    return {
        'services.workstream_id': service_ws_id,
        ...(typeMap[serviceType] && { 'services.service_type': typeMap[serviceType] })
    };
}


$(document).on('click', '.add-new-service-btn', function (e) {
    var ws_id = $(this).data('ws-id');
    var total_rows = $('#total_services_' + ws_id).val();
    var new_row = parseInt(total_rows) + parseInt(1);
    add_service_row(ws_id, new_row);
});

$(document).on('click', '.remove-service-btn', function (e) {
    var ws_id = $(this).data('ws-id');
    var row_num = $(this).data('row-num');
    var total_rows = $('#total_services_' + ws_id).val();
    if ($(this).hasClass('remove-from-db'))
    {
        var service_id = $(this).data('service-id');
        var post_data = {service_id: service_id, ws_id: ws_id, contract_id: contract_id};
        ajs.ajax_form(site_url + 'contract/remove_service_from_contract/', post_data, 'POST', null, '', '0', ajs_form_handler.api_response, ajs_form_handler.api_response);
    }

    $(this).closest('tr.service_row_' + ws_id + '_' + row_num).remove();

    var services_count = $('.service_row_parent_' + ws_id + ' tr').length;
    if (services_count == 0)
    {
        if ($('#preffered_engineers_' + ws_id).hasClass('select2-hidden-accessible'))
        {
            $("#preffered_engineers_" + ws_id).select2("destroy");
            $("#preffered_engineers_" + ws_id).empty();

            add_autocomplete_sel('#preffered_engineers_' + ws_id, 'users', ['first_name', 'last_name'], null, {user_type: 16});
        }
    }
});

$(document).on('click', '.change-service-status-btn', function (e) {
    var status_elm = $(this);
    let previous_checked = status_elm.prop('checked');
    var ws_id = $(this).data('ws-id');
    var row_num = $(this).data('row-num');
    var service_id = $(this).data('service-id');
    var post_data = {service_id: service_id, ws_id: ws_id, contract_id: contract_id};
    ajs.ajax_form(site_url + 'contract/change_service_status_from_contract/', post_data, 'POST', null, '', '0', function (json_response) {
        if(json_response.status === false) {
            status_elm.prop('checked', !previous_checked);
        }
        ajs_form_handler.api_response(json_response);
    });
});

$(document).on('click', '.add-job-type-btn', function () {
    //console.log('3333');
    const job_type = $(this).data('element');
    const service_ws_id = $(this).data('ws-id');
    // console.log(job_type);
    // console.log(service_ws_id);
    $filters = get_service_filters(service_ws_id);
    function reset_job_type_dropdown() {
        add_autocomplete_custom_dropdown('#' + job_type, site_url + 'service/get_all_dropdown', ["title"], $filters);
        // select2_ajax('#' + job_type, site_url + 'service/get_all', 'title', $filters);
        console.log('drop set');
    }

    ajs.detailDataFunction = reset_job_type_dropdown;
    delete_local_cache();
});


function add_services_auto(json_data)
{
    if (ajs.check_result(json_data))
    {
        // console.log(json_data);
        $('#service_type').val(json_data.message.contract.type);

        var workstreams = json_data.message.contract.workstreams;
        $('#client_id_ajs').val(json_data.message.contract.client_id);
        if (typeof json_data.message.services !== 'undefined' && json_data.message.services != '')
        {
            var services = json_data.message.services;


            setTimeout(function ()
            {
                $('#service_preference_am').val(json_data.message.contract.service_preference_am.split(',')).trigger('change');
            }, 500);
            
            // $('#service_preference_pm').val(json_data.message.contract.service_preference_pm).trigger('change');

            var ws_array = workstreams.split(',');
            for (i = 0; i < ws_array.length; ++i) {
                $('.workstream-switch:checkbox[value="' + ws_array[i] + '"]').prop('checked', true);
                get_workstream_div(ws_array[i], '1');
            }

            get_selected_workstreams();
            var last_ws = 0;
            for (j = 0; j < services.length; ++j)
            {
                if (last_ws !== services[j].workstream_id)
                {
                    var incr = 1;
                }
                last_ws = services[j].workstream_id;
                add_service_row(services[j].workstream_id, incr, '1', services[j]);

                if (!$('#preffered_engineers_' + services[j].workstream_id).hasClass('select2-hidden-accessible'))
                {
                    if (typeof services[j].preferred_engineers !== 'undefined' && services[j].preferred_engineers != '' && services[j].preferred_engineers != null)
                    {
                        add_autocomplete_sel('#preffered_engineers_' + services[j].workstream_id, 'users', ['first_name', 'last_name'], null, {user_type: 16}, 'body', services[j].preferred_engineers.split(','));
                    } else
                    {
                        add_autocomplete_sel('#preffered_engineers_' + services[j].workstream_id, 'users', ['first_name', 'last_name'], null, {user_type: 16});
                    }
                }
                incr++;

            }
        }
    }
}

$(document).ready(function (e) {
    $("#contract_services_form").validate({
        ignore: [],
        onkeyup: false,
        rules: {
            "service_preference_am[]": {
                required: true
            },
        },
        messages: {
            "service_preference_am[]": "Select Service Preference AM time",
        },
        errorPlacement: function (error, element) {

            if (element.parents('.tab-pane').length)
            {
                var ws_id = element.parents('.tab-pane').data('ws-id');
                $("li[data-ws-id='" + ws_id + "']").find('a').append('<span class="text-danger">* Error</span>');
            }

            if (
                    element.hasClass("select2") &&
                    element.next(".select2-container").length
                    ) {
                error.insertAfter(element.next(".select2-container"));
            } else if (element.parent(".input-group").length ||
                    element.parent(".error-div").length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form)
        {
            var sub_button = $(form).find(':submit');
            ajs.submit_button_element = sub_button;
            var action = $(form).attr('action');
            var method = $(form).attr('method');
            var post_data = $(form).serialize();
            ajs.ajax_form(action, post_data, method, null, '1', '1', ajs_form_handler.form_submit_response, ajs_form_handler.form_submit_response);
            return false;
        }
    });

    ajs.ajax_form(site_url + 'contract/get/' + contract_id, null, 'GET', null, '0', '1', create_breadcrumb, create_breadcrumb, 'Workstream');
});

// currently not in used this function
function handle_service_form_response(response_data)
{
    if($('#service_type').val() != 'reactive'){
        ajs_form_handler.hide_errors();
        if (ajs_form_handler.check_result(response_data))
        {
            Swal.fire({
                title: response_data.message,
                text: "Continue to upload master plan?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#fa896b",
                confirmButtonText: "Yes!",
                cancelButtonText: "Stay on this page"
            }).then((result) => {
                if (result.isConfirmed) {
                    var client_id = $("#client_id_hidden").val();
                    if (client_id > 0) {
                        window.location.href = cdn_url + 'clients/' + ajs.hash_encode(client_id) + '/contract/master-plan/' + ajs.hash_encode(contract_id);
                    } else {
                        window.location.href = cdn_url + 'contract/master-plan/' + ajs.hash_encode(contract_id);
                    }
                } else if (result.isDenied) {
                    window.location.reload();
                } else if (result.isDismissed) {
                    window.location.reload();
                }
            });
    
        } else
        {
            ajs_form_handler.show_errors(response_data);
        }
    } else {
        ajs.reload = true;
        ajs_form_handler.form_submit_response(response_data);
    }
}