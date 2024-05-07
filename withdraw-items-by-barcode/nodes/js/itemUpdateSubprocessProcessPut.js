var itemPutResponse = JSON.parse(item);
var itemUpdateStatus = '';
var updateStatus = {
  'barcode': '',
  'status': ''
};
if (!!itemPutResponse) {
  if (itemPutResponse.status.name === "Withdrawn" &&
      itemPutResponse.temporaryLoanType.id === "e029dd79-1778-422c-b856-f0ac131f0369" &&
      itemPutResponse.discoverySuppress === true) {
    itemUpdateStatus = "Success";
  } else {
    itemUpdateStatus = "Failed";
  }

  updateStatus.barcode = itemPutResponse.barcode;
  updateStatus.status = itemUpdateStatus;

  print('\n\nStatus itemUpdateStatus:', itemUpdateStatus);
  print('\n\nStatus itemUpdate barcode:', itemPutResponse.barcode);

}

execution.setVariable('updateStatus', JSON.stringify(updateStatus));