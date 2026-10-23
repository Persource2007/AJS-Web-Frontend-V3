<div class="modal fade" id="alert_modal" aria-hidden="true" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body row  text-center p-5">
                <lord-icon src="https://cdn.lordicon.com/tdrtiskw.json" trigger="loop" colors="primary:#f7b84b,secondary:#405189" style="width:130px;height:130px">
                </lord-icon>
                <div class="mt-4 pt-4">
                    <h4>Uh oh, something went wrong!</h4>
                    <p class="text-muted alert_modal_message"> </p>
                    <!-- Toogle to second dialog -->
                    <button class="btn btn-warning continue-button" data-bs-toggle="modal" data-bs-dismiss="modal">
                        Continue
                    </button>
                    <div class="regenerate-button-div" style="display:none">
                        <button class="btn btn-warning regenerate-button" data-bs-toggle="modal" data-bs-dismiss="modal">
                            Regenerate Token
                        </button>
                        <br/>
                        <br/>
                        <p class="text-muted alert_modal_message"> If the problem persists, click below button to login again.</p>
                        <a class="btn btn-secondary btn-lg modal-inside-link" href="<?= app_url('auth/login'); ?>">
                            Login
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
