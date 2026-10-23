<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <?php
                        $title = 'Contract Finance';
                        if (!empty($client_id)) {
                            require_once APPPATH . 'views/clients/inc/nav-tab.php';
                        } else {
                            require_once APPPATH . 'views/contracts/inc/nav-tab.php';
                        }
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active selling-tab" id="selling-billing" role="tabpanel">
                                <div class="card same-page-height">
                                    <?php
                                    if (!empty($client_id)) {
                                        $this->load->view('contracts/inc/sub-nav-tab', ['client_id' => $client_id, 'title' => "Contract Finance"]);
                                    }
                                    ?>
                                    <div class="card-body pt-0">
                                        <form class="tablelist-form mt-1" autocomplete="off" id="sellingAndBillingForm" action="<?= app_url('contract/' . $id . '/selling_and_billing'); ?>" method="post">
                                            <div class="letter-form">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="checkbox" id="is_proforma_invoice" data-name="is_proforma_invoice" value="1">
                                                    <label class="form-check-label select-billing" for="is_proforma_invoice">Proforma Invoice</label>
                                                </div>
                                            </div>
                                            <div class="row gy-2 letter-form">
                                                <div class="col-xxl-4 col-md-6">
                                                    <div class="mt-3">
                                                        <label class="select-billing">Billing Type</label>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="billing_type" id="WithoutinlineRadio1" value="invoice">
                                                            <label class="form-check-label" for="WithoutinlineRadio1">Invoice</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="billing_type" id="WithoutinlineRadio2" value="fixed_price">
                                                            <label class="form-check-label" for="WithoutinlineRadio2">Fixed Price</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="billing_type" id="WithoutinlineRadio3" value="no_billing" checked>
                                                            <label class="form-check-label" for="WithoutinlineRadio3">No Billing</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-xxl-4 col-md-6">
                                                    <div class="mt-3">
                                                        <label class="select-billing">Invoice Type</label>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="invoice_type" id="WithoutinlineRadio4" value="in_advance">
                                                            <label class="form-check-label" for="WithoutinlineRadio4">In Advance</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="invoice_type" id="WithoutinlineRadio5" value="in_arrears" checked>
                                                            <label class="form-check-label" for="WithoutinlineRadio5">In Arrears</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-xxl-4 col-md-6"></div>

                                                <div class="col-xxl-4 col-md-6">
                                                    <div class="">
                                                        <label class="select-billing">Send via</label>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input send-via" type="checkbox" id="inlineCheckbox7" value="Email" name="send_via[]" checked>
                                                            <label class="form-check-label" for="inlineCheckbo7">Email</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input send-via" type="checkbox" id="inlineCheckbox8" value="Letter" name="send_via[]">
                                                            <label class="form-check-label" for="inlineCheckbox8">Letter</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-xxl-4 col-md-6">
                                                    <div class="">
                                                        <label class="select-billing">Send Bill to</label>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="send_billing_to" id="prop_manager" value="property_manager">
                                                            <label class="form-check-label" for="prop_manager">Property Manager</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="send_billing_to" id="client_bill" value="client" checked>
                                                            <label class="form-check-label" for="client_bill">Client</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="send_billing_to" id="other_bill" value="other">
                                                            <label class="form-check-label" for="other_bill">Other</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr>

                                            <div class="row letter-form">
                                                <div class="col-xxl-4 col-md-6">
                                                    <label class="select-billing">Billing Frequency</label>
                                                    <div class="">
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="billing_frequency" id="WithoutinlineRadio6" value="monthly" checked>
                                                            <label class="form-check-label" for="WithoutinlineRadio6">Monthly</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="billing_frequency" id="WithoutinlineRadio7" value="quarterly">
                                                            <label class="form-check-label" for="WithoutinlineRadio7">Quarterly</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="billing_frequency" id="WithoutinlineRadio8" value="half_yearly">
                                                            <label class="form-check-label" for="WithoutinlineRadio8">Half Yearly</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="billing_frequency" id="WithoutinlineRadio9" value="annually">
                                                            <label class="form-check-label" for="WithoutinlineRadio9">Annually</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-md-6">
                                                    <div class="input-light">
                                                        <label class="form-label">1st Invoice Date</label>
                                                        <input type="date" class="form-control" id="invoice_date" name="invoice_date">
                                                    </div>
                                                </div>
                                            </div>

                                            <hr>

                                            <h5 class="mb-1">Send Invoice to</h5>
                                            <div class="mb-1">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="checkbox" id="use_client_billing" data-name="use_client_billing" value="1">
                                                    <label class="form-check-label select-billing" for="use_client_billing">Use Client Billing Information</label> 
                                                </div>
                                                </br><label id="client-billing-error" class="error" ></label>
                                            </div>
                                            <div class="row gy-2 addr-section">
                                                <div class="col-xxl-3 col-md-6">
                                                    <div>
                                                        <label for="company_name" class="form-label">Company Name <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" id="company_name" name="company_name">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-md-6">
                                                    <div>
                                                        <label for="vat_number" class="form-label">VAT Number</label>
                                                        <input type="text" class="form-control" id="vat_number" name="vat_number">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-md-6">
                                                    <div>
                                                        <label for="email" class="form-label">Email Address</label>
                                                        <input type="email" class="form-control" id="email" name="email">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-md-6">

                                                </div>
                                                <div class="col-xxl-3 col-md-6">
                                                    <div>
                                                        <label for="address" class="form-label">Street Address 1 <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" id="address" name="address">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-md-6">
                                                    <div>
                                                        <label for="address" class="form-label">Street Address 2</label>
                                                        <input type="text" class="form-control" id="address2" name="address2">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-md-6">
                                                    <div>
                                                        <label for="area" class="form-label">Area</label>
                                                        <input type="text" class="form-control" id="area" name="area">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-md-6">
                                                    <div>
                                                        <label for="postcode" class="form-label">Postcode <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control postalcode-mask" id="postcode" name="postcode">
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-md-6">
                                                    <div>
                                                        <label for="city_id" class="form-label">Town <span class="text-danger">*</span></label>
                                                        <select class="form-control select2" id="city_id" name="city_id">
                                                            <option value="" selected>Select</option>
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="col-xxl-12 col-sm-12 text-end mt-4">
                                                <button type="submit" class="btn btn-success btn-lg add-btn" style="margin-right: 8px;">Save</button>
                                                <!-- <a class="btn btn-primary add-btn">Next</a> -->
                                            </div>
                                        </form>
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
        <!-- container-fluid -->
    </div>
</div>
<input type="hidden" id="edit_id" value="<?= $id ?>" />
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/common.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/selling-and-billing.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/contract-commons.js') ?>"></script>
<script type="text/javascript">
    $('.client-sub-nav').find('a[data-tab="client-contracts"]').addClass('active');
</script>