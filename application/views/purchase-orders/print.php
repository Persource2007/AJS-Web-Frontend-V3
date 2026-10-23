<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <title>AJS</title>
    <style>
        header {
            border: none;
        }

        body {
            margin: 20px;
            padding: 0px;
            font-family: Arial, Helvetica, sans-serif;
            color: #000000;
            font-weight: 400;
            line-height: 18px;
        }

        table tr th,
        table tr td {
            padding: 10px 18px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
        }

        #item-list tr td {
            border-bottom: 1px solid #dfdfe3;
        }

        @media print {
            body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }

        @page {
            margin: 0;
        }
    </style>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <script>
        const site_url = '<?= api_url(); ?>';
    </script>
    <script src="<?= cnd_url('assets/js/app/ajs.js'); ?>" rel="stylesheet" type="text/javascript"></script>


</head>

<body>
    <table border="0" cellpadding="0" cellspacing="0" style="width:98%;" align="center">
        <tr>
            <td>
                <table border="0" cellpadding="10" cellspacing="0" width="100%" class="ticket_tbl">
                    <tr>
                        <td valign="top" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;">
                            <img src="<?= cdn_url('assets/images/AJS-logo-blue.png') ?>" alt="" width="100">
                            <p>Farley House, Kinvara Business Park<br>
                                22-42 Freshwater Road, Dagenham<br>
                                Essex RM8 1RY</p>
                        </td>
                        <td valign="top" align="right" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;">
                            <b style="font-size: 18px;" id="po_number"></b><br><br>
                            Date Issues: <b id="order_date">N/A</b><br>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="border-bottom: 1px solid #6f6b7d; padding: 0px;"></td>
                    </tr>
                    <tr>
                        <td valign="top" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;">
                            <p><b>Invoice To:</b><br>
                                Thomas shelby<br>
                                Shelby Company Limited<br>
                                Small Heath, B10 0HF, UK<br>
                                718-986-6062<br>
                                peakyFBlinders@gmail.com</p>
                        </td>
                        <td valign="top" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;">
                            <p><b>Deliver To:</b><br>
                            <div id="delivery_address"></div>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" align="right" height="0"></td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <thead style="background-color: #dfdfe3;">
                                    <tr>
                                        <th align="left" style="padding: 10px 18px;">ITEM</th>
                                        <th align="left" style="padding: 10px 18px;">DESCRIPTION</th>
                                        <th align="left" style="padding: 10px 18px;">COST</th>
                                        <th align="left" style="padding: 10px 18px;">QTY</th>
                                        <th align="left" style="padding: 10px 18px;">PRICE</th>
                                    </tr>
                                </thead>
                                <tbody id="item-list">
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="2" style="font-size: 14px;"><b>Salesperson: </b><span id="supplier_name"> -</span></td>
                                        <td colspan="2" align="right" style="font-weight: 600;">Sub-Total:</td>
                                        <td style="font-weight: 600;" id="sub_total_amt">$0.00</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" style="padding: 0px 18px; font-size: 14px;">Thanks for your business</td>
                                        <td align="right" style="padding: 0px 18px;">Discount:</td>
                                        <td style="padding: 0px 18px;" id="discount">$0.00</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" style="padding: 5px 18px; font-size: 14px;"></td>
                                        <td align="right" style="padding: 5px 18px; font-size: 12px;">Tax:</td>
                                        <td style="padding: 5px 18px; font-size: 12px;" id="tax">$0.00</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" style="padding: 0px 18px; font-size: 16px;"></td>
                                        <td align="right" style="padding: 0px 18px; font-size: 12px; font-weight: 600;">Total:</td>
                                        <td style="padding: 0px 18px; font-size: 12px; font-weight: 600;" id="total_amount">$0.00</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" align="right" height="0"></td>
                    </tr>
                    <tr>
                        <td colspan="2" style="border-bottom: 1px solid #6f6b7d; padding: 0px;"></td>
                    </tr>
                    <tr>
                        <td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;"><b>Note:</b> It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!</td>
                        <td style="text-align: right;"><button style="cursor:pointer" onclick="custom_print()" id="print-btn">Print</button></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
<script>
    function custom_print() {
        $("#print-btn").hide();
        window.print();
        $("#print-btn").show();
    }

    $(function() {

        function set_details(res) {
            if (res.status == true) {
                var order = res.data;
                $("#supplier_name").html(order.supplier_name);
                $("#po_number").html('ORDER #' + order.po_number);
                $("#order_date").html(ajs.format_date(order.add_date));

                var itemHtml = "";
                var subTotal = 0;
                $.each(order.items, function(_, item) {
                    var amount = (item.supplier_price * item.quantity).toFixed(2);
                    subTotal += parseFloat(amount);
                    itemHtml += `<tr>
                            <td>` + item.name + `</td>
                            <td>` + item.short_description + `</td>
                            <td>£` + item.supplier_price + `</td>
                            <td>` + item.quantity + `</td>
                            <td>£` + amount + `</td>
                        </tr>`;

                });
                const discount = (subTotal * order.discount / 100).toFixed(2);
                const tax = (subTotal * order.tax / 100).toFixed(2);
                const total_amount = (subTotal - discount) + +tax;

                $("#item-list").html(itemHtml);
                $("#sub_total_amt").html('£' + subTotal.toFixed(2));
                $("#total_amount").html('£' + total_amount.toFixed(2));

                $("#discount").html('£' + discount);
                $("#tax").html('£' + tax);

                if (order.delivery_type == 'warehouse') {
                    var address = order?.warehouse.address1 + ',</br>';
                    address += order?.warehouse.address2 + '</br>';
                    address += order?.warehouse.city_name + ' - ' + order?.warehouse.postalcode + '.</br>';

                    if (order?.warehouse.mobile) {
                        address += "M - " + order?.warehouse.mobile
                    }

                    $("#delivery_address").html(address);
                } else if (order.delivery_type == 'custom_address') {
                    var address = order?.address1 + ',</br>';
                    address += order?.address2 + ',</br>';
                    address += order?.area + ',</br>';
                    address += order?.city_name + ' - ' + order?.postcode + '.</br>';

                    $("#delivery_address").html(address);
                }
            }
        }

        function get_details() {
            var url = "<?= api_url('purchase-order/get/' . $id); ?>";
            ajs.ajax_form(url, null, "GET", null, "1", "1", set_details, set_details);
        }
        get_details();
    });
</script>

</html>