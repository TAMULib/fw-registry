
const itemObj = {
  id: '5aa33c81-2e73-4e68-869f-caa53a04ad86',
  name: 'Example JSON',
};

execution.setVariableLocal('itemId', itemObj.id);
execution.setVariableLocal('item', S(JSON.stringify(itemObj)));
