<div class="card-body" style="height-100%; overflow-x:hidden; padding-right:8px;">
   <div class="row">
      <div class="col-lg-4 col-xl-4 col-xxl-4">
         <div class="modal-body">
            <div class="">
               <div class="row gy-2 task-descrip-top-main">
                  <div class="col-xxl-12 col-md-12">
                     <h5><span class="task_code data"></span> | <span class="client_code data"></span> | <span class="contract_number data"></span></h5>
                     <p class="modal-descrip-main scrollbar" id="style-2"><span class="task_description data"></span></p>
                  </div>
               </div>
               <div class="row">
                  <div class="col-xxl-6 col-md-6">
                     <p class="mb-1"><b>Skill:</b> <span class="data skill_name"></span></p>
                  </div>
                  <div class="col-xxl-6 col-md-6">
                     <p class="mb-1"><b>Created On:</b> <span class="data created_on" data-type="date"></span></p>
                  </div>
                  <div class="col-xxl-6 col-md-6">
                     <p class="mb-1"><b>Task Type:</b> <span class="data task_type"></span></p>
                  </div>
                  <div class="col-xxl-6 col-md-6">
                     <p class="mb-1"><b>Assigned On:</b> <span class="data assigned_on" data-type="date"></span></p>
                  </div>
                  <div class="col-xxl-6 col-md-6">
                     <p class="mb-1"><b>Created By:</b> <span class="data created_by"></span></p>
                  </div>
                  <div class="col-xxl-6 col-md-6">
                     <p class="mb-1"><b>Sent to PDA:</b> <span class="data sent_to_pda" data-type="date"></span></p>
                  </div>
                  <div class="col-xxl-6 col-md-6">
                     <p class="mb-1"><b>Task Status:</b> <span class="data task_status"></span></p>
                  </div>
                  <div class="col-xxl-6 col-md-6">
                     <p class="mb-1"><b>Target:</b> <span class="data target_date" data-type="date"></span></p>
                  </div>
                  <div class="col-xxl-6 col-md-6">
                     <p class="mb-1"><b>Engineer ID:</b> <span class="data engineer"></span></p>
                  </div>
                  <div class="col-xxl-6 col-md-6">
                     <p class="mb-1"><b>Attended On:</b> <span class="data attended_on" data-type="date"></span></p>
                  </div>
                  <div class="col-xxl-6 col-md-6">
                     <p class="mb-1"><b>Completed On:</b> <span class="data completed_on" data-type="date"></span></p>
                  </div>
                  <div class="col-xxl-6 col-md-6"></div>
                  <div class="col-xxl-6 col-md-6">
                     <p class="mb-1"><b>UPRN:</b> <span class="data uprn_no"></span></p>
                  </div>
                  <div class="col-xxl-6 col-md-6">
                     <p class="mb-1"><b>Postcode:</b> <span class="data postalcode"></span> </p>
                  </div>
                  <div class="col-xxl-6 col-md-6">
                     <p class="mb-1"><b>Address:</b> <span class="data address"></span> </p>
                  </div>
               </div>
               <div class="row mt-3">
                  <div class="col-xxl-6 col-md-6">
                     <h5>Engineer Comments</h5>
                     <p><span class="data engineer_comments"></span></p>
                  </div>
                  <div class="col-xxl-6 col-md-6">
                     <h5>Manager Comments</h5>
                     <p><span class="data manager_comments"></span></p>
                  </div>
               </div>
            </div>
            <!--end row-->
         </div>
      </div>
      <div class="col-lg-8 col-xl-8 col-xxl-8">
         <div class="row gy-2 mb-2">
            <div class="col-xxl-7 col-md-7">
               <!--<p style="font-size: 18px;">SORs: <strong>3 </strong>, Pics: <strong>10 </strong>, Certs: <strong>2 </strong></p>-->
               <p style="font-size: 16px;">
                  Material <strong><i class="bx bx-pound" style="letter-spacing: -2px;"></i><span class="data total_materials" data-type="price"></span> </strong>  &nbsp;|&nbsp;
                  Labour <strong><i class="bx bx-pound" style="letter-spacing: -2px;"></i><span class="data total_labors" data-type="price"></span></strong>   &nbsp;|&nbsp;
                  Sell <strong><i class="bx bx-pound" style="letter-spacing: -2px;"></i><span class="data total_sells" data-type="price"></span></strong> &nbsp; | &nbsp;
                  Margin <strong> <span style="color:green"><span class="data margins"></span>%</span></strong>
               </p>
            </div>
            <div class="col-xxl-5 col-md-5 text-end task-detail-actions"></div>
         </div>
         <ul class="client-sub-nav nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1 pt-0" role="tablist">
            <li class="nav-item"><a class="nav-link fs-14 active" data-bs-toggle="tab" href="#sors" role="tab">SORs</a></li>
            <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#assets" role="tab">Assets</a></li>
            <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#certificate" role="tab">Certificates</a></li>
            <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#media" role="tab">Media</a></li>
            <li class="nav-item"><a class="nav-link  fs-14" data-bs-toggle="tab" href="#events" role="tab">Events</a></li>
         </ul>
         <div class="tab-content stock-tbl-details-main">
            <div class="tab-pane active" id="sors" style="max-height: 250px; overflow:auto" role="tabpanel">
               <div class="table-responsive job-sors-box table-card mt-1 tasks-tbl">
                  <table class="table table-borderless table-nowrap">
                     <thead>
                        <tr>
                           <th></th>
                           <th>SOR #</th>
                           <th>Desc.</th>
                           <th class="text-end">Material (<i class="bx bx-pound"></i>)</th>
                           <th class="text-end">Labor (<i class="bx bx-pound"></i>)</th>
                           <th class="text-end">Sell (<i class="bx bx-pound"></i>)</th>
                           <th class="text-end">Qty.</th>
                           <th class="text-end">Certs.</th>
                           <th class="text-end">Pics</th>
                           <th>Chargeable</th>
                           <th>Payable</th>
                           <th>CTP</th>
                           <th>Ok</th>
                           <th>Added By</th>
                           <th>Created On</th>
                        </tr>
                     </thead>
                     <tbody class="task-detail-sors"></tbody>
                  </table>
               </div>
            </div>
            <div class="tab-pane" id="assets" style="max-height: 250px; overflow:auto" role="tabpanel">
               <div class="table-responsive job-asset-box table-card mt-1 tasks-tbl">
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
                     <tbody class="task-detail-assets"></tbody>
                  </table>
               </div>
            </div>
            <div class="tab-pane" id="certificate" role="tabpanel">
               <div class="table-responsive job-certificate-box table-card mt-1 tasks-tbl" style="height: 250px; overflow:auto">
                  <table class="table table-borderless table-nowrap">
                     <thead>
                        <tr>
                           <th>#</th>
                           <th>Code</th>
                           <th>Title</th>
                           <th>Required</th>
                           <th>Assigned To</th>
                           <th>Status</th>
                           <th>Added By</th>
                           <th>Created On</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody class="task-detail-certificates"></tbody>
                  </table>
               </div>
            </div>
            <!--end tab-pane-->
            <div class="tab-pane" id="media" role="tabpanel">
               <div class="table-responsive job-media-box table-card mt-1 tasks-tbl" style="height: 250px; overflow-y: auto;">
                  <table class="table table-borderless table-nowrap">
                     <thead>
                        <tr>
                           <th>#</th>
                           <th>File Type</th>
                           <th>File Path</th>
                           <th>Caption</th>
                           <th>Added By</th>
                           <th>Upload On</th>
                        </tr>
                     </thead>
                     <tbody class="task-detail-medias"></tbody>
                  </table>
               </div>
            </div>
                  
            <div class="tab-pane " style="max-height: 250px; overflow:auto" id="events" role="tabpanel">
               <div class="table-responsive job-event-box table-card mt-1 tasks-tbl">
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
                     <tbody class="task-detail-events"></tbody>
                  </table>
               </div>
            </div>
            <!--edn tab-pane-->
         </div>
      </div>
   </div>
</div>