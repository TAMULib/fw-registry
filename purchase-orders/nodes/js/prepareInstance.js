var MappingUtility = Java.type("org.folio.rest.camunda.utility.MappingUtility");

if (logLevel === 'DEBUG') {
  print('\ninstance = ' + instance + '\n');
  print('\nstatisticalCodesResponse = ' + statisticalCodesResponse + '\n');
}

var instanceObj = JSON.parse(instance);

var marcJsonRecord = JSON.stringify(JSON.parse(sourceRecord).parsedRecord.content);

var statisticalCodes = JSON.parse(statisticalCodesResponse).statisticalCodes;

var token = execution.getVariable('X-Okapi-Token');

var tenant = execution.getTenantId();

var mapStatisticalCodeIds = function (statisticalCodes) {
  var statisticalCodeIds = [];
  for (var i = 0; i < statisticalCodes.length; ++i) {
    statisticalCodeIds.push(statisticalCodes[i].id);
  }
  return statisticalCodeIds;
};

var mappedInstance = MappingUtility.mapRecordToInsance(marcJsonRecord, okapiUrl, tenant, token);
var mappedInstanceObj = JSON.parse(mappedInstance);

mappedInstanceObj.id = instanceObj.id;
mappedInstanceObj.hrid = instanceObj.hrid;
mappedInstanceObj.statusId = instanceObj.statusId;
mappedInstanceObj.statusUpdatedDate = instanceObj.statusUpdatedDate;
mappedInstanceObj.discoverySuppress = false;

mappedInstanceObj.statisticalCodeIds = mapStatisticalCodeIds(statisticalCodes);

mappedInstanceObj._version = 1;

if (logLevel === 'DEBUG') {
  print('\ninstance = ' + JSON.stringify(mappedInstanceObj) + '\n');
}

execution.setVariable('instance', S(JSON.stringify(mappedInstanceObj)));
