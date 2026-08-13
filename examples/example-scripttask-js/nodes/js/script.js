
var exampleValue = "original value";
print("\n\nOriginal value is: " + exampleValue + "\n");

if ("{{exampleInjectValue}}" != "") {
  exampleValue = "{{exampleInjectValue}}";
}

print("\nResulting value is: " + exampleValue + "\n\n");

print("Environment Variables:");
print("======================");
print("- logLevel: " + execution.getVariable("logLevel"));
print("- folioUser: " + execution.getVariable("folioUser"));
print("- folioPass: " + execution.getVariable("folioPass"));
print("- folioTenant: " + execution.getVariable("folioTenant"));
print("- gatewayUrl: " + execution.getVariable("gatewayUrl"));
print("- gatewayLoginPath: " + execution.getVariable("gatewayLoginPath"));
print("- token: " + execution.getVariable("token"));
print("- hello_world: " + execution.getVariable("helloWorld") + "\n");
