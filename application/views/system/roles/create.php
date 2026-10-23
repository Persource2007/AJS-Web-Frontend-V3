<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $bc_title = 'Role Management';
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <?php include_once APPPATH . 'views/system/inc/secondary-nav.php'; ?>
                        <!-- Tab panes -->
                        <div class="tab-content text-muted">
                            <div class="tab-pane active selling-tab" id="role-management" role="tabpanel">
                                <div class="card same-page-height">
                                    <div class="card-body">
                                        <?php
                                        $action = app_url('role/create');
                                        if (isset($id) && $id > 0) {
                                            $action = app_url('role/edit/');
                                        }
                                        ?>
                                        <form class="tablelist-form mt-1" autocomplete="off" id="roleForm" method="post" action="<?= $action ?>">
                                            <input type="hidden" value="<?= $id ?? null ?>" id="edit_id" name="edit_id" />
                                            <div class="row gy-3 letter-form">
                                                <h5 class="mt-2 mb-1"> <?= isset($id) && $id > 0 ? 'Edit' : 'Create' ?> Role</h5>
                                                <div class="row g-2 align-items-center mt-0">
                                                    <div class="col-auto ms-2">
                                                        <label for="title" class="col-form-label">Role Name <span class="text-danger">*</span></label>
                                                    </div>
                                                    <div class="col-auto me-4">
                                                        <input type="text" name="title" id="title" class="form-control" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Super Admin / System Admin / Contract Manager / Account Manager / Engineer Supervisor / Engineer / Surveyor / QA / Scheduling Staff / Client / RLO / Contractor" placeholder="Enter role name">
                                                    </div>
                                                    <div class="col-auto">
                                                        <label for="role_code" class="col-form-label">Role Code <span class="text-danger">*</span></label>
                                                    </div>
                                                    <div class="col-auto me-4">
                                                        <input type="text" name="role_code" id="role_code" class="form-control" placeholder="Enter role code">
                                                    </div>
                                                    <div class="col-auto me-4">
                                                        <div class="flex-shrink-0">
                                                            <div class="form-check form-switch form-switch-right form-switch-lg">
                                                                <label for="desktop-switch" class="form-label text-muted me-4">Desktop</label>
                                                                <input class="form-check-input" type="checkbox" id="desktop-switch" data-name="desktop_access" value="1" checked>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-auto">
                                                        <div class="flex-shrink-0">
                                                            <div class="form-check form-switch form-switch-right form-switch-lg">
                                                                <label for="mobile-switch" class="form-label text-muted me-4">Mobile</label>
                                                                <input class="form-check-input" type="checkbox" id="mobile-switch" data-name="mobile_access" value="1">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-auto me-4" id="mobile-role" style="display: none; margin-left:16px">
                                                        <div >
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" name="mobile_role" id="engineer" value="engineer">
                                                                <label class="form-check-label" for="engineer">Engineer</label>
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" name="mobile_role" id="surveyor" value="surveyor">
                                                                <label class="form-check-label" for="surveyor">Surveyor / QA</label>
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" name="mobile_role" id="rlo" value="rlo">
                                                                <label class="form-check-label" for="rlo">RLO</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="desktop-module">
                                                <h5 class="mt-2 mb-2">Module Access</h5>
                                                <table class="table align-middle table-nowrap contract-table">
                                                    <thead class="table-light text-muted">
                                                        <tr class="position-sticky" style="top: 60px; z-index: 9;">
                                                            <th scope="col">Modules</th>
                                                            <th scope="col">All</th>
                                                            <th scope="col">View</th>
                                                            <th scope="col">Add</th>
                                                            <th scope="col">Edit</th>
                                                            <th scope="col">Delete</th>
                                                            <th scope="col" style="width:10%;">Approve / Reject</th>
                                                            <th scope="col">Import</th>
                                                            <th scope="col">Export</th>
                                                            <th scope="col">Clients</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="col-xxl-12 col-sm-12 text-end mt-4">
                                                <a class="btn btn-light waves-effect waves-light" href="<?= base_url('system/role/list') ?>">
                                                    Cancel
                                                </a>
                                                <button type="submit" class="btn btn-success add-btn">Save</button>
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
    <!-- End Page-content -->
    <input type="hidden" id="is_create_page" value="1">

    <!-- End Page-content -->
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/roles.js') ?>"></script>