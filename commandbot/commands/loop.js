const { canModifyQueue, LOCALE } = require("../util/BotUtil");
const i18n = require("i18n");

i18n.setLocale("en");

module.exports = {
  name: "loop",
  aliases: ["l"],
  description: i18n.__("loop.description"),
  execute(message) {
    const queue = message.client.player.getQueue(message);
    if (!queue) return message.reply(i18n.__("loop.errorNotQueue")).catch(console.error);
    if (!canModifyQueue(message.member)) return i18n.__("common.errorNotChannel");

    // toggle from false to true and reverse
    let toggle = message.client.player.toggleLoop(message);
        
        if(toggle === null)
            return;
        // Send a message with the toggle information
        else if (toggle)
            message.channel.send('I will now repeat the current playing song.');
        else message.channel.send('I will not longer repeat the current playing song.');

  }
};