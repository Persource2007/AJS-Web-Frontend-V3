<form id="form_filters" class="card-body tablelist-form ps-0 pe-0 p-0" action="" method="GET">
    <div class="d-flex justify-content-between">
        <div>
            <div class="btn-group">
                <div class="search-box" style="width: 200px;">
                    <input type="text" id="search_term" name="search_term" class="form-control search"
                        class="form-control search" placeholder="Search by Quote.No, Client, Property, Exp.Date, Desc.">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 120px;">
                    <select class="form-control " name="quotations.status_id_filter" id="status_id_filter">
                        <option value="">All Status</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <button class="btn btn-primary px-2 waves-effect waves-light" id="search_grid"
                    style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
            </div>
        </div>
        <div>

            <div class="btn-group ms-1">
                <input type="hidden" id="last_id" name="last_id" value="">
                <button type="button" data-heading="Add New Quotation" data-after-load-func="create_quotation_form"
                    data-form-url="<?= cdn_url('quotation/create?in_popup=1') ?>"
                    class="popup-form-button btn btn-success new-job-btn waves-effect waves-light">
                    <i class="ri-add-line align-bottom"></i> Add
                </button>
            </div>
        </div>
    </div>
</form>