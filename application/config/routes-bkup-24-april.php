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
$route['auth/logout']['get']           = 'ajax/logout';
$route['app/auth/set-password/(:any)'] = 'app/auth/set_password/$1';
$route['app/auth/forgot-password']     = 'app/auth/forgot_password';

//view pages
$route['app/maintenance'] = 'app/maintenance';

//Engineers
$route['app/engineers/list']       = 'app/engineers/engineers/list';
$route['app/engineer/create']      = 'app/engineers/engineers/create';
$route['app/engineer/create_pop']  = 'app/engineers/engineers/create_pop';
$route['app/engineer/edit/(:any)'] = 'app/engineers/engineers/edit/$1';

//Clients
$route['app/clients/list']                       = 'app/clients/clients/list';
$route['app/clients/create']                     = 'app/clients/clients/create';
$route['app/clients/create_pop']                 = 'app/clients/clients/create_pop';
$route['app/clients/edit/(:any)']                = 'app/clients/clients/edit/$1';
$route['app/clients/details/(:any)']             = 'app/clients/clients/details/$1';
$route['app/clients/(:any)/selling-and-billing'] = 'app/clients/clients/selling_and_billing/$1';
$route['app/clients/(:any)/sors']                = 'app/clients/clients/sors/$1';

//Client Properties
$route['app/clients/(:any)/properties']                = 'app/clients/property/list/$1';
$route['app/clients/(:any)/properties/details/(:any)'] = 'app/clients/property/details/$2/$1';

//Client Settings & Code Mapping
$route['app/clients/(:any)/code-mapping'] = 'app/clients/settings/code_mapping/$1';
$route['app/clients/(:any)/settings']     = 'app/clients/settings/settings/$1';

//All Properties
$route['app/properties/list']           = 'app/clients/property/list';
$route['app/properties/create']         = 'app/clients/property/create';
$route['app/properties/edit/(:any)']    = 'app/clients/property/edit/$1';
$route['app/properties/details/(:any)'] = 'app/clients/property/details/$1';

//Property Assets
$route['app/clients/(:any)/properties/(:any)/assets']                = 'app/clients/asset/list/$1/$2';
$route['app/clients/(:any)/properties/(:any)/assets/details/(:any)'] = 'app/clients/asset/details/$3/$1/$2';

//Property Assets
$route['app/assets/create']      = 'app/clients/asset/create';
$route['app/assets/edit/(:any)'] = 'app/clients/asset/edit/$1';

//Contracts
$route['app/contract/list']                       = 'app/contracts/contract/list';
$route['app/contract/create']                     = 'app/contracts/contract/create';
$route['app/contract/edit/(:any)']                = 'app/contracts/contract/edit/$1';
$route['app/contract/details/(:any)']             = 'app/contracts/contract/details/$1';
$route['app/contract/personnel/(:any)']           = 'app/contracts/contract/personnel/$1';
$route['app/contract/sors/(:any)']                = 'app/contracts/contract/sors/$1';
$route['app/contract/selling-and-billing/(:any)'] = 'app/contracts/contract/selling_and_billing/$1';
$route['app/contract/uplifts/(:any)']             = 'app/contracts/contract/uplifts/$1';
$route['app/contract/settings/(:any)']            = 'app/contracts/contract/settings/$1';

//Contract Services
$route['app/contract/services/(:any)']    = 'app/contracts/contractservices/services/$1';
$route['app/contract/master-plan/(:any)'] = 'app/contracts/masterplan/masterplan/$1';

//System Setup Routes
$route['app/system'] = 'app/system/system';

//Roles
$route['app/system/role/list']           = 'app/system/role/list';
$route['app/system/role/create']         = 'app/system/role/create';
$route['app/system/role/edit/(:any)']    = 'app/system/role/edit/$1';
$route['app/system/role/details/(:any)'] = 'app/system/role/details/$1';

//Users
$route['app/system/user/list']           = 'app/system/user/list';
$route['app/system/user/create']         = 'app/system/user/create';
$route['app/system/user/edit/(:any)']    = 'app/system/user/edit/$1';
$route['app/system/user/details/(:any)'] = 'app/system/user/details/$1';

//SORS
$route['app/system/sor/list']           = 'app/system/sor/list';
$route['app/system/sor/create']         = 'app/system/sor/create';
$route['app/system/sor/edit/(:any)']    = 'app/system/sor/edit/$1';
$route['app/system/sor/details/(:any)'] = 'app/system/sor/details/$1';

//Departments
$route['app/system/department/list']           = 'app/system/departments/list';
$route['app/system/department/create']         = 'app/system/departments/create';
$route['app/system/department/edit/(:any)']    = 'app/system/departments/edit/$1';
$route['app/system/department/details/(:any)'] = 'app/system/departments/details/$1';

//Workstreams
$route['app/system/workstream/list']           = 'app/system/workstreams/list';
$route['app/system/workstream/create']         = 'app/system/workstreams/create';
$route['app/system/workstream/edit/(:any)']    = 'app/system/workstreams/edit/$1';
$route['app/system/workstream/details/(:any)'] = 'app/system/workstreams/details/$1';

//Services/Job Types
$route['app/system/service/list']           = 'app/system/services/list';
$route['app/system/service/create']         = 'app/system/services/create';
$route['app/system/service/edit/(:any)']    = 'app/system/services/edit/$1';
$route['app/system/service/details/(:any)'] = 'app/system/services/details/$1';

//Masters
$route['app/system/master/list']           = 'app/system/masters/list';
$route['app/system/master/create']         = 'app/system/masters/create';
$route['app/system/master/edit/(:any)']    = 'app/system/masters/edit/$1';
$route['app/system/master/details/(:any)'] = 'app/system/masters/details/$1';

$route['app/system/master/(:any)/list']          = 'app/system/master_records/list/$1';
$route['app/system/master/(:any)/create']        = 'app/system/master_records/create/$1';
$route['app/system/master-record/edit/(:any)']   = 'app/system/master_records/edit/$1';
$route['app/system/master-record/create/(:any)'] = 'app/system/master_records/create_pop/$1';

$route['app/system/logs']                                              = 'app/system/logs/list';
$route['app/system/logs/user-activity-logs']                           = 'app/system/logs/user_activity_logs';
$route['app/system/logs/mail-logs']                                    = 'app/system/logs/mail_logs';
$route['app/system/logs/record-update-logs']                           = 'app/system/logs/record_update_logs';
$route['app/system/logs/db-error-logs']                                = 'app/system/logs/db_error_logs';
$route['app/system/logs/user-activity-logs/view/(:any)/(:any)/(:any)'] = 'app/system/logs/user_activity_log_details/$1/$2/$3';
$route['app/system/logs/db-update-logs/view/(:any)/(:any)/(:any)']     = 'app/system/logs/db_update_log_details/$1/$2/$3';

//Certificates
$route['app/certificates/list']           = 'app/certificates/certificates/list';
$route['app/certificates/create']         = 'app/certificates/certificates/create';
$route['app/certificates/create_old']     = 'app/certificates/certificates/create_old';
$route['app/certificates/edit/(:any)']    = 'app/certificates/certificates/edit/$1';
$route['app/certificates/details/(:any)'] = 'app/certificates/certificates/details/$1';
//Certificate Templates
$route['app/templates/list']              = 'app/certificates/templates/list';
$route['app/templates/headers']           = 'app/certificates/templates/headers_list';
$route['app/templates/footers']           = 'app/certificates/templates/footers_list';
$route['app/templates/create']            = 'app/certificates/templates/create';
$route['app/templates/create/(:num)']     = 'app/certificates/templates/create/$1';
$route['app/templates/create_old']        = 'app/certificates/templates/create_old';
$route['app/templates/edit/(:any)']       = 'app/certificates/templates/edit/$1';
$route['app/templates/details/(:any)']    = 'app/certificates/templates/details/$1';

// Job
$route['app/job/list']           = 'app/jobs/job/list';
$route['app/job/create']         = 'app/jobs/job/create';
$route['app/job/edit/(:any)']    = 'app/jobs/job/edit/$1';
$route['app/job/details/(:any)'] = 'app/jobs/job/details/$1';

//Dashboard
$route['app/dashboard'] = 'app/app/dashboard';

$route['app/(:any)'] = 'app/ajs/index/$1';

//File uploads
$route['upload_file'] = 'uploader/upload_file';

//Bulk Upload Preview
$route['bulk-preview'] = 'preview/bulk_upload_preview';
//
//Default Preview Controller
$route['(:any)']       = 'preview/index/$1';

//Default Controller
$route['default_controller']   = 'preview';
$route['404_override']         = '';
$route['translate_uri_dashes'] = FALSE;
