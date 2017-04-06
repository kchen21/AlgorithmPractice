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
}

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
