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
                        <form class="tablelist-form pb-0" autocomplete="off" id="filter-form" action="#">
                            <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 p-3 pt-0 ps-0 pe-0">
                                <div class="hstack gap-2">        
                                    <div style="width: 250px;">
                                        <div class="search-box">
                                            <input type="text" class="form-control search" placeholder="Search" name="search" id="search">
                                            <i class="mdi mdi-magnify search-widget-icon"></i>
                                        </div>
                                    </div>
                                    <div style="width: 150px;">
                                        <div class="input-light">
                                            <select class="form-control" data-choices data-choices-search-false name="type">
                                                <option value="" selected>All Type</option>
                                                <option value="equipment">Equipment</option>
                                                <option value="part">Part</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="">
                                        <button class="btn w-100 btn-primary px-2" id="search-table" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div data-simplebar style="height: calc(100vh - 265px);">
                        <div class="acitivity-timeline p-3">
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
                </div>
                <div class="offcanvas-foorter p-3 text-center">

                    <div class="hstack gap-2">

                        <button type="button" class="btn btn-success" id="save-item-btn" data-bs-dismiss="offcanvas">Save</button>
                        <button type="button" class="btn btn-light" id="close-modal" data-bs-dismiss="offcanvas">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- container-fluid -->
    </div>
</div>