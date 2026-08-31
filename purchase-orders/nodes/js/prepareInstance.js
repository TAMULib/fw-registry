var MappingUtility = Java.type("org.folio.rest.camunda.utility.MappingUtility");

var varInstance = execution.getVariable('instance');
var varStatisticalCodesResponse = execution.getVariable('statisticalCodesResponse');

if (execution.getVariable('logLevel') === 'DEBUG') {
  print('\ninstance = ' + varInstance + '\n');
  print('\nstatisticalCodesResponse = ' + varStatisticalCodesResponse + '\n');
}

var instanceObj = varInstance == null ? undefined : JSON.parse(varInstance);

var varSourceRecord = execution.getVariable('sourceRecord');
var marcJsonRecord = varSourceRecord == null ? undefined : JSON.stringify(JSON.parse(varSourceRecord).parsedRecord.content);

var statisticalCodes = varStatisticalCodesResponse == null ? [] : JSON.parse(varStatisticalCodesResponse).statisticalCodes;

var mapStatisticalCodeIds = function (statisticalCodes) {
  var statisticalCodeIds = [];
  for (var i = 0; i < statisticalCodes.length; ++i) {
    statisticalCodeIds.push(statisticalCodes[i].id);
  }
  return statisticalCodeIds;
};

var mappedInstance = MappingUtility.mapRecordToInstance(marcJsonRecord, execution);
var mappedInstanceObj = JSON.parse(mappedInstance);

mappedInstanceObj.id = instanceObj.id;
mappedInstanceObj.hrid = instanceObj.hrid;
mappedInstanceObj.instanceTypeId = instanceObj.instanceTypeId;
mappedInstanceObj.statusId = instanceObj.statusId;
mappedInstanceObj.statusUpdatedDate = instanceObj.statusUpdatedDate;
mappedInstanceObj.title = instanceObj.title;
mappedInstanceObj.discoverySuppress = false;

mappedInstanceObj.statisticalCodeIds = mapStatisticalCodeIds(statisticalCodes);

mappedInstanceObj._version = 1;

if (execution.getVariable('logLevel') === 'DEBUG') {
  print('\nmappedInstance = ' + JSON.stringify(mappedInstanceObj) + '\n');
}

execution.setVariable('instance', S(JSON.stringify(mappedInstanceObj)));
