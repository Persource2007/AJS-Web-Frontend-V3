<div class="card-body border-0 border-dashed border-end-0 border-start-0 mb-4">
    <?php
    require_once APPPATH . 'views/system/sors/inc/search-filters.php';
    ?>
</div>
<div class="table-responsive">
    <table id="search-datatables" class="display table dt-responsive align-middle table-nowrap mb-0 w-100">
        <thead class="table-light text-muted">
            <tr>
                <th>Id</th>
                <th>Sel.</th>
                <th>Code</th>
                <th>Short Description</th>
                <th>Material</th>
                <th>Labor</th>
                <th>Sell</th>
                <th>Type</th>
                <th>Service</th>
                <th>Workstream</th>
                <th>Client</th>
                <th>Contract</th>
            </tr>
        </thead>
    </table>
</div>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/search-list/sor.js?v=1.5') ?>"></script>