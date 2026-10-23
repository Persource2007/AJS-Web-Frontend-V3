<form id="form_filters" class="card-body card-header border border-dashed border-top-0 border-end-0 border-start-0 tablelist-form ps-0 pe-0 pb-3 mb-1" action="" method="GET">
    <div class="d-flex justify-content-between">
        <div>
            <div class="btn-group">
                <div class="search-box" style="width: 250px;">
                    <input type="text" id="search_term"  class="form-control search" placeholder="Search By Name / Model / Category / Type">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 120px;">
                    <select class="form-control" id="manufacturer_id_filter">
                        <option value="">All Make</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <button class="btn w-100 btn-primary waves-effect waves-light" id="search_grid"  style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon me-1"></i></button>
            </div>
        </div>
        <div>
            <button type="button" class="btn btn-secondary waves-effect waves-light export-btn" id="export_button"><i class="las la-file-export"></i> Export</button>
        </div>
    </div>
    <input type="hidden" name="location_id" value="<?= $id ?? null ?>" />
    <input type="hidden" name="location_type" value="<?= $location_type ?? 'W' ?>" />
</form>
