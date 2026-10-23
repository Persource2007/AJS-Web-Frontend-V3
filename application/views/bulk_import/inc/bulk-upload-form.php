<style>
    .right-filter button {
        margin-left: 0px;
    }
</style>

<div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3">
    <!--    <form method="POST" action="" data-upload-type="clients" data-file-type="excel" class="bulk-upload-form" enctype="multipart/form-data">-->
    <div class="d-flex justify-content-between">
        <div>
            <div class="btn-group ms-1">
            <form id="form_filters" action="" method="GET">
                <div class="btn-group">
                    <div class="search-box" style="width: 250px;">
                        <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Batch ID / Date">
                        <i class="mdi mdi-magnify search-widget-icon"></i>
                    </div>
                </div>               
                <div class="btn-group ms-1">
                    <button class="btn btn-primary" id="search_grid" style="padding: 1px 12px;"><i class="mdi mdi-magnify search-widget-icon fs-18"></i></button>
                </div>
            </form>
                   
            
            <div class="d-flex align-items-center gap-2 flex-wrap right-filter" style="margin-left: 10px;">

                <!-- Import Type Dropdown -->
                    <!-- Import Type Dropdown -->
                <div class="dropdown">
                    <button class="btn btn-outline-secondary btn-lg dropdown-toggle px-3 py-2 text-start"
                            type="button"
                            id="jobImportTypeBtn"
                            data-bs-toggle="dropdown"
                            aria-expanded="false" style="width: 200px;">
                        <i class="las la-layer-group me-1"></i>
                        <span id="selectedImportType">Select Import</span>
                    </button>

                    <ul class="dropdown-menu shadow" style="min-width: 200px;">
                        <li>
                            <a class="dropdown-item import-type-option"
                            href="#"
                            data-type="jobs">
                                Jobs Import 
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item import-type-option"
                            href="#"
                            data-type="job_tasks">
                                Tasks Import
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item import-type-option"
                            href="#"
                            data-type="task_sors">
                                SOR Import
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Import Button Group -->
                <!-- import-btn: removed by ajs.apply_ind_roles('Bulk Import') when the role has no
                     import right. Marked on the whole group so the dropdown toggle goes with the
                     upload form inside it, rather than leaving an Import button that opens nothing. -->
                <div id="job_import_action" class="btn-group d-none import-btn">
                    <button type="button"
                            class="btn btn-secondary btn-sm dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                        <i class="las la-file-import me-1"></i>
                        Import
                    </button>

                    <div class="dropdown-menu dropdown-menu-md p-4">

                        <form method="POST"
                            class="bulk-upload-form"
                            data-upload-type=""
                            data-file-type="excel"
                            enctype="multipart/form-data">

                            <div class="mb-3">
                                <label class="form-label fw-semibold">
                                    Upload Excel File
                                </label>

                                <div class="input-group custom-file-button" style="width: 100%;">
                                    <input type="file"
                                        class="form-control" required="true"
                                        name="upload"
                                        id="job_import_file"
                                        required>
                                    <label class="input-group-text"
                                        for="job_import_file">
                                        Browse
                                    </label>
                                </div>

                                <small class="text-muted">
                                    Only .xls / .xlsx supported. Dates must be in dd/mm/yyyy format.
                                </small>
                            </div>

                            <div class="d-flex gap-2">
                                <button type="submit"
                                        class="btn btn-secondary btn-sm w-50">
                                    Upload
                                </button>

                                <a href="#"
                                id="job_import_template"
                                class="btn btn-outline-secondary btn-sm w-50"
                                download>
                                    Template
                                </a>
                            </div>

                        </form>

                    </div>
                </div>

                <!-- Batch export selector (for job-tasks) -->
                <!-- export-btn: removed with the export right. The batch picker goes too - it is
                     populated from bulk_import/batches, which now needs the same right. -->
                <div id="job_import_export" class="d-none ms-3 export-btn">
                    <div class="input-group">
                        <select id="job_batch_select" class="form-control select2" style="width: 250px;">
                            <option value="">Select batch </option>
                        </select>
                        <button id="job_batch_export" class="btn btn-secondary" data-export-type="job-tasks"><i class="las la-file-export"></i>Export</button>
                    </div>
                </div>
            </div>                       
            </div>                       
        </div>
    </div>
</div>
