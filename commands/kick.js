const Discord = require("discord.js");
const utils = require("../utils/utils.js");

exports.run = (client, message, args) => {

    // If user doesn't has KICK_MEMBER permission tell them no
    if (!message.member.hasPermission("KICK_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) return message.reply("You do not have permission to use this command!");

    // gets the member to kick and checks if they exist
    // Also checks if the user has permission to kick user
    let memberToKick = message.mentions.members.first();
    if (!memberToKick || memberToKick == undefined) return message.reply("User is not in this discord (Or user was not specified)!");
    if (!memberToKick.kickable) return message.reply("You do not have permission to remove this user! (Or I do not have a admin role)");

    // Shift the args to remove the user 
    args.shift();
    let kickReason = args.join(" ");
    if (kickReason == undefined) return message.reply("Please provide a kick reason for kicking this user!");

    memberToKick.kick(kickReason).then(kicked => {
        message.channel.send(buildEmbed(memberToKick, kickReason, message.author.tag));
    }); 
}

/**
 * 
 * @param {GuildMember} kickedMember Member that was kicked
 * @param {String} Reason Reason for kicking kickedMember
 * @param {GuildMember} kickee The user who kicked kickedMember
 * @yields A Discord RichEmbed
 */
function buildEmbed(kickedMember, Reason, kickee) {
    const embed = new Discord.RichEmbed();
    embed.setTitle(utils.getBotName() + " | Member was kicked!");
    embed.setColor(utils.getBotColor());
    embed.setDescription(`${kickedMember} Was kicked for *${Reason}*\nBy user: ${kickee}`);
    return embed;
}