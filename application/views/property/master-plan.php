<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="row">
                <div class="col-12">
                    <div class="same-page-height">
                        
                        <?php
                        if (!empty($client_id))
                        {
                            $this->load->view('clients/inc/nav-tab', ['id' => $client_id]);
                        } else {
                            $this->load->view('system/inc/secondary-nav', ['bc_title' => 'Properties']);
                        }
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active" id="master" role="tabpanel">
                                <div class="card">
                                    <?php
                                    $this->load->view('property/inc/sub-nav-tab', ['client_id' => $client_id, 'property_id' => $property_id]);
                                    require_once APPPATH . 'views/property/inc/bulk-upload-form-mp.php';
                                    ?>
                                        <div class="row m-0">
                                            <div class="col-sm-12 card-body pt-0 pb-0" style="padding-top:0 !important;">
                                                <div class="mp-manual-div ppm-body" style="display:none">
                                                    <div class="card-body p-0" style="padding-top:0 !important;">
                                                        <div class="row align-items-center">
                                                        <form id="manual_mp_form" action="" method="POST">
                                                            <input type="hidden" name="total_mp" id="total_mp" value="1"/>
                                                            <input type="hidden" name="property_id" id="property_id" value="<?= $property_id ?>" />
                                                            <table class="table select2-sm-table align-middle table-nowrap mb-3 table-hover" id="">
                                                                <thead class="table-light text-muted">
                                                                    <tr>
                                                                        <th width="15%">Contract</th>
                                                                        <th width="10%">Job Type</th>
                                                                        <th width="5%">Freq.</th>
                                                                        <th width="5%">Freq. Except</th>
                                                                        <th width="5%">Pricing Model</th>
                                                                        <th width="5%" class="property_assets">Asset</th>
                                                                        <th width="5%">Qty</th>
                                                                        <th width="10%">SOR</th>
                                                                        <th width="5%">Labor</th>
                                                                        <th width="5%">Sell</th>
                                                                        <th width="10%">Start Date</th>
                                                                        <th width="10%">Add to Queue</th>
                                                                        <!-- <th width="10%">End Date</th> -->
                                                                        <th width="5%">Create new if prve.<br/>is incomplete?</th>
                                                                        <th width="5%">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody class="form-check-all mp_row_parent">
                                                                    <tr>
                                                                        <td class="align-top">
                                                                            <select class="form-control select2" required name="contract_1" id="contract_1">
                                                                                <option value=''></option>
                                                                            </select>
                                                                        </td>
                                                                        <td class="align-top">
                                                                            <select class="form-control" required name="service_1" id="service_1">
                                                                                <option value=''></option>
                                                                            </select>
                                                                        </td>
                                                                        <td class="align-top">
                                                                            <select class="form-control" required name="frequency_1" id="frequency_1">
                                                                                <option value=''></option>
                                                                                <option value="Weekly">W</option>
                                                                                <option value="Monthly">M</option>
                                                                                <option value="Quarterly">Q</option>
                                                                                <option value="Half Yearly">H</option>
                                                                                <option value="Yearly">A</option>
                                                                            </select>
                                                                        </td>
                                                                        <td class="align-top">
                                                                            <select class="form-control" name="frequency_except_1[]" id="frequency_except_1" multiple>
                                                                            </select>
                                                                        </td>
                                                                        <td class="align-top">
                                                                            <select class="form-control sor_type_mp" required name="sor_type_1"  data-row-num="1" id="sor_type_1">
                                                                                <option value="1">SOR</option>
                                                                                <option value="2">Band Price</option>
                                                                                <option value="3">Fixed Price</option>
                                                                            </select>
                                                                        </td>
                                                                        <td class="align-top property_assets">
                                                                            <select class="form-control asset_selector" name="asset_1" id="asset_1" data-row-num="1">
                                                                                <option value=''></option>
                                                                            </select>
                                                                            <input type="hidden" name="asset_ids_1" id="asset_ids_1" />
                                                                        </td>
                                                                        <td class="align-top">
                                                                            <input type="number" class="form-control qty-value"  value='1' name="qty_1" id="qty_1" />
                                                                        </td>
                                                                        <td class="align-top searchBtn-selectOption-box-fixed">
                                                                            <div class="d-flex error-div">
                                                                                <select class="form-control sor_property_plan" required name="sor_1" id="sor_1" data-row-num="1">
                                                                                    <option value=''></option>
                                                                                </select>
                                                                                <button type="button" class="btn btn-primary ms-1 popup-form-search-button popup-add-btn" data-heading="Search SORs" data-element="sor_1" data-after-load-func="set_sor" data-form-url="<?= base_url('system/sor/search-list') ?>"><i class="mdi mdi-magnify search-widget-icon"></i></button>
                                                                            </div>
                                                                            <input type="hidden" name="sor_id_hidden_1" id="sor_id_hidden_1" />
                                                                        </td>
                                                                        <td class="align-top">
                                                                            <input type="number" class="form-control labor-value" readonly value='0' readonly name="labor_1" id="labor_1" />
                                                                        </td>
                                                                        <td class="align-top">
                                                                            <input type="number" class="form-control sell-value" readonly value='0' readonly name="sell_1" id="sell_1" />
                                                                        </td>
                                                                        <td class="align-top">
                                                                            <input type="date" class="form-control schedule-start-date" required name="start_date_1" id="start_date_1" min="<?= date('Y-m-d') ?>" />
                                                                        </td>
                                                                        <td class="align-top">
                                                                            <select class="form-control add_to_queue_selector select2" name="add_to_queue_1" id="add_to_queue_1" data-row-num="1">
                                                                                <option value=''>Select Queue</option>
                                                                            </select>
                                                                        </td>
                                                                        <td class="align-top">
                                                                            <input type="radio" id="create_job_1_y" checked="checked" name="create_job_1" value="1" /><label for="create_job_1_y">Yes</label>
                                                                            <input type="radio" id="create_job_1_n" name="create_job_1" value="0" /><label for="create_job_1_n">No</label>
                                                                        </td>
                                                                        
                                                                        <td class="align-top"><div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 mp-manual-div" style="display:none"><button type="button" class="btn btn-success add-masterplan-row-btn waves-effect waves-light " ><i class="ri-add-line align-bottom me-1"></i> </button></div></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            
                                                        </form>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                        <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card accordion-box-con">
                                                <div class="card-body">
                                                    <div>                                                        
                                                        <div class="card shadow-sm">
                                                            <div class="card-header">                                                                 
                                                                 <div class="row align-items-center">
                                                                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12"> 
                                                                        <h5 class="card-title mb-0"> Property PPM Plans </h5>
                                                                    </div>
                                                                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12 text-end">
                                                                        <button type="button" class="btn btn-primary waves-effect waves-light" id="queue_masterplan"><i class="las la-briefcase"></i> Generate Job Queue</button>    
                                                                    </div>
                                                                </div>
                                                            </div>    
                                                            <div class="card-body"> 
                                                                <div class="table-responsive">
                                                                    <table class="table text-muted align-middle mb-0 mt-0 table-hover table-nowrap" id="ajax-datatables1">
                                                                        <thead class="table-light  text-muted" id="ppm-data1-head">

                                                                        </thead>
                                                                        <tbody id="ppm-data1">

                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        <div class="card-body pt-0 border border-dashed border-bottom-0 border-end-0 border-start-0 d-none">         
                                            <!--end card-body-->
                                            <div class="masterplan-div">
                                                <!-- <h5 class="mt-0">Property PPM Plans</h5>
                                                <div class="table-responsive">
                                                    <table class="table text-muted align-middle mb-0 mt-2 table-hover" id="ajax-datatables1">
                                                        <thead class="table-light  text-muted" id="ppm-data1-head">

                                                        </thead>
                                                        <tbody id="ppm-data1">

                                                        </tbody>
                                                    </table>
                                                </div> -->
                                                <div style="display:none" class="table-responsive">
                                                    <table class="table text-muted align-middle table-nowrap mb-0 properties-table mt-2 table-hover" id="ajax-datatables">
                                                        <thead class="table-light  text-muted">
                                                            <tr>
                                                                <th>UPRN</th>
                                                                <th>Address</th>
                                                                <th>Postcode</th>
                                                                <th>SOR</th>
                                                                <th>Frequency</th>
                                                                <th>Month/Year</th>
                                                                <th>Service</th>
                                                                <th>Count</th>
                                                                <!-- Dynamic months will be appended here -->
                                                            </tr>
                                                        </thead>
                                                        <tbody id="ppm-data">

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
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
            </div>
            <!--end row-->
            <!--end modal-->

        </div>
        <!-- container-fluid -->
    </div>
    <script>
        property_id = "<?= $property_id ?>";
        client_id = "<?= $client_id  ?>";
        // console.log('property_id', property_id);
        // console.log('client_id', client_id);
    </script>
    <!-- End Page-content -->
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/common.js') ?>"></script>
    <script type="text/javascript" src="<?= base_url('assets/js/datatables/contracts/masterplan-commons-property.js?v=1.1') ?>"></script>
    <script type="text/javascript" src="<?= base_url('assets/js/datatables/contracts/property-masterplan.js?v=1.1') ?>"></script>

    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/contract-commons.js') ?>"></script>
    <script type="text/javascript">
        $('.client-sub-nav').find('a[data-tab="client-properties"]').addClass('active');

        $('.property-sub-nav').find('a[data-tab="master-plan"]').addClass('active');

    </script>
