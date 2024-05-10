if (logLevel === "DEBUG") {
  print('\nlogLevel = ' + logLevel + '\n');
}

var itemBarcodes = JSON.parse(barcodes);

var barcodes = itemBarcodes.map((item) => item.barcode);

print('\nitemBarcodes = ' + JSON.stringify(itemBarcodes));

execution.setVariable('barcodesOfItemsRemoved', S(JSON.stringify(barcodes)));

