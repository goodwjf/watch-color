### 功能描述

color.js 文件保存时自动检测color值变化，
根据依赖动态生成 SCSS | LESS | CSS color变量

### 安装依赖
```node

npm install watch-color --save-dev

```

### 配置 package.json
```json

"watchFile": "./colors/color.js",
"outputDir": "./colors", 
"scripts": {
  "watch": "watchColor"
}

```

### watchFile 文件格式
```javascript

module.exports = {
  bg: [
    '#00000f',
  ], // create bg.scss | bg.less 
  font: [
    '#eeeeee',
  ], // create font.scss | font.less
  border: [
    '#ffffff',
  ], // create border.scss | border.less
}

```
### 生成scss / css变量
```scss
// bg
$--bg-color-0000ff: #0000ff;

// css var 
:root { 
  --bg-color-0000ff: #{$--bg-color-0000ff}; 
}

```

### 生成less / css变量
```less

// bg
@--bg-color-0000ff: #0000ff;

// css var 
:root { 
  --bg-color-0000ff: ~"@{--bg-color-0000ff}"; 
}

```
