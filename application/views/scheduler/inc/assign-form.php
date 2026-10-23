<div class="main-content">
    <div class="container-fluid">
        <!-- start page title -->
        <div class="row"></div>
        <div class="row">
            <form class="tablelist-form pb-4 simplebar-form bulk-tasks-form" data-simplebar autocomplete="off" id="bulk-tasks-form" method="post">
                <div class="p-4 overflow-hidden pb-3">
                    <div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-xxl-12 col-md-12 bulk-alert-message">
                                    <h6></h6>
                                </div>
                                <div class="col-xxl-12 col-md-12">
                                    <div class="row">
                                        <div class="col-xxl-12 col-md-12">
                                            <div>
                                                <label for="basiInput" class="form-label">Assignment Type</label>
                                                <select class="form-control select2" id="preferred_time_range" name="preferred_time_range">
                                                    <option value="">Select</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-4 mt-2">
                                            <div class="form-check form-check-block">
                                                <input class="form-check-input task-assign" id="is_assigned_0" type="radio" name="is_assigned" value="0" checked>
                                                <label class="form-check-label" for="is_assigned_0">Add to queue</label>
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-4 mt-2">
                                            <div class="form-check form-check-block">
                                                <input class="form-check-input task-assign" id="is_assigned_1" type="radio" name="is_assigned" value="1">
                                                <label class="form-check-label" for="is_assigned_1">Assign now</label>
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-4 mt-2">
                                            <div class="form-check form-check-block">
                                                <input class="form-check-input task-assign" id="is_assigned_2" type="radio" name="is_assigned" value="2">
                                                <label class="form-check-label" for="is_assigned_2">Unassigned</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xxl-12 col-md-12 not_assign_div mt-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Select Queue <span class="text-danger">*</span></label>
                                                <select class="form-control select2" id="queue_id" name="queue_id">
                                                    <option value="">Select Queue</option>
                                                </select>
                                            </div>
                                        </div>
                                        <!-- <div class="col-xxl-12 col-md-12 assign_div mt-1 mb-3" style="display: none;">
                                            <div class="input-light multi-choice">
                                                <label class="form-label">Assign To <span class="text-danger">*</span></label>
                                                <select class="form-control" id="engineer_id" name="engineer_id">
                                                    <option value="">Select</option>
                                                </select>
                                            </div>
                                        </div> -->
                                    </div>

                                    <div class="row assign_div" style="display: none">
                                        <div class="col-xxl-12 col-md-12 mt-2 appointment_div" >
                                            <label for="labelInput" class="form-label me-3">Is Appointment Confirmed?</label>
                                            <div class="clearfix"></div>
                                            <div class="">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input is_appointment_confirmed" name="is_appointment_confirmed" type="radio" id="is_appointment_confirmed0" value="0" checked>
                                                    <label class="form-check-label" for="is_appointment_confirmed0">No</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input is_appointment_confirmed" name="is_appointment_confirmed" type="radio" id="is_appointment_confirmed1" value="1">
                                                    <label class="form-check-label" for="is_appointment_confirmed1">Yes</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xxl-6 col-md-6  mt-2 " >
                                            <div class="appointment_div">
                                                <label for="labelInput" class="form-label">Attend On Date <span class="text-danger">*</span></label>
                                                <input type="date" min="<?php echo date("Y-m-d"); ?>" class="form-control" id="appointment_date" name="appointment_date" required>
                                            </div>
                                        </div>
                                        <!--end col-->
                                        <div class="col-xxl-6 col-md-6  mt-2 " >
                                            <div class="appointment_div">
                                                <label for="labelInput" class="form-label">Attend On Time <span class="text-danger">*</span></label>
                                                <input type="time" class="form-control" id="appointment_time" name="appointment_time">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="assign_div row" style="display: none;">
                                        <div class="col-xxl-12 col-md-12 mt-2">
                                            <div class="input-light multi-choice">
                                                <label class="form-label">Assign To <span class="text-danger">*</span></label>
                                                <div class="d-flex input-group">
                                                    <select class="form-control" id="engineer_id" name="engineer_id">
                                                        <option value="">Select</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mt-2">
                                        <div class="col-xxl-6 col-md-6">
                                            <div class="form-check form-check-block">
                                                <input class="form-check-input add-tags" id="add-tags" type="checkbox">
                                                <label class="form-check-label" for="add-tags">Add Tags?</label>
                                            </div>
                                        </div>

                                        <div class="mt-2 col-xxl-12 col-md-12 create-tags-box mt-1 mb-3">
                                            <label class="form-label">Select Tags</label>
                                            <div class="d-flex">
                                                <select class="form-control" name="tags[]" id="tags" data-module="task" multiple>
                                                </select>
                                                <button type="button" class="btn btn-success ms-1 popup-form-button-master popup-add-btn" data-heading="Add New Tag" data-after-load-func="create_tag_form" data-element="tags" data-value="task" data-form-url="<?= cdn_url('system/tag/create?in_popup=1') ?>"><i class="ri-add-line align-bottom"></i></button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-xxl-6 col-md-6">
                                            <div class="form-check form-check-block">
                                                <input class="form-check-input remove-tags" id="remove-tags" type="checkbox">
                                                <label class="form-check-label" for="remove-tags">Remove Tags?</label>
                                            </div>
                                        </div>

                                        <div class="mt-2 col-xxl-12 col-md-12 remove-tags-box">
                                            <label class="form-label">Select Tags</label>
                                            <div class="d-flex">
                                                <select class="form-control" name="rtags[]" id="rtags" data-module="task" multiple>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="offcanvas-foorter p-4 text-center">
                <div class="hstack gap-2">
                    <button type="submit" class="btn btn-success" id="assign-tasks-btn">Assign Tasks</button>
                    <button type="button" class="btn btn-light" id="close-modal" data-bs-dismiss="offcanvas">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>