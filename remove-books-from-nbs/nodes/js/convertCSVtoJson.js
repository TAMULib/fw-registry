var MappingUtility = Java.type("org.folio.rest.camunda.utility.MappingUtility");
var barCodeJSON = MappingUtility.mapCsvToJson(barCodeCsv);

if (logLevel === "DEBUG") {
  print('\nbarCode = ' + barCodeJSON + '\n');
}

execution.setVariable('barCode', S(barCodeJSON));

