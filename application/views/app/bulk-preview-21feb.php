<?php

$bulk_data = $data['parsed_data']['error_records'];

$bulk_data_errors            = array();
$GLOBALS['duplicate_founds'] = array();
$duplicate_data_errors       = array();
$total_present               = 0;
$total_errors                = 0;
$total_rows                  = 0;
if (isset($data['parsed_data']['duplicate_within_file']) && is_array($data['parsed_data']['duplicate_within_file']) && is_countable($data['parsed_data']['duplicate_within_file']) && count($data['parsed_data']['duplicate_within_file']) > 0)
{
    $duplicate_data_errors = $data['parsed_data']['duplicate_within_file'];
}
$has_errors = 1;
$batch_id   = 0;
if (isset($data['parsed_data']['errors']) && is_array($data['parsed_data']['errors']))
{
    $bulk_data_errors = $data['parsed_data']['errors'];
}
if (isset($data['parsed_data']['has_errors']))
{
    $has_errors = $data['parsed_data']['has_errors'];
}
if (isset($data['batch_id']))
{
    $batch_id = $data['batch_id'];
}

//var_dump($bulk_data_errors);

if (isset($data['parsed_data']['total_rows']) && $data['parsed_data']['total_rows'] > 0)
{
    $total_rows = $data['parsed_data']['total_rows'];
}
$total_errors = count(array_filter($bulk_data_errors));
if (isset($data['parsed_data']['total_present']) && $data['parsed_data']['total_present'] > 0)
{
    $total_present = $data['parsed_data']['total_present'];
}
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
                <div class="row align-items-center">
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

<!--                                <input type="radio" class="btn-check show-rows-radio" name="options" id="show_rows_present" value="3">
                                <label class="btn btn-secondary" for="show_rows_present">Show records that need an update</label>-->

                                <input type="radio" class="btn-check show-rows-radio" name="options" id="show_rows_failed" value="1">
                                <label class="btn btn-secondary" for="show_rows_failed">Problem records</label>
                            </div>
                        </div>

                        <!--                        <div class="">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input show-rows-radio" name="show_rows" type="radio" id="show_rows_all" value="2">
                                                        <label class="form-check-label" for="show_rows_all">Show all</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input show-rows-radio" name="show_rows" type="radio" id="show_rows_passed" value="0" checked="">
                                                        <label class="form-check-label" for="show_rows_passed">Records good for import</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input show-rows-radio" name="show_rows" type="radio" id="show_rows_present" value="3">
                                                        <label class="form-check-label" for="show_rows_present">Show records that need an update</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input show-rows-radio" name="show_rows" type="radio" id="show_rows_failed" value="1">
                                                        <label class="form-check-label" for="show_rows_failed">Problem records</label>
                                                    </div>

                                                </div>-->
                    </div>
                </div>
                <div class="clearfix"><br/><br/></div>
                <div class="table-responsive table-card mb-4" style="max-height:500px; ">

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
                                <tr class="table-warning " style="font-size: 18px">
                                    <th>
                                        Import
                                    </th>
                                    <th colspan="<?= count($bulk_data[0]) ?>">
                                        Processed total <?= $total_rows ?> records | <?= $total_present ?> records already present | Errors found in <span class="text-danger"><?= $total_errors ?> records</span>
                                        &nbsp;&nbsp;&nbsp;
                                    </th>
                                </tr>
                                <tr class="sticky">
                                    <th>
                                        <input class="form-check-input" checked="checked" name="upload_check_all" type="checkbox" id="upload_check_all">
                                    </th>
                                    <?php

                                    foreach ($cols as $c)
                                    {
                                        if ($c == 'has_errors')
                                        {
                                            ?>
                                            <th>Error(s)</th>
                                            <?php

                                        }
                                        else if ($c == 'error_message' || $c == 'added_by' || $c == 'add_date' || $c == 'is_present')
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

                                $i            = 0;
                                $disable_rows = array();
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
                                    if (isset($bulk_data_errors[$i]) && is_array($bulk_data_errors[$i]) && count($bulk_data_errors[$i]) > 0)
                                    {
                                        $error_text = implode('<br/>', $bulk_data_errors[$i]);
                                        $cls        = 'table-danger failed-rows';
                                        $css        = '';
                                        $passed     = false;
                                    }
                                    ?>
                                    <tr data-row-id="<?= $i ?>" class="<?= $cls ?> bulk-row" style="<?= $css ?>">
                                        <?php

                                        if (trim($error_text) == '')
                                        {
                                            ?>
                                            <th>
                                                <input
                                                <?php

                                                $row_present = '0';
                                                if ($present)
                                                {
                                                    $row_present = '1';
                                                }
                                                if ($passed)
                                                {
                                                    echo 'checked="checked"';
                                                }
                                                ?>
                                                    class="form-check-input upload_check" data-is-present="<?= $row_present ?>"
                                                    name="upload_check_<?= $i ?>" value="<?= $i ?>" type="checkbox" id="upload_check_<?= $i ?>">
                                            </th>
                                            <?php

                                        }
                                        else
                                        {
                                            ?>
                                            <td>&nbsp;</td>
                                            <?php

                                        }
                                        ?>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <!--<td><?= $error_text; ?></td>-->
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
                                                            <span class="badge bg-danger"><?= $err ?></span><br/>
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
                                            else if ($c == 'error_message' || $c == 'added_by' || $c == 'add_date' || $c == 'is_present')
                                            {

                                            }
                                            else
                                            {
                                                $d_check = check_data_duplicate($duplicate_data_errors, $c, $uploaded_data[$c]);
                                                if ($d_check)
                                                {
                                                    $disable_rows[] = $i;
                                                    ?>
                                                    <td class="table-warning">
                                                        <?= $uploaded_data[$c] ?><br/>
                                                        <span class="badge bg-danger">duplicate within file</span>
                                                    </td>
                                                    <?php

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
                                                                                    <strong> Data error! </strong> <b></b> Some row(s) highlighted in red contains errors, full import cannot be processed!
                                                                                </div>

                                                                                <div class="clearfix">&nbsp;</div>-->
                                        <?php

                                    }

                                    if ($batch_id > 0)
                                    {
                                        ?>
                                        <a style="display: none" data-action="import_update_records" data-batch-id="<?= $batch_id ?>" data-total-rows="<?= $total_rows ?>" data-present-rows="<?= $total_present ?>" data-total-errors="<?= $total_errors ?>" id="sa-warning" class="process-bulk-upload process-bulk-upload-update btn btn-primary w-sm">
                                            <i class="ri-chat-upload-line me-1 align-bottom"></i> Import & Update Record(s)
                                        </a>
                                        <a style="display: none" data-action="import_new_records" data-batch-id="<?= $batch_id ?>" data-total-rows="<?= $total_rows ?>" data-present-rows="<?= $total_present ?>" data-total-errors="<?= $total_errors ?>" id="sa-warning" class="process-bulk-upload btn btn-success w-sm">
                                            <i class="ri-chat-upload-line me-1 align-bottom"></i> Import Record(s)
                                        </a>

                                        <?php

                                    }
                                    ?>

                                    <a onclick="return ajs.closeBulkUpload()" class="btn btn-warning w-sm"><i class="ri-close-circle-line me-1 align-bottom"></i> Cancel</a>
                                    <input type="hidden" name="selected_rows" id="selected_rows" value="" autocomplete="off" />
                                    <input type="hidden" name="selected_rows_update" id="selected_rows_update" value="" autocomplete="off" />
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
<script type="text/javascript">
    function get_checked_rows()
    {
        $('.process-bulk-upload').css('display', 'none');
        var selected_rows = $(".bulk-upload-rows .upload_check:checked[data-is-present='0']").map(function () {
            return $(this).val();
        }).get();
        var selected_rows_update = $(".bulk-upload-rows .upload_check:checked[data-is-present='1']").map(function () {
            return $(this).val();
        }).get();
        $('#selected_rows').val(selected_rows);
        $('#selected_rows_update').val(selected_rows_update);

        if ($('.bulk-upload-rows .upload_check:checked').length) {
            var total_checked = $(".bulk-upload-rows .upload_check:checked[data-is-present='0']").length;
            var total_checked_update = $(".bulk-upload-rows .upload_check:checked[data-is-present='1']").length;
            $('.process-bulk-upload').html('<i class="ri-chat-upload-line me-1 align-bottom"></i> Import <b>' + total_checked + '</b> new record(s) only');
            $('.process-bulk-upload-update').html('<i class="ri-chat-upload-line me-1 align-bottom"></i> Import <b>' + total_checked + '</b> new & update <b>' + total_checked_update + '</b> record(s)');
            $('.process-bulk-upload').css('display', '');
        }
    }

    $(function () {
        $('#upload_check_all').change(function () {
            var status = $(this).is(":checked") ? true : false;
            $(".bulk-upload-rows .upload_check").prop("checked", status);
            get_checked_rows();
        });

        $('.show-rows-radio').change(function () {
            var show_row = $(this).val();
            $('.bulk-row').css('display', 'none');
            if (show_row == '0')
            {
                $('.success-rows').css('display', '');
            } else if (show_row == '1')
            {
                $('.failed-rows').css('display', '');
            } else if (show_row == '2')
            {
                $('.bulk-row').css('display', '');
            } else if (show_row == '3')
            {
                $('.present-rows').css('display', '');
            }
        });

        $('.bulk-upload-rows .upload_check').change(function () {
            get_checked_rows();
        });
    });

<?php

if (isset($disable_rows) && is_countable($disable_rows) && count($disable_rows) > 0)
{
    foreach ($disable_rows as $dr)
    {
        ?>
            $('#upload_check_<?= $dr ?>').remove();
            $("table").find(`tr[data-row-id='<?= $dr ?>`).css('display', '');
            $("table").find(`tr[data-row-id='<?= $dr ?>`).removeClass('table-success success-rows');
            $("table").find(`tr[data-row-id='<?= $dr ?>`).addClass('table-danger failed-rows');
        <?php

    }
}
?>

    $("#show_rows_failed").prop("checked", true);
    get_checked_rows();
</script>
<!--end col-->

