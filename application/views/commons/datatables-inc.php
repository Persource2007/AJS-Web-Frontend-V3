<link rel="stylesheet" href="<?= cnd_url('assets/css/datatables/'); ?>dataTables.bootstrap5.min.css" />
<link rel="stylesheet" href="<?= cnd_url('assets/css/datatables/'); ?>responsive.bootstrap.min.css" />
<link rel="stylesheet" href="<?= cnd_url('assets/css/datatables/'); ?>buttons.dataTables.min.css">
<link rel="stylesheet" href="<?= cnd_url('assets/css/datatables/'); ?>dataTables.colVis.css">
<script src="<?= cnd_url('assets/js/datatables-plugin/'); ?>jquery.dataTables.min.js"></script>
<script src="<?= cnd_url('assets/js/datatables-plugin/'); ?>dataTables.bootstrap5.min.js"></script>
<script src="<?= cnd_url('assets/js/datatables-plugin/'); ?>dataTables.responsive.min.js"></script>
<script src="<?= cnd_url('assets/js/datatables-plugin/'); ?>dataTables.buttons.min.js"></script>
<script src="<?= cnd_url('assets/js/datatables-plugin/'); ?>buttons.print.min.js"></script>
<script src="<?= cnd_url('assets/js/datatables-plugin/'); ?>buttons.html5.min.js"></script>
<script src="<?= cnd_url('assets/js/datatables-plugin/'); ?>buttons.colVis.min.js"></script>
<script src="<?= cnd_url('assets/js/datatables-plugin/'); ?>vfs_fonts.js"></script>
<script src="<?= cnd_url('assets/js/datatables-plugin/'); ?>pdfmake.min.js"></script>
<script src="<?= cnd_url('assets/js/datatables-plugin/'); ?>jszip.min.js"></script>
<script src="<?= cdn_url('assets/js/datatables/datatable-custom-func.js') ?>"></script>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/colreorder/1.5.1/js/dataTables.colReorder.min.js"></script>
<style>
    .dataTables_filter{
        display: none;
    }
    .dataTables_info:first-child{
        display: none;
    }



</style>
<script type="text/javascript">
    var isActionPositionChanged = false;
    $.fn.dataTable.ext.errMode = 'none';
    $.extend(true, $.fn.dataTable.defaults, {
        scrollY: (screen.height - 470) + 'px',
        scrollCollapse: !0,
        scrollX: true,  
        autoWidth: false,
        colReorder: false,
        buttons: [
            'excel', // Excel export button
            {
                extend: 'colvis',
                text: '<i class="fa fa-cog"></i>', // FontAwesome settings icon
                className: 'custom-colvis-btn', // Custom CSS class
                titleAttr: 'Show/Hide Columns',
                position: 'last',
                columns: ':not(.noVis)'
            }
        ],
        //dom: "Bfrt<'row ps-3 pe-3 pb-3'<'col-sm-12 col-md-5' i><'col-sm-12 col-md-7' p>>",
        dom: "<'row'<'col-sm-12 table-responsive'tr>>" + "<'row datatable-footer align-items-center mt-3'<'col-sm-8 d-flex align-items-center'l<'devider'>i><'col-sm-4'p>>",
        columnDefs: [
            {
                targets: '_all',
                defaultContent: '-'
            },
            { targets: [0,1,2], className: "noVis" },
            { targets: [0], createdCell: function(td) {
                    $(td).wrapInner('<div class="action-col"></div>');
                } 
            }
        ],
        initComplete: function() {
            setTimeout(function () {
                loadColumnVisibility(dataTable);
                //moveActionColumn(dataTable);
            });
            var scrollBodyHeight = $('.dataTables_scrollBody').css('max-height');
            $('.dataTables_scrollBody').css('min-height', scrollBodyHeight);

            if($('#datatable_buttons').length == 0) {
                $('.dataTables_wrapper').prepend('<div class="colvis-fixed-container" id="datatable_buttons"></div>');
            }
        }
    });


    function saveColumnVisibilityAndOrder(table) {
        if (!table)
            return; // Ensure table is not null

        var visibility = [];
        var order = null;
        //var order = table.colReorder.order(); // Get the current column order

        table.columns().every(function (index) {
            visibility.push({column: index, visible: this.visible()});
        });

        var pageUrl = window.location.pathname; // Get the current page URL
        var storageKey = 'columnVisibility_' + pageUrl;

        // Store both visibility and order in localStorage
        localStorage.setItem(storageKey, JSON.stringify({
            visibility: visibility,
            order: order
        }));
    }


    function loadColumnVisibility(table) {
        if (!table) return;

        var key = 'columnVisibility_' + window.location.pathname;
        var saved = localStorage.getItem(key);

        table.buttons().container().appendTo($('#datatable_buttons'));

        if (!saved) return;

        var settings = JSON.parse(saved);
        var totalCols = table.columns().count();

        // Visibility is stored by column index, so a saved entry from before a
        // column was added or removed would hide the wrong columns. Drop it.
        if (!settings.visibility || settings.visibility.length !== totalCols) {
            localStorage.removeItem(key);
            return;
        }

        settings.visibility.forEach(function (item) {
            if (item && item.column < totalCols) {
                if (table.column(item.column).visible() !== item.visible) {
                    table.column(item.column).visible(item.visible, false);
                }
            }
        });

        table.columns.adjust();
    }

    // for move action column last to first position
    function moveActionColumn(table) {
        console.log(isActionPositionChanged);

        if (!table)
            return; // Ensure table exists
        var settings = table.settings()[0];
        console.log(settings);

        if(!settings._colReorder)
            return;

        var columnCount = table.columns().count(); // Get total columns
        var newOrder = [columnCount - 1]; // Move last column to the first

        // Append the rest of the columns in order
        for (var i = 0; i < columnCount - 1; i++) {
            newOrder.push(i);
        }

        isActionPositionChanged = true;

        // Apply new column order
        table.colReorder.order(newOrder);
    }

    // document.getElementById("vertical-hover").addEventListener("click", function () {
    //     setTimeout(function () {
    //         //dataTable.ajax.reload(null, false); // Reload data
    //         dataTable.columns.adjust().draw(); // Adjust column widths
    //     }, 50);
    // });
</script>

