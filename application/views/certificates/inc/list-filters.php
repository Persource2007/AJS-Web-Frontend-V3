<form id="form_filters" action="" method="GET">
    <div class="d-flex justify-content-between">
        <div>
            <div class="btn-group">
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
            <div class="btn-group ms-1">
                <div class="search-box" style="width: 250px;">
                    <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search Name / Description">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group ms-1">
                <button class="btn btn-primary waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
            </div>
        </div>
        <div>
            <button type="button" data-heading="Add New Certificate" data-after-load-func="create_form" data-form-url="<?= base_url('certificates/create') ?>" class="popup-form-button btn btn-success add-btn waves-effect waves-light">
                <i class="ri-add-line align-bottom me-1"></i> Add
            </button>
        </div>
    </div>
</form>
