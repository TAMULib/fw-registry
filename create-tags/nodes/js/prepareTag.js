var tagObj= JSON.parse(tag);
if (execution.getVariable('logLevel') === 'DEBUG') {
  print('\ntag = ' + JSON.stringify(tagObj) + '\n');
}
execution.setVariableLocal('tag', S(JSON.stringify(tagObj)));
