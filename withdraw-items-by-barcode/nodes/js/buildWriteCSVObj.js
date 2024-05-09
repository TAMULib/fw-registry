var csvObj = JSON.parse(csvObjArray);
var barcodeStatusArray = [['Barcode', 'Status']];

if(!!csvObj) {
  for (var i = 0; i < csvObj.length; i++) {
    var barcodeStatus = [
      csvObj[i].itemBarcode.replace(/"/g, ''),
      csvObj[i].instanceUpdateStatus || csvObj[i].holdingsUpdateStatus || csvObj[i].itemStatus || "Unknown"
    ];
    barcodeStatusArray.push(barcodeStatus);
  }
}

if (logLevel === "DEBUG") {
  print('\n\nBarcode & Status Array' + JSON.stringify(barcodeStatusArray));
}

execution.setVariable('barcodeStatusArray',S(JSON.stringify(barcodeStatusArray)));
