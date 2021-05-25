const fs = require("fs");
const path = require("path");

module.exports = async function () {
  console.log("formatTheNewCSVFile");
  const textPath = path.resolve(__dirname, "docs", "output.csv");

  return new Promise(function (resolve, reject) {
    fs.readFile(textPath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let newValue = data.replace(/;/g, ",");
        fs.writeFile(textPath, newValue, (err) => {
          if (err) reject(err);
          resolve("finish");
        });
      }
    });
  });
};
