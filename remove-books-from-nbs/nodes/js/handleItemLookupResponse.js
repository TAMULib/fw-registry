var varItemsToRemove = execution.getVariable('itemsToRemove');
var varItemsSkipped = execution.getVariable('itemsSkipped');
var varItemsResponse = execution.getVariable('itemsResponse');

var itemsToRemoveArray = varItemsToRemove == null ? [] : JSON.parse(varItemsToRemove);
var itemsSkippedArray = varItemsSkipped == null ? [] : JSON.parse(varItemsSkipped);


if (execution.getVariable('logLevel') === "DEBUG") {
  print('\nitemsResponse = ' + varItemsResponse + '\n');
}

var responseItems = varItemsResponse == null ? [] : JSON.parse(varItemsResponse).items;

if (responseItems.length > 0) {
  var item = responseItems[0];
  var updated = Date.parse(item.metadata.updatedDate);
  var now = new Date().getTime();
  var duration = (now - updated) / 1000 / 60 / 60 / 24;

  if (item.effectiveLocation.name === 'Evans nbs' && duration >= 30) {
    item.temporaryLocation = item.permanentLocation;
    item.temporaryLoanType = item.permanentLoanType;
    itemsToRemoveArray.push(item);
  } else {
    itemsSkippedArray.push(item);
  }
}

if (execution.getVariable('logLevel') === "DEBUG") {
  print('\nitemsToRemove = ' + JSON.stringify(itemsToRemoveArray) + '\n');
  print('\nitemsSkipped = ' + JSON.stringify(itemsSkippedArray) + '\n');
}

execution.setVariable('itemsToRemove', S(JSON.stringify(itemsToRemoveArray)));
execution.setVariable('itemsSkipped', S(JSON.stringify(itemsSkippedArray)));
