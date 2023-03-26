const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('익명')
		.setDescription('익명으로 말할 수 있어요')
		.addStringOption(option =>
			option
				.setName('내용')
				.setDescription('익명으로 보낼 내용을 입력하세요')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.reply({
			content: '내용을 전송했습니다',
			ephemeral: true});
		await interaction.channel.send(interaction.options.getString('내용'))
			.then(() => setTimeout(function () { 
				interaction.deleteReply();
			}, 5000));
	},
};
