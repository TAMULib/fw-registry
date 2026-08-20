var varMarcOrderData = execution.getVariable('marcOrderData');
var marcOrderDataObj = varMarcOrderData == null ? {} : JSON.parse(varMarcOrderData);

var findNoteTypeIdByName = function (noteTypeName) {
  for (var i = 0; i < noteTypes.length; ++i) {
    if (noteTypeName === noteTypes[i].name) return noteTypes[i].id;
  }
};

var notes = [];

if (marcOrderDataObj.notes && marcOrderDataObj.notes.length) {
  var compositePurchaseOrderObj = JSON.parse(compositePurchaseOrder);

  var noteTypes = JSON.parse(noteTypesResponse).noteTypes;

  for (var i = 0; i < marcOrderDataObj.notes.length; ++i) {
    notes.push({
      links: [{
        type: 'poLine',
        id: compositePurchaseOrderObj.compositePoLines[0].id
      }],
      typeId: findNoteTypeIdByName(noteType),
      domain: 'orders',
      content: marcOrderDataObj.notes[i],
      title: marcOrderDataObj.notes[i]
    });
  }
}

execution.setVariableLocal('notes', S(JSON.stringify(notes)));
