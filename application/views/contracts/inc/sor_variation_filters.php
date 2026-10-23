<form id="form_filters" action="" method="GET">
    <div class="d-flex justify-content-between">
        <div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 220px;">
                    <select class="form-control" name="sor_filter" id="sor_filter">
                        <option value="">Filter by SOR (all)</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <button type="button" class="btn btn-primary  waves-effect waves-light" id="search_btn" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
            </div>
        </div>
        <div>
            <div class="btn-group ms-auto">
                <button type="button" class="btn btn-outline-dark waves-effect waves-light dropdown-toggle me-1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
            <div class="btn-group" id="search_preset_list_div">
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
                <button type="button" class="btn btn-secondary waves-effect waves-light ms-1 dropdown-toggle d-flex- import-btn" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Import">
                    <i class="las la-file-import"></i> import
                </button>
                <div class="dropdown-menu dropdown-menu-md p-4">
                    <form method="POST" action="" data-upload-type="contract_sor_variation" data-file-type="excel" class="bulk-upload-form" enctype="multipart/form-data">
                        <div class="mb-2">
                            <label class="form-label" for="search_preset_label">Import</label>
                            <div class="input-group custom-file-button" style="width: 100%;">
                                <input required="true" autocomplete="off" name="upload" id="upload" type="file" class="form-control" >
                                <label class="input-group-text mb-0" for="upload">Browse</label>
                            </div>
                        </div>
                        <div class="">
                            <div class="hstack gap-2 mt-2">
                                <button type="submit" class="btn btn-secondary w-50  ms-0">Upload</button>
                                <a class="btn btn-outline-dark waves-effect waves-light w-50 " href="<?= app_url('resources/templates/ajs-sor-variation-units.xlsx'); ?>" download>Template </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="btn-group ms-1">
                <?php $url = !empty($client_id) ? 'clients/' . hash_encode($client_id) . '/' : ''; ?>                
                <button type="button" data-heading="Add SOR Variation" data-after-load-func="sor_variations_create_form" data-form-url="<?= base_url($url . 'contract/sor_variations_create/'.hash_encode($id).'?in_popup=1'); ?>" class="popup-form-button btn btn-success add-btn waves-effect waves-light ms-1">
                    <i class="ri-add-line align-bottom me-1"></i> Add
                </button>
            </div>
        </div>
    </div>
</form>
