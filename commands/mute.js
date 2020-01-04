const Discord = require("discord.js");
const utils = require("../utils/utils.js");

exports.run = (client, message, args) => {

    // If user doesn't has KICK_MEMBER permission tell them no
    if (!message.member.hasPermission("KICK_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) return message.reply("You do not have permission to use this command!");

    // gets the member to kick and checks if they exist
    // Also checks if the user has permission to kick user
    let memberToMute = message.mentions.members.first();
    if (!memberToMute || memberToMute == undefined) return message.reply("User is not in this discord (Or user was not specified)!");
    if (!memberToMute.kickable) return message.reply("You do not have permission to mute this user! (Or I do not have a admin role)");

    // Shift the args to remove the user 
    args.shift();
    let muteReason = args.join(" ");
    if (muteReason == undefined) return message.reply("Please provide a mute reason for muting this user!");

    // Get the muted user role, if it does not exist alert the owner of the discrd there was an error
    let muteRole = message.guild.roles.find(role => role.name == "Muted Role");
    if (muteRole == undefined) message.channel.send("<@" + utils.getBotOwner() + "> It seems the muted user role does not eixst?");
    
    // check if the user is already muted
    if (memberToMute.roles.find(role => role.name == "Muted Role")) return message.reply("Seems like this user is already muted!");

    // add muted role to user
    memberToMute.addRole(muteRole).then(added => {
        message.channel.send(buildEmbed(memberToMute, muteReason, message.author.tag));
    })
}

/**
 * 
 * @param {GuildMember} mutedMember Member that was muted
 * @param {String} Reason Reason for muting mutedMember
 * @param {GuildMember} mutee The user who muted mutedember
 * @yields A Discord RichEmbed
 */
function buildEmbed(mutedMember, Reason, mutee) {
    const embed = new Discord.RichEmbed();
    embed.setTitle(utils.getBotName() + " | Member was muted!");
    embed.setColor(utils.getBotColor());
    embed.setDescription(`${mutedMember} Was muted for *${Reason}*\nBy user: ${mutee}`);
    return embed;
}