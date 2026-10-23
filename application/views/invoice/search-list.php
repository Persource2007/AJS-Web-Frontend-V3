<div class="card-body border-0 border-dashed border-end-0 border-start-0 mb-4">
<form id="search-filter-form" class="card-body tablelist-form ps-0 pe-0" action="" method="GET" style="padding-top: 15px !important;">


    <div class="d-flex justify-content-between">
        <div>
            <h5 class="form-label batch_number_label"></h5> 
            <div>
            <div class="btn-group mb-2 me-1">
                <div class="search-box" style="width: 250px;">
                    <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search by Job Id, Job or Address">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group mb-2 me-1">
                <div class="input-light" style="width: 140px;">
                    <input type="text" id="client_name" name="client_name" class="form-control search" disabled="disabled" value="">
                    <input type="hidden" id="client_id" name="jobs.client_id" value="">
                </div><span class="text-danger">*</span>
            </div>
            <div class="btn-group mb-2 me-1">
                <div class="input-light" style="width: 115px;">
                    <input type="text" id="contract_name" name="contract_name" class="form-control search" disabled="disabled" value="">
                    <input type="hidden" id="contract_id" name="jobs.contract_id" value="">
                </div><span class="text-danger">*</span>    
            </div>
            <div class="btn-group mb-2 me-1">
                <div class="input-light" style="width: 160px;">
                    <select class="form-control search" name="services.workstream_id" id="job_workstream_id">
                        <option value="">Select Workstream</option>
                    </select>
                </div>    
            </div>
            <div class="btn-group mb-2 me-1">
                <div class="input-light" style="width: 140px;">
                    <select class="form-control custom-select2" name="custom" id="custom">
                        <option value="" >Job Type</option>
                        <option value="require_allocation">Unallocated</option>
                        <option value="completed_today">Completed Today</option>
                        <option value="emergency_job">Emergency Jobs</option>
                        <option value="overdue_task">Overdue Tasks</option>
                    </select>
                </div>
            </div>
            <div class="btn-group mb-2 me-1">
                <div class="search-box" style="width: 150px;">
                    <input type="date" id="completed_date" name="jobs.completed_date" class="form-control search" placeholder="By Completed Date">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group mb-2 me-1">
                <button class="btn w-100 btn-primary" id="search-btn"><i class="mdi mdi-magnify search-widget-icon me-1"></i></button>
            </div>
        </div>
    </div>


<!-- <div class="row g-2">
        <div class="col-xxl-4 col-sm-3">
            <div class="search-box">
                <input type="text" id="search" name="search" class="form-control search" placeholder="Search by JobId, Job, Property">
                <i class="mdi mdi-magnify search-widget-icon"></i>
            </div>
        </div>
        <div class="col-xxl-1 col-sm-2 text-end">
            <button class="btn w-100 btn-primary" id="search-btn"><i class="mdi mdi-magnify search-widget-icon me-1"></i></button>
        </div>
    </div> -->
</form>
</div>
<div class="table-responsive">
    <input type="hidden" id="hidden_client_id" name="hidden_client_id">
    <input type="hidden" id="hidden_contract_id" name="hidden_contract_id">
    <table id="search-datatables" class="display table dt-responsive align-middle table-nowrap mb-0 w-100">
        <thead class="table-light text-muted">
            <tr>
                <tr>
                    <th><input class="form-check-input approve-btn approve-batch allselect" type="checkbox"/></th>
                    <th></th>
                    <th>Job Id.</th>
                    <th>Job</th>
                    <th>Client</th>
                    <th>Property</th>
                    <th>Contract</th>
                    <th>Workstream</th>
                    <th>Address</th>
                    <th>Postcode</th>
                    <th>Target</th>
                    <th>Completed Date</th>
                </tr>
            </tr>
        </thead>
    </table>
</div>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/search-list/invoice-jobs.js') ?>"></script>