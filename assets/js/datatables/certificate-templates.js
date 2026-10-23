var master_data_type = 'template';
dataTable = null;
function load_data_table(limit, search_term, filters)
{
    data_filters = '';
    page_limit = ajs.datatable_limit;
    search = '';
    if (typeof filters != 'undefined' && (typeof filters['filters'] !== 'undefined' || filters['filters'] != null))
    {
        data_filters = filters['filters'];
    }
    if (typeof limit !== 'undefined' || limit != null)
    {
        page_limit = limit;
    }
    if (typeof search_term !== 'undefined' || search_term != null)
    {
        search = search_term;
    }

    dataTable = new DataTable("#ajax-datatables", {
        scrollY: (screen.height - 450) + 'px',
        serverSide: true,
        processing: true,
        paging: true,
        responsive:false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: search
        },
        // dom: 'Bfrtip',
        buttons: [
//            {
//                extend: 'colvis', // Column visibility button
//                text: 'Toggle Columns', // Button text
//                className: 'btn btn-dark'
//            },
            'excel'
        ],
        ajax: {
            url: site_url + "template/get_all",
            method: "GET",
            async: false,
            dataSrc: 'message.data',
            "data": function (d) {
                return $.extend({}, d, {
                    data_filters
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr) {
                ajs.datatable_error(xhr, "ajax-datatables");
            }
        },
        language: {
            emptyTable: "No data found",
        },
        columns: [
            {
                title: "",
                data: null,
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                    let status_btn = '';
                    if(row.status == '0' || row.status == '1'){
                        status_btn = status_icon(row.id, master_data_type, row.status);
                    }
                    return (
                        `<a data-heading="Edit Certificate Template" href="${cdn_url}templates/edit/${ajs.hash_encode(row.id)}" class="edit-btn">${row.status == 1 ? view_icon(1) : edit_icon()}</a>
                        <a style="cursor:pointer"  data-heading="Duplicate Certificate Template" href="` +cdn_url + `templates/create/` + ajs.hash_encode(row.id) +`" class="duplicate-btn" ><i class="ri-file-copy-fill align-bottom me-1 text-muted primary-btn fs-15"></i></a>`                            
                    );
                }
            },
            {
                title:"Id",
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
                render: function (data, type, row) {
                    return row.id;
                }
            },
            {
                title:"Title",
                name: "title",
                data: "title",
                render: function (data, type, row) {
                    return row.title;
                }
            },            
            {
                title:"Version",
                name: "version",
                data: "version",
                render: function (data, type, row) {
                    return row.template_version;
                }
            },
            {
                title:"Effective Date",
                name: "effective_date",
                data: "effective_date",
                render: function (data, type, row) {
                    return ajs.format_date(row.effective_date);
                }
            },
            {
                title:"Certificate",
                name: "certificate_name",
                data: "certificate_name",
                render: function (data, type, row) {
                    return row.certificate_name;
                }
            },{
                title:"Status",
                name: "status",
                data: "status",
                render: function (data) {
                    return templateStatus(data);
                }
            },
            {
                title:"Added On",
                name: "add_date",
                data: "add_date",
                render: function (data, type, row) {
                    return ajs.format_date(row.add_date);
                }
            },
            {
                title:"Added By",
                name: "added_by",
                data: "added_by",
                visible: false,
                render: function (data, type, row) {
                    return "<span class='text-wrap'>" + row.added_by_name + "</span>";
                }
            },
            
        ],
        order: [
            ['1', 'desc']
        ]
    });
}

function templateStatus(status){
    var icon = `<span class="badge border border-dark text-dark text-capitalize">Unpublished</span>`;
    if(status == "1"){
        icon = `<span class="badge border border-success text-success text-capitalize">Published</span>`;
    }
    else if(status == "2"){
        icon = `<span class="badge border border-warning text-warning text-capitalize">Draft</span>`;
    }
    return icon;
}

if ($('#ajax-datatables').length)
{
    fetch_default_filter(master_data_type);
    var breadcrumbs = [
        {label : 'System Admin', url: 'javascript: void(0);'},
        {label : 'Certificate Template', url: 'javascript: void(0);'},
        {label : 'List Templates', url: null}
    ];
    set_breadcrumb(breadcrumbs);
}

ajs.apply_ind_roles('Masters');
