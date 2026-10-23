<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>Job Completion Review</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="<?= cnd_url('assets/images/ajs-favion.png'); ?>">
    <link href="<?= cnd_url(); ?>assets/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="<?= cnd_url(); ?>assets/css/app.min.css" rel="stylesheet"/>
    <link href="<?= cnd_url(); ?>assets/css/custom.min.css" rel="stylesheet"/>
    <link href="<?= cnd_url(); ?>assets/css/icons.min.css" rel="stylesheet"/>

    <style>
        /* Colours reference the site theme (--vz-*) so this page matches the app. */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            background: var(--vz-light, #f3f6f9);
            font-family: var(--vz-font-sans-serif, 'Segoe UI', Arial, sans-serif);
            font-size: 13px;
            color: var(--vz-body-color, #212529);
            min-height: 100vh;
            padding: 20px 12px 40px;
        }
        .rv-wrapper {
            max-width: 720px;
            margin: 0 auto;
            background: var(--vz-card-bg, #fff);
            border: 1px solid var(--vz-border-color, #e9ebec);
            border-radius: var(--vz-border-radius, .375rem);
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,.08);
        }
        .rv-banner {
            background: var(--vz-primary, #5ea3cb);
            padding: 16px 28px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 64px;
        }
        .rv-banner .banner-logo { position: absolute; left: 24px; top: 50%; transform: translateY(-50%); }
        .rv-banner .banner-logo img { width: 96px; height: auto; display: block; }
        .rv-banner h1 { font-size: 20px; font-weight: 600; color: #fff; letter-spacing: .3px; margin: 0; text-align: center; }

        .rv-body { padding: 22px 28px 26px; }

        .rv-intro { font-size: 13px; color: var(--vz-secondary-color, #878a99); line-height: 1.55; margin-bottom: 18px; }

        .rv-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px 24px;
            border: 1px solid var(--vz-border-color, #e9ebec);
            border-radius: var(--vz-border-radius, .375rem);
            padding: 16px 18px;
            margin-bottom: 20px;
            background: var(--vz-light, #f3f6f9);
        }
        .rv-field label { font-size: 11px; font-weight: 600; color: var(--vz-secondary-color, #878a99); display: block; margin-bottom: 3px; text-transform: uppercase; letter-spacing: .3px; }
        .rv-field .val { font-size: 13.5px; color: var(--vz-body-color, #212529); font-weight: 500; }
        .rv-field.full { grid-column: 1 / -1; }

        .rv-summary-row { margin-top: 4px; }
        .btn-summary i { font-size: 17px; }

        .state-screen { display: none; flex-direction: column; align-items: center; justify-content: center; padding: 54px 40px; text-align: center; }
        .state-screen.show { display: flex; }
        .state-icon { width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; background: rgba(var(--vz-warning-rgb, 247,184,75), .15); }
        .state-icon i { font-size: 30px; color: var(--vz-warning, #f7b84b); }
        .state-screen h4 { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
        .state-screen p  { font-size: 13.5px; color: var(--vz-secondary-color, #878a99); line-height: 1.55; }

        #rv-preloader { position: fixed; inset: 0; background: var(--vz-card-bg, #fff); display: flex; align-items: center; justify-content: center; z-index: 9999; }
        .loader-ring { width: 36px; height: 36px; border: 3px solid var(--vz-border-color, #e9ebec); border-top-color: var(--vz-primary, #5ea3cb); border-radius: 50%; animation: spin .7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Sections 1-3 (completion document / certificates / photos) */
        .rv-section { margin-top: 22px; }
        .rv-sec-title {
            font-size: 12.5px; font-weight: 600; text-transform: uppercase; letter-spacing: .4px;
            color: var(--vz-body-color, #212529); margin-bottom: 12px; padding-bottom: 7px;
            border-bottom: 1px solid var(--vz-border-color, #e9ebec);
            display: flex; align-items: center; gap: 6px;
        }
        .rv-sec-title i { color: var(--vz-primary, #5ea3cb); font-size: 16px; }
        .rv-sec-title .count { margin-left: auto; font-weight: 500; font-size: 11px; color: var(--vz-secondary-color, #878a99); letter-spacing: 0; text-transform: none; }

        .rv-list { display: flex; flex-direction: column; gap: 8px; }
        .rv-doc-row {
            display: flex; align-items: center; justify-content: space-between; gap: 12px;
            border: 1px solid var(--vz-border-color, #e9ebec); border-radius: var(--vz-border-radius, .375rem);
            padding: 10px 14px; background: var(--vz-light, #f3f6f9);
        }
        .rv-doc-row .meta { min-width: 0; }
        .rv-doc-row .meta .nm { font-weight: 500; word-break: break-word; }
        .rv-doc-row .meta .sub { font-size: 11px; color: var(--vz-secondary-color, #878a99); margin-top: 2px; }
        .rv-doc-row .act { flex: 0 0 auto; }

        .rv-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(118px, 1fr)); gap: 12px; margin-bottom: 12px; }
        .rv-thumb { display: block; border: 1px solid var(--vz-border-color, #e9ebec); border-radius: var(--vz-border-radius, .375rem); overflow: hidden; background: #fff; text-decoration: none; }
        .rv-thumb img { width: 100%; height: 112px; object-fit: cover; display: block; background: var(--vz-light, #f3f6f9); }
        .rv-thumb .cap { font-size: 11px; color: var(--vz-secondary-color, #878a99); padding: 6px 8px; word-break: break-word; }

        .rv-empty { font-size: 12.5px; color: var(--vz-secondary-color, #878a99); }

        @media (max-width: 560px) {
            .rv-banner { flex-direction: column; gap: 10px; min-height: 0; }
            .rv-banner .banner-logo { position: static; transform: none; }
            .rv-details { grid-template-columns: 1fr; }
            .rv-gallery { grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); }
        }
    </style>

    <script src="https://code.jquery.com/jquery-3.4.1.min.js" crossorigin="anonymous"></script>
    <script>
        const RV_TOKEN = <?= json_encode($token ?? null) ?>;
        const API_BASE = <?= json_encode(rtrim($api_base ?? '', '/')) ?>;
    </script>
</head>

<body>

<div id="rv-preloader"><div class="loader-ring"></div></div>

<div class="rv-wrapper" id="rv-wrapper" style="display:none;">

    <div class="rv-banner">
        <div class="banner-logo">
            <img src="<?= cnd_url(); ?>assets/images/ajs-logo.png" alt="AJS">
        </div>
        <h1>Job Completion Review</h1>
    </div>

    <!-- ══ MAIN SCREEN — job summary + PDF (view only) ══ -->
    <div class="rv-body" id="rv-body" style="display:none;">

        <p class="rv-intro">
            The job below has been completed by AJS. Please review the job summary, any
            certificates issued, and the photos and proofs the engineer attached on site.
        </p>

        <!-- Summary briefing -->
        <div class="rv-details">
            <div class="rv-field"><label>AJS Job No</label><div class="val" id="f-job-code">—</div></div>
            <div class="rv-field"><label>Open Housing Job No</label><div class="val" id="f-oh-no">—</div></div>
            <div class="rv-field"><label>Completed</label><div class="val" id="f-completed">—</div></div>
            <div class="rv-field"><label>Job</label><div class="val" id="f-title">—</div></div>
            <div class="rv-field full"><label>Address</label><div class="val" id="f-address">—</div></div>
        </div>

        <!-- ── Section 1: completion document (PDF) ── -->
        <div class="rv-section" id="sec-summary">
            <h2 class="rv-sec-title"><i class="ri-file-pdf-2-line"></i> Completion Document</h2>
            <div class="rv-summary-row">
                <a class="btn btn-info btn-summary" id="btn-summary" href="#" target="_blank" rel="noopener">
                    <i class="ri-file-pdf-2-line align-bottom me-1"></i> View Job Summary (PDF)
                </a>
                <div class="rv-empty mt-1" id="no-summary" style="display:none;">The job summary document is not available for this link.</div>
            </div>
        </div>

        <!-- ── Section 2: certificates issued for this job ── -->
        <div class="rv-section" id="sec-certs" style="display:none;">
            <h2 class="rv-sec-title"><i class="ri-award-line"></i> Certificates <span class="count" id="certs-count"></span></h2>
            <div class="rv-list" id="rv-certs"></div>
        </div>

        <!-- ── Section 3: photos & proofs attached to the task ── -->
        <div class="rv-section" id="sec-files" style="display:none;">
            <h2 class="rv-sec-title"><i class="ri-image-2-line"></i> Photos &amp; Proofs <span class="count" id="files-count"></span></h2>
            <div class="rv-gallery" id="rv-images" style="display:none;"></div>
            <div class="rv-list" id="rv-docs"></div>
        </div>

    </div><!-- /rv-body -->

    <!-- ══ INVALID LINK ══ -->
    <div class="state-screen" id="invalid-screen">
        <div class="state-icon"><i class="ri-error-warning-line"></i></div>
        <h4 id="invalid-title">Link Unavailable</h4>
        <p id="invalid-message">This review link is no longer valid.</p>
    </div>

</div><!-- /rv-wrapper -->

<script>
(function () {
    'use strict';

    var preloader = document.getElementById('rv-preloader');
    var wrapper   = document.getElementById('rv-wrapper');
    var body      = document.getElementById('rv-body');
    var invalid   = document.getElementById('invalid-screen');

    function showInvalid(title, msg) {
        document.getElementById('invalid-title').textContent   = title || 'Link Unavailable';
        document.getElementById('invalid-message').textContent = msg   || 'This review link is no longer valid.';
        body.style.display = 'none';
        invalid.classList.add('show');
        preloader.style.cssText = 'display:none !important';
        wrapper.style.display = '';
    }

    function showBody() {
        invalid.classList.remove('show');
        body.style.display = '';
        preloader.style.cssText = 'display:none !important';
        wrapper.style.display = '';
    }

    function fmtDate(v) {
        if (!v) return '';
        var d = new Date(String(v).replace(' ', 'T'));
        if (isNaN(d.getTime())) return v;
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    }

    function clearEl(el) { while (el && el.firstChild) { el.removeChild(el.firstChild); } }
    function joinMeta() {
        var parts = [].slice.call(arguments).map(function (s) { return s == null ? '' : String(s).trim(); })
                      .filter(function (s) { return s !== ''; });
        return parts.join(' · ');
    }

    // Section 2 — certificates issued for the job (each opens in a new tab).
    function renderCertificates(certs) {
        var sec  = document.getElementById('sec-certs');
        var wrap = document.getElementById('rv-certs');
        clearEl(wrap);
        if (!certs.length) { sec.style.display = 'none'; return; }

        certs.forEach(function (c) {
            var row = document.createElement('div'); row.className = 'rv-doc-row';

            var meta = document.createElement('div'); meta.className = 'meta';
            var nm = document.createElement('div'); nm.className = 'nm';
            nm.textContent = c.title || c.name || 'Certificate';
            meta.appendChild(nm);
            var subTxt = joinMeta(c.code, c.task_code);
            if (subTxt) { var sub = document.createElement('div'); sub.className = 'sub'; sub.textContent = subTxt; meta.appendChild(sub); }

            var a = document.createElement('a');
            a.className = 'btn btn-sm btn-soft-primary act';
            a.href = c.url; a.target = '_blank'; a.rel = 'noopener';
            a.innerHTML = '<i class="ri-eye-line align-bottom me-1"></i>View';

            row.appendChild(meta); row.appendChild(a);
            wrap.appendChild(row);
        });

        document.getElementById('certs-count').textContent = certs.length + (certs.length === 1 ? ' document' : ' documents');
        sec.style.display = '';
    }

    // Section 3 — photos & proofs the engineer attached to the task. Images show
    // as a thumbnail gallery (click to open full size); other files as a list.
    function renderFiles(files) {
        var sec = document.getElementById('sec-files');
        var gal = document.getElementById('rv-images');
        var docs = document.getElementById('rv-docs');
        clearEl(gal); clearEl(docs);
        if (!files.length) { sec.style.display = 'none'; return; }

        var imgN = 0, docN = 0;
        files.forEach(function (f) {
            if (f.is_image) {
                var a = document.createElement('a'); a.className = 'rv-thumb';
                a.href = f.url; a.target = '_blank'; a.rel = 'noopener';
                var img = document.createElement('img');
                img.src = f.url; img.alt = f.caption || f.name || 'Photo'; img.loading = 'lazy';
                a.appendChild(img);
                var capTxt = f.caption || joinMeta(f.task_code, f.sor_code);
                if (capTxt) { var cap = document.createElement('div'); cap.className = 'cap'; cap.textContent = capTxt; a.appendChild(cap); }
                gal.appendChild(a); imgN++;
            } else {
                var row = document.createElement('div'); row.className = 'rv-doc-row';
                var meta = document.createElement('div'); meta.className = 'meta';
                var nm = document.createElement('div'); nm.className = 'nm';
                nm.textContent = f.caption || f.name || 'Attachment';
                meta.appendChild(nm);
                var subTxt = joinMeta(f.task_code, f.sor_code);
                if (subTxt) { var sub = document.createElement('div'); sub.className = 'sub'; sub.textContent = subTxt; meta.appendChild(sub); }
                var a2 = document.createElement('a');
                a2.className = 'btn btn-sm btn-soft-primary act';
                a2.href = f.url; a2.target = '_blank'; a2.rel = 'noopener';
                a2.innerHTML = '<i class="ri-external-link-line align-bottom me-1"></i>Open';
                row.appendChild(meta); row.appendChild(a2);
                docs.appendChild(row); docN++;
            }
        });

        gal.style.display = imgN ? '' : 'none';
        document.getElementById('files-count').textContent = files.length + (files.length === 1 ? ' item' : ' items');
        sec.style.display = '';
    }

    function load() {
        if (!RV_TOKEN) { showInvalid('Link Unavailable', 'No review token was found in this link.'); return; }

        fetch(API_BASE + '/lbh-review/form/' + RV_TOKEN)
            .then(function (r) { return r.json(); })
            .then(function (data) {
                if (!data.status) {
                    showInvalid('Link Unavailable', data.message || 'This review link is no longer valid.');
                    return;
                }

                var c = data.context || {};
                document.getElementById('f-job-code').textContent  = c.job_code || '—';
                document.getElementById('f-oh-no').textContent     = c.oh_job_no || '—';
                document.getElementById('f-completed').textContent = fmtDate(c.completed_date) || '—';
                document.getElementById('f-title').textContent     = c.title || c.description || '—';
                document.getElementById('f-address').textContent   = c.address || '—';

                var pdfBtn = document.getElementById('btn-summary');
                if (data.has_pdf) {
                    pdfBtn.href = API_BASE + '/lbh-review/pdf/' + RV_TOKEN;
                } else {
                    pdfBtn.style.display = 'none';
                    document.getElementById('no-summary').style.display = '';
                }

                renderCertificates(data.certificates || []);
                renderFiles(data.files || []);

                showBody();
            })
            .catch(function () {
                showInvalid('Unable to Load', 'Unable to load this review. Please try again later.');
            });
    }

    load();
}());
</script>

</body>
</html>
