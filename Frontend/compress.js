// String compression
/**
 * @param str: string to compress, only contains [a-z]+
 * @return compressed string
 */
function compress(str) {
  // if string is null or empty, return itself
  if (!str) {
    return str;
  }

  var compressedString = '';
  var currentChar = str.charAt(0);
  var currentCount = 1;
  for (var i = 1; i < str.length; i++) {
    if (currentChar === str.charAt(i)) {
      currentCount++;
    } else {
      // append to result
      compressedString += currentChar + currentCount.toString();

      // reset
      currentChar = str.charAt(i);
      currentCount = 1;
    }

    // reach end
    if (i === str.length - 1) {
      compressedString += currentChar + currentCount.toString();
    }
  }

  return compressedString;
}

// test for compress
var input;
var compressedString;

input = 'aaaabbaaaababbbcccccccccccc';
compressedString = compress('aaaabbaaaababbbcccccccccccc');
console.log(compressedString === 'a4b2a4b1a1b3c12');

input = 'aaaaaaa';
compressedString = compress(input);
console.log(compressedString === 'a7');

input = 'abc';
compressedString = compress(input);
console.log(compressedString === 'a1b1c1');

input = '';
compressedString = compress(input);
console.log(compressedString === '');