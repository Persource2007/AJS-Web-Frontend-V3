
<div class="modal-content">
    <div class="modal-header pb-3">
        <h5 class="modal-title" id="myExtraLargeModalHeader">Reason For Failed</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>                
    </div>
    <form id="delete-invoice-form" class="card-body tablelist-form ps-0 pe-0" action="" method="GET" style="padding-top: 15px !important;">
        <input type="hidden" value="" id="certficate_id" name="certficate_id" />
        <input type="hidden" value="" id="task_id" name="task_id" />
        <div class="modal-body">
            <div class="card-body border-0 border-dashed border-end-0 border-start-0 mb-4">
                <div class="row g-2"> 
                    <div class="card-body pt-0 same-position-btn- all-tbl-same-width" style="padding-top: 10px !important;">                                                                           
                        <table class="table align-middle table-nowrap mb-0 display table-hover task-pending-main" id="errorTable" border="1">
                            <thead>
                                <tr>
                                    <th>Reason</th>
                                    <th>Uploaded Date</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>    
                    </div>              
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <input type="hidden" id="search-element">
            <button type="button" class="btn btn-light waves-effect waves-light" data-bs-dismiss="modal" >Close</button>
        </div>
     </form>
</div><!-- /.modal-content -->