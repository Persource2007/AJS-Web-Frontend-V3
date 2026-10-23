<div class="main-content">
    <div class="container-fluid">
        <!-- start page title -->
        <div class="row"></div>
        <div class="row">
            <form class="tablelist-form pb-4 simplebar-form invoice-generate-form" data-simplebar autocomplete="off">
                <input type="hidden" value="<?php $id ?? null; ?>" id="invoice_id" name="invoice_id" />
                <input type="hidden" value="" id="client_id" name="client_id" />
                <input type="hidden" value="" id="invoice_type" name="invoice_type" />
                <input type="hidden" value="" id="batchno" name="batchno" />
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
                                                <label class="form-label">Invoice No <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="invoice_no" name="invoice_no" value="" placeholder="Enter Invoice No" required>
                                                <input type="hidden" id="invoice_no_int" name="invoice_no_int" value="" >
                                            </div>
                                        </div>
                                        <div class="col-xxl-6 col-md-6 assign_div mt-1 mb-3">
                                            <div class="input-light">
                                                <label class="form-label">Invoice Date <span class="text-danger">*</span></label>
                                                <input type="datetime-local" class="form-control" name="invoice_date" id="invoice_date" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xxl-6 col-md-6 assign_div mt-1 mb-3">
                                            <div class="input-light">
                                                <label class="form-label">Notes</label>
                                                <textarea class="form-control" name="invoice_note" id="invoice_note"></textarea>                                               
                                            </div>
                                        </div>                              
                                        <div class="col-xxl-12 col-md-12 assign_div mt-1 mb-3">
                                            <div class="input-light">
                                                <label class="form-label">Choose Attachment Option <span class="text-danger">*</span></label>
                                               <div class="">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="attachment_option" id="generate_pdf" value="pdf" checked>
                                                       <label class="form-check-label" for="inlineRadio1">PDF</label>
                                                   </div>
                                                   <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="attachment_option" id="generate_excel" value="excel">
                                                        <label class="form-check-label" for="inlineRadio2">Excel Report</label>
                                                    </div>
                                              </div>
                                            </div>
                                        </div>
                                        <div id="excel-options" class="mt-3" style="display: none;">
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
                    </div>
                </div>
            </form>
            <div class="offcanvas-foorter p-4 text-center">
                <div class="hstack gap-2">
                    <button type="submit" class="btn btn-success" id="generate-invoice-btn">Generate Invoice</button>
                    <button type="button" class="btn btn-light" id="close-modal" data-bs-dismiss="offcanvas" >Close</button>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    const invoiceId = "<?php echo $id; ?>";
</script>