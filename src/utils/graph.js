class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.currentX = 0;
    this.currentY = 40;
    this.lastX = 0;
    this.lastY = 0;
    this.tags = { isNew: true, isCurrent: false, isVisited: false };
    this.leftLine = { isCurrent: false, isVisited: false };
    this.rightLine = { isCurrent: false, isVisited: false };
  }
}

function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  let props = Object.getOwnPropertyDescriptors(obj);
  for (let prop in props) {
    props[prop].value = deepClone(props[prop].value);
  }
  return Object.create(Object.getPrototypeOf(obj), props);
}

class BST {
  constructor(data = 50, width = 1000, height = 600) {
    this.root = new Node(data); // will be null at start
    this.root.currentX = this.root.lastX = width / 2;
    this.width = width;
    this.height = height;
    this.snapshots = [this.cloneRoot()];
    this.log = [];
    this.calculate();
  }

  insert(data) {
    if (!this.root) return (this.root = new Node(data));
    this.clean();
    this.calculate();
    this._insert(data, this.root);
  }

  _insert(data, root) {
    if (data > root.data) {
      this.setRightAnimation(root);
      this.log.push(`data: ${data} > node: ${root.data}, идем вправо`);
      if (root.right === null) {
        root.right = new Node(data);
        this.calculate();
        root.right.tags.isCurrent = true;
        this.snapshots.push(this.cloneRoot());
        this.log.push(`найдено место для вставки data: ${data}`);
        root.rightLine.isVisited = true;
        this.snapshots.push(this.cloneRoot());
        this.log.push(`Вставлено data: ${data}`);
        return;
      }
      return this._insert(data, root.right);
    } else {
      this.setLeftAnimation(root);
      this.log.push(`data: ${data} > node: ${root.data}, идем влево`);
      if (root.left === null) {
        root.left = new Node(data);
        this.calculate();
        root.left.tags.isCurrent = true;
        root.leftLine.isCurrent = true;
        this.snapshots.push(this.cloneRoot());
        this.log.push(`найдено место для вставки data: ${data}`);
        root.leftLine.isVisited = true;
        root.leftLine.isCurrent = false;
        this.snapshots.push(this.cloneRoot());
        this.log.push(`Вставлено data: ${data}`);
        return;
      }
      return this._insert(data, root.left);
    }
  }

  remove(data) {
    this.clean();
    this.root = this._remove(data, this.root);
    this.calculate();
    this.snapshots.push(this.cloneRoot());
    this.log.push(`Удалено значение data: ${data}`);
    this.calculate();
  }

  _remove(data, root) {
    if (root) {
      if (data < root.data) {
        this.setLeftAnimation(root);
        this.log.push(`${data} < ${root.data}, идем влево`);
        root.left = this._remove(data, root.left);
      } else if (data > root.data) {
        this.setRightAnimation(root);
        this.log.push(`${data} > ${root.data}, идем вправо`);
        root.right = this._remove(data, root.right);
      } else if (root.left && root.right) {
        root = Object.assign(Object.create(Node), root);
        const minNode = this.findMinNode(root.right);
        root.data = minNode.data;
        root.currentX = minNode.currentX;
        root.currentY = minNode.currentY;
        root.lastX = minNode.lastX;
        root.lastY = minNode.lastY;
        this.setRightAnimation(root);
        this.log.push(
          `Меняем найденное значение data: ${data}, на его замену node: ${root.data}`
        );
        root.right = this._remove(root.data, root.right);
        this.calculate();
      } else {
        root = root.left || root.right;
      }
      return root;
    }
    this.log.push(`${data} не найдено в дереве`);
  }

  findMinNode(root) {
    if (root.left) {
      return this.findMinNode(root.left);
    }
    return root;
  }

  calculate() {
    return this._calculate(this.root, this.width, 40, 0);
  }

  _calculate(root, width, height, offset) {
    root.lastX = root.currentX;
    root.lastY = root.currentY;
    root.currentX = width / 2 + offset;
    root.currentY = height;
    if (root.tags.isNew) {
      root.lastX = root.currentX;
      root.lastY = root.currentY;
      root.tags.isNew = false;
    }
    if (root.left) {
      this._calculate(root.left, width / 2, height + 40, offset);
    }
    if (root.right) {
      this._calculate(root.right, width / 2, height + 40, offset + width / 2);
    }
  }

  inOrder() {
    return this._inOrder(this.root);
  }

  _inOrder(root) {
    if (root === null) return [];
    let s = [];
    let result = [];
    let current = root;
    while (current !== null || s.length > 0) {
      while (current !== null) {
        s.push(current);
        current = current.left;
      }
      current = s.pop();
      result.push(current);
      current = current.right;
    }
    return result;
  }

  cloneRoot() {
    return deepClone(this.root);
  }

  clone() {
    return deepClone(this);
  }

  clean() {
    for (const node of this.inOrder()) {
      node.tags = { isNew: false, isCurrent: false, isVisited: false };
      node.rightLine = { isCurrent: false, isVisited: false };
      node.leftLine = { isCurrent: false, isVisited: false };
    }
    this.snapshots = [];
    this.log = [];
  }
  setLeftAnimation(root) {
    root.tags.isCurrent = true;
    root.leftLine.isCurrent = true;
    this.snapshots.push(this.cloneRoot());
    root.tags.isCurrent = false;
    root.tags.isVisited = true;
    root.leftLine.isCurrent = false;
    root.leftLine.isVisited = true;
  }
  setRightAnimation(root) {
    root.tags.isCurrent = true;
    root.rightLine.isCurrent = true;
    this.snapshots.push(this.cloneRoot());
    root.tags.isCurrent = false;
    root.tags.isVisited = true;
    root.rightLine.isCurrent = false;
    root.rightLine.isVisited = true;
  }
  search(data) {
    this.clean();
    this._search(this.root, data);
  }
  _search(root, data) {
    if (!root) {
      this.log.push(`data: ${data}, не найдено в дереве`);
      this.snapshots.push(this.cloneRoot());
      return;
    }
    if (data === root.data) {
      this.log.push(`data: ${data} == node: ${root.data}, найдено в дереве`);
      root.tags.isCurrent = true;
      this.snapshots.push(this.cloneRoot());
      return;
    }
    if (data < root.data) {
      this.log.push(`data: ${data} < node: ${root.data}, идем влево`);
      this.setLeftAnimation(root);
      this._search(root.left, data);
    } else {
      this.log.push(`data: ${data} > node: ${root.data}, идем вправо`);
      this.setRightAnimation(root);
      this._search(root.right, data);
    }
  }
}
export default BST;
