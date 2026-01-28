var UUID = Java.type('java.util.UUID');

var holdingsId = UUID.randomUUID().toString();
var match = new RegExp('\\[instanceId\\]', 'i');
var holdings = JSON.parse(
  holdingsTemplate
    .replace(match, instanceId)
);

holdings.id = holdingsId;

console.log(`DEBUG: built holdings for instanceId ${instanceId}: `, JSON.stringify(holdings, null, 2));

execution.setVariableLocal('holdings', S(JSON.stringify(holdings)));
