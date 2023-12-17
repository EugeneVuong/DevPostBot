const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hackathon_list')
        .setDescription('Sends hackathon list!'),
    async execute(interaction) {
        axios({
            method: 'get',
            url: 'https://devpost.com/api/hackathons?status[]=open',
        })
            .then(response => {
                const titles = response.data.hackathons.map(hackathon => hackathon.title);
                let embedDescription = '';
                titles.forEach(el => {
                    embedDescription += `${el}\n`;
                });
                const hackathonEmbed = new EmbedBuilder()
                    .setTitle('Hackathon')
                    .setDescription(embedDescription);
                interaction.reply({ embeds: [hackathonEmbed] });
            })
            .catch(error => {
                interaction.reply(`Error: ${error}`);
            });
        // await interaction.reply('Pong!');
    },
};