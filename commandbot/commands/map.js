const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "map",
  description: "Get DATA from Genshin Impact Map (UnOfficial)",
  async execute(message, args) {
	
	const availablemaps = ['enemies', 'oculus', 'ore', 'plants', 'shrines']

	const search = message.content.split(' ').splice(1).toString();

	if (!search) { 
      message.channel.send(new MessageEmbed()
      .setColor('#F8AA2A')
	  .setThumbnail("https://apps.chisdealhd.co.uk/botimgs/pmoLfeY.gif")
      .setDescription('You didn\'t provide a map! List of all available maps:\n`Enemies`, `Oculus`, `Ore`, `Plants`, `Shrines`'))
      return
    }
	
	if (availablemaps.includes(search)) {
		
	  	const result = require(`../data-json/genshin-data/maps/${message.content.split(' ').splice(1).toString()}`);
		if(!result) return;

      message.channel.send(new MessageEmbed()
        .setColor('#F8AA2A')
        .setTitle(`${result.name} (Clickable)`)
        .setURL(result.Interactive_Map)
		.setThumbnail("https://apps.chisdealhd.co.uk/botimgs/pmoLfeY.gif")
        .setImage(result.map_url))
    } else {
      message.channel.send(new MessageEmbed()
      .setColor('#F8AA2A')
	  .setThumbnail("https://apps.chisdealhd.co.uk/botimgs/pmoLfeY.gif")
      .setDescription('You\'ve provided wrong map! List of all available maps:\n`Enemies`, `Oculus`, `Ore`, `Plants`, `Shrines`'))
      return
    }
	
  }
};
