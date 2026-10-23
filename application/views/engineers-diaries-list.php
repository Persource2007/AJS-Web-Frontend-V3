<?php
require_once APPPATH . 'views/commons/header.php';
require_once APPPATH . 'views/commons/datatables-inc.php';
?>
<div class="main-content">
    <div class="page-content">
        <div class="container-fluid">
            <div class="same-page-height dataTables-height">
                <div class="card" id="tasksList">

                    <!-- Filters and Export -->
                    <div class="card-header border border-dashed border-top-0 border-end-0 border-start-0 pt-3">
                        <div class="d-flex justify-content-between">
                            <div>
                                <form id="form_filters" action="" method="GET" class="d-flex flex-wrap align-items-center gap-2">
                                    
                                    <!-- Search Input -->
                                    <div class="search-box">
                                        <input type="text" id="search_term" name="search_term" class="form-control search" placeholder="Search Name">
                                        <i class="mdi mdi-magnify search-widget-icon"></i>
                                    </div>

                                    <!-- Client Type Dropdown -->
                                    <div style="width: 150px;">
                                        <select class="form-control search" name="client_type_filter" id="">
                                            <option value="">Select Skills</option> 
                                             <option value="">Electrical</option> 
                                            <option value="">Fire</option> 
                                        </select>
                                    </div>

                                    <div style="width: 150px;">
                                        <select class="form-control search" name="client_type_filter" id="">
                                            <option value="">Select Month</option> 
                                             <option value="">July 2025</option> 
                                            <option value="">May 2025</option> 
                                            <option value="">April 2025</option>
                                            <option value="">March 2025</option>
                                        </select>
                                    </div>

                                    <!-- Search Button -->
                                    <button class="btn btn-primary" id="search_grid" type="submit" style="padding: 1px 12px;">
                                        <i class="mdi mdi-magnify fs-18"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <!-- Task Table -->
                    <div class="card-body pt-2">
                        <div class="table-responsive all-tbl-same-width">
                            <h5>July 2025</h5>
                            <table id="ajax-datatables" class="display table dt-responsive align-middle table-nowrap table-hover mb-0">
                                <thead class="table-light text-muted">
                                    <tr>
                                        <th class="dotIcon"></th>
                                        <th>Name</th>
                                        <th>Tasks Assigned</th>
                                        <th>Hours Allocated</th>
                                        <th>Completed</th>
                                        <th>Pending</th>
                                        <th>Overdue (Prv. Mth.)</th>
                                        <th>In Progress</th>
                                        <th>Message</th>
                                        <th>Completion Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                    // You can dynamically generate rows using a loop and actual data
                                    $rows = [
                                        ['Syadav', 'July 2025', 1, '01:00:00', 1, 0, 5, 100],
                                        ['Liam', 'June 2025', 4, '02:00:00', 3, 1, 4, 75],
                                        ['Ndave', 'May 2025', 6, '05:00:00', 3, 3, 3, 50],
                                        ['Ryan', 'April 2025', 2, '06:00:00', 0, 2, 2, 0],
                                        ['Dakshesh', 'March 2025', 8, '04:00:00', 4, 4, 1, 50],
                                    ];

                                    foreach ($rows as $row) {
                                        [$name, $month, $assigned, $hours, $completed, $pending, $overdue, $percent] = $row;
                                        echo "<tr>
                                            <td class='dotIcon'><i class='mdi mdi-circle fs-11 align-middle me-1 emergency-task-icon'></i></td>
                                            <td>{$name}</td>
                                            <td>{$assigned}</td>
                                            <td>{$hours}</td>
                                            <td>{$completed}</td>
                                            <td>{$pending}</td>                                            
                                            <td>{$overdue}</td>
                                            <td>NH000222 <span class='ms-2 badge border text-capitalize border-secondary primaryColor'>Started</span></td>
                                            <td><p class='mb-0'><a href='javascript:;' data-id='1' data-type='13' class='send-notification add-btn primaryColor'><i class='ri-message-line fs-18'></i></a></p></td>
                                            <td>
                                                <div class='progress' role='progressbar' aria-valuenow='{$percent}' aria-valuemin='0' aria-valuemax='100'>
                                                    <div class='progress-bar' style='width: {$percent}%;'></div>
                                                </div>
                                            </td>
                                        </tr>";
                                    }
                                    ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- End Task Table -->

                </div>
            </div>
        </div>
    </div>
</div>

<?php require_once APPPATH . 'views/commons/footer.php'; ?>

<!-- Progress Bar Styling -->
<style>
    .progress, .progress-stacked {
        --vz-progress-bg: #c1c1c1;
    }
    .progress-bar {
        background-color: #009925;
    }
    .primaryColor{
        color: var(--primary-color);
    }
    .dotIcon {
        max-width: 15px;
        padding: 0 0 0 8px !important;
    }
</style>
