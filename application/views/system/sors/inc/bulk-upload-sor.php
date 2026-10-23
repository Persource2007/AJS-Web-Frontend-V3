<div class="tablelist-form">
    <div class="d-flex justify-content-between">
        <div>
            <form id="form_filters" class="tablelist-form" action="" method="GET">
                <div class="btn-group">
                    <div class="search-box" style="width: 250px;">
                        <input type="text" id="search_term" name="search_term" class="form-control" placeholder="Search by Title / Code / Contract Number / Type">
                        <i class="mdi mdi-magnify search-widget-icon"></i>
                    </div>
                </div>
                <div class="btn-group ms-1">
                    <div class="input-light" style="width: 160px;">
                        <select class="form-control" name="sor_type_filter" id="sor_type_filter">
                            <option value="">Type</option>
                        </select>
                    </div>
                </div>
                <div class="btn-group ms-1">
                    <div class="input-light" style="width: 160px;">
                        <select class="form-control" data-is-autocomplete="1" name="sors.client_id_filter" id="client_id_filter">
                            <option value="">Clients</option>
                        </select>
                    </div>
                </div>
                <div class="btn-group ms-1">
                    <div class="input-light" style="width: 160px;">
                        <select class="form-control" name="sors.workstream_id" id="workstream_id_filter">
                            <option value="">Workstreams</option>
                        </select>
                    </div>
                </div>
                <!-- <div class="btn-group ms-1">
                    <div class="input-light" style="width: 200px;">
                        <div class="input-light">
                            <input type="text" value="" placeholder="Date Range" name="date_range_add_date" id="date_range_add_date" class="form-control date-range-picker" />
                        </div>
                    </div>
                </div> -->
                <div class="btn-group ms-1">
                    <button class="btn btn-primary" id="search_grid"  style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                </div>
            </form>
        </div>
        <div>
            <div class="btn-group">
                <button type="button" class="btn btn-outline-dark dropdown-toggle waves-effect waves-light" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="ri-save-3-line me-1 align-bottom"></i> Save
                </button>
                <div class="dropdown-menu dropdown-menu-md p-4">
                    <form action="" method="POST" >
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
            <div class="btn-group ms-1 hide" id="map_sors_hidden">
                <a href="javascript:void(0);" data-heading="Map SORs" data-after-load-func="map_sors_to_contracts" data-form-url="<?= base_url('sor/map-sors') ?>" class="popup-form-button asign-btn btn btn-success waves-effect waves-light" id="map_sors_to_contracts" data-last_id="" data-client_id="" data-contarct_id="">
                    <i class='ri-add-line align-bottom'></i> Map SORs
                </a>
            </div>
            <div class="btn-group ms-1">
                <button type="button" class="btn btn-secondary waves-effect waves-light ms-1 dropdown-toggle d-flex- import-btn" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Import">
                    <i class="las la-file-import"></i> import
                </button>
                <div class="dropdown-menu dropdown-menu-md p-4">
                    <form action="" method="POST" data-upload-type="sors" data-file-type="excel" class="bulk-upload-form" enctype="multipart/form-data">
                        <div class="mb-2">
                            <label class="form-label" for="search_preset_label">Import</label>
                            <div class="input-group custom-file-button"  style="width: 100%;">
                                <input required="true" autocomplete="off" name="upload" id="upload" type="file" class="form-control" >
                                <label class="input-group-text mb-0" for="upload">Browse</label>
                            </div>
                        </div>
                        <div class="">
                            <div class="hstack gap-2 mt-2">
                                <button type="submit" class="btn btn-secondary w-50 ">Upload</button>
                                <a class="btn bulk-upload-template-button btn-outline-dark w-50 ">Template</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <button type="button" class="btn btn-secondary waves-effect waves-light ms-1" id="export_button"><i class="las la-file-export"></i> Export</button>
            <button type="button" data-heading="Add New Charge Code" data-after-load-func="create_form" data-form-url="<?= cdn_url('system/sor/create?in_popup=1') ?>" class="popup-form-button btn btn-success add-btn waves-effect waves-light ms-1">
                <i class="ri-add-line align-bottom me-1"></i> Add
            </button>
        </div>
    </div>
</div>
