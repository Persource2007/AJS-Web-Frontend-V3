<form id="form_filters" class="tablelist-form" action="" method="GET">
    <div class="row g-2">
        <div class="col-md-10 col-lg-10 col-xl-10 col-xxl-10">
            <div class="btn-group">
                <div class="search-box" style="width: 250px;">
                    <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search By Title / Subject">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group ms-1">
                <button class="btn btn-primary waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
            </div>
        </div>
        <div class="col-md-2 col-lg-2 col-xl-2 col-xxl-2 text-end">
            <button type="button" data-heading="Add New AJS/Generic Template" data-after-load-func="create_form" data-form-url="<?= cdn_url('system/appointment-temp/create?in_popup=1') ?>" class="popup-form-button btn btn-success add-btn">
                <i class="ri-add-line align-bottom me-1"></i> Add
            </button>
        </div>
    </div>
</form>
