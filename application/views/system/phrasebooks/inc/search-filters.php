<form id="search-filter-form" method="GET">
    <div class="d-flex justify-content-between">
        <div>
            <div class="btn-group">
                <div class="search-box" style="width: 250px;">
                    <input type="text" name="search" class="form-control search" placeholder="Search by description">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control" name="type_id" id="type_id_filter">
                        <option value="">Type</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <button class="btn w-75  btn-primary" id="search-btn"><i class="mdi mdi-magnify search-widget-icon me-1"></i> Search</button>
            </div>
        </div>
    </div>
</form>