var vendorTypes = {
  AMDB: '{{mod-external-reference-resolver}}/referenceLinkTypes/08c7dd18-dbaf-11e9-8a34-2a2ae2dbcce4',
  MSDB: '{{mod-external-reference-resolver}}/referenceLinkTypes/b427aa0a-96f2-4338-8b3c-2ddcdca6cfe4'
};

var vendorUUID = UUID.randomUUID().toString();

returnObj = {
  referenceLink: {
    folioReference: vendorUUID,
    externalReference: args.VENDOR_ID,
    type: vendorTypes[args.SCHEMA]
  }
};