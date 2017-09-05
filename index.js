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

var config = require("config");
var commands = require("./commands/index.js")
const Commando = require('discord.js-commando');
const path = require('path');

const client = new Commando.Client({
    owner: '136272411329822720',
    commandPrefix: config.get("bot.prefix"),
    disableEveryone: true
});

client.registry
    // Registers your custom command groups
    .registerGroups([
        ['fun', 'Fun commands'],
        ['sound', 'Sound Commands'],
        ['other', 'Some other group']
    ])

    
    // Registers all built-in groups, commands, and argument types
    .registerDefaults()

    // Registers all of your commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));


client.on('ready', () => {
    console.log('Logged in!');
    client.user.setGame("Help: " + config.get("bot.prefix") + "help");
    // or if on master, client.user.setActivity('game');
});

client.login(config.get("discord.token"));
/*
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log("Add to discord by going to:", "https://discordapp.com/oauth2/authorize?&client_id=" + client.user.id + "&scope=bot&permissions=0")
});


client.on('message', msg => {
	
	if(msg.content === ";;stop") {
		
		setTimeout(function() {
			console.log("hi")
			commands.otherbots.ams.restart(msg);
		}, 1000);
	}
	
	if(msg.content.slice(0, config.get("bot.prefix").length) === config.get("bot.prefix")) {
		console.log("Got Prefix")
		switch(msg.content.slice(config.get("bot.prefix").length)) {
			case "ams on":
				commands.otherbots.ams.isEnabled(true);
				msg.reply("Will now fight the \"STOP\" command");
				break;
			case "ams off":
				commands.otherbots.ams.isEnabled(false);
				msg.reply("Will now fight the \"STOP\" command");
				break;
			
		}
		if (msg.content.slice(config.get("bot.prefix").length) === 'ping') {
			
		    msg.reply('Pong!');
		  }
	}
});


client.login(config.get("discord.token"));
*/