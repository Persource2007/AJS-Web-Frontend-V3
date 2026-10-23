<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->

<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0">Add New Job Type</h4>
                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Resources Set up</a></li>
                                <li class="breadcrumb-item active">Add Job Type</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
                <?php
                $action = app_url('service/create');
                $method = 'POST';
                if (isset($edit) && $edit && isset($id) && $id > 0)
{
    $action = app_url('service/edit/');
    $method = 'POST';
                }
                ?>
                <form class="tablelist-form pb-4 simplebar-form" action="<?= $action ?>" method="<?= $method ?>" name="addServiceForm" id="addServiceForm" style="height: calc(100vh - 112px);" data-simplebar autocomplete="off">
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4 pt-2">
                                <div class="modal-body pb-3">
                                    <input type="hidden" id="tasksId" />
                                    <div class="row gy-2 pt-3">
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label for="basiInput" class="form-label">Name <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="title" name="title">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label for="basiInput" class="form-label">Short Code <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="service_code" name="service_code">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label for="basiInput" class="form-label">Service Type</label>
                                                <select class="form-control" id="service_type" name="service_type">
                                                    <option value="P">Planned</option>
                                                    <option value="R">Reactive</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="service-type-extra row me-1 mt-2 gy-2" style="display:none">
                                            <div class="col-xxl-4 col-md-6 pe-0">
                                                <div style="width: 99%;">
                                                    <label for="labelInput" class="form-label">Test Completion %</label>
                                                    <div class="input-group">
                                                        <span class="input-group-text" id="basic-addon1">%</span>
                                                        <input type="text" class="form-control" min="1" max="100" value="100" id="test_completion_percentage" name="test_completion_percentage" inputmode="text">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-6 pe-0">
                                                <div style="width: 99%;">
                                                    <label for="basiInput" class="form-label">Coverage</label>
                                                    <select class="form-control" id="asset_type" name="asset_type">
                                                        <option value="A">Asset</option>
                                                        <option value="P">Property</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xxl-12 col-md-12">
                                            <div>
                                                <label for="basiInput" class="form-label">Description</label>
                                                <textarea class="form-control" id="description" name="description"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div class="input-light">
                                                <label class="form-label">Work Stream <span class="text-danger">*</span></label>
                                                <select class="form-control select2" id="workstream_id" name="workstream_id">
                                                    <option value="">Select Worksteam</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div class="input-light">
                                                <label class="form-label">Skills Required <span class="text-danger">*</span></label>
                                                <select class="form-control select2" name="skills[]" id="skills" multiple="multiple">

                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-4">
                                            <div class="input-light">
                                                <label for="basiInput" class="form-label">Fix Time <span class="text-danger">*</span></label>
                                                <div class="d-flex">
                                                    <select class="form-control select2" id="service_time" name="service_time">
                                                        <option value="">Select</option>
                                                    </select>

                                                    <a data-heading="Add New Service Time" data-after-load-func="create_master_form" data-element="service_time" data-form-url="<?= base_url('system/master-record/create/SERVICE_TIMES') ?>" class="popup-form-button-master btn btn-success popup-add-btn ms-2">
                                                        <i class="ri-add-line align-bottom"></i>
                                                    </a>
                                                </div>
                                            </div>
<!--                                            <div class="row">
                                                <div class="col-xxl-9 pe-0">
                                                    <label for="basiInput" class="form-label">Fix Time <span class="text-danger">*</span></label>
                                                    <select class="form-control select2" id="service_time" name="service_time">
                                                        <option value="">Select</option>
                                                    </select>
                                                </div>
                                                <div class="col-xxl-3">
                                                    <a data-heading="Add New Service Time" data-after-load-func="create_master_form" data-element="service_time" data-form-url="<?= base_url('system/master-record/create/SERVICE_TIMES') ?>" class="popup-form-button-master ms-auto btn btn-success popup-add-btn mt-4">
                                                        <i class="ri-add-line align-bottom"></i>
                                                    </a>
                                                </div>
                                            </div>-->
                                        </div>
                                        <div class="col-xxl-4 col-md-4">
                                            <div class="input-light">
                                                <label for="basiInput" class="form-label">Target Time <span class="text-danger">*</span></label>
                                                <div class="d-flex">
                                                    <select class="form-control select2" id="target_time" name="target_time">
                                                        <option value="">Select</option>
                                                    </select>

                                                    <a data-heading="Add New Target Time" data-after-load-func="create_master_form" data-element="target_time" data-form-url="<?= base_url('system/master-record/create/TARGET_TIMES') ?>" class="popup-form-button-master btn btn-success popup-add-btn ms-2">
                                                        <i class="ri-add-line align-bottom"></i>
                                                    </a>
                                                </div>
                                            </div>
<!--                                            <div class="row">
                                                <div class="col-xxl-9 pe-0">
                                                    <label for="basiInput" class="form-label">Target Time <span class="text-danger">*</span></label>
                                                    <select class="form-control select2" id="target_time" name="target_time">
                                                        <option value="">Select</option>
                                                    </select>
                                                </div>
                                                <div class="col-xxl-3">
                                                    <a data-heading="Add New Target Time" data-after-load-func="create_master_form" data-element="target_time" data-form-url="<?= base_url('system/master-record/create/TARGET_TIMES') ?>" class="popup-form-button-master ms-auto btn btn-success popup-add-btn mt-4">
                                                        <i class="ri-add-line align-bottom"></i>
                                                    </a>
                                                </div>
                                            </div>-->
                                        </div>
                                        <div class="col-xxl-4 col-md-4">
                                            <div class="input-light">
                                                <label for="basiInput" class="form-label">Target Attend Time</label>
                                                <div class="d-flex">
                                                    <select class="form-control select2" id="target_attend_time" name="target_attend_time">
                                                        <option value="">Select</option>
                                                    </select>

                                                    <a data-heading="Add New Attend Time" data-after-load-func="create_master_form" data-element="target_attend_time" data-form-url="<?= base_url('system/master-record/create/TARGET_ATTEND_TIME') ?>" class="popup-form-button-master btn btn-success popup-add-btn ms-2">
                                                        <i class="ri-add-line align-bottom"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-4">
                                            <div>
                                                <label for="basiInput" class="form-label">Default SOR </label>
                                                <select class="form-control select2" id="default_sor" name="default_sor">
                                                    <option value="">Select Default SOR</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-xxl-4 col-md-6">
                                            <label for="labelInput" class="form-label">Appointment Required</label>
                                            <div class="">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input login-check-radio" name="appointment_required" type="radio" id="inlineCheckbox6" value="1">
                                                    <label class="form-check-label" for="inlineCheckbox6">Yes</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input login-check-radio" name="appointment_required" type="radio" id="inlineCheckbox7" value="0" checked>
                                                    <label class="form-check-label" for="inlineCheckbox7">No</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-xxl-4 col-md-6">
                                            <label for="labelInput" class="form-label">Send Survey</label>
                                            <div class="">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input login-check-radio" name="send_survey" type="radio" id="send_survey_yes" value="1" checked>
                                                    <label class="form-check-label" for="send_survey_yes">Yes</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input login-check-radio" name="send_survey" type="radio" id="send_survey_no" value="0">
                                                    <label class="form-check-label" for="send_survey_no">No</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-xxl-6 col-md-6">
                                            <div>
                                                <label for="basicInput" class="form-label">Geo-Fencing <span class="text-danger">*</span><span class="tooltip-container" data-master-code="GEO_FENCING"><i class="bx bx-info-circle tooltip"></i></span></label>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" id="geo_fencing_0" type="radio" name="geo_fencing" value="1" checked>
                                                    <label class="form-check-label" for="geo_fencing_0">Enabled</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" id="geo_fencing_1" type="radio" name="geo_fencing" value="0">
                                                    <label class="form-check-label" for="geo_fencing_1">Disable</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-xxl-12 col-md-12">
                                            <div>
                                                <label for="basiInput" class="form-label">Allowed Tasks </label>
                                                <select class="form-control select2" id="allowed_tasks" name="allowed_tasks[]" multiple="multiple">

                                                </select>
                                            </div>
                                        </div>

                                        <div id="service_create_certificate_form">
                                            <h5 class="mb-0 mt-1 d-flex align-items-end">Certificates
                                                <button type="button" data-parent-div="service_create_certificate_form" data-input-parent="certificate_input_field_div" class="add-service-certificates ms-auto btn btn-success popup-add-btn">
                                                    <i class="ri-add-line align-bottom"></i>
                                                </button>
                                            </h5>
                                            <hr class="mt-1 mb-2">
                                            <?php
                                            if (!isset($edit) && !isset($id))
                                            {
                                                ?>
                                            <div class="row gy-2 pt-2">
                                                    <div class="col-xxl-4 col-md-4 mb-2">
                                                        <div class="input-light">
                                                            <label class="form-label">Certificate</label>
                                                            <select class="form-control select2" name="certificate_id[]" id="certificate_id">
                                                                <option value="" selected>Select Certificate</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-4 col-md-6 mb-2">
                                                        <label for="labelInput" class="form-label">Required</label>
                                                        <select class="form-control" id="certificate_required" name="certificate_required[]">
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>

                                                            <input type="hidden" class="form-control telephone-mask" name="is_new_certificate[]" value="1">
                                                            <input type="hidden" name="service_certificate_id[]" value="0">
                                                        </div>
                                                        <!--end col-->
                                                    </div>
                                                    <?php
                                                }
                                                ?>
                                        </div>

                                    </div>
                                    <!--end row-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="offcanvas-foorter p-4 text-center">

                        <div class="hstack gap-2">
                            <?php
                            if (isset($edit) && $edit && isset($id) && $id > 0)
                            {
                                ?>
                            <input type="hidden" id="edit_id" name="edit_id" value="<?= $id ?>" />
                                <?php
                            }
                            ?>
                            <button type="submit" class="btn btn-success waves-effect waves-light" id="add-btn">Save</button>
                            <button type="button" class="btn btn-light waves-effect waves-light close-offcanvas" id="close-modal">Close</button>
                            <div id="deleteBtnContainer"></div>
                            <?php if (isset($id) && $id > 0) { ?>               
                                <script>
                                    document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'service');
                                </script>
                            <?php }  ?>
                        </div>
                    </div>
                </form>
                <div id="certificate_input_field_template" class="row gy-2 pt-0 certificate_input_field_div" style="display: none">
                    <div class="col-xxl-4 col-md-4 mb-2">
                        <div class="input-light">
                            <label class="form-label">Certificate</label>
                            <select class="form-control certificate_id" name="certificate_id[]">
                                <option value="" selected>Select Certificate</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-xxl-4 col-md-6 mb-2">
                        <label for="labelInput" class="form-label">Required</label>
                        <select class="certificate_required form-control" name="certificate_required[]">
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </div>
                    <input type="hidden" class="form-control telephone-mask" name="is_new_certificate[]" value="0">
                    <input type="hidden" name="service_certificate_id[]" value="0">
                    <div class="col-xxl-4 col-md-2 ms-auto mb-2">
                        <label for="account_manager" class="form-label" style="color: transparent;">Remove</label><br />
                        <button type="button" data-parent-div="certificate_input_field_div" class="remove-parent-btn ms-auto btn btn-danger popup-close-btn">
                            <i class="ri-close-line"></i>
                        </button>
                    </div>
                    <!--end col-->
                </div>
            </div>
        </div>
        <!-- container-fluid -->
    </div>

</div>
