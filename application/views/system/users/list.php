<?php
    require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid"> 
            <?php
                $bc_title = 'User Management';
                //include_once APPPATH . 'views/system/inc/breadcrumbs.php';
            ?>  
            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <?php include_once APPPATH . 'views/system/inc/secondary-nav.php'; ?> 
                        <div class="same-page-height dataTables-height selling-tab" id="system-users" role="tabpanel">
                            <div class="card" id="tasksList">
                                <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn">
                                    <?php require_once APPPATH . 'views/system/users/inc/filters.php'; ?>
                                </div>
                                <div class="card-body pt-0 all-tbl-same-width2-" style="padding-top: 10px !important;"> 
                                    <table class="table align-middle table-nowrap mb-0 display job-listing-table table-hover task-pending-main" id="users-datatables">
                                        <thead class="table-light text-muted">
                                            <tr>
                                                <th></th>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Mobile</th>
                                                <th>Address</th>
                                                <th>City</th>
                                                <th>Postcode</th>
                                                <th>Dialpad Id Exist</th>
                                                <th>Color Code</th>
                                                <th>Status</th>
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
 
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/users.js') ?>"></script>
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
