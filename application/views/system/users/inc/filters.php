<div  class="tablelist-form">
    <div class="d-flex justify-content-between">
        <div>
            <div class="btn-group">
                <div class="search-box" style="width: 250px;">
                    <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search By First Name / Last Name / Email / Mobile">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control search bg-light border-light" name="role_id_filter" id="role_id_filter">
                        <option value="">All Roles</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1 hide">
                <button class="btn btn-primary waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
            </div>
            <div class="btn-group ms-1">
                <button type="button" class="btn btn-success add-btn waves-effect waves-light sync-dialpad-user">
                    <i class="ri-refresh-line align-bottom me-1"></i> Sync Dialpad Users
                </button>
            </div>
        </div>
        <div>
            <button type="button" data-heading="Add New User" data-after-load-func="user_create_form" data-form-url="<?= cdn_url('system/user/create?in_popup=1') ?>" class="popup-form-button btn btn-success add-btn waves-effect waves-light">
                <i class="ri-add-line align-bottom me-1"></i> Add
            </button>
        </div>
    </div>
</div>
