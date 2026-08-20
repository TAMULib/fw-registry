var compositePurchaseOrderObj = JSON.parse(compositePurchaseOrder);

if (execution.getVariable('logLevel') === 'DEBUG') {
  print('\ncompositePurchaseOrder = ' + compositePurchaseOrder + '\n');
}

var instanceId = compositePurchaseOrderObj.compositePoLines[0].instanceId;

execution.setVariable('instanceId', instanceId);
