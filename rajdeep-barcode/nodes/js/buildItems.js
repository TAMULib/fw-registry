var itemsArr = JSON.parse(ldpResponse);

if (!Array.isArray(itemsArr)) {
  itemsArr = [];
}

execution.setVariable('items', S(JSON.stringify(itemsArr)));
execution.setVariable('processedItems', 0);
