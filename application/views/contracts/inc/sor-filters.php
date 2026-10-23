<div  class="tablelist-form">
    <div class="d-flex justify-content-between">
        <div>
            <form id="form_filters"   action="" method="GET" style="padding-top: 0px !important;">
                <div class="btn-group">
                    <div class="search-box" style="width: 250px;">
                        <input type="text" id="search_term" name="search_term" class="form-control" placeholder="Search by Title / Code / Contract Number / Type">
                        <i class="mdi mdi-magnify search-widget-icon"></i>
                    </div>
                </div>
                <div class="btn-group ms-1">
                    <div class="input-light" style="width: 160px;">
                        <select class="form-control" name="sor_type_filter" id="sor_type_filter">
                            <option value="">Type</option>
                        </select>
                    </div>
                </div>
                <div class="btn-group ms-1">
                    <div class="input-light" style="width: 160px;">
                        <select class="form-control" name="sors.workstream_id" id="workstream_id_filter">
                            <option value="">Workstreams</option>
                        </select>
                    </div>
                </div>                
                <div class="btn-group ms-1">
                    <button class="btn btn-primary" id="search_grid"  style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                </div>
            </form>
        </div>
    </div>
</div>