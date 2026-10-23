<form id="search-filter-form" method="GET">
    <div class="row g-2">
        <div class="col-xxl-3 col-sm-3">
            <div class="search-box">
                <input type="text"  name="search" class="form-control search" placeholder="Search">
                <i class="mdi mdi-magnify search-widget-icon"></i>
            </div>
        </div>
        <div class="col-xxl-2 col-sm-3">
            <div class="input-light">
                <select class="form-control" name="type" id="type_filter" data-choices data-choices-search-false>
                    <option value="">All Type</option>
                    <option value="project">Project</option>
                    <option value="combined">Combined</option>
                    <option value="ppm">PPM</option>
                    <option value="reactive">Reactive</option>
                </select>
            </div>
        </div>
        <div class="col-xxl-2 col-sm-3">
            <div class="input-light">
                <select class="form-control" name="category_id" id="category_id_filter">
                    <option value="">All Category</option>
                </select>
            </div>
        </div>

        <!--end col-->
        <div class="col-xxl-2 col-sm-2">
            <button class="btn w-75  btn-primary" id="search-btn"><i class="mdi mdi-magnify search-widget-icon me-1"></i> Search</button>
        </div>
    </div>
</form>
