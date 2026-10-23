<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="same-page-height dataTables-height">
                        <div class="card" id="tasksList">
                            <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3">
                                <div class="">
                                    <?php
                                    require_once APPPATH . 'views/jobs/certificates/inc/list-filters.php';
                                    ?>
                                </div>
                            </div>
                            <div class="card-body pt-0 same-position-btn-" style="padding-top: 10px !important;">
                                <div class="table-responsive all-tbl-same-width1-">
                                    <table id="certificates-datatables" class="display table dt-responsive align-middle table-nowrap mb-0 table-hover" style="">
                                        <thead class="table-light text-muted">
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th>Actions</th>
                                                <th>Id</th>
                                                <th>Job Id</th>
                                                <th>Task Id</th>
                                                <th>Engineer Name</th>
                                                <th>UPRN</th>
                                                <th>Address</th>
                                                <th>Certificate</th>
                                                <th>Department</th>
                                                <th>Status</th>
                                                <th>Completed</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div> 
        </div> 
    </div>
</div> 
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/certificate.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>