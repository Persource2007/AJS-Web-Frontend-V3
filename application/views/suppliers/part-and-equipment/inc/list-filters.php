<form id="form_filters" action="" method="GET">
    <div class="row g-2">
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
        <div class="col-xxl-3 col-sm-3">
            <div class="search-box">
                <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search ">
                <i class="mdi mdi-magnify search-widget-icon"></i>
            </div>
        </div>
        <div class="col-xxl-2 col-sm-2">
            <div class="input-light">
                <select class="form-control" name="type_filter" id="type_filter" data-choices data-choices-search-false>
                    <option value="">All Type</option>
                    <option value="part">Part</option>
                    <option value="equipment">Equipment</option>
                </select>
            </div>
        </div>
        <div class="col-xxl-2 col-sm-2">
            <div class="input-light">
                <select class="form-control" name="category_id_filter" id="category_id_filter">
                    <option value="">All Category</option>
                </select>
            </div>
        </div>
        <div class="col-xxl-2 col-sm-2">
            <div class="input-light">
                <select class="form-control" name="manufacturer_id_filter" id="manufacturer_id_filter">
                    <option value="">All Make</option>
                </select>
            </div>
        </div>
        <!--end col-->
        <div class="col-xxl-1 col-sm-2 text-end">
            <button class="btn w-100  btn-primary waves-effect waves-light" id="search_grid"><i class="mdi mdi-magnify search-widget-icon me-1"></i> Search</button>
        </div>
        <div class="col-xxl-1 col-sm-1 text-end ms-auto">            
            <button type="button" data-heading="Add New Part and Equipment" data-after-load-func="create_form" data-form-url="<?= cdn_url('part-and-equipments/create/'.$id.'?in_popup=1') ?>" class="popup-form-button btn btn-success add-btn waves-effect waves-light">
                <i class="ri-add-line align-bottom"></i> Add
            </button>
        </div>
    </div>
</form>
