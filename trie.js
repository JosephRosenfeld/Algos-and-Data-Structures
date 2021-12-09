//Assumption is that all trienodes have char of null or of a-z lowercase

class TrieNode {
  constructor(char = null, alphSize = 26) {
    this.char = char;
    this.alphSize = 26;
    this.children = new Array(alphSize);
    for (let i = 0; i < this.children.length; i++) {
      this.children[i] = null;
    }
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  //Function to insert a key in the Trie
  //Takes O(n) time complexity (where n is the length of the key)
  insert(key) {
    //edge case of no key or null key
    if (!key) {
      return undefined;
    }
    key = key.toLowerCase();
    let cur = this.root;
    let idx;

    //loop thru chars in key (levels in the trie)
    for (let level = 0; level < key.length; level++) {
      idx = this._getIndex(key[level]);
      if (cur.children[idx] == null) {
        cur.children[idx] = new TrieNode(key[level]);
      }
      cur = cur.children[idx];
    }
    //Mark the end character as leaf node
    cur.isEnd = true;
  }

  //search
  search(key) {
    //edge case of no key or null key
    if (!key) {
      return undefined;
    }
    key = key.toLowerCase();
    let cur = this.root;
    let idx = 0;
    for (let level = 0; level < key.length; level++) {
      idx = this._getIndex(key[level]);
      if (cur.children[idx] == null) {
        return false;
      }
      cur = cur.children[idx];
    }
    return cur.isEnd;
  }

  //print
  print() {
    let words = [];
    const _printRec = function (node, str) {
      str = node.char ? str + node.char : str + "";
      node.isEnd && words.push(str);
      for (let i = 0; i < node.children.length; i++) {
        if (node.children[i]) {
          _printRec(node.children[i], str);
        }
      }
    };
    _printRec(this.root, "");
    return console.log(words);
  }

  //print recursive helper function

  //converts the character to an
  _getIndex(c) {
    return c.charCodeAt(0) - "a".charCodeAt(0);
  }
}

let jim = new Trie();
console.log(jim);
jim.insert("test");
jim.insert("testing");
jim.insert("a");
jim.insert("all");
console.log(jim.search("all"));
console.log(jim.search("jimmy"));
console.log(jim.search("testing"));
console.log(jim.search("dkdkdk"));

console.log(jim);
jim.print();
