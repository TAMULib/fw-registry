var barcodesArr = JSON.parse(barcodes);
print('\n To print barcodes\n');
print(barcodesArr);
print('\nBarcodes length: ', + barcodesArr.length);
var barcodeList = '';

for (var i = 0; i <= barcodesArr.length - 1; i++) {
  var elem = barcodesArr[i];
  if (!!elem.barcode.trim()) {
      barcodeList += '\'';
      barcodeList += elem.barcode.trim();
      barcodeList += '\'';
      if (i < barcodesArr.length - 1) {
        barcodeList += ',';
      }
  }
}

print('\n To print barcodeList\n');
print(barcodeList);

var barcodeQuery =
  '\nUPDATE folio_reporting.item_ext' +
  '\nSET' +
  '\n\ttemporary_location_id = NULL,' +
  '\n\ttemporary_location_name = NULL,' +
  '\n\ttemporary_loan_type_id = NULL,' +
  '\n\ttemporary_loan_type_name = NULL' +
  '\nWHERE barcode IN (' + barcodeList + ')' +
  '\n\tAND effective_location_name = \'Evans nbs\'' +
  '\n\tAND EXTRACT(DAY FROM (CURRENT_DATE - updated_date)::interval) > 30';

print('\nbarcodeQuery = ' + barcodeQuery);

var queryWrapper = {
  sql: barcodeQuery,
};

execution.setVariableLocal('barcodeQuery', S(JSON.stringify(queryWrapper)));
