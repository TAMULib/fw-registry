var UUID = Java.type("java.util.UUID");

var orderId = UUID.randomUUID().toString();
var orderLineId = UUID.randomUUID().toString();

if (logLevel === 'DEBUG') {
  print('\npoNumberResponse = ' + poNumberResponse + '\n');
  print('\nvendorsResponse = ' + vendorsResponse + '\n');
  print('\nfundsResponse = ' + fundsResponse + '\n');
  print('\nexpenseClassesResponse = ' + expenseClassesResponse + '\n');
  print('\nmaterialTypesResponse = ' + materialTypesResponse + '\n');
  print('\nacquisitionMethodsResponse = ' + acquisitionMethodsResponse + '\n');
}

var poNumber = JSON.parse(poNumberResponse).poNumber;

var vendorId = JSON.parse(vendorsResponse).organizations[0].id;

var expenseClassId = JSON.parse(expenseClassesResponse).expenseClasses[0].id;

var configurationEntryId = JSON.parse(configurationEntriesResponse).configs[0].id;

var fund = JSON.parse(fundsResponse).funds[0];

var locations = JSON.parse(locationsResponse).locations;

var materialTypes = JSON.parse(materialTypesResponse).mtypes;

var materialTypes = JSON.parse(materialTypesResponse).mtypes;

var acquisitionMethods = JSON.parse(acquisitionMethodsResponse).acquisitionMethods;

var marcOrderDataObj = JSON.parse(marcOrderData);

var electronic = marcOrderDataObj.electronicIndicator && marcOrderDataObj.electronicIndicator.toLowerCase().indexOf('electronic') >= 0;

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
    code: fund.code,
    distributionType: 'percentage',
    fundId: fund.id,
    expenseClassId: expenseClassId,
    value: 100
  }],
  locations: [],
  purchaseOrderId: orderId,
  source: 'User',
  titleOrPackage: marcOrderDataObj.title,
  description: marcOrderDataObj.internalNote,
  selector: marcOrderDataObj.selector,
  requester: marcOrderDataObj.requester,
  acquisitionMethod: acquisitionMethod
};

var compositePoLines = [
  orderLine
];

var compositePurchaseOrder = {
  id: orderId,
  approved: true,
  compositePoLines: compositePoLines,
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

if (logLevel === 'DEBUG') {
  print('\ncompositePurchaseOrder = ' + JSON.stringify(compositePurchaseOrder) + '\n');
}

execution.setVariableLocal('compositePurchaseOrder', S(JSON.stringify(compositePurchaseOrder)));
