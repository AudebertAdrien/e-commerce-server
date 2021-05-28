const { exec } = require("child_process");
console.log("test01!!!");

module.exports = function () {
  exec("ls -la", (error, stdout, stderr) => {
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
};
