<main>
	<div class="main-content">
		<div class="container-fluid">
			<div class="row"></div>
			<div class="row">
				<div class="col-md-12">
					<form class="tablelist-form pb-4 simplebar-form" action="<?php echo app_url('job/'.$job_id.'/task/'.$job_task_id.'/sors/update'); ?>" method="POST" id="modifySORsForm"  autocomplete="off">
                    	<div class="p-0 pb-3" style="height: calc(100vh - 90px); overflow-y: auto !important;">
                    		<div>
                            	<div class="acitivity-timeline p-4 pt-2">
                                	<div class="modal-body pb-3 mb-2" id="task-sor-section">
                                		<h5 class="mb-0 mt-3 d-flex align-items-end">Task SORs
                                			<button type="button"  class="ms-auto btn btn-success add-more-sors">
                                				<i class="ri-add-line align-bottom"></i>
                                			</button>
                                		</h5>
                                		<hr class="mt-1 mb-0">
                                    	<div class="row align-items-center task-sor-row pt-2 g-2">
                                    		<input type="hidden" class="row-id" name="task_sors[0][id]" value="0" />
                                            <div class="col-xxl-2">
                                                <label class="form-label">Pricing Model</label>
                                                <select class="form-control pricing-model" required name="task_sors[0][pricing_model]"   required>
                                                    <option value="1" selected>SOR</option>
                                                    <option value="2">Band Price</option>
                                                    <option value="3">Fixed Price</option>
                                                </select>
                                            </div>
                                            <div class="col-xxl-3">
                                                <label class="form-label">Asset</label>
                                                <select class="form-control sor-asset select2" name="task_sors[0][asset_id]" id="asset_id_0" >
                                                    <option value=''>Select</option>
                                                </select>
                                            </div>
                                            <div class="col-xxl-1">
	                                    		<label  class="form-label">Quantity</label>
	                                    		<input type="number" class="form-control number-only sor-qty"  name="task_sors[0][quantity]" value="1" />
	                                    	</div>
                                    		<div class="col-xxl-3">
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
                                            <div class="col-xxl-1" >
	                                    		<label  class="form-label">Material</label>
	                                    		<input type="text" class="form-control material-rate"  name="task_sors[0][material]" disabled/>
	                                    	</div>
                                            <div class="col-xxl-1" >
	                                    		<label  class="form-label">Labour</label>
	                                    		<input type="text" class="form-control labour-rate"  name="task_sors[0][labor]" disabled/>
	                                    	</div>
                                            <div class="col-xxl-1" >
	                                    		<label  class="form-label">Sell</label>
	                                    		<input type="text" class="form-control sell-rate"  name="task_sors[0][sell]" disabled/>
	                                    	</div>
                                            <div class="col-xxl-4" >
	                                    		<label  class="form-label">Description</label>
	                                    		<input type="text" class="form-control desc"  name="task_sors[0][description]" />
	                                    	</div>

	                                    	<div class="col-xxl-2">
	                                    		<label  class="form-label mb-2">Is Chargeable</label>
	                                    		<div class="form-check form-switch">
	                                    			<input type="hidden" name="task_sors[0][is_chargeable]" value="0" >
	                                    			<input class="form-check-input" type="checkbox" role="switch" name="task_sors[0][is_chargeable]" value="1"   checked>
	                                    		</div>
	                                    	</div>

	                                    	<div class="col-xxl-2">
	                                    		<label  class="form-label mb-2">Is Payable</label>
	                                    		<div class="form-check form-switch">
	                                    			<input type="hidden" name="task_sors[0][is_payable]" value="0" >
	                                    			<input class="form-check-input payable-switch" type="checkbox" role="switch"  name="task_sors[0][is_payable]" value="1"  checked>
	                                    		</div>
	                                    	</div>

	                                    	<div class="col-xxl-2">
	                                    		<label  class="form-label mb-2">Is CTP</label>
	                                    		<div class="form-check form-switch">
	                                    			<input type="hidden" name="task_sors[0][is_ctp]" value="0" >
	                                    			<input class="form-check-input ctp-switch" type="checkbox" role="switch"  name="task_sors[0][is_ctp]" value="1">
	                                    		</div>
	                                    	</div>                                            

	                                    	<div class="col-xxl-1" style="width: 3.2em;">
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
