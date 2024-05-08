var holdingsPutResponse = JSON.parse(holdings);
var holdingsUpdateStatus = '';

if (!!holdingsPutResponse) {
  if (holdingsPutResponse.permanentLocationId === "dd55282c-bd64-4e1c-887d-ad0c8887bb69" &&
      holdingsPutResponse.discoverySuppress === true &&
      holdingsPutResponse.notes && Array.isArray(holdingsPutResponse.notes)) {
    holdingsUpdateStatus = "Success";
  } else {
    holdingsUpdateStatus = "Failed";
  }

  print('\n\nStatus holdingsUpdateStatus:', holdingsUpdateStatus);

}

execution.setVariable('holdingsUpdateStatus', JSON.stringify(holdingsUpdateStatus));

var csvObj = JSON.parse(csvObjArray);

for (var i = 0; i < csvObj.length; i++) {
  if (csvObj[i].holdingsId === holdingsPutResponse.id) {
      print('\n\nAdding holdingsUpdateStatus to csvObj\n\n');
      csvObj[i].holdingsUpdateStatus = holdingsUpdateStatus;
      break;
  }
}
print('\n\n stringify csvObjWithItemHoldingStatus' + JSON.stringify(csvObj));
execution.setVariable('csvObjArray', JSON.stringify(csvObj));