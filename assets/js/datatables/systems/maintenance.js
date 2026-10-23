dataTable = null;
$(function () {
    var breadcrumbs = [
		{ label: "System Admin", url: "javascript: void(0);" },
		{ label: "Setup", url: "javascript: void(0);" },
		{ label: "Maintenance", url: null },
	];
	set_breadcrumb(breadcrumbs);

    ajs.apply_ind_roles('Maintenance');
});
