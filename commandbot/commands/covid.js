const { MessageEmbed, MessageAttachment } = require("discord.js");
const request = require("request");

module.exports = {
  name: "covid",
  aliases: ["cronavirus"],
  description: "Get DATA from COVID-19 Tracker",
  async execute(message, args) {

	const search = message.content.split(' ').splice(1).toString();


     if (search) {

        if (!search) { 
      message.channel.send(new MessageEmbed()
      .setColor('#F8AA2A')
      .setThumbnail("https://apps.chisdealhd.co.uk/botimgs/pmoLfeY.gif")
      .setDescription('You are Missing Region Code Example `UK`'))
      return
    }


        request("https://coronavirus-19-api.herokuapp.com/countries/" + search, function(error, response, body) { //set info for the streamer in JSON
            if (error) {
                console.log('Error encounterd: ' + err);
                message.channel.send("Horrible stuff happend D:. Try again later.");
                return;
            }

            if (body != "Country not found") {

                var data = JSON.parse(body);

                let embed = new MessageEmbed();
                embed.setColor(0x9900FF)
                embed.setTitle("CoronaVirus Tracker (" + search + ") **(API by ChisdealHDYT#7172)**")
                embed.addField("?? Cases", data.cases, true)
                if (data.recovered == null) {
                    embed.addField("?? Recovered", "0", true)
                } else {
                    embed.addField("?? Recovered", data.recovered, true)
                }
                embed.addField("?? Deaths", data.deaths, true)
                embed.addField("?? Active Cases", data.active, true)
                embed.addField("?? Serious Cases", data.critical, true)
                embed.setFooter("Sent via " + message.client.user.username, message.client.user.avatarURL)
                embed.setTimestamp()

                message.channel.send({
                    embed
                })
            } else {
                let embed = new MessageEmbed();
                embed.setColor(0x9900FF)
                embed.setTitle("CoronaVirus Tracker **(API by ChisdealHDYT#7172)**")
                embed.setDescription("ERROR: API is Down or not Working or you not type Region correctly, Contact ChisdealHDYT#7172 about this issue.")
                embed.setFooter("Sent via " + message.client.user.username, message.client.user.avatarURL)
                embed.setTimestamp()

                message.channel.send({
                    embed
                })
            }
        })
    } else {
        request("https://coronavirus-19-api.herokuapp.com/all", function(error, response, body) { //set info for the streamer in JSON
            if (error) {
                console.log('Error encounterd: ' + err);
                message.channel.send("Horrible stuff happend D:. Try again later.");
                return;
            }
            var data = JSON.parse(body);

            let embed = new Discord.MessageEmbed();
            embed.setColor(0x9900FF)
            embed.setTitle("CoronaVirus Tracker GLOBAL **(API by ChisdealHDYT#7172)**")
            embed.addField("?? Cases", data.cases, true)
            embed.addField("?? Recovered", data.recovered, true)
            embed.addField("?? Deaths", data.deaths, true)
            embed.setFooter("Sent via " + message.client.user.username, message.client.user.avatarURL)
            embed.setTimestamp()

            message.channel.send({
                embed
            })

        })
    }
		
  }
};
