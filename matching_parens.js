// Write a function that, given a string and the index of an opening parenthesis, finds the index of its corresponding closing parenthesss.

// For example, if the sentence is:
// "Sometimes (when I nest them (my parentheticals) too much (like this (and this))) they get confusing."
// and an index of 10 is given, the function should return 79.

const getIndexOfClosingParen = (string, indexOfOpeningParen) => {
  let additionalOpeningParens = 0;

  for (let idx = indexOfOpeningParen + 1; idx < string.length; idx++) {
    let char = string[idx];

    if (char === "(") {
      additionalOpeningParens += 1;
    } else if (char === ")") {
      if (additionalOpeningParens === 0) {
        return idx;
      } else {
        additionalOpeningParens -= 1;
      }
    }
  }

  throw new Error("Parenthesis mismatch");
};

// Complexity:
// O(n) time and O(1) space;

// The trick to many "parsing" questions like this is using a stack to track which brackets/phrases/etc are "open" as you go.
//
// So next time you get a parsing question, one of your first thoughts should be "use a stack!"
//
// In this problem we can realize our stack would only hold '(' characters. So instead of storing each of those characters in a stack, we can store the number of items our stack would be holding.
//
// That gets us from O(n) space to O(1) space.

let indexOfClosingParen = getIndexOfClosingParen("Sometimes (when I nest them (my parentheticals) too much (like this (and this))) they get confusing.", 10);
