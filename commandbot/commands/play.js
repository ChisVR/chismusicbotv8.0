const { LOCALE, DEFAULT_VOLUME } = require("../util/BotUtil");
const i18n = require("i18n");

i18n.setLocale("en");

module.exports = {
  name: "play",
  cooldown: 3,
  aliases: ["p"],
  description: i18n.__("play.description"),
  async execute(message, args) {
  
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
        let song = await message.client.player.addToQueue(message, args.join(' '));

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
