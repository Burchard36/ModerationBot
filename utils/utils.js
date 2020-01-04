const fs = require("fs")
let config = JSON.parse(fs.readFileSync("./config.json"));

setInterval(() => {
    config = JSON.parse(fs.readFileSync("./config.json"))
}, 10000); // This is to refresh the config every 10 seconds in case there was a change in it

function isSetup() { // returns a Boolean
    return config.setup;
}

function getBotColor() { // Returns a String (hex) for the bot color
    return config.settings.botColor;
}

function getBotOwner() { // gets the bow owners SnowflakeID (Discord ID)
    return config.settings.botOwnerID;
}

function getBotName() { // gets the bot name
    return config.settings.botName;
}

function getPrefix() { // gets the bot prefix
    return config.settings.prefix;
}

function getServerID() { // gets the bot prefix
    return config.settings.serverID;
}

function getBotToken() { // gets the bot token
    return config.token;
}

function createMuteRole(server) {
    if (isSetup() && getServerID() != undefined) {
        let muteRole = server.roles.find(role => role.name == "Muted Role");
        if (muteRole == undefined) {
            console.log("Creating the mute role!")
            server.createRole({
                name: "Muted Role",
                color: "RED",
                mentionable: false,
                permissions: []
            }).then(role => {
                console.log("Mute role was created! Overwriting channel permissions....");
                server.channels.forEach((channel, id) => {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            }).catch(err => {
                console.log(err);
            })
        } else {
            console.log("Ensuring mute role cannot send messages in any channels...");
            server.channels.forEach((channel, id) => {
                channel.overwritePermissions(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }
    }
}

module.exports = {
    isSetup: isSetup,
    getBotColor: getBotColor,
    getBotName: getBotName,
    getPrefix: getPrefix,
    getBotOwner: getBotOwner,
    getServerID: getServerID,
    getBotToken: getBotToken,
    createMuteRole: createMuteRole
}