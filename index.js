const Node = (data, left, right) => {
  data = data || null;
  left = left || null;
  right = right || null;
  return {data, left, right}
}

const buildTree = (arr) => {
  arr.sort(function(a, b){return a-b}).filter((word, index, arr) => {
    if (arr[index + 1] == word) return arr.splice(index + 1, 1);
  });
  if (arr.length === 0) return null;
  const mid = Math.floor(arr.length / 2);
  const root = Node(arr[mid], buildTree(arr.slice(0, mid)), buildTree(arr.slice(mid + 1)));
  return root;
}

const Tree = (arr) => {
  this.root = buildTree(arr);

  const insert = (num, current = root) => {
    if (current == null) {
      current = Node(num);
      return current;
    }
    if (num < current.data) {
      current.left = insert(num, current.left);
    } else if (num > current.data) {
      current.right = insert(num, current.right);
    }
    return current
  }

  const findSucc = (current) => {
    let temp = current.data;
    while (current.left != null) {
      temp = current.left.data;
      current = current.left;
    }
    return temp
  }

  const deleteNode = (num, current = root) => {
    if (current == null) return current;
    if (current.data > num) {
      current.left = deleteNode(num, current.left);
    } else if (current.data < num) {
      current.right = deleteNode(num, current.right);
    } else {
      if (current.left == null) {
        return current.right;
      } else if (current.right == null) {
        return current.left;
      } 
      current.data = findSucc(current.right);
      current.right = deleteNode(num, current.right);
    }
    return current;
  }

  const find = (num, current = root) => {
    if (num === current.data) return current;
    else if (num > current.data) {
      current = find(num, current.right);
    } else {
      current = find(num, current.left);
    }
    return current;
  }

  const levelOrder = (arr = [], queue = [], current = root) => {
    if (current == null) return;
    arr.push(current.data);
    queue.push(current.left);
    queue.push(current.right);
    while (queue.length > 0) {
      current = queue[0];
      queue.shift();
      levelOrder(arr, queue, current);
    }
    return arr;
  }

  const inOrder = (arr = [], current = root) => {
    if (current === null) return;
    inOrder(arr, current.left);
    arr.push(current.data);
    inOrder(arr, current.right);
    return arr;
  }

  const preOrder = (arr = [], current = root) => {
    if (current === null) return;
    arr.push(current.data);
    preOrder(arr, current.left);
    preOrder(arr, current.right);
    return arr;
  }

  const postOrder = (arr = [], current = root) => {
    if (current === null) return;
    postOrder(arr, current.left);
    postOrder(arr, current.right);
    arr.push(current.data);
    return arr;
  }

  const height = (current = root) => {
    if (current === null) return 0;
    let lHeight = height(current.left);
    let rHeight = height(current.right);
    if (lHeight > rHeight) {
      return lHeight + 1;
    } else {
      return rHeight + 1;
    }
  }

  const depth = (node, current = root, depth = 0) => {
    if (current === null || node === null) return;
    if (node === current) return `Depth: ${depth}`;
    if (node.data < current.data) {
      return depth(node, current.left, depth += 1);
    } else {
      return depth(node, current.right, depth += 1)
    }
  }

  const isBalanced = (current = root) => {
    const lHeight = height(current.left);
    const rHeight = height(current.right);
    const diff = Math.abs(lHeight - rHeight);
    return diff < 2 ? 'true' : 'false';
  }

  const rebalance = () => {
    const arr = inOrder();
    return root = buildTree(arr);
  }

  return {root, insert, deleteNode, find, levelOrder, inOrder, preOrder, postOrder, height, depth, isBalanced, rebalance}
}


//const tree = Tree([26, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
//const tree = Tree(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'I', 'J', 'K']);
// const tree = Tree(['A', 'B', 'D', 'C', 'E', 'F', 'I', 'G', 'J', 'K']);
const array = [];
for (let i = 0; i < 12; i++) {
  array.push(Math.floor(Math.random() * 100));
}
const tree = Tree(array);
console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());
for (let i = 0; i < 5; i++) {
  const random = Math.floor((Math.random() + 1) * 100);
  tree.insert(random);
}
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());

