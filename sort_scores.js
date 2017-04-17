// You created a game that is more popular than Angry Birds.
// You rank players in the game from highest to lowest score. So far you're using an algorithm that sorts in O(nlgn) time, but players are complaining that their rankings aren't updated fast enough. You need a faster sorting algorithm.
//
// Write a function that takes:
// an array of unsortedScores
// the highestPossibleScore in the game
//
// and returns a sorted array of scores in less than O(nlgn) time.


// Solution: We can use a counting sort. For example, if we have a max score of 100,
// we could create an object/array of size 101 where the keys/indices are 0-100
// and the values/elements represent the score counts. Then we just iterate through the object/array
// and push scores into a new array, taking their counts into consideration.
//
// Counting sorts are space-inefficient but time-efficient;
// we need to create the object/array to store the counts, but object/array insertion and lookup are constant-time operations.

const countingSort = (scores, maxScore) => {
  const scoreCounts = [];
  const sortedScores = [];

  for (let i = 0; i <= maxScore; i++) {
    scoreCounts.push(0);
  }

  scores.forEach((score) => {
    scoreCounts[score] += 1;
  });

  scoreCounts.forEach((count, score) => {
    for (j = 1; j <= count; j++) {
      sortedScores.push(score);
    }
  });

  return sortedScores;
};

// Complexity: O(n) time and O(n) space
// If we think of the maxScore as a variable k rather than a constant,
// then it'd be O(n + k) time and O(n + k) space instead.

let unsortedScores = [37, 89, 41, 65, 91, 53];
const HIGHEST_POSSIBLE_SCORE = 100;

let sortedScores = countingSort(unsortedScores, HIGHEST_POSSIBLE_SCORE);
console.log(sortedScores);
