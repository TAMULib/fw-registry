var items = JSON.parse(itemsToRemove);
var barcodes = items.map((item)=> item.barcode);

execution.setVariable('barcodesOfItemsRemoved', S(JSON.stringify(barcodes)));
