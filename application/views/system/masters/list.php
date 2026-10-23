<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content dataTables-height-detiles">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $bc_title = 'Masters';
            ///include_once APPPATH . 'views/system/inc/breadcrumbs.php';
            ?>
            <!-- end page title -->

            <div class="same-page-height dataTables-height">
                <div>
                    <?php
                    include_once APPPATH . 'views/system/inc/secondary-nav.php';
                    ?>
                    <!-- Tab panes -->
                    <div class="tab-content text-muted">
                        <div class="tab-pane active selling-tab master-tab" id="masters" role="tabpanel">
                            <div class="card">
                                <div class="card-body">
                                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 p-0 pb-3 mb-3">
                                        <div class="row align-items-end">
                                            <div class="col-xxl-10 col-md-10">
                                                <h5 class="mb-0">Masters</h5>
                                            </div>
                                            <div class="col-xxl-2 col-md-2 col-sm-2 text-end">
                                                <button type="button" data-heading="Add New Master" data-after-load-func="create_form" data-form-url="<?= cdn_url('system/master/create?in_popup=1') ?>" class="popup-form-button btn btn-success add-btn">
                                                    <i class="ri-add-line align-bottom me-1"></i> Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row h-100 master-div mt-3" id="master-div">

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
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/masters.js') ?>"></script>
    <script type="text/javascript">
        $(document).ready(function (e) {
            var hash = window.location.hash;
            if (hash) {
                hash = hash.replace('#', ''); // strip the # at the beginning of the string
                if (hash == 'add')
                {
                    $('button.popup-form-button').trigger('click');
                }
            }
        });
    </script>
