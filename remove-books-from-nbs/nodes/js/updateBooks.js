print('====== updateBooks.js Start ======\n');
var barcodesArr = JSON.parse(barcodes);
var okapiToken = loginResponse;

print('\n To print barcodes\n');
print(barcodesArr);
print('\nBarcodes length: ', + barcodesArr.length);

print (`okapiToken: ${okapiToken}`);

// items.effectiveLocationId==“07a4e97e-9941-4f60-ad25-577bb6672c08”

var validationArray = [];

while (barcodesArr.length > 1) {
  var barcodeObject = barcodesArr.shift();
  var barcodeElement = barcodeObject.barcode;

  print(`Processing Item : ${barcodeElement}`);

  if (!!barcodeElement.trim()) {
    continue;
  }
  var validationObject = {
    barcode: barcodeElement,
    result: ""
  };
}

print('====== updateBooks.js End ======\n');
