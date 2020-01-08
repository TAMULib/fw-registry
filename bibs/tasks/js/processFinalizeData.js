var lastBibIndex;
var lastBibTotal;

var initialRecords = [];

for (var i = 0; i < args.length; i++) {
  lastBibIndex = args[i].bibIndex;
  lastBibTotal = args[i].bibTotal;
  var marc = JSON.stringify(args[i].marc);
  if (marc === '' || marc === '{}') {
    print('WARNING: empty marc record for bib ' + args[i].bibId);
    continue;
  }
  if (args[i].instanceId === undefined) {
    print('WARNING: no instance id for bib ' + args[i].bibId);
    continue;
  }
  if (args[i].sourceRecordId === undefined) {
    print('WARNING: no source record id for bib ' + args[i].bibId);
    continue;
  }
  initialRecords.push({
    record: marc,
    instanceId: args[i].instanceId,
    sourceRecordId: args[i].sourceRecordId,
    suppressDiscovery: args[i].suppressDiscovery
  });
}

var last = lastBibIndex >= lastBibTotal;
var counter = Math.ceil(lastBibIndex / {{bibBatchSize}});
var total = Math.ceil(lastBibTotal / {{bibBatchSize}});
var contentType = 'MARC_JSON';

var recordsMetadata = {
  last: last,
  counter: counter,
  total: total,
  contentType: contentType
};

print(JSON.stringify(recordsMetadata));

returnObj = {
  bibs: {
    recordsMetadata: recordsMetadata,
    initialRecords: initialRecords
  }
};