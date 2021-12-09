/* Priority Queues */
/* Basically the same as queues except all items are passed in with a given priority
  - Items are passed in as an array with format [string: val, int: priority]
  - In this implementation lower numbers are of higher priority with 1 as the lowest
  and therefore closer up on the queue*/
function PriorityQueue() {
  collection = [];
  this.print = function () {
    console.log(collection);
  };

  //enqueue - pushes an item onto the end of the queue at its priority level
  this.enqueue = function (element) {
    let added = false;
    for (i = 0; i < collection.length; i++) {
      if (element[1] < collection[i][1]) {
        collection.splice(i, 0, element);
        added = true;
        break;
      }
    }
    if (!added) {
      collection.push(element);
    }
  };

  //dequeue - returns and removes the item at the front of the queue
  this.dequeue = function () {
    return collection.shift();
  };

  //front - view item at front of queue
  this.front = function () {
    return collection[0];
  };

  //size - returns the size of queue
  this.size = function () {
    return collection.length;
  };

  this.isEmpty = function () {
    return collection.length === 0;
  };
}
/*Priority Queue tests */
// var pq = new PriorityQueue();
// pq.enqueue(["jim", 2]);
// pq.enqueue(["tim", 3]);
// pq.enqueue(["whim", 2]);
// pq.enqueue(["JIMMY", 1]);
// pq.print();
