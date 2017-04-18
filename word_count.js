// You want to build a word cloud, an infographic where the size of a word corresponds to how often it appears in the body of text.
// To do this, you'll need data. Write code that takes a long string and builds its word cloud data in a map ↴ ,
// where the keys are words and the values are the number of times the words occurred.

// Consider capitalized words and punctuation.

// For example, in:
//
// "After beating the eggs, Dana read the next step:"
// "Add milk and eggs, then add flour and sugar."
//
// step: should not be a word, and "Add" and "add" should be counted as the same word.

// Solution: We could feed a regular expression into the split method, but it is difficult to measure performance when regualr expressions are involved.
// Instead, we'll create our own split function.

const splitWords = (string) => {
  const words = [];
  const charsToSplitOn = [" ", "-", "/", ":", ".", "(", ")", "[", "]", "{", "}", "!", "@", "#", "*", ";", ",", "'", '"', "<", ">", "?"];

  let currentWord = "";

  for (let i = 0; i < string.length; i++) {
    let char = string.charAt(i);

    if (charsToSplitOn.indexOf(char) === -1) {
      currentWord += char;
    } else if (currentWord) {
        words.push(currentWord);
        currentWord = "";
    }
  }

  return words;
};

const words = splitWords("After beating the eggs, Dana read the next step:");
console.log(words);
