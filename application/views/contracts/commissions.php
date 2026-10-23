<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.4.2/css/buttons.dataTables.min.css">

<div class="main-content dataTables-height-detiles-">
    <div class="page-content">
        <div class="container-fluid">
            <div class="same-page-height dataTables-height">
            <!-- start page title -->
            <?php
            $title = "Framework Commission";
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
                            <div class="tab-pane active selling-tab" id="contractor-commissions" role="tabpanel">
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
                                    //require_once APPPATH . 'views/system/commissions/inc/filters.php';
                                    ?>
                                    <div id="datatable_buttons" style="display:none"></div>

                                    <!--end row-->
                                    <div class="card-body pt-0">
                                        <table class=" table align-middle dt-responsive table-nowrap mb-0 properties-table w-100" id="ajax-commission-datatables" style="margin-top: 0px !important;">
                                            <thead class="table-light text-muted">
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Invoice No</th>
                                                    <th>Invoice Date</th>
                                                    <th>Invoice Amount (<i class="bx bx-pound" style="letter-spacing:-2px;"></i>) </th>
                                                    <th>Framework Contractor</th>
                                                    <th>Framework Commission %</th>
                                                    <th>Framework Commission (<i class="bx bx-pound" style="letter-spacing:-2px;"></i>) </th>                                                    
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
        </div>
        <!-- container-fluid -->
    </div>
</div>
<!-- End Page-content -->
<input type="hidden" id="edit_id" name="edit_id" value="<?= $id ?? null ?>" />
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/common.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/commissions.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/contract-commons.js') ?>"></script>
<!-- Buttons JS -->
<script src="https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js"></script>
<!-- JSZip for Excel export -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
<script type="text/javascript">
    $('.client-sub-nav').find('a[data-tab="client-contracts"]').addClass('active');
</script>