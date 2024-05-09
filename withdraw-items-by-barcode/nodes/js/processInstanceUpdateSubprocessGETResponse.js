var instanceObj = JSON.parse(instanceResponse);

if (!!instanceObj) {
  instanceObj.discoverySuppress = true;
}

if (logLevel === "DEBUG") {
  print('\nInstance = ' + S(JSON.stringify(instanceObj)));
}

execution.setVariable('instance', S(JSON.stringify(instanceObj)));
execution.setVariable('instanceId', (!!instanceObj && !!instanceObj.id) ? instanceObj.id : '');
