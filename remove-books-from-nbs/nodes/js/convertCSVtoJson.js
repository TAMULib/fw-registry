var MappingUtility = Java.type("org.folio.rest.utility.MappingUtility");
var barcodesJSON = MappingUtility.mapCsvToJson(barcodesCSV);

var logLevel = 'DEBUG';

if (logLevel === "DEBUG") {
  print('\nbarcodes = ' + barcodesJSON + '\n');
}
execution.setVariable('barcodes', barcodesJSON);
