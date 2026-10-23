<div class="main-content">
    <div class="container-fluid">
        <!-- start page title -->
        <div class="row"></div>
        <div class="row">
            <form class="tablelist-form pb-4 simplebar-form excel-generate-form" data-simplebar autocomplete="off">
                <input type="hidden" value="<?php $id ?? null; ?>" id="invoice_id" name="filters[invoice_items.invoice_id]" />
                <input type="hidden" value="" id="client_id" name="client_id" />
                <input type="hidden" value="" id="batchno" name="batchno" />
                <div class="p-4 overflow-hidden pb-3">
                    <div>
                        <div class="modal-body">
                        




                            <div class="row">
                                <div class="col-xxl-12 col-md-12 bulk-alert-message">
                                    <h6></h6>
                                </div>
                                
                                <div id="excel-options" class="mt-3">
                                    <label class="form-label">Excel Template Type <span class="text-danger">*</span></label>
                                    <div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="excel_report_type" id="report_general" value="general">
                                            <label class="form-check-label" for="report_general">Global Template</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="excel_report_type" id="report_client" value="client">
                                            <label class="form-check-label" for="report_client">Client Wise Template</label>
                                        </div>
                                    </div>

                                    <!-- Dropdowns -->
                                    <div id="general-template-dropdown" class="mt-2" style="display: none;">
                                        <select class="form-select" name="template_id" id="template_id">
                                            <option value="">Select Template</option>
                                        </select>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="offcanvas-foorter p-4 text-center">
                <div class="hstack gap-2">
                    <button type="submit" class="btn btn-success" id="generate-excel-btn">Generate Excel</button>
                    <button type="button" class="btn btn-light" id="close-modal" data-bs-dismiss="offcanvas" >Close</button>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    const invoiceId = "<?php echo $id; ?>";
</script>