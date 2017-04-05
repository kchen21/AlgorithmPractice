// Implement a stack.

class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
    return item;
  }

  pop() {
    if (this.items.length === 0) {
      return undefined;
    } else {
      return this.items.pop();
    }
  }

  peek() {
    return this.items[this.items.length - 1];
  }
}

const stack = new Stack();

// Use your Stack class to implement a new class MaxStack with a function getMax() that returns the largest element in the stack. getMax() should not remove the item.
//
// Your stacks will contain only integers.
//
// Solution: Store the maxs in another stack, maxsStack.
//
// Let's call our stack stack. Each time we push an item into stack, we check if it's greater than or equal to the last item of maxsStack and push it into maxsStack if it is.
// Each time we pop from stack, we check if the popped item is equivalent to the last item of maxsStack, and, if it is, we pop from maxsStack.

class MaxStack {
  constructor() {
    this.stack = new Stack();
    this.maxsStack = new Stack();
  }

  push(item) {
    this.stack.push(item);

    if (!this.maxsStack.peek() || item >= this.maxsStack.peek()) {
      this.maxsStack.push(item);
    }

    return item;
  }

  pop() {
    const item = this.stack.pop();

    if (this.maxsStack.peek() === item) {
      this.maxsStack.pop();
    }

    return item;
  }

  getMax() {
    return this.maxsStack.peek();
  }
}

const maxStack = new MaxStack();

// Runtime for push, pop, and getMax are all O(1). However, because we created an additional stack, O(m) additional space is required, where m is the number of operations performed on the stack.
// Notice that we spend more time on push and pop in order to spend less time on getMax. If we had decided to optimize for push and pop instead because we rarely use getMax,
// we could just have getMax iteratate through the stack items, an O(m) operation.
