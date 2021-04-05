const { LOCALE, DEFAULT_VOLUME, MAX_PLAYLIST_SIZE } = require("../util/BotUtil");
const i18n = require("i18n");

i18n.setLocale("en");

module.exports = {
  name: "zenzopl",
  cooldown: 3,
  aliases: ["zfipl"],
  description: i18n.__("playlist.description"),
  async execute(message, args) {
  
    let reszfi = await fetch('https://api.chisdealhd.co.uk/v1/zenzo/forge/item/'+args[0])
    		let body = await reszfi.json();
    
    const zfiurl = JSON.parse(body[0].metadata);
	
    const zfiyt = zfiurl.embedpl;
    
    const { channel } = message.member.voice;
    const serverQueue = message.client.player.getQueue(message);
    
    if (!args.length)
      return message
        .reply(i18n.__mf("playlist.usageReply", { prefix: message.client.prefix }))
        .catch(console.error);
    if (!channel) return message.reply(i18n.__("playlist.errorNotChannel")).catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")) return message.reply(i18n.__("playlist.missingPermissionConnect"));
    if (!permissions.has("SPEAK")) return message.reply(i18n.__("missingPermissionSpeak"));

    if (serverQueue && channel !== message.guild.me.voice.channel)
      return message
        .reply(i18n.__mf("play.errorNotInSameChannel", { user: message.client.user }))
        .catch(console.error);
        

    await message.client.player.playlist(message, {
            search: zfiyt,
            maxSongs: MAX_PLAYLIST_SIZE
        });
  }
};
