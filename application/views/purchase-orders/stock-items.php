<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->

<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <!-- <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0">Add New Master</h4>
                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Resources Set up</a></li>
                                <li class="breadcrumb-item active">Add Master</li>
                            </ol>
                        </div>

                    </div>
                </div> -->
            </div>
            <!-- end page title -->

            <div class="row">
                <div class="offcanvas-body p-0 overflow-hidden">
                    <div class="modal-header-fixed">
                        <div class="col-xxl-8 col-md-6">
                            <label class="form-label mb-3">Select From</label>
                            <div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input select-from" id="select_from_stock" type="radio" name="select_from" value="stock" checked>
                                    <label class="form-check-label" for="select_from_stock">Stocks</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input select-from" id="select_from_kit" type="radio" name="select_from" value="kit">
                                    <label class="form-check-label" for="select_from_kit">Kits</label>
                                </div>
                            </div>
                        </div>
                        <div id="stock-sec">
                            <form class="tablelist-form pb-4" autocomplete="off" id="filter-form" action="#">
                                <div class="row g-2 border border-dashed border-top-0 border-end-0 border-start-0 pb-3 mt-2">
                                    <div class="col-xxl-6 col-sm-12">
                                        <div class="search-box">
                                            <input type="text" class="form-control search" placeholder="Search" name="search" id="search">
                                            <i class="ri-search-line search-icon"></i>
                                        </div>
                                    </div>
                                    <!--end col-->

                                    <div class="col-xxl-4 col-sm-4">
                                        <div class="input-light">
                                            <select class="form-control" data-choices data-choices-search-false name="type">
                                                <option value="" selected>All Type</option>
                                                <option value="equipment">Equipment</option>
                                                <option value="part">Part</option>
                                            </select>
                                        </div>
                                    </div>
                                    <!--end col-->
                                    <div class="col-xxl-2 col-sm-2">
                                        <button class="btn w-100 btn-primary px-2" id="search-table"><i class="ri-search-eye-line align-bottom me-1"></i> Search</button>
                                    </div>
                                </div>
                            </form>
                            <div data-simplebar style="height: calc(100vh - 265px);">
                                <div class="acitivity-timeline p-4">
                                    <div class="modal-body">
                                        <div class="table-responsive mb-4">
                                            <table id="kit-item-datatables" class="modal-datatable display table dt-responsive align-middle table-nowrap mb-0">
                                                <thead class="table-light text-muted">
                                                    <tr>
                                                        <th>id</th>
                                                        <th style="width: 40px;">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" id="check-all" value="option">
                                                            </div>
                                                        </th>
                                                        <th>Manuf. Part No.</th>
                                                        <th>Name</th>
                                                        <th>Type</th>
                                                        <th>Price Per Unit</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="offcanvas-foorter p-4 text-center">
                                <div class="hstack gap-2">
                                    <button type="button" class="btn btn-success" id="save-item-btn" data-bs-dismiss="offcanvas">Save</button>
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="offcanvas">Close</button>
                                </div>
                            </div>
                        </div>
                        <div id="kit-sec" class="hide">
                            <form class="tablelist-form pb-4" autocomplete="off" id="kit-filter-form" action="#">
                                <div class="row g-2 border border-dashed border-top-0 border-end-0 border-start-0 pb-3 mt-2">
                                    <div class="col-xxl-6 col-sm-12">
                                        <div class="search-box">
                                            <input type="text" class="form-control search" placeholder="Search" name="search" id="search">
                                            <i class="ri-search-line search-icon"></i>
                                        </div>
                                    </div>
                                    <!--end col-->

                                   
                                    <!--end col-->
                                    <div class="col-xxl-2 col-sm-2">
                                        <button class="btn w-100 btn-primary px-2" id="search-table"><i class="mdi mdi-magnify search-widget-icon me-1"></i> Search</button>
                                    </div>
                                </div>
                            </form>
                            <div data-simplebar style="height: calc(100vh - 265px);">
                                <div class="acitivity-timeline p-4">
                                    <div class="modal-body">
                                        <div class="table-responsive mb-4">
                                            <table id="kit-datatables" class="modal-kit-datatable display table dt-responsive align-middle table-nowrap mb-0">
                                                <thead class="table-light text-muted">
                                                    <tr>
                                                        <th>id</th>
                                                        <th style="width: 40px;">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" id="check-all" value="option">
                                                            </div>
                                                        </th>
                                                        <th>Name</th>
                                                        <th>Type</th>
                                                        <th>Price Type</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="offcanvas-foorter p-4 text-center">
                                <div class="hstack gap-2">
                                    <button type="button" class="btn btn-success" id="save-kit-btn" data-bs-dismiss="offcanvas">Save</button>
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="offcanvas">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- container-fluid -->
    </div>
</div>