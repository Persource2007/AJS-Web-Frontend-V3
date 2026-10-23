<input type="hidden" name="data_type_id" id="data_type_id" value="0" autocomplete="off" />
<input type="hidden" name="data_type" id="data_type" value="" autocomplete="off" />
<input type="hidden" name="data_type_action" id="data_type_action" value="" autocomplete="off" />
<div class="modal fade flip" id="deleteModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body p-5 text-center">
                <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#405189,secondary:#f06548" style="width:90px;height:90px"></lord-icon>
                <div class="mt-4 text-center">
                    <h4>Are you sure?</h4>
                    <p class="text-muted fs-14 mb-4">Do you want to delete this record?</p>
                    <div class="hstack gap-2 justify-content-center remove">
                        <button class="btn btn-link btn-ghost-success fw-medium text-decoration-none" id="deleteRecord-close" data-bs-dismiss="modal"><i class="ri-close-line me-1 align-middle"></i> Close</button>
                        <button class="btn btn-danger" id="delete-record-button">Yes, Delete It</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade flip" id="changeStatusModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body p-5 text-center">
                <div class="swal2-icon swal2-question swal2-icon-show" style="display: flex;"><div class="swal2-icon-content">?</div></div>
                <div class="mt-4 text-center">
                    <h4>You are about to change status ?</h4>
                    <p class="text-muted fs-14 mb-4"></p>
                    <div class="hstack gap-2 justify-content-center remove">

                        <button class="btn btn-link btn-ghost-success fw-medium text-decoration-none" id="deleteRecord-close" data-bs-dismiss="modal"><i class="ri-close-line me-1 align-middle"></i> Close</button>
                        <button class="btn btn-danger" id="change-record-status-button">Yes, Confirm!</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade flip" id="logoutModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body p-5 text-center">
                <div class="swal2-icon swal2-question swal2-icon-show" style="display: flex;"><div class="swal2-icon-content">?</div></div>
                <div class="mt-4 text-center">
                    <h4>Force logout this user?</h4>
                    <p class="text-muted fs-14 mb-4"></p>
                    <div class="hstack gap-2 justify-content-center remove">

                        <button class="btn btn-link btn-ghost-success fw-medium text-decoration-none" id="deleteRecord-close" data-bs-dismiss="modal"><i class="ri-close-line me-1 align-middle"></i> Close</button>
                        <button class="btn btn-danger" id="force-logout-button">Yes, Logout!</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
