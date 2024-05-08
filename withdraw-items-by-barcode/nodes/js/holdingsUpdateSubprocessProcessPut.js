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

}

var csvObj = JSON.parse(csvObjArray);

for (var i = 0; i < csvObj.length; i++) {
  if (csvObj[i].holdingsId === holdingsPutResponse.id) {
      csvObj[i].holdingsUpdateStatus = holdingsUpdateStatus;
      break;
  }
}

if (logLevel === "DEBUG") {
  print('\n\n CSVObjWithItemHoldingStatus' + JSON.stringify(csvObj));
}

execution.setVariable('csvObjArray', JSON.stringify(csvObj));