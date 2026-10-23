/**
 * Havering integration monitoring dashboard.
 *
 * Renders the KPI tiles, the interface tile-grid (every flow visible at once),
 * the error queue and recent alert emails from api/havering/dashboard, and
 * drives the operator actions: pausing/resuming a single interface, managing
 * who receives failure alerts, uploading a corrected file by hand, browsing and
 * filtering the SFTP folders, and testing the Open Housing API.
 *
 * Polls every 60s.
 */
(function () {
    'use strict';

    var BASE = (typeof site_url !== 'undefined' ? site_url : '');
    var APP  = (typeof cdn_url !== 'undefined' ? cdn_url : '');
    var API = {
        dashboard: BASE + 'api/havering/dashboard',
        settings:  BASE + 'api/havering/settings',
        recipient: BASE + 'api/havering/recipient',
        test:      BASE + 'api/havering/test-email',
        iface:     BASE + 'api/havering/interface',
        ifaceSend: BASE + 'api/havering/interface-send',
        upload:    BASE + 'api/havering/upload',
        record:    BASE + 'api/havering/record',
        outboundRetry: BASE + 'api/havering/outbound-retry',
        errorDismiss:    BASE + 'api/havering/error-dismiss',
        errorDismissAll: BASE + 'api/havering/error-dismiss-all',
        folders:   BASE + 'api/havering/folders',
        sftpDelete:   BASE + 'api/havering/sftp-delete',
        sftpDownload: BASE + 'api/havering/sftp-download',
        sftpUpload:   BASE + 'api/havering/sftp-upload',
        sftpMove:     BASE + 'api/havering/sftp-move',
        claimsReady:  BASE + 'api/havering/claims-ready',
        sendClaims:   BASE + 'api/havering/send-claims',
        claimJobs:    BASE + 'api/havering/claim-jobs',
        apiConfig:    BASE + 'api/havering/api-config',
        apiSettings:  BASE + 'api/havering/api-settings',
        apiSend:      BASE + 'api/havering/api-send'
    };

    // Example parameters per Open Housing API endpoint (mirrors the CLI test
    // files in havering/demo/api). The job numbers are the spec's examples and
    // almost certainly do not exist in the test system — swap in real ones.
    var API_SAMPLES = {
        log_job: {
            place_ref: '6122367', std_job_code: 'ELEC_EICRD', sub_location: 'ALL',
            client_code: 'HSG', client_ref: 'AJS-TEST-0001', priority: 'S',
            access: 'Knock loudly and wait', source: 'CONTR',
            long_description: 'AJS integration test - please ignore', element: ''
        },
        post_inspection:    { job_no: 'HAV001601651' },
        extension_of_time:  { job_no: 'HAV001601651', DateTime: '05/09/2026 12:00:00', Notes: 'AJS integration test - please ignore' },
        cancel_job:         { job_no: 'HAV001601651', abandon_reason: 'ERROR', date_abandoned: '04/08/2026', time_abandoned: '', appointment_abandonment_reason: '', abandonment_description: 'AJS integration test - please ignore' },
        log_appointment:    { job_no: 'HAV001601651', resource_group: 'AJS', resource: 'X', appointment_date: '15/09/2026', appointment_time: '16:00' },
        cancel_appointment: { job_no: 'HAV001601651', appointment_abandonment_reason: 'ERROR', appointment_type: 'REPINSP' }
    };

    var timer = null;
    var interfaces = [];
    // Claim tracker drill-down state (client-side search + pagination).
    var claimState = { jobs: [], status: '', page: 1, pageSize: 10, q: '' };

    function esc(s) {
        return $('<div>').text(s == null ? '' : String(s)).html();
    }

    function transportLabel(t) {
        return { sftp_xml: 'SFTP · XML', sftp_csv: 'SFTP · CSV', api: 'API' }[t] || t;
    }

    // Soft, filled status pill (matches the main dashboard's chips).
    function statusSoftBadge(s) {
        var map = {
            healthy:  ['bg-success-subtle text-success', 'Healthy'],
            warning:  ['bg-warning-subtle text-warning', 'Warning'],
            critical: ['bg-danger-subtle text-danger',   'Critical'],
            // Theme "secondary" is a teal here, so text-secondary on the subtle
            // bg is unreadable — use dark body text on a plain light pill.
            idle:     ['bg-light text-body border',      'Idle']
        };
        var m = map[s] || map.idle;
        return '<span class="badge ' + m[0] + ' rounded-pill">' + m[1] + '</span>';
    }

    // Direction chip — which way the data flows.
    function dirBadge(d) {
        return d === 'outbound'
            ? '<span class="badge bg-info-subtle text-info">AJS &rarr; OH</span>'
            : '<span class="badge bg-primary-subtle text-primary">OH &rarr; AJS</span>';
    }

    // Transport chip.
    function transportBadge(t) {
        return '<span class="badge bg-light text-body border">' + esc(transportLabel(t)) + '</span>';
    }

    // Small tinted icon tile for the first table column (clearly visible: a
    // solid-tinted square with a contrasting glyph).
    function ifaceIco(i) {
        var tint = (i.direction === 'outbound')
            ? 'bg-info-subtle text-info' : 'bg-primary-subtle text-primary';
        var icon = (i.transport === 'api') ? 'ri-plug-line'
                 : (i.direction === 'outbound') ? 'ri-upload-2-line' : 'ri-download-2-line';
        return '<span class="iface-ico ' + tint + ' me-2"><i class="' + icon + '"></i></span>';
    }

    function fmtNum(n) {
        return (n == null ? 0 : n).toLocaleString();
    }

    function fmtBytes(n) {
        if (n == null) { return '—'; }
        if (n < 1024) { return n + ' B'; }
        if (n < 1048576) { return (n / 1024).toFixed(1) + ' KB'; }
        return (n / 1048576).toFixed(1) + ' MB';
    }

    function fmtMtime(t) {
        return t ? new Date(t * 1000).toLocaleString() : '—';
    }

    function flash(sel, msg, ok) {
        $(sel).html('<span class="' + (ok ? 'text-success' : 'text-danger') + '">' + esc(msg) + '</span>');
    }

    /**
     * Compact result line for the dialogs. Deliberately avoids Bootstrap's
     * .alert classes: the theme styles those as full-width page banners.
     * kind: ok | warn | bad | busy
     */
    function resultLine(sel, msg, kind) {
        var style = {
            ok:   ['text-success',   'ri-checkbox-circle-line'],
            warn: ['text-warning',   'ri-error-warning-line'],
            bad:  ['text-danger',    'ri-close-circle-line'],
            busy: ['text-muted',     'ri-loader-4-line']
        }[kind] || ['text-muted', ''];

        $(sel).html(
            '<div class="d-flex align-items-start gap-2 fs-13 ' + style[0] + '">' +
                (style[1] ? '<i class="' + style[1] + '"></i>' : '') +
                '<span>' + esc(msg) + '</span>' +
            '</div>'
        );
    }

    // ------------------------------------------------------------------
    // Dashboard rendering
    // ------------------------------------------------------------------

    function render(d) {
        var s = d.summary || {};
        $('#kpi-healthy').text(s.interfaces_healthy || 0);
        $('#kpi-total').text(s.interfaces_total || 0);
        $('#kpi-processed-total').text(fmtNum(s.processed_total));
        $('#kpi-files-total').text(fmtNum(s.files_total));
        $('#kpi-in').text(fmtNum(s.records_in_today));
        $('#kpi-out').text(fmtNum(s.records_out_today));
        $('#kpi-pending').text(fmtNum(s.pending));
        $('#kpi-failed').text(fmtNum(s.failed));

        renderClaimKpis(d.claim_kpis || {});
        renderInterfaces(d.interfaces || []);
        renderErrors(d.errors || []);
        renderAlerts(d.alerts || []);

        $('#hav-synced').text('· synced ' + new Date().toLocaleTimeString());
    }

    // LBH claim / post-inspection KPI tiles. Each key is a hav_claim_status; the
    // count fills #claim-<status> and the tile drills into the job list.
    function renderClaimKpis(k) {
        ['awaiting', 'approved', 'claim_sent', 'claimed', 'failed'].forEach(function (st) {
            $('#claim-' + st).text(fmtNum(k[st] || 0));
        });
    }

    var CLAIM_LABELS = {
        awaiting:   'Awaiting Post-Inspection',
        approved:   'Post-Inspection Passed — Ready to Claim',
        claim_sent: 'Claim Sent — Awaiting Approval',
        claimed:    'Claim Approved — Fully Completed',
        failed:     'Post-Inspection Failed'
    };

    // Badge classes per status (site colours; mirror the tile colours).
    var CLAIM_BADGE = {
        awaiting:   'bg-info-subtle text-info border border-info',
        approved:   'bg-primary-subtle text-primary border border-primary',
        claim_sent: 'bg-warning-subtle text-warning border border-warning',
        claimed:    'bg-success-subtle text-success border border-success',
        failed:     'bg-danger-subtle text-danger border border-danger'
    };

    // Short 'YYYY-MM-DD HH:MM' date, or an em-dash for empty/zero dates.
    function fmtDate(v) {
        if (!v || v === '0000-00-00 00:00:00' || v === '0000-00-00') { return '—'; }
        var s = String(v);
        return esc(s.length >= 16 ? s.substring(0, 16) : s);
    }

    // Drill-down: slide the top panel down and list the LBH jobs at one status,
    // with client-side search + pagination over the loaded set.
    function openClaimJobs(status) {
        var label = CLAIM_LABELS[status] || status;
        $('#hav-claim-jobs-title').html('Jobs — <span class="badge ' + (CLAIM_BADGE[status] || 'bg-light text-body border') + '">' + esc(label) + '</span>');
        $('#hav-claim-jobs-sub').text('Loading…');
        $('#hav-claim-jobs-body').html('<div class="text-center text-muted py-5"><div class="spinner-border text-secondary" role="status"></div><div class="mt-2">Loading jobs…</div></div>');

        var el = document.getElementById('hav-claim-jobs-panel');
        if (el && typeof bootstrap !== 'undefined' && bootstrap.Offcanvas) {
            bootstrap.Offcanvas.getOrCreateInstance(el).show();
        }

        ajaxWithRefresh({ url: API.claimJobs + '/' + encodeURIComponent(status), method: 'GET', dataType: 'json' })
            .then(function (res) {
                var jobs = (res && res.jobs) || [];
                claimState = { jobs: jobs, status: status, page: 1, pageSize: 10, q: '' };
                $('#hav-claim-jobs-sub').text(jobs.length + ' job' + (jobs.length === 1 ? '' : 's'));
                $('#hav-claim-jobs-body').html(
                    '<div class="mb-3" style="max-width:380px;">' +
                        '<div class="input-group input-group-sm">' +
                            '<span class="input-group-text"><i class="ri-search-line"></i></span>' +
                            '<input id="hav-claim-search" type="text" class="form-control" placeholder="Search job or OH number…" autocomplete="off">' +
                        '</div>' +
                    '</div>' +
                    '<div id="hav-claim-list"></div>'
                );
                renderClaimList();
            })
            .catch(function () {
                $('#hav-claim-jobs-sub').text('');
                $('#hav-claim-jobs-body').html('<p class="text-center text-danger py-4 mb-0">Could not load the jobs. Please try again.</p>');
            });
    }

    // Render (or re-render) the filtered, paginated job list into #hav-claim-list.
    function renderClaimList() {
        var st = claimState.status;
        var q  = (claimState.q || '').trim().toLowerCase();
        var all = claimState.jobs || [];
        var jobs = q ? all.filter(function (j) {
            return String(j.code || '').toLowerCase().indexOf(q) !== -1
                || String(j.client_work_order || '').toLowerCase().indexOf(q) !== -1
                || String(j.hav_claim_ref || '').toLowerCase().indexOf(q) !== -1;
        }) : all;

        var total = jobs.length;
        if (!total) {
            $('#hav-claim-list').html('<div class="text-center text-muted py-5"><i class="ri-inbox-line fs-1 d-block mb-2 opacity-50"></i>' +
                (q ? 'No jobs match your search.' : 'No jobs in this state.') + '</div>');
            return;
        }

        var pageSize = claimState.pageSize;
        var pages = Math.max(1, Math.ceil(total / pageSize));
        if (claimState.page > pages) { claimState.page = pages; }
        if (claimState.page < 1) { claimState.page = 1; }
        var page = claimState.page;
        var start = (page - 1) * pageSize;
        var slice = jobs.slice(start, start + pageSize);

        var showRef    = (st === 'claim_sent' || st === 'claimed');
        var showSent   = (st === 'claim_sent' || st === 'claimed');
        var showReason = (st === 'failed');
        var canLink = (typeof ajs !== 'undefined' && ajs && typeof ajs.hash_encode === 'function');

        var head = '<tr><th class="ps-3">Job</th><th>OH Job No</th>' +
            (showRef ? '<th>Claim Ref</th>' : '') +
            (showSent ? '<th>Sent</th>' : '') +
            '<th>Updated</th>' +
            (showReason ? '<th>Reason</th>' : '') +
            '</tr>';

        var rows = slice.map(function (j) {
            var codeCell = esc(j.code || ('#' + j.id));
            if (canLink) {
                codeCell = '<a href="' + APP + 'job/details/' + ajs.hash_encode(j.id) + '" target="_blank" class="fw-medium">' + codeCell + ' <i class="ri-external-link-line fs-12"></i></a>';
            }
            return '<tr>' +
                '<td class="ps-3 font-monospace fs-13">' + codeCell + '</td>' +
                '<td class="font-monospace fs-13">' + esc(j.client_work_order || '—') + '</td>' +
                (showRef ? '<td class="font-monospace fs-12">' + esc(j.hav_claim_ref || '—') + '</td>' : '') +
                (showSent ? '<td class="fs-12 text-muted text-nowrap">' + fmtDate(j.hav_claim_sent_date) + '</td>' : '') +
                '<td class="fs-12 text-muted text-nowrap">' + fmtDate(j.updated_date) + '</td>' +
                (showReason ? '<td class="fs-12 text-muted">' + esc(j.hav_claim_detail || '—') + '</td>' : '') +
                '</tr>';
        }).join('');

        var from = start + 1, to = start + slice.length;
        var pager = '';
        if (pages > 1) {
            pager = '<button type="button" class="btn btn-sm btn-soft-secondary hav-claim-page" data-page="' + (page - 1) + '"' + (page <= 1 ? ' disabled' : '') + '>&laquo; Prev</button>' +
                    '<span class="mx-2 fs-13 text-muted align-middle">Page ' + page + ' of ' + pages + '</span>' +
                    '<button type="button" class="btn btn-sm btn-soft-secondary hav-claim-page" data-page="' + (page + 1) + '"' + (page >= pages ? ' disabled' : '') + '>Next &raquo;</button>';
        }

        $('#hav-claim-list').html(
            '<div class="table-responsive"><table class="table table-hover table-sm align-middle mb-0">' +
                '<thead class="table-light text-muted">' + head + '</thead><tbody>' + rows + '</tbody></table></div>' +
            '<div class="d-flex align-items-center mt-3 flex-wrap gap-2">' +
                '<span class="text-muted fs-12 flex-grow-1">Showing ' + from + '–' + to + ' of ' + total + '</span>' +
                '<div>' + pager + '</div>' +
            '</div>'
        );
    }

    // Every interface is one row in a full-width, clearly-labelled table, so
    // it's obvious which number is which. The whole row links to the detail
    // page; the action buttons stop the click from navigating.
    function renderInterfaces(ifaces) {
        interfaces = ifaces;
        $('#hav-iface-count').text(ifaces.length + ' flows');

        if (!ifaces.length) {
            $('#hav-iface-rows').html('<tr><td colspan="11" class="text-center text-muted py-4">No interfaces registered</td></tr>');
            return;
        }

        var rows = '';
        ifaces.forEach(function (i) {
            var pending = i.pending || 0, failed = i.failed || 0, done = i.done || 0;
            var paused  = (Number(i.status) === 0);
            var halted  = (paused && i.halt_reason);
            var detail  = APP + 'havering/interface/' + encodeURIComponent(i.code);

            var action = paused
                ? '<button class="btn btn-sm btn-soft-success hav-resume" data-code="' + esc(i.code) + '">' +
                  '<i class="ri-play-line align-middle"></i> ' + (halted ? 'Resume' : 'Enable') + '</button>'
                : '<button class="btn btn-sm btn-soft-secondary hav-pause" data-code="' + esc(i.code) + '">' +
                  '<i class="ri-pause-line align-middle"></i> Pause</button>';

            // On-demand send for the outbound API queues (Log Job, Cancel Job,
            // Log Appointment and Cancel Appointment): pushes the pending rows to
            // Open Housing now.
            var sendBtn = (i.code === 'log_job' || i.code === 'cancel_job' ||
                           i.code === 'log_appointment' || i.code === 'cancel_appointment' ||
                           i.code === 'job_stage_import')
                ? '<button class="btn btn-sm btn-primary hav-send me-1" data-code="' + esc(i.code) + '"' +
                  ' title="Send pending appointments to Open Housing">' +
                  '<i class="ri-send-plane-2-line align-middle"></i> Send</button> '
                : '';

            // Submit claim has its own on-demand action: build the claim file for
            // all approved jobs and drop it in outbound. Shows the ready count.
            if (i.code === 'submit_claim') {
                var cn = claimsReady.count || 0;
                sendBtn = '<button class="btn btn-sm btn-primary hav-send-claims-row me-1"' +
                    (cn === 0 ? ' disabled' : '') +
                    ' title="Submit claims for jobs approved by Open Housing">' +
                    '<i class="ri-send-plane-2-line align-middle"></i> Send claims' +
                    (cn > 0 ? ' (' + cn + ')' : '') + '</button> ';
            }

            var statusCell = statusSoftBadge(i.last_status) +
                (paused ? ' <span class="badge bg-danger-subtle text-danger rounded-pill">Paused</span>' : '');

            rows += '<tr class="hav-iface-row" data-href="' + detail + '" style="cursor:pointer;"' +
                    (halted ? ' title="Paused: ' + esc(i.halt_reason) + '"' : '') + '>' +
                '<td class="ps-3"><div class="d-flex align-items-center">' + ifaceIco(i) +
                    '<span class="fw-medium">' + esc(i.name) + '</span></div></td>' +
                '<td>' + dirBadge(i.direction) + '</td>' +
                '<td>' + transportBadge(i.transport) + '</td>' +
                '<td class="text-muted fs-13">' + (i.schedule ? esc(i.schedule) : '&mdash;') + '</td>' +
                '<td>' + statusCell + '</td>' +
                '<td class="text-end fw-medium tabular">' + fmtNum(done) + '</td>' +
                '<td class="text-end tabular ' + (pending ? 'text-warning fw-medium' : 'text-muted') + '">' + fmtNum(pending) + '</td>' +
                '<td class="text-end tabular ' + (failed ? 'text-danger fw-medium' : 'text-muted') + '">' + fmtNum(failed) + '</td>' +
                '<td class="text-end tabular text-muted">' + fmtNum(i.today || 0) + '</td>' +
                '<td class="text-muted fs-12 text-nowrap">' + (i.last_run ? esc(i.last_run) : 'never') + '</td>' +
                '<td class="text-end pe-3 text-nowrap">' + sendBtn + action +
                    ' <a href="' + detail + '" class="btn btn-sm btn-soft-primary hav-detail" title="Open detail">' +
                    '<i class="ri-arrow-right-line align-middle"></i></a></td>' +
            '</tr>';
        });
        $('#hav-iface-rows').html(rows);
    }

    function renderErrors(errs) {
        $('#hav-err-count').text(errs.length);
        $('#hav-err-clear-all').toggleClass('d-none', !errs.length);
        if (!errs.length) {
            $('#hav-errors').html('<div class="text-center text-muted py-4">' +
                '<i class="ri-checkbox-circle-line fs-24 d-block mb-1 text-success"></i>Nothing needs attention</div>');
            return;
        }
        var html = '';
        errs.forEach(function (e) {
            var ref = e.entity_ref || e.hav_job_no || '—';
            var sideCls = (e.status === 'failed') ? 'border border-danger text-danger' : 'border border-warning text-warning';

            // Inbound rows can be opened, corrected and re-applied (click the
            // row). Outbound rows have no editable staged payload, but a failed
            // outbound API call can be re-sent as-is with a per-row Retry button
            // (e.g. after enabling an interface that was paused when it failed).
            // Either kind can be removed from the queue with the per-row × button.
            var fixable   = (e.side === 'inbound');
            var retryable = (e.side === 'outbound');

            html += '<div class="border-bottom p-3' + (fixable ? ' hav-err-row" style="cursor:pointer;" data-id="' + e.id + '"' : '"') + '>' +
                '<div class="d-flex align-items-center mb-1">' +
                    '<span class="fw-medium font-monospace">' + esc(ref) + '</span>' +
                    '<span class="badge ' + sideCls + ' ms-2 text-uppercase">' + esc(e.status) + '</span>' +
                    '<span class="text-muted fs-11 ms-auto me-2">' + esc(e.add_date) + '</span>' +
                    '<button type="button" class="btn btn-sm btn-ghost-danger p-0 hav-err-dismiss" ' +
                        'title="Remove from this list" data-id="' + e.id + '" data-side="' + esc(e.side) + '">' +
                        '<i class="ri-close-line fs-16"></i></button>' +
                '</div>' +
                '<div class="text-muted fs-12">' + esc(e.interface_code) + ' · ' + esc(e.side) +
                    (e.source_file ? ' · ' + esc(e.source_file) : '') + '</div>' +
                '<div class="fs-13 mt-1">' + esc(e.last_error) + '</div>' +
                (fixable ? '<div class="fs-12 mt-2 text-primary"><i class="ri-edit-line align-middle"></i> Click to review and fix</div>' : '') +
                (retryable ? '<div class="mt-2"><button class="btn btn-sm btn-soft-primary hav-retry" data-id="' + e.id + '">' +
                    '<i class="ri-refresh-line align-middle"></i> Retry</button></div>' : '') +
            '</div>';
        });
        $('#hav-errors').html(html);
    }

    // Remove one needs-attention item (soft-delete server-side), then refresh.
    function dismissError(id, side, $btn) {
        if ($btn) { $btn.prop('disabled', true); }
        ajaxWithRefresh({
            url: API.errorDismiss, method: 'POST', dataType: 'json', data: { id: id, side: side }
        }).then(function () {
            load();
        }).catch(function () {
            if ($btn) { $btn.prop('disabled', false); }
        });
    }

    // Remove every item currently in the needs-attention queue.
    function dismissAllErrors() {
        if (typeof Swal === 'undefined') {
            ajaxWithRefresh({ url: API.errorDismissAll, method: 'POST', dataType: 'json' }).then(load);
            return;
        }
        Swal.fire({
            title: 'Clear all items?',
            text: 'This removes every item from the Needs attention list. It does not un-send or re-run anything.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, clear all',
            confirmButtonColor: '#f06548'
        }).then(function (res) {
            if (res.isConfirmed) {
                ajaxWithRefresh({ url: API.errorDismissAll, method: 'POST', dataType: 'json' }).then(load);
            }
        });
    }

    // ------------------------------------------------------------------
    // Fixing one rejected record
    // ------------------------------------------------------------------

    var currentRecordId = null;

    function openRecord(id) {
        currentRecordId = id;
        $('#rec-result').empty();
        $('#rec-payload').val('Loading…').prop('disabled', true);
        $('#hav-record-modal').modal('show');

        ajaxWithRefresh({ url: API.record + '/' + id, method: 'GET', dataType: 'json' })
            .then(function (d) {
                var r = d.record || {};
                $('#rec-ref').text(r.entity_ref || '');
                $('#rec-error').text(r.last_error || '');
                $('#rec-iface').text(r.interface_code || '—');
                $('#rec-file').text(r.source_file || '—').attr('title', r.source_file || '');
                $('#rec-row').text(r.source_row == null ? '—' : r.source_row);
                $('#rec-attempts').text(r.attempts == null ? '—' : r.attempts);
                $('#rec-format-hint').text(r.payload_format === 'xml'
                    ? '(XML — one <Location> element)'
                    : '(JSON array of the CSV column values)');
                $('#rec-payload').val(r.raw_payload || '').prop('disabled', false);
            })
            .catch(function () {
                $('#rec-payload').val('').prop('disabled', false);
                flash('#rec-result', 'Could not load that record.', false);
            });
    }

    function recordAction(action, extra) {
        var payload = $.extend({ id: currentRecordId, action: action }, extra || {});
        var btns = $('#rec-save, #rec-retry, #rec-skip').prop('disabled', true);
        resultLine('#rec-result', 'Working…', 'busy');

        return ajaxWithRefresh({ url: API.record, method: 'POST', dataType: 'json', data: payload })
            .then(function (d) {
                resultLine('#rec-result', d.message, d.status ? 'ok' : 'warn');
                if (d.record) {
                    $('#rec-error').text(d.record.last_error || '');
                }
                load();
                if (d.status) {
                    setTimeout(function () { $('#hav-record-modal').modal('hide'); }, 1200);
                }
            })
            .catch(function (xhr) {
                var msg = (xhr && xhr.responseJSON && xhr.responseJSON.message) || 'That did not work.';
                resultLine('#rec-result', msg, 'bad');
            })
            .finally(function () { btns.prop('disabled', false); });
    }

    // Re-send one failed/held outbound API row now. The response is logged to
    // hav_file_log (so it shows on the interface's detail page) and, on success,
    // the row flips failed -> sent so "processed" ticks up by one.
    function retryOutbound(id, $btn) {
        var original = $btn.html();
        $btn.prop('disabled', true).html('<i class="ri-loader-4-line align-middle"></i> Retrying…');
        ajaxWithRefresh({
            url: API.outboundRetry, method: 'POST', dataType: 'json', data: { id: id }
        }).then(function (r) {
            var msg  = (r && r.message) ? r.message : (r && r.status ? 'Sent.' : 'Still failing.');
            var icon = (r && r.status) ? 'success' : (r && r.outcome === 'held' ? 'warning' : 'error');
            if (typeof Swal !== 'undefined') {
                Swal.fire({ toast: true, position: 'top-end', icon: icon,
                    title: msg, showConfirmButton: false, timer: 3500 });
            }
            load(); // refresh the queue + KPIs (the row drops off on success)
        }).catch(function (xhr) {
            var msg = (xhr && xhr.responseJSON && xhr.responseJSON.message) || 'Could not retry that item.';
            if (typeof Swal !== 'undefined') {
                Swal.fire({ toast: true, position: 'top-end', icon: 'error',
                    title: msg, showConfirmButton: false, timer: 3500 });
            }
            $btn.prop('disabled', false).html(original);
        });
    }

    function renderAlerts(alerts) {
        if (!alerts.length) {
            $('#hav-alert-rows').html('<tr><td colspan="6" class="text-center text-muted py-4">No alerts have been sent</td></tr>');
            return;
        }
        var typeLabel = {
            row_errors:    ['bg-warning-subtle text-warning', 'Records rejected'],
            file_rejected: ['bg-danger-subtle text-danger',   'File rejected'],
            test:          ['bg-secondary-subtle text-secondary', 'Test']
        };
        var rows = '';
        alerts.forEach(function (a) {
            var t = typeLabel[a.notify_type] || typeLabel.test;
            rows += '<tr>' +
                '<td class="text-muted">' + esc(a.add_date) + '</td>' +
                '<td>' + esc(a.interface_code) + '</td>' +
                '<td><span class="badge ' + t[0] + '">' + t[1] + '</span></td>' +
                '<td class="text-muted fs-13">' + esc(a.sent_to || '—') + '</td>' +
                '<td class="text-end">' + (Number(a.error_count) || 0) + '</td>' +
                '<td>' + (Number(a.sent) === 1
                    ? '<span class="text-success"><i class="ri-check-line align-middle"></i> Sent</span>'
                    : '<span class="text-danger"><i class="ri-close-line align-middle"></i> Failed</span>') + '</td>' +
            '</tr>';
        });
        $('#hav-alert-rows').html(rows);
    }

    function load() {
        if (typeof ajaxWithRefresh !== 'function') { return; }
        ajaxWithRefresh({ url: API.dashboard, method: 'GET', dataType: 'json' })
            .then(function (data) { render(data || {}); })
            .catch(function () {
                $('#hav-iface-rows').html('<tr><td colspan="11" class="text-center text-danger py-4">Failed to load dashboard data</td></tr>');
            });
        loadClaims();
    }

    // ------------------------------------------------------------------
    // Contractor claims (jobs approved by Open Housing, ready to submit)
    // ------------------------------------------------------------------
    var claimsReady = { count: 0, total: 0, jobs: [] };

    // Keep the "Send claims (N)" button on the Submit claim interface row in sync
    // with the ready count (the row is rebuilt on each dashboard refresh; this
    // updates it in between, when the claim count is fetched separately).
    function syncClaimsRowBtn() {
        var $b = $('.hav-send-claims-row');
        if (!$b.length) { return; }
        var n = claimsReady.count || 0;
        $b.prop('disabled', n === 0)
          .html('<i class="ri-send-plane-2-line align-middle"></i> Send claims' + (n > 0 ? ' (' + n + ')' : ''));
    }

    function loadClaims() {
        if (typeof ajaxWithRefresh !== 'function') { return; }
        ajaxWithRefresh({ url: API.claimsReady, method: 'GET', dataType: 'json' })
            .then(function (d) {
                claimsReady = { count: (d && d.count) || 0, total: (d && d.total) || 0, jobs: (d && d.jobs) || [] };
                syncClaimsRowBtn();
            })
            .catch(function () { /* leave the button as-is on a transient error */ });
    }

    function sendClaims() {
        if (!claimsReady.count) { return; }
        var rows = claimsReady.jobs.map(function (j) {
            return '<tr><td class="text-start font-monospace fs-12">' + esc(j.oh_no) + '</td>' +
                   '<td class="text-center fs-12">' + esc(j.sor_count) + '</td>' +
                   '<td class="text-end fs-12">£' + Number(j.total).toFixed(2) + '</td></tr>';
        }).join('');
        var html = '<div class="text-start">' +
            '<p class="fs-13 mb-2">Submit claims for <b>' + claimsReady.count + '</b> job' +
            (claimsReady.count === 1 ? '' : 's') + ' approved by Open Housing? ' +
            'A single claim file (one line per SOR) will be placed in the SFTP outbound folder for collection.</p>' +
            '<div style="max-height:260px;overflow:auto;"><table class="table table-sm mb-1"><thead><tr>' +
            '<th class="text-start">Job</th><th class="text-center">SORs</th><th class="text-end">Net total</th>' +
            '</tr></thead><tbody>' + rows + '</tbody></table></div>' +
            '<div class="d-flex justify-content-between border-top pt-2"><span><b>Total (net)</b></span>' +
            '<span class="fw-bold">£' + Number(claimsReady.total).toFixed(2) + '</span></div></div>';

        var doSend = function () {
            ajaxWithRefresh({ url: API.sendClaims, method: 'POST', dataType: 'json' })
                .then(function (d) {
                    if (typeof Swal !== 'undefined') {
                        if (d && d.status) {
                            Swal.fire({ icon: 'success', title: 'Claims sent', text: (d && d.message) || 'Claim file sent to Open Housing.' });
                        } else {
                            Swal.fire({ icon: 'warning', title: 'Not sent', text: (d && d.message) || 'No claims were sent.' });
                        }
                    }
                    loadClaims(); load();
                })
                .catch(function (xhr) {
                    var msg = (xhr && xhr.responseJSON && xhr.responseJSON.message)
                        || 'The claim submission failed. If the file appeared in outbound but the jobs did not clear, run migration 023 (hav_claim_sent_date / hav_claim_ref) and delete the duplicate file.';
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({ icon: 'error', title: 'Failed', text: msg });
                    }
                    loadClaims(); load();
                });
        };

        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Send claims', html: html, width: 560,
                showCancelButton: true, confirmButtonText: 'Send claims', confirmButtonColor: '#0ab39c'
            }).then(function (r) { if (r.isConfirmed) { doSend(); } });
        } else if (window.confirm('Send claims for ' + claimsReady.count + ' job(s)?')) {
            doSend();
        }
    }

    // ------------------------------------------------------------------
    // Pause / resume one interface
    // ------------------------------------------------------------------

    function setInterface(code, action) {
        ajaxWithRefresh({
            url: API.iface, method: 'POST', dataType: 'json',
            data: { interface_code: code, action: action }
        }).then(function () { load(); });
    }

    // Send an on-demand outbound API queue now (Log Appointment or Cancel
    // Appointment). The response of each call is logged to hav_file_log, so it
    // shows on the interface's detail page. Honours the on/off switch server-side.
    function sendInterfaceQueue(code, $btn) {
        var original = $btn.html();
        $btn.prop('disabled', true).html('<i class="ri-loader-4-line align-middle"></i> Sending…');
        ajaxWithRefresh({
            url: API.ifaceSend, method: 'POST', dataType: 'json',
            data: { interface_code: code }
        }).then(function (r) {
            var msg = (r && r.message) ? r.message : 'Queue sent.';
            var failed = r && r.summary && Number(r.summary.failed) > 0;
            if (typeof Swal !== 'undefined') {
                Swal.fire({ toast: true, position: 'top-end', icon: failed ? 'warning' : 'success',
                    title: msg, showConfirmButton: false, timer: 3000 });
            }
            load();
        }).catch(function () {
            if (typeof Swal !== 'undefined') {
                Swal.fire({ toast: true, position: 'top-end', icon: 'error',
                    title: 'Could not send the queue.', showConfirmButton: false, timer: 3000 });
            }
            $btn.prop('disabled', false).html(original);
        });
    }

    // ------------------------------------------------------------------
    // Alert recipients + settings
    // ------------------------------------------------------------------

    function loadSettings() {
        ajaxWithRefresh({ url: API.settings, method: 'GET', dataType: 'json' })
            .then(function (d) {
                var s = (d && d.settings) || {};
                $('.hav-setting').each(function () {
                    var key = $(this).data('key');
                    if (this.type === 'checkbox') {
                        this.checked = String(s[key]) === '1';
                    } else {
                        $(this).val(s[key]);
                    }
                });

                var opts = '<option value="">All interfaces</option>';
                ((d && d.interfaces) || []).forEach(function (i) {
                    opts += '<option value="' + esc(i.code) + '">' + esc(i.name) + '</option>';
                });
                $('#rcpt-iface').html(opts);

                renderRecipients((d && d.recipients) || []);
            });
    }

    function renderRecipients(list) {
        if (!list.length) {
            $('#rcpt-rows').html('<tr><td colspan="5" class="text-center text-muted py-3">' +
                'No recipients yet — nobody will be told when a file fails.</td></tr>');
            return;
        }
        var rows = '';
        list.forEach(function (r) {
            rows += '<tr>' +
                '<td>' + esc(r.email) + '</td>' +
                '<td><span class="badge bg-light text-body text-uppercase">' + esc(r.recipient_type) + '</span></td>' +
                '<td class="text-muted fs-13">' + (r.interface_code ? esc(r.interface_code) : 'All interfaces') + '</td>' +
                '<td><div class="form-check form-switch mb-0">' +
                    '<input class="form-check-input rcpt-toggle" type="checkbox" data-id="' + r.id + '"' +
                    (Number(r.active) === 1 ? ' checked' : '') + '></div></td>' +
                '<td class="text-end"><button class="btn btn-sm btn-ghost-danger rcpt-remove" data-id="' + r.id + '">' +
                    '<i class="ri-delete-bin-line"></i></button></td>' +
            '</tr>';
        });
        $('#rcpt-rows').html(rows);
    }

    function recipientAction(payload) {
        return ajaxWithRefresh({ url: API.recipient, method: 'POST', dataType: 'json', data: payload })
            .then(function (d) { renderRecipients((d && d.recipients) || []); return d; });
    }

    // ------------------------------------------------------------------
    // Manual upload
    // ------------------------------------------------------------------

    function doUpload() {
        var file = $('#hav-upload-file')[0].files[0];
        if (!file) {
            flash('#hav-upload-result', 'Choose a file first.', false);
            return;
        }

        var fd = new FormData();
        fd.append('interface_code', $('#hav-upload-iface').val());
        fd.append('file', file);

        $('#hav-upload-go').prop('disabled', true);
        resultLine('#hav-upload-result', 'Uploading and processing…', 'busy');

        ajaxWithRefresh({
            url: API.upload, method: 'POST', dataType: 'json',
            data: fd, processData: false, contentType: false
        }).then(function (d) {
            var kind = { ok: 'ok', partial: 'warn', rejected: 'bad', duplicate: 'warn' }[d.outcome] || 'ok';
            resultLine('#hav-upload-result', d.message, kind);
            $('#hav-upload-file').val('');
            load();
        }).catch(function (xhr) {
            var msg = (xhr && xhr.responseJSON && xhr.responseJSON.message) || 'Upload failed.';
            resultLine('#hav-upload-result', msg, 'bad');
        }).finally(function () {
            $('#hav-upload-go').prop('disabled', false);
        });
    }

    // ------------------------------------------------------------------
    // SFTP folder viewer (on demand — never on the 60s poll)
    // ------------------------------------------------------------------

    function inboundBadge(state, iface) {
        var map = {
            pending:  ['border border-success text-success',   'Pending · ' + (iface || '')],
            held:     ['border border-warning text-warning',   'Held · ' + (iface || '') + ' (paused)'],
            unrouted: ['border border-secondary text-secondary', 'Unrouted']
        };
        var m = map[state] || map.unrouted;
        return '<span class="badge ' + m[0] + '">' + esc(m[1]) + '</span>';
    }

    var foldersData = {};          // last fetched { inbound, processed, outbound, errors }
    var activeFolder = 'inbound';  // which folder tab is showing
    var folderFilter = '';         // current file-name filter text (lower-cased)

    var FOLDER_HINT = {
        inbound:   'Files waiting for the next cron pull. Pending = will be fetched; Held = its interface is paused; Unrouted = matches no interface.',
        processed: 'Files already pulled and archived after a successful import — the full history, not just today.',
        outbound:  'Files AJS has generated and sent for Havering to collect.',
        errors:    'Files rejected in full. Download one, fix it, and re-upload it from the Upload tab.'
    };

    function updateDeleteBtn() {
        var n = $('.hav-file-cb:checked').length;
        $('#hav-delete-selected').prop('disabled', n === 0)
            .find('.cnt').text(n ? (' (' + n + ')') : '');
        $('#hav-move-selected').prop('disabled', n === 0)
            .find('.cnt-move').text(n ? (' (' + n + ')') : '');
    }

    // Upload a file straight into the active SFTP folder (no importer).
    function uploadToActiveFolder(file) {
        if (!file) { return; }
        var fd = new FormData();
        fd.append('folder', activeFolder);
        fd.append('file', file);
        ajaxWithRefresh({
            url: API.sftpUpload, method: 'POST', dataType: 'json',
            data: fd, processData: false, contentType: false
        }).then(function () {
            $('#hav-folder-upload').val('');
            loadFolders(); load();
        }).catch(function () {
            $('#hav-folder-upload').val('');
        });
    }

    // Move the selected files to another SFTP folder.
    function moveSftpFiles(names, toFolder) {
        if (!names.length || !toFolder) { return; }
        ajaxWithRefresh({
            url: API.sftpMove, method: 'POST', dataType: 'json',
            data: { folder_from: activeFolder, folder_to: toFolder, names: names }
        }).then(function () { $('#hav-move-target').val(''); loadFolders(); load(); });
    }

    // Apply the file-name filter to the active folder's listing.
    function filteredFiles() {
        var files = foldersData[activeFolder] || [];
        if (!folderFilter) { return files; }
        return files.filter(function (x) {
            return String(x.name || '').toLowerCase().indexOf(folderFilter) !== -1;
        });
    }

    function renderActiveFolder() {
        ['inbound', 'processed', 'outbound', 'errors'].forEach(function (k) {
            $('#cnt-' + k).text((foldersData[k] || []).length);
        });
        $('#hav-folder-hint').text(FOLDER_HINT[activeFolder] || '');
        $('#hav-select-all').prop('checked', false);

        var total = (foldersData[activeFolder] || []).length;
        var files = filteredFiles();
        var isInbound = (activeFolder === 'inbound');

        $('#hav-folder-shown').text(folderFilter
            ? ('Showing ' + files.length + ' of ' + total)
            : (total ? (total + ' file' + (total === 1 ? '' : 's')) : ''));

        if (!files.length) {
            $('#hav-folders-body').html('<div class="text-muted fs-13 py-3">' +
                (folderFilter ? 'No files match “' + esc(folderFilter) + '”.' : 'This folder is empty.') + '</div>');
            updateDeleteBtn();
            return;
        }

        var rows = '';
        files.forEach(function (x) {
            var status = isInbound ? '<td>' + inboundBadge(x.state, x.interface) + '</td>' : '';
            rows += '<tr>' +
                '<td><input type="checkbox" class="form-check-input hav-file-cb" value="' + esc(x.name) + '"></td>' +
                '<td class="font-monospace fs-12">' + esc(x.name) + '</td>' +
                status +
                '<td class="text-end text-muted fs-12">' + fmtBytes(x.size) + '</td>' +
                '<td class="text-muted fs-12">' + fmtMtime(x.modified) + '</td>' +
                '<td class="text-end text-nowrap">' +
                    '<button class="btn btn-sm btn-ghost-secondary hav-dl" data-name="' + esc(x.name) + '" title="Download"><i class="ri-download-2-line"></i></button> ' +
                    '<button class="btn btn-sm btn-ghost-danger hav-del" data-name="' + esc(x.name) + '" title="Delete"><i class="ri-delete-bin-line"></i></button>' +
                '</td>' +
            '</tr>';
        });

        $('#hav-folders-body').html(
            '<div class="table-responsive"><table class="table table-sm table-nowrap align-middle mb-0">' +
            '<thead class="text-muted table-light"><tr>' +
                '<th style="width:34px">&nbsp;</th><th>File</th>' + (isInbound ? '<th>Status</th>' : '') +
                '<th class="text-end">Size</th><th>Modified</th><th class="text-end">&nbsp;</th>' +
            '</tr></thead><tbody>' + rows + '</tbody></table></div>'
        );
        updateDeleteBtn();
    }

    function loadFolders() {
        if (typeof ajaxWithRefresh !== 'function') { return; }
        $('#hav-folders-body').html('<div class="text-center text-muted py-4">' +
            '<div class="spinner-border text-secondary mb-2" role="status" style="width:1.5rem;height:1.5rem;">' +
            '<span class="visually-hidden">Loading…</span></div>' +
            '<div>Connecting to the SFTP server…</div></div>');

        ajaxWithRefresh({ url: API.folders, method: 'GET', dataType: 'json' })
            .then(function (d) {
                if (!d || !d.connected) {
                    var err = (d && d.errors && d.errors.length) ? d.errors.join('; ') : 'Could not connect to the SFTP server.';
                    foldersData = {};
                    ['inbound', 'processed', 'outbound', 'errors'].forEach(function (k) { $('#cnt-' + k).text(0); });
                    $('#hav-folders-body').html('<div class="text-center text-danger py-4">' +
                        '<i class="ri-error-warning-line fs-24 d-block mb-1"></i>' + esc(err) + '</div>');
                    updateDeleteBtn();
                    return;
                }
                foldersData = d.folders || {};
                renderActiveFolder();
                if (d.errors && d.errors.length) {
                    $('#hav-folders-body').append('<div class="text-warning fs-12 mt-2">' +
                        '<i class="ri-error-warning-line align-middle"></i> ' + esc(d.errors.join('; ')) + '</div>');
                }
            })
            .catch(function () {
                $('#hav-folders-body').html('<div class="text-center text-danger py-4">' +
                    'Could not reach the SFTP folder listing.</div>');
            });
    }

    function b64ToBlob(b64) {
        var bin = atob(b64), len = bin.length, arr = new Uint8Array(len);
        for (var i = 0; i < len; i++) { arr[i] = bin.charCodeAt(i); }
        return new Blob([arr], { type: 'application/octet-stream' });
    }

    function downloadSftpFile(name) {
        ajaxWithRefresh({
            url: API.sftpDownload, method: 'POST', dataType: 'json',
            data: { folder: activeFolder, name: name }
        }).then(function (d) {
            if (!d || !d.status) { return; }
            var url = URL.createObjectURL(b64ToBlob(d.content_base64));
            var a = document.createElement('a');
            a.href = url; a.download = d.name || name;
            document.body.appendChild(a); a.click(); a.remove();
            URL.revokeObjectURL(url);
        });
    }

    function confirmDelete(count, cb) {
        var msg = 'Delete ' + count + ' file' + (count === 1 ? '' : 's') +
                  ' from the SFTP server? This cannot be undone.';
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Delete file' + (count === 1 ? '' : 's') + '?',
                text: msg, icon: 'warning', showCancelButton: true,
                confirmButtonText: 'Delete', confirmButtonColor: '#dc3545'
            }).then(function (r) { if (r.isConfirmed) { cb(); } });
        } else if (window.confirm(msg)) {
            cb();
        }
    }

    function deleteSftpFiles(names) {
        if (!names.length) { return; }
        confirmDelete(names.length, function () {
            ajaxWithRefresh({
                url: API.sftpDelete, method: 'POST', dataType: 'json',
                data: { folder: activeFolder, names: names }
            }).then(function () { loadFolders(); load(); });
        });
    }

    // ------------------------------------------------------------------
    // Open Housing API panel
    // ------------------------------------------------------------------

    function apiSampleFor(endpoint) {
        return JSON.stringify(API_SAMPLES[endpoint] || {}, null, 2);
    }

    function loadApiParamsForEndpoint() {
        $('#api-params').val(apiSampleFor($('#api-endpoint').val()));
    }

    function renderApiConfig(c) {
        if (!c) { $('#api-config-status').text('Could not load the API configuration.'); return; }
        if (c.environment) { $('#api-env').val(c.environment); }
        if (c.username && c.username !== '(not set)') { $('#api-username').val(c.username); }
        var pwd = (c.password === 'set');
        $('#api-config-status').html(
            'Active URL: <span class="font-monospace">' + esc(c.active_url) + '</span><br>' +
            'Username: ' + (c.username === '(not set)'
                ? '<span class="text-danger">not set</span>' : esc(c.username)) +
            ' &middot; Password: ' + (pwd
                ? '<span class="text-success">stored</span>' : '<span class="text-danger">not set</span>') +
            ' &middot; Verify SSL: ' + esc(c.verify_ssl) + ' &middot; Timeout: ' + esc(c.timeout) + 's'
        );
    }

    function loadApiConfig() {
        if (typeof ajaxWithRefresh !== 'function') { return; }
        $('#api-config-status').text('Loading…');
        ajaxWithRefresh({ url: API.apiConfig, method: 'GET', dataType: 'json' })
            .then(function (d) { renderApiConfig(d && d.config); })
            .catch(function () { $('#api-config-status').text('Could not load the API configuration.'); });
    }

    function saveApiSettings() {
        var btn = $('#api-settings-save').prop('disabled', true);
        flash('#api-settings-msg', 'Saving…', true);
        ajaxWithRefresh({
            url: API.apiSettings, method: 'POST', dataType: 'json',
            data: {
                environment: $('#api-env').val(),
                username: $.trim($('#api-username').val()),
                password: $('#api-password').val()
            }
        }).then(function (d) {
            $('#api-password').val('');
            renderApiConfig(d && d.config);
            flash('#api-settings-msg', (d && d.message) || 'Saved.', true);
        }).catch(function (xhr) {
            var msg = (xhr && xhr.responseJSON && xhr.responseJSON.message) || 'Could not save.';
            flash('#api-settings-msg', msg, false);
        }).finally(function () { btn.prop('disabled', false); });
    }

    function renderApiResult(r) {
        if (!r) { $('#api-result').html('<div class="text-danger fs-13">No response.</div>'); return; }

        var head = '<div class="fs-12 text-muted mb-1">' +
            esc(r.interface) + ' &middot; request_type=' + esc(r.request_type) +
            ' &middot; ' + esc(r.env) + ' &middot; HTTP ' + esc(r.http_code) + '</div>';

        var verdict, detail;
        if (r.held) {
            verdict = '<span class="badge border border-warning text-warning">Held</span>';
            detail = '<div class="fs-13 mt-1">' + esc(r.error) + '</div>';
        } else if (r.ok) {
            verdict = '<span class="badge border border-success text-success">OK</span>' +
                (r.on_hold ? ' <span class="badge border border-warning text-warning">Job on hold — send stage 43 with MCM link</span>' : '');
            detail = (r.job_no ? '<div class="fs-13 mt-1">Job number: <span class="font-monospace">' + esc(r.job_no) + '</span></div>' : '') +
                (r.result ? '<div class="fs-13">' + esc(r.result) + '</div>' : '');
        } else {
            verdict = '<span class="badge border border-danger text-danger">Failed</span>';
            detail = '<div class="fs-13 mt-1 text-danger">' + esc(r.error) + '</div>';
        }

        var xml = '';
        if (r.request_xml) {
            xml += '<details class="mt-2"><summary class="fs-12 text-muted">Request sent (password hidden)</summary>' +
                '<pre class="fs-12 border rounded p-2 mt-1" style="max-height:30vh;overflow:auto;">' + esc(r.request_xml) + '</pre></details>';
        }
        if (r.response_xml) {
            xml += '<details class="mt-1"><summary class="fs-12 text-muted">Raw response</summary>' +
                '<pre class="fs-12 border rounded p-2 mt-1" style="max-height:30vh;overflow:auto;">' + esc(r.response_xml) + '</pre></details>';
        }

        $('#api-result').html('<div class="border rounded p-3">' + head + verdict + detail + xml + '</div>');
    }

    function sendApiRequest(endpoint, paramsObj, btnSel) {
        var btn = $(btnSel).prop('disabled', true);
        $('#api-result').html('<div class="text-muted fs-13">Sending…</div>');
        ajaxWithRefresh({
            url: API.apiSend, method: 'POST', dataType: 'json',
            data: { interface: endpoint, params: JSON.stringify(paramsObj) }
        }).then(function (d) {
            renderApiResult(d && d.result);
        }).catch(function (xhr) {
            var msg = (xhr && xhr.responseJSON && xhr.responseJSON.message) || 'The request could not be sent.';
            $('#api-result').html('<div class="border rounded p-3 text-danger fs-13">' + esc(msg) + '</div>');
        }).finally(function () { btn.prop('disabled', false); });
    }

    function sendApiFromForm() {
        var endpoint = $('#api-endpoint').val();
        var parsed;
        try {
            parsed = JSON.parse($('#api-params').val());
        } catch (e) {
            $('#api-result').html('<div class="border rounded p-3 text-danger fs-13">Parameters are not valid JSON: ' + esc(e.message) + '</div>');
            return;
        }
        if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
            $('#api-result').html('<div class="border rounded p-3 text-danger fs-13">Parameters must be a JSON object, e.g. { "job_no": "HAV000235326" }.</div>');
            return;
        }
        sendApiRequest(endpoint, parsed, '#api-send-go');
    }

    // ------------------------------------------------------------------
    // Wiring
    // ------------------------------------------------------------------

    $(function () {
        load();
        $('#hav-refresh').on('click', load);
        timer = setInterval(load, 60000);
        $(window).on('beforeunload', function () { if (timer) { clearInterval(timer); } });

        // Claim/post-inspection tracker tiles drill into their job list.
        $('.hav-claim-tile').on('click', function () {
            openClaimJobs($(this).data('claim-status'));
        });

        // Drill-down panel: search + pagination (delegated from the static panel).
        $('#hav-claim-jobs-panel')
            .on('input', '#hav-claim-search', function () {
                claimState.q = $(this).val();
                claimState.page = 1;
                renderClaimList();
            })
            .on('click', '.hav-claim-page', function () {
                var p = parseInt($(this).data('page'), 10);
                if (!isNaN(p)) { claimState.page = p; renderClaimList(); }
            });

        $('#hav-iface-rows')
            .on('click', '.hav-pause',  function (e) { e.stopPropagation(); setInterface($(this).data('code'), 'pause'); })
            .on('click', '.hav-resume', function (e) { e.stopPropagation(); setInterface($(this).data('code'), 'resume'); })
            .on('click', '.hav-send',   function (e) { e.stopPropagation(); sendInterfaceQueue($(this).data('code'), $(this)); })
            .on('click', '.hav-send-claims-row', function (e) { e.stopPropagation(); sendClaims(); })
            .on('click', '.hav-iface-row', function (e) {
                // Clicking a button or link inside the row does its own thing.
                if ($(e.target).closest('button, a').length) { return; }
                var href = $(this).data('href');
                if (href) { window.location.href = href; }
            });

        // Side panel: load folders + settings + API config when it opens.
        $('#hav-panel').on('show.bs.offcanvas', function () {
            loadFolders();
            loadSettings();
            loadApiConfig();
            if ($.trim($('#api-params').val()) === '') { loadApiParamsForEndpoint(); }
            $('#hav-upload-result').empty();
            $('#hav-upload-file').val('');
        });
        $('#hav-folders-refresh').on('click', loadFolders);

        // Folder toggle — no re-fetch, just re-render for the chosen folder.
        // Clear the filter when switching folders so a hidden filter never
        // makes a folder look empty.
        $('#hav-folder-toggle').on('click', 'button', function () {
            $('#hav-folder-toggle button').removeClass('active');
            $(this).addClass('active');
            activeFolder = $(this).data('folder');
            folderFilter = '';
            $('#hav-folder-filter').val('');
            renderActiveFolder();
        });

        // File-name filter for the active folder.
        $('#hav-folder-filter').on('input', function () {
            folderFilter = $.trim(this.value).toLowerCase();
            renderActiveFolder();
        });
        $('#hav-folder-filter-clear').on('click', function () {
            folderFilter = '';
            $('#hav-folder-filter').val('').trigger('focus');
            renderActiveFolder();
        });

        $('#hav-select-all').on('change', function () {
            $('.hav-file-cb').prop('checked', this.checked);
            updateDeleteBtn();
        });
        $('#hav-folders-body')
            .on('change', '.hav-file-cb', updateDeleteBtn)
            .on('click', '.hav-dl',  function () { downloadSftpFile(String($(this).data('name'))); })
            .on('click', '.hav-del', function () { deleteSftpFiles([String($(this).data('name'))]); });

        $('#hav-delete-selected').on('click', function () {
            var names = $('.hav-file-cb:checked').map(function () { return this.value; }).get();
            deleteSftpFiles(names);
        });

        $('#hav-move-selected').on('click', function () {
            var target = $('#hav-move-target').val();
            if (!target) {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({ icon: 'info', title: 'Pick a destination', text: 'Choose a folder in the "Move to…" list first.' });
                }
                return;
            }
            if (target === activeFolder) {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({ icon: 'info', title: 'Same folder', text: 'The files are already in that folder.' });
                }
                return;
            }
            var names = $('.hav-file-cb:checked').map(function () { return this.value; }).get();
            moveSftpFiles(names, target);
        });

        $('#hav-folder-upload').on('change', function () {
            if (this.files && this.files[0]) { uploadToActiveFolder(this.files[0]); }
        });

        $('#hav-errors')
            .on('click', '.hav-retry', function (e) {
                e.stopPropagation();
                retryOutbound($(this).data('id'), $(this));
            })
            .on('click', '.hav-err-dismiss', function (e) {
                e.stopPropagation();
                dismissError($(this).data('id'), String($(this).data('side')), $(this));
            })
            .on('click', '.hav-err-row', function (e) {
                // The Retry / × buttons on a row do their own thing.
                if ($(e.target).closest('button').length) { return; }
                openRecord($(this).data('id'));
            });

        $('#hav-err-clear-all').on('click', dismissAllErrors);

        $('#rec-retry').on('click', function () { recordAction('retry'); });
        $('#rec-save').on('click',  function () { recordAction('save', { raw_payload: $('#rec-payload').val() }); });
        $('#rec-skip').on('click',  function () {
            recordAction('skip', { reason: 'Skipped manually from the dashboard.' });
        });

        $('#hav-settings-save').on('click', function () {
            var payload = {};
            $('.hav-setting').each(function () {
                payload[$(this).data('key')] = (this.type === 'checkbox') ? (this.checked ? '1' : '0') : $(this).val();
            });
            ajaxWithRefresh({ url: API.settings, method: 'POST', dataType: 'json', data: payload })
                .then(function (d) { flash('#rcpt-msg', (d && d.message) || 'Saved', true); });
        });

        $('#rcpt-add').on('click', function () {
            var email = $.trim($('#rcpt-email').val());
            if (!email) { flash('#rcpt-msg', 'Enter an email address.', false); return; }
            recipientAction({
                action: 'add',
                email: email,
                recipient_type: $('#rcpt-type').val(),
                interface_code: $('#rcpt-iface').val()
            }).then(function () {
                $('#rcpt-email').val('');
                flash('#rcpt-msg', 'Recipient added.', true);
            }).catch(function (xhr) {
                var msg = (xhr && xhr.responseJSON && xhr.responseJSON.message) || 'Could not add that address.';
                flash('#rcpt-msg', msg, false);
            });
        });

        $('#rcpt-rows')
            .on('click', '.rcpt-remove', function () {
                recipientAction({ action: 'remove', id: $(this).data('id') });
            })
            .on('change', '.rcpt-toggle', function () {
                recipientAction({ action: 'toggle', id: $(this).data('id'), active: this.checked ? 1 : 0 });
            });

        $('#rcpt-test').on('click', function () {
            var btn = $(this).prop('disabled', true);
            flash('#rcpt-msg', 'Sending…', true);
            ajaxWithRefresh({
                url: API.test, method: 'POST', dataType: 'json',
                data: { interface_code: $('#rcpt-iface').val() || 'location_extract' }
            }).then(function (d) {
                flash('#rcpt-msg', d.message, !!d.status);
            }).catch(function (xhr) {
                var msg = (xhr && xhr.responseJSON && xhr.responseJSON.message) || 'Test email failed.';
                flash('#rcpt-msg', msg, false);
            }).finally(function () { btn.prop('disabled', false); });
        });

        $('#hav-upload-go').on('click', doUpload);

        // Open Housing API tab.
        $('#api-settings-save').on('click', saveApiSettings);
        $('#api-endpoint').on('change', loadApiParamsForEndpoint);
        $('#api-load-sample').on('click', loadApiParamsForEndpoint);
        $('#api-send-go').on('click', sendApiFromForm);
        $('#api-ping').on('click', function () {
            sendApiRequest('post_inspection', { job_no: 'HAV000000000' }, '#api-ping');
        });
    });
})();
