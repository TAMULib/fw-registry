var instanceObj = JSON.parse(instance);
var holdingsObj = JSON.parse(holdings);
var itemObj = JSON.parse(item);

var marcOrderDataObj = JSON.parse(marcOrderData);

var locations = JSON.parse(locationsResponse).locations;
var loanTypes = JSON.parse(loanTypesResponse).loantypes;
var materialTypes = JSON.parse(materialTypesResponse).mtypes;

var findLocationIdByName = function (locationName) {
  for (var i = 0; i < locations.length; ++i) {
    if (locationName === locations[i].name) return locations[i].id;
  }
};

var findLoanTypeIdByName = function (loanTypeName) {
  for (var i = 0; i < loanTypes.length; ++i) {
    if (loanTypeName === loanTypes[i].name) return loanTypes[i].id;
  }
};

var findMaterialTypeIdByName = function (materialTypeName) {
  for (var i = 0; i < materialTypes.length; ++i) {
    if (materialTypeName === materialTypes[i].name) return materialTypes[i].id;
  }
};

itemObj.permanentLoanTypeId = findLoanTypeIdByName(permLoanType);
itemObj.temporaryLoanTypeId = findLoanTypeIdByName(tempLoanType);

itemObj.permanentLocationId = findLocationIdByName(permLocation);
itemObj.temporaryLocationId = findLocationIdByName(tempLocation);

itemObj.materialTypeId = findMaterialTypeIdByName(materialType);

if (marcOrderDataObj.barcode) {
  itemObj.barcode = marcOrderDataObj.barcode.trim()
}

itemObj.status = { name: 'Available' };

if (logLevel === 'DEBUG') {
  print('\nitem = ' + JSON.stringify(itemObj) + '\n');
}

execution.setVariableLocal('itemId', itemObj.id);
execution.setVariableLocal('item', S(JSON.stringify(itemObj)));
