var itemObj = JSON.parse(itemResponse);
var changedItemsArr = JSON.parse(changedItems);

if (!changedItemsArr) {
  changedItemsArr = [];
}

var extractResponseArray = function (response, key) {
  return (!response || !response[key]) ? [] : response[key];
};

if (logLevel === "DEBUG") {
  print('\nitemResponse = ' + itemResponse + '\n');
  print('\nitemNoteTypeId = ' + itemNoteTypeId + '\n');
  print('\nitemNoteTypeName = ' + itemNoteTypeName + '\n');
  print('\nnoteText = ' + noteText + '\n');
  print('\nstaffOnly = ' + staffOnly + '\n');
  print('\nchangedItemsArr = ' + changedItemsArr + '\n');
}

if (!!itemObj) {
  let notes = extractResponseArray(itemObj, 'notes');
  let addNote = true;
  let staffOnlyBoolean = staffOnly === true || ('' + staffOnly).toLowerCase() === 'true' ? true : false;

  if (notes.length > 0) {
    for (var i = 0; i < notes.length; i++) {
      if (!!notes[i].itemNoteTypeId && !!notes[i].note && notes[i].hasOwnProperty("staffOnly")) {
        if (notes[i].itemNoteTypeId == itemNoteTypeId && notes[i].note.toLowerCase() == noteText.toLowerCase() && notes[i].staffOnly == staffOnlyBoolean) {
          addNote = false;
          break;
        }
      }
    }
  }

  if (addNote) {
    notes.push({
      'itemNoteTypeId': itemNoteTypeId,
      'itemNoteTypeName': itemNoteTypeName,
      'note': noteText,
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
