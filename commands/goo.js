const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('goo')
		.setDescription('미스터리 구 펀드 내용을 보여드립니다'),
	async execute(interaction) {
		let today = new Date()
		const embed = new EmbedBuilder()
			.setColor("Random")
			.setURL('https://docs.google.com/document/d/1tJ985rP1TurLCQyf8JHEWYKWxadYAzpsFrGYtpuQATE/edit')
			.setTitle('Mystery Goo™ Fund')
			.setThumbnail('https://wiki.kerbalspaceprogram.com/images/thumb/2/25/Mystery_Goo_Containment_Unit-02.png/146px-Mystery_Goo_Containment_Unit-02.png')
			.addFields(
				{ name: '다음 정산일', value: ((Math.floor(today.getMonth()/3)+1)*3+1)+"/1"},
				{ name: '23년 1분기 정산', value: '[링크](https://docs.google.com/spreadsheets/d/1kjvVItvSpeKPhzKEXd9h78JZvAQ436D7RpiLT0bQa5c/edit#gid=0)' },
				{ name: '23년 2분기 중간정산', value: '[링크](https://docs.google.com/spreadsheets/d/1snx2HqOWIFe6rvB-deZQGEH3uRX4PEXXJL2MFSqbXdg/edit#gid=0)' },
				{ name: '23년 2분기 중간정산2', value: '[링크](https://docs.google.com/spreadsheets/d/1lWCPSGPiVJoOM56hjG_f1Ip1AdObuKu4zNoQTXOFcpE/edit#gid=0)' },
				{ name: '23년 2분기 정산', value: '[링크](https://docs.google.com/spreadsheets/d/1CLflgnMm-HiI_mhhgIJNBjD8IPrZIuIDl9QemiMtGAA/edit?pli=1#gid=0)' },
				{ name: '규정', value: '[링크](https://docs.google.com/document/d/1tJ985rP1TurLCQyf8JHEWYKWxadYAzpsFrGYtpuQATE/edit)' }
			)
			.setTimestamp();
		await interaction.reply({ embeds: [embed] })
			.then(() => setTimeout(function () {
				interaction.deleteReply();
			}, 30000));
	},
};
