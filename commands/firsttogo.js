const Discord = require('discord.js');


module.exports.run = async (bot, message, args) => {
    let users = []
    const ID = message.author.lastMessage.member.voiceChannelID

    if (!ID) return message.channel.send(`You must be in a voice channel for this command to work`)

    const channelMembers = bot.channels.get(ID).guild.members.array().forEach(element => {
        if (element.voiceChannelID === ID) users.push(element.user.username);
    });

    if (users.length < 2) return message.channel.send(`Come on, make it harder for me, I need more than one person in the voice channel for me to pick from!`)

    let player = users[Math.floor(Math.random() * users.length)]


    const response = [
        `${player} will be the first to die this game!`,
        `Hmmm, considering how bad they are I think ${player} will be the first to bite it.`,
        `${player}, definitely`,
        `hahahaha, that's easy! it'll be ${player}`,
        `I've got my money on ${player} to die first`,
        `${player}, since they get carried by you other guys every game anyways`
    ]

    message.channel.send(response[Math.floor(Math.random() * response.length)])

}

module.exports.help = {
    name: "firsttogo"
}