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
                    <div>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active selling-tab" role="tabpanel">
                                <div class="card" id="tasksList">
                                    <div class="card-body">
                                        <?php
                                        require_once APPPATH . 'views/locations/warehouses/inc/stock-filters.php';
                                        ?>

                                        <!--end row-->
                                        <table class="table align-middle table-nowrap mb-0 " id="ajax-datatables">
                                            <thead class="table-light text-muted">
                                                <tr>
                                                    <th>Id</th>
                                                    <th> &nbsp;&nbsp; &nbsp;&nbsp; Manuf. Part No.</th>
                                                    <th>Title</th>
                                                    <th>Type</th>
                                                    <th>Quantity</th>
                                                    <th>Make</th>
                                                    <th>Model</th>
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
                </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
</div>
<input type="hidden" id="location_id" value="<?= $id ?? null ?>" />
<input type="hidden" id="location_type" value="<?= $location_type ?? 'W' ?>" />

<!-- End Page-content -->
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/locations/location-stocks.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
<script type="text/javascript">
    $(document).ready(function(e) {
        var hash = window.location.hash;
        if (hash) {
            hash = hash.replace('#', ''); // strip the # at the beginning of the string
            if (hash == 'add') {
                $('button.popup-form-button').trigger('click');
            }
        }
    });
</script>