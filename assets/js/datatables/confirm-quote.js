let loaded = false;
async function load_data() {
    try {
        const response = await $.ajax({
            type: 'GET',
            url: quotation_details.replace("{ID}", id)
        });
        loaded = true;
        const res = response.data;
        var quotation_status = $("#quotation_status").val(); 
        if (response.status) {
            $('.check_status').html('');
            console.log(response.data);
            if(response.data.status_confirmed_at != '' && response.data.status_confirmed_at != null)
            {                
                var status_false_html = '<div class="p-lg-5 p-4"><div class=""><h3 class="mb-4 appointment_status">This quote is already confirmed</h3></div></div>';               
                $('.check_status').html(status_false_html);                             
            }else if(quotation_status == 'approve') {
                var approve_html = `<div class="p-lg-5 p-4"><div class=""><h3 class="mb-4 appointment_status">Confirm Quotation - Approve</h3></div> <div class="row"><div class="col-md-8 col-sm-12 mb-3"><span class="bg-color-date date-div view_data"><b>Quote No:</b> ${response.data.quotation_num} </span> </div><div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6"><table class="table mb-0"> <tbody> <tr><td class="view_data"><b>Client:</b> ${response.data.client_code}</td></tr> <tr><td class="view_data"><b>Property:</b>${response.data.uprn_no}</td></tr><tr><td class="view_data"><b>Contract:</b> ${response.data.contract_number}</td> </tr> <tr><td class="view_data"><b>Total:</b>£${response.data.amt_payable}</td></tr><tr><td height="10"></td></tr></tbody> </table></div></div><div class="mt-4 mb-3"><div class="hstack gap-2 action-buttons"><div><a href="javascript:;" class="btn btn-success w-100 apply-action confirm-btn confirm" data-action="confirm">Confirm</a></div><div><a href="javascript:;" class="btn btn-secondary w-100 apply-action reschedule-btn cancle" data-action="cancle">Cancel</a></div></div></div></div>`;
                $('.check_status').html(approve_html);
            }else if(quotation_status == 'reject') {
                var reject_html = `<div class="p-lg-5 p-4"><div class=""><h3 class="mb-4 appointment_status">Confirm Quotation - Approve</h3></div> <div class="row"><div class="col-md-8 col-sm-12 mb-3"><span class="bg-color-date date-div view_data"><b>Quote No:</b> ${response.data.quotation_num} </span> </div><div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6"><table class="table mb-0"> <tbody> <tr><td class="view_data"><b>Client:</b> ${response.data.client_code}</td></tr> <tr><td class="view_data"><b>Property:</b> ${response.data.uprn_no}</td></tr><tr><td class="view_data"><b>Contract:</b> ${response.data.contract_number}</td> </tr> <tr><td class="view_data"><b>Total:</b>£${response.data.amt_payable}</td></tr><tr><td height="10"></td></tr></tbody> </table></div><div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6"><table class="table mb-0"><tbody><tr><td class="view_data"><b>Reason for reject:</b></td></tr><tr><textarea class="form-control" rows="4" name="reject_reason" id="reject_reason"></textarea> </tr> </tbody> </table></div></div><div class="mt-4 mb-3"><div class="hstack gap-2 action-buttons"><div><a href="javascript:;" class="btn btn-success w-100 apply-action confirm-btn reject" data-action="confirm">Confirm</a></div><div><a href="javascript:;" class="btn btn-secondary w-100 apply-action reschedule-btn cancle" data-action="cancle">Cancel</a></div></div></div></div>`;
                $('.check_status').html(reject_html);

            }

            $.each(res, function (i, data) {
                $(".view_data").html(function (_, html) {
                    return html.replace(new RegExp(`{{${i.toUpperCase()}}}`, 'g'), data);
                });
            });
        } else {
            let msg = response.message;
            display('error', 'Data Unavailable', msg);
        }
    } catch (error) {
        const msg = error.responseJSON?.message || 'An unexpected error occurred.';
        display('error', 'Error', msg);
    }
}
load_data();


$(document).on("click", "a.apply-action.confirm", async function (e) {
    e.preventDefault();
    if (!loaded) {
        display('warning', 'Please Wait...', 'Data is still loading. Try again shortly.', false);
    }
    Swal.fire({
        icon: 'question',
        title: 'Confirm Quote',
        text: 'Are you sure you want to approv this quote?',
        confirmButtonText: 'Confirm Quote',
        showLoaderOnConfirm: true,
        confirmButtonColor: "#157347",
        showCancelButton: true,
        cancelButtonText: 'Cancel',

        preConfirm: async () => {
            try {
                const response = await $.ajax({
                    type: 'GET',
                    url: confirm_app.replace("{ID}", id),
                });

                const res = response.data;
                if (response.status) {
                    display('success', 'Success', response.message);
                    $('.check_status').html('');
                    var thankyou_html = '<div class="p-lg-5 p-4"><div class=""><h3 class="mb-4 appointment_status">Thank You for your confirmation.</h3></div></div>';
                    $('.check_status').html(thankyou_html);
                    
                } else {
                    display('error', 'Error', response.message, false);
                }
            } catch (error) {
                const msg = error.responseJSON?.message || 'An unexpected error occurred.';
                display('error', 'Error', msg, false);
            }
        }
    });
})

$(document).on("click", "a.apply-action.reject", async function (e) {
    e.preventDefault();
    let reject_reason = $('#reject_reason').val();
    if (!loaded) {
        display('warning', 'Please Wait...', 'Data is still loading. Try again shortly.', false);
    }
    Swal.fire({
        icon: 'question',
        title: 'Confirm Quote',
        text: 'Are you sure you want to reject this quote?',
        confirmButtonText: 'Confirm Quote',
        showLoaderOnConfirm: true,
        confirmButtonColor: "#157347",
        showCancelButton: true,
        cancelButtonText: 'Cancel',

        preConfirm: async () => {
            try {
                const response = await $.ajax({
                    type: 'POST',
                    url: confirm_app.replace("{ID}", id),
                    data: {
                        reason: reject_reason
                    }
                });

                const res = response.data;
                if (response.status) {
                    display('success', 'Success', response.message);
                    $('.check_status').html('');
                    var thankyou_html = '<div class="p-lg-5 p-4"><div class=""><h3 class="mb-4 appointment_status">Thank You for your confirmation.</h3></div></div>';
                    $('.check_status').html(thankyou_html);
                    
                } else {
                    display('error', 'Error', response.message, false);
                }
            } catch (error) {
                const msg = error.responseJSON?.message || 'An unexpected error occurred.';
                display('error', 'Error', msg, false);
            }
        }
    });
})

$(document).on("click", "a.apply-action.cancle", async function (e) {
    e.preventDefault();
    window.location.href = baseURL;
})

function display(icon, title, msg, is_red = true) {
    Swal.fire({
        icon: icon,
        title: title,
        text: msg,
    });
    return;
}