var MappingUtility = Java.type("org.folio.rest.utility.MappingUtility");
var barcodesJSON = MappingUtility.mapCsvToJson(barcodesCSV);

if (logLevel === "DEBUG") {
  print('\nbarcodes = ' + barcodesJSON + '\n');
}
execution.setVariable('barcodes', barcodesJSON);


