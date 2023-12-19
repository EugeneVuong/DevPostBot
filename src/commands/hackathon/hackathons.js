const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { Pagination } = require('pagination.djs');
const DevPostAPI = require("../../devpostapi/src/DevPostAPI")


function createHackathonField(hackathon) {
    // Key/Value Dictionary
    let locationIcon = {
        'globe': '📍',
        "map-marker-alt": '🌐'
    };
    let statusIcon = {
        'open': '🟢',
        'upcoming': '🟡',
        'ended': '🔴'
    };


    const eventDetails = `
**Event Details:**
- **Status:** ${statusIcon[hackathon.open_state]} ${hackathon.open_state}
- **Dates:** 🗓️ ${hackathon.submission_period_dates}
- **Format:** ${locationIcon[hackathon.displayed_location.icon]} ${hackathon.displayed_location.location}
- **Link:** [Event Page](${hackathon.url})
    `;


    return {name: hackathon.title, value: eventDetails};
}


module.exports = {
    // Explains the Commands
    data: new SlashCommandBuilder()
        .setName('hackathons')
        .setDescription('View some new and upcomming DevPost Hackathons!'),
    async execute(interaction) {
        
        const devpost = new DevPostAPI()
        // Get all Hackathons from List
        const hackathonList = await devpost.getAllHackathons(['open', 'upcoming'])

        // Split Hackathon to X by 5 for Each Page
        const hackathonPages = [];
        while(hackathonList.length) hackathonPages.push(hackathonList.splice(0,5));


        // Create Embeds of Each Page
        let hackathonEmbeds = []
        for (let i = 0; i < hackathonPages.length; i++) {
            hackathonEmbeds[i] = new EmbedBuilder()
                .setTitle("✨ Hackathons ✨")
                .setFooter({ text: `Page ${i + 1}/${hackathonPages.length}` });
            for (let j = 0; j < hackathonPages[i].length; j++) {
                hackathonEmbeds[i]
                    .addFields(createHackathonField(hackathonPages[i][j]))
            }
        }


        
        const pagination = new Pagination(interaction, {ephemeral: true});

        pagination.setEmbeds(hackathonEmbeds);
        pagination.render();




        
        
        // console.log(hackathonEmbeds);


        // interaction.reply({ embeds: [hackathonEmbeds[16]], components: [row], ephemeral: true });


        
    
        // axios({
        //     method: 'get',
        //     url: 'https://devpost.com/api/hackathons?status[]=open',
        // })
        //     .then(response => {
        //         const hackathon = response.data.hackathons[1];
        //         console.log(hackathon);
        //         const hackathonEmbed = new EmbedBuilder();
        //         const description = `> State: ${hackathon.open_state.charAt(0).toUpperCase() + hackathon.open_state.slice(1)}\n> Submission Date Period: ${hackathon.submission_period_dates}\n> Location: ${hackathon.displayed_location.location}`;
        //         hackathonEmbed
        //             .setTitle(hackathon.title)
        //             .setURL(hackathon.url)
        //             .setDescription(description)
        //             .setThumbnail(`https:${hackathon.thumbnail_url}`);
        //         if (hackathon['themes']) {
        //             const formattedThemes = hackathon.themes.map(theme => theme.name).join('\n');
        //             console.log(formattedThemes);
        //             hackathonEmbed.addFields({ name: 'Theme(s)', value: formattedThemes, inline: true });
        //         }
        //         const prize = striptags(hackathon.prize_amount);
        //         const otherInformation = `Organization: ${hackathon.organization_name}\nRegistration Count: ${hackathon.registrations_count}\nPrize Amount: ${prize}`;
        //         hackathonEmbed.addFields({ name: 'Other Information', value: otherInformation, inline: true });
        //         interaction.reply({ embeds: [hackathonEmbed] });
        //     })
        //     .catch(error => {
        //         interaction.reply(`Error: ${error}`);
        //     });
        // // await interaction.reply('Pong!');
    },
};