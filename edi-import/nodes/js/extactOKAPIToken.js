const TokenUtility = Java.type('org.folio.rest.camunda.utility.TokenUtility');

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

  execution.setVariable('X-Okapi-Token', accessToken);
}());
