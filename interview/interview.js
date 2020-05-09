/**
 * 实现冒泡排序
 * 虽然大学学的是软件技术 但是当时是死都不带学习的，
 * 冒泡都都写不出来 大受打击
 */
let arr = [1, 2, 53, 1413, 9, 9, 1, 23, 32, 21, 100]


function bubbleSort(arr) {
  if (!arr) {
    throw new TypeError(`arguments is not found`)
  }

  let i = arr.length
  while (i--) {
    for (let j = 0; j < i; j++) {
      let cur = arr[j]
      let next = arr[j + 1]

      if (cur > next) {
        arr[j + 1] = cur
        arr[j] = next
      }
    }
  }
}

bubbleSort(arr)
// console.log(arr)

// [1, 1, 2,  9,9,  21,  3, 32,53, 100, 1413]

// ==================================================

// 使用递归遍历输出tree结构数据下所有的name
// 我对于递归的理解和应用不够深刻， 这点应该多补补多写写

let tree = [
  {
    name: 'a',
    children: []
  },
  {
    name: 'b',
    children: [
      {
        name: 'b1',
        children: [
          {
            name: 'b1-1',
            children: []
          }
        ]
      },
      {
        name: 'b2',
        children: []
      }
    ]
  },
  {
    name: 'c',
    children: [
      {
        name: 'c1',
        children: [
          {
            name: 'c1-1',
            children: []
          }
        ]
      }
    ]
  }
]

let ret = []

function foreachTreeName(tree) {
  if (!tree.length) return

  tree.forEach(child => {
    ret.push(child.name)
    foreachTreeName(child.children)
  })

  return ret
}

console.log(foreachTreeName(tree))