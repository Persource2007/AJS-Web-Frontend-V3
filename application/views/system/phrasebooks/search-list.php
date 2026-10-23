<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="card-body border-0 border-dashed border-end-0 border-start-0 mb-2">
    <?php
    require_once APPPATH . 'views/system/phrasebooks/inc/search-filters.php';
    ?>
</div>
<div class="table-responsive mb-0 use-phrasebook-main">
    <table id="search-datatables" class="display table dt-responsive align-middle table-nowrap mb-0 w-100">
        <thead class="table-light text-muted">
            <tr>
                <th>Id</th>
                <th>Select</th>
                <th>Description</th>
                <th>Type</th>
            </tr>
        </thead>
    </table>
</div>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/search-list/phrasebook.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>