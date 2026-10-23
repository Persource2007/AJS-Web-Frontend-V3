<!-- <div class="row scheduler-update-div" style="display: none">
    <div class="col-xxl-12">
        <div class="card border card-border-warning card-custom-ajs mb-0">
            <div class="card-header pb-2">
                <div class="row">
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12">
                        <h5 class="card-title mb-2">Auto-Scheduler Update</h5>
                    </div>
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12">
                        <div class="text-end">
                            <a href="<?= base_url('system/logs/ppm-logs') ?>" target="_BLANK" class="link-warning link-custom  fw-medium">View Logs <i class="ri-arrow-right-line align-middle"></i></a>
                        </div>
                    </div>
                    <div class="col-xxl-12 mt-2">
                        <ul class="mb-0 master-plan-listed">
                            <li><b class="card-text mb-3">Last Execution Date:</b> &nbsp;&nbsp;<span class="schedule-execute-date align-middle fs-13 master-plan-details">28-11-2024</span></li>
                            <li><b>Batch Code:</b>&nbsp;&nbsp; <span class="schedule-batch-code align-middle fs-13 master-plan-details">PPM000001</span> </li>
                            <li><b>Scheduled Period:</b>&nbsp;&nbsp; <span class="schedule-start-date align-middle fs-13 master-plan-details">28-11-2024</span> &nbsp;<b>-</b>&nbsp; <span class="schedule-end-date master-plan-details align-middle fs-13">28-11-2024</span></li>
                            <li><b>Jobs Generated:</b>&nbsp;&nbsp; <span class="schedule-jobs-count align-middle fs-13 master-plan-details">5</span></li>
                            <li><a href="<?= base_url('job/list') ?>" target="_BLANK" class="link-warning link-custom  fw-medium view-batch-jobs">View Jobs </a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> -->
<div class="row">
    <div class="col-sm-12">
    <form method="POST" action="" data-upload-type="contract_masterplan" data-file-type="excel" class="bulk-upload-form ps-3 pe-3 pt-0 pb-0" enctype="multipart/form-data" style="padding-top: 10px !important;">
        <div class="row align-items-end">
            <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12">
                <h5 class="card-title mb-0 flex-grow-1">PPM Master Plan</h5>
            </div>

            <!-- <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12 text-end">
                <button type="button" class="btn btn-primary waves-effect waves-light" id="queue_masterplan"><i class="las la-briefcase"></i> Generate Job Queue</button>
                <button type="button" class="btn btn-secondary waves-effect waves-light export-btn ms-1" id="export_contract_masterplan"><i class="las la-file-pdf"></i> Export</button>
            </div> -->
        </div>
        <div class="row">
            <div class="col-sm-12 mt-2">
                <div class="row">
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12">
                        <div class="input-light radio-btn-tab">
                            <div>
                                <div class="form-check form-check-inline">
                                    <input checked class="form-check-input schedule_setup" type="radio" name="schedule_setup" id="schedule_setupT" value="T">
                                    <label class="form-check-label" for="schedule_setupT">Upload Template</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input schedule_setup" type="radio" name="schedule_setup" id="schedule_setupM" value="M">
                                    <label class="form-check-label" for="schedule_setupM">Manual Setup</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12 text-end">
                         <button type="button" class="btn btn-secondary save-masterplan-btn mb-1" style="display: none;"><i class="ri-file-download-line align-bottom"></i> Generate Schedule</button>
                    </div>
                </div>
            </div>    
            <div class="col-sm-12">
                <div class="mp-upload-div ppm-body mb-0">
                    <div class="row">
                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12">                        
                            <div class="hstack gap-2">
                                <div class="input-group custom-file-button">
                                    <input required="true" autocomplete="off" name="upload" id="upload" type="file" class="form-control" >
                                    <label class="input-group-text mb-0" for="bulk_upload">Browse</label>
                                </div>
                                <button type="submit" class="btn btn-secondary w-25"><i class="ri-upload-cloud-2-line me-1 align-bottom"></i> Upload</button>
                                <a class="btn btn-outline-dark waves-effect waves-light w-25" href="<?= app_url('resources/templates/contract-masterplan.xlsx'); ?>" download><i class="ri-file-download-line me-1 align-bottom"></i> Template </a>
                            </div>
                            <p class="mb-0 pt-2">Tip: Upload excel with property list, and service schedule.</p>                        
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="clearfix"></div>
                <!-- <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 mp-manual-div" style="display:none">
                    <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 text-end ">
                        <button type="button" class="btn btn-success add-masterplan-row-btn waves-effect waves-light" ><i class="ri-add-line align-bottom me-1"></i> Add</button>

                    </div>
                </div> -->
            </div>    
        </div>
    </form>
    </div>
</div>
