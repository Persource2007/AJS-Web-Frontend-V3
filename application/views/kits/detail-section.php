<div class="row mt-3 sub-poperty-details-section">
    <div class="col-xxl-12">
        <div class="row">
            <div class="col-xxl-3">
                <h5 class="mb-1">Details</h5>
                <hr class="mt-1 mb-2">
                <table class="table mb-0">
                    <tbody>
                        <tr>
                            <td><b>Title</b></td>
                            <td id="detail_title">-</td>
                        </tr>
                        <tr>
                            <td><b>Type</b></td>
                            <td id="detail_type">-</td>
                        </tr>
                        <tr>
                            <td><b>Price Type</b></td>
                            <td id="detail_price_type" class=" text-capitalize">-</td>
                        </tr>
                        <tr>
                            <td><b>SOR</b></td>
                            <td id="detail_sor_code">-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-xxl-9">                
                <h5 class="mb-1">Items</h5>
                <hr class="mt-1 mb-2">
                <table class="table mb-0">
                    <thead class="table-light text-muted">
                        <tr>
                            <th>Manuf. Part No.</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Price Per Unit</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody id="detail-kit-items">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="kit_id" value="<?= $id ?>" />
<input type="hidden" name="is_detail_page" id="is_detail_page" value="1" />
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/kits/kit.js') ?>"></script>