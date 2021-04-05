const { canModifyQueue, LOCALE } = require("../util/BotUtil");
const i18n = require("i18n");

i18n.setLocale("en");

module.exports = {
  name: "pause",
  description: i18n.__("pause.description"),
  execute(message) {
    const queue = message.client.player.getQueue(message);
    if (!queue) return message.reply(i18n.__("pause.errorNotQueue")).catch(console.error);
    if (!canModifyQueue(message.member)) return i18n.__("common.errorNotChannel");

    if (message.client.player.isPlaying(message)) {
      
      let song = message.client.player.pause(message);
        if(song) 
            message.channel.send(`${song.name} was paused!`);
      
    }
  }
};