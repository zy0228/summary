const Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2
}

const initalizeColor = vertices => {
  const color = {}
  vertices.forEach(item => {
    color[item] = Colors.WHITE
  })

  return color
}

module.exports = {
  initalizeColor
}