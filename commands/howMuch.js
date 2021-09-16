const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
	name: "howmuch",
	description: "Item price",
	options: [
		{
			name: "text",
			description: "Item ID",
			type: 3,
			required: true,
		},
	],
	async execute(bot, say, interaction, args) {

		var sellminPrice;
		var buymaxPrice;
		var data;

		fetch("https://api.evemarketer.com/ec/marketstat/json?typeid="+ args[0].value +"&regionlimit=1&usesystem=30000142")
		.then((response) => response.json())
		.then((result) => data = result));

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
