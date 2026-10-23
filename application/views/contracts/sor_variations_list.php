<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content dataTables-height-detiles-">
    <div class="page-content">
        <div class="container-fluid">
            <div class="same-page-height dataTables-height">
            <!-- start page title -->
            <?php
            $title = "SOR Variations";
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <?php
                        if (!empty($client_id))
                        {
                            require_once APPPATH . 'views/clients/inc/nav-tab.php';
                        }
                        else if (isset($is_detail) && $is_detail)
                        {
                            require_once APPPATH . 'views/contracts/inc/detail-nav-tab.php';
                        }
                        else
                        {
                            require_once APPPATH . 'views/contracts/inc/nav-tab.php';
                        }
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active selling-tab" id="sors" role="tabpanel">
                                <input type="hidden" id="client_id" value="<?= $client_id ?? null ?>" />
                                <input type="hidden" id="contract_id" value="<?= $id ?? null ?>" />
                                <div class="card">
                                    <?php
                                    if (!empty($client_id))
                                    {
                                        if (isset($is_detail) && $is_detail)
                                        {
                                            $this->load->view('contracts/inc/detail-sub-nav-tab', ['client_id' => $client_id, 'title' => $title]);
                                        }
                                        else
                                        {
                                            $this->load->view('contracts/inc/sub-nav-tab', ['client_id' => $client_id, 'title' => $title]);
                                        }
                                    }
                                    require_once APPPATH . 'views/contracts/inc/sor_variation_filters.php';
                                    ?>
                                    <div id="datatable_buttons" style="display:none"></div>

                                    <!--end row-->
                                    <div class="card-body pt-0">
                                        <input type="hidden" id="contract_id_hidden" value="<?= $id ?? null ?>" />

                                        <!-- Single SOR Variations table -->
                                        <div class="table-responsive">
                                            <table class="table align-middle dt-responsive table-nowrap mb-0 properties-table w-100" id="sor-variations-datatables" style="margin-top: 0px !important;">
                                                <thead class="table-light text-muted">
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Variation Type</th>
                                                        <th>SOR Codes</th>
                                                        <th>Created Date</th>
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
                </div>
                <!--end col-->
            </div>
            <!--end row-->
            </div>
        </div>
        <!-- container-fluid -->
    </div>
</div>
<!-- End Page-content -->
<input type="hidden" id="edit_id" name="edit_id" value="<?= $id ?? null ?>" />
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/common.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/sor-variations.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/contract-commons.js') ?>"></script>
<script type="text/javascript">
    $('.client-sub-nav').find('a[data-tab="client-contracts"]').addClass('active');
</script>