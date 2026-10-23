<?php
    require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid"> 
            <?php
                require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <?php
                            $bc_title = 'Tags';
                            include_once APPPATH . 'views/system/inc/secondary-nav.php';
                        ?>  
                        <div class="same-page-height dataTables-height selling-tab" role="tabpanel">
                            <div class="card">
                                <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn">
                                    <?php require_once APPPATH . 'views/system/tags/inc/list-filters.php'; ?>
                                </div>   
                                <div class="card-body pt-0 all-tbl-same-width1" style="padding-top: 0px !important;">
                                    <div class="table-responsive mb-0">
                                        <table id="tag-datatables" class="table align-middle table-nowrap mb-0 display job-listing-table table-hover task-pending-main">
                                            <thead class="table-light text-muted">
                                                <tr>
                                                    <th></th>
                                                    <th>Id</th>
                                                    <th>Title</th>
                                                    <th>Description</th>
                                                    <th>Modules</th>
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
 
<!-- End Page-content -->
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/tags.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>