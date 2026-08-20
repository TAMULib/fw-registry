var varInstance = execution.getVariable('instance');
var instanceObj = varInstance == null ? {} : JSON.parse(varInstance);

var varHoldings = execution.getVariable('holdings');
var holdingsObj = varHoldings == null ? {} : JSON.parse(varHoldings);

var varItem = execution.getVariable('item');
var itemObj = varItem == null ? {} : JSON.parse(varItem);

var varMarcOrderData = execution.getVariable('marcOrderData');
var marcOrderDataObj = varMarcOrderData == null ? {} : JSON.parse(marcOrderData);

var varLocationsResponse = execution.getVariable('locationsResponse');
var locations = varLocationsResponse == null ? [] : JSON.parse(varLocationsResponse).locations;

var varLoanTypesResponse = execution.getVariable('loanTypesResponse');
var loanTypes = varLoanTypesResponse == null ? [] : JSON.parse(varLoanTypesResponse).loantypes;

var varMaterialTypesResponse = execution.getVariable('materialTypesResponse');
var materialTypes = varMaterialTypesResponse == null ? [] : JSON.parse(varMaterialTypesResponse).mtypes;

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

var varPermLoanType = execution.getVariable('permLoanType');
itemObj.permanentLoanTypeId = findLoanTypeIdByName(varPermLoanType);

var varTempLoanType = execution.getVariable('tempLoanType');
itemObj.temporaryLoanTypeId = findLoanTypeIdByName(varTempLoanType);

var varTempLocation = execution.getVariable('tempLocation');
itemObj.temporaryLocationId = findLocationIdByName(varTempLocation);

var varMaterialType = execution.getVariable('materialType');
itemObj.materialTypeId = findMaterialTypeIdByName(varMaterialType);

if (marcOrderDataObj.barcode) {
  itemObj.barcode = marcOrderDataObj.barcode.trim()
}

itemObj.status = { name: 'In process' };

if (execution.getVariable('logLevel') === 'DEBUG') {
  print('\nitem = ' + JSON.stringify(itemObj) + '\n');
}

execution.setVariableLocal('itemId', itemObj.id);
execution.setVariableLocal('item', S(JSON.stringify(itemObj)));
