var varItemsToRemove = execution.getVariable('itemsToRemove');
var items = varItemsToRemove == null ? [] : JSON.parse(varItemsToRemove);
var barcodes = items.map((item)=> item.barcode);

execution.setVariable('barcodesOfItemsRemoved', S(JSON.stringify(barcodes)));
