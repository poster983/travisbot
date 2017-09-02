var cleverbot = require("cleverbot.io");
var config = require("config");
const Discord = require("discord.js");
const client = new Discord.Client();
/*bot = new cleverbot(config.get("cleverbotIO.apiUser"), config.get("cleverbotIO.apiKey"));

bot.setNick(config.get("cleverbotIO.sessionName"))

console.log()

bot.create(function (err, session) {
	if(err) {
		console.error("Error:", err)
	}
  bot.ask("Just a small town girl", function (err, response) {
	  	if(err) {
			console.error("Error:", err)
		}
	  console.log(response); // Will likely be: "Living in a lonely world"
	});
});*/
console.log("HII")
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log("Add to discord by going to:", "https://discordapp.com/oauth2/authorize?&client_id=" + client.user.id + "&scope=bot&permissions=0")
});


client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});


client.login(config.get("discord.token"));