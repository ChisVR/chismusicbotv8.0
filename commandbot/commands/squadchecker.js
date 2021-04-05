const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
  name: "squadchecker",
  aliases: ["squadping"],
  description: "Get DATA from Squad Servers",
  async execute(message, args) {

	const search = message.content.split(' ').splice(1).toString();

	if (!search) { 
      message.channel.send(new MessageEmbed()
      .setColor('#F8AA2A')
      .setThumbnail("https://apps.chisdealhd.co.uk/botimgs/pmoLfeY.gif")
      .setDescription('You didn\'t provide a Server name!'))
      return
    }
	
	params = _encode("https://api.battlemetrics.com/servers?fields[server]=rank,name,players,maxPlayers,address,ip,port,country,location,details,status&relations[server]=game,serverGroup&filter[search]="+search);
  
	function _encode(obj) {
		let string = "";

		for (const [key, value] of Object.entries(obj)) {
			if (!value) continue;
			string += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
		}

		return string.substring(1);
	}
	
	
	const response = await fetch("https://api.battlemetrics.com/servers?fields[server]=rank,name,players,maxPlayers,address,ip,port,country,location,details,status&relations[server]=game,serverGroup&filter[search]="+search,
	{
      headers: {
        "accept": "application/json"
      },
      "body": null,
      "method": "GET"
    })
	const json = await response.json()
  
  message.channel.send(new MessageEmbed()
      .setColor('#F8AA2A')
      .setTitle(`${json.data[0].attributes.name}`)
	    .setThumbnail("https://apps.chisdealhd.co.uk/botimgs/pmoLfeY.gif")
      .setDescription(`**Players:** ${json.data[0].attributes.players}/${json.data[0].attributes.maxPlayers}\n**Status:** ${json.data[0].attributes.status}\n**Region:** ${json.data[0].attributes.country}\n**Map:** ${json.data[0].attributes.details.map}\n\n**To Connect This Server, need find it on your Game List.**`))
	
	
  }
};
