  const spaceMapping = {
    0: '\u200B', // Zero Width Space
    1: '\u200C', // Zero Width Non-Joiner
    2: '\u200D', // Zero Width Joiner
    3: '\u2060', // Word Joiner
    4: '\u2062', // Invisible Times
    5: '\u2063', // Invisible Separator
    6: '\u2064', // Invisible Plus
    7: '\uFEFF', // Zero Width No-Break Space
    8: '\u2061', // Function Application
  };
  const reverseSpaceMapping = Object.fromEntries(Object.entries(spaceMapping).map(([k, v]) => [v, k]));
  
  function stringToBinary(input) {
    return input.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
  }
  
  function encodeBinaryToSpaces(binary) {
  let result = '';
  let count = 1;
  let currentChar = binary[0];

  for (let i = 1; i < binary.length; i++) {
    if (binary[i] === currentChar) {
      count++;
    } else {
      // Encode the count using the spaceMapping
      while (count > 8) { // If count is more than the maximum value in spaceMapping
        result += spaceMapping[8]; // Append the maximum value
        count -= 8;
      }
      result += spaceMapping[count] || ''; // Append the corresponding Unicode character
      currentChar = binary[i]; // Switch to the next character
      count = 1; // Reset count
    }
  }
  // Handle the last sequence
  while (count > 8) {
    result += spaceMapping[8];
    count -= 8;
  }
  result += spaceMapping[count] || '';

  return result;
}

  
 function decodeSpacesToBinary(spaces) {
  let binary = '';
  let isZero = true; // Start with zero

  for (let char of spaces) {
    let count = reverseSpaceMapping[char];
    if (count !== undefined) {
      binary += (isZero ? '0' : '1').repeat(count);
      isZero = !isZero; // Flip to the other bit after each group
    }
  }
  return binary;
}


  function binaryToString(binary) {
    let result = '';
    for (let i = 0; i < binary.length; i += 8) {
      let byte = binary.slice(i, i + 8);
      result += String.fromCharCode(parseInt(byte, 2));
    }
    return result;
  }
  
  function encodeTextToCmd(text) {
    const binary = stringToBinary(text);
    const encodedSpaces = encodeBinaryToSpaces(binary);
    return encodedSpaces;
  }
  
  function decodeCmdToText(spaces) {
    const decodedBinary = decodeSpacesToBinary(spaces);
    const output = binaryToString(decodedBinary);
    return output;
  }
  
  
  // New simpleEncode function
  function simpleEncode(text) {
    const binary = stringToBinary(text);
    let encodedSpaces = '';
  
    for (let bit of binary) {
      encodedSpaces += spaceMapping[bit];
    }
  
    return encodedSpaces;
  }
  
  // New simpleDecode function
  function simpleDecode(encodedText) {
    let binary = '';
  
    for (let char of encodedText) {
      binary += reverseSpaceMapping[char];
    }
  
    return binaryToString(binary);
  }
  
  // Helper functions
  // Helper functions for converting string to binary and vice versa
function stringToBinary(input) {
  return input.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
}

function binaryToString(binary) {
  let result = '';
  for (let i = 0; i < binary.length; i += 8) {
    let byte = binary.slice(i, i + 8);
    result += String.fromCharCode(parseInt(byte, 2));
    }
    return result;
}

// Complex encoding function
function complexEncode(text) {
  const binary = stringToBinary(text);
  const encodedSpaces = encodeBinaryToSpaces(binary);
  return encodedSpaces;
}

// Complex decoding function
function complexDecode(encodedSpaces) {
  const decodedBinary = decodeSpacesToBinary(encodedSpaces);
  const decodedText = binaryToString(decodedBinary);
  return decodedText;
}
