const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "character",
  aliases: ["char"],
  description: "Get DATA from Genshin Impact Character (UnOfficial)",
  async execute(message, args) {
	
	const availablechars = ['amber', 'barbara', 'beidou', 'bennet', 'chongyun', 'diluc', 'fischl', 'jean', 'kaeya', 'keqing', 'lisa', 'mona', 'ningguang', 'noelle', 'qiqi', 'razor', 'sucrose', 'traveler', 'venti', 'xiangling', 'xingqiu', 'diona', 'klee', 'tartaglia', 'xiao', 'xinyan', 'zhongli']

	const search = message.content.split(' ').splice(1).toString();

	if (!search) { 
      message.channel.send(new MessageEmbed()
      .setColor('#F8AA2A')
      .setThumbnail("https://apps.chisdealhd.co.uk/botimgs/pmoLfeY.gif")
      .setDescription('You didn\'t provide a character! List of all available characters:\n`amber`, `barbara`, `beidou`, `bennet`, `chongyun`, `diluc`, `fischl`, `jean`, `kaeya`, `keqing`, `lisa`, `mona`, `ningguang`, `noelle`, `qiqi`, `razor`, `sucrose`, `traveler`, `venti`, `xiangling`, `xingqiu`, `diona`, `klee`, `tartaglia`, `xiao`, `xinyan`, `zhongli`'))
      return
    }
	
	if (availablechars.includes(search)) {
        const result = require(`../data-json/genshin-data/characters/${message.content.split(' ').splice(1).toString()}`);
		if(!result) return;

        var color = '#FFE4AA'
        if (result.vision.includes('Pyro')) {
          color = '#F58C48'
          result.vision = '[(Pyro)](https://genshin-impact.fandom.com/wiki/Elements)'
        }
        if (result.vision.includes('Cryo')) {
          color = '#A2F5F8'
          result.vision = '[(Cryo)](https://genshin-impact.fandom.com/wiki/Elements)'
        }
        if (result.vision.includes('Dendro')) {
          color = '#9CD516'
          result.vision = '[(Dendro)](https://genshin-impact.fandom.com/wiki/Elements)'
        }
        if (result.vision.includes('Anemo')) {
          color = '#77E3B6'
          result.vision = '[(Anemo)](https://genshin-impact.fandom.com/wiki/Elements)'
        }
        if (result.vision.includes('Hydro')) {
          color = '#05D2F8'
          result.vision = '[(Hydro)](https://genshin-impact.fandom.com/wiki/Elements)'
        }
        if (result.vision.includes('Geo')) {
          color = '#F0C443'
          result.vision = '[(Geo)](https://genshin-impact.fandom.com/wiki/Elements)'
        }
        if (result.vision.includes('Electro')) {
          color = '#D49CFE'
          result.vision = '[(Electro)](https://genshin-impact.fandom.com/wiki/Elements)'
        }

        if (result.gender === 'Male') {
          result.gender = '♂️'
        } else {
          result.gender = '♀️'
        }

        if (result.weapon === 'Bow') {
          result.weapon = '[Bow](https://genshin-impact.fandom.com/wiki/Bows)'
        }
        if (result.weapon === 'Sword') {
          result.weapon = '[Sword](https://genshin-impact.fandom.com/wiki/Swords)'
        }
        if (result.weapon === 'Polearm') {
          result.weapon = '[Polearm](https://genshin-impact.fandom.com/wiki/Polearms)'
        }
        if (result.weapon === 'Claymore') {
          result.weapon = '[Claymore](https://genshin-impact.fandom.com/wiki/Claymores)'
        }
        if (result.weapon === 'Catalyst') {
          result.weapon = '[Catalyst](https://genshin-impact.fandom.com/wiki/Catalysts)'
        }

        if (result.rarity === '4') {
          result.rarity = '⭐⭐⭐⭐'
        } else {
          result.rarity = '⭐⭐⭐⭐⭐'
        }

      message.channel.send(new MessageEmbed()
        .setColor(color)
        .setTitle(`${result.name} (Clickable)`)
        .setDescription(`**Vision**: ${result.vision}\n**Weapon**: ${result.weapon}\n**Gender**: ${result.gender}\n**Nation**: ${result.nation}\n**Rarity**: ${result.rarity}\n\n${result.description}`)
        .setURL(result.url)
        .setThumbnail(result.image))
        return
    } else {
      message.channel.send(new MessageEmbed()
      .setColor('#F8AA2A')
	    .setThumbnail("https://apps.chisdealhd.co.uk/botimgs/pmoLfeY.gif")
      .setDescription('You\'ve provided wrong character! List of all available characters:\n`amber`, `barbara`, `beidou`, `bennet`, `chongyun`, `diluc`, `fischl`, `jean`, `kaeya`, `keqing`, `lisa`, `mona`, `ningguang`, `noelle`, `qiqi`, `razor`, `sucrose`, `traveler`, `venti`, `xiangling`, `xingqiu`, `diona`, `klee`, `tartaglia`, `xiao`, `xinyan`, `zhongli`'))
      return
    }
	
  }
};
