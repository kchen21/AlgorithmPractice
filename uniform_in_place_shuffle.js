// Write a function for doing a uniform in-place shuffle of an array.

// Assume that you're given a function randomNumber(min, max) that returns a number between min and max inclusive.

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1))  + min;
};

// Incorrect Solution: The naive solution is to iterate through the array, and switch each element with a random element including itself.

const nonUniformShuffle = (inputArr) => {
  inputArr.forEach((el, idx) => {
    let randomIdx = randomNumber(0, inputArr.length - 1);

    if (idx !== randomIdx) {
      inputArr[idx] = inputArr[randomIdx];
      inputArr[randomIdx] = el;
    }
  });

  return inputArr;
};

console.log(nonUniformShuffle([1,2,3,4,5]));

// The solution above does not give a uniform random distribution.
// For example, given an array of three elements, there exist three possible choices for a random at each iterative step.
// Since there are three iterative steps, that gives us 3^3 = 27 possible resulting choices,
// each leading to one of 3! = 6 possible outcomes. 27 is not divisible by 6. Thus, some outcomes have to occur more than others.

// Correct solution: Choose a random element to be the first element. Then, from the elements that have not been chosen,
// choose another random element to be the second element. Keep going until have chosen the last element.

// Each element has a 1/n chance of being chosen as the nth element. For example, given an element a:
// P(a is chosen as the first element) = 1/n
// P(a is chosen as the second element) = (n - 1)/n * 1/(n - 1) = 1/n
// P(a is chosen as the third element) = (n - 1)/n * (n - 2)/(n - 1) * 1/(n - 2) = 1/n
// etc.

// We can perform the in-place shuffle if we use the front of the array to keep track of which elements we have chosen.
// This is known as the Fisher-Yates or Knuth shuffle.

const uniformShuffle = (inputArr) => {
  inputArr.forEach((el, idx) => {
    let randomIdx = randomNumber(idx, inputArr.length - 1);

    if (idx !== randomIdx) {
      inputArr[idx] = inputArr[randomIdx];
      inputArr[randomIdx] = el;
    }
  });

  return inputArr;
};

console.log(uniformShuffle([1,2,3,4,5]));

// Complexity: O(n) time and O(1) space
