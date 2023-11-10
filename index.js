const Node = (data, left, right) => {
  data = data || null;
  left = left || null;
  right = right || null;
  return {data, left, right}
}

const Tree = (arr) => {
  const buildTree = (arr) => {
    arr.sort(function(a, b){return a-b}).filter((word, index, arr) => {
      if (arr[index + 1] == word) return arr.splice(index + 1, 1);
    });
    if (arr.length === 0) return null;
    const mid = Math.floor(arr.length / 2);
    const root = Node(arr[mid], buildTree(arr.slice(0, mid)), buildTree(arr.slice(mid + 1)));
    return root;
  }

  const insert = (num) => {
    let current = root;
    insertRec(num, current);
  }

  const insertRec = (num, current) => {
    if (current == null) {
      const node = Node(num);
      current = node;
      return node;
    }
    if (num < current.data) {
      current = insertRec(num, current.left);
    } else if (num > current.data) {
      current = insertRec(num, current.right);
    }
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

  const root = buildTree(arr);
  return {root, insert, deleteNode, find}
}


const array = Tree([26, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

