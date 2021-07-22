#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec;
const root_path  = process.cwd()
const { watchFile } = require(root_path + '/package.json')
const dir = path.resolve(watchFile)

fs.watch(dir, (event, filename) => {
  if (event === "change") {
    console.log(`${filename} file Changed`);
    let runFilePath = path.resolve(__dirname, '../src/index.js')
    const cmdStr = 'node '+ runFilePath;
    exec(cmdStr, (err, stdout, stderr) => {
        if (err){
            console.log(err);
            console.warn(new Date(),'watch ' + runFilePath + ' color execution failed');
        } else {
            console.log(stdout);
            console.warn(new Date(),'watch ' + runFilePath + ' color execution succeed');
        }
    });
  }
});
