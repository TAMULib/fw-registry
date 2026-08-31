var varItemResponse = execution.getVariable('itemResponse');
var itemObj = varItemResponse == null ? null : JSON.parse(itemResponse);

var varChangedItems = execution.getVariable('changedItems');
var changedItemsArr = varChangedItems == null ? [] : JSON.parse(varChangedItems);

var extractResponseArray = function (response, key) {
  return (!response || !response[key]) ? [] : response[key];
};

var varItemNoteTypeId = execution.getVariable('itemNoteTypeId');
var varItemNoteTypeName = execution.getVariable('itemNoteTypeName');
var varNoteText = execution.getVariable('noteText');

if (execution.getVariable('logLevel') === "DEBUG") {
  print('\nitemResponse = ' + varItemResponse + '\n');
  print('\nitemNoteTypeId = ' + varItemNoteTypeId + '\n');
  print('\nitemNoteTypeName = ' + varItemNoteTypeName + '\n');
  print('\nnoteText = ' + varNoteText + '\n');
  print('\nstaffOnly = ' + staffOnly + '\n');
  print('\nchangedItemsArr = ' + changedItemsArr + '\n');
}

if (varNoteText == null) {
  varNoteText = '';
}

if (!!itemObj) {
  let notes = extractResponseArray(itemObj, 'notes');
  let addNote = true;
  let staffOnlyBoolean = staffOnly === true || ('' + staffOnly).toLowerCase() === 'true' ? true : false;

  if (notes.length > 0) {
    for (var i = 0; i < notes.length; i++) {
      if (!!notes[i].itemNoteTypeId && !!notes[i].note && notes[i].hasOwnProperty("staffOnly")) {
        if (notes[i].itemNoteTypeId == varItemNoteTypeId && notes[i].note.toLowerCase() == varNoteText.toLowerCase() && notes[i].staffOnly == staffOnlyBoolean) {
          addNote = false;
          break;
        }
      }
    }
  }

  if (addNote) {
    notes.push({
      'itemNoteTypeId': varItemNoteTypeId,
      'itemNoteTypeName': varItemNoteTypeName,
      'note': varNoteText,
      'staffOnly': staffOnlyBoolean
    });

    itemObj.notes = notes;
    changedItemsArr.push(itemObj.id);
  }

  processedItems++;
}

execution.setVariable('updatedItem', S(JSON.stringify(itemObj)));
execution.setVariable('itemId', (!!itemObj && !!itemObj.id) ? itemObj.id : '');
execution.setVariable('processedItems', processedItems);
execution.setVariable('changedItems', S(JSON.stringify(changedItemsArr)));
