// $.extend(true, $.fn.dataTable.defaults, {
//     dom: "Bfrt<'row ps-3 pe-3 pb-3'<'col-sm-12 col-md-5' i><'col-sm-12 col-md-7' p>>",
//     columnDefs: [
//         {
//             targets: '_all',
//             defaultContent: '-'
//         }
//     ]
// });

//$("#table_length").val(dataTable.page.len());
$("#table_length").change(function () {
	// dataTable is null on the gated grids while the "apply a filter" prompt is up.
	if (!dataTable) return;
	dataTable.page.len($(this).val()).draw();
});
$('select[name="table_length"]').closest('.input-light').parent('div').css('display','none');
$("#export_button").on("click", function () {
    Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to export?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        denyButtonText: "Cancel",
        showLoaderOnConfirm: true,
    }).then((result) => {
        if (result.isConfirmed) {
            get_search_filter_data("export");
        }
    });
	
	//dataTable.button('.buttons-excel').trigger();
});

// Expand/Collapse event for the details-control column
$(document).on('click', '.details-control', function () {
    var tr = $(this).closest('tr');
    var row = dataTable.row(tr);

    if (row.child.isShown()) {
        // Row is already open - close it
        row.child.hide();
        //tr.removeClass('shown');
        $(this).find('i').addClass('ri-arrow-down-s-line').removeClass('ri-arrow-up-s-line');
    } else {
        // Open this row
        row.child(dataTable.setDetailRow(row.data())).show();
        $(this).find('i').removeClass('ri-arrow-down-s-line').addClass('ri-arrow-up-s-line');
        //tr.addClass('shown');
    }
});


$("#search_grid").on("click", function (e) {
	e.preventDefault();
	get_search_filter_data("load");
});

$("#save_search_preset").on("click", function (e) {
	e.preventDefault();
	if ($("#search_preset_label").valid()) {
		get_search_filter_data("store");
	}
});

$(document).on("click", "#search-table", function (e) {
	e.preventDefault();
	var filters = $("#filter-form").serializeArray();
	table_filter = {};
	filters.forEach(function ({ name, value }) {
		if (name == "search") {
			table_search = value;
		} else if (value) {
			table_filter[name] = value;
		}
	});
	//modalDataTable.ajax.reload(null, false);
	load_item_table();
});

$(document).on("click", "#search-btn", function (e) {
	e.preventDefault();
	var filters = $("#search-filter-form").serializeArray();
	var search_text = "";
	table_filter = {};
	filters.forEach(function ({ name, value }) {
		if (name == "search") {
			search_text = value;
		} else if (value) {
			table_filter[name] = value;
		}
	});
	load_search_table(search_text);
});

$(document).on("click", "#search-quote-btn", function (e) {
	e.preventDefault();
	var filters = $("#search-filter-form").serializeArray();
	var search_text = "";
	table_filter = {};
	filters.forEach(function ({ name, value }) {
		if (name == "search") {
			search_text = value;
		} else if (value) {
			table_filter[name] = value;
		}
	});
	load_search_quote_table(search_text);
});

// $(document).on("click", ".selected-row", function (e) {
// 	e.preventDefault();
// 	add_autocomplete_sel(
//         "#client_code",
//         "clients",
//         ["client_code"],
//         null,
//         null,
//         "offcanvasRight",
//         $(this).val(),
//     );
// });

// Unbind the click event
$(document).off("click", "#select-btn");
$(document).on("click", "#select-btn", function (e) {
	var callback_fn = $(this).data("callback-fn");
	var element = $(this).data("element");
	let id = $(".selected-row[type='radio']:checked").val();
    const ids = $('.selected-row[type="checkbox"]:checked').map((_, el) => el.value).get();
    const descriptions = $('.selected-rows:checked').map((_, el) => el.value).get();

	var selected_sor_rows = $(".selectedsors:checked")
		.map((i, e) => e.value)
		.get();
	var selected_job_rows = $(".selectedjobs:checked")
		.map((i, e) => e.value)
		.get();
	
	console.log(selected_job_rows);
	if (typeof callback_fn !== "undefined" && id) {
		if (typeof window[callback_fn] == "function" && window[callback_fn].length == 1) {
			window[callback_fn](id);
		} else if (typeof window[callback_fn] == "function" && window[callback_fn].length == 2) {
            window[callback_fn](id, element);
        }
	}else if (typeof callback_fn !== "undefined" && ids.length > 0) {
		if (typeof window[callback_fn] == "function" && window[callback_fn].length == 1) {
			window[callback_fn](ids);
		} else if (typeof window[callback_fn] == "function" && window[callback_fn].length == 2) {
            window[callback_fn](ids, element);
        }
	} else if(descriptions.length) {
        var desc = descriptions.join('\n');
        var desc = $('#'+element).val() ? $('#'+element).val() + '\n' + desc : desc;
        $('#'+element).val(desc);
    }else if(selected_sor_rows.length) {
		$(".selectedsors:checked").each(function () {
			const sorId = this.value;
		
			// Avoid duplicates
			if ($('#quotation_sor_datatables #' + sorId).length > 0) return;
		
			const sorCode = $(this).data('sor_code');
			const desc = $(this).data('desc');
			const price = parseFloat($(this).data('price'));
			const quantity = 1;
		
			const rowHtml = renderRow(sorId, sorCode, desc, quantity, price);
			$('#quotation_sor_datatables tbody').append(rowHtml);
		});	
	recalculateTotals();

	}else if(selected_job_rows.length) {
			const jobId = selected_job_rows;
			const invoiceId = $(".selectedjobs:checked").first().data('invoice_id');
			console.log(invoiceId);
			console.log(jobId);
			const params = {
				job_id: jobId,
				invoice_id: invoiceId,
			};
			ajs.ajax_form(
				site_url + "invoice/update/",
				params,
				"POST",
				null, "0", "1"
			, function (response) {
            //console.log(response);
            if (response.status == false) {
				Swal.showValidationMessage(`
					title: "Validation Error",
					icon: "error",
					text: ${response.message},
				`);
			}else if(response.status == true){
				Swal.fire({
					title: `Success!!`,
					icon: "success",
					text: response.message
				});
				window.location.reload();
			}
        });
			// Avoid duplicates			
			
		ajs.refreshDataTable();
	}
});

function renderRow(sorId, sorCode, desc, quantity, price) {
    let rowTotal = (quantity * price).toFixed(2);
    return `
        <tr id="${sorId}">
			<input type="hidden" name="is_new_sor_added[]" value="1">
			<input type="hidden" name="quote_sor_id[]" value="">
            <input type="hidden" class="sor_id" name="sor_ids[]" value="${sorId}">
            <td>${sorCode}</td>
            <td>${desc}</td>
            <td><input type="number" min="1" name="quantity[]" class="form-control w-50 quote_qty quantity" style="text-align: right;" value="${quantity}"></td>
            <td><input type="number" name="price[]" class="form-control w-50 quote_price price" style="text-align: right;" value="${price}"></td>
            <td class="row-total">£${rowTotal} <input type="hidden" name="total[]" value="${rowTotal}"></td>
            <td><button type="button" class="remove-quote-item-btn btn btn-danger popup-add-btn" data-remove="quotation-sors"><i class="ri-close-line"></i></button></td>
        </tr>
    `;
}

$(document).on("click", "#check-all", function () {    
	if ($(this).is(":checked")) {
		$(this).closest(".dataTables_wrapper").find(".form-check-input").prop("checked", true);
	} else {
		$(this).closest(".dataTables_wrapper").find(".form-check-input").prop("checked", false);
	}
});

$(document).on("click", "#save-item-btn", function () {
	var checked_rows = $(".modal-datatable tbody")
		.find("tr")
		.has(".form-check-input:checked")
		.clone();
	//$("#kit-items").html("");
	var selected_rows = $("#table-items .item-id")
		.map((i, e) => e.value)
		.get();
	checked_rows.each(function (index) {
		const id = $(this).find(".item-id").val();

		if (selected_rows.includes(id)) {
			// continue
		} else {
			selected_rows.push(id);
			$(this)
				.find("td:first")
				.addClass("hide")
				.html(function (i, oldHTML) {
					return oldHTML.replaceAll("{{key}}", index);
				});
			//get_custom_fields
			var custom_fields_fn = $("#table-items").data("custom-field-fn");
			var custom_field = "";
			if (typeof window[custom_fields_fn] == "function") {
				custom_field = window[custom_fields_fn](index);
			}

			$(this).append(
				custom_field +
					'<td class="text-end pe-0"><button type="button" class="btn btn-danger delete-item popup-add-btn"><i class=" ri-close-line "></i></button></td>'
			);

			$("#table-items").append($(this).prop("outerHTML"));
		}
	});
});

$(document).on("click", ".delete-item", function () {
	$(this).closest("tr").remove();
});

$(document).on("click", "#save-kit-btn", function () {
	var checked_rows = $(".modal-kit-datatable .form-check-input:checked")
		.map((i, e) => e.value)
		.get();
	var exists_rows = $("#table-items .item-id")
		.map((i, e) => e.value)
		.get();

	const params = {
		supplier_id: $("#supplier_id").val(),
		kit_ids: checked_rows,
	};

	ajs.ajax_form(
		site_url + "kit/get-items/",
		params,
		"GET",
		null,
		"0",
		"0",
		rander_po_items,
		rander_po_items,
		exists_rows
	);
});

function rander_po_items(result_json, exists_rows) {
	if (ajs_form_handler.check_result(result_json)) {
		var stocks = result_json.data;
		$.each(stocks, function (index, stock) {
            if(exists_rows.includes(stock.stock_id.toString())) {
                console.log('exists');                
			} else {
				var row = "";
				row +=
					`<tr><td class='hide'> 
                        <input type="hidden" name="items[` +
					index +
					`][stock_id]" value="` +
					stock.stock_id +
					`" class="item-id">
                        <input type="hidden" name="items[` +
					index +
					`][supplier_price]" value="` +
					stock.price +
					`" class="item-id">
                        <input type="hidden" name="items[` +
					index +
					`][id]" value="0"></td>
                    <td>` +stock.manuf_part_no +`</td>
                    <td>` +stock.name +`</td>
                    <td class="text-capitalize">` +stock.type +`</td>
                    <td>` +stock.price +`</td>`;

				//get_custom_fields
				var custom_fields_fn = $("#table-items").data("custom-field-fn");
				if (typeof window[custom_fields_fn] == "function") {
					row += window[custom_fields_fn](index, stock.quantity);
				}

				row +=
					'<td><button type="button" class="btn btn-danger delete-item popup-add-btn"><i class=" ri-close-line "></i></button></td></tr>';

				$("#table-items").append(row);
			}
		});
	} else {
		ajs_form_handler.show_errors_offcanvas(result_json);
	}
}


$(function () {
    // if($('#datatable_buttons').length == 0) {
    //     $('.dataTables_wrapper').before('<div class="colvis-fixed-container" id="datatable_buttons"></div>');
    // }
    
    $(document).on("click", ".buttons-columnVisibility", function () {
        if(dataTable) {
            saveColumnVisibilityAndOrder(dataTable);
        }
    });
});

$(document).on('input', '.quote_qty, .quote_price', function () {
	let $row = $(this).closest('tr');

	let quantity = parseFloat($row.find('.quote_qty').val()) || 0;
	let price = parseFloat($row.find('.quote_price').val()) || 0;
	let rowTotal = quantity * price;

	// Update total cell
	$row.find('.row-total').html('£' + rowTotal.toFixed(2) + ' <input type="hidden" name="total[]" style="text-align: right;" value="' + rowTotal + '">');

	// Recalculate the full totals
	recalculateTotals();
});

function recalculateTotals() {
    let total = 0;
	console.log('recalculateTotals');
	const datatopass = {'var_type': 'system', 'var_name': 'vat'};
	var Vat = 20;
    ajs.ajax_form(site_url + "api/global_var/", datatopass, "POST", null, "0", "1", function (data) {		
		Vat = parseInt(data.message);
	});
    $('#quotation_sor_datatables tbody tr').each(function () {
		const $row = $(this);
		const id = parseFloat($row.find("input[name='quote_sor_id[]']").val()) || 0;
        const qty = parseFloat($row.find('.quote_qty').val()) || 0;
        const price = parseFloat($row.find('.quote_price').val()) || 0;
        const rowTotal = qty * price;
        total += rowTotal;
        $row.find('.row-total').html(`£${rowTotal.toFixed(2)} <input type="hidden" name="total[]" value="${rowTotal.toFixed(2)}">`);
	});

    let vat = total * (Vat / 100);
    let grandTotal = total + vat;

    $('#quotation_sor_datatables tfoot').html(`
        <tr><th colspan="3"></th><th>Net Price</th><th style="text-align: right;">£${total.toFixed(2)}</th><th></th><input type="hidden" name="net_total" value="${total.toFixed(2)}"></tr>
        <tr><th colspan="3"></th><th>VAT(${Vat}%)</th><th style="text-align: right;">£${vat.toFixed(2)}</th><th></th><input type="hidden" name="vat" value="${vat.toFixed(2)}"></tr>
        <tr><th colspan="3"></th><th>Total</th><th style="text-align: right;">£${grandTotal.toFixed(2)}</th><th></th><input type="hidden" name="grand_total" value="${grandTotal.toFixed(2)}"></tr>
    `);
}