var instanceObj = JSON.parse(instanceResponse);

if (!!instanceObj) {

  instanceObj.discoverySuppress = true;

}

print('\nInstance = ' + S(JSON.stringify(instanceObj)));

execution.setVariable('instance', S(JSON.stringify(instanceObj)));
execution.setVariable('instanceId', (!!instanceObj && !!instanceObj.id) ? instanceObj.id : '');