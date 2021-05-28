const { exec } = require("child_process");
console.log("hahaha!!!");

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
