<div class="card">
    <div class="card-body">

        <h5 class="card-title mb-3">Open AI Settings</h5>
        <?php
            $action = app_url('open_ai_setting/save');
            $method = 'POST';
        ?>
        <form id="open_ai_setting_form" action="<?= $action ?>" method="<?= $method ?>">

            <div class="row">
        
                <div class="col-md-6 mb-3">
                    <label class="form-label">OpenAI API Key <span class="text-danger">*</span></label>
                    <input type="text" name="api_key" id="api_key" class="form-control" placeholder="sk-proj-xxxxxxxxxxxxxxxx" autocomplete="new-password">
                    <small class="text-muted" id="api_key_hint">Enter your OpenAI API key.</small>
                </div>

           
                <div class="col-md-6 mb-3">
                    <label class="form-label">API Error Alert Email <span class="text-danger">*</span></label>
                    <input type="email" name="alert_email" id="alert_email" class="form-control" placeholder="alerts@example.com">
                    <small class="text-muted">
                        Error notifications (quota exceeded, API failures, authentication issues, etc.) will be sent to this email address.
                    </small>
                </div>
            </div>

            <div class="row">
               
                <div class="col-md-6 mb-3">
                    <label class="form-label">Validation Confidence (%) <span class="text-danger">*</span></label>
                    <input type="number" name="confidence_threshold" id="confidence_threshold" class="form-control" min="1" max="100" placeholder="75">
                    <small class="text-muted">
                        Images will be marked as valid only when the AI confidence score is equal to or greater than this value.
                    </small>
                </div>

                
                <div class="col-md-6 mb-3">
                    <label class="form-label">AI Model <span class="text-danger">*</span></label>
                    <select id="ai_model" class="form-select" name="ai_model">
                        <option value="gpt-5.4-mini" selected>GPT-5.4 Mini</option>
                        <option value="gpt-5.5">GPT-5.5</option>
                        <option value="gpt-4o-mini">GPT-4o Mini</option>
                        <option value="gpt-4o">GPT-4o</option>
                        <option value="gpt-4-turbo">GPT-4 Turbo</option>
                        <option value="gpt-4">GPT-4</option>
                    </select>
                    <small class="text-muted">
                        Select the OpenAI model used for door photo validation.
                    </small>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Door Photo Validation Prompt <span class="text-danger">*</span></label>
                    <textarea name="validation_prompt" id="validation_prompt" class="form-control" rows="8" placeholder="Enter the AI prompt used to validate door images..."></textarea>
                    <small class="text-muted">
                        Configure the prompt sent to the AI model for door image validation.
                    </small>
                </div>
            </div>

            <!-- Test Prompt Toggle -->
            <div class="row mb-3">
                <div class="col-md-12">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="enable_test_prompt" name="enable_test_prompt">
                        <label class="form-check-label fw-semibold" for="enable_test_prompt">
                            Test Prompt / AI Response
                        </label>
                    </div>
                    <small class="text-muted">Enable to test your prompt and image against the AI before saving.</small>
                </div>
            </div>

            <!-- Test Prompt Section (hidden by default) -->
            <div id="test_prompt_section" style="display:none;">
                <div class="card border-0 bg-light rounded-3 p-3 mb-3">
                    <div class="row g-3">
                        <div class="col-md-7">
                            <label class="form-label fw-semibold">Upload Test Image <span class="text-danger">*</span></label>
                            <input type="file" id="test_image_file" class="form-control" accept="image/*">
                            <small class="text-muted">Accepted: JPG, PNG, GIF, WEBP</small>

                            <!-- Image Preview -->
                            <div id="test_image_preview_wrap" class="mt-2" style="display:none;">
                                <img id="test_image_preview" src="" alt="Preview" class="img-fluid rounded border" style="max-height:200px;">
                            </div>
                        </div>
                        <div class="col-md-12 ">
                            <button type="button" id="test_prompt_btn" class="btn btn-outline-primary">
                                <i class="bi bi-cpu me-1"></i> Test Prompt
                            </button>
                        </div>
                    </div>

                    <!-- AI Response Area -->
                    <div id="ai_response_wrap" class="mt-3" style="display:none;">
                        <label class="form-label fw-semibold">AI Response</label>
                        <div id="ai_response_content" class="border rounded p-3 bg-white" style="min-height:80px; white-space:pre-wrap; font-size:0.9rem;"></div>
                    </div>
                </div>
            </div>

            <div class="mt-3 d-flex gap-2">
                <button type="button" id="save_setting_btn" class="btn btn-primary">Save Settings</button>
            </div>

        </form>

    </div>
</div>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/open-ai.js') ?>"></script>
