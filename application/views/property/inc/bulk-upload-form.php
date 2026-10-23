<div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3">
    <!-- <form method="POST" action="" data-upload-type="properties" data-file-type="excel" class="bulk-upload-form" enctype="multipart/form-data"> -->
    <div class="d-flex justify-content-between">
        <div>
            <form id="form_filters" action="" method="GET" style="padding-top: 0px !important;">
                    <div class="hstack gap-2">        
                        <div style="width: 300px;">
                            <div class="search-box">
                                <input type="text" id="search_term" name="search_term" class="form-control" placeholder="Search by UPRN / Email / Name / Address / Postcode">
                                <i class="ri-search-line search-icon"></i>
                            </div>
                        </div>
                        <?php
                        if (!isset($client_id)) {
                            ?>

                            <div class="input-light" style="width: 150px;">
                                <select class="form-control" data-is-autocomplete="1" name="client_id_filter" id="client_id_filter">
                                    <option value="">Clients</option>
                                </select>
                            </div>
                        <?php } ?>

                        
                        <div style="width: 100px;">
                            <div class="input-light">
                                <select class="form-control" name="client_properties.status_filter" id="status_filter"  >
                                    <option value="">All Status</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div class="input-light" style="width: 150px;">
                            <select class="form-control border-light"  name="module_tags.tag_id_filter" id="tag_id_filter" >
                                <option value="">All Tag</option>
                            </select>
                        </div>
                        <!-- <div>
                            <div class="input-light">
                                <input  placeholder="Start Date" type="date" class="form-control"  id="start_date" name="start_date">
                            </div>
                        </div>
                        <div>
                            <div class="input-light">
                                <input placeholder="End Date" type="date" class="form-control"  id="end_date" name="end_date">
                            </div>
                        </div> -->
                        <div class="">
                            <button class="btn btn-primary w-100" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                        </div>


                    </div>
                    <!--    <div class="row g-2">
                            <div class="col-xxl-1 col-sm-2">
                                <div class="input-light">
                                    <select class="form-control search" name="table_length" id="table_length">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50" selected>50</option>
                                        <option value="100">100</option>
                                        <option value="250">250</option>
                                        <option value="500">500</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xxl-2 col-sm-8">
                                <div class="search-box">
                                    <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search UPRN / Client Code
                                           ">
                                    <i class="ri-search-line search-icon"></i>
                                </div>
                            </div>
                    <?php
                    if (!isset($client_id)) {
                        ?>
                                            <div class="col-xxl-2 col-sm-8">
                                                <div class="input-light">
                                                    <select class="form-control search bg-light border-light" data-is-autocomplete="1" name="client_id_filter" id="client_id_filter">
                                                        <option value="">Client Code</option>
                                                    </select>
                                                </div>
                                            </div>
                    <?php } ?>
                            <div class="col-xxl-2 col-sm-8">
                                <div class="input-light">
                                    <select class="form-control search bg-light border-light" name="town_filter" id="town_filter">
                                        <option value="">Town</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xxl-2 col-sm-8">
                                <div class="input-light">
                                    <select class="form-control search bg-light border-light" name="property_type_filter" id="property_type_filter">
                                        <option value="">Property Type</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xxl-1 col-sm-8">
                                <div class="input-light">
                                    <input  placeholder="Start Date" type="date" class="form-control"  id="start_date" name="start_date">
                                </div>
                            </div>
                            <div class="col-xxl-1 col-sm-8">
                                <div class="input-light">
                                    <input placeholder="End Date" type="date" class="form-control"  id="end_date" name="end_date">
                                </div>
                            </div>
                            end col
                            <div class="col-xxl-1 col-sm-4 text-end">
                                <button class="btn btn-primary w-100" id="search_grid"><i class="ri-search-eye-line align-bottom me-1"></i> Search</button>
                            </div>
                        </div>-->
                </form>
        </div>
        <div>
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
                    <button type="button" class="btn btn-secondary waves-effect waves-light ms-1 dropdown-toggle d-flex- import-btn" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Import">
                        <i class="las la-file-import"></i> import
                    </button>
                    <div class="dropdown-menu dropdown-menu-md p-4">
                        <form action="" method="POST" data-upload-type="properties" data-file-type="excel" class="bulk-upload-form" enctype="multipart/form-data">
                            <div class="mb-2">
                                <label class="form-label" for="search_preset_label">Import</label>
                                <div class="input-group custom-file-button"  style="width: 100%;">
                                    <input required="true" autocomplete="off" name="upload" id="upload" type="file" class="form-control" >
                                    <label class="input-group-text mb-0" for="upload">Browse</label>
                                </div>
                            </div>
                            <div class="">
                                <div class="hstack gap-2 mt-2">
                                    <button type="submit" class="btn btn-secondary w-50  ms-0">Upload</button>
                                    <a class="btn btn-outline-dark waves-effect waves-light w-50 " href="<?= app_url('resources/templates/ajs-properties.xlsx'); ?>" download>Template </a>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
                <button type="button" class="btn btn-secondary waves-effect waves-light ms-1" id="export_button"><i class="las la-file-export"></i> Export</button>
                <button type="button" data-heading="Add New Property" data-after-load-func="property_create_form" data-form-url="<?= cdn_url('properties/create?in_popup=1') ?>" class="popup-form-button btn btn-success add-btn waves-effect waves-light ms-1">
                    <i class="ri-add-line align-bottom me-1"></i> Add
                </button>
        </div>
    </div>
<!--        <div class="row align-items-end">
            <div class="col-xxl-8 col-xl-8 col-lg-6 col-md-12">
                
            </div>

            <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-12 text-end right-filter">

                                <div class="btn-group">
                                    <button type="button" class="btn btn-outline-dark waves-effect waves-light dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Save Search
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
                                        My Search Presets
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
        </div>-->
    <!-- </form> -->
</div>
