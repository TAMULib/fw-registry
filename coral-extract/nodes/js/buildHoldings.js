var UUID = Java.type('java.util.UUID');

var holdingsId = UUID.randomUUID().toString();
var match = new RegExp('\\[instanceId\\]', 'i');
var holdings = JSON.parse(
  holdingsTemplate
    .replace(match, execution.getVariable('instanceId'))
);

holdings.id = holdingsId;

execution.setVariableLocal('holdings', S(JSON.stringify(holdings)));
