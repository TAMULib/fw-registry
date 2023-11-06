var MappingUtility = Java.type('org.folio.rest.utility.MappingUtility');
var UUID = Java.type('java.util.UUID');
var StringUtils = Java.type('org.apache.commons.lang3.StringUtils');
var idsJson = MappingUtility.mapCsvToJson(rowsCsv);
var idsMatrix = JSON.parse(idsJson);
var queryWrapper = {
  'noteText': null,
  'noteType': null,
  'staffOnly': false,
  'sql': ''
};
var idSql = null;
var idSqlFailure = false;
var changedItems = [];

if (logLevel === 'DEBUG') {
  print('\ninputFilePath = ' + inputFilePath + '\n');
  print('\nidsJson = ' + idsJson + '\n');
  print('\nitemNoteTypeId = ' + itemNoteTypeId + '\n');
  print('\nnoteText = ' + noteText + '\n');
  print('\nstaffOnly = ' + staffOnly + '\n');
}

if (Array.isArray(idsMatrix) && idsMatrix.length > 0) {
  for (let i = 0; i < idsMatrix.length; i++) {
    let key = Object.keys(idsMatrix[i]);

    try {
      /* TODO: This needs an SQL escape, such as: StringUtils.escapeSql(idsMatrix[i][key]); */
      let value = idsMatrix[i][key];

      if (!!idSql) {
        idSql += ', ';
      } else {
        idSql = '';
      }

      idSql += '\'';
      idSql += value;
      idSql += '\'';
    } catch (err) {
      print('\nERROR: Failed to SQL escape ID (key = ' + key + '): ' + idsMatrix[i][key] + '\n');
      idSqlFailure = true;
    }
  }
}


if (idSqlFailure) {
  throw new Error('No valid IDs have been provided in the CSV file, check to see if file is empty or check if the CSV file is missing the header line.');
}

try {
  queryWrapper.noteType = UUID.fromString(itemNoteTypeId).toString();
} catch (err) {
  throw new Error('Invalid Item Type UUID: ' + itemNoteTypeId + '!');
}

try {
  /* TODO: This needs an SQL escape, such as: queryWrapper.noteText = StringUtils.escapeSql(noteText); */
  queryWrapper.noteText = noteText;
} catch (err) {
  throw new Error('Failed to escape SQL in noteText: ' + noteText + '!');
}

if (staffOnly !== true && staffOnly !== false && ('' + staffOnly).toLowerCase() !== 'true' && ('' + staffOnly).toLowerCase() !== 'false') {
  throw new Error('The staffOnly variable must be either \'true\' or \'false\'.');
}

queryWrapper.staffOnly = (staffOnly === true || ('' + staffOnly).toLowerCase() === 'true') ? true : false;

queryWrapper.sql =  '( select id from inventory_items ';
queryWrapper.sql += '  where barcode in (' + idSql + ') and json_array_length(data->\'notes\') = 0';
queryWrapper.sql += ') union (';
queryWrapper.sql += '  select s.id from (';
queryWrapper.sql += '    select id, to_jsonb(data->\'notes\') as notes';
queryWrapper.sql += '    from inventory_items where barcode in (' + idSql + ')';
queryWrapper.sql += '  ) s';
queryWrapper.sql += '  where not s.notes @> \'[{"itemNoteTypeId":"' + queryWrapper.noteType + '", "staffOnly":' + queryWrapper.staffOnly + ',"note":"' + queryWrapper.noteText + '"}]\'::jsonb';
queryWrapper.sql += ')';

execution.setVariable('changedItems', S(JSON.stringify(changedItems)));
execution.setVariableLocal('ldpSelectQuery', S(JSON.stringify(queryWrapper)));
