const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
	name: "say",
	description: "Say command.",
	options: [
		{
			name: "text",
			description: "You can print some price with itemid",
			type: 3,
			required: true,
		},
	],
	async execute(bot, say, interaction, args) {

		var sellminPrice;
		var buymaxPrice;

		fetch("https://api.evemarketer.com/ec/marketstat/json?typeid="+ args[0].value +"&regionlimit=1&usesystem=30000142")
		.then((response) => response.json())
		.then((data) => console.log(data));

		sellminPrice = data[0].sell.min;
		buymaxPrice = data[0].buy.max;

		const embed = new MessageEmbed()
			.setDescription("sellminPrice: " + sellminPrice)
			.setDescription("buymaxPrice: " + buymaxPrice)
			.setColor("RANDOM")
			.setTimestamp()
			.setFooter(bot.user.username);
		await say(interaction, {embeds: [embed]});
	},
};
