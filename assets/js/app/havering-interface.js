/**
 * Havering integration — single interface detail page.
 *
 * Loads api/havering/interface-detail/<code> and renders the interface meta,
 * all-time KPI counts, and the full file-processing history (with name / status
 * / date filters). Also lets the operator pause or resume this one interface.
 */
(function () {
    'use strict';

    var BASE = (typeof site_url !== 'undefined' ? site_url : '');
    var CODE = ($('#hav-iface-code').val() || '').trim();

    var API = {
        detail: BASE + 'api/havering/interface-detail/',
        iface:  BASE + 'api/havering/interface',
        send:   BASE + 'api/havering/interface-send'
    };

    var META = null;          // last-loaded interface meta
    var filterTimer = null;

    function esc(s) { return $('<div>').text(s == null ? '' : String(s)).html(); }
    function fmtNum(n) { return (n == null ? 0 : n).toLocaleString(); }

    function statusBadge(s) {
        var map = {
            healthy:  ['bg-success-subtle text-success', 'Healthy'],
            warning:  ['bg-warning-subtle text-warning', 'Warning'],
            critical: ['bg-danger-subtle text-danger',   'Critical'],
            // Theme "secondary" is a teal here — use dark text on a light pill.
            idle:     ['bg-light text-body border',      'Idle']
        };
        var m = map[s] || map.idle;
        return '<span class="badge ' + m[0] + ' rounded-pill">' + m[1] + '</span>';
    }

    function fileStatusBadge(s) {
        var map = {
            sent:     'bg-success-subtle text-success',
            parsed:   'bg-success-subtle text-success',
            built:    'bg-info-subtle text-info',
            received: 'bg-secondary-subtle text-secondary',
            partial:  'bg-warning-subtle text-warning',
            held:     'bg-warning-subtle text-warning',
            failed:   'bg-danger-subtle text-danger',
            rejected: 'bg-danger-subtle text-danger'
        };
        var cls = map[s] || 'bg-secondary-subtle text-secondary';
        return '<span class="badge ' + cls + ' text-capitalize">' + esc(s) + '</span>';
    }

    function transportLabel(t) {
        return { sftp_xml: 'SFTP · XML', sftp_csv: 'SFTP · CSV', api: 'API' }[t] || t;
    }
    function dirLabel(d) {
        return d === 'outbound' ? 'Outbound (AJS → Open Housing)' : 'Inbound (Open Housing → AJS)';
    }

    function currentFilters() {
        return {
            q:      $.trim($('#f-q').val()),
            status: $('#f-status').val(),
            from:   $('#f-from').val(),
            to:     $('#f-to').val()
        };
    }

    function renderMeta(m) {
        var rows = [
            ['Direction', dirLabel(m.direction)],
            ['Transport', transportLabel(m.transport)],
            ['Schedule', m.schedule || '—'],
            ['Last run', m.last_run || '—'],
            ['Health', statusBadge(m.last_status)],
            ['Enabled', (Number(m.status) === 1
                ? '<span class="text-success"><i class="ri-check-line align-middle"></i> Running</span>'
                : '<span class="text-danger"><i class="ri-pause-circle-line align-middle"></i> Paused</span>')]
        ];
        if (m.remote_path) { rows.push(['Remote path', '<span class="font-monospace fs-12">' + esc(m.remote_path) + '</span>']); }
        if (m.file_pattern) { rows.push(['File pattern', '<span class="font-monospace fs-12">' + esc(m.file_pattern) + '</span>']); }
        if (m.endpoint) { rows.push(['Endpoint', '<span class="font-monospace fs-12">' + esc(m.endpoint) + '</span>']); }

        var html = '';
        rows.forEach(function (r) {
            html += '<div class="hav-meta-row">' +
                '<span class="k">' + esc(r[0]) + '</span>' +
                '<span class="v">' + r[1] + '</span></div>';
        });
        if (Number(m.status) === 0 && m.halt_reason) {
            html += '<div class="hav-halt fs-12 mt-3"><i class="ri-pause-circle-line align-middle me-1"></i>' + esc(m.halt_reason) + '</div>';
        }
        if (m.notes) {
            html += '<div class="text-muted fs-12 mt-2">' + esc(m.notes) + '</div>';
        }
        $('#hav-meta').html(html);
    }

    function renderAction(m) {
        var paused = (Number(m.status) === 0);
        var btn = paused
            ? '<button class="btn btn-sm btn-soft-success" id="hav-toggle" data-action="resume"><i class="ri-play-line align-middle"></i> ' +
              (m.halt_reason ? 'Resume' : 'Enable') + '</button>'
            : '<button class="btn btn-sm btn-soft-secondary" id="hav-toggle" data-action="pause"><i class="ri-pause-line align-middle"></i> Pause</button>';
        // On-demand send for the outbound API queues (Log Job, Cancel Job, Log
        // Appointment and Cancel Appointment): pushes the pending rows to Open
        // Housing now and logs the request/response into the file history below.
        if (CODE === 'log_job' || CODE === 'cancel_job' ||
            CODE === 'log_appointment' || CODE === 'cancel_appointment' ||
            CODE === 'job_stage_import') {
            btn += ' <button class="btn btn-sm btn-primary ms-2" id="hav-send-queue">' +
                   '<i class="ri-send-plane-2-line align-middle"></i> Send pending to Open Housing</button>';
        }
        $('#hav-iface-action').html(btn);
    }

    function renderFiles(files) {
        $('#hav-files-count').text(files.length + ' file' + (files.length === 1 ? '' : 's'));
        if (!files.length) {
            $('#hav-files-rows').html('<tr><td colspan="7" class="text-center text-muted py-4">No files match these filters.</td></tr>');
            return;
        }
        var rows = '';
        files.forEach(function (f, i) {
            var errCls  = (Number(f.error_count) > 0) ? 'text-danger fw-medium' : 'text-muted';
            // API calls carry the request/response bodies; SFTP file rows don't.
            var hasBody = (f.request_body && String(f.request_body).length) ||
                          (f.response_body && String(f.response_body).length);
            var toggle  = hasBody
                ? '<a href="#" class="hav-file-toggle d-inline-block mt-1 fs-12" data-idx="' + i + '">' +
                  '<i class="ri-arrow-right-s-line align-middle"></i>View request &amp; response</a>'
                : '';

            rows += '<tr>' +
                '<td class="font-monospace fs-12">' + esc(f.file_name) + '</td>' +
                '<td class="text-muted fs-13">' + esc(f.processed_at || f.add_date || '—') + '</td>' +
                '<td class="text-end tabular">' + fmtNum(Number(f.row_count)) + '</td>' +
                '<td class="text-end tabular text-success">' + fmtNum(Number(f.ok_count)) + '</td>' +
                '<td class="text-end tabular ' + errCls + '">' + fmtNum(Number(f.error_count)) + '</td>' +
                '<td>' + fileStatusBadge(f.status) + '</td>' +
                '<td class="text-muted fs-12" style="white-space:normal;max-width:280px;">' + esc(f.message || '') + toggle + '</td>' +
            '</tr>';

            if (hasBody) {
                var body = '';
                if (f.request_body) {
                    body += '<div class="fs-12 text-muted mb-1">Request sent (password hidden)</div>' +
                        '<pre class="fs-12 border rounded p-2 mb-3" style="max-height:32vh;overflow:auto;white-space:pre-wrap;">' + esc(f.request_body) + '</pre>';
                }
                if (f.response_body) {
                    body += '<div class="fs-12 text-muted mb-1">Raw response from Open Housing</div>' +
                        '<pre class="fs-12 border rounded p-2 mb-0" style="max-height:32vh;overflow:auto;white-space:pre-wrap;">' + esc(f.response_body) + '</pre>';
                }
                rows += '<tr class="hav-file-detail d-none" data-idx="' + i + '">' +
                    '<td colspan="7" class="bg-light">' + body + '</td></tr>';
            }
        });
        $('#hav-files-rows').html(rows);
    }

    function load() {
        if (typeof ajaxWithRefresh !== 'function' || !CODE) { return; }
        ajaxWithRefresh({
            url: API.detail + encodeURIComponent(CODE),
            method: 'GET', dataType: 'json', data: currentFilters()
        }).then(function (d) {
            if (!d || !d.interface) {
                $('#hav-iface-name').text('Unknown interface');
                $('#hav-files-rows').html('<tr><td colspan="7" class="text-center text-danger py-4">This interface could not be found.</td></tr>');
                return;
            }
            META = d.interface;
            var k = d.kpis || {};

            $('#hav-iface-name').text(META.name);
            $('#hav-crumb').text(META.name);
            $('#hav-iface-sub').html(dirLabel(META.direction) + ' &middot; ' + esc(transportLabel(META.transport)) +
                (META.schedule ? ' &middot; ' + esc(META.schedule) : ''));

            $('#k-total').text(fmtNum(k.records_total));
            $('#k-processed').text(fmtNum(k.processed));
            $('#k-pending').text(fmtNum(k.pending));
            $('#k-failed').text(fmtNum(k.failed));
            $('#k-files').text(fmtNum(k.files_total));

            renderMeta(META);
            renderAction(META);
            renderFiles(d.files || []);
        }).catch(function () {
            $('#hav-files-rows').html('<tr><td colspan="7" class="text-center text-danger py-4">Failed to load interface data.</td></tr>');
        });
    }

    // Reload only the file list when a filter changes (KPIs are unfiltered, but
    // reloading the whole payload is cheap and keeps everything consistent).
    function reloadFilesDebounced() {
        clearTimeout(filterTimer);
        filterTimer = setTimeout(load, 250);
    }

    $(function () {
        load();
        $('#hav-refresh').on('click', load);

        $('#f-q').on('input', reloadFilesDebounced);
        $('#f-status, #f-from, #f-to').on('change', load);
        $('#f-clear').on('click', function () {
            $('#f-q').val('');
            $('#f-status').val('');
            $('#f-from').val('');
            $('#f-to').val('');
            load();
        });

        // Expand / collapse a call's request + response bodies.
        $('#hav-files-rows').on('click', '.hav-file-toggle', function (e) {
            e.preventDefault();
            var idx    = $(this).data('idx');
            var detail = $('#hav-files-rows').find('.hav-file-detail[data-idx="' + idx + '"]');
            var open   = !detail.hasClass('d-none');
            detail.toggleClass('d-none', open);
            $(this).find('i').toggleClass('ri-arrow-right-s-line', open).toggleClass('ri-arrow-down-s-line', !open);
        });

        // Send the pending Log Appointment queue to Open Housing now.
        $('#hav-iface-action').on('click', '#hav-send-queue', function () {
            var $btn = $(this);
            var original = $btn.html();
            $btn.prop('disabled', true).html('<i class="ri-loader-4-line align-middle"></i> Sending…');
            ajaxWithRefresh({
                url: API.send, method: 'POST', dataType: 'json',
                data: { interface_code: CODE }
            }).then(function (r) {
                var msg = (r && r.message) ? r.message : 'Queue sent.';
                var failed = r && r.summary && Number(r.summary.failed) > 0;
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        toast: true, position: 'top-end',
                        icon: failed ? 'warning' : 'success',
                        title: msg, showConfirmButton: false, timer: 3000
                    });
                }
                load(); // refresh the file history so the request/response rows show
            }).catch(function () {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({ toast: true, position: 'top-end', icon: 'error',
                        title: 'Could not send the queue.', showConfirmButton: false, timer: 3000 });
                }
                $btn.prop('disabled', false).html(original);
            });
        });

        // Pause / resume this interface.
        $('#hav-iface-action').on('click', '#hav-toggle', function () {
            var action = $(this).data('action');
            $(this).prop('disabled', true);
            ajaxWithRefresh({
                url: API.iface, method: 'POST', dataType: 'json',
                data: { interface_code: CODE, action: action }
            }).then(function () { load(); });
        });
    });
})();
