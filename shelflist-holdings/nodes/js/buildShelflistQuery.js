if (logLevel === 'DEBUG') {
  print('\nlogLevel = ' + logLevel + '\n');
  print('emailFrom = ' + emailFrom + '\n');
  print('emailTo = ' + emailTo + '\n');
  print('libraryName = ' + libraryName + '\n');
  print('locationDiscoveryDisplayName = ' + locationDiscoveryDisplayName + '\n');
  print('locationName = ' + locationName + '\n');
  print('language = ' + language + '\n');
  print('resourceType = ' + resourceType + '\n');
  print('format = ' + format + '\n');
  print('batchId = ' + batchId + '\n');
  print('issuance = ' + issuance + '\n');
  print('suppressInstance = ' + suppressInstance + '\n');
  print('suppressHoldings = ' + suppressHoldings + '\n');
  print('createdDateStart = ' + createdDateStart + '\n');
  print('createdDateEnd = ' + createdDateEnd + '\n');
  print('updatedDateStart = ' + updatedDateStart + '\n');
  print('updatedDateEnd = ' + updatedDateEnd + '\n');
}

var from = 'folio_reporting.holdings_ext holdings_ext'
            + '\n\t\tINNER JOIN folio_reporting.instance_ext ON holdings_ext.instance_id = instance_ext.instance_id'
            + '\n\t\tLEFT JOIN folio_reporting.instance_contributors contribs ON holdings_ext.instance_id = contribs.instance_id'
            + '\n\t\tLEFT JOIN folio_reporting.instance_publication pubs ON holdings_ext.instance_id = pubs.instance_id'
            + '\n\t\tLEFT JOIN folio_reporting.instance_identifiers idents ON holdings_ext.instance_id = idents.instance_id'
            + '\n\t\tLEFT JOIN folio_reporting.instance_formats formats ON holdings_ext.instance_id = formats.instance_id'
            + '\n\t\tLEFT JOIN folio_reporting.instance_languages lan ON holdings_ext.instance_id = lan.instance_id'
            + '\n\t\tLEFT JOIN folio_reporting.instance_statistical_codes stat_codes ON holdings_ext.instance_id = stat_codes.instance_id'
            + '\n\t\tLEFT JOIN folio_reporting.holdings_statements hold_state ON holdings_ext.holdings_hrid = hold_state.holdings_hrid'
            + '\n\t\tLEFT JOIN folio_reporting.items_holdings_instances item_hold_in ON holdings_ext.instance_id = item_hold_in.instance_id'
            + '\n\t\tLEFT JOIN item_detail item_detail ON holdings_ext.holdings_id  = item_detail.holdings_id';

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
    from += '\n\t\tLEFT JOIN public.inventory_locations publoc ON holdings_ext.permanent_location_id = publoc.id'
          + '\n\t\tLEFT JOIN public.inventory_libraries publib ON publoc.library_id = publib.id';

    where += '\n\t\tAND publib.name IN (\'' + libraryNameArray.join('\',\'') + '\')';
  }
}

var locationDiscoveryDisplayNameArray = JSON.parse(locationDiscoveryDisplayName);

if (locationDiscoveryDisplayNameArray) {
  normalizeArray(locationDiscoveryDisplayNameArray);

  if (locationDiscoveryDisplayNameArray.length > 0) {
    from += '\n\t\tLEFT JOIN public.inventory_locations publoc ON holdings_ext.permanent_location_name = publoc.name';

    where += '\n\t\tAND publoc.discovery_display_name IN (\'' + locationDiscoveryDisplayNameArray.join('\',\'') + '\')';
  }
}

var locationNameArray = JSON.parse(locationName);

if (locationNameArray) {
  normalizeArray(locationNameArray);

  if (locationNameArray.length > 0) {
    where += '\n\t\tAND holdings_ext.permanent_location_name IN (\'' + locationNameArray.join('\',\'') + '\')';
  }
}

var languageArray = JSON.parse(language);

if (languageArray) {
  normalizeArray(languageArray);

  if (languageArray.length > 0) {
    where += '\n\t\tAND lan.language IN (\'' + languageArray.join('\',\'') + '\')'
          + '\n\t\tAND lan.language_ordinality = 1';
  }
}

var resourceTypeArray = JSON.parse(resourceType);

if (resourceTypeArray) {
  normalizeArray(resourceTypeArray);

  if (resourceTypeArray.length > 0) {
    where += '\n\t\tAND instance_ext.type_name IN (\'' + resourceTypeArray.join('\',\'') + '\')';
  }
}

var formatArray = JSON.parse(format);

if (formatArray) {
  normalizeArray(formatArray);

  if (formatArray.length > 0) {
    where += '\n\t\tAND formats.format_name IN (\'' + formatArray.join('\',\'') + '\')';
  }
}

if (batchId != '') {
  where += '\n\t\tAND stat_codes.statistical_code_type_name = \'batch_id\''
         + '\n\t\tAND stat_codes.statistical_code_name = \'' + batchId + '\'';
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

if (createdDateStart != '') {
  where += '\n\t\tAND cast(to_timestamp(instance_ext.record_created_date::text,\'YYYY-MM-DD\') AT TIME ZONE \'America/Chicago\' AS DATE) >= to_date(\'' + createdDateStart + '\', \'YYYY-MM-DD\')';
}

if (createdDateEnd != '') {
  where += '\n\t\tAND cast(to_timestamp(instance_ext.record_created_date::text,\'YYYY-MM-DD\') AT TIME ZONE \'America/Chicago\' AS DATE) <= to_date(\'' + createdDateEnd + '\', \'YYYY-MM-DD\')';
}

if (updatedDateStart != '') {
  where += '\n\t\tAND cast(to_timestamp(instance_ext.updated_date::text,\'YYYY-MM-DD\') AT TIME ZONE \'America/Chicago\' AS DATE) >= to_date(\'' + updatedDateStart + '\', \'YYYY-MM-DD\')';
}

if (updatedDateEnd != '') {
  where += '\n\t\tAND cast(to_timestamp(instance_ext.updated_date::text,\'YYYY-MM-DD\') AT TIME ZONE \'America/Chicago\' AS DATE) <= to_date(\'' + updatedDateEnd + '\', \'YYYY-MM-DD\')';
}

var shelflistQuery = '\n'
       + '\nWITH item_detail as ('
       + '\n\tSELECT'
       + '\n\t\tholdings_ext.holdings_id,'
       + '\n\t\tSUM(item_hist.hist_charges) AS hist_charges,'
       + '\n\t\tSUM(item_hist.hist_browses) AS hist_browses,'
       + '\n\t\tMAX(item_hist.last_transaction) AS last_trans_date,'
       + '\n\t\tstring_agg(DISTINCT item_ext.material_type_name, \' || \'  ORDER BY item_ext.material_type_name ASC) AS item_material_type'
       + '\n\tFROM folio_reporting.holdings_ext holdings_ext'
       + '\n\t\tLEFT JOIN folio_reporting.item_ext item_ext ON holdings_ext.holdings_id = item_ext.holdings_record_id'
       + '\n\t\tLEFT JOIN mis.item_history item_hist ON item_ext.item_id = item_hist.item_id'
       + '\n\tGROUP BY'
       + '\n\t\tholdings_ext.holdings_id'
       + '\n)'
       + '\nSELECT DISTINCT ON (instance_hrid, holdings_hrid) * FROM ('
       + '\n\tSELECT DISTINCT'
       + '\n\t\tinstance_ext.instance_id AS instance_id,'
       + '\n\t\tinstance_ext.instance_hrid AS instance_hrid,'
       + '\n\t\tholdings_ext.holdings_hrid AS holdings_hrid,'
       + '\n\t\titem_detail.hist_charges,'
       + '\n\t\titem_detail.hist_browses,'
       + '\n\t\titem_detail.last_trans_date,'
       + '\n\t\titem_detail.item_material_type,'
       + '\n\t\tquote_ident(holdings_ext.permanent_location_name) AS location,'
       + '\n\t\tquote_ident(hold_state.statement) AS holdings_statement,'
       + '\n\t\tCASE WHEN call_number_prefix IS NOT NULL AND call_number_suffix IS NOT NULL THEN quote_ident(call_number_prefix || \' \' || holdings_ext.call_number || \' \' || call_number_suffix)'
       + '\n\t\tWHEN call_number_prefix IS NOT NULL AND call_number_suffix IS NULL THEN quote_ident(call_number_prefix || \' \' || holdings_ext.call_number)'
       + '\n\t\tWHEN call_number_prefix IS NULL AND call_number_suffix IS NOT NULL THEN quote_ident(holdings_ext.call_number || \' \' || call_number_suffix)'
       + '\n\t\tELSE quote_ident(holdings_ext.call_number)'
       + '\n\t\tEND AS call_number,'
       + '\n\t\tinstance_ext.discovery_suppress AS instance_suppress,'
       + '\n\t\tholdings_ext.discovery_suppress AS holdings_suppress,'
       + '\n\t\tCASE WHEN contributor_primary = \'t\' THEN quote_ident(contributor_name) ELSE \'\' END AS author,'
       + '\n\t\tRANK() OVER (PARTITION BY holdings_ext.holdings_hrid ORDER BY contributor_primary) AS author_rank,'
       + '\n\t\tquote_ident(instance_ext.index_title) AS title,'
       + '\n\t\tinstance_ext.mode_of_issuance_name AS mode_of_issuance,'
       + '\n\t\tinstance_ext.type_name AS resource_type,'
       + '\n\t\tformats.format_name AS format,'
       + '\n\t\tCASE WHEN idents.identifier_type_name = \'ISBN\' AND instance_ext.mode_of_issuance_name = \'serial\' THEN idents.identifier'
       + '\n\t\tWHEN idents.identifier_type_name = \'ISSN_Invalid\' AND instance_ext.mode_of_issuance_name = \'serial\' THEN idents.identifier'
       + '\n\t\tWHEN idents.identifier_type_name = \'ISSN\' AND instance_ext.mode_of_issuance_name = \'serial\' THEN idents.identifier'
       + '\n\t\tWHEN idents.identifier_type_name = \'OCLC\' AND instance_ext.mode_of_issuance_name != \'serial\' THEN idents.identifier'
       + '\n\t\tELSE \'\''
       + '\n\t\tEND AS identifier,'
       + '\n\t\tCASE WHEN lan.language_ordinality = 1 THEN lan.language'
       + '\n\t\tELSE \'\''
       + '\n\t\tEND AS language,'
       + '\n\t\tstat_codes.statistical_code_name AS stat_code,'
       + '\n\t\tpubs.date_of_publication AS begin_pub_date,'
       + '\n\t\tRANK() OVER (PARTITION BY holdings_ext.holdings_hrid ORDER BY pubs.date_of_publication) AS pub_rank,'
       + '\n\t\tCAST(to_timestamp(instance_ext.record_created_date::text,\'YYYY-MM-DD\') AT TIME ZONE \'America/Chicago\' AS DATE) AS create_date,'
       + '\n\t\tCAST(to_timestamp(instance_ext.updated_date::text,\'YYYY-MM-DD\') AT TIME ZONE \'America/Chicago\' AS DATE) AS update_date'
       + '\n\tFROM ' + from
       + '\n\tWHERE ' + where
       + '\n) AS superset'
       + '\nWHERE pub_rank = 1 AND author_rank = 1'
       + '\nORDER BY instance_hrid, holdings_hrid, author desc, identifier desc, begin_pub_date desc, format\n';

if (logLevel === 'DEBUG') {
  print('\nshelflistQuery = ' + shelflistQuery);
}

var queryWrapper = {
  sql: shelflistQuery
};

execution.setVariableLocal('shelflistQuery', S(JSON.stringify(queryWrapper)));
