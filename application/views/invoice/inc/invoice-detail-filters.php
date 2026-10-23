<form id="form_filters" class="card-body tablelist-form p-0 ps-0 pe-0" action="" method="GET">
    <div class="d-flex justify-content-between">
        <div>
            <h5 class="form-label batch_number_label"></h5> 
            <div>
            <div class="btn-group mb-2 me-1">
                <div class="search-box" style="width: 300px;">
                    <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search by Job Id, Job or Address">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group mb-2 me-1">
                <div class="input-light" style="width: 140px;">
                    <input type="text" id="client_name" name="client_name" class="form-control search" disabled="disabled" value="">
                    <input type="hidden" id="client_id_filter" name="jobs.client_id_filter" value="">
                </div><span class="text-danger">*</span>
            </div>
            <!-- <div class="btn-group mb-2 me-1">
                <div class="input-light" style="width: 115px;">
                    <select class="form-control search" data-is-autocomplete="1" name="property_id_filter" id="property_id_filter">
                        <option value="">All Properties</option>
                    </select>
                </div>
            </div> -->
            <div class="btn-group mb-2 me-1">
                <div class="input-light" style="width: 115px;">
                    <input type="text" id="contract_name" name="contract_name" class="form-control search" disabled="disabled" value="">
                    <input type="hidden" id="contract_id_filter" name="jobs.contract_id_filter" value="">
                </div><span class="text-danger">*</span>    
            </div>
            <div class="btn-group mb-2 me-1">
                <div class="input-light" style="width: 200px;">
                    <select class="form-control search" data-is-autocomplete="1" name="services.workstream_id_filter" id="workstream_id_filter">
                        <option value="">Select Workstream</option>
                    </select>
                </div>    
            </div>
            <div class="btn-group mb-2 me-1">
                <div class="input-light" style="width: 140px;">
                    <select class="form-control custom-select2" name="custom_filter" id="custom_filter">
                        <option value="" >Job Type</option>
                        <option value="require_allocation">Unallocated</option>
                        <option value="completed_today">Completed Today</option>
                        <option value="emergency_job">Emergency Jobs</option>
                        <option value="overdue_task">Overdue Tasks</option>
                    </select>
                </div>
            </div>
            <div class="btn-group mb-2 me-1">
                <div class="search-box" style="width: 250px;">
                    <input type="date" id="completed_date_filter" name="jobs.completed_date_filter" class="form-control search" placeholder="By Completed Date">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group me-1" style="top: -4px;">
                <button class="btn btn-primary px-2 waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
            </div>
        </div>
        </div>
    
        <?php /* Add New Job to Batch hidden — batch membership is managed from the Job Process screen.
        <div class="hstack gap-1 justify-content-end add_jobs_to_batch hide">
            <div class="btn-group ms-1" id="">
                <input type="hidden" id="last_id" name="last_id" value="">
                <button type="button" class="btn btn-success ms-auto popup-form-search-button edit-btn" data-module="invoice" data-element="add_jobto_batch" data-heading="Search Invoice Jobs" data-element="job_id" data-form-url="<?= base_url('invoice/jobs/search-list') ?>" id="add_new_jobto_invoice" data-invoice_id="" >Add New Job to Batch</button>
            </div>
        </div>
        */ ?>
    </div>
</form>
