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

// Note that our inputs are small and of constant size. Even though the function above could be more efficient,
// it doesn't take up a lot of time and space at all. However, it's good for us to think about its time and space complexities.

// It is important to note that the slice method takes up O(m) time and O(m) space, where m is the size of the array it creates.
// We have n stack frames, and use slice twice in each frame except the last. We will count the time and space complexities of
// the slice method being called on shuffleDeck, since the ones being called on half1 and half2 will just change the constant multiplier.
// The first slice requires n - 1 time and n - 1 space, and we keep slicing until we get to 1 time and 1 space.
// Thus, the total time and space required is: (n - 1) + (n - 2) + (n - 3) + ... + 1, resulting in O(n^2) time and O(n^2) space.

// Solution 2: Instead of using slice, which creates new arrays, we can keep track of indices to save time and space.

const isSingleRiffleShuffleRecursiveOptimized = (shuffledDeck, shuffledDeckIndex, half1, half1Index, half2, half2Index) => {
  shuffledDeckIndex = shuffledDeckIndex || 0;
  half1Index = half1Index || 0;
  half2Index = half2Index || 0;

  if (shuffledDeckIndex === shuffledDeck.length) {
    return true;
  }

  if (shuffledDeck[shuffledDeckIndex] === half1[half1Index]) {
    shuffledDeckIndex++;
    half1Index++;
  } else if (shuffledDeck[shuffledDeckIndex] === half2[half2Index]) {
    shuffledDeckIndex++;
    half2Index++;
  } else {
    return false;
  }

  return isSingleRiffleShuffleRecursiveOptimized(shuffledDeck, shuffledDeckIndex, half1, half1Index, half2, half2Index);
};

// We have n + 1 frames, so the space cost is still O(n).
// However, for each frame, we have a constant number of operations, so the runtime is O(n) now instead of O(n^2).
