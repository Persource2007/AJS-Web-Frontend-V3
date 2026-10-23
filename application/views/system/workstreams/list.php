<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid"> 
            <?php
                $bc_title = 'Workstreams';
                //include_once APPPATH . 'views/system/inc/breadcrumbs.php';
            ?> 
            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <?php include_once APPPATH . 'views/system/inc/secondary-nav.php'; ?>  
                        <div class="same-page-height dataTables-height selling-tab" id="role-mahagement" role="tabpanel">
                            <div class="card">
                                <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn">
                                    <div class="row">
                                        <div class="col-xxl-12 col-sm-12 text-end">
                                            <button type="button" data-heading="Add New Workstream" data-after-load-func="workstream_create_form" data-form-url="<?= cdn_url('system/workstream/create?in_popup=1') ?>" class="popup-form-button btn btn-success add-btn waves-effect waves-light">
                                                <i class="ri-add-line align-bottom me-1"></i> Add
                                            </button>
                                        </div> 
                                    </div> 
                                </div> 
                                <div class="card-body pt-0 all-tbl-same-width" style="padding-top: 10px !important;">                                       
                                    <table class="table align-middle table-nowrap mb-0 display job-listing-table table-hover task-pending-main" id="ajax-datatables">
                                        <thead class="table-light text-muted">
                                            <tr>
                                                <th></th>
                                                <th>Id</th>
                                                <th>Code</th>
                                                <th>Name</th>
                                                <th class="text-wrap">Description</th>
                                                <th>Manager</th>
                                                <th>Position</th>
                                                <th>Color Code</th>
                                                <!--<th>Analysis Code</th>-->
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
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/workstreams.js') ?>"></script>
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