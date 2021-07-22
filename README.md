
### 安装依赖
```

npm install watch-color --save-dev

```

### 配置 package.json
```

"watchFile": "./colors/color.js",
"outputDir": "./colors", 
"scripts": {
  "watch": "watchColor"
}

```

### watchFile 文件格式
```javascript

module.exports =  [
  '#000000',
  '#000033',
]

```