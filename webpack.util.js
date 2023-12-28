const path = require('path');
const fs = require('fs');

function getScssFiles(directoryPath) {
  try {
    const files = fs.readdirSync(directoryPath);
    const scssFiles = files.filter(file => {
      return path.extname(file) === '.scss' && !file.startsWith('_');
    });
    const scssFilePaths = scssFiles.map(file => path.join(directoryPath, file));
    return scssFilePaths;
  } catch (error) {
    console.error('Error reading SCSS files:', error.message);
    return [];
  }
}

const scssDirectory = path.join(__dirname, 'src/scss');
const scssFiles = getScssFiles(scssDirectory);

console.log('scssFiles:', scssFiles);

// Create an entry point for each SCSS file
const scssEntryPoints = {};
scssFiles.forEach(file => {
  const entryName = path.basename(file, '.scss');
  scssEntryPoints[entryName] = file;
});

// ================== script Util ==============================

// Function to get JS files in a directory
function getJsFiles(directoryPath) {
    try {
        const files = fs.readdirSync(directoryPath);
        const jsFiles = files
        .filter(file => path.extname(file) === '.js')
        .map(file => path.join(directoryPath, file));
        return jsFiles;
    } catch (error) {
        console.error('Error reading JS files:', error.message);
        return [];
    }
}

// Directory containing JS files
const jsDirectory = path.join(__dirname, 'src/script');
const jsFiles = getJsFiles(jsDirectory);

// Create an entry point for each JS file
const jsEntryPoints = {};
jsFiles.forEach(file => {
  const entryName = path.basename(file, '.js');
  jsEntryPoints[entryName] = file;
});

console.log("jsEntryPoints:", jsEntryPoints);


module.exports = {
    scssEntryPoints,
    jsEntryPoints
}