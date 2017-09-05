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
const { Client, Command } = require('discord.js-commando');



module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'soundtest',
            group: 'sound',
            memberName: 'soundtest',
            description: 'Plays a Sound.',
            examples: ['soundtest']
        });
    }
    run(msg) {
        msg.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          msg.say('I have successfully connected to the channel!');
          const dispatcher = connection.playArbitraryInput('../../sounds/catParadox.mp3');
          console.log(dispatcher)
          //const dispatcher = connection.playArbitraryInput('http://cdn.frustra.org/sounds/sound/vo/core02/fact17.mp3?id=352');
            dispatcher.on('end', () => {
              msg.member.voiceChannel.leave()
            });

            dispatcher.on('error', e => {
              // Catch any errors that may arise
              console.log(e);
              msg.member.voiceChannel.leave()
            });

            dispatcher.end();

        })
        .catch(console.log);
        
        
        //return msg.say('Hi, I\'m awake!');
    }
}