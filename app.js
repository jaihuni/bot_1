const fetch = require("node-fetch");
const { Client, Intents,  MessagePayload } = require("discord.js");
const { readdirSync } = require("fs");
const Bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const Config = require("./config");
const Commands = [];
const cmdFiles = readdirSync("./commands").filter((file) =>
	file.endsWith(".js"),
);

Bot.once("ready", async () => {
	for (const fileName of cmdFiles) {
		const File = require(`./commands/${fileName}`);
		Commands.push(File);
		console.log(`${File.name}`);
		await Bot.api.applications(Bot.user.id).commands.post({
			data: {
				name: File.name,
				description: File.description,
				options: File.options,
			},
		});
	}
	console.info(`Logged in as ${Bot.user.username}`);

});

Bot.on("interactionCreate", async interaction => {

	if (!interaction.isCommand()) return;

	const { commandName } = interaction; 

	const CMDFile = Commands.find(
		(cmd) => cmd.name.toLowerCase() === commandName.toLowerCase(),
	);
	if (CMDFile)
		CMDFile.execute(Bot, say, interaction, interaction.data.options);
});

Bot.login(Config.token);

async function say(interaction, content) {
	return Bot.api
		.interactions(interaction.id, interaction.token)
		.callback.post({
			data: {
				type: 4,
				data: await createAPIMessage(interaction, content),
			},
		})
		.then(m => m.delete({ timeout: 30000 }));
}

async function createAPIMessage(interaction, content) {
	const apiMessage = await MessagePayload.create(
		Bot.channels.resolve(interaction.channel_id),
		content,
	)
		.resolveData()
		.resolveFiles();
	return { ...apiMessage.data, files: apiMessage.files };
}
