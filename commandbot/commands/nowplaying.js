const createBar = require("string-progressbar");
const { MessageEmbed } = require("discord.js");

const { LOCALE } = require("../util/BotUtil");
const i18n = require("i18n");

i18n.setLocale("en");

module.exports = {
  name: "np",
  description: i18n.__("nowplaying.description"),
  execute(message) {
    const queue = message.client.player.getQueue(message);
    if (!queue) return message.reply(i18n.__("nowplaying.errorNotQueue")).catch(console.error);

    const song = queue.songs[0];
    const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
    const left = song.seekTime - seek;

    let nowPlaying = new MessageEmbed()
      .setTitle(i18n.__("nowplaying.embedTitle"))
      .setDescription(`${song.name}\n${song.url}`)
      .setColor("#F8AA2A")
      .setAuthor(message.client.user.username);

    if (song.seekTime > 0) {
      nowPlaying.addField(
        "\u200b",
        new Date(seek * 1000).toISOString().substr(11, 8) +
          "[" +
          createBar(song.seekTime == 0 ? seek : song.seekTime, seek, 20)[0] +
          "]" +
          (song.seekTime == 0 ? " ◉ LIVE" : new Date(song.seekTime * 1000).toISOString().substr(11, 8)),
        false
      );
      nowPlaying.setFooter(
        i18n.__mf("nowplaying.timeRemaining", { time: new Date(left * 1000).toISOString().substr(11, 8) })
      );
    }

    return message.channel.send(nowPlaying);
  }
};
