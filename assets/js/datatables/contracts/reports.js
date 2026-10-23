var deleted_reports = [];

function create_form() {
    select2_ajax('#report_id_0', site_url + 'reports/get_all', 'title', {status: '1'});
    $("#reportsForm").validate({
        onkeyup: false,
        rules: {
            "reports[0][report_id]": {
                required: true,
            },
            "reports[0][frequency]": {
                required: true,
            },
            "reports[0][send_to]": {
                required: true,
            }
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
            // Modify checkbox value if checked

            formData.push({name: 'deleted_reports', value: deleted_reports});
            ajs.reload = true;
            ajs.ajax_form(action, formData, method, null, "1", "1", ajs_form_handler.form_submit_response, ajs_form_handler.form_submit_response);

            return false;
        },
    });
    ajs.mask_inputs();
}

// set data in edit page
function set_data(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var reports = result_json.data;
        // var first_service_id = uplifts[0]?.service_id ?? null;
        if (reports.length) {
            set_action_icon($(".report-row").first(), reports[0]);
        }

        for (let index = 1; index < reports.length; index++)
        {
            $(".add-report").trigger('click', reports[index]);
        }
        var contract_id = $("#edit_id").val();
        //select2_ajax("#service_id_0",site_url+"contract/"+contract_id + "/unique_services","title",null,undefined,first_service_id);
        set_reports(reports);
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

function callback_change_status(result_json, element) {
    if (ajs_form_handler.check_result(result_json)) {
        ajs.showAlertBar('success', result_json.message, 1);
        if (result_json.is_activated == 1) {
            $(element).html(`<i style="font-size: 24px;cursor: pointer;" class="ri-star-s-fill"></i>`);
        } else {
            $(element).html(`<i style="font-size: 24px;cursor: pointer;" class="ri-star-s-line"></i>`);
        }
    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

function set_action_icon(element, report) {
    if (report) {
        var status_icon = report.status == 1 ? '<i style="font-size: 24px;cursor: pointer;" class="ri-star-s-fill"></i>' : '<i style="font-size: 24px;cursor: pointer;" class="ri-star-s-line"></i>';
        element.find('.change-status-btn').attr('data-id', report.id).html(status_icon).parent().parent().removeClass('hide');
    } else {
        element.find('.btn-danger').parent().removeClass('hide');
    }
}

function set_reports(reports) {
    $.each(reports, function (index, report) {
        select2_ajax('#report_id_' + index, site_url + 'reports/get_all', 'title', {'reports.status': '1'},'body',report.report_id);
        $("input[name='reports[" + index + "][id]']").val(report.id);
        //$("input[name='reports[" + index + "][report_id]']").val(report.report_id);
        $("select[name='reports[" + index + "][frequency]']").val(report.frequency);
        $("input[name='reports[" + index + "][send_to]']").val(report.send_to);
    });
}

function edit_form() {
    create_form();
    var id = $("#edit_id").val();
    ajs.ajax_form(site_url + "contract/" + id + "/reports", null, "GET", null, "0", "0", set_data, set_data);
    ajs.ajax_form(site_url + 'contract/get/' + id, null, 'GET', null, '0', '1', create_breadcrumb, create_breadcrumb, 'Reports');
}

function get_details() {
    var id = $("#contract_id").val();
    ajs.ajax_form(site_url + "contract/" + id + "/reports", null, "GET", null, "0", "0", set_detail, set_detail);
    ajs.ajax_form(site_url + 'contract/get/' + id, null, 'GET', null, '0', '1', create_breadcrumb, create_breadcrumb, 'Reports');
}


$(function () {
    var report_index = 1;
    var report_row = $(".report-row").first().clone();

    $(document).on("click", ".add-report", function (e, report) {
        var report_id = 'report_id_' + report_index;
        var frequency_id = 'frequency_id_' + report_index;
        var send_to_id = 'send_to_' + report_index;
        report_row.find('.report-id').attr('id', report_id);
        report_row.find('.frequency-id').attr('id', frequency_id);
        report_row.find('.send-to').attr('id', send_to_id);



        var new_row = report_row.clone();

        set_action_icon(new_row, report);

        new_row.html(function (i, oldHTML) {
            return oldHTML.replaceAll('reports[0]', 'reports[' + report_index + ']');
        });

        $("#report-section").append(new_row);

        select2_ajax('#' + report_id, site_url + 'reports/get_all', 'title', {'reports.status': '1'});

        //select2_ajax("#"+service_id,site_url+"contract/"+$("#edit_id").val() + "/unique_services","title",null,undefined,uplift?.service_id);
        report_index++;
    });

    $(document).on("click", ".delete-report", function () {
        var parent = $(this).closest('.report-row');
        var id = parent.find('.row-id').val();
        if (id) {
            deleted_reports.push(id);
        }
        parent.remove();
    });

    if ($('#is_detail_page').val() > 0) {
        get_details();
    } else {
        edit_form();
    }
    //ajs.apply_ind_roles('Contract_uplifts');
});
