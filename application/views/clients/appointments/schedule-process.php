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
                        <div class="tab-pane active selling-tab" id="client-sor" role="tabpanel">
                            <div class="card">
                                <div class="">
                                    <div class="card-header card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-0 pb-3">
                                        <form id="form_filters" action="" method="GET">
                                            <div class="d-flex justify-content-between">
                                                <div>
                                                    <div class="btn-group">
                                                        <div class="search-box" style="width: 250px;">
                                                            <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search By Title">
                                                            <i class="mdi mdi-magnify search-widget-icon"></i>
                                                        </div>
                                                    </div>
                                                    <div class="btn-group ms-1">
                                                        <button class="btn btn-primary" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <?php $url = !empty($client_id) ? 'clients/' . hash_encode($client_id) . '/' : ''; ?>
                                                    <button type="button" data-heading="Add New Workflow Schedule" data-after-load-func="create_form" data-form-url="<?= cdn_url($url . 'schedule-create?in_popup=1') ?>" class="popup-form-button btn btn-success add-btn waves-effect waves-light">
                                                        <i class="ri-add-line align-bottom me-1"></i> Add
                                                    </button>
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                    <!--end row-->
                                    <div class="card-body pt-2 all-tbl-same-width">
                                        <table class="table align-middle dt-responsive table-nowrap mb-0 properties-table w-100" id="schedule-datatables">
                                            <thead class="table-light text-muted">
                                                <tr>
                                                    <th></th>
                                                    <th>Id</th>
                                                    <th>Title</th>
                                                    <th>Templates</th>
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
    <input type="hidden" id="client_id" value="<?= $client_id ?>" />
    <input type="hidden" id="client_id_hidden" value="<?= $client_id ?>" />
    <!-- End Page-content -->
    <script type="text/javascript" src="<?= cdn_url('assets/libs/sortablejs/Sortable.min.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/client-workflow-schedule.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
    <script type="text/javascript">
        $(document).ready(function (e) {
            $('.client-sub-nav').find('a[data-tab="workflow-schedules"]').addClass('active');
        });
    </script>