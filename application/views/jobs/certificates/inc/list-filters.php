<form id="form_filters" action="" method="GET">
    <div class="d-flex justify-content-between">
        <div>
            <div class="btn-group me-1">
                <div class="search-box" style="width: 250px;">
                    <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search by Task Code / Certificate">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group me-1">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control " data-is-autocomplete="1" name="jobs.client_id_filter" id="client_id_filter">
                        <option value="">All Clients</option>
                    </select>
                </div>
            </div>
            <div class="btn-group me-1">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control " data-is-autocomplete="1" name="jobs.property_id_filter" id="property_id_filter">
                        <option value="">All Properties</option>
                    </select>
                </div>
            </div>
            <div class="btn-group me-1">
                <div class="input-light" style="width: 180px;">
                    <select class="form-control" name="certificate_master.department_id" id="department_id_filter">
                        <option value="">Departments</option>
                    </select>
                </div>
            </div>
            <div class="btn-group me-1">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control" name="certificate_master.is_required_review" id="is_required_review_filter">
                        <option value="">All</option>
                        <option value="1" selected>Pending Approval</option>
                        <option value="0">Auto Approved</option>
                    </select>
                </div>
            </div>
            <div class="btn-group me-1">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control search" name="job_tasks.engineer_id" id="engineers_filter">
                        <option value="">All Engineers</option>
                    </select>
                </div>
            </div>
            <div class="btn-group me-1">
                <div class="input-light" style="width: 180px;">
                    <select class="form-control" name="cd.status_filter" id="status_filter">
                        <option value="">All Status</option>
                        <option value="0">Pending</option>
                        <option value="1">Completed</option>
                        <option value="2">Rejected</option>
                        <option value="3">Update and approved</option>
                        <option value="4">Approved</option>
                        <option value="5">Previous Data</option>
                        <option value="6">Uploaded</option>
                        <option value="7">Upload Failed</option>
                    </select>
                </div>
            </div>
            <div class="btn-group me-1">
                <div class="input-light" style="width: 200px;">
                    <input  placeholder="MM/DD/YYYY - MM/DD/YYYY" type="text" class="form-control" data-provider="flatpickr" data-date-format="m/d/Y" data-range-date="true"  id="from_to_dates" name="job_tasks.between_completed_date">
                </div>
            </div>
            <div class="btn-group me-1">
                <button class="btn btn-primary  waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
            </div>
        </div>
    </div>
</form>
