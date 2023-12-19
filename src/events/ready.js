const { Events } = require('discord.js');

const schedule = require('node-schedule');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        // schedule.scheduleJob('*/5 * * * * *', async () => {
        //     const channel = await client.channels.cache.get('1172856957426729021');
        	
        // 	channel.send("Test");
        	
        // });
    },
};