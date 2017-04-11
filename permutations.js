// Write a recursive function for generating all permutations of an input string. Return them as a set.

// Solution:
// Think. How can we use recursion here? What if we broke apart the string into the first character and the rest of the string?
// Then, we could find the permutations of the rest of the string and iterate through them, placing the first character at each position.

const permutations = (string) => {

  const permutationsOfCurrentString = new Set();

  if (string.length <= 1) {
    permutationsOfCurrentString.add(string);
    return permutationsOfCurrentString;
  }

  const firstChar = string.charAt(0);
  const restOfString = string.slice(1, string.length);

  const permutationsOfRestOfString = permutations(restOfString);

  permutationsOfRestOfString.forEach((permutationOfRestOfString) => {
    for (let i = 0; i <= permutationOfRestOfString.length; i++) {
      let permutation = permutationOfRestOfString.slice(0, i) + firstChar + permutationOfRestOfString.slice(i);
      permutationsOfCurrentString.add(permutation);
    }
  });

  return permutationsOfCurrentString;
};

let permutationsOfCat = permutations("cat");
console.log(permutationsOfCat);
