var MarcUtility = Java.type("org.folio.rest.camunda.utility.MarcUtility");

var fields = JSON.parse(MarcUtility.getFieldsFromMarcJson(record.stringValue(), ['050', '090', '245', '947', '980']));

if (logLevel === 'DEBUG') {
  print('\nfields = ' + JSON.stringify(fields) + '\n');
}

var getSubfield = function (fields, tag, code) {
  for (var i = 0; i < fields.length; ++i) {
    if (fields[i].tag === tag) {
      for (var j = 0; j < fields[i].subfields.length; ++j) {
        if (fields[i].subfields[j].code === code) {
          return fields[i].subfields[j].data;
        }
      }
    }
  }
};

var formalizeEnum = function (value) {
  var words = value.split(' ');
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(' ');
};

var title = getSubfield(fields, '245', 'a');
if (title.endsWith(' :')) {
  title += ' ' + getSubfield(fields, '245', 'b');
}
if (title.endsWith(' /')) {
  title += ' ' + getSubfield(fields, '245', 'c');
}

var callNumber = undefined;
var a050 = getSubfield(fields, '050', 'a');
if (a050) {
  callNumber = a050 + ' ' + getSubfield(fields, '050', 'b');
} else {
  var a090 = getSubfield(fields, '090', 'a');
  if (a090) {
    callNumber = a090 + ' ' + getSubfield(fields, '090', 'b');
  }
}

var marcOrderData = {
  title: title,
  callNumber: callNumber,
  barcode: getSubfield(fields, '947', 'a'),
  fundCode: getSubfield(fields, '980', 'b'),
  vendorReferenceNumber: getSubfield(fields, '980', 'c'),
  selector: getSubfield(fields, '980', 'f'),
  vendorAccount: getSubfield(fields, '980', 'g'),
  currency: getSubfield(fields, '980', 'k'),
  amount: getSubfield(fields, '980', 'm'),
  requester:  getSubfield(fields, '980', 'n'),
  internalNote: getSubfield(fields, '980', 'o'),
  poLineDescription: getSubfield(fields, '980', 'p'),
  quantity: getSubfield(fields, '980', 'q'),
  projectCode: getSubfield(fields, '980', 'r'),
  billTo: getSubfield(fields, '980', 's'),
  acquisitionMethod: formalizeEnum(getSubfield(fields, '980', 't')),
  vendorReferenceType: getSubfield(fields, '980', 'u'),
  vendorCode:  getSubfield(fields, '980', 'v'),
  expenseClass: getSubfield(fields, '980', 'y'),
  electronicIndicator: getSubfield(fields, '980', 'z'),
  notes: []
};

if (statisticalCode === 'ybppapp' || statisticalCode === 'ybppfirm') {
  marcOrderData.billTo = 'AcqMono Conventional';
  marcOrderData.vendorReferenceType = 'Vendor order reference number';
  marcOrderData.vendorCode = 'ZYBP';
}

if (logLevel === 'DEBUG') {
  print('\nmarcOrderData = ' + JSON.stringify(marcOrderData) + '\n');
}

execution.setVariable('marcOrderData', S(JSON.stringify(marcOrderData)));
