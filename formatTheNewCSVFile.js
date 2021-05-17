const fs = require("fs");
const path = require("path");

module.exports = function (i) {
  console.log("formatTheNewCSVFile");
  const textPath = path.resolve(__dirname, "docs", `output${i}.csv`);

  fs.readFile(textPath, "utf-8", (err, data) => {
    if (err) throw err;

    let newValue = data.replace(/;/g, " ");

    fs.writeFile(textPath, newValue, (err) => {
      if (err) throw err;
    });
  });
};
