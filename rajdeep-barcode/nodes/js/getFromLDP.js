
print("barcodeArray from getLDP " + barcodeArray);

execution.setVariable('barcodeArray', S(JSON.stringify(barcodeArray)));


if (barcodeArray !== null) {
    var barcodesJoined = barcodeArray.map(barcode => '"' + barcode + '"').join(',');
} else {
    console.error('barcodeArray is null.');
}

print("\barcodesJoined from getLDP " + barcodesJoined);

var ldpGetItems = {};
var queryWrapper = {};
queryWrapper.sql = 'SELECT ie.barcode, ie.item_id, ie.permanent_loan_type_name, ie.temporary_loan_type_name, ie.discovery_suppress, ie.holdings_record_id ';
queryWrapper.sql += 'FROM folio_reporting.item_ext AS ie ';
queryWrapper.sql += 'INNER JOIN folio_reporting.holdings_ext he ON he.holdings_id = ie.holdings_record_id ';
queryWrapper.sql += 'WHERE ie.barcode IN (' + barcodesJoined + ')'; 


var ldpGetItemsJson = JSON.stringify(queryWrapper);

 print("\nSerialized ldpGetItems / queryWrapper from getLDP: " + ldpGetItemsJson);

 execution.setVariableLocal("ldpGetItems", ldpGetItemsJson);

 print("\nldpGetItems from getLDP before " + JSON.stringify(ldpGetItems));

 var ldpGetItems = JSON.parse(execution.getVariableLocal("ldpGetItems"));
 print("ldpGetItems from getLDP after " + JSON.stringify(ldpGetItems));
