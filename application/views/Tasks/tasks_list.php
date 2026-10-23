<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<style>
    #task-datatables th,
    #task-datatables td {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
<div class="main-content dataTables-height-detiles-">
	<div class="page-content">
		<div class="container-fluid">
			<?php require_once APPPATH . 'views/commons/breadcrumb.php'; ?>
			<div class="row">
				<div class="col-lg-12">
					<div>
						<div class="tab-content- pt-0 text-muted">
							<div class="same-page-height dataTables-height selling-tab tab-pane- active- card-height-container- dataTables-height-card-resize-"
								id="job-tab" role="tabpanel" style="position: relative;">
								<div class="card dataTables-height-">
									<div
										class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3 job-setting-btn">
										<?php require_once APPPATH . 'views/tasks/inc/filters-new.php'; ?>
									</div>
									<div class="card-body pt-0 same-position-btn- all-tbl-same-width tbl-height-fixed-"
										style="padding-top: 10px !important;">
										<table
											class="table align-middle table-nowrap mb-0 display job-listing-table table-hover task-pending-main mt-0- task-table-main-"
											id="task-datatables">
											<thead class="table-light text-muted">
											</thead>
										</table>
									</div>
								</div>
								<!-- <div class="card-top-bootm-handle card-top-handle-bottom"></div> -->
								<div class="card p-3 jobs-details-card-new fixed-hide-show-card"
									id="card-task-details-fixed"> </div>
							</div>
							<!--end tab-pane-->
						</div>
						<!--end tab-content-->
					</div>
				</div>
				<!--end col-->
			</div>
			<!-- start page title -->
		</div>
		<!-- container-fluid -->
	</div>
	<!-- End Page-content -->
	<input type="hidden" name="job_id" id="job_id" />
	<!-- End Page-content -->
	<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/job.js?v=1.5') ?>"></script>
	<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/tasks-updated.js') ?>"></script>
	<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/task-details.js?v=1.1') ?>"></script>
	<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>
	<script src="<?= cnd_url(); ?>assets/libs/dropzone/dropzone-min.js"></script>

	<script>
		$(document).ready(function () {
			// Show animation
			$(document).on('click', '.task-detail-window-button', function (e) {
				e.preventDefault();
				$('#card-task-details-fixed').addClass('show');
			});

			// Close animation
			$(document).on('click', '.close-card-btn', function (e) {
				e.preventDefault();
				const card = $('#card-task-details-fixed');
				card.removeClass('show');
			});
		});

	</script>
