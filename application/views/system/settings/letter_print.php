<div class="card">
    <div class="card-body">

        <h5 class="card-title mb-3">Letter Print Settings</h5>
        <?php
            $action = app_url('letter_print/save');
            $method = 'POST';
        ?>
        <form id="letter_print_setting_form" action="<?= $action ?>" method="<?= $method ?>">
            <div class="row">
                <!-- Email Address -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">Email Address <span class="text-danger">*</span></label>
                    <input type="text" name="email_address" id="lp_email_address" class="form-control" >
                </div>

                <!-- Password -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">Password <span class="text-danger">*</span></label>
                    <input type="password" name="password" id="lp_password" class="form-control" >
                </div>
            </div>

            <div class="row">
                <!-- Account Login -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">Account Login <span class="text-danger">*</span></label>
                    <input type="text" name="account_login" id="lp_account_login" class="form-control" >
                </div>

                <!-- Instance -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">Instance <span class="text-danger">*</span></label>
                    <input type="text" name="instance" id="lp_instance" class="form-control" >
                </div>
            </div>

            <div class="row">
                <!-- Base URL -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">Base URL <span class="text-danger">*</span></label>
                    <input type="text" name="base_url" id="lp_base_url" class="form-control" >
                </div>
            </div>

            <hr class="my-4">

            <h5 class="card-title mb-3">Configuration</h5>

            <div class="row">
                <!-- Papers -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">Papers <span class="text-danger">*</span></label>
                    <select id="lp_paper" class="form-select" name="paper">
                        <option value="">-- Select Paper --</option>
                    </select>
                </div>

                <!-- Envelopes -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">Envelopes <span class="text-danger">*</span></label>
                    <select id="lp_envelope" class="form-select" name="envelope">
                        <option value="">-- Select Envelope --</option>
                    </select>
                </div>
            </div>

            <div class="row">
                <!-- Pack Modes -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">Pack Modes <span class="text-danger">*</span></label>
                    <select id="lp_packmode" class="form-select" name="packmode">
                        <option value="">-- Select Pack Mode --</option>
                    </select>
                </div>

                <!-- Document Formats -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">Document Formats <span class="text-danger">*</span></label>
                    <select id="lp_document_format" class="form-select" name="document_format">
                        <option value="">-- Select Document Format --</option>
                    </select>
                </div>
            </div>

            <!-- If you want to save selection back to API later -->
            
            <div class="mt-3">
                <button type="button" id="lp_save_btn" class="btn btn-primary">
                    Save 
                </button>
            </div>
           
        </form>

    </div>
</div>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/letter_print_settings.js') ?>"></script>