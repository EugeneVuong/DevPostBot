const { findNewChangesForHackathons } = require('../helpers/changes');
const { DevPostAPIWrapper } = require('../helpers/devpost_api');
const striptags = require('striptags');

const { EmbedBuilder } = require('discord.js');


async function hackathonNotifierList(status, cacheLib, dpAPI) {
    try {
        const hackathonList = await dpAPI.getHackathons(status);
        if (cacheLib.has(status)) {
            const cacheList = await cacheLib.take(status);
            const changes = await findNewChangesForHackathons(hackathonList, cacheList);
            await cacheLib.set(status, hackathonList);
            return changes;
        }
        else {
            await cacheLib.set(status, hackathonList);
            return hackathonList;
        }
    }
    catch (error) {
        console.log(error);
    }

}

// cache and compare
    // t1 = send Request
    // t2 = get cache 
    // if cache:
    //     compare t1 and t2 (see the difference between )
    //     return differeince
    // cache new data
    // else  #no cacehe
    //     return req


function JSONToEmbed(hackathonJSON) {
    const hackathon = hackathonJSON;
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

    return hackathonEmbed;

}


module.exports = { hackathonNotifierList, JSONToEmbed };