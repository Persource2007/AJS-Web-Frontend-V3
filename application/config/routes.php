<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/*
  | -------------------------------------------------------------------------
  | URI ROUTING
  | -------------------------------------------------------------------------
  | This file lets you re-map URI requests to specific controller functions.
  |
  | Typically there is a one-to-one relationship between a URL string
  | and its corresponding controller class/method. The segments in a
  | URL normally follow this pattern:
  |
  |	example.com/class/method/id/
  |
  | In some instances, however, you may want to remap this relationship
  | so that a different class/function is called than the one
  | corresponding to the URL.
  |
  | Please see the user guide for complete details:
  |
  |	https://codeigniter.com/userguide3/general/routing.html
  |
  | -------------------------------------------------------------------------
  | RESERVED ROUTES
  | -------------------------------------------------------------------------
  |
  | There are three reserved routes:
  |
  |	$route['default_controller'] = 'welcome';
  |
  | This route indicates which controller class should be loaded if the
  | URI contains no data. In the above example, the "welcome" class
  | would be loaded.
  |
  |	$route['404_override'] = 'errors/page_missing';
  |
  | This route will tell the Router which controller/method to use if those
  | provided in the URL cannot be matched to a valid route.
  |
  |	$route['translate_uri_dashes'] = FALSE;
  |
  | This is not exactly a route, but allows you to automatically route
  | controller and method names that contain dashes. '-' isn't a valid
  | class or method name character, so it requires translation.
  | When you set this option to TRUE, it will replace ALL dashes in the
  | controller and method URI segments.
  |
  | Examples:	my-controller/index	-> my_controller/index
  |		my-controller/my-method	-> my_controller/my_method
 */

//Render view method for main application
$route['render_view']      = 'viewrenderer';
$route['render_multiview'] = 'multiviewrenderer';

//AJAX calls
$route['set_user_session']     = 'ajax/set_user_session';
$route['destroy_user_session'] = 'ajax/destroy_user_session';

//API Rules Start//
//Login Authentication + Refresh JWT Token + Logout
$route['auth/logout']['get']                     = 'ajax/logout';
$route['auth/set-password/(:any)']               = 'app/auth/set_password/$1';
$route['auth/set-forgot-password/(:any)/(:any)'] = 'app/auth/set_forgot_password/$1/$2';
$route['auth/forgot-password']                   = 'app/auth/forgot_password';
$route['auth/verify-2fa-otp/(:any)']             = 'app/auth/verify_2fa_otp/$1';

//view pages
$route['maintenance'] = 'app/maintenance';

//edit profile
$route['profile/view'] = 'app/profile/profiles/view_profile';
$route['profile/edit'] = 'app/profile/profiles/edit_profile';

//Clients
$route['clients/list']                       = 'app/clients/clients/list';
$route['clients/search-list']                = 'app/clients/clients/search_list';
$route['clients/create']                     = 'app/clients/clients/create';
$route['clients/create_pop']                 = 'app/clients/clients/create_pop';
$route['clients/edit/(:any)']                = 'app/clients/clients/edit/$1';
$route['clients/details/(:any)']             = 'app/clients/clients/details/$1';
$route['clients/(:any)/selling-and-billing'] = 'app/clients/clients/selling_and_billing/$1';
$route['clients/(:any)/sors']                = 'app/clients/clients/sors/$1';
$route['clients/(:any)/appointments']        = 'app/clients/clients/appointments/$1';
$route['clients/(:any)/uplifts']             = 'app/clients/clients/uplifts/$1';
$route['clients/(:any)/interface']           = 'app/clients/clients/interface/$1';
$route['clients/(:any)/interface-create']    = 'app/clients/clients/interface_create/$1';
$route['clients/(:any)/interface-edit/(:any)']    = 'app/clients/clients/interface_edit/$1/$2';

$route['clients/(:any)/schedule-process']     = 'app/clients/schedule/list/$1';
$route['clients/(:any)/schedule-create']      = 'app/clients/schedule/create/$1';
$route['clients/(:any)/schedule-edit/(:any)'] = 'app/clients/schedule/edit/$1/$2';

//Client Properties
$route['clients/(:any)/properties']                = 'app/clients/property/list/$1';
$route['clients/(:any)/properties/details/(:any)'] = 'app/clients/property/details/$2/$1';

//Client Settings & Code Mapping
$route['clients/(:any)/code-mapping'] = 'app/clients/settings/code_mapping/$1';
$route['clients/(:any)/settings']     = 'app/clients/settings/settings/$1';

//All Properties
$route['properties/list']           = 'app/clients/property/list';
$route['properties/search-list']    = 'app/clients/property/search_list';
$route['properties/create']         = 'app/clients/property/create';
$route['properties/edit/(:any)']    = 'app/clients/property/edit/$1';
$route['properties/edit-contact']   = 'app/clients/property/edit_contact_detail';
$route['properties/details/(:any)'] = 'app/clients/property/details/$1';

//Property Assets
$route['clients/(:any)/properties/(:any)/assets']                = 'app/clients/asset/list/$1/$2';
$route['clients/(:any)/properties/(:any)/assets/details/(:any)'] = 'app/clients/asset/details/$3/$1/$2';
$route['properties/(:any)/assets/details/(:any)'] = 'app/clients/asset/details/$2/null/$1';

$route['properties/(:any)/assets'] = 'app/clients/asset/list/$2/$1';

$route['clients/(:any)/properties/(:any)/job-history'] = 'app/clients/property/job_history/$1/$2';
$route['properties/(:any)/job-history']                = 'app/clients/property/job_history/$2/$1';

$route['clients/(:any)/properties/(:any)/upcoming-jobs'] = 'app/clients/property/upcoming_jobs/$1/$2';
$route['properties/(:any)/upcoming-jobs']                = 'app/clients/property/upcoming_jobs/$2/$1';

$route['clients/(:any)/properties/(:any)/certificates'] = 'app/clients/property/certificates/$1/$2';
$route['properties/(:any)/certificates']                = 'app/clients/property/certificates/$2/$1';

$route['clients/(:any)/properties/(:any)/master-plan'] = 'app/clients/property/master_plan/$1/$2';
$route['properties/(:any)/master-plan']                = 'app/clients/property/master_plan/$2/$1';

$route['clients/(:any)/properties/(:any)/master-plan-list'] = 'app/clients/property/master_plan_list/$1/$2';
$route['properties/(:any)/master-plan-list']                = 'app/clients/property/master_plan_list/$2/$1';

//Property Assets
$route['assets/search-list']    = 'app/clients/asset/search_list';
$route['assets/create']         = 'app/clients/asset/create';
$route['assets/edit/(:any)']    = 'app/clients/asset/edit/$1';
$route['assets/details/(:any)'] = 'app/clients/asset/details/$1';

//Contractors
$route['contractor/list']           = 'app/contractors/contractor/list';
$route['contractor/create']         = 'app/contractors/contractor/create';
$route['contractor/edit/(:any)']    = 'app/contractors/contractor/edit/$1';
$route['contractor/details/(:any)'] = 'app/contractors/contractor/details/$1';

//Suppliers
$route['supplier/list']                   = 'app/suppliers/supplier/list';
$route['supplier/create']                 = 'app/suppliers/supplier/create';
$route['supplier/edit/(:any)']            = 'app/suppliers/supplier/edit/$1';
$route['supplier/details/(:any)']         = 'app/suppliers/supplier/details/$1';
$route['supplier/purchase-orders/(:any)'] = 'app/suppliers/supplier/purchase_orders/$1';

$route['supplier/part-and-equipments/(:any)'] = 'app/suppliers/PartAndEquipment/list/$1';
$route['part-and-equipments/create/(:any)']   = 'app/suppliers/PartAndEquipment/create/$1';
$route['part-and-equipments/edit/(:any)']     = 'app/suppliers/PartAndEquipment/edit/$1';

//Stocks
$route['stock/list']             = 'app/stocks/stock/list';
$route['stock/create']           = 'app/stocks/stock/create';
$route['stock/edit/(:any)']      = 'app/stocks/stock/edit/$1';
$route['stock/details/(:any)']   = 'app/stocks/stock/details/$1';
$route['stock/suppliers/(:any)'] = 'app/stocks/stock/suppliers/$1';

//Stock Transfer
$route['stock/transfer'] = 'app/stocks/stock/transfer';

//Purchase order
$route['purchase-order/list']                 = 'app/stocks/purchase_order/list';
$route['purchase-order/create']               = 'app/stocks/purchase_order/create';
$route['purchase-order/edit/(:any)']          = 'app/stocks/purchase_order/edit/$1';
$route['purchase-order/details/(:any)']       = 'app/stocks/purchase_order/details/$1';
$route['purchase-order/print/(:any)']         = 'app/stocks/purchase_order/print/$1';
$route['purchase-order/create-items(/:any)?'] = 'app/stocks/purchase_order/create_items/$1';
$route['purchase-order/stock-inward/(:any)']  = 'app/stocks/purchase_order/stock_inward/$1';

//Kits
$route['kit/list']                 = 'app/kits/kit/list';
$route['kit/create']               = 'app/kits/kit/create';
$route['kit/edit/(:any)']          = 'app/kits/kit/edit/$1';
$route['kit/details/(:any)']       = 'app/kits/kit/details/$1';
$route['kit/create-items(/:any)?'] = 'app/kits/kit/create_items/$1';

//Contracts
// Contract Notification Settings API - Updated to match backend RestController routes
// RestController automatically maps GET to notification_settings_get() and POST to notification_settings_post()
$route['contract/NotificationSettings/notification_settings/(:any)']['get'] = 'contract/NotificationSettings/notification_settings/$1';
$route['contract/NotificationSettings/notification_settings/(:any)']['post'] = 'contract/NotificationSettings/notification_settings/$1';
$route['contract/NotificationSettings/available_events']['get'] = 'contract/NotificationSettings/available_events';

// Contract Time Slots API
// New REST-style: GET/POST /contract/{contract_id}/time_slots
$route['contract/(:any)/time_slots']['get']  = 'contract/TimeSlots/time_slots/$1';
$route['contract/(:any)/time_slots']['post'] = 'contract/TimeSlots/time_slots/$1';
// Legacy (kept for backward compatibility)
$route['contract/TimeSlots/time_slots/(:any)']['get']  = 'contract/TimeSlots/time_slots/$1';
$route['contract/TimeSlots/time_slots/(:any)']['post'] = 'contract/TimeSlots/time_slots/$1';

$route['contract/list']                       = 'app/contracts/contract/list';
$route['contract/search-list']                = 'app/contracts/contract/search_list';
$route['contract/create']                     = 'app/contracts/contract/create';
$route['contract/edit/(:any)']                = 'app/contracts/contract/edit/$1';
$route['contract/dashboard/(:any)']           = 'app/contracts/contract/dashboard/$1';
$route['contract/details/(:any)']             = 'app/contracts/contract/details/$1';
$route['contract/personnel/(:any)']           = 'app/contracts/contract/personnel/$1';
$route['contract/sors/(:any)']                = 'app/contracts/contract/sors/$1';
$route['contract/commissions/(:any)']          = 'app/contracts/contract/commissions/$1';
$route['contract/selling-and-billing/(:any)'] = 'app/contracts/contract/selling_and_billing/$1';
//$route['contract/uplifts/(:any)']             = 'app/contracts/contract/uplifts/$1';

$route['contract/reports/(:any)']             = 'app/contracts/contract/reports/$1';
$route['contract/settings/(:any)']            = 'app/contracts/contract/settings/$1';
$route['contract/sor_variations_list/(:any)'] = 'app/contracts/contract/sor_variations_list/$1';
$route['contract/sor_variations_create/(:any)'] = 'app/contracts/contract/sor_variations_create/$1';
// SOR Variations edit route (loads create view for edit in offcanvas)
$route['contract/sor_variations_edit/(:any)/(:any)'] = 'app/contracts/contract/sor_variations_edit/$1/$2';

// contract routes for clients
$route['clients/(:any)/contract']                            = 'app/contracts/contract/list/$1';
$route['clients/(:any)/contract/create']                     = 'app/contracts/contract/create/$1';
$route['clients/(:any)/contract/edit/(:any)']                = 'app/contracts/contract/edit/$2/$1';
$route['clients/(:any)/contract/dashboard/(:any)']           = 'app/contracts/contract/dashboard/$2/$1';
$route['clients/(:any)/contract/details/(:any)']             = 'app/contracts/contract/details/$2/$1';
$route['clients/(:any)/contract/personnel/(:any)']           = 'app/contracts/contract/personnel/$2/$1';
$route['clients/(:any)/contract/sors/(:any)']                = 'app/contracts/contract/sors/$2/$1';
$route['clients/(:any)/contract/selling-and-billing/(:any)'] = 'app/contracts/contract/selling_and_billing/$2/$1';
//$route['clients/(:any)/contract/uplifts/(:any)']             = 'app/contracts/contract/uplifts/$2/$1';
$route['clients/(:any)/contract/reports/(:any)']             = 'app/contracts/contract/reports/$2/$1';
$route['clients/(:any)/contract/settings/(:any)']            = 'app/contracts/contract/settings/$2/$1';
$route['clients/(:any)/contract/services/(:any)']            = 'app/contracts/contractservices/services/$2/$1';
$route['clients/(:any)/contract/master-plan/(:any)']         = 'app/contracts/masterplan/masterplan/$2/$1';
$route['clients/(:any)/contract/master-plan-list/(:any)']    = 'app/contracts/masterplan/masterplan_list/$2/$1';
$route['clients/(:any)/contract/sor_variations_list/(:any)'] = 'app/contracts/contract/sor_variations_list/$2/$1';
$route['clients/(:any)/contract/sor_variations_create/(:any)'] = 'app/contracts/contract/sor_variations_create/$2/$1';
// Client-scoped SOR Variations edit route
$route['clients/(:any)/contract/sor_variations_edit/(:any)/(:any)'] = 'app/contracts/contract/sor_variations_edit/$2/$3/$1';

//Contract Services
$route['contract/services/(:any)']                        = 'app/contracts/contractservices/services/$1';
$route['contract/master-plan/(:any)']                     = 'app/contracts/masterplan/masterplan/$1';
$route['contract/master-plan-list/(:any)']                = 'app/contracts/masterplan/masterplan_list/$1';
$route['contract/master-plan-view/(:any)']                = 'app/contracts/masterplan/masterplan_view/$1';
$route['clients/(:any)/contract/master-plan-view/(:any)'] = 'app/contracts/masterplan/masterplan_view/$2/$1';

//Notifications
$route['system/sms/replies'] = 'app/system/sms_replies/index';
$route['system/sms/reply/(:any)'] = 'app/system/sms_replies/reply/$1';
$route['system/sms/failed'] = 'app/system/sms_failed/index';
$route['notification/list']           = 'app/notifications/notification/list';
$route['notification/create']         = 'app/notifications/notification/create';
$route['notification/edit/(:any)']    = 'app/notifications/notification/edit/$1';
$route['notification/details/(:any)'] = 'app/notifications/notification/details/$1';

$route['engineers/location'] = 'app/engineers/engineer/location';
$route['vans/location'] = 'app/locations/van/location';

//System Setup Routes
$route['system'] = 'app/system/system';

//Roles
$route['system/role/list']           = 'app/system/role/list';
$route['system/role/create']         = 'app/system/role/create';
$route['system/role/edit/(:any)']    = 'app/system/role/edit/$1';
$route['system/role/details/(:any)'] = 'app/system/role/details/$1';

//Settings
$route['system/setting/list']        = 'app/system/setting/list';
$route['system/setting/edit/(:any)'] = 'app/system/setting/edit/$1';

//Settings
$route['system/scheduled-jobs/list']        = 'app/system/cron/list';
$route['system/scheduled-jobs/edit/(:any)'] = 'app/system/cron/edit/$1';

$route['system/appointment-temp/list']        = 'app/system/appointment_temp/list';
$route['system/appointment-temp/create']      = 'app/system/appointment_temp/create';
$route['system/appointment-temp/edit/(:any)'] = 'app/system/appointment_temp/edit/$1';

//Users
$route['system/user/list']           = 'app/system/user/list';
$route['system/user/create']         = 'app/system/user/create';
$route['system/user/edit/(:any)']    = 'app/system/user/edit/$1';
$route['system/user/details/(:any)'] = 'app/system/user/details/$1';

//SORS
$route['system/sor/list']           = 'app/system/sor/list';
$route['system/sor/search-list']    = 'app/system/sor/search_list';
$route['system/sor/create']         = 'app/system/sor/create';
$route['system/sor/edit/(:any)']    = 'app/system/sor/edit/$1';
$route['system/sor/details/(:any)'] = 'app/system/sor/details/$1';

//Departments
$route['system/department/list']           = 'app/system/departments/list';
$route['system/department/create']         = 'app/system/departments/create';
$route['system/department/edit/(:any)']    = 'app/system/departments/edit/$1';
$route['system/department/details/(:any)'] = 'app/system/departments/details/$1';

//Workstreams
$route['system/workstream/list']           = 'app/system/workstreams/list';
$route['system/workstream/create']         = 'app/system/workstreams/create';
$route['system/workstream/edit/(:any)']    = 'app/system/workstreams/edit/$1';
$route['system/workstream/details/(:any)'] = 'app/system/workstreams/details/$1';

//Services/Job Types
$route['system/service/list']           = 'app/system/services/list';
$route['system/service/create']         = 'app/system/services/create';
$route['system/service/edit/(:any)']    = 'app/system/services/edit/$1';
$route['system/service/details/(:any)'] = 'app/system/services/details/$1';

//Tasks
$route['system/task/list']           = 'app/system/tasks/list';
$route['system/task/create']         = 'app/system/tasks/create';
$route['system/task/edit/(:any)']    = 'app/system/tasks/edit/$1';
$route['system/task/details/(:any)'] = 'app/system/tasks/details/$1';

//Job Queue Master
$route['system/job-queue/list']           = 'app/system/job_queues/list';
$route['system/job-queue/create']         = 'app/system/job_queues/create';
$route['system/job-queue/edit/(:any)']    = 'app/system/job_queues/edit/$1';
$route['system/job-queue/details/(:any)'] = 'app/system/job_queues/details/$1';

//Task Statuses
$route['system/task-status/list']           = 'app/system/taskstatuses/list';
$route['system/task-status/create']         = 'app/system/taskstatuses/create';
$route['system/task-status/edit/(:any)']    = 'app/system/taskstatuses/edit/$1';
$route['system/task-status/details/(:any)'] = 'app/system/taskstatuses/details/$1';

//Masters
$route['system/master/list']           = 'app/system/masters/list';
$route['system/master/create']         = 'app/system/masters/create';
$route['system/master/edit/(:any)']    = 'app/system/masters/edit/$1';
$route['system/master/details/(:any)'] = 'app/system/masters/details/$1';

$route['system/master/(:any)/list']          = 'app/system/master_records/list/$1';
$route['system/master/(:any)/create']        = 'app/system/master_records/create/$1';
$route['system/master-record/edit/(:any)']   = 'app/system/master_records/edit/$1';
$route['system/master-record/create/(:any)'] = 'app/system/master_records/create_pop/$1';

// Tag
$route['system/tag/list']        = 'app/system/tag/list';
$route['system/tag/create']      = 'app/system/tag/create';
$route['system/tag/edit/(:any)'] = 'app/system/tag/edit/$1';

$route['system/phrasebook/list']        = 'app/system/phrasebook/list';
$route['system/phrasebook/create']      = 'app/system/phrasebook/create';
$route['system/phrasebook/edit/(:any)'] = 'app/system/phrasebook/edit/$1';
$route['system/phrasebook/search-list'] = 'app/system/phrasebook/search_list';

// asset type fields
$route['system/assets-type-field/list']        = 'app/system/assets_type_field/list';
$route['system/assets-type-field/create']      = 'app/system/assets_type_field/create';
$route['system/assets-type-field/edit/(:any)'] = 'app/system/assets_type_field/edit/$1';

$route['system/alert/list']           = 'app/system/alert/list';
$route['system/alert/create']         = 'app/system/alert/create';
$route['system/alert/edit/(:any)']    = 'app/system/alert/edit/$1';

//Holidays
$route['system/bank-holidays/list']        = 'app/system/bankholidays/list';
$route['system/bank-holidays/create']      = 'app/system/bankholidays/create';
$route['system/bank-holidays/edit/(:any)'] = 'app/system/bankholidays/edit/$1';

//Skills
$route['system/skills/list']        = 'app/system/skills/list';
$route['system/skills/create']      = 'app/system/skills/create';
$route['system/skills/edit/(:any)'] = 'app/system/skills/edit/$1';

//Service Times
$route['system/service-times/list']        = 'app/system/servicetimes/list';
$route['system/service-times/create']      = 'app/system/servicetimes/create';
$route['system/service-times/edit/(:any)'] = 'app/system/servicetimes/edit/$1';

$route['system/maintenance/list']                 = 'app/system/maintenance/list';
$route['system/maintenance/update-property-uprn'] = 'app/system/maintenance/update_property_uprn';

$route['system/logs']                                                = 'app/system/logs/list';
$route['system/logs/user-activity-logs']                             = 'app/system/logs/user_activity_logs';
$route['system/logs/mail-logs']                                      = 'app/system/logs/mail_logs';
$route['system/logs/record-update-logs']                             = 'app/system/logs/record_update_logs';
$route['system/logs/db-error-logs']                                  = 'app/system/logs/db_error_logs';
$route['system/logs/ppm-logs']                                       = 'app/system/logs/ppm_logs';
$route['system/logs/user-activity-logs/view/(:any)/(:any)/(:any)']   = 'app/system/logs/user_activity_log_details/$1/$2/$3';
$route['system/logs/db-update-logs/view/(:any)/(:any)/(:any)']       = 'app/system/logs/db_update_log_details/$1/$2/$3';
$route['system/logs/bulk-assignment-logs']                           = 'app/system/logs/bulk_assignment_logs';
$route['system/logs/bulk-assignment-logs/view/(:any)/(:any)/(:any)'] = 'app/system/logs/bulk_assignment_log_details/$1/$2/$3';
$route['system/logs/app-error-logs']                                 = 'app/system/logs/app_error_logs';

//Certificates
//edit-certificate/task-id/certificate-id
$route['job/edit-certificate/(:num)/(:num)'] = 'app/certificates/certificates/edit_pdf/$1/$2';
//Certificates
$route['certificates/list']                  = 'app/certificates/certificates/list';
$route['certificates/create']                = 'app/certificates/certificates/create';
$route['certificates/create_old']            = 'app/certificates/certificates/create_old';
$route['certificates/edit/(:any)']           = 'app/certificates/certificates/edit/$1';
$route['certificates/details/(:any)']        = 'app/certificates/certificates/details/$1';
//Certificate Templates
$route['templates/list']                     = 'app/certificates/templates/list';
$route['template/tables/list']               = 'app/certificates/templates/table_template_list';
$route['template/tables/create']             = 'app/certificates/templates/add_table_templates';
$route['template/tables/create/(:any)']      = 'app/certificates/templates/add_table_templates/$1';
$route['template/tables/edit/(:any)']        = 'app/certificates/templates/edit_table_templates/$1';
$route['templates/headers']                  = 'app/certificates/templates/headers_list';
$route['templates/footers']                  = 'app/certificates/templates/footers_list';
$route['templates/create']                   = 'app/certificates/templates/create';
$route['templates/create/(:any)']            = 'app/certificates/templates/create/$1';
$route['templates/create_old']               = 'app/certificates/templates/create_old';
$route['templates/edit/(:any)']              = 'app/certificates/templates/edit/$1';
$route['templates/details/(:any)']           = 'app/certificates/templates/details/$1';

// Job
$route['jobs/bulk/assign']          = 'app/jobs/job/assign_job_form';
$route['job/bulk-assign']           = 'app/jobs/job/bulk_assign_jobs';
$route['job/list']                  = 'app/jobs/job/list';
$route['job/create']                = 'app/jobs/job/create';
$route['job/copy/(:num)']           = 'app/jobs/job/copy/$1';
$route['job/edit/(:any)']           = 'app/jobs/job/edit/$1';
$route['job/details/(:any)']        = 'app/jobs/job/details/$1';
$route['job/summary/(:any)/print']  = 'app/jobs/job/print_summary/$1';
$route['job/summary/(:any)']        = 'app/jobs/job/summary/$1';
$route['job/create-task']           = 'app/jobs/job/create_task';
$route['job/create-task/(:any)']    = 'app/jobs/job/create_task/$1';
$route['job/edit-task/(:any)']      = 'app/jobs/job/edit_task/$1';
$route['job/copy-task/(:any)']      = 'app/jobs/job/copy_task/$1';
$route['job/task-details/(:any)']   = 'app/jobs/job/task_details/$1';
$route['job/reassign-task/(:any)/(:any)']  = 'app/jobs/job/reassign_task/$1/$2';
$route['job/send-email-sms/(:any)'] = 'app/jobs/job/send_email_sms/$1';
$route['job/bulk-communication']    = 'app/jobs/job/bulk_communication';
$route['task/certificates/list']    = 'app/jobs/certificate/list';
$route['job/certificates/reason_for_failed'] = 'app/jobs/certificate/reason_for_failed';

//Scheduler
$route['job/engineers-diary']        = 'app/scheduler/scheduler/engineers_diaries';
$route['job/scheduler']              = 'app/scheduler/scheduler/home';
$route['task/scheduler/bulk-assign'] = 'app/scheduler/scheduler/bulk_assign_tasks';
$route['scheduler/tasks/assign']     = 'app/scheduler/scheduler/assign_task_form';

//JOb Tasks List
$route['job/(:num)/task/(:num)/sors'] = 'app/jobs/task/list_task_sors/$1/$2';
$route['tasks/list']                  = 'app/jobs/task/list_tasks';
//$route['task/list']                   = 'app/jobs/task/list';
$route['task/pending-appointment']    = 'app/jobs/task/pending_appointment';
$route['task/batch-printing']         = 'app/jobs/task/batch_printing';
$route['task/details/(:any)']         = 'app/jobs/task/details/$1';
$route['task/(:num)/detail']          = 'app/jobs/task/detail_window/$1';

// confirm appointment
$route['confirm-appointment/(:any)'] = 'app/jobs/task/confirm_appointment/$1';
$route['c/a/(:any)']                 = 'app/jobs/task/confirm_appointment/$1';

// appointment request (via email/SMS notification)
$route['appointment-request/(:any)'] = 'app/jobs/task/appointment_request/$1';
$route['a/r/(:any)']                 = 'app/jobs/task/appointment_request/$1';

// satisfaction survey (public — sent to resident via email/SMS on job completion)
// full URL : /survey/{token}
// short URL: /s/{token}  (saves SMS characters)
$route['survey/(:any)'] = 'app/jobs/job/survey_form/$1';
$route['s/(:any)']      = 'app/jobs/job/survey_form/$1';

// LBH job-completion review (public — link sent to Havering / carried in the CSV notes)
// full URL : /lbh-review/{token}
// short URL: /lr/{token}
$route['lbh-review/(:any)'] = 'app/jobs/job/lbh_review_form/$1';
$route['lr/(:any)']        = 'app/jobs/job/lbh_review_form/$1';

// engineer tracking
$route['et/([a-zA-Z0-9_-]+)'] = 'app/jobs/task/engineer_tracking/$1';

//Locations
// Vans
$route['van/list']              = 'app/locations/van/list';
$route['van/create']            = 'app/locations/van/create';
$route['van/edit/(:any)']       = 'app/locations/van/edit/$1';
$route['van/view-stock/(:any)'] = 'app/locations/van/view_stock/$1';

// Warehouses
$route['warehouse/list']              = 'app/locations/warehouse/list';
$route['warehouse/create']            = 'app/locations/warehouse/create';
$route['warehouse/edit/(:any)']       = 'app/locations/warehouse/edit/$1';
$route['warehouse/view-stock/(:any)'] = 'app/locations/warehouse/view_stock/$1';

// Worksheet
$route['accounts/list']                      = 'app/worksheet/worksheet/accounts_list';
$route['worksheet/awaiting-approval-list']   = 'app/worksheet/worksheet/awaiting_approval_list';
$route['worksheet/tasks-detail-list/(:any)'] = 'app/worksheet/worksheet/details_list/$1';

//Reports
$route['reports/list']               = 'app/reports/report/list';
$route['reports/r01']                = 'app/reports/report/r01';
$route['reports/r02']                = 'app/reports/report/r02';
$route['reports/r04']                = 'app/reports/report/r04';
$route['reports/r08']                = 'app/reports/report/r08';
$route['reports/completed-certificate-report'] = 'app/reports/report/completed_certificate_report';
$route['reports/create']             = 'app/reports/report/create';
$route['reports/edit/(:any)']        = 'app/reports/report/edit/$1';
$route['reports/add_filters/(:any)'] = 'app/reports/report/add_filters/$1';

//Dashboard
$route['data/decrypt'] = 'app/app/decrypt';
$route['data/encrypt'] = 'app/app/encrypt';
$route['dashboard']    = 'app/app/dashboard';
$route['havering/dashboard'] = 'app/havering/index';
$route['havering/code-mappings'] = 'app/havering/code_mappings';
$route['havering/interface/(:any)'] = 'app/havering/interface_detail/$1';
$route['dashboard/k03-detail'] = 'app/app/k03_detail';
$route['dashboard/k04-detail'] = 'app/app/k04_detail';
$route['dashboard/k06-detail'] = 'app/app/k06_detail';
$route['dashboard/delay-board'] = 'app/app/delay_board';
$route['dashboard/compliance']  = 'app/app/compliance';
$route['auth/login']   = 'app/app/login';

$route['data/test'] = 'app/app/index';

$route['table/sample'] = 'app/app/demo_table';

$route['bulk-preview'] = 'preview/bulk_upload_preview';

//$route['.well-known/apple-app-site-association'] = 'preview/app_site_association';

//File uploads
$route['upload_file'] = 'uploader/upload_file';

//quotation
$route['quotation/list']             = 'app/quotation/quotations/list';
$route['quotation/create']           = 'app/quotation/quotations/create';
$route['quotation/edit/(:any)']      = 'app/quotation/quotations/edit/$1';
$route['quotation/view/(:any)']      = 'app/quotation/quotations/view_quote/$1';
$route['quotation/sors/search-list'] = 'app/quotation/quotations/search_list';
$route['quotation/approve/(:any)']   = 'app/quotation/quotations/quote_approve/$1';
$route['quotation/reject/(:any)']    = 'app/quotation/quotations/quote_reject/$1';

//invoices

$route['invoices/list']                     = 'app/invoice/invoices/list';
$route['invoice/readyto-invoices-list']     = 'app/invoice/invoices/readyto_invoice_list';
$route['invoice/invoice-buildup']           = 'app/invoice/invoices/buildup_form';
$route['invoice/invoice-addto-existing']    = 'app/invoice/invoices/invoice_addto_existing_form';
$route['invoice/detail-list/(:any)']        = 'app/invoice/invoices/detail_list/$1';
$route['invoice/jobs/search-list'] = 'app/invoice/invoices/search_list';
$route['invoice/generate-invoice/(:any)'] = 'app/invoice/invoices/generate_invoice/$1';
$route['invoice/generate-excel/(:any)'] = 'app/invoice/invoices/generate_excel/$1';
$route['invoice/delete_invoice'] = 'app/invoice/invoices/delete_invoice';
$route['invoice/delete_reason'] = 'app/invoice/invoices/delete_reason';

$route['sor/map-sors']           = 'app/system/sor/map_sors';

$route['error/(:any)'] = 'app/app/error/$1';

//Bulk Import
$route['bulk-import/jobs'] = 'app/bulkimport/bulkimport/list';
$route['bulk-import/details/(:any)/(:any)'] = 'app/bulkimport/bulkimport/details/$1/$2';


// $route['(:any)'] = 'app/ajs/index/$1';
$route['(:any)'] = 'preview/index/$1';

//Default Controller
$route['default_controller']   = 'preview/index';
$route['404_override']         = '';
$route['translate_uri_dashes'] = FALSE;
