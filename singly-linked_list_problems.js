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
// If the current node is undefined, then we have reached the end of our list without finding a cycle.
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
