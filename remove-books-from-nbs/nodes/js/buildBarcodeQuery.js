if (logLevel === 'DEBUG') {
  print('\nlogLevel = ' + logLevel + '\n');
}

var where = 'TRUE';
// TODO - retrieve barcodes from the csv file
var barCodes = ['A14840670567', 'A14839898356', 'A14851397118'];

const barCodeList = barcodes.map(barcode => `'${barcode}'`).join(', ');

var barcodeQuery =
  '\nUPDATE folio_reporting.item_ext' +
  '\nSET' +
  '\n\ttemporary_location_id = NULL,' +
  '\n\ttemporary_location_name = NULL,' +
  '\n\ttemporary_loan_type_id = NULL,' +
  '\n\ttemporary_loan_type_name = NULL' +
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
