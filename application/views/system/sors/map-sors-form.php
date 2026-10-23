<div class="main-content">
    <div class="container-fluid">
        <!-- start page title -->
        <div class="row"></div>
        <div class="row">
            <form class="tablelist-form pb-4 simplebar-form map-sors-form" data-simplebar autocomplete="off">
                <input type="hidden" value="" id="hidden_client_id" name="hidden_client_id" />
                <div class="p-4 overflow-hidden pb-3">
                    <div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-xxl-12 col-md-12 bulk-alert-message">
                                    <h6></h6>
                                </div>
                                <div class="col-xxl-12 col-md-12">                                                                        
                                    <div class="row"> 
                                        <div class="col-xxl-12 col-md-12 client_detail_div">
                                            <div>
                                                <label for="client_code" class="form-label">Contract</label>
                                                <select class="form-control select2" multiple="multiple" id="contract_id" name="contract_id[]">
                                                    <!--<option value="" selected>Select</option>-->
                                                </select>
                                            </div>
                                        </div>                                                                                                           
                                    </div> 
                                                                                                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="offcanvas-foorter p-4 text-center">
                <div class="hstack gap-2">
                    <button type="submit" class="btn btn-success" id="map-sors-btn">Save</button>
                    <button type="button" class="btn btn-light" id="close-modal" data-bs-dismiss="offcanvas" >Close</button>
                </div>
            </div>
        </div>
    </div>
</div>