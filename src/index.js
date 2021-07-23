const fs = require('fs')
const path = require('path')

const prefix_config = {
  bg: '$--bg-color-',
  border: '$--border-color-',
  font: '$--font-color-'
}

const root_path  = process.cwd()
const { outputDir, watchFile } = require(root_path + '/package.json')
let colors = require(path.resolve(watchFile))

function create(k, colorArr) {
  let Arr = []
  Arr.push(`// ${k}`)
  colorArr.forEach(color => {
    Arr.push(`${prefix_config[k]}${color.substr(1)}: ${color};`)
  })
  return Arr.join('\n')
}

function run(colors) {
  for (const k in colors) {
    const outputFile = path.resolve(outputDir + `/${k}.scss`)
    fs.writeFileSync(outputFile, create(k, colors[k]), 'utf-8')
  }
}

run(colors)