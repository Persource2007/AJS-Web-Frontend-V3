<!-- Bootstrap Modal -->
<div class="modal modal-lg fade" id="imagePreviewModal" tabindex="-1" aria-labelledby="imagePreviewModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body text-center">
                <img src="" id="modalImage" class="img-fluid">
            </div>
        </div>
    </div>
</div>
<div class="modal bs-example-modal-xl" tabindex="-1" id="large_modal" aria-labelledby="myExtraLargeModalHeader" aria-hidden="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
            <div class="modal-header pb-3">
                <h5 class="modal-title" id="myExtraLargeModalHeader"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

            </div>
            <div class="modal-body">
                <h6 class="fs-15">Give your text a good structure</h6>

            </div>
            <div class="modal-footer">
                <input type="hidden" id="search-element">
                <button type="button" class="btn btn-success waves-effect waves-light" data-bs-dismiss="modal" id="select-btn" data-callback-fn=''>Select</button>
                <button type="button" class="btn btn-light waves-effect waves-light" data-bs-dismiss="modal" >Close</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>
<div class="modal bs-example-modal-xl" tabindex="-1" id="view_modal" aria-hidden="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header pb-3">
                <h5 class="modal-title"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h6 class="fs-15">Give your text a good structure</h6>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light waves-effect waves-light" data-bs-dismiss="modal" >Close</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>

<div class="modal bs-example-modal-xl" tabindex="-1" id="small_modal" aria-hidden="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
            <div class="modal-header pb-3">
                <h5 class="modal-title"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h6 class="fs-15">Give your text a good structure</h6>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light waves-effect waves-light" data-bs-dismiss="modal" >Close</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>

<div class="modal exampleModalFullscreen" tabindex="-1" id="form_pop_modal" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="myExtraLargeModalLabel">Extra large
                    modal</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body large_modal_message">
                <iframe id="form_iframe" width="100%" height="100%"></iframe>
            </div>
            <div class="modal-footer">
                <a href="javascript:void(0);" class="btn btn-link link-success fw-medium" data-bs-dismiss="modal"><i class="ri-close-line me-1 align-middle"></i> Close</a>
                <button type="button" data-bs-dismiss="modal" class="btn btn-primary ">Close</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>


<div class="modal exampleModalFullscreen" tabindex="-1" id="bulk_preview_modal" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="myExtraLargeModalLabel">Preview Uploaded Data</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body large_modal_message">
                <div id="bulk_preview_data" width="100%" height="100%"></div>
            </div>
            <div class="modal-footer">
                <a href="javascript:void(0);" class="btn btn-link link-success fw-medium" data-bs-dismiss="modal"><i class="ri-close-line me-1 align-middle"></i> Close</a>
                <button type="button" data-bs-dismiss="modal" class="btn btn-primary ">Close</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>

<div style="display:none" class="accordion custom-accordionwithicon  accordion-fill-secondary" id="accordionWithplusicon">
    <div class="accordion-item">
        <h2 class="accordion-header" id="accordionwithplusExample1">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accor_plusExamplecollapse1" aria-controls="accor_plusExamplecollapse1">
                <i class="ri-arrow-down-circle-line fs-16"></i>
            </button>

        </h2>
        <div id="accor_plusExamplecollapse1" class="accordion-collapse collapse" aria-labelledby="accordionwithplusExample1" data-bs-parent="#accordionWithplusicon">
            <div class="accordion-body">
                Big July earthquakes confound zany experimental vow. My girl wove six dozen plaid jackets before she quit. Six big devils from Japan quickly forgot how to waltz. try again until it looks right, and each assumenda labore aes Homo nostrud organic, assumenda labore aesthetic magna elements, buttons, everything.
            </div>
        </div>
    </div>
</div>


<!-- right offcanvas -->
<div class="offcanvas offcanvas-end custom-offcanvas-right" data-bs-backdrop='static' tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" aria-modal="true" aria-hidden="false">
    <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel" class="offcanvas-title">Create New Entry</h5>
        <button type="button" class="btn-close text-reset close-offcanvas"></button>
        <!--<div class="offcanvas-form-errors"></div>-->
    </div>
    <div class="offcanvas-body p-0 overflow-hidden">

        <iframe id="form_iframe1" width="100%" height="100%"></iframe>
    </div>
</div>
<!-- top offcanvas -->
<div style="border:1px solid gray; z-index:9999" class="offcanvas offcanvas-end custom-offcanvas-right2" tabindex="-1" id="offcanvasRight2" aria-labelledby="offcanvasRight2Label">
    <div class="offcanvas-header" >
        <h5 id="offcanvasRight2Label" class="offcanvas-title">Create New Entry</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        <!--<div class="offcanvas-form-errors"></div>-->
    </div>
    <div class="offcanvas-body p-0 overflow-hidden" >
        <iframe id="form_iframe2" width="100%" height="100%"></iframe>
    </div>
</div>
<!-- top offcanvas -->
<div style="border:1px solid gray;width:500px !important" class="offcanvas offcanvas-end custom-offcanvas-right3" tabindex="-1" id="offcanvasRight3" aria-labelledby="offcanvasRight3Label">
    <div class="offcanvas-header" >
        <h5 id="offcanvasRight3Label" class="offcanvas-title">Create New Entry</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        <!--<div class="offcanvas-form-errors"></div>-->
    </div>
    <div class="offcanvas-body p-0 overflow-hidden" >

    </div>
</div>
<div class="modal fade image-view-modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 rounded-0">
            <button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="modal"><i class="ri-close-line"></i></button>
            <div class="modal-body p-0 border-none">
                <div class="position-relative">
                    <figure class="figure mb-0">
                        <img src="https://ajs-static-bucket.s3.eu-west-2.amazonaws.com/2024/assets/17157577681714470310istockphoto-1483319549-1024x1024.jpg" class="w-100" alt="">
                        <figcaption class="figure-caption rounded-0">A caption for the above image.</figcaption>
                    </figure>
                    <a target="_blank" href="#" class="download-link"><i class="ri-download-2-line"></i></a>
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>
<div class="modal bs-example-modal-lg" tabindex="-1" id="invoice_change_status_modal" aria-labelledby="myExtraLargeModalHeader" aria-hidden="true" role="dialog">
    <div class="modal-dialog modal-lg">
        
    </div><!-- /.modal-dialog -->
</div>
<div class="modal bs-example-modal-xl" tabindex="-1" id="invoice_jobs_large_modal" aria-labelledby="myExtraLargeModalHeader" aria-hidden="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl" style="--vz-modal-width: 1350px !important;">
        <div class="modal-content">
            <div class="modal-header pb-3">
                <h5 class="modal-title" id="myExtraLargeModalHeader"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

            </div>
            <div class="modal-body">
                <h6 class="fs-15">Give your text a good structure</h6>

            </div>
            <div class="modal-footer">
                <input type="hidden" id="search-element">
                <button type="button" class="btn btn-success waves-effect waves-light" data-bs-dismiss="modal" id="select-btn" data-callback-fn=''>Select</button>
                <button type="button" class="btn btn-light waves-effect waves-light" data-bs-dismiss="modal" >Close</button>

            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>