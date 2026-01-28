var response = JSON.parse(instanceResponse);

console.log("DEBUG: got instance response: ", response.instances[0]);

execution.setVariableLocal('instanceId', response.instances[0].id);
