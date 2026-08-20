var varSfxListing = execution.getVariable('sfxListing');
var listing = varSfxListing == null ? [] : JSON.parse(varSfxListing);

var regex = /^.*e-collection-TAMUCS..*$/g;

while (listing.length) {
  var file = listing.pop();
  if (file.match(regex)) {
    execution.setVariableLocal('sfxFile', file);
    break;
  }
}
