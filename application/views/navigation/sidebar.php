<?php
$roles = $this->session->userdata('user_roles');
?>

<div class="app-menu navbar-menu sidebar-navigation">
    <!-- LOGO -->
    <div class="navbar-brand-box">
        <!-- Dark Logo-->
        <a href="<?= base_url('dashboard') ?>" class="logo logo-dark">
            <span class="logo-sm">
                <img src="<?= cnd_url(); ?>assets/images/logo-sm.png" alt="" height="22">
            </span>
            <span class="logo-lg">
                <img src="<?= cnd_url(); ?>assets/images/logo-dark.png" alt="" height="17">
            </span>
        </a>
        <!-- Light Logo-->
        <a href="<?= base_url('dashboard') ?>" class="logo logo-light">
            <span class="logo-sm">
                <img src="<?= cnd_url(); ?>assets/images/ajs-logo-white.svg" alt="" height="25">
            </span>
            <span class="logo-lg">
                <img src="<?= cnd_url(); ?>assets/images/ajs-logo-white.svg" alt="" height="40">
            </span>
        </a>
        <div style="color: #ffff;"><?= getenv('APP_NAME');  ?></div>
    </div>


    <div id="scrollbar">
        <div class="container-fluid">

            <div id="two-column-menu">
            </div>
            <ul class="navbar-nav" id="navbar-nav">
                <li class="nav-item">
                    <a data-module="Dashboard" data-action="view" class="nav-link" href="<?= base_url('dashboard') ?>">
                        <i class="las la-tachometer-alt"></i> <span data-key="t-dashboards">Dashboard</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a  data-module="Clients" data-action="view" class="nav-link" href="<?= base_url('clients/list'); ?>">
                        <i class="lab la-delicious"></i> <span data-key="t-apps">Clients</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a  data-module="Contracts" data-action="view" class="nav-link" href="<?= base_url('contract/list'); ?>">
                        <i  class="las la-file-contract"></i> <span data-key="t-apps">Contracts</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="<?= base_url('properties/list'); ?>" data-module="Properties" data-action="view" class="nav-link"><i class="las la-building"></i> <span data-key="t-apps">Properties</span></a>
                </li>
                <li class="nav-item">
                    <a href="<?= base_url('job/list'); ?>" class="nav-link" data-module="Jobs" data-action="view"> <i class="las la-briefcase"></i> <span data-key="t-jobs">Jobs</span> </a>
                </li>                
                <li class="nav-item">
                    <a href="<?= base_url('tasks/list'); ?>" class="nav-link" data-module="Jobs" data-action="view"> <i class="las la-tasks"></i> <span data-key="t-jobs">Task List</span></a>
                </li>
                <li class="nav-item">
                    <a href="<?= base_url('task/batch-printing'); ?>" class="nav-link" data-module="Communication" data-action="view"> <i class="las la-envelope"></i> <span data-key="t-jobs">Communications</span></a>
                </li>
                <li class="nav-item">
                    <a href="<?= base_url('system/sms/replies'); ?>" class="nav-link" data-module="SMS Replies" data-action="view"> <i class="las la-sms"></i> <span data-key="t-sms-replies">SMS Replies</span></a>
                </li>
                <li class="nav-item">
                    <a href="<?= base_url('system/sms/failed'); ?>" class="nav-link" data-module="SMS Failed" data-action="view"> <i class="las la-exclamation-circle"></i> <span data-key="t-sms-failed">Failed SMS</span></a>
                </li>
                <li class="nav-item">
                    <a href="<?= base_url('task/pending-appointment'); ?>" class="nav-link" data-module="Scheduling" data-action="view"> <i class="las la-user-clock"></i> <span data-key="t-jobs">Pending Appointments</span> </a>
                </li>
                <li class="nav-item">
                    <a href="<?= base_url('quotation/list'); ?>" class="nav-link" data-module="Quotations" data-action="view"> <i class="las la-file-invoice-dollar"></i> <span data-key="t-jobs">Quotes</span> </a>
                </li>
                <li class="nav-item">
                    <a href="<?= base_url('job/scheduler'); ?>" class="nav-link" data-module="Scheduling" data-action="view"> <i class="las la-calendar-day"></i> <span data-key="t-jobs">Scheduler</span> </a>
                </li>
                <li class="nav-item">
                    <a href="<?= base_url('job/engineers-diary'); ?>" class="nav-link" data-module="Scheduling" data-action="view"> <i class="las la-calendar-day"></i> <span data-key="t-jobs">Engineers Diary</span> </a>
                </li>
                
                <li class="nav-item">
                    <a class="nav-link menu-link" href="#loc-map" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="loc-map">
                        <i class="las la-map"></i> <span data-key="t-jobs">Location On Map</span>
                    </a>
                    <div class="collapse menu-dropdown" id="loc-map">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <a href="<?= base_url('engineers/location'); ?>" class="nav-link" data-module="Engineers Location" data-action="view"  > Engineers Location</a>
                            </li>
                            <li class="nav-item">
                                <a href="<?= base_url('vans/location'); ?>" class="nav-link" data-module="Vans" data-action="view"> Vans Location </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="#engr-ctp" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="engr-ctp">
                        <i class="ri-money-pound-box-line"></i> <span data-key="t-jobs">Engineer CTP</span>
                    </a>
                    <div class="collapse menu-dropdown" id="engr-ctp">
                        <ul class="nav nav-sm flex-column">                            
                            <li class="nav-item">
                                <a href="<?= base_url('worksheet/awaiting-approval-list'); ?>" data-module="Worksheets" data-action="view"  class="nav-link"> <span data-key="t-file-manager">Worksheets</span></a>
                            </li>
                            <li class="nav-item">
                                <a href="<?= base_url('accounts/list'); ?>" data-module="Accounts" data-action="view"  class="nav-link"> <span data-key="t-file-manager">Accounts</span></a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="#bulk-processing" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="bulk-processing">
                        <i class="las la-layer-group"></i> <span data-key="t-jobs">Bulk Processing</span>
                    </a>
                    <div class="collapse menu-dropdown" id="bulk-processing">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <a href="<?= base_url('job/bulk-assign'); ?>" data-module="Bulk Process Jobs" data-action="view"  class="nav-link"> <span data-key="t-file-manager">Job Processing</span></a>
                            </li>
                            <li class="nav-item">
                                <a href="<?= base_url('task/scheduler/bulk-assign'); ?>" data-module="Bulk Process Tasks" data-action="view"  class="nav-link"> <span data-key="t-file-manager">Task Processing</span></a>
                            </li>
                            <li class="nav-item">
                                <a href="<?= base_url('bulk-import/jobs'); ?>" class="nav-link" data-module="Bulk Import" data-action="view"> <span data-key="t-jobs">Bulk Imports</span> </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a  href="<?= base_url('task/certificates/list'); ?>" data-module="Certificates" data-action="view" class="nav-link" >
                        <i  class="las la-certificate"></i> <span data-key="t-apps">Certificate Review</span>
                    </a>
                </li>
                <li class="nav-item">
                    <!-- One page, two independently-gated tabs (Havering Interface / Other
                         Interface), so the link shows for either grant. data-module-any is
                         used instead of data-module precisely so the single-module pass does
                         not hide it from a role that only has Other Interface. -->
                    <a href="<?= base_url('havering/dashboard'); ?>" data-module-any="Havering Integration|Other Interface" data-action="view" class="nav-link" >
                        <i class="las la-exchange-alt"></i> <span data-key="t-apps">Interface Dashboard</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="#stock-management" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="stock-management">
                        <i class="las la-warehouse"></i> <span data-key="t-jobs">Stock Management</span>
                    </a>
                    <div class="collapse menu-dropdown" id="stock-management">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <a data-module="Suppliers" data-action="view" class="nav-link" href="<?= base_url('supplier/list'); ?>" >
                                    Suppliers
                                </a>
                            </li>
                            <li class="nav-item">
                                <a data-module="Stocks" data-action="view" class="nav-link" href="<?= base_url('stock/list'); ?>" >
                                    Stocks
                                </a>
                            </li>
                            <li class="nav-item">
                                <a data-module="Kits" data-action="view"  class="nav-link" href="<?= base_url('kit/list'); ?>" >Manage Kits</a>
                            </li>
                            <li class="nav-item">
                                <a data-module="POs" data-action="view"  class="nav-link" href="<?= base_url('purchase-order/list'); ?>" >
                                    Purchase Orders
                                </a>
                            </li>
                            <li class="nav-item">
                                <a data-module="Stocks" data-action="view"  class="nav-link" href="<?= base_url('stock/transfer'); ?>" >Stock Transfers</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a data-module="Reports" data-action="view" class="nav-link menu-link" href="#sidebarReports" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarReports">
                        <i class="las la-chart-line"></i> <span data-key="t-apps">Reports</span>
                    </a>
                    <div class="collapse menu-dropdown" id="sidebarReports">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <a data-module="Reports" data-action="view" class="nav-link" href="<?= base_url('reports/list'); ?>">Custom Reports</a>
                            </li>
                            <li class="nav-item">
                                <a data-module="Reports" data-action="view" class="nav-link" href="<?= base_url('reports/r01'); ?>">R01 — Supplier Summary</a>
                            </li>
                            <li class="nav-item">
                                <a data-module="Reports" data-action="view" class="nav-link" href="<?= base_url('reports/r02'); ?>">R02 — Work in Progress</a>
                            </li>
                            <li class="nav-item">
                                <a data-module="Reports" data-action="view" class="nav-link" href="<?= base_url('reports/r04'); ?>">R04 — Job Satisfaction Survey</a>
                            </li>
                            <li class="nav-item">
                                <a data-module="Reports" data-action="view" class="nav-link" href="<?= base_url('reports/r08'); ?>">R08 — Property Condition &amp; H&amp;S</a>
                            </li>
                            <li class="nav-item">
                                <a data-module="Reports" data-action="view" class="nav-link" href="<?= base_url('reports/completed-certificate-report'); ?>">Certificate Report</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="#sidebarInvoices" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarInvoices">
                        <i class="las la-money-check-alt"></i> <span data-key="t-jobs">Invoice</span>
                    </a>
                    <div class="collapse menu-dropdown" id="sidebarInvoices">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <a data-module="Invoices" data-action="view" class="nav-link" href="<?= base_url('invoices/list'); ?>" >
                                   Invoice List </a>
                            </li>
                            <?php /* Create Invoice Batch hidden — batches are now built from the Job Process flow.
                            <li class="nav-item">
                                <a data-module="Invoices" data-action="view"  class="nav-link" href="<?= base_url('invoice/readyto-invoices-list'); ?>" >Create Invoice Batch</a>
                            </li>
                            */ ?>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a data-module="Notifications" data-action="view"  class="nav-link" href="<?= base_url('notification/list'); ?>" >
                        <i class="las la-bell"></i> <span data-key="t-apps">Notifications</span>
                    </a>
                </li>
                <li class="nav-item nav-item-top">
                    <a class="nav-link menu-link" href="#sidebarCerti" data-bs-toggle="collapse" role="button" aria-expanded="true" aria-controls="sidebarCerti">
                        <i class="las la-pencil-ruler"></i> <span data-key="t-certi">System Admin</span>
                    </a>
                    <div class="menu-dropdown collapse" id="sidebarCerti">

                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <a data-module="Certificate Templates" data-action="view"  href="<?= base_url('certificates/list'); ?>" class="nav-link" >
                                    <span data-key="t-certi">Certificates</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link menu-link" href="#sidebarCerti1" data-bs-toggle="collapse" role="button" aria-expanded="true" aria-controls="sidebarCerti1">
                                    <span data-key="t-certi">Certificate Templates</span>
                                </a>
                                <div class="menu-dropdown collapse" id="sidebarCerti1" >
                                    <ul class="nav nav-sm flex-column">
                                        <li class="nav-item">
                                            <a href="<?= base_url('templates/list'); ?>" class="nav-link" data-module="Certificate Templates" data-action="view"> <span data-key="t-certi-create">List Templates</span></a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('templates/create'); ?>" class="nav-link" data-module="Certificate Templates" data-action="add"> <span data-key="t-certi-create">Create Template</span></a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('template/tables/list'); ?>" class="nav-link" data-module="Certificate Templates" data-action="add"> <span data-key="t-certi-create">Table Templates</span></a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('templates/headers'); ?>" class="nav-link" data-module="Certificate Templates" data-action="add"> <span data-key="t-certi-create">Template Headers</span></a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('templates/footers'); ?>" class="nav-link" data-module="Certificate Templates" data-action="add"> <span data-key="t-certi-create">Template Footers</span></a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link menu-link" href="#sidebarLocations" data-bs-toggle="collapse" role="button" aria-expanded="true" aria-controls="sidebarLocations">
                                    <span data-key="t-certi">Locations</span>
                                </a>
                                <div class="menu-dropdown collapse" id="sidebarLocations" >
                                    <ul class="nav nav-sm flex-column">
                                        <li class="nav-item">
                                            <a href="<?= base_url('van/list'); ?>" class="nav-link" data-module="Vans" data-action="view"  data-key="t-certi-list"> Vans </a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('warehouse/list'); ?>" class="nav-link" data-module="Warehouses" data-action="view"  data-key="t-certi-list"> Warehouses </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link menu-link" href="#sidebarCerti2" data-bs-toggle="collapse" role="button" aria-expanded="true" aria-controls="sidebarCerti2">
                                    <span data-key="t-certi">Setup</span>
                                </a>
                                <div class="menu-dropdown collapse" id="sidebarCerti2" >
                                    <ul class="nav nav-sm flex-column">
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/role/list') ?>" data-module="Roles" data-action="view"  class="nav-link" data-key="t-alerts">Roles</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/user/list') ?>" data-module="Users" data-action="view"  class="nav-link" data-key="t-alerts">Users</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('contractor/list') ?>" data-module="Contractors" data-action="view"  class="nav-link" data-key="t-alerts">Sub Contractors</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/department/list') ?>" data-module="Masters" data-action="view"  class="nav-link" data-key="t-alerts">Departments</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/workstream/list') ?>" data-module="Masters" data-action="view" class="nav-link" data-key="t-alerts">Workstreams</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/service/list') ?>" data-module="Masters" data-action="view" class="nav-link" data-key="t-alerts">Job Types</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/task/list') ?>" data-module="Masters" data-action="view" class="nav-link" data-key="t-alerts">Tasks</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/skills/list') ?>" data-module="Masters" data-action="view" class="nav-link" data-key="t-alerts">Skills</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/task-status/list') ?>" data-module="Masters" data-action="view" class="nav-link" data-key="t-alerts">Task Status</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/job-queue/list'); ?>" data-module="Masters" data-action="view" class="nav-link" data-key="t-badges">Queues</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/sor/list') ?>" data-module="SORs" data-action="view" class="nav-link" data-key="t-alerts">SORs</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/master/list') ?>" data-module="Masters" data-action="view" class="nav-link" data-key="t-alerts">Masters</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/service-times/list') ?>" data-module="Masters" data-action="view" class="nav-link" data-key="t-alerts">Service Time</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/assets-type-field/list') ?>" data-module="Masters" data-action="view" class="nav-link" data-key="t-alerts">Assets Type Fields</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/alert/list') ?>" data-module="Masters" data-action="view" class="nav-link" data-key="t-alerts">Alerts</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/bank-holidays/list') ?>" data-module="Masters" data-action="view" class="nav-link" data-key="t-alerts">Holidays</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/appointment-temp/list') ?>" data-module="Masters" data-action="view" class="nav-link" data-key="t-alerts">AJS/Genenric Template</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/tag/list') ?>" data-module="Tags" data-action="view" class="nav-link" data-key="t-alerts">Tags</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/phrasebook/list') ?>" data-module="Phrasebooks" data-action="view" class="nav-link" data-key="t-alerts">Phrasebooks</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/logs') ?>" data-module="System Logs" data-action="view" class="nav-link" data-key="t-badges">System Logs</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/setting/list') ?>" data-module="Settings" data-action="view" class="nav-link" data-key="t-badges">Settings</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/maintenance/list') ?>" data-module="Maintenance" data-action="view" class="nav-link" data-key="t-badges">Maintenance</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="<?= base_url('system/scheduled-jobs/list') ?>" data-module="Settings" data-action="view" class="nav-link" data-key="t-badges">Scheduled Jobs</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <!-- Sidebar -->
    </div>
    <div class="sidebar-background"></div>
</div>


<style>

:is([data-layout="vertical"], [data-layout="semibox"])[data-sidebar-size="sm"]
.sidebar-navigation.navbar-menu .navbar-nav .nav-item-top .menu-dropdown{
    bottom:0;
    top:inherit !important;
}

:is([data-layout="vertical"], [data-layout="semibox"])[data-sidebar-size="sm"]
.sidebar-navigation.navbar-menu .navbar-nav .nav-item-top > .menu-dropdown{
    bottom:45px;
}
:is([data-layout="vertical"], [data-layout="semibox"])[data-sidebar-size="sm"]
.sidebar-navigation.navbar-menu .navbar-nav .nav-item-top.nav-item:hover > a.menu-link:after{
    -webkit-transform: rotate(270deg);
    transform: rotate(270deg);
}
</style>