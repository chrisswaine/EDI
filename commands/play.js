const Discord = require('discord.js');
const ytdl = require('ytdl-core');

let connection = null;
let dispatcher = null;

module.exports.run = async (bot, message, args) => {
	try {
		if (message.content === '!play some dirty synthwave') {
			if (message.member.voiceChannel) {

				if (!connection) {
					connection = await message.member.voiceChannel.join();
				}

				dispatcher = connection.playArbitraryInput(ytdl(
					'https://www.youtube.com/watch?v=0bwC1zJE49U&list=PLTgKUWDZ5rsz3sO77RiKSmrYr0aEBaXPQ',
					{filter: 'audioonly'})
				);
				dispatcher.setVolume(0.5);

			} else {
				message.reply('You need to join a voice channel first!');
			}
		} else if (message.content === '!play nothing') {
			if(dispatcher){
				dispatcher.end();
			}
			if(message.member.voiceChannel){
				message.member.voiceChannel.leave();
				connection = null;
			}

		}
	}catch(err){
		console.log(err);
	}

};

module.exports.help = {
	name: "play"
};