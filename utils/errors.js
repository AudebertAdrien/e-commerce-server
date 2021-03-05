module.exports.signUpErrors = (err) => {
  const errors = { speudo: "", email: "", password: "" };
  if (err.message.includes("speudo")) errors.speudo = "Speudo incorrrect";
  if (err.message.includes("password")) errors.password = "Password incorrrect";
  if (err.message.includes("email")) errors.email = "Email incorrrect";
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("speudo"))
    errors.speudo = "Speudo taken!";
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Email taken!";
  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message.includes("email")) errors.email = "unknow email";
  if (err.message.includes("password")) errors.password = "unknow password";
  return errors;
};
