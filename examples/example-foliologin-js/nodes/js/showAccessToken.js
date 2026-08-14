/**
 * Get the named variable, if defined.
 *
 * @param {string} name - The variable name to fetch.
 *
 * @return {string} The value of the named variable, or undefined.
 */
function getVar(name) {
  if (execution.hasVariable(name)) {
    return execution.getVariable(name);
  }
}

(function () {
  const folioAccessToken = getVar("X-Okapi-Token");

  console.log(`\nExample FOLIO Login Workflow Access Token: ${folioAccessToken}.\n`);
}());
