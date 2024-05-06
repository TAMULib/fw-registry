var holdingsObj = JSON.parse(holdingsResponse);

if (!!holdingsObj) {
  print('\n TODO set the temp location and add notes');
  if ( (holdingsObj.holdingsItems.length === 0) || (holdingsObj.bareHoldingsItems.length === 0) ) {
    holdingsObj.discoverySuppress = true;
  }

  if(holdingsObj.temporarylocationid) {
    holdingsObj.temporarylocationid = "dd55282c-bd64-4e1c-887d-ad0c8887bb69";
  }
}

print('\nHolding = ' + S(JSON.stringify(holdingsObj)));

execution.setVariable('holdings', S(JSON.stringify(holdingsObj)));
execution.setVariable('holdingsId', (!!holdingsObj && !!holdingsObj.id) ? holdingsObj.id : '');