
const id = '5aa33c81-2e73-4e68-869f-caa53a04ad86';
const itemArr = [
  id,
  'Example Array',
];

execution.setVariableLocal('itemId', id);
execution.setVariableLocal('item', S(JSON.stringify(itemArr)));
