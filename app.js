const Discord = require('discord.js');
const client = new Discord.Client();
const keys = require("./keys.json")

const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Constructioning')
	.addFields(
		{ name: '공사 중', value: '뜯어 고치는 중이에오.' }
	)
	



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '!방수') {
    msg.reply(exampleEmbed)
        .then(msg => {
            msg.delete({timeout: 60000})
        })
    
  }
});


client.login(keys.token);