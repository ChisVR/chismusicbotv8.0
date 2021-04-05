const { LOCALE } = require("../util/BotUtil");
const i18n = require("i18n");

i18n.setLocale(LOCALE);

const { Player, Utils } = require("discord-music-player");
const player = new Player(client, {
    leaveOnEmpty: false,
});

client.player = player;

module.exports = {
  name: "stop",
  description: i18n.__('stop.description'),
  execute(message) {
    const queue = client.player.getQueue(message);

    if (!queue) return message.reply(i18n.__("stop.errorNotQueue")).catch(console.error);
    
	let isDone = client.player.stop(message);
        if(isDone)
			message.channel.send(i18n.__mf("stop.result", { author: message.author })).catch(console.error);
  }
};