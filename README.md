# SecretTextEncoder
 SecretTextEncoder allows the user to hide text in plain sight by converting text into word-processing commands that don't have an obvious or immediate effect on a document

# Example:

const input = "Hello";
console.log("Input:", input);

## Convert text to commands:
const encodedText = simpleEncode("foo");

## Convert commands to text
const decodedText = simpleDecode(encodedText);

# Known problems
The simpleEncode can be quite long. The other option needs a bit of fixing as the direction change messes up the encoding. In short: Replace some of the Mappings with other invisible chars and it should work just fine. I will fix that in time but I have other projects to attent to right now. The simple versions work without problems.
