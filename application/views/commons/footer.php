<footer class="footer modal-hide">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                © <?php echo date('Y'); ?> AJS Ltd. Design & Developed by <a href="https://netlink.co.in" target="_BLANK">NetInc Digital Services LLP</a> & <a href="https://www.globalbug.co.uk/" target="_BLANK">Globalbug Ltd.</a>
            </div>
            <!--            <div class="col-sm-6">
                            <div class="text-sm-end d-none d-sm-block">
                                Design & Developed by NetLink
                            </div>
                        </div>-->
        </div>
    </div>
</footer>
</div>
<!-- end main content-->

</div>
<!-- END layout-wrapper -->
<!--start back-to-top-->
<button onclick="topFunction()" class="btn btn-danger btn-icon" id="back-to-top">
    <i class="ri-arrow-up-line"></i>
</button>
<!--end back-to-top-->
<!--preloader-->
<div id="preloader">
    <div id="preloader-status">
        <div class="spinner-border text-primary avatar-sm" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</div>
<?php

require_once APPPATH . 'views/commons/footer-inc.php';
?>
</body>

</html>
