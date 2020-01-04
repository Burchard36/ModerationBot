const Discord = require("discord.js");
const utils = require("../utils/utils.js");

exports.run = (client, message, args) => {

    if (message.author.id != utils.getBotOwner()) return message.reply("You do not have permission to execute this command!");

    args = args.join(" ");

    message.guild.members.forEach(member => {
        if (member.id == client.user.id && !member.user.bot) return;
        member.send(buildEmbed(args));
    })
}

function buildEmbed(message) {
    const embed = new Discord.RichEmbed();
    embed.setTitle(utils.getBotName() + " | Automated Message");
    embed.setColor(utils.getBotColor());
    embed.setDescription(message);
    return embed;
}