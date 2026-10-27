var varTag = execution.getVariable('tag');
var tagObj = JSON.parse(varTag);

if (execution.getVariable('logLevel') === 'DEBUG') {
  print('\ntag = ' + JSON.stringify(tagObj) + '\n');
}

execution.setVariableLocal('tag', S(JSON.stringify(tagObj)));
