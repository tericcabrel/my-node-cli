#my-node-cli
<br>
I experimented Node.js CLI by creating a CLI with three features:

- **Find the file's name in a directory that match the keyword and
  replace with a new one**
  
- **Get size of a directory**

- **Delete a directory**

## Installation
```bash
git clone https://github.com/tericcabrel/my-node-cli.git
cd my-node-cli
yarn
tsc
cd build
chmod +x index.js
```
After These steps, a directory named "build" will be created 

## Example
In the folder "node-project", replace all the file's name with the keyword "model" by
a empty string. Only match js and ts file, case sensitive matter and apply the same rule 
.in sub folder
```bash
./index.js rename '/Users/john/Desktop/node-project' -c -r -o 'model' -n '' -m 'js,ts'
```

In the folder "node-project", replace in all the fine's name the keyword "model" by
a empty string. Only exclude files with extension map and min.js file
```bash
./index.js rename '/Users/john/Desktop/node-project' -c -r -o 'model' -n '' -e 'map,min.js'
```

Delete node-project recursively
```bash
./index.js delete '/Users/john/Desktop/node-project' -r
```

Get the size of all zip file in the folder "node-project "recursively
```bash
./index.js size '/Users/john/Desktop/node-project' standard -r -m zip
```

Get the size of the folder "node-project" recursively but exclude zip and mp4 file
```bash
./index.js size '/Users/john/Desktop/node-project' -r -e zip,mp4
```

Get the size of the folder "node-project" recursively with commercial unit
```bash
./index.js size '/Users/john/Desktop/node-project' commercial -r
```

View available command:
```bash
./index.js --help
```
