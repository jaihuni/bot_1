module.exports = {
	name: "waterproof",
	description: "무슨 일이 일어나고 있나요?",
	options: [
	],
	async execute(_bot, say, interaction, args) {
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Constructioning')
        .addFields(
            { name: '공사 중', value: '뜯어 고치는 중이에오.' }
        )
		await say(interaction, exampleEmbed);
	},
};
