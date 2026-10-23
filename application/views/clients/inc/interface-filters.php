<form id="form_filters" action="" method="GET" style="padding-top: 0px !important;">
    <div class="d-flex justify-content-between">        
        <div>
            <div class="btn-group">
                <div class="search-box" style="width: 200px;">
                    <input type="text" id="search_term" name="search_term" class="form-control search"
                        class="form-control search" placeholder="Search by Name / Type">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group ms-1">
                <button class="btn btn-primary px-2 waves-effect waves-light" id="search_grid"
                    style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
            </div>
        </div>
        <div class="btn-group ms-1">
            <input type="hidden" id="last_id" name="last_id" value="">
            <button type="button" data-heading="Add New Interface" data-after-load-func="create_form" data-form-url="<?= cdn_url("clients/$id/interface-create") ?>" class="popup-form-button btn btn-success waves-effect waves-light add-btn">
                <i class="ri-add-line align-bottom"></i> Add
            </button>
        </div>
    </div>
</form>