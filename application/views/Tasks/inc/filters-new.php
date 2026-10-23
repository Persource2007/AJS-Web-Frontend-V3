<form id="form_filters" class="card-body tablelist-form p-0" action="" method="GET">
    <div class="d-flex justify-content-between">
        <div>
            <div class="btn-group me-1 mb-2">
                <div class="search-box" style="width: 180px;">
                    <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group me-1 mb-2">
                <div class="input-light" style="width: 140px;">
                    <select class="form-control" name="job_tasks.engineer_id_filter" id="engineer_id_filter">
                        <option value="">All Engineers</option>
                    </select>
                </div>
            </div>
            <div class="btn-group me-1 mb-2">
                <div class="input-light" style="width: 140px;">
                    <select class="form-control" data-is-autocomplete="1"  name="client_properties.client_id_filter" id="client_id_filter">
                        <option value="">All Clients</option>
                    </select>
                </div>
            </div>
            <div class="btn-group me-1 mb-2">
                <div class="input-light" style="width: 130px;">
                    <select class="form-control" data-is-autocomplete="1"  name="jobs.contract_id_filter" id="contract_id_filter">
                        <option value="">All Contracts</option>
                    </select>
                </div>
            </div>
            
            <div class="btn-group me-1 mb-2">
                <div class="input-light" style="width: 140px;">
                    <select class="form-control search" name="custom_filter" id="custom_filter">
                        <option value="">Quick Filter</option>
                        <option value="require_allocation">Unallocated</option>
                        <option value="completed_today">Completed Today</option>
                        <option value="emergency_job">Emergency Jobs</option>
                        <option value="overdue_task">Overdue Tasks</option>
                    </select>
                </div>
            </div>
            <div class="btn-group me-1 mb-2">
                <div class="input-light" style="width: 120px;">
                    <select class="form-control search" name="job_tasks.queue_id" id="queue_filter">
                        <option value="">All Queues</option>
                    </select>
                </div>
            </div>
            <div class="btn-group me-1 mb-2">
                <div class="input-light" style="width: 180px;">
                    <input  placeholder="MM/DD/YYYY - MM/DD/YYYY" type="text" class="form-control" data-provider="flatpickr" data-date-format="m/d/Y" data-range-date="true"  id="from_to_dates" name="job_tasks.between_add_date">
                </div>
            </div>
            <div class="btn-group me-1 mb-2">
                <div class="input-light" style="width: 180px;">
                    <select class="form-control search" name="job_tasks.status_id" id="status_id_filter" multiple="multiple" data-placeholder="All Status">
                    </select>
                </div>
            </div>
            <div class="btn-group mb-2">
                <button class="btn btn-primary px-2 waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
            </div>
        </div>
        <div>
            <div class="hstack gap-1 justify-content-end">
                <div class="btn-group ms-auto">
                    <button type="button" class="btn btn-outline-dark waves-effect waves-light dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="ri-save-3-line me-1 align-bottom"></i> Save
                    </button>
                    <div class="dropdown-menu dropdown-menu-md p-4">
                        <div class="">
                            <label class="form-label" for="search_preset_label">Label</label>
                            <input type="text" required class="form-control" id="search_preset_label" name="search_preset_label" placeholder="i.e. London Based Clients">
                        </div>
                        <div class="">
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
            </div>
        </div>
    </div>
</form>
