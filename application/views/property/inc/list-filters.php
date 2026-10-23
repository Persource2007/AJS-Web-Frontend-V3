<form id="form_filters" action="" method="GET" style="padding-top: 0px !important;">
    <div class="hstack gap-2">        
        <div style="width: 200px;">
            <div class="search-box">
                <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search UPRN / Email / Address ">
                <i class="ri-search-line search-icon"></i>
            </div>
        </div>
        <div style="width: 150px;">
            <div class="input-light">
                <input type="text" class="form-control " name="client_properties.postalcode_filter" id="postalcode_filter" placeholder="Postcode">
            </div>
        </div>
        <?php
        if (!isset($client_id)) {
            ?>

            <div class="input-light" style="width: 190px;">
                <select class="form-control search bg-light border-light" data-is-autocomplete="1" name="client_id_filter" id="client_id_filter">
                    <option value="">Client Code</option>
                </select>
            </div>
        <?php } ?>

        <!-- <div style="width: 190px;">
            <div class="input-light">
                <select class="form-control search bg-light border-light" name="property_type_filter" id="property_type_filter">
                    <option value="">Property Type</option>
                </select>
            </div>
        </div> -->
        <div style="width: 170px;">
            <div class="input-light">
                <select class="form-control" name="client_properties.status_filter" id="status_filter"  >
                    <option value="">All Status</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                </select>
            </div>
        </div>
        <div class="input-light" style="width: 180px;">
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
            <button class="btn btn-primary w-100" id="search_grid"><i class="mdi mdi-magnify search-widget-icon me-1"></i> Search</button>
        </div>

        <div class="btn-group ms-auto">
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
        <div class="btn-group" id="search_preset_list_div" style="margin-left: 0px;">
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
