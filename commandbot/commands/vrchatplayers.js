const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "vrchatfans",
  aliases: ["vrchatplayers"],
  description: "Get DATA from Fans of VRChat Lists",
  async execute(message, args) {
	
	const availablechars = ['hikarivr', 'chisdealhdyt']

	const search = message.content.split(' ').splice(1).toString();

	if (!search) { 
      message.channel.send(new MessageEmbed()
      .setColor('#F8AA2A')
      .setThumbnail("https://apps.chisdealhd.co.uk/botimgs/pmoLfeY.gif")
      .setDescription('You didn\'t provide a VRChat Player! List of all available:\n`hikarivr`, `chisdealhdyt`'))
      return
    }
	
	if (availablechars.includes(search)) {
        const result = require(`../data-json/vrchat-data/players/${message.content.split(' ').splice(1).toString()}`);
		if(!result) return;

        var color = '#FFE4AA'

        if (result.gender == 'Male') {
          result.gender = '♂️'
        } else {
          result.gender = '♀️'
        }

        if (result.url != null) {
           var url = result.url;
        } else {
           var url = "https://example.com";
        }


      message.channel.send(new MessageEmbed()
        .setColor(color)
        .setTitle(`${result.name} (Clickable)`)
        .setDescription(`**Title**: ${result.title}\n**Species**: ${result.species}\n**Gender**: ${result.gender}\n**Aliases**: ${result.aliases}\n\n${result.description}`)
        .setURL(url)
        .setThumbnail(result.image))
        return
    } else {
      message.channel.send(new MessageEmbed()
      .setColor('#F8AA2A')
	    .setThumbnail("https://apps.chisdealhd.co.uk/botimgs/pmoLfeY.gif")
      .setDescription('You\'ve provided wrong VRChat Player! List of all available:\n`hikarivr`, `chisdealhdyt`'))
      return
    }
	
  }
};
