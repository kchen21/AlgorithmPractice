// Write a function to reverse a string.

const reverse = (str) => {
  const strArr = str.split("");

  let leftIdx = 0;
  let rightIdx = strArr.length - 1;

  while (leftIdx < rightIdx) {
    let temp = strArr[leftIdx];
    strArr[leftIdx] = strArr[rightIdx];
    strArr[rightIdx] = temp;

    leftIdx++;
    rightIdx--;
  }

  return strArr.join("");
};

let reversedString = reverse("Allele");

// Complexity: O(n) time and O(n) space

const reverse2 = (str) => {
  const strArr = str.split("");

  for (let idx = 0; idx < strArr.length / 2; idx++) {
    let temp = strArr[idx];
    strArr[idx] = strArr[strArr.length - 1 - idx];
    strArr[strArr.length - 1 - idx] = temp;
  }

  return strArr.join("");
};

let reversedString2 = reverse2("Genome");

// Complexity: O(n) time and O(n) space, but, compared to the first solution, the loop will run an extra time if the string has an odd nubmer of characters.
