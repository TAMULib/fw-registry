var MappingUtility = Java.type("org.folio.rest.camunda.utility.MappingUtility");
var tagsJSON = MappingUtility.mapCsvToJson(tagsCSV);

if (logLevel === "DEBUG") {
  print('\ntags = ' + tagsJSON + '\n');
}

execution.setVariable('tags', S(tagsJSON));
