<form id="search-filter-form" method="GET">
    <div class="row g-2">        
        <div class="col-xxl-3 col-sm-3">
            <div class="search-box">
                <input type="text"  name="search" class="form-control search" placeholder="Search Name / Email / Code">
                <i class="mdi mdi-magnify search-widget-icon"></i>
            </div>
        </div>
        <div class="col-xxl-2 col-sm-2">
            <div class="input-light">
                <select class="form-control" name="client_type" id="client_type_filter">
                    <option value="">Client Type</option>
                </select>
            </div>
        </div>
        <!--end col-->
        <div class="col-xxl-2 col-sm-2">
            <button class="btn w-75  btn-primary" id="search-btn"><i class="mdi mdi-magnify search-widget-icon me-1"></i> Search</button>
        </div>
    </div>
</form>
