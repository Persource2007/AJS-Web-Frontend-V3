<div class="row mt-3 sub-poperty-details-section">
    <div class="col-xxl-8">
        <div class="row">
            <div class="col-xxl-6">
                <table class="table mb-0">
                    <tbody>
                        <tr>
                            <td><b>Name </b></td>
                            <td class="detail-data"><span id="detail_name">-</span></td>
                        </tr>
                        <tr>
                            <td><b>Type</b></td>
                            <td class="detail-data"><span id="detail_type" class="text-capitalize">-</span></td>
                        </tr>
                        <tr>
                            <td><b>Category</b></td>
                            <td class="detail-data"><span id="detail_category">-</span></td>
                        </tr>
                        <tr>
                            <td><b>Make</b></td>
                            <td class="detail-data"><span id="detail_manufacturer">-</span></td>
                        </tr>
                        <tr>
                            <td><b>Model </b></td>
                            <td class="detail-data"><span id="detail_model">-</span></td>
                        </tr>
                        <tr>
                            <td><b>Manuf. Part No. </b></td>
                            <td class="detail-data"><span id="detail_manuf_part_no">-</span></td>
                        </tr>
                        <tr>
                            <td><b>AJS Part No.</b></td>
                            <td class="detail-data"><span id="detail_ajs_part_no">-</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-xxl-6">
                <table class="table mb-0">
                    <tbody>
                        <tr>
                            <td><b>Price Per Unit (£)</b></td>
                            <td class="detail-data"><span id="detail_price_per_unit">-</span></td>
                        </tr>
                        <tr>
                            <td><b>Sell Per Unit (£)</b></td>
                            <td class="detail-data"><span id="detail_sell_per_unit">-</span></td>
                        </tr>
                        <tr>
                            <td><b>Unit</b></td>
                            <td class="detail-data"><span id="detail_unit">-</span></td>
                        </tr>
                        <tr>
                            <td><b>Warranty Period</b></td>
                            <td class="detail-data"><span id="detail_warranty_period">-</span></td>
                        </tr>
                        <tr>
                            <td><b>Shelf Life</b></td>
                            <td class="detail-data"><span id="detail_shelf_life">-</span></td>
                        </tr>
                        <tr>
                            <td><b>Minimum threshold for Van</b></td>
                            <td class="detail-data"><span id="detail_minimum_threshold_van">-</span></td>
                        </tr>
                        <tr>
                            <td><b>Minimum threshold for Warehouse</b></td>
                            <td class="detail-data"><span id="detail_minimum_threshold_warehouse">-</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="col-xxl-4">
        <table class="table mb-0">
                    <tbody>
                        <tr>
                            <td><b>Short Description </b></td>
                            <td class="detail-data"><span id="detail_short_description">-</span></td>
                        </tr>
                        <tr>
                            <td><b>Long Description</b></td>
                            <td class="detail-data"><span id="detail_long_description">-</span></td>
                        </tr>
                        <tr>
                            <td><b>Other Info</b></td>
                            <td class="detail-data"><span id="detail_other_info">-</span></td>
                        </tr>
                    </tbody>
                </table>
    </div>
</div>
<input type="hidden" id="stock_id" value="<?= $id ?>" />
<input type="hidden" name="is_detail_page" id="is_detail_page" value="1" />
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/stocks/stock.js') ?>"></script>