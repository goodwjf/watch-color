const fs = require('fs')
const path = require('path')

const newLine = '\r\n'
const var_config = {
  bg: '--bg-color-',
  border: '--border-color-',
  font: '--font-color-'
}

const root_path  = process.cwd()
const { outputDir, watchFile, devDependencies } = require(root_path + '/package.json')
let colors = require(path.resolve(watchFile))
let extension = 'scss'

// 类型   变量名   引用变量    css-value插值
// less  @name   @{name}   ~"@{--bg-color-111111}"
// scss  $name   $name     #{$--bg-color-111111}
function getType() {
  let config = {
    // [变量前缀,文件后缀]
    less: ['@', 'less'],
    sass: ['$', 'scss']
  }
  for (const key in devDependencies) {
     if(config[key]) {
        return config[key]
     }
  }
}

// 通过类型获取插值
function getVal(type, val) {
  const config =  {
    less: `~"@{${val.substr(1)}}"`,
    scss: `#{${val}}`
  }
  return config[type]
}

function create(k, colorArr) {
  let Arr = []
  let keyArr = []
  let type = getType()

  let prefix = type[0]
  extension = type[1]

  Arr.push(`// ${k}`)
  colorArr.forEach(color => {
    let name = `${prefix}${var_config[k]}${color.substr(1)}`
    Arr.push(`${name}: ${color};`)
    keyArr.push(name)
  })

  let result = Arr.join(newLine)
  result += (newLine + createCSS(keyArr))
  return result
}

// :root {
//  --bg-color-000: #{$--bg-color-000};
//  --bg-color-111: ~"@{--bg-color-111}"; 
// }
function createCSS(Arr) {
  let result = `:root { ${newLine}`
  Arr.forEach(name => {
    result += `  ${name.substr(1)}: ${getVal(extension, name)}; ${newLine}`
  })
  return `${newLine}// css var ${newLine}${result}}`
}

function run(colors) {
  for (const k in colors) {
    let result = create(k, colors[k])
    const outputFile = path.resolve(outputDir + `/${k}.${extension}`)
    fs.writeFileSync(outputFile, result, 'utf-8')
  }
}

run(colors)