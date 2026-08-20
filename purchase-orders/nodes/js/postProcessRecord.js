var varReport = execution.getVariable('report');
var reportObj = varReport == null ? {} : JSON.parse(varReport);

var varInstance = execution.getVariable('instance');
var instanceObj = varInstance == null ? {} : JSON.parse(instance);

var varPoNumberResponse = execution.getVariable('poNumberResponse');

reportObj.records.push({
  poNumber: varPoNumberResponse == null ? null : JSON.parse(varPoNumberResponse).poNumber,
  instanceUuid: instanceObj.id,
  instanceHrid: instanceObj.hrid
});

execution.setVariable('report', S(JSON.stringify(reportObj)));
