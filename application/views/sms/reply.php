<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div class="row">
                <!-- Breadcrumb or header row (eq 0) -->
                <div class="col-12">
                    <h4 class="mb-sm-4 text-uppercase">Reply SMS</h4>
                </div>
            </div>
            <div class="row">
                <!-- Content row (eq 1) -->
                <div class="col-12">
                    <form  action="<?= app_url('api/sms/send') ?>" method="post" id="replySmsForm">
                        <div class="modal-body p-4">
                            <div class="mb-3">
                                <label for="to" class="form-label">To</label>
                                <input type="text" class="form-control" name="to" id="to" value="<?= $from_number ?>" readonly>
                            </div>
                            <div class="mb-3">
                                <label for="message" class="form-label">Message <span class="text-danger">*</span></label>
                                <textarea class="form-control" name="message" id="message" rows="10" required></textarea>
                            </div>
                        </div>
                        <div class="offcanvas-foorter border p-3 text-center">
                            <div class="hstack gap-2">                                
                                <button type="submit" class="btn btn-success waves-effect waves-light" id="add-btn">Send</button>
                                <button type="button" class="btn btn-light waves-effect waves-light close-offcanvas" id="close-modal" >Close</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
