var MappingUtility = Java.type("org.folio.rest.camunda.utility.MappingUtility");

var varTagsCSV = execution.getVariable('tagsCSV');
var tagsJSON = MappingUtility.mapCsvToJson(varTagsCSV);

if (execution.getVariable('logLevel') === "DEBUG") {
  print('\ntags = ' + tagsJSON + '\n');
}

execution.setVariable('tags', S(tagsJSON));
