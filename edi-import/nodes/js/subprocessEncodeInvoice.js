// Pull the upload-definition id and file id from the create-upload-definition
// response, and prepare the EDI payload that gets uploaded next.
var invoice = JSON.parse(inv);
var response = JSON.parse(uploadDefinitionResponse);

// The response may be the bare upload definition or wrapped under uploadDefinition.
var uploadDefinition = response.fileDefinitions
  ? response
  : (response.uploadDefinition || response);

var fileDefinition = (uploadDefinition.fileDefinitions && uploadDefinition.fileDefinitions[0]) || {};

execution.setVariable('uploadDefinitionId', uploadDefinition.id);
execution.setVariable('fileId', fileDefinition.id);

// The EDI payload to upload. The engine's RequestTask serializes this string body
// using the request contentType (application/octet-stream). If the runtime instead
// requires an actual byte[]/Base64 payload, convert it here (see plan Risk 1).
execution.setVariable('invoiceUploadBody', invoice.edi);
