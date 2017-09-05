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

const { Command } = require('discord.js-commando');
var md5 = require('md5');
//credit NerdCubed Bot
module.exports = class PenisSize extends Command {
    constructor(client) {
        super(client, {
            name: 'penis',
            group: 'fun',
            memberName: 'penis',
            description: 'Calculates the size of the user\'s penis. This is Scientifically Accurate ',
            examples: ['penis @dummy#1234'],
            args: [
			    {
			        key: 'user',
			        prompt: 'Which user do you want to know their penis size?',
			        type: 'string'
			    }
			]

        });
    }
    run(msg, args) {
    	const { user } = args;
    	var num = sumChars(md5(user));
    	var size = "";
    	for(var x = 0; x < Math.ceil((Math.abs(num)/10) * 2); x++) {
    		size = size + "=";
    	}	
    	return msg.say(user + "\'s penis size is: 8" + size + "D");
        
    }
}

function charToNumber (s, i) {
    return parseInt(s.charAt(i), 36) - 9;
}

function sumChars (s) {
    var i = s.length, r = 0;
    while (--i >= 0) r += charToNumber(s, i);
    return r;
}