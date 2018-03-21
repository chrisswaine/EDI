const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    try {
        let link = await bot.generateInvite(['ADMINISTRATOR'])
        let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription('Use this link to invite EDI to your server!')
        .setURL(link)
        .setTitle('EDI invite link')

        message.channel.send(embed);
        
    } catch (e) {
        console.log(e.stack);
    }
    
}

module.exports.help = {
    name: "link"
}