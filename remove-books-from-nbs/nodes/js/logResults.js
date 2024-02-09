var itemUpdateResponse = JSON.parse(itemUpdateResponse);
var itemObject = JSON.parse(itemObject);
var logLevel = 'DEBUG';

if (logLevel === 'DEBUG') {
  print('===== Log Results from Okapi =====\n');
  print('itemUpdateResponse: ', itemUpdateResponse);
}

for (var element of barcodeObject) {
  if (element.id === itemObject.id) {
    switch (itemUpdateResponse.status) {
      case 204 : element.result = "Success"; break; 
      default : element.result = "Error updating record"; 
    }
  }
  break;
}

if (logLevel === 'DEBUG') {
  print('\n' , barcodeObject);
}


execution.setVariable('barcodeObject', JSON.stringify(barcodeObject));