<div class="row mt-3 sub-poperty-details-section">
    <div class="col-xxl-12">
        <div class="row">
            <div class="col-xxl-6 col-md-6">
                <div class="border-main-details">
                    <table class="table mb-0">
                        <tbody>
                            <tr>
                                <td><b>Name </b></td>
                                <td class="detail-data"><span id="detail_name">-</span></td>
                            </tr>
                            <tr>
                                <td><b>Email</b></td>
                                <td class="detail-data"><span id="detail_email">-</span></td>
                            </tr>
                            <tr>
                                <td><b>Telephone</b></td>
                                <td class="detail-data"><span id="detail_telephone">-</span></td>
                            </tr>
                            <tr>
                                <td><b>VAT Code </b></td>
                                <td class="detail-data"><span id="detail_vat_code">-</span></td>
                            </tr>
                            <tr>
                                <td><b>Account No. </b></td>
                                <td class="detail-data"><span id="detail_account_number">-</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-xxl-6 col-md-6">
                <div class="border-main-details">
                    <table class="table mb-0">
                        <tbody>
                            <tr>
                                <td><b>Address</b></td>
                                <td class="detail-data"><span id="detail_address">-</span></td>
                            </tr>
                            <tr>
                                <td><b>Additional Notes</b></td>
                                <td class="detail-data"><span id="detail_other_info">-</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="supplier_id" value="<?= $id ?>" />
<input type="hidden" name="is_detail_page" id="is_detail_page" value="1" />
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/suppliers/supplier.js') ?>"></script>