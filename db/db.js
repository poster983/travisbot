/*MIT License

Copyright (c) 2017 Joseph Hassell

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const sqlite = require('sqlite');

const dbPromise = new Promise((resolve, reject) => {
	var prom = sqlite.open('./db/travisbot.sqlite', { Promise }).then((db) => {
	initTables(db).then(() => {console.log("INIT Tables"); return resolve(db)}).catch((err) => {
			console.error(err);
			throw err;
		})
	}).catch((err) => {
		return reject(err);
	})
	
});
exports.get = dbPromise;

async function initTables(db) {
	console.log("Trying to create tables")
	try {
		let [res] = await Promise.all([
	      	db.run(`CREATE TABLE IF NOT EXISTS cleverbotSessions
			    (id TEXT IDENTITY(1,1) PRIMARY KEY,
			    session TINYTEXT);`),
	      	db.run(`CREATE TABLE IF NOT EXISTS discordUsers
			    (id TEXT IDENTITY(1,1) PRIMARY KEY,
			    userName TEXT);`),
	    ]);
		return res;
	} catch (err) {
		throw err;
	}
}
