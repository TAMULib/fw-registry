var itemPutResponse = JSON.parse(item);
var itemStatus = '';

if (!!itemPutResponse) {
  if (itemPutResponse.status.name === "Withdrawn" &&
      itemPutResponse.temporaryLoanType.id === "e029dd79-1778-422c-b856-f0ac131f0369" &&
      itemPutResponse.discoverySuppress === true) {
    itemStatus = "Success";
  } else {
    itemStatus = "Failed";
  }

  print('\n\nStatus itemStatus:', itemStatus);

}

var csvObj = JSON.parse(csvObjArray);

for (var i = 0; i < csvObj.length; i++) {
  if (csvObj[i].itemBarcode === itemPutResponse.barcode && csvObj[i].itemId === itemPutResponse.id && itemStatus !== '') {
      print('\n\nAdding itemStatus to csvObj\n\n');
      csvObj[i].itemStatus = itemStatus;
      break;
  }
}
print('\n\n stringify csvObjWithItemStatus' + JSON.stringify(csvObj));
execution.setVariable('csvObjArray', JSON.stringify(csvObj));