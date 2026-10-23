<form id="form_filters" class="card-body tablelist-form ps-0 pe-0" action="" method="GET" style="padding-top: 15px !important;">
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
        <div class="col-xxl-4 col-sm-3">
            <div class="search-box">
                <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search">
                <i class="mdi mdi-magnify search-widget-icon"></i>
            </div>
        </div>
        <div class="col-xxl-2 col-sm-2">
            <div class="input-light">
                <select class="form-control" name="sor_type_filter" id="sor_type_filter">
                    <option value="">Type</option>
                </select>
            </div>
        </div>
        <div class="col-xxl-2 col-sm-2">
            <div class="input-light">
                <select class="form-control" name="sors.workstream_id" id="workstream_id_filter">
                    <option value="">Workstream</option>
                </select>
            </div>
        </div>

        <div class="col-xxl-2 col-sm-3">
            <div class="input-light">
                <input type="text" value="" placeholder="Date Range" name="date_range_add_date" id="date_range_add_date" class="form-control date-range-picker" />
            </div>
        </div>
        <div class="col-xxl-1 col-sm-2 text-end">
            <button class="btn w-100 btn-primary" id="search_grid"><i class="mdi mdi-magnify search-widget-icon me-1"></i> Search</button>
        </div>
    </div>
</form>