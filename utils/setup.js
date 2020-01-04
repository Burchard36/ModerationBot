const Discord = require("discord.js");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./config.json"));
const utils = require("./utils.js");
let botName;
let botColor;
let botNameColor;
let botPrefix;
let ownerId;
let serverId;

function runSetup(message) {

    message.channel.send("What should my name be? (HINT: Reply with \"cancel\" at any time to cancel the setup process!").then(msg => {
        msg.channel.awaitMessages(res => res.author == message.author, {
            max: 1,
            time: 30000,
            errors: ['time'],
        }).then(collected => {
            let response = collected.first().content;
            if (response.toLowerCase() == "cancel") {
                message.channel.send("Setup process was cancelled!");
                return;
            }
            botName = response;
            chooseColor(message);
        }).catch(err => {
            console.log(err);
            message.reply("I did not get a response in time, cancelling the setup process...");
        })
    });
}

function chooseColor(message) {
    message.channel.send("What should my color be? (Available options are: Red, Blue, Purple or Green)").then(msg => {
        msg.channel.awaitMessages(res => res.author == message.author, {
            max: 1,
            time: 30000,
            errors: ['time'],
        }).then(collected => {
            let response = collected.first().content.toUpperCase();
            if (response == "CANCEL") {
                message.channel.send("Setup process was cancelled!");
                return;
            }
            if (response == "RED") {
                botColor = "#f20e1d";
                botNameColor = "Red";
            } else if (response == "BLUE") {
                botColor = "#5fd0f5";
                botNameColor = "Blue";
            } else if (response == "PURPLE") {
                botColor = "#eb36e2";
                botNameColor = "Purple";
            } else if (response == "GREEN") {
                botColor = "#36eb3f";
                botNameColor = "Green";
            } else {
                message.reply("I did not receive a valid color option and setup has been cancelled");
                return;
            }
            setPrefix(message);
        }).catch(err => {
            message.reply("I did not receive a reply in time, cancelling setup process...");
        })
    });
}

function setPrefix(message) {
    message.channel.send("What should my command prefix be? (NOTE: My prefix can only be `1` character long!").then(msg => {
        msg.channel.awaitMessages(res => res.author == message.author, {
            max: 1,
            time: 30000,
            errors: ['time'],
        }).then(collected => {
            let response = collected.first().content;
            if (response.length != 1) {
                message.reply("You did not choose a valid prefix, remember prefix can only be `1` character long! Cancelling setup process..");
                return;
            }
            botPrefix = response;
            setOwnerID(message);
        }).catch(err => {
            message.reply("I did not receive a response in time cancelling setup proces...");
        });
    })
}

function setOwnerID(message) {
    message.channel.send("What is the bot owners discord ID?").then(msg => {
        msg.channel.awaitMessages(res => res.author == message.author, {
            max: 1,
            time: 30000,
            errors: ['time'],
        }).then(collected => {
            ownerId = collected.first().content;
            if (ownerId.toUpperCase() == "CANCEL") {
                message.channel.send("Setup process cancelled");
                return;
            }
            setServerID(message);
        }).catch(err => {
            console.log(err);
            message.reply("I did not receive a response in time cancelling setup process...");
        })
    })
}

function setServerID(message) {
    message.channel.send("Lastly, what is the Server ID that I am currently in?").then(msg => {
        msg.channel.awaitMessages(res =>  res.author == message.author, {
            max: 1,
            time: 30000,
            errors: ['time'],
        }).then(collected => {
            let response = collected.first().content;
            if (response.toUpperCase() == "CANCEL") {
                message.channel.send("Setup process cnacelled");
                return;
            }
            serverId = response;
            finishSetup(message);
        }).catch(err => {
            message.reply("I did not receive a response in time cancelling setup process...");
        })
    })
}

function finishSetup(message) {
    let embed = new Discord.RichEmbed();
    embed.setColor(botColor);
    embed.setTitle(botName + " | Setup");
    embed.setDescription(`So, my name is \`${botName}\`\nMy color is \`${botNameColor}\`\nMy owner's ID is \`${ownerId}\`\nMy server ID is \`${serverId}\`\nAnd my prefix is \`${botPrefix}\`\n Reply with \`Yes\` to finish the setup process and save data, or reply with \`No\` to restart the setup process`);
    message.channel.send(embed).then(msg => {
        msg.channel.awaitMessages(res => res.author == message.author, {
            max: 1,
            time: 50000,
            errors: ['time'],
        }).then(collected => {
                let response = collected.first().content.toUpperCase();
                if (response == "YES") {
                    config.setup = true;
                    config.settings.prefix = botPrefix;
                    config.settings.botName = botName;
                    config.settings.botColor = botColor;
                    config.settings.botOwnerID = ownerId;
                    config.settings.serverID = serverId;
                    utils.createMuteRole(message.guild);
                    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
                        if (err) {
                            message.reply("ERROR SAVING FILE: Contact a developer!");
                            throw err;
                        } else {
                            message.reply(`All went good! I am now ready for use, try ${botPrefix}help`);
                        }
                    });
                } else if (response == "NO") {
                    runSetup(msg);
                } else {
                    message.reply("Invalid option, cancelling setup process...");
                    return;
                }
        }).catch(err => {
            console.log(err);
            message.reply("I did not receive a response in time cancelling setup process...");
        })
    })
}

module.exports = {
    runSetup: runSetup
}