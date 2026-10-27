var varInstanceResponse = execution.getVariable('instanceResponse');
var response = varInstanceResponse == null ? {} : JSON.parse(varInstanceResponse);

execution.setVariableLocal('instanceId', response.instances[0].id);
