import { appVars } from 'config/app';
var conn;

(function init() {
	console.log("Initializing");
	jsforce.browser.init({
		clientId: appVars.clientId,
		redirectUri: 'http://localhost:4002/'
	});
})();

// export function getConnection() {
// 	if(conn) return conn;
// 	else {
// 		jsforce.browser.login();
// 		jsforce.browser.on('connect', (connection) =>{
// 			conn = connection;
// 			console.log("I am connected now");
// 			conn.query('SELECT Id, Name FROM Account', function(err, res) {
// 			  if (err) { return console.error(err); }
// 			  console.log(res);
// 			});
// 		});
// 	}
// 	return conn;
// }

export function getConnection() {
	return new Promise((resolve, reject) => {
		if(conn) resolve(conn);
		else {
			jsforce.browser.login();
			jsforce.browser.on('connect', (connection) =>{
				conn = connection;
				console.log("I am connected now");
				conn.query('SELECT Id, Name FROM Account', function(err, res) {
					if (err) { return console.error(err); }
					console.log(res);
				});
				resolve(conn);
			});
		}
	});
	// if(conn) return conn;
	// else {
	// 	jsforce.browser.login();
	// 	jsforce.browser.on('connect', (connection) =>{
	// 		conn = connection;
	// 		console.log("I am connected now");
	// 		conn.query('SELECT Id, Name FROM Account', function(err, res) {
	// 		  if (err) { return console.error(err); }
	// 		  console.log(res);
	// 		});
	// 	});
	// }
	// return conn;
}
