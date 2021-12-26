const bcrypt = require("bcrypt");

module.exports.setPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  console.log(password, salt);
  return await bcrypt.hash(password, salt);
};
