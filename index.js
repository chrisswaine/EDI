const botconfig = require('./botconfig.json');
const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const fs = require('fs');

bot.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split('.').pop() === 'js');

    if (jsfile.length <=0) {
        console.log('couldn\'t find commands');
        return;
    };

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on('ready', async () => {
    console.log(`${bot.user.username} is now running`);
    if (bot.guilds.size === 1) {
        console.log(`${bot.user.username} is online on ${bot.guilds.size} server!`)
    } else {
        console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`)
    }
    
    bot.user.setActivity('you type', {type: 'WATCHING'});
});


bot.on('message', async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    let prefix = botconfig.prefix;
    let messageArr = message.content.split(' ');
    let cmd = messageArr[0];
    let args = messageArr.slice(1);

    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if (commandFile) commandFile.run(bot, message, args);

});

bot.login(botconfig.token);