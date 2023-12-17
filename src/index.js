const fs = require('node:fs');
const path = require('node:path');
const schedule = require('node-schedule');
const NodeCache = require('node-cache');


const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { hackathonNotifierList, JSONToEmbed } = require('./helpers/notifier');
const { DevPostAPIWrapper } = require('./helpers/devpost_api')

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
const hackathonCache = new NodeCache();
const dpAPI = new DevPostAPIWrapper();


for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
		console.log('Running');
	}
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});




schedule.scheduleJob('*/5 * * * * *', async () => {
    const channel = await client.channels.cache.get('1172856957426729021');
	try {
		const list = await hackathonNotifierList('open', hackathonCache, dpAPI);
		if (list.length > 0) {
			for (const item of list) {
				const openHackathonEmbed = await JSONToEmbed(item);
				channel.send({ embeds: [await openHackathonEmbed] });

			}
		}
	}
	catch (error) {
		channel.send(error);
	}
});

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(token);