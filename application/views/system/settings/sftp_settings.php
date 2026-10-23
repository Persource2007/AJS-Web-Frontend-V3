<div class="card">
    <div class="card-body">

        <h5 class="card-title mb-3">SFTP Settings</h5>
        <?php
            $action = app_url('sftp_setting/save');
            $method = 'POST';
        ?>
        <form id="sftp_setting_form" action="<?= $action ?>" method="<?= $method ?>">

            <!-- carries the stored/uploaded private key path -->
            <input type="hidden" name="private_key_path" id="sftp_private_key_path" value="">

            <div class="row">
                <!-- Host -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">Host <span class="text-danger">*</span></label>
                    <input type="text" name="host" id="sftp_host" class="form-control" placeholder="sftp.example.com">
                </div>

                <!-- Port -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">Port <span class="text-danger">*</span></label>
                    <input type="number" name="port" id="sftp_port" class="form-control" value="22">
                </div>
            </div>

            <div class="row">
                <!-- Username -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">Username <span class="text-danger">*</span></label>
                    <input type="text" name="username" id="sftp_username" class="form-control">
                </div>

                <!-- Authentication Type -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">Authentication Type <span class="text-danger">*</span></label>
                    <select id="sftp_auth_type" class="form-select" name="auth_type">
                        <option value="private_key" selected>Private Key</option>
                        <option value="password">Password</option>
                    </select>
                </div>
            </div>

            <!-- Password auth fields -->
            <div class="row sftp-auth-password" style="display:none;">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" name="password" id="sftp_password" class="form-control" autocomplete="new-password" placeholder="Leave blank to keep existing">
                    <small class="text-muted">Leave blank to keep the saved password.</small>
                </div>
            </div>

            <!-- Private key auth fields -->
            <div class="row sftp-auth-key">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Private Key File</label>
                    <input type="file" id="sftp_private_key_file" class="form-control">
                    <small class="text-muted">Accepted: .pem, .key, .ppk, .rsa, .txt</small>
                    <small class="text-muted d-block" id="sftp_key_current"></small>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Passphrase (optional)</label>
                    <input type="password" name="passphrase" id="sftp_passphrase" class="form-control" autocomplete="new-password" placeholder="Leave blank to keep existing">
                </div>
            </div>

            <div class="row">
                <!-- Root Path -->
                <div class="col-md-6 mb-3">
                    <label class="form-label">Root Path</label>
                    <input type="text" name="root_path" id="sftp_root_path" class="form-control" placeholder="e.g. /uploads/certificates">
                    <small class="text-muted">Base remote directory. Folders are created underneath: CLIENT/YYYYMM/CONTRACT/CERT/</small>
                </div>

                <!-- Active -->
                <div class="col-md-6 mb-3">
                    <label class="form-label d-block">Active</label>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="sftp_status" name="status" value="1" checked>
                        <label class="form-check-label" for="sftp_status">Enable automatic SFTP uploads</label>
                    </div>
                </div>
            </div>

            <div class="mt-3 d-flex gap-2">
                <button type="button" id="sftp_save_btn" class="btn btn-primary">Save</button>
                <button type="button" id="sftp_test_btn" class="btn btn-outline-secondary">Test Connection</button>
            </div>

        </form>

    </div>
</div>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/sftp_settings.js') ?>"></script>
