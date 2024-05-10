
print("printing rowsCsv\n");
print(JSON.stringify(rowsCsv));

var rowsCsv = execution.getVariable('rowsCsv');

var MappingUtility = Java.type('org.folio.rest.camunda.utility.MappingUtility');
var idsJson = MappingUtility.mapCsvToJson(rowsCsv);

var barcodeArray = [];

print("------> testing in processBarcodes js file");

var idsArray = JSON.parse(idsJson);

print('idsArray = ' + JSON.stringify(idsArray) + '\n');

var obj = idsArray[0];
for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
        barcodeArray.push(key);
    }
}

for (var i = 0; i < idsArray.length; i++) {
    var obj = idsArray[i];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var value = obj[key];
            barcodeArray.push(value);
        }
    }
}

print("-----> pringint barcodesList");

barcodeArray.forEach(function(eachBarcode) {

    print('barcodeArray = ' + eachBarcode + '\n');

});


execution.setVariable('barcodeArray', barcodeArray);

