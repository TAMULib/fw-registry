var instancePutResponse = JSON.parse(instance);
var instanceUpdateStatus = '';

if (!!instancePutResponse && (instancePutResponse.discoverySuppress === true ) ) {
  instanceUpdateStatus = "Success";
  } else {
    instanceUpdateStatus = "Failed";
  }

var csvObj = JSON.parse(csvObjArray);

for (var i = 0; i < csvObj.length; i++) {
  if (csvObj[i].instanceId === instancePutResponse.id) {
      csvObj[i].instanceUpdateStatus = instanceUpdateStatus;
      break;
  }
}

if (logLevel === "DEBUG") {
  print('\n\n CSVObj With Item, Holding and Instance Status' + JSON.stringify(csvObj));
}

execution.setVariable('csvObjArray', JSON.stringify(csvObj));

