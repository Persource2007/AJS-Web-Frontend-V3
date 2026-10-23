<form id="form_filters" action="" method="GET">
    <div class="d-flex justify-content-between">
        <div>
            <div class="btn-group me-1 mb-2">
                <div class="search-box" style="width: 250px;">
                    <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group me-1 mb-2">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control search" name="client" id="client_id_filter">
                        <option value="">All Clients</option>
                    </select>
                </div>
            </div>
            <div class="btn-group me-1 mb-2">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control search" name="property" id="property_filter">
                        <option value="">All Properties</option>
                    </select>
                </div>
            </div>
            <div class="btn-group me-1 mb-2">
                <div class="input-light" style="width: 180px;">
                    <select class="form-control search" name="task_code_filter" id="task_code_filter">
                        <option value="">All Communications</option>
                        <option value="LETTERCOMM">Letter Communication</option>
                        <option value="EMAILCOMM">Email Communication</option>
                        <option value="SMSCOMM">SMS Communication</option>
                        <option value="CALLCOMM">Call Communication</option>
                    </select>
                </div>
            </div>
            <div class="btn-group me-1 mb-2">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control search" name="status" id="task_status_filter">
                        <option value="">All Statuses</option>
                    </select>
                </div>
            </div>
            <div class="btn-group me-1 mb-2">
                <div class="input-light" style="width: 180px;">
                <select id="processed_filters" name="processed" class="form-control search">
                    <option value="">All</option>
                    <option value="0">Unprocessed</option>
                    <option value="1">Processed</option>
                </select>
                </div>
            </div>
            <!-- <div class="btn-group me-1 mb-2">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control search" name="job_status" id="job_status_filter">
                        <option value="">All Status</option>
                        <option value="2">Assigned Tasks</option>
                        <option value="1">Not-assigned Tasks</option>
                        <option value="3">In-Queue</option>
                    </select>
                </div>
            </div> -->
            
            <!-- <div class="btn-group me-1 mb-2">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control search" name="postcode" id="job_postcode_filter">
                        <option value="">All Postalcodes</option>
                    </select>
                </div>
            </div> 
            
            <div class="btn-group me-1 mb-2">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control search" name="engineers" id="engineers_filter">
                        <option value="">All Engineers</option>
                    </select>
                </div>
            </div>
            <div class="btn-group me-1 mb-2">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control search" name="queue" id="queue_filter">
                        <option value="">All Queues</option>
                    </select>
                </div>
            </div>-->
            <div class="btn-group me-1 mb-2">
                <button class="btn btn-primary px-2 waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
            </div>
            <!-- <div class="btn-group me-1 mb-2">
                <button id="btn btn_clear_filters" class="btn btn-outline-secondary">Clear</button>
            </div> -->
        </div>
        <div>
            <div class="hstack gap-1 justify-content-end">
                <div class="btn-group ms-auto">
                    <button type="button" class="btn btn-outline-dark waves-effect waves-light dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="ri-save-3-line me-1 align-bottom"></i> Save
                    </button>
                    <div class="dropdown-menu dropdown-menu-md p-4">
                        <form action="" method="POST">
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
                        </form>
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
                <div class="btn-group ms-1">
                    <button type="button" class="btn btn-outline-dark waves-effect waves-light check-permission" data-module="Communication" data-action="export" id="communications-export-btn">
                        <i class="ri-file-pdf-2-line me-1 align-bottom"></i> Export PDF
                    </button>
                </div>
                <!-- Perform Batch hidden for now — restore this block (and the `select`
                     column in assets/js/datatables/jobs/batch-printing.js) to bring it back.
                <div class="btn-group ms-1" id="">
                    <a href="javascript:void(0);" data-heading="Perform Batch" class="btn btn-success btn-print-letters">
                        <i class='ri-checkbox-circle-line'></i>&nbsp;Perform&nbsp;Batch
                    </a>
                </div>
                -->
            </div>
        </div>
    </div>
</form>
