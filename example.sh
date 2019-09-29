#!/usr/bin/env bash
cd build

# In the folder "node-project", replace in all the fine's name the keyword "model" by
# a empty string. Only match js and ts file
./index.js rename '/Users/john/Desktop/node-project' -c -r -o 'model' -n '' -m 'js,ts'

# In the folder "node-project", replace in all the fine's name the keyword "model" by
# a empty string. Only exclude files with extension map and min.js file
./index.js rename '/Users/john/Desktop/node-project' -c -r -o 'model' -n '' -e 'map,min.js'

# Delete node-project recursively
./index.js delete '/Users/john/Desktop/node-project' -r

# Get the size of all zip file in the folder "node-project "recursively
 ./index.js size '/Users/john/Desktop/node-project' standard -r -m zip

# Get the size of the folder "node-project" recursively but exclude zip and mp4 file
 ./index.js size '/Users/john/Desktop/node-project' -r -e zip,mp4

# Get the size of the folder "node-project" recursively with commercial unit
 ./index.js size '/Users/john/Desktop/node-project' commercial -r
