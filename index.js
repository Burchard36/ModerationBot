// These are our imports
const Discord = require("discord.js"); // Discord.JS import
const Client = new Discord.Client; // Our actual bot object
const fs = require('fs'); // For reading our files
const Enmap = require("enmap");
const utils = require("./utils/utils.js");

// Ignore this it is so we can have our eventss
// In seperate files

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      Client.on(eventName, event.bind(null, Client));
    });
  });

// Ignore this as well
// Its so we can have our commands in seperate files
Client.commands = new Enmap();
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    Client.commands.set(commandName, props);
  });
});


Client.login(utils.getBotToken()).then(running => {
    console.log("Bot is now runing!");
    const server = Client.guilds.get(utils.getServerID());
    utils.createMuteRole(server);
});


