const Discord = require('discord.js');
const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args) => {


	if(message.content === '!play some dirty synthwave') {
		if (message.member.voiceChannel) {
			const connection = await message.member.voiceChannel.join();
			connection.play(ytdl(
				'https://www.youtube.com/watch?v=0bwC1zJE49U&list=PLTgKUWDZ5rsz3sO77RiKSmrYr0aEBaXPQ',
				{filter: 'audioonly'}));

		} else {
			message.reply('You need to join a voice channel first!');
		}
	}

};

module.exports.help = {
	name: "play"
};