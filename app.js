const Discord = require('discord.js');
const client = new Discord.Client();
const keys = require("./keys.json")

const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Jaihuni Logistics')
	.addFields(
		{ name: 'Time', value: 'after et 05:00' },
		{ name: 'Volume Limit', value: '50,000m3'},
        { name: 'Corporation', value: 'jaihuni'},
        { name: 'Destination', value: 'Jita IV - Moon 4 - Caldari Navy Assembly Plant\n\
        Perimeter - Tranquility Trading Tower\n\
        Ebolfer - Tofu Factory\n\
        Siseide - Errestantinople, reaction'},
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