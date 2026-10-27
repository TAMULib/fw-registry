var varStartRange = execution.getVariable('startRange');
var varEndRange = execution.getVariable('endRange');
var varLocationName = execution.getVariable('locationName');

if (execution.getVariable("logLevel") === 'DEBUG') {
  print('\nlogLevel = ' + execution.getVariable('logLevel') + '\n');
  print('\ncall number start range = ' + varStartRange + '\n');
  print('\ncall number end range = ' + varEndRange + '\n');
  print('\nlocationName = ' + varLocationName + '\n');
}

var where = 'TRUE';

var locationNameArray = varLocationName == null ? [] : JSON.parse(varLocationName);

if (varStartRange != null && varStartRange != '') {
  where = '\n\t\tUPPER(ie.effective_call_number) >= UPPER(\'' + varStartRange + '\')';
}

if (varEndRange != null && varEndRange != '') {
  where += '\n\t\tAND UPPER(ie.effective_call_number) <= RPAD(UPPER(\'' + varEndRange + '\'), max_len, \'ÿ\')';
}

where += '\n\t\tAND ie.status_name = \'Checked out\'';

if (locationNameArray.length > 0) {
  where += "\n\tAND ie.effective_location_name IN ('" + locationNameArray.join("', '") + "')";
}

var cte = 'WITH MaxLength AS (' +
  '\n\tSELECT MAX(LENGTH(ie.effective_call_number)) AS max_len' +
  '\n\tFROM folio_derived.item_ext ie' +
  ')';

var booksCallNumberQuery =
  '\n\n' + cte +
  '\nSELECT ie.effective_call_number,' +
  '\n\tie.effective_location_name AS item_effective_location' +
  '\n\tFROM folio_derived.item_ext ie' +
  '\n\tCROSS JOIN MaxLength' +
  '\nWHERE ' + where +
  '\nORDER BY ie.effective_call_number, item_effective_location';

if (execution.getVariable('logLevel') === 'DEBUG') {
  print('\nbooksCallNumberQuery = ' + booksCallNumberQuery);
}

var queryWrapper = {
  sql: booksCallNumberQuery,
};

execution.setVariableLocal('booksCallNumberQuery', S(JSON.stringify(queryWrapper)));
