<div class="row mt-3">
    <div class="col-xxl-12">
        <div class="row">
            <div class="col-xxl-4">
                <table class="table mb-0">
                    <tbody>
                        <tr>
                            <td><b>Title</b></td>
                            <td id="detail_title"></td>
                        </tr>
                        <tr>
                            <td><b>SOR Code</b></td>
                            <td id="detail_sor_code"></td>
                        </tr>
                        <tr>
                            <td><b>SOR For</b></td>
                            <td id="detail_sor_for"></td>
                        </tr>
                        <tr>
                            <td><b>SOR Type</b></td>
                            <td id="detail_sor_type_name"></td>
                        </tr>
                        <tr>
                            <td><b>Job Type</b></td>
                            <td id="detail_service_name"></td>
                        </tr>
                        <tr>
                            <td><b>Engineer Accreditation</b></td>
                            <td id="detail_engg_accreditation"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-xxl-4">
                <table class="table mb-0">
                    <tbody>
                        <tr>
                            <td><b>Material Price</b></td>
                            <td id="detail_material_price"></td>
                        </tr>
                        <tr>
                            <td><b>Labour Price</b></td>
                            <td id="detail_labor_price"></td>
                        </tr>
                        <tr>
                            <td><b>Sell Price</b></td>
                            <td id="detail_sell_price"></td>
                        </tr>
                        <tr>
                            <td><b>Short Description</b></td>
                            <td id="detail_short_description"></td>
                        </tr>
                        <tr>
                            <td><b>Description</b></td>
                            <td id="detail_description"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-xxl-4">
                <!-- <h4 class="mb-3">Certificates</h4> -->
                <table class="table mb-0">
                    <thead>
                        <tr>
                            <th>Certificates</th>
                            <th>Required</th>
                        </tr>
                    </thead>
                    <tbody id="certificate_details">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="sor_id" value="<?= $id ?? null ?>" />
<input type="hidden" id="is_detail_page" value="1" />
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/systems/sors.js') ?>"></script>