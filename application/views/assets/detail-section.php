<div class="row mt-3 sub-poperty-details-section">
    <div class="col-xxl-12">
        <div class="row">
            <div class="col-xxl-4 col-md-4">
                <div class="border-main-details">
                    <table class="table mb-0">
                        <tbody>
                            <tr>
                                <td><b>Asset ID</b></td>
                                <td class="detail-data"><span id="detail_id"></span></td>
                            </tr>
                            <tr>
                                <td><b>Equipment Type</b></td>
                                <td class="detail-data"><span id="detail_equipment_type"></span></td>
                            </tr>
                            <tr>
                                <td><b>Make</b></td>
                                <td class="detail-data"><span id="detail_make"></span></td>
                            </tr>
                            <tr>
                                <td><b>Model</b></td>
                                <td class="detail-data"><span id="detail_model"></span></td>
                            </tr>
                            <tr>
                                <td><b>Serial Number</b></td>
                                <td class="detail-data"><span id="detail_serial_number"></span></td>
                            </tr>
                            <tr>
                                <td><b>Client Asset Number</b></td>
                                <td class="detail-data"><span id="detail_client_asset_number"></span></td>
                            </tr>
                            <!-- <tr>
                                <td><b>SOR Code (Default)</b></td>
                                <td class="detail-data"><span id="detail_sor_code"></span></td>
                            </tr>
                            <tr>
                                <td><b>Fixed Price SOR</b></td>
                                <td class="detail-data"><span id="detail_fixed_price_sor_code"></span></td>
                            </tr>
                            <tr>
                                <td><b>Fixed Price Multiplier</b></td>
                                <td class="detail-data"><span id="detail_fixed_price_multiplier"></span></td>
                            </tr>
                            <tr>
                                <td><b>Pricing Model</b></td>
                                <td class="detail-data"><span id="detail_pricing_model"></span></td>
                            </tr>
                            <tr>
                                <td><b>Asset Pricing</b></td>
                                <td class="detail-data"><span id="detail_asset_pricing"></span></td>
                            </tr> -->
                            <tr>
                                <td><b>Visual Condition</b></td>
                                <td class="detail-data"><span id="detail_visual_condition"></span></td>
                            </tr>
                            <tr>
                                <td><b>Quantity</b></td>
                                <td class="detail-data"><span id="detail_quantity"></span></td>
                            </tr>
                            <tr>
                                <td><b>Service Frequency</b></td>
                                <td class="detail-data"><span id="detail_service_frequency"></span></td>
                            </tr>                            
                            <tr>
                                <td><b>Description</b></td>
                                <td class="detail-data"><span id="detail_description"></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-xxl-4 col-md-4">
                <div class="border-main-details">
                    <table class="table mb-0">
                        <tbody>
                            <tr>
                                <td><b>Approximate Age</b></td>
                                <td class="detail-data"><span id="detail_approximate_age"></span></td>
                            </tr>
                            <tr>
                                <td><b>Installation Date</b></td>
                                <td class="detail-data"><span id="detail_installation_date"></span></td>
                            </tr>
                            <tr>
                                <td><b>Expiry Date</b></td>
                                <td class="detail-data"><span id="detail_expiry_date"></span></td>
                            </tr>
                            <tr>
                                <td><b>Manufacturer Warranty Expiry</b></td>
                                <td class="detail-data"><span id="detail_manufacturer_warranty_expiry"></span></td>
                            </tr>
                            <tr>
                                <td><b>Our Warranty Expiry</b></td>
                                <td class="detail-data"><span id="detail_our_warranty_expiry"></span></td>
                            </tr>
                            <tr>
                                <td><b>Status</b></td>
                                <td class="detail-data"><span id="detail_status"></span></td>
                            </tr>
                            <tr>
                                <td><b>Location On Site</b></td>
                                <td class="detail-data"><span id="detail_asset_location"></span></td>
                            </tr>
                            <tr>
                                <td><b>Asset Notes</b></td>
                                <td class="detail-data"><span id="detail_notes"></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-xxl-4 col-md-4">
                <div class="border-main-details">
                    <table class="table mb-0">
                        <tbody id="custom_details">

                        </tbody>
                        <tbody id="qr_details">
                            <tr>
                                <td><b>Asset QR</b></td>
                                <td class="detail-data"><span id="detail_qr"></span></td>
                            </tr>
                            <tr>
                                <td><b>Asset Barcode</b></td>
                                <td class="detail-data"><span id="detail_barcode"></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12">
        <div class="row mt-5" id="detail_images">
            <h4 class="mb-3">Images</h4>
        </div>
        <div class="row mt-5" id="detail_documents">
            <h4 class="mb-3">Documents</h4>
        </div>
    </div>
</div>
<input type="hidden" id="asset_id" value="<?= $id ?? null ?>" />
<input type="hidden" id="property_id" value="<?= $property_id ?? null ?>" />
<input type="hidden" id="client_id" value="<?= $client_id ?? null ?>" />
<input type="hidden" id="is_detail_page" value="1" />
<script src="<?= cnd_url(); ?>assets/libs/dropzone/dropzone-min.js"></script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/assets.js?v=1.1') ?>"></script>
<!-- End Page-content -->
<script type="text/javascript">
    $('.client-sub-nav').find('a[data-tab="client-properties"]').addClass('active');
    $('.property-sub-nav').find('a[data-tab="property-assets"]').addClass('active');
</script>