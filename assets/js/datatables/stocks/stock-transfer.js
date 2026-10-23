dataTable = null;

function load_data_table() {
    $(".server-errors").hide();
    data_filters = {};
    page_limit = ajs.datatable_limit;   

    var location_type = $(".from_location_type:checked").val();
    var location_id = $("#from_location").val();
    const kit_ids = $("#kits").val();

    dataTable = new DataTable("#stock-datatables", {
        searching: false,
        serverSide: true,
        processing: true,
        paging: true,
        responsive:false,
        bDestroy: true,
        pageLength: page_limit,
        search: {
            search: $("#search").val(),
        },
        //dom: "Bfrtip",
        // buttons: ["excel"],
        ajax: {
            url: site_url + "location/get_stock/"+location_type+'/'+location_id,
            method: "GET",
            async: false,
            dataSrc: "message.data",
            data: function (d) {
                if ($("#manufacturer_id").val() > 0) {
                    data_filters['manufacturer_id'] = $("#manufacturer_id").val();
                }
                if (kit_ids > 0) {
                    d.kits = kit_ids;
                    d.kit_qty = $("#kit_qty").val();
                }
                return $.extend({}, d, {
                    data_filters,
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (jqXHR) {
                ajs.datatable_error(xhr, "stock-datatables");
                // Handle errors
                if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                    $('#stock-section').hide();
                  // Display custom validation error message
                    $('.error-msg').html(jqXHR.responseJSON.message);

                    var missing_stocks = '';
                    $.each(jqXHR.responseJSON?.errors, function (index, item) {
                        missing_stocks +=
                            `<tr>
                                <td>` +item.name +`</td>
                                <td>` +item.manuf_part_no +`</td>
                                <td>` +item.make +`</td>
                                <td>` +item.model +`</td>
                                <td>` +item.available_qty +`</td>
                                <td>` +item.needed_qty +`</td>
                            </tr>`;
                    });

                    $("#stock-errors").html(missing_stocks);
                    $(".server-errors").show();
                    
                } else {
                  // Generic error message
                  alert("An error occurred while processing your request.");
                }
            }
        },
        language: {
            emptyTable: "No data found",
        },
        columns: [
            {
                name: "id",
                data: "id",
                orderable: false,
                searchable: false,
                render: function (data, type, row) {
                    return `
                        <div class="form-check">
                            <input class="form-check-input checkbox-row" type="checkbox" value="1" >
                            <input type="hidden" name="stocks[`+data+`][stock_id]" value="` + data + `" class="item-id" disabled>
                            <input type="hidden" name="stocks[`+data+`][stock_loc_id]" value="`+row.stock_loc_id+`" disabled>
                        </div>`;
                }
            },
            {
                name: "name",
                data: "name",
            },
            {data: "manuf_part_no", name: "manuf_part_no"},
            {data: "manufacturer", name: "manufacturer"},
            {
                data: "model",
                name: "model",
            },
            {
                data: "quantity",
                name: "quantity",
            },
            {
                data: null,
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                    var kit_qty = '';
                    var transfer_qty = 1;

                    if(kit_ids > 0) {
                        kit_qty = `<p class="mb-0 ms-2">${row?.total_kit_quantity} qty in kit</p>`;
                        transfer_qty = row?.total_kit_quantity * $("#kit_qty").val();
                    }
                    return ( `<div class="d-flex error-div"><input type="number" name="stocks[`+row.id+`][trans_quantity]" value="${transfer_qty}" class="item-qty number-only w-50 form-control" min="1" max='`+row.quantity+`' disabled required><div>`);
                },
            }
        ],
        order: [["1", "asc"]],
        drawCallback: function () {
            $('#stock-section').show();
             const total = this.fnSettings().fnRecordsTotal();
            if(total) {
                //$('#stock-section').show();
                $('#check-all').prop('disabled',false);
            } else {
                //$('#stock-section').hide();
                $('#check-all').prop('disabled',true);
            }
        }
    });

    dataTable.buttons().container().appendTo($("#datatable_buttons"));
}

if ($("#stock-datatables").length) {
    select2_ajax(
            "#manufacturer_id",
            site_url + "master-record/get_all",
            "master_value",
            {master_code: "ASSET_MAKE"},
            );
}

function create_form(type = "create") {
    if (type == "create") {
        get_location_drop('W', $('#from_location'));
        get_location_drop('W', $('#to_location'));
        select2_ajax('#kits', site_url + "kit/get_all", "title", null);
    }

    $("#load-stock-form").validate({
        onkeyup: false,
        rules: {
            from_location: {
                required: true,
            },
            to_location: {
                required: true,
                not_equal:'#from_location'
            }
        },
        errorPlacement: function (error, element) {
            if (
                    element.hasClass("select2") &&
                    element.next(".select2-container").length
                    ) {
                error.insertAfter(element.next(".select2-container"));
            } else if (element.parent(".input-group").length ||
                    element.parent(".error-div").length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {

            if( $("#from_location").val() > 0) {
                load_data_table();
            }
            return false;
        },
    });
    
    $("#transfer-form").validate({errorPlacement: function (error, element) {
        if (
                element.hasClass("select2") &&
                element.next(".select2-container").length
                ) {
            error.insertAfter(element.next(".select2-container"));
        } else if (element.parent(".input-group").length ||
                element.parent(".error-div").length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    }});
    var breadcrumbs = [
        {label : 'Stock Management', url: 'javascript: void(0);'},
        {label : 'Stock Transfer', url: null},
    ];
    set_breadcrumb(breadcrumbs);
}

$(document).on("change", ".from_location_type", function () {

    var from_location_type = $(this).val();
    get_location_drop(from_location_type, $('#from_location'))
});
$(document).on("change", ".to_location_type", function () {

    var from_location_type = $(this).val();
    get_location_drop(from_location_type, $('#to_location'))
});

function get_location_drop(type, element)
{
    if ($(element).hasClass('select2-hidden-accessible')) {
        $(element).select2('destroy');
        $(element).empty();
    }
    if (type == 'V')
    {
        select2_ajax(element, site_url + "van/get_all", "van_code", null);
    }
    if (type == 'W')
    {
        select2_ajax(element, site_url + "warehouse/get_all", "title", null);
    }
}

$(function () {
    jQuery.validator.addMethod("not_equal", function(value, element, param) {
        return this.optional(element)  || $(".from_location_type:checked").val() != $(".to_location_type:checked").val() || (value != $(param).val() && $(".from_location_type:checked").val() == $(".to_location_type:checked").val());
      }, "Please select a different location");

    create_form();

    $(document).on("click", "#transfer-btn", function () {
        
        console.log($('#transfer-form').valid());
        if($('#load-stock-form').valid() && $('#transfer-form').valid()) {
            var form_data = $('#transfer-form').serializeArray();
            form_data.push({name: 'location_type_from', value: $(".from_location_type:checked").val()});
            form_data.push({name: 'location_id_from', value: $("#from_location").val()});
            form_data.push({name: 'location_type', value: $(".to_location_type:checked").val()});
            form_data.push({name: 'location_id', value:  $("#to_location").val()});            
            
            ajs.reload = true;
            ajs.ajax_form(site_url + 'location/stock-transfer', form_data, 'POST', null, '1', '1', ajs_form_handler.form_submit_response, ajs_form_handler.form_submit_response);
        }
    });

    $(document).on("click", ".checkbox-row", function () {
        if ($(this).is(":checked")) {
            $(this).closest('tr').find('input:not(.checkbox-row)').prop('disabled',false).prop('readonly',false);

            if($("#kits").val() > 0) {
                $(this).closest('tr').find('input:not(.checkbox-row)').prop('readonly',true);
            }

        } else {
            $(this).closest('tr').find('input:not(.checkbox-row)').prop('disabled',true);
        }
        
        if($('.checkbox-row:checked').length) {
            $('#transfer-btn').show();
        } else {
            $('#transfer-btn').hide();
        }
	});
    $(document).on("click", "#check-all", function () {
        if($('.checkbox-row:checked').length) {
            $('#transfer-btn').show();
        } else {
            $('#transfer-btn').hide();
        }
    });

    $(document).on("change", ".selection_by", function () {
        if($(this).val() == 'kit') {
            $('.kit-fields').show();
        } else {
            $('.kit-fields').hide();
            $('#kits').val('').trigger('change.select2');
            $(".server-errors").hide();
        }
    });

    $(document).on("change", "#kits,#kit_qty", function () {
        $('#load-stock-form').submit();
    });

});