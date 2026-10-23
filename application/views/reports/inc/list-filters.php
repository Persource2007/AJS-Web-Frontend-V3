<form id="form_filters" action="" method="GET">
    <div class="d-flex justify-content-between">
        <div>
            <div class="btn-group">
                <div class="search-box" style="width: 250px;">
                    <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search by Title / Code">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group ms-1">
                <button class="btn btn-primary waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
            </div>
        </div>
        <div>
            <a data-heading="Add New Report" href="<?= cdn_url('reports/create') ?>" class="btn btn-success add-btn">
                <i class="ri-add-line align-bottom me-1"></i> Add
            </a>
        </div>
    </div>
</form>
