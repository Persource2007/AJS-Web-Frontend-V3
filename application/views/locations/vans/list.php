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
                <div>
                    <!-- Tab panes -->
                    <div class="tab-content text-muted">
                        <div class="tab-pane active selling-tab" id="job-tab" role="tabpanel">
                            <div class="card" id="tasksList">
                                <div class="card-body pt-0 vans-setting-btn all-tbl-same-width1">
                                    <?php
                                    require_once APPPATH . 'views/locations/vans/inc/filters.php';
                                    ?>

                                    <!--end row-->
                                    <table class="card-body table dt-responsive table align-middle table-nowrap mb-0 p-0 table-hover" id="ajax-datatables" style="margin-top: 0px !important; padding-top: 0px !important;">
                                        <thead class="table-light text-muted">
                                            <tr>
                                                <th></th>
                                                <th>Id</th>
                                                <th>Make</th>
                                                <th>Model</th>
                                                <th>Code</th>
                                                <th>Number</th>
                                                <th>Insurance Due</th>
                                                <th>Service Due</th>
                                                <th>Assigned Driver</th>
                                                <th>Assigned Engr.</th>
                                                <th>Assign Engr.</th>
                                                <th>Stocks</th>                                                
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <!--end card-body-->
                            </div>
                            <!--end card-->
                        </div>
                        <!--end tab-pane-->
                    </div>
                    <!--end tab-content-->
                </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
    <div class="modal fade bs-example-modal-xl" tabindex="-1" id="assign_modal" aria-hidden="true" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header pb-3">
                    <h5 class="modal-title"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="#" method="POST" id="assign-form">
                    <div class="modal-body pt-2">
                        <div class="row">
                            <div class="col-xxl-12">
                                <div class="mb-2" style="display:grid">
                                    <label class="form-label">Engineers <span class="text-danger">*</span></label>
                                    <select class="form-control mb-3 select2" name="user_id" id="assign_engr">
                                    </select>
                                </div>
                                <div class="mb-2">
                                    <label class="form-label">Assigned Date Time <span class="text-danger">*</span></label>
                                    <input type="text" name="assigned_from" id="assigned_from" class="form-control" autocomplete="off" readonly>
                                    <!-- <input type="datetime-local" name="assigned_from" class="form-control" data-bs-focus="false" data-provider="flatpickr" data-date-format="d-m-Y" data-enable-time> -->
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-success " id="assign-btn">Assign</button>
                        <button type="button" class="btn btn-light " data-bs-dismiss="modal">Close</button>
                    </div>
                </form>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>
</div>

<!-- End Page-content -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/locations/vans.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
<script type="text/javascript">
    $(document).ready(function (e) {
        var hash = window.location.hash;
        if (hash) {
            hash = hash.replace('#', ''); // strip the # at the beginning of the string
            if (hash == 'add') {
                $('button.popup-form-button').trigger('click');
            }
        }
    });
</script>