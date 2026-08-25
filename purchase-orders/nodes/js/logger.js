var envLogLevel = execution.getVariable('logLevel');

if (envLogLevel === 'INFO' || envLogLevel === 'DEBUG') {
  print('\nindex = ' + execution.getVariable('loopCounter'));
  print('\tgatewayUrl = ' + "{{{gatewayUrl}}}";
  print('\tpermLocation = ' + execution.getVariable('permLocation'));
  print('\ttempLocation = ' + execution.getVariable('tempLocation'));
  print('\tfiscalYearCode = ' + execution.getVariable('fiscalYearCode'));
  print('\tpermLoanType = ' + execution.getVariable('permLoanType'));
  print('\ttempLoanType = ' + execution.getVariable('tempLoanType'));
  print('\tnoteType = ' + execution.getVariable('noteType'));
  print('\tmaterialType = ' + execution.getVariable('materialType'));

  print('\tpermELocation = ' + execution.getVariable('permELocation'));
  print('\teMaterialType = ' + execution.getVariable('eMaterialType'));
  print('\teHoldingsType = ' + execution.getVariable('eHoldingsType') + '\n');

  print('\npurchase order workflow complete\n');
}
