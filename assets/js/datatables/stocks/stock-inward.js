var master_data_type = "purchase-order";
var deleted_purchase_order_items = [];
dataTable = null;
const keys = [
	"delivery_date",
	"delivery_slip",
	"delivery_status",
	"invoice_status",
	"supplier_id",
	"po_number",
	"description",
];

function create_form(type = "create") {
	deleted_purchase_order_items = [];
	if (type == "create") {
		select2_ajax(
			"#supplier_id",
			site_url + "supplier/get_all",
			"name",
			null,
			"offcanvasRight"
		);
	}

	$("#purchase-orderForm").validate({
		onkeyup: false,
		rules: {
			delivery_date: {
				required: true,
			},
			delivery_status: {
				required: true,
			},
			invoice_status: {
				required: true,
			},
			inward_to: {
				required: true,
			}
		},
		errorPlacement: function (error, element) {
			if (
				element.hasClass("select2") &&
				element.next(".select2-container").length
			) {
				error.insertAfter(element.next(".select2-container"));
			} else if (
				element.parent(".input-group").length ||
				element.parent(".error-div").length
			) {
				error.insertAfter(element.parent());
			} else {
				error.insertAfter(element);
			}
		},
		submitHandler: function (form) {
			var sub_button = $(form).find(":submit");
			ajs.submit_button_element = sub_button;
			var action = $(form).attr("action");
			var method = $(form).attr("method");

			var formData = $(form).serializeArray();
			formData.push({
				name: "deleted_purchase_order_items",
				value: deleted_purchase_order_items,
			});

            ajs.detailDataFunction = edit_form;

			ajs.ajax_form(
				action,
				formData,
				method,
				null,
				"1",
				"1",
				ajs_form_handler.offcanvas_form,
				ajs_form_handler.offcanvas_form
			);

			return false;
		},
	});

	ajs.mask_inputs();
}

// set  data in edit page
function load_data(result_json) {
	if (ajs_form_handler.check_result(result_json)) {
		var purchase_order = result_json.data;

		for (const [key, value] of Object.entries(purchase_order)) {
			if (keys.includes(key)) {
				$("#" + key).val(value);
			}
		}
        $("#supplier_id").attr("readonly", true);
        $("#delivery_status,#invoice_status").trigger('change');
        if(purchase_order.delivery_slip) {
            $("#slip-prev").html('<a target="_blank" href="'+s3_url+'/'+purchase_order.delivery_slip+'">view</a>');
        }
		select2_ajax(
			"#supplier_id",
			site_url + "supplier/get_all",
			"name",
			null,
			"offcanvasRight",
			purchase_order.supplier_id
		);

        if(purchase_order.delivery_type != 'warehouse') {
            $('.inward-section').show();
            

            let warehouse_id = purchase_order.inward_to == 'warehouse' ? purchase_order.location_id : null;
            let van_id = purchase_order.inward_to == 'van' ? purchase_order.location_id : null;
            select2_ajax(
                "#inward_warehouse_id",
                site_url + "warehouse/get_all",
                "title",
                null,
                undefined,
                warehouse_id
            );
            select2_ajax(
                "#inward_van_id",
                site_url + "van/get_all",
                "van_number",
                null,
                undefined,
                van_id
            );
            $("input[name=inward_to][value='" + purchase_order.inward_to + "']")
                .prop("checked", true)
                .trigger("change");
        }
        
		set_purchase_order_items(purchase_order.items);
	} else {
		ajs_form_handler.show_errors_offcanvas(result_json);
	}
}

// ser items on edit page
function set_purchase_order_items(items) {
	var purchase_orderItems = "";
	$.each(items, function (index, item) {
        let description = item.description && item.description != 'null' ? item.description : '';
        let image = item.image && item.image != 'null' ? item.image : '';
		purchase_orderItems +=
			`<tr>
            <td class="dtr-control hide">
                <input type="hidden" name="items[` +index +`][id]" value="` +item.id +`" class="row-id">                
            </td>
            <td><div class="form-check"><input class="form-check-input checkbox-row" type="checkbox" value="1" ></div></td>
            <td>` +
			item.manuf_part_no +
			`</td>
            <td>` +
			item.name +
			`</td>
            <td class=" text-capitalize">` +
			item.type +
			`</td>
            <td class="text-end">` +
			item.supplier_price +
			`</td>
            <td class="text-center">` +item.quantity + `<input type="hidden" class="total-qty"  value="` +item.quantity +`"></td>
            <td><input type="text" class="form-control w-75 number-only inward-qty item-qty" name="items[` +
			index +
			`][inward_quantity]" value="` +item.inward_quantity +`" max="` +item.quantity +`" required></td>
            <td><input type="text" class="form-control w-75 number-only short-qty item-qty" name="items[` +
			index +
			`][short_quantity]" value="` +item.short_quantity +`" max="` +item.quantity +`" required></td>
            <td><input type="text" class="form-control w-75 number-only damage-qty item-qty" name="items[` +
			index +
			`][damage_quantity]" value="` +item.damage_quantity +`" max="` +item.quantity +`" required></td>
            <td><input type="text" class="form-control" name="items[` +index +`][description]" value="` +description +`"></td>
            <td><div class="input-group custom-file-button">
            <input type="hidden" name="items[` +index +`][image]" id="damaged_img_field_` +index +`" value="` +image +`">
            <input type="file" accept="image/*" class="form-control img-file-input" data-name="damaged_img_field_` +index +`" id="damaged_img_` +index +`">
            <label class="input-group-text" for="damaged_img_` +index +`">Browse</label>
        </div>`;
        if(image) {
            purchase_orderItems += `<a target="_blank" href="` +s3_url+'/'+image +`">`+image.split('/').pop()+`</a>`;
        }
        `</td></tr>`;
	});
	$("#table-items").html(purchase_orderItems);
	$("#table-items").find('input:not(.checkbox-row)').attr('disabled',true);
}

function edit_form() {
	create_form("edit");
	var id = $("#edit_id").val();
	ajs.ajax_form(
		site_url + "purchase-order/get/" + id + "?edit=true",
		null,
		"GET",
		null,
		"0",
		"0",
		load_data,
		load_data
	);

    var breadcrumbs = [
        {label : 'Stock Management', url: 'javascript: void(0);'},
        {label : 'Purchase Orders', url: cdn_url + 'purchase-order/list'},
        {label : 'Manage Stock Inward', url: null}
    ];
    set_breadcrumb(breadcrumbs);
}

$(function () {

    $(".basic-select2").select2({
        placeholder: "Select",
        allowClear: true,
        minimumResultsForSearch: Infinity
       // dropdownParent: $("#offcanvasRight"),
    });
    
    $(document).on("click", ".checkbox-row", function () {
        if ($(this).is(":checked")) {
		    $(this).closest('tr').find('input:not(.checkbox-row)').attr('disabled',false);

            var short = $(this).closest('tr').find('.short-qty').val();
            var damage = $(this).closest('tr').find('.damage-qty').val();
            var inward = $(this).closest('tr').find('.inward-qty').val();
            var total = $(this).closest('tr').find('.total-qty').val();

            var current_value = +short + +damage + +inward;

            if(current_value == 0) {
                $(this).closest('tr').find('.inward-qty').val(total);
            }

        } else {
		    $(this).closest('tr').find('input:not(.checkbox-row)').attr('disabled',true);
        }
	});

    $(document).on("keyup", ".item-qty", function (e) {        
        var short = $(this).closest('tr').find('.short-qty').val();
        var damage = $(this).closest('tr').find('.damage-qty').val();
        var inward = $(this).closest('tr').find('.inward-qty').val();

        var total = $(this).closest('tr').find('.total-qty').val();
        var current_value = +short + +damage + +inward;

        // console.log(current_value);
        // console.log(total);
        
        if(current_value > total && e.keyCode!=8) {
            var value = $(this).val();
            $(this).val(value.slice(0, -1));
            Swal.fire("Please enter valid quantity number");
            return false;
        }
	});

    $(document).on('change', '.img-file-input', function () {

       // var preview_el = $(this).data('preview-class');
       var element = this;
        var name_el = $(this).data('name');
        var file = $(this)[0].files[0];
        var reader = new FileReader;
        reader.addEventListener("load", function () {
            var image_name = file.name;
            var image_extension = image_name.split('.').pop().toLowerCase();
            if ($.inArray(image_extension, ['jpg', 'jpeg', 'png']) == -1) {
                //$(element).closest('td').find('.file-error-msg').html('Invalid image file. supported format- jpg, jpeg & png');
                return false;
            }
            var form_data = new FormData();
            form_data.append("upload", file);
            form_data.append("file_path", 'stock-inward/damage');
            form_data.append('file_type', "image");
            ajs.ajax_file_upload(site_url + 'api/file/upload_file_s3', form_data, '1', '1', ajs_form_handler.image_upload, ajs_form_handler.image_upload, name_el);
           
           // $('.' + preview_el).attr('src', reader.result);
        }, !1), file && reader.readAsDataURL(file);
    });

    $(document).on('change', '#delivery_slip_file', function () {

        // var preview_el = $(this).data('preview-class');
         var name_el = $(this).data('name');
         var file = $(this)[0].files[0];
         var reader = new FileReader;
         reader.addEventListener("load", function () {
             var form_data = new FormData();
             form_data.append("upload", file);
             form_data.append("file_path", 'stock-inward/delivery-slip');
             form_data.append('file_type', "doc");
             ajs.ajax_file_upload(site_url + 'api/file/upload_file_s3', form_data, '1', '1', ajs_form_handler.image_upload, ajs_form_handler.image_upload, name_el);
            
            // $('.' + preview_el).attr('src', reader.result);
         }, !1), file && reader.readAsDataURL(file);
    });

    $(document).on("change", ".inward-to", function () {
        console.log(23);
		$("#warehouse-field,#van-field").hide();
		if ($(this).val() == "van") {
			$("#van-field").show();
		}else {
			$("#warehouse-field").show();
		}
	});

    edit_form();
	
	ajs.apply_ind_roles('POs');
});
