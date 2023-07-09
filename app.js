const categorizeItemNat = require('./natural')
// const categorizeItemFib = require('./fibers')


const fs = require('fs');

function readAndCategorize(filename) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    const lines = data.split('\n');
    lines.forEach((line, index) => {
        if(!line) return 
        // // const fiberCat = categorizeItemFib(line)
        const naturalCat = categorizeItemNat(line) 
        console.log(`Line ${index + 1}: ${line}`);
        console.log(`\t\tcategory: `, naturalCat)
        // //   console.log(`\t\tfiber  : `, fiberCat)
        console.log()
    });
  });
}

// Example usage
const filename = 'items.txt';
readAndCategorize(filename);
