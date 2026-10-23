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
        <div class="col-xxl-2 col-sm-3">
            <div class="search-box">
                <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search #Serial  / Model / SOR code">
                <i class="mdi mdi-magnify search-widget-icon"></i>
            </div>
        </div>
        <div class="col-xxl-2 col-sm-3">
            <div class="input-light">
                <select class="form-control search" name="equipment_type_id_filter" id="equipment_type_id_filter">
                    <option value="">Equipment Type</option>
                </select>
            </div>
        </div>
        <!-- <div class="col-xxl-2 col-sm-8">
            <div class="input-light">
                <select class="form-control search bg-light border-light" name="make_id_filter" id="make_id_filter">
                    <option value="">Make</option>
                </select>
            </div>
        </div> -->
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
        <div class="col-xxl-1 col-sm-2">
            <button class="btn btn-primary" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
        </div>
    </div>
</form>
