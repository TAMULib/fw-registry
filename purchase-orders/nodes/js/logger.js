var envLogLevel = execution.getVariable('logLevel');

if (envLogLevel === 'INFO' || envLogLevel === 'DEBUG') {
  print('\nindex = ' + loopCounter);
  print('\tokapiUrl = ' + okapiUrl);
  print('\tpermLocation = ' + permLocation);
  print('\ttempLocation = ' + tempLocation);
  print('\tfiscalYearCode = ' + fiscalYearCode);
  print('\tpermLoanType = ' + permLoanType);
  print('\ttempLoanType = ' + tempLoanType);
  print('\tnoteType = ' + noteType);
  print('\tmaterialType = ' + materialType);

  print('\tpermELocation = ' + permELocation);
  print('\teMaterialType = ' + eMaterialType);
  print('\teHoldingsType = ' + eHoldingsType + '\n');

  print('\npurchase order workflow complete\n');
}
