# SecretTextEncoder
 SecretTextEncoder allows the user to hide text in plain sight by converting text into word-processing commands that don't have an obvious or immediate effect on a document

# Use
Use complexEncode(string) to encode a string

Use complexDecode(string) to decode a string 

# Example:

const input = "Hello";
console.log("Input:", input);

## Convert text to commands:
const simpleEncodedText = simpleEncode("foo"); // Encode bitwise
const complexEncodedText = complexEncode("foo"); // Uses patterns to shorten encoding
## Convert commands to text
const simpleDecodedText = simpleDecode(simpleEncodedText);
const complexDecodedText = complexDecode(complexEncodedText);

