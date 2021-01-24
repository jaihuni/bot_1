const Discord = require('discord.js');
const client = new Discord.Client();
const keys = require("./keys.json")

const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Jaihuni Logistics')
	.setDescription('Some description here')
	.addFields(
		{ name: 'Time', value: 'after et 05:00' },
		{ name: 'volume limit', value: '50,000'},
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true },
	)
	
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '!방수') {
    msg.reply(exampleEmbed)
        .then(msg => {
            msg.delete({timeout: 5000})
        })
    
  }
});


client.login(keys.token);