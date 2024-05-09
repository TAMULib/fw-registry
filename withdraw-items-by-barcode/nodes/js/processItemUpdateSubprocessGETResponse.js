var itemObj = JSON.parse(itemResponse);

if (!!itemObj) {
  if (itemObj.hasOwnProperty('discoverySuppress')) {
    itemObj.discoverySuppress = true;
  }

  if (itemObj.hasOwnProperty('temporaryLoanType') && itemObj.temporaryLoanType) {
    itemObj.temporaryLoanType.id = "e029dd79-1778-422c-b856-f0ac131f0369";
  }

  if (itemObj.hasOwnProperty('status') && !itemObj.status) {
    itemObj.status.name = "Withdrawn";
  }
}

if (logLevel === 'DEBUG') {
  print('\nItem = ' + S(JSON.stringify(itemObj)));
}


execution.setVariable('item', S(JSON.stringify(itemObj)));
execution.setVariable('itemId', (!!itemObj && !!itemObj.id) ? itemObj.id : '');
