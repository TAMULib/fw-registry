var UUID = Java.type("java.util.UUID");

var orderId = UUID.randomUUID().toString();
var orderLineId = UUID.randomUUID().toString();

var varPoNumberResponse = execution.getVariable('poNumberResponse');
var varVendorsResponse = execution.getVariable('vendorsResponse');
var varFundsResponse = execution.getVariable('fundsResponse');
var varExpenseClassesResponse = execution.getVariable('expenseClassesResponse');
var varLocationsResponse = execution.getVariable('locationsResponse');
var varMaterialTypesResponse = execution.getVariable('materialTypesResponse');
var varAcquisitionMethodsResponse = execution.getVariable('acquisitionMethodsResponse');

if (execution.getVariable('logLevel') === 'DEBUG') {
  print('\npoNumberResponse = ' + varPoNumberResponse + '\n');
  print('\nvendorsResponse = ' + varVendorsResponse + '\n');
  print('\nfundsResponse = ' + varFundsResponse + '\n');
  print('\nexpenseClassesResponse = ' + varExpenseClassesResponse + '\n');
  print('\nlocationsResponse = ' + varLocationsResponse + '\n');
  print('\nmaterialTypesResponse = ' + varMaterialTypesResponse + '\n');
  print('\nacquisitionMethodsResponse = ' + varAcquisitionMethodsResponse + '\n');
}

var extractResponseArray = function (response, key, firstId) {
  if (!response || !response.totalRecords || response.totalRecords == 0 || !response[key]) {
    return (firstId === true) ? undefined : [];
  }

  if (firstId === true) {
    return (response[key].length > 0 && !!response[key][0] && !!response[key][0].id) ? response[key][0].id : undefined;
  }

  return response[key];
};

var poNumberObj = varPoNumberResponse == null ? undefined : JSON.parse(varPoNumberResponse);
var poNumber = !!poNumberObj && !!poNumberObj.poNumber ? poNumberObj.poNumber : undefined;

var vendorId = extractResponseArray(varVendorsResponse == null ? undefined : JSON.parse(varVendorsResponse), 'organizations', true);

var expenseClassId = extractResponseArray(varExpenseClassesResponse == null ? undefined : JSON.parse(varExpenseClassesResponse), 'expenseClasses', true);

var configurationEntryId = extractResponseArray(JSON.parse(configurationEntriesResponse), 'configs', true);

var funds = extractResponseArray(varFundsResponse == null ? undefined : JSON.parse(varFundsResponse), 'funds');

var locations = extractResponseArray(varLocationsResponse == null ? undefined : JSON.parse(varLocationsResponse), 'locations');

var materialTypes = extractResponseArray(varMaterialTypesResponse == null ? undefined : JSON.parse(varMaterialTypesResponse), 'mtypes');

var acquisitionMethods = extractResponseArray(varAcquisitionMethodsResponse == null ? undefined : JSON.parse(varAcquisitionMethodsResponse), 'acquisitionMethods');

var varMarcOrderData = execution.getVariable('marcOrderData');
var marcOrderDataObj = marcOrderData == null ? undefined : JSON.parse(varMarcOrderData);

var electronic = !!marcOrderDataObj.electronicIndicator && marcOrderDataObj.electronicIndicator.toLowerCase().indexOf('electronic') >= 0;

var findLocationIdByName = function (locationName) {
  for (var i = 0; i < locations.length; ++i) {
    if (locationName === locations[i].name) return locations[i].id;
  }
};

var findMaterialTypeIdByName = function (materialTypeName) {
  for (var i = 0; i < materialTypes.length; ++i) {
    if (materialTypeName === materialTypes[i].name) return materialTypes[i].id;
  }
};

var findAcquisitionMethodByValue = function (acquisitionMethodValue) {
  for (var i = 0; i < acquisitionMethods.length; ++i) {
    if (acquisitionMethodValue === acquisitionMethods[i].value) return acquisitionMethods[i].id;
  }
};

var acquisitionMethod = findAcquisitionMethodByValue(marcOrderDataObj.acquisitionMethod);

print('\nacquisitionMethodFromMARC = ' + marcOrderDataObj.acquisitionMethod + ' (' + acquisitionMethod + ')\n');

var orderLine = {
  id: orderLineId,
  cost: {
    currency: marcOrderDataObj.currency
  },
  details: {},
  fundDistribution: [{
    code: funds.length > 0 ? funds[0].code : undefined,
    distributionType: 'percentage',
    fundId: funds.length > 0 ? funds[0].id : undefined,
    expenseClassId: expenseClassId,
    value: 100
  }],
  locations: [],
  purchaseOrderId: orderId,
  source: 'User',
  titleOrPackage: marcOrderDataObj.title,
  description: marcOrderDataObj.internalNote,
  poLineDescription: marcOrderDataObj.poLineDescription,
  selector: marcOrderDataObj.selector,
  requester: marcOrderDataObj.requester,
  acquisitionMethod: acquisitionMethod
};

var poLines = [
  orderLine
];

var compositePurchaseOrder = {
  id: orderId,
  approved: true,
  poLines: poLines,
  orderType: 'One-Time',
  poNumber: poNumber,
  reEncumber: false,
  vendor: vendorId,
  billTo: configurationEntryId,
  workflowStatus: 'Open'
};

var tagList = [];

if (electronic) {
  orderLine.orderFormat = 'Electronic Resource';

  orderLine.eresource = {
    activated: false,
    createInventory: 'Instance, Holding',
    trial: false,
    accessProvider: vendorId,
    materialType: findMaterialTypeIdByName(eMaterialType)
  };

  orderLine.cost.quantityElectronic = marcOrderDataObj.quantity;
  orderLine.cost.listUnitPriceElectronic = marcOrderDataObj.amount;

  orderLine.locations.push({
    quantityElectronic: marcOrderDataObj.quantity,
    locationId: findLocationIdByName(permELocation)
  });
} else {
  orderLine.orderFormat = 'Physical Resource';

  orderLine.physical = {
    createInventory: 'Instance, Holding, Item',
    materialType: findMaterialTypeIdByName(materialType)
  };

  orderLine.cost.quantityPhysical = marcOrderDataObj.quantity;
  orderLine.cost.listUnitPrice = marcOrderDataObj.amount;

  orderLine.locations.push({
    quantityPhysical: marcOrderDataObj.quantity,
    locationId: findLocationIdByName(permLocation)
  });
}

if (marcOrderDataObj.vendorReferenceNumber) {
  orderLine.vendorDetail = {
    instructions: '',
    vendorAccount: marcOrderDataObj.vendorAccount,
    referenceNumbers: [{
      refNumber: marcOrderDataObj.vendorReferenceNumber,
      refNumberType: marcOrderDataObj.vendorReferenceType
    }]
  };
}

if (marcOrderDataObj.projectCode) {
  tagList.push(marcOrderDataObj.projectCode);
}

if (tagList.length) {
  orderLine.tags = {
    tagList: tagList
  };
}

if (execution.getVariable('logLevel') === 'DEBUG') {
  print('\ncompositePurchaseOrder = ' + JSON.stringify(compositePurchaseOrder) + '\n');
}

execution.setVariableLocal('compositePurchaseOrder', S(JSON.stringify(compositePurchaseOrder)));
