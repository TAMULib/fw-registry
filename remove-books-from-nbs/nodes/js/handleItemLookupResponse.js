var itemsToRemoveArray = JSON.parse(itemsToRemove);
var itemsSkippedArray = JSON.parse(itemsSkipped);


if (logLevel === "DEBUG") {
  print('\nitemsResponse = ' + itemsResponse + '\n');
}

var responseItems = JSON.parse(itemsResponse).items;

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

if (logLevel === "DEBUG") {
  print('\nitemsToRemove = ' + JSON.stringify(itemsToRemoveArray) + '\n');
  print('\nitemsSkipped = ' + JSON.stringify(itemsSkippedArray) + '\n');
}

execution.setVariable('itemsToRemove', S(JSON.stringify(itemsToRemoveArray)));
execution.setVariable('itemsSkipped', S(JSON.stringify(itemsSkippedArray)));
