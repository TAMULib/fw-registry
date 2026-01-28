var response = JSON.parse(instanceResponse);

console.log("DEBUG: got instance response: ", JSON.stringify(response.instances[0], null, 2));

execution.setVariableLocal('instanceId', response.instances[0].id);
