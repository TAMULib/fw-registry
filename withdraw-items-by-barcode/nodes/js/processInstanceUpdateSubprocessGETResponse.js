var instanceObj = JSON.parse(instanceResponse);
var holdingsObj = JSON.parse(holdingsResponse);

if (!!instanceObj) {
  print('\n TODO set the temp location and add notes');
  if ( (instanceObj.holdingsItems.length === 0) || (instanceObj.bareHoldingsItems.length === 0) ) {
    if ( holdingsObj.hasOwnProperty('discoverySuppress') && ( holdingsObj.discoverySuppress === true ) ) {
      instanceObj.discoverySuppress = true;
    }
  }

  if(instanceObj.temporarylocationid) {
    instanceObj.temporarylocationid = "dd55282c-bd64-4e1c-887d-ad0c8887bb69";
  }
}

print('\nInstance = ' + S(JSON.stringify(instanceObj)));

execution.setVariable('instance', S(JSON.stringify(instanceObj)));
execution.setVariable('instanceId', (!!instanceObj && !!instanceObj.id) ? instanceObj.id : '');