/*
 * Property alert row editor — shared between the full Property Add/Edit form
 * (datatables/property.js) and the quick-edit popup on the Job / Task screens
 * (datatables/jobs/job.js).
 *
 * Rows are cloned from the hidden `.alerts_input_field_div` template and appended to
 * `#property_alert_form`; the add/remove buttons are handled globally in app/interface.js.
 */

var residentAlertFilter = {type: "RESIDENT_ALERT"};

// The master-alert select2 must be anchored to whatever container the row lives in,
// otherwise the dropdown is clipped when the row sits inside a modal or offcanvas.
function resolvePropertyAlertParent($row) {
    var $modal = $row.closest('.modal');
    if ($modal.length && $modal.attr('id')) {
        return $modal.attr('id');
    }
    var $offcanvas = $row.closest('.offcanvas');
    if ($offcanvas.length && $offcanvas.attr('id')) {
        return $offcanvas.attr('id');
    }
    return 'offcanvasRight';
}

function toggleAlertMessageField($row) {
    initPropertyAlertRow($row);
}

function getResidentAlertOtherId() {
    var url = site_url + "master-alerts";
    var query_str = $.param(residentAlertFilter);
    var local_data_key = 'local_cache_' + url + '_' + query_str + '_select_data';
    var cached = localStorage.getItem(local_data_key);

    if (!cached) {
        return null;
    }

    try {
        var data = JSON.parse(cached);
        var match = data.find(function (item) {
            return String(item.text || '').trim().toLowerCase() === 'other - see notes';
        });
        return match ? String(match.id) : null;
    } catch (e) {
        return null;
    }
}

function residentAlertIdsIncludeOther(residentAlertIds) {
    var otherId = getResidentAlertOtherId();
    if (!otherId || !residentAlertIds) {
        return false;
    }
    return String(residentAlertIds).split(',').map(function (v) {
        return v.trim();
    }).indexOf(otherId) !== -1;
}

function residentAlertHasOther($select) {
    var otherId = getResidentAlertOtherId();
    var values = ($select.val() || []).map(String);

    if (otherId && values.indexOf(otherId) !== -1) {
        return true;
    }

    if ($select.hasClass('select2-hidden-accessible')) {
        var selected = $select.select2('data') || [];
        return selected.some(function (item) {
            return String(item.text || '').trim().toLowerCase() === 'other - see notes';
        });
    }

    return false;
}

function scheduleResidentAlertSync($row) {
    setTimeout(function () {
        syncResidentAlertFields($row);
    }, 0);
    setTimeout(function () {
        syncResidentAlertFields($row);
    }, 200);
}

function syncResidentAlertFields($row) {
    var $select = $row.find('.warning_message_select');
    var values = $select.val() || [];
    var $textarea = $row.find('.warning_message_text');
    var $hidden = $row.find('.resident_alert_ids_hidden');

    $hidden.val(values.length ? values.join(',') : '');

    if (residentAlertHasOther($select)) {
        $textarea.show().prop('disabled', false).attr('name', 'messages[]');
    } else {
        $textarea.hide().prop('disabled', false).attr('name', 'messages[]').val('');
    }
}

function initPropertyAlertRow($row, residentAlertIds, message) {
    var warningType = $row.find('.warning_type').val();
    var $textarea = $row.find('.warning_message_text');
    var $hidden = $row.find('.resident_alert_ids_hidden');
    var $select = $row.find('.warning_message_select');

    if (warningType === '1') {
        $select.show().prop('disabled', false);
        $hidden.prop('disabled', false).attr('name', 'master_alert_ids[]');
        $textarea.attr('name', 'messages[]').prop('disabled', false).val('');
        if (message) {
            $textarea.val(message);
        }
        if ($select.hasClass('select2-hidden-accessible')) {
            $select.select2('destroy');
        }
        if (message && residentAlertIdsIncludeOther(residentAlertIds)) {
            $textarea.show();
        } else {
            $textarea.hide();
        }
        select2_ajax(
                $select,
                site_url + "master-alerts",
                "description",
                residentAlertFilter,
                resolvePropertyAlertParent($row),
                residentAlertIds || null
                );
        $select.off('.residentAlertSync')
                .on('change.residentAlertSync select2:select.residentAlertSync', function () {
                    syncResidentAlertFields($row);
                })
                .on('select2:unselect.residentAlertSync', function (e) {
                    var otherId = getResidentAlertOtherId();
                    if (
                            (otherId && String(e.params.data.id) === otherId) ||
                            String(e.params.data.text || '').trim().toLowerCase() === 'other - see notes'
                            ) {
                        $textarea.val('');
                    }
                    syncResidentAlertFields($row);
                });
        scheduleResidentAlertSync($row);
    } else {
        $select.off('.residentAlertSync');
        if ($select.hasClass('select2-hidden-accessible')) {
            $select.select2('destroy');
        }
        $select.hide().prop('disabled', true).val(null);
        $hidden.prop('disabled', false).attr('name', 'master_alert_ids[]').val('');
        $textarea.show().prop('disabled', false).attr('name', 'messages[]');
        $textarea.val(message || '');
    }
}

// Clears the alert container and rebuilds one row per alert. Defaults target the full
// Property Add/Edit form; the quick-edit popup passes its own container/template names
// so the two editors can coexist in one document.
function populate_property_alert_rows(alerts, parent_div, input_div) {
    parent_div = parent_div || 'property_alert_form';
    input_div = input_div || 'alerts_input_field_div';

    $('#' + parent_div + ' .property-alert-row').remove();

    if (!alerts || !alerts.length) {
        return;
    }

    $.each(alerts, function (index, element) {
        var length = $('.' + input_div).length;
        var data = $("." + input_div + ":last").eq(0).clone();
        data.css('display', '');
        data.addClass(input_div + '_' + length);
        data.find('.warning_message_select').each(function () {
            if ($(this).hasClass('select2-hidden-accessible')) {
                $(this).select2('destroy');
            }
        });

        $('#' + parent_div).append(data);

        data.find('.warning_type').val(String(element.warning_type));
        data.find('.warning_status').val(String(element.status));
        initPropertyAlertRow(data, element.master_alert_ids, element.message);
        data.find('.warning_id').val(element.id);
        data.find('.warning_start').val(element.start_date);
        data.find('.warning_end').val(element.end_date);
        data.find("button.remove-parent-btn").attr("data-id", element.id);
        data.find("button.remove-parent-btn").attr("data-remove-url", site_url + "property/alert/delete/" + element.id);
    });
}
