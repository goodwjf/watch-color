### 功能描述

通过检测 color.js 文件色值的变化动态生成SCSS色值变量


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
  ], // create bg.scss
  font: [
    '#eeeeee',
  ], // create font.scss
  border: [
    '#ffffff',
  ], // create border.scss
}

```
### 生成scss变量
```scss

// bg
$--bg-color-000: #000;

// border
$--border-color-000000: #000000;

// font
$--font-color-000099: #000099;

```
### 生成css变量
```css

:root { 
  --bg-color-000: #{$--bg-color-000}; 
}

```


