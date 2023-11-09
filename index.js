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

  const root = buildTree(arr);
  return {root, insert}
}


const array = Tree([26, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

