// Delete a node from a singly-linked list ↴ , given only a variable pointing to that node.

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

let a = new LinkedListNode('A');
let b = new LinkedListNode('B');
let c = new LinkedListNode('C');

// If we had access to the previous node, we could set the previous node's 'next' equal to the input node's 'next'
// and set the input node's 'next' to null. However, since we can't, we will set the input node's value and 'next' equal to
// the next node's value and next.

const deleteNode = (node) => {
  const nextNode = node.next;

  if (nextNode) {
    node.value = nextNode.value;
    node.next = nextNode.next;
    nextNode.next = null;
  } else {
    throw new Error("Can't delete the last node with this method!");
  }
};

deleteNode(b);

// Complexity:
// O(1) time and O(1) space

// Problems:
// We can't delete the last node with this method. We can, however, set the last node's value to null and and treat it as a dead node
// or a sentinel node. The trade-off, though, is that we can't have non-dead nodes with values set to null.
// Thus, we will throw an error instead.
//
// Side Effects:
// 1. If we have a pointer to b somewhere else in our code and we were assuming it still had its old value, then we'd have bugs.
// 2. If we have a pointer to c, and change the value of c, we will never be able to access that value via a traversal of our linked list.




// A cycle occurs when a node’s next points back to a previous node in the list. The linked list is no longer linear with a beginning and end—instead, it cycles through a loop of nodes.

// Write a function containsCycle() that takes the first node in a singly-linked list and returns a boolean indicating whether the list contains a cycle.

// Solution 1:
// Traverse the linked list, and store each node in a set.
// If the current node is already in our set, then we have a cycle.
// If the current node is null, then we have reached the end of our list without finding a cycle.
// Otherwise, insert the current node into our set and move on to the next one.
//
// Complexity: O(n) time and O(n) space.

const containsCycle = (head) => {
  const nodes = new Set();
  let currentNode = head;

  while (currentNode) {
    if (nodes.has(currentNode)) {
      return true;
    } else {
      nodes.add(currentNode);
      currentNode = currentNode.next;
    }
  }

  return false;
}

// Solution 2:
// Have two runners, fastRunner and slowRunner, move along our linked list. For each step slowRunner takes, fastRunner will take 2.
// If there is a cycle, then fastRunner is bound to run into slowRunner (Proof below). Otherwise, fastRunner will reach the end of the list.
//
// Proof By Contradiction:
// Assume that fastRunner skips over slowRunner. fastRunner would be at most one node ahead of slowRunner, since their travel speeds differ by 1.
// [] -> s -> f
// However, that would mean that, at the slowRunner and fastRunner were just at the same node. QED
//
// Since fastRunner can't skip over slowRunner, at most slowRunner will run around the cycle once and fastRunner will run around twice. This gives us a runtime of O(n).
//
// Space complexity, however, would be O(1), because we just have two variables each storing one node.

const containsCycle2 = (head) => {
  let slowRunner = head;
  let fastRunner = head;

  while (fastRunner && fastRunner.next) {
    slowRunner = slowRunner.next;
    fastRunner = fastRunner.next.next;

    if (fastRunner === slowRunner) {
      return true;
    }
  }

  return false;
};




// Write a function for reversing a linked list ↴ . Do it in-place ↴ .
//
// Your function will have one input: the head of the list.
//
// Your function should return the new head of the list.

// Solution: We can traverse the linked list and set currentNode's next to its previous.
// We would need to keep track of previous and also keep track of what the original next is, because we won't be able to access it
// after we reassign currentNode's next otherwise.
//
// Complexity: O(n) time and O(1) space

const reverse = (head) => {
  let currentNode = head;
  let nextNode = null;
  let previousNode = null;

  while (currentNode) {
    nextNode = currentNode.next;
    currentNode.next = previousNode;

    previousNode = currentNode;
    currentNode = nextNode;
  }

  // When we reach the end of the list, currentNode gets set to null and we exit the loop.
  // The former tail, a.k.a the new head, at this point, is previousNode.

  return previousNode;
};




// Write a function that for creating a new copy of a linked list.

const copy = (head) => {
  let newHead = new LinkedListNode(head.value);
  let newCurrentNode = newHead;
  let currentNode = head;

  while (currentNode) {
    let newNextNode = new LinkedListNode(currentNode.next.value);

    newCurrentNode.next = newNextNode;

    newCurrentNode = newNextNode;
    currentNode = currentNode.next;
  }

  return newHead;
};

// Complexity: O(n) time and O(1) space





// You have a linked list ↴ and want to find the kth to last node.
// Write a function kthToLastNode() that takes an integer k and the headNode of a singly linked list, and returns the kth to last node in the list.

// Solution 1: We can't traverse through the list to get to the last node, and then walk backwards, since singly-linked lists don't supoort backwards movement.
// However, we can find the length of the list and find how far we need to move forward to get to the node we're looking for.
// If the list has length n, and we're looking for the kth to last node, then we need to take n - k steps from the head to reach it.

const kthToLastNode = (k, head) => {
  let count = 1;
  let currentNode = head;

  while (currentNode.next) {
    currentNode = currentNode.next;
    count += 1;
  }

  const steps = count - k;
  currentNode = head;

  for (let i = 0; i < steps; i++) {
    currentNode = currentNode.next;
  }

  return currentNode;
};

// Complexity: O(n) time and O(1) space

// The runtime is O(n). Since we take n steps to find the length of our list and another n - k steps to find the node we are looking for,
// in the worst case (k = 1) we traverse the list twice, taking 2n steps.

// Solution 2: We can do it with just one pass through our list. If we had a stick that spanned k nodes,
// we could slide the stick down the list until its right end hit the end. Then the left end would be at the kth node.
// This won't save use time (The number of steps doesn't change), but it is an alternative to Solution 1.
// Note: If we store node data in an LRU cache, however, this might save us a little time, because, here,
// there's a shorter amount of time between the first and second time we access a given node.

const kthToLastNode2 = (k, head) => {
  let leftmostNodeOfStick = head;
  let rightmostNodeOfStick = head;

  for (let i = 0; i < k - 1; i++) {
    rightmostNodeOfStick = rightmostNodeOfStick.next;
  }

  while (rightmostNodeOfStick.next) {
    leftmostNodeOfStick = leftmostNodeOfStick.next;
    rightmostNodeOfStick = rightmostNodeOfStick.next;
  }

  return leftmostNodeOfStick;
};
