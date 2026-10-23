<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<style>
    .dataTables_filter{
        display: none;
    }
</style>
<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
                require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="same-page-height">
                <div>
                        <?php
                        require_once APPPATH . 'views/clients/inc/nav-tab.php';
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active" id="client" role="tabpanel">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="" id="box">
                                            <div class="row" >
                                                <div class="col-md-12 col-xl-12 col-xxl-12 col-sm-12">
                                                    <div class="row align-items-center card-header border border-dashed border-top-0 border-end-0 border-start-0 p-0 pb-3 mb-3">
                                                        <div class="col-xxl-9">
                                                            <h5 class="mb-0">Workstreams</h5>
                                                        </div>
                                                    </div>
                                                    <table style="max-height: 250px; overflow: auto" class="table align-middle table-nowrap mb-0 properties-table mt-4" id="ajax-datatables">
                                                        <thead class="table-light text-muted">
                                                            <tr>
                                                                <th style="width: 100px;">#</th>
                                                                <th style="width: 41%;">Workstream</th>
                                                                <th style="width: 20%;">AJS Code</th>
                                                                <th style="width: 10%;">Client Code</th>
                                                                <th style="width: 10%;">Analysis Code</th>
                                                                <th style="width: 10%;">Action</th>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                                <div class="clearfix"></div>
                                                <div class="col-md-12 col-xl-12 col-xxl-12 col-sm-12">
                                                    <div class="row align-items-center border border-dashed border-top-0 border-end-0 border-start-0 pb-2">
                                                        <div class="col-xxl-9">
                                                            <h5 class="mb-0" >Job Types</h5>
                                                        </div>
                                                    </div>
                                                    <table style="max-height: 250px; overflow: auto" class="table align-middle table-nowrap mb-0 properties-table mt-4" id="ajax-datatables1">
                                                        <thead class="table-light text-muted">
                                                            <tr>
                                                                <th style="width: 100px;">#</th>
                                                                <th style="width: 41%;">Job Type</th>
                                                                <th style="width: 20%;">AJS Code</th>
                                                                <th style="width: 10%;">Client Code</th>
                                                                <th style="width: 10%;">Analysis Code</th>
                                                                <th style="width: 10%;">Action</th>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                            </div>

                                            <div class="row mt-3" >

                                            </div>
                                        </div>
                                        <!--end row-->
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
    <script type='text/javascript'>
        client_id = <?= $client_id ?>;
    </script>
    <input type="hidden" id="client_id" value="<?= $client_id ?>" />
    <input type="hidden" name="is_detail_page" id="is_detail_page" value="1" />
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/client-codemapping.js') ?>"></script>
    <!-- End Page-content -->
    <script type="text/javascript">
        $('.client-sub-nav').find('a[data-tab="code-mapping"]').addClass('active');
    </script>
