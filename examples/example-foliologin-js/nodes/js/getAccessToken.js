const TokenUtility = Java.type('org.folio.rest.camunda.utility.TokenUtility');

/**
 * Print debug message if LogLevel is set to DEBUG.
 *
 * @param {string} message - The message to print.
 */
function debugLog(message) {
  if (execution.getVariable('logLevel') == 'DEBUG') console.debug(message);
}

/**
 * Get the named headers, if defined.
 *
 * This requires that the `asArray` for the `headerOutputVariables` variable to be set to TRUE.
 *
 * Note: The scripts have access to all variables available and so do not specifically require the 'inputVariables' to be defined.
 *
 * @param {string} name - The headers name to fetch.
 *
 * @return {string} The value of the named headers, or undefined.
 */
function getHeaders(name) {
  if (execution.hasVariable(name)) {
    return execution.getVariableTyped(name, true).getValue();
  }
}

(function () {
  const setCookie = getHeaders('Set-Cookie');
  const folioAccessToken = TokenUtility.getAccessTokens(setCookie);

  debugLog(`\nDEBUG: Example FOLIO Access Token: ${folioAccessToken}.`);

  execution.setVariable('X-Okapi-Token', folioAccessToken);
}());
