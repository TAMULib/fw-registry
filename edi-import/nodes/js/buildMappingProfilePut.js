// Build the PUT body that stamps this invoice's FOLIO account number onto the
// Data Import mapping profile fetched by the previous node.
//
// Risk 2 (see plan): converter-storage's PUT /mappingProfiles/{id} expects a
// MappingProfileUpdateDto wrapper { profile, addedRelations, deletedRelations }.
// If the target tenant rejects that and wants the bare profile, set USE_UPDATE_DTO
// to false below.
var USE_UPDATE_DTO = true;

// Set a value at a dot/bracket path, e.g. "mappingDetails.mappingFields[3].value".
function setByPath(obj, path, value) {
  var tokens = path.match(/[^.[\]]+/g) || [];
  if (!tokens.length) {
    return false;
  }
  var cur = obj;
  for (var i = 0; i < tokens.length - 1; i++) {
    var token = tokens[i];
    if (cur[token] == null) {
      cur[token] = /^\d+$/.test(tokens[i + 1]) ? [] : {};
    }
    cur = cur[token];
  }
  cur[tokens[tokens.length - 1]] = value;
  return true;
}

// Fallback: find the account-number field within mappingDetails.mappingFields[].
function setAccountFieldByName(profile, value) {
  var md = profile && profile.mappingDetails;
  if (md && Array.isArray(md.mappingFields)) {
    for (var i = 0; i < md.mappingFields.length; i++) {
      var field = md.mappingFields[i];
      if (field && typeof field.name === 'string' && /account/i.test(field.name)) {
        field.value = value;
        return true;
      }
    }
  }
  return false;
}

var fetched = JSON.parse(mappingProfileResponse);
// GET may return the bare profile or a wrapper; normalize to the profile object.
var profile = (fetched && fetched.profile) ? fetched.profile : fetched;

var invoice = JSON.parse(inv);
var accountValue = invoice.account_number || ''; // blank when unmatched (still imported)

var path = execution.hasVariable('mappingProfileAccountNumberPath')
  ? String(execution.getVariable('mappingProfileAccountNumberPath') || '').trim()
  : '';

var applied = path ? setByPath(profile, path, accountValue) : setAccountFieldByName(profile, accountValue);
if (!applied) {
  print('WARN: could not locate the mapping profile account-number field for invoice ' + invoice.invoice_number);
}

// Expose the per-invoice file name for the upload-definition request task.
execution.setVariable('invoiceFileName', invoice.file_name);

var putBody = USE_UPDATE_DTO
  ? { profile: profile, addedRelations: [], deletedRelations: [] }
  : profile;

execution.setVariable('mappingProfilePutBody', S(JSON.stringify(putBody)));
