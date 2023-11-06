/**
* This script removes the examples from the entry.json file, which attempts to make the file smaller.
 */


const fs = require("fs");

fs.readFile("../assets/entry.json", (err, file) => {
  if (err) {
    console.log(err)
    throw err;
  }

  const output = []
  console.log('file', file)
  const data = JSON.parse(file);

  console.log('data', data)

  data.forEach((item) => {
    const { korean, ...rest } = item
    const { word, definition, ...other } = korean // remove the examples from the list lookup file

    const entry = {
      korean: {
        word,
        definition
      },
      ...rest
    }

    output.push(entry)
  })

  fs.writeFile("../assets/slim-entry.json", JSON.stringify(output), (err) => {
    if (err) {
      console.log(err)
      throw err;
    }
  })

})
