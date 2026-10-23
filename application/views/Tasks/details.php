<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->

<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="row">
                <div class="col-lg-12">
                    <form class="tablelist-form pb-4 simplebar-form" autocomplete="off"  method="post">
                        <input type="hidden" id="hidden_task_id" value="<?= $id ?? null; ?>">
                        <div class="p-0 overflow-hidden">
                            <div data-simplebar style="height: calc(100vh - 112px);">
                                <div class="acitivity-timeline p-4 pt-3">
                                    <div class="modal-body">
                                        <div class="">
                                            <div class="row gy-2">
                                                <div class="col-xxl-12 col-md-12 text-end" id="task-btns">
                                                </div>
                                            </div>
                                            <div class="row gy-2 task-descrip-top-main">
                                                <h5 class="mb-0">Description</h5>
                                                <div class="col-xxl-6 col-md-12">
                                                    <p class="modal-descrip-main scrollbar" id="detail_task_description">-</p>
                                                </div>
                                                <div class="col-xxl-6 col-md-12">
                                                    <div class="row">
                                                        <div class="col-xxl-5 col-md-6">
                                                            <p class="mb-1"><b>Skill:</b> <span id="detail_skill_name">-</span></p>
                                                        </div>
                                                        <div class="col-xxl-7 col-md-6 ps-0">
                                                            <p class="mb-1"><b>Task Type:</b> <span id="detail_task_type">-</span></p>
                                                        </div>
                                                        <div class="col-xxl-5 col-md-6">
                                                            <p class="mb-1"><b>Created By:</b> <span id="detail_created_by_name">-</span></p>
                                                        </div>
                                                        <div class="col-xxl-7 col-md-6 ps-0">
                                                            <p class="mb-1"><b>Created On:</b> <span id="detail_add_date">-</span></p>
                                                        </div>
                                                        <div class="col-xxl-5 col-md-6">
                                                            <p class="mb-1"><b>Engineer ID:</b> <span id="detail_assigned_to">-</span></p>
                                                        </div>
                                                        <div class="col-xxl-7 col-md-6 ps-0">
                                                            <p class="mb-1"><b>Assigned On:</b> <span id="detail_assigned_date">-</span></p>
                                                        </div>
                                                        <div class="col-xxl-5 col-md-6">
                                                            <p class="mb-1"><b>Task Status:</b> <span id="detail_task_status">-</span></p>
                                                        </div>
                                                        <div class="col-xxl-7 col-md-6 ps-0">
                                                            <p class="mb-1"><b>Sent to PDA:</b> <span id="detail_sent_to_pda">-</span></p>
                                                        </div>
                                                        <div class="col-xxl-5 col-md-6">
                                                            <p class="mb-1"><b>UPRN:</b> <span id="detail_uprn_no">-</span></p>
                                                        </div>
                                                        <div class="col-xxl-5 col-md-6">
                                                            <p class="mb-1"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row gy-2 mt-2">
                                                <div class="col-xxl-6 col-md-6">
                                                    <h5>Engineer Comments</h5>
                                                    <p id="detail_engineer_comments">-</p>
                                                </div>
                                                <div class="col-xxl-6 col-md-6">
                                                    <h5>Manager Comments</h5>
                                                    <p id="detail_manager_comments">-</p>
                                                </div>
                                            </div>

                                            <ul class="client-sub-nav nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1 pt-0" role="tablist">
                                                <li class="nav-item"><a class="nav-link active fs-14" data-bs-toggle="tab" href="#events" role="tab">Log</a></li>
                                                <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#sors" role="tab">SORs</a></li>
                                                <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#assets" role="tab">Assets</a></li>
                                                <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#certificate" role="tab">Certificates</a></li>
                                                <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#media" role="tab">Media</a></li>
                                            </ul>

                                            <div class="tab-content stock-tbl-details-main">
                                                <div class="tab-pane active" style="max-height: 250px; overflow:auto" id="events" role="tabpanel">
                                                    <div class="table-responsive table-card mt-1 tasks-tbl">
                                                        <!-- Tables Without Borders -->
                                                        <table class="table table-borderless table-nowrap">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Event Type</th>
                                                                    <th>Added By</th>
                                                                    <th>Event Date</th>
                                                                    <th>Comments</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody class="job-event-div">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="tab-pane " id="sors" style="max-height: 250px; overflow:auto" role="tabpanel">
                                                    <div class="table-responsive table-card mt-1 tasks-tbl">
                                                        <table class="table table-borderless table-nowrap">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>SOR Code</th>
                                                                    <th>Material (<i class="bx bx-pound"></i>)</th>
                                                                    <th>Labor (<i class="bx bx-pound"></i>)</th>
                                                                    <th>Sell (<i class="bx bx-pound"></i>)</th>
                                                                    <th>Quantity</th>
                                                                    <th>Added By</th>
                                                                    <th>Chargeable</th>
                                                                    <th>Payable</th>
                                                                    <th>Created On</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody class="job-sors-div">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="tab-pane " id="assets" style="max-height: 250px; overflow:auto" role="tabpanel">
                                                    <div class="table-responsive table-card mt-1 tasks-tbl">
                                                        <table class="table table-borderless table-nowrap">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Client Asset No.</th>
                                                                    <th>Serial No.</th>
                                                                    <th>Type</th>
                                                                    <th>Make</th>
                                                                    <th>Model</th>
                                                                    <th>Installation Date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody class="job-asset-div">

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" id="certificate" role="tabpanel">
                                                    <div class="table-responsive table-card mt-1 tasks-tbl" style="height: 250px; overflow:auto">
                                                        <table class="table table-borderless table-nowrap">
                                                            <thead>
                                                                <tr>
                                                                    <th>Action</th>
                                                                    <th>#</th>
                                                                    <th>Code</th>
                                                                    <th>Title</th>
                                                                    <th>Required</th>
                                                                    <th>Assigned To</th>
                                                                    <th>Status</th>
                                                                    <th>Added By</th>
                                                                    <th>Created On</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody class="job-certificate-div">

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <!--end tab-pane-->
                                                <div class="tab-pane" id="media" role="tabpanel">
                                                    <!--                                                    <div class="row">
                                                                                                            <div class="col-xxl-8 col-md-8">-->
                                                    <div class="table-responsive table-card mt-1 tasks-tbl" style="height: 250px; overflow-y: auto;">
                                                                <table class="table table-borderless table-nowrap">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>#</th>
                                                                            <th>File Type</th>
                                                                            <th>File Path</th>
                                                                            <th>Caption</th>
                                                                            <th>Added By</th>
                                                                            <th>Uploaded On</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody class="job-media-div">

                                                                    </tbody>
                                                                </table>
                                                            </div>
<!--                                                        </div>
                                                    </div>-->

                                                </div>
                                                <!--edn tab-pane-->
                                            </div>
                                        </div>
                                        <!--end row-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="offcanvas-foorter p-4 text-center">
                            <div class="hstack gap-2">
                                <button type="button" class="btn btn-light" id="close-modal" data-bs-dismiss="offcanvas">Close</button>
                            </div>
                        </div>
                    </form>
                </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
</div>
