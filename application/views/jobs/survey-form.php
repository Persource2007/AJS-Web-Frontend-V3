<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>Service Feedback</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="<?= cnd_url('assets/images/ajs-favion.png'); ?>">
    <link href="<?= cnd_url(); ?>assets/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="<?= cnd_url(); ?>assets/css/icons.min.css" rel="stylesheet"/>
    <link href="<?= cnd_url(); ?>assets/libs/sweetalert2/sweetalert2.min.css" rel="stylesheet"/>

    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            background: #f0f2f5;
            font-family: 'Segoe UI', Arial, sans-serif;
            font-size: 13px;
            color: #1a1a2e;
            min-height: 100vh;
            padding: 20px 12px 40px;
        }

        /* ── Outer wrapper ── */
        .survey-wrapper {
            max-width: 860px;
            margin: 0 auto;
            background: #fff;
            border: 1px solid #c8ccd4;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,.10);
        }

        /* ── Blue header banner: AJS logo (left) + centered heading ── */
        .survey-banner {
            background: #20388a;
            padding: 16px 28px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 64px;
        }
        .survey-banner .banner-logo {
            position: absolute;
            left: 24px;
            top: 50%;
            transform: translateY(-50%);
        }
        .survey-banner .banner-logo img {
            width: 96px;
            height: auto;
            display: block;
        }
        .survey-banner h1 {
            font-size: 22px;
            font-weight: 700;
            font-style: italic;
            color: #fff;
            letter-spacing: .3px;
            margin: 0;
            text-align: center;
        }

        /* ── Branding header/footer from client.letter_header ── */
        .client-branding img {
            width: 100%; height: auto; display: block; object-fit: contain;
        }

        /* ── Body: 3-column layout matching the card ── */
        .survey-body {
            display: grid;
            grid-template-columns: 190px 1fr 200px;
            min-height: 460px;
        }

        /* LEFT — full engineer photo */
        .col-logo {
            border-right: 1px solid #c8ccd4;
            padding: 0;
            position: relative;
            overflow: hidden;
            min-height: 100%;
            background: #20388a;
        }
        .col-logo .engineer-photo {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: 53% center;  /* shift crop left to centre the engineer */
            display: block;
        }

        /* CENTER — Questions table */
        .col-questions {
            padding: 0;
            border-right: 1px solid #c8ccd4;
        }

        .q-table {
            width: 100%;
            border-collapse: collapse;
        }
        .q-table thead th {
            background: #20388a;
            color: #fff;
            font-size: 10px;
            font-weight: 700;
            text-align: center;
            padding: 6px 4px;
            border: 1px solid #1240b0;
            line-height: 1.3;
            white-space: nowrap;
        }
        .q-table thead th.th-question {
            text-align: left;
            padding: 6px 10px;
            font-size: 11px;
            white-space: normal;
            width: auto;
        }
        .q-table tbody tr {
            border-bottom: 1px solid #dde1e8;
            transition: background .12s;
        }
        .q-table tbody tr:hover { background: #f7f8ff; }
        .q-table tbody tr.answered { background: #f0fbf8; }
        .q-table tbody td.td-question {
            padding: 8px 10px;
            font-size: 12.5px;
            color: #1a1a2e;
            line-height: 1.4;
        }
        .q-table tbody td.td-rating {
            text-align: center;
            vertical-align: middle;
            padding: 6px 4px;
            border-left: 1px solid #dde1e8;
        }

        /* Custom radio tick — matches the physical card's tick boxes */
        .tick-label {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            border: 1.5px solid #aab0be;
            border-radius: 4px;
            cursor: pointer;
            transition: all .15s;
            background: #fff;
            position: relative;
        }
        .tick-label:hover { border-color: #20388a; background: #eef1fd; }
        .tick-input { display: none; }
        .tick-input:checked + .tick-label {
            background: #20388a;
            border-color: #20388a;
        }
        .tick-input:checked + .tick-label::after {
            content: '✓';
            color: #fff;
            font-size: 14px;
            font-weight: 700;
            line-height: 1;
        }

        /* N/A row label */
        .q-table tbody td.td-na {
            text-align: center;
            border-left: 1px solid #dde1e8;
        }
        .na-label {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 28px; height: 28px;
            border: 1.5px dashed #aab0be;
            border-radius: 4px;
            cursor: pointer;
            font-size: 9px;
            font-weight: 600;
            color: #aab0be;
            transition: all .15s;
            background: #fff;
        }
        .na-label:hover { border-color: #878a99; color: #878a99; background: #f3f4f6; }
        .tick-input.na-input:checked + .na-label {
            background: #878a99;
            border-color: #878a99;
            color: #fff;
        }

        /* Question number badge */
        .q-num {
            display: inline-block;
            font-size: 9.5px;
            font-weight: 700;
            color: #20388a;
            margin-right: 4px;
            opacity: .7;
        }

        /* ── RIGHT — Job details panel ── */
        .col-details {
            padding: 14px 14px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        /* Company contact block at top of the right column */
        .col-details .company-info {
            font-size: 11px;
            color: #20388a;
            line-height: 1.6;
            padding-bottom: 14px;
            border-bottom: 1px solid #e2e6ee;
        }
        .col-details .company-info .ci-address { font-weight: 600; margin-bottom: 6px; }
        .col-details .company-info .ci-contact { font-weight: 500; }
        /* Gap before the AJS Job No section */
        .col-details .details-start { margin-top: 8px; }
        .detail-field label {
            font-size: 11px;
            font-weight: 600;
            color: #444;
            display: block;
            margin-bottom: 3px;
        }
        .detail-field .field-value {
            font-size: 12px;
            color: #1a1a2e;
            font-weight: 500;
            border-bottom: 1px dotted #aab0be;
            min-height: 20px;
            padding-bottom: 2px;
        }
        .detail-field .field-value.empty { color: #aab0be; font-style: italic; }

        /* ── Bottom row: progress + notes + submit ── */
        .survey-footer {
            border-top: 1px solid #c8ccd4;
            padding: 14px 16px;
            background: #fafbfc;
        }
        .progress-row {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 12px;
        }
        .progress-row .prog-label {
            font-size: 11px;
            color: #878a99;
            white-space: nowrap;
        }
        .progress-row .progress {
            flex: 1;
            height: 5px;
            background: #e2e6ee;
            border-radius: 3px;
            overflow: hidden;
        }
        .progress-row .progress-bar {
            height: 100%;
            background: #20388a;
            border-radius: 3px;
            transition: width .4s ease;
        }
        .progress-row .prog-count {
            font-size: 11px;
            font-weight: 600;
            color: #20388a;
            white-space: nowrap;
        }

        .notes-row {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 12px;
            align-items: end;
        }
        .notes-row label {
            font-size: 11.5px;
            font-weight: 600;
            color: #444;
            display: block;
            margin-bottom: 4px;
        }
        .notes-row textarea {
            width: 100%;
            border: 1px solid #c8ccd4;
            border-radius: 5px;
            padding: 8px 10px;
            font-size: 12px;
            font-family: inherit;
            color: #1a1a2e;
            resize: vertical;
            min-height: 60px;
            transition: border-color .15s;
        }
        .notes-row textarea:focus {
            outline: none;
            border-color: #20388a;
            box-shadow: 0 0 0 2px rgba(26,79,214,.12);
        }
        .char-count { font-size: 10px; color: #aab0be; text-align: right; margin-top: 2px; }

        .submit-col { display: flex; flex-direction: column; gap: 8px; align-items: flex-end; }
        .btn-submit {
            background: #20388a;
            color: #fff;
            border: none;
            border-radius: 6px;
            padding: 10px 24px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            white-space: nowrap;
            transition: background .15s;
            display: flex;
            align-items: center;
            gap: 7px;
        }
        .btn-submit:hover:not(:disabled) { background: #133fc5; }
        .btn-submit:disabled { background: #9aaed6; cursor: not-allowed; }
        .btn-submit .spin {
            width: 14px; height: 14px;
            border: 2px solid rgba(255,255,255,.3);
            border-top-color: #fff;
            border-radius: 50%;
            animation: spin .7s linear infinite;
            display: none;
        }
        .btn-submit.loading .spin { display: block; }
        .btn-submit.loading .btn-lbl { display: none; }

        .thank-note {
            font-size: 11px;
            font-weight: 700;
            color: #20388a;
            text-align: right;
        }

        /* ── Alert ── */
        .survey-alert {
            display: none;
            align-items: center;
            gap: 8px;
            background: #fde9ec;
            border: 1px solid #f4b8c0;
            color: #c9314a;
            border-radius: 5px;
            padding: 8px 12px;
            font-size: 12px;
            margin-bottom: 10px;
        }
        .survey-alert.show { display: flex; }

        /* ── State screens ── */
        .state-screen {
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 60px 40px;
            text-align: center;
            min-height: 300px;
        }
        .state-screen.show { display: flex; }
        .state-icon {
            width: 60px; height: 60px;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 18px;
        }
        .state-icon.success { background: #e7f8f5; }
        .state-icon.warning { background: #fff3e0; }
        .state-icon i { font-size: 26px; }
        .state-icon.success i { color: #0ab39c; }
        .state-icon.warning i { color: #f7b84b; }
        .state-screen h4 { font-size: 17px; font-weight: 700; margin-bottom: 8px; }
        .state-screen p  { font-size: 13px; color: #666; }

        /* ── Skeleton ── */
        .skeleton-box {
            background: linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%);
            background-size: 200% 100%;
            animation: shim 1.4s infinite;
            border-radius: 4px;
        }
        @keyframes shim { to { background-position: -200% 0; } }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Preloader ── */
        #survey-preloader {
            position: fixed; inset: 0;
            background: #fff;
            display: flex; align-items: center; justify-content: center;
            z-index: 9999;
        }
        .loader-ring {
            width: 36px; height: 36px;
            border: 3px solid #e2e6ee;
            border-top-color: #20388a;
            border-radius: 50%;
            animation: spin .7s linear infinite;
        }

        /* ── Mobile ── */
        @media (max-width: 680px) {
            .survey-banner {
                flex-direction: column;
                gap: 10px;
                min-height: 0;
            }
            .survey-banner .banner-logo {
                position: static;
                transform: none;
            }
            .survey-banner h1 { font-size: 18px; }
            .survey-body {
                grid-template-columns: 1fr;
            }
            .col-logo {
                border-right: none;
                border-bottom: 1px solid #c8ccd4;
                min-height: 240px;
            }
            .col-details {
                border-top: 1px solid #c8ccd4;
                flex-direction: row;
                flex-wrap: wrap;
            }
            .detail-field { flex: 1 1 45%; }
            .notes-row { grid-template-columns: 1fr; }
            .submit-col { align-items: stretch; }
            .btn-submit { justify-content: center; }
        }
    </style>

    <script src="https://code.jquery.com/jquery-3.4.1.min.js" crossorigin="anonymous"></script>
    <script src="<?= cnd_url(); ?>assets/libs/sweetalert2/sweetalert2.min.js"></script>

    <script>
        const SURVEY_TOKEN = <?= json_encode($token ?? null) ?>;
        const API_BASE     = <?= json_encode(rtrim($api_base ?? '', '/')) ?>;
    </script>
</head>

<body>

<!-- Full-page preloader -->
<div id="survey-preloader"><div class="loader-ring"></div></div>

<div class="survey-wrapper" id="survey-wrapper" style="display:none;">

    <!-- Client branding header -->
    <div class="client-branding" id="branding-header" style="display:none;">
        <img id="letter-header-img" src="" alt="">
    </div>

    <!-- Blue title banner: AJS white logo (left) + centered heading -->
    <div class="survey-banner">
        <div class="banner-logo">
            <img src="<?= cnd_url(); ?>assets/images/ajs-logo.png" alt="AJS">
        </div>
        <h1>What do you think about our work and service?</h1>
    </div>

    <!-- ══ SURVEY FORM ══════════════════════════════════════════════════ -->
    <div id="survey-form-area">

        <div class="survey-body">

            <!-- LEFT: Full engineer photo -->
            <div class="col-logo">
                <img class="engineer-photo" src="<?= cnd_url(); ?>assets/images/AJS-emergency-lighting.jpg"
                     alt="AJS engineer at work">
            </div>

            <!-- CENTER: Questions table -->
            <div class="col-questions">

                <!-- Skeleton shown while loading -->
                <div id="questions-skeleton" style="padding:12px;">
                    <div class="skeleton-box" style="height:32px;margin-bottom:8px;"></div>
                    <div class="skeleton-box" style="height:38px;margin-bottom:6px;"></div>
                    <div class="skeleton-box" style="height:38px;margin-bottom:6px;"></div>
                    <div class="skeleton-box" style="height:38px;margin-bottom:6px;"></div>
                    <div class="skeleton-box" style="height:38px;margin-bottom:6px;"></div>
                    <div class="skeleton-box" style="height:38px;margin-bottom:6px;"></div>
                </div>

                <table class="q-table" id="questions-table" style="display:none;">
                    <thead>
                        <tr>
                            <th class="th-question">
                                To help us provide the best service, please tick your answer to the questions below.
                            </th>
                            <th>VERY<br>GOOD</th>
                            <th>GOOD</th>
                            <th>AVERAGE</th>
                            <th>BELOW<br>AVERAGE</th>
                            <th>POOR</th>
                            <th>N/A</th>
                        </tr>
                    </thead>
                    <tbody id="questions-tbody">
                        <!-- Injected by JS -->
                    </tbody>
                </table>

            </div>

            <!-- RIGHT: Company contact + job details -->
            <div class="col-details">

                <!-- Company contact details -->
                <div class="company-info">
                    <div class="ci-address" id="address-display"></div>
                    <div class="ci-contact" id="contact-display"></div>
                </div>

                <div class="detail-field details-start">
                    <label>AJS Job No:</label>
                    <div class="field-value" id="detail-job-code">—</div>
                </div>
                <div class="detail-field">
                    <label>Date work carried out:</label>
                    <div class="field-value" id="detail-date">—</div>
                </div>
                <div class="detail-field">
                    <label>Address where work carried out:</label>
                    <div class="field-value" id="detail-address" style="min-height:48px;"></div>
                </div>
                <div class="detail-field">
                    <label>Your name: </label>
                    <div class="field-value" id="detail-name"></div>
                </div>
                <div class="detail-field">
                    <label>Your contact telephone no.:</label>
                    <div class="field-value" id="detail-number"></div>
                </div>
                <div class="thank-note">We thank you for your response</div>
            </div>

        </div><!-- /survey-body -->

        <!-- Bottom: progress + comments + submit -->
        <div class="survey-footer">

            <div class="progress-row">
                <span class="prog-label">Progress:</span>
                <div class="progress"><div class="progress-bar" id="progress-bar" style="width:0%"></div></div>
                <span class="prog-count" id="progress-count">0 / 0</span>
            </div>

            <div class="survey-alert" id="survey-alert">
                <i class="ri-error-warning-line"></i>
                <span id="alert-text">Please answer all questions before submitting.</span>
            </div>

            <div class="notes-row">
                <div>
                    <label for="resident-notes">
                        Comments: <span style="font-weight:400;color:#878a99;">(optional)</span>
                    </label>
                    <textarea id="resident-notes" maxlength="2000"
                        placeholder="Please share any additional comments about our service…"></textarea>
                    <div class="char-count"><span id="notes-count">0</span> / 2000</div>
                </div>
                <div class="submit-col">
                    <button class="btn-submit" id="submit-btn" disabled>
                        <span class="btn-lbl">Submit</span>
                        <div class="spin"></div>
                    </button>
                    <span class="thank-note">All questions required</span>
                </div>
            </div>

        </div><!-- /survey-footer -->

    </div><!-- /survey-form-area -->

    <!-- ══ THANK-YOU ═══════════════════════════════════════════════════ -->
    <div class="state-screen" id="thankyou-screen">
        <div class="state-icon success"><i class="ri-check-line"></i></div>
        <h4>Thank you for your feedback!</h4>
        <p>We really appreciate you taking the time to share your experience.<br>
           Your responses help us continuously improve our service.</p>
    </div>

    <!-- ══ INVALID / EXPIRED ════════════════════════════════════════════ -->
    <div class="state-screen" id="invalid-screen">
        <div class="state-icon warning"><i class="ri-error-warning-line"></i></div>
        <h4 id="invalid-title">Survey Unavailable</h4>
        <p id="invalid-message">This survey link has expired or is no longer valid.</p>
    </div>

    <!-- Client branding footer -->
    <div class="client-branding" id="branding-footer" style="display:none;">
        <img id="letter-footer-img" src="" alt="">
    </div>

</div><!-- /survey-wrapper -->

<script src="<?= cnd_url(); ?>assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>

<script>
(function () {
    'use strict';

    // Rating scale — 5 = Very Good → 1 = Poor  (stored as answer_rating in DB)
    var RATINGS = [
        { val: '5', label: 'Very Good' },
        { val: '4', label: 'Good'      },
        { val: '3', label: 'Average'   },
        { val: '2', label: 'Below Avg' },
        { val: '1', label: 'Poor'      },
    ];

    var questions = [];
    var answers   = {};  // { question_id: { question_id, question_key, answer_rating } }

    var preloader   = document.getElementById('survey-preloader');
    var wrapper     = document.getElementById('survey-wrapper');
    var formArea    = document.getElementById('survey-form-area');
    var thankyouScr = document.getElementById('thankyou-screen');
    var invalidScr  = document.getElementById('invalid-screen');
    var qSkeleton   = document.getElementById('questions-skeleton');
    var qTable      = document.getElementById('questions-table');
    var qTbody      = document.getElementById('questions-tbody');
    var progressBar = document.getElementById('progress-bar');
    var progressCnt = document.getElementById('progress-count');
    var submitBtn   = document.getElementById('submit-btn');
    var alertEl     = document.getElementById('survey-alert');
    var alertTxt    = document.getElementById('alert-text');
    var notesEl     = document.getElementById('resident-notes');
    var notesCnt    = document.getElementById('notes-count');

    // ── Show state ────────────────────────────────────────────────────
    function showState(state) {
        formArea.style.display    = (state === 'form')    ? '' : 'none';
        thankyouScr.classList.toggle('show', state === 'thankyou');
        invalidScr.classList.toggle('show',  state === 'invalid');
        preloader.style.cssText   = 'display:none !important';
        wrapper.style.display     = '';
    }

    function showInvalid(title, msg) {
        document.getElementById('invalid-title').textContent   = title || 'Survey Unavailable';
        document.getElementById('invalid-message').textContent = msg   || 'This survey link has expired or is no longer valid.';
        showState('invalid');
    }

    function showAlert(msg) {
        alertTxt.textContent = msg;
        alertEl.classList.add('show');
    }
    function hideAlert() { alertEl.classList.remove('show'); }

    function esc(s) {
        return String(s || '')
            .replace(/&/g,'&amp;').replace(/</g,'&lt;')
            .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    // ── Progress ──────────────────────────────────────────────────────
    function updateProgress() {
        var total = questions.length;
        var done  = Object.keys(answers).length;
        var pct   = total ? Math.round(done / total * 100) : 0;
        progressBar.style.width  = pct + '%';
        progressCnt.textContent  = done + ' / ' + total;
        submitBtn.disabled       = (done < total);
    }

    // ── Render question rows ──────────────────────────────────────────
    function renderQuestions() {
        qTbody.innerHTML = '';

        questions.forEach(function (q, idx) {
            var isFollowOn = (q.question_key === 'FOLLOWON_SCHEDULED');
            var tr = document.createElement('tr');
            tr.dataset.qid = q.id;

            // Question cell
            var tdQ = document.createElement('td');
            tdQ.className = 'td-question';
            tdQ.innerHTML = '<span class="q-num">' + (idx + 1) + '.</span>' + esc(q.question_text);
            tr.appendChild(tdQ);

            // Rating cells (Very Good → Poor)
            RATINGS.forEach(function (r) {
                var td    = document.createElement('td');
                td.className = 'td-rating';
                var uid  = 'q' + q.id + '_r' + r.val;
                td.innerHTML =
                    '<input type="radio" class="tick-input" name="q_' + q.id + '" '
                    + 'id="' + uid + '" value="' + r.val + '" data-qid="' + q.id
                    + '" data-qkey="' + esc(q.question_key) + '">'
                    + '<label class="tick-label" for="' + uid + '" title="' + r.label + '"></label>';
                tr.appendChild(td);
            });

            // N/A cell (only for FOLLOWON_SCHEDULED)
            var tdNa  = document.createElement('td');
            tdNa.className = 'td-rating td-na';
            if (isFollowOn) {
                var naId = 'q' + q.id + '_na';
                tdNa.innerHTML =
                    '<input type="radio" class="tick-input na-input" name="q_' + q.id + '" '
                    + 'id="' + naId + '" value="na" data-qid="' + q.id
                    + '" data-qkey="' + esc(q.question_key) + '">'
                    + '<label class="na-label" for="' + naId + '" title="Not applicable">N/A</label>';
            }
            tr.appendChild(tdNa);

            qTbody.appendChild(tr);
        });

        // Listen to all radio changes
        qTbody.querySelectorAll('.tick-input').forEach(function (input) {
            input.addEventListener('change', function () {
                var qid  = this.dataset.qid;
                var qkey = this.dataset.qkey;
                var val  = this.value;
                var tr   = this.closest('tr');
                tr.classList.add('answered');

                if (val === 'na') {
                    answers[qid] = { question_id: qid, question_key: qkey, answer_yn: null, answer_rating: null };
                } else {
                    answers[qid] = { question_id: qid, question_key: qkey, answer_yn: null, answer_rating: parseInt(val, 10) };
                }

                updateProgress();
                hideAlert();
            });
        });

        qSkeleton.style.display = 'none';
        qTable.style.display    = '';
        updateProgress();
    }

    // ── Notes counter ─────────────────────────────────────────────────
    notesEl.addEventListener('input', function () {
        notesCnt.textContent = this.value.length;
    });

    // ── Submit ────────────────────────────────────────────────────────
    submitBtn.addEventListener('click', function () {
        if (Object.keys(answers).length < questions.length) {
            showAlert('Please answer all ' + questions.length + ' questions before submitting.');
            var firstUnanswered = qTbody.querySelector('tr:not(.answered)');
            if (firstUnanswered) { firstUnanswered.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
            return;
        }

        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        hideAlert();

        fetch(API_BASE + '/survey/submit/' + SURVEY_TOKEN, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({
                answers: Object.values(answers),
                notes:   notesEl.value.trim() || null,
            }),
        })
        .then(function (r) { return r.json(); })
        .then(function (data) {
            if (data.status) {
                showState('thankyou');
            } else {
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                showAlert(data.message || 'Failed to submit. Please try again.');
            }
        })
        .catch(function () {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            showAlert('Network error. Please check your connection and try again.');
        });
    });

    // ── Load survey ───────────────────────────────────────────────────
    function loadSurvey() {
        if (!SURVEY_TOKEN) {
            showInvalid('Survey Unavailable', 'No survey token was found in this link.');
            return;
        }

        fetch(API_BASE + '/survey/form/' + SURVEY_TOKEN)
            .then(function (r) { return r.json(); })
            .then(function (data) {

                if (data.completed) { showState('thankyou'); return; }

                if (!data.status) {
                    showInvalid('Survey Unavailable', data.message || 'This survey link is no longer valid.');
                    return;
                }

                var ctx = data.context || {};
                console.log(ctx);
                // ── Branding header (clients.letter_header) ──
                if (ctx.letter_header_url) {
                    document.getElementById('letter-header-img').src = ctx.letter_header_url;
                    document.getElementById('branding-header').style.display = '';
                }
                if (ctx.letter_footer_url) {
                    document.getElementById('letter-footer-img').src = ctx.letter_footer_url;
                    document.getElementById('branding-footer').style.display = '';
                }

                // ── Job details panel ──
                if (ctx.job_code) {
                    document.getElementById('detail-job-code').textContent = ctx.job_code;
                    document.getElementById('detail-job-code').classList.remove('empty');
                }
                if (ctx.address) {
                    document.getElementById('detail-address').textContent = ctx.address;
                }                
                if (ctx.resident_name) {
                    document.getElementById('detail-name').textContent = ctx.resident_name;
                }
                if (ctx.resident_number) {
                    document.getElementById('detail-number').textContent = ctx.resident_number;
                }
                if (ctx.company_address) {
                    // Render newlines (\n or \r\n) in the address as line breaks
                    document.getElementById('address-display').innerHTML =
                        esc(ctx.company_address).replace(/\r\n|\r|\n/g, '<br>');
                }
                // ── Right panel: contact details (Email / Tel / Website) ──
                var contactParts = [];
                if (ctx.company_email)   contactParts.push('Email: ' + ctx.company_email);
                if (ctx.company_phone)   contactParts.push('Tel: '   + ctx.company_phone);
                if (ctx.website_url) contactParts.push(ctx.website_url);
                if (contactParts.length) {
                    document.getElementById('contact-display').innerHTML =
                        contactParts.join('<br>');
                }

                // Date = today (work was carried out today)
                var today = new Date();
                document.getElementById('detail-date').textContent =
                    today.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

                questions = data.questions || [];
                renderQuestions();
                showState('form');
            })
            .catch(function () {
                showInvalid('Unable to Load', 'Unable to load the survey. Please try again later.');
            });
    }

    loadSurvey();
}());
</script>

</body>
</html>