<form id="form_filters" class="card-body card-header border border-dashed border-top-0 border-end-0 border-start-0 tablelist-form ps-0 pe-0 mb-3" action="" method="GET">
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
                    <select class="form-control search bg-light border-light" name="make_id_filter" id="make_id_filter">
                        <option value="">All Make</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control search bg-light border-light" name="model_id_filter" id="model_id_filter">
                        <option value="">All Model</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <button class="btn btn-primary waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
            </div>
        </div>
        <div>
            <button type="button"  class="btn btn-secondary import-btn waves-effect waves-light sync-ford-btn">
                <i class="bx bx-refresh fs-18 align-middle"></i> Sync from Ford
            </button>
            <button type="button" data-heading="Add New Van" data-after-load-func="create_form" data-form-url="<?= cdn_url('van/create?in_popup=1') ?>" class="popup-form-button btn btn-success add-btn waves-effect waves-light">
                <i class="ri-add-line align-bottom"></i> Add
            </button>
        </div>
    </div>
</form>
