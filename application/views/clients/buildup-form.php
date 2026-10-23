<div class="main-content">
    <div class="container-fluid">
        <!-- start page title -->
        <div class="row"></div>
        <div class="row">
            <form class="tablelist-form pb-4 simplebar-form invoice-jobs-form" data-simplebar autocomplete="off">
                <input type="hidden" value="" id="last_id" name="last_id" />
                <input type="hidden" value="" id="hidden_client_id" name="hidden_client_id" />
                <input type="hidden" value="" id="hidden_contract_id" name="hidden_contract_id" />
                <div class="p-4 overflow-hidden pb-3">
                    <div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-xxl-12 col-md-12 bulk-alert-message">
                                    <h6></h6>
                                </div>
                                <div class="col-xxl-12 col-md-12">                                    
                                    <div class="row">
                                        <div class="col-xxl-6 col-md-6 assign_div mt-1 mb-3">
                                            <div class="input-light">
                                                <label class="form-label">Batch No <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="batch_no" name="batch_no" value="" placeholder="Enter Batch No" required>
                                            </div>
                                        </div>                                    
                                        <!-- <div class="col-xxl-6 col-md-6 assign_div mt-1 mb-3">
                                            <div class="input-light">
                                                <label class="form-label">Invoice No <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="invoice_no" name="invoice_no" value="" placeholder="Enter Invoice No" required>
                                            </div>
                                        </div> -->
                                    </div>
                                    <div class="row">
                                        <div class="col-xxl-6 col-md-6 assign_div mt-1 mb-3">
                                            <div class="input-light">
                                                <label class="form-label">Referance No</label>
                                                <input type="text" class="form-control" id="ref_no" name="ref_no" value="" placeholder="Enter Referance No">
                                            </div>
                                        </div>                              
                                        <div class="col-xxl-12 col-md-12 assign_div mt-1 mb-3">
                                            <div class="input-light">
                                                <label class="form-label">Batch Status <span class="text-danger">*</span></label>
                                                <select class="form-control" id="invoice_status" name="invoice_status">
                                                    <option value="">Select Status</option>
                                                </select>
                                                <input type="hidden" value="" id="status_code" name="status_code" />
                                            </div>
                                        </div>
                                    </div> 
                                    <div class="col-xxl-12 col-md-12 sellprice_value">
                                        <h6></h6>
                                    </div>
                                    <div class="col-xxl-12 col-md-12 vat_value">
                                        <h6></h6>
                                    </div>
                                    <div class="col-xxl-12 col-md-12 total_value">
                                        <h6></h6>
                                    </div>                                                                      
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="offcanvas-foorter p-4 text-center">
                <div class="hstack gap-2">
                    <button type="submit" class="btn btn-success" id="build-invoice-btn">Update Status</button>
                    <button type="button" class="btn btn-light" id="close-modal" data-bs-dismiss="offcanvas" >Close</button>
                </div>
            </div>
        </div>
    </div>
</div>