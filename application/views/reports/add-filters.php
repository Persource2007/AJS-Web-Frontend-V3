<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->

<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0">Add New Master</h4>
                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Resources Set up</a></li>
                                <li class="breadcrumb-item active">Add Master</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end page title -->
            <div class="row">

                <?php
                $action = app_url('report/generate');
                ?>
                <form class="tablelist-form pb-4 simplebar-form" action="<?= $action ?>" method="POST" name="addForm" id="addForm" style="height: calc(100vh - 112px);" data-simplebar autocomplete="off">
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4 pt-2">
                                <div class="modal-body pb-3">
                                    <input type="hidden" id="tasksId" />
                                    <div class="row gy-2">
                                        <h5 class="mb-1">Filters <small>(optional)</small></h5>
                                        <hr class="mt-1 mb-3">
                                        <div class="mb-3 col-xxl-6">
                                            <div class="input-light">
                                                <label class="form-label">Client</label>
                                                <select class="form-control search" data-is-autocomplete="1" name="filters[client_properties.client_id]" id="client_id_filter">
                                                    <option value="">All Clients</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mb-3 col-xxl-6">
                                            <div class="input-light">
                                                <label class="form-label">Contract</label>
                                                <select class="form-control search" data-is-autocomplete="1" name="filters[jobs.contract_id]" id="contract_id_filter">
                                                    <option value="">All Contracts</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mb-3 col-xxl-6">
                                            <div class="input-light">
                                                <label class="form-label">Workstream</label>
                                                <select class="form-control search" data-is-autocomplete="1" name="filters[services.workstream_id]" id="workstream_id_filter">
                                                    <option value="">All Workstreams</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mb-3 col-xxl-6">
                                            <div class="input-light">
                                                <label class="form-label">Job Type</label>
                                                <select class="form-control search" data-is-autocomplete="1" name="filters[jobs.service_id]" id="service_id_filter">
                                                    <option value="">All Job Types</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mb-3 col-xxl-6">
                                            <div class="input-light">
                                                <label class="form-label">Property</label>
                                                <select class="form-control search" data-is-autocomplete="1" name="filters[property_id]" id="property_id_filter">
                                                    <option value="">All Properties</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mb-3 col-xxl-6">
                                            <div class="input-light">
                                                <label class="form-label">Job Status</label>
                                                <select class="form-control " name="filters[jobs.status_id]" id="status_id_filter">
                                                    <option value="">All Status</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mb-3 col-xxl-6">
                                            <div class="input-light">
                                                <label class="form-label">Tag</label>
                                                <select class="form-control" name="filters[module_tags.tag_id]" id="tag_id_filter">
                                                    <option value="">All Tag</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mb-3 col-xxl-6">
                                            <div class="input-light">
                                                <label class="form-label">Job Creation Date Range</label>
                                                <input  placeholder="MM/DD/YYYY - MM/DD/YYYY" type="text" class="form-control" data-provider="flatpickr" data-date-format="m/d/Y" data-range-date="true"  id="from_to_dates" name="filters[job_tasks.between_add_date]">
                                            </div>
                                        </div>
                                        <div class="mb-3 col-xxl-6">
                                            <div class="input-light">
                                                <label class="form-label">Invoice Batch</label>
                                                <select class="form-control search" data-is-autocomplete="1" name="filters[invoice_items.invoice_id]" id="batch_id_filter">
                                                    <option value="">All Batches</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <h5 class="mb-1">Data Sorting</h5>
                                        <hr class="mt-1 mb-3">
                                        <div class="col-xxl-3 col-lg-3 col-md-3 col-sm-3">
                                            <div class="mb-3">
                                                <label for="basiInput" class="form-label">Sort By <span class="text-danger">*</span></label>
                                                <select class="form-control" id="sort_order" name="sort_order">
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xxl-3 col-lg-3 col-md-3 col-sm-3">
                                            <div class="mb-3">
                                                <label for="basiInput" class="form-label">Sort Type <span class="text-danger">*</span></label>
                                                <select class="form-control" id="sort_type" name="sort_type">
                                                    <option value="ASC">Ascending</option>
                                                    <option value="DESC">Descending</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xxl-3 col-lg-3 col-md-3 col-sm-3">
                                            <div class="mb-3">
                                                <label for="group_by" class="form-label">Group By</label>
                                                <select class="form-control" id="group_by" name="group_by">
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <!--end row-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="offcanvas-foorter p-3 text-center">
                        <script src="<?= cdn_url('assets/libs/flatpickr/flatpickr.min.js') ?>"></script>
                        <script src="<?= cdn_url('assets/js/app.js') ?>"></script>
                        <div class="hstack gap-2">
                            <input type="hidden" id="template_id" name="template_id" value="<?= $id ?>" />
                            <!-- <button type="submit" name="submit" class="btn btn-success" id="add-btn" value="view">View</button> -->
                            <button type="submit" name="submit" class="btn btn-success" id="add-btn-download" value="download">Download</button>
                            <button type="button" class="btn btn-light" id="close-modal" data-bs-dismiss="offcanvas">Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- container-fluid -->
    </div>




    <!-- End Page-content -->