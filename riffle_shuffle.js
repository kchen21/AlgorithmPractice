// Write a function that tells su whether a full deck of cards shuffledDeck is a single riffle shuffle of two other halves half1 and half2.

// Solution 1: Think of the problem in terms of smaller subproblems. Consider how the cards are arranged after a riffle shuffle.
// The top card of shuffledDeck has to either be the top card of half1 or half2.
// If we remove the top card from both shuffledDeck and the half-deck it was a part of,
// then the next top-most card of shuffledDeck will either be the top card of one the two havles.
// To find out if shuffledDeck is the result of a single riffle shufffle,
// we just have to keep removing cards and checking in a recursive manner.

// Let the first element of shuffledDeck be the top card
const isSingleRiffleShuffleRecursive = (shuffledDeck, half1, half2) => {
  if (shuffledDeck.length === 0) {
    return true;
  }

  if (shuffledDeck[0] === half1[0]) {
    return isSingleRiffleShuffleRecursive(shuffledDeck.slice(1), half1.slice(1), half2);
  } else if (shuffledDeck[0] === half2[0]) {
    return isSingleRiffleShuffleRecursive(shuffledDeck.slice(1), half1, half2.slice(1));
  } else {
    return false;
  }
};
