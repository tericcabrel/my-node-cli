#!/usr/bin/env bash
cd build

./index.js rename '/Users/john/Desktop/node-project' -c -r -o 'model' -n '' -m 'js,ts'


./index.js rename '/Users/john/Desktop/node-project' -c -r -o 'model' -n '' -e 'map,min.js'


./index.js delete '/Users/john/Desktop/node-project' -r


 ./index.js size '/Users/john/Desktop/node-project' standard -r -m zip

 ./index.js size '/Users/john/Desktop/node-project' -r -e zip,mp4

 ./index.js size '/Users/john/Desktop/node-project' commercial -r
