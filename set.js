/* Set (Just use ES6 set) but there are a few things missing:
  - union method (returns the union of two sets)
  - difference method (returns the set of the difference between two sets)
  - intersection method (returns a set of the els that are in both sets)
  - subset method (returns true if subset A is a subset of subset B) (setA.subset(setB))
  - Also ES6 Set often times returns an iterator, not just a plain obj

  Sets are basically arrays (unordered and no key values) but all el's are unique
  Also you don't access the elements with an index.
*/
function Set() {
  this.storage = [];

  //has method
  this.has = function (el) {
    return this.storage.indexOf(el) !== -1;
  };

  //add method
  this.add = function (el) {
    if (!this.has(el)) {
      this.storage.push(el);
      return true;
    }
    return false;
  };

  //remove method (in ES6 this is called delete)
  this.remove = function (el) {
    if (this.has(el)) {
      let i = this.storage.indexOf(el);
      this.storage.splice(i, 1);
      return true;
    }
    return false;
  };

  //size method (In ES6 this is a property not a function)
  this.size = function () {
    return this.storage.length;
  };

  //values method
  this.values = function () {
    return this.storage;
  };

  //union method (returns the union of two sets (as a new set))
  this.union = function (otherSet) {
    var unionSet = new Set();
    var firstSet = this.values();
    var secondSet = otherSet.values();
    firstSet.forEach(function (el) {
      unionSet.add(el);
    });
    secondSet.forEach(function (el) {
      unionSet.add(el);
    });
    return unionSet;
  };

  //intersection method (returns new set of the overlapping items between both sets)
  this.intersection = function (otherSet) {
    var intersectionSet = new Set();
    var firstSet = this.values();
    firstSet.forEach(function (el) {
      if (otherSet.has(el)) {
        intersectionSet.add(el);
      }
    });
    return intersectionSet;
  };

  //diference method (returns a new set that contains items that DONT overlap between both sets)
  this.difference = function (otherSet) {
    var differenceSet = new Set();
    var curSet = this;
    var firstSet = this.values();
    var secondSet = otherSet.values();
    firstSet.forEach(function (el) {
      if (!otherSet.has(el)) {
        differenceSet.add(el);
      }
    });
    secondSet.forEach(function (el) {
      if (!this.has(el)) {
        differenceSet.add(el);
      }
    }, this);
    return differenceSet;
  };

  //subset method returns true if the main set is a subset of the param set
  this.subset = function (otherSet) {
    var firstSet = this.values();
    return firstSet.every(function (el) {
      return otherSet.has(el);
    });
  };
}
/*Test Set Cases*/
let meep = new Set();
meep.add("himm");
let jim = new Set();
jim.add("reeee");
let tim = meep.union(jim);
console.log(tim.values());
console.log(tim.remove("reeee"));
console.log(tim.values());
console.log(tim.size());
meep.add("jimmy");
meep.add("timmy");
jim.add("jimmy");
jim.add("timmy");
let whim = meep.union(jim);
console.log(meep.values());
console.log(whim.values());
console.log(meep.intersection(jim).values());
console.log("meep", meep.values());
console.log("jim", jim.values());
console.log(meep.difference(jim).values());
console.log(meep.subset(jim));
let jeep = new Set();
jeep.add("jimmy");
console.log(jeep.subset(meep));
