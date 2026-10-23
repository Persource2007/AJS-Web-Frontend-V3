$(document).on('click', '.stop-schedule', function (e) {

    schedule_id = $(this).data('schedule-id');
    Swal.fire({
        title: "Are you sure you want to stop this schedule? This action can't be undone",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Yes, STOP",
        cancelButton: "Cancel",
        buttonsStyling: false,
        customClass: {
            confirmButton: "btn btn-danger me-3",
            cancelButton: "btn btn-outline-dark "
        },
    }).then((result) => {
        if (result.isConfirmed) {
            // Show the date input prompt
            Swal.fire({
                title: "Select Stop Date",
                html: '<input id="schedule_end_date" name="schedule_end_date" class="form-control" type="date" autofocus>',
                showCancelButton: true,
                confirmButtonText: "Stop",
                cancelButtonText: "Cancel",
                buttonsStyling: false,
                customClass: {
                    confirmButton: "btn btn-danger me-3",
                    cancelButton: "btn btn-outline-dark "
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    var selectedDate = $('#schedule_end_date').val();
                    var data = {
                        contract_id: contract_id,
                        schedule_id: schedule_id,
                        end_date: selectedDate
                    };
                    // Send the request with the selected date
                    ajs.ajax_form(site_url + 'contract_masterplan/stop', data, 'POST', null, '1', '0', ajs_form_handler.api_response, ajs_form_handler.api_response);
                    load_data_table();
                }
            });
        } else if (result.isDenied) {
            Swal.fire("Action cancelled", "", "info");
        }
    }
    );
});



$(document).on('click', '.schedule_setup', function (e) {
    var selection = $(this).val();
    show_masterplan_div(selection);
});

function set_schedule_info(log)
{
    $('.scheduler-update-div').css('display', 'none');
    if (log)
    {
        $('.scheduler-update-div').css('display', '');
        $('.schedule-execute-date').html(ajs.format_datetime(log.add_date));
        $('.schedule-start-date').html(ajs.format_date(log.start_date));
        $('.schedule-end-date').html(ajs.format_date(log.end_date));
        $('.schedule-jobs-count').html(log.total_jobs);
        $('.schedule-batch-code').html(log.batch_code);
        $('.view-batch-jobs').attr('href', cdn_url + 'job/list?batch_code=' + log.batch_code);
    }
}


function generateMonthCells(schedule) {
    schedule_master = [];
    const startYear = parseInt(schedule.start_year, 10);
    const endYear = parseInt(schedule.end_year, 10);
    const startMonth = schedule.start_month;
    const endMonth = schedule.end_month;
    // List of full month names and abbreviations
    const fullMonthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthAbbr = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    // Calculate start and end indices
    let startMonthIndex = fullMonthNames.indexOf(startMonth);
    let endMonthIndex = fullMonthNames.indexOf(endMonth);
    // Calculate total months from start to end
    let totalMonths = (endYear - startYear) * 12 + (endMonthIndex - startMonthIndex + 1);
    // Create a jQuery object to store the generated cells
    var $cells = $("<tr><th>Action</th><th>Contract</th><th>UPRN</th><th>Postcode</th><th>Job Type</th><th>Freq.</th><th>Freq. Except</th><th>Pricing Model</th><th>Asset</th><th>Qty</th><th>SOR</th><th>Labor</th><th>Sell</th><th>Add to Queue</th><th>Start Date</th></tr>");
    var $cells_service = $("<tr><th>Job Type</th></tr>");
    // Loop through the total months to generate cells
    for (let i = 0; i < totalMonths; i++) {
        let year = startYear + Math.floor((startMonthIndex + i) / 12);
        let month = (startMonthIndex + i) % 12;
        var cellContent = `${monthAbbr[month]}/${year.toString().slice(-2)}`;
        schedule_master.push({month: fullMonthNames[month], year: year});
        var $cell = $("<th class='text-center'></th>").text(cellContent);
        var $cell1 = $("<th class='text-center'></th>").text(cellContent);
        $cells.append($cell);
        $cells_service.append($cell1);
    }

    $cells.append($("<th class='text-center'></th>").text('Total'));
    $cells.append($("<th class='text-center'></th>").text('Status'));
    $cells_service.append($("<th class='text-center'></th>").text('Total'));
// Append the generated cells to the table body
    $("#ppm-data1-head").append($cells);
    $("#ppm-data2-head").append($cells_service);
}

function set_mp_data(data)
{
    set_schedule_info(data.message.ppm_log);
    generateMonthCells(data.message);
    var length = Object.keys(data.message.ppm).length;
    if (length > 0)
    {

        var curr_property = '';
        var curr_freq = '';
        var curr_service = '';
        var curr_start_date = '';
        var curr_end_date = '';
        var all_services = {};
        let i = 0;

         const monthMap = {
            January: 1,
            February: 2,
            March: 3,
            April: 4,
            May: 5,
            June: 6,
            July: 7,
            August: 8,
            September: 9,
            October: 10,
            November: 11,
            December: 12
        };

        // console.log(data.message.ppm);
        $.each(data.message.ppm, function (index1, item1) {
            // console.log(item1);
            var extra_str = '';
            if (curr_property != item1.uprn_no || curr_freq != item1.frequency || curr_service != item1.service_id || curr_start_date != item1.start_date || curr_end_date != item1.end_date)
            {
                if (!all_services[item1.service])
                {
                    all_services[item1.service] = {};
                }
                var total = 0;
                
                $.each(schedule_master, function (index, item) {
                    var month = item.month;
                    var year = item.year;
                    var service = item1.service_id;
                    var property = item1.uprn_no;
                    var schedule_id = item1.schedule_id;
                    var month_key = month + '/' + year;

                    var monthNo = monthMap[month];

                    if (!all_services[item1.service][month_key]) {
                        all_services[item1.service][month_key] = 0;
                    }
                    var frequency = (item1.frequency || '').trim().toLowerCase();
                    var exception = (item1.frequency_except && item1.frequency_except !== '-' && item1.frequency_except !== '')
                        ? item1.frequency_except
                        : '';
                    var count = 0;
                    var keytocheck = year + '/' + month + '/' + property + '/' + service + '/' + schedule_id;
                    if (keytocheck in data.message.ppm) {

                        var rawCount = data.message.ppm[keytocheck].count;

                        count = getEffectiveCount(
                            frequency,
                            exception, // "2,3"
                            monthNo,
                            rawCount,
                            item1.start_date
                        );

                        extra_str += '<td class="text-center">' + count + '</td>';
                        total += count;

                    } else {
                        extra_str += '<td class="text-center">0</td>';
                    }

                    all_services[item1.service][month_key] += parseInt(count);
                });
                var stop_btn = '';
                var row_class = '';
                var switch_id = 'mp-status-' + item1.schedule_id;
                if (item1.schedule_status == '1')
                {
                    // stop_btn = `<button type="button " data-schedule-id="` + item1.schedule_id + `" title="STOP Schedule" class="stop-schedule btn btn-sm btn-danger"><i class="fa fa-ban" aria-hidden="true"></i></button>`;
                    stop_btn = `<div class="form-check form-switch form-switch-lg"><input class="change-schedule-status form-check-input code-switcher me-1" type="checkbox" placeholder="Active" data-schedule-id="` + item1.schedule_id + `" data-name="status" id="${switch_id}" value="1" checked></div>`;
                // } else if (item1.schedule_status == '2')
                // {
                //     row_class = 'table-danger';
                //     // stop_btn = 'Stopped';
                    
                } else {
                    row_class = 'table-danger';
                    // stop_btn = 'Inactive';
                    stop_btn = `<div class="form-check form-switch form-switch-lg"><input class="change-schedule-status form-check-input code-switcher me-1" type="checkbox" placeholder="Inactive" data-name="status" data-schedule-id="` + item1.schedule_id + `" id="${switch_id}" value="2"></div>`;
                }

                var url = site_url + 'contract_masterplan/update/' + item1.schedule_id;
                var ppm_fields = `<tr class="ppm-field-row-${i} d-none">
                    <td colspan="30">
                    <form id="ppm-form-${i}" action="${url}" method="post">
                    <div class="row align-items-end ms-5 mb-1 mt-1 gx-3">
                    <input type="hidden" name="contract_id" id="contract_id_${i}" value="${item1.contract_id}" />
                    <div class="col-md-1">
                        <label class="fw-bold">Job Type</label>
                        <select class="form-control select2" required name="service_id" id="edit_service_${i}" data-value="${item1.service_id}">
                            <option value=''></option>
                        </select>
                    </div>
                    <div class="col-md-1">
                        <label class="fw-bold">Freq.</label>
                        <select class="form-control" required name="frequency_id" id="edit_frequency_${i}" data-value="${item1.frequency}">
                            <option value=''></option>
                            <option value="Weekly" ${(item1.frequency ? (item1.frequency == 'Weekly' ? 'selected' : '') : '')}>W</option>
                            <option value="Monthly" ${(item1.frequency ? (item1.frequency == 'Monthly' ? 'selected' : '') : '')}>M</option>
                            <option value="Quarterly" ${(item1.frequency ? (item1.frequency == 'Quarterly' ? 'selected' : '') : '')}>Q</option>
                            <option value="Half Yearly" ${(item1.frequency ? (item1.frequency == 'Half Yearly' ? 'selected' : '') : '')}>H</option>
                            <option value="Yearly" ${(item1.frequency ? (item1.frequency == 'Yearly' ? 'selected' : '') : '')}>A</option>
                        </select>
                    </div>
                    <div class="col-md-1">
                        <label class="fw-bold">Freq. Except</label>
                        <select class="form-control" name="frequency_except[]" id="edit_frequency_except_${i}" data-value="${item1.frequency_except}">
                            <option value=''></option>
                        </select>
                    </div>
                    <div class="col-md-1">
                        <label class="fw-bold">Pricing Model</label>
                        <select class="form-control sor_type_mp_edit" data-row-num="${i}" name="sor_type" id="edit_sor_type_${i}">
                            <option value="1" ${(item1.sor_type ? (item1.sor_type == '1' ? '' : 'selected') : 'selected')}>SOR</option>
                            <option value="2" ${(item1.sor_type ? (item1.sor_type == '2' ? 'selected' : '') : '')}>Band Price</option>
                            <option value="3" ${(item1.sor_type ? (item1.sor_type == '3' ? 'selected' : '') : '')}>Fixed Price</option>
                        </select>
                    </div>
                    <div class="col-md-1">
                        <label class="fw-bold">Asset</label>
                        <select class="form-control asset_selector_edit" data-property-id="${item1.property_id}" data-value="${item1.client_property_asset_type_id}" id="edit_asset_${i}" name="asset_type">
                            <option value=''></option>
                        </select>
                        <input type="hidden" name="asset_ids" id="edit_asset_ids_${i}" value="${item1.client_property_asset_id}"/> 
                    </div>
                    <div class="col-md-1">
                        <label class="fw-bold">Qty</label>
                        <input type="number" class="form-control"  name="qty" id="edit_qty_${i}" value="${item1.qty || 1}" ${(item1.sor_type == '2' ? 'readonly' : '')}/>
                    </div>
                    <div class="col-md-1">
                        <label class="fw-bold">SOR</label>
                        <div class="d-flex error-div">
                            <select class="form-control sor_property_plan_edit" data-row-num="${i}" required name="sor_id" id="edit_sor_${i}" data-value="${item1.sor_id}" data-filters='` + JSON.stringify({'sors.client_id': selected_client.client_id}) + `'>
                                <option value=''></option>
                            </select>
                            <input type="hidden" name="sor_id_hidden" id="edit_sor_id_hidden_${i}" value="${item1.sor_id}"/>
                            <button type="button" class="btn btn-primary ms-1 popup-form-search-button popup-add-btn" data-heading="Search SORs" data-element="edit_sor_${i}" data-after-load-func="set_sor_from_search" data-form-url="${cdn_url}system/sor/search-list">
                                <i class="mdi mdi-magnify search-widget-icon"></i>
                            </button>
                        </div>
                    </div>                    
                    <div class="col-md-1">
                        <label class="fw-bold">Labor</label>
                        <input type="number" class="form-control labor-value text-end" data-row-num="${i}"  name="labor_price" id="edit_labor_price_${i}" ${(item1.sor_type ? (item1.sor_type == '3' ? '' : 'readonly') : 'readonly')} value="${item1.labor_price}" />
                    </div>
                    <div class="col-md-1">
                        <label class="fw-bold">Sell</label>
                        <input type="number" class="form-control sell-value text-end" data-row-num="${i}"  name="sell_price" id="edit_sell_price_${i}" ${(item1.sor_type ? (item1.sor_type == '3' ? '' : 'readonly') : 'readonly')} value="${item1.sell_price}" />
                    </div>
                    <div class="col-md-1">
                        <label class="fw-bold">Start Date</label>
                        <input type="date" class="form-control schedule-start-date" required name="start_date" id="edit_start_date_${i}" value="${item1.start_date}" />
                    </div>
                    <div class="col-md-1">
                        <label class="fw-bold">Add to Queue</label>
                        <select class="form-control add_to_queue_selector select2" name="add_to_queue" id="edit_add_to_queue_${i}" data-value="${item1.queue_id}" data-value_id="${item1.queue_id}">
                            <option value=''>Select Queue</option>
                        </select>
                    </div>
                    <div class="col-md-1">
                        <button type="button" title="Update" class="update-ppm-row btn btn-sm btn-success">Update</button>
                        <button type="button" title="Cancel" class="cancel-ppm-row btn btn-sm btn-light">Cancel</button>
                    </div>
                    </div>
                    </td>
                    </tr>`;

                $('#ppm-data1').append(`<tr class="` + row_class + `">
                    <td><a href="javascript:void(0);" class="edit-ppm-field" data-row-class="ppm-field-row-${i}"><i class="mdi mdi-pencil"></i></a></td>
                    <td>${item1.contract_number}</td>
                    <td>${item1.uprn_no}</td>
                    <td>${item1.postalcode}</td>
                    <td>${item1.service}</td>
                    <td>${item1.frequency}</td>
                    <td>${item1.frequency_except}</td>
                    <td>${ (item1.sor_type ? (item1.sor_type == '3' ? 'Fixed Price' : (item1.sor_type == '2' ? 'Band Price' : 'SOR')) : '-') }</td>
                    <td>${item1.asset_type || '-'}</td>
                    <td>${item1.qty || 1}</td> 
                    <td>${item1.sor_code}</td>
                    <td class="pricing-col pe-3 text-end">${item1.labor_price}</td>
                    <td class="pricing-col pe-3 text-end">${item1.sell_price}</td>
                    <td>${item1.add_to_queue}</td>
                    <td>${item1.start_date}</td>                  
                    ` + extra_str + `
                <td class='text-center'>` + total + `</td>
                <td class='text-center'>` + stop_btn + `</td>
                </tr>`+ppm_fields);
            }

            curr_property = item1.uprn_no;
            curr_freq = item1.frequency;
            curr_service = item1.service_id;
            curr_start_date = item1.start_date;
            curr_end_date = item1.end_date;
            i++;
        });
        var service_string = '';
        $.each(all_services, function (index, item) {
            var total = 0;
            service_string += "<tr><td>" + index + "</td>";
            $.each(item, function (index1, item1) {
                service_string += `<td class="text-center">${item1}</td>`;
                total += item1;
            });
            service_string += "<td  class='text-center'>" + total + "</td>";
            service_string += "</tr>";
        });
        $('#ppm-data2').append(service_string);
        $('.masterplan-div').show();
        $('#ajax-datatables1').show();
        $('#ajax-datatables2').show();
        $('#ajax-datatables').show();
    } else
    {
        $('.masterplan-div').hide();
        $('#ajax-datatables1').hide();
        $('#ajax-datatables2').hide();
        $('#ajax-datatables').hide();
    }


}

function getEffectiveCount(frequency, exception, monthNo, rawCount, startDate) {

    // 🔒 HARD GUARD — NO EXCEPTION, NO CHANGE
    if (
        !exception ||
        exception === '-' ||
        exception === '' ||
        rawCount <= 0
    ) {
        return rawCount;
    }

    frequency = frequency.trim().toLowerCase();

    // parse exception → array of numbers
    const exceptionList = exception
        .split(',')
        .map(e => parseInt(e, 10))
        .filter(e => !isNaN(e));

    // 🔒 If parsing results in empty list → no change
    if (exceptionList.length === 0) {
        return rawCount;
    }

    switch (frequency) {

        /* ---------------- MONTHLY ---------------- */
        case 'monthly': {
            return exceptionList.includes(monthNo) ? 0 : rawCount;
        }

        /* ---------------- WEEKLY ---------------- */
        case 'weekly': {
            // rawCount = number of weeks in month
            return Math.max(rawCount - exceptionList.length, 0);
        }

        /* ---------------- QUARTERLY (ROLLING YEAR) ---------------- */
        case 'quarterly': {

            if (!startDate) {
                return rawCount; // safety fallback
            }

            const startMonth = new Date(startDate).getMonth() + 1;

            const monthOffset = (monthNo - startMonth + 12) % 12;

            const quarterNo = Math.floor(monthOffset / 3) + 1;

            return exceptionList.includes(quarterNo) ? 0 : rawCount;
        }

        /* ---------------- YEARLY ---------------- */
        default:
            return rawCount;
    }
}

function validate_ppm_form(form_selector) {
	form_selector.validate({
		rules: {
			service_id: {
				required: true,
			},
			frequency_id: {
				required: true,
			},
			sor_id: {
				required: true,
			},
			start_date: {
				required: true,
			},
			end_date: {
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

			ajs.ajax_form(
				action,
				formData,
				method,
				null,
				"1",
				"1",
				function (response) {
                    if (response.status == false && response?.confirm) {
                        Swal.fire({
                            icon: "warning",
                            title: "Are you sure?",
                            //text: response.message,
                            html: response.message + `<strong><a href="${cdn_url}job/list?batch_code=${response.batch_code}" target="_blank"> click here </a></strong>to view jobs.`,
                            showDenyButton: true,
                            showCancelButton: false,
                            confirmButtonText: "Yes",
                            denyButtonText: "Cancel"
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: 'Updating...',
                                    text: 'Please wait while updating masterplan.',
                                    allowOutsideClick: false,
                                    didOpen: () => {
                                        Swal.showLoading();
                                    }
                                });
                                
                                await new Promise(r => setTimeout(r, 50));

                                formData.push({name: "confirm", value: true});
                                ajs.ajax_form(action,
                                    formData,
                                    method,
                                    null,
                                    "1",
                                    "1",
                                    ajs_form_handler.api_response,
                                    ajs_form_handler.api_response
                                );
                                load_data_table();
                            } else {
                                load_data_table();
                            }
                        });
                    } else {
                        ajs_form_handler.api_response(response);
                        load_data_table();
                    }
                },
                ajs_form_handler.api_response
			);
			return false;
		},
	});
}

$(document).on('click', '.delete-ppm-row', function (e) {
    $(this).closest('tr').remove();
    var total_row = $('#total_mp').val();
    total_row--;
    $('#total_mp').val(total_row);
});

/* $(document).on('click', '.edit-ppm-field', function (e) {
    var row_class = $(this).data('row-class');
    $('.' + row_class).toggleClass('d-none');
    var row_num = row_class.split('-').pop();
    var contract_id = $('#contract_id_' + row_num).val();
    select2_ajax('#edit_service_' + row_num, site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null, 'body', $('#edit_service_' + row_num).data('value'));
    select2_ajax("#edit_add_to_queue_" + row_num, site_url + "queue/get_all", "title", null, "body", $('#edit_add_to_queue_' + row_num).data('value'));
    // select2_tag('#edit_sor_' + row_num, site_url + 'sor/get_all', 'sor_code', {'sors.client_id': selected_client.client_id, contract_id: contract_id}, 'body', $('#edit_sor_' + row_num).data('value'));

    var sor_id = $('#edit_sor_' + row_num).data('value');
    var asset_type_id  = $('#edit_asset_' + row_num).data('value');
    
    // console.log('here property_id', property_id);

    add_autocomplete_custom_dropdown('#edit_sor_' + row_num, site_url + 'sor/get_all_dropdown', ["sor_code"], {'sors.client_id': selected_client.client_id, 'contract_id': contract_id}, 'body', sor_id, null, site_url + 'sor/get/' + sor_id);
    $('#edit_frequency_' + row_num).val($('#edit_frequency_' + row_num).data('value'));

    edit_updateFrequencyExceptionOptions(row_num, $('#edit_frequency_' + row_num).val(), $('#edit_frequency_except_' + row_num).data('value'));

    add_autocomplete_custom_dropdown('#edit_asset_'+row_num, site_url + 'asset/property-assets-type/'+property_id, ["equipment_type", "total_quantity"], null, 'body', asset_type_id, null,site_url + 'asset/property-assets-type-name/' + asset_type_id);
    $('#edit_frequency_' + row_num).val($('#edit_frequency_' + row_num).data('value'));
    var start_date = $('#edit_start_date_' + row_num).val();
    var min_start_date = (new Date(start_date) > new Date(schedule_start_date)) ? schedule_start_date : start_date;
    
    ajs.ajax_form(site_url + 'contract/get/' + contract_id, null, 'GET', null, '1', '1', function (resp) {
        var res = resp && resp.data ? resp.data : null;
        // console.log('Contract details:', res);
        if (res) {
            var schedule_start_date = res.start_date;
            $('#edit_start_date_' + row_num).attr('min', schedule_start_date); // Set min as contract start date for all start date inputs
        }
    }, function (xhr) { console.error('Failed to fetch contract details'); });

    // $("#edit_start_date_" + row_num).attr('min', min_start_date);
    // $("#edit_start_date_" + row_num).attr('max', schedule_end_date);
    // $("#edit_end_date_" + row_num).attr('min', min_start_date);
    // $("#edit_end_date_" + row_num).attr('max', schedule_end_date);
}); */

$(document).on('click', '.update-ppm-row', function () {
    var $form = $(this).closest('form');
    validate_ppm_form($form);
    if (!$form.valid()) {
        return;
    }
    $(this).prop('disabled', true);
    setTimeout(() => {
        // Submit the form
        $form.submit();    
    }, 100);
});

$(document).on('click', '.cancel-ppm-row', function () {
    var $form = $(this).closest('form');

    // If this is a DataTable child row, hide it via the DataTable API
    var $tr = $form.closest('tr');
    if ($tr.hasClass('child') && typeof dataTable !== 'undefined' && dataTable) {
        var $parent = $tr.prev();
        var dtRow = dataTable.row($parent);
        if (dtRow && dtRow.child && dtRow.child.isShown()) {
            dtRow.child.hide();
        }
    } else {
        $tr.toggleClass('d-none');
    }

    $form[0].reset();
    $form.find('.error').remove();
    $form.find('.is-invalid').removeClass('is-invalid');
});


$(document).on('change', '.change-schedule-status', function (e) {

    schedule_id = $(this).data('schedule-id');
    const wantsActive = $(this).is(':checked'); // true or false    
    var $el = $(this);  
    $el.prop('disabled', true).prop('checked', !wantsActive);
    var status_value = $(this).val();
    const title   = wantsActive ? "Activate this schedule?"  : "Mark this schedule as Inactive?";
    const confirm = wantsActive ? "Yes, Activate"            : "Yes, Inactivate";
    const icon    = wantsActive ? "question"                 : "warning";
    
    Swal.fire({
        title,
        icon,
        showCancelButton: true,
        confirmButtonText: confirm,
        cancelButtonText: "Cancel",
        buttonsStyling: false,
        customClass: {
            confirmButton: wantsActive ? "btn btn-primary me-3" : "btn btn-danger me-3",
            cancelButton: "btn btn-outline-dark"
        },
    }).then((res) => {
    if (!res.isConfirmed) {
      // user cancelled; keep original state
      $el.prop('disabled', false);
      return;
    }
    const endpoint = site_url + 'contract_masterplan/status';  // <-- adjust to your route
    const data = {
      contract_id: contract_id,
      schedule_id: schedule_id,
      status: wantsActive ? 1 : 2 // 1=Active, 2=Inactive
    };
    ajs.ajax_form(endpoint, data, 'POST',null, '1','0', ajs_form_handler.api_response, ajs_form_handler.api_response );

    load_data_table();
  }).finally(() => {
    // safety: re-enable in case reload is async
    $el.prop('disabled', false);
  });
});

