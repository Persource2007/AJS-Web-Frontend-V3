<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<?php
$report_id = 0;
$post_url  = api_url('report_builder/create');
if (isset($id) && $id > 0) {
    $report_id = $id;
    $post_url  = api_url('report_builder/edit');
}
?>
<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <div class="same-page-height position-relative">
                <form id="reportForm" name="reportForm" method="POST" action="<?= $post_url; ?>">
                    <!-- Tab panes -->
                    <div class="tab-content pt-0 text-muted">
                        <div class="tab-pane active selling-tab" id="job-tab" role="tabpanel">
                            <div class="card" id="tasksList">
                                <div class="card-body pt-0">
                                    <!--end row-->
                                    <div class="">
                                        <input type="hidden" id="selectedColumns" name="selectedColumns">
                                        <div class="row gx-5 schedule-created-main">
                                            <div class="col-xxl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                                                <h5 class="mb-1">Report Builder</h5>
                                                <hr class="mt-1 mb-3">
                                                <div class="row">
                                                    <div class="col-xxl-4 col-lg-4 col-md-4 col-sm-4">
                                                        <div class="mb-3">
                                                            <label for="basiInput" class="form-label">Report Title <span class="text-danger">*</span></label>
                                                            <input type="text" class="form-control" id="title" name="title">
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-4 col-lg-4 col-md-4 col-sm-4">
                                                        <div class="mb-3">
                                                            <label for="basiInput" class="form-label">Report Code <span class="text-danger">*</span></label>
                                                            <input type="text" class="form-control" id="code" name="code">
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-4 col-lg-4 col-md-4 col-sm-4">
                                                        <div class="mb-3">
                                                            <label for="basiInput" class="form-label">Data Source <span class="text-danger">*</span></label>
                                                            <select class="form-control" id="report_type" name="report_type">
                                                                <option value="">Report Type</option>
                                                                <option value="1">Jobs</option>
                                                                <option value="2">Valuation Report</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row gx-5 schedule-created-main">
                                            <div class="col-xxl-9 col-lg-9 col-md-9 col-sm-9">
                                                <div class="row gx-5 columns-section">
                                                    <div class="col-xxl-5 col-lg-5 col-md-5 col-sm-5">
                                                        <h5 class="mb-1">Available Columns <span class="text-danger">*</span></h5>
                                                        <hr class="mt-1 mb-3">
                                                        <ul class="report-main">

                                                        </ul>
                                                    </div>
                                                    <div class="col-xxl-7 col-lg-7 col-md-7 col-sm-7">
                                                        <h5 class="mb-1">Selected Columns</h5>
                                                        <hr class="mt-1 mb-3">
                                                        <div id="draggableList" class="list-group col template-list">

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xxl-3 col-lg-3 col-md-3 col-sm-3 mb-3">
                                                <h5 class="mb-1">Filters <small>(optional)</small></h5>
                                                <hr class="mt-1 mb-3">
                                                <div class="mb-3">
                                                    <div class="input-light">
                                                        <select class="form-control search" data-is-autocomplete="1" name="filters[client_properties.client_id]" id="client_id_filter">
                                                            <option value="">All Clients</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <div class="input-light">
                                                        <select class="form-control search" data-is-autocomplete="1" name="filters[contract_id]" id="contract_id_filter">
                                                            <option value="">All Contracts</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <div class="input-light">
                                                        <select class="form-control search" data-is-autocomplete="1" name="filters[services.workstream_id]" id="workstream_id_filter">
                                                            <option value="">All Workstreams</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <div class="input-light">
                                                        <select class="form-control search" data-is-autocomplete="1" name="filters[jobs.service_id]" id="service_id_filter">
                                                            <option value="">All Job Types</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <div class="input-light">
                                                        <select class="form-control search" data-is-autocomplete="1" name="filters[property_id]" id="property_id_filter">
                                                            <option value="">All Properties</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <div class="input-light">
                                                        <select class="form-control " name="filters[jobs.status_id]" id="status_id_filter">
                                                            <option value="">All Status</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <div class="input-light">
                                                        <select class="form-control" name="filters[module_tags.tag_id]" id="tag_id_filter">
                                                            <option value="">All Tag</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xxl-12 col-md-12">
                                            <h5 class="mb-1">Data Sorting </h5>
                                            <hr class="mt-1 mb-3">
                                            <div class="row">
                                                <div class="col-xxl-3 col-lg-3 col-md-3 col-sm-3">
                                                    <div class="mb-3">
                                                        <label for="sort_order" class="form-label">Sort By <span class="text-danger">*</span></label>
                                                        <select class="form-control" id="sort_order" name="sort_order">
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-lg-3 col-md-3 col-sm-3">
                                                    <div class="mb-3">
                                                        <label for="sort_type" class="form-label">Sort Type <span class="text-danger">*</span></label>
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
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-3 col-lg-3 col-md-3 col-sm-3">
                                                    <div class="bottom-btn-main">
                                                        <input type="hidden" name="report_id" id="report_id" value="<?= @$id ?>" />
                                                        <?php
                                                        if ($report_id > 0) {
                                                        ?>
                                                            <button type="submit" class="btn btn-success btn-lg add-btn">Update</button>
                                                        <?php
                                                        } else {
                                                        ?>
                                                            <button type="submit" class="btn btn-success btn-lg add-btn">Save</button>
                                                        <?php
                                                        }
                                                        ?>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xxl-12 col-md-12">
                                            <h5 class="mb-1">Preview </h5>
                                            <hr class="mt-1 mb-3">
                                            <div class="table-responsive mb-0">
                                                <table id="preview-table" class="display table dt-responsive align-middle table-nowrap mb-0 table-hover">
                                                    <thead>
                                                        <tr></tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr></tr>
                                                        <tr></tr>
                                                        <tr></tr>
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
                </form>
            </div>
            <!--end col-->
        </div>
        <!--end row-->
    </div>
    <!-- container-fluid -->
</div>
<!-- End Page-content -->
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/reports/reports-builder.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>