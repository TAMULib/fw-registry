var bibTypes = {
  AMDB: {
    SOURCE: {
      id: '96017110-47c5-4d55-8324-7dab1771749b',
      name: 'BIB_AMDB_SOURCE'
    },
    INSTANCE: {
      id: '43efa217-2d57-4d75-82ef-4372507d0672',
      name: 'BIB_AMDB_INSTANCE'
    }
  },
  MSDB: {
    SOURCE: {
      id: 'b9f633b3-22e4-4bad-8785-da09d9eaa6c8',
      name: 'BIB_MSDB_SOURCE'
    },
    INSTANCE: {
      id: 'fb6db4f0-e5c3-483b-a1da-3edbb96dc8e8',
      name: 'BIB_MSDB_INSTANCE'
    }
  }
};

var sourceUUID = UUID.randomUUID().toString();
var instanceUUID = UUID.randomUUID().toString();

var returnObj = [
  {
    folioReference: sourceUUID,
    externalReference: args.BIB_ID,
    type: bibTypes[args.SCHEMA].SOURCE
  },
  {
    folioReference: instanceUUID,
    externalReference: args.BIB_ID,
    type: bibTypes[args.SCHEMA].INSTANCE
  }
];