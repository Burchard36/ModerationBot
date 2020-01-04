const Discord = require("discord.js");
const utils = require("../utils/utils.js");

exports.run = (client, message, args) => {

    // If user doesn't has KICK_MEMBER permission tell them no
    if (!message.member.hasPermission("KICK_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) return message.reply("You do not have permission to use this command!");

    // gets the member to kick and checks if they exist
    // Also checks if the user has permission to kick user
    let memberToUnMute = message.mentions.members.first();
    if (!memberToUnMute || memberToUnMute == undefined) return message.reply("User is not in this discord (Or user was not specified)!");
    if (!memberToUnMute.kickable) return message.reply("You do not have permission to unmute this user! (Or I do not have a admin role)");

    // Get the muted user role, if it does not exist alert the owner of the discrd there was an error
    let muteRole = message.guild.roles.find(role => role.name == "Muted Role");
    if (muteRole == undefined) message.channel.send("<@" + utils.getBotOwner() + "> It seems the muted user role does not eixst?");
    
    // check if the user is already muted
    if (!memberToUnMute.roles.find(role => role.name == "Muted Role")) return message.reply("Seems like this user is not muted!");

    // add muted role to user
    memberToUnMute.removeRole(muteRole).then(removed => {
        message.channel.send(buildEmbed(memberToUnMute, message.author.tag));
    })
}

/**
 * 
 * @param {GuildMember} unMutedMember Member that was un-muted
 * @param {GuildMember} mutee The user who muted mutedember
 * @yields A Discord RichEmbed
 */
function buildEmbed(unMutedMember, unMutee) {
    const embed = new Discord.RichEmbed();
    embed.setTitle(utils.getBotName() + " | Member was unmuted!");
    embed.setColor(utils.getBotColor());
    embed.setDescription(`${unMutedMember} Was unmuted By user: ${unMutee}`);
    return embed;
}