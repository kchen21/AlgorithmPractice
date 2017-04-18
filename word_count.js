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

// Tentative Solution: We could feed a regular expression into the split method, but it is difficult to measure performance when regular expressions are involved.
// Instead, we'll create our own split function.

const splitWords = (string) => {
  const words = [];
  const charsToSplitOn = [" ", "-", "/", ":", ".", "(", ")", "[", "]", "{", "}", "!", "@", "#", "*", ";", ",", "'", '"', "<", ">", "?"];

  let currentWord = "";

  for (let i = 0; i < string.length; i++) {
    let char = string.charAt(i);

    if (i === string.length - 1 && charsToSplitOn.indexOf(char) === -1) {
      currentWord += char;
      words.push(currentWord);
      currentWord = "";
    } else if (charsToSplitOn.indexOf(char) === -1) {
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

// We have to make a decision as to when to differentiate capitalized words from non-capitalized words.
// To cover proper nouns, let us put a capitalized word in our map if and only if it is always capitalized in the original string.
// The trade-off is that, if the first word appears only once, it will be stored as a capitalized word in our map.

// We could first create a map which differentiates between capitalized words and lower-case words, and then iterate through it,
// adding combined counts to another map. However, to save time and space, we will just use one map and CRUD key-value pairs
// as we iterate through our words.

// We could also save some space if, instead of pushing our words in an array when we split them, we put them in a map that we can
// manipulate as discussed.

// Solution: We will create a class to tie all our functions together, and call them on instances of our class instead of passing references.

class WordCloudData {
  constructor(inputString) {
    this.inputString = inputString;
    this.wordsToCounts = new Map();
    this.populateWordsToCounts();
  }

  populateWordsToCounts() {
    const charsToSplitOn = [" ", "-", "/", ":", ".", "(", ")", "[", "]", "{", "}", "!", "@", "#", "*", ";", ",", "'", '"', "<", ">", "?"];

    let currentWord = "";

    for (let i = 0; i < this.inputString.length; i++) {
      let char = this.inputString.charAt(i);

      if (i === this.inputString.length - 1 && charsToSplitOn.indexOf(char) === -1) {
        currentWord += char;
        this.addWordToWordsToCounts(currentWord);
        currentWord = "";
      } else if (charsToSplitOn.indexOf(char) === -1) {
        currentWord += char;
      } else if (currentWord) {
          this.addWordToWordsToCounts(currentWord);
          currentWord = "";
      }
    }
  }

  addWordToWordsToCounts(word) {
    let newCount;

    if (this.wordsToCounts.has(word)) {
      newCount = this.wordsToCounts.get(word) + 1;
      this.wordsToCounts.set(word, newCount);
    } else if (this.wordsToCounts.has(word.toLowerCase())) {
      let lowerCaseWord = word.toLowerCase();
      newCount = this.wordsToCounts.get(lowerCaseWord) + 1;
      this.wordsToCounts.set(lowerCaseWord, newCount);
    } else if (this.wordsToCounts.has(this.capitalize(word))) {
      let capitalizedWord = this.capitalize(word);
      newCount = this.wordsToCounts.get(capitalizedWord) + 1;
      this.wordsToCounts.set(word, newCount);
      this.wordsToCounts.delete(capitalizedWord);
    } else {
      this.wordsToCounts.set(word, 1);
    }
  }

  capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}

let data = new WordCloudData("Add milk and eggs, then add flour and sugar.");
console.log(data.wordsToCounts);
