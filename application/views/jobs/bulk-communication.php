<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $sub_title = 'Bulk Communication';
            include_once APPPATH . 'views/jobs/inc/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="row">
                <div class="col-lg-12">
                    <?php
                    $action    = app_url('job/bulk-communication');
                    ?>
                    <form class="tablelist-form pb-4" action="<?= $action ?>" method="post" id="bulkCommForm" autocomplete="off">
                        <input type="hidden" name="job_ids" id="bulk_job_ids" value="">
                        <input type="hidden" name="client_id" id="client_id_hidden" value="">
                        <div class="p-0 overflow-hidden">
                            <div data-simplebar style="height: calc(100vh - 112px);">
                                <div class="acitivity-timeline p-4 ">
                                    <div class="modal-body">
                                        <div class="">
                                            <!-- Deliberately a plain block, not an .alert inside the grid row:
                                                 as a col-xxl-12 .alert it escaped the offcanvas horizontally and
                                                 covered the Communication Type / Send To labels. -->
                                            <p class="text-muted fs-12 mb-3">
                                                Sending to <strong><span id="bulk_comm_job_count">0</span></strong> selected job(s).
                                                Appointment fields (task, appointment date/time, appointment link) are blank in a bulk send.
                                            </p>
                                            <div class="row gy-2">
                                                <div class="col-xxl-3 col-md-4">
                                                    <label class="form-label">Communication Type</label>
                                                    <div class="input-light">
                                                        <div class="d-flex error-div">
                                                            <select class="form-control" name="via_to" id="via_to">
                                                                <option value="email" selected>Email</option>
                                                                <option value="sms">SMS</option>
                                                                <option value="letter">Letter</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-md-6" id="recipient-mode-div">
                                                    <label class="form-label mb-2">Send To</label>
                                                    <div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input recipient-mode" name="recipient_mode" type="radio" id="recipient_resident" value="resident" checked="">
                                                            <label class="form-check-label" for="recipient_resident">Resident</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input recipient-mode" name="recipient_mode" type="radio" id="recipient_custom" value="custom">
                                                            <label class="form-check-label" for="recipient_custom">Add Number/Email</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-md-4 email-div hide" id="custom-email-div">
                                                    <div>
                                                        <label class="form-label">Email <span class="text-danger">*</span></label>
                                                        <input type="email" name="email_to" id="email_to" class="form-control" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-md-4 mobile-div hide" id="custom-mobile-div">
                                                    <div>
                                                        <label class="form-label">Mobile <span class="text-danger">*</span></label>
                                                        <input type="text" name="phone_to" id="phone_to" class="form-control mobile-mask" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-2 col-md-2">
                                                    <label class="form-label">&nbsp;</label>
                                                    <div class="form-check mb-2">
                                                        <input class="form-check-input" type="checkbox" id="send_now" value="1" checked>
                                                        <label class="form-check-label" for="send_now">
                                                            Send Now
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-md-2 hide">
                                                    <div>
                                                        <label class="form-label">Schedule Date Time <span class="text-danger">*</span></label>
                                                        <input type="text" name="scheduled_time" id="scheduled_time" class="form-control" autocomplete="off" required readonly>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-12 col-md-12" id="subject-div">
                                                    <label class="form-label">Subject <span class="text-danger">*</span></label>
                                                    <input type="text" name="subject" id="subject" class="form-control" autocomplete="off" required>
                                                </div>
                                                <div class="col-xxl-12 col-md-12">
                                                    <label class="form-label"> Content <span class="text-danger">*</span></label>
                                                    <div class="input-light">
                                                        <textarea class="draft-field" rows="10" name="content" id="content" data-template-fn="get_client_template" data-master-code="APPOINTMENT_FIELDS" required></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!--end row-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="offcanvas-footer border p-3 text-center">
                            <div class="hstack gap-2">
                                <button type="submit" class="btn btn-success waves-effect waves-light" id="add-btn">Send</button>
                                <button type="button" class="btn btn-light waves-effect waves-light close-offcanvas" id="close-modal">Close</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
</div>
<!-- End Page-content -->
