<?php require_once APPPATH . 'views/commons/datatables-inc.php'; ?>
<div class="main-content">
    <div class="page-content">
	    <div class="container-fluid">
		    <?php require_once APPPATH . 'views/commons/breadcrumb.php'; ?>
			<div class="row">
				<div class="col-lg-12">
					<div>
                        <div class="same-page-height dataTables-height selling-tab">
                            <div class="card">
                                <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn">
                                    <?php require_once APPPATH . 'views/sms/inc/failed-filters.php'; ?>
                                </div>                                
                                <div class="card-body pt-0 all-tbl-same-width2-" style="padding-top: 10px !important;"> 
                                    <table id="sms-failed-table" class="table align-middle table-nowrap mb-0 display job-listing-table table-hover task-pending-main">
                                        <thead class="table-light text-muted">
                                            <tr>
                                                <th>Phone</th>
                                                <th>Failure</th>
                                                <th>Message summary</th>
                                                <th>Occurred at</th>
                                                <th>Added</th>
                                                <th>Permanent</th>
                                                <th>Blocked</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
					</div>
				</div> 
			</div> 
	    </div> 
    </div>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/sms/failed.js?v=' . time()) ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
