const { MessageEmbed, MessageAttachment } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
  name: "mcchecker",
  aliases: ["minecraftping"],
  description: "Get DATA from Minecraft Servers",
  async execute(message, args) {

	const search = message.content.split(' ').splice(1).toString();

	if (!search) { 
      message.channel.send(new MessageEmbed()
      .setColor('#F8AA2A')
      .setThumbnail("https://apps.chisdealhd.co.uk/botimgs/pmoLfeY.gif")
      .setDescription('You didn\'t provide a Server IP!'))
      return
    }
	
	const response = await fetch(`https://api.mcsrvstat.us/2/${search}`,
	{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
	const json = await response.json()
 
  if (json.online == true) {
	
     message.channel.send(new MessageEmbed()
      .setColor('#F8AA2A')
	    .setThumbnail("https://apps.chisdealhd.co.uk/botimgs/pmoLfeY.gif")
      .setDescription(`**IP**: ${json.hostname}\n**Players:** ${json.players.online}/${json.players.max}\n\n**MOTD:** ${json.motd.clean[0]}`))
 
  
  } else {
  
    message.channel.send(new MessageEmbed()
      .setColor('#F8AA2A')
	    .setThumbnail("https://apps.chisdealhd.co.uk/botimgs/pmoLfeY.gif")
      .setDescription('Server is Offline!'))   
  
  }
	
  }
};
