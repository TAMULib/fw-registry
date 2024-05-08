var instancePutResponse = JSON.parse(instance);
var instanceUpdateStatus = '';

if (!!instancePutResponse && (instancePutResponse.discoverySuppress === true ) ) {
  instanceUpdateStatus = "Success";
  } else {
    instanceUpdateStatus = "Failed";
  }

print('\n\nStatus instanceUpdateStatus:', instanceUpdateStatus);

execution.setVariable('instanceUpdateStatus', JSON.stringify(instanceUpdateStatus));

var csvObj = JSON.parse(csvObjArray);

for (var i = 0; i < csvObj.length; i++) {
  if (csvObj[i].instanceId === instancePutResponse.id) {
      print('\n\nAdding instanceUpdateStatus to csvObj\n\n');
      csvObj[i].instanceUpdateStatus = instanceUpdateStatus;
      break;
  }
}
print('\n\n stringify csvObjWithItemHoldingInstanceStatus' + JSON.stringify(csvObj));
execution.setVariable('csvObjArray', JSON.stringify(csvObj));