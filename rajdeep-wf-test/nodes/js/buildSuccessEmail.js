var itemsArr = JSON.parse(items);
var changedItemsArr = JSON.parse(changedItems);

if (!changedItemsArr) {
  changedItemsArr = [];
}

var totalProcessedItems = !!processedItems ? processedItems : 0;
var successEmailSubject = 'Holdings Items Notes Workflow Result.';
var successEmailMarkup = '<p>A total of <strong>' + totalProcessedItems + '</strong> Items were successfully processed.</p>\n';
var successEmailText = '';

successEmailMarkup += '<p>Information regarding the Note being added:</p>';
successEmailMarkup += '<ul>';
successEmailMarkup += '<li>\tNote Type UUID: ' + itemNoteTypeId + '</li>';
successEmailMarkup += '<li>\tNote Type Name: ' + itemNoteTypeName + '</li>';
successEmailMarkup += '<li>\tNote Message: ' + noteText + '</li>';
successEmailMarkup += '<li>\tStaff Only: ' + staffOnly + '</li>';
successEmailMarkup += '</ul>';
successEmailMarkup += '<p>Of those ' + totalProcessedItems + ' processed Items, a total of ' + changedItemsArr.length + ' Items have been updated';

if (changedItemsArr.length > 0) {
  successEmailMarkup += ':</p><ul>';

  for (let i = 0; i < changedItemsArr.length && i < 4; i++) {
    successEmailMarkup += '<li>\tItem UUID: ' + changedItemsArr[i] + '</li>';
  }

  if (changedItemsArr.length > 3) {
    successEmailMarkup += '<li>\t...</li>';
  }

  successEmailMarkup += '</ul>';
} else {
  successEmailMarkup += '.</p>';
}

successEmailText = successEmailMarkup.replace(/<\/p>/ig, '\n')
  .replace(/<\/li>/ig, '\n')
  .replace(/<\/ul>/ig, '\n')
  .replace(/<li>\t/ig, '  - ')
  .replace(/<\/[^>]+>/ig, '')
  .replace(/<[^>]+>/ig, '');

successEmailMarkup = successEmailMarkup.replace(/\t/ig, '')
  .replace(/\n/ig, '');

if (logLevel === 'INFO' || logLevel === 'DEBUG') {
  print('inputFilePath = ' + inputFilePath + ', ');
  print('emailTo = ' + emailTo + ', ');
  print('emailFrom = ' + emailFrom + ', ');
  print('processedItems = ' + processedItems + '\n');

  if (logLevel === 'DEBUG') {
    print('\nsuccessEmailSubject = ' + successEmailSubject + ', ');
    print('successEmailText = ' + successEmailText + ', ');
    print('successEmailMarkup = ' + successEmailMarkup + '\n');
  }
}

var successEmail = {
  subject: successEmailSubject,
  text: successEmailText,
  markup: successEmailMarkup
};

execution.setVariableLocal('successEmail', S(JSON.stringify(successEmail)));
