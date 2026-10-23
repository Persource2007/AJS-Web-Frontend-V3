<?php
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<style>
.refresh-table {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgb(243 243 249 / 75%);
    display: inline-flex;
    align-items: center;
    justify-content: center; 
    color:var(--primary-color);
} 
</style>
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
                            <div class="col-lg-12 col-xl-12 col-xxl-12">
                                <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-0 ps-0 pe-0 mb-2">
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <form id="form_filters" action="" method="GET">
                                                <div class="d-flex justify-content-between">
                                                    <div>
                                                        <div class="btn-group">
                                                            <div class="search-box" style="width: 250px;">
                                                                <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search By Reg. Number, Model or Driver">
                                                                <i class="mdi mdi-magnify search-widget-icon"></i>
                                                            </div>
                                                        </div>
                                                        <div class="btn-group ms-1">
                                                            <button class="btn btn-primary waves-effect waves-light" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                                                        </div>
                                                        <div class="btn-group ms-1">
                                                            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle refresh-van-loc" title="Refresh Location">
                                                                <i class='bx bx-refresh fs-24'></i>
                                                            </button>
                                                        </div>
                                                        <div class="btn-group ms-2">
                                                            <span id="van-last-updated" class="text-muted" style="font-size: 12px; white-space: nowrap;"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-5 col-xl-5 col-xxl-5">
                                <div class="" >
                                    <table class="card-body table dt-responsive table align-middle table-nowrap mb-0 p-0 table-hover w-100" id="van-loc-datatables" style="margin-top: 0px !important; padding-top: 0px !important;">
                                    </table>
                                </div>
                                <div class="d-flex engineer-locator-details" style="background-color: #f3f6f9;">
                                    <div class="sub-same-details table-col-width-10"><b>Sr.</b></div>
                                    <div class="sub-same-details table-col-width-30"><b>Reg. Number</b></div>
                                    <div class="sub-same-details table-col-width-35"><b>Model</b></div>
                                    <div class="sub-same-details table-col-width-25"><b>Driver</b></div>
                                </div>
                                <div class="position-relative">
                                    <div class="refresh-table d-none" id="van-loader">
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    <div class="engineer-tbl-main"> </div>
                                </div>
                            </div>

                            <div class="col-lg-7 col-xl-7 col-xxl-7">
                                <!-- <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-0 ps-0 pe-0 mb-3">
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
                                        </div>
                                    </div>
                                </div> -->
                                <div id="map"></div>
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
<!-- End Page-content -->
<script>
  (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r, "geometry"]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: ajs.mapKey,
    v: "weekly",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
  });
</script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/locations/location-vans.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/datatable-defaults.js') ?>"></script>