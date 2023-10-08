// const mysql = require("mysql");
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "soykjtul_samiul",
//   password:"kv$t1R*qwRFe",
//   database: "soykjtul_bonanza",
// });

// module.exports = db;

const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:"",
  database: "new_bonanza",
});

module.exports = db;