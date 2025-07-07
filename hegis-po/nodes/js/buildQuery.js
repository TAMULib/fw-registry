if (logLevel === 'DEBUG') {
  print('\nlogLevel = ' + logLevel);
  print('\nokapiUrl = ' + okapiUrl);
  print('\nusername = ' + username);
  print('\nemailTo = ' + emailTo);
  print('\nhegisCodes = ' + hegisCodes);
  print('\nsysUnitCodes = ' + sysUnitCodes);
  print('\npoType = ' + poType);
}

var hCodes = hegisCodes.length > 0 ? hegisCodes.join('|') : '';

var sysCodesArray = Array.isArray(sysUnitCodes) ? sysUnitCodes : [sysUnitCodes];

var sysCodes = sysCodesArray.length > 0 ? sysCodesArray.join('|') : '';

var hegisPattern = '\'(?i)^.*hegis<(' + hCodes + ')' + '(' + sysCodes + ')>.*$\'';

var poStatus = ( poType == '*' ) ? '' : ' AND po.workflow_status IN (\'Pending\', \'Open\')';

var hegisPoQuery = 'WITH _payments AS ('
  + '\n\tSELECT'
  + '\n\t('
  + '\n\t\tSELECT fti.transaction_amount'
  + '\n\t\tFROM folio_derived.finance_transaction_invoices fti'
  + '\n\t\tLEFT JOIN folio_orders.order_invoice_relationship poir ON poir.invoice_id = fti.invoice_id'
  + '\n\t\tWHERE poir.invoice_id = agg.ii'
  + '\n\t\tAND fti.transaction_type = \'Payment\''
  + '\n\t\tORDER BY fti.invoice_payment_date DESC'
  + '\n\t\tLIMIT 1'
  + '\n\t), poir2.purchase_order_id'
  + '\n\tFROM ('
  + '\n\t\tSELECT fti.invoice_id AS ii'
  + '\n\t\tFROM folio_derived.finance_transaction_invoices fti'
  + '\n\t\tLEFT JOIN folio_orders.order_invoice_relationship poir ON poir.invoice_id = fti.invoice_id'
  + '\n\t\tGROUP BY fti.invoice_id'
  + '\n\t) agg'
  + '\n\tLEFT JOIN folio_orders.order_invoice_relationship poir2 ON poir2.invoice_id = agg.ii'
  + '\n),'
  + '\n_id AS ('
  + '\n\tSELECT *'
  + '\n\tFROM folio_derived.instance_identifiers'
  + '\n\tWHERE identifier_type_name in (\'ISSN\', \'Invalid ISSN\')'
  + '\n)'
  + '\nSELECT DISTINCT ON (po.po_number, poi.title)'
  + '\n\tpo.po_number AS po_number,'
  + '\n\tsubstring(ce.code, 9) AS ship_to,'
  + '\n\tpoi.title AS title,'
  + '\n\tpo.workflow_status AS po_status,'
  + '\n\tpo.data->\'notes\'->0 AS line_item_notes,'
  + '\n\tpo.data->\'ongoing\'->>\'interval\' AS renewal_interval,'
  + '\n\tregexp_replace(po.data->>\'notes\', \'(?i)^.*hegis<(.*?)>.*$\', \'\\1\') AS hegis,'
  + '\n\t\'\' AS problems,'
  + '\n\tpoi.pol_instance_hrid AS instance_hrid,'
  + '\n\tCASE WHEN transaction_amount IS NOT NULL THEN ('
  + '\n\t\tSELECT transaction_amount'
  + '\n\t\tFROM _payments'
  + '\n\t\tWHERE purchase_order_id = po.id'
  + '\n\t\tLIMIT 1'
  + '\n\t) ELSE \'0.00\' END AS last_payment,'
  + '\n\tpoi.vendor_code AS vendor_code,'
  + '\n\tpol.data->\'vendorDetail\'->>\'vendorAccount\' AS vendor_account,'
  + '\n\tpol.data->\'vendorDetail\'->\'referenceNumbers\'->0->>\'refNumber\' AS vendor_reference_number,'
  + '\n\t('
  + '\n\t\tSELECT array_to_string(array_agg(identifier), \' || \')'
  + '\n\t\tFROM _id'
  + '\n\t\tWHERE CAST (poi.pol_instance_id AS UUID) = CAST (instance_id AS UUID)'
  + '\n\t\tAND identifier_type_name = \'ISSN\''
  + '\n\t\tGROUP BY instance_id'
  + '\n\t) AS issn,'
  + '\n\t('
  + '\n\t\tSELECT array_to_string(array_agg(identifier), \' || \')'
  + '\n\t\tFROM _id'
  + '\n\t\tWHERE CAST (poi.pol_instance_id AS UUID) = CAST (instance_id AS UUID)'
  + '\n\t\tAND identifier_type_name = \'Invalid ISSN\''
  + '\n\t\tGROUP BY instance_id'
  + '\n\t) AS invalid_issn'
  + '\nFROM public.po_purchase_orders po'
  + '\nLEFT JOIN folio_orders.po_line pol ON pol.purchase_order_id = po.id'
  + '\nLEFT JOIN _payments _p ON _p.purchase_order_id = po.id'
  + '\nLEFT JOIN folio_configuration.config_data ce ON ce.id = po.ship_to'
  + '\nLEFT JOIN folio_derived.po_instance poi ON poi.po_number = po.po_number'
  + '\nWHERE po.data->>\'notes\' ~ ' + hegisPattern
  + poStatus
  + '\nORDER BY po.po_number, poi.title;';

if (logLevel === 'DEBUG') {
  print('\n\n\n hegisPoQuery = ' + hegisPoQuery + '\n\n\n');
}

execution.setVariableLocal('hegisPoQuery', hegisPoQuery);
