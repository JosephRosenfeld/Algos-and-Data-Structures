/* Queues */
/* There are two ways you can do it while utilizing an array:
  - You can add items to the beginning and then take them off at the end
  - You can add items to the end of the array and then take them off ath the beginning
In the below implementation, the latter option is used */
function Queue() {
  collection = [];
  this.print = function () {
    console.log(collection);
  };

  //enqueue - pushes an item onto the end of the queue
  this.enqueue = function (element) {
    collection.push(element);
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

/* Queue test cases 
var q = new Queue();
q.enqueue("a");
q.enqueue("b");
q.enqueue("c");
q.print();
console.log(q.front());
q.dequeue();
q.print();
console.log(q.size());
q.dequeue();
console.log(q.isEmpty());
q.dequeue();
q.print();
console.log(q.isEmpty()); */
