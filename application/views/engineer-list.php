<?php include_once 'commons/header.php'; ?>



<!-- ============================================================== -->
<!-- Start right Content here -->
<!-- ============================================================== -->
<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
                <div class="col-12">
                    <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 class="mb-sm-0">Engineer List</h4>

                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item"><a href="javascript: void(0);">Resources Set up</a></li>
                                <li class="breadcrumb-item active">Engineer List</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
            <!-- end page title -->



            <div class="row">
                <div class="col-lg-12">
                    <div class="card" id="tasksList">
                        <div class="card-header border-0">
                            <div class="d-flex align-items-center">
                                <h5 class="card-title mb-0 flex-grow-1">All Engineers</h5>
                                <div class="flex-shrink-0">
                                    <div class="d-flex flex-wrap gap-2">
                                        <button class="btn btn-primary add-btn" data-bs-toggle="modal" data-bs-target="#showModal"><i class="ri-add-line align-bottom me-1"></i> Add Engineer</button>
                                        <button class="btn btn-secondary add-btn" data-bs-toggle="modal" data-bs-target="#showModal"><i class="ri-logout-box-r-line align-bottom me-1"></i> Export</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body border border-dashed border-end-0 border-start-0">
                            <form>
                                <div class="row g-3">
                                    <div class="col-xxl-5 col-sm-12">
                                        <div class="search-box">
                                            <input type="text" class="form-control search" placeholder="Search Name / Email / Address">
                                            <i class="ri-search-line search-icon"></i>
                                        </div>
                                    </div>
                                    <!--end col-->

                                    <div class="col-xxl-3 col-sm-4">
                                        <div class="input-light">
                                            <select class="form-control" data-choices data-choices-search-false name="choices-single-default" id="idRoles">
                                                <option value="">Job Tyes</option>
                                                <option value="1" selected>All</option>
                                                <option value="1">PPM</option>
                                                <option value="2">Reactive</option>
                                                <option value="3">Emergency</option>
                                            </select>
                                        </div>
                                    </div>
                                    <!--end col-->

                                    <div class="col-xxl-3 col-sm-4">
                                        <div class="input-light">
                                            <select class="form-control" data-choices data-choices-search-false name="choices-single-default" id="idStatus">
                                                <option value="">Status</option>
                                                <option value="all" selected>All</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                                <option value="activation-pending">Activation Pending</option>
                                            </select>
                                        </div>
                                    </div>
                                    <!--end col-->

                                    <div class="col-xxl-1 col-sm-4">
                                        <button type="button" class="btn btn-primary w-100" onclick="SearchData();"> <i class="ri-equalizer-fill me-1 align-bottom"></i>
                                            Filters
                                        </button>
                                    </div>
                                    <!--end col-->
                                </div>
                                <!--end row-->
                            </form>
                        </div>
                        <!--end card-body-->
                        <div class="card-body">
                            <div class="table-responsive table-card mb-4">
                                <table class="table align-middle table-nowrap mb-0" id="tasksTable">
                                    <thead class="table-light text-muted">
                                        <tr>
                                            <th class="sort" data-sort="name">Name</th>
                                            <th class="sort" data-sort="email">Email</th>
                                            <th class="sort" data-sort="address">Address</th>
                                            <th class="sort" data-sort="activity">Activity</th>
                                            <th class="sort" data-sort="mobile">Mobile Access</th>
                                            <th class="sort" data-sort="office">Office</th>
                                            <th class="sort" data-sort="userstatus">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody class="form-check-all">
                                        <tr>                                            
                                            <td class="name">
                                                <div class="d-flex">
                                                    <div class="avatar-group">
                                                        <a href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Frank">
                                                            <img src="<?= cnd_url(); ?>assets/images/users/avatar-3.jpg" alt="" class="rounded-circle avatar-xxs" />
                                                            Robert McMahon
                                                        </a>
                                                    </div>                                                    
                                                    <div class="flex-shrink-0 ms-4">
                                                        <ul class="list-inline tasks-list-menu mb-0">

                                                            <li class="list-inline-item"><a class="edit-item-btn" href="#showModal" data-bs-toggle="modal"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i></a></li>
                                                            <li class="list-inline-item">
                                                                <a class="remove-item-btn" data-bs-toggle="modal" href="#deleteOrder">
                                                                    <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="email"><a href="mailto:robert.mcmahon@gmail.com">robert.mcmahon@gmail.com</a></td>
                                            <td class="address">London, UK</td>
                                            <td class="activity"> - </td>
                                            <td class="mobile">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="mobileaccess" checked="">
                                                </div>
                                            </td>                                            
                                            <td class="Office">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="officestaff">
                                                </div>
                                            </td>
                                            <td class="userstatus">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="statusactive" checked="">                                                    
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>                                            
                                            <td class="name">
                                                <div class="d-flex">
                                                    <div class="avatar-group">
                                                        <a href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Frank">
                                                            <img src="<?= cnd_url(); ?>assets/images/users/avatar-3.jpg" alt="" class="rounded-circle avatar-xxs" />
                                                            Robert McMahon
                                                        </a>
                                                    </div>                                                    
                                                    <div class="flex-shrink-0 ms-4">
                                                        <ul class="list-inline tasks-list-menu mb-0">

                                                            <li class="list-inline-item"><a class="edit-item-btn" href="#showModal" data-bs-toggle="modal"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i></a></li>
                                                            <li class="list-inline-item">
                                                                <a class="remove-item-btn" data-bs-toggle="modal" href="#deleteOrder">
                                                                    <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="email"><a href="mailto:robert.mcmahon@gmail.com">robert.mcmahon@gmail.com</a></td>
                                            <td class="address">London, UK</td>
                                            <td class="activity"> - </td>
                                            <td class="mobile">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="mobileaccess" checked="">
                                                </div>
                                            </td>                                            
                                            <td class="Office">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="officestaff" checked="">
                                                </div>
                                            </td>
                                            <td class="userstatus">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="statusactive" checked="">
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>                                            
                                            <td class="name">
                                                <div class="d-flex">
                                                    <div class="avatar-group">
                                                        <a href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Frank">
                                                            <img src="<?= cnd_url(); ?>assets/images/users/avatar-3.jpg" alt="" class="rounded-circle avatar-xxs" />
                                                            Robert McMahon
                                                        </a>
                                                    </div>
                                                    <div class="flex-shrink-0 ms-4">
                                                        <ul class="list-inline tasks-list-menu mb-0">

                                                            <li class="list-inline-item"><a class="edit-item-btn" href="#showModal" data-bs-toggle="modal"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i></a></li>
                                                            <li class="list-inline-item">
                                                                <a class="remove-item-btn" data-bs-toggle="modal" href="#deleteOrder">
                                                                    <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="email"><a href="mailto:robert.mcmahon@gmail.com">robert.mcmahon@gmail.com</a></td>
                                            <td class="address">London, UK</td>
                                            <td class="activity"> - </td>
                                            <td class="mobile">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="mobileaccess">
                                                </div>
                                            </td>                                            
                                            <td class="Office">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="officestaff">
                                                </div>
                                            </td>
                                            <td class="userstatus">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="statusactive">                                                    
                                                </div>
                                                <span class="badge bg-success text-uppercase">Activation Pending</span>
                                            </td>
                                        </tr>
                                        <tr>                                            
                                            <td class="name">
                                                <div class="d-flex">
                                                    <div class="avatar-group">
                                                        <a href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Frank">
                                                            <img src="<?= cnd_url(); ?>assets/images/users/avatar-3.jpg" alt="" class="rounded-circle avatar-xxs" />
                                                            Robert McMahon
                                                        </a>
                                                    </div>
                                                    <div class="flex-shrink-0 ms-4">
                                                        <ul class="list-inline tasks-list-menu mb-0">

                                                            <li class="list-inline-item"><a class="edit-item-btn" href="#showModal" data-bs-toggle="modal"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i></a></li>
                                                            <li class="list-inline-item">
                                                                <a class="remove-item-btn" data-bs-toggle="modal" href="#deleteOrder">
                                                                    <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="email"><a href="mailto:robert.mcmahon@gmail.com">robert.mcmahon@gmail.com</a></td>
                                            <td class="address">London, UK</td>
                                            <td class="activity"> - </td>
                                            <td class="mobile">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="mobileaccess" checked="">
                                                </div>
                                            </td>                                            
                                            <td class="Office">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="officestaff">
                                                </div>
                                            </td>
                                            <td class="userstatus">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="statusactive" checked="">
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>                                            
                                            <td class="name">
                                                <div class="d-flex">
                                                    <div class="avatar-group">
                                                        <a href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Frank">
                                                            <img src="<?= cnd_url(); ?>assets/images/users/avatar-3.jpg" alt="" class="rounded-circle avatar-xxs" />
                                                            Robert McMahon
                                                        </a>
                                                    </div>
                                                    <div class="flex-shrink-0 ms-4">
                                                        <ul class="list-inline tasks-list-menu mb-0">

                                                            <li class="list-inline-item"><a class="edit-item-btn" href="#showModal" data-bs-toggle="modal"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i></a></li>
                                                            <li class="list-inline-item">
                                                                <a class="remove-item-btn" data-bs-toggle="modal" href="#deleteOrder">
                                                                    <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="email"><a href="mailto:robert.mcmahon@gmail.com">robert.mcmahon@gmail.com</a></td>
                                            <td class="address">London, UK</td>
                                            <td class="activity"> - </td>
                                            <td class="mobile">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="mobileaccess" checked="">
                                                </div>
                                            </td>                                            
                                            <td class="Office">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="officestaff" checked="">
                                                </div>
                                            </td>
                                            <td class="userstatus">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="statusactive" checked="">
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>                                            
                                            <td class="name">
                                                <div class="d-flex">
                                                    <div class="avatar-group">
                                                        <a href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Frank">
                                                            <img src="<?= cnd_url(); ?>assets/images/users/avatar-3.jpg" alt="" class="rounded-circle avatar-xxs" />
                                                            Robert McMahon
                                                        </a>
                                                    </div>
                                                    <div class="flex-shrink-0 ms-4">
                                                        <ul class="list-inline tasks-list-menu mb-0">

                                                            <li class="list-inline-item"><a class="edit-item-btn" href="#showModal" data-bs-toggle="modal"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i></a></li>
                                                            <li class="list-inline-item">
                                                                <a class="remove-item-btn" data-bs-toggle="modal" href="#deleteOrder">
                                                                    <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="email"><a href="mailto:robert.mcmahon@gmail.com">robert.mcmahon@gmail.com</a></td>
                                            <td class="address">London, UK</td>
                                            <td class="activity"> - </td>
                                            <td class="mobile">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="mobileaccess">
                                                </div>
                                            </td>                                            
                                            <td class="Office">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="officestaff">
                                                </div>
                                            </td>
                                            <td class="userstatus">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="statusactive">
                                                </div>
                                                <span class="badge bg-success text-uppercase">Activation Pending</span>
                                            </td>
                                        </tr>
                                        <tr>                                            
                                            <td class="name">
                                                <div class="d-flex">
                                                    <div class="avatar-group">
                                                        <a href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Frank">
                                                            <img src="<?= cnd_url(); ?>assets/images/users/avatar-3.jpg" alt="" class="rounded-circle avatar-xxs" />
                                                            Robert McMahon
                                                        </a>
                                                    </div>
                                                    <div class="flex-shrink-0 ms-4">
                                                        <ul class="list-inline tasks-list-menu mb-0">

                                                            <li class="list-inline-item"><a class="edit-item-btn" href="#showModal" data-bs-toggle="modal"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i></a></li>
                                                            <li class="list-inline-item">
                                                                <a class="remove-item-btn" data-bs-toggle="modal" href="#deleteOrder">
                                                                    <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="email"><a href="mailto:robert.mcmahon@gmail.com">robert.mcmahon@gmail.com</a></td>
                                            <td class="address">London, UK</td>
                                            <td class="activity"> - </td>
                                            <td class="mobile">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="mobileaccess" checked="">
                                                </div>
                                            </td>                                            
                                            <td class="Office">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="officestaff">
                                                </div>
                                            </td>
                                            <td class="userstatus">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="statusactive" checked="">
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>                                            
                                            <td class="name">
                                                <div class="d-flex">
                                                    <div class="avatar-group">
                                                        <a href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Frank">
                                                            <img src="<?= cnd_url(); ?>assets/images/users/avatar-3.jpg" alt="" class="rounded-circle avatar-xxs" />
                                                            Robert McMahon
                                                        </a>
                                                    </div>
                                                    <div class="flex-shrink-0 ms-4">
                                                        <ul class="list-inline tasks-list-menu mb-0">

                                                            <li class="list-inline-item"><a class="edit-item-btn" href="#showModal" data-bs-toggle="modal"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i></a></li>
                                                            <li class="list-inline-item">
                                                                <a class="remove-item-btn" data-bs-toggle="modal" href="#deleteOrder">
                                                                    <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="email"><a href="mailto:robert.mcmahon@gmail.com">robert.mcmahon@gmail.com</a></td>
                                            <td class="address">London, UK</td>
                                            <td class="activity"> - </td>
                                            <td class="mobile">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="mobileaccess" checked="">
                                                </div>
                                            </td>                                            
                                            <td class="Office">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="officestaff" checked="">
                                                </div>
                                            </td>
                                            <td class="userstatus">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="statusactive" checked="">
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>                                            
                                            <td class="name">
                                                <div class="d-flex">
                                                    <div class="avatar-group">
                                                        <a href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Frank">
                                                            <img src="<?= cnd_url(); ?>assets/images/users/avatar-3.jpg" alt="" class="rounded-circle avatar-xxs" />
                                                            Robert McMahon
                                                        </a>
                                                    </div>
                                                    <div class="flex-shrink-0 ms-4">
                                                        <ul class="list-inline tasks-list-menu mb-0">

                                                            <li class="list-inline-item"><a class="edit-item-btn" href="#showModal" data-bs-toggle="modal"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i></a></li>
                                                            <li class="list-inline-item">
                                                                <a class="remove-item-btn" data-bs-toggle="modal" href="#deleteOrder">
                                                                    <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="email"><a href="mailto:robert.mcmahon@gmail.com">robert.mcmahon@gmail.com</a></td>
                                            <td class="address">London, UK</td>
                                            <td class="activity"> - </td>
                                            <td class="mobile">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="mobileaccess">
                                                </div>
                                            </td>                                            
                                            <td class="Office">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="officestaff">
                                                </div>
                                            </td>
                                            <td class="userstatus">
                                                <div class="form-check form-switch form-switch-md mb-3" dir="ltr">
                                                    <input type="checkbox" class="form-check-input" id="statusactive" checked="">
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                                <!--end table-->
                                <div class="noresult" style="display: none">
                                    <div class="text-center">
                                        <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style="width:75px;height:75px"></lord-icon>
                                        <h5 class="mt-2">Sorry! No Result Found</h5>
                                        <p class="text-muted mb-0">We've searched more than 200k+ tasks We did not find any tasks for you search.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-end mt-2">
                                <div class="pagination-wrap hstack gap-2">
                                    <a class="page-item pagination-prev disabled" href="#">
                                        Previous
                                    </a>
                                    <ul class="pagination listjs-pagination mb-0"></ul>
                                    <a class="page-item pagination-next" href="#">
                                        Next
                                    </a>
                                </div>
                            </div>
                        </div>
                        <!--end card-body-->
                    </div>
                    <!--end card-->
                </div>
                <!--end col-->
            </div>
            <!--end row-->

            <div class="modal fade flip" id="deleteOrder" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body p-5 text-center">
                            <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#405189,secondary:#f06548" style="width:90px;height:90px"></lord-icon>
                            <div class="mt-4 text-center">
                                <h4>You are about to delete a task ?</h4>
                                <p class="text-muted fs-14 mb-4">Deleting your task will remove all of
                                    your information from our database.</p>
                                <div class="hstack gap-2 justify-content-center remove">
                                    <button class="btn btn-link btn-ghost-success fw-medium text-decoration-none" id="deleteRecord-close" data-bs-dismiss="modal"><i class="ri-close-line me-1 align-middle"></i> Close</button>
                                    <button class="btn btn-danger" id="delete-record">Yes, Delete It</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--end delete modal -->

            <div class="modal fade zoomIn" id="showModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content border-0">
                        <div class="modal-header p-3 bg-info-subtle">
                            <h5 class="modal-title" id="exampleModalLabel">Add Engineer</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close-modal"></button>
                        </div>
                        <form class="tablelist-form" autocomplete="off">
                            <div class="modal-body">
                                <input type="hidden" id="tasksId" />
                                <div class="row gy-3">
                                    <div class="col-xxl-4 col-md-6">
                                        <div class="card">
                                            <div class="card-body p-2">
                                                <div class="text-center">
                                                    <div class="profile-user position-relative d-inline-block mx-auto  mb-4">
                                                        <img src="<?= cnd_url(); ?>assets/images/users/avatar-1.jpg" class="rounded-circle avatar-xl img-thumbnail user-profile-image" alt="user-profile-image">
                                                        <div class="avatar-xs p-0 rounded-circle profile-photo-edit">
                                                            <input id="profile-img-file-input" type="file" class="profile-img-file-input">
                                                            <label for="profile-img-file-input" class="profile-photo-edit avatar-xs">
                                                                <span class="avatar-title rounded-circle bg-light text-body">
                                                                    <i class="ri-camera-fill"></i>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!--end card-->
                                    </div>
                                    <div class="col-xxl-8 col-md-12">
                                        <div class="row gy-3">
                                            <div class="col-xxl-6 col-md-6">
                                                <div>
                                                    <label for="basiInput" class="form-label">First Name</label>
                                                    <input type="text" class="form-control" id="basiInput">
                                                </div>
                                            </div>
                                            <div class="col-xxl-6 col-md-6">
                                                <div>
                                                    <label for="basiInput" class="form-label">Last Name</label>
                                                    <input type="text" class="form-control" id="basiInput">
                                                </div>
                                            </div>
                                            <div class="col-xxl-6 col-md-6">
                                                <div>
                                                    <label for="labelInput" class="form-label">Email</label>
                                                    <input type="text" class="form-control" id="labelInput">
                                                </div>
                                            </div>
                                            <!--end col-->
                                            <div class="col-xxl-6 col-md-6">
                                                <div>
                                                    <label for="labelInput" class="form-label">Mobile</label>
                                                    <input type="text" class="form-control" id="labelInput">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xxl-4 col-md-6">
                                        <div>
                                            <label for="labelInput" class="form-label">Telephone</label>
                                            <input type="text" class="form-control" id="labelInput">
                                        </div>
                                    </div>
                                    <!--end col-->

                                    <div class="col-xxl-4 col-md-6">
                                        <div>
                                            <label for="exampleFormControlTextarea5" class="form-label">Street Address</label>
                                            <input type="text" class="form-control" id="labelInput">                                            
                                        </div>
                                    </div>
                                    <div class="col-xxl-4 col-md-6">
                                        <div>
                                            <label for="exampleFormControlTextarea5" class="form-label">Area / City</label>
                                            <input type="text" class="form-control" id="labelInput">                                            
                                        </div>
                                    </div>
                                    <!--end col-->
                                    <div class="col-xxl-4 col-md-6">
                                        <div>
                                            <label for="exampleFormControlTextarea5" class="form-label">County</label>
                                            <input type="text" class="form-control" id="labelInput">                                            
                                        </div>
                                    </div>
                                    <!--end col-->
                                    <div class="col-xxl-4 col-md-6">
                                        <div>
                                            <label for="exampleFormControlTextarea5" class="form-label">Postcode</label>
                                            <input type="text" class="form-control" id="labelInput">
                                        </div>
                                    </div>
                                    <!--end col-->
                                    <div class="col-xxl-4 col-md-6">
                                        <div>
                                            <label for="qualification" class="form-label">Qualification / Certification</label>
                                            <input type="text" class="form-control" id="qualification">
                                        </div>
                                    </div>
                                    <!--end col-->
                                    <div class="col-xxl-4 col-md-6">
                                        <div>
                                            <label for="working-hours" class="form-label">Working Hours</label>
                                            <select class="form-control" id="working-hours" data-choices data-choices-search-false name="choices-single-default"  name="working-hours">                                                
                                                <option value="1">9:00 am</option>
                                                <option value="2">10:00 am</option>
                                                <option value="3">11:00 am</option>
                                            </select>
                                            
                                        </div>
                                    </div>
                                    <!--end col-->
                                    <div class="col-xxl-4 col-md-6">
                                        <div>
                                            <label for="working-hours" class="form-label">&nbsp;</label>
                                            <select class="form-control" id="working-hours" data-choices data-choices-search-false name="choices-single-default"  name="working-hours">                                                
                                                <option value="1">5:00 pm</option>
                                                <option value="2">6:00 pm</option>
                                                <option value="3">7:00 pm</option>
                                            </select>
                                        </div>
                                    </div>
                                    <!--end col-->
                                    <div class="col-xxl-4 col-md-6">
                                        <div>
                                            <label for="standard-rate" class="form-label">Standard Rate</label>
                                            <input type="text" class="form-control" id="standard-rate">
                                        </div>
                                    </div>
                                    <!--end col-->
                                    <div class="col-xxl-4 col-md-6">
                                        <div>
                                            <label for="extended-rate" class="form-label">Extended Rate</label>
                                            <input type="text" class="form-control" id="extended-rate">
                                        </div>
                                    </div>
                                    <!--end col-->
                                    <div class="col-xxl-4 col-md-6">
                                        <div>
                                            <label for="weekend-rate" class="form-label">Weekend Rate</label>
                                            <input type="text" class="form-control" id="weekend-rate">
                                        </div>
                                    </div>
                                    <!--end col-->
                                    <div class="col-xxl-4 col-md-6">
                                        <div>
                                            <label for="holiday-rate" class="form-label">Holiday Rate</label>
                                            <input type="text" class="form-control" id="holiday-rate">
                                        </div>
                                    </div>
                                    <!--end col-->
                                    <div class="col-xxl-8 col-md-6">
                                        <div>
                                            <label for="set-job-types" class="form-label">Set Job Types</label>
                                            <select class="form-control" id="set-job-types" data-choices data-choices-removeItem name="set-job-types" multiple>                                                
                                                <option value="1">PPM</option>
                                                <option value="2">Reactive</option>
                                                <option value="3">Emergency</option>
                                            </select>
                                        </div>
                                    </div>
                                    <!--end col-->

                                    <div class="col-xxl-4 col-md-6">
                                        <div>
                                            <label for="set-job-types" class="form-label">Work Stream</label>
                                            <select class="form-control" id="set-job-types" data-choices data-choices-removeItem name="set-job-types" multiple>                                                
                                                <option value="1">Stream 1</option>
                                                <option value="2">Stream 2</option>
                                                <option value="3">Stream 3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <!--end col-->
                                    <div class="col-xxl-12 col-md-12">
                                        <div>
                                            <label for="exampleFormControlTextarea5" class="form-label">Other info</label>
                                            <input type="text" class="form-control" id="labelInput">
                                        </div>
                                    </div>
                                    <!--end col-->


                                    <div class="col-xxl-3 col-md-6">                                        
                                        <div class="form-check form-switch form-switch-lg" dir="ltr">                                                
                                            <input type="checkbox" class="form-check-input" id="mobileaccess1">
                                            <label class="form-check-label" for="mobileaccess1">Mobile Access</label>
                                        </div>
                                    </div>
                                    <!--end col-->
                                    <div class="col-xxl-4 col-md-6">                                        
                                        <div class="form-check form-switch form-switch-lg" dir="ltr">                                                
                                            <input type="checkbox" class="form-check-input" id="officeaccess">
                                            <label class="form-check-label" for="officeaccess">Back Office System</label>
                                        </div>
                                    </div>
                                    <!--end col-->
                                    <div class="col-xxl-3 col-md-6">                                        
                                        <div class="form-check form-switch form-switch-lg" dir="ltr">                                                
                                            <input type="checkbox" class="form-check-input" id="activateuser">
                                            <label class="form-check-label" for="activateuser">Activate</label>
                                        </div>
                                    </div>
                                    <!--end col-->
                                </div>
                                <!--end row-->
                            </div>
                            <div class="modal-footer">
                                <div class="hstack gap-2 justify-content-end">
                                    <button type="button" class="btn btn-light" id="close-modal" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-success" id="add-btn">Add Engineer</button>
                                    <!-- <button type="button" class="btn btn-success" id="edit-btn">Update Task</button> -->
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!--end modal-->

        </div>
        <!-- container-fluid -->
    </div>
    <!-- End Page-content -->


    <?php include_once 'commons/footer.php'; ?>
    <!-- profile-setting init js -->
    <script src="assets/js/pages/profile-setting.init.js"></script>