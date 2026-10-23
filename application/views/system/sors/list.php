<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid"> 
            <?php
                $bc_title = 'SORs';
                include_once APPPATH . 'views/commons/breadcrumb.php';
            ?> 
            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <?php include_once APPPATH . 'views/system/inc/secondary-nav.php'; ?>                     
                        <div class="same-page-height dataTables-height selling-tab" id="system-sor" role="tabpanel">
                            <div class="card">
                                <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn">
                                    <?php require_once APPPATH . 'views/system/sors/inc/bulk-upload-sor.php'; ?>
                                </div>
                                <div class="card-body pt-0 all-tbl-same-width" style="padding-top: 10px !important;">  
                                    <table class="table align-middle table-nowrap mb-0 display job-listing-table table-hover task-pending-main" id="ajax-datatables">
                                        <thead class="table-light text-muted">
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th>Id</th>
                                                <th>ID</th>
                                                <th>Type</th>
                                                <th>Code</th>
                                                <th>Client SOR Code</th>
                                                <th>Client</th>
                                                <th>Contract</th>
                                                <th>Workstream</th>
                                                <th>Short Description</th>
                                                <th>Material</th>
                                                <th>Labour</th>
                                                <th>Sell</th>
                                                <th>Certs</th>
                                                <th>Created By</th>
                                                <th>Created On</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div> 
                            </div> 
                        </div> 
                    </div> 
                </div> 
            </div> 
            <!-- Add User Management Modal -->
            <div class="offcanvas offcanvas-end custom-offcanvas-right" tabindex="-1" id="offcanvasRight2" aria-labelledby="offcanvasRightLabel">
                <form class="tablelist-form pb-4" autocomplete="off">
                    <div class="offcanvas-header border-bottom">
                        <h5 class="offcanvas-title" id="offcanvasRightLabel">Add SORs</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body p-0 overflow-hidden">
                        <div data-simplebar style="height: calc(100vh - 112px);">
                            <div class="acitivity-timeline p-4">
                                <div class="modal-body pb-4">
                                    <input type="hidden" id="tasksId" />
                                    <div class="row gy-3">
                                        <div class="row gy-3">
                                            <div class="col-xxl-4 col-md-6">
                                                <div>
                                                    <label for="basiInput" class="form-label">Profile</label>
                                                    <input type="text" class="form-control" id="profile">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-6">
                                                <div class="input-light">
                                                    <label class="form-label">Product Type</label>
                                                    <select class="form-control" data-choices data-choices-search-false name="choices-single-default" id="idRoles">
                                                        <option value="" selected>ComboBox</option>
                                                        <option value="1">Property Type</option>
                                                        <option value="2">Super Admin</option>
                                                        <option value="3">Administrator</option>
                                                        <option value="4">Accounts</option>
                                                        <option value="5">Manager</option>
                                                        <option value="6">Engineer</option>
                                                        <option value="7">Quality Assurance</option>
                                                        <option value="8">Scheduling Planners</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-6">
                                                <div>
                                                    <label for="basiInput" class="form-label">Account Code 1</label>
                                                    <input type="text" class="form-control" id="account">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Attribute 1</label>
                                                    <input type="text" class="form-control" id="attribute">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Account Code 2</label>
                                                    <input type="text" class="form-control" id="account2">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Account Code 3</label>
                                                    <input type="text" class="form-control" id="account3">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Attribute 2 / Trade</label>
                                                    <input type="text" class="form-control" id="attribute2">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Attribute 3</label>
                                                    <input type="text" class="form-control" id="attribute3">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Small Description</label>
                                                    <input type="text" class="form-control" id="description">
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Description 1</label>
                                                    <input type="text" class="form-control" id="description1">
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Description 2</label>
                                                    <input type="text" class="form-control" id="description2">
                                                </div>
                                            </div>
                                            <div class="col-xxl-12 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Description 3</label>
                                                    <input type="text" class="form-control" id="description3">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Manf. Price</label>
                                                    <input type="text" class="form-control" id="price">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Cost. Price</label>
                                                    <input type="text" class="form-control" id="price2">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">List Price</label>
                                                    <input type="text" class="form-control" id="Pric3">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Selling Price</label>
                                                    <input type="text" class="form-control" id="pric4">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Std. Min. Vals</label>
                                                    <input type="text" class="form-control" id="vals">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Stock Unit 2</label>
                                                    <input type="text" class="form-control" id="stock">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Bin</label>
                                                    <input type="text" class="form-control" id="bin">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Supp1</label>
                                                    <input type="text" class="form-control" id="supp1">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Supp2</label>
                                                    <input type="text" class="form-control" id="supp2">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Trade Cat</label>
                                                    <input type="text" class="form-control" id="trade">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Repairs Price</label>
                                                    <input type="text" class="form-control" id="repairs">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Voids Price</label>
                                                    <input type="text" class="form-control" id="voids">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Currently Active</label>
                                                    <input type="text" class="form-control" id="currently-active">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Base SOR %</label>
                                                    <input type="text" class="form-control" id="base-SOR">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Pay Type 6 SOR %</label>
                                                    <input type="text" class="form-control" id="pay-type">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Resource Cat</label>
                                                    <input type="text" class="form-control" id="resource-cat">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Resource Sub Cat</label>
                                                    <input type="text" class="form-control" id="Resource-sub-cat">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Work Type</label>
                                                    <input type="text" class="form-control" id="work-type">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Work Cat</label>
                                                    <input type="text" class="form-control" id="work-cat">
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-md-2">
                                                <div>
                                                    <label for="basiInput" class="form-label">Contract</label>
                                                    <input type="text" class="form-control" id="contract">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--end row-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="offcanvas-foorter border p-3 text-center">
                        <div class="hstack gap-2">
                            <button type="submit" class="btn btn-success" id="add-btn">Save</button>
                            <button type="button" class="btn btn-light" id="close-modal" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </form>
            </div>
            <!-- Edit User Management Modal -->
            <div class="offcanvas offcanvas-end custom-offcanvas-right" tabindex="-1" id="offcanvasRight3" aria-labelledby="offcanvasRightLabel">
                <form class="tablelist-form pb-4" autocomplete="off">
                    <div class="offcanvas-header border-bottom">
                        <h5 class="offcanvas-title" id="offcanvasRightLabel">Edit SORs</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body p-0 overflow-hidden">
                        <div data-simplebar style="height: calc(100vh - 112px);">
                            <div class="acitivity-timeline p-4">
                                <div class="modal-body pb-4">
                                    <input type="hidden" id="tasksId" />
                                    <div class="row gy-3">
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label for="basiInput" class="form-label">Profile</label>
                                                <input type="text" class="form-control" id="profile">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div class="input-light">
                                                <label class="form-label">Product Type</label>
                                                <select class="form-control" data-choices data-choices-search-false name="choices-single-default" id="idRoles">
                                                    <option value="" selected>ComboBox</option>
                                                    <option value="1">Property Type</option>
                                                    <option value="2">Super Admin</option>
                                                    <option value="3">Administrator</option>
                                                    <option value="4">Accounts</option>
                                                    <option value="5">Manager</option>
                                                    <option value="6">Engineer</option>
                                                    <option value="7">Quality Assurance</option>
                                                    <option value="8">Scheduling Planners</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-6">
                                            <div>
                                                <label for="basiInput" class="form-label">Account Code 1</label>
                                                <input type="text" class="form-control" id="account">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Attribute 1</label>
                                                <input type="text" class="form-control" id="attribute">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Account Code 2</label>
                                                <input type="text" class="form-control" id="account2">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Account Code 3</label>
                                                <input type="text" class="form-control" id="account3">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Attribute 2 / Trade</label>
                                                <input type="text" class="form-control" id="attribute2">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Attribute 3</label>
                                                <input type="text" class="form-control" id="attribute3">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Small Description</label>
                                                <input type="text" class="form-control" id="description">
                                            </div>
                                        </div>
                                        <div class="col-xxl-12 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Description 1</label>
                                                <input type="text" class="form-control" id="description1">
                                            </div>
                                        </div>
                                        <div class="col-xxl-12 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Description 2</label>
                                                <input type="text" class="form-control" id="description2">
                                            </div>
                                        </div>
                                        <div class="col-xxl-12 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Description 3</label>
                                                <input type="text" class="form-control" id="description3">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Manf. Price</label>
                                                <input type="text" class="form-control" id="price">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Cost. Price</label>
                                                <input type="text" class="form-control" id="price2">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">List Price</label>
                                                <input type="text" class="form-control" id="Pric3">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Selling Price</label>
                                                <input type="text" class="form-control" id="pric4">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Std. Min. Vals</label>
                                                <input type="text" class="form-control" id="vals">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Stock Unit 2</label>
                                                <input type="text" class="form-control" id="stock">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Bin</label>
                                                <input type="text" class="form-control" id="bin">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Supp1</label>
                                                <input type="text" class="form-control" id="supp1">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Supp2</label>
                                                <input type="text" class="form-control" id="supp2">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Trade Cat</label>
                                                <input type="text" class="form-control" id="trade">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Repairs Price</label>
                                                <input type="text" class="form-control" id="repairs">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Voids Price</label>
                                                <input type="text" class="form-control" id="voids">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Currently Active</label>
                                                <input type="text" class="form-control" id="currently-active">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Base SOR %</label>
                                                <input type="text" class="form-control" id="base-SOR">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Pay Type 6 SOR %</label>
                                                <input type="text" class="form-control" id="pay-type">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Resource Cat</label>
                                                <input type="text" class="form-control" id="resource-cat">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Resource Sub Cat</label>
                                                <input type="text" class="form-control" id="Resource-sub-cat">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Work Type</label>
                                                <input type="text" class="form-control" id="work-type">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Work Cat</label>
                                                <input type="text" class="form-control" id="work-cat">
                                            </div>
                                        </div>
                                        <div class="col-xxl-4 col-md-2">
                                            <div>
                                                <label for="basiInput" class="form-label">Contract</label>
                                                <input type="text" class="form-control" id="contract">
                                            </div>
                                        </div>
                                    </div>
                                    <!--end row-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="offcanvas-foorter border p-3 text-center">
                        <div class="hstack gap-2">
                            <button type="submit" class="btn btn-success" id="add-btn">Save</button>
                            <button type="button" class="btn btn-light" id="close-modal" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div> 
    </div>  
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/sors.js') ?>"></script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
    <script type="text/javascript">
        $(document).ready(function (e) {
            var hash = window.location.hash;
            if (hash) {
                hash = hash.replace('#', ''); // strip the # at the beginning of the string
                if (hash == 'add')
                {
                    $('button.popup-form-button').trigger('click');
                }
            }
        });
    </script>
