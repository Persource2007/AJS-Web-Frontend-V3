<form id="form_filters" class="card-body tablelist-form p-0" action="" method="GET">
    <div class="d-flex justify-content-between">
        <div>
            <div class="btn-group">
                <div class="search-box" style="width: 250px;">
                    <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control search" data-is-autocomplete="1"  name="client_properties.client_id_filter" id="client_id_filter">
                        <option value="">All Clients</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 130px;">
                    <select class="form-control search" data-is-autocomplete="1"  name="property_id_filter" id="property_id_filter">
                        <option value="">All Properties</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control search" data-is-autocomplete="1"  data-id-field="batch_code" name="jobs.ppm_batch_code_filter" id="ppm_batch_code_filter">
                        <option value="">PPM Batch</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 120px;">
                    <select class="form-control search" name="jobs.status_id_filter" id="status_id_filter">
                        <option value="">All Status</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control search" name="custom_filter" id="custom_filter">
                        <option value="">Job Type</option>
                        <option value="require_allocation">Unallocated</option>
                        <option value="completed_today">Completed Today</option>
                        <option value="emergency_job">Emergency Jobs</option>
                        <option value="overdue_task">Overdue Tasks</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <button class="btn btn-primary px-2 waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
            </div>
        </div>
        <div>
            <div class="btn-group ms-auto">
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
        </div>
    </div>
</form>
