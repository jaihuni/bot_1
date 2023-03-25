const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Say command.'),
	async execute(interaction) {
		await interaction.reply('hello');
	},
};
