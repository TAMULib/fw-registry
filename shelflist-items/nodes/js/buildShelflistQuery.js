var varCallNumber = execution.getVariable('callNumber');
var varLibraryName = execution.getVariable('libraryName');
var varLocationDiscoveryDisplayName = execution.getVariable('locationDiscoveryDisplayName');
var varLocationName = execution.getVariable('locationName');
var varLoanType = execution.getVariable('loanType');
var varMaterialType = execution.getVariable('materialType');
var varItemStatus = execution.getVariable('itemStatus');
var varIssuance = execution.getVariable('issuance');
var varSuppressInstance = execution.getVariable('suppressInstance');
var varSuppressHoldings = execution.getVariable('suppressHoldings');
var varSuppressItem = execution.getVariable('suppressItem');
var varCreatedDateStart = execution.getVariable('createdDateStart');
var varCreatedDateEnd = execution.getVariable('createdDateEnd');
var varUpdatedDateStart = execution.getVariable('updatedDateStart');
var varUpdatedDateEnd = execution.getVariable('updatedDateEnd');

if (execution.getVariable('logLevel') === 'DEBUG') {
  print('\nlogLevel = ' + execution.getVariable('logLevel') + '\n');
  print('emailFrom = ' + execution.getVariable('emailFrom') + '\n');
  print('emailTo = ' + execution.getVariable('emailTo') + '\n');
  print('callNumber = ' + varCallNumber + '\n');
  print('libraryName = ' + varLibraryName + '\n');
  print('locationDiscoveryDisplayName = ' + varLocationDiscoveryDisplayName + '\n');
  print('locationName = ' + varLocationName + '\n');
  print('loanType = ' + varLoanType + '\n');
  print('materialType = ' + varMaterialType + '\n');
  print('itemStatus = ' + varItemStatus + '\n');
  print('issuance = ' + varIssuance + '\n');
  print('suppressInstance = ' + varSuppressInstance + '\n');
  print('suppressHoldings = ' + varSuppressHoldings + '\n');
  print('suppressItem = ' + varSuppressItem + '\n');
  print('createdDateStart = ' + varCreatedDateStart + '\n');
  print('createdDateEnd = ' + varCreatedDateEnd + '\n');
  print('updatedDateStart = ' + varUpdatedDateStart + '\n');
  print('updatedDateEnd = ' + varUpdatedDateEnd + '\n');
}

var cte = 'WITH oclc_identifiers AS ('
          + '\n\tSELECT instance_id, STRING_AGG (identifier, \', \') AS value FROM folio_derived.instance_identifiers WHERE identifier_type_name = \'OCLC\' GROUP BY instance_id'
          + '\n), isbn_identifiers AS ('
          + '\n\tSELECT instance_id, STRING_AGG (identifier, \', \') AS value FROM folio_derived.instance_identifiers WHERE identifier_type_name = \'ISBN\' GROUP BY instance_id'
          + '\n), contributors AS ('
          + '\n\tSELECT instance_id, contributor_name AS author FROM folio_derived.instance_contributors WHERE contributor_name_type_name = \'Personal name\' AND contributor_is_primary = true'
          + '\n)';

var from = 'folio_inventory.item__t item_ext'
            + '\n\tinner join folio_inventory.holdings_record__t holdings_ext on item_ext.holdings_record_id =  holdings_ext.id'
            + '\n\tinner join folio_derived.item_ext fd_item_ext on fd_item_ext.item_id = item_ext.id'
            + '\n\tleft join mis.item_history history on item_ext.id = history.item_id :: uuid'
            + '\n\tleft join folio_derived.instance_ext instance_ext on instance_ext.instance_id = holdings_ext.instance_id'
            + '\n\tleft join folio_derived.instance_publication instance_pub on instance_pub.instance_id = instance_ext.instance_id'
            + '\n\tleft join contributors c on c.instance_id = instance_ext.instance_id'
            + '\n\tleft join oclc_identifiers oclc on oclc.instance_id = instance_ext.instance_id'
            + '\n\tleft join isbn_identifiers isbn on isbn.instance_id = instance_ext.instance_id';

var where = 'TRUE';

var libraryNameArray = varLibraryName == null ? [] : JSON.parse(varLibraryName);

var normalizeArray = function (array) {
  var index = array.indexOf('All');
  if (index >= 0) {
      array.splice(index, 1);
  }
};

if (libraryNameArray) {
  normalizeArray(libraryNameArray);
  if (libraryNameArray.length > 0) {
    from += '\n\tLEFT JOIN folio_inventory.location__t  publoc ON item_ext.effective_location_id = publoc.id'
          + '\n\tLEFT JOIN folio_inventory.loclibrary__t publib ON publoc.library_id = publib.id';

    where += '\n\tAND publib.name IN (\'' + libraryNameArray.join('\',\'') + '\')';
  }
}

var locationDiscoveryDisplayNameArray = varLocationDiscoveryDisplayName == null ? [] : JSON.parse(varLocationDiscoveryDisplayName);

if (locationDiscoveryDisplayNameArray) {
  normalizeArray(locationDiscoveryDisplayNameArray);

  if (locationDiscoveryDisplayNameArray.length > 0) {
    from += '\n\tLEFT JOIN folio_inventory.location__t  publoc ON fd_item_ext.effective_location_name = publoc.name';

    where += '\n\tAND publoc.discovery_display_name IN (\'' + locationDiscoveryDisplayNameArray.join('\',\'') + '\')';
  }
}

var locationNameArray = varLocationName == null ? [] : JSON.parse(varLocationName);

if (locationNameArray) {
  normalizeArray(locationNameArray);

  if (locationNameArray.length > 0) {
    where += '\n\tAND fd_item_ext.effective_location_name IN (\'' + locationNameArray.join('\',\'') + '\')';
  }
}

var loanTypeArray = varLoanType == null ? [] : JSON.parse(varLoanType);

if (loanTypeArray) {
  normalizeArray(loanTypeArray);

  if (loanTypeArray.length > 0) {
    where += '\n\tAND fd_item_ext.permanent_loan_type_name IN (\'' + loanTypeArray.join('\',\'') + '\')';
  }
}

var materialTypeArray = varMaterialType == null ? [] : JSON.parse(varMaterialType);

if (materialTypeArray) {
  normalizeArray(materialTypeArray);

  if (materialTypeArray.length > 0) {
    where += '\n\tAND fd_item_ext.material_type_name IN (\'' + materialTypeArray.join('\',\'') + '\')';
  }
}

var itemStatusArray = varItemStatus == null ? [] : JSON.parse(varItemStatus);

if (itemStatusArray) {
  normalizeArray(itemStatusArray);

  if (itemStatusArray.length > 0) {
    where += '\n\tAND fd_item_ext.status_name IN (\'' + itemStatusArray.join('\',\'') + '\')';
  }
}

if (varCallNumber != null) {
  where += '\n\t\tAND fd_item_ext.effective_call_number = \'' + varCallNumber + '\'';
}

if (varIssuance != null && varIssuance != '') {
  where += '\n\t\tAND instance_ext.mode_of_issuance_name = \'' + varIssuance + '\'';
}

if (varSuppressInstance != null) {
  where += '\n\t\tAND instance_ext.discovery_suppress = ' + (varSuppressInstance === 't' ? 'true' : 'false');
}

if (varSuppressHoldings != null) {
  where += '\n\t\tAND holdings_ext.discovery_suppress = ' + (varSuppressHoldings === 't' ? 'true' : 'false');
}

if (varSuppressItem != null) {
  where += '\n\t\tAND item_ext.discovery_suppress = ' + (varSuppressItem === 't' ? 'true' : 'false');
}

if (varCreatedDateStart != null && varCreatedDateStart != '') {
  where += '\n\tAND cast(to_timestamp(instance_ext.record_created_date::text,\'YYYY-MM-DD\') AT TIME ZONE \'America/Chicago\' AS DATE) >= to_date(\'' + varCreatedDateStart + '\', \'YYYY-MM-DD\')';
}

if (varCreatedDateEnd != null && varCreatedDateEnd != '') {
  where += '\n\tAND cast(to_timestamp(instance_ext.record_created_date::text,\'YYYY-MM-DD\') AT TIME ZONE \'America/Chicago\' AS DATE) <= to_date(\'' + varCreatedDateEnd + '\', \'YYYY-MM-DD\')';
}

if (varUpdatedDateStart != null && varUpdatedDateStart != '') {
  where += '\n\tAND cast(to_timestamp(instance_ext.updated_date::text,\'YYYY-MM-DD\') AT TIME ZONE \'America/Chicago\' AS DATE) >= to_date(\'' + varUpdatedDateStart + '\', \'YYYY-MM-DD\')';
}

if (varUpdatedDateEnd != null && varUpdatedDateEnd != '') {
  where += '\n\tAND cast(to_timestamp(instance_ext.updated_date::text,\'YYYY-MM-DD\') AT TIME ZONE \'America/Chicago\' AS DATE) <= to_date(\'' + varUpdatedDateEnd + '\', \'YYYY-MM-DD\')';
}

var shelflistQuery = '\n\n'
       + cte
       + '\nSELECT DISTINCT ON (item_ext.hrid,item_ext.barcode)'
       + '\n\titem_ext.hrid AS item_hrid,'
       + '\n\titem_ext.barcode AS barcode,'
       + '\n\tfd_item_ext.permanent_location_name AS item_permanent_location,'
       + '\n\tfd_item_ext.effective_location_name AS item_effective_location,'
       + '\n\tfd_item_ext.temporary_location_name AS item_temporary_location,'
       + '\n\tquote_ident(fd_item_ext.effective_call_number) as call_number,'
       + '\n\tquote_ident(item_ext.enumeration) as enumeration,'
       + '\n\tquote_ident(item_ext.chronology) as chronology,'
       + '\n\tquote_ident(substring(instance_ext.title,1,60)) AS title,'
       + '\n\tquote_literal(history.hist_charges) AS hist_charges,'
       + '\n\tquote_literal(history.hist_browses) AS hist_browses,'
       + '\n\tquote_literal(history.last_transaction) AS last_transaction,'
       + '\n\tfd_item_ext.status_name,'
       + '\n\tinstance_pub.publisher,'
       + '\n\tinstance_pub.date_of_publication AS publication_date,'
       + '\n\tinstance_ext.mode_of_issuance_name AS mode_of_issuance,'
       + '\n\tCASE WHEN fd_item_ext.temporary_loan_type_name is null THEN fd_item_ext.permanent_loan_type_name'
       + '\n\tELSE fd_item_ext.temporary_loan_type_name'
       + '\n\tEND as loan_type,'
       + '\n\tfd_item_ext.material_type_name,'
       + '\n\tholdings_ext.discovery_suppress AS holdings_suppress,'
       + '\n\titem_ext.discovery_suppress AS item_suppress,'
       + '\n\tcast(to_timestamp(fd_item_ext.created_date::text,\'YYYY-MM-DD\') at time zone \'America/Chicago\' as date) as create_date,'
       + '\n\tcast(to_timestamp(fd_item_ext.updated_date::text,\'YYYY-MM-DD\') at time zone \'America/Chicago\' as date) as update_date,'
       + '\n\titem_ext.effective_shelving_order COLLATE '+decodeURI("%22")+'C'+decodeURI("%22")+' AS shelving_order,'
       + '\n\tholdings_ext.hrid AS holdings_hrid,'
       + '\n\tc.author AS author,'
       + '\n\toclc.value AS oclc,'
       + '\n\tisbn.value AS isbn'
       + '\nFROM ' + from
       + '\nWHERE ' + where
       + '\nORDER BY item_ext.hrid, item_ext.barcode, item_effective_location, shelving_order, enumeration, chronology, holdings_hrid\n';

if (execution.getVariable('logLevel') === 'DEBUG') {
  print('\nshelflistQuery = ' + shelflistQuery);
}

execution.setVariableLocal('shelflistQuery', shelflistQuery);
