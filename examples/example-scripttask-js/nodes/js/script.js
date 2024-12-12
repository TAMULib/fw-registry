
var exampleValue = "original value";
print("\n\nOriginal value is: " + exampleValue + "\n");

if ("{{exampleInjectValue}}" != "") {
  exampleValue = "{{exampleInjectValue}}";
}

print("\nResulting value is: " + exampleValue + "\n\n");
