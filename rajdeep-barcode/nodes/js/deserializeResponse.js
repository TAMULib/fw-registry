print("ldpGetItems from deserializeResponse after " + JSON.stringify(ldpGetItems));

var ldpGetItemsParsed = JSON.parse(ldpGetItems);

print("ldpGetItems object in deserializeResponse: ", JSON.stringify(ldpGetItemsParsed));

var sqlQuery = ldpGetItemsParsed.sql;
print("SQL query in deSerializeResponse:", sqlQuery);
