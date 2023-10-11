const fs = require("fs");
const entries = require("../assets/entry.json");

const itemsById = entries.reduce((acc, item) => {
    const {_id, ...rest} = item
  acc[item._id.$oid] = rest;
  return acc;
}, {});

fs.writeFile("entries-by-id.json", JSON.stringify(itemsById), (err) => {
  if (err) {
    console.error(err);
    return;
  }
  //file written successfully
});
