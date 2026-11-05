// Pull the upload-definition id and file id from the create-upload-definition
// response, and prepare the EDI payload that gets uploaded next.
var invoice = JSON.parse(inv);
var responseValue = execution.getVariable('uploadDefinitionResponse');
var responseJson;
if (typeof responseValue === 'string') {
  responseJson = responseValue;
} else {
  // Request responses can be Java Maps; their toString() is not JSON.
  var ObjectMapper = Java.type('com.fasterxml.jackson.databind.ObjectMapper');
  responseJson = new ObjectMapper().writeValueAsString(responseValue);
}
var response = JSON.parse(responseJson);

// The response may be the bare upload definition or wrapped under uploadDefinition.
var uploadDefinition = response.fileDefinitions
  ? response
  : (response.uploadDefinition || response);

var fileDefinition = (uploadDefinition.fileDefinitions && uploadDefinition.fileDefinitions[0]) || {};

execution.setVariable('uploadDefinitionId', uploadDefinition.id);
execution.setVariable('fileId', fileDefinition.id);

// The EDI payload to upload. It is set as a transient variable because Camunda
// cannot persist string variables longer than 4000 characters; the Upload EDI File
// node runs in the same transaction (no asyncBefore) so it can still read it.
var Variables = Java.type('org.camunda.bpm.engine.variable.Variables');
execution.setVariable('invoiceUploadBody', Variables.stringValue(invoice.edi, true));
