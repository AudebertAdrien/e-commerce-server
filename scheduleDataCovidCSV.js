const axios = require("axios");
const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const formatTheNewCSVFile = require("./formatTheNewCSVFile");

module.exports = function () {
  console.log("scheduleDataCovidCSV");
  cron.schedule(
    "59 23 * * *",
    () => {
      async function downloadCsv() {
        console.log("downloadCsv");
        const url =
          "https://www.data.gouv.fr/fr/datasets/r/19a91d64-3cd3-42fc-9943-d635491a4d76";

        const csvPath = path.resolve(__dirname, "docs", "output.csv");

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
      downloadCsv().then(() => {
        // remove the character ";" by an empty character " "
        formatTheNewCSVFile()
          .then(function () {
            exec(
              `mongoimport --host=cluster0-shard-00-01.cxrmv.mongodb.net:27017 --db data-gouv --collection incidence --type csv --drop --headerline  --file ./docs/output.csv --authenticationDatabase admin --ssl --username adrien --password ${process.env.DB_USER_PASS}`,
              (error, stdout, stderr) => {
                if (error) {
                  console.log(`error: ${error.message}`);
                  return;
                }
                if (stderr) {
                  console.log(`stderr:, ${stderr}`);
                  return;
                }
                console.log(`stdout: ${stdout}`);
              }
            );
          })
          .catch(function (err) {
            console.log("error here: " + err);
          });
      });
    },
    {
      scheduled: true,
    }
  );
};
