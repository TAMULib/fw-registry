var barcodeObject = JSON.parse(barcodeObject);

var logLevel = "DEBUG";

var reportArray = [];

barcodeObject.map(barcode => {
  reportArray.push({
    barcode: barcode.barcode,
    result: barcode.result
  });
})

execution.setVariable('barcodeReport', JSON.stringify(reportArray));