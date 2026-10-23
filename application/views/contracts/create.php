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
            <div class="row pt-0">
                <div class="col-lg-12">
                    <div>
                        <?php
                        $title = "Overview";
                        if (!empty($client_id)) {

                            require_once APPPATH . 'views/clients/inc/nav-tab.php';
                        } else {
                            require_once APPPATH . 'views/contracts/inc/nav-tab.php';
                        }
                        ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active selling-tab" id="contract" role="tabpanel">
                                <div class="card">
                                    <?php
                                    if (isset($id) && $id > 0) {
                                        $contract_hash_id = hash_encode($id);
                                    }

                                    $contract_base_url = cdn_url('contract/');
                                    if (!empty($client_id)) {
                                        $client_hash_id = hash_encode($client_id);
                                        $contract_base_url = cdn_url('clients/' . $client_hash_id . '/contract/');
                                        $this->load->view('contracts/inc/sub-nav-tab', ['client_id' => $client_id, 'title' => "Overview"]);
                                    }

                                    $action = app_url('contract/create');
                                    if (isset($id) && $id > 0) {
                                        $action = app_url('contract/edit/');
                                    }

                                    $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Holiday'];
                                    ?>
                                    <div class="card-body pt-2">
                                        <form class="tablelist-form mt-1" autocomplete="off" id="contractForm" method="post" action="<?= $action ?>">
                                            <input type="hidden" id="edit_id" name="edit_id" value="<?= $id ?? null ?>" />
                                            <div class="row gy-2 letter-form">
                                                <?php
                                                if (isset($id) && $id > 0) {
                                                    ?>
                                                    <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-12 contract-progress-div">
                                                        <h5 class="mt-0 mb-2">Contract Setup </h5>
                                                        <small>*This sections are needed in order to activate a contract</small>
                                                        <div class="list-group">
                                                            <a href="<?= $contract_base_url . 'edit/' . $contract_hash_id ?>" type="button" class="list-group-item list-group-item-action progress-item-overview" aria-current="true">Overview </a>
                                                            <a href="<?= $contract_base_url . 'personnel/' . $contract_hash_id ?>" type="button" class="list-group-item list-group-item-action progress-item-personnel">Personnel<!-- <i class="mdi mdi-close-thick float-end fs-16"></i>--></a>
                                                            <a href="<?= $contract_base_url . 'services/' . $contract_hash_id ?>" type="button" class="list-group-item list-group-item-action progress-item-workstream">Workstream</a>
                                                            <a href="<?= $contract_base_url . 'master-plan/' . $contract_hash_id ?>" type="button" class="list-group-item list-group-item-action progress-item-ppm">PPM Master Plan</a>
                                                            <a style="display: none" href="<?= $contract_base_url . 'selling-and-billing/' . $contract_hash_id ?>" type="button" class="list-group-item list-group-item-action progress-item-finance">Contract Finance</a>
                                                        </div>
                                                    </div>
                                                    <?php
                                                }
                                                ?>
                                                <div class="col-xxl-12 col-md-12">
                                                    <div class="mb-0 mt-0">
                                                        <label class="select-billing">Type <span class="text-danger">*</span><span class="tooltip-container" data-master-code="CONTRACT_TYPE"><i class="bx bx-info-circle tooltip"></i></span></label>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" id="reactive_c" type="radio" name="type" value="reactive">
                                                            <label class="form-check-label"  for="reactive_c">Reactive</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" id="ppm_c" type="radio" name="type"  value="ppm">
                                                            <label class="form-check-label" for="ppm_c">PPM</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" id="combined_c" name="type"  value="combined">
                                                            <label class="form-check-label" for="combined_c">Combined</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="type" id="project_c" value="project">
                                                            <label class="form-check-label" for="project_c">Project</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-xxl-3 col-md-6">
                                                    <div class="input-light multi-choice">
                                                        <label for="location" class="form-label">Client <span class="text-danger">*</span></label>
                                                        <div class="d-flex error-div">
                                                            <select class="form-control" id="client_id" name="client_id" <?= !empty($client_id) ? 'readonly' : '' ?> >
                                                                <option value="" selected>Select</option>
                                                            </select>
                                                            <!--<button data-heading="Add New Client" data-after-load-func="client_create_form" data-form-url="<?= cdn_url('clients/create?in_popup=1') ?>" type="button" class="popup-form-button btn btn-success ms-1" data-bs-toggle="modal" data-bs-target="#zoomInModal"><i class="ri-add-line align-bottom me-1"></i></button>-->
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-xxl-3 col-md-6">
                                                    <div>
                                                        <label for="set-job-types" class="form-label">PO Number / Reference <span class="text-danger">*</span><span class="tooltip-container" data-master-code="CONTRACT_REF_NO"><i class="bx bx-info-circle tooltip"></i></span></label>
                                                        <input type="text" class="form-control" id="reference_number" name="reference_number">
                                                    </div>
                                                </div>

                                                <div class="col-xxl-3 col-md-6">
                                                    <div>
                                                        <label for="set-job-types" class="form-label">AJS Contract Number <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" id="contract_number" name="contract_number">
                                                    </div>
                                                </div>

                                                <div class="col-xxl-3 col-md-6">
                                                    <div class="input-light">
                                                        <label class="form-label">Tags</label>
                                                        <div class="d-flex">
                                                            <select class="form-control" name="tags[]" id="tags" data-module="contract" multiple>
                                                            </select>
                                                            <button type="button" class="btn btn-success ms-2 popup-form-button-master popup-add-btn" data-heading="Add New Tag" data-after-load-func="create_tag_form" data-element="tags" data-form-url="<?= cdn_url('system/tag/create?in_popup=1') ?>"><i class="ri-add-line align-bottom"></i></button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-xxl-3 col-md-6">
                                                    <?php $is_edit = (isset($id) && $id > 0); ?>
                                                    <div class="flex-shrink-0">
                                                        <label for="status" class="form-label">Status</label>
                                                        <div class="form-check form-switch form-switch-lg mt-2">
                                                            <?php if (!$is_edit): ?>
                                                            <input type="hidden" name="status" value="0">
                                                            <?php endif; ?>
                                                            <!-- On edit the switch is deliberately unnamed: it posts to contract/change-status instead of the form (see contract.js). -->
                                                            <input class="form-check-input me-1" type="checkbox" role="switch" id="status" <?= $is_edit ? '' : 'name="status" value="1" checked' ?> data-bs-toggle="tooltip" data-bs-placement="top" title="Toggle Active / Inactive">
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- <div class="col-xxl-3 col-md-6">
                                                    <div class="input-light multi-choice">
                                                        <label class="form-label">Category</label>
                                                        <div class="d-flex error-div">
                                                            <select class="form-control" id="category_id" name="category_id">
                                                                <option value="" selected>Select</option>
                                                            </select>

                                                            <button type="button" class="btn btn-success ms-1 popup-form-button-master" data-heading="Add New Category" data-after-load-func="create_master_form" data-element="category_id" data-form-url="<?= base_url('system/master-record/create/CONTRACT_CATEGORY') ?>"><i class="ri-add-line align-bottom me-1"></i></button>
                                                        </div>
                                                    </div>
                                                </div> -->

                                                <div class="col-xxl-12 col-md-12">
                                                    <div class="input-light">
                                                        <label class="form-label">Description</label>
                                                        <div class="d-flex">
                                                            <textarea class="form-control" rows="3" id="description" name="description"></textarea>

                                                    <button type="button" class="btn btn-primary ms-2 popup-form-search-button popup-add-btn phrasebook-btn" data-heading="Use Phrasebook" data-element="description" data-form-url="<?= base_url('system/phrasebook/search-list') ?>"><i class="mdi mdi-book-open-page-variant search-widget-icon"></i></button>
                                                        </div>
                                                    </div>
                                                    
                                                    
                                                </div>

                                                <div class="col-xxl-3 col-md-6">
                                                    <div class="input-light">
                                                        <label class="form-label">Start Date <span class="text-danger">*</span></label>
                                                        <input type="date" class="form-control" id="start_date" name="start_date" >
                                                    </div>
                                                </div>

                                                <div class="col-xxl-3 col-md-6">
                                                    <div class="input-light">
                                                        <label class="form-label">End Date </label>
                                                        <input type="date" class="form-control" id="end_date" name="end_date">
                                                    </div>
                                                </div>

                                                <div class="col-xxl-3 col-md-6">
                                                    <div class="input-light multi-choice">
                                                        <label for="location" class="form-label">Service Coverage</label>
                                                        <div class="hstack gap-3">
                                                            <div class="w-100">
                                                                <input type="time" class="form-control" id="service_start_time" name="service_start_time">
                                                            </div>
                                                            <div class="w-100">
                                                                <input type="time" class="form-control" id="service_end_time" name="service_end_time">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- <div class="col-xxl-3 col-md-6">
                                                    <div class="input-light">
                                                        <label class="form-label">Invoice Type<span class="text-danger">*</span></label>
                                                        <select class="form-control" id="invoice_type" name="invoice_type">
                                                            <option value="">Select Invoice Type</option>
                                                            <option value="I">Individual Job Wise</option>
                                                            <option value="C">Combine all Job</option>
                                                        </select>
                                                    </div>
                                                </div> -->
                                            </div>

                                            <h5 class="mt-3 mb-2">Coverage Period</h5>
                                            <table class="table align-middle table-nowrap contract-table">
                                                <thead class="table-light text-muted">
                                                    <tr>
                                                        <th scope="col">Day</th>
                                                        <th scope="col">Start Hour</th>
                                                        <th scope="col">End Hour</th>
                                                        <th scope="col" class="check-box-true">Closed</th>
                                                        <th scope="col">Open All Day</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <?php
                                                    foreach ($days as $key => $day) {
                                                        ?>
                                                        <tr>
                                                            <td> <?= $day ?>
                                                                <input type="hidden" value="0" name="coverages[<?= $key ?>][id]" id="coverage_id_<?= $key ?>"  />
                                                                <input type="hidden" value="<?= $day ?>" name="coverages[<?= $key ?>][day]" id="coverage_day_<?= $key ?>"  />
                                                            </td>
                                                            <td data-label="Start Hours">
                                                                <div>
                                                                    <input type="time" class="form-control start-time" name="coverages[<?= $key ?>][start_time]" id="coverage_start_time_<?= $key ?>">
                                                                </div>
                                                            </td>
                                                            <td data-label="End Hours">
                                                                <div>
                                                                    <input type="time" class="form-control end-time"  name="coverages[<?= $key ?>][end_time]" id="coverage_end_time_<?= $key ?>">
                                                                </div>
                                                            </td>
                                                            <td data-label="Closed" class="clo">
                                                                <div class="check-box-true">
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox" value="1" data-name="coverages[<?= $key ?>][close]" id="coverage_close_<?= $key ?>">
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td data-label="Open All Day">
                                                                <div>
                                                                    <div class="form-check">
                                                                        <input class="form-check-input" type="checkbox" value="1" data-name="coverages[<?= $key ?>][open]" id="coverage_open_<?= $key ?>">
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    <?php } ?>
                                                </tbody>
                                            </table>

                                            <div class="col-xxl-12 col-sm-12 text-end mt-4">
                                                <div class="hstack gap-2">
                                                    <button type="submit" class="btn btn-lg btn-success add-btn">Save</button>
                                                    <div id="deleteBtnContainer"></div>
                                                    <?php if (isset($edit) && $edit && isset($id) && $id > 0) { ?>               
                                                        <script>
                                                            document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'contract');
                                                        </script>
                                                    <?php }  ?>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <!--end card-body-->
                                </div>
                                <!--end card-->

                                <!-- Contract Documents -->
                                <?php if (isset($id) && $id > 0) { ?>
                                    <div class="card mt-3" id="contract-documents-card">
                                        <div class="card-header d-flex flex-wrap align-items-center justify-content-between">
                                            <h5 class="card-title mb-0">Documents</h5>
                                            <div class="d-flex align-items-center">
                                                <input type="file" id="contract_document_file" class="form-control form-control-sm me-2" style="max-width:260px"
                                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif" />
                                                <button type="button" id="upload_contract_document" class="btn btn-primary btn-sm text-nowrap">
                                                    <i class="ri-upload-2-line align-bottom"></i> Upload
                                                </button>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <table class="table table-nowrap align-middle mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Document</th>
                                                            <th scope="col">Type</th>
                                                            <th scope="col">Uploaded By</th>
                                                            <th scope="col">Uploaded On</th>
                                                            <th scope="col" class="text-end">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="contract_documents_list">
                                                        <tr><td colspan="6" class="text-center">Loading...</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="hidden" id="contract_id" value="<?= $id ?>" />
                                    <script type="text/javascript">
                                        $(function () {
                                            if (typeof load_contract_documents === 'function') {
                                                load_contract_documents($('#contract_id').val());
                                            }
                                        });
                                    </script>
                                <?php } else { ?>
                                    <div class="card mt-3">
                                        <div class="card-header">
                                            <h5 class="card-title mb-0">Documents</h5>
                                        </div>
                                        <div class="card-body">
                                            <p class="text-muted mb-0"><i class="ri-information-line align-bottom me-1"></i>Save the contract first, then you can upload documents here.</p>
                                        </div>
                                    </div>
                                <?php } ?>
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
    <!-- End Page-content -->
</div>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/contract-commons.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/contracts/contract.js') ?>"></script>

<script type="text/javascript">
    $('.client-sub-nav').find('a[data-tab="client-contracts"]').addClass('active');
</script>