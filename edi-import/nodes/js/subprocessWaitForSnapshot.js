// Wait until Data Import has snapshotted the job profile for this invoice before
// the loop moves on and PUTs the next invoice's account number into the shared
// mapping profile.
//
// processFiles returns 204 immediately and does the work in the background. In
// mod-data-import (Sunflower 3.3.x) the job profile, and with it the profile
// snapshot, is attached to the job execution(s) BEFORE the upload definition is
// marked COMPLETED, in both the split and non-split code paths. Once the upload
// definition is COMPLETED the import runs from its own snapshot, so the mapping
// profile can safely be changed.
var HttpClient = Java.type('java.net.http.HttpClient');
var HttpRequest = Java.type('java.net.http.HttpRequest');
var HttpResponse = Java.type('java.net.http.HttpResponse');
var Duration = Java.type('java.time.Duration');
var URI = Java.type('java.net.URI');
var Thread = Java.type('java.lang.Thread');
var FolioTokenCache = Java.type('org.folio.rest.camunda.cache.FolioTokenCache');
var MappingUtilityContext = Java.type('org.folio.rest.camunda.utility.MappingUtilityContext');

var POLL_INTERVAL_MS = 2000;
var TIMEOUT_MS = 5 * 60 * 1000;

var uploadDefinitionId = execution.getVariable('uploadDefinitionId');
var tenant = execution.getTenantId();
var tokenCache = MappingUtilityContext.getBean(FolioTokenCache.class);
var invoice = JSON.parse(inv);

var client = HttpClient.newBuilder()
  .version(HttpClient.Version.HTTP_1_1)
  .connectTimeout(Duration.ofSeconds(30))
  .build();

// Uses the engine's FOLIO token, the same one FolioRequestTask nodes use; it is
// refreshed when near expiry, so fetch it for each poll.
function buildRequest() {
  return HttpRequest.newBuilder()
    .uri(URI.create('{{{gatewayUrl}}}/data-import/uploadDefinitions/' + uploadDefinitionId))
    .timeout(Duration.ofSeconds(30))
    .header('X-Okapi-Tenant', tenant)
    .header('X-Okapi-Token', tokenCache.verifyTokens(execution))
    .header('Accept', 'application/json')
    .GET()
    .build();
}

var deadline = Date.now() + TIMEOUT_MS;
var status = null;

while (true) {
  var response = client.send(buildRequest(), HttpResponse.BodyHandlers.ofString());
  var code = response.statusCode();

  if (code === 200) {
    status = JSON.parse(response.body()).status;
    if (status === 'COMPLETED') {
      break;
    }
    if (status === 'ERROR') {
      throw new Error('Data Import failed to start for invoice ' + invoice.invoice_number
        + ': upload definition ' + uploadDefinitionId + ' is in ERROR');
    }
  } else if (code === 401 || code === 403 || code === 404) {
    throw new Error('Unable to check upload definition ' + uploadDefinitionId
      + ' for invoice ' + invoice.invoice_number + ': HTTP ' + code + ' ' + response.body());
  } else {
    print('WARN: upload definition ' + uploadDefinitionId + ' check returned HTTP ' + code + ', retrying');
  }

  if (Date.now() >= deadline) {
    throw new Error('Timed out after ' + (TIMEOUT_MS / 1000) + 's waiting for Data Import to start invoice '
      + invoice.invoice_number + ' (upload definition ' + uploadDefinitionId + ', last status ' + status + ')');
  }

  Thread.sleep(POLL_INTERVAL_MS);
}

print('Invoice ' + invoice.invoice_number + ': Data Import started (upload definition ' + uploadDefinitionId + ' COMPLETED)');
