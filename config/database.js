let mysql = require('mysql');
const utils = require('../helper/utils');
let conn = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER_NAME,
	password: process.env.DB_PASSOWRD,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT
});

conn.connect(function (err) {
	if (utils.empty(err)) {
		console.log("My sql db connected successfully.");
	} else {
		console.log("Error my sql connection");
	}
});

module.exports = { conn };