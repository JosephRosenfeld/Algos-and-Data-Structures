//trees are a form of graphs. Graphs are made of nodes and adjacency lists.
//Graphs can either be directed (each relation goes one way) or undirected (each
//relation goes both ways)
//Graphs can store the relationships between nodes in different ways. In this one
//We will create an adjacency list (goes on the graph class and no need for a node class)
//This implementation won't handle repeat nodes, aka just returns undefined if you try and
//add a val thats already there

//this implementation will aslo be undirected

//Tbh might not be the best implementation, if we're really thinking in OOP terms, shouldn't
//a node be an object and have its own list of its relationships, but oh well

class Graph {
  constructor() {
    this.adjList = new Map();
  }

  //addVertex
  addVertex(v) {
    if (!this.adjList.has(v)) {
      this.adjList.set(v, []);
    } else {
      return undefined;
    }
  }

  //addEdge
  addEdge(src, dest) {
    //if these nodes don't exist add them
    if (!this.adjList.has(src)) {
      this.addVertex(src);
    }
    if (!this.adjList.has(dest)) {
      this.addVertex(dest);
    }
    //set undirected relationship
    this.adjList.get(src).push(dest);
    this.adjList.get(dest).push(src);
  }

  //print
  print() {
    var keys = this.adjList.keys();

    //iterate over keys
    for (var key of keys) {
      let str = ``;
      str += `${key} -> ${this.adjList.get(key).join(", ")}`;
      console.log(str);
      //console.log(str);
    }
  }

  //BFS, doesn't really make much sense here since we can just access the keys of the
  //graph but here it is from freecodecamp.org
  bfs(root) {
    if (!this.adjList.has(root)) {
      return undefined;
    }
    const q = [root];
    const res = [];
    const visited = new Set();
    visited.add(root);
    let cur;
    while (q.length > 0) {
      cur = q.shift();
      res.push(cur);
      this.adjList.get(cur).forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          q.push(neighbor);
        }
      });
    }
    return res;
  }

  //This will do dfs on the first relationship added
  dfsRec(root) {
    if (!this.adjList.has(root)) {
      return undefined;
    }
    let res = [];
    let visited = new Set();
    const adjList = this.adjList;
    //arrow function so 'this' is preserved
    const dfs = (v) => {
      visited.add(v);
      res.push(v);
      this.adjList.get(v).forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      });
    };
    dfs(root);
    return res;
  }

  //This will do dfs on the last relationship added
  dfsIterative(root) {
    //root exists?
    if (!this.adjList.has(root)) {
      return undefined;
    }
    const res = [];
    const stack = [root];
    const visited = new Set();
    let v = root;
    while (stack.length > 0) {
      v = stack.pop();
      if (visited.has(v)) {
        continue;
      }
      visited.add(v);
      res.push(v);
      this.adjList.get(v).forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      });
    }
    return res;
  }
}

let g = new Graph();

g.addVertex(0);
g.addVertex(1);
g.addVertex(2);
g.addEdge(8, 0);
g.addEdge(10, 1);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(2, 1);
g.addEdge(5, 6);
g.addEdge(4, 2);
g.addEdge(5, 4);
g.addEdge(6, 1);

g.print();

console.log(g.dfsIterative(0));
console.log(g.dfsRec(0));
