const Discord = require("discord.js");
const utils = require("../utils/utils.js");

exports.run = (client, message, args) => {

    // Check if user has permission to ban members
    if (!message.member.hasPermission("BAN_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) return message.reply("You do not have permission to execute this command");

    // gets the member to ban and checks if they exist
    // Also checks if the user has permission to ban user
    let memberToBan = message.mentions.members.first();
    if (!memberToBan || memberToBan == undefined) return message.reply("User is not in this discord (Or user was not specified)!");
    if (!memberToBan.bannable) return message.reply("You do not have permission to ban this this user! (Or I do not have a admin role)");

    // Shift the args to remove the user 
    args.shift();
    let banReason = args.join(" ");
    if (banReason == undefined) return message.reply("Please provide a ban reason for banning this user!");

    memberToBan.ban({ days: 0, reason: banReason}).then(banned => {
        message.channel.send(buildEmbed(memberToBan, banReason, message.author.tag));
    });
}

/**
 * 
 * @param {GuildMember} bannedMember Member that was banned
 * @param {String} Reason Reason for banning bannedMember
 * @param {GuildMember} banee The user who banned bannedMember
 * @yields A Discord RichEmbed
 */
function buildEmbed(bannedMember, Reason, banee) {
    const embed = new Discord.RichEmbed();
    embed.setTitle(utils.getBotName() + " | Member was banned!");
    embed.setColor(utils.getBotColor());
    embed.setDescription(`${bannedMember} Was banned for *${Reason}*\nBy user: ${banee}`);
    return embed;
}