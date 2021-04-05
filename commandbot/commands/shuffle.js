const { canModifyQueue, LOCALE } = require("../util/BotUtil");
const i18n = require("i18n");

i18n.setLocale("en");

module.exports = {
  name: "shuffle",
  description: i18n.__('shuffle.description'),
  execute(message) {
    const queue = message.client.player.getQueue(message);
    if (!queue) return message.channel.send(i18n.__("shuffle.errorNotQueue")).catch(console.error);
    if (!canModifyQueue(message.member)) return i18n.__("common.errorNotChannel");

    let songs = message.client.player.shuffle(message);
        if(songs)
            message.channel.send('Server Queue was shuffled.');
            
  }
};