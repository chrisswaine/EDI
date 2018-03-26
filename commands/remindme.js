const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let reminder = message.content.split(' ');
    const time = reminder[reminder.length - 1] * 60000
    reminder.splice(0, 1);
    reminder.splice(reminder.length - 1, 1);
    reminder = reminder.join(' ')

    let embed = new Discord.RichEmbed()
    .setColor('#447ec4')
    .setDescription(`I'll DM you when the time is up!`)
    .setTitle(`Hey ${message.author.username}, your reminder has now been set!`)

    message.channel.send(embed);

    setTimeout(() => {
        message.author.send(reminder);
    }, time)

}

module.exports.help = {
    name: "remindme"
}