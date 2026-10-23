<div class="row mt-3 sub-poperty-details-section">
    <div class="col-xxl-12">
        <div class="row">
            <div class="col-xxl-6">
                <h5 class="mb-1">Details</h5>
                <hr class="mt-1 mb-2">
                <table class="table mb-0">
                    <tbody>
                        <tr>
                            <td><b>Task Code</b></td>
                            <td class="detail-data"><span id="detail_task_code">-</span></td>
                        </tr>
                        <tr>
                            <td><b>Task Name</b></td>
                            <td class="detail-data"><span id="detail_task_name">-</span></td>
                        </tr>
                        <tr>
                            <td><b> Service Name</b></td>
                            <td class="detail-data"><span id="detail_service_name">-</span></td>
                        </tr>
                        <tr>
                            <td><b>UPRN</b></td>
                            <td class="detail-data"><span id="detail_uprn_no">-</span></td>
                        </tr>
                        <tr>
                            <td><b>Client Code</b></td>
                            <td class="detail-data"><span id="detail_client_code">-</span></td>
                        </tr>
                        <tr>
                            <td><b>Status</b></td>
                            <td class="detail-data"><span id="detail_task_status">-</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-xxl-6">
                <h5 class="mb-1">&nbsp;</h5>
                <hr class="mt-1 mb-2">
                <table class="table mb-0">
                    <tbody>
                        <tr>
                            <td><b>Summary</b></td>
                            <td class="detail-data"><span id="detail_summary">-</span></td>
                        </tr>
                        <tr>
                            <td><b>Engr. Comments</b></td>
                            <td class="detail-data"><span id="detail_engineer_comments">-</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="hidden_task_id" value="<?= $id ?>" />
<input type="hidden" name="is_detail_page" id="is_detail_page" value="1" />
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/task.js') ?>"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/jobs/task-details.js?v=1.1') ?>"></script>