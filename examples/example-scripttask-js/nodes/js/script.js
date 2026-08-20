var exampleValue = "original value";
var varExampleInjectValue = execution.getVariable('exampleInjectValue');

print("\n\nOriginal value is: " + exampleValue + "\n");

if (varExampleInjectValue != null) {
  exampleValue = varExampleInjectValue;
}

print("\nResulting value is: " + exampleValue + "\n\n");

print("Environment Variables:");
print("======================");
print("- logLevel: " + execution.getVariable("logLevel"));
print("- folioUser: " + execution.getVariable("folioUser"));
print("- folioPass: " + execution.getVariable("folioPass"));
print("- folioTenant: " + execution.getVariable("folioTenant"));
print("- folioToken: " + execution.getVariable("folioToken"));
print("- gatewayUrl: " + execution.getVariable("gatewayUrl"));
print("- gatewayLoginPath: " + execution.getVariable("gatewayLoginPath"));
print("- hello_world: " + execution.getVariable("helloWorld") + "\n");
