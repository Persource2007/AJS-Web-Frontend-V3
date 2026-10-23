<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $sub_title = 'Create JOB';
            include_once APPPATH . 'views/jobs/inc/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="row">
                <div class="col-lg-12">
                    <?php
                    $action    = app_url('job/create');
                    if (isset($edit) && $edit && isset($id) && $id > 0)
                    {
                        $action = app_url('job/edit/');
                    }
                    ?>
                    <form class="tablelist-form pb-4" action="<?= $action ?>" method="post" id="jobForm" autocomplete="off">
                        <input type="hidden" value="<?= $id ?? null ?>" id="edit_id" name="edit_id" />
                        <div class="p-0 overflow-hidden">
                            <div data-simplebar style="height: calc(100vh - 112px);">
                                <div class="acitivity-timeline p-4 ">
                                    <div class="modal-body">
                                        <div class="">
                                            <div class="row gy-2">
                                                <h5 class="fs-16 mt-3 mb-0">Job Details</h5>
                                                <div class="col-xxl-6 col-md-2">
                                                    <label class="form-label">Property <span class="text-danger">*</span></label>
                                                    <div class="input-light">
                                                        <div class="d-flex error-div">
                                                            <select class="form-control" name="property_id" id="property_id">
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                            <button type="button" class="btn btn-primary ms-1 popup-form-search-button popup-add-btn" data-heading="Search Property" data-element="property_id" data-after-load-func="set_property_id" data-form-url="<?= base_url('properties/search-list') ?>"><i class="mdi mdi-magnify search-widget-icon"></i></button>
                                                            <button type="button" class="btn btn-primary ms-1  popup-form-view-button popup-add-btn" data-heading="View Property" data-element="property_id"  data-form-url="<?= base_url('properties/details') ?>"><i class=" ri-eye-fill  align-bottom"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-6 col-md-6">
                                                    <label class="form-label">Client <span class="text-danger">*</span></label>
                                                    <div class="input-light">
                                                        <div class="d-flex error-div">
                                                            <select class="form-control" name="client_id" id="client_id">
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                            <button type="button" class="btn btn-primary ms-1 popup-form-search-button popup-add-btn" data-heading="Search Client" data-element="client_id" data-after-load-func="set_client_id" data-form-url="<?= base_url('clients/search-list') ?>"><i class="mdi mdi-magnify search-widget-icon"></i></button>
                                                            <button type="button" class="btn btn-primary ms-1  popup-form-view-button popup-add-btn" data-heading="View Client" data-element="client_id"  data-form-url="<?= base_url('clients/details') ?>"><i class=" ri-eye-fill  align-bottom"></i></button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-xxl-4 col-md-6">
                                                    <label class="form-label">Contract <span class="text-danger">*</span></label>
                                                    <div class="input-light">
                                                        <div class="d-flex error-div">
                                                            <select class="form-control" name="contract_id" id="contract_id">
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                            <button type="button" class="btn btn-primary ms-1 popup-form-search-button popup-add-btn" data-heading="Search Contract" data-element="contract_id" data-after-load-func="set_contract_id" data-form-url="<?= base_url('contract/search-list') ?>"><i class="mdi mdi-magnify search-widget-icon"></i></button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-xxl-4 col-md-6">
                                                    <div>
                                                        <label class="form-label">Client Work Order#</label>
                                                        <input type="text" class="form-control" name="client_work_order" id="client_work_order">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-6">
                                                    <div>
                                                        <label class="form-label">Booked By</label>
                                                        <input type="text" class="form-control" name="client_name" id="client_name">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-6">
                                                    <div>
                                                        <label class="form-label">Email</label>
                                                        <input type="text" class="form-control" name="client_email" id="client_email">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-6">
                                                    <div>
                                                        <label class="form-label">Phone Number</label>
                                                        <input type="text" class="form-control" name="client_phone" id="client_phone">
                                                    </div>
                                                </div>
                                                <div class="clearfix"></div>
                                                <div class="col-xxl-4 col-md-6">
                                                    <div class="input-light">
                                                        <label class="form-label">Job Type <span class="text-danger">*</span><span class="tooltip-container" data-master-code="JOB_TYPE"><i class="bx bx-info-circle tooltip"></i></span></label>
                                                        <select class="form-control select2" name="service_id" id="service_id">
                                                            <option value="" selected>Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-6">
                                                    <div class="input-light">
                                                        <label class="form-label">Target Date</label>
                                                        <input type="datetime-local" class="form-control" name="target_date" id="target_date" />
                                                    </div>
                                                </div>
                                                <div style="display: none" class="col-xxl-4 col-md-6">
                                                    <label class="form-label">SOR </label>
                                                    <div class="input-light">
                                                        <div class="d-flex error-div">
                                                            <select class="form-control" id="sor_id" name="sor_id">
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                            <button type="button" class="btn btn-primary ms-1 popup-form-search-button popup-add-btn" data-heading="Search SOR" data-element="sor_id" data-after-load-func="set_sor_id" data-form-url="<?= base_url('system/sor/search-list') ?>"><i class="mdi mdi-magnify search-widget-icon"></i></button>
                                                            <button type="button" class="btn btn-primary ms-1  popup-form-view-button popup-add-btn" data-heading="View SOR" data-element="sor_id"  data-form-url="<?= base_url('system/sor/details') ?>"><i class=" ri-eye-fill  align-bottom"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--                                                <div class="col-xxl-4 col-md-6">
                                                                                                <div class="input-light">
                                                    <label class="form-label">Priority</label>
                                                    <select class="form-control select2" name="priority" id="priority">
                                                        <option value="low" selected>Low</option>
                                                        <option value="medium">Medium</option>
                                                        <option value="high">High</option>
                                                    </select>
                                                </div>
                                                                                            </div>-->

                                                <div class="col-xxl-4 col-md-6">
                                                    <label for="labelInput" class="form-label">Is Emergency Job</label>
                                                    <div class="">
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input login-check-radio" name="emergency_job" type="radio" id="emergency_job0" value="0" checked="">
                                                            <label class="form-check-label" for="emergency_job0">No</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input login-check-radio" name="emergency_job" type="radio" id="emergency_job1" value="1">
                                                            <label class="form-check-label" for="emergency_job1">Yes</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-12 col-md-12">
                                                    <div>
                                                        <label class="form-label">Job Description</label>
                                                        <textarea class="form-control" id="description" name="description"></textarea>
                                                    </div>
                                                </div>
                                                <?php
                                                if (isset($edit) && $edit && isset($id) && $id > 0)
                                                {
                                                    ?>
                                                <div class="col-xxl-12 col-md-12">
                                                        <input type="hidden" name="job_id" id="job_id" value="<?= $id ?>" />
                                                        <h5 class="mb-0 mt-3 d-flex align-items-end">Tasks
                                                            <button type="button" class="btn btn-success ms-auto popup-form-button-task popup-add-btn" data-job-id="<?= $id ?>" data-heading="Add Task" data-after-load-func="get_job_details_for_task"  data-form-url="<?= base_url('job/create-task') ?>">
                                                                <i class="ri-add-line align-bottom"></i>
                                                            </button>
                                                        </h5>
                                                        <input type="hidden" name="job_skills_hidden" id="job_skills_hidden" autocomplete="off" value="" />
                                                            <input type="hidden" name="job_skills_names_hidden" id="job_skills_names_hidden" autocomplete="off" value="" />
                                                            <hr class="mt-1 mb-0">
                                                        <div class="col-xxl-12 col-md-12 mb-3 job-task-div" style="max-height: 200px; overflow:auto; font-size: 12px !important">

                                                            </div>
                                                        </div>
                                                        <?php
                                                    }
                                                    ?>
                                                    <div class="col-lg-12 mb-5">
                                                        <label>Docs/Media</label>

                                                    <div class="">
                                                        <div class="dropzone" id="dropzone-jobs">
                                                            <div class="fallback">
                                                                <input name="docs" type="file" accept="application/pdf" multiple="multiple">
                                                            </div>
                                                            <div class="dz-message needsclick">
                                                                <div class="mb-3">
                                                                    <i class="display-4 text-muted ri-upload-cloud-2-fill"></i>
                                                                </div>

                                                                <h4>Drop files here or click to upload.</h4>
                                                            </div>
                                                        </div>

                                                        <div class="mb-0 row" id="dropzone-job-preview">
                                                            <div class="mt-2 col-lg-4" id="dropzone-job-preview-list">
                                                                <!-- This is used as the file preview template -->
                                                                <div class="border rounded">
                                                                    <div class="d-flex p-2">
                                                                        <div class="flex-shrink-0 me-3">
                                                                            <div class="avatar-sm bg-light rounded">
                                                                                <img data-dz-thumbnail class="img-fluid rounded d-block" src="<?= cdn_url('assets/images/new-document.png') ?>" />
                                                                            </div>
                                                                        </div>
                                                                        <div class="flex-grow-1">
                                                                            <div class="pt-1">
                                                                                <h5 class="fs-14 mb-1" data-dz-name>&nbsp;</h5>
                                                                                <!-- <p class="fs-13 text-muted mb-0" data-dz-size></p> -->
                                                                                <strong class="error text-danger" data-dz-errormessage></strong>
                                                                            </div>
                                                                        </div>
                                                                        <div class="flex-shrink-0 ms-3">
                                                                            <button data-dz-remove class="btn btn-sm btn-danger" data-delete-url="job/delete-file/">Delete</button>
                                                                        </div>
                                                                    </div>
                                                                    <div class="caption p-2">
                                                                        <input type="hidden" name="documents[]" class="name-input">
                                                                        <input type="hidden" name="document_ids[]" class="id-input" value="0">
                                                                        <input type="text" name="document_captions[]" class="form-control caption-input" placeholder="Caption goes here">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- end dropzon-preview -->
                                                    </div>
                                                </div>
                                                <!--end col-->
                                                <!--<h5 class="fs-14 mb-0">Job Assignment</h5>-->
                                                <!--                                                <div class="col-xxl-6 col-md-6">
                                                                                                    <label class="form-label">Job Assign</label>
                                                    <div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input job-assign" id="job_assign_0" type="radio" name="is_job_assign" value="0" checked>
                                                            <label class="form-check-label" for="job_assign_0">Add job to queue</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input job-assign" id="job_assign_1" type="radio" name="is_job_assign" value="1">
                                                            <label class="form-check-label" for="job_assign_1">Assign now</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-md-2 job-assign-section" style="display: none;">
                                                    <div>
                                                        <label for="labelInput" class="form-label">Preferred Date</label>
                                                        <input type="date" class="form-control" id="preferred_date" name="preferred_date">
                                                    </div>
                                                </div>
                                                                                                end col
                                                                                                <div class="col-xxl-3 col-md-2 job-assign-section" style="display: none;">
                                                    <div>
                                                        <label for="labelInput" class="form-label">Preferred Time</label>
                                                        <input type="time" class="form-control" id="preferred_time" name="preferred_time">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-12 col-md-12 mb-3 job-assign-section" style="display: none;">
                                                    <div class="input-light multi-choice">
                                                        <label class="form-label">Assign Engineer</label>
                                                        <div class="d-flex input-group">
                                                            <select class="form-control" id="engineers" name="engineers[]" multiple>
                                                            </select>
                                                        </div>
                                                    </div>
                                                                                                </div>-->
                                                <!--end col-->
                                                <!-- <div class="col-xxl-4 col-md-2">
                                                    <div class="form-check mb-2">
                                                        <input class="form-check-input" type="checkbox" id="formCheck1">
                                                        <label class="form-check-label" for="formCheck1">
                                                            Needs Manager Approval
                                                        </label>
                                                    </div>
                                                </div> -->

                                                <div style="display: none" id="service_create_certificate_form" class="mb-3">
                                                    <h5 class="mb-0 mt-4 d-flex">Certificates
                                                        <button type="button" data-parent-div="service_create_certificate_form" data-input-parent="certificate_input_field_div" class="add-service-certificates ms-auto btn btn-primary">
                                                            <i class=" bx bx-message-square-add "></i>
                                                        </button>
                                                    </h5>
                                                    <?php
                                                    if (!isset($edit) && !isset($id))
                                                    {
                                                        ?>
                                                    <div class="row gy-2">
                                                            <div class="col-xxl-4 col-md-2">
                                                                <div class="input-light">
                                                                    <label class="form-label">Certificate</label>
                                                                    <select class="form-control ajs_contact_type" name="certificate_id[]" id="certificate_id">
                                                                        <option value="" selected>Select Certificate</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-xxl-4 col-md-6">
                                                                <label for="labelInput" class="form-label">Required</label>
                                                                <select class="form-control" id="certificate_required" name="certificate_required[]">
                                                                    <option value="0">No</option>
                                                                    <option value="1">Yes</option>
                                                                </select>

                                                                    <input type="hidden" class="form-control" name="is_new_certificate[]" value="1">
                                                                </div>
                                                                <!--end col-->
                                                            </div>
                                                            <?php
                                                        }
                                                        ?>
                                                </div>
                                            </div>
                                        </div>
                                        <!--end row-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="offcanvas-foorter border p-3 text-center">
                            <div class="hstack gap-2">
                                <?php
                                if (!isset($edit) && !isset($id))
                                {
                                    ?>
                                <button type="submit" name="submit_keep_open" value="submit_keep_open" class="btn btn-primary waves-effect waves-light" id="add-btn">Save & Continue Creating Task</button>
                                    <?php
                                }
                                ?>
                                <button type="submit" class="btn btn-success waves-effect waves-light" id="add-btn">Save</button>
                                <button type="button" class="btn btn-light waves-effect waves-light close-offcanvas" id="close-modal" >Close</button>
                            </div>
                        </div>
                    </form>
                </div>
                <!--end col-->
                <div class="row gy-2 certificate_input_field_div" style="display: none">
                    <hr class='separator-hr' style='margin-top:30px'>
                    <div class="col-xxl-4 col-md-2">
                        <div class="input-light">
                            <label class="form-label">Certificate</label>
                            <select class="form-control certificate_id" name="certificate_id[]">
                                <option value="" selected>Select Certificate</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-xxl-4 col-md-6">
                        <label for="labelInput" class="form-label">Required</label>
                        <select class="certificate_required form-control" name="certificate_required[]">
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </div>
                    <input type="hidden" class="form-control" name="is_new_certificate[]" value="0">
                    <div class="col-xxl-4 col-md-6 ms-auto">
                        <label for="account_manager" class="form-label">Remove</label><br />
                        <button type="button" data-parent-div="certificate_input_field_div" class="remove-parent-btn ms-auto btn btn-danger popup-close-btn">
                            <i class="ri-close-line"></i>
                        </button>
                    </div>
                    <!--end col-->
                </div>
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
</div>
<!-- End Page-content -->
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/job.js?v=1.5') ?>"></script>