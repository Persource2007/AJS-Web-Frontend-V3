<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $title = "Uplifts";
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <?php
                            require_once APPPATH . 'views/clients/inc/nav-tab.php';
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active" id="uplifts" role="tabpanel">
                                <div class="card same-page-height">
                                    <div class="card-body pt-0">
                                        <form class="tablelist-form mt-1" autocomplete="off" id="upliftsForm" action="<?= app_url('client/' . $id . '/uplift'); ?>" method="post">
                                            <div class="row align-items-center letter-form">
                                                <div class="col-xxl-8 col-md-12"> <h5 class="mb-1">Uplifts</h5> </div>
                                                <div class="col-xxl-2 col-md-6">
                                                    <button type="button" class="add-uplift btn btn-success edit-btn"><i class="ri-add-line align-bottom me-1"></i> Add</button>
                                                </div>
                                                <hr class="mt-1 mb-3" />
                                            </div>
                                            <div id="uplift-section">
                                                <div class="uplift-row row gy-2 mb-3 align-items-center">
                                                    <input type="hidden" class="row-id" name="uplifts[0][id]" value="0" />
                                                    
                                                    <div class="col-xxl-2 col-md-3">
                                                        <div class="input-light">
                                                            <label class="form-label">Uplift Date <span class="text-danger">*</span></label>
                                                            <input type="date" class="form-control" name="uplifts[0][uplift_date]" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-2 col-md-3">
                                                        <div>
                                                            <label for="labelInput" class="form-label">Uplift Percentage <span class="text-danger">*</span></label>
                                                            <div class="form-icon">
                                                                <input name="uplifts[0][percentage]" type="number" class="form-control form-control-icon"  onKeyDown="if (this.value.length == 5 && event.keyCode != 8)
                                                                            return false;" required>
                                                                <i class="ri-percent-line" style="align-items: normal; top:10px"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-3 col-md-3">
                                                        <label class="form-label">&nbsp;</label><br />
                                                        <div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" name="uplifts[0][rate]" value="original" checked>
                                                                <label class="form-check-label" >On original rate</label>
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" name="uplifts[0][rate]"  value="current">
                                                                <label class="form-check-label" >On current rate</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-3 col-md-3 hide">
                                                        <label class="form-label">&nbsp;</label><br />
                                                        <button type="button" class="btn btn-danger delete-uplift popup-close-btn">
                                                            <i class="ri-close-line"></i>
                                                        </button>
                                                    </div>
                                                    <div class="col-xl-3 col-md-3 hide edit-btn">
                                                        <label class="form-label">&nbsp;</label><br />
                                                        <div data-id="0" class="change-status-btn form-check form-switch form-switch-md">
                                                            <input class="form-check-input" type="checkbox" role="switch" checked>
                                                        </div>
                                                    </div>
                                                    <!-- <div class="col-xxl-5 col-md text-end">
                                                        <button type="button" class="add-uplift btn btn-success mt-4"><i class="ri-add-line align-bottom me-1"></i> Add</button>
                                                    </div> -->
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-sm-12 text-end mt-4">
                                                <button type="submit" class="btn btn-success waves-effect waves-light btn-lg edit-btn">Save</button>
                                                <!-- <a class="btn btn-primary add-btn">Next</a> -->
                                            </div>
                                        </form>
                                        <h5 class="mb-1">Uplift Reminders</h5>
                                        <hr class="mt-1 mb-3" />
                                        <form class="tablelist-form mt-1" autocomplete="off" id="upliftReminderForm" action="<?= app_url('client/' . $id . '/uplift-reminder'); ?>" method="post">
                                            <div class="row align-items-center letter-form">
                                                <div class="col-xxl-8 col-md-12"> </div>
                                                <div class="col-xxl-2 col-md-6">
                                                    <button type="button" class="add-uplift-reminder btn btn-success mt-4 position-absolute edit-btn"><i class="ri-add-line align-bottom me-1"></i> Add</button>
                                                </div>
                                            </div>
                                            <div id="uplift-reminder-section">
                                                <div class="uplift-reminder-row row gy-2 mb-3 align-items-center">
                                                    <input type="hidden" class="row-id" name="uplift_reminders[0][id]" value="0" />
                                                    
                                                    <div class="col-xxl-2 col-md-3">
                                                        <div>
                                                            <label for="labelInput" class="form-label">Before Days <span class="text-danger">*</span></label>
                                                            <div class="form-icon">
                                                                <input name="uplift_reminders[0][day]" type="number" class="form-control number-only" max="90"   required>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-4 col-md-6">
                                                        <div>
                                                            <label for="labelInput" class="form-label">Emails <span class="text-danger">*</span></label>
                                                            <div class="form-icon">
                                                                <input name="uplift_reminders[0][emails]" type="text" class="form-control" placeholder="Enter multiple email addresses separated by commas." multiemail="true" required>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-1 col-md-1 hide">
                                                        <label class="form-label">&nbsp;</label><br />
                                                        <button type="button" class="btn btn-danger delete-uplift-reminder popup-close-btn edit-btn">
                                                            <i class="ri-close-line"></i>
                                                        </button>
                                                    </div>
                                                    <div class="clearfix"></div>
                                                    <div class="col-xxl-6 col-md-6">
                                                        <div>
                                                            <label for="labelInput" class="form-label">Subject <span class="text-danger">*</span></label>
                                                            <div class="form-icon">
                                                                <input name="uplift_reminders[0][subject]" type="text" class="form-control" placeholder="Enter the subject" required>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>
                                                    <div class="col-xxl-6 col-md-6">
                                                        <div>
                                                            <label for="labelInput" class="form-label">Content <span class="text-danger">*</span></label>
                                                            <div class="form-icon">
                                                                <textarea name="uplift_reminders[0][content]" class="reminder-content" placeholder="Enter the content" id="reminder_content_0" data-master-code="UPLIFT_REMINDER_FIELDS" required>
                                                                    Hello, {$client_code},<br/><br/>
                                                                    I hope you're doing well.<br/><br/>
                                                                    This is a gentle reminder regarding the upcoming rate uplift scheduled to take effect from {$uplift_date}, as per our agreement.<br/><br/>
                                                                    The uplift is in line with our terms and is reflective of annual cost adjustments.<br/><br/>
                                                                        Summary:<br/>
                                                                        Uplift Percentage:{$uplift_percentage} <br/>
                                                                        Uplift On:{$uplift_on}<br/>
                                                                        Effective From:{$uplift_date}<br/><br/>
                                                                        If you have any questions or would like to discuss this further, please don’t hesitate to reach out. We truly value our partnership and are committed to continuing to deliver high-quality service.<br/><br/>
                                                                        Thank you for your continued support.<br/><br/>
                                                                        
                                                                        Best regards,<br/>
                                                                        AJS Group Ltd.
                                                                </textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-sm-12 text-end mt-4">
                                                <button type="submit" class="btn btn-success waves-effect waves-light btn-lg edit-btn">Save</button>
                                            </div>
                                        </form>
                                    </div>
                                    <!--end card-body-->
                                </div>
                                <!--end card-->
                            </div>
                            <!--end tab-pane-->
                        </div>
                        <!--end tab-content-->
                    </div>
                </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
</div>
<input type="hidden" id="client_id" value="<?= $id ?>" />
<script type="text/javascript" src="<?= cdn_url('assets/js/ckeditor5.umd.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/app/ckeditor.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/clients/uplifts.js') ?>"></script>

<script type="text/javascript">
    $('.client-sub-nav').find('a[data-tab="uplifts"]').addClass('active');
</script>