

execution.setVariable('barcodeArray', barcodeArray);

print("barcodeArray from getLDP " + barcodeArray);

var ldpGetItems = {};
var queryWrapper = {
    sql: ""
};
queryWrapper.sql = 'SELECT ie.barcode, ie.item_id, ie.permanent_loan_type_name, ie.temporary_loan_type_name, ie.discovery_suppress, ie.holdings_record_id ';
queryWrapper.sql += 'FROM folio_reporting.item_ext AS ie ';
queryWrapper.sql += 'INNER JOIN folio_reporting.holdings_ext he ON he.holdings_id = ie.holdings_record_id ';
queryWrapper.sql += 'WHERE ie.barcode IN (' + barcodeArray.map(barcode => "'" + barcode + "'").join(',') + ')'; 

var ldpGetItemsJson = JSON.stringify(queryWrapper);
execution.setVariableLocal("ldpGetItems", ldpGetItemsJson);

 