/**
 * Other Interface tab — per-client certificate delivery over SFTP.
 *
 * Shows, for whichever configured client is selected:
 *   - delivery KPIs (processed so far / today, pending in queue, total failed)
 *   - the certificate delivery list, with a retry and a failure reason for
 *     anything that failed
 *   - folder counts for Outbound / Processed / Errors, each opening the SFTP
 *     panel at that folder
 *
 * The SFTP panel mirrors Havering's, with only the two tabs that apply here:
 *   Folders — browse and download
 *   Upload  — place a file straight into one of the folders
 *
 * Retry and "why did it fail" are NOT reimplemented: they call the same
 * endpoints the certificate list already uses, job/certificate/upload-to-client
 * and job/certificate/get_file_upload_logs/{id}.
 *
 * Nothing is fetched on a timer — each folder listing opens an SFTP connection.
 *
 * Deliberately independent of havering-dashboard.js: no shared state, no shared
 * DOM, so the Havering tab is unaffected.
 */
(function () {
    'use strict';

    var BASE = (typeof site_url !== 'undefined' ? site_url : '');
    var API = {
        clients:  BASE + 'api/interface/other/clients',
        overview: BASE + 'api/interface/other/overview',
        folders:  BASE + 'api/interface/other/folders',
        download: BASE + 'api/interface/other/download',
        upload:   BASE + 'api/interface/other/upload',
        // Existing endpoints, shared with the certificate list.
        retry:    BASE + 'job/certificate/upload-to-client',
        logs:     BASE + 'job/certificate/get_file_upload_logs/'
    };

    var FOLDER_KEYS  = ['outbound', 'processed', 'error'];
    var FOLDER_TITLE = { outbound: 'Outbound', processed: 'Processed', error: 'Errors' };
    var FOLDER_HINT  = {
        outbound:  'Awaiting collection, or left behind by a delivery that stalled part-way.',
        processed: 'Certificates delivered successfully.',
        error:     'One CSV per failed delivery, naming the certificate and the reason.'
    };

    // certificate_template_data.status, as the approval flow sets it.
    var STATE = {
        '3': 'pending',   // update and approve
        '4': 'pending',   // approved
        '6': 'delivered', // uploaded
        '7': 'failed'     // upload failed
    };
    var STATE_BADGE = {
        pending:   ['bg-warning-subtle text-warning', 'Pending'],
        delivered: ['bg-success-subtle text-success', 'Delivered'],
        failed:    ['bg-danger-subtle text-danger',   'Failed']
    };

    var clients       = [];
    var clientId      = '';
    var clientCode    = '';
    var deliveries    = [];
    var deliveryState = 'all';
    var deliveryQuery = '';
    var foldersData   = {};
    var activeFolder  = 'outbound';
    var filterText    = '';
    var started       = false;

    function esc(s) {
        return $('<div>').text(s == null ? '' : String(s)).html();
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

    /**
     * Toggled with d-none rather than jQuery show()/hide(): an inline display
     * on a Bootstrap element fights the stylesheet, and the banner has to keep
     * its full height or the KPI tiles below paint over it.
     */
    function showAlert(msg) {
        if (!msg) { $('#oi-alert-row').addClass('d-none'); return; }
        $('#oi-alert-text').html(esc(msg));
        $('#oi-alert-row').removeClass('d-none');
    }

    function toast(msg, ok) {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                toast: true, position: 'top-end', timer: 3200, showConfirmButton: false,
                icon: ok ? 'success' : 'error', title: msg
            });
        } else if (!ok) {
            showAlert(msg);
        }
    }

    function errMsg(xhr, fallback) {
        if (xhr && xhr.responseJSON && xhr.responseJSON.message) { return xhr.responseJSON.message; }
        return fallback;
    }

    function panel() {
        var el = document.getElementById('oi-panel');
        if (!el || typeof bootstrap === 'undefined' || !bootstrap.Offcanvas) { return null; }
        return bootstrap.Offcanvas.getOrCreateInstance(el);
    }

    // ------------------------------------------------------------------
    // KPIs + deliveries
    // ------------------------------------------------------------------

    function renderSummary(s) {
        s = s || {};
        $('#oi-kpi-processed-total').text(fmtNum(s.processed_total));
        $('#oi-kpi-processed-today').text(fmtNum(s.processed_today));
        $('#oi-kpi-pending').text(fmtNum(s.pending));
        $('#oi-kpi-failed').text(fmtNum(s.failed));
    }

    function stateOf(row) {
        return STATE[String(row.status)] || 'pending';
    }

    function filteredDeliveries() {
        return deliveries.filter(function (r) {
            if (deliveryState !== 'all' && stateOf(r) !== deliveryState) { return false; }
            if (!deliveryQuery) { return true; }
            var hay = [r.job_number, r.task_code, r.certificate_title, r.uprn, r.address]
                .join(' ').toLowerCase();
            return hay.indexOf(deliveryQuery) !== -1;
        });
    }

    function renderDeliveries() {
        if (!clientId) {
            $('#oi-deliveries-body').html('<div class="text-center text-muted py-4">' +
                'Select a client to list its deliveries.</div>');
            return;
        }

        var rows = filteredDeliveries();
        if (!rows.length) {
            $('#oi-deliveries-body').html('<div class="text-muted fs-13 py-3">' +
                (deliveries.length ? 'No deliveries match the current filter.'
                                   : 'No approved certificates for this client yet.') + '</div>');
            return;
        }

        var html = '';
        rows.forEach(function (r) {
            var st    = stateOf(r);
            var badge = STATE_BADGE[st];
            var prop  = [r.uprn, r.address].filter(function (x) { return x; }).join(' · ');
            var when  = r.updated_date || r.add_date || '';

            var actions = '<span class="text-muted fs-12">—</span>';
            if (st === 'failed') {
                actions =
                    '<button class="btn btn-sm btn-ghost-primary oi-retry" title="Retry upload to client" ' +
                        'data-task="' + esc(r.task_id) + '" data-certificate="' + esc(r.certificate_id) + '">' +
                        '<i class="ri-restart-fill"></i></button> ' +
                    '<button class="btn btn-sm btn-ghost-secondary oi-reason" title="View reason for failure" ' +
                        'data-id="' + esc(r.id) + '" data-job="' + esc(r.job_number) + '">' +
                        '<i class="ri-eye-line"></i></button>';
            }

            html += '<tr>' +
                '<td class="fw-medium">' + esc(r.job_number || '—') + '</td>' +
                '<td class="text-muted fs-13">' + esc(r.task_code || '—') + '</td>' +
                '<td class="fs-13">' + esc(r.certificate_title || '—') + '</td>' +
                '<td class="text-muted fs-12">' + esc(prop || '—') + '</td>' +
                '<td><span class="badge ' + badge[0] + ' rounded-pill">' + badge[1] + '</span></td>' +
                '<td class="text-muted fs-12">' + esc(when || '—') + '</td>' +
                '<td class="text-end text-nowrap">' + actions + '</td>' +
            '</tr>';
        });

        $('#oi-deliveries-body').html(
            '<div class="d-flex align-items-center mb-2"><span class="text-muted fs-12">' +
                'Showing ' + rows.length + ' of ' + deliveries.length +
            '</span></div>' +
            '<div class="table-responsive"><table class="table table-sm table-nowrap align-middle mb-0">' +
            '<thead class="text-muted table-light"><tr>' +
                '<th>Job</th><th>Task</th><th>Certificate</th><th>Property</th>' +
                '<th>Status</th><th>Last attempt</th><th class="text-end">&nbsp;</th>' +
            '</tr></thead><tbody>' + html + '</tbody></table></div>'
        );
    }

    function loadOverview() {
        if (typeof ajaxWithRefresh !== 'function') { return; }
        if (!clientId) {
            deliveries = [];
            renderSummary({});
            renderDeliveries();
            return;
        }

        $('#oi-deliveries-body').html('<div class="text-center text-muted py-4">Loading&hellip;</div>');

        return ajaxWithRefresh({
            url: API.overview, method: 'GET', dataType: 'json',
            data: { client_id: clientId }
        })
            .then(function (d) {
                if (!d || !d.status) { throw d; }
                setClientCode(d.client_code || clientCode);
                deliveries = d.deliveries || [];
                renderSummary(d.summary);
                renderDeliveries();
                $('#oi-synced').text('Updated ' + new Date().toLocaleTimeString());
            })
            .catch(function (xhr) {
                deliveries = [];
                renderSummary({});
                $('#oi-deliveries-body').html('<div class="text-center text-danger py-4">' +
                    esc(errMsg(xhr, 'Could not load this client’s deliveries.')) + '</div>');
            });
    }

    // ------------------------------------------------------------------
    // Retry + reason (existing endpoints)
    // ------------------------------------------------------------------

    function retryDelivery(taskId, certificateId, $btn) {
        $btn.prop('disabled', true).html('<i class="ri-loader-4-line"></i>');

        ajaxWithRefresh({
            url: API.retry, method: 'POST', dataType: 'json',
            data: { task_id: taskId, certificate_id: certificateId }
        })
            .then(function (d) {
                toast((d && d.message) || 'Certificate uploaded successfully', !!(d && d.status));
            })
            .catch(function (xhr) {
                toast(errMsg(xhr, 'Certificate upload failed, please try again'), false);
            })
            .then(function () {
                // Refresh either way: the attempt moved the certificate's status
                // and may have added a file or an error CSV on the server.
                loadOverview();
                loadFolders();
            });
    }

    function showReason(certificateDataId, jobNumber) {
        $('#oi-reason-title').text('Reason for failure' + (jobNumber ? ' — #' + jobNumber : ''));
        $('#oi-reason-body').html('<div class="text-center text-muted py-4">Loading&hellip;</div>');

        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            bootstrap.Modal.getOrCreateInstance(document.getElementById('oi-reason-modal')).show();
        }

        ajaxWithRefresh({ url: API.logs + certificateDataId, method: 'GET', dataType: 'json' })
            .then(function (d) {
                var list = (d && d.data) ? d.data : [];
                if (!list.length) {
                    $('#oi-reason-body').html('<div class="text-muted py-2">' +
                        'No delivery attempts have been recorded for this certificate.</div>');
                    return;
                }

                var rows = '';
                list.slice().reverse().forEach(function (item) {
                    var reason = '';
                    try {
                        var o = JSON.parse(item.response);
                        // Message is normalised on write, so it is always present;
                        // the fallbacks cover rows written by older code.
                        reason = o.Message || o.message || o.error || item.response;
                    } catch (e) {
                        reason = item.response || 'No detail recorded';
                    }
                    var ok = String(item.status) === '1';
                    rows += '<tr>' +
                        '<td><span class="badge ' + (ok ? 'bg-success-subtle text-success'
                                                        : 'bg-danger-subtle text-danger') +
                            ' rounded-pill">' + (ok ? 'Success' : 'Failed') + '</span></td>' +
                        '<td class="fs-13">' + esc(reason) + '</td>' +
                        '<td class="text-muted fs-12 text-nowrap">' + esc(item.add_date || '—') + '</td>' +
                    '</tr>';
                });

                $('#oi-reason-body').html(
                    '<div class="table-responsive"><table class="table table-sm align-middle mb-0">' +
                    '<thead class="text-muted table-light"><tr>' +
                        '<th>Outcome</th><th>Reason</th><th>When</th>' +
                    '</tr></thead><tbody>' + rows + '</tbody></table></div>'
                );
            })
            .catch(function (xhr) {
                $('#oi-reason-body').html('<div class="text-danger py-2">' +
                    esc(errMsg(xhr, 'Could not load the failure reason.')) + '</div>');
            });
    }

    // ------------------------------------------------------------------
    // Folders
    // ------------------------------------------------------------------

    function setClientCode(code) {
        clientCode = code || '';
        // The code is the folder name on the SFTP server, so it is worth showing
        // on its own rather than buried in the option text.
        $('#oi-client-code').text(clientCode || '—');
        $('#oi-panel-client').text(clientCode ? '— ' + clientCode : '');
    }

    function setCounts(data) {
        FOLDER_KEYS.forEach(function (k) {
            var n = ((data || {})[k] || []).length;
            $('#oi-cnt-' + k).text(n);      // card on the page
            $('#oi-badge-' + k).text(n);    // toggle inside the panel
        });
    }

    /**
     * The folder path as the client sees it. Built from the client code the API
     * returned - the SFTP root is never sent to the browser.
     */
    function folderPath(key) {
        if (!clientCode) { return '—'; }
        return clientCode + '/outbound' + (key === 'outbound' ? '' : '/' + key) + '/';
    }

    function setActiveFolder(key) {
        if (FOLDER_KEYS.indexOf(key) === -1) { return; }
        activeFolder = key;

        $('.oi-folder-card').removeClass('active')
            .filter('[data-folder="' + key + '"]').addClass('active');
        $('#oi-folder-toggle button').removeClass('active')
            .filter('[data-folder="' + key + '"]').addClass('active');

        renderActiveFolder();
    }

    function filteredFiles() {
        var files = foldersData[activeFolder] || [];
        if (!filterText) { return files; }
        return files.filter(function (x) {
            return String(x.name || '').toLowerCase().indexOf(filterText) !== -1;
        });
    }

    function renderActiveFolder() {
        $('#oi-files-path').text(folderPath(activeFolder));
        $('#oi-folder-hint').text(' ' + (FOLDER_HINT[activeFolder] || ''));

        // Switching folders before anything is listed must not claim the
        // folder is empty - nothing has been read from the server yet.
        if (!clientId) {
            $('#oi-files-body').html('<div class="text-center text-muted py-4">' +
                'Select a client to list its folders.</div>');
            return;
        }

        var total = (foldersData[activeFolder] || []).length;
        var files = filteredFiles();

        if (!files.length) {
            $('#oi-files-body').html('<div class="text-muted fs-13 py-3">' +
                (filterText ? 'No files match “' + esc(filterText) + '”.'
                            : 'This folder is empty.') + '</div>');
            return;
        }

        var rows = '';
        files.forEach(function (x) {
            rows += '<tr>' +
                '<td class="font-monospace fs-12">' + esc(x.name) + '</td>' +
                '<td class="text-end text-muted fs-12">' + fmtBytes(x.size) + '</td>' +
                '<td class="text-muted fs-12">' + fmtMtime(x.modified) + '</td>' +
                '<td class="text-end text-nowrap">' +
                    '<button class="btn btn-sm btn-ghost-secondary oi-dl" data-name="' + esc(x.name) +
                        '" title="Download"><i class="ri-download-2-line"></i></button>' +
                '</td>' +
            '</tr>';
        });

        $('#oi-files-body').html(
            '<div class="d-flex align-items-center mb-2"><span class="text-muted fs-12">' +
                (filterText ? ('Showing ' + files.length + ' of ' + total)
                            : (total + ' file' + (total === 1 ? '' : 's'))) +
            '</span></div>' +
            '<div class="table-responsive"><table class="table table-sm table-nowrap align-middle mb-0">' +
            '<thead class="text-muted table-light"><tr>' +
                '<th>File</th><th class="text-end">Size</th><th>Modified</th><th class="text-end">&nbsp;</th>' +
            '</tr></thead><tbody>' + rows + '</tbody></table></div>'
        );
    }

    function resetFolders(message) {
        foldersData = {};
        setCounts({});
        $('#oi-files-path').text('—');
        $('#oi-files-body').html('<div class="text-center text-muted py-4">' + esc(message) + '</div>');
    }

    function loadFolders() {
        if (typeof ajaxWithRefresh !== 'function') { return; }
        if (!clientId) {
            showAlert('');
            resetFolders('Select a client to list its folders.');
            return;
        }

        showAlert('');
        $('#oi-files-body').html('<div class="text-center text-muted py-4">' +
            '<div class="spinner-border text-secondary mb-2" role="status" style="width:1.5rem;height:1.5rem;">' +
            '<span class="visually-hidden">Loading…</span></div>' +
            '<div>Connecting to the SFTP server…</div></div>');

        return ajaxWithRefresh({
            url: API.folders, method: 'GET', dataType: 'json',
            data: { client_id: clientId }
        })
            .then(function (d) {
                if (d && d.client_code) { setClientCode(d.client_code); }

                if (!d || !d.connected) {
                    showAlert((d && d.errors && d.errors.length)
                        ? d.errors.join('; ')
                        : 'Could not connect to the SFTP server.');
                    resetFolders('No listing available.');
                    return;
                }

                foldersData = d.folders || {};
                setCounts(foldersData);
                renderActiveFolder();

                if (d.errors && d.errors.length) { showAlert(d.errors.join('; ')); }
            })
            .catch(function (xhr) {
                showAlert(errMsg(xhr, 'Could not reach the folder listing.'));
                resetFolders('No listing available.');
            });
    }

    // ------------------------------------------------------------------
    // Upload
    // ------------------------------------------------------------------

    function uploadMsg(msg, ok) {
        $('#oi-upload-result').html('<span class="' + (ok ? 'text-success' : 'text-danger') + '">' +
            esc(msg) + '</span>');
    }

    function uploadToFolder() {
        var input = document.getElementById('oi-upload-file');
        var file  = (input && input.files && input.files.length) ? input.files[0] : null;

        if (!clientId) { uploadMsg('Select a client first.', false); return; }
        if (!file)     { uploadMsg('Choose a file to upload.', false); return; }

        var fd = new FormData();
        fd.append('client_id', clientId);
        fd.append('folder', $('#oi-upload-folder').val());
        fd.append('file', file);

        var $btn = $('#oi-upload-go').prop('disabled', true);
        uploadMsg('Uploading…', true);

        ajaxWithRefresh({
            url: API.upload, method: 'POST', dataType: 'json',
            data: fd, processData: false, contentType: false
        })
            .then(function (d) {
                var ok = !!(d && d.status);
                uploadMsg((d && d.message) || (ok ? 'Uploaded.' : 'Upload failed.'), ok);
                if (ok) {
                    input.value = '';
                    loadFolders();
                }
            })
            .catch(function (xhr) {
                uploadMsg(errMsg(xhr, 'Upload failed.'), false);
            })
            .then(function () {
                $btn.prop('disabled', false);
            });
    }

    // ------------------------------------------------------------------
    // Clients + wiring
    // ------------------------------------------------------------------

    function loadForClient() {
        loadOverview();
        loadFolders();
    }

    function renderClients() {
        if (!clients.length) {
            $('#oi-client').html('<option value="">No client has an interface configured</option>');
            setClientCode('');
            renderSummary({});
            renderDeliveries();
            resetFolders('No client has an interface configured yet.');
            return;
        }

        var opts = '';
        clients.forEach(function (c) {
            // Name only — the code is shown beside the select as its own chip.
            opts += '<option value="' + esc(c.id) + '" data-code="' + esc(c.client_code) + '">' +
                    esc(c.name) + '</option>';
        });
        $('#oi-client').html(opts);

        // Default to the first client so the tab is useful on open.
        clientId = String(clients[0].id);
        setClientCode(clients[0].client_code);
        $('#oi-client').val(clientId);
        loadForClient();
    }

    function loadClients() {
        if (typeof ajaxWithRefresh !== 'function') { return; }

        ajaxWithRefresh({ url: API.clients, method: 'GET', dataType: 'json' })
            .then(function (d) {
                clients = (d && d.clients) ? d.clients : [];
                renderClients();
            })
            .catch(function () {
                $('#oi-client').html('<option value="">Could not load clients</option>');
                setClientCode('');
                showAlert('Could not load the list of clients with an interface configured.');
                resetFolders('No listing available.');
            });
    }

    function b64ToBlob(b64) {
        var bin = atob(b64), len = bin.length, arr = new Uint8Array(len);
        for (var i = 0; i < len; i++) { arr[i] = bin.charCodeAt(i); }
        return new Blob([arr], { type: 'application/octet-stream' });
    }

    function downloadFile(name) {
        ajaxWithRefresh({
            url: API.download, method: 'POST', dataType: 'json',
            data: { client_id: clientId, folder: activeFolder, name: name }
        }).then(function (d) {
            if (!d || !d.status) { return; }
            var url = URL.createObjectURL(b64ToBlob(d.content_base64));
            var a = document.createElement('a');
            a.href = url; a.download = d.name || name;
            document.body.appendChild(a); a.click(); a.remove();
            URL.revokeObjectURL(url);
        }).catch(function (xhr) {
            showAlert(errMsg(xhr, 'Could not download “' + name + '”.'));
        });
    }

    /** First time the tab is opened: fetch the clients, then their data. */
    function start() {
        if (started) { return; }
        started = true;
        loadClients();
    }

    /**
     * Resolve the two independently-gated tabs.
     *
     * The tabs and their panes are marked .check-permission in the view, so the
     * shared ajs.apply_permissions() removes whichever the role cannot view —
     * content included, not merely hidden. Nothing else on this page uses that
     * marker, so the pass only touches these four elements.
     *
     * Removing the Havering tab would otherwise leave no .active tab at all and
     * the page would render blank, so whatever survives is activated here.
     */
    function resolveTabPermissions() {
        if (typeof ajs === 'undefined' || typeof ajs.apply_permissions !== 'function') { return; }

        try {
            ajs.apply_permissions();
        } catch (e) {
            // check_role() throws when user_roles is missing from localStorage.
            // Leaving both tabs up is the safe failure here: the API still
            // enforces the permission on every call.
            return;
        }

        var $tabs = $('#iface-tabs .nav-link');
        if (!$tabs.length || $tabs.filter('.active').length) { return; }

        var $first = $tabs.first();
        $first.addClass('active');
        $($first.attr('href')).addClass('active show');
    }

    $(function () {
        $('#oi-client').on('change', function () {
            clientId = $(this).val();
            setClientCode($(this).find('option:selected').data('code') || '');
            loadForClient();
        });

        $('#oi-refresh').on('click', function () {
            if (!clients.length) { loadClients(); } else { loadForClient(); }
        });

        $('#oi-folders-refresh').on('click', loadFolders);

        $('#oi-alert-close').on('click', function () { showAlert(''); });

        // --- deliveries ---
        $('#oi-delivery-filter').on('click', 'button', function () {
            $('#oi-delivery-filter button').removeClass('active');
            $(this).addClass('active');
            deliveryState = $(this).data('state');
            renderDeliveries();
        });

        $('#oi-delivery-search').on('input', function () {
            deliveryQuery = String($(this).val() || '').toLowerCase();
            renderDeliveries();
        });

        $('#oi-delivery-search-clear').on('click', function () {
            $('#oi-delivery-search').val('');
            deliveryQuery = '';
            renderDeliveries();
        });

        $(document).on('click', '.oi-retry', function () {
            retryDelivery($(this).data('task'), $(this).data('certificate'), $(this));
        });

        $(document).on('click', '.oi-reason', function () {
            showReason($(this).data('id'), $(this).data('job'));
        });

        // --- folders ---
        // A card is a shortcut: pick that folder and open the panel on it.
        $(document).on('click keydown', '.oi-folder-card', function (e) {
            if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') { return; }
            e.preventDefault();
            setActiveFolder($(this).data('folder'));
            var p = panel();
            if (p) { p.show(); }
        });

        $('#oi-folder-toggle').on('click', 'button', function () {
            setActiveFolder($(this).data('folder'));
        });

        $('#oi-filter').on('input', function () {
            filterText = String($(this).val() || '').toLowerCase();
            renderActiveFolder();
        });

        $('#oi-filter-clear').on('click', function () {
            $('#oi-filter').val('');
            filterText = '';
            renderActiveFolder();
        });

        $(document).on('click', '.oi-dl', function () {
            downloadFile($(this).data('name'));
        });

        // --- upload ---
        $('#oi-upload-go').on('click', uploadToFolder);

        // Drop whichever tab this role cannot view, and make sure one is active.
        // Must run before the check below, which decides whether to boot now.
        resolveTabPermissions();

        // Lazy start — the folder listing opens an SFTP connection, so nothing
        // is fetched until the operator actually opens this tab.
        $('a[data-bs-toggle="tab"][href="#iface-tab-other"]').on('shown.bs.tab', start);

        // The panel lives inside this tab's pane, so leaving the tab would hide
        // the panel while its backdrop stayed over the page. Close it first.
        $('a[data-bs-toggle="tab"][href="#iface-tab-havering"]').on('shown.bs.tab', function () {
            var el = document.getElementById('oi-panel');
            if (el && typeof bootstrap !== 'undefined' && bootstrap.Offcanvas) {
                var inst = bootstrap.Offcanvas.getInstance(el);
                if (inst) { inst.hide(); }
            }
        });

        // ...unless this tab is already the active one (e.g. after a reload
        // that restored it).
        if ($('#iface-tab-other').hasClass('active')) { start(); }
    });
})();
