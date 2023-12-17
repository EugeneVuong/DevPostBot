const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hackathon_billboard')
        .setDescription('Sends embed test!'),
    async execute(interaction) {
        const hackathonEmbed = new EmbedBuilder()
            .setTitle('Hackathon')
            .addFields(
                { name: 'Hackathon #1', value: 'Location: USA\nStatus: Upcoming\nPeriod Dates: Sep 26 - Nov 13, 2023\nLink', inline: true },
                { name: 'Hackathon #1', value: 'Location: USA\nStatus: Upcoming\nPeriod Dates: Sep 26 - Nov 13, 2023\nLink', inline: true },
                { name: '\u200b', value: '\u200b', inline: false },
                { name: 'Hackathon #1', value: 'Location: USA\nStatus: Upcoming\nPeriod Dates: Sep 26 - Nov 13, 2023\nLink', inline: true },
                { name: 'Hackathon #1', value: 'Location: USA\nStatus: Upcoming\nPeriod Dates: Sep 26 - Nov 13, 2023\nLink', inline: true },
                { name: '\u200b', value: '\u200b', inline: false },
                { name: 'Hackathon #1', value: 'Location: USA\nStatus: Upcoming\nPeriod Dates: Sep 26 - Nov 13, 2023\nLink', inline: true },
                { name: 'Hackathon #1', value: 'Location: USA\nStatus: Upcoming\nPeriod Dates: Sep 26 - Nov 13, 2023\nLink', inline: true },
                { name: '\u200b', value: '\u200b', inline: false },
                { name: 'Hackathon #1', value: 'Location: USA\nStatus: Upcoming\nPeriod Dates: Sep 26 - Nov 13, 2023\nLink', inline: true },
                { name: 'Hackathon #1', value: 'Location: USA\nStatus: Upcoming\nPeriod Dates: Sep 26 - Nov 13, 2023\nLink', inline: true },
            );
        interaction.reply({ embeds: [hackathonEmbed] });
        // await interaction.reply('Pong!');
    },
};