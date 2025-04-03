const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const moment = require('moment')
const db = require('quick.db')
const { default_prefix } = require('../../botconfig.json')
require("../../ExtendedMessage");

module.exports = {
    config: {
        name: "server-info",
        description: "Pulls the serverinfo of the guild!",
        usage: "-server-info",
        category: "basic",
        accessableby: "Members",
        aliases: ["si", "serverinfo"]
    },

    run: async (bot, message, args) => {
        if(message.channel.type === "dm") return;

        let prefix = await db.get(`prefix_${message.guild.id}`)
        if(prefix === null) prefix = default_prefix;

    let invite = await message.channel.createInvite({ 
        unique: false,
        maxAge: 0
         })

      let texts = message.guild.channels.cache.filter(c => c.type === 'text').size;
      let categories = message.guild.channels.cache.filter(c => c.type === 'category').size;
      let voices = message.guild.channels.cache.filter(c => c.type === 'voice').size;
      let own = message.guild.members.cache.get(message.guild.ownerID);

    let sEmbed = new MessageEmbed()
        .setColor(cyan)
        .setTitle("Server Informations")
        .setThumbnail(message.guild.iconURL())
        .addField("**Server Name:**", `${message.guild.name}`, false)
        .addField("**Server Owner:**", `${own} [owner id: ${message.guild.ownerID}]`, false)
        .addField("**User Count:**", `**${message.guild.members.cache.size}** total, **${message.guild.members.cache.filter(member => !member.user.bot).size}** users, **${message.guild.members.cache.filter(member => member.user.bot).size}** bots`, false)
        .addField("**Server Created At:**", `<t:${Math.trunc(message.guild.createdAt.getTime()/1000)}>`, false)
        .addField("**Server Level:**", `Level **${message.guild.premiumTier}** - **${message.guild.premiumSubscriptionCount}** server boosts`, false)
        .addField("**Channel Count:**", `**${texts}** text, **${voices}** voice, **${categories}** categories`, false)
        .addField("**Role Count:**", `${message.guild.roles.cache.size}`, false)
        .addField("Server Verification Level", `${message.guild.verificationLevel}`, false)
        .addField("Server's bot prefix", `${prefix}`, false)
        .addField('\u200b', '\u200b', false)
        .addField("**Server Permanent Invite:**", `${invite}`, false)
        .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL());
    message.inlineReply(sEmbed);
    }
    
}
