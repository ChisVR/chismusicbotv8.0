  
const { canModifyQueue, LOCALE } = require("../util/BotUtil");
const i18n = require("i18n");

i18n.setLocale("en");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: i18n.__('resume.description'),
  execute(message) {
    const queue = message.client.player.getQueue(message);
    if (!queue) return message.reply(i18n.__("resume.errorNotQueue")).catch(console.error);
    if (!canModifyQueue(message.member)) return i18n.__("common.errorNotChannel");

    
      let song = message.client.player.resume(message);
        if(song)
            message.channel.send(`${song.name} was resumed!`);

  }
};