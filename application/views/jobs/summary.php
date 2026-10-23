<?php require_once APPPATH . 'views/jobs/inc/summary-style.php'; ?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div class="row mb-3">
                <div class="col-12 text-end">
                    <a href="<?= base_url('job/details/' . hash_encode($id)) ?>" class="btn btn-info me-1">
                        <i class="ri-arrow-left-line fs-14 me-1"></i>Back
                    </a>
                    <button type="button" id="job_summary_print_btn" class="btn btn-primary me-1">
                        <i class="ri-printer-line align-bottom me-1"></i>Print
                    </button>
                    <button type="button" id="job_summary_email_btn" class="btn btn-success">
                        <i class="ri-mail-send-line align-bottom me-1"></i>Send Email
                    </button>
                </div>
                <div class="col-12 text-center">
                    <h5 class="mb-0 text-danger">DO NOT EMAIL TO RESIDENT</h5>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div id="job-summary-root">
                        <div class="js-empty">Loading job summary...</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="job_id" value="<?= $id ?>">
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/job-summary.js') ?>"></script>
<script>
    var currentJobData = null;
    var jobId = $('#job_id').val();

    JobSummary.load(jobId, '#job-summary-root', function (job) {
        currentJobData = job;
    });

    $('#job_summary_print_btn').on('click', function () {
        window.open(cdn_url + 'job/summary/' + jobId + '/print', '_blank');
    });

    function firstEmail(value) {
        if (!value) {
            return '';
        }
        var parts = String(value).split(/[,;\s]+/).map(function (v) { return v.trim(); }).filter(Boolean);
        return parts.length ? parts[0] : '';
    }

    $('#job_summary_email_btn').on('click', function () {
        if (!currentJobData) {
            return;
        }
        var prefillEmail = currentJobData?.client_contacts?.find(contact => contact.email)?.email || '';
        Swal.fire({
            title: 'Send Job Summary',
            html: '<p class="text-danger">DO NOT EMAIL TO RESIDENT</p>',
            input: 'email',
            inputValue: prefillEmail,
            inputPlaceholder: 'Enter recipient email',
            showCancelButton: true,
            confirmButtonText: 'Send',
            cancelButtonText: 'Cancel',
            inputValidator: function (value) {
                if (!value) {
                    return 'Email is required';
                }
            }
        }).then(function (result) {
            if (result.isConfirmed) {
                ajs.ajax_form(site_url + "job/summary-send-email/" + jobId, { email_to: result.value }, "POST", null, "1", "1", function (response) {
                    if (response.status) {
                        Swal.fire({ title: 'Success!', icon: 'success', text: response.message });
                    } else {
                        Swal.fire({ title: 'Error!', icon: 'error', text: response.message });
                    }
                }, function (error) {
                    var msg = error.responseJSON?.message || 'An unexpected error occurred.';
                    Swal.fire({ title: 'Error!', icon: 'error', text: msg });
                });
            }
        });
    });
</script>
