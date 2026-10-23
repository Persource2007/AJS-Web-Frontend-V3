<main>
	<div class="main-content">
		<div class="container-fluid">
			<div class="row"></div>
			<div class="row">
				<div class="col-md-12">
					<form class="tablelist-form pb-4 simplebar-form" action="<?php echo app_url('job/'.$job_id.'/task/'.$job_task_id.'/sors/update'); ?>" method="POST" id="modifySORsForm" style="height: calc(100vh - 112px);" autocomplete="off">
                    	<div class="p-0 overflow-hidden pb-3">
                    		<div>
                            	<div class="acitivity-timeline p-4 pt-2">
                                	<div class="modal-body pb-3" id="task-sor-section">
                                		<h5 class="mb-0 mt-3 d-flex align-items-end">Task SORs
                                			<button type="button"  class="ms-auto btn btn-success add-more-sors">
                                				<i class="ri-add-line align-bottom"></i>
                                			</button>
                                		</h5>
                                		<hr class="mt-1 mb-0">
                                    	<div class="d-flex justify-content-between align-items-center task-sor-row pt-2">
                                    		<input type="hidden" class="row-id" name="task_sors[0][id]" value="0" />
                                    		<div class="input-light w-25">
                                    			<label class="form-label">SOR</label>
                                    			<div class="d-flex error-div">
	                                    			<select class="form-control sor-id" name="task_sors[0][sor_id]" id="sor_id_0" >
	                                    				<option value="" selected>Select</option>
	                                    			</select>
	                                    			<?php if(false){ ?>
	                                    				<!-- <button type="button" class="btn btn-primary ms-2 popup-form-search-button popup-add-btn" data-heading="Search SORs" data-element="sor_id_0" data-after-load-func="set_sor_id_task" data-form-url="<?= base_url('system/sor/search-list') ?>"><i class="mdi mdi-magnify search-widget-icon"></i></button> -->
	                                    			<?php } ?>
	                                    		</div>
                                    		</div>

	                                    	<div class="input-light" style="width:80px;">
	                                    		<label  class="form-label">Quantity</label>
	                                    		<input type="number" class="form-control number-only sor-qty"  name="task_sors[0][quantity]" value="1" />
	                                    	</div>

	                                    	<div class="input-light">
	                                    		<label  class="form-label mb-2">Is Chargeable</label>
	                                    		<div class="form-check form-switch">
	                                    			<input type="hidden" name="task_sors[0][is_chargeable]" value="0" >
	                                    			<input class="form-check-input" type="checkbox" role="switch" name="task_sors[0][is_chargeable]" value="1"   checked>
	                                    		</div>
	                                    	</div>

	                                    	<div class="input-light">
	                                    		<label  class="form-label mb-2">Is Payable</label>
	                                    		<div class="form-check form-switch">
	                                    			<input type="hidden" name="task_sors[0][is_payable]" value="0" >
	                                    			<input class="form-check-input" type="checkbox" role="switch"  name="task_sors[0][is_payable]" value="1"  checked>
	                                    		</div>
	                                    	</div>

	                                    	<div class="input-light">
	                                    		<label  class="form-label mb-2">Is CTP</label>
	                                    		<div class="form-check form-switch">
	                                    			<input type="hidden" name="task_sors[0][is_ctp]" value="0" >
	                                    			<input class="form-check-input" type="checkbox" role="switch"  name="task_sors[0][is_ctp]" value="1">
	                                    		</div>
	                                    	</div>

	                                    	<div style="width: 3.2em;">
		                                    	<button type="button" class="btn btn-danger remove-task-sor">
		                                    		<i class="ri-close-line"></i>
		                                    	</button>
	                                    	</div>
	                                    </div>
                                	</div>
                            	</div>
                        	</div>
                        </div>
                        <div class="offcanvas-foorter p-3 text-center">
                        	<div class="hstack gap-2">
                        		<button type="submit" class="btn btn-success" id="add-btn">Save</button>
                        		<button type="button" class="btn btn-light" id="close-modal" data-bs-dismiss="offcanvas">Close</button>
                        	</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>
