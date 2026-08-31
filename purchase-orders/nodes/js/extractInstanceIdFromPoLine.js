var varCompositePurchaseOrder = execution.getVariable('compositePurchaseOrder');
var compositePurchaseOrderObj = varCompositePurchaseOrder == null ? undefined : JSON.parse(varCompositePurchaseOrder);

if (execution.getVariable('logLevel') === 'DEBUG') {
  print('\ncompositePurchaseOrder = ' + varCompositePurchaseOrder + '\n');
}

var instanceId = compositePurchaseOrderObj.poLines[0].instanceId;

execution.setVariable('instanceId', instanceId);
