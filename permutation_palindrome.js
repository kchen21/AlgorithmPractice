// Write an efficient function that checks whether any permutation ↴ of an input string is a palindrome ↴ .
// You can assume the input string only contains lowercase letters.
//
// Examples:
//
// "civic" should return true
// "ivicc" should return true
// "civil" should return false
// "livci" should return false

// Brute force solution:
// Find each permutation of the string. Then check each permutation to see if it is a palindrome or not.
// Given a string of length n, we have a total of n! permutations. If we have to check each permutation,
// which would take O(n) time, then the total runtime of our algorithm is O(n!n).

// Better solution:
// Keep track of the number of times a character appears in the string using the object.
// Then make sure that there is at most one character that appears an odd number of times (the middle character of a palindrome can be unpaired).

// Best solution:
// We don't even need to keep track of the number of times the characters appear;
// we just need to keep track of whether the characters appear an even or odd number of times.
// Since we have two options, we could make our algorithm more space efficent using a set instead of an object:
// Iterate through the characters, and if a character is in the set, remove it. Otherwise, add it.
// Then, check if the size of the set is smaller than 2.

const isPermutationPalindrome = (string) => {
  const unpairedChars = new Set();

  for (let i = 0; i < string.length; i++) {
    let char = string[i];

    if (unpairedChars.has(char)) {
      unpairedChars.delete(char);
    } else {
      unpairedChars.add(char);
    }
  }

  return unpairedChars.size < 2;
};

console.log("should return true: " + isPermutationPalindrome("civic"));
console.log("should return true: " + isPermutationPalindrome("ivicc"));
console.log("should return false: " + isPermutationPalindrome("civil"));
console.log("should return false: " + isPermutationPalindrome("livci"));
