<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->

<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    
                </div>
            </div>
            <!-- end page title -->

            <div class="row">
               
                <form class="tablelist-form pb-4 simplebar-form" name="addForm" id="addForm" style="height: calc(100vh - 112px);" data-simplebar autocomplete="off">
                    <div class="p-0 overflow-hidden pb-3">
                        <div>
                            <div class="acitivity-timeline p-4">
                                <div class="modal-body pb-3">
                                    <input type="hidden" id="tasksId" />
                                    <div class="row gy-3">
                                        <input type="hidden" name="log_id" id="log_id" value="<?= $id ?>" />
                                        <input type="hidden" name="log_month" id="log_month" value="<?= $month ?>" />
                                        <input type="hidden" name="log_year" id="log_year" value="<?= $year ?>" />
                                        <div class="">
                                            <div class="card-header">
                                                <h4 class="card-title mb-0">Request</h4>
                                            </div><!-- end card header -->

                                            <div class="card-body">
                                                <div id="users">
                                                    <div data-simplebar style="height: 242px;" class="mx-n3 p-3 pt-0 pb-0">
                                                        <p class="text-muted log-detail-request">
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div><!-- end card body -->
                                        </div>

                                        <div class="">
                                            <div class="card-header">
                                                <h4 class="card-title mb-0">Response</h4>
                                            </div><!-- end card header -->

                                            <div class="card-body">
                                                <div id="users">
                                                    <div data-simplebar style="height: 242px;" class="mx-n3 p-3 pt-0 pb-0">
                                                        <p class="text-muted log-detail-response">
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div><!-- end card body -->
                                        </div>
                                        <div class="">
                                            <div class="card-header">
                                                <h4 class="card-title mb-0">Headers</h4>
                                            </div><!-- end card header -->

                                            <div class="card-body">
                                                <div id="users">
                                                    <div data-simplebar style="height: 242px;" class="mx-n3 p-3 pt-0 pb-0">
                                                        <p class="text-muted log-detail-headers">
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div><!-- end card body -->
                                        </div>
                                    </div>
                                    <!--end row-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="offcanvas-foorter p-4 text-center">

                        <div class="hstack gap-2">
                            <button type="button" class="btn btn-danger" id="close-modal" data-bs-dismiss="offcanvas" >Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- container-fluid -->
    </div>



    <!-- End Page-content -->
