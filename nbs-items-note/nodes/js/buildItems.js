var varItemsResponse = execution.getVariable('itemsResponse');
var itemsArr = varItemsResponse == null ? [] : JSON.parse(itemsResponse);

execution.setVariable('items', S(JSON.stringify(itemsArr)));
