<form id="form_filters" class="tablelist-form p-0" action="" method="GET">
    <div class="d-flex justify-content-between">
        <div>
            <div class="btn-group">
                <div class="search-box" style="width: 250px;">
                    <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search By Title">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control search bg-light border-light" name="type_id_filter" id="type_id_filter">
                        <option value="">All Type</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <button class="btn btn-primary px-2" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
            </div>
        </div>
        <div>
            <button type="button" data-heading="Add New Kit" data-after-load-func="create_form" data-form-url="<?= cdn_url('kit/create?in_popup=1') ?>" class="popup-form-button btn btn-success add-btn">
                <i class="ri-add-line align-bottom me-1"></i> Add
            </button>
        </div>
    </div>
</form>
