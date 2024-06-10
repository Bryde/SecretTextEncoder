const spaceMapping = {
  0: '\u200B', // Zero Width Space
  1: '\u200C', // Zero Width Non-Joiner
  2: '\u200D', // Zero Width Joiner
  3: '\u2060', // Word Joiner
  4: '\u200E', // Left-to-Right Mark
  5: '\u200F', // Right-to-Left Mark
  6: '\u202A', // Left-to-Right Embedding
  7: '\u202B', // Right-to-Left Embedding
  8: '\u202C', // Pop Directional Formatting (for balance)
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
      while (count > 8) {
        result += spaceMapping[8];
        count -= 8;
      }
      result += spaceMapping[count] || '';
      currentChar = binary[i];
      count = 1;
    }
  }
  while (count > 8) {
    result += spaceMapping[8];
    count -= 8;
  }
  result += spaceMapping[count] || '';

  return result;
}

function decodeSpacesToBinary(spaces) {
  let binary = '';
  let isZero = true;

  for (let char of spaces) {
    let count = reverseSpaceMapping[char];
    if (count !== undefined) {
      binary += (isZero ? '0' : '1').repeat(count);
      isZero = !isZero; // Flip after each group
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
