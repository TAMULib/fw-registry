
if (logLevel === 'DEBUG') {
  print('\nlogLevel = ' + logLevel + '\n');
  print('emailFrom = ' + emailFrom + '\n');
  print('emailTo = ' + emailTo + '\n');
  print('callNumber = ' + callNumber + '\n');
  print('libraryName = ' + libraryName + '\n');
  print('locationDiscoveryDisplayName = ' + locationDiscoveryDisplayName + '\n');
  print('locationName = ' + locationName + '\n');
  print('loanType = ' + loanType + '\n');
  print('materialType = ' + materialType + '\n');
  print('itemStatus = ' + itemStatus + '\n');
  print('issuance = ' + issuance + '\n');
  print('suppressInstance = ' + suppressInstance + '\n');
  print('suppressHoldings = ' + suppressHoldings + '\n');
  print('suppressItem = ' + suppressItem + '\n');
  print('createdDateStart = ' + createdDateStart + '\n');
  print('createdDateEnd = ' + createdDateEnd + '\n');
  print('updatedDateStart = ' + updatedDateStart + '\n');
  print('updatedDateEnd = ' + updatedDateEnd + '\n');
}

var cte = 'WITH oclc_identifiers AS ('
          + '\n\tSELECT instance_id, STRING_AGG (identifier, \', \') AS value FROM folio_reporting.instance_identifiers WHERE identifier_type_name = \'OCLC\' GROUP BY instance_id'
          + '\n), isbn_identifiers AS ('
          + '\n\tSELECT instance_id, STRING_AGG (identifier, \', \') AS value FROM folio_reporting.instance_identifiers WHERE identifier_type_name = \'ISBN\' GROUP BY instance_id'
          + '\n), contributors AS ('
          + '\n\tSELECT instance_id, contributor_name AS author FROM folio_reporting.instance_contributors WHERE contributor_name_type = \'Personal name\' AND contributor_primary = true'
          + '\n)';

var from = 'folio_reporting.item_ext item_ext'
            + '\n\tinner join folio_reporting.holdings_ext holdings_ext on item_ext.holdings_record_id =  holdings_ext.holdings_id'
            + '\n\tleft join mis.item_history history on item_ext.item_id = history.item_id'
            + '\n\tleft join folio_reporting.instance_ext instance_ext on instance_ext.instance_id = holdings_ext.instance_id'
            + '\n\tleft join folio_reporting.instance_publication instance_pub on instance_pub.instance_id = instance_ext.instance_id'
            + '\n\tleft join contributors c on c.instance_id = instance_ext.instance_id'
            + '\n\tleft join oclc_identifiers oclc on oclc.instance_id = instance_ext.instance_id'
            + '\n\tleft join isbn_identifiers isbn on isbn.instance_id = instance_ext.instance_id'
            + '\n\tleft join public.inventory_items ii on ii.id = item_ext.item_id';

var where = 'TRUE';

var libraryNameArray = JSON.parse(libraryName);

var normalizeArray = function (array) {
  var index = array.indexOf('All');
  if (index >= 0) {
      array.splice(index, 1);
  }
};

if (libraryNameArray) {
  normalizeArray(libraryNameArray);
  if (libraryNameArray.length > 0) {
    from += '\n\tLEFT JOIN public.inventory_locations publoc ON item_ext.effective_location_id = publoc.id'
          + '\n\tLEFT JOIN public.inventory_libraries publib ON publoc.library_id = publib.id';

    where += '\n\tAND publib.name IN (\'' + libraryNameArray.join('\',\'') + '\')';
  }
}

var locationDiscoveryDisplayNameArray = JSON.parse(locationDiscoveryDisplayName);

if (locationDiscoveryDisplayNameArray) {
  normalizeArray(locationDiscoveryDisplayNameArray);

  if (locationDiscoveryDisplayNameArray.length > 0) {
    from += '\n\tLEFT JOIN public.inventory_locations publoc ON item_ext.effective_location_name = publoc.name';

    where += '\n\tAND publoc.discovery_display_name IN (\'' + locationDiscoveryDisplayNameArray.join('\',\'') + '\')';
  }
}

var locationNameArray = JSON.parse(locationName);

if (locationNameArray) {
  normalizeArray(locationNameArray);

  if (locationNameArray.length > 0) {
    where += '\n\tAND item_ext.effective_location_name IN (\'' + locationNameArray.join('\',\'') + '\')';
  }
}

var loanTypeArray = JSON.parse(loanType);

if (loanTypeArray) {
  normalizeArray(loanTypeArray);

  if (loanTypeArray.length > 0) {
    where += '\n\tAND item_ext.permanent_loan_type_name IN (\'' + loanTypeArray.join('\',\'') + '\')';
  }
}

var materialTypeArray = JSON.parse(materialType);

if (materialTypeArray) {
  normalizeArray(materialTypeArray);

  if (materialTypeArray.length > 0) {
    where += '\n\tAND item_ext.material_type_name IN (\'' + materialTypeArray.join('\',\'') + '\')';
  }
}

var itemStatusArray = JSON.parse(itemStatus);

if (itemStatusArray) {
  normalizeArray(itemStatusArray);

  if (itemStatusArray.length > 0) {
    where += '\n\tAND item_ext.status_name IN (\'' + itemStatusArray.join('\',\'') + '\')';
  }
}

if (callNumber) {
  where += '\n\t\tAND item_ext.effective_call_number = \'' + callNumber + '\'';
}

if (issuance != '') {
  where += '\n\t\tAND instance_ext.mode_of_issuance_name = \'' + issuance + '\'';
}

if (suppressInstance) {
  where += '\n\t\tAND instance_ext.discovery_suppress = ' + (suppressInstance === 't' ? 'true' : 'false');
}

if (suppressHoldings) {
  where += '\n\t\tAND holdings_ext.discovery_suppress = ' + (suppressHoldings === 't' ? 'true' : 'false');
}

if (suppressItem) {
  where += '\n\t\tAND item_ext.discovery_suppress = ' + (suppressItem === 't' ? 'true' : 'false');
}

if (createdDateStart != '') {
  where += '\n\tAND cast(to_timestamp(instance_ext.record_created_date::text,\'YYYY-MM-DD\') AT TIME ZONE \'America/Chicago\' AS DATE) >= to_date(\'' + createdDateStart + '\', \'YYYY-MM-DD\')';
}

if (createdDateEnd != '') {
  where += '\n\tAND cast(to_timestamp(instance_ext.record_created_date::text,\'YYYY-MM-DD\') AT TIME ZONE \'America/Chicago\' AS DATE) <= to_date(\'' + createdDateEnd + '\', \'YYYY-MM-DD\')';
}

if (updatedDateStart != '') {
  where += '\n\tAND cast(to_timestamp(instance_ext.updated_date::text,\'YYYY-MM-DD\') AT TIME ZONE \'America/Chicago\' AS DATE) >= to_date(\'' + updatedDateStart + '\', \'YYYY-MM-DD\')';
}

if (updatedDateEnd != '') {
  where += '\n\tAND cast(to_timestamp(instance_ext.updated_date::text,\'YYYY-MM-DD\') AT TIME ZONE \'America/Chicago\' AS DATE) <= to_date(\'' + updatedDateEnd + '\', \'YYYY-MM-DD\')';
}

var shelflistQuery = '\n\n'
       + cte
       + '\nSELECT DISTINCT'
       + '\n\titem_ext.item_hrid AS item_hrid,'
       + '\n\titem_ext.barcode AS barcode,'
       + '\n\titem_ext.permanent_location_name AS item_permanent_location,'
       + '\n\titem_ext.effective_location_name AS item_effective_location,'
       + '\n\titem_ext.temporary_location_name AS item_temporary_location,'
       + '\n\tquote_ident(item_ext.effective_call_number) as call_number,'
       + '\n\tquote_ident(item_ext.enumeration) as enumeration,'
       + '\n\tquote_ident(item_ext.chronology) as chronology,'
       + '\n\tquote_ident(substring(instance_ext.title,1,60)) AS title,'
       + '\n\tquote_literal(history.hist_charges) AS hist_charges,'
       + '\n\tquote_literal(history.hist_browses) AS hist_browses,'
       + '\n\tquote_literal(history.last_transaction) AS last_transaction,'
       + '\n\titem_ext.status_name,'
       + '\n\tinstance_pub.publisher,'
       + '\n\tinstance_pub.date_of_publication AS publication_date,'
       + '\n\tinstance_ext.mode_of_issuance_name AS mode_of_issuance,'
       + '\n\tCASE WHEN item_ext.temporary_loan_type_name is null THEN item_ext.permanent_loan_type_name'
       + '\n\tELSE item_ext.temporary_loan_type_name'
       + '\n\tEND as loan_type,'
       + '\n\titem_ext.material_type_name,'
       + '\n\tholdings_ext.discovery_suppress AS holdings_suppress,'
       + '\n\titem_ext.discovery_suppress AS item_suppress,'
       + '\n\tcast(to_timestamp(item_ext.created_date::text,\'YYYY-MM-DD\') at time zone \'America/Chicago\' as date) as create_date,'
       + '\n\tcast(to_timestamp(item_ext.updated_date::text,\'YYYY-MM-DD\') at time zone \'America/Chicago\' as date) as update_date,'
       + '\n\tii.effective_shelving_order COLLATE '+decodeURI("%22")+'C'+decodeURI("%22")+' AS shelving_order,'
       + '\n\tholdings_ext.holdings_hrid AS holdings_hrid,'
       + '\n\tc.author AS author,'
       + '\n\toclc.value AS oclc,'
       + '\n\tisbn.value AS isbn'
       + '\nFROM ' + from
       + '\nWHERE ' + where
       + '\nORDER BY item_effective_location, shelving_order, enumeration, chronology, holdings_hrid\n';

if (logLevel === 'DEBUG') {
  print('\nshelflistQuery = ' + shelflistQuery);
}

execution.setVariableLocal('shelflistQuery', shelflistQuery);
