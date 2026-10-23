<div class="main-content">
    <div class="container-fluid">
        <!-- start page title -->
        <div class="row">
        </div>
        <div class="row">
            <form class="tablelist-form pb-4 simplebar-form " action="<?= app_url('job-task/force-reassign/' . $task_id) ?>" data-simplebar autocomplete="off" id="reassign-task-form" method="post">
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
                                            <label class="form-label"><strong>Note:- If you reassign task then will be transferred all sors, asset and certificate to another engineer.</strong> </label>
                                        </div>
                                        <div class="col-xxl-12 col-md-12 mt-2">
                                            <div>
                                                <label class="form-label">Reason <span class="text-danger">*</span></label>
                                                <div class="d-flex input-group">
                                                    <textarea name="cancellation_reason" autocapitalize="off" placeholder="Enter the reason for reassign" class="form-control" spellcheck="false"  required></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xxl-12 col-md-12 mt-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Assignment Type <span class="text-danger">*</span></label>
                                                <select class="form-control select2" id="preferred_time_range" name="preferred_time_range" required>
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
                                    </div>
                                    <div class="row">
                                        <div class="col-xxl-12 col-md-12 not_assign_div mt-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Queue <span class="text-danger">*</span></label>
                                                <select class="form-control select2" id="queue_id" name="queue_id">
                                                    <option value="">Select</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row assign_div" style="display: none">
                                        <div class="col-xxl-12 col-md-12 mt-2 appointment_div">
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
                                        <div class="col-xxl-6 col-md-6  mt-2 ">
                                            <div class="appointment_div">
                                                <label for="labelInput" class="form-label">Attend On Date <span class="text-danger">*</span></label>
                                                <input type="date" min="<?php echo date("Y-m-d"); ?>" class="form-control" id="appointment_date" name="appointment_date">
                                            </div>
                                        </div>
                                        <!--end col-->
                                        <div class="col-xxl-6 col-md-6  mt-2 ">
                                            <div class="appointment_div">
                                                <label for="labelInput" class="form-label">Attend On Time <span class="text-danger">*</span></label>
                                                <input type="time" class="form-control" id="appointment_time" name="appointment_time">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="assign_div row" style="display: none;">
                                        <div class="col-xxl-6 col-md-6 mt-2">
                                            <div class="preferred_date_div">
                                                <label for="labelInput" class="form-label">Target Date <span class="text-danger">*</span></label>
                                                <input type="date" min="<?php echo date("Y-m-d"); ?>" class="form-control" id="preferred_date" name="preferred_date">
                                            </div>
                                        </div>
                                        <!--end col-->
                                        <div class="col-xxl-6 col-md-6 mt-2" >
                                            <div class="preferred_date_div">
                                                <label for="labelInput" class="form-label">Target Time <span class="text-danger">*</span></label>
                                                <input type="time" class="form-control" id="preferred_time" name="preferred_time">
                                            </div>
                                        </div>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="offcanvas-foorter p-4 text-center">
                    <div class="hstack gap-2">
                        <button type="submit" class="btn btn-success waves-effect waves-light">Reassign</button>
                        <button type="button" class="btn btn-light" id="close-modal" data-bs-dismiss="offcanvas">Close</button>
                    </div>
                </div>
            </form>
            <input type="hidden" id="hidden_engr_id" value="<?= $engr_id ?>">
            <input type="hidden" id="element_id" value="">
        </div>
    </div>
</div>