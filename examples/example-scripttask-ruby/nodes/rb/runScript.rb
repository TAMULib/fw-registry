print "\nHello World from Ruby workflow!!\n\n"

print "Environment Variables:\n";
print "======================\n";
print "- logLevel: " + (execution.hasVariable("logLevel") ? execution.getVariable("logLevel") : "") + "\n";
print "- folioUser: " + (execution.hasVariable("folioUser") ? execution.getVariable("folioUser") : "") + "\n";
print "- folioPass: " + (execution.hasVariable("folioPass") ? execution.getVariable("folioPass") : "") + "\n";
print "- folioTenant: " + (execution.hasVariable("folioTenant") ? execution.getVariable("folioTenant") : "") + "\n";
print "- gatewayUrl: " + (execution.hasVariable("gatewayUrl") ? execution.getVariable("gatewayUrl") : "") + "\n";
print "- gatewayLoginPath: " + (execution.hasVariable("gatewayLoginPath") ? execution.getVariable("gatewayLoginPath") : "") + "\n";
print "- token: " + (execution.hasVariable("token") ? execution.getVariable("token") : "") + "\n";
print "- hello_world: " + (execution.hasVariable("hello_world") ? execution.getVariable("hello_world") : "") + "\n\n";
