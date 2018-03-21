const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if (!args[2]) return message.reply('please ask a full question');

    let replies = [
        'As I See It Yes',
        'Better Not Tell You Now',
        'Don\'t Count On It',
        'Without A Doubt',
        'Signs Point to Yes',
        'Outlook Not So Good',
        'Dumb Question Ask Another',
        'That\'s Ridiculous',
        'Whatever, Who Cares?',
        'Absolutely',
        ' You May Rely On It'
    ]

    let result = Math.floor(Math.random() * replies.length);

    message.channel.send(replies[result]);
}

module.exports.help = {
    name: "8ball"
}