var itemObject = JSON.parse(itemObject);
var logLevel = "DEBUG";

if (logLevel === "DEBUG") {
  print(itemObject);
}

itemObject.temporaryLocationId = null;
itemObject.temporaryLoanTypeId = null;

execution.setVariable('itemObject', JSON.stringify(itemObject));
