var MappingUtility = Java.type("org.folio.rest.camunda.utility.MappingUtility");
var barcodesJSON = MappingUtility.mapCsvToJson(barcodesCSV);

if (logLevel === "DEBUG") {
  print('\nbarcodesJSON = ' + barcodesJSON + '\n');
  print('\nemailTo = ' + emailTo + '\n');
  print('\nnote = ' + note + '\n');
}

var barcodesJSONArray = JSON.parse(barcodesJSON);
var barcodes = [];

for (var i = 0; i < barcodesJSONArray.length; i++) {
  var keys = Object.keys(barcodesJSONArray[i]);

  if (keys.length > 0) {
    if (barcodes.indexOf(keys[0]) === -1) {
      barcodes.push(keys[0]);
    }
    var barcode = barcodesJSONArray[i][keys[0]];
    if (typeof barcode === 'string' && barcode.trim().length > 0) {
      barcodes.push(barcode.trim());
    }
  }
}

if (logLevel === "DEBUG") {
  print('\nbarcodes = ' + barcodes + '\n');
}

execution.setVariable('note', note);
execution.setVariable('barcodes', S(JSON.stringify(barcodes)));