<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.min.css" />
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="same-page-height dataTables-height">
                <div class="card" id="tasksList">
                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3">
                        <?php
                        require_once APPPATH . 'views/notifications/inc/list-filters.php';
                        ?>
                    </div>
                    <!--end card-body-->
                    <div class="card-body notification-setting-btn all-tbl-same-width">
                        <div class="table-responsive mb-0">
                            <table id="notification-datatables" class="display table dt-responsive align-middle table-nowrap mb-0 table-hover" style="margin-top: 0px !important;">
                                <thead class="table-light text-muted">
                                    <tr>
                                        <th></th>
                                        <th>Id</th>
                                        <th>Group</th>
                                        <th>Title</th>
                                        <th>Message</th>
                                        <th>Delivery Status</th>
                                    </tr>
                                </thead>
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
</div>
<!-- End Page-content -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/notifications/notification.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>

