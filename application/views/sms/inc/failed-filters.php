
<div class="tablelist-form">
    <div class="d-flex justify-content-between">
        <div>
            <form id="form_filters" action="" method="GET">
                <div class="btn-group">
                    <div class="search-box" style="width: 320px;">
                        <input type="text" id="search_term" name="search_term" class="form-control search w-100" placeholder="Search phone, code, description, summary">
                        <i class="mdi mdi-magnify search-widget-icon"></i>
                    </div>
                </div>
                <div class="btn-group ms-1">
                    <button type="button" class="btn btn-primary add-btn waves-effect waves-light" id="sms-failed-search-btn" style="padding: 1px 12px;" title="Search"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                </div>
                <div class="btn-group ms-1">
                    <button type="button" class="btn btn-outline-secondary btn-sm" id="sms-failed-reset-btn" title="Clear search and reload">
                        <i class="ri-close-circle-line align-middle"></i> Reset
                    </button>
                </div>
            </form>
        </div>
        <div>
            <button type="button" class="btn btn-outline-primary btn-sm" id="refresh-table">
                <i class="ri-refresh-line align-middle"></i> Refresh
            </button>
        </div>
    </div>
</div>
