<div class="row">
    <div class="col-sm-12">
<form  method="POST" action="" data-upload-type="contract_masterplan" data-file-type="excel" class="bulk-upload-form ps-3 pe-3 pt-0 pb-0" enctype="multipart/form-data" style="padding-top: 10px !important;">
    <div class="row align-items-end">
        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
            <h5 class="card-title mb-0">PPM Master Plan</h5>
        </div>
        <!-- <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 text-end">
            <button type="button" class="schedule_setup btn btn-success waves-effect waves-light" value="M" id="schedule_setup"><i class="ri-add-line align-bottom me-1"></i>Create Master Plan</button>
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
                                <label class="input-group-text mb-0" for="upload">Browse</label>
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
</div


