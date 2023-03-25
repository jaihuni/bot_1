const { SlashCommandBuilder } = require('discord.js');

let start = false;
let user = [];
let unit = [];

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
			start = true;
			await interaction.reply('가위바위보 게임을 시작할게요');
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
			await interaction.reply(result+'게임을 종료할게요');
		}
		if (category === 'scissors') {
			for(let i = 0; i < user.length; i++) {
				if(user[i] === interaction.user.username) {
					unit[i] = "가위";
					await interaction.reply({
						content: interaction.user.username+'님이 가위로 바꿨습니다',
						ephemeral: true});
					return;
				}
			}
			user[user.length] = interaction.user.username;
			unit[unit.length] = "가위";
			await interaction.reply({
				content: interaction.user.username+'님이 가위를 냈습니다',
				ephemeral: true});
			interaction.channel.send(interaction.user.username+"님이 뭘 낼지 결정했어요");
		}
		if (category === 'rock') {
			for(let i = 0; i < user.length; i++) {
				if(user[i] === interaction.user.username) {
					unit[i] = "바위";
					await interaction.reply({
						content: interaction.user.username+'님이 바위로 바꿨습니다',
						ephemeral: true});
					return;
				}
			}
			user[user.length] = interaction.user.username;
			unit[unit.length] = "바위";
			await interaction.reply({
				content: interaction.user.username+'님이 바위를 냈습니다',
				ephemeral: true});
			interaction.channel.send(interaction.user.username+"님이 뭘 낼지 결정했어요");
		}
		if (category === 'paper') {
			for(let i = 0; i < user.length; i++) {
				if(user[i] === interaction.user.username) {
					unit[i] = "보자기";
					await interaction.reply({
						content: interaction.user.username+'님이 보자기로 바꿨습니다',
						ephemeral: true});
					return;
				}
			}
			user[user.length] = interaction.user.username;
			unit[unit.length] = "보자기";
			await interaction.reply({
				content: interaction.user.username+'님이 보자기를 냈습니다',
				ephemeral: true});
			interaction.channel.send(interaction.user.username+"님이 뭘 낼지 결정했어요");
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
		}
	},
};
