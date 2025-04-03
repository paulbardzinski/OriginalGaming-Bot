const { Discord, MessageEmbed } = require("discord.js");
const db = require("quick.db");
const config = require('../../botconfig.json')
const { red_light } = require('../../colours.json');

module.exports = {
    config: {
        name: "mutevoice",
        description: "Mute all users in Voice Channel!",
        category: "moderation",
        accessableby: "Administrators",
        aliases: ["voicemute", "vm", "mv"]
    },
    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;
        
        const embed1 = new MessageEmbed()
        .setTitle('<:disagree:782705809359765526> Error <:disagree:782705809359765526>')
        .setDescription("I don't have enough permissions to do this command. \n - Please, give me permission -> ``ADMINISTRATOR``")
        .setColor('#d12828')

        const embed2 = new MessageEmbed()
        .setTitle('<:disagree:782705809359765526> Error <:disagree:782705809359765526>')
        .setDescription("You don't have enough permissions to do this command. \n - Required permission -> ``MANAGE CHANNELS``")
        .setColor('#d12828')


        if(!message.member.hasPermission(["MANAGE_CHANNELS"])) {
            message.channel.send(embed2)
            .then(m => m.delete({ timeout: 7000 }));
            return message.delete({ timeout: 7000 });
        }

        if(!message.guild.me.hasPermission(["ADMINISTRATOR"])) {
            message.channel.send(embed1)
            .then(m => m.delete({ timeout: 7000 }));
            return message.delete({ timeout: 7000 });
        }


        let channel = message.member.voice.channel;
        if(!channel) {
            const er = new MessageEmbed()
                .setDescription(`You are not in any voice channel!`)
            return message.channel.send(er)
        }

        for (let member of channel.members) {
            member[1].voice.setMute(true)
        }
        message.channel.send('<:agree:782705809142448159> Voice has been muted')


        let embeddw = new MessageEmbed()
        .setColor(red_light)
        .setAuthor(`Modlogs`)
        .addField("Moderation:", "Muted Voice")
        .setThumbnail(message.guild.iconURL())
        .addField("Moderator:", message.author.username)
        .addField("Date:", message.createdAt.toLocaleString());
        
        let lawdw = await message.guild.channels.cache.get(config.logchannel)
        return lawdw.send(embeddw)
    }
}