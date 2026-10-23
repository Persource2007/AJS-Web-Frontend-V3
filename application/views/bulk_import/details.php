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

            <div class="same-page-height dataTables-height">
                <div class="card">
                    <?php
                    require_once APPPATH . 'views/bulk_import/inc/filter.php';
                    ?>                 
                    <!--end card-body-->
                    <div class="card-body pt-0 same-position-btn-" style="padding-top: 10px !important;">
                        <div class="table-responsive mb-0 all-tbl-same-width">
                            <table id="import-list-datatables" class="display table dt-responsive align-middle table-nowrap mb-0 table-hover" >                                
                            </table>
                        </div>
                    </div>
                    <!--end card-body-->
                </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
<!-- End Page-content -->
<!-- SheetJS (xlsx) for client-side template editing -->
 <!-- <script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script> -->
<script>
    var module = '<?= $module ?>';
    var batch_id = '<?= $batch_id ?>';
</script>
<?php if($module === 'jobs') { ?>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/bulk-import/job_import.js') ?>"></script>
<?php } else if($module === 'job_tasks') { ?>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/bulk-import/job_task_import.js') ?>"></script>
<?php } else if($module === 'task_sors') { ?>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/bulk-import/job_task_sor_import.js') ?>"></script>
<?php } else { ?>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/bulk-import/job_import.js') ?>"></script>
<?php }  ?>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>