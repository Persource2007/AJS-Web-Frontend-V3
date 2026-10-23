<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content dataTables-height-detiles-">
    <div class="page-content">
        <div class="container-fluid"> 
                <!-- start page title -->
                <?php
                    require_once APPPATH . 'views/commons/breadcrumb.php';
                ?>
                <!-- end page title -->
                <div class="row">
                    <div class="col-lg-12">
                        <div>
						    <div class="tab-content- pt-0 text-muted">
							    <div class="same-page-height dataTables-height selling-tab tab-pane- active- card-height-container- dataTables-height-card-resize-" id="tasksList" role="tabpanel" style="position: relative;">
                                    <div class="card dataTables-height-">
                                        <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn">
                                            <div class="row align-items-center">
                                                <div class="col-xxl-9">
                                                    <h5 class="fs-16 mb-0"></h5>
                                                </div>
                                                <div class="col-xxl-3 text-end">
                                                    <div class="hstack gap-3 justify-content-end">
                                                        <div class="">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" id="marginShow" checked="true">
                                                                <label class="form-check-label" for="marginShow">
                                                                    Show Margin
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div class="">
                                                            <button href="javascript:void(0);" class="btn btn-success approve-btn approve-job-task multiapprove">Approve</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body pt-0 same-position-btn- all-tbl-same-width tbl-height-fixed- check-input-check-right" style="padding-top: 10px !important;">                                                        
                                            <table class="table align-middle table-nowrap mb-0 display job-listing-table table-hover task-pending-main mt-0- task-table-main-" id="worksheet-details-datatables" style="">
                                            <thead class="table-light text-muted">
                                                <tr>
                                                    <th style="min-width: 80px; width: 80px;">
                                                        <input class="form-check-input approve-btn allselect" type="checkbox"/>
                                                    </th>
                                                    <th></th>
                                                    <th>Job No.</th>
                                                    <th>SORs</th>
                                                    <th>Is Payable</th>
                                                    <th>Task Code</th>
                                                    <th>Task Title</th>
                                                    <th>Contract</th>
                                                    <th>Job Type</th>
                                                    <th>Attended on</th>
                                                    <th class="text-end">Events</th>
                                                    <!-- <th>Fin. Date</th> -->
                                                    <th>Engineer</th>
                                                    <th class="text-end">Cert.</th>
                                                    <th>Cert. Status</th>
                                                    <th>Sale</th>
                                                    <th>Labour</th>
                                                    <th>Material</th>
                                                    <!-- <th>Other</th> -->
                                                    <th class="manage-margin">Margin</th>
                                                    <th>Task Status</th>
                                                </tr>
                                            </thead>
                                        </table>                                           
                                        </div>
                                    </div>
                                    <!-- <div class="card-top-bootm-handle card-top-handle-bottom"></div> -->
                                    <div class="card p-3 jobs-details-card-new fixed-hide-show-card" id="card-task-details-fixed"></div>                                
                                </div>
                            </div>
                        </div>        
                    </div>
                </div>    
            <!-- container-fluid -->
        </div>
    </div>
</div>
<!-- End Page-content -->
<script>
    const worksheetId = "<?php echo $id; ?>";
</script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/worksheets/worksheet-details.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/task-details.js?v=1.1') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
<script src="<?= cnd_url(); ?>assets/libs/dropzone/dropzone-min.js"></script>
<script>
	$(document).ready(function() {
	  // Show animation
	  $(document).on('click', '.task-detail-window-button', function(e) {
	    e.preventDefault();
	    $('#card-task-details-fixed').addClass('show');
	  });
	
	  // Close animation
	  $(document).on('click', '.close-card-btn', function(e) {
	    e.preventDefault();
	    const card = $('#card-task-details-fixed');
	    card.removeClass('show');
	  });
	});
	
</script>