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
                        <h4 class="mb-sm-0"></h4>
                        <div class="page-title-right">
                        </div>
                    </div>
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
                <?php
                $action = app_url('cron/edit');
                $method = 'POST';
                ?>
                <form class="tablelist-form pb-4 simplebar-form" action="<?= $action ?>" method="<?= $method ?>" id="settingForm" style="height: calc(100vh - 112px);" data-simplebar autocomplete="off">
                    <input type="hidden" id="edit_id" name="edit_id" value="<?= $id ?? null ?>" />
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4 pt-2">
                                <div class="modal-body pb-3">
                                    <div class="row gy-2">
                                        <div class="col-xxl-12 col-md-12">
                                            <div>
                                                <label for="command" class="form-label">Command</label>
                                                <input type="text" class="form-control" id="command" name="command" readonly disabled>
                                            </div>
                                        </div>
                                        <div class="col-xxl-12 col-md-12">
                                            <div>
                                                <label for="schedule" class="form-label">Schedule <span class="text-danger">*</span></label>
                                                <select class="form-control" id="schedule" name="schedule">
                                                    <option value="">Select Schedule</option>
                                                    <option value="every_minute">Every Minute</option>
                                                    <option value="every5min">Every 5 Minutes</option>
                                                    <option value="every15min">Every 15 Minutes</option>
                                                    <option value="every30min">Every 30 Minutes</option>
                                                    <option value="every_hour">Every Hour</option>
                                                    <option value="every3hours">Every 3 Hours</option>
                                                    <option value="every8hours">Every 8 Hours</option>
                                                    <option value="daily">Daily</option>
                                                    <option value="every2days">Every 2 Days</option>
                                                    <option value="every3days">Every 3 Days</option>
                                                    <option value="weekly">Weekly</option>
                                                    <option value="every10days">Every 10 Days</option>
                                                    <option value="every15days">Every 15 Days</option>
                                                    <option value="monthly">Monthly</option>
                                                    <option value="every6months">Every 6 Months</option>
                                                    <option value="yearly">Yearly</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xxl-12 col-md-12">
                                            <div>
                                                <label for="specific_time" class="form-label">Specific Time</label>
                                                <input type="time" class="form-control" id="specific_time" name="specific_time">
                                                <small class="text-muted">Optional. Time of day the job should run (your local time). Leave blank for interval-based schedules.</small>
                                            </div>
                                        </div>
                                    </div>
                                    <!--end row-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="offcanvas-foorter p-4 text-center">
                        <div class="hstack gap-2">
                            <button type="submit" class="btn btn-success waves-effect waves-light" id="edit-btn">Save</button>
                            <button type="button" class="btn btn-light waves-effect waves-light close-offcanvas" id="close-modal">Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- container-fluid -->
    </div>
</div>

<!-- End Page-content -->