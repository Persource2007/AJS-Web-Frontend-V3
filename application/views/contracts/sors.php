<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content dataTables-height-detiles-">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $title = "Contract SORs";
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
                       <div class="tab-content- pt-0 text-muted">
                        <div class="same-page-height dataTables-height selling-tab" id="sors" role="tabpanel">  
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
                                    ?>
                                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn">
                                        <?php require_once APPPATH . 'views/contracts/inc/sor-filters.php'; ?>
                                    </div>
                                    <div id="datatable_buttons" style="display:none"></div>
                                    
                                 
                                    <div class="card-body pt-0 same-position-btn- all-tbl-same-width1 table-responsive" style="padding-top: 10px !important;"> 
                                        <table class="table align-middle table-nowrap mb-0 display properties-table table-hover task-pending-main" id="ajax-datatables">
                                            <thead class="table-light text-muted">
                                                <tr>
                                                    <th>Id</th>
                                                    <th>ID</th>
                                                    <th>Title</th>
                                                    <th>Type</th>
                                                    <th>Code</th>
                                                    <th>Client SOR Code</th>
                                                    <th>Workstream</th>
                                                    <th>Short Description</th>
                                                    <th>Material</th>
                                                    <th>Labor</th>
                                                    <th>Sell</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div> 
                                </div> 
                            </div> 
                        </div> 
                    </div>
                </div> 
            </div>  
        </div> 
    </div>
</div>
<!-- End Page-content -->
<input type="hidden" id="edit_id" name="edit_id" value="<?= $id ?? null ?>" />
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/common.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/sors.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/contract-commons.js') ?>"></script>
<script type="text/javascript">
    $('.client-sub-nav').find('a[data-tab="client-contracts"]').addClass('active');
</script>