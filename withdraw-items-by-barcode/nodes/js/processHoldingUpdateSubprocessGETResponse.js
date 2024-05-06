var holdingsObj = JSON.parse(holdingsResponse);

if (logLevel === "DEBUG") {
  print('\nStringify Holding = ' + JSON.stringify(holdingsObj));
  print('\nnoteText = ' + note + '\n');
}

var extractResponseArray = function (response, key) {
  return (!response || !response[key]) ? [] : response[key];
};

if (!!holdingsObj) {

  var notes = extractResponseArray(holdingsObj, 'notes');
  holdingsObj.discoverySuppress = true;

  if(holdingsObj.permanentLocationId) {
    holdingsObj.permanentLocationId = "dd55282c-bd64-4e1c-887d-ad0c8887bb69";
  }

  if( holdingsObj.notes ) {
    notes.push({
      'note': note
    });
    holdingsObj.notes = notes;
  }

}

print('\nHolding = ' + S(JSON.stringify(holdingsObj)));

execution.setVariable('holdings', S(JSON.stringify(holdingsObj)));
execution.setVariable('holdingsId', (!!holdingsObj && !!holdingsObj.id) ? holdingsObj.id : '');
