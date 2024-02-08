var UUID = Java.type('java.util.UUID');
var StringEscapeUtils = Java.type('org.apache.commons.lang.StringEscapeUtils');
print('====== updateBooks.js Start ======\n');
var barcodesArr = JSON.parse(barcodes);
var okapiToken = loginResponse;

print('\n To print barcodes\n');
print(barcodesArr);
print('\nBarcodes length: ', + barcodesArr.length);

print (`okapiToken: ${okapiToken}`);

var safe = function (str) {
  return StringEscapeUtils.escapeJson(str);
};

var validationArray = [];

print('printing validationArray below');
print(validationArray);

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

print('printing validationObject below');
print(validationObject);
print('====== updateBooks.js End ======\n');
