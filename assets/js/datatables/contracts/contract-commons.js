is_contract_active = false;

function get_contract_progress(contract_id)
{
    ajs.ajax_form(site_url + 'contract/progress/' + contract_id, null, 'GET', null, '1', '1', set_progress_datail, set_progress_datail);
}

function set_progress_datail(result_json)
{
    if (ajs_form_handler.check_result(result_json)) {

        var progress = result_json.data;
        var overview_check = progress.overview_check;
        var personnel_check = progress.personnel_check;
        var ws_check = progress.ws_check;
        var ppm_check = progress.ppm_check;
        var finance_check = progress.finance_check;
        var contract_active = progress.contract_active;
        var contract_type = progress.contract_type;

        is_contract_active = contract_active;

        if (contract_active)
        {
            $('.contract-progress-div').remove();
            $('.active-contract').remove();
        }


        if ($('.contract-progress-div').length)
        {

            if (overview_check)
            {
                $('.progress-item-overview').append('<i class="mdi mdi-check-bold fs-16 active float-end"></i>');
            }
            if (personnel_check)
            {
                $('.progress-item-personnel').append('<i class="mdi mdi-check-bold fs-16 active float-end"></i>');
            }
            if (ws_check)
            {
                $('.progress-item-workstream').append('<i class="mdi mdi-check-bold fs-16 active float-end"></i>');
            }
            if (ppm_check)
            {
                $('.progress-item-ppm').append('<i class="mdi mdi-check-bold fs-16 active float-end"></i>');
            }
            if (finance_check)
            {
                $('.progress-item-finance').append('<i class="mdi mdi-check-bold fs-16 active float-end"></i>');
            }

        }
        if ($('.contract-subnav').length)
        {
            if (!contract_active)
            {
                //$('.contract-subnav').find('ul').find('li:first').remove();
                $('.contract-subnav').find('ul').find('li:first').find('a').attr('href', 'javascript:;');
                $('.contract-subnav').find('ul').find('li:first').find('a').addClass('contract-disable');
                $('.contract-subnav').find('ul').find('li:first').find('a').attr('title', 'Dashboard will be available after contract activation');
            }
        }

        if (overview_check && personnel_check && ws_check && ppm_check && finance_check)
        {
            if ($('.active-contract').length)
            {
                $('.active-contract').attr('title', 'Once the contract is activated, only editing will be permitted and removals will not be allowed');
                $('.active-contract').find('button').removeAttr('disabled');
            }
        }

        if (contract_type == 'reactive' || contract_type == 'project')
        {
            $('li.ppm-master-plan, li.ppm-master-plan-list').find('a').attr('href', 'javascript:;');
            $('li.ppm-master-plan, li.ppm-master-plan-list').find('a').addClass('contract-disable');
            $('li.ppm-master-plan, li.ppm-master-plan-list').find('a').attr('title', 'MasterPlan is not available for Reactive type of Contracts');
            $('.progress-item-ppm').remove();
        }

    } else {
        ajs_form_handler.show_errors(result_json);
    }
}

contract_id_js = $('#contract_id_js').val();
if (typeof contract_id_js !== 'undefinded' && contract_id_js > 0)
{
    get_contract_progress(contract_id_js);
}


$('.contract-activate-button').on('click', function (e)
{
    var cid = contract_id_js;
    Swal.fire({
        title: "Are you sure want to activate this contract?",
        text: "Once the contract is activated, only editing will be permitted and removals will not be allowed!",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        denyButtonText: "No"
    }).then((result) => {

        if (result.isConfirmed)
        {
            ajs.ajax_form(site_url + 'contract/activate/' + cid, null, 'GET', null, null, null, function (return_data) {
                if (ajs_form_handler.check_result(return_data))
                {
                    ajs.showAlertBar('success', 'Contract Activated', true);
                    setTimeout(function ()
                    {
                        window.location.reload();
                    }, 2000);

                } else
                {
                    ajs_form_handler.show_errors(return_data);
                }
            });
        } else if (result.isDenied) {

        }

    });
});

