<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div class="same-page-height">
            <!-- start page title -->
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <?php
                        $title = "Uplifts";

                        if (!empty($client_id)) {

                            require_once APPPATH . 'views/clients/inc/nav-tab.php';
                        } else {
                            require_once APPPATH . 'views/contracts/inc/detail-nav-tab.php';
                        }
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active" id="client" role="tabpanel">
                                <div class="card ">
                                    <?php
                                    $back_url = 'contract/list';
                                    if (!empty($client_id)) {
                                        $this->load->view('contracts/inc/detail-sub-nav-tab', ['client_id' => $client_id, 'title' => $title]);
                                        $back_url = 'clients/' . hash_encode($client_id) . '/contract';
                                    }

                                    $edit_url = !empty($client_id) ? 'clients/' . hash_encode($client_id) . '/' : '';
                                    ?>
                                    <div class="card-body">
                                        <div class="" id="box">
                                            <div class="hide-section">
                                                <div class="row mt-3 sub-poperty-details-section">
                                                    <div class="col-xxl-12">
                                                        <div class="row">
                                                            <div class="col-xxl-6">
                                                                <h5 class="mb-1">Uplifts</h5>
                                                                <hr class="mt-1 mb-2">
                                                                <table class="table mb-0">
                                                                    <thead>
                                                                        <th>Date</th>
                                                                        <th>Percentage</th>
                                                                        <th>Rate</th>
                                                                    </thead>
                                                                    <tbody id="detail_uplifts">
                                                                    <tr><td colspan='3' align='center'> Data Not Available</td></tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div class="col-xxl-6">
                                                                <h5 class="mb-1">Uplift Reminders</h5>
                                                                <hr class="mt-1 mb-2">
                                                                <table class="table mb-0">
                                                                    <thead>
                                                                        <th>Before Days</th>
                                                                        <th>Emails</th>
                                                                    </thead>
                                                                    <tbody id="detail_uplift_reminders">
                                                                    <tr><td colspan='3' align='center'> Data Not Available</td></tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
                </div>
                <!--end col-->
            </div>
            <!--end row-->
            </div>
        </div>
        <!-- container-fluid -->
    </div>
</div>
<input type="hidden" id="contract_id" value="<?= $id ?>" />
<input type="hidden" id="hidden_contract_id" value="<?= $id ?>" />
<input type="hidden" id="client_id" value="0" />
<input type="hidden" name="is_detail_page" id="is_detail_page" value="1" />
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/common.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/uplifts.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/contract-commons.js') ?>"></script>
<script type="text/javascript">
    $('.client-sub-nav').find('a[data-tab="client-contracts"]').addClass('active');
</script>