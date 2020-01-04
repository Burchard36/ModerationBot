// Imports
const fs = require('fs');
let utils = require("../utils/utils.js");

module.exports = (client, message) => {
    config = JSON.parse(fs.readFileSync("./config.json")) // refresh the config
    if (message.author.bot) return; // This is to ignore anything other bots say

    const providedPrefix = message.content.charAt(0); // Prefix provided by user
    const botPrefix = utils.getPrefix(); // Prefix fom the config
    if (providedPrefix != botPrefix) return; // If the message doesn't start with our bots prefix ignore it

    let args = message.content.substr(1).split(/ +/g); // Slices the message into an array
    const command = args.shift().toLowerCase(); // Arrays start at 0, the first word is the command

    let cmd = client.commands.get(command); // gets command from the Enmap

    if (!cmd) return; // Command doesnt exist, ignore it

    cmd.run(client, message, args); // Run the command
}