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

const { Command, FriendlyError } = require('discord.js-commando');

var cleverDB = require("../../db/cleverbot.js");

var config = require("config");
var cleverbot = require("cleverbot.io");
bot = new cleverbot(config.get("cleverbotIO.apiUser"), config.get("cleverbotIO.apiKey"));

var sessions = [];

module.exports = class CleverBot extends Command {
    constructor(client) {
        super(client, {
            name: 'ask',
            aliases: ['say', 'tell', 'bot'],
            group: 'fun',
            memberName: 'ask',
            description: 'Ask travisbot something',
            examples: ['ask Just a small town girl', 'say If you wish upon a star'],
            args: [
			    {
			        key: 'english',
			        prompt: 'what to ask/say to travisbot',
			        type: 'string'
			    }
			]

        });
    }
    run(msg, args) {
    	let { english } = args;
    	let chanID = msg.channel.id;
    	/*console.log("ChanID", msg.channel.id)
    	console.log("MSG", msg)
        console.log("Args", args)
        console.log("eng", english)*/
        msg.say("Thinking...");
        //bot.setNick(config.get("cleverbotIO.sessionName") + "#" + chanID);
        setSession(chanID).then((sess) => {
   			if(sess.new) {
   				msg.say("FYI. I'm slow sometimes. Please be patient.");
   			}
        	console.log(sess)
        	bot.ask(english, function (err, response) {
		  		if(err) {
		  			console.error(err)
		  			msg.say(new FriendlyError("I broke."));
		  		} else {
		  			msg.reply(response)
		  		}
		  		
			 	console.log(response); 
			});
        }).catch((err) => {console.error(err); msg.say(new FriendlyError("SQL broke."));});
    }
}


function setSession(channelID) {
	return new Promise((resolve, reject) => {
		cleverDB.findSession(channelID).then((session) => {
			if(session) {
				bot.setNick(session.session);
				return resolve(Object.assign(session, {new: false}));
			} else {
				cleverDB.newSession(channelID).then((query) => {
					return resolve({id: channelID, session: query.session, new: true});
				}).catch((err) => {return reject(err)})
			}
		}).catch((err) => {return reject(err)})
	})
}



