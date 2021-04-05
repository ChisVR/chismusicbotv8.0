const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "avatar",
    aliases: ["pfp"],
    description: "Get Random Anime Avatar Images (NSFW Channels access NSFW Avatars)",
    async execute(message, args) {

        const { url } = await fetch(`https://nekos.life/api/v2/img/${message.channel.nsfw ? "nsfw_" : ""}avatar`)
            .then((res) => res.json());

        let embed = new MessageEmbed();
        embed.setColor(0x9900FF)
        embed.setTitle(`${message.channel.nsfw ? "NSFW " : ""}Anime Avatar`)
        embed.setDescription("Get Random Anime Avatars, (If have NSFW Enabled. you able access NSFW Avatars)")
        embed.setImage(url);
        embed.setFooter("Requested by " + message.author.username + " | Powered by nekos.life", message.client.user.avatarURL)
        embed.setTimestamp()

        message.channel.send({
            embed
        })

    }
};