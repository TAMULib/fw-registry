var userTypes = {
  AMDB: {
    ID: {
      id: 'fb86289b-001d-4a6f-8adf-5076b162a6c7',
      name: 'USER_AMDB'
    },
    UIN: {
      id: '0ed6f994-8dbd-4827-94c0-905504169c90',
      name: 'USER_AMDB_UIN'
    }
  },
  MSDB: {
    ID: {
      id: '7a244692-dc96-48f1-9bf8-39578b8fee45',
      name: 'USER_MSDB'
    },
    UIN: {
      id: '426ce32f-388c-4edf-9c79-d6b8348148a0',
      name: 'USER_MSDB_UIN'
    }
  }
};

var patronUUID = UUID.randomUUID().toString();

var userReferenceLinks = [
  {
    'folioReference': patronUUID,
    'externalReference': args.PATRON_ID,
    'type': userTypes[args.SCHEMA].ID
  },
  {
    'folioReference': patronUUID,
    'externalReference': args.EXTERNAL_SYSTEM_ID,
    'type': userTypes[args.SCHEMA].UIN
  }
];

if (args.SCHEMA === 'AMDB' && args.MSDB_EXTERNAL_SYSTEM_ID) {
  userReferenceLinks = userReferenceLinks.concat([
    {
      'folioReference': patronUUID,
      'externalReference': args.MSDB_PATRON_ID,
      'type': userTypes.MSDB.ID
    },
    {
      'folioReference': patronUUID,
      'externalReference': args.MSDB_EXTERNAL_SYSTEM_ID,
      'type': userTypes.MSDB.UIN
    }
  ]);
}

returnObj = {
  referenceLinks: userReferenceLinks
};