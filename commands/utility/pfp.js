const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pfp')
    .setDescription('Provides the specified user\'s profile picture')
    .addUserOption(option => option.setName('user').setDescription('Select a user')),
  async execute(interaction) {
    const user = interaction.options.getUser('user');

    if (!user) {
      return interaction.reply('Please specify a user.');
    }

    await interaction.reply({
      //content: `${user.username}'s pfp`,
      files: [user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })],
    });
  },
};
