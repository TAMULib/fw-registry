print "\nHello World from Ruby workflow!!\n\n"

print "Environment Variables:\n";
print "======================\n";
print "- logLevel: " + (execution.hasVariable("logLevel") ? execution.getVariable("logLevel") : "") + "\n";
print "- folioTenant: " + (execution.hasVariable("folioTenant") ? execution.getVariable("folioTenant") : "") + "\n";
print "- folioPass: " + (execution.hasVariable("folioPass") ? execution.getVariable("folioPass") : "") + "\n";
print "- tenant: " + (execution.hasVariable("tenant") ? execution.getVariable("tenant") : "") + "\n";
print "- hello_world: " + (execution.hasVariable("hello_world") ? execution.getVariable("hello_world") : "") + "\n\n";
