// You have a function rand7() that generates a random integer from 1 to 7. Use it to write a function rand5() that generates a random integer from 1 to 5.
// rand7() returns each integer with equal probability. rand5() must also return each integer with equal probability.

const rand7 = () => {
  return Math.floor((Math.random() * 7) + 1);
};

// Solution: Keep re-rolling with rand7 itself until we get a number from 1 to 5. Each number from 1 to 5 has a 1/7 chance of occurring.

const rand5 = () => {
  let randomNumber = 6; // initialize randomNumber as a number greater than 5

  while (randomNumber > 5) {
    randomNumber = rand7();
  }

  return randomNumber;
}

// Complexity: O(1) space and worst-case O(infinity) time

// Sub-Optimal Solution: If we weren't worried about space cost or a potential stack overflow, we could use recursion as well.

const rand5SubOptimal = () => {
  let randomNumber = rand7();
  return randomNumber <= 5 ? randomNumber : rand5SubOptimal();
};
