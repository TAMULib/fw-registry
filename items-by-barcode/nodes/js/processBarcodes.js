var FormatUtility = Java.type('org.folio.rest.utility.FormatUtility');
var MappingUtility = Java.type('org.folio.rest.utility.MappingUtility');
var UUID = Java.type('java.util.UUID');
var StringUtils = Java.type('org.apache.commons.lang3.StringUtils');
var idsJson = MappingUtility.mapCsvToJson(rowsCsv);
var idsMatrix = JSON.parse(idsJson);

var idSql = null;
var idSqlFailure = false;
var changedItems = [];

if (logLevel === 'DEBUG') {
  print('\ninputFilePath = ' + inputFilePath + '\n');
  print('\nidsJson = ' + idsJson + '\n');
}

if (Array.isArray(idsMatrix) && idsMatrix.length > 0) {
  for (let i = 0; i < idsMatrix.length; i++) {
    let key = Object.keys(idsMatrix[i]);

    try {
      let value = FormatUtility.sanitizeSqlCode(idsMatrix[i][key]);

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

queryWrapper.sql =  'UPDATE folio_reporting.item_ext AS ie ';
queryWrapper.sql += 'SET ';
queryWrapper.sql += 'status = \'withdrawn\', ';
queryWrapper.sql += 'permanent_loan_type_name = \'withdrawn\', ';
queryWrapper.sql += 'discovery_suppress = true, ';
queryWrapper.sql += 'suppress_holdings = true, ';
queryWrapper.sql += 'holdings_location = \'evans withdrawn\' ';
queryWrapper.sql += 'FROM (SELECT barcode FROM folio_reporting.item_ext WHERE barcode IN (' + idSql + ')) AS barcode_temp ';
queryWrapper.sql += 'WHERE ie.barcode = barcode_temp.barcode ';
queryWrapper.sql += 'AND (temporary_loan_type_name || permanent_loan_type_name) != \'withdrawn\' ';
queryWrapper.sql += 'AND ie.discovery_suppress IS FALSE ';
queryWrapper.sql += 'AND ie.status_name != \'withdrawn\';';



execution.setVariable('changedItems', S(JSON.stringify(changedItems)));
execution.setVariableLocal('ldpUpdateQuery', S(JSON.stringify(queryWrapper)));
