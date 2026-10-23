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
                            $title = "Contract Finance";

                            if (!empty($client_id)) {

                                require_once APPPATH . 'views/clients/inc/nav-tab.php';
                            } else {
                                require_once APPPATH . 'views/contracts/inc/detail-nav-tab.php';
                            }
                            ?>
                            <!-- Tab panes -->
                            <div class="tab-content text-muted">
                                <div class="tab-pane active" id="client" role="tabpanel">
                                    <div class="card">
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
                                                                <div class="col-xxl-6 col-md-6">
                                                                    <div class="border-main-details">
                                                                        <h5 class="mb-1">Contract Finance</h5>
                                                                        <hr class="mt-1 mb-2">
                                                                        <table class="table mb-0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td><b>Proforma Invoice </b></td>
                                                                                    <td class="detail-data"><span id="detail_proforma_invoice">-</span></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><b>Billing Type</b></td>
                                                                                    <td class="detail-data text-capitalize"><span id="detail_billing_type">-</span></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><b>Invoice Type</b></td>
                                                                                    <td class="detail-data text-capitalize"><span id="detail_invoice_type">-</span></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><b>Send via</b></td>
                                                                                    <td class="detail-data"><span id="detail_send_via">-</span></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><b>Send Bill to </b></td>
                                                                                    <td class="detail-data text-capitalize"><span id="detail_send_billing_to">-</span></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><b>Billing Frequency </b></td>
                                                                                    <td class="detail-data text-capitalize"><span id="detail_billing_frequency">-</span></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><b>1st Invoice Date</b></td>
                                                                                    <td class="detail-data"><span id="detail_invoice_date">-</span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xxl-6 col-md-6">
                                                                    <div class="border-main-details">
                                                                        <h5 class="mb-1">&nbsp;</h5>
                                                                        <hr class="mt-1 mb-2">
                                                                        <table class="table mb-0 ">
                                                                            <tbody>

                                                                                <tr>
                                                                                    <td><b>Company Name</b></td>
                                                                                    <td class="detail-data"><span id="detail_company_name">-</span></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><b>VAT Number</b></td>
                                                                                    <td class="detail-data"><span id="detail_vat_number">-</span></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><b>Email</b></td>
                                                                                    <td class="detail-data"><span id="detail_email">-</span></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><b>Invoice Address</b></td>
                                                                                    <td class="detail-data"><span id="detail_invoice_address">-</span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
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
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/selling-and-billing.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/contract-commons.js') ?>"></script>
<script type="text/javascript">
    $('.client-sub-nav').find('a[data-tab="client-contracts"]').addClass('active');
</script>