const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user')
    .addUserOption(option => option.setName('target').setDescription('Select a user to ban').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason for the ban').setRequired(true)),
  async execute(interaction) {
    const requiredRole = interaction.guild.roles.cache.find(role => role.name === 'Admin');

    if (!interaction.member.roles.cache.has(requiredRole.id)) {
      const errorEmbed = new EmbedBuilder()
        .setColor('#FF0000') 
        .setTitle('Permission Denied')
        .setDescription('You do not have the necessary permissions to use this command.')
        .setTimestamp()
        .setFooter({ text: 'Permission Error', iconURL: 'https://i.imgur.com/Q6N1vm5.jpg' });

      await interaction.reply({ embeds: [errorEmbed] });
      return;
    }

    const target = interaction.options.getMember('target');
    const reason = interaction.options.getString('reason');

    try {
      const banEmbed = new EmbedBuilder()
        .setColor('#FF0000') 
        .setTitle(`You have been banned from ${interaction.guild.name}`)
        .setDescription(`Reason: ${reason}`)
        .setTimestamp()
        .setFooter({ text: 'Ban Notification', iconURL: 'https://i.imgur.com/Q6N1vm5.jpg' });

      await target.send({ embeds: [banEmbed] });

      const successEmbed = new EmbedBuilder()
        .setColor('#00FF00') 
        .setDescription(`User ${target.user.tag} has been banned for "${reason}"`)
        .setTimestamp()
        .setFooter({ text: 'Ban Success', iconURL: 'https://i.imgur.com/Q6N1vm5.jpg' });

      await interaction.reply({ embeds: [successEmbed] });
    } catch (error) {
      console.error(error);

      const errorReplyEmbed = new EmbedBuilder()
        .setColor('#FF0000') 
        .setTitle('Error')
        .setDescription('There was an error while trying to ban the user.')
        .setTimestamp()
        .setFooter({ text: 'Error', iconURL: 'https://i.imgur.com/Q6N1vm5.jpg' });

      await interaction.reply({ embeds: [errorReplyEmbed] });
    }
  },
};
