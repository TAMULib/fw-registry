print('====== process item js Start ======\n');
var itemObj = JSON.parse(itemResponse);

print('\nitemObj' + itemObj);

print('====== process item js end ======\n');
execution.setVariable('item', JSON.stringify(itemObj));