const Discord = require("discord.js");
const utils = require("../utils/utils.js");

exports.run = (client, message, args) => {

    // If user doesn't has KICK_MEMBER permission tell them no
    if (!message.member.hasPermission("MANAGE_ROLES") || !message.member.hasPermission("ADMINISTRATOR")) return message.reply("You do not have permission to use this command!");

    // gets the member to remove a role from and checks if they exist
    // Also checks if the user has permission to mute the user
    let member = message.mentions.members.first();
    if (!member || member == undefined) return message.reply("User is not in this discord (Or user was not specified)!");

    // Shift the args to remove the user 
    args.shift();
    args = args.join(" ");
    if (args == undefined) return message.reply("Please provide a valid role!");

    // Gets the role to remove from the user, if it doesnt exist let the sender know
    let roleToRemove = message.guild.roles.find(role => role.name == args);
    if (roleToRemove == undefined) return message.reply("This role does not exist!");
    
    // checks if the user doesnt have this role
    if (!member.roles.find(role => role.name == args)) return message.reply("Seems like this user doesn't have this role!");

    // add the role to the user
    member.removeRole(roleToRemove).then(added => {
        message.channel.send(buildEmbed(member, roleToRemove ,message.author.tag));
    }).catch(err => {
        message.reply("I do not have permision to remove this role...");
    })
}

/**
 * 
 * @param {GuildMember} member Member to remove the role from
 * @param {String} Role The role removed from member
 * @param {GuildMember} removee The user who added Role to member
 * @yields A Discord RichEmbed
 */
function buildEmbed(member, Role, removee) {
    const embed = new Discord.RichEmbed();
    embed.setTitle(utils.getBotName() + " | Role was removed!");
    embed.setColor(utils.getBotColor());
    embed.setDescription(`${member} Lost the role *${Role.name}*\n It was removed by user: ${removee}`);
    return embed;
}