<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
  <style>
    td.details-control {
      cursor: pointer;
      text-align: center;
    }
    .details-row {
        background-color: #ddd;
    }
  </style>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div class="same-page-height dataTables-height">
            <!-- start page title -->
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="row pt-0">
                <div class="col-lg-12">
                    <?php
                    $is_client =false;
                    if (!empty($client_id)) {
                        $this->load->view('clients/inc/nav-tab', ['id' => $client_id]);
                        $is_client =true;
                    }
                    ?>
                    <div class="card" id="tasksList">
                        <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3">
                            <?php
                            require_once APPPATH . 'views/contracts/inc/list-filters.php';
                            ?>
                        </div>
                        <!--end card-body-->
                        <div class="contract-list-main-tbl- contract-setting-btn-  card-body pt-0 same-position-btn- all-tbl-same-width" style="padding-top: 10px !important;">
                            <div class="table-responsive mb-0 all-tbl-same-width2">
                                <table id="contract-datatables" class="display table dt-responsive align-middle table-nowrap mb-0 table-hover">
                                    <thead class="table-light text-muted">
                                        <tr>
                                            <th></th>
                                            <th>Id</th>
                                            <th>Contract Number</th>
                                            <th>Client</th>
                                            <th>Type</th>
                                            <th>Ref. Number</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
<!--                                            <th>Start Time</th>
                                            <th>End Time</th>-->
                                            <th>Status</th>
                                            <th>Add Job</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <!--end card-body-->
                    </div>
                    <!--end card-->
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
<!-- use for add job -->
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/job.js?v=1.5') ?>"></script>
<script type="text/javascript" src="<?= cnd_url('assets/libs/dropzone/dropzone-min.js'); ?>"></script>
<!-- End Job script -->

<input type="hidden" id="client_id" name="client_id" autocomplete="off" value="<?= $client_id ?? '0' ?>" />
<input type="hidden" id="hidden_contract_id" value="0" />
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/contract.js') ?>"></script>
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
    $('.client-sub-nav').find('a[data-tab="client-contracts"]').addClass('active');
</script>