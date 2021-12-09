//Stack (Just use an array) in JS
// - O(n) search; O(n) space; O(1) Insertion; O(1) deletion;
function Stack() {
  this.length = 0;
  this.storage = {};

  //Push method
  this.push = function (el) {
    this.storage[this.length] = el;
    this.length++;
  };

  //Pop method
  this.pop = function () {
    if (this.length === 0) {
      return undefined;
    }

    this.length--;
    let el = this.storage[this.length];
    delete this.storage[this.length];
    return el;
  };

  //Peek method
  this.peek = function () {
    if (this.length === 0) {
      return undefined;
    }

    return this.storage[this.length - 1];
  };

  //Size method
  this.size = function () {
    return this.length;
  };
}
/*Test cases*/
// let stack = new Stack();
// console.log(stack.size());
// console.log(stack.push(123));
// console.log(stack.push("jimmy"));
// console.log(stack.length);
// console.log(stack.peek());
// console.log(stack.pop());
// console.log(stack.size());
// console.log(stack.pop());
// console.log(stack.peek());
// console.log(stack.pop());
// console.log(stack.size());
