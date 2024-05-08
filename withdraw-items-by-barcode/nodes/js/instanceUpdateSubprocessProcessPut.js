var instancePutResponse = JSON.parse(instance);
var instanceUpdateStatus = '';

if (!!instancePutResponse && (instancePutResponse.discoverySuppress === true ) ) {
  instanceUpdateStatus = "Success";
  } else {
    instanceUpdateStatus = "Failed";
  }

  print('\n\nStatus instanceUpdateStatus:', instanceUpdateStatus);

execution.setVariable('instanceUpdateStatus', JSON.stringify(instanceUpdateStatus));