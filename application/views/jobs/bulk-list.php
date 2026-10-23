    
    <?php
    require_once APPPATH . 'views/commons/datatables-inc.php';
    ?>
    <div class="main-content dataTables-height-detiles-">
        <div class="page-content">
            <div class="container-fluid">
            <?php
                require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <div class="tab-content- pt-0 text-muted">
                            <div class="same-page-height dataTables-height selling-tab" id="job-tab" role="tabpanel">
                                <div class="card" id="tasksList">

                                    <!-- Tab Navigation -->
                                    <div class="card-header border-bottom-0 p-0">
                                        <div class="d-flex profile-wrapper position-relative">
                                            <ul class="client-sub-nav nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1 pt-0" id="bulk-tabs" role="tablist">
                                                <li class="nav-item" role="presentation">
                                                    <a class="nav-link fs-14 active" id="tab-job-list" data-bs-toggle="tab" href="#panel-job-list" role="tab">
                                                        <i class="ri-list-check d-inline-block d-md-none"></i>
                                                        <span class="d-none d-md-inline-block">Job Process List</span>
                                                    </a>
                                                </li>
                                                <li class="nav-item" role="presentation">
                                                    <a class="nav-link fs-14" id="tab-batches" data-bs-toggle="tab" href="#panel-batches" role="tab">
                                                        <i class="ri-archive-stack-line d-inline-block d-md-none"></i>
                                                        <span class="d-none d-md-inline-block">Processed Batches</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="tab-content">
                                        <!-- Tab 1: Job Process List -->
                                        <div class="tab-pane fade show active" id="panel-job-list" role="tabpanel">
                                            <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn">
                                                <?php require_once APPPATH . 'views/jobs/inc/filters-new.php'; ?>
                                            </div>
                                            <div class="card-body pt-0 same-position-btn- all-tbl-same-width- check-input-check-right" style="padding-top: 10px !important;">
                                                <table class="table align-middle table-nowrap mb-0 display job-listing-table table-hover task-pending-main" id="bulk-job-datatables">
                                                    <thead class="table-light text-muted">
                                                        <tr>
                                                            <th>Id</th>
                                                            <th><input class="form-check-input assign-btn allselect" type="checkbox"/></th>
                                                            <th>&nbsp; &nbsp; Job Id</th>
                                                            <th>Work Order</th>
                                                            <th>Job</th>
                                                            <th>Client</th>
                                                            <th>Property</th>
                                                            <th>Contract</th>
                                                            <th>Address</th>
                                                            <th>Postcode</th>
                                                            <th>Total Sells (£)</th>
                                                            <th>Total Costs (£)</th>
                                                            <th>Tags</th>
                                                            <th>Status</th>
                                                            <!-- <th>Current Status</th> -->
                                                            <th>Fin. Status</th>
                                                            <th>Target</th>
                                                            <th>Created</th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                        </div>

                                        <!-- Tab 2: Processed Batches -->
                                        <div class="tab-pane fade" id="panel-batches" role="tabpanel">
                                            <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn">
                                                <div class="d-flex justify-content-between">
                                                    <div>
                                                        <div class="btn-group mb-2 me-1">
                                                            <div class="search-box" style="width: 220px;">
                                                                <input type="text" id="batches-search" class="form-control" placeholder="Batch ID, Job Code, Client...">
                                                                <i class="mdi mdi-magnify search-widget-icon"></i>
                                                            </div>
                                                        </div>
                                                        <div class="btn-group mb-2 me-1">
                                                            <div class="input-light" style="width: 145px;">
                                                                <input type="text" class="form-control" id="batches-date-from" placeholder="From DD/MM/YYYY">
                                                            </div>
                                                        </div>
                                                        <div class="btn-group mb-2 me-1">
                                                            <div class="input-light" style="width: 145px;">
                                                                <input type="text" class="form-control" id="batches-date-to" placeholder="To DD/MM/YYYY">
                                                            </div>
                                                        </div>
                                                        <div class="btn-group mb-2 me-1">
                                                            <div class="input-light" style="width: 150px;">
                                                                <select class="form-control" id="batches-fin-status">
                                                                    <option value="">All Fin. Status</option>
                                                                    <option value="1">Clear to Invoice</option>
                                                                    <option value="4">APP Buildup</option>
                                                                    <option value="3">APP Submitted</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="btn-group me-1" style="top: -4px;">
                                                            <button class="btn btn-primary px-2 waves-effect waves-light" id="batches-search-btn" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="hstack gap-1 justify-content-end">
                                                            <button type="button" class="btn btn-warning waves-effect waves-light ms-1" id="batches-change-status-btn" title="Change status of selected batches">
                                                                <i class="ri-send-plane-line"></i> Change Status
                                                            </button>
                                                            <div class="btn-group ms-1">
                                                                <button type="button" class="btn btn-secondary waves-effect waves-light dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false" title="Import">
                                                                    <i class="las la-file-import"></i> Import
                                                                </button>
                                                                <div class="dropdown-menu dropdown-menu-end dropdown-menu-md p-4" style="min-width:280px;">
                                                                    <div class="mb-2">
                                                                        <label class="form-label">Import Batch Update</label>
                                                                        <div class="input-group custom-file-button" style="width:100%;">
                                                                            <input autocomplete="off" id="batch_import_file" type="file" class="form-control" accept=".xlsx,.xls">
                                                                            <label class="input-group-text mb-0" for="batch_import_file">Browse</label>
                                                                        </div>
                                                                    </div>
                                                                    <div id="batch-import-error" class="text-danger small mb-1 d-none"></div>
                                                                    <div class="hstack gap-2 mt-2">
                                                                        <button type="button" class="btn btn-secondary w-50 ms-0" id="batch-import-upload-btn" onclick="handleBatchImportUpload()">
                                                                            <span class="spinner-border spinner-border-sm me-1 d-none" id="batch-import-spinner"></span>
                                                                            Upload
                                                                        </button>
                                                                        <a class="btn btn-outline-dark w-50" href="<?= app_url('resources/templates/ajs-job-bulk-update.xlsx') ?>" download>Template</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <button type="button" class="btn btn-secondary waves-effect waves-light ms-1" id="batches-export-btn">
                                                                <i class="las la-file-export"></i> Export
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-body pt-0 same-position-btn-" style="padding-top: 10px !important;">
                                                <table class="table align-middle table-nowrap mb-0 display table-hover" id="processed-batches-datatables">
                                                    <thead class="table-light text-muted">
                                                        <tr>
                                                            <th style="width:32px;"><input class="form-check-input" type="checkbox" id="batches-select-all" title="Select all visible"></th>
                                                            <th>Batch Code</th>
                                                            <th>Client</th>
                                                            <th>Jobs</th>
                                                            <th>Fin. Status</th>
                                                            <th class="text-end">Amount</th>
                                                            <th class="text-end">VAT</th>
                                                            <th class="text-end">Total</th>
                                                            <th>Last Updated</th>
                                                            <th>Actions</th>
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

        <!-- Batch Jobs Modal -->
        <div class="modal fade" id="batchJobsModal" tabindex="-1" aria-labelledby="batchJobsModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="batchJobsModalLabel">Jobs in Batch <span id="batch-jobs-code"></span></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div id="batch-jobs-loading" class="text-center py-4">
                            <div class="spinner-border text-primary" role="status"></div>
                        </div>
                        <div id="batch-jobs-content" style="display:none;">
                            <div class="mb-2" style="max-width:320px;">
                                <input type="text" class="form-control form-control-sm" id="batch-jobs-search" placeholder="Search by Job Code / Work Order...">
                            </div>
                            <div class="table-responsive">
                                <table class="table table-sm table-bordered align-middle" id="batch-jobs-table">
                                    <thead class="table-light">
                                        <tr>
                                            <th>Job ID</th>
                                            <th>Work Order</th>
                                            <th>Client</th>
                                            <th>Status</th>
                                            <th>Fin. Status</th>
                                            <th>Target Date</th>
                                            <th class="text-end">Material</th>
                                            <th class="text-end">Labor</th>
                                            <th class="text-end">Sell</th>
                                            <th class="text-end">Qty</th>
                                            <th class="text-end">Amount</th>
                                            <th class="text-end">VAT</th>
                                            <th class="text-end">Total</th>
                                            <th class="text-end">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="batch-jobs-body"></tbody>
                                </table>
                            </div>
                        </div>
                        <div id="batch-jobs-empty" class="text-center text-muted py-3" style="display:none;">No jobs found for this batch.</div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Batch Jobs Modal -->

        <!-- Change Batch Status Modal -->
        <div class="modal fade" id="batchChangeStatusModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header pb-3">
                        <h5 class="modal-title">Change Batch Status</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card-body border-0 border-dashed border-end-0 border-start-0 mb-4">
                            <div class="row g-2">
                                <div class="col-xxl-12 col-md-12 mt-1 mb-3">
                                    <div class="input-light">
                                        <label class="form-label">Batch Status <span class="text-danger">*</span></label>
                                        <select class="form-control" id="batch-change-status-select">
                                            <option value="">Select Status</option>
                                            <option value="RI">Clear to Invoice</option>
                                            <option value="AB">APP Buildup</option>
                                            <option value="AS">APP Submitted</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success waves-effect waves-light" id="batch-change-status-save-btn">Save</button>
                        <button type="button" class="btn btn-light waves-effect waves-light" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Change Batch Status Modal -->

        <!-- Add Jobs to Batch Modal -->
        <div class="modal fade" id="batchAddJobsModal" tabindex="-1" aria-labelledby="batchAddJobsModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="batchAddJobsModalLabel">Add Jobs to Batch <span id="batch-add-code" class="text-primary"></span></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div id="batch-add-loading" class="text-center py-4">
                            <div class="spinner-border text-primary" role="status"></div>
                        </div>
                        <div id="batch-add-content" style="display:none;">
                            <div class="mb-2" style="max-width:320px;">
                                <input type="text" class="form-control form-control-sm" id="batch-add-search" placeholder="Search by Job Code / Work Order...">
                            </div>
                            <div class="table-responsive">
                                <table class="table table-sm table-bordered align-middle" id="batch-add-table">
                                    <thead class="table-light">
                                        <tr>
                                            <th style="width:32px;"><input class="form-check-input" type="checkbox" id="batch-add-select-all"></th>
                                            <th>Job ID</th>
                                            <th>Work Order</th>
                                            <th>Status</th>
                                            <th>Fin. Status</th>
                                            <th>Target Date</th>
                                            <th class="text-end">Material</th>
                                            <th class="text-end">Labor</th>
                                            <th class="text-end">Sell</th>
                                            <th class="text-end">Qty</th>
                                            <th class="text-end">Amount</th>
                                            <th class="text-end">VAT</th>
                                            <th class="text-end">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody id="batch-add-body"></tbody>
                                </table>
                            </div>
                        </div>
                        <div id="batch-add-empty" class="text-center text-muted py-3" style="display:none;">No eligible jobs found for this client.</div>
                        <div id="batch-add-error" class="text-danger small d-none"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" id="batch-add-submit-btn">
                            <span class="spinner-border spinner-border-sm me-1 d-none" id="batch-add-spinner"></span>
                            Add Selected
                        </button>
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Add Jobs to Batch Modal -->

        <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/job-bulk.js?v=1.0.1') ?>"></script>
        <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
        <script type="text/javascript">
            $(document).ready(function (e) {
                var hash = window.location.hash;
                if (hash) {
                    hash = hash.replace('#', ''); // strip the # at the beginning of the string
                    if (hash == 'add') {
                        $('button.popup-form-button').trigger('click');
                    }
                }
            });
        </script>