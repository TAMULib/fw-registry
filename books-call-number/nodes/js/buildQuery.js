if (logLevel === 'DEBUG') {
  print('\nlogLevel = ' + logLevel + '\n');
  print('\ncall number start range = ' + startRange + '\n');
  print('\ncall number end range = ' + endRange + '\n');
}

var where = 'TRUE';

if (startRange) {
  where = '\n\t\tUPPER(he.call_number) >= UPPER(\'' + startRange + '\')';
}

if (endRange) {
  where += '\n\t\tAND UPPER(he.call_number) <= RPAD(UPPER(\'' + endRange + '\'), max_len, \'ÿ\')';
}

var cte =
  'WITH MaxLength AS (' +
  '\n\tSELECT MAX(LENGTH(he.call_number)) AS max_len' +
  '\n\tFROM folio_reporting.holdings_ext he' +
  ')';

var booksCallNumberQuery =
  '\n\n' + cte +
  '\nSELECT he.call_number' +
  '\n\tFROM folio_reporting.item_ext ie' +
  '\n\tJOIN folio_reporting.holdings_ext he ON ie.holdings_record_id = he.holdings_id' +
  '\n\tCROSS JOIN MaxLength' +
  '\nWHERE ' + where +
  '\nORDER BY he.call_number';

if (logLevel === 'DEBUG') {
  print('\nbooksCallNumberQuery = ' + booksCallNumberQuery);
}

var queryWrapper = {
  sql: booksCallNumberQuery,
};

execution.setVariableLocal('booksCallNumberQuery', S(JSON.stringify(queryWrapper)));
