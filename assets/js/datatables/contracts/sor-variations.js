var master_data_type = 'contract_sor';
var unitTable = null;

// capture clicked edit id
$(document).on('click', 'a.popup-form-button.svar-edit', function (e) {
    window._svar_edit_id = $(this).data('variation-id') || null;
    $('#edit_id').val(window._svar_edit_id);
});

// after load callbacks for edit popup
function edit_unit_variation_form() {
    sor_variations_create_form('edit');
    var id = $('#edit_id').val();
    var client_id = $('#client_id').val() || undefined;
    var contract_id = $('#contract_id').val() || undefined;
    if (!id) return;
    ajs.ajax_form(site_url + 'contract_sor_variation/get/' + id, null, 'GET', null, '0', '0', function(return_data){
        if (!return_data.status) return;
        var variation = return_data.data;
        if (!variation) return;
        $('#edit_id').val(variation.id);
        // set variation type and ensure radios are enabled so user can change type
        
        $('input[name="variation_type"][value="unit"]').prop('checked', true).trigger('change');
        $('input[name="variation_type"]').prop('disabled', true);
        $('#variation_type_hidden').val('unit');
        const job_type_id = variation?.units[0]?.job_type_id || null;
        select2_ajax('#job_type_id', site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null, 'offcanvasRight', job_type_id);

        // var sorIds = [];
        // if (variation.units && variation.units.length) {
        //     variation.units.forEach(function(u){
        //         if (u.sor_id) {
        //             u.sor_id.toString().split(',').map(function(x){return x.trim();}).forEach(function(s){ if (s && sorIds.indexOf(s) === -1) sorIds.push(s); });
        //         }
        //     });
        // }
        
        // initialize contract_sors select2 and then load/append the selected SORs (one-by-one)
        /* add_autocomplete_custom_dropdown('#contract_sors', site_url + 'sor/get_all_dropdown', ['sor_code'], {client_id: client_id, contract_id: contract_id}, 'offcanvasRight');
        if (sorIds.length) {
            // fetch each sor details and append as selected option
            sorIds.forEach(function(sid){
                if (!sid) return;
                ajs.ajax_form(site_url + 'sor/get/' + sid, null, 'GET', null, '0', '0', function(sd){
                    if (!sd || !sd.status) return;
                    var s = sd.message.data;
                    if (!s) return;
                    var $opt = $("<option selected='selected'></option>").val(s.id).text(s.sor_code);
                    // avoid duplicating
                    if ($('#contract_sors option[value="' + s.id + '"]').length === 0) {
                        $('#contract_sors').append($opt).trigger('change.select2');
                    } else {
                        $('#contract_sors option[value="' + s.id + '"]').prop('selected', true);
                        $('#contract_sors').trigger('change.select2');
                    }
                });
            });
        } */
        $('#unitRows').empty();
        if (variation.units && variation.units.length) {
            variation.units.forEach(function(u, index){
                var unitHtml = $($('#unitRowTemplate').html());
                unitHtml.find('.job_types').attr('id', 'job_type_id_' + index);
                unitHtml.find('.contract_sors').attr('id', 'contract_sors_' + index);
                unitHtml.find('.popup-form-search-button').attr('data-element', 'contract_sors_' + index);
                $('#unitRows').append(unitHtml);
                var $last = $('#unitRows .unit-row').last();
                select2_ajax('#job_type_id_' + index, site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null, 'offcanvasRight', u.job_type_id);
                let filters = {client_id: client_id, contract_id: contract_id, job_type_id: u.job_type_id || null};
                add_autocomplete_custom_dropdown('#contract_sors_' + index, site_url + 'sor/get_all_dropdown', ['sor_code'], filters, 'offcanvasRight', u.sor_id, null, site_url + 'sor/get/' + u.sor_id);
                $('#contract_sors_' + index).attr('data-filters', JSON.stringify(filters));
                $last.find('input[name="unit_from[]"]').val(u.unit_from);
                $last.find('input[name="unit_to[]"]').val(u.unit_to);
                $last.find('input[name="labour[]"]').val(u.labor_price);
                $last.find('input[name="sell[]"]').val(u.sell_price);
            });
        } else {
            $('#unitRows').append($('#unitRowTemplate').html());
        }
        setTimeout(function(){ reindexRows(); }, 200);
    }, function(){});
}

function initSorVariationsTable(limit)
{
    var page_limit = limit || ajs.datatable_limit;
    var contract_id = $('#contract_id_hidden').val() || $('#edit_id').val() || null;
    var sor_filter = $('#sor_filter').val() || '';

    if (unitTable) {
        unitTable.destroy();
        $('#sor-variations-datatables').empty();
    }
    ajs.ajax_form(site_url + 'contract/get/' + contract_id, null, 'GET', null, '0', '1', create_breadcrumb, create_breadcrumb, 'SOR Variations');
    unitTable = new DataTable('#sor-variations-datatables', {
        scrollY: (screen.height - 530) + 'px',
        serverSide: true,
        processing: true,
        paging: true,
        responsive: false,
        bDestroy: true,
        pageLength: page_limit,
        ajax: {
            url: site_url + 'contract_sor_variation/get_all/' + (contract_id ? contract_id : ''),
            method: 'GET',
            data: function (d) {
                // Request combined variations (one row per variation), allow optional type filter
                return $.extend({}, d, { display: 'combined', sor_id: $('#sor_filter').val(), variation_type: $('#type_filter').val() || '' });
            },
            dataSrc: function (json) {
                if (json.status) {
                    return json.rows || [];
                }
                return [];
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr, error, code) {
                ajs.datatable_error(xhr, 'sor-variations-datatables');
            }
        },
        columns: [
            { data: 'id', render: function(data, type, row){
                // console.log(row);
                    var contractHash = ajs.hash_encode(( $('#contract_id_hidden').val() || $('#edit_id').val() || null));
                    var variationId = row.id;
                    var editFunc = row.variation_type === 'uprn' ? 'edit_uprn_variation_form' : 'edit_unit_variation_form';
                    var editLink = '<a id="svar_edit_' + variationId + '" data-variation-id="' + variationId + '" data-after-load-func="' + editFunc + '" data-heading="Edit Sor Variation - #' + variationId + '" data-form-url="' + cdn_url + 'clients/'+ajs.hash_encode(row.client_id)+'/contract/sor_variations_edit/' + contractHash + '/' + ajs.hash_encode(variationId) + '" class="popup-form-button svar-edit" title="Edit">' + edit_icon() + '</a>';
                    var detail_icon = '<div class="details-control cursor-pointer" style="margin-left: 0px"><i class="ri-arrow-down-s-line align-bottom"></i></div>';
                    return editLink + detail_icon + ' <span class="ms-1">' + (data ? data : '') + '</span>';
                }
            },
            { data: 'variation_type', render: function(data, type, row){
                return ' <span class="ms-1">' + (data ? data.toUpperCase() : '') + '</span>';
                }
            },
            { data: 'sor_codes' },
            { data: 'created_date', render: function(d){ return d ? ajs.format_date(d) : ''; } }
        ],
        language: { emptyTable: 'No data found' }
    });

    // Ensure datatable-defaults.js (which expects global `dataTable`) can access this instance
    try {
        dataTable = unitTable;
    } catch (e) {
        // if strict mode or other issues prevent assignment, attach to window
        window.dataTable = unitTable;
    }
    unitTable.setDetailRow = function (rowData) {
        // Return a placeholder immediately and then fetch details async to populate it
        var html = `<div class="details-row detail-row-main-tbl row sor-variation-details" data-variation-id="${rowData.id}">
            <div class="col-12"><div class="text-muted">Loading details...</div></div>
        </div>`;

        // fetch full variation details and replace placeholder with constructed HTML
        setTimeout(function(){
            ajs.ajax_form(site_url + 'contract_sor_variation/get/' + rowData.id, null, 'GET', null, '0', '0', function(result){
                if (!result || !result.status) return;
                var v = result.data;
                var contentHtml = '';

                // Unit variation - show unit rows: from, to, material, labour, sell
                if ((v.variation_type && v.variation_type === 'unit') || (v.units && v.units.length)) {
                    var rows = '';
                    $.each(v.units || [], function(index, u){
                        rows += `<tr>
                                    <td>${u.job_type_code ?? ''}</td>
                                    <td>${u.sor_code ?? ''}</td>
                                    <td>${u.unit_from ?? ''}</td>
                                    <td>${u.unit_to ?? ''}</td>
                                    <td>${u.labor_price ?? ''}</td>
                                    <td>${u.sell_price ?? ''}</td>
                                </tr>`;
                    });
                    if (rows == '') rows = "<td colspan='5' align='center'> Data Not Available</td>";
                    contentHtml = `
                        <div class="details-row row unit-details-row">
                            <div class="col-md-2">
                                <p>Type: Unit</p>
                            </div>
                            <div class="col-md-10">
                                <table class="table mb-0">
                                    <thead>
                                        <tr>
                                        <th>Job Type</th>
                                        <th>SOR</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Labour</th>
                                        <th>Sell</th>
                                        </tr>
                                    </thead>
                                    <tbody>${rows}</tbody>
                                </table>
                            </div>
                        </div>
                    `;
                }

                var $container = $('.details-row.sor-variation-details[data-variation-id="' + rowData.id + '"]');
                if ($container.length) {
                    $container.html(contentHtml);

                    // Collect unique SOR and Property ids to fetch displayable values
                    var sorIds = [];
                    var propIds = [];
                    $container.find('.sor-cell').each(function(){ var sid = $(this).data('sor-id'); if (sid) sorIds.push(sid); });
                    $container.find('.property-cell').each(function(){ var pid = $(this).data('property-id'); if (pid) propIds.push(pid); });
                    sorIds = Array.from(new Set(sorIds));
                    propIds = Array.from(new Set(propIds));

                    // Fetch SOR codes and replace cells
                    sorIds.forEach(function(sid){
                        ajs.ajax_form(site_url + 'sor/get/' + sid, null, 'GET', null, '0', '0', function(sd){
                            if (!sd || !sd.status) return;
                            var s = sd.message && sd.message.data ? sd.message.data : (sd.data ? sd.data : null);
                            var code = s && s.sor_code ? s.sor_code : sid;
                            $container.find('.sor-cell[data-sor-id="'+sid+'"]').each(function(){ $(this).html(code); });
                        });
                    });
                }

            }, function(){});
        }, 50);

        return html;
    }
}

// init filters and tables
$(function() {
    // select2_ajax('#sor_filter', site_url + 'sor/get_all', 'sor_code', null);
    let client_id = $("#client_id").val() > 0 ? $("#client_id").val() : undefined;
    let contract_id = $("#contract_id").val() > 0 ? $("#contract_id").val() : undefined;
    // console.log(client_id, contract_id);
    add_autocomplete_custom_dropdown('#sor_filter', site_url + 'sor/get_all_dropdown', ["sor_code"], {'client_id': client_id, 'contract_id': contract_id});
    // initialize single listing table
    initSorVariationsTable();

    // search button reloads table
    $('#search_btn').on('click', function(e){ e.preventDefault();
        if (!unitTable) initSorVariationsTable(); else unitTable.draw();
    });

    // filter changes
    $('#sor_filter').on('change', function(){
        if (unitTable) unitTable.draw();
    });

    // type_filter acts as a server-side filter for variation type
    $('#type_filter').on('change', function(){
        if (unitTable) unitTable.draw();
    });
});






function sor_variations_create_form(type) {
    if (typeof type !== "undefined" && type == "edit") {
    } else {
        //let client_id = $("#client_id").val() > 0 ? $("#client_id").val() : undefined;
        let contract_id = $("#contract_id").val() > 0 ? $("#contract_id").val() : undefined;
        //const filters = {client_id: client_id, contract_id: contract_id};
        //add_autocomplete_custom_dropdown('#contract_sors_0', site_url + 'sor/get_all_dropdown', ["sor_code"], {'client_id': client_id, 'contract_id': contract_id, job_type_id: $('#job_type_id_0').val() || null}, 'offcanvasRight');

        //$('#contract_sors_0').attr('data-filters', JSON.stringify(filters));
        select2_ajax('#job_type_id_0', site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null, 'offcanvasRight');
        //add_autocomplete_custom_dropdown('#contract_sors_uprn_0', site_url + 'sor/get_all_dropdown', ["sor_code"], {'client_id': client_id, 'contract_id': contract_id}, 'offcanvasRight');
        //add_autocomplete_sel('#uprn_property_0', 'client_properties', ['uprn_no'], null, {client_id: client_id}, 'offcanvasRight', null);
    }
    
    if ($('#variationForm').length) {
        
        $.validator.addMethod('requiredIfActiveSection', function(value, element) {
            var mode = $('input[name="variation_type"]:checked').val();
            // If unit mode, only fields inside #unitSection are required
            if (mode === 'unit') {
                if ($(element).closest('#unitSection').length) {
                    return $.trim(value).length > 0 || (element.tagName.toLowerCase() === 'select' && $(element).val() && $(element).val().length > 0);
                }
                return true; // not in unit section
            }
            
            return true;
        }, 'Required field.');

        // Apply rules to classes so each element is validated individually
        $.validator.addClassRules('price-validation', { requiredIfActiveSection: true, number: true });
        $.validator.addClassRules('required-text', { requiredIfActiveSection: true });

        $('#variationForm').validate({
            onkeyup: false,
            rules: {
                'variation_type': { required: true },
                // 'contract_sors[]': {
                //     required: function() {
                //         return $('input[name="variation_type"]:checked').val() === 'unit';
                //     }
                // }
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
                // console.log('0000');
                // ensure at least one row exists for selected type
                var type = $('input[name="variation_type"]:checked').val();
                if ($('#unitRows .unit-row').length === 0) {
                    Swal.fire({
                        icon: "error",
                        text: 'Please add at least one Unit row.',
                    });
                    return false;
                }
                // reindex rows to ensure unique names/ids so errors are per-element
                
                //setTimeout(function(){ reindexRows(); }, 50);

                // Per-row validation: ensure no blank fields in any row
                var validator = $(form).validate();
                var invalid = false;
                if (type === 'unit') {
                    $('#unitRows .unit-row').each(function () {
                        var $r = $(this);
                        var $sor = $r.find('.contract_sors');
                        if (!validator.element($sor)) invalid = true;
                        var $job_type = $r.find('.job_types');
                        if (!validator.element($job_type)) invalid = true;
                        // check each input in the row: required text and price fields
                        $r.find('.required-text, .price-validation').each(function () {
                            if (!validator.element(this)) invalid = true;
                        });
                    });
                }

                if (invalid) {
                    Swal.fire({
                        icon: "error",
                        text: 'Please fix the highlighted errors before submitting.',
                    });
                    return false;
                }

                // Order-insensitive check for missing, overlapping or duplicate unit ranges
                if (type === 'unit') {
                    // previous visual highlights removed (no-op now)

                    var rows = [];
                    var rowErrors = [];

                    // collect ranges with original row index and inputs
                    $('#unitRows .unit-row').each(function(index){
                        var $r = $(this);
                        var $fromInput = $r.find('input[name*="unit_from"]');
                        var $toInput = $r.find('input[name*="unit_to"]');
                        var fromValRaw = $fromInput.val();
                        var toValRaw = $toInput.val();
                        var fromV = parseInt(String(fromValRaw).replace(/[^0-9\-]/g, ''), 10);
                        var toV = parseInt(String(toValRaw).replace(/[^0-9\-]/g, ''), 10);
                        if (isNaN(fromV) || isNaN(toV)) {
                            // skip rows with missing numeric values; they should be caught by other validation
                            return true;
                        }
                        rows.push({ from: fromV, to: toV, index: index, $fromInput: $fromInput, $toInput: $toInput });
                    });

                    // quick per-row check: from <= to
                    rows.forEach(function(r){
                        if (r.from > r.to) {
                            rowErrors.push('Row ' + (r.index+1) + ': unit from (' + r.from + ') > unit to (' + r.to + ')');
                        }
                    });

                    // sort by start value so checks are order-insensitive
                    var sorted = rows.slice().sort(function(a,b){ return a.from - b.from; });

                    var missingRanges = [];
                    var overlapErrors = [];
                    var duplicateObjs = [];

                    var prev = null;
                    var seen = {};
                    for (var i=0;i<sorted.length;i++) {
                        var cur = sorted[i];
                        var key = cur.from + '-' + cur.to;
                        if (seen[key]) {
                            // mark duplicate: cur is duplicate of seen[key]
                            duplicateObjs.push({row: cur.index, dupOf: seen[key]});
                        } else {
                            seen[key] = cur.index; // store original index
                        }

                        if (prev !== null) {
                            if (cur.from > prev.to + 1) {
                                // gap
                                missingRanges.push((prev.to + 1) + '-' + (cur.from - 1));
                            } else if (cur.from <= prev.to) {
                                // overlap
                                overlapErrors.push('Range ' + cur.from + '-' + cur.to + ' overlaps with ' + prev.from + '-' + prev.to);
                                // overlap detected between ranges; no input highlighting applied
                            }
                        }
                        prev = cur;
                    }

                    // highlight duplicates (mark both original and duplicate rows)
                    if (duplicateObjs.length) {
                        // duplicates detected; no input highlighting applied
                    }

                    var messages = [];
                    if (missingRanges.length) messages.push('Missing ranges: ' + missingRanges.join(', '));
                    if (overlapErrors.length) messages.push('Range errors: ' + overlapErrors.join('; '));
                    if (duplicateObjs.length) messages.push('Duplicate ranges found in rows: ' + duplicateObjs.map(function(d){ return (d.row+1) + ' (duplicate of ' + (d.dupOf+1) + ')'; }).join('; '));
                    if (rowErrors.length) messages.push(rowErrors.join('; '));

                    if (messages.length) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Unit range validation failed',
                            html: messages.join('</br>')
                        });
                        return false;
                    }
                }
                
                
                var sub_button = $(form).find(":submit");
                ajs.submit_button_element = sub_button;
                var action = $(form).attr("action");
                var method = $(form).attr("method");
                var post_data = $(form).serialize();
                // alert(action +  "\n" + method);
                ajs.ajax_form(action, post_data, method, null, "1", "1", ajs_form_handler.offcanvas_form, ajs_form_handler.offcanvas_form);

                return false;
            }
        });
    }    
}

function set_sor_id_variance(sor_id, element) {
    let client_id = $('#client_id').val() > 0 ? $('#client_id').val() : undefined;
    let contract_id = $('#contract_id').val() > 0 ? $('#contract_id').val() : undefined;
    let job_type_id = $("#" + element).closest('.unit-row').find('.job_types').val() || null;
    const filters = {client_id: client_id, contract_id: contract_id, job_type_id: job_type_id};
    add_autocomplete_custom_dropdown("#"+element, site_url + 'sor/get_all_dropdown', ['sor_code'], filters, 'offcanvasRight', sor_id, null, site_url + 'sor/get/' + sor_id);
    $("#" + element).attr('data-filters', JSON.stringify(filters));
}
    $(document).on('change', 'input[name="variation_type"]', function () {
        if (this.value === 'unit') {
            $('#unitSection').show();
            $('#uprnSection').hide();
        } else {
            $('#unitSection').hide();
            $('#uprnSection').show();
        }
        // Reset validation so errors from the other section are cleared
        if ($('#variationForm').length && $('#variationForm').data('validator')) {
            var validator = $('#variationForm').validate();
            validator.resetForm();
        }
        // re-sync SOR selections
        setTimeout(function(){ reindexRows(); }, 50);
    });    

    $(document).on('click', '#addUnitRow', function () {
        var unitRowCounter = Math.max(0, $('#unitRows .unit-row').length - 1);
        unitRowCounter++;
        var index = unitRowCounter;
        var unitHtml = $($('#unitRowTemplate').html());
        unitHtml.find('.job_types').attr('id', 'job_type_id_' + index);
        unitHtml.find('.contract_sors').attr('id', 'contract_sors_' + index);
        unitHtml.find('.unit-from').attr('id', 'unit_from_' + index);
        unitHtml.find('.unit-to').attr('id', 'unit_to_' + index);
        unitHtml.find('.labour').attr('id', 'labour_' + index);
        unitHtml.find('.sell').attr('id', 'sell_' + index);
        unitHtml.find('.popup-form-search-button').attr('data-element', 'contract_sors_' + index);
        $('#unitRows').append(unitHtml);
        $('.remove-unit').show();

        // initialize sor autocomplete using client/contract ids from the form
        //let client_id = $('#client_id').val() > 0 ? $('#client_id').val() : undefined;
        let contract_id = $('#contract_id').val() > 0 ? $('#contract_id').val() : undefined;
        //let filters = {client_id: client_id, contract_id: contract_id, job_type_id: $('#job_type_id_' + index).val() || null};

        select2_ajax('#job_type_id_' + index, site_url + 'service/contract_services_get_all/' + contract_id, 'service_code', null, 'offcanvasRight');
        // add_autocomplete_custom_dropdown('#contract_sors_' + index, site_url + 'sor/get_all_dropdown', ["sor_code"], filters, 'offcanvasRight');
        // $('#contract_sors_' + index).attr('data-filters', JSON.stringify(filters));


        // reindex so newly added inputs get unique names/ids
        //setTimeout(function(){ reindexRows(); }, 50);
    });

    $(document).on('change', '.job_types', function () {

        // initialize sor autocomplete using client/contract ids from the form
        let client_id = $('#client_id').val() > 0 ? $('#client_id').val() : undefined;
        let contract_id = $('#contract_id').val() > 0 ? $('#contract_id').val() : undefined;
        let filters = {client_id: client_id, contract_id: contract_id, job_type_id: $(this).val()};
        var sor_element = $(this).closest('.unit-row').find('.contract_sors').attr('id');
        if ($('#'+sor_element).hasClass('select2-hidden-accessible'))
        {
            $("#"+sor_element).select2("destroy");
            $('#'+sor_element).find('option:not(:first)').remove();
            $("#"+sor_element).empty();
        }
        add_autocomplete_custom_dropdown('#' + sor_element, site_url + 'sor/get_all_dropdown', ["sor_code"], filters, 'offcanvasRight');
        $('#' + sor_element).attr('data-filters', JSON.stringify(filters));
    });  

    $(document).on('click', '.remove-unit', function () {
        $(this).closest('.unit-row').remove();
        //reindexRows();
        if ($('#unitRows .unit-row').length === 1) {
            $('.remove-unit').hide();
        }
        //setTimeout(syncSorSelections, 50);
    });
    
    $('input[name="variation_type"]:checked').trigger('change');

    // reindex rows on init
    reindexRows();
    //setTimeout(syncSorSelections, 50);

    // Ensure SOR selections are exclusive between Unit and UPRN sections
    function getUnitSors() {
        var vals = $('#contract_sors').val();
        return Array.isArray(vals) ? vals : (vals ? [vals] : []);
    }
    function getUprnSors() {
        var vals = [];
        $('.contract_sors_uprn').each(function () {
            var v = $(this).val();
            if (v) vals.push(v.toString());
        });
        return vals;
    }

    function syncSorSelections() {
        var unitVals = getUnitSors();
        var uprnVals = getUprnSors();

        // Disable in unit select any option that appears in uprn selections
        $('#contract_sors option').each(function () {
            var v = $(this).val();
            if (v && uprnVals.indexOf(v.toString()) !== -1) {
                $(this).prop('disabled', true);
            } else {
                $(this).prop('disabled', false);
            }
        });
        // refresh select2 if used
        if ($('#contract_sors').data('select2')) {
            $('#contract_sors').trigger('change.select2');
        }

        // For each UPRN SOR select, disable options that appear in unit selection
        $('.contract_sors_uprn').each(function () {
            var $sel = $(this);
            $sel.find('option').each(function () {
                var v = $(this).val();
                if (v && unitVals.indexOf(v.toString()) !== -1) {
                    $(this).prop('disabled', true);
                } else {
                    $(this).prop('disabled', false);
                }
            });
            if ($sel.data('select2')) {
                $sel.trigger('change.select2');
            }
        });
    }

    // Reindex rows so each input/select has a unique name/id (so error labels are per-element)
    function reindexRows() {
        // Units
        // console.log('reindexRows called');
        $('#unitRows .unit-row').each(function(i){
            $(this).attr('data-unit-index', i);
            $(this).find('input.required-text').each(function(){
                var name = $(this).attr('name');
                if (name && name.indexOf('unit_from') !== -1) {
                    $(this).attr('name', 'unit_from['+i+']').attr('id', 'unit_from_'+i);
                } else if (name && name.indexOf('unit_to') !== -1) {
                    $(this).attr('name', 'unit_to['+i+']').attr('id', 'unit_to_'+i);
                }
            });
            $(this).find('input.price-validation').each(function(){
                var name = $(this).attr('name');
                if (name && name.indexOf('material') !== -1) {
                    $(this).attr('name', 'material['+i+']').attr('id', 'material_'+i);
                } else if (name && name.indexOf('labour') !== -1) {
                    $(this).attr('name', 'labour['+i+']').attr('id', 'labour_'+i);
                } else if (name && name.indexOf('sell') !== -1) {
                    $(this).attr('name', 'sell['+i+']').attr('id', 'sell_'+i);
                }
            });
        });

        // UPRN
        // $('#uprnRows .uprn-row').each(function(i){
        //     $(this).attr('data-uprn-index', i);
        //     var $prop = $(this).find('.uprn_property');
        //     if ($prop.length) $prop.attr('name', 'uprn_property['+i+']').attr('id', 'uprn_property_'+i);
        //     var $sor = $(this).find('.contract_sors_uprn');
        //     if ($sor.length) $sor.attr('name', 'contract_sors_uprn['+i+']').attr('id', 'contract_sors_uprn_'+i);
        //     $(this).find('input.price-validation').each(function(){
        //         var name = $(this).attr('name');
        //         if (name && name.indexOf('uprn_material') !== -1) {
        //             $(this).attr('name', 'uprn_material['+i+']').attr('id', 'uprn_material_'+i);
        //         } else if (name && name.indexOf('uprn_labour') !== -1) {
        //             $(this).attr('name', 'uprn_labour['+i+']').attr('id', 'uprn_labour_'+i);
        //         } else if (name && name.indexOf('uprn_sell') !== -1) {
        //             $(this).attr('name', 'uprn_sell['+i+']').attr('id', 'uprn_sell_'+i);
        //         }
        //     });
        // });
    }
    
