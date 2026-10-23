/**
 * Havering — standard job code mapping.
 *
 * Lets an operator link each AJS service to the Open Housing standard job code
 * the Log Job interface should send. Reads/writes api/havering/code-map, which
 * is the exact hav_code_map domain ('std_job_code') the outbound send resolves
 * at enqueue time — so a change here changes what the live interface sends.
 *
 * One-to-one: assigning a service that is already on another row moves it here
 * (the backend clears the old row), and the table reflects that after save.
 */
(function () {
    'use strict';

    var BASE = (typeof site_url !== 'undefined' ? site_url : '');
    var API  = { codeMap: BASE + 'api/havering/code-map' };

    var rows     = [];   // [{id, hav_code, hav_description, notes, ajs_value, ajs_service_title, ajs_value_orphaned}]
    var services = [];   // [{id, service_code, title}]
    var filters  = { q: '', contract: '', state: '' };

    function esc(s) { return $('<div>').text(s == null ? '' : String(s)).html(); }

    function toast(icon, msg) {
        if (typeof Swal !== 'undefined') {
            Swal.fire({ toast: true, position: 'top-end', icon: icon,
                title: msg, showConfirmButton: false, timer: 3200 });
        }
    }

    // Build the <select> of AJS services for one row, with the mapped one picked.
    function serviceSelect(row) {
        var $sel = $('<select>', {
            'class': 'form-select form-select-sm svc-select',
            'data-id': row.id
        });
        $sel.append('<option value="">&mdash; not mapped &mdash;</option>');

        var current = (row.ajs_value == null ? '' : String(row.ajs_value));
        var found   = false;

        services.forEach(function (s) {
            var code = String(s.service_code);
            var opt  = $('<option>', { value: code }).text(s.title + ' (' + code + ')');
            if (current !== '' && code.toLowerCase() === current.toLowerCase()) {
                opt.prop('selected', true);
                found = true;
            }
            $sel.append(opt);
        });

        // A mapped service that no longer exists as an active AJS service:
        // keep it visible (selected) so nothing is silently lost.
        if (current !== '' && !found) {
            $sel.append($('<option>', { value: current, selected: true })
                .text(current + ' — service not found'));
        }
        return $sel;
    }

    function contractBadge(notes) {
        if (!notes) { return '<span class="text-muted">&mdash;</span>'; }
        return '<span class="badge bg-info-subtle text-info">' + esc(notes) + '</span>';
    }

    function matches(row) {
        if (filters.contract && String(row.notes || '') !== filters.contract) { return false; }
        var mapped = (row.ajs_value != null && String(row.ajs_value) !== '');
        if (filters.state === 'mapped' && !mapped) { return false; }
        if (filters.state === 'unmapped' && mapped) { return false; }
        if (filters.q) {
            var hay = (String(row.hav_code || '') + ' ' + String(row.hav_description || '') + ' ' +
                       String(row.ajs_value || '') + ' ' + String(row.ajs_service_title || '')).toLowerCase();
            if (hay.indexOf(filters.q.toLowerCase()) === -1) { return false; }
        }
        return true;
    }

    function render() {
        var $tb = $('#cm-rows').empty();
        var shown = 0;

        rows.forEach(function (row) {
            if (!matches(row)) { return; }
            shown++;

            var mapped = (row.ajs_value != null && String(row.ajs_value) !== '');
            var $tr = $('<tr>', { 'data-id': row.id });
            if (!mapped) { $tr.addClass('is-unmapped'); }

            $tr.append('<td>' + contractBadge(row.notes) + '</td>');
            $tr.append('<td><code class="oh">' + esc(row.hav_code) + '</code></td>');
            $tr.append('<td class="text-wrap">' + esc(row.hav_description || '') +
                (row.ajs_value_orphaned
                    ? ' <span class="badge bg-danger-subtle text-danger ms-1">mapped service missing</span>'
                    : '') + '</td>');

            var $svcTd = $('<td>').append(serviceSelect(row));
            $tr.append($svcTd);
            $tr.append('<td class="text-center"><span class="save-flash" style="visibility:hidden;"><i class="ri-check-line"></i></span></td>');

            $tb.append($tr);
        });

        if (shown === 0) {
            $tb.append('<tr><td colspan="5" class="text-center text-muted py-4">No standard job codes match these filters.</td></tr>');
        }
        $('#cm-count').text(shown + ' of ' + rows.length + ' shown');
    }

    function tally() {
        var total = rows.length, mapped = 0;
        rows.forEach(function (r) { if (r.ajs_value != null && String(r.ajs_value) !== '') { mapped++; } });
        $('#cm-total').text(total);
        $('#cm-mapped').text(mapped);
        $('#cm-unmapped').text(total - mapped);
    }

    function populateContractFilter() {
        var seen = {}, $c = $('#cm-contract');
        $c.find('option:not(:first)').remove();
        rows.forEach(function (r) {
            var n = String(r.notes || '');
            if (n && !seen[n]) { seen[n] = true; $c.append($('<option>', { value: n }).text(n)); }
        });
    }

    function load() {
        if (typeof ajaxWithRefresh !== 'function') { return; }
        $('#cm-rows').html('<tr><td colspan="5" class="text-center text-muted py-4">Loading&hellip;</td></tr>');

        ajaxWithRefresh({ url: API.codeMap, method: 'GET', dataType: 'json' })
            .then(function (r) {
                rows     = (r && r.rows) ? r.rows : [];
                services = (r && r.services) ? r.services : [];
                populateContractFilter();
                tally();
                render();
            })
            .catch(function () {
                $('#cm-rows').html('<tr><td colspan="5" class="text-center text-danger py-4">Could not load the mappings.</td></tr>');
            });
    }

    // Save one row. On success, reconcile local state (including the one-to-one
    // move: the service is removed from whichever other row held it).
    function save(id, serviceCode, $select) {
        var $tr = $select.closest('tr').addClass('row-saving');
        $select.prop('disabled', true);

        ajaxWithRefresh({
            url: API.codeMap, method: 'POST', dataType: 'json',
            data: { id: id, service_code: serviceCode }
        }).then(function (r) {
            if (!r || !r.status) {
                throw (r && r.message) ? { responseJSON: r } : {};
            }

            // Apply to local model: clear this service from any other row (1-to-1).
            if (serviceCode !== '') {
                rows.forEach(function (row) {
                    if (String(row.id) !== String(id) &&
                        row.ajs_value != null &&
                        String(row.ajs_value).toLowerCase() === serviceCode.toLowerCase()) {
                        row.ajs_value = null;
                        row.ajs_service_title = null;
                        row.ajs_value_orphaned = false;
                    }
                });
            }
            rows.forEach(function (row) {
                if (String(row.id) === String(id)) {
                    row.ajs_value = (serviceCode === '' ? null : serviceCode);
                    row.ajs_service_title = r.service_title || null;
                    row.ajs_value_orphaned = false;
                }
            });

            tally();
            // Flash a tick on the saved row, then re-render (filters + other rows).
            var $flash = $tr.find('.save-flash').css('visibility', 'visible');
            toast('success', r.message || 'Saved.');
            setTimeout(function () { render(); }, 650);
        }).catch(function (xhr) {
            var msg = (xhr && xhr.responseJSON && xhr.responseJSON.message) || 'Could not save that mapping.';
            toast('error', msg);
            render(); // revert the select to the stored value
        });
    }

    function debounce(fn, ms) {
        var t; return function () { clearTimeout(t); t = setTimeout(fn, ms); };
    }

    $(function () {
        $('#hav-cm-refresh').on('click', load);

        $('#cm-q').on('input', debounce(function () {
            filters.q = $('#cm-q').val().trim(); render();
        }, 200));
        $('#cm-contract').on('change', function () { filters.contract = $(this).val(); render(); });
        $('#cm-state').on('change', function () { filters.state = $(this).val(); render(); });
        $('#cm-clear').on('click', function () {
            filters = { q: '', contract: '', state: '' };
            $('#cm-q').val(''); $('#cm-contract').val(''); $('#cm-state').val('');
            render();
        });

        // Save on select change (delegated — rows are re-rendered often).
        $('#cm-rows').on('change', 'select.svc-select', function () {
            var $sel = $(this);
            save($sel.data('id'), $sel.val() || '', $sel);
        });

        load();
    });
})();
