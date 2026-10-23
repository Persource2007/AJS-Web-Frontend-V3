<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<style>
    .select2-selection__clear {
        display: none;
    }
</style>

<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $title = "PPM Master Plan";
            $id    = $contract_id;

            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="row">
                <div class="col-lg-12">
                    <div class="same-page-height">
                        <?php
                        if (!empty($client_id))
                        {
                            require_once APPPATH . 'views/clients/inc/nav-tab.php';
                        }
                        else
                        {
                            require_once APPPATH . 'views/contracts/inc/nav-tab.php';
                        }
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active" id="master" role="tabpanel">
                                <div class="card">
                                    <?php
                                    if (!empty($client_id))
                                    {
                                        $this->load->view('contracts/inc/sub-nav-tab', ['client_id' => $client_id, 'title' => "PPM Master Plan"]);
                                    }
                                    require_once APPPATH . 'views/contracts/inc/bulk-upload-form.php';
                                    ?>
                                    <div class="row m-0">
                                        <div class="col-sm-12 card-body pt-0 pb-0" style="padding-top:0 !important;">
                                             <div class="mp-manual-div ppm-body" style="display:none">
                                                <div class="card-body p-0" style="padding-top:0 !important;">
                                                    <div class="row align-items-center">                                           
                                                        <form id="manual_mp_form" action="" method="POST">
                                                            <input type="hidden" name="total_mp" id="total_mp" value="1"/>
                                                            <input type="hidden" name="contract_id" id="contract_id" value="<?= $contract_id ?>" />
                                                            <input type="hidden" id="first_load" value="0" />
                                                            <!-- <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 text-end mb-2">
                                                                <button type="button" class="btn btn-secondary save-masterplan-btn" ><i class="ri-file-download-line align-bottom"></i> Generate Schedule</button>
                                                            </div> -->
                                                            <div class="table-responsive th-min-fixed">
                                                                <table class="table select2-sm-table align-middle table-nowrap mb-0 table-hover" id="" style="background: #fff;">
                                                                    <thead class="table-light text-muted">
                                                                        <tr>
                                                                            <th width="15%">Property</th>
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
                                                                            <td class="align-top searchBtn-selectOption-box-fixed">
                                                                                <div class="d-flex error-div">
                                                                                    <select class="form-control select2 property_selection" required name="property_1" id="property_1">
                                                                                    <option value=''></option>
                                                                                </select>
                                                                                    <button type="button" class="btn btn-primary ms-1 popup-form-search-button popup-add-btn" data-heading="Search Property" data-filters="{client_id:1}" data-element="property_1" data-after-load-func="set_property_id" data-form-url="<?= base_url('properties/search-list') ?>">
                                                                                        <i class="mdi mdi-magnify search-widget-icon"></i>
                                                                                </button>
                                                                                </div>
                                                                            </td>
                                                                            <td class="align-top">
                                                                                <select class="form-control select2" required name="service_1" id="service_1">
                                                                                    <option value=''></option>
                                                                                </select>
                                                                            </td>
                                                                            <td class="align-top">
                                                                                <select class="form-control select2" required name="frequency_1" id="frequency_1">
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
                                                                                    <button type="button" class="btn btn-primary ms-1 popup-form-search-button popup-add-btn" data-heading="Search SORs" data-element="sor_1" data-after-load-func="set_sor_from_search" data-form-url="<?= base_url('system/sor/search-list') ?>">
                                                                                        <i class="mdi mdi-magnify search-widget-icon"></i>
                                                                                    </button>
                                                                                </div>
                                                                                <input type="hidden" name="sor_id_hidden_1" id="sor_id_hidden_1" />
                                                                            </td>
                                                                            <!-- Fix price removed: SOR Type select is used. -->
                                                                            <td class="align-top">
                                                                                <input type="number" class="form-control labor-value text-end" readonly value='0' name="labor_1" id="labor_1" />
                                                                            </td>
                                                                            <td class="align-top">
                                                                                <input type="number" class="form-control sell-value text-end" readonly value='0' name="sell_1" id="sell_1" />
                                                                                <input type="hidden" class="form-control sell-value-original"  value='0' name="sell_value_original_1" id="sell_value_original_1" />
                                                                            </td>
                                                                            <td class="align-top">
                                                                                <input type="date" class="form-control schedule-start-date" required name="start_date_1" id="start_date_1" min="<?= date('Y-m-d') ?>" />
                                                                            </td>
                                                                            <td class="align-top">
                                                                                <select class="form-control add_to_queue_selector select2" name="add_to_queue_1" id="add_to_queue_1" data-row-num="1">
                                                                                    <option value=''>Select Queue</option>
                                                                                </select>
                                                                            </td>
                                                                            <!--<td class="align-top">
                                                                                <input type="date" class="form-control schedule-end-date"  name="end_date_1" id="end_date_1" />
                                                                            </td> -->

                                                                            <td class="align-top">
                                                                                <input type="radio" id="create_job_1_y" checked="checked" name="create_job_1" value="1" /><label for="create_job_1_y">Yes</label>
                                                                                <input type="radio" id="create_job_1_n" name="create_job_1" value="0" /><label for="create_job_1_n">No</label>
                                                                            </td>                                                                    
                                                                            <td class="align-top"><div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 mp-manual-div" style="display:none">
                                                                                <button type="button" class="btn btn-success add-masterplan-row-btn waves-effect waves-light" ><i class="ri-add-line align-bottom me-1"></i> </button></div>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
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
                                                        <div class="card mb-3 shadow-sm">
                                                            <div class="card-header">
                                                                <h5 class="card-title mb-0"> Service Masterplan</h5>
                                                            </div>    
                                                        <div class="card-body">
                                                                <div class="table-responsive">
                                                                    <table class="table text-muted align-middle mb-0 mt-0 table-hover" id="ajax-datatables2">
                                                                        <thead class="table-light  text-muted"  id="ppm-data2-head">

                                                                        </thead>
                                                                        <tbody id="ppm-data2">

                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- <div class="card shadow-sm hide">
                                                            <div class="card-header">                                                                 
                                                                 <div class="row align-items-center">
                                                                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12"> 
                                                                        <h5 class="card-title mb-0"> Property Masterplan </h5>
                                                                    </div>
                                                                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12 text-end">
                                                                        <button type="button" class="btn btn-primary waves-effect waves-light" id="queue_masterplan"><i class="las la-briefcase"></i> Generate Job Queue</button>
                                                                        <button type="button" class="btn btn-secondary waves-effect waves-light export-btn ms-1" id="export_contract_masterplan"><i class="las la-file-pdf"></i> Export</button>
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
                                                        </div> -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                 
                                    <div class="card-body pt-0 border border-dashed border-bottom-0 border-end-0 border-start-0 d-none">                                        
                                        <!--end card-body-->
                                        <div class="masterplan-div">
                                            <!-- <h5 class="mb-2">Service Masterplan</h5>
                                            <div class="table-responsive">
                                                <table class="table text-muted align-middle mb-0 mt-0 table-hover" id="ajax-datatables2">
                                                    <thead class="table-light  text-muted"  id="ppm-data2-head">

                                                    </thead>
                                                    <tbody id="ppm-data2">

                                                    </tbody>
                                                </table>
                                            </div> -->
                                             <!-- <div class="mt-1 mb-1">
                                                <div class="row align-items-center">
                                                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12">
                                                        <h5 class="export-button-container flex-grow-1 mb-0 mt-2">Property Masterplan</h5>
                                                    </div>
                                                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12 text-end">
                                                        <button type="button" class="btn btn-primary waves-effect waves-light" id="queue_masterplan"><i class="las la-briefcase"></i> Generate Job Queue</button>
                                                        <button type="button" class="btn btn-secondary waves-effect waves-light export-btn ms-1" id="export_contract_masterplan"><i class="las la-file-pdf"></i> Export</button>
                                                    </div>
                                                </div>
                                            </div> -->
                                            <!-- <div class="table-responsive">
                                                <table class="table text-muted align-middle mb-0 mt-0 table-hover table-nowrap" id="ajax-datatables1">
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
                                                            <th>Job Type</th>
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
            <!--end modal-->
            <form id="ppmHiddenForm" action="" method="post" style="display:none;"></form>

        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
    <script>
        contract_id = "<?= $contract_id; ?>";
    </script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/common.js') ?>"></script>
    <script type="text/javascript" src="<?= base_url('assets/js/datatables/contracts/masterplan-commons.js?v=1.1') ?>"></script>
    <script type="text/javascript" src="<?= base_url('assets/js/datatables/contracts/masterplan.js?v=1.1') ?>"></script>

    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/contract-commons.js') ?>"></script>
    <script type="text/javascript">
        $('.client-sub-nav').find('a[data-tab="client-contracts"]').addClass('active');
    </script>
