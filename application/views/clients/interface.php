<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content dataTables-height-detiles">

    <div class="page-content">
        <div class="container-fluid">
            <?php
                require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>

            <div class="same-page-height dataTables-height">
                <div>
                        <?php require_once APPPATH . 'views/clients/inc/nav-tab.php'; ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active selling-tab" id="client-interface" role="tabpanel">
                                <div class="card">
                                    <div class="">
                                        <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3">
                                            <?php
                                            require_once APPPATH . 'views/clients/inc/interface-filters.php';                                            
                                            ?>
                                        </div>
                                        <!--end row-->
                                        <div class="card-body pt-2">
                                            <table class="table align-middle dt-responsive table-nowrap mb-0 properties-table w-100" id="interface-datatables" >
                                                <thead class="table-light text-muted">
                                                    <tr>
                                                        <th></th>                                                        
                                                        <th>Id</th>
                                                        <th>Name</th>
                                                        <th>Type</th>
                                                        <th>Created On</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
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
    <input type="hidden" id="client_id" value="<?= $id ?>" />
    <input type="hidden" id="client_id_hidden" value="<?= $id ?>" />
    <input type="hidden" id="client_company_name" value="" />
    <!-- End Page-content -->
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/clients/interface.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
    <script type="text/javascript">
        $(document).ready(function (e) {
            $('#client_id_filter').parent().hide();
            $('.client-sub-nav').find('a[data-tab="interface"]').addClass('active');
            //$('.dropdown-toggle').hide();
        });
    </script>