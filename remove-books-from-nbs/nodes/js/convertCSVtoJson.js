var MappingUtility = Java.type("org.folio.rest.utility.MappingUtility");
var barcodesJSON = MappingUtility.mapCsvToJson(barcodesCSV);

var logLevel = 'DEBUG';

if (logLevel === "DEBUG") {
  print('\nlogLevel = ' + logLevel + '\n');
  print('\nbarcodes = ' + barcodesJSON + '\n');
}
var barCodeList = barcodes.map(barcode => `'${barcode}'`).join(', ');

var barcodeQuery =
  '\nSELECT id, barcode' +
  '\nFROM folio_reporting.item_ext' +
  '\nWHERE barcode IN (' + barCodeList + ')' +
  '\n\tAND effective_location_name = \'Evans nbs\'' +
  '\n\tAND EXTRACT(DAY FROM (CURRENT_DATE - updated_date)::interval) > 30';

if (logLevel === 'DEBUG') {
  print('\nbarcodeQuery = ' + barcodeQuery);
}

var queryWrapper = {
  sql: barcodeQuery,
};

execution.setVariableLocal('barcodeQuery', S(JSON.stringify(queryWrapper)));
