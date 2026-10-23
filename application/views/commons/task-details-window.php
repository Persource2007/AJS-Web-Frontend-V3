<div class="card-body ps-0" style="height:100%; overflow-x:hidden; padding-right:8px;">
   <button class="close-card-btn"><i class="las la-times" style="font-size: 1.25em;"></i></button>
   <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-3">
         <div class="modal-body">
            <div class="">
               <div class="row gy-2 task-descrip-top-main">
                  <div class="col-xxl-12 col-md-12">
                     <h5><span class="task_code data"></span> | <span class="client_code data"></span> | <span class="contract_number data"></span></h5>
                     <p class="modal-descrip-main scrollbar" id="style-2"><span class="task_description data"></span></p>
                  </div>
               </div>
               <div class="row">
                    <div class="col-sm-12 col-md-12">
                        <p class="mb-1"><b>Skill:</b> <span class="data skill_name"></span></p>
                    </div>
                    <div class="col-sm-12 col-md-12">
                      <p class="mb-1"><b>Task Type:</b> <span class="data task_type"></span></p>
                    </div>
                    <div class="col-sm-12 col-md-12">
                        <p class="mb-1"><b>Assigned On:</b> <span class="data assigned_on" data-type="date"></span></p>
                    </div>
                    <div class="col-sm-12 col-md-12">
                       <p class="mb-1"><b>Created On:</b> <span class="data created_on" data-type="date"></span></p>
                    </div>
                    <div class="col-sm-12 col-md-12">
                        <p class="mb-1"><b>Created By:</b> <span class="data created_by"></span></p>
                    </div>
                    <div class="col-sm-12 col-md-12">
                        <p class="mb-1"><b>Sent to PDA:</b> <span class="data sent_to_pda" data-type="date"></span></p>
                    </div>
                    <div class="col-sm-12 col-md-12">
                        <p class="mb-1"><b>Target:</b> <span class="data target_date" data-type="date"></span></p>
                    </div>
                    <div class="col-sm-12 col-md-12">
                       <p class="mb-1"><b>Task Status:</b> <span class="data task_status"></span></p>
                    </div>
                    <div class="col-sm-12 col-md-12">
                        <p class="mb-1"><b>Engineer ID:</b> <span class="data engineer"></span></p>
                    </div>
                  <div class="col-sm-12 col-md-12">
                     <p class="mb-1"><b>Attended On:</b> <span class="data attended_on" data-type="date"></span></p>
                  </div>
                  <div class="col-sm-12 col-md-12">
                     <p class="mb-1"><b>Completed On:</b> <span class="data completed_on" data-type="date"></span></p>
                  </div>
                  <div class="col-sm-12 col-md-12">
                     <p class="mb-1"><b>UPRN:</b> <span class="data uprn_no"></span></p>
                  </div>
                  <div class="col-sm-12 col-md-12">
                     <p class="mb-1"><b>Address:</b> <span class="data address"></span> </p>
                  </div>
                  <div class="col-sm-12 col-md-12">
                     <p class="mb-1"><b>Postcode:</b> <span class="data postalcode"></span> </p>
                  </div>
               </div>
               <div class="row mt-3">
                    <div class="col-xxl-12 col-md-12">
                        <h5>Manager Comments</h5>
                        <p><span class="data manager_comments"></span></p>
                    </div>
                    <div class="col-xxl-12 col-md-12">
                        <h5>Engineer Comments</h5>
                        <p><span class="data engineer_comments"></span></p>
                    </div>
                  
                  <div class="col-xxl-12 col-md-12 no_access_reason">
                  </div>
                  <div class="col-xxl-12 col-md-12 threshold_comments">
                  </div>
                  <div class="col-xxl-12 col-md-12 reviewed_comments">
                     <h5></h5>
                     <p><span></span></p>
                  </div>
               </div>
            </div>
            <!--end row-->
         </div>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-9">
         <div class="row gy-2 mb-2">
            <div class="col-sm-12 col-md-6 col-lg-7">
               <!--<p style="font-size: 18px;">SORs: <strong>3 </strong>, Pics: <strong>10 </strong>, Certs: <strong>2 </strong></p>-->
               <p style="font-size: 16px;">
                  Material <strong><i class="bx bx-pound fw-bold" style="letter-spacing: -2px;"></i><span class="data total_materials" data-type="price"></span> </strong>  &nbsp;|&nbsp;
                  Labour <strong><i class="bx bx-pound fw-bold" style="letter-spacing: -2px;"></i><span class="data total_labors" data-type="price"></span></strong>   &nbsp;|&nbsp;
                  Sell <strong><i class="bx bx-pound fw-bold" style="letter-spacing: -2px;"></i><span class="data total_sells" data-type="price"></span></strong> &nbsp; | &nbsp;
                  Margin <strong> <span style="color:green"><span class="data margins"></span>%</span></strong>
               </p>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-5 text-end task-detail-actions mt-1"></div>
         </div>
         <ul class="client-sub-nav nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1 pt-0" role="tablist">
            <li class="nav-item"><a class="nav-link fs-14 active" data-bs-toggle="tab" href="#sors" role="tab">SORs</a></li>
            <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#assets" role="tab">Assets</a></li>
            <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#certificate" role="tab">Certificates</a></li>
            <li class="nav-item"><a class="nav-link fs-14" data-bs-toggle="tab" href="#media" role="tab">Media</a></li>
            <li class="nav-item"><a class="nav-link  fs-14" data-bs-toggle="tab" href="#events" role="tab">Log</a></li>
            <li class="nav-item"><a class="nav-link  fs-14" data-bs-toggle="tab" href="#safety-feedback" role="tab">H&S</a></li>
            <li class="nav-item"><a class="nav-link  fs-14" data-bs-toggle="tab" href="#observations" role="tab">Observations</a></li>
         </ul>
         <div class="tab-content stock-tbl-details-main">
            <div class="tab-pane active" id="sors" style=" overflow:auto" role="tabpanel">
               <div class="table-responsive job-sors-box table-card mt-1 tasks-tbl">
                  <table class="table table-borderless table-nowrap">
                     <thead>
                        <tr>
                           <th>SOR #</th>
                           <th>Desc.</th>
                           <th>Engr. Comment</th>
                           <th class="text-end">Material (<i class="bx bx-pound"></i>)</th>
                           <th class="text-end">Labor (<i class="bx bx-pound"></i>)</th>
                           <th class="text-end">Overhead (<i class="bx bx-pound"></i>)</th>
                           <th class="text-end">Overhead ( % )</th>
                           <th class="text-end">Sell (<i class="bx bx-pound"></i>)</th>
                           <th class="text-center">Qty.</th>
                           <th class="text-center">Certs.</th>
                           <th class="text-center">Pics</th>
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
            <div class="tab-pane" id="assets" style=" overflow:auto" role="tabpanel">
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
               <div class="table-responsive job-certificate-box table-card mt-1 tasks-tbl" style=" overflow:auto">
                  <table class="table table-borderless table-nowrap">
                     <thead>
                        <tr>
                            <th>Action</th>
                           <th>Code</th>
                           <th>Title</th>
                           <th>Required</th>
                           <th>Assigned To</th>
                           <th>Status</th>
                           <th>Added By</th>
                           <th>Created On</th>
                        </tr>
                     </thead>
                     <tbody class="task-detail-certificates"></tbody>
                  </table>
               </div>
            </div>
            <!--end tab-pane-->
            <div class="tab-pane" id="media" role="tabpanel">
               <div class="table-responsive job-media-box table-card mt-1 tasks-tbl" style=" overflow:auto">
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
                  
            <div class="tab-pane " style=" overflow:auto" id="events" role="tabpanel">
               <div class="table-responsive job-event-box table-card mt-1 tasks-tbl">
                  <!-- Tables Without Borders -->
                  <table class="table table-borderless table-nowrap">
                     <thead>
                        <tr>
                           <th>#</th>
                           <th>Log Type</th>
                           <th>Added By</th>
                           <th>Log Date</th>
                           <th>Comments</th>
                        </tr>
                     </thead>
                     <tbody class="task-detail-events"></tbody>
                  </table>
               </div>
            </div>
            <div class="tab-pane " style=" overflow:auto" id="safety-feedback" role="tabpanel">
               <div class="table-responsive job-event-box table-card mt-1 tasks-tbl">
                  <!-- Tables Without Borders -->
                  <table class="table table-borderless table-nowrap">
                     <thead>
                        <tr>
                           <th>#</th>
                           <th>Question</th>
                           <th>Answer</th>
                            <th>Created date</th>
                        </tr>
                     </thead>
                     <tbody class="task-detail-safety-feedback"></tbody>
                  </table>
               </div>
            </div>
            <div class="tab-pane " style=" overflow:auto" id="observations" role="tabpanel">
               <div class="table-responsive job-event-box table-card mt-1 tasks-tbl">
                  <!-- Tables Without Borders -->
                  <table class="table table-borderless table-nowrap">
                     <thead>
                        <tr>
                           <th>#</th>
                           <th>Question</th>
                           <th>Answer</th>
                           <th>Comments</th>
                           <th>Files</th>
                           <th>Created date</th>
                        </tr>
                     </thead>
                     <tbody class="task-detail-observations"></tbody>
                  </table>
               </div>
            </div>
            <!--edn tab-pane-->
         </div>
      </div>
   </div>
</div>