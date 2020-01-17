const utils = require("../utils/utils.js");
const setup = require("../utils/setup.js");

exports.run = (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You must be admin to execute this command");

    if (utils.isSetup()) {
        message.reply("I am currently setup for this server, Would you like to run this command again? (Yes/No)").then(msg => {
            msg.channel.awaitMessages(res => res.author == message.author, {
                max: 1,
                time: 30000,
                errors: ['time'],
            }).then(collected => {
                let response = collected.first().content.toLowerCase();
                if (response == "yes") {
                    setup.runSetup(message);
                } else if (response == "no") {
                    msg.channel.send("Sounds good! Cancelling setup proces...");
                } else {
                    message.reply("Invalid option! Cancelling your setup.");
                }
            }).catch(err => {
                message.reply("I did not receive a response in time. Cancelling the setup.")
            });
        })
    } else {
        setup.runSetup(message);
    }

}
