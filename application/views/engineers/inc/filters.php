<form id="form_filters" action="" method="GET">
    <div class="d-flex justify-content-between">
        <div class="d-flex align-items-center">
            <div class="btn-group">
                <div class="search-box" style="width: 250px;">
                    <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search By Name / Email">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 200px;">
                    <select class="form-control" name="skill_id_filter" id="skill_id_filter">
                        <option value="">Skill</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <button class="btn btn-primary waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
            </div>            
        </div>
    </div>
</form>
