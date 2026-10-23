<form id="form_filters" action="" method="GET">
    <div class="row g-2">
        <div class="col-xxl-2 col-sm-3">
            <div class="search-box">
                <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search Name / Code / Address">
                <i class="mdi mdi-magnify search-widget-icon"></i>
            </div>
        </div>
        <div class="col-xxl-2 col-sm-3">
            <div class="input-light">
                <select class="form-control search" name="client_type_filter" id="client_type_filter">
                    <option value="">Client Type</option>
                </select>
            </div>
        </div>
        <!-- <div class="col-xxl-2 col-sm-8">
            <div class="input-light">
                <input  placeholder="Start Date" type="date" class="form-control"  id="start_date" name="start_date">
            </div>
        </div>
        <div class="col-xxl-2 col-sm-8">
            <div class="input-light">
                <input placeholder="End Date" type="date" class="form-control"  id="end_date" name="end_date">
            </div>
        </div> -->
        <!--end col-->
        <div class="col-xxl-2 col-sm-2">
            <div class="input-light">
                <select class="form-control search" name="clients.status" id="client_status_filter">
                    <option value="">All Status</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                </select>
            </div>
        </div>
        <div class="col-xxl-1 col-sm-2 text-end">
            <button class="btn w-100  btn-primary" id="search_grid"><i class="mdi mdi-magnify search-widget-icon me-1"></i> Search</button>
        </div>
    </div>
</form>
