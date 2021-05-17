const axios = require("axios");
const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

// const formatTheNewCSVFile = require("./formatTheNewCSVFile");

module.exports = function () {
  console.log("scheduleDataCovidCSV");
  let i = 0;
  cron.schedule("* * * * * *", () => {
    console.log(`running a task every minute${i}`);
    async function downloadCsv() {
      const url =
        "https://static.data.gouv.fr/resources/taux-dincidence-de-lepidemie-de-covid-19/20210517-190915/sp-pe-tb-quot-dep-2021-05-17-19h09.csv";

      const csvPath = path.resolve(__dirname, "docs", `output${i}.csv`);

      const writer = fs.createWriteStream(csvPath);

      const response = await axios({
        url: url,
        method: "GET",
        responseType: "stream",
      });

      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });
    }
    // downloadCsv();

    // remove the character ";" by empty character " "
    // formatTheNewCSVFile(i);
    i++;
  });
};
