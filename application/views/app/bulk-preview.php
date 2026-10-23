`<?php
$data = is_array($data) ? $data : [];

// ✅ make parsed_data safe first
$parsed_data = $data['parsed_data'] ?? [];

// ✅ now safe access
$bulk_data = $parsed_data['error_records'] ?? [];

$data_type                   = '';
$bulk_data_errors            = $data['errors'] ?? [];
$GLOBALS['duplicate_founds'] = array();
$duplicate_data_errors       = array();
$to_be_uploaded              = array();
$to_be_modified              = array();
$total_present               = 0;
$total_errors                = 0;
$total_rows                  = 0;
$batch_number                = '';
if (isset($data['parsed_data']['duplicate_within_file']) && is_array($data['parsed_data']['duplicate_within_file']) && is_countable($data['parsed_data']['duplicate_within_file']) && count($data['parsed_data']['duplicate_within_file']) > 0)
{
    $duplicate_data_errors = $data['parsed_data']['duplicate_within_file'];
}
if (isset($data['parsed_data']['data_type']) && trim($data['parsed_data']['data_type']) != '')
{
    $data_type = $data['parsed_data']['data_type'];
}
$has_errors = 1;
$batch_id   = 0;
if (isset($data['parsed_data']['total_errors']))
{
    $total_errors = $data['parsed_data']['total_errors'];
}
if (isset($data['parsed_data']['has_errors']))
{
    $has_errors = $data['parsed_data']['has_errors'];
}
if (isset($data['batch_id']))
{
    $batch_id = $data['batch_id'];
}

if (isset($data['parsed_data']['total_rows']) && $data['parsed_data']['total_rows'] > 0)
{
    $total_rows = $data['parsed_data']['total_rows'];
}

if (isset($data['parsed_data']['batch_number']) && $data['parsed_data']['batch_number'] > 0)
{
    $batch_number = $data['parsed_data']['batch_number'];
    $batch_number = 'with batch number <b>' . $batch_number . '</b>';
}
//$total_errors = count(array_filter($bulk_data_errors));
if (isset($data['parsed_data']['total_present']) && $data['parsed_data']['total_present'] > 0)
{
    $total_present = $data['parsed_data']['total_present'];
}
if (isset($data['parsed_data']['to_be_uploaded']) && is_array($data['parsed_data']['to_be_uploaded']))
{
    $to_be_uploaded = $data['parsed_data']['to_be_uploaded'];
}
if (isset($data['parsed_data']['to_be_modified']) && is_array($data['parsed_data']['to_be_modified']))
{
    $to_be_modified = $data['parsed_data']['to_be_modified'];
}
$total_success = count($to_be_uploaded) + count($to_be_modified);
function check_data_duplicate($errors, $key, $value)
{
    return false;
    if (isset($errors[$key]))
    {
        if (in_array($value, $errors[$key]))
        {
            if (in_array($value, $GLOBALS['duplicate_founds']))
            {
                return true;
            }
            else
            {
                $GLOBALS['duplicate_founds'][] = $value;
                return false;
            }
        }
        return false;
    }
    return false;
}
?>
<style>
    .sticky-head-table thead .sticky {
        position: sticky;
        top: 0;
        z-index: 1;
    }
</style>

<div class="row">
    <div class="col-lg-12">
        <div class="card" id="tasksList">

            <!--end card-body-->
            <div class="card-body filter-body">
<!--                <span class="badge bg-dark-subtle text-body p-3" style="font-size:14px"><i class="mdi mdi-information"></i> Processed total <?= $total_rows ?> Rows | Errors found in <?= $total_errors ?> Rows</span>
                <div class="clearfix"><br/><br/></div>-->
                <!--                <div class="row align-items-center">
                                    <div style="" class="col-xxl-8 col-md-6">
                                        <span class="badge bg-success-subtle text-dark p-2" style="font-size:14px"><i class="mdi mdi-thumb-up"></i> Ok Records</span>
                                        <span class="badge bg-primary-subtle text-dark p-2" style="font-size:14px"><i class="mdi mdi-thumb-up"></i> Records already present</span>
                                        <span class="badge bg-danger-subtle text-dark  p-2" style="font-size:14px"><i class="mdi mdi-thumb-down"></i> Records with validation errors</span>
                                        <span class="badge bg-warning-subtle text-dark p-2" style="font-size:14px"><i class="mdi mdi-thumb-down"></i> Duplicate inside excel</span>
                                    </div>
                                    <div style="" class="col-xxl-4 col-md-6 text-end">

                                        <div class="live-preview filter-preview">
                                            <div class="hstack gap-2 flex-wrap justify-content-end">
                                                <input type="radio" class="btn-check show-rows-radio" name="options" id="show_rows_all" value="2">
                                                <label class="btn btn-secondary" for="show_rows_all">Show all</label>

                                                <input type="radio" class="btn-check show-rows-radio" name="options" id="show_rows_passed" value="0">
                                                <label class="btn btn-secondary" for="show_rows_passed">Records good for import</label>

                                                <input type="radio" class="btn-check show-rows-radio" name="options" id="show_rows_present" value="3">
                                                <label class="btn btn-secondary" for="show_rows_present">Show records that need an update</label>

                                                <input type="radio" class="btn-check show-rows-radio" name="options" id="show_rows_failed" value="1">
                                                <label class="btn btn-secondary" for="show_rows_failed">Export problem records</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"><br/><br/></div>-->
                <div class="table-responsive table-card mb-4" style="max-height:600px; ">

                    <?php

                    $i = 0;
                    if (isset($bulk_data) && count($bulk_data) > 0)
                    {
                        $cols = array();
                        foreach ($bulk_data[0] as $key => $val)
                        {
                            $cols[] = $key;
                        }
                        ?>
                        <table class="table align-middle table-nowrap mb-0 table-bordered sticky-head-table table-sm" id="tasksTable">
                            <thead class="table-light ">
                                <tr class="table-warning" style="font-size: 18px">
                                    <th>
                                        <?php

                                        if ($total_errors > 0)
                                        {
                                            ?>
                                            <button id="export_bulk_errors" data-batch-id="<?= $batch_id ?>" class="export_bulk_errors btn btn-secondary btn-sm text-end" for="show_rows_failed">Export problem records</button>
                                            <?php

                                        }
                                        ?>

                                    </th>
                                    <th colspan="<?= count($bulk_data[0]) - 1; ?>">
                                        <?php

                                        $import_report_msg = "Processed " . $total_rows . " records | " . $total_present . " records exists | Errors in <span class='text-danger'>" . $total_errors . " records</span> | <span class='text-primary'>" . $total_success . " records good to import</span>";
                                        echo $import_report_msg;
                                        ?>

                                        &nbsp;&nbsp;&nbsp;
                                    </th>
                                </tr>
                                <tr rowspan="2" class="sticky">
                                    <?php

                                    foreach ($cols as $c)
                                    {
                                        if ($c == 'has_errors')
                                        {
                                            ?>
                                            <th>Error(s)</th>
                                            <?php

                                        }
                                        else if ($c == 'error_message' || $c == 'added_by' || $c == 'add_date' || $c == 'is_present' || str_contains($c,'hidden'))
                                        {

                                        }
                                        else
                                        {
                                            ?>
                                            <th><?= $c; ?></th>
                                            <?php

                                        }
                                    }
                                    ?>
                                </tr>
                            </thead>
                            <tbody class="form-check-all bulk-upload-rows">
                                <?php

                                $i = 0;
                                foreach ($bulk_data as $uploaded_data)
                                {
                                    $passed     = true;
                                    $present    = false;
                                    $error_text = '';
                                    $css        = 'display:none';
                                    $cls        = 'table-success success-rows';
                                    if (isset($uploaded_data['is_present']) && $uploaded_data['is_present'] == '1')
                                    {
                                        $present = TRUE;
                                        $passed  = TRUE;
                                        $cls     = 'table-primary success-rows present-rows';
                                    }
                                    if (isset($uploaded_data['has_errors']) && $uploaded_data['has_errors'] == '1')
                                    {
                                        $error_text = implode('<br/>', $uploaded_data['error_message']);
                                        $cls        = 'table-danger failed-rows';
                                        $css        = '';
                                        $passed     = false;
                                    }
                                    ?><tr data-row-id="<?= $i ?>" class="<?= $cls ?> bulk-row" style="<?= $css ?>">                                                                                                                                                              <!--<td><?= $error_text; ?></td>-->
                                        <?php

                                        foreach ($cols as $c)
                                        {
                                            if ($c == 'has_errors')
                                            {
                                                ?>
                                                <td><?php

                                                    if (isset($uploaded_data['error_message']) && is_countable($uploaded_data['error_message']) && count($uploaded_data['error_message']) > 0)
                                                    {
                                                        foreach ($uploaded_data['error_message'] as $err)
                                                        {
                                                            ?>
                                                            <span class="badge bg-danger text-white"><?= $err ?></span><br/>
                                                            <?php

                                                        }
                                                    }
                                                    else
                                                    {
                                                        ?>
                                                        <span class="badge bg-success">Passed</span>
                                                        <?php

                                                        if (isset($uploaded_data['is_present']) && $uploaded_data['is_present'] == '1')
                                                        {
                                                            ?>
                                                            <span class="badge bg-warning">Record Present</span><br/>
                                                            <?php

                                                        }
                                                        ?>
                                                        <?php

                                                    }
                                                    ?>
                                                </td>
                                                <?php

                                            }
                                            else if ($c == 'error_message' || $c == 'added_by' || $c == 'add_date' || $c == 'is_present' || str_contains($c,'hidden'))
                                            {

                                            }
                                            else
                                            {
                                                if (is_array($uploaded_data[$c]))
                                                {
                                                    ?>
                                                    <td><?= $uploaded_data[$c]['value'] . ' <b>(' . $uploaded_data[$c]['id'] . ')</b>'; ?></td>
                                                    <?php

                                                }
                                                else
                                                {
                                                    ?>
                                                    <td><?= $uploaded_data[$c] ?></td>
                                                    <?php

                                                }
                                            }
                                        }
                                        ?>
                                    </tr>
                                    <?php

                                    $i++;
                                }
                                ?>
                            </tbody>
                        </table>
                        <?php

                    }
                    ?>
                </div>
                <div class="border border-dashed border-top-0 border-end-0 border-start-0">
                    <div class="row">
                        <form method="POST" action="" data-upload-type="clients" data-file-type="excel" class="bulk-upload-form" enctype="multipart/form-data" novalidate="novalidate">
                            <div class="col-xxl-8 col-xl-8 col-lg-8 col-md-12">
                                <div class="d-flex align-items-center">
                                    <h5 class="card-title mb-0 flex-grow-1">Actions</h5>
                                </div>

                                <div class="gap-2 mt-3">
                                    <?php

                                    if ($has_errors == '1' && $batch_id > 0)
                                    {
                                        ?>
                                        <!--                                        <div class="alert alert-danger mb-xl-0 w-100" role="alert">
                                                                                    <strong> Data error! </strong> <b></b> Some row(s) highlighted in red contains errors, fullsorsBatchcannot be processed!
                                                                                </div>

                                                                                <div class="clearfix">&nbsp;</div>-->
                                        <?php

                                    }

                                    if ($batch_id > 0)
                                    {
                                        if (count($to_be_modified) > 0)
                                        {
                                            ?>
                                            <a data-action="import_update_records" data-batch-id="<?= $batch_id ?>" data-total-rows="<?= $total_rows ?>" data-present-rows="<?= $total_present ?>" data-total-errors="<?= $total_errors ?>" id="sa-warning" class="process-bulk-upload process-bulk-upload-update btn btn-primary w-sm">
                                                <i class="ri-chat-upload-line me-1 align-bottom"></i> Import <b><?= count($to_be_uploaded) ?></b> & Update <b><?= count($to_be_modified) ?></b> Record(s) <?= $batch_number ?>
                                            </a>
                                            <?php

                                        }
                                        if (count($to_be_uploaded) > 0)
                                        {
                                            ?>
                                            <a data-action="import_new_records" data-batch-id="<?= $batch_id ?>" data-total-rows="<?= $total_rows ?>" data-present-rows="<?= $total_present ?>" data-total-errors="<?= $total_errors ?>" id="sa-warning" class="process-bulk-upload btn btn-success w-sm">
                                                <i class="ri-chat-upload-line me-1 align-bottom"></i> Import <b><?= count($to_be_uploaded) ?></b> Record(s) only <?= $batch_number ?>
                                            </a>
                                            <?php

                                        }
                                    }
                                    ?>

                                    <a onclick="return ajs.closeBulkUpload()" class="btn btn-warning w-sm"><i class="ri-close-circle-line me-1 align-bottom"></i> Cancel</a>
                                    <input type="hidden" name="selected_rows" id="selected_rows" value="<?= implode(',', $to_be_uploaded) ?>" autocomplete="off" />
                                    <input type="hidden" name="selected_rows_update" id="selected_rows_update" value="<?= implode(',', $to_be_modified) ?>" autocomplete="off" />
                                    <input type="hidden" name="data_type_bulk_upload" id="data_type_bulk_upload" value="<?= $data_type ?>" autocomplete="off" />
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!--end card-body-->
        </div>
        <!--end card-->
    </div>
</div>
<?php

$msg_html = "Chose an action from the list below<br/><br/>";
if ($batch_id > 0)
{
    if (count($to_be_modified) > 0)
    {
        $msg_html .= '<a data-action="import_update_records" data-batch-id="' . $batch_id . '" data-total-rows="' . $total_rows . '" data-present-rows="' . $total_present . '" data-total-errors="' . $total_errors . '" id="sa-warning" class="process-bulk-upload btn-sm process-bulk-upload-update btn btn-primary w-sm"><i class="ri-chat-upload-line me-1 align-bottom"></i> Import <b>' . count($to_be_uploaded) . '</b> & Update <b>' . count($to_be_modified) . '</b> Record(s) ' . $batch_number . '</a>&nbsp;&nbsp;&nbsp;&nbsp;';
    }
    if (count($to_be_uploaded) > 0)
    {
        $msg_html .= '<a data-action="import_new_records" data-batch-id="' . $batch_id . '" data-total-rows="' . $total_rows . '" data-present-rows="' . $total_present . '" data-total-errors="' . $total_errors . '" id="sa-warning" class="process-bulk-upload btn-sm btn btn-success w-sm"><i class="ri-chat-upload-line me-1 align-bottom"></i> Import <b>' . count($to_be_uploaded) . '</b> Record(s) only ' . $batch_number . '</a>&nbsp;&nbsp;&nbsp;&nbsp;';
    }
    if ($total_errors > 0)
    {
        $msg_html .= '<button id="export_bulk_errors" data-batch-id="' . $batch_id . '" class="export_bulk_errors btn btn-secondary btn-sm text-end" for="show_rows_failed">Export problem records</button>&nbsp;&nbsp;&nbsp;&nbsp;';
    }
}
?>
<script type="text/javascript">
//    Swal.fire({
//        title: "<?php //$import_report_msg ?>",
//        html: `<?php //$msg_html ?>`,
//        showDenyButton: true,
//        showCancelButton: false,
//        showCloseButton: false,
//        showConfirmButton: false,
//        denyButtonText: "Abort"
//    }).then((result) => {
//        /* Read more about isConfirmed, isDenied below */
//        if (result.isConfirmed) {
//
//        } else if (result.isDenied) {
//            ajs.closeBulkUpload();
//        }
//    });
</script>
<!--end col-->

