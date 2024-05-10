var logLevel = 'DEBUG';
if (logLevel === 'DEBUG') {
  print('\nlogLevel = ' + logLevel + '\n');
}

const barCodeList = barcodes.map(barcode => `'${barcode}'`).join(', ');

var barcodeQuery =
  '\nSELECT *' +
  '\nFROM folio_reporting.item_ext' +
  '\nWHERE barcode IN (' + barCodeList + ')' +
  '\n\tAND effective_location_name = \'Evans nbs\'' +
  '\n\tAND EXTRACT(DAY FROM (CURRENT_DATE - updated_date)::interval) > 30';

if (logLevel === 'DEBUG') {
  print('\nbarcodeQuery = ' + barcodeQuery);
}
print("testing in scriptTask \n");

var queryWrapper = {
  sql: barcodeQuery,
};

execution.setVariableLocal('barcodeQuery', S(JSON.stringify(queryWrapper)));
