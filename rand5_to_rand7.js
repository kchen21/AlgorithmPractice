// You have a function rand5() that generates a random integer from 1 to 5. Use it to write a function rand7() that generates a random integer from 1 to 7.
// rand5() returns each integer with equal probability. rand7() must also return each integer with equal probability.

const rand5 = () => {
  return Math.floor((Math.random() * 5) + 1);
};

// We could attempt the following:

const rand7NonUniform = () => {
  return (rand5() + rand5()) % 7 + 1;
};

// But that wouldn't return each integer from 1 to 7 with equal probablity. Each rand5 call gives us 5 outcomes,
// so we have 25 possible outcomes in total. Since 25 is not divisible by 7, some numbers will appear more than others.

// Solution 1: 7 doesn't go into 25, but it does go into 21. We could use rand5 twice to choose a random row and column on a 5x5 grid,
// with the numbers 1 - 7 appearing 21/7 = 3 times each, and 25 - 21 = 4 spaces, where, if we land, we re-roll.

const rand7Recursive = () => {
  const sampleSpace = [
    [1,2,3,4,5],
    [6,7,1,2,3],
    [4,5,6,7,1],
    [2,3,4,5,6],
    [7,0,0,0,0]
  ];

  let randomRowIndex = rand5() - 1;
  let randomColumnIndex = rand5() - 1;
  let randomNumber = sampleSpace[randomRowIndex][randomColumnIndex];

  if (randomNumber === 0) {
    return rand7Recursive();
  } else {
    return randomNumber;
  }
};

// Solution 2: Using recursion incurs space cost and could lead to a stack overflow.
// We can use an iterative approach using a while loop instead.

const rand7Iterative = () => {
  const sampleSpace = [
    [1,2,3,4,5],
    [6,7,1,2,3],
    [4,5,6,7,1],
    [2,3,4,5,6],
    [7,0,0,0,0]
  ];

  let randomNumber = 0;

  let randomRowIndex;
  let randomColumnIndex;

  while (randomNumber === 0) {
    randomRowIndex = rand5() - 1;
    randomColumnIndex = rand5() - 1;
    randomNumber = sampleSpace[randomRowIndex][randomColumnIndex];
  }

  return randomNumber;
};

// Solution 3: We could also get rid of sampleSpace if we use some arithmetic. If we can get a value from 1 - 21 with equal probability,
// then all we need to do is return (that value mod 7) + 1.
// To get a value from 1 - 21 with equal probability, we just need to get a value from 1 - 25 with equal probability
// and re-roll while that value is greater than 21.

const rand7Iterative2 = () => {
  let outcome = 22;

  let roll1;
  let roll2;

  while (outcome > 21) {
    roll1 = rand5();
    roll2 = rand5();
    outcome = (roll1 - 1) * 5 + (roll2 - 1) + 1;
  }

  return outcome % 7 + 1;
};

// To visualize outcome, think about choosing a random number from:
//
// [
//   [0,1,2,3,4],
//   [5,6,7,8,9],
//   [10,11,12,13,14],
//   [15,16,17,18,19],
//   [20,21,22,23,24]
// ]
//
// and adding 1 to it.

// Complexity: O(1) space and worst-case O(infinity) time
