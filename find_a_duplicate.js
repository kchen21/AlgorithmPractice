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
  for (let needle = 1; needle < arr.length; needle++) {
    let hasBeenSeen = false;
    hasBeenSeen = false;
    for (let i = 0; i < arr.length; i++) {
      let el = arr[i];
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

// Solution 3: We should attempt to get O(nlogn) time again. What can give us O(nlogn) time?
// The logn in nlogn comes from breaking a problem down into smaller sub-problems of equal size.

// What if we could implement something like binary search?
// 1. Iterate through the array and find the numbers between 1 and n/2.
// 2. If the total is greater than n/2, then (by the Pigeonhole Principle) one of those numbers must be a duplicate.
//    If the total is less than or equal to n/2, then the duplicate must be a number from n/2 + 1 to n.
// 3. Once we find out which range the duplicate is in, we divide than range in half and repeat the process.
//    We iterate through the array lgn times, so the runtime is O(nlgn).

// We should use an iterative solution instead of a recursive one, because a recursive solution incurs a space cost in the call stack.

const findDuplicate3 = (arr) => {
  let floor = 1;
  let ceiling = arr.length - 1;

  while (floor < ceiling) {
    let midpoint = Math.floor(floor + ((ceiling - floor) / 2));
    let lowerRangeFloor = floor;
    let lowerRangeCeiling = midpoint;
    let upperRangeFloor = midpoint + 1;
    let upperRangeCeiling = ceiling;

    let distinctNumbersInLowerRange = lowerRangeCeiling - lowerRangeFloor + 1;

    let itemsInLowerRange = 0;
    arr.forEach((num) => {
      if (num >= lowerRangeFloor && num <= lowerRangeCeiling) {
        itemsInLowerRange++;
      }
    });

    if (itemsInLowerRange > distinctNumbersInLowerRange) {
      ceiling = lowerRangeCeiling;
    } else {
      floor = upperRangeFloor;
    }
  }

  return floor;
};


// Solution 4: We can solve the problem in O(n) time and O(1) space if we traverse our array as if it were a linked list,
// where each node has a value equal to the element, and a next pointer to the element that is in the value-th position.
// The linked list has to have a cycle, and furthermore, there must be multiple nodes pointing to the first node in that cycle.
// That first node's position represents a duplicate in our array, so we just need an algorithm to find it.

// We can do the following:
// 1. Get inside a cycle: Start at position n+1, the head of the linked list, and walk n steps to find a position guaranteed to be in the cycle
// 2. Find the length of the cycle: Remember the position we found in the previous step and count the number of steps it takes to get back to that position
// 3. Find the first node of the cycle:
//    - Start two pointers, one at position n+1, the head of the linked list, and another at the position that we end up at after taking "cycle length" steps
//    - Advance both pointers at the same time until the pointers are at the same position (This will be the position of the first node of the cycle, and thus, a duplicate in our array.)

// See https://www.interviewcake.com/question/javascript/find-duplicate-optimize-for-space-beast-mode for a more detailed explanation.

const findDuplicate4 = (arr) => {
  const n = arr.length - 1;

  let positionInCycle = n + 1;
  for (let i = 0; i < n; i++) {
    positionInCycle = arr[positionInCycle - 1];
  }

  const rememberedPositionInCycle = positionInCycle;

  let currentPositionInCycle = arr[positionInCycle - 1];
  let cycleStepCount = 1;

  while (currentPositionInCycle !== rememberedPositionInCycle) {
    currentPositionInCycle = arr[currentPositionInCycle - 1];
    cycleStepCount += 1;
  }

  let pointerStart = n + 1;
  let pointerAhead = n + 1;
  for (let step = 0; step < cycleStepCount; step++) {
    pointerAhead = arr[pointerAhead - 1];
  }

  while (pointerStart !== pointerAhead) {
    pointerStart = arr[pointerStart - 1];
    pointerAhead = arr[pointerAhead - 1];
  }

  return pointerStart;
};

// Complexity: O(n) time and O(1) space
