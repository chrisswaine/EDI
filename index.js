const botconfig = require('./botconfig.json');
const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const path = require('path');
const Promise = require('bluebird');
const fs = require('fs-extra');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();

//set a secret for salting things later if needed;
app.set('superSecret', 'H3yL4n4.D4nG3rZ0n3!');

fs.ensureFile('./data/playlists.json')
    .then( () => {
    const playlists = require('./data/playlists.json');
    if(Array.isArray(playlists)){
        return Promise.resolve()
    }else{
        //create default
		return Promise.reject();
    }
}).then( () => {
	bot.commands = new Discord.Collection();

	fs.readdir('./commands/', (err, files) => {
		if (err) console.log(err);

		let jsfile = files.filter(f => f.split('.').pop() === 'js');

		if (jsfile.length <= 0) {
			console.log('couldn\'t find commands');
			return;
		}
		;

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

	return bot.login(botconfig.token);
}).then( (authToken) => {

	//TODO: Add a propper logging library like winston

	//Define API routes and body parsers
	const v1 = require('./routes/v1');
	app.use('/api/v1', v1.router);
	app.set('routeStack', v1.stack);
	app.use(bodyParser.json({
		type: '*/json',
		limit: '5000mb'
	}));
	app.use(bodyParser.urlencoded({extended: false}));

	//Define static route for UI
	app.use('/', express.static(__dirname + '/public'));

	//Catch 404's
	app.use((req, res, next) => {
		let err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	//set app error output - in a real app stack trace would be hidden from user unless node_env = dev
	app.use((err, req, res) => {
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: err
		});
	});

	app.set('port', 3000);

	const server = http.createServer(app);
	server.listen(3000);
});



