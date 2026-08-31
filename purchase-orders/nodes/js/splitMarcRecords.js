var Spin = Java.type("org.camunda.spin.Spin");
var MarcUtility = Java.type("org.folio.rest.camunda.utility.MarcUtility");

var varMarc = execution.getVariable('marc');
var records = MarcUtility.splitRawMarcToMarcJsonRecords(varMarc);

var reportObj = {
  records: []
};

execution.setVariableLocal('records', S(Spin.JSON(records)));
execution.setVariable('report', S(JSON.stringify(reportObj)));
