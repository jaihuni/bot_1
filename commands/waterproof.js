const { MessageEmbed } = require("discord.js");
const wait = require('util').promisify(setTimeout);

module.exports = {
	name: "방수",
	description: "Waterproof KJH 근황",
	options: [
	],
	async execute(_bot, say, interaction, args) {
        const exampleEmbed = new MessageEmbed()
		.setColor('RANDOM')
		.setURL('https://www.youtube.com/watch?v=J_bPzOEhAKM')
		.setTitle('Waterproof KJH')
		.setThumbnail('https://images.evetech.net/characters/2114028655/portrait')
        .addFields(
			{ name: '소속', value: '육군 지상작전사령부 제2군단 제7보병사단' },
			{ name: '신규 명령어', value: '21/09/19\nhowmuch "itemID"\nitemID를 치면 지타 셀민과 바이맥을 보여줌' },
			{ name: '연락 가능 시간', value: '평일: 1730 ~ 2050, 주말: 0830 ~ 2050\n근무에 의해 연락을 못 받을 수 있으며 22~24시 사이에도 확률적으로 등장 가능' },
			{ name: '전역일', value: '2022/09/01' }
		)
		.setTimestamp()

		await interaction.reply({embeds: [exampleEmbed]});
		await wait(30000);
		await interaction.deleteReply();
	},
};
