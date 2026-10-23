<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid"> 
            <?php
                $bc_title = 'Masters';
                require_once APPPATH . 'views/commons/breadcrumb.php';
            ?> 
            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <?php include_once APPPATH . 'views/system/inc/secondary-nav.php'; ?> 
                        <input type="hidden" name="master_id" id="master_id" value="<?= $master_id ?>" />
                        <input type="hidden" name="has_parent" autocomplete="off" id="has_parent" value="" />                        
                        <div class="same-page-height dataTables-height selling-tab" id="masters" role="tabpanel">
                            <div class="card">
                                <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn">
                                     <div class="row align-items-end">
                                        <div class="col-xxl-11 col-md-11">
                                            <h5 class="mb-0 master-title">Masters</h5>
                                        </div>
                                        <?php
                                        if ($master_id && $master_id > 0)
                                        {
                                            ?>
                                            <div class="col-xxl-1 col-md-1 col-sm-1 text-end">
                                                <button type="button" data-heading="Add New Master" data-after-load-func="create_form" data-form-url="<?= cdn_url('system/master/' . $master_id . '/create?in_popup=1') ?>" class="popup-form-button btn btn-success add-btn">
                                                        <i class="ri-add-line align-bottom me-1"></i> Add
                                                </button>
                                            </div>
                                            <?php
                                        }
                                        ?>
                                    </div>
                                </div>
                                <div class="card-body pt-0 all-tbl-same-width1" style="padding-top: 10px !important;">  
                                    <table class="table align-middle table-nowrap mb-0 display job-listing-table table-hover task-pending-main properties-table" id="ajax-datatables">
                                        <thead class="table-light text-muted">
                                            <tr>
                                                <th></th>
                                                <th>Id</th>
                                                <th>Parent</th>
                                                <th>Code</th>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Position</th>
                                                <th>Attr.1</th>
                                                <th>Attr.2</th>
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
    <script type="text/javascript">
        master_id = '<?= $master_id; ?>';
    </script>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/master-records.js') ?>"></script>
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
