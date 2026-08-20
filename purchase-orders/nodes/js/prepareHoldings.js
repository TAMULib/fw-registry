function main() {
  const holdingsKeys = new Set({{{holdingsRecordKeys}}});

  const varHoldingsResponse = execution.getVariable('holdingsResponse');
  const varHoldingsType = execution.getVariable('holdingsType');

  if (execution.getVariable('logLevel') === "DEBUG") {
    console.log(`holdingsResponse = ${varHoldingsResponse}\n`);
    console.log(`holdingsType = ${varHoldingsType}\n`);
    console.log(`holdingsRecordKeys = [ ${Array.from(holdingsKeys)} ]\n`);
  }

  const holdingsResponseObj = varHoldingsResponse == null ? {} : JSON.parse(varHoldingsResponse);

  if ((holdingsResponseObj?.totalRecords || 0) == 0) {
    throw new Error(`Holdings Response has no holdings! Response: ${varHoldingsResponse}.`);
  }

  if (holdingsResponseObj.length > 1 ) {
    console.log(`WARNING: The holdings response returned more than one holdings. Response: ${varHoldingsResponse}.\n`);
  }

  const holdingsObj = holdingsResponseObj.holdingsRecords[0];

  const varMarcOrderData = execution.getVariable('marcOrderData');
  const marcOrderDataObj = varMarcOrderData == null ? {} : JSON.parse(varMarcOrderData);

  const varStatisticalCodesResponse = execution.getVariable('statisticalCodesResponse');
  const statisticalCodes = varStatisticalCodesResponse == null ? [] : JSON.parse(varStatisticalCodesResponse).statisticalCodes;

  const varHoldingsTypesResponse = execution.getVariable('holdingsTypesResponse');
  const holdingsTypes = varHoldingsTypesResponse == null ? [] : JSON.parse(varHoldingsTypesResponse).holdingsTypes;

  const varLocationsResponse = execution.getVariable('locationsResponse');
  const locations = varLocationsResponse == null ? [] : JSON.parse(varLocationsResponse).locations;

  const findHoldingsTypeIdByName = function (holdingsTypeName) {
    for (let i = 0; i < holdingsTypes.length; ++i) {
      if (holdingsTypeName === holdingsTypes[i].name) return holdingsTypes[i].id;
    }
  };

  const findLocationIdByName = function (locationName) {
    for (let i = 0; i < locations.length; ++i) {
      if (locationName === locations[i].name) return locations[i].id;
    }
  };

  const mapStatisticalCodeIds = function (statisticalCodes) {
    const statisticalCodeIds = [];

    for (let i = 0; i < statisticalCodes.length; ++i) {
      statisticalCodeIds.push(statisticalCodes[i].id);
    }

    return statisticalCodeIds;
  };

  const electronic = marcOrderDataObj.electronicIndicator && marcOrderDataObj.electronicIndicator.toLowerCase().indexOf("electronic") >= 0;

  if (electronic) {
    const varEHoldingsType = execution.getVariable('eHoldingsType');
    holdingsObj.holdingsTypeId = findHoldingsTypeIdByName(varEHoldingsType);
  } else {
    const varPermLocation = execution.getVariable('permLocation');

    holdingsObj.holdingsTypeId = findHoldingsTypeIdByName(varHoldingsType);
    holdingsObj.permanentLocationId = findLocationIdByName(varPermLocation);
  }

  holdingsObj.callNumber = marcOrderDataObj.callNumber;

  const varCallNumberTypeId = execution.getVariable('callNumberTypeId');
  holdingsObj.callNumberTypeId = callNumberTypeId;

  holdingsObj.statisticalCodeIds = mapStatisticalCodeIds(statisticalCodes);

  holdingsObj.discoverySuppress = false;

  holdingsObj._version = 1;

  if (holdingsKeys.size) {
    Object.keys(holdingsObj).forEach(key => {
      if (!holdingsKeys.has(key)) {
        if (execution.getVariable('logLevel') === "DEBUG") {
          console.log(`Deleting unknown holdings key ${key}.`);
        }

        delete holdingsObj[key];
      }
    });
  }

  if (execution.getVariable('logLevel') === "DEBUG") {
    console.log(`\nholdings = ${JSON.stringify(holdingsObj)}\n`);
  }

  execution.setVariable("holdingsRecordId", holdingsObj.id);
  execution.setVariable("holdings", S(JSON.stringify(holdingsObj)));
}

main();
