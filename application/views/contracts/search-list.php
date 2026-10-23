<div class="card-body border-0 border-dashed border-end-0 border-start-0 mb-4">
    <?php
    require_once APPPATH . 'views/contracts/inc/search-filters.php';
    ?>
</div>
<div class="table-responsive">
    <table id="search-datatables" class="display table dt-responsive align-middle table-nowrap mb-0 w-100">
        <thead class="table-light text-muted">
            <tr>
                <th>Id</th>
                <th>Select</th>
                <th>Contract Number</th>
                <th>Client</th>
                <th>Type</th>
                <th>Category</th>
                <th>Reference Number</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Start Time</th>
                <th>End Time</th>
            </tr>
        </thead>
    </table>
</div>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/search-list/contract.js') ?>"></script>