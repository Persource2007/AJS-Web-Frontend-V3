
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
                                    <?php  require_once APPPATH . 'views/sms/inc/filters.php'; ?>
                                </div>                                
                                <div class="card-body pt-0 all-tbl-same-width2-" style="padding-top: 10px !important;"> 
                                    <table id="sms-replies-table" class="table align-middle table-nowrap mb-0 display job-listing-table table-hover task-pending-main">
                                         <thead class="table-light text-muted">
                                            <tr>
                                                <th>From Number</th>
                                                <th>Message</th>
                                                <th>Received At</th>
                                                <th>Property</th>
                                                <th>Job</th>
                                                <th>Action</th>
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
            <div class="modal fade" id="viewMessageModal" tabindex="-1" aria-labelledby="viewMessageModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="viewMessageModalLabel">SMS Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="modal-from-number" class="form-label">From Number</label>
                                <input type="text" class="form-control" id="modal-from-number" readonly>
                            </div>
                            <div class="mb-3">
                                <label for="modal-received-at" class="form-label">Received At</label>
                                <input type="text" class="form-control" id="modal-received-at" readonly>
                            </div>
                            <div class="mb-3">
                                <label for="modal-message" class="form-label">Message</label>
                                <textarea class="form-control" id="modal-message" rows="5" readonly></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div> 
	    </div> 
    </div> 
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/sms/replies.js?v=' . time()) ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
