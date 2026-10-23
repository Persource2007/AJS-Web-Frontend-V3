<div class="modal exampleModalFullscreen" id="actions-certificate" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true" role="dialog">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="myExtraLargeModalLabel">Preview Certificate</h5>
                <a type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></a>
            </div>
            <div class="modal-body large_modal_message" style="height:75vh;">
                <embed id="certificate_preview" type="application/pdf" title="Preview Certificate" width="100%" height="100%"></embed>
            </div>
            <div class="modal-footer">
                <a class="btn btn-sm btn-success m-1 update-approve-certificate" data-task-id="0" data-certificate="0"><i class="ri-check-line align-bottom me-1"></i>Approve</a>
                <a class="btn btn-sm btn-danger m-1 update-reject-certificate" data-task-id="0" data-certificate="0"><i class="ri-close-line align-bottom me-1"></i>Reject</a>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>

<script>
$(document).on('click','.update-approve-certificate',function(){
    const task_id = $(this).data("task-id");
    const certi = $(this).data("certificate");
    Swal.fire({
        title: "Approve Certificate",
        text: "Are you sure you want to approve this certificate?",
        html: signature_box(),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, approve it!",
        cancelButtonText: "No, cancel",
        showLoaderOnConfirm: true,
        preConfirm: async (message) => {
            try {
                // signature
                let signature = validateSign();
                if (!signature) return false;
                // signature
                
                const requetUrl = `${site_url}job/certificate/approve`;
                const response = await ajaxWithRefresh({
                    type: 'POST',
                    url: requetUrl,
                    data:{message:message,data:'',task:task_id,certificate:certi,signature: signature},
                });
                if (response.status == false) {
                return Swal.showValidationMessage(`
                    <strong>Error: </strong>${response.message}
                `);
                }
                return response;
            } catch (error) {
                var errorMsg = "Something went wrong.please try again...";
                if('responseJSON' in error){
                    errorMsg = $(`<div>${error.responseJSON.message}</div>`).text();
                }
                Swal.showValidationMessage(`<strong>Error: </strong> ${errorMsg}`);
            }
        },
        allowOutsideClick: () => Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: `Success!!`,
                icon: "success",
                text: result.value.message
            })
            reinitall();
        }
    });
});

$(document).on('click','.update-reject-certificate',function(){ 
    const task_id = $(this).data("task-id");
    const certi = $(this).data("certificate");
    Swal.fire({
        title: "Reject Certificate",
        text: "Please provide a reason for rejecting this certificate.",
        icon: "warning",
        input: "text",
        inputAttributes: {
            autocapitalize: "off",
            placeholder: "Enter reason..."
        },
        showCancelButton: true,
        confirmButtonText: "Yes, reject it!",
        cancelButtonText: "No, cancel",
        showLoaderOnConfirm: true,
        customClass: {
            confirmButton: 'swal2-deny',
        },
        preConfirm: async (message) => {
            try {
                if($.trim(message) == ''){
                    return Swal.showValidationMessage(`<strong>Error: </strong> Please enter reason.`);
                }
                // alert();
                const requetUrl = `${site_url}job/certificate/reject`;
                const response = await ajaxWithRefresh({
                    type: 'POST',
                    url: requetUrl,
                    data:{message:message,data:'',task:task_id,certificate:certi},
                    beforeSend: function (xhr, settings) {
                        ajs.set_auth_header(xhr, settings);
                    }
                });
                if (response.status == false) {
                    return Swal.showValidationMessage(`
                        <strong>Error: </strong>${response.message}
                        `);
                }
                return response;
            } catch (error) {
                var errorMsg = "Something went wrong.please try again...";
                if('responseJSON' in error){
                    errorMsg = $(`<div>${error.responseJSON.message}</div>`).text();
                }
                Swal.showValidationMessage(`<strong>Error: </strong> ${errorMsg}`);
            }
        },
        allowOutsideClick: () => Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: `Success!!`,
                icon: "success",
                text: result.value.message
            })
            reinitall();
        }
    });
});
function reinitall(){
    if (typeof refresh_task_details === "function") {
        refresh_task_details();
    }
    else if (typeof get_details === "function") {
        get_details();
    }
    $("#actions-certificate").modal("hide");
}
</script>