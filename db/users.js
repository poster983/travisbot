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

var dbMod = require("./db.js");


exports.getUser = async (userID) => {
	try {
		//wait for resolution 
	    let db = await dbMod.get;
	    //query
	    let [users] = await Promise.all([
	      	db.get('SELECT * FROM discordUsers WHERE id = ?', userID),
	      	//db.get('SELECT * FROM sessions'),
	    ]);
	    return users;
	} catch (err) {
	    throw err;
	}
}
/*
exports.getUserBy = async (userID) => {
	try {
		//wait for resolution 
	    let db = await dbMod.get;
	    //query
	    let [users] = await Promise.all([
	      	db.get('SELECT * FROM discordUsers WHERE id = ?', userID),
	      	//db.get('SELECT * FROM sessions'),
	    ]);
	    return users;
	} catch (err) {
	    throw err;
	}
}*/


exports.newUser = (userID, userName) =>  {
	return new Promise((resolve, reject) => {
		bot.create(async (err, session) => {
			if(err) {
				throw reject(err)
			}
			try {
				//wait for resolution 
			    let db = await dbMod.get;
			    //query
			    let [query] = await Promise.all([
			      	db.run('INSERT INTO discordUsers(id, userName) VALUES(?,?)', userID, userName),
			    ]);
			    return resolve(query)
			} catch (err) {
			    throw reject(err);
			}
		})
	})
}