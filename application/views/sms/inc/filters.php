
<div class="tablelist-form">
    <div class="d-flex justify-content-between">
        <div>
            <form id="form_filters" action="" method="GET">
                <div class="btn-group">
                    <div class="search-box" style="width: 250px;">
                        <input type="text" id="search_term" name="search_term" class="form-control search w-100" placeholder="Search By Number or Message">
                        <i class="mdi mdi-magnify search-widget-icon"></i>
                    </div>                    
                </div>
                <div class="btn-group ms-1">
                    <div class="search-box" style="width: 250px;">
                        <input type="text" id="search_uprn" name="search_uprn" class="form-control search w-100" placeholder="Search By UPRN Or Job Code">
                        <i class="mdi mdi-magnify search-widget-icon"></i>
                    </div>
                </div>        
                <div class="btn-group ms-1">
                    <button class="btn btn-primary waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                </div>
            </form>
        </div>
        <div>
            <button class="btn btn-outline-primary btn-sm" id="refresh-table">
                <i class="ri-refresh-line align-middle"></i> Refresh
            </button>
        </div>
    </div>
</div>