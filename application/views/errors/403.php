
<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div class="row justify-content-center"> 
                <div class="col-sm-11 col-md-10 col-lg-9 col-xl-8 col-xxl-7">
                    <div class="error-page-box text-center">
                        <div>
                            <img src="<?= cnd_url(); ?>assets/images/access-denied-logo.png" alt="access denied"/>
                        </div>
                        <!-- <div class="page-not-found-img mb-3">
                            <a href="<?= cnd_url('dashboard'); ?>">403</a>
                        </div> -->
                        <div class="error-page-box-text mb-4">
                            <h4>Access Denied</h4>
                            <p>You do not have permission to perform this action.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    $(function () {
        ajs.sync_api();
        delete_local_cache();
    });
</script>