const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "waterproof",
	description: "What",
	options: [
	],
	async execute(_bot, say, interaction, args) {
        const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Constructioning')
        .addFields(
            { name: '공사 중', value: '뜯어 고치는 중이에오.' }
        )
		await say(interaction, exampleEmbed);
	},
};
