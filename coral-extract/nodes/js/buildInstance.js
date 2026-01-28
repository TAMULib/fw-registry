var UUID = Java.type('java.util.UUID');
var StringEscapeUtils = Java.type('org.apache.commons.text.StringEscapeUtils');

var safe = function (str) {
  return StringEscapeUtils.escapeJson(str);
};

var item = JSON.parse(coralItem);
var instanceId = UUID.randomUUID().toString();

var instance = JSON.parse(
  instanceTemplate
    .replace(/\[title\]/i, safe(item.title))
    .replace(/\[contributor\]/i, safe(item.contributor))
    .replace(/\[publisher\]/i, safe(item.publisher))
    .replace(/\[summary\]/i, safe(item.summary))
    .replace(/\[coralId\]/i, item.coralid)
);

instance.id = instanceId;

console.log(`DEBUG: built instance for item ${item?.id}: `, JSON.stringify(instance, null, 2));

execution.setVariableLocal('instanceId', instanceId);
execution.setVariableLocal('instance', S(JSON.stringify(instance)));
