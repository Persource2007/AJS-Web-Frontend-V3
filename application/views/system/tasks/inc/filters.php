<form id="form_filters" class="tablelist-form" action="" method="GET">
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
                    <select class="form-control search" name="task_type_filter" id="task_type_filter">
                        <option value="">Task Type</option>
                        <option value="I">Internal</option>
                        <option value="E">External</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <button class="btn btn-primary waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
            </div>
        </div>
        <div>
            <div class="btn-group">
                <button type="button" class="btn btn-outline-dark dropdown-toggle waves-effect waves-light" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="ri-save-3-line me-1 align-bottom"></i> Save
                </button>
                <div class="dropdown-menu dropdown-menu-md p-4">
                    <form action="" id="save_search_preset_form" name="save_search_preset_form" method="POST">
                        <div class="mb-2">
                            <label class="form-label" for="search_preset_label">Label</label>
                            <input type="text" required="required" class="form-control" id="search_preset_label" name="search_preset_label" placeholder="i.e. London Based Clients">
                        </div>
                        <div class="mb-2">
                            <div class="form-check custom-checkbox">

                                <label class="form-check-label" for="search_set_default">
                                    <input id="search_set_default" name="search_set_default" value="1" type="checkbox" class="form-check-input" > Set as Default?
                                </label>
                            </div>
                        </div>
                        <button type="submit" id="save_search_preset" class="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
            <div class="btn-group ms-1" id="search_preset_list_div">
                <button type="button" class="btn btn-outline-dark dropdown-toggle waves-effect waves-light" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
            <!--<button type="button" class="btn btn-primary" id="export_button">Export</button>-->
            <button type="button" data-heading="Add Task" data-after-load-func="create_form" data-form-url="<?= cdn_url('system/task/create?in_popup=1') ?>" class="ms-1 popup-form-button btn btn-success add-btn waves-effect waves-light">
                <i class="ri-add-line align-bottom me-1"></i> Add
            </button>
        </div>
    </div>
</form>
<div class="col-xxl-5 col-xl-5 col-lg-5 col-md-12 text-end right-filter">



</div>
