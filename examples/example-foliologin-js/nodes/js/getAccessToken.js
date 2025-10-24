const TokenUtility = Java.type('org.folio.rest.camunda.utility.TokenUtility');

/**
 * Print debug message if LogLevel is set to DEBUG.
 *
 * Note: The initialize context code currently deserializes the logLevel string with quotes around it.
 *
 * @param {string} message - The message to print.
 */
function debugLog(message) {
  if (logLevel == '"DEBUG"') console.debug(message);
}

/**
 * Get the named headers, if defined.
 *
 * This requires that the `asArray` for the `headerOutputVariables` variable to be set to TRUE.
 *
 * Note: The scripts have access to all variables available and so do not specifically require the "inputVariables" to be defined.
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
  const setCookie = getHeaders("Set-Cookie");
  const accessToken = TokenUtility.getAccessTokens(setCookie);

  debugLog(`\nDEBUG: Example FOLIO Access Token: ${accessToken}.`);

  execution.setVariable('X-Okapi-Token', accessToken);
}());
