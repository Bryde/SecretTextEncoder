# SecretTextEncoder
 SecretTextEncoder allows the user to hide text in plain sight by converting text into word-processing commands that don't have an obvious or immediate effect on a document

# Example:

const input = "Hello";
console.log("Input:", input);

## Convert text to commands:
const encodedText = encodeTextToCmd("foo");

## Convert commands to text
const decodedText = decodeCmdToText(encodedText);

