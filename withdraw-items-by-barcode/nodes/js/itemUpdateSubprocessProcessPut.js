var itemPutResponse = JSON.parse(item);
var itemStatus = '';
var itemUpdateStatus = {
  'barcode': '',
  'status': ''
};
if (!!itemPutResponse) {
  if (itemPutResponse.status.name === "Withdrawn" &&
      itemPutResponse.temporaryLoanType.id === "e029dd79-1778-422c-b856-f0ac131f0369" &&
      itemPutResponse.discoverySuppress === true) {
    itemStatus = "Success";
  } else {
    itemStatus = "Failed";
  }

  itemUpdateStatus.barcode = itemPutResponse.barcode;
  itemUpdateStatus.status = itemStatus;

  print('\n\nStatus itemStatus:', itemStatus);
  print('\n\nStatus itemUpdate barcode:', itemPutResponse.barcode);

}

execution.setVariable('itemUpdateStatus', JSON.stringify(itemUpdateStatus));