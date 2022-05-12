
queryResults = queryResults.trim().length === 0 
? "The query had no results."
: queryResults;

execution.setVariableLocal('queryResults', queryResults);