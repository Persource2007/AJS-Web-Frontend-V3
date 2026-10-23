<form id="form_filters" class="tablelist-form " action="" method="GET">
    <div class="d-flex justify-content-between">
        <div>
            <div class="btn-group">
                <div class="search-box" style="width: 250px;">
                    <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 180px;">
                    <select class="form-control" name="supplier_id_filter" id="supplier_id_filter">
                        <option value="">All Supplier</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 180px;">
                    <select class="form-control search bg-light border-light" name="delivery_status_filter" id="delivery_status_filter" data-choices data-choices-search-false>
                        <option value="">Delivery Status</option>
                        <option value="pending">Pending</option>
                        <option value="delivered">Delivered</option>
                        <option value="short_shipment">Short Shipment</option>
                        <option value="damaged">Damaged</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 180px;">
                    <select class="form-control search bg-light border-light" name="invoice_status_filter" id="invoice_status_filter" data-choices data-choices-search-false>
                        <option value="">Invoice Status</option>
                        <option value="unpaid">Unpaid</option>
                        <option value="paid">Paid</option>
                        <option value="partial">Partial</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <button class="btn btn-primary px-2" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
            </div>
        </div>
        <div>
            <button type="button" data-heading="Add New Purchase Order" data-after-load-func="create_form" data-form-url="<?= cdn_url('purchase-order/create?in_popup=1') ?>" class="popup-form-button btn btn-success add-btn">
                <i class="ri-add-line align-bottom me-1"></i> Add
            </button>
        </div>
    </div>
</form>
