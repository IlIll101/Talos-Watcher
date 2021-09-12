const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require("node-fetch");
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('displays information about talos'),

	async execute(interaction, client) {
		async function create_embed(data) {
			var icon;
			if (data.response_quality > 0.8) {icon = "<:5Bars:885935059897548911>"};
			if (data.response_quality < 0.8 && data.response_quality > 0.6) {icon = "<:4Bars:885935059973066772>"};
			if (data.response_quality < 0.6 && data.response_quality > 0.4) {icon = "<:3Bars:885935059872399420>"};
			if (data.response_quality < 0.4 && data.response_quality > 0.2) {icon = "<:2Bars:885935059952091147>"};
			if (data.response_quality < 0.2) {icon = "<:1Bars:885935059889184778>"};
			
			var embed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle(`Stats for ${data.url} `)
			.addFields(
				{ name: 'Average ping', value: data.average_ping.toString(), inline: false },
				{ name: 'Succsessful response rate', value: (data.response_quality*100).toString() + '% ' + icon, inline: false},
				{ name: 'Ping tests (ms)', value: data.response_times.toString(), inline: false },
				{ name: 'Response tests', value: data.response_types.toString(), inline: false },
			)	
			.setTimestamp(data.time_of_check)
			.setFooter('Time of evaluation');

			await interaction.reply({ embeds: [embed] });
		}

		fs.readFile('./Information/talos_responses.json', 'utf8', function(err, data) {
			if (err) {
				console.log(`Error reading file from file: ${err}`);
			}
			else {
				create_embed(JSON.parse(data));
			}
		});
	}
};
