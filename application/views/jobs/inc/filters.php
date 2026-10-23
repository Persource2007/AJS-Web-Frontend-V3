<form id="form_filters" class="card-body tablelist-form ps-0 pe-0 p-0" action="" method="GET">
    <div class="d-flex justify-content-between">
        <div>
            <div class="btn-group">
                <div class="search-box" style="width: 200px;">
                    <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search by Job Id / Client Order Number / Address">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 140px;">
                    <select class="form-control search" data-is-autocomplete="1" name="cp.client_id_filter" id="client_id_filter">
                        <option value="">All Clients</option>
                    </select>
                </div>
            </div>
            <!-- <div class="btn-group ms-1">
                <div class="input-light" style="width: 115px;">
                    <select class="form-control search" data-is-autocomplete="1" name="property_id_filter" id="property_id_filter">
                        <option value="">All Properties</option>
                    </select>
                </div>
            </div> -->
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 200px;">
                    <select class="form-control search" data-is-autocomplete="1" data-id-field="batch_code" name="ppm_batch_code_filter" id="ppm_batch_code_filter">
                        <option value="">PPM Batch</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 120px;">
                    <select class="form-control " name="j.status_id_filter" id="status_id_filter">
                        <option value="">All Status</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 140px;">
                    <select class="form-control custom-select2" name="j.financial_status_filter" id="financial_status_filter">
                        <option value="">Financial Status</option>
                        <option value="4">APP Buildup</option>
                        <option value="5">APP Pending</option>
                        <option value="3">APP Submitted</option>
                        <option value="2">Invoiced</option>
                        <option value="1">Clear to Invoice</option>
                        <option value="0">WIP</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 140px;">
                    <select class="form-control custom-select2" name="custom_filter" id="custom_filter">
                        <option value="" >Quick Filter</option>
                        <option value="completed_today">Completed Today</option>
                        <option value="emergency_job">Emergency Jobs</option>
                        <option value="overdue_task">Overdue Tasks</option>
                        <option value="require_allocation">Unallocated</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 100px;">
                    <select class="form-control"  name="mt.tag_id_filter" id="tag_id_filter" >
                        <option value="">All Tag</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <button class="btn btn-primary px-2 waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
            </div>
        </div>
        <div>
            <div class="btn-group ms-1">
                <button type="button" class="btn btn-outline-dark waves-effect waves-light dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="ri-save-3-line me-1 align-bottom"></i> Save
                </button>
                <div class="dropdown-menu dropdown-menu-md p-4">
                    <div class="mb-2">
                        <label class="form-label" for="search_preset_label">Label</label>
                        <input type="text" required class="form-control" id="search_preset_label" name="search_preset_label" placeholder="i.e. London Based Clients">
                    </div>
                    <div class="mb-2">
                        <div class="form-check custom-checkbox">

                            <label class="form-check-label" for="search_set_default">
                                <input id="search_set_default" name="search_set_default" value="1" type="checkbox" class="form-check-input" > Set as Default?
                            </label>
                        </div>
                    </div>
                    <button type="submit" id="save_search_preset" class="btn btn-success">Save</button>
                </div>
            </div>
            <div class="btn-group ms-1" id="search_preset_list_div">
                <button type="button" class="btn btn-outline-dark waves-effect waves-light dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="ri-search-line me-1 align-bottom"></i> My
                </button>
                <div class="dropdown-menu dropdown-menu-xl p-4">
                    <div data-simplebar style="max-height: 215px;">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <div class="d-flex align-items-center">
                                    <div class="flex-grow-1">
                                        <h6 class="fs-14 mb-0">No presets found</h6>
                                    </div>
                                    <div class="flex-shrink-0">
                                        &nbsp;
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="btn-group ms-1 hide" id="bulk_comm_btn_wrap">
                <button type="button" id="bulk_comm_btn" class="btn btn-info waves-effect waves-light check-permission" data-module="Jobs" data-action="edit">
                    <i class="ri-mail-send-line align-bottom"></i> Bulk Communication (<span id="bulk_comm_count">0</span>)
                </button>
            </div>
            <div class="btn-group ms-1">
                <button type="button" data-heading="Add New Job" data-after-load-func="create_job_form" data-form-url="<?= cdn_url('job/create?in_popup=1') ?>" class="popup-form-button btn btn-success new-job-btn waves-effect waves-light">
                    <i class="ri-add-line align-bottom"></i> Add
                </button>
            </div>
        </div>
    </div>     
</form>
<!-- <form id="importForm" class="card-body tablelist-form ps-0 pe-0 p-0 mt-2" enctype="multipart/form-data">
    <div class="d-flex justify-content-between">
        <div>
            <div class="btn-group">
                <div class="btn-group">
                    <input type="file" class="form-control mr-2" style="width: 200px;" name="excel_file" id="excel_file" accept=".xls,.xlsx" required>
                    <div class="input-light ms-2" style="width: 110px;">                        
                        <button type="submit" class="btn btn-primary import_jobs">Import Jobs</button>
                    </div>
                    <div class="input-light ms-2" style="width: 150px;">                        
                        <button type="submit" class="btn btn-info import_jobtasks">Import Job Tasks</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form> -->