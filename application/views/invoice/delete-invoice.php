
<div class="modal-content">
    <div class="modal-header pb-3">
        <h5 class="modal-title" id="myExtraLargeModalHeader">Delete Invoice</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>                
    </div>
    <form id="delete-invoice-form" class="card-body tablelist-form ps-0 pe-0" action="" method="GET" style="padding-top: 15px !important;">
        <input type="hidden" value="" id="invoice_id" name="invoice_id" />
        <div class="modal-body">
            <div class="card-body border-0 border-dashed border-end-0 border-start-0 mb-4">
                <div class="row g-2">                                       
                    <div class="col-xxl-12 col-md-12 assign_div mt-1 mb-3">
                        <div class="input-light">
                            <label class="form-label delete_by_label"><span class="delete-cancel-label"></span> By: <span class="delete_by"></span></label>                            
                        </div>
                    </div>
                    <div class="col-xxl-12 col-md-12 assign_div mt-1 mb-3">
                        <div class="input-light">
                            <label class="form-label">Reason for <span class="delete-cancel-label"></span> <span class="text-danger">*</span></label>
                            <textarea class="form-control" id="delete_reason" name="delete_reason"></textarea>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <input type="hidden" id="search-element">
            <a type="button" class="btn btn-success waves-effect waves-light list_invoice_delete" data-type="Invoices" data-id="" data-action="delete" data-bs-dismiss="modal" href="#deleteModal" data-callback-fn=''><span class="delete-cancel-label"></span></a>
            <button type="button" class="btn btn-light waves-effect waves-light" data-bs-dismiss="modal" >Close</button>
        </div>
     </form>
</div><!-- /.modal-content -->
<?php /* invoice.js is already loaded by the invoice list page; re-including it here
        re-ran its init AJAX and duplicated every delegated handler on each modal open. */ ?>