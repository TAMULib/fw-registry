if (logLevel === 'DEBUG') {
    print('\nlogLevel = ' + logLevel + '\n');
    print('\ncall number start range = ' + startRange + '\n');
    print('\ncall number end range = ' + endRange + '\n');
    print('emailFrom = ' + emailFrom + '\n');
    print('emailTo = ' + emailTo + '\n');
  }
  
  var bookReportQuery = '\n'       
         + '\nWITH MaxLength AS ('
         + '\n\tSELECT MAX(LENGTH(he.call_number)) AS max_len'
         + '\n\tFROM folio_reporting.holdings_ext he'
         + '\n)'
         + '\nSELECT he.call_number'
         + '\n\tFROM folio_reporting.item_ext ie'
         + '\n\tJOIN folio_reporting.holdings_ext he ON ie.holdings_record_id = he.holdings_id'
         + '\n\tCROSS JOIN MaxLength'
         + '\nWHERE UPPER(he.call_number) >= UPPER(\'a\')'
         + '\n\tAND UPPER(he.call_number) <= RPAD(UPPER(\'b9\'), max_len, \'ÿ\')'
         + '\nORDER BY he.call_number';
  
  if (logLevel === 'DEBUG') {
    print('\bookReportQuery = ' + bookReportQuery);
  }
  
  var queryWrapper = {
    sql: bookReportQuery
  };
  
  execution.setVariableLocal('bookReportQuery', S(JSON.stringify(queryWrapper)));
  