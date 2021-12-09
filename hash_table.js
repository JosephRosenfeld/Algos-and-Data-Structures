//Arbitrary hash function thats pretty common. Will help spread out
//the keys in the table. Adding in primes can help spread out values.
//Goal is to avoid collisions

class HashTable {
  constructor(length = 127) {
    this.table = new Array(length);
    this.size = 0;
    this.loadFactor = 0;
  }

  print() {
    console.log(this.table);
  }

  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.table.length;
  }

  _resize() {
    const newTable = new Array(this.table.length * 2);
    this.table.forEach((bucket) => {
      bucket.forEach(([key, val]) => {
        let idx = this._hash(key, newTable.length);
        if (!newTable[idx]) {
          newTable[idx] = [[key, val]];
        } else {
          for (let i = 0; i < newTable[idx].length; i++) {
            if (newTable[idx][i][0] === key) {
              newTable[idx][i][1] = val;
              return;
            }
          }
          newTable[idx].push([key, val]);
        }
      });
    });
    this.table = newTable;
  }

  setItem(key, val) {
    const idx = this._hash(key);
    if (!this.table[idx]) {
      this.table[idx] = [[key, val]];
    } else {
      for (let i = 0; i < this.table[idx].length; i++) {
        if (this.table[idx][i][0] === key) {
          this.table[idx][i][1] = val;
          return;
        }
      }
      this.table[idx].push([key, val]);
    }
    this.size++;
    this.loadFactor = this.size / this.table.length;
    if (this.loadFactor > 0.8) {
      this._resize();
    }
  }

  getItem(key) {
    const idx = this._hash(key);
    if (this.table[idx]) {
      let keyVal = this.table[idx].find((x) => x[0] == key);
      return keyVal ? keyVal[0] : undefined;
    } else {
      return undefined;
    }
  }

  remove(key) {
    const idx = this._hash(key);
    if (this.table[idx]) {
      for (let i = 0; i < this.table[idx].length; i++) {
        if (this.table[idx][i][0] == key) {
          this.table[idx].splice(i, 1);
          this.size--;
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }
}

//Testing
const myTable = new HashTable(3);
//console.log(myTable.size);
myTable.setItem("firstName", "jimmy");
myTable.setItem("lastName", "shimmy");
console.log(myTable.table.length);

myTable.setItem("dob", "1/2/3");
console.log(myTable.table.length);

myTable.setItem("age", "23");
myTable.setItem("interests", "rock collecting");
myTable.setItem("test", "whip");
console.log(myTable.table.length);
console.log(myTable.getItem("firstName"));
console.log(myTable.getItem("age"));
console.log(myTable.getItem("dob"));
console.log(myTable.remove("dob"));
//console.log(myTable.table);
//console.log(myTable.getItem("dob"));
