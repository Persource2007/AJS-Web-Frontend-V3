<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Job Summary</title>
    <?php require_once APPPATH . 'views/jobs/inc/summary-style.php'; ?>
    <style>
        body {
            margin: 20px;
            padding: 0;
        }

        #job_summary_print_trigger {
            margin-bottom: 14px;
        }

        @media print {
            #job_summary_print_trigger {
                display: none;
            }
        }
    </style>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <script>
        var site_url = '<?= api_url(); ?>';
        var cdn_url = '<?= cdn_url(); ?>';
    </script>
    <script src="<?= cdn_url('assets/js/app/ajs.js'); ?>" type="text/javascript"></script>
</head>

<body>
    <div id="job_summary_print_trigger" style="text-align:right">
        <button type="button" onclick="window.print()">Print</button>
    </div>
    <div id="job-summary-root">
        <div class="js-empty">Loading job summary...</div>
    </div>
    <script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/job-summary.js') ?>"></script>
    <script>
        JobSummary.load(<?= (int) $id ?>, '#job-summary-root', function () {
            window.print();
        });
    </script>
</body>

</html>
