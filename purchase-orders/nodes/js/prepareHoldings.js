var instanceObj = JSON.parse(instance);

if (logLevel === 'DEBUG') {
  print('\nholdingsResponse = ' + holdingsResponse + '\n');
  print('\nholdingsType = ' + holdingsType + '\n');
}

var holdingsObj = JSON.parse(holdingsResponse).holdingsRecords[0];

var marcOrderDataObj = JSON.parse(marcOrderData);

var statisticalCodes = JSON.parse(statisticalCodesResponse).statisticalCodes;

var holdingsTypes = JSON.parse(holdingsTypesResponse).holdingsTypes;

var locations = JSON.parse(locationsResponse).locations;

var findHoldingsTypeIdByName = function (holdingsTypeName) {
  for (var i = 0; i < holdingsTypes.length; ++i) {
    if (holdingsTypeName === holdingsTypes[i].name) return holdingsTypes[i].id;
  }
};

var findLocationIdByName = function (locationName) {
  for (var i = 0; i < locations.length; ++i) {
    if (locationName === locations[i].name) return locations[i].id;
  }
};

var mapStatisticalCodeIds = function (statisticalCodes) {
  var statisticalCodeIds = [];
  for (var i = 0; i < statisticalCodes.length; ++i) {
    statisticalCodeIds.push(statisticalCodes[i].id);
  }
  return statisticalCodeIds;
};

var electronic = marcOrderDataObj.electronicIndicator && marcOrderDataObj.electronicIndicator.toLowerCase().indexOf('electronic') >= 0;

if (electronic) {
  holdingsObj.holdingsTypeId = findHoldingsTypeIdByName(eHoldingsType);
} else {
  holdingsObj.holdingsTypeId = findHoldingsTypeIdByName(holdingsType);
  holdingsObj.permanentLocationId = findLocationIdByName(permLocation);
}

holdingsObj.callNumber = marcOrderDataObj.callNumber;
holdingsObj.callNumberTypeId = callNumberTypeId;

holdingsObj.statisticalCodeIds = mapStatisticalCodeIds(statisticalCodes);

holdingsObj.discoverySuppress = false;

holdingsObj._version = 1;

if (logLevel === 'DEBUG') {
  print('\nholdings = ' + JSON.stringify(holdingsObj) + '\n');
}

execution.setVariable('holdingsRecordId', holdingsObj.id);
execution.setVariable('holdings', S(JSON.stringify(holdingsObj)));
