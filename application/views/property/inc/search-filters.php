<form id="search-filter-form" method="GET">
    <div class="row g-2">
        <div class="col-xxl-4 col-sm-4">
            <div class="search-box">
                <input type="text" name="search" class="form-control" placeholder="Search by UPRN / Email / Name / Address / Postcode">
                <i class="mdi mdi-magnify search-widget-icon"></i>
            </div>
        </div>
        <div class="col-xxl-2 col-sm-2">
            <div class="input-light">
                <select class="form-control" data-is-autocomplete="1" name="client_id" id="client_id_filter">
                    <option value="">Client Code</option>
                </select>
            </div>
        </div>
        <!--end col-->
        <div class="col-xxl-2 col-sm-3">
            <button class="btn w-75  btn-primary" id="search-btn"><i class="mdi mdi-magnify search-widget-icon me-1"></i> Search</button>
        </div>
    </div>
</form>