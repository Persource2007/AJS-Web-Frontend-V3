<?php
    require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid"> 
            <?php
                $bc_title = 'Job Types';
                //include_once APPPATH . 'views/system/inc/breadcrumbs.php';
            ?>
            <div class="row">
                <div class="col-lg-12">
                    <div>
                        <?php include_once APPPATH . 'views/system/inc/secondary-nav.php'; ?>  
                        <div class="same-page-height dataTables-height selling-tab" role="tabpanel">
                             <div class="card dataTables-height-">
                                <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn">
                                    <?php require_once APPPATH . 'views/system/services/inc/filters.php'; ?>
                                </div>
                                <div class="card-body pt-0 same-position-btn- all-tbl-same-width1" style="padding-top: 10px !important;">                                     
                                    <table class="table align-middle table-nowrap mb-0 display job-listing-table table-hover task-pending-main" id="ajax-datatables" >
                                        <thead class="table-light text-muted">
                                            <tr>
                                                <th></th>
                                                <th>ID</th>
                                                <th>Short Code</th>
                                                <th>Title</th>
                                                <th>Work Stream</th>
                                                <th>Type</th>
                                                <th>Skills</th>
                                                <th>Fix Time</th>
                                                <th>Target Time</th>
                                                <th>Default SOR</th>
                                                <th>Certs.</th>
                                                <th>Appt. Req.</th>
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
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/services.js') ?>"></script>
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