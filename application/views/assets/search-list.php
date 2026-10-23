<div class="card-body border-0 border-dashed border-end-0 border-start-0 mb-4">
    <?php
    require_once APPPATH . 'views/assets/inc/search-filters.php';
    ?>
</div>
<div class="table-responsive">
    <table id="search-datatables" class="display table dt-responsive align-middle table-nowrap mb-0 w-100">
        <thead class="table-light text-muted">
            <tr>
                <th>Id</th>
                <th>Select</th>
                <th>Client Asset Number</th>
                <th>Property UPRN</th>
                <th>Serial Number</th>
                <th>Asset Type</th>
                <th>Location On Site</th>
                <th>Quantity</th>
                <th>Installation Date</th>
                <th>Expiry Date</th>
                <th>Mfr. Warranty Expiry</th>
                <th>Our Warranty Expiry</th>
            </tr>
        </thead>
    </table>
</div>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/search-list/asset.js?v=1.14') ?>"></script>