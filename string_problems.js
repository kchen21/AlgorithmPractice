// Since strings in JavaScript are immutable ↴ , we'll first convert the string into an array of characters,
// do the in-place word reversal on that array, and re-join that array into a string before returning it.
// This isn't technically "in-place" and the array of characters will cost O(n) additional space,
// but it's a reasonable way to stay within the spirit of the challenge.

// We'll be interpreting a "string" as an array of characters.

// Write a function to reverse a string in place.

const reverse = (str) => {
  const strArr = str.split("");

  let leftIdx = 0;
  let rightIdx = strArr.length - 1;

  while (leftIdx < rightIdx) {
    let temp = strArr[leftIdx];
    strArr[leftIdx] = strArr[rightIdx];
    strArr[rightIdx] = temp;

    leftIdx++;
    rightIdx--;
  }

  return strArr.join("");
};

let reversedString = reverse("Allele");

// Complexity: O(n) time and O(1) space

const reverse2 = (str) => {
  const strArr = str.split("");

  for (let idx = 0; idx < strArr.length / 2; idx++) {
    let temp = strArr[idx];
    strArr[idx] = strArr[strArr.length - 1 - idx];
    strArr[strArr.length - 1 - idx] = temp;
  }

  return strArr.join("");
};

let reversedString2 = reverse2("Genome");

// Complexity: O(n) time and O(n) space, but, compared to the first solution, the loop will run an extra time if the string has an odd nubmer of characters.




// You're working on a secret team solving coded transmissions.
// Your team is scrambling to decipher a recent message, worried it's a plot to break into a major European National Cake Vault. The message has been mostly deciphered, but all the words are backwards! Your colleagues have handed off the last step to you.
//
// Write a function reverseWords() that takes a string message and reverses the order of the words in place.
//
// When writing your function, assume the message contains only letters and spaces, and all words are separated by one space.

// Solution:

// If we swap individual words at a time, then, in the worst case (i.e. when the number of words is as close as possible to the number of characters,
// and the words being swapped are of different lengths), then each swap is O(n) time, and the total time is O(n^2).
// (See https://www.interviewcake.com/question/javascript/reverse-words for a less abstract explanation.)
// However, we can do better.

// We can start by reversing all the characters in the string.

// If we look at the reversed string, we can see that the words are in order, but their characters are reversed.
// So, we can just reverse the characters of each word.

// To do this, we're going to write a helper function, reverseCharacters, which takes in a messageArray, startIdx, and endIdx;

const reverseCharacters = (messageArray, startIdx, endIdx) => {
  while (startIdx < endIdx) {
    let temp = messageArray[startIdx];
    messageArray[startIdx] = messageArray[endIdx];
    messageArray[endIdx] = temp;
    startIdx++;
    endIdx--;
  }
};

const reverseWords = (message) => {
  const messageArr = message.split("");

  reverseCharacters(messageArr, 0, messageArr.length - 1);

  currentWordStartIdx = 0;
  for (let i = 0; i <= messageArr.length; i++) {
    if (messageArr[i] === " " || i === messageArr.length) {
      reverseCharacters(messageArr, currentWordStartIdx, i - 1);
      currentWordStartIdx = i + 1;
    }
  }

  return messageArr.join("");
};

let reversedWords = reverseWords("You are the one and only");

// Complexity: O(n) time, because we iterate through the character array twice,
// and O(n) space if we create the character array or O(1) space if it is provided as input.
