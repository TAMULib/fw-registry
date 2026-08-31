var varItems = execution.getVariable('items');
var itemsArr = varItems == null ? [] : JSON.parse(varItems);

var varChangedItems = execution.getVariable('changedItems');
var changedItemsArr = varChangedItems == null ? [] : JSON.parse(varChangedItems);

var varProcessedItems = execution.getVariable('processedItems');
var totalProcessedItems = varProcessedItems == null ? 0 : varProcessedItems;

var successEmailSubject = 'Holdings Items Notes Workflow Result.';
var successEmailMarkup = '<p>A total of <strong>' + totalProcessedItems + '</strong> Items were successfully processed.</p>\n';
var successEmailText = '';

successEmailMarkup += '<p>Information regarding the Note being added:</p>';
successEmailMarkup += '<ul>';
successEmailMarkup += '<li>\tNote Type UUID: ' + execution.getVariable('itemNoteTypeId') + '</li>';
successEmailMarkup += '<li>\tNote Type Name: ' + execution.getVariable('itemNoteTypeName') + '</li>';
successEmailMarkup += '<li>\tNote Message: ' + execution.getVariable('noteText') + '</li>';
successEmailMarkup += '<li>\tStaff Only: ' + execution.getVariable('staffOnly') + '</li>';
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

var envLogLevel = execution.getVariable('logLevel');

if (envLogLevel === 'INFO' || envLogLevel === 'DEBUG') {
  print('inputFilePath = ' + execution.getVariable('inputFilePath') + ', ');
  print('emailTo = ' + execution.getVariable('emailTo') + ', ');
  print('emailFrom = ' + execution.getVariable('emailFrom') + ', ');
  print('processedItems = ' + processedItems + '\n');

  if (envLogLevel === 'DEBUG') {
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
