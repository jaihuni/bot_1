const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('벨튀')
		.setDescription('벨튀를 합니다'),
	async execute(interaction) {
		await interaction.reply({
			content:'벨튀를 시전합니다',
			ephemeral: true});
		await interaction.channel.send('<@859095099735408661> <@411006875585216522> <@355312225638154240> <@356084732804726788> <@471301630197891084> <@397650491892563969> <@363220348730343425> <@391806248766406667> <@383927982261141507> 롤시??');
	},
};
