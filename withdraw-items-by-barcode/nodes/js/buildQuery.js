var barcodeIdsJSONArray = JSON.parse(barcodes);

var barcodeIds = '';
for (var i = 0; i < barcodeIdsJSONArray.length; i++) {
  if (i > 0) {
    barcodeIds += ', ';
  }
  barcodeIds += '\'' + barcodeIdsJSONArray[i] + '\'';
}

var from = 'folio_reporting.item_ext ie' +
           '\n\tinner join folio_reporting.holdings_ext he ON he.holdings_id = ie.holdings_record_id' +
           '\n\tinner join folio_reporting.instance_ext ie2 ON ie2.instance_id = he.instance_id';

var itemsHoldInstByBarcodeQuery = 'SELECT ie.barcode AS itemBarcode,' +
                                  '\n\tie.item_id AS itemId,' +
                                  '\n\the.holdings_id AS holdingsId,' +
                                  '\n\tie2.instance_id AS instanceId' +
                                  '\nFROM ' + from;
if (barcodeIds) {
  itemsHoldInstByBarcodeQuery += '\nWHERE ie.barcode IN (' + barcodeIds + ')';
}

if (logLevel === 'DEBUG') {
  print('\nitemsHoldInstByBarcodeQuery = ' + itemsHoldInstByBarcodeQuery + '\n');
}

execution.setVariableLocal('itemsHoldInstByBarcodeQuery', itemsHoldInstByBarcodeQuery);