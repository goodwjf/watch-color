const fs = require('fs')
const path = require('path')

const prefix_config = {
  bg: '$--bg-color-',
  border: '$--border-color-',
  font: '$--font-color-'
}

function create(colors) {
  let Arr = []
  for (let key in prefix_config) {
    Arr.push(`// ${key}`)
    colors.forEach(color => {
      Arr.push(`${prefix_config[key]}${color.substr(1)}: ${color};`)
    })
  }
  return Arr.join('\n')
}

function run() {
  const root_path  = process.cwd()
  const { outputDir, watchFile } = require(root_path + '/package.json')
  const outputFile = path.resolve(outputDir + '/colors.scss')

  let colors = require(path.resolve(watchFile))
  colors = create(colors)
  fs.writeFileSync(outputFile, colors, 'utf-8')
}
 
run()