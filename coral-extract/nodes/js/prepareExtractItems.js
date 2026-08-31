var StringEscapeUtils = Java.type('org.apache.commons.lang.StringEscapeUtils');

var safe = function (str) {
  return StringEscapeUtils.escapeSql(str);
};

var buildExtractItems = function () {
  var varCoralExtractResponse = execution.getVariable('coralExtractResponse');
  var lines = varCoralExtractResponse == null ? [] : varCoralExtractResponse.replace(/\n$/i, '').split('\n');
  var parts;
  var items = [];
  var coralIds = {};
  var coralId;

  for (var i = 1; i < lines.length; ++i) {
    parts = lines[i].split('\t');

    coralId = parts[0];

    if (coralIds[coralId] == coralId) {
      print("Duplicate Coral ID (" + coralId + ") detected.");
      continue;
    }

    items.push({
      coralId: coralId,
      contributor: safe(parts[3]),
      title: safe(parts[6]),
      publisher: safe(parts[8]),
      summary: safe(parts[15]),
      natureOfContentTerm: safe(parts[29]),
      electronicAccess: safe(parts[32]),
      status: safe(parts[62])
    });

    coralIds[coralId] = coralId;
  }

  return items;
};

execution.setVariable('extractItems', S(JSON.stringify(buildExtractItems())));
