var csvData = barCodes.split('\n');

print("printing csv Data");
print(csvData);

var barcodeArray = [];

for(var i = 0; i < csvData.length; i++){

  var currentData = csvData[i].trim(); 
  if (!isNaN(currentData) && currentData[0] !== ',') { 
    if (currentData[0] == ',') {
      currentData = currentData.substring(1); 
    }
    barcodeArray.push(currentData);
  }
}

print("below is barcodeArray\n");
print(barcodeArray);


var logLevel = 'DEBUG';
if (logLevel === 'DEBUG') {
  print('\nlogLevel = ' + logLevel + '\n');
}

var barcodeQuery = '\nSELECT *' +
                   '\nFROM folio_reporting.item_ext' +
                   '\nWHERE barcode IN (\'' + barcodeArray.join('\',\'') + '\')' +
                   '\n\tAND effective_location_name = \'Evans nbs\'' +
                   '\n\tAND EXTRACT(DAY FROM (CURRENT_DATE - updated_date)::interval) > 30';

var queryWrapper = {
  sql: barcodeQuery,
};

print("printing barcodeQuery\n");
print(barcodeQuery);

execution.setVariableLocal('barcodeQuery', S(JSON.stringify(queryWrapper)));
