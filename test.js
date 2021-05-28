const cron = require("node-cron");

let i = 0;
cron.schedule("* * * * * *", () => {
  console.log(i++);
});
