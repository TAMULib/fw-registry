var itemObj = JSON.parse(itemResponse);

if (!!itemObj) {

  itemObj.discoverySuppress = false;

  if(itemObj.temporaryLoanType) {
    itemObj.temporaryLoanType.id = "e029dd79-1778-422c-b856-f0ac131f0369";
  }

  if(itemObj.status) {
    itemObj.status.name = "Withdrawn";
  }

}

print('\nItem = ' + S(JSON.stringify(itemObj)));

execution.setVariable('item', S(JSON.stringify(itemObj)));
execution.setVariable('itemId', (!!itemObj && !!itemObj.id) ? itemObj.id : '');