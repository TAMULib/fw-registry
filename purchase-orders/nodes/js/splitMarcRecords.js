var Variables = Java.type("org.camunda.bpm.engine.variable.Variables");
var MarcUtility = Java.type("org.folio.rest.utility.MarcUtility");

var records = MarcUtility.splitRawMarcToMarcJsonRecords(marc);

var reportObj = {
  records: []
};

execution.setVariable('records', Variables.objectValue(records).create());
execution.setVariable('report', S(JSON.stringify(reportObj)));
