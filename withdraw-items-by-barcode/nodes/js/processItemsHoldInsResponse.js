var ihiArr = JSON.parse(itemsHoldInstByBarcodeResponse);

var itemBarcodeArr = [];
var itemIdArr = [];
var holdingsIdArr = [];
var instanceIdArr = [];

for (var key in ihiArr) {
  for(var k in ihiArr[key]) {
    switch (k) {
      case 'itembarcode':
        itemBarcodeArr.push(ihiArr[key][k]);
        break;
      case 'itemid':
        itemIdArr.push(ihiArr[key][k]);
        break;
      case 'holdingsid':
        holdingsIdArr.push(ihiArr[key][k]);
        break;
      case 'instanceid':
        instanceIdArr.push(ihiArr[key][k]);
        break;
      default:
        break;
    }
  }
}

print('\nitemBarcodeArr:' + itemBarcodeArr);
print('\nitemIdArr:' + itemIdArr);
print('\nholdingsIdArr:' + holdingsIdArr);
print('\ninstanceIdArr:' + instanceIdArr);

execution.setVariable('itemBarcodes', S(JSON.stringify(itemBarcodeArr)));
execution.setVariable('itemIds', S(JSON.stringify(itemIdArr)));
execution.setVariable('holdingsIds', S(JSON.stringify(holdingsIdArr)));
execution.setVariable('instanceIds', S(JSON.stringify(instanceIdArr)));

var csvObjArray = [];

for (var i = 0; i < itemBarcodeArr.length; i++) {
  var csvObj = {
      itemBarcode: itemBarcodeArr[i],
      itemId: itemIdArr[i],
      holdingsId: holdingsIdArr[i],
      instanceId: instanceIdArr[i]
  };
  csvObjArray.push(csvObj);
}

print('\n\n stringify csvObjArray' + JSON.stringify(csvObjArray));
execution.setVariable('csvObjArray', S(JSON.stringify(csvObjArray)));