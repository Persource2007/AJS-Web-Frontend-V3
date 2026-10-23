<form id="form_filters" action="" method="GET">
    <div class="d-flex justify-content-between">
        <div>
            <div class="btn-group">
                <div class="search-box" style="width: 250px;">
                    <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search contract / reference number">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <?php if (!isset($client_id)) { ?>
                <div class="btn-group ms-1">
                    <div class="input-light" style="width: 150px;">
                        <select class="form-control search" data-is-autocomplete="1" name="client_id_filter" id="client_id_filter">
                            <option value="">Clients</option>
                        </select>
                    </div>
                </div>
            <?php } ?>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control" name="type_filter" id="type_filter" >
                        <option value="" selected>Type</option>
                        <option value="combined">Combined</option>
                        <option value="project">Project</option>
                        <option value="ppm">PPM</option>
                        <option value="reactive">Reactive</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control" name="contracts.status" id="status_filter" >
                        <option value="">All Status</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                        <!-- <option value="2">Expired</option> -->
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control border-light"  name="module_tags.tag_id_filter" id="tag_id_filter" >
                        <option value="">Tag</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <button class="btn btn-primary  waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
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
                <?php $url = !empty($client_id) ? 'clients/' . hash_encode($client_id) . '/' : ''; ?>
                <a href="<?= base_url($url . 'contract/create'); ?>" class="btn btn-success add-btn waves-effect waves-light w-100">
                    <i class="ri-add-line align-bottom me-1"></i> Add
                </a>
            </div>
        </div>
    </div>
</form>
