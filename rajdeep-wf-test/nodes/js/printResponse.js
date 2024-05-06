// Retrieve the JSON string from the local variable
var ldpGetItemsJson = execution.getVariableLocal("ldpResponse");

// Parse the JSON string to an object
var ldpGetItemsObj = JSON.parse(ldpGetItemsJson);


print("ldpResponse from printResponse ");

print(ldpGetItemsObj);;
