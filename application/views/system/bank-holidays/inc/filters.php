<form id="form_filters" class="tablelist-form" action="" method="GET">
    <div class="row g-2">
        <div class="col-xxl-1 col-sm-1">
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
    </div>
    <div class="d-flex justify-content-between">
        <div>
            <div class="btn-group">
                <div class="search-box" style="width: 250px;">
                    <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search">
                    <i class="mdi mdi-magnify search-widget-icon"></i>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 120px;">
                    <div class="input-light">
                        <select class="form-control search" name="year_filter" id="year_filter">
                            <?php
                            for ($i = START_YEAR; $i <= date('Y'); $i++) {
                                $sel = '';
                                if ($i == date('Y')) {
                                    $sel = 'selected';
                                }
                                ?>
                                <option <?= $sel; ?> value="<?= $i ?>"><?= $i ?></option>
                                <?php
                            }
                            ?>
                        </select>
                    </div>
                </div>
            </div>
            <div class="btn-group ms-1">
                <div class="input-light" style="width: 150px;">
                    <select class="form-control search" name="holiday_type_filter" id="holiday_type_filter">
                        <option value="">Type</option>
                    </select>
                </div>
            </div>
            <div class="btn-group ms-1">
                <button class="btn btn-primary waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
            </div>
        </div>
        <div>
            <button type="button" data-heading="Add Holiday" data-after-load-func="create_form" data-form-url="<?= cdn_url('system/bank-holidays/create?in_popup=1') ?>" class="popup-form-button btn btn-success add-btn waves-effect waves-light">
                <i class="ri-add-line align-bottom me-1"></i> Add
            </button>
        </div>
    </div>
</form>
