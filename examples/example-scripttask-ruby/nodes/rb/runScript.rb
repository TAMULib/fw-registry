print "\nHello World from Ruby workflow!!\n\n"

print "Environment Variables:\n";
print "======================\n";
print "- logLevel: " + (execution.getVariable("logLevel") || "") + "\n";
print "- folioUser: " + (execution.getVariable("folioUser") || "") + "\n";
print "- folioPass: " + (execution.getVariable("folioPass") || "") + "\n";
print "- folioTenant: " + (execution.getVariable("folioTenant") || "") + "\n";
print "- folioToken: " + (execution.getVariable("folioToken") || "") + "\n";
print "- gatewayUrl: " + (execution.getVariable("gatewayUrl") || "") + "\n";
print "- gatewayLoginPath: " + (execution.getVariable("gatewayLoginPath") || "") + "\n";
print "- hello_world: " + (execution.getVariable("hello_world") || "") + "\n\n";
