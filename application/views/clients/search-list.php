
<div class="card-body border-0 border-dashed border-end-0 border-start-0 mb-4">
    <?php
        require_once APPPATH . 'views/clients/inc/search-filters.php';
    ?>
</div>
<div class="table-responsive">
    <table id="search-datatables" class="display table dt-responsive align-middle table-nowrap mb-0 w-100">
        <thead class="table-light text-muted">
            <tr>
                <th>Id</th>
                <th>Select</th>
                <th>Company</th>
                <th>Reg. No</th>
                <th>Client Code</th>
                <th>Client UPRN</th>
                <th>Client Type</th>
                <!-- <th>Email</th>
                <th>Telephone</th> -->
            </tr>
        </thead>
    </table>
</div>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/search-list/client.js') ?>"></script>