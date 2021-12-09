/*Binary Search Tree Node */
class BSTNode {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  //add method
  add(data) {
    //Really we should perform some validation on the data and make sure its an int
    //But not in this definition
    if (this.root === null) {
      this.root = new BSTNode(data);
      return;
    } else {
      const searchTree = function (node) {
        if (data < node.data) {
          if (node.left === null) {
            node.left = new BSTNode(data);
            return;
          } else {
            searchTree(node.left);
          }
        }
        if (data > node.data) {
          if (node.right === null) {
            node.right = new BSTNode(data);
            return;
          } else {
            searchTree(node.right);
          }
        }
        if (data === node.data) {
          return;
        }
      };

      searchTree(this.root);
    }
  }

  //findMin method
  findMin() {
    let node = this.root;
    if (node === null) {
      return null;
    }
    while (node) {
      if (node.left === null) {
        return node.data;
      } else {
        node = node.left;
      }
    }
  }

  //findMax method
  findMax() {
    let node = this.root;
    if (node === null) {
      return null;
    }
    while (node) {
      if (node.right === null) {
        return node.data;
      } else {
        node = node.right;
      }
    }
  }

  //find method
  find(data) {
    let node = this.root;
    while (node) {
      if (data === node.data) {
        return node;
      }
      if (data < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return null;
  }
  //remove method
  remove(data) {
    const removeNode = function (node, data) {
      if (node === null) {
        //Edge case where root non existant
        return null;
      }
      if (node.data === data) {
        //No children
        if (!node.right && !node.left) {
          return null;
        }
        //One child
        if (!node.right || !node.left) {
          return node.right || node.left;
        }
        //Two children and right node has left children
        let cur = node.right;
        while (cur.left) {
          cur = cur.left;
        }
        node.data = cur.data;
        node.right = removeNode(node.right, cur.data);
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
      } else {
        node.right = removeNode(node.right, data);
      }
      return node;
    };
    this.root = removeNode(this.root, data);
    return this.root;
  }

  //In order printing
  //[node.left, node, node.right]
  inOrder() {
    let vals = [];
    const inOrderRec = function (node) {
      if (!node) {
        return null;
      }
      node.left && inOrderRec(node.left);
      vals.push(node.data);
      node.right && inOrderRec(node.right);
    };
    inOrderRec(this.root);
    vals.filter((el) => {
      el != null;
    });
    return vals;
  }

  //preOrder printing
  //[node, node.left, node.right]
  preOrder() {
    let vals = [];
    const preOrderRec = function (node) {
      if (!node) {
        return null;
      }
      vals.push(node.data);
      node.left && preOrderRec(node.left);
      node.right && preOrderRec(node.right);
    };
    preOrderRec(this.root);
    vals.filter((el) => {
      el != null;
    });
    return vals;
  }

  //Post order printing
  //[node.left, node.right, node]
  postOrder() {
    let vals = [];
    const postOrderRec = function (node) {
      if (!node) {
        return null;
      }
      node.left && postOrderRec(node.left);
      node.right && postOrderRec(node.right);
      vals.push(node.data);
    };
    postOrderRec(this.root);
    vals.filter((el) => {
      el != null;
    });
    return vals;
  }

  //level order print
  levelOrder() {
    let vals = [];
    let i = 0;
    let cur = this.root;
    cur && vals.push(cur); //if cur is truthy, push to vals
    while (i < vals.length) {
      cur.left && vals.push(cur.left);
      cur.right && vals.push(cur.right);
      i++;
      cur = vals[i];
    }
    return vals.map((el) => {
      return el.data;
    });
  }

  //Is balanced
  isBalanced() {
    return !!this.#isBalancedRec(this.root);
  }

  //Calculate the height of the tree
  height() {
    return this.#heightRec(this.root);
  }

  //Helper functions
  //Height recursive function
  #heightRec(node) {
    if (!node) {
      return -1;
    } else {
      let maxL = 1 + this.#heightRec(node.left);
      let maxR = 1 + this.#heightRec(node.right);
      return Math.max(maxL, maxR);
    }
  }
  //Is balanced recursive function
  #isBalancedRec(node) {
    if (!node) {
      //no node is technically balanced
      return true;
    }

    return (
      Math.abs(this.#heightRec(node.left) - this.#heightRec(node.right) <= 1) &&
      this.#isBalancedRec(node.left) &&
      this.#isBalancedRec(node.right)
    );
  }
}
/*Test Cases*/
let myBST = new BST();
console.log(myBST.height());
myBST.add(17);
console.log(myBST.height());
myBST.add(15);
console.log(myBST.height());
myBST.add(14);
myBST.add(16);
myBST.add(13);
myBST.add(19);
myBST.add(18);
myBST.add(25);
myBST.add(24);
myBST.add(22);
console.log(myBST);
console.log(myBST.findMin());
console.log(myBST.findMax());
console.log(myBST.find(19));
//myBST.remove(19);
//myBST.remove(24);
//myBST.remove(25);
//myBST.remove(18);
//myBST.remove(13);

console.log(myBST);
console.log(myBST.height());
console.log(myBST.isBalanced());

console.log(myBST.inOrder());
console.log(myBST.preOrder());
console.log(myBST.postOrder());
console.log(myBST.levelOrder());
