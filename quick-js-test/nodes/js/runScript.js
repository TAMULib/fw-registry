if (typeof Graal != 'undefined') {
  print('\nRunning GraalVM!');
  print(Graal.versionECMAScript);
  print(Graal.versionGraalVM);
  print(Graal.isGraalRuntime());
  print('\n');
} else {
  print('\nNot using graal.\n');
}

var obj = { "id": "1" };

print('\nBefore JSON.stringify() attempt.\n');
var stringified=JSON.stringify(obj);
print('\nBefore JSON.parse() attempt.\n');
var parsed=JSON.parse(stringified);
print('\nAfter both JSON attempts.\n');
print('\nThe stringified=' + stringified + '.\n');
print('\nThe parsed=' + parsed + '.\n');

{
  print('\nBefore let first usage.\n');
  let a="aaa";
  print('\nThe a=' + a + '\n');
  print('\nAfter let first usage.\n');
}
{
  print('\nBefore let second usage.\n');
  let a;
  print('\nThe a=' + a + '\n');
  print('\nAfter let second usage\n');
}
