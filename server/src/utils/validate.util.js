const bcrypt = require("bcrypt");
const hashPass = (password) => bcrypt.hashSync(password,bcrypt.genSaltSync(12));
const checkPass = (password,data) => bcrypt.compareSync(password,data);
module.exports = {hashPass,checkPass};