// Write a function to merge two sorted arrays of numbers.

// Solution: We will be implementing merge step of merge sort. Since the leftmost elements in each sorted array are the two smallest overall,
// we can compare them and push the smaller one into our result array. Then we account for the fact that we inserted it, and
// compare the next two smallest elements. Be careful to address what happens when we reach the end of one of our sorted arrays.

const mergeSortedArrs = (arr1, arr2) => {
  const resultArr = [];

  let currentArr1Idx = 0;
  let currentArr2Idx = 0;

  while (resultArr.length !== (arr1.length + arr2.length)) {
    let currentArr1El = arr1[currentArr1Idx];
    let currentArr2El = arr2[currentArr2Idx];

    if (currentArr1El < currentArr2El || !currentArr2El) {
      resultArr.push(currentArr1El);
      currentArr1Idx++;
    } else { // Note that comparisons with undefined return false no matter what, so if currentArr1El is undefined and currentArr2El exists, we'd still hit the else statement
      resultArr.push(currentArr2El);
      currentArr2Idx++;
    }
  }

  return resultArr;
};

// Complexity: O(n) time and O(n) space, where n is the total number of items in the result array
