var MappingUtility = Java.type("org.folio.rest.utility.MappingUtility");
var barcodesJSON = MappingUtility.mapCsvToJson(barcodesCSV);

if (logLevel === "DEBUG") {
  print('\nbarcodesJSON = ' + barcodesJSON + '\n');
}

var barcodesJSONArray = JSON.parse(barcodesJSON);

var barcodes = [];

for (var i = 0; i < barcodesJSONArray.length; i++) {
  var barcode = barcodesJSONArray[i].barcode.trim();
  if (barcode.length > 0) {
    barcodes.push(barcode);
  }
}

if (logLevel === "DEBUG") {
  print('\nbarcodes = ' + barcodes + '\n');
}

execution.setVariable('barcodes', S(JSON.stringify(barcodes)));

var itemsToRemove = [];
var itemsSkipped = [];

execution.setVariable('itemsToRemove', S(JSON.stringify(itemsToRemove)));
execution.setVariable('itemsSkipped', S(JSON.stringify(itemsSkipped)));
