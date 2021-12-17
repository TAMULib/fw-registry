var FormatUtility = Java.type("org.folio.rest.utility.FormatUtility");

function tranform(patrons) {
  var users = [];
  for (var i = 0; i < patrons.length; i++) {

    var userImport = {
      departments: []
    };

    var personal = {
      addresses: []
    };

    var patron = patrons[i];

    userImport.username = patron.username;

    userImport.externalSystemId = patron.externalSystemId;
    userImport.barcode = patron.barcode;
    userImport.active = patron.active;
    userImport.patronGroup = patron.patronGroup;

    personal.lastName = patron.personal_lastName;
    personal.firstName = patron.personal_firstName;
    personal.middleName = patron.personal_middleName;
    personal.email = 'folio_user@library.tamu.edu';
    personal.phone = FormatUtility.normalizePhoneNumber(patron.personal_phone);
    personal.preferredContactTypeId = 'email';

    if (patron.addresses_permanent_addressLine1) {
      var permanentAddress = {};

      permanentAddress.addressTypeId = patron.addresses_permanent_addressTypeId;
      permanentAddress.countryId = patron.addresses_permanent_countryId;
      permanentAddress.addressLine1 = patron.addresses_permanent_addressLine1;
      permanentAddress.addressLine2 = patron.addresses_permanent_addressLine2;
      permanentAddress.city = patron.addresses_permanent_city;
      permanentAddress.region = patron.addresses_permanent_region;
      permanentAddress.postalCode = FormatUtility.normalizePostalCode(patron.addresses_permanent_postalCode);
      permanentAddress.primaryAddress = true;

      personal.addresses.push(permanentAddress);
    }

    if (patron.addresses_temporary_addressLine1) {
      var temporaryAddress = {};

      temporaryAddress.addressTypeId = patron.addresses_temporary_addressTypeId;
      temporaryAddress.addressLine1 = patron.addresses_temporary_addressLine1;
      temporaryAddress.addressLine2 = patron.addresses_temporary_addressLine2;
      temporaryAddress.city = patron.addresses_temporary_city;
      temporaryAddress.region = patron.addresses_temporary_region;
      temporaryAddress.postalCode = FormatUtility.normalizePostalCode(patron.addresses_temporary_postalCode);

      personal.addresses.push(temporaryAddress);
    }

    if (patron.departments_0) {
      /* userImport.departments.push(patron.departments_0); */
    }

    userImport.personal = personal;

    users.push(userImport);
  }
  return users;
}

var employees = tranform(JSON.parse(employeePatrons));
var students = tranform(JSON.parse(studentPatrons));
var others = tranform(JSON.parse(otherPatrons));

var users = employees.concat(students).concat(others);

print(employees.length + " employees being imported");
print(students.length + " students being imported");
print(others.length + " others being imported");

var userImportCollection = {
  users: users,
  totalRecords: users.length,
  deactivateMissingUsers: false,
  updateOnlyPresentFields: true
};

execution.setVariableLocal('userImportCollection', S(JSON.stringify(userImportCollection)));
