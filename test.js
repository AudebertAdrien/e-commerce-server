const { exec } = require("child_process");
console.log("zozo!!!");

exec(process.env.MONGODB_URI, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr:, ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});