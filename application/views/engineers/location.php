<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.min.css" />
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <!-- start page title -->
            <?php
            require_once APPPATH . 'views/commons/breadcrumb.php';
            ?>
            <!-- end page title -->
            <div class="same-page-height dataTables-height">
                <div class="card p-3 engineer-locator-main" id="tasksList">
                    <div class="card-body p-0 engineer-locator-body">
                        <div class="row">
                            <div class="col-lg-5 col-xl-5 col-xxl-5">
                                <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-0 ps-0 pe-0 mb-2">
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <?php
                                            require_once APPPATH . 'views/engineers/inc/filters.php';
                                            ?>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex engineer-locator-details" style="background-color: #f3f6f9;">
                                    <div class="sub-same-details table-col-width-10"><b>Sr.</b></div>
                                    <div class="sub-same-details ps-4 table-col-width-30"><b>Name</b></div>
                                    <div class="sub-same-details table-col-width-30"><b>Mobile</b></div>
                                    <div class="sub-same-details table-col-width-15 text-end"><b>Skills</b></div>
                                    <div class="sub-same-details table-col-width-15 text-center "><b>Message</b></div>
                                </div>
                                <div class="engineer-tbl-main">
                                </div>
                            </div>

                            <div class="col-lg-7 col-xl-7 col-xxl-7">
                                <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-0 ps-0 pe-0 mb-3">
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <div class="btn-group">
                                                <div class="search-box" style="width: 250px;">
                                                    <input type="text" id="postcode"  class="form-control search" placeholder="Search by Postcode">
                                                    <i class="mdi mdi-magnify search-widget-icon"></i>
                                                </div>
                                            </div>
                                            <div class="btn-group ms-1">
                                                <button class="btn btn-primary" id="postcode-search" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                                            </div>
                                            <div class="btn-group ms-1">
                                                <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle refresh-engr-loc" title="Refresh Location">
                                                    <i class='bx bx-refresh fs-24'></i>
                                                </button>
                                            </div>
                                            <div class="btn-group ms-2">
                                                <span id="engr-last-updated" class="text-muted" style="font-size: 12px; white-space: nowrap;"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="map"></div>

                               <!--  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11200.675829730526!2d-75.6876061!3d45.42609535!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce04ff4fe494ef%3A0x26bb54f60c29f6e!2sParliament+Hill!5e0!3m2!1sen!2sca!4v1528808935681" width="100%" height="500" frameborder="0" style="border:0" allowfullscreen></iframe> -->
                            </div>
                        </div>
                    </div>
                    <!--end card-body-->
                </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
        <!-- container-fluid -->
    </div>
</div>
<input type="hidden" id="user_type" value=""/>
<!-- End Page-content -->
<script>
  (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r, "geometry"]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: ajs.mapKey,
    v: "weekly",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
  });
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/notifications/notification.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/engineers/location.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>