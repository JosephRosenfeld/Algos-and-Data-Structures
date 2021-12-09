class LLNode {
  constructor(data = null, next = null) {
    this.data = data;
    this.next = next; //not putting any validation on what the next pointer
    //can point to
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
    this.size = this._findSize(this.head);
  }

  //add
  //Doesn't validate the node being added
  add(node) {
    if (!this.head) {
      this.head = node;
    } else {
      let cur = this.head;
      while (cur && cur.next) {
        cur = cur.next;
      }
      cur.next = node;
    }
    this.size++;
    return true;
  }

  //insertAt
  insertAt(node, idx) {
    //Edge case of invalid index
    if (idx < 0 || idx > this.size) {
      return undefined;
    }
    //redirect to add if index is the one after last element
    if (idx == this.size) {
      this.add(node);
      return;
    }

    this.size++; //after this point guarenteed add so increase size
    //if index is zero, then replace head
    if (idx === 0) {
      node.next = this.head;
      this.head = cur;
      return;
    }
    //all other cases
    let prev = this.head;
    let cur = this.head.next;
    let i = 1;
    while (i < idx) {
      prev = cur;
      cur = cur.next;
      i++;
    }
    prev.next = node;
    node.next = cur;
  }

  //getFirst
  getFirst() {
    return this.head;
  }

  //getLast
  getLast() {
    let cur = this.head;
    while (cur && cur.next) {
      cur = cur.next;
    }
    return cur;
  }

  //remove
  //No validation on the node being passed in
  remove(node) {
    //Edge case of no head
    if (!this.head) {
      return undefined;
    }
    if (node == this.head) {
      this.head = this.head.next;
      this.size--;
      return;
    }
    let prev = this.head;
    let cur = this.head.next;
    while (cur) {
      if (cur === node) {
        prev.next = cur.next;
        this.size--;
        return;
      }
      prev = cur;
      cur = cur.next;
    }
    return undefined; //node wasn't in list
  }

  //removeAt
  removeAt(idx) {
    //Edge case of invalid index
    if (idx < 0 || idx >= this.size) {
      return undefined;
    }

    this.size--; //after this point guarenteed removal so dcrease size
    //if index is zero, then replace head
    if (idx === 0) {
      this.head = this.head.next;
      return;
    }
    //all other cases
    let prev = this.head;
    let cur = this.head.next;
    let i = 1;
    while (i < idx) {
      prev = cur;
      cur = cur.next;
      i++;
    }
    prev.next = cur.next;
    this.size--;
  }

  //clear
  clear() {
    this.head = null;
    this.size = 0;
  }

  //size
  size() {
    return this.size;
  }

  //print
  print() {
    let cur = this.head;
    let str = "";
    while (cur) {
      str += cur ? `${cur.data} => ` : "";
    }
    return str;
  }

  //Helper Methods
  //find the initial size of the linked list
  _findSize() {
    let cur = this.head;
    let len = 0;
    while (cur) {
      cur = cur.next;
      len++;
    }
    return len;
  }
}

let tim = new LLNode();
console.log(tim);
tim.data = 5;
console.log(tim);
let jim = new LLNode(10, tim);
console.log(jim);
let whim = new LinkedList(jim);
console.log(whim);
whim.add(new LLNode(17));
whim.add(new LLNode(18));
console.log(whim);
whim.insertAt(new LLNode(20), 2);
whim.insertAt(new LLNode(25), 5);
whim.insertAt(new LLNode(20), 20);
whim.insertAt(new LLNode(20), -3);
console.log(whim);
console.log(whim.getFirst());
console.log(whim.getLast());
whim.remove(jim);
console.log(whim);
whim.removeAt(5);
console.log(whim);
whim.removeAt(20);
whim.remove(-5);
console.log(whim);
whim.clear();
console.log(whim);
console.log(new LinkedList());
