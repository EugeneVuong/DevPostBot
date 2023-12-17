const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const striptags = require('striptags');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('hackathon_test')
        .setDescription('Sends hackathon embed!'),
    async execute(interaction) {
        axios({
            method: 'get',
            url: 'https://devpost.com/api/hackathons?status[]=open',
        })
            .then(response => {
                const hackathon = response.data.hackathons[1];
                console.log(hackathon);
                const hackathonEmbed = new EmbedBuilder();
                const description = `> State: ${hackathon.open_state.charAt(0).toUpperCase() + hackathon.open_state.slice(1)}\n> Submission Date Period: ${hackathon.submission_period_dates}\n> Location: ${hackathon.displayed_location.location}`;
                hackathonEmbed
                    .setTitle(hackathon.title)
                    .setURL(hackathon.url)
                    .setDescription(description)
                    .setThumbnail(`https:${hackathon.thumbnail_url}`);
                if (hackathon['themes']) {
                    const formattedThemes = hackathon.themes.map(theme => theme.name).join('\n');
                    console.log(formattedThemes);
                    hackathonEmbed.addFields({ name: 'Theme(s)', value: formattedThemes, inline: true });
                }
                const prize = striptags(hackathon.prize_amount);
                const otherInformation = `Organization: ${hackathon.organization_name}\nRegistration Count: ${hackathon.registrations_count}\nPrize Amount: ${prize}`;
                hackathonEmbed.addFields({ name: 'Other Information', value: otherInformation, inline: true });
                interaction.reply({ embeds: [hackathonEmbed] });
            })
            .catch(error => {
                interaction.reply(`Error: ${error}`);
            });
        // await interaction.reply('Pong!');
    },
};