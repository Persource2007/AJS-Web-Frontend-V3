<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content dataTables-height-detiles-">
    <div class="page-content">
        <div class="container-fluid"> 
            <?php
                $bc_title = 'Role Management';
                include_once APPPATH . 'views/commons/breadcrumb.php';
            ?>  
            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <?php include_once APPPATH . 'views/system/inc/secondary-nav.php'; ?>
                        <div class="tab-content- text-muted">
                            <div class="same-page-height dataTables-height selling-tab" id="system-roles" role="tabpanel">
                                <div class="card dataTables-height-" id="tasksList">
                                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn">
										<?php require_once APPPATH . 'views/system/roles/inc/filters.php'; ?>
									</div>
                                    <div class="card-body pt-0 same-position-btn- all-tbl-same-width1" style="padding-top: 10px !important;">
                                        <table class="table align-middle table-nowrap mb-0 display job-listing-table table-hover task-pending-main" id="roles-datatables">
                                            <thead class="table-light text-muted">
                                                <tr>
                                                    <th></th>
                                                    <th>Id</th>
                                                    <th>Code</th>
                                                    <th>Title</th>
                                                    <th>Desktop</th>
                                                    <th>Mobile</th>
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

    <!-- End Page-content -->
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/roles.js') ?>"></script>
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
