const utils = require("../utils/utils.js");
const Discord = require("discord.js");

exports.run = (client, message, args) => {

    if (!utils.isSetup()) return message.channel.send("This server is not setup for my use. Please type -setup");
    let prefix = utils.getPrefix();
    let ownerID = utils.getBotOwner();
    let embedMessage = ""

    const embed = new Discord.RichEmbed();
    embed.setColor(utils.getBotColor());
    embed.setTitle(utils.getBotName() + " | Help Commands");
    embedMessage += `\`${prefix}help\` - *Displays this message*\n`;
    if (message.member.hasPermission("KICK_MEMBERS")) {
        embedMessage += `\`${prefix}kick <@user> <reason>\` - *Kicks a user from the discord server*\n`;
    }
    if (message.member.hasPermission("BAN_MEMBERS")) {
        embedMessage += `\`${prefix}ban <@user> <reason>\` - *Bans a user from the discord server*\n`;
    }
    if (message.member.hasPermission("MUTE_MEMBERS")) {
        embedMessage += `\`${prefix}mute <@user> <reason>\` - *Mutes a user in the discord server*\n`;
        embedMessage += `\`${prefix}unmute <@user>\` - *Mutes a user in the discord server*\n`;
    }
    if (message.member.hasPermission("MANAGE_ROLES")) {
        embedMessage += `\`${prefix}addrole <@user> <Role Name>\` - *Adds a role to the specified user*\n`
        embedMessage += `\`${prefix}removerole <@user> <Role Name>\` - *Removes a role from the specified user*\n`
    }
    if (message.author.id == ownerID) {
        embedMessage += `\`${prefix}dmall <message>\` - *Messages all users in the discord server*\n`;
    }
    embed.setDescription(embedMessage);
    message.channel.send(embed);
}