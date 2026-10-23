<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            $title = "Interfaces";
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->

            <div class="row">
                <?php

                $action = app_url('client/' . $client_id . '/interface/create');
                $method = 'POST';
                if (isset($edit) && $edit && isset($id) && $id > 0) {
                    $action = app_url('client/interface/edit/'.$id);
                    $method = 'POST';
                }
                ?>
                <div class="col-lg-12">
                    <form class="tablelist-form pb-4" autocomplete="off" id="interfaceForm"
                        action="<?= $action ?>" method="<?= $method ?>">
                        <input type="hidden" value="<?= $id ?? null ?>" id="edit_id" name="edit_id" />
                        <input type="hidden" id="client_id" name="client_id" value="<?= $client_id ?>" />
                        <div class="p-0 overflow-hidden">
                            <div data-simplebar style="height: calc(100vh - 112px);">
                                <div class="acitivity-timeline p-4">
                                    <div class="modal-body">
                                        <div class="">
                                        <div id="interface-section-1">
                                            <div class="row gy-2 mb-3">
                                                <div class="col-xxl-4 col-md-3">
                                                    <div class="input-light">
                                                        <label for="config_name" class="form-label">Configuration Name <span class="text-danger">*</span> </label>
                                                        <input type="text" class="form-control" id="config_name" name="config_name" value="" required>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-3">
                                                    <div class="input-light">
                                                        <label for="api_type" class="form-label" >API Type <span class="text-danger">*</span> </label>
                                                        <select class="form-control " name="api_type" id="api_type">
                                                            <option value="">Select API Type</option>
                                                        </select>                                                            
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-3">
                                                    <div class="input-light">
                                                        <label for="base_url" class="form-label">Base URL<span class="text-danger">*</span> </label>
                                                        <input type="text" class="form-control" id="base_url" name="base_url" value="" required>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row gy-2 mb-3">                                                    
                                                <div class="col-xxl-4 col-md-3">
                                                    <div class="input-light">
                                                        <label for="base_url" class="form-label">Login Endpoint<span class="text-danger">*</span> </label>
                                                        <input type="text" class="form-control" id="login_endpoint" name="login_endpoint" value="" required>
                                                    </div>
                                                </div>                                     
                                                <div class="col-xxl-4 col-md-3">
                                                    <div class="input-light">
                                                        <label for="base_url" class="form-label">Upload Endpoint<span class="text-danger">*</span> </label>
                                                        <input type="text" class="form-control" id="upload_endpoint" name="upload_endpoint" value="" required>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="interface-section-2">
                                            <h5 class="mb-1"><i class="ri-key-fill me-2"></i>Authentication</h5>  
                                            <hr class="mt-1 mb-3" />                                              
                                            <div id="">
                                                <div class="row gy-2 mb-3">                                                        
                                                    <div class="col-xxl-4 col-md-3">
                                                        <div>
                                                            <label for="labelInput" class="form-label">Authentication Type <span class="text-danger">*</span></label>
                                                            <select class="form-control custom-select2" name="auth_type" id="auth_type">
                                                                <option value="" >Select Auth Type</option>
                                                                <option value="basic">Baisc</option>
                                                                <option value="bearer">Bearer</option>
                                                                <option value="oauth">Oauth</option>
                                                                <option value="custom">Custom</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-4 col-md-6">
                                                        <div>
                                                            <label for="labelInput" class="form-label">User name <span class="text-danger">*</span></label>
                                                            <div class="form-icon">
                                                                <input name="username" type="text" class="form-control" placeholder="User Name" id="username" required>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-4 col-md-6">
                                                        <div>
                                                            <label for="labelInput" class="form-label">Password <span class="text-danger">*</span></label>
                                                            <div class="position-relative auth-pass-inputgroup">
                                                                <input name="password" type="password" class="form-control password-input" placeholder="Password" id="password" <?= isset($id) && $id > 0 ? '' : 'required' ?> autocomplete="new-password">
                                                                <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i class="ri-eye-fill align-middle"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="interface-section-3">
                                            <h5 class="mb-1">Additional Headers</h5>
                                            <hr class="mt-1 mb-3" />
                                            <div class="row  letter-form">
                                                <div class="col-xxl-8 col-md-12"> </div>
                                                <div class="col-xxl-2 col-md-6">
                                                    <button type="button" class="add-additional-header btn btn-success mt-4 position-absolute edit-btn"><i class="ri-add-line align-bottom me-1"></i> Add</button>
                                                </div>
                                            </div>
                                            <div id="additional-header-section">
                                                <div class="additional-header-row row gy-2 mb-3 ">   
                                                    <div class="col-xxl-4 col-md-6">
                                                        <div>
                                                            <label for="labelInput" class="form-label">Header Key</label>
                                                            <div class="form-icon">
                                                                <input name="header_key[0]" type="text" class="form-control" placeholder="Header Name">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-4 col-md-6">
                                                        <div>
                                                            <label for="labelInput" class="form-label">Header Value</label>
                                                            <div class="form-icon">
                                                                <input name="header_value[0]" type="text" class="form-control" placeholder="Header Value">
                                                            </div>
                                                        </div>
                                                    </div>                                                        
                                                    <div class="col-xxl-1 col-md-1 hide">
                                                        <label class="form-label">&nbsp;</label><br />
                                                        <button type="button"
                                                            class="btn btn-danger delete-additional-header popup-close-btn edit-btn">
                                                            <i class="ri-close-line"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="interface-section-3">
                                            <h5 class="mb-1">Additional Api Endpoints</h5>
                                            <hr class="mt-1 mb-3" />
                                            <div class="row  letter-form">
                                                <div class="col-xxl-10 col-md-12"> </div>
                                                <div class="col-xxl-2 col-md-6">
                                                    <button type="button" class="add-additional-apiednpoint btn btn-success mt-4 position-absolute edit-btn"><i class="ri-add-line align-bottom me-1"></i> Add</button>
                                                </div>
                                            </div>
                                            <div id="additional-apiednpoint-section">
                                                <div class="additional-apiednpoint-row row gy-2 mb-3 ">   
                                                    <div class="col-xxl-2 col-md-2">
                                                        <div>
                                                            <label for="labelInput" class="form-label">Endpoint Name</label>
                                                            <div class="form-icon">
                                                                <input name="endpoint_name[0]" type="text" class="form-control" placeholder="Endpoint Name">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xxl-3 col-md-3">
                                                        <div>
                                                            <label for="labelInput" class="form-label">Endpoint Url</label>
                                                            <div class="form-icon">
                                                                <input name="endpoint_url[0]" type="text" class="form-control" placeholder="Endpoint Url">
                                                            </div>
                                                        </div>
                                                    </div>                                                        
                                                    <div class="col-xxl-2 col-md-2">
                                                        <div>
                                                            <label for="labelInput" class="form-label">Method(GET/POST)</label>
                                                            <div class="form-icon">
                                                                <input name="method[0]" type="text" class="form-control" placeholder="Method(GET/POST)">
                                                            </div>
                                                        </div>
                                                    </div>                                                        
                                                    <div class="col-xxl-3 col-md-3">
                                                        <div>
                                                            <label for="labelInput" class="form-label">Parameters(Json)</label>
                                                            <div class="form-icon">
                                                                <input name="parameters[0]" type="text" class="form-control" placeholder="Parameters(Json)">
                                                            </div>
                                                        </div>
                                                    </div>                                                        
                                                    <div class="col-xxl-1 col-md-1 hide">
                                                        <label class="form-label">&nbsp;</label><br />
                                                        <button type="button"
                                                            class="btn btn-danger delete-additional-apiednpoint popup-close-btn edit-btn">
                                                            <i class="ri-close-line"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                
                        <div class="offcanvas-foorter border p-3 text-center">
                            <div class="hstack gap-2">                                
                                <button type="submit" class="btn btn-success waves-effect waves-light" id="add-btn">Save</button>
                                <button type="button" class="btn btn-light waves-effect waves-light close-offcanvas" id="close-modal" >Close</button>
                                <div id="deleteBtnContainer"></div>
                                <?php if (isset($edit) && $edit && isset($id) && $id > 0) { ?>               
                                    <script>
                                        document.getElementById('deleteBtnContainer').innerHTML = delete_icon(<?= $id ?>, 'interface');
                                    </script>
                                <?php }  ?>
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
</div>

<script src="<?= cnd_url('assets/js/pages/password-addon.init.js'); ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/clients/interface.js') ?>"></script>

<script type="text/javascript">
// $('.client-sub-nav').find('a[data-tab="interface"]').addClass('active');
</script>