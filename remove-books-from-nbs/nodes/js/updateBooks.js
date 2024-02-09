print('====== updateBooks.js Start ======\n');

var logLevel = "DEBUG";
var itemIdResponse = JSON.parse(itemIdResponse);

if (logLevel === "DEBUG") {
  print('\n To print barcodes\n');
  print('\nBarcodes length: ', + itemIdResponse.length);
}

for (var i = 0; i < itemIdResponse.length; i++) {
  itemIdResponse[i] = {barcode, id, result : ""};
}

print('====== updateBooks.js End ======\n');

execution.setVariable('barcodeObject', JSON.stringify(itemIdResponse));
