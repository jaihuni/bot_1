const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

let start = false;
let user = [];
let unit = [];
let box;

const row = new ActionRowBuilder()
.addComponents(
	new ButtonBuilder()
		.setCustomId('scissors')
		.setLabel('가위')
		.setStyle(ButtonStyle.Primary),
	new ButtonBuilder()
		.setCustomId('rock')
		.setLabel('바위')
		.setStyle(ButtonStyle.Success),
	new ButtonBuilder()
		.setCustomId('paper')
		.setLabel('보')
		.setStyle(ButtonStyle.Danger),
);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('가위바위보')
		.setDescription('가위바위보 하기')
		.addStringOption(option =>
			option.setName('옵션')
				.setDescription('옵션 선택')
				.setRequired(true)
				.addChoices(
					{ name: '시작', value: 'start' },
					{ name: '끝내기', value: 'finish' },
					{ name: '가위', value: 'scissors' },
					{ name: '바위', value: 'rock' },
					{ name: '보', value: 'paper' },
					{ name: '현황', value: 'status' },
				)),
	async execute(interaction) {

		const category = interaction.options.getString('옵션');
		if (category === 'start') {
			if(start === true)  {
				await interaction.reply('이미 시작된 게임이 있어요');
				return;
			}
			let embed = new EmbedBuilder()
				.setColor("Random")
				.setTitle('가위바위보')
				.addFields(
					{ name: '참가자', value: "-"},
				)
				.setTimestamp();
			start = true;
			await interaction.reply({ content: '가위바위보를 시작할게요', embeds:[embed], components: [row] });
			box = interaction;
			return;
		}

		if(start === false) {
			await interaction.reply('게임이 시작되지 않았어요');
			return;
		}
		if (category === 'finish') {
			start = false;
			result = "";
			if (user.length > 0) {
				for(let i = 0; i < user.length; i++) {
					result = result+user[i]+"님이 "+unit[i]+"를 냈습니다\n"
				}
				user = [];
				unit = [];
				result = result+"\n";
			}
			embed = new EmbedBuilder()
				.setColor("Random")
				.setTitle('가위바위보 종료')
				.addFields(
					{ name: '결과', value: result},
				)
				.setTimestamp();

			await interaction.reply({ content: "가위바위보를 종료합니다.", ephemeral: true})
				.then(() => setTimeout(function () { 
					interaction.deleteReply();
				}, 30000));
			await box.editReply({ content: '가위바위보가 종료되었습니다.', embeds:[embed], components: [] })
			await box.followUp({ content: '가위바위보가 종료되었습니다.', embeds:[embed] });
			return;
		}
		if (category === 'status') {
			if (user.length > 0) {
				result = "";
				for(let i = 0; i < user.length; i++) {
					result = result+user[i]+"님은 뭘 낼지 결정했어요\n"
				}
				await interaction.reply(result);
			}
			else {
				await interaction.reply("아직 무언가를 낸 사람이 없습니다.");
			}
			return
		}

		let unit_curr= "";
		let user_curr = interaction.user.username;
		switch(category) {
			case 'scissors':
				unit_curr = "가위";
				break;
			case 'rock':
				unit_curr = "바위";
				break;
			case 'paper':
				unit_curr = "보자기";
				break;
		}

		for(let i = 0; i < user.length; i++) {
			if(user[i] === user_curr) {
				unit[i] = unit_curr;
				await interaction.reply({
					content: user_curr+'님이 '+unit_curr+'로 바꿨습니다',
					ephemeral: true})
					.then(() => setTimeout(function () { 
						interaction.deleteReply();
					}, 30000));
				return;
			}
		}
		user[user.length] = user_curr;
		unit[unit.length] = unit_curr;
		await interaction.reply({
			content: user_curr+'님이 '+unit_curr+'를 냈습니다',
			ephemeral: true});

		embed = new EmbedBuilder()
			.setColor("Random")
			.setTitle('가위바위보')
			.addFields(
				{ name: '참가자', value: result},
			)
			.setTimestamp();
		box.editReply({ content: '가위바위보를 진행중이에요', embeds:[embed], components: [row] })

	},
	async button(interaction) {
		if(start === false) {
			await interaction.reply({
				content: '이미 종료된 게임입니다.',
				ephemeral: true});
			return;
		}

		let unit_curr= "";
		let user_curr = interaction.user.username;
		switch(interaction.customId) {
			case 'scissors':
				unit_curr = "가위";
				break;
			case 'rock':
				unit_curr = "바위";
				break;
			case 'paper':
				unit_curr = "보자기";
				break;
		}

		for(let i = 0; i < user.length; i++) {
			if(user[i] === user_curr) {
				unit[i] = unit_curr;
				await interaction.reply({
					content: user_curr+'님이 '+unit_curr+'로 바꿨습니다',
					ephemeral: true})
					.then(() => setTimeout(function () { 
						interaction.deleteReply();
					}, 30000));
				return;
			}
		}
		user[user.length] = user_curr;
		unit[unit.length] = unit_curr;
		await interaction.reply({
			content: user_curr+'님이 '+unit_curr+'를 냈습니다',
			ephemeral: true})
			.then(() => setTimeout(function () { 
				interaction.deleteReply();
			}, 30000));

		result = "";
		for(let i = 0; i < user.length; i++) {
			result = result+user[i]+"\n";
		}

		embed = new EmbedBuilder()
		.setColor("Random")
		.setTitle('가위바위보')
		.addFields(
			{ name: '참가자', value: result},
		)
		.setTimestamp();
		box.editReply({ content: '가위바위보를 진행중이에요', embeds:[embed], components: [row] })

	},
};
