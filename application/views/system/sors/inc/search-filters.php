<form id="search-filter-form" method="GET">
    <div class="row g-2">        
        <div class="col-xxl-3 col-sm-3">
            <div class="search-box">
                <input type="text"  name="search" class="form-control search" placeholder="Search by Title / Code / Contract Number / Type">
                <i class="ri-search-line search-icon"></i>
            </div>
        </div>
        <!-- <div class="col-xxl-2 col-sm-3">
            <div class="input-light">
                <select class="form-control" name="sors.client_id" id="client_id_filter">
                    <option value="">Client</option>
                </select>
            </div>
        </div> -->
        <div class="col-xxl-2 col-sm-3">
            <div class="input-light">
                <select class="form-control" name="sor_type" id="sor_type_filter">
                    <option value="">Type</option>
                </select>
            </div>
        </div>
        <div class="col-xxl-2 col-sm-3">
            <div class="input-light">
                <select class="form-control" name="sors.workstream_id" id="workstream_id_filter">
                    <option value="">Workstream</option>
                </select>
            </div>
        </div>
        <!--end col-->
        <div class="col-xxl-2 col-sm-2">
            <button class="btn w-75  btn-primary" id="search-btn"><i class="mdi mdi-magnify search-widget-icon me-1"></i> Search</button>
        </div>
    </div>
</form>
