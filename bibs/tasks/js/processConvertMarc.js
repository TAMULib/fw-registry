if (!counter.bibs) {
  counter.bibs = 1;
}

returnObj = {
  instanceId: args.instanceId,
  sourceRecordId: args.sourceRecordId,
  suppressDiscovery: args.SUPPRESS_IN_OPAC === 'Y',
  bibId: args.BIB_ID,
  bibTotal: args.BIB_TOTAL,
  bibIndex: counter.bibs++,
  marc: JSON.parse(scriptEngineUtility.rawMarcToJson(args.MARC_RECORD))
};