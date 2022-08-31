var UUID = Java.type("java.util.UUID");
var MarcUtility = Java.type("org.folio.rest.utility.MarcUtility");

var sourceRecordId = UUID.randomUUID().toString();
var snapshotId = UUID.randomUUID().toString();

var instanceObj = JSON.parse(instance);

var field = {
  tag: '999',
  indicator1: 'f',
  indicator2: 'f',
  subfields: [{
    code: 'i',
    data: instanceId
  }, {
    code: 's',
    data: sourceRecordId
  }]
};

var marcJsonRecord = JSON.parse(record);

if (logLevel === 'DEBUG') {
  print('\nmarcJsonRecord = ' + JSON.stringify(marcJsonRecord) + '\n');
}

marcJsonRecord = MarcUtility.addFieldToMarcJson(marcJsonRecord, JSON.stringify(field));

marcJsonRecord = MarcUtility.updateControlNumberField(marcJsonRecord, instanceObj.hrid);

var rawMarcRecord = MarcUtility.marcJsonToRawMarc(marcJsonRecord);

if (logLevel === 'DEBUG') {
  print('\nrawMarcRecord = ' + rawMarcRecord + '\n');
}

var jobExecution = {
  jobExecutionId: snapshotId,
  status: 'PARSING_IN_PROGRESS'
};

var sourceRecord = {
  id: sourceRecordId,
  recordType: 'MARC_BIB',
  snapshotId: snapshotId,
  matchedId:  instanceObj.id,
  externalIdsHolder: {
    instanceId: instanceObj.id,
    instanceHrid: instanceObj.hrid
  },
  rawRecord: {
    id: sourceRecordId,
    content: rawMarcRecord
  },
  parsedRecord: {
    id: sourceRecordId,
    content: JSON.parse(marcJsonRecord)
  }
};

if (logLevel === 'DEBUG') {
  print('\njobExecution = ' + JSON.stringify(jobExecution) + '\n');
  print('\nsourceRecord = ' + JSON.stringify(sourceRecord) + '\n');
  print('\nmarcJsonRecord = ' + JSON.stringify(marcJsonRecord) + '\n');
}

execution.setVariableLocal('jobExecution', S(JSON.stringify(jobExecution)));

execution.setVariableLocal('sourceRecord', S(JSON.stringify(sourceRecord)));
