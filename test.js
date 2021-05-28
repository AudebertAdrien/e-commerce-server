const cron = require("node-cron");

let i = 0;
cron.schedule("*/5 * * * * *", () => {
  console.log(i++);
});
