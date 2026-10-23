var master_data_type = 'table_template';
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
            url: site_url + "template/tables/get_all",
            method: "GET",
            async: false,
            dataSrc: 'data',
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
                data: null,
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                    return (
                        `<a data-heading="Edit Table Template - ` + row.title + `" href="` +cdn_url + `template/tables/edit/` + ajs.hash_encode(row.id) +`" class="edit-btn" >`+edit_icon()+`</a>
                        <a style="cursor:pointer"  data-heading="Duplicate Table Template" href="` +cdn_url + `template/tables/create/` + ajs.hash_encode(row.id) +`" class="duplicate-btn" ><i class="ri-file-copy-fill align-bottom me-1 text-muted primary-btn fs-15"></i></a>`
                    );
                   /*  var str = "";
                        str += `<div class="dropdown d-inline-block">
                                <button class="btn btn-soft-secondary btn-sm dropdown " type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                    <i class="ri-more-fill align-middle"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end " style="dropdown-menu dropdown-menu-end">
                                <li><a style="cursor:pointer"  data-heading="Edit Table Template - ` + row.title + `" href="` +cdn_url + `template/tables/edit/` + ajs.hash_encode(row.id) +`" class="dropdown-item edit-btn" ><i class="ri-pencil-fill align-bottom me-2 text-muted"></i>Edit</a></li>
                                <li><a style="cursor:pointer"  data-heading="Duplicate Table Template" href="` +cdn_url + `template/tables/create/` + ajs.hash_encode(row.id) +`" class="dropdown-item duplicate-btn" ><i class="ri-file-copy-fill align-bottom me-1 text-muted"></i>Duplicate</a></li>
                                </ul>
                                </div>`; */
                }
            },
            {
                name: "id",
                data: "id",
                visible: false,
                searchable: false,
                render: function (data, type, row) {
                    return row.id;
                }
            },
            {
                name: "title",
                data: "title",
                render: function (data, type, row) {
                    return row.title;
                    // var str = '';
                    // str += `<div class="d-flex">
                    //                 <div class="avatar-group">
                    //                     ` + row.title + `
                    //                 </div>
                    //                 <div class="flex-shrink-0 ms-4">
                    //                     <ul class="list-inline tasks-list-menu mb-0">
                    //                         <li class="list-inline-item">
                    //                             <a style="cursor:pointer"  data-heading="Edit Table Template - ` + row.title + `" href="` + cdn_url + `template/tables/edit/` + ajs.hash_encode(row.id) + `" class="popup-form-button1" >
                    //                                 <i class="ri-pencil-fill align-bottom me-2 text-muted"></i>
                    //                             </a>
                    //                             <a style="cursor:pointer"  data-heading="Duplicate Template" title="Duplicate Template" href="` + cdn_url + `template/tables/create/` + ajs.hash_encode(row.id) + `" class="popup-form-button1" >
                    //                                 <i class="ri-file-copy-fill align-bottom me-2 text-muted"></i>
                    //                             </a>
                    //                         </li>
                                           
                                           
                    //                     </ul>
                    //                 </div>
                    //             </div>`;
                    // return str;
                }
            },
            {
                name: "add_date",
                data: "add_date",
                render: function (data, type, row) {
                    return ajs.format_date(row.add_date);
                }
            },
            {
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

if ($('#ajax-datatables').length)
{
    fetch_default_filter(master_data_type);
    
    var breadcrumbs = [
        {label : 'System Admin', url: 'javascript: void(0);'},
        {label : 'Certificate Template', url: 'javascript: void(0);'},
        {label : 'Table Template', url: null}
    ];
    set_breadcrumb(breadcrumbs);
}

ajs.apply_ind_roles('Masters');
