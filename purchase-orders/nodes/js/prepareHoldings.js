function main() {
  const instanceObj = JSON.parse(instance);
  const holdingsKeys = new Set({{{holdingsRecordKeys}}});

  if (logLevel === "DEBUG") {
    console.log(`holdingsResponse = ${holdingsResponse}\n`);
    console.log(`holdingsType = ${holdingsType}\n`);
    console.log(`holdingsRecordKeys = [ ${Array.from(holdingsKeys)} ]\n`);
  }

  const holdingsResponseObj = JSON.parse(holdingsResponse);

  if ((holdingsResponseObj?.totalRecords || 0) == 0) {
    throw new Error(`Holdings Response has no holdings! Response: ${holdingsResponse}.`);
  }

  if (holdingsResponseObj.length > 1 ) {
    console.log(`WARNING: The holdings response returned more than one holdings. Response: ${holdingsResponse}.\n`);
  }

  const holdingsObj = holdingsResponseObj.holdingsRecords[0];

  const marcOrderDataObj = JSON.parse(marcOrderData);

  const statisticalCodes = JSON.parse(statisticalCodesResponse).statisticalCodes;

  const holdingsTypes = JSON.parse(holdingsTypesResponse).holdingsTypes;

  const locations = JSON.parse(locationsResponse).locations;

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

  if (holdingsKeys.size) {
    Object.keys(holdingsObj).forEach(key => {
      if (!holdingsKeys.has(key)) {
        if (logLevel === "DEBUG") {
          console.log(`Deleting unknown holdings key ${key}.`);
        }

        delete holdingsObj[key];
      }
    });
  }

  if (logLevel === "DEBUG") {
    console.log(`\nholdings = ${JSON.stringify(holdingsObj)}\n`);
  }

  execution.setVariable("holdingsRecordId", holdingsObj.id);
  execution.setVariable("holdings", S(JSON.stringify(holdingsObj)));
}

main();
