<div class="card-body border-0 border-dashed border-end-0 border-start-0 mb-4">
<form id="search-filter-form" class="card-body tablelist-form ps-0 pe-0" action="" method="GET" style="padding-top: 15px !important;">
    <div class="row g-2">
        <div class="col-xxl-4 col-sm-3">
            <div class="search-box">
                <input type="text" id="search" name="search" class="form-control search" placeholder="Search by Code, Client, Contract">
                <i class="mdi mdi-magnify search-widget-icon"></i>
            </div>
        </div>
        <div class="col-xxl-2 col-sm-2">
            <div class="input-light">
                <select class="form-control" name="sor_type" id="sor_type_filter">
                    <option value="">Type</option>
                </select>
            </div>
        </div>
        <div class="col-xxl-1 col-sm-2 text-end">
            <button class="btn w-100 btn-primary" id="search-quote-btn"><i class="mdi mdi-magnify search-widget-icon me-1"></i></button>
        </div>
    </div>
</form>
</div>
<div class="table-responsive">
    <table id="search-datatables" class="display table dt-responsive align-middle table-nowrap mb-0 w-100">
        <thead class="table-light text-muted">
            <tr>
                <th></th>
                <th>Select</th>
                <th>Type</th>
                <th>Code</th>
                <th>Client</th>
                <th>Contract</th>
                <th>Description</th>
                <th>Material</th>
                <th>Labor</th>
                <th>Sell</th>
            </tr>
        </thead>
    </table>
</div>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/search-list/quotation-sor.js') ?>"></script>