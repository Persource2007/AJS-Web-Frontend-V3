<div class="filter-box-con">
<div class="row align-items-center">
    <div class="col-xxl-8 col-xl-7 col-lg-6">
        <div class="mb-0 nav nav-pills">
            <div class="hstack gap-2">                
                <div class="filter-box-tab queue">
                    <fieldset>
                        <legend>Queues</legend>
                        <div class="hstack gap-2">
                            <div>
                                <div class="mb-0 queuesbox">
                                    <div class="input-light">
                                        <select class="form-control" multiple="multiple" name="multi-queue" id="multi-queue"></select>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <div class="mb-0 engineersbox">
                                    <div class="input-light">
                                        <select class="form-control" multiple="multiple" name="multi-engineer" id="multi-engineer"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="mt-3">Or</div>
                <div class="filter-box-tab engineer">
                    <fieldset>
                        <legend>Client Tasks</legend>
                        <form id="form_filters" class="card-body tablelist-form p-0" action="" method="GET">
                            <div class="hstack gap-2">
                                <div class="" style="width: 110px;">
                                    <div class="mbsc-grid mbsc-no-padding p-0 lg-dm">
                                        <select class="form-control" name="client_id" id="client_id_filter">
                                            <option value="" selected>Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="" style="width: 110px;">
                                    <div class="mbsc-grid mbsc-no-padding p-0 lg-dm">
                                        <select class="form-control" name="contract_id" id="contract_id_filter">
                                            <option value="" selected>Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="" style="width: 110px;">
                                    <div class="mbsc-grid mbsc-no-padding p-0 lg-dm">
                                        <select class="form-control" name="services_id" id="services_id_filter" multiple>
                                            <option value="" selected>Select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="" style="width: 110px;">
                                    <div class="mbsc-grid mbsc-no-padding p-0 lg-dm">
                                        <select class="form-control" name="engineers_id" id="engineers_id_filter" multiple>
                                            <option value="" selected>Select</option>
                                        </select>
                                    </div>
                                </div>
                                    <div class="" style="width: 45px;">
                                    <button class="btn btn-primary add-btn" id="apply-filters" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                                </div>

                                <!-- Search Start -->
                                <div class="btn-group ms-1">
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
                                <!-- Search End -->
                            </div>
                        </form>
                    </fieldset>
                </div>
                <button class="btn btn-outline-dark mt-2" id="reset_filters" style="z-index: 10;">Reset</button>
            </div>
        </div>
    </div>
    <div class="col-xxl-4 col-xl-5 col-lg-6 m-0 right-filter">
        <div class="mb-0 mt-2">
            <div class="hstack gap-2 justify-content-end">
                <div>
                    <button type="button" data-heading="Block Eng." id="block-engg-slot" class="btn btn-info waves-effect waves-light">
                        <i class="ri-add-line align-bottom me-1"></i> Block Eng.
                    </button>
                </div>
                <div>
                    <button type="button" data-heading="Add New Job" data-after-load-func="create_job_form" data-form-url="<?= cdn_url('job/create?in_popup=1') ?>" class="popup-form-button btn btn-success add-btn waves-effect waves-light">
                        <i class="ri-add-line align-bottom me-1"></i> Add Job
                    </button>
                </div>
            </div>

        </div>
    </div>
</div>
<div class="tab-content tab-filter-box">
    <div class="tab-pane active show" id="queuesTab" style="opacity:0;">
        <div id="display-filters" class="col-md-12">
            <div class="scheduler-filter d-flex">
                <div class="queues"></div>
                <div class="engineers"></div>
            </div>
        </div>
    </div>
</div>
</div>