// Implement a queue ↴ with 2 stacks ↴ . Your queue should have an enqueue and a dequeue function and it should be "first in first out" (FIFO).
// Optimize for the time cost of mm function calls on your queue. These can be any mix of enqueue and dequeue calls.
//
// Assume you already have a stack implementation and it gives O(1)O(1) time push and pop.

class StackQueue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  enqueue(item) {
    this.inStack.push(item);
    return item;
  }

  dequeue() {
    if (this.outStack.length > 0) {
      return this.outStack.pop();
    } else {
      while (this.inStack.length > 0) {
        let item = this.inStack.pop();
        this.outStack.push(item);
      }

      if (this.outStack.length === 0) {
        return undefined;
      } else {
        return this.outStack.pop();
      }
    }
  }
}

// Each enqueue is a O(1) operation.
//
// Dequeuing in the worst case is an O(m) operation because it will require m pops and m pushes to transfer all items from the inStack to the outStack.
// However, each consequent dequeue will be an O(1) operation.
// Thus, for m items, the runtime per item dequeue, amortized, will be [O(m) + m * O(1)] / m = O(m) / m = O(1).
//
// For m enqueue and dequeue function calls, the runtime is O(m).

const stackQueue = new StackQueue();
