<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="row sub-poperty-details-section">
    <div class="col-xxl-12">
        <div class="">
            <?php if ($this->input->get('modal') == true) { ?>
                <div class="d-flex profile-wrapper">
                    <!-- Nav tabs -->
                    <ul class="client-sub-nav nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1 pt-1" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link fs-14 active" data-bs-toggle="tab" href="#tab1" role="tab">
                                <i class="ri-airplay-fill d-inline-block d-md-none"></i>
                                <span class="d-none d-md-inline-block">Overview</span>
                            </a>
                        </li>
                        <!-- These three tabs load asset/all and job/get_all, which need view_assets
                             and view_jobs. The popup opens from screens a role can reach without
                             either module, so the tabs are dropped rather than left to fail. -->
                        <li class="nav-item check-permission" data-module="Assets" data-action="view">
                            <a class="nav-link fs-14 assets-tab" data-bs-toggle="tab" href="#tab4" role="tab">
                                <i class="ri-list-unordered d-inline-block d-md-none"></i>
                                <span class="d-none d-md-inline-block">Assets</span>
                            </a>
                        </li>
                        <li class="nav-item check-permission" data-module="Jobs" data-action="view">
                            <a class="nav-link fs-14 upcoming-job-tab" data-bs-toggle="tab" href="#tab2" role="tab">
                                <i class="ri-list-unordered d-inline-block d-md-none"></i>
                                <span class="d-none d-md-inline-block">Open Jobs</span>
                            </a>
                        </li>
                        <li class="nav-item check-permission" data-module="Jobs" data-action="view">
                            <a class="nav-link fs-14 job-history-tab" data-bs-toggle="tab" href="#tab2" role="tab">
                                <i class="ri-list-unordered d-inline-block d-md-none"></i>
                                <span class="d-none d-md-inline-block">Job History</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link fs-14 certificate-tab" data-bs-toggle="tab" href="#tab3" role="tab">
                                <i class="ri-list-unordered d-inline-block d-md-none"></i>
                                <span class="d-none d-md-inline-block">Certificates</span>
                            </a>
                        </li>
                    </ul>
                </div>
            <?php } ?>
            <!-- Tab panes -->

            <div class="tab-content text-muted mt-3">
                <div class="tab-pane fade show active" id="tab1" role="tabpanel">
                    <div class="card">
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="border-main-details">
                                    <table class="table mb-0">
                                        <tbody>
                                            <tr>
                                                <td><b>UPRN</b></td>
                                                <td class="detail-data"><span id="detail_uprn_no"></span></td>
                                            </tr>
                                            <tr>
                                                <td><b>Client Code</b></td>
                                                <td class="detail-data"><span id="detail_client_code"></span></td>
                                            </tr>
                                            <tr>
                                                <td class="fw-medium">Resident <a href="javascript:void(0)" class="edit-resident-detail ms-2 check-permission" title="Edit resident detail" data-module="Properties" data-action="edit">
                                                        <i class="ri-edit-line"></i>
                                                    </a></td>
                                                <td class="detail-data"><span id="detail_resident_name"></span></td>
                                            </tr>
                                            <tr>
                                                <td><b>Address </b> <a href="javascript:void(0)" class="edit-resident-detail ms-2 check-permission" title="Edit resident detail" data-module="Properties" data-action="edit">
                                                        <i class="ri-edit-line"></i>
                                                    </a></td>
                                                <td class="detail-data"><span id="detail_address"></span></td>
                                            </tr>
                                            <tr>
                                                <td class="fw-medium">Contact Methods</td>
                                                <td class="detail-data"><span id="detail_resident_contact_methods_name"></span></td>
                                            </tr>
                                            <tr>
                                                <td class="fw-medium">Pref. Method</td>
                                                <td class="detail-data"><span id="detail_preferred_contact_method_name"></span></td>
                                            </tr>
                                            <tr>
                                                <td class="fw-medium">Tags</td>
                                                <td class="detail-data"><span id="detail_tags"></span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="border-main-details">
                                    <table class="table mb-0">
                                        <tbody>
                                            <tr>
                                                <td><b>Status</b></td>
                                                <td class="detail-data"><span id="detail_status"></span></td>
                                            </tr>
                                            <tr>
                                                <td><b>Property Type</b></td>
                                                <td class="detail-data"><span id="detail_property_type_name"></span></td>
                                            </tr>
                                            <tr>
                                                <td><b>Block / Prop. ID</b></td>
                                                <td class="detail-data"><span id="detail_parent_uprn_no"></span></td>
                                            </tr>
                                            <tr class="hide">
                                                <td><b>AJS Prop. ID</b></td>
                                                <td class="detail-data"><span id="detail_ajs_property_id"></span></td>
                                            </tr>
                                            <tr>
                                                <td><b>Client Prop. ID</b></td>
                                                <td class="detail-data"><span id="detail_client_property_id"></span></td>
                                            </tr>
                                            <tr>
                                                <td><b>Number of bedrooms</b></td>
                                                <td class="detail-data"><span id="detail_size"></span></td>
                                            </tr>
                                            <tr>
                                                <td><b>Units</b></td>
                                                <td class="detail-data"><span id="detail_units"></span></td>
                                            </tr>
                                            <tr>
                                                <td><b>Floors</b></td>
                                                <td class="detail-data"><span id="detail_no_of_floors"></span></td>
                                            </tr>
                                            <tr>
                                                <td><b>Year Built</b></td>
                                                <td class="detail-data"><span id="detail_year_built"></span></td>
                                            </tr>
                                            <tr>
                                                <td><b>Account Code</b></td>
                                                <td class="detail-data"><span id="detail_account_code"></span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="border-main-details">
                                    <table class="table mb-0">
                                        <tbody>
                                            <tr>
                                                <td><b>Notes</b></td>
                                                <td class="detail-data"><span id="detail_notes"></span></td>
                                            </tr>
                                            <tr>
                                                <td><b>Access Note</b></td>
                                                <td class="detail-data"><span id="detail_access_note"></span></td>
                                            </tr>
                                            <tr>
                                                <td><b>Block</b></td>
                                                <td class="detail-data"><span id="detail_is_block"></span></td>
                                            </tr>
                                            <tr>
                                                <td><b>HRB</b></td>
                                                <td class="detail-data"><span id="detail_is_hrb"></span></td>
                                            </tr>
                                            <tr>
                                                <td><b>Asbestos</b></td>
                                                <td class="detail-data"><span id="detail_is_asbestos"></span></td>
                                            </tr>
                                            <tr>
                                                <td><b>Asbestos Register Link</b></td>
                                                <td class="detail-data"><a target="_blank"><span id="detail_asbestos_register_link"></span></a></td>
                                            </tr>
                                            <tr>
                                                <td><b>Access Note</b></td>
                                                <td class="detail-data"><span id="detail_access_note">-</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </br>
                                    <h5 class="mb-1">Alerts</h5>
                                    <hr class="mt-1 mb-2">
                                    <table class="table mb-0">
                                        <tbody id="details_alerts">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-4">
                                <div class="border-main-details">
                                    <h5 class="mb-1">Leaseholder Details</h5>
                                    <hr class="mt-1 mb-2">
                                    <table class="table mb-0">
                                        <tbody>
                                            <tr>
                                                <td><b>Name</b></td>
                                                <td class="detail-data"><span id="detail_leaseholder_name"></span></td>
                                            </tr>
                                            <tr>
                                                <td><b>Address</b></td>
                                                <td class="detail-data"><span id="detail_leaseholder_address"></span></td>
                                            </tr>
                                            <tr>
                                                <td class="fw-medium">Contact Methods</td>
                                                <td class="detail-data"><span id="detail_leaseholder_contact_methods_name"></span></td>
                                            </tr>
                                            <tr>
                                                <td class="fw-medium">Pref. Method</td>
                                                <td class="detail-data"><span id="detail_leaseholder_preferred_contact_method_name"></span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="tab2" role="tabpanel">
                    <div class="card">
                        <div>
                            <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 p-0 mb-2">
                                <div class="row g-2">
                                    <div class="col-xxl-3 col-sm-6">
                                        <div class="search-box">
                                            <input type="text" id="history_search_term" class="form-control" placeholder="Search By Job Id / Work Order">
                                            <i class="mdi mdi-magnify search-widget-icon"></i>
                                        </div>
                                    </div>

                                    <div class="col-xxl-1 col-sm-2">
                                        <button class="btn btn-primary px-2 waves-effect waves-light" id="search-history" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                                    </div>
                                </div>
                            </div>

                            <!--end row-->
                            <div class="table-responsive">
                                <table class="display table dt-responsive align-middle table-nowrap mb-0 w-100" id="job-history-datatables">
                                    <thead class="table-light text-muted">
                                        <tr>
                                            <th>Id</th>
                                            <th><span class="ps-3">Job Id</span></th>
                                            <th>Work Order</th>
                                            <th>Type</th>
                                            <th>Job</th>
                                            <th>Target Date</th>
                                            <th>Created Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="tab3" role="tabpanel">
                    <div class="card">
                        <div>
                            <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 p-0 mb-2">
                                <div class="row g-2">
                                    <div class="col-xxl-3 col-sm-6">
                                        <div class="search-box">
                                            <input type="text" id="cert_search_term" class="form-control" placeholder="Search By Title / Code">
                                            <i class="mdi mdi-magnify search-widget-icon"></i>
                                        </div>
                                    </div>

                                    <div class="col-xxl-1 col-sm-2">
                                        <button class="btn btn-primary px-2 waves-effect waves-light" id="search-cert" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                                    </div>
                                </div>
                            </div>

                            <!--end row-->
                            <div class="table-responsive">
                                <table class="display table dt-responsive align-middle table-nowrap mb-0 w-100" id="cert-datatables">
                                    <thead class="table-light text-muted">
                                        <tr>
                                            <th>Id</th>
                                            <th></th>
                                            <th>Code</th>
                                            <th>Title</th>
                                            <th>Created By</th>
                                            <th>Created Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="tab4" role="tabpanel">
                    <div class="card">
                        <div>
                            <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 p-0 mb-2">
                                <div class="row g-2">
                                    <div class="col-xxl-3 col-sm-6">
                                        <div class="search-box">
                                            <input type="text" id="asset_search_term" class="form-control" placeholder="Search #Serial  / Model">
                                            <i class="mdi mdi-magnify search-widget-icon"></i>
                                        </div>
                                    </div>

                                    <div class="col-xxl-1 col-sm-2">
                                        <button class="btn btn-primary px-2 waves-effect waves-light" id="search-assets" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                                    </div>
                                </div>
                            </div>

                            <!--end row-->
                            <div class="table-responsive">
                                <table class="display table dt-responsive align-middle table-nowrap mb-0 w-100" id="assets-datatables">
                                    <thead class="table-light text-muted">
                                        <tr>
                                            <th></th>
                                            <th>Id</th>
                                            <th>Location On Site</th>
                                            <th>Client Asset Number</th>
                                            <th>Property UPRN</th>
                                            <th>Serial Number</th>
                                            <th>Equipment Type</th>
                                            <th>Quantity</th>
                                            <th>Installation Date</th>
                                            <th>Expiry Date</th>
                                            <th>Mfr. Warranty Expiry</th>
                                            <th>Our Warranty Expiry</th>
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

    <div class="clearfix"><br /></div>   

</div>
<input type="hidden" id="property_id" value="<?= $id ?? null ?>" />
<input type="hidden" id="client_id" value="<?= $client_id ?? null ?>" />
<input type="hidden" id="is_job_history" value="<?= true ?>" />
<input type="hidden" id="is_detail_page" value="1" />
<script type="text/javascript">
    var is_modal = "<?= $this->input->get('modal') ?>";
</script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/clients/property-details.js?v=1.8') ?>"></script>
<?php  if($this->input->get('modal') == true) { ?>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/property/job-history-modal.js?v=1.1') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/property/asset-modal.js?v=2.0') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/property/certificate-modal.js') ?>"></script>
<?php } ?>