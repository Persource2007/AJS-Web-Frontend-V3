<div class="row mt-3 sub-poperty-details-section">
    <div class="col-lg-8">
        <div class="row">
            <div class="col-lg-6">
                <div class="border-main-details">
                    <h5 class="mb-1">Details</h5>
                    <hr class="mt-1 mb-2">
                    <table class="table mb-0">
                        <tbody>
                            <tr>
                                <td><b>Company</b></td>
                                <td class="detail-data"><span id="detail_company_name">-</span></td>
                            </tr>
                            <tr>
                                <td><b>Registration No.</b></td>
                                <td class="detail-data"><span id="detail_registration_no">-</span></td>
                            </tr>
                            <tr>
                                <td><b>VAT Number</b></td>
                                <td class="detail-data"><span id="detail_vat_no">-</span></td>
                            </tr>
                            <tr>
                                <td><b>Client Code</b></td>
                                <td class="detail-data"><span id="detail_client_code">-</span></td>
                            </tr>
                            <tr>
                                <td><b>Client Type</b></td>
                                <td class="detail-data"><span id="detail_client_type">-</span></td>
                            </tr>
                            <tr>
                                <td><b>Address</b></td>
                                <td class="detail-data"><span id="detail_address">-</span></td>
                            </tr>
                            <!-- <tr>
                                <td><b>Street Address</b></td>
                                <td id="detail_address2">-</td>
                            </tr>
                            <tr>
                                <td><b>Area</b></td>
                                <td id="detail_area">-</td>
                            </tr>
                            <tr>
                                <td><b>City</b></td>
                                <td id="detail_city">-</td>
                            </tr>
                            <tr>
                                <td><b>Postcode</b></td>
                                <td id="detail_postalcode">-</td>
                            </tr> -->
                            <!-- <tr>
                                <td><b>Email</b></td>
                                <td><a id="detail_email" href="#">-</a></td>
                            </tr>
                            <tr>
                                <td><b>Telephone</b></td>
                                <td><a id="detail_telephone_number" href="#">-</a></td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="border-main-details">
                    <h5 class="mb-1">Contact</h5>
                    <hr class="mt-1 mb-2">
                    <table class="table mb-0">
                        <tbody id="contacts">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-4">
        <div class="border-main-details">
            <h5 class="mb-1">AJS Contacts</h5>
            <hr class="mt-1 mb-2">
            <table class="table mb-0">
                <tbody id="ajs_contacts">
                </tbody>
            </table>
            <!--end table-->
        </div>
    </div>
</div>
<input type="hidden" id="client_id" value="<?= $id ?>" />
<input type="hidden" name="is_detail_page" id="is_detail_page" value="1" />
<script type="text/javascript">
    var is_modal = "<?= $this->input->get('modal') ?>";
</script>
<script type="text/javascript" src="<?= cdn_url('assets/js/datatables/clients/client-details.js') ?>"></script>