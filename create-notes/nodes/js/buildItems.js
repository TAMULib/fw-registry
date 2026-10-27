var varMetadbResponse = execution.getVariable('metadbResponse');
var itemsArr = JSON.parse(varMetadbResponse);

if (!Array.isArray(itemsArr)) {
  itemsArr = [];
}

execution.setVariable('items', S(JSON.stringify(itemsArr)));
execution.setVariable('processedItems', 0);
