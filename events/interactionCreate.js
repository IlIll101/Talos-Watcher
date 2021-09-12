module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`${interaction.user.tag} used: ${interaction.commandName}`);
	},
};
