#!/usr/bin/env bash
cd build

./index.js rename '/Users/john/Desktop/node-project' -c -r -o 'model' -n '' -m 'js,ts'


./index.js rename '/Users/john/Desktop/node-project' -c -r -o 'model' -n '' -e 'map,min.js'


./index.js delete '/Users/john/Desktop/node-project' -r
