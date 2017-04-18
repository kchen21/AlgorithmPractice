// I have an array where every number in the range 1...n appears once except for one number which appears twice.
// Write a function for finding the number that appears twice.

// Solution: I can use an object or array to keep count of how often each number appears, but that'd add O(n) additional memeory.
// However, we can do this with O(1) additional memory. Think about the qualities of the input.
// Since each number from 1 to n appears once except for one number, which appears twice, we can find out what the sum for 1 to n is,
// and subtract that from the sum of the elements.
// The sum of all integers from 1 to n is (n + 1) * (n / 2), or (n^2 + n) / 2.

const findDuplicate = (nums) => {
  let max = 0;
  let sum = 0;
  let sumFromOneToMax;

  nums.forEach((num) => {
    if (num > max) {
      max = num;
    }

    sum += num;
  });

  sumFromOneToMax = (max * max + max) / 2;

  return sum - sumFromOneToMax;
};

// Complexity: O(n) time and O(1) space

let duplicate = findDuplicate([1,2,3,4,4,5]);
console.log(duplicate);
