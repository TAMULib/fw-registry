
var exampleValue = "original value";
print("\n\nOriginal value is: " + exampleValue + "\n");

if ("{{exampleInjectValue}}" != "") {
  exampleValue = "{{exampleInjectValue}}";
}

print("\nResulting value is: " + exampleValue + "\n\n");

print("Environment Variables:");
print("======================");
print("- logLevel: " + execution.getVariable("logLevel"));
print("- folioTenant: " + execution.getVariable("folioTenant"));
print("- folioPass: " + execution.getVariable("folioPass"));
print("- tenant: " + execution.getVariable("folioTenant"));
print("- hello_world: " + execution.getVariable("helloWorld") + "\n");
