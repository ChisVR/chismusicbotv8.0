/**
 * Module Imports
 */
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./util/BotUtil");
const fetch = require("node-fetch");
const request = require("request");
const path = require("path");
const i18n = require("i18n");

const client = new Client({ disableMentions: "everyone" });

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

i18n.configure({
  locales: ["en", "es", "ko", "fr", "tr", "pt_br", "zh_cn", "zh_tw"],
  directory: path.join(__dirname, "locales"),
  defaultLocale: "en",
  objectNotation: true,
  register: global,

  logWarnFn: function (msg) {
    console.log("warn", msg);
  },

  logErrorFn: function (msg) {
    console.log("error", msg);
  },

  missingKeyFn: function (locale, value) {
    return value;
  },

  mustacheConfig: {
    tags: ["{{", "}}"],
    disable: false
  }
});

/**
 * Client Events
 */
client.on("ready", () => {
  
  console.log(`${client.user.username} Command BOT Ready!`);
  
       client.user.setActivity(`Paimon is Sommoning... | Loading Modules / Commands`)
        .then(() => {

            setInterval(() => {

                var member = client.guilds.cache.get("")

                request("",
                function(err, res, body) {
                    var data = JSON.parse(body);

                    client.channels.cache.get("").setName(`Twitch: ${data.twitch}`);
                    client.channels.cache.get("").setName(`Instagram: ${data.instagram}`);
                    client.channels.cache.get("").setName(`Twitter: ${data.twitter}`);
                    client.channels.cache.get("").setName(`TikTok: ${data.tiktok}`);
                    client.channels.cache.get("").setName(`YouTube: ${data.youtube}`);
                
                })


            }, 2000000)
            
            //prefix config    
            setInterval(() => {
                client.user.setActivity(`Paimon BOT. | Prefix ${PREFIX} | [NEW] Assistant`).then(function(setActivity) {
                    setTimeout(function() {
                        client.user.setActivity('Paimon Says: Paimon is NOT emergency food!')
                    }, 30000)
                    setTimeout(function() {
                        client.user.setActivity(`Paimon Says: I'm Connected to ${client.guilds.cache.size} Servers`)
                    }, 40000)
                    setTimeout(function() {
                        client.user.setActivity('Paimon Says: my Traveler (ChisdealHDYT#7172) Created me!')
                    }, 50000)
                    setTimeout(function() {
                        client.user.setActivity(`Paimon Says: If you Want Play Music, Or any Commands. Please do ${PREFIX}help for more`)
                        
                    }, 60000)
                })
            }, 70000)

        })
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);

/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error executing that command.").catch(console.error);
  }
});