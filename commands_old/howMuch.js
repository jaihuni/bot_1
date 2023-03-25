const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const wait = require('util').promisify(setTimeout);

module.exports = {
	name: "howmuch",
	description: "Item price",
	options: [
		{
			name: "itemid",
			description: "Item ID",
			type: 4,
			required: true,
		},
	],
	async execute(bot, say, interaction, args) {

		var sellminPrice;
		var buymaxPrice;
		var data;

		await console.log(args.getInteger('itemid'));
		await interaction.deferReply();
		await fetch("https://api.evemarketer.com/ec/marketstat/json?typeid="+ args.getInteger('itemid') +"&regionlimit=1&usesystem=30000142")
		.then((response) => response.json())
		.then((result) => {
			data = result;
			//console.log(data);

			sellminPrice = data[0]["sell"]["min"];
			buymaxPrice = data[0]["buy"]["max"];
	
			const embed = new MessageEmbed()
				.setTitle('eveMarketer')
				.setURL('https://evemarketer.com/types/'+args.getInteger('itemid'))
				.setDescription("Item ID : "  + args.getInteger('itemid'))
				.setThumbnail('https://i.imgur.com/AfFp7pu.png')
				.addFields(
					{ name: 'buy max', value: ''+buymaxPrice },
					{ name: 'sell min', value: ''+sellminPrice }
				)
				.setThumbnail('https://imageserver.eveonline.com/Type/'+args.getInteger('itemid')+'_64.png')
				.setColor("RANDOM")
				.setTimestamp()
				.setFooter(bot.user.username);
			
				interaction.editReply({embeds: [embed]});
		});
		await wait(30000);
		await interaction.deleteReply();
	},
};
