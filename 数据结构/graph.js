// ---图
// 图由两种元素组成
// G(graph) = V(vertex) + E(edge)
// V: 一组顶点
// E: 一组边，连接V中的顶点

// 表示图的方法有三种 邻接矩阵，邻接表，关联矩阵
// 用邻接表的方法实现图类

class Graph {
  constructor() {
    this.vertices = []           // 初始化一个空数组来储存所有顶点
    this.adlist = new Map()      // 创建一个字典来储存顶点连接的边
  }

  /**
   * 添加顶点
   * @param {*} v 
   */
  addVertex(v) {
    this.vertices.push(v)
    this.adlist.set(v, [])
  }

  /**
   * 联接边
   * @param {*} v 
   * @param {*} w 
   */
  addEdge(v, w) {
    this.adlist.get(v).push(w)
    this.adlist.get(w).push(v)
  }

  toString() {
    let ret = ''

    this.vertices.forEach((v) => {
      ret += `
      ${v} -> `

      let list = this.adlist.get(v)

      list.forEach((e) => {
        ret += `${e} `
      })
    });

    return ret
  }
}

let graphs = new Graph()
let vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

vertices.forEach(v => {
  graphs.addVertex(v)
})

graphs.addEdge('A', 'B')
graphs.addEdge('A', 'C')
graphs.addEdge('A', 'D')
graphs.addEdge('C', 'D')
graphs.addEdge('C', 'G')
graphs.addEdge('D', 'G')
graphs.addEdge('D', 'H')
graphs.addEdge('B', 'E')
graphs.addEdge('B', 'F')
graphs.addEdge('E', 'I')

console.log(graphs.toString())

/**
 * 会打印出如下的邻接表结构
 *    A -> B C D 
      B -> A E F 
      C -> A D G 
      D -> A C G H 
      E -> B I 
      F -> B 
      G -> C D 
      H -> D 
      I -> E 
 */