<style>
    .right-filter button {
        margin-left: 0px;
    }
</style>

<div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3">
    <!--    <form method="POST" action="" data-upload-type="clients" data-file-type="excel" class="bulk-upload-form" enctype="multipart/form-data">-->
    <div class="d-flex justify-content-between">
        <div>
            <div class="btn-group ms-1">
                <form id="form_filters" action="" method="GET">
                    <div class="btn-group">
                        <div class="search-box" style="width: 250px;">
                            <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search...">
                            <i class="mdi mdi-magnify search-widget-icon"></i>
                        </div>
                    </div>
                    <div class="btn-group ms-1">
                        <button class="btn btn-primary" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>