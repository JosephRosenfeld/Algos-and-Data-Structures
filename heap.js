//Heaps are essentially a form of priority queue. Commonly used in
//Shortest path findings and easy sorting algos. Used a lot when you need to
//repeatedly remove the highest priority or lowest priority element.
//Utilizes a BT except because it is a guarenteed complete tree you know how
//to access children nodes based on parent nodes index in an array
//Below is assuming a 1 based index, aka put a null value in the 0th element
//left child = parent index * 2
//right child = (parent index * 2) + 1

//No validation to assume unique items in this heap but some heaps can
//Definition for a max-heap parent node must be greater than or equal to children nodes
//min-heap: parent node must be less than or equal to children nodes
//specifically a min-heap
class MinHeap {
  constructor(items = []) {
    this.items = [null];
    this.items = [null];
    items.forEach((el) => {
      this.insert(el);
    });
  }

  //Adds new element to the end of the heap and then "bubbles up" to resort it
  insert(val) {
    //new var to truncate code
    var arr = this.items;

    //Inserting the new val at the end of the heap array
    arr.push(val);

    //Inserted the very first val therefore no sorting needed (null value at 0 index)
    if (arr.length < 2) {
      return;
    }

    let curIdx = arr.length - 1;

    /* Traversing up the parent node until the curIdx node (curIdx) is greater than the parent (curIdx/2)*/
    while (curIdx > 1 && arr[Math.floor(curIdx / 2)] > arr[curIdx]) {
      /* Swapping the two nodes by using the ES6 destructuring syntax*/
      [arr[Math.floor(curIdx / 2)], arr[curIdx]] = [
        arr[curIdx],
        arr[Math.floor(curIdx / 2)],
      ];
      curIdx = Math.floor(curIdx / 2);
    }
  }

  //returns the top most node. Replaces the top most node with the lowest
  //and most right node and then "bubbles down" to resort the heap array
  remove() {
    //shorter var to truncate code
    var arr = this.items;

    //handle empty heap
    if (arr.length == 1) {
      return undefined;
    }

    //store smallest item to return after fixing heap
    let smallest = arr[1];

    //if only one item splice and return
    if (arr.length == 2) {
      return arr.splice(1, 1)[0];
    }
    //When there are two or more nodes in the heap,
    //we put the right most element at the first position
    //and start comparing nodes with the child nodes
    arr[1] = arr[arr.length - 1];
    arr.splice(arr.length - 1);
    //If only two nodes in the heap now just compare them
    if (arr.length === 3) {
      //if arr[1] (parent node) is greater than arr[2] (child node)
      //then we swap them since the parent node should be smaller (min-heap)
      if (arr[1] > arr[2]) {
        [arr[1], arr[2]] = [arr[2], arr[1]];
      }
      return smallest;
    }

    let curIdx = 1;
    let iLeft = curIdx * 2;
    let iRight = curIdx * 2 + 1;

    while (
      arr[iLeft] &&
      arr[iRight] &&
      (arr[curIdx] > arr[iLeft] || arr[curIdx] > arr[iRight])
    ) {
      if (arr[iLeft] < arr[iRight]) {
        [arr[curIdx], arr[iLeft]] = [arr[iLeft], arr[curIdx]];
        curIdx = iLeft;
      } else {
        [arr[curIdx], arr[iRight]] = [arr[iRight], arr[curIdx]];
        curIdx = iRight;
      }

      iLeft = curIdx * 2;
      iRight = curIdx * 2 + 1;
    }

    if (arr[iRight] === undefined && arr[iLeft] < arr[curIdx]) {
      [arr[curIdx], arr[iLeft]] = [arr[iLeft], arr[curIdx]];
    }
    return smallest;
  }

  sort() {
    let res = new Array();
    while (this.items.length > 1) {
      res.push(this.remove());
    }
    return res;
  }

  getMin() {
    return this.items[1] && this.items[1];
  }

  print() {
    console.log(this.items);
  }
}

let test = new MinHeap();
test.print();
test.insert(5);
test.insert(6);
test.insert(8);
test.insert(3);
console.log(test);
test.insert(2);
test.insert(7);
console.log(test);
test.insert(20);
test.insert(21);
console.log(test);

test.remove();
console.log(test);

test.remove();
console.log(test);
console.log(test.getMin());
console.log(test.sort());
console.log(test);
test.print();
