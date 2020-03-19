/**
 * 创建一个节点类
 */
class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

/**
 * 创建一个构造函数Tree
 */
function Tree() {
  // 根节点初始为null
  let root = null
  
  /**
   * 插入节点
   * @param {*} node 
   */
  this.insert = function (node) {
    let newNode = new Node(node)

    if (root === null) {
      root = newNode
    } else {
      insertNode(root, newNode)
    }
  }

  this.min = function() {
    return minNode(root)
  }

  /**
   * 删除节点
   * @param {*} node 
   */
  this.remove = function(node) {
    return removeNode(root, node)
  }

  /**
   * 便立节点
   * @param {*} node 
   */
  this.traverse = function(callback) {
    traverse(root, callback)
  }

  /**
   * 获取根节点
   */
  this.getRoot = function() {
    return root
  }

  /**
   * 插入节点函数
   * @param {*} node 
   * @param {*} newNode 
   */
  function insertNode(node, newNode) {
    if (newNode.value > node.value) {
      if (node.right === null) {
        node.right = newNode
      } else {
        insertNode(node.right, newNode)
      }
    } else if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode
      } else {
        insertNode(node.left, newNode)
      }
    }
  }

  /**
   * 遍历函数
   * @param {Class Node} root 
   * @param {function} callback 
   */
  function traverse(node, callback) {
    if (node === null) return
    traverse(node.left, callback)
    traverse(node.right, callback)
    callback(node.value)
  }

  /**
   * 获取最小节点
   * @param {*} node 
   */
  function minNode(node) {
    if (node === null) return null
    
    while(node && node.left) {
      node = node.left
    }

    return node
  }

  /**
   * 删除替换节点
   * @param {*} node 
   * @param {*} value 
   */
  function removeNode(node, value) {
    if (node === null) return node
    
    if (value > node.value) {
      node.right = removeNode(node.right, value)
      return node
      // 向右查找
    } else if (value < node.value) {
      node.left = removeNode(node.left, value)
      return node
      // 向左查找
    } else {
      // 如果满足第一种条件 尾部节点
      if (node.left === null && node.right === null) {
        node = null
        return node
      }
  
      // 第二种情况 有一个子节点
      if (!node.left && node.right) {
        // 如果左边为null
        node = node.right
        return node
      } else if (node.left && !node.right) {
        // 如果右边为null
        node = node.left
        return node
      }
      
      //  第三种情况 有两个子节点
      // 先查找到右侧最小子节点
      let aux = minNode(node.right)
      // 将当前节点的value设置为右侧最小子节点value
      node.value = aux.value
      // 之后将最小子节点移除，然后将重新构建的右侧树 重新插入到右侧
      node.right = removeNode(node.right, aux.value)
      return node
    }
  }
}

let t = new Tree()

t.insert(8)
t.insert(3)
t.insert(2)
t.insert(6)
t.insert(7)
t.insert(5)
t.remove(3)

