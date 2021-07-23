const fs = require('fs')
const path = require('path')

const newLine = '\r\n'

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
  let keyArr = []
  Arr.push(`// ${k}`)
  colorArr.forEach(color => {
    let scss_key = `${prefix_config[k]}${color.substr(1)}`
    Arr.push(`${scss_key}: ${color};`)
    keyArr.push(scss_key)
  })

  let result = Arr.join(newLine)
  result += (newLine + createCSS(keyArr))
  return result
}

// :root {
//  --bg-color-000: #{$--bg-color-000};
// }
function createCSS(Arr) {
  let result = `:root { ${newLine}`
  Arr.forEach(item => {
    result += `  ${item.substr(1)}: #{${item}}; ${newLine}`
  })
  return `${newLine}// css var ${newLine}${result}}`
}

function run(colors) {
  for (const k in colors) {
    const outputFile = path.resolve(outputDir + `/${k}.scss`)
    fs.writeFileSync(outputFile, create(k, colors[k]), 'utf-8')
  }
}

run(colors)