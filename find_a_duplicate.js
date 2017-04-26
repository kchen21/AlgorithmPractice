// Find a duplicate, Space Edition™.
// We have an array of integers, where:
//
// The integers are in the range 1..n
// The array has a length of n+1
// It follows that our array has at least one integer which appears at least twice. But it may have several duplicates, and each duplicate may appear more than twice.
//
// Write a function which finds an integer that appears more than once in our array. (If there are multiple duplicates, you only need to find one of them.)
//
// We're going to run this function on our new, super-hip Macbook Pro With Retina Display™. Thing is, the damn thing came with the RAM soldered right to the motherboard, so we can't upgrade our RAM. So we need to optimize for space!


// Solution 1: We can brute-force it. Take each number in the range from 1 to n, and iterate through the array, keepng track of whether the number has been seen, and returning it if it has been seen before.
// We can consider the duplicate we are looking for the "needle" and the array it is in the "haystack".

const findDuplicate = (arr) => {
  let hasBeenSeen; // Since let is block-scoped, we have to declare variables here so we are not creating a new variable for each block
  let el;

  for (let needle = 1; needle < arr.length; needle++) {
    // let hasBeenSeen = false;
    hasBeenSeen = false;
    for (let i = 0; i < arr.length; i++) {
      // let el = arr[i];
      el = arr[i];

      if (el === needle) {
        if (hasBeenSeen) {
          return el;
        } else {
          hasBeenSeen = true;
        }
      }
    }
  }

  throw new Error("There are no duplicates");
};

// Complexity: O(n^2) time and O(1) space

// Solution 2: Let's see if we can do better than (n^2) time. Is it possible to get O(n) or O(nlogn) time?
// What if we sorted the array? Then we can iterate through it and return an element if it is equal to the previous element.
// If we use an in-place merge-sort, we can cut our runtime down to O(nlogn). However, in-place sorts are destructive.
// Can we find a non-destructive solution?
