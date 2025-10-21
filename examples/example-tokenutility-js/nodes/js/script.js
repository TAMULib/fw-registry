const HttpCookie = Java.type('java.net.HttpCookie');
const TokenUtility = Java.type('org.folio.rest.camunda.utility.TokenUtility');

const ACCESS_TOKEN = "=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0aW5nX2FkbWluIiwidXNlcl9pZCI6IjczZjgxYTFlLTk0ZGMtNDk3NS1hYjdlLTM3YWM0NGUwNmIyYiIsInR5cGUiOiJhY2Nlc3MiLCJleHAiOjE2OTUzOTMwMTAsImlhdCI6MTY5NTM5MjQxMCwidGVuYW50IjoidGVzdGxpYjE0In0.PqMCOD9ghOPQE7kzD1hYd09otNgOU0T4C1oMHkpn2no";
const REFRESH_TOKEN = "=eyJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiZGlyIn0..hA3f_Sa2xV7Vo7Np.j9P0oTsggs0r48kMNa5f-M8JrRRAdXx0hYJZp4ecLfNFHA8ee2WtZZQ_P9EGgktqokHOIfVsxQewLbXF04-O2xtlc6i8tCxii3Hv8wT8HmYqcWKAZ6g3UYXS81QS3fYdGsH6DTV_c8hU77knHKGZo3YLbNv5-Qs7en7EhzCEyo79x7hQFfVUrgY7YbKixKkVkRvshTt_nSD2S0T44-H-KC-vmKvn7yLu9W-pCCU4E37NFjBWV9vjK6NiOOa_H-9ZfFo1pDoMTpfrc1KX824LVRAAmvVjLxMQYDtOVZPTSdIO888.v6Pe4Wm-kOPEjmJaiZ32kQ";
const ACCESS_COOKIE = `folioAccessToken=${ACCESS_TOKEN}; Max-Age=600; Expires=Fri, 22 Sep 2023 14:30:10 GMT; Path=/; Secure; HTTPOnly; SameSite=None`;
const REFRESH_COOKIE = `folioRefreshToken=${REFRESH_TOKEN}; Max-Age=604800; Expires=Fri, 29 Sep 2023 14:20:10 GMT; Path=/authn; Secure; HTTPOnly; SameSite=None`;
const OTHER_COOKIE = "other=value; Max-Age=604800; Expires=Fri, 29 Sep 2025 14:20:10 GMT; Path=/other_path";

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
 * Parse the cookie given the cookie string.
 *
 * This handles errors so that the script completes properly.
 * Errors are printed to the console and reviewer is expected to view the console.
 *
 * @param {string} cookie_string - The cookie string to parse.
 *
 * @return {HttpCookie} The first matching cookie (this will return undefined on error).
 */
function getCookie(cookie_string) {
  try {
    const cookie = HttpCookie.parse(cookie_string);

    return cookie.getFirst();
  } catch (e) {
    console.error(`\nERROR: HttpCookie cookie parse threw exception.`);

    console.group("Parameters");
    console.error("cookie_string:", cookie_string);
    console.groupEnd();

    console.group("Stack Trace");
    console.error(e?.stack);
    console.groupEnd();
  }
}

/**
 * Perform unit tests using the given callback.
 *
 * This handles errors so that the script completes properly.
 * Errors are printed to the console and reviewer is expected to view the console.
 *
 * @param {object} params            - An array of parameters.
 * @param {callback} params.callback - The function to execute.
 * @param {string} params.name       - The function name to print on error.
 * @param {string} params.header     - The header value to test (may be NULL).
 * @param {string} params.expect     - The expected token value to match (may be NULL).
 *
 * @return {bool} TRUE on pass and FALSE otherwise.
 */
function operateTest(params) {
  try {
    const result = params.callback(params.header);

    if (params.expect === null) {
      return result === null;
    }

    return result !== null && params.expect === result.toString();
  } catch (e) {
    console.error(`\nERROR: ${params?.name}() threw exception.`);

    console.group("Stack Trace");
    console.error(e?.stack);
    console.groupEnd();

    return false;
  }
}

const tests = [{
  callback: TokenUtility.getAccessToken,
  name: "getAccessToken",
  header: ACCESS_COOKIE,
  expect: ACCESS_TOKEN,
}, {
  callback: TokenUtility.getAccessToken,
  name: "getRefreshToken",
  header: REFRESH_COOKIE,
  expect: null,
}, {
  callback: TokenUtility.getRefreshToken,
  name: "getRefreshToken",
  header: REFRESH_COOKIE,
  expect: REFRESH_TOKEN,
}, {
  callback: TokenUtility.getRefreshToken,
  name: "getRefreshToken",
  header: ACCESS_COOKIE,
  expect: null,
}];

(function () {
  console.log(`\nBegin TokenUtility testing on ${new Date().toString()}.`);
  debugLog(`\nDEBUG: This JavaScript operating under ECMA Version ${Graal?.versionECMAScript}.`);

  let failure = 0;
  let success = 0;

  for (const params of tests) {
    if (operateTest(params)) {
      success++;
    } else {
      console.log(`\nTest Failure for ${params.name}().`);
      console.group("Parameters");
      console.log("header:", params?.header);
      console.log("expect:", params?.expect);
      console.groupEnd();

      failure++;
    }
  }

  console.log(`\nTokenUtility tests concluded with ${failure} failures and ${success} successes on ${new Date().toString()}.\n`);
}());
