var itemsRemoved = JSON.parse(itemsToRemove);
var skippedItems = JSON.parse(itemsSkipped);

var emailSubject = 'Items removed from new bookshelf';
var emailMarkup = '<p>A total of <strong>' + itemsRemoved.length + '</strong> items have been successfully processed. Attached is the CSV file of the barcodes of the items removed from the New Bookshelf. </p>\n';
var emailText = '';

emailText = emailMarkup.replace(/<\/p>/ig, '\n')
  .replace(/<\/li>/ig, '\n')
  .replace(/<\/ul>/ig, '\n')
  .replace(/<\/[^>]+>/ig, '')
  .replace(/<[^>]+>/ig, '');

emailMarkup = emailMarkup.replace(/\t/ig, '')
  .replace(/\n/ig, '');

if (logLevel === 'INFO' || logLevel === 'DEBUG') {
  print('emailTo = ' + emailTo);

  if (logLevel === 'DEBUG') {
    print('emailSubject = ' + emailSubject);
    print('emailText = ' + emailText);
    print('emailMarkup = ' + emailMarkup);
  }
}

var email = {
  subject: emailSubject,
  text: emailText,
  markup: emailMarkup
};

execution.setVariableLocal('email', S(JSON.stringify(email)));

