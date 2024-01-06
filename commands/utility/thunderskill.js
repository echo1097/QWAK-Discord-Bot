const { CommandInteraction, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('thunderskill')
    .setDescription('Generate Thunderskill link for a player')
    .addStringOption(option =>
      option
        .setName('player')
        .setDescription('Enter the player name')
        .setRequired(true)
    ),
  async execute(interaction = CommandInteraction) {
    const playerName = interaction.options.getString('player');

    const thunderskillLink = `https://thunderskill.com/en/stat/${playerName}`;

    await interaction.reply(thunderskillLink);
  },
};
