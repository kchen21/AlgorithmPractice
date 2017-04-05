// Your company delivers breakfast via autonomous quadcopter drones. And something mysterious has happened.
// Each breakfast delivery is assigned a unique ID, a positive integer. When one of the company's 100 drones takes off with a delivery, the delivery's ID is added to an array, deliveryIdConfirmations. When the drone comes back and lands, the ID is again added to the same array.
//
// After breakfast this morning there were only 99 drones on the tarmac. One of the drones never made it back from a delivery. We suspect a secret agent from Amazon placed an order and stole one of our patented drones. To track them down, we need to find their delivery ID.
//
// Given the array of IDs, which contains many duplicate integers and one unique integer, find the unique integer.
//
// Solution 1: Iterate through the array and keep track of the count of each id in an object.
// This will take O(n) time and O(n) space.

// Use a JavaScript Map instead of an object because object keys are only strings and symbols, but our keys are numbers.

const findUniqueDeliveryId = (deliveryIds) => {
  const idsToOccurrences = new Map();

  deliveryIds.forEach((id) => {
    if (idsToOccurences.has(deliveryId)) {
      let newCount = idsToOccurences.get(deliveryId) + 1;
      idsToOccurences.set(deliveryId, newCount);
    } else {
      idsToOccurences.set(deliveryId, 1);
    }
  });

  for (let [id, count] of idsToOccurences) {
    if (count === 1) {
      return id;
    }
  }
};

// Note that Map also lets us iterate over keys and values more elegantly:

// Map
for (var [id, count] of idsToOccurrences) {
  if (count === 1) {
      return id;
  }
}

// object
for (let id in idsToOccurrences) {
  if (idsToOccurrences.hasOwnProperty(id)) {
      if (idsToOccurrences[id] === 1) {
          return Number(id);
      }
  }
}

// Solution 2: Use XOR. Initialize a variable, uniqueDeliveryId, at 0. XOR uniqueDeliveryId with each element of the array.
// When an integer is XOR'd with itself, it gets cancelled out. When the whole array has been iterated through, what's left is what hasn't been cancelled out, i.e. the unique id.
// This will take O(n) time and O(1) space.

// See more information on bitwise operations at:
// https://www.interviewcake.com/question/javascript/find-unique-int-among-duplicates

const findUniqueDeliveryId2 = (deliveryIds) => {
  let uniqueDeliveryId = 0;

  deliveryIds.forEach((id) => {
    uniqueDeliveryId ^= id;
  });

  return uniqueDeliveryId;
};
