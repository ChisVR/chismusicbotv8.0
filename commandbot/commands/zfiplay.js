const { LOCALE, DEFAULT_VOLUME } = require("../util/BotUtil");
const i18n = require("i18n");
const fetch = require('node-fetch');

i18n.setLocale("en");

module.exports = {
  name: "zenzoplay",
  cooldown: 3,
  aliases: ["zfip"],
  description: i18n.__("play.description"),
  async execute(message, args) {
  
    let reszfi = await fetch('https://api.chisdealhd.co.uk/v1/zenzo/forge/item/'+args[0])
    		let body = await reszfi.json();
    
    const zfiurl = JSON.parse(body[0].metadata);
	
    const zfiyt = zfiurl.embed;
    
    const { channel } = message.member.voice;

    const serverQueue = message.client.player.getQueue(message);
    if (!channel) return message.reply(i18n.__("play.errorNotChannel")).catch(console.error);
    if (serverQueue && channel !== message.guild.me.voice.channel)
      return message
        .reply(i18n.__mf("play.errorNotInSameChannel", { user: message.client.user }))
        .catch(console.error);

    if (!args.length)
      return message
        .reply(i18n.__mf("play.usageReply", { prefix: message.client.prefix }))
        .catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")) return message.reply(i18n.__("play.missingPermissionConnect"));
    if (!permissions.has("SPEAK")) return message.reply(i18n.__("play.missingPermissionSpeak"));

    if(message.client.player.isPlaying(message)) {
        let song = await message.client.player.addToQueue(message, zfiyt);

        if(song)
            console.log(`Added ${song.name} to the queue`);
        return;
    } else {
        let song = await message.client.player.play(message, args.join(' '));
            
        if(song)
            console.log(`Started playing ${song.name}`);
        return;
    }
  }
};
