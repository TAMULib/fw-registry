// Build the after-action summary email from the report assembled in splitInvoices.js.
// processFiles is asynchronous, so this reports invoices SUBMITTED for import (and
// which had no FOLIO account match), not confirmed-imported counts (see plan Risk 3).
var report = JSON.parse(ediImportReport);

var selectedCount = report.selected ? report.selected.length : 0;
var matchedCount = report.matched ? report.matched.length : 0;
var unmatched = report.unmatched || [];
var skipped = report.skipped || [];

var subject = 'EDI Import Result: ' + selectedCount + ' invoice(s) submitted';

var markup = '<p>A total of <strong>' + selectedCount + '</strong> invoice(s) were submitted for '
  + 'Data Import (<strong>' + matchedCount + '</strong> matched a FOLIO account number).</p>';

if (unmatched.length) {
  markup += '<p>The following invoice(s) had <strong>no matching FOLIO account number</strong> '
    + 'and were imported with a blank account number:</p><ul>';
  for (var i = 0; i < unmatched.length; i++) {
    markup += '<li>Invoice ' + unmatched[i].invoice_number
      + ' (invoice account ' + unmatched[i].invoice_account_number + ')</li>';
  }
  markup += '</ul>';
}

if (skipped.length) {
  markup += '<p>Skipped (not selected by invoiceNumbers): ' + skipped.join(', ') + '</p>';
}

var text = markup.replace(/<\/p>/ig, '\n')
  .replace(/<\/li>/ig, '\n')
  .replace(/<\/ul>/ig, '\n')
  .replace(/<[^>]+>/ig, '');

markup = markup.replace(/\n/ig, '');

var successEmail = {
  subject: subject,
  text: text,
  markup: markup
};

execution.setVariableLocal('successEmail', S(JSON.stringify(successEmail)));
