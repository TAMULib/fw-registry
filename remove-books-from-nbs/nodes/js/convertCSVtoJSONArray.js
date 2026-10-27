var MappingUtility = Java.type("org.folio.rest.camunda.utility.MappingUtility");

var varBarcodesCSV = execution.getVariable('barcodesCSV');
var barcodesJSON = MappingUtility.mapCsvToJson(varBarcodesCSV);

if (execution.getVariable('logLevel') === "DEBUG") {
  print('\nbarcodesJSON = ' + barcodesJSON + '\n');
}

var barcodesJSONArray = JSON.parse(barcodesJSON);

var barcodes = [];

for (var i = 0; i < barcodesJSONArray.length; i++) {
  const barcode = barcodesJSONArray[i]?.barcode?.trim();

  if ((barcode?.length || 0) > 0) {
    barcodes.push(barcode);
  }
}

if (execution.getVariable('logLevel') === "DEBUG") {
  print('\nbarcodes = ' + barcodes + '\n');
}

execution.setVariable('barcodes', S(JSON.stringify(barcodes)));
execution.setVariable('itemsToRemove', S(JSON.stringify([])));
execution.setVariable('itemsSkipped', S(JSON.stringify([])));
